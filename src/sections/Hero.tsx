import { ArrowDown, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type PointerEvent } from 'react';
import { LocaleFade, useLocale } from '../lib/Locale';
import { profile } from '../data/profile';
import { refinement } from '../data/refinement';
import { site } from '../data/site';
import { PortraitCanvas } from '../components/PortraitCanvas';
import { LiveClock } from '../components/LiveClock';
import { useDecodeText } from '../hooks/useDecodeText';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMagnetic } from '../hooks/useMagnetic';

export function Hero(){
 const {t,lang}=useLocale();const copy=refinement[lang];const {display,decode}=useDecodeText('OUATTARA.');
 const ref=useRef<HTMLElement>(null),reduced=useReducedMotion(),magnetic=useMagnetic();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const textOpacity=useTransform(scrollYProgress,[0,.65,1],[1,.7,0]),textY=useTransform(scrollYProgress,[0,1],[0,32]),portraitY=useTransform(scrollYProgress,[0,1],[0,-48]);
 function moveTitle(event:PointerEvent<HTMLHeadingElement>){
  if(reduced||event.pointerType!=='mouse')return;
  const rect=event.currentTarget.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
  event.currentTarget.style.setProperty('--title-x',`${x*7}px`);event.currentTarget.style.setProperty('--title-y',`${y*5}px`);
 }
 function resetTitle(event:PointerEvent<HTMLHeadingElement>){event.currentTarget.style.setProperty('--title-x','0px');event.currentTarget.style.setProperty('--title-y','0px');}
 return <section ref={ref} id="hero" className="hero bracket">
  <div className="hero-grid" aria-hidden="true"/><div className="hero-top"><span><LocaleFade>{copy.mission}</LocaleFade></span><LiveClock/></div>
  <div className="hero-content">
   <motion.div className="hero-copy" style={reduced?undefined:{opacity:textOpacity,y:textY}}>
    <p className="hero-alias">Pelestrom / <LocaleFade>{copy.seek}</LocaleFade></p>
    <h1 aria-label={profile.name} onPointerMove={moveTitle} onPointerLeave={resetTitle}>P{'\u00e9'}l{'\u00e9'} Abou<br/><span className="glitch-title" onMouseEnter={decode} aria-hidden="true">{display}</span></h1>
    <p className="hero-statement"><LocaleFade>{copy.heroStatement}</LocaleFade></p><p className="hero-description"><LocaleFade>{profile.intro[lang]}</LocaleFade></p>
    <div className="hero-buttons" ref={magnetic}><a data-magnetic className="button button-primary" href="#projects"><LocaleFade>{t.projects}</LocaleFade></a><a data-magnetic className="button button-outline" href={profile.cvUrl[lang]} download><Download size={17}/><LocaleFade>{t.cv}</LocaleFade></a></div>
    <div className="hero-domains" aria-label={copy.focusLabel}>{copy.focus.map(s=><span key={s}><LocaleFade>{s}</LocaleFade></span>)}</div>
   </motion.div>
   <motion.div className="hero-portrait-parallax" style={reduced?undefined:{y:portraitY}} initial={reduced?false:{opacity:0,clipPath:'inset(0 0 100% 0 round 12px)'}} whileInView={{opacity:1,clipPath:'inset(0 0 0% 0 round 12px)'}} viewport={{once:false}} transition={{duration:reduced?0:site.motion.reveal,ease:site.motion.ease}}><PortraitCanvas/></motion.div>
  </div>
  <div className="hero-bottom"><span className="availability"><span className="signal-dot"/><LocaleFade>{profile.status[lang]}</LocaleFade></span><a href="#about" className="scroll-cue"><LocaleFade>{t.scroll}</LocaleFade><ArrowDown size={16}/></a></div>
 </section>;
}
