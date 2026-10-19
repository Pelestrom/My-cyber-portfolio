import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { i18n } from '../data/i18n';
import { profile } from '../data/profile';
import { site } from '../data/site';
import type { Lang } from '../types';
const Context=createContext<{lang:Lang;toggle:()=>void;setLang:(lang:Lang)=>void}>({lang:'fr',toggle:()=>{},setLang:()=>{}});
export function LocaleProvider({children}:{children:ReactNode}){
 const [lang,setLang]=useState<Lang>(()=>{try{return localStorage.getItem(site.languageKey)==='en'?'en':'fr';}catch{return 'fr';}});
 useEffect(()=>{document.documentElement.lang=lang;let structured=document.getElementById('person-structured-data') as HTMLScriptElement|null;if(!structured){structured=document.createElement('script');structured.id='person-structured-data';structured.type='application/ld+json';document.head.appendChild(structured);}structured.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Person',name:profile.name,alternateName:profile.alias,email:profile.email,sameAs:[profile.githubUrl,profile.linkedinUrl]});document.querySelector('meta[property="og:locale"]')?.setAttribute('content',lang==='fr'?'fr_FR':'en_US');document.title=site.title+(lang==='fr'?' | Cybersécurité':' | Cybersecurity');const description=document.querySelector('meta[name="description"]');description?.setAttribute('content',lang==='fr'?'Portfolio de Pélé Abou Ouattara, étudiant en cyberdéfense et sécurité de l’information. Projets en forensic, détection et gestion des vulnérabilités.':'Pélé Abou Ouattara’s portfolio: cyberdefence and information security student. Projects in forensics, detection and vulnerability management.');try{localStorage.setItem(site.languageKey,lang);}catch{/* Storage unavailable; current session still works. */}},[lang]);
 return <Context.Provider value={{lang,toggle:()=>setLang(l=>l==='fr'?'en':'fr'),setLang}}>{children}</Context.Provider>;
}
export function useLocale(){const c=useContext(Context);return {...c,t:i18n[c.lang]};}
