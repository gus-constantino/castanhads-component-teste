#!/usr/bin/env python3
"""Importa o export em SVG do [Caju] Illustrations (9l54k2iyKGMaiIbsGGmEiM) para assets/illustrations/.

Uso: import-illustrations.py <pasta do export> <listing.tsv>
  pasta do export  o que o Figma gera em "Export → SVG" das páginas Caju UI, Hero e Cartões
                   (nome com "/" vira subpasta; nome repetido ganha -1, -2…)
  listing.tsv      (scripts/dev/illustrations-listing.tsv, de 02/10) categoria \t node id \t nome no Figma \t description, na ordem da página Caju UI
                   (sai de um use_figma que percorre os frames de categoria; receita em ARCHITECTURE §8)

Saída: assets/illustrations/<categoria>/<nome>.svg + assets/illustrations/catalog.json (ordem do Figma, nome
original, node id, description). Depois: node scripts/build-assets.js.
"""
import json, os, re, shutil, sys, unicodedata
import xml.etree.ElementTree as ET

export, listing = sys.argv[1], sys.argv[2]
ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
DEST = os.path.join(ROOT, "assets", "illustrations")

def slug(s):
    s = unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

# Nomes repetidos: o export do Figma numera na ordem do documento; conferido pelo 1º traço de cada SVG (02/10)
DUP = { "4087:4528": "celular-cartao-1", "4087:4526": "cracha-1", "4085:4129": "sonia-1",
        "4178:602": "moeda-verde-pilha-2-1", "4178:607": "moeda-verde-pilha-2-2" }
# Página Hero (frames Sponsor, Employee e Hub de Benefícios) — tamanhos diferentes das 200×200
HERO = [
    ("Hero · Sponsor", "sponsor", ["cartao-corporativo", "cartao-despesas", "cartao-fisico", "empacotamento-beneficios", "login", "recuperacao-senha"], "673×768"),
    ("Hero · Employee", "employee", ["login", "splash-screen"], "741×768"),
    ("Hero · Hub de Benefícios", "", ["plano-saude", "alimentacao", "educacao", "seguros-previdencia", "familia", "descontos", "plano-odonto",
        "mobilidade", "cajuzinho", "familia-2", "fitness", "cultura", "outros", "home-office", "lazer"], "249×132"),
]

buckets, order = {}, []
def add(bucket_name, item):
    bid = slug(bucket_name)
    if bid not in buckets:
        buckets[bid] = { "id": bid, "name": bucket_name, "items": [] }; order.append(bid)
    names = { i["name"] for i in buckets[bid]["items"] }
    base = item["name"]; n = base; k = 1
    while n in names: n = base + "-" + str(k); k += 1  # mesmo nome na mesma categoria (ex.: moeda-verde-pilha-2 ×3)
    item["name"] = n
    buckets[bid]["items"].append(item)

for line in open(listing, encoding="utf8"):
    line = line.rstrip("\n")
    if not line: continue
    cat, nid, figma, desc = (line.split("\t") + [""])[:4]
    rel = figma + ".svg" if "/" in figma else DUP.get(nid, figma) + ".svg"
    add(cat, { "name": figma.split("/")[-1], "figma": figma, "id": nid, "description": desc.strip(), "src": os.path.join(export, "Caju UI", rel), "size": "200×200" })
for cat, folder, names, size in HERO:
    for n in names: add(cat, { "name": n, "figma": (folder + "/" if folder else "") + n, "description": "", "src": os.path.join(export, folder, n + ".svg"), "size": size })

# Arquivos: limpa as pastas de categoria antigas e copia validando o SVG
for d in os.listdir(DEST):
    p = os.path.join(DEST, d)
    if os.path.isdir(p) and not d.startswith("."): shutil.rmtree(p)
    elif d.endswith(".svg"): os.remove(p)  # soltas na raiz (sino, empty-state) passam a viver na categoria
missing = []
for bid in order:
    os.makedirs(os.path.join(DEST, bid), exist_ok=True)
    for it in buckets[bid]["items"]:
        src = it.pop("src")
        if not os.path.exists(src): missing.append(src); continue
        ET.parse(src)
        shutil.copyfile(src, os.path.join(DEST, bid, it["name"] + ".svg"))
cat = { "_source": "[Caju] Illustrations · 9l54k2iyKGMaiIbsGGmEiM · páginas Caju UI e Hero (Cartões = componente Caju Card)",
        "buckets": [buckets[b] for b in order] }
json.dump(cat, open(os.path.join(DEST, "catalog.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
print(sum(len(buckets[b]["items"]) for b in order), "ilustrações em", len(order), "categorias")
for b in order: print(" ", b, len(buckets[b]["items"]))
if missing: print("FALTANDO:", *missing, sep="\n  "); sys.exit(1)
