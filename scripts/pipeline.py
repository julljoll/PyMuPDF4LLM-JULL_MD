import subprocess
import sys
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent


def run(pdf_path: str, output_dir: str = None):
    pdf = Path(pdf_path)
    if not pdf.exists():
        print(f"✗ Archivo no encontrado: {pdf}", file=sys.stderr)
        sys.exit(1)

    out_dir = Path(output_dir) if output_dir else pdf.parent
    out_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("PyMuPDF4LLM Pipeline — PDF a Markdown")
    print("=" * 50)

    # 1. Analizar
    print("\n📊 Analizando PDF...")
    result = subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "analyze_pdf.py"), str(pdf)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"✗ Error en análisis: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    analysis = json.loads(result.stdout)
    print(json.dumps(analysis, indent=2, default=list))

    # 2. Convertir
    print("\n🔄 Convirtiendo PDF a Markdown...")
    args = [
        sys.executable,
        str(SCRIPT_DIR / "convert_law.py"),
        str(pdf),
        "-o",
        str(out_dir / (pdf.stem + ".md")),
    ]

    if analysis.get("multi_column"):
        args.append("--multi-column")
        print("  → Multi-columna detectada, ajustando márgenes")

    if analysis.get("is_scanned"):
        print("  ⚠ PDF escaneado detectado.")
        print("  → Usar OCR: pymupdf4llm.to_markdown(doc='...', ocr=True)")
        print("  → Ver RAG/pdf-ley-a-md/references/troubleshooting.md")
        return

    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"✗ Error en conversión: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    print(result.stdout)

    # 3. Limpiar
    print("\n🧹 Limpiando Markdown...")
    md_path = str(out_dir / (pdf.stem + ".md"))
    result = subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "clean_legal_md.py"), md_path],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"✗ Error en limpieza: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    print(result.stdout)

    # 4. Resumen
    clean_path = out_dir / (pdf.stem + "_clean.md")
    if clean_path.exists():
        chars = len(clean_path.read_text(encoding="utf-8"))
        lines = clean_path.read_text(encoding="utf-8").count("\n") + 1
        print(f"\n✅ Pipeline completado.")
        print(f"   Archivo final: {clean_path}")
        print(f"   Caracteres: {chars:,}")
        print(f"   Líneas: {lines:,}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python pipeline.py <ruta.pdf> [directorio_salida]", file=sys.stderr)
        sys.exit(1)
    run(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
