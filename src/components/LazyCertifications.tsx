import { lazy, Suspense, useEffect, useRef, useState } from 'react';
const Certifications=lazy(()=>import('../sections/Certifications'));
export function LazyCertifications(){
 const host=useRef<HTMLElement>(null);const [load,setLoad]=useState(false);
 useEffect(()=>{const element=host.current;if(!element)return;const obs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){setLoad(true);obs.disconnect();}},{rootMargin:'650px'});obs.observe(element);return()=>obs.disconnect();},[]);
 return <section id="certifications" className="deferred-section" ref={host}>{load?<Suspense fallback={<div className="section-skeleton" aria-busy="true"/>}><Certifications/></Suspense>:<div className="section-skeleton" aria-hidden="true"/>}</section>;
}
