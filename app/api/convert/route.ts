import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

type MarkItDownInstance = {
  convert(path: string): Promise<{ markdown: string }>;
};

let markitdown: MarkItDownInstance | null = null;

async function getConverter(): Promise<MarkItDownInstance> {
  if (!markitdown) {
    const mod = await import("markitdown-ts");
    markitdown = new mod.MarkItDown() as MarkItDownInstance;
  }
  return markitdown;
}

function cleanLegalMarkdown(text: string): string {
  let result = text;

  result = result.replace(/^\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*$/gm, "");

  result = result.replace(/(\w{3,})-\n(\w{3,})/gu, "$1$2");

  result = result.replace(
    /^(ARTÍCULO|Artículo|Art\.?)\s*(\d+[\.\-°]?)\s*[\.–\-]?\s*/gim,
    "\n### Artículo $2 — "
  );

  result = result.replace(
    /^(TÍTULO|CAPÍTULO|SECCIÓN|LIBRO|PARTE)\s+([IVXLCDM]+|\d+)\b/gim,
    (_, kw: string, num: string) => {
      const k = kw[0].toUpperCase() + kw.slice(1).toLowerCase();
      const level = ["Título", "Libro", "Parte"].includes(k) ? "#" : "##";
      return `\n${level} ${k} ${num}`;
    }
  );

  result = result.replace(/^.+\.{4,}\s*\d+\s*$/gm, "");

  result = result.replace(/[ \t]{2,}/g, " ");

  result = result.replace(/\n{3,}/g, "\n\n");

  const date = new Date().toISOString().split("T")[0];
  const frontmatter = `---\nconverted: "${date}"\ntool: "markitdown-ts"\n---\n\n`;

  return frontmatter + result.trim();
}

export async function POST(req: NextRequest) {
  let tempPath: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Solo se aceptan archivos PDF" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "El archivo excede el límite de 50 MB" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tmpDir = join(tmpdir(), "ley-a-md");
    await mkdir(tmpDir, { recursive: true });
    tempPath = join(tmpDir, `${randomUUID()}.pdf`);
    await writeFile(tempPath, buffer);

    const converter = await getConverter();
    const result = await converter.convert(tempPath);
    const markdown = result?.markdown ?? "";

    if (!markdown.trim()) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF. Puede ser un documento escaneado." },
        { status: 422 }
      );
    }

    const cleaned = cleanLegalMarkdown(markdown);

    return NextResponse.json({
      markdown: cleaned,
      chars: cleaned.length,
      words: cleaned.split(/\s+/).length,
    });

  } catch (err) {
    console.error("[/api/convert] Error:", err);
    return NextResponse.json(
      { error: "Error interno durante la conversión" },
      { status: 500 }
    );
  } finally {
    if (tempPath) {
      await unlink(tempPath).catch(() => {});
    }
  }
}
