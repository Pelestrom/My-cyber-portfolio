import { useDecodeText } from '../hooks/useDecodeText';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { LocaleFade } from '../lib/Locale';
import { site } from '../data/site';
export function SectionHeader({number,label,title,description}:{number:string;label:string;title:string;description:string}){
 const {display,decode}=useDecodeText(title),reduced=useReducedMotion(),lines=display.split('\n');
 return <header className="section-heading">
 <Reveal className="section-caption"><span>{number}</span><p><LocaleFade>{label}</LocaleFade></p></Reveal>
 <div className="section-heading-row"><motion.h2 className={reduced?'motion-reduced':''} onMouseEnter={decode} onViewportEnter={decode} aria-label={title} initial={reduced?false:'hidden'} whileInView={reduced?undefined:'visible'} viewport={{once:false,margin:'-12% 0px'}} variants={{hidden:{},visible:{transition:{staggerChildren:site.motion.stagger}}}}>{lines.map((line,index)=><motion.span key={index} aria-hidden="true" variants={{hidden:{clipPath:'inset(0 0 100% 0)'},visible:{clipPath:'inset(0 0 0% 0)',transition:{duration:site.motion.reveal,ease:site.motion.ease}}}} style={{display:'block',whiteSpace:'pre-line',overflow:'hidden'}}><LocaleFade>{line}</LocaleFade></motion.span>)}</motion.h2><Reveal className="section-heading-description"><p><LocaleFade>{description}</LocaleFade></p></Reveal></div>
 </header>;
}
