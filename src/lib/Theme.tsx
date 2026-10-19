import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
export type ThemePreference='system'|'dark'|'light';
export type Theme='dark'|'light';
const key='pelestrom-theme';
export const resolveTheme=(preference:ThemePreference):Theme=>preference==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):preference;
function read():ThemePreference{try{const saved=localStorage.getItem(key);return saved==='dark'||saved==='light'?saved:'system';}catch{return 'system';}}
function writeTheme(theme:Theme){document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;const color=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();document.querySelector('meta[name="theme-color"]')?.setAttribute('content',color);}
const Context=createContext<{preference:ThemePreference;theme:Theme;setPreference:(p:ThemePreference,origin?:HTMLElement)=>void}>({preference:'system',theme:'dark',setPreference:()=>{}});
export function ThemeProvider({children}:{children:ReactNode}){
 const [preference,setChoice]=useState<ThemePreference>(read);const [theme,setTheme]=useState<Theme>(()=>resolveTheme(read()));
 useEffect(()=>{const resolved=resolveTheme(preference);setTheme(resolved);writeTheme(resolved);try{localStorage.setItem(key,preference);}catch{}const media=window.matchMedia('(prefers-color-scheme: dark)');const listener=()=>{if(preference==='system'){const next=resolveTheme('system');writeTheme(next);setTheme(next);}};media.addEventListener('change',listener);return()=>media.removeEventListener('change',listener);},[preference]);
 function setPreference(next:ThemePreference,origin?:HTMLElement){const commit=()=>{const resolved=resolveTheme(next);writeTheme(resolved);flushSync(()=>{setChoice(next);setTheme(resolved);});};
 const documentWithTransition=document as Document&{startViewTransition?:(callback:()=>void)=>unknown};
 if(documentWithTransition.startViewTransition&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const r=origin?.getBoundingClientRect();document.documentElement.style.setProperty('--theme-x',`${r?r.left+r.width/2:window.innerWidth/2}px`);document.documentElement.style.setProperty('--theme-y',`${r?r.top+r.height/2:0}px`);documentWithTransition.startViewTransition(commit);}else commit();}
 return <Context.Provider value={{preference,theme,setPreference}}>{children}</Context.Provider>;
}
export const useTheme=()=>useContext(Context);
