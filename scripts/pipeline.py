import subprocess
import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent


def run(pdf_path: str, output_dir: str = None) -> str | None:
    pdf = Path(pdf_path)
    if not pdf.exists():
        print(f"✗ Archivo no encontrado: {pdf}", file=sys.stderr)
        return None

    out_dir = Path(output_dir) if output_dir else pdf.parent
    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. Analizar
    result = subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "analyze_pdf.py"), str(pdf)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"✗ Error en análisis: {result.stderr}", file=sys.stderr)
        return None

    analysis = json.loads(result.stdout)

    if analysis.get("is_scanned"):
        print("⚠ PDF escaneado. Usar --ocr o ver references/troubleshooting.md", file=sys.stderr)
        return None

    # 2. Convertir
    args = [
        sys.executable,
        str(SCRIPT_DIR / "convert_law.py"),
        str(pdf),
        "-o",
        str(out_dir / (pdf.stem + ".md")),
    ]

    if analysis.get("multi_column"):
        args.append("--multi-column")

    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"✗ Error en conversión: {result.stderr}", file=sys.stderr)
        return None

    # 3. Limpiar
    md_path = str(out_dir / (pdf.stem + ".md"))
    result = subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "clean_legal_md.py"), md_path],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"✗ Error en limpieza: {result.stderr}", file=sys.stderr)
        return None

    clean_path = out_dir / (pdf.stem + "_clean.md")
    if clean_path.exists():
        return clean_path.read_text(encoding="utf-8")

    return None


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python pipeline.py <ruta.pdf> [directorio_salida] [--stdout]", file=sys.stderr)
        sys.exit(1)

    stdout_mode = "--stdout" in sys.argv
    output_dir = None

    for i, arg in enumerate(sys.argv[2:], start=2):
        if arg != "--stdout" and output_dir is None:
            output_dir = arg

    md = run(sys.argv[1], output_dir)

    if stdout_mode and md:
        print(md, end="")
    elif md:
        print(f"\n✅ Conversión exitosa ({len(md):,} caracteres)")
