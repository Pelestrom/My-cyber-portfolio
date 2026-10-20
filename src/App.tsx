import { lazy, Suspense, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Boot } from './components/Boot';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience, Education } from './sections/Experience';
import { Contact } from './sections/Contact';
import { LazyCertifications } from './components/LazyCertifications';
import { useRoute } from './hooks/useRoute';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import { AnalystModeToggle } from './components/AnalystModeToggle';
const CertificationsPage=lazy(()=>import('./pages/CertificationsPage').then(module=>({default:module.CertificationsPage})));
export default function App(){const route=useRoute(),lite=usePerformanceMode();const previousRoute=useRef(route);useEffect(()=>{document.documentElement.dataset.performanceMode=lite?'lite':'full';return()=>{delete document.documentElement.dataset.performanceMode;};},[lite]);useEffect(()=>{if(previousRoute.current===route)return;previousRoute.current=route;window.scrollTo(0,0);const frame=requestAnimationFrame(()=>{const heading=document.querySelector('h1');if(heading){if(!heading.hasAttribute('tabindex'))heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}});return()=>cancelAnimationFrame(frame);},[route]);if(route==='certifications')return <Suspense fallback={<main className="certifications-page section-skeleton" aria-busy="true"/>}><CertificationsPage/></Suspense>;return <><Boot/><Navigation/><main id="main"><Hero/><div className="content-wrap"><About/><Skills/><Projects/><LazyCertifications/><Experience/><Education/><Contact/></div></main><CustomCursor/><AnalystModeToggle/></>;}
