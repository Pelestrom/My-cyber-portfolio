import { refinement } from '../data/refinement';
import { site } from '../data/site';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../data/experience';
import { education } from '../data/education';
import { useLocale } from '../lib/Locale';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionHeader } from '../components/SectionHeader';
import { LocaleFade } from '../lib/Locale';
import { Stagger, revealItemVariants } from '../components/Reveal';
import { asset } from '../lib/assets';
export function Experience(){const {t,lang}=useLocale();const ref=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start 75%','end 70%']});const progress=useTransform(scrollYProgress,[0,1],[0,1]);return <section id="experience" className="section"><SectionHeader number="05" label={t.labels[4]} title={t.expTitle} description={t.expSub}/><div className="timeline" ref={ref}><div className="timeline-track"><motion.div style={{scaleY:reduced?1:progress}}/></div>{experience.filter(e=>e.enabled).sort((a,b)=>a.order-b.order).map((e,index)=><motion.article className="timeline-item" key={e.id} initial={reduced?false:{opacity:0,x:index%2===0?-24:24,filter:'blur(6px)'}} whileInView={{opacity:1,x:0,filter:'blur(0px)'}} viewport={{once:false,margin:'-12% 0px'}} transition={{duration:reduced?0:site.motion.reveal,ease:site.motion.ease}}><motion.span className="timeline-dot" initial={reduced?false:{scale:.65}} whileInView={reduced?undefined:{scale:1,boxShadow:'0 0 0 6px var(--bg), 0 0 10px var(--accent)'}} viewport={{once:false}} transition={{duration:reduced?0:site.motion.fast}}/><div className="timeline-time"><span><LocaleFade>{e.period[lang]}</LocaleFade></span><span><LocaleFade>{e.location[lang]}</LocaleFade></span></div><div className="timeline-content"><div className="timeline-company">{e.logo?<div className="company-logo"><img src={e.logo} alt={e.organization} width="120" height="40" loading="lazy"/></div>:<span className="company-text" aria-hidden="true"/>}<span>{e.organization}</span></div><h3><LocaleFade>{e.title[lang]}</LocaleFade></h3><ul>{e.bullets.map(b=><li key={b.en}><LocaleFade>{b[lang]}</LocaleFade></li>)}</ul></div></motion.article>)}</div><p className="timeline-note"><LocaleFade>{t.bnetdNote}</LocaleFade></p></section>;}
export function Education(){
 const {t,lang}=useLocale();
 const copy=refinement[lang];
 const schools=education.filter(e=>e.enabled).sort((a,b)=>a.order-b.order);
 return <section id="education" className="section education-section"><SectionHeader number="06" label={copy.eduSection} title={t.eduTitle} description={t.eduSub}/><Stagger className="school-grid education-steps">{schools.map(e=><motion.article className={`school-card education-step education-step-${e.id}`} key={e.id} variants={revealItemVariants}><div className={`school-logo school-logo-${e.id}`}><img src={e.logo} alt={e.institution} {...(e.id==='inp'?{width:110,height:110}:{})} loading="lazy"/></div><p className="school-institution">{e.institution}</p><h3><LocaleFade>{e.title[lang]}</LocaleFade></h3>{e.period&&<p className="school-period"><LocaleFade>{e.period[lang]}</LocaleFade></p>}{e.location&&<p className="school-location"><LocaleFade>{e.location[lang]}</LocaleFade></p>}{e.id==='hestim'&&<span className="school-note degree-badge"><img className="degree-badge-logo" src={asset('logos/insa.webp')} alt="" height={28} loading="lazy"/><span><strong><LocaleFade>{copy.dualDegree}</LocaleFade></strong><br/><LocaleFade>{copy.dualSubtitle}</LocaleFade></span></span>}{e.note&&<span className="school-note"><LocaleFade>{e.note[lang]}</LocaleFade></span>}</motion.article>)}</Stagger></section>;
}
