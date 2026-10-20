import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { profile } from '../data/profile';
import { heroTools } from '../data/tools';
import { refinement } from '../data/refinement';
import { ToolMark } from './ToolMark';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePerformanceMode } from '../hooks/usePerformanceMode';
import { useLocale } from '../lib/Locale';
import { useTheme } from '../lib/Theme';
import { contrast } from '../lib/contrast';
import { coverCrop, HERO_FOCAL, heroToolLayout, projectSourcePoint, seededRandom, subjectEdgeAtY, type HeroToolPosition } from '../lib/heroGeometry';

interface LitSample { x:number; y:number; }
interface PixelBlock { x:number; y:number; size:number; owner:number; driftX:number; driftY:number; phase:number; }
interface LogoSprite { toolId:string; canvas:HTMLCanvasElement; red:HTMLCanvasElement; cyan:HTMLCanvasElement; phase:number; speed:number; }
interface HitTarget { toolId:string; x:number; y:number; size:number; rotation:number; }
interface TooltipState { toolId:string; name:string; left:number; top:number; }
interface DisplacementBand { x:number; y:number; width:number; height:number; sourceX:number; sourceY:number; sourceWidth:number; sourceHeight:number; amplitude:number; phase:number; }

const FORMATION_SECONDS=.8,DISSOLVE_SECONDS=.8,PROBE_WIDTH=160,PROBE_HEIGHT=100;

function loadImage(src:string){return new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.decoding='async';image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(`Unable to load ${src}`));image.src=src;});}
async function svgMarkup(src:string){
 if(src.startsWith('data:image/svg+xml,'))return decodeURIComponent(src.slice('data:image/svg+xml,'.length));
 const response=await fetch(src);if(!response.ok)throw new Error(`Unable to fetch ${src}`);return response.text();
}
function tintSprite(source:HTMLCanvasElement,color:string){
 const canvas=document.createElement('canvas');canvas.width=source.width;canvas.height=source.height;const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');
 context.drawImage(source,0,0);context.globalCompositeOperation='source-atop';context.fillStyle=color;context.fillRect(0,0,canvas.width,canvas.height);context.globalCompositeOperation='source-over';return canvas;
}
async function createLogoSprite(tool:typeof heroTools[number],dpr:number,lineColor:string,random:()=>number):Promise<LogoSprite>{
 const canvas=document.createElement('canvas');canvas.width=96*dpr;canvas.height=96*dpr;const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');
 context.scale(dpr,dpr);context.fillStyle='rgba(3, 8, 12, .72)';context.strokeStyle=lineColor;context.lineWidth=1;context.beginPath();context.roundRect(1,1,94,94,13);context.fill();context.stroke();
 const source=tool.svg;if(!source)throw new Error(`Missing logo for ${tool.name}`);
 let logo:HTMLImageElement;
 if(source.endsWith('.svg')||source.startsWith('data:image/svg+xml,')){
  let markup=await svgMarkup(source);if(/currentColor/i.test(markup))markup=markup.replace(/currentColor/gi,contrast(tool.color,'#000000')>=3?tool.color:'#f4f7f9');
  const url=URL.createObjectURL(new Blob([markup],{type:'image/svg+xml'}));try{logo=await loadImage(url);}finally{URL.revokeObjectURL(url);}
 }else logo=await loadImage(source);
 const scale=Math.min(56/logo.naturalWidth,56/logo.naturalHeight),logoWidth=logo.naturalWidth*scale,logoHeight=logo.naturalHeight*scale;
 context.drawImage(logo,(96-logoWidth)/2,(96-logoHeight)/2,logoWidth,logoHeight);
 return{toolId:tool.id,canvas,red:tintSprite(canvas,'#ff263f'),cyan:tintSprite(canvas,'#00e5ff'),phase:random()*Math.PI*2,speed:.7+random()*.9};
}
function collectLitSamples(image:HTMLImageElement){
 const probe=document.createElement('canvas');probe.width=PROBE_WIDTH;probe.height=PROBE_HEIGHT;const context=probe.getContext('2d');if(!context)throw new Error('Canvas unavailable');
 context.drawImage(image,0,0,PROBE_WIDTH,PROBE_HEIGHT);const data=context.getImageData(0,0,PROBE_WIDTH,PROBE_HEIGHT).data,samples:LitSample[]=[];
 for(let y=4;y<PROBE_HEIGHT-3;y++){
  const sourceY=(y+.5)/PROBE_HEIGHT*image.naturalHeight,edge=subjectEdgeAtY(sourceY/image.naturalHeight)*image.naturalWidth;
  for(let x=0;x<PROBE_WIDTH;x++){
   const index=(y*PROBE_WIDTH+x)*4,luminance=(.2126*data[index]+.7152*data[index+1]+.0722*data[index+2])/255;
   const sourceX=(x+.5)/PROBE_WIDTH*image.naturalWidth;
   if(luminance>.12&&sourceX>=edge-image.naturalWidth*.1&&sourceX<=edge+image.naturalWidth*.025)samples.push({x:sourceX,y:sourceY});
  }
 }
 return samples;
}

