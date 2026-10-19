import { useEffect, useState, type CSSProperties } from 'react';
import type { Tool } from '../types';
import { useTheme } from '../lib/Theme';
import { contrast } from '../lib/contrast';
export function ToolMark({tool}:{tool:Tool}){const {theme}=useTheme();const [color,setColor]=useState('var(--logo-mono)');useEffect(()=>{const plate=getComputedStyle(document.documentElement).getPropertyValue('--tool-plate').trim();setColor(contrast(tool.color,plate)>=3?tool.color:'var(--logo-mono)');},[theme,tool.color]);if(tool.image||tool.logoMode==='image')return <span className="tool-mark tool-brand-image" aria-hidden="true"><img src={tool.image||tool.svg} alt="" width="36" height="30" loading="lazy"/></span>;if(!tool.svg)return null;return <span className="tool-mark" aria-hidden="true" style={{'--tool-color':color,'--tool-icon':`url("${tool.svg}")`} as CSSProperties}><span className="tool-mask"/></span>;}
