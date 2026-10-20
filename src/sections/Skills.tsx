import { useState } from 'react';
import { refinement } from '../data/refinement';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { skills } from '../data/skills';
import { site } from '../data/site';
import { tools } from '../data/tools';
import { useLocale } from '../lib/Locale';
import { SectionHeader } from '../components/SectionHeader';
import { ToolMark } from '../components/ToolMark';
import { Tabs } from '../components/Tabs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Stagger, revealItemVariants } from '../components/Reveal';
import { LocaleFade } from '../lib/Locale';
export function Skills(){const {t,lang}=useLocale();const [active,setActive]=useState(skills[0].id);const group=skills.find(s=>s.id===active)!;const reduced=useReducedMotion();return <section id="skills" className="section skills-section"><SectionHeader number="02" label={t.labels[1]} title={t.skillsTitle} description={t.skillsSub}/><Tabs id="skills" active={active} onChange={id=>setActive(id as typeof active)} items={skills.map(s=>({id:s.id,label:s.short[lang]}))}/><motion.div id="skills-panel" layout={!reduced} transition={{layout:reduced?{duration:0}:{type:'spring',stiffness:520,damping:46}}} role="tabpanel" aria-labelledby={`skills-tab-${active}`} tabIndex={0}><AnimatePresence mode="wait"><motion.div key={active} className={`skills-panel bracket${reduced?' motion-reduced':''}`} layout={!reduced} initial={reduced?false:{opacity:0,y:16,filter:'blur(4px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={reduced?{opacity:1}:{opacity:0,y:16,filter:'blur(4px)'}} transition={{duration:reduced?0:site.motion.medium,ease:site.motion.ease,layout:reduced?{duration:0}:{type:'spring',stiffness:520,damping:46}}}><div className="skills-summary"><h3><LocaleFade>{group.title[lang]}</LocaleFade></h3><p><LocaleFade>{group.description[lang]}</LocaleFade></p><span className="small-label"><LocaleFade>{t.methods}</LocaleFade></span><ul>{group.methods.map(m=><li key={m.en}><ArrowUpRight size={14}/><LocaleFade>{m[lang]}</LocaleFade></li>)}</ul></div><div className="skills-tools"><span className="small-label"><LocaleFade>{t.tools}</LocaleFade></span><Stagger className="tool-grid" margin="-12% 0px" stagger={.04}>{group.toolIds.map(id=>{const tool=tools.find(t=>t.id===id)!;return <motion.div className="tool-tile" key={id} variants={revealItemVariants}><ToolMark tool={tool}/><span>{tool.name}{tool.level&&<small className="tool-level"><LocaleFade>{tool.level==='pratique'?refinement[lang].levelPractice:refinement[lang].levelNotions}</LocaleFade></small>}</span></motion.div>;})}</Stagger></div></motion.div></AnimatePresence></motion.div><p className="skills-footnote"><LocaleFade>{refinement[lang].skillsNote}</LocaleFade></p></section>;}