export function PortraitCanvas(){
 const canvas=useRef<HTMLCanvasElement>(null),wrapper=useRef<HTMLDivElement>(null),positionsRef=useRef<HeroToolPosition[]>([]),hitTargetsRef=useRef<HitTarget[]>([]),heldOffsetsRef=useRef<Record<string,{x:number;y:number}>>({}),focusedTool=useRef<string|null>(null),hoveredTool=useRef<string|null>(null);
 const reduced=useReducedMotion(),lite=usePerformanceMode(),{theme}=useTheme(),{t,lang}=useLocale(),[ready,setReady]=useState(false),[canvasFailed,setCanvasFailed]=useState(false),[tooltip,setTooltip]=useState<TooltipState|null>(null);
 const [dimensions,setDimensions]=useState({width:560,height:640}),[positions,setPositions]=useState(()=>heroToolLayout(560,640,heroTools.length,false));positionsRef.current=positions;
 const holdTool=(toolId:string)=>{const index=heroTools.findIndex(tool=>tool.id===toolId),target=hitTargetsRef.current[index],position=positionsRef.current[index];if(target&&position)heldOffsetsRef.current[toolId]={x:target.x-(position.x+position.size/2),y:target.y-(position.y+position.size/2)};};
 const releaseTool=(toolId:string)=>{delete heldOffsetsRef.current[toolId];};
 const fallbackCrop=coverCrop(profile.portraitWidth,profile.portraitHeight,dimensions.width,dimensions.height,HERO_FOCAL.x,HERO_FOCAL.y,HERO_FOCAL.zoom);
 const fallbackStyle:CSSProperties={width:dimensions.width*profile.portraitWidth/fallbackCrop.width,height:dimensions.height*profile.portraitHeight/fallbackCrop.height,left:-fallbackCrop.x*dimensions.width/fallbackCrop.width,top:-fallbackCrop.y*dimensions.height/fallbackCrop.height,right:'auto',bottom:'auto',objectFit:'fill'};
 const updateTooltip=(toolId:string|null,left?:number,top?:number)=>{
  if(!toolId){setTooltip(null);return;}
  const tool=heroTools.find(item=>item.id===toolId);if(!tool)return;
  const anchor=positionsRef.current[heroTools.indexOf(tool)];if(!anchor)return;
  const x=left??anchor.x+anchor.size/2,y=top??anchor.y;
  setTooltip({toolId,name:tool.name,left:Math.max(6,Math.min(dimensions.width-220,x-80)),top:Math.max(28,y-7)});
 };

 useLayoutEffect(()=>{const host=wrapper.current;if(!host)return;
  const resize=()=>{if(host.clientWidth>0&&host.clientHeight>0){setDimensions({width:host.clientWidth,height:host.clientHeight});setPositions(heroToolLayout(host.clientWidth,host.clientHeight,heroTools.length,window.innerWidth<=680));}};resize();
  const observer=new ResizeObserver(resize);observer.observe(host);window.addEventListener('resize',resize);return()=>{observer.disconnect();window.removeEventListener('resize',resize);};
 },[]);

 useEffect(()=>{
  if(reduced){setReady(false);setTooltip(null);return;}
  const element=canvas.current,host=wrapper.current;if(!element||!host)return;const context=element.getContext('2d');if(!context){setCanvasFailed(true);return;}
  let frame=0,visible=true,disposed=false,imageLoaded=false,w=560,h=640,time=0,last=0,elapsed=0,nextGlitch=2,glitchRemaining=0,scrollProgress=0,needsRebuild=true;
  let bands:DisplacementBand[]=[],samples:LitSample[]=[],blocks:PixelBlock[]=[],sprites:LogoSprite[]=[],hitTargets:HitTarget[]=[],mouseX=-1000,mouseY=-1000;
  const random=seededRandom(641),line=getComputedStyle(document.documentElement).getPropertyValue('--hero-line').trim(),red=getComputedStyle(document.documentElement).getPropertyValue('--hero-red').trim(),cyan=getComputedStyle(document.documentElement).getPropertyValue('--hero-cyan').trim();
  const image=new Image();image.decoding='async';let crop=coverCrop(profile.portraitWidth,profile.portraitHeight,w,h,HERO_FOCAL.x,HERO_FOCAL.y,HERO_FOCAL.zoom);
  setReady(false);setCanvasFailed(false);
  function updateScrollProgress(){scrollProgress=Math.max(0,Math.min(-host!.getBoundingClientRect().top/h,1));}
  function buildHitTargets(){
   hitTargets=heroTools.map((tool,index)=>{const position=positionsRef.current[index];return{toolId:tool.id,x:position?.x+(position?.size||0)/2||0,y:position?.y+(position?.size||0)/2||0,size:position?.size||36,rotation:position?.rotation||0};});
    hitTargetsRef.current=hitTargets;
  }
  function buildBlocks(){
   if(samples.length===0||sprites.length===0)return;
   const mobile=window.innerWidth<=680,count=lite?(mobile?24:56):(mobile?48:140),blockRandom=seededRandom(2297),next:PixelBlock[]=[];
   for(let index=0;index<count;index++){
    const sample=samples[Math.floor(blockRandom()*samples.length)],owner=index%sprites.length,position=positionsRef.current[owner];
    if(!position)continue;
    const drift=blockRandom(),driftY=blockRandom()-.5;
    next.push({x:sample.x,y:sample.y,size:6+blockRandom()*8,owner,driftX:8+Math.pow(drift,2)*w*.32,driftY:driftY*h*.12,phase:blockRandom()*6.28});
   }
   blocks=next;needsRebuild=false;
  }
  function resize(){
   w=Math.max(1,host!.clientWidth||560);h=Math.max(1,host!.clientHeight||640);const dpr=Math.min(window.devicePixelRatio||1,lite||window.innerWidth<=680?1:2);
   element!.width=w*dpr;element!.height=h*dpr;context!.setTransform(dpr,0,0,dpr,0,0);
   crop=coverCrop(image.naturalWidth||profile.portraitWidth,image.naturalHeight||profile.portraitHeight,w,h,HERO_FOCAL.x,HERO_FOCAL.y,HERO_FOCAL.zoom);updateScrollProgress();
  const bandRandom=seededRandom(853),count=lite||window.innerWidth<=680?24:48;bands=Array.from({length:count},(_,index)=>{
    const sourceY=crop.y+(index+.5)/count*crop.height,edge=subjectEdgeAtY(sourceY/(image.naturalHeight||profile.portraitHeight))*(image.naturalWidth||profile.portraitWidth),screenWidth=8+bandRandom()*24,sourceWidth=screenWidth*crop.width/w;
    const sourceX=Math.max(crop.x,Math.min(crop.x+crop.width-sourceWidth,edge-sourceWidth*.55));
    const point=projectSourcePoint(sourceX,sourceY,crop,w,h);
    return{x:point.x,y:point.y,width:sourceWidth*w/crop.width,height:h/count+1,sourceX,sourceY,sourceWidth,sourceHeight:crop.height/count,amplitude:2+bandRandom()*12,phase:bandRandom()*6.28};
   });
   buildHitTargets();needsRebuild=true;if(samples.length)buildBlocks();
  }
  function drawLogoBands(sprite:LogoSprite,source:HTMLCanvasElement,size:number,amplitude:number){
    const bandsPerLogo=5,bandHeight=source.height/bandsPerLogo;
   for(let band=0;band<bandsPerLogo;band++){
    const dx=Math.sin(time*sprite.speed+band*1.17+sprite.phase)*amplitude;
    context!.drawImage(source,0,band*bandHeight,source.width,bandHeight,-size/2+dx,-size/2+band*size/bandsPerLogo,size+1,size/bandsPerLogo+1);
   }
  }
  function draw(now:number){
   if(disposed)return;
   const seconds=last?Math.max(0,(now-last)/1000):0;last=now;time+=seconds;elapsed+=seconds;
   if(elapsed>=nextGlitch&&glitchRemaining<=0){glitchRemaining=.12;nextGlitch=elapsed+2+random()*2;}glitchRemaining=Math.max(0,glitchRemaining-seconds);
   context!.clearRect(0,0,w,h);
   context!.globalCompositeOperation='source-over';context!.globalAlpha=1;context!.filter='none';
   context!.drawImage(image,crop.x,crop.y,crop.width,crop.height,0,0,w,h);
   const scroll=scrollProgress,disruption=1-scroll*.55;
   context!.save();context!.globalCompositeOperation='screen';context!.globalAlpha=.8*disruption;
   for(const band of bands){
    const dx=Math.sin(time*1.3+band.phase)*band.amplitude*(glitchRemaining>0?2.5:1);
    context!.drawImage(image,band.sourceX,band.sourceY,band.sourceWidth,band.sourceHeight,band.x+dx,band.y,band.width,band.height);
    context!.globalAlpha=.12*disruption;context!.fillStyle=band.phase>3?red:cyan;
    context!.fillRect(band.x+dx+(band.phase%4),band.y,Math.max(2,band.width*.45),.7);
    context!.globalAlpha=.8*disruption;
   }
   context!.restore();
   if(needsRebuild)buildBlocks();
   context!.save();context!.globalCompositeOperation='screen';context!.imageSmoothingEnabled=false;
   for(const block of blocks){
    const position=positionsRef.current[block.owner],sprite=sprites[block.owner];if(!position||!sprite)continue;
    const active=focusedTool.current===sprite.toolId||hoveredTool.current===sprite.toolId,cycle=FORMATION_SECONDS+position.holdDuration+DISSOLVE_SECONDS,local=(time+position.phaseOffset)%cycle;
    let formation=1,dissolving=false,progress=0,opacity=1;
    if(!active){if(local<FORMATION_SECONDS){formation=local/FORMATION_SECONDS;opacity=formation;}else if(local>=FORMATION_SECONDS+position.holdDuration){dissolving=true;progress=(local-FORMATION_SECONDS-position.holdDuration)/DISSOLVE_SECONDS;opacity=1-progress;}}
    if(!active&&!dissolving&&formation>=1)continue;
    const originX=(block.x-crop.x)*w/crop.width,originY=(block.y-crop.y)*h/crop.height,baseX=position.x+position.size/2,baseY=position.y+position.size/2;
    let x:number,y:number,alpha:number,size=block.size;
    if(dissolving){x=baseX+block.driftX*progress;y=baseY+block.driftY*progress;alpha=opacity*.92*Math.exp(-Math.max(0,x-baseX)/(w*.28)*1.4);size*=1-progress*.72;}
    else{x=originX+(baseX-originX)*formation;y=originY+(baseY-originY)*formation;alpha=(1-formation)*.9;size*=.75+formation*.25;}
    if(active){x=baseX+Math.sin(block.phase)*3;y=baseY+Math.cos(block.phase)*3;alpha=.28;}
    context!.globalAlpha=Math.min(.92,alpha);const sourceSize=size*crop.width/w;
    context!.drawImage(image,block.x-sourceSize/2,block.y-sourceSize/2,sourceSize,sourceSize,x-size/2,y-size/2,size,size);
   }
   context!.restore();context!.imageSmoothingEnabled=true;
   for(let index=0;index<sprites.length;index++){
    const sprite=sprites[index],position=positionsRef.current[index];if(!position)continue;
    const active=focusedTool.current===sprite.toolId||hoveredTool.current===sprite.toolId,cycle=FORMATION_SECONDS+position.holdDuration+DISSOLVE_SECONDS,local=(time+position.phaseOffset)%cycle;
    let opacity=1;if(!active&&local<FORMATION_SECONDS)opacity=local/FORMATION_SECONDS;else if(!active&&local>=FORMATION_SECONDS+position.holdDuration)opacity=1-(local-FORMATION_SECONDS-position.holdDuration)/DISSOLVE_SECONDS;
    if(!active&&opacity<=0)continue;
    const heldOffset=heldOffsetsRef.current[sprite.toolId];
    let driftX=active?heldOffset?.x||0:Math.sin(time*position.speedX+position.phaseX)*position.driftX,driftY=active?heldOffset?.y||0:Math.sin(time*position.speedY+position.phaseY)*position.driftY;
    const left=Math.max(w*.58,Math.min(w*.94-position.size,position.x+driftX)),top=Math.max(h*.08,Math.min(h*.78-position.size,position.y+driftY)),centerX=left+position.size/2,centerY=top+position.size/2;
    const target=hitTargets[index];target.x=centerX;target.y=centerY;target.size=position.size;target.rotation=position.rotation;
    const alpha=(.58+position.depth*.42)*opacity,amplitude=active?0:(1-position.depth)*1.4+(glitchRemaining>0?2.5:0);
    context!.save();context!.translate(centerX,centerY);context!.rotate(position.rotation);context!.filter=!lite&&position.depth<.28?'blur(.55px)':'none';context!.globalCompositeOperation='screen';context!.globalAlpha=alpha;
    if(!active&&opacity>.25){const trailHeight=Math.max(1.5,position.size*.08),trailY=sprite.phase/(Math.PI*2)*position.size,sourceY=trailY/position.size*sprite.canvas.height,sourceHeight=trailHeight/position.size*sprite.canvas.height;context!.globalAlpha=Math.min(.18,alpha*.18);context!.drawImage(sprite.red,0,sourceY,sprite.red.width,sourceHeight,-position.size/2-amplitude,-position.size/2+trailY,position.size,trailHeight);context!.globalAlpha=Math.min(.18,alpha*.18);context!.drawImage(sprite.cyan,0,sourceY,sprite.cyan.width,sourceHeight,-position.size/2+amplitude,-position.size/2+trailY,position.size,trailHeight);}
    context!.globalAlpha=alpha;drawLogoBands(sprite,sprite.canvas,position.size,amplitude);context!.filter='none';context!.globalCompositeOperation='screen';
    if(active){context!.globalAlpha=.9;context!.strokeStyle=cyan;context!.lineWidth=1.5;context!.strokeRect(-position.size/2-2,-position.size/2-2,position.size+4,position.size+4);}
    context!.restore();
   }
   context!.globalCompositeOperation='source-over';context!.globalAlpha=1;context!.filter='none';frame=0;
   if(visible&&!document.hidden)frame=requestAnimationFrame(draw);
  }
  function targetAt(x:number,y:number){
   for(let index=hitTargets.length-1;index>=0;index--){const target=hitTargets[index],dx=x-target.x,dy=y-target.y,cos=Math.cos(target.rotation),sin=Math.sin(target.rotation),localX=dx*cos+dy*sin,localY=-dx*sin+dy*cos;if(Math.abs(localX)<=target.size/2&&Math.abs(localY)<=target.size/2)return target;}
   return null;
  }
  function move(event:PointerEvent){const rect=element!.getBoundingClientRect();mouseX=event.clientX-rect.left;mouseY=event.clientY-rect.top;const target=targetAt(mouseX,mouseY),next=target?.toolId||null;if(hoveredTool.current!==next){if(hoveredTool.current&&!focusedTool.current)releaseTool(hoveredTool.current);hoveredTool.current=next;if(next)holdTool(next);if(!focusedTool.current){if(target)updateTooltip(next,target.x,target.y);else setTooltip(null);}}}
  function leave(){mouseX=-1000;mouseY=-1000;if(hoveredTool.current&&!focusedTool.current)releaseTool(hoveredTool.current);hoveredTool.current=null;if(!focusedTool.current)setTooltip(null);}
  function visibility(){document.hidden?stop():resume();}
  function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
  function resume(){if(!frame&&visible&&!document.hidden&&imageLoaded&&sprites.length===heroTools.length)frame=requestAnimationFrame(draw);}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visible?resume():stop();},{threshold:.01});observer.observe(host);
  const handleResize=()=>{if(imageLoaded){resize();resume();}};
  const resizeObserver=new ResizeObserver(handleResize);resizeObserver.observe(host);window.addEventListener('resize',handleResize);
  element.addEventListener('pointermove',move);element.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);
  image.onload=()=>{if(disposed)return;imageLoaded=true;try{samples=collectLitSamples(image);}catch{samples=[];}resize();if(sprites.length===heroTools.length){buildBlocks();setReady(true);resume();}};
  image.onerror=()=>{if(!disposed){setReady(false);setCanvasFailed(true);}};image.src=profile.portrait;
  const dpr=Math.min(window.devicePixelRatio||1,lite||window.innerWidth<=680?1:2);
  Promise.all(heroTools.map(tool=>createLogoSprite(tool,dpr,line,random))).then(result=>{if(disposed)return;sprites=result;if(imageLoaded){buildBlocks();setReady(true);resume();}}).catch(()=>{if(!disposed){sprites=[];setReady(false);setCanvasFailed(true);}});
  return()=>{disposed=true;stop();observer.disconnect();resizeObserver.disconnect();window.removeEventListener('resize',handleResize);element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);};
 },[reduced,theme,lite]);

 const staticLogos=reduced||canvasFailed||!ready;
 return <div className={`portrait-art ${ready&&!reduced?'canvas-ready':''}`} ref={wrapper}>
  <img className="portrait-fallback" src={profile.portrait} width={profile.portraitWidth} height={profile.portraitHeight} style={fallbackStyle} alt={profile.name} loading="eager"/>
  <canvas ref={canvas} aria-hidden="true"/>
  <div className={`hero-tools-static${staticLogos?' is-visible':''}`} aria-hidden="true">{heroTools.slice(0,positions.length).map((tool,index)=>{const position=positions[index];return <span key={tool.id} className={`hero-tool-static${tooltip?.toolId===tool.id?' is-active':''}`} style={{left:position.x,top:position.y,width:position.size,height:position.size,opacity:.58+position.depth*.42,transform:`rotate(${position.rotation}rad)`,filter:!lite&&position.depth<.28?'blur(.55px)':'none'}} onPointerEnter={()=>{hoveredTool.current=tool.id;holdTool(tool.id);updateTooltip(tool.id);}} onPointerLeave={()=>{hoveredTool.current=null;releaseTool(tool.id);if(!focusedTool.current)setTooltip(null);}}><ToolMark tool={tool}/></span>;})}</div>
  <ul className="hero-tools-a11y" role="list" aria-label={refinement[lang].heroToolsLabel}>{heroTools.slice(0,positions.length).map(tool=><li key={tool.id}><button type="button" aria-label={tool.name} aria-describedby={tooltip?.toolId===tool.id?'hero-tool-tooltip':undefined} onFocus={()=>{focusedTool.current=tool.id;holdTool(tool.id);updateTooltip(tool.id);}} onBlur={()=>{focusedTool.current=null;releaseTool(tool.id);if(!hoveredTool.current)setTooltip(null);}}>{tool.name}</button></li>)}</ul>
  {tooltip&&<div id="hero-tool-tooltip" className="hero-tool-tooltip" role="tooltip" style={{left:tooltip.left,top:tooltip.top}}>{tooltip.name}</div>}
  <div className="portrait-tag"><span className="signal-dot"/><span>{t.heroSignal}</span><span>{refinement[lang].heroToolsLabel}</span></div>
 </div>;
}
