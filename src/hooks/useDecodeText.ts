import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';
export function useDecodeText(text:string){
 const reduced=useReducedMotion();const [display,setDisplay]=useState(text);const timer=useRef<number>();
 useEffect(()=>{setDisplay(text);return()=>window.clearInterval(timer.current);},[text]);
 const decode=useCallback(()=>{if(reduced)return;window.clearInterval(timer.current);let n=0;const chars='01<>/#_';timer.current=window.setInterval(()=>{n+=1.6;setDisplay([...text].map((c,i)=>i<n||c===' '||c==='\n'?c:chars[Math.floor(Math.random()*chars.length)]).join(''));if(n>=text.length){window.clearInterval(timer.current);setDisplay(text);}},25);},[text,reduced]);
 return {display,decode};
}
