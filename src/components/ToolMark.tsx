import { useEffect, useState, type CSSProperties } from 'react';
import { Wrench } from 'lucide-react';
import type { Tool } from '../types';
import { useTheme } from '../lib/Theme';
import { contrast } from '../lib/contrast';
export function ToolMark({tool}:{tool:Tool}){const {theme}=useTheme();const [color,setColor]=useState('var(--logo-mono)');useEffect(()=>{const surface=getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();setColor(contrast(tool.color,surface)>=3?tool.color:'var(--logo-mono)');},[theme,tool.color]);if(tool.logoMode==='image'&&tool.svg)return <span className={`tool-mark tool-brand-image tool-mark-${tool.id}`} aria-hidden="true"><img src={tool.svg} alt="" width="36" height="30" loading="lazy"/></span>;if(!tool.svg)return <span className="tool-mark tool-mark-generic" aria-hidden="true"><Wrench size={17} strokeWidth={1.7}/></span>;return <span className={`tool-mark tool-mark-${tool.id}`} aria-hidden="true" style={{'--tool-color':color,'--tool-icon':`url("${tool.svg}")`} as CSSProperties}><span className="tool-mask"/></span>;}
