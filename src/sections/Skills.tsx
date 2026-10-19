import { useState } from 'react';
import { refinement } from '../data/refinement';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { skills } from '../data/skills';
import { tools } from '../data/tools';
import { useLocale } from '../lib/Locale';
import { SectionHeader } from '../components/SectionHeader';
import { ToolMark } from '../components/ToolMark';
import { Tabs } from '../components/Tabs';
import { useReducedMotion } from '../hooks/useReducedMotion';
export function Skills(){const {t,lang}=useLocale();const [active,setActive]=useState(skills[0].id);const group=skills.find(s=>s.id===active)!;const reduced=useReducedMotion();return <section id="skills" className="section skills-section"><SectionHeader number="02" label={t.labels[1]} title={t.skillsTitle} description={t.skillsSub}/><Tabs id="skills" active={active} onChange={id=>setActive(id as typeof active)} items={skills.map(s=>({id:s.id,label:s.short[lang]}))}/><div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${active}`} tabIndex={0}><AnimatePresence mode="wait"><motion.div key={active} className="skills-panel bracket" initial={reduced?false:{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:reduced?0:0.22}}><div className="skills-summary"><h3>{group.title[lang]}</h3><p>{group.description[lang]}</p><span className="small-label">{t.methods}</span><ul>{group.methods.map(m=><li key={m.en}><ArrowUpRight size={14}/>{m[lang]}</li>)}</ul></div><div className="skills-tools"><span className="small-label">{t.tools}</span><div className="tool-grid">{group.toolIds.map(id=>{const tool=tools.find(t=>t.id===id)!;return <div className="tool-tile" key={id}><ToolMark tool={tool}/><span>{tool.name}{tool.level&&<small className="tool-level">{tool.level==='pratique'?refinement[lang].levelPractice:refinement[lang].levelNotions}</small>}</span></div>;})}</div></div></motion.div></AnimatePresence></div><p className="skills-footnote">{refinement[lang].skillsNote}</p></section>;}
