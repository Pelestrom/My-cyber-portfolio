import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../data/site';
import { useLocale } from '../lib/Locale';
import { useReducedMotion } from '../hooks/useReducedMotion';
export function Boot(){
 const reduced=useReducedMotion();const {t}=useLocale();const [open,setOpen]=useState(()=>{if(!site.bootEnabled)return false;try{return sessionStorage.getItem(site.sessionKey)!=='1';}catch{return true;}});
 function close(){setOpen(false);try{sessionStorage.setItem(site.sessionKey,'1');}catch{/* optional */}}
 useEffect(()=>{if(!open)return;const timer=window.setTimeout(close,reduced?0:900);return()=>clearTimeout(timer);},[open,reduced]);
 return <AnimatePresence>{open&&!reduced&&<motion.div className="boot" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}} aria-hidden="false"><div className="boot-inner"><span className="brand">P<span className="red">/</span> PELESTROM</span>{site.bootLines.map((line,i)=><motion.p key={line} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.18}}>{line}</motion.p>)}<div className="loading-bar"><motion.span initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:0.8}}/></div><div className="boot-bottom"><span>{t.loading}...</span><button onClick={close}>{t.skipBoot} ↗</button></div></div></motion.div>}</AnimatePresence>;
}
