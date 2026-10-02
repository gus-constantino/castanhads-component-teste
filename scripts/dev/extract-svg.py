#!/usr/bin/env python3
"""Junta SVGs exportados em pedaços pelo use_figma (linhas @@SVG\t<nome>\t<i>\t<total>\t<conteúdo>) a partir do
transcript da sessão e grava em <destino>/<nome>.svg. Uso: extract-svg.py <transcript.jsonl> <destino> [nome…]"""
import json, sys, os
src, dest, only = sys.argv[1], sys.argv[2], set(sys.argv[3:])
parts = {}
def scan(o):
    if isinstance(o, str):
        if "@@SVG\t" in o:
            for line in o.split("\n"):
                if line.startswith("@@SVG\t"):
                    p = line.split("\t", 4)
                    if len(p) == 5: parts.setdefault(p[1], {})[int(p[2])] = (int(p[3]), p[4])
    elif isinstance(o, dict): [scan(v) for v in o.values()]
    elif isinstance(o, list): [scan(v) for v in o]
for raw in open(src, encoding="utf8"):
    try: scan(json.loads(raw))
    except Exception: pass
os.makedirs(dest, exist_ok=True)
for name, ch in parts.items():
    if only and name not in only: continue
    total = next(iter(ch.values()))[0]
    if sorted(ch) != list(range(total)): print("incompleto:", name, sorted(ch), "de", total); continue
    svg = "".join(ch[i][1] for i in range(total))
    assert svg.startswith("<svg") and svg.rstrip().endswith("</svg>"), name
    open(os.path.join(dest, name + ".svg"), "w").write(svg + "\n")
    print(name, len(svg), "bytes")
