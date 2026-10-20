import type { MouseEvent } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/Theme';
import { useLocale } from '../lib/Locale';
import { refinement } from '../data/refinement';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function ThemeToggle(){
 const {preference,setPreference}=useTheme();
 const {lang}=useLocale();
 const text=refinement[lang];
 const reduced=useReducedMotion();
 const next=preference==='dark'?'light':'dark';
 const Icon=preference==='dark'?Sun:Moon;
 function toggle(event:MouseEvent<HTMLButtonElement>){
  if(!reduced)event.currentTarget.animate([{transform:'rotate(0deg)'},{transform:'rotate(1800deg)'}],{duration:1350,easing:'cubic-bezier(.22,1,.36,1)'});
  setPreference(next);
 }

 return <button type="button" className="icon-button nav-cv theme-toggle-button" aria-label={`${text.theme}: ${text.themeOptions[next]}`} title={`${text.theme}: ${text.themeOptions[next]}`} onClick={toggle}><Icon size={18}/></button>;
}
