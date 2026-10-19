"""Reproducible refinement for the supplied portrait. Usage: python scripts/refine-portrait.py SOURCE.png
Pillow / numpy / scipy are needed only to regenerate this asset, not to run the site.
The protection polygon preserves the white collar and shirt; it is specific to this supplied crop.
"""
from pathlib import Path
import sys
import numpy as np
from scipy.ndimage import binary_propagation,binary_erosion,distance_transform_edt
from PIL import Image,ImageDraw
source=Path(sys.argv[1]);rgb=np.array(Image.open(source).convert('RGB')).astype(float)
white=(rgb.min(axis=2)>200)&((rgb.max(axis=2)-rgb.min(axis=2))<27)
protection=Image.new('1',(rgb.shape[1],rgb.shape[0]));d=ImageDraw.Draw(protection)
# Coordinates refer to the supplied 775x996 original, not to a newly cropped image.
d.polygon([(290,596),(480,596),(525,676),(485,826),(450,995),(270,995),(260,726)],fill=1)
white&=~np.array(protection,dtype=bool)
seed=np.zeros(white.shape,bool);seed[0]=white[0];seed[-1]=white[-1];seed[:,0]=white[:,0];seed[:,-1]=white[:,-1]
fg=~binary_propagation(seed,mask=white);core=binary_erosion(fg,iterations=2);_,idx=distance_transform_edt(~core,return_indices=True)
nearest=rgb[idx[0],idx[1]];den=np.maximum(np.linalg.norm(255-nearest,axis=2),1)
alpha=np.where(core,1,np.where(fg,np.clip(np.linalg.norm(255-rgb,axis=2)/den,0,1),0))
clean=np.clip((rgb-(1-alpha[:,:,None])*255)/np.maximum(alpha[:,:,None],.01),0,255)
out=Image.fromarray(np.dstack([clean,alpha*255]).astype('uint8'));out=out.crop(out.getbbox())
target=Path(__file__).resolve().parents[1]/'src/assets/portrait.webp';out.save(target,'WEBP',quality=95,method=6)
print('Portrait prepared:',target.name)
