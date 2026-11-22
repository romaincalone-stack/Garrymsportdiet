# Fait estimer les plats de Nutrition5k par un modèle de vision ouvert, sur processeur, avec les consignes du site.
# Usage : python3 tools/eval-assiette/run_local.py <qwen|smol> <dossier de travail> [n]
import json, os, re, sys, time, torch
from transformers import AutoProcessor, AutoModelForImageTextToText

which, base = sys.argv[1], sys.argv[2]
limit = int(sys.argv[3]) if len(sys.argv) > 3 else 99
MODELS = {"qwen": "Qwen/Qwen2.5-VL-3B-Instruct", "smol": "HuggingFaceTB/SmolVLM-500M-Instruct"}
mid = MODELS[which]

js = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "functions", "api", "analyse.js")).read()
SYSTEM = re.search(r"export const SYSTEM = `(.*?)`;", js, re.S).group(1)
INSTR = ("Aucune précision donnée. Réponds uniquement par un objet JSON, sans texte autour, de la forme : "
         '{"est_un_repas": true, "aliments": [{"nom": "Riz blanc, cuit", "recherche": "riz blanc cuit", "grammes": 150, '
         '"grammes_min": 120, "grammes_max": 190, "visible": true, "confiance": "moyenne", "kcal_estime": 210}], "remarque": ""}')

torch.set_num_threads(4)
proc = AutoProcessor.from_pretrained(mid)
model = AutoModelForImageTextToText.from_pretrained(mid, dtype=torch.bfloat16).eval()

ids = [l.strip() for l in open(f"{base}/selection.txt") if l.strip()][:limit]
out = {"modele": mid, "plats": {}, "brut": {}, "secondes": {}}
for d in ids:
    msgs = [{"role": "system", "content": [{"type": "text", "text": SYSTEM}]},
            {"role": "user", "content": [{"type": "image", "path": f"{base}/img/{d}.png"}, {"type": "text", "text": INSTR}]}]
    inputs = proc.apply_chat_template(msgs, add_generation_prompt=True, tokenize=True, return_dict=True, return_tensors="pt")
    t0 = time.time()
    with torch.no_grad():
        gen = model.generate(**inputs, max_new_tokens=700, do_sample=False)
    text = proc.batch_decode(gen[:, inputs["input_ids"].shape[1]:], skip_special_tokens=True)[0]
    out["secondes"][d] = round(time.time() - t0, 1)
    out["brut"][d] = text
    try:
        j = json.loads(text[text.index("{"): text.rindex("}") + 1])
        out["plats"][d] = [[a.get("nom", ""), a.get("recherche", a.get("nom", "")), float(a.get("grammes", 0) or 0), bool(a.get("visible", True))] for a in j.get("aliments", [])]
    except Exception as e:
        out["plats"][d] = None
    print(d, out["secondes"][d], "s", "OK" if out["plats"][d] is not None else "JSON illisible", flush=True)
    json.dump(out, open(f"{base}/pred-{which}.json", "w"), ensure_ascii=False, indent=1)
