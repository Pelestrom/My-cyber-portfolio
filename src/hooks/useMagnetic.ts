import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useMagnetic(){
 const ref=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();
 useEffect(()=>{
  const host=ref.current;if(!host||reduced||!matchMedia('(pointer:fine)').matches)return;
  function reset(){host!.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el=>{el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px');});}
  function move(event:PointerEvent){
   if(event.pointerType!=='mouse')return;
   const target=(event.target as Element).closest<HTMLElement>('[data-magnetic]');
   host!.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el=>{if(el!==target){el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px');}});
   if(!target)return;
   const rect=target.getBoundingClientRect(),x=(event.clientX-rect.left-rect.width/2)*.12,y=(event.clientY-rect.top-rect.height/2)*.12;
   target.style.setProperty('--mag-x',`${Math.max(-7,Math.min(7,x))}px`);target.style.setProperty('--mag-y',`${Math.max(-7,Math.min(7,y))}px`);
  }
  host.addEventListener('pointermove',move);host.addEventListener('pointerleave',reset);
  return()=>{host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',reset);reset();};
 },[reduced]);
 return ref;
}
