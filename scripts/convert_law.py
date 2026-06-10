import pymupdf4llm
import pymupdf
import sys
import os
import re
import argparse
from pathlib import Path


def convert_law_pdf(
    input_path: str,
    output_path: str = None,
    pages: list = None,
    multi_column: bool = False,
    embed_images: bool = False,
    table_strategy: str = "lines_strict",
    margins: tuple = (36, 54, 36, 54),
    dpi: int = 150,
    page_chunks: bool = False,
) -> str:
    if multi_column:
        margins = (72, 54, 72, 54)

    md = pymupdf4llm.to_markdown(
        doc=input_path,
        pages=pages,
        hdr_info=None,
        write_images=False,
        embed_images=embed_images,
        ignore_images=not embed_images,
        ignore_graphics=True,
        detect_bg_color=True,
        force_text=True,
        page_chunks=page_chunks,
        page_separators=True,
        margins=margins,
        dpi=dpi,
        table_strategy=table_strategy,
        fontsize_limit=3,
        ignore_code=True,
        show_progress=True,
        ignore_alpha=True,
    )

    if page_chunks and isinstance(md, list):
        md = "\n\n---\n\n".join(chunk.get("text", "") for chunk in md)

    if output_path is None:
        output_path = Path(input_path).with_suffix(".md")

    Path(output_path).write_text(md, encoding="utf-8")
    print(f"✓ Guardado: {output_path} ({len(md):,} caracteres)")
    return md


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convierte PDF de ley a Markdown")
    parser.add_argument("input", help="Ruta al PDF de entrada")
    parser.add_argument("-o", "--output", help="Ruta de salida .md")
    parser.add_argument("--pages", help="Páginas separadas por coma (ej: 0,1,5-10)")
    parser.add_argument("--multi-column", action="store_true")
    parser.add_argument("--embed-images", action="store_true")
    parser.add_argument(
        "--table-strategy",
        default="lines_strict",
        choices=["lines_strict", "lines", "explicit_only", "text_as_image"],
    )
    args = parser.parse_args()

    pages = None
    if args.pages:
        pages = []
        for part in args.pages.split(","):
            if "-" in part:
                a, b = part.split("-")
                pages.extend(range(int(a), int(b) + 1))
            else:
                pages.append(int(part))

    convert_law_pdf(
        args.input,
        args.output,
        pages=pages,
        multi_column=args.multi_column,
        embed_images=args.embed_images,
        table_strategy=args.table_strategy,
    )
