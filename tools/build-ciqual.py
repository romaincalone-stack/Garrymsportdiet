# Génère site/data/ciqual-2020.js (window.CIQUAL) à partir du fichier Excel officiel de la table Ciqual de l'Anses.
# Usage : pip install xlrd ; python3 tools/build-ciqual.py "Table Ciqual 2020_FR.xls" site/data/ciqual-2020.js
import sys, json, xlrd, re
b = xlrd.open_workbook(sys.argv[1]); sh = b.sheet_by_index(0)
hdr = [str(c.value) for c in sh.row(0)]
col = lambda p: next(i for i, h in enumerate(hdr) if h.startswith(p))
C = dict(code=col("alim_code"), nom=col("alim_nom_fr"), grp=col("alim_ssgrp_nom_fr"), kcal=col("Energie, Règlement UE N° 1169/2011 (kcal"),
         prot=col("Protéines, N x facteur de Jones"), gluc=col("Glucides"), lip=col("Lipides"), suc=col("Sucres"), fib=col("Fibres alimentaires"), sel=col("Sel chlorure de sodium"))
def num(v):
    v = str(v).strip().replace(",", ".")
    if v in ("", "-"): return None
    if v.lower() == "traces" or v.startswith("<"): return 0
    try: return round(float(v), 1)
    except ValueError: return None
KJONES = col("Energie, N x facteur Jones, avec fibres  (kcal")
rows = []
for r in range(1, sh.nrows):
    row = sh.row(r)
    code = int(float(row[C["code"]].value)); nom = str(row[C["nom"]].value).strip()
    vals = [num(row[C[k]].value) for k in ("kcal", "prot", "gluc", "lip", "suc", "fib", "sel")]
    if vals[0] is None: vals[0] = num(row[KJONES].value)  # énergie « N x facteur Jones » quand l'énergie UE manque
    calc = 0
    if vals[0] is None and None not in vals[1:4]:  # énergie absente : calcul du règlement UE 1169/2011 (4 kcal/g protéines et glucides, 9 lipides, 2 fibres)
        vals[0] = round(4 * vals[1] + 4 * vals[2] + 9 * vals[3] + 2 * (vals[5] or 0), 1); calc = 1
    if vals[0] is None: continue
    rows.append([code, nom, str(row[C["grp"]].value).strip()] + vals + [calc])
data = {"source": "Table de composition nutritionnelle des aliments Ciqual 2020, Anses (Licence Ouverte Etalab 2.0)",
        "cols": ["code", "nom", "groupe", "kcal", "proteines", "glucides", "lipides", "sucres", "fibres", "sel", "energie_calculee"], "aliments": rows}
with open(sys.argv[2], "w") as f:
    f.write("/* " + data["source"] + ". Colonnes : " + ", ".join(data["cols"]) + " (pour 100 g). Énergie calculée (dernière colonne = 1) quand la table ne la donne pas : règlement UE 1169/2011. Généré par tools/build-ciqual.py. */\n")
    f.write("window.CIQUAL = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
print(len(rows), "aliments")
for q in ["Pomme, pulpe et peau, crue", "Riz blanc, cuit", "Huile d'olive vierge extra", "Oeuf, cru", "Pâtes sèches standard, cuites", "Banane, pulpe, crue", "Poulet, filet, sans peau, cuit"]:
    m = [x for x in rows if x[1].lower().startswith(q.lower()[:18])][:2]
    print(q, "->", m)
