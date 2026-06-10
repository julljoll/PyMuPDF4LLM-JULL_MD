import { NextRequest, NextResponse } from 'next/server';
import { execFile, execFileSync } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdtemp, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const execFileAsync = promisify(execFile);
const SCRIPTS_DIR = join(process.cwd(), 'scripts');

function checkPythonDeps(): string | null {
  try {
    execFileSync('python', ['-c', 'import pymupdf4llm; import pymupdf'], { timeout: 5000, stdio: 'ignore' });
    return null;
  } catch {
    return 'Faltan dependencias Python. Ejecutá:\n\n  pip install -r requirements.txt\n\nO manualmente:\n  pip install pymupdf pymupdf4llm';
  }
}

export async function POST(req: NextRequest) {
  let tempDir: string | null = null;

  try {
    const depsError = checkPythonDeps();
    if (depsError) {
      return NextResponse.json({ error: depsError, needsInstall: true }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No se recibió ningún archivo PDF.' }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Solo se aceptan archivos PDF.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    tempDir = await mkdtemp(join(tmpdir(), 'pymupdf4llm-'));
    const pdfPath = join(tempDir, file.name);
    await writeFile(pdfPath, buffer);

    const { stdout, stderr } = await execFileAsync('python', [
      join(SCRIPTS_DIR, 'pipeline.py'),
      pdfPath,
      '--stdout',
    ], {
      cwd: process.cwd(),
      timeout: 120000,
      maxBuffer: 50 * 1024 * 1024,
    });

    if (!stdout || stdout.trim().length === 0) {
      const reason = stderr || 'El pipeline no produjo resultado. El PDF puede estar escaneado o protegido.';
      return NextResponse.json({ error: reason }, { status: 422 });
    }

    return NextResponse.json({
      markdown: stdout,
      filename: file.name.replace(/\.pdf$/i, '.md'),
    });

  } catch (err: unknown) {
    const error = err as { stderr?: string; message?: string; code?: string };
    let message = error.stderr || error.message || 'Error desconocido al convertir el PDF.';

    if (message.includes('ModuleNotFoundError') || message.includes('No module named')) {
      message = 'Faltan dependencias Python. Ejecutá:\n\n  pip install -r requirements.txt\n\nO manualmente:\n  pip install pymupdf pymupdf4llm';
    } else if (error.code === 'ENOENT') {
      message = 'Python no está instalado o no está en el PATH. Instalalo desde https://python.org y asegurate de tener "python" en el PATH.';
    }

    return NextResponse.json({ error: message, needsInstall: message.includes('pip install') }, { status: 500 });
  } finally {
    if (tempDir) {
      rm(tempDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}
