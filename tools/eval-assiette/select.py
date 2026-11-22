# Tire N plats au hasard (graine 2026) dans le lot de test RGB de Nutrition5k et télécharge leurs photos du dessus.
# Usage : python3 tools/eval-assiette/select.py <dossier de travail> [N=12]
import csv, os, random, subprocess, sys, urllib.request
from PIL import Image

base, n = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 12
URL = "https://storage.googleapis.com/nutrition5k_dataset/nutrition5k_dataset"
os.makedirs(f"{base}/img", exist_ok=True)
for f, u in [("dish_metadata_cafe1.csv", "metadata/dish_metadata_cafe1.csv"), ("rgb_test_ids.txt", "dish_ids/splits/rgb_test_ids.txt")]:
    if not os.path.exists(f"{base}/{f}"):
        urllib.request.urlretrieve(f"{URL}/{u}", f"{base}/{f}")
ids = [l.strip() for l in open(f"{base}/rgb_test_ids.txt") if l.strip()]
meta = {r[0] for r in csv.reader(open(f"{base}/dish_metadata_cafe1.csv"))}
random.seed(2026)
ok = []
for d in random.sample(sorted(i for i in ids if i in meta), 60):
    if len(ok) == n: break
    path = f"{base}/img/{d}.png"
    if not os.path.exists(path):
        subprocess.run(["curl", "-sS", "-m", "60", "-o", path, f"{URL}/imagery/realsense_overhead/{d}/rgb.png"])
    try: Image.open(path).verify(); ok.append(d)
    except Exception:
        if os.path.exists(path): os.remove(path)
open(f"{base}/selection.txt", "w").write("\n".join(ok) + "\n")
print(len(ok), "plats prêts dans", base)
