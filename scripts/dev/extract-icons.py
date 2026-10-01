#!/usr/bin/env python3
"""Extrai os ícones exportados do [Caju] Icons (vi4CKuAe98zydoLAQXoibU) a partir das linhas @@ICON que o
use_figma devolveu nesta sessão (gravadas no transcript .jsonl) e grava:
  assets/icons/<bucket>/<nome>.svg   um bucket por frame de categoria do Figma
  assets/icons/catalog.json          ordem do Figma, nome da categoria e palavras-chave (description do componente)
Uso: extract-icons.py <transcript.jsonl> [--write]
Linha: @@ICON \t <categoria> \t <nome> \t <description> \t <markup interno do svg, coordenadas com 2 casas>"""
import json, sys, re, os, unicodedata
src, write = sys.argv[1], "--write" in sys.argv
icons = {}
def scan(o):
    if isinstance(o, str):
        if "@@ICON\t" in o:
            for line in o.split("\n"):
                if line.startswith("@@ICON\t"):
                    p = line.split("\t")
                    if len(p) == 5 and (p[1], p[2]) not in icons: icons[(p[1], p[2])] = (p[3], p[4])
    elif isinstance(o, dict): [scan(v) for v in o.values()]
    elif isinstance(o, list): [scan(v) for v in o]
for raw in open(src, encoding="utf8"):
    try: scan(json.loads(raw))
    except Exception: pass
def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")
buckets = {}
for (cat, name), (desc, inner) in icons.items():
    b = buckets.setdefault(slug(cat), {"id": slug(cat), "name": cat.strip("[]"), "deprecated": cat == "[Deprecated]", "icons": []})
    fname = slug(name)
    kw = [k.strip() for k in re.split(r"[;,]", desc) if k.strip()]
    b["icons"].append({"name": fname, "figma": name, "keywords": kw})
    if write:
        d = os.path.join("assets/icons", b["id"]); os.makedirs(d, exist_ok=True)
        open(os.path.join(d, fname + ".svg"), "w").write(
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1A1A1A">' + inner + "</svg>\n")
if write:
    json.dump({"_source": "[Caju] Icons · vi4CKuAe98zydoLAQXoibU · página UI & Caju (0:1)", "buckets": list(buckets.values())},
              open("assets/icons/catalog.json", "w"), ensure_ascii=False, indent=1)
print(len(icons), "ícones:", {k: len(v["icons"]) for k, v in buckets.items()})
