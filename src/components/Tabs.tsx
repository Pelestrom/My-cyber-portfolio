import { useRef, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { LocaleFade } from '../lib/Locale';
export function Tabs({items,active,onChange,id}:{items:{id:string;label:string}[];active:string;onChange:(id:string)=>void;id:string}){
 const refs=useRef<(HTMLButtonElement|null)[]>([]),reduced=useReducedMotion();
 function key(e:KeyboardEvent,index:number){let next=index;if(e.key==='ArrowRight')next=(index+1)%items.length;else if(e.key==='ArrowLeft')next=(index-1+items.length)%items.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=items.length-1;else return;e.preventDefault();onChange(items[next].id);refs.current[next]?.focus();}
 return <div className="tabs" role="tablist" aria-label={id}>{items.map((item,i)=><button key={item.id} ref={el=>{refs.current[i]=el;}} role="tab" aria-selected={active===item.id} aria-controls={`${id}-panel`} id={`${id}-tab-${item.id}`} tabIndex={active===item.id?0:-1} onClick={()=>onChange(item.id)} onKeyDown={e=>key(e,i)}>{active===item.id&&<motion.span className="tab-indicator" layoutId={`tab-active-${id}`} transition={reduced?{duration:0}:{type:'spring',stiffness:620,damping:36,mass:.6}}/>}<span className="tab-label"><LocaleFade>{item.label}</LocaleFade></span></button>)}</div>;
}
