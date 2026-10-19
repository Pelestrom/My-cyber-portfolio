import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
export function CustomCursor(){const ref=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();useEffect(()=>{if(reduced||!matchMedia('(pointer:fine)').matches)return;const el=ref.current;if(!el)return;let frame=0;let tx=-100,ty=-100,x=-100,y=-100;let running=false;
 function tick(){x+=(tx-x)*0.22;y+=(ty-y)*0.22;el!.style.transform=`translate3d(${x}px,${y}px,0)`;if(running)frame=requestAnimationFrame(tick);}
 function move(e:MouseEvent){tx=e.clientX;ty=e.clientY;el!.classList.toggle('is-interactive',Boolean((e.target as Element).closest('a,button')));el!.style.opacity='1';if(!running){running=true;frame=requestAnimationFrame(tick);}}
 function leave(){running=false;cancelAnimationFrame(frame);el!.style.opacity='0';}
 window.addEventListener('mousemove',move);document.addEventListener('mouseleave',leave);return()=>{running=false;cancelAnimationFrame(frame);window.removeEventListener('mousemove',move);document.removeEventListener('mouseleave',leave);};},[reduced]);return <div ref={ref} className="custom-cursor" aria-hidden="true"/>;}
