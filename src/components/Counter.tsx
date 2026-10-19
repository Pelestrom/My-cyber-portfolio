import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
export function Counter({value}:{value:number}){
 const ref=useRef<HTMLSpanElement>(null);const reduced=useReducedMotion();const [shown,setShown]=useState(value);
 useEffect(()=>{if(reduced){setShown(value);return;}let frame=0;const el=ref.current;if(!el)return;const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)return;observer.disconnect();const start=performance.now();setShown(0);function tick(now:number){const progress=Math.min((now-start)/850,1);setShown(Math.round(value*(1-(1-progress)**3)));if(progress<1)frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);},{threshold:0.5});observer.observe(el);return()=>{observer.disconnect();cancelAnimationFrame(frame);};},[value,reduced]);
 return <span ref={ref}><span aria-hidden="true">{String(shown).padStart(2,'0')}</span><span className="sr-only">{value}</span></span>;
}
