"""Usage: python scripts/prepare_assets.py /path/to/upload
Requires Pillow, numpy, scipy, PyMuPDF. Source documents are unchanged."""
from pathlib import Path
import sys, shutil
import numpy as np
from scipy.ndimage import binary_propagation, distance_transform_edt, gaussian_filter
from PIL import Image, ImageOps
import pymupdf
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(sys.argv[1])
ASSETS=ROOT/'src/assets'
DOCS=ROOT/'public/documents'
for directory in [ASSETS/'certs', ASSETS/'logos', DOCS]: directory.mkdir(parents=True,exist_ok=True)
def webp(source,target,maxsize=(1600,1600)):
    im=Image.open(SOURCE/source); im=ImageOps.exif_transpose(im); im.thumbnail(maxsize)
    im.save(ASSETS/target,'WEBP',quality=88,method=6)
# Only border-connected white pixels are removed; the white shirt is preserved.
im=Image.open(SOURCE/'profil(1).png').convert('RGBA')
a=np.array(im); rgb=a[:,:,:3].astype(float); white=(rgb.min(axis=2)>228)&((rgb.max(axis=2)-rgb.min(axis=2))<24)
seed=np.zeros(white.shape,bool); seed[0]=white[0];seed[-1]=white[-1];seed[:,0]=white[:,0];seed[:,-1]=white[:,-1]
bg=binary_propagation(seed,mask=white); alpha=255*(1-gaussian_filter(bg.astype(float),0.5));a[:,:,3]=alpha.astype('uint8')
im=Image.fromarray(a);bbox=im.getbbox();im=im.crop(bbox);im.save(ASSETS/'portrait.webp','WEBP',quality=95,method=6)
webp('ransomware (4)(1).png','ransomware.webp',(1200,1500))
webp('ChatGPT Image 15 sept. 2026, 17_34_02(1).png','ransomware-secondary.webp')
for source,target in [('HESTIM(2).png','hestim'),('2560px-Insa-hautsdefrance-logo(2).png','insa'),('logo_inp-5000-5000.webp','inp'),('1200px-Logo_bnetd_transparence.webp','bnetd'),('icon.webp','cwl')]:webp(source,'logos/'+target+'.webp',(500,500))

def remove_connected_white(path):
    """Remove near-white background connected to image edges, then crop losslessly."""
    im=Image.open(path).convert('RGBA')
    pixels=np.array(im)
    rgb=pixels[:,:,:3].astype(np.int16)
    near_white=(rgb.min(axis=2)>=232)&((rgb.max(axis=2)-rgb.min(axis=2))<=28)
    seed=np.zeros(near_white.shape,bool)
    seed[0]=near_white[0]; seed[-1]=near_white[-1]
    seed[:,0]=near_white[:,0]; seed[:,-1]=near_white[:,-1]
    background=binary_propagation(seed,mask=near_white)
    # Soft alpha on the fill edge prevents a white fringe on dark themes.
    alpha=255*(1-gaussian_filter(background.astype(float),0.65))
    nearest=distance_transform_edt(background,return_distances=False,return_indices=True)
    pixels[:,:,:3][background]=pixels[:,:,:3][nearest[0][background],nearest[1][background]]
    pixels[:,:,3]=alpha.astype('uint8')
    im=Image.fromarray(pixels,'RGBA')
    bbox=im.getbbox()
    if bbox: im=im.crop(bbox)
    im.save(path,'WEBP',lossless=True,method=6)

for logo in ('bnetd.webp','electrocenter.webp'):
    path=ASSETS/'logos'/logo
    if path.exists(): remove_connected_white(path)
certs=[('Web RTA.pdf','web-rta'),('BTF.pdf','btf'),('C3SA.pdf','c3sa'),('Google Cybersecurity.pdf','google'),('EthicalHacker.pdf','cisco'),('Fortinet Certified Fundamentals in Cybersecurity.pdf','fortinet'),('CORE_Hackviser.pdf','core'),('Red Hat System Administration I (RH134 - RHA) - Ver. 10(1).pdf','redhat-i'),('Red Hat System Administration II (RH134 - RHA) - Ver. 10.pdf','redhat-ii'),('BD NoSQL.pdf','nosql'),('Cybercriminalité(1).pdf','cybercrime')]
for source,slug in certs:
    d=pymupdf.open(SOURCE/source); pix=d[0].get_pixmap(matrix=pymupdf.Matrix(200/72,200/72),alpha=False)
    im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples); im.thumbnail((2400,2400));im.save(ASSETS/'certs'/f'{slug}-full.webp','WEBP',quality=94,method=6)
    im.thumbnail((1000,1000));im.save(ASSETS/'certs'/f'{slug}.webp','WEBP',quality=88,method=6)
    shutil.copy2(SOURCE/source,DOCS/f'{slug}.pdf')
shutil.copy2(SOURCE/'Cv_ cyybersécurité.pdf',DOCS/'Pele-Abou-Ouattara-CV.pdf')
print('Assets prepared.')
