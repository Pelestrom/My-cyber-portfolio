import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { heroTools } from '../data/tools';
import { refinement } from '../data/refinement';
import { ToolMark } from './ToolMark';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLocale } from '../lib/Locale';
import { useTheme } from '../lib/Theme';
import { coverCrop, toolLayout } from '../lib/heroGeometry';
interface Fragment { sx:number; sy:number; sw:number; sh:number; x:number; y:number; vx:number; vy:number; offsetX:number; offsetY:number; phase:number; }
export function PortraitCanvas(){
 const canvas=useRef<HTMLCanvasElement>(null),wrapper=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();const {theme}=useTheme();const {t,lang}=useLocale();const [ready,setReady]=useState(false);
 const [positions,setPositions]=useState(()=>toolLayout(560,640,heroTools.length,false));
 useEffect(()=>{const host=wrapper.current;if(!host)return;
  const resize=()=>{if(host.clientWidth>0&&host.clientHeight>0)setPositions(toolLayout(host.clientWidth,host.clientHeight,heroTools.length,window.innerWidth<=680));};resize();
  const observer=new ResizeObserver(resize);observer.observe(host);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(reduced)return;const el=canvas.current,host=wrapper.current;if(!el||!host)return;const ctx=el.getContext('2d');if(!ctx)return;
  let frame=0,visible=true,disposed=false,w=560,h=640,time=0,last=0;let mouse={x:-1000,y:-1000};let parts:Fragment[]=[];
  const image=new Image();image.decoding='async';const tokens=getComputedStyle(document.documentElement);const red=tokens.getPropertyValue('--hero-red').trim(),cyan=tokens.getPropertyValue('--hero-cyan').trim();
  let crop=coverCrop(profile.portraitWidth,profile.portraitHeight,w,h);
  function resize(){
   w=Math.max(1,host!.clientWidth||560);h=Math.max(1,host!.clientHeight||640);const dpr=Math.min(window.devicePixelRatio||1,2);
   el!.width=w*dpr;el!.height=h*dpr;ctx!.setTransform(dpr,0,0,dpr,0,0);crop=coverCrop(image.width,image.height,w,h);
   let seed=641;const rand=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
   const count=window.innerWidth<=680?45:100;
   parts=Array.from({length:count},()=>{const sx=.56+rand()*.36,sy=.08+rand()*.85;return {sx:crop.x+sx*crop.width,sy:crop.y+sy*crop.height,sw:crop.width*(.02+rand()*.13),sh:crop.height*(.003+rand()*.016),x:w*(sx+.02+rand()*.06),y:h*sy,vx:0,vy:0,offsetX:0,offsetY:0,phase:rand()*6.28};});
  }
  function draw(now:number){
   if(disposed)return;const delta=Math.min((now-(last||now))/16.67,2);last=now;time+=.012*delta;ctx!.clearRect(0,0,w,h);
   const scroll=Math.max(0,Math.min(-host!.getBoundingClientRect().top/h,1)),disruption=1-scroll*.55;
   // The left side stays intact. Irregular row clipping peels off the right half of the subject.
   ctx!.save();ctx!.beginPath();const rows=85;
   for(let i=0;i<rows;i++){const edge=w*(.64+Math.sin(i*1.67+Math.sin(time*.5))*.045*disruption+scroll*.20);ctx!.rect(0,i*h/rows,edge,h/rows+1);}
   ctx!.clip();ctx!.drawImage(image,crop.x,crop.y,crop.width,crop.height,0,0,w,h);ctx!.restore();
   for(const p of parts){
    const x=p.x+Math.sin(time+p.phase)*5,y=p.y+Math.cos(time*.7+p.phase)*3,dx=x+p.offsetX-mouse.x,dy=y+p.offsetY-mouse.y,dist=Math.hypot(dx,dy);
    if(dist<110){p.vx+=dx/(dist||1)*(1-dist/110)*1.6;p.vy+=dy/(dist||1)*(1-dist/110)*1.6;}
    p.vx=(p.vx-p.offsetX*.025)*.9;p.vy=(p.vy-p.offsetY*.025)*.9;p.offsetX+=p.vx*delta;p.offsetY+=p.vy*delta;
    const sourceWidth=Math.min(p.sw,image.width-p.sx),sourceHeight=Math.min(p.sh,image.height-p.sy),fw=sourceWidth*w/crop.width,fh=sourceHeight*h/crop.height;
    ctx!.globalAlpha=(.62+Math.sin(time+p.phase)*.23)*disruption;
    ctx!.drawImage(image,p.sx,p.sy,sourceWidth,sourceHeight,x+p.offsetX,y+p.offsetY,fw,fh);
    ctx!.globalAlpha=.2*disruption;ctx!.fillStyle=p.phase>3?red:cyan;ctx!.fillRect(x+p.offsetX+3,y+p.offsetY,fw+12,Math.max(1,fh*.33));
   }
   ctx!.globalAlpha=1;frame=0;if(visible&&!document.hidden)frame=requestAnimationFrame(draw);
  }
  const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;};const resume=()=>{if(!frame&&visible&&!document.hidden&&image.naturalWidth)frame=requestAnimationFrame(draw);};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visible?resume():stop();},{threshold:.01});observer.observe(host);
  const size=new ResizeObserver(()=>{if(image.naturalWidth){resize();resume();}});size.observe(host);
  function move(e:PointerEvent){if(e.pointerType!=='mouse')return;const rect=host!.getBoundingClientRect();mouse={x:e.clientX-rect.left,y:e.clientY-rect.top};}
  function leave(){mouse={x:-1000,y:-1000};}function visibility(){document.hidden?stop():resume();}
  host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);
  image.onload=()=>{if(disposed)return;resize();setReady(true);resume();};image.onerror=()=>{if(!disposed)setReady(false);};image.src=profile.portrait;
  return()=>{disposed=true;stop();observer.disconnect();size.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);};
 },[reduced,theme]);
 return <div className={`portrait-art ${ready&&!reduced?'canvas-ready':''}`} ref={wrapper}>
  <img className="portrait-fallback" src={profile.portrait} width={profile.portraitWidth} height={profile.portraitHeight} alt={profile.name} loading="eager"/>
  <canvas ref={canvas} aria-hidden="true"/><div className="portrait-scan" aria-hidden="true"/>
  <div className="hero-tools" aria-label={refinement[lang].cvTools}>{heroTools.slice(0,positions.length).map((tool,i)=><span key={tool.id} className="fragment-tool" style={{left:positions[i].x,top:positions[i].y,width:positions[i].size,height:positions[i].size}} aria-label={tool.name} tabIndex={0} role="img"><ToolMark tool={tool}/><span className="tool-tooltip">{tool.name}</span></span>)}</div>
  <div className="portrait-tag"><span className="signal-dot"/><span>{t.heroSignal}</span><span>{refinement[lang].cvTools}</span></div>
 </div>;
}
