"""Import the owner's October 16 CV and media without altering their content.
Usage: python scripts/import-current-media.py /path/to/upload
Dependencies: Pillow, NumPy. Optional helper; not needed to install or run the site.
"""
from pathlib import Path
import sys,shutil
import numpy as np
from PIL import Image,ImageOps
root=Path(__file__).resolve().parents[1];source=Path(sys.argv[1]);assets=root/'src/assets'
media=[('Portrait cinématographique en clair-obscur(1).png','hero-source.webp',(1586,992)),('Portrait futuriste en dématérialisation numérique(1).png','portrait-secondary.webp',(1672,941)),("Capture d'écran 2026-10-15 151041.png",'veritas-dashboard.webp',(1638,801)),("Capture d'écran 2026-10-07 164338.png",'vulnerability-dashboard.webp',(1886,815))]
for name,target,size in media:
 image=ImageOps.exif_transpose(Image.open(source/name));image.thumbnail(size);image.save(assets/target,'WEBP',quality=94,method=6)
for name,slug in [('Design sans titre (4).png','electrocenter'),('HESTIM(3).png','hestim'),('2560px-Insa-hautsdefrance-logo(3).png','insa')]:
 image=Image.open(source/name).convert('RGBA');a=np.array(image);visible=(a[:,:,3]>10)&(a[:,:,:3].min(axis=2)<232);ys,xs=np.where(visible)
 if len(xs):image=image.crop((max(0,xs.min()-10),max(0,ys.min()-10),min(image.width,xs.max()+11),min(image.height,ys.max()+11)))
 image.thumbnail((800,400));image.save(assets/'logos'/f'{slug}.webp','WEBP',quality=97,method=6)
shutil.copy2(source/'Cv_ cyybersécurité(1).pdf',root/'public/documents/Pele-Abou-Ouattara-CV.pdf')
print('Updated CV and supplied media imported. No distortion is baked into the hero source.')
