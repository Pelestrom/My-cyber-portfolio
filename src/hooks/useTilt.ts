import { useEffect, useRef, useCallback, type PointerEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';
export function useTilt(max=10){
 const ref=useRef<HTMLElement|null>(null); const reduced=useReducedMotion();
 const target=useRef({x:0,y:0,gx:50,gy:50,active:false});
 useEffect(()=>{
  const el=ref.current;if(!el||reduced)return;
  let frame=0;let current={x:0,y:0,gx:50,gy:50};
  function tick(){const t=target.current;const lerp=(a:number,b:number)=>a+(b-a)*0.13;
   current={x:lerp(current.x,t.x),y:lerp(current.y,t.y),gx:lerp(current.gx,t.gx),gy:lerp(current.gy,t.gy)};
   el!.style.setProperty('--rx',`${current.x}deg`);el!.style.setProperty('--ry',`${current.y}deg`);el!.style.setProperty('--gx',`${current.gx}%`);el!.style.setProperty('--gy',`${current.gy}%`);el!.style.setProperty('--shadow-x',`${-current.y*1.2}px`);el!.style.setProperty('--shadow-y',`${12+current.x*0.8}px`);el!.style.setProperty('--tilt-scale',t.active?'1.018':'1');el!.style.setProperty('--glare-opacity',t.active?'0.2':'0');
   if(t.active||Math.abs(current.x)+Math.abs(current.y)>0.02)frame=requestAnimationFrame(tick);else frame=0;
  }
  const start=()=>{if(!frame)frame=requestAnimationFrame(tick);};
  el.addEventListener('pointermove',start);el.addEventListener('pointerleave',start);
  return()=>{cancelAnimationFrame(frame);el.removeEventListener('pointermove',start);el.removeEventListener('pointerleave',start);};
 },[reduced]);
 const move=useCallback((e:PointerEvent<HTMLElement>)=>{if(reduced||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;target.current={x:(0.5-y)*max*2,y:(x-0.5)*max*2,gx:x*100,gy:y*100,active:true};},[max,reduced]);
 const leave=useCallback(()=>{target.current={x:0,y:0,gx:50,gy:50,active:false};},[]);
 return {ref,move,leave};
}
