import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
export type ThemePreference='dark'|'light';
export type Theme='dark'|'light';
const key='pelestrom-theme';
let cancelThemeSequence:(()=>void)|null=null;
const resolveTheme=(preference:ThemePreference):Theme=>preference;
function read():ThemePreference{try{return localStorage.getItem(key)==='light'?'light':'dark';}catch{return 'dark';}}
function writeTheme(theme:Theme){document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;const color=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();document.querySelector('meta[name="theme-color"]')?.setAttribute('content',color);}
const Context=createContext<{preference:ThemePreference;theme:Theme;setPreference:(p:ThemePreference,origin?:HTMLElement)=>void}>({preference:'dark',theme:'dark',setPreference:()=>{}});
export function ThemeProvider({children}:{children:ReactNode}){
 const [preference,setChoice]=useState<ThemePreference>(read);const [theme,setTheme]=useState<Theme>(()=>resolveTheme(read()));
 useEffect(()=>{const resolved=resolveTheme(preference);setTheme(resolved);writeTheme(resolved);try{localStorage.setItem(key,preference);}catch{}},[preference]);
 function setPreference(next:ThemePreference){
  const commit=()=>{const resolved=resolveTheme(next);writeTheme(resolved);flushSync(()=>{setChoice(next);setTheme(resolved);});};
  const root=document.documentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,lite=root.dataset.performanceMode==='lite';
  if(!reduced&&!lite){
   cancelThemeSequence?.();
   const overlay=document.createElement('div');overlay.className='theme-terminal-overlay';overlay.setAttribute('aria-hidden','true');
   const panel=document.createElement('div');panel.className='theme-terminal-panel';
   const command=document.createElement('span');command.className='theme-terminal-command';
   const result=document.createElement('span');result.className='theme-terminal-result';result.textContent='[OK] appearance reconfigured';
   panel.append(command,result);overlay.append(panel);document.body.append(overlay);
   const typedText=`> theme --set ${next}`;let cursor=0;let typingTimer=0;let readTimer=0;let removeTimer=0;
   const cancel=()=>{window.clearInterval(typingTimer);window.clearTimeout(readTimer);window.clearTimeout(removeTimer);overlay.remove();if(cancelThemeSequence===cancel)cancelThemeSequence=null;};
   cancelThemeSequence=cancel;
   requestAnimationFrame(()=>overlay.classList.add('is-typing'));
   typingTimer=window.setInterval(()=>{
    cursor++;command.textContent=typedText.slice(0,cursor);
    if(cursor>=typedText.length){
     window.clearInterval(typingTimer);
     readTimer=window.setTimeout(()=>{
      overlay.classList.add('is-complete');
      const documentWithTransition=document as Document&{startViewTransition?:(callback:()=>void)=>{finished?:Promise<void>}};
      if(documentWithTransition.startViewTransition){
       root.dataset.themeTransition='true';
       const transition=documentWithTransition.startViewTransition(()=>{overlay.remove();commit();});
       const clear=()=>{delete root.dataset.themeTransition;if(cancelThemeSequence===cancel)cancelThemeSequence=null;};
       transition.finished?.then(clear,clear);
      }else{
       removeTimer=window.setTimeout(()=>{overlay.remove();commit();if(cancelThemeSequence===cancel)cancelThemeSequence=null;},180);
      }
     },1100);
    }
   },48);
   return;
  }
  commit();
 }
 return <Context.Provider value={{preference,theme,setPreference}}>{children}</Context.Provider>;
}
export const useTheme=()=>useContext(Context);
