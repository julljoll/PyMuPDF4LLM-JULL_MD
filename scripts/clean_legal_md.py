import re
import sys
from pathlib import Path
from collections import Counter
from datetime import date

PAGE_NUMBER = re.compile(r"^\s*[-–—]?\s*\d+\s*[-–—]?\s*$", re.MULTILINE)

TOC_DOTS = re.compile(r"^.+\.{3,}\s*\d+\s*$", re.MULTILINE)

WORD_HYPHEN = re.compile(r"(\w{3,})-\n(\w{3,})", re.UNICODE)

MULTI_SPACE = re.compile(r"[ \t]{2,}")

MULTI_BLANK = re.compile(r"\n{3,}")

ARTICULO = re.compile(
    r"^(ARTÍCULO|Artículo|Art\.?)\s*(\d+[\.\-°]?)\s*[\.–\-]?\s*",
    re.MULTILINE | re.IGNORECASE,
)

TITULO = re.compile(
    r"^(TÍTULO|CAPÍTULO|SECCIÓN|LIBRO|PARTE)\s+(I{1,3}V?|VI{0,3}|IX|X{1,3}|[IVXLCDM]+|\d+)\b",
    re.MULTILINE | re.IGNORECASE,
)

FOOTNOTE_REF = re.compile(r"(\w)\^(\d+)", re.UNICODE)


def remove_repeated_lines(text: str, min_repeats: int = 3) -> str:
    lines = text.split("\n")
    counts = Counter(l.strip() for l in lines if len(l.strip()) > 5)
    repeated = {l for l, c in counts.items() if c >= min_repeats}
    return "\n".join(l for l in lines if l.strip() not in repeated)


def clean_legal_markdown(text: str) -> str:
    text = PAGE_NUMBER.sub("", text)
    text = remove_repeated_lines(text)
    text = WORD_HYPHEN.sub(r"\1\2", text)
    text = MULTI_SPACE.sub(" ", text)
    text = TOC_DOTS.sub("", text)
    text = ARTICULO.sub(r"### Artículo \2 — ", text)

    def fmt_titulo(m):
        kw = m.group(1).capitalize()
        num = m.group(2)
        level = "# " if kw in ("Título", "Libro", "Parte") else "## "
        return f"\n{level}{kw} {num}"

    text = TITULO.sub(fmt_titulo, text)
    text = FOOTNOTE_REF.sub(r"\1[^\2]", text)
    text = MULTI_BLANK.sub("\n\n", text)
    text = text.strip()
    return text


def add_frontmatter(text: str, source_path: str) -> str:
    fname = Path(source_path).stem
    fm = f"""---
title: "{fname}"
source: "{Path(source_path).name}"
converted: "{date.today().isoformat()}"
tool: "pymupdf4llm"
---

"""
    return fm + text


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python clean_legal_md.py <ruta_al_md> [--no-frontmatter]", file=sys.stderr)
        sys.exit(1)

    input_path = sys.argv[1]
    text = Path(input_path).read_text(encoding="utf-8")
    text = clean_legal_markdown(text)

    if "--no-frontmatter" not in sys.argv:
        text = add_frontmatter(text, input_path)

    out = Path(input_path).with_stem(Path(input_path).stem + "_clean")
    out.write_text(text, encoding="utf-8")
    print(f"✓ Limpiado: {out}")
