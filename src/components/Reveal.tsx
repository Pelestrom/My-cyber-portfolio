import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { site } from '../data/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const revealItemVariants={
 hidden:{opacity:0,y:24,filter:'blur(6px)'},
 visible:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:site.motion.reveal,ease:site.motion.ease}},
};

export function Reveal({children,className,delay=0,margin='-12% 0px'}:{children:ReactNode;className?:string;delay?:number;margin?:string}){
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:'hidden'} whileInView={reduced?undefined:'visible'} viewport={{once:false,margin}} variants={revealItemVariants} transition={reduced?{duration:0}:{duration:site.motion.reveal,delay,ease:site.motion.ease}}>{children}</motion.div>;
}

export function Stagger({children,className,margin='-12% 0px',stagger=site.motion.stagger}:{children:ReactNode;className?:string;margin?:string;stagger?:number}){
 const reduced=useReducedMotion();
 return <motion.div className={`${className||''}${reduced?' motion-reduced':''}`} initial={reduced?false:'hidden'} whileInView={reduced?undefined:'visible'} viewport={{once:false,margin}} variants={{hidden:{opacity:1},visible:{opacity:1,transition:{staggerChildren:stagger}}}}>{children}</motion.div>;
}
