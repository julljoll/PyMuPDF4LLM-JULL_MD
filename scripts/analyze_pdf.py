import pymupdf
import sys
import json
from collections import Counter


def analyze_pdf(path):
    doc = pymupdf.open(path)
    info = {
        "pages": doc.page_count,
        "title": doc.metadata.get("title", ""),
        "has_text": False,
        "is_scanned": False,
        "multi_column": False,
        "has_tables": False,
        "avg_font_sizes": [],
        "languages": set(),
    }

    sample_pages = list(range(min(5, doc.page_count)))
    for pno in sample_pages:
        page = doc[pno]
        blocks = page.get_text("dict")["blocks"]
        text_blocks = [b for b in blocks if b["type"] == 0]

        if text_blocks:
            info["has_text"] = True

        x_positions = [b["bbox"][0] for b in text_blocks]
        if x_positions:
            x_range = max(x_positions) - min(x_positions)
            if x_range > page.rect.width * 0.3:
                info["multi_column"] = True

        raw_text = page.get_text().strip()
        if not raw_text and blocks:
            info["is_scanned"] = True

        for b in text_blocks:
            for line in b.get("lines", []):
                for span in line.get("spans", []):
                    info["avg_font_sizes"].append(round(span["size"], 1))

    if info["avg_font_sizes"]:
        top_sizes = Counter(info["avg_font_sizes"]).most_common(5)
        info["top_font_sizes"] = top_sizes

    doc.close()
    return info


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python analyze_pdf.py <ruta_al_pdf>", file=sys.stderr)
        sys.exit(1)
    result = analyze_pdf(sys.argv[1])
    print(json.dumps(result, indent=2, default=list))
