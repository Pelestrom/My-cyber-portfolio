/** DOM smoke checks; not a visual browser audit. No HTTP server is started. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { createServer } from 'vite';
const dom=new JSDOM('<!doctype html><html lang="fr"><body><div id="root"></div></body></html>',{url:'https://example.test/pelestrom/',pretendToBeVisual:true});
const {window}=dom;
for(const key of ['window','document','HTMLElement','Element','HTMLDialogElement','SVGElement','Event','MouseEvent','KeyboardEvent','getComputedStyle','localStorage','sessionStorage'])Object.defineProperty(globalThis,key,{value:key==='window'?window:key==='getComputedStyle'?window.getComputedStyle.bind(window):window[key],configurable:true});
Object.defineProperty(globalThis,'navigator',{value:window.navigator,configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
window.matchMedia=q=>({matches:q.includes('prefers-reduced-motion'),media:q,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){},dispatchEvent(){return true;}});
class IO{constructor(cb){this.cb=cb;}observe(target){queueMicrotask(()=>this.cb([{target,isIntersecting:true,intersectionRatio:1,boundingClientRect:target.getBoundingClientRect()}],this));}unobserve(){}disconnect(){}}
class RO{observe(){}unobserve(){}disconnect(){}}
window.IntersectionObserver=globalThis.IntersectionObserver=IO;window.ResizeObserver=globalThis.ResizeObserver=RO;
globalThis.requestAnimationFrame=window.requestAnimationFrame.bind(window);globalThis.cancelAnimationFrame=window.cancelAnimationFrame.bind(window);
window.HTMLCanvasElement.prototype.getContext=()=>null;
window.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};window.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
let copied='';Object.defineProperty(window.navigator,'clipboard',{value:{writeText:async value=>{copied=value;}}});
const vite=await createServer({server:{middlewareMode:true},appType:'custom'});
let root;
try {
 const React=await import('react');const {act}=React;const {createRoot}=await import('react-dom/client');
 const {default:App}=await vite.ssrLoadModule('/src/App.tsx');const {LocaleProvider}=await vite.ssrLoadModule('/src/lib/Locale.tsx');const {ThemeProvider}=await vite.ssrLoadModule('/src/lib/Theme.tsx');
 root=createRoot(document.getElementById('root'));
 await act(async()=>{root.render(React.createElement(ThemeProvider,null,React.createElement(LocaleProvider,null,React.createElement(App))));await new Promise(r=>setTimeout(r,250));});
 await act(async()=>{await new Promise(r=>setTimeout(r,150));});
 assert.match(document.querySelector('h1').textContent,/Pélé Abou/);
 assert.equal(document.querySelectorAll('.project-card').length,4);
 assert.equal(document.querySelectorAll('.timeline-item').length,3);
 const {experience}=await vite.ssrLoadModule('/src/data/experience.ts');const devsecops=experience.find(x=>x.id==='bnetd-devsecops'),pada=experience.find(x=>x.id==='bnetd-pada');assert.equal(devsecops.period.fr,'Mai 2025 — Juil. 2025');assert.equal(pada.period.fr,'Juil. 2024 — Sep. 2024');assert.equal(experience.find(x=>x.id==='electrocenter').order,1);assert.match(document.querySelector('.timeline-item img').src,/electrocenter/);
 assert.equal(document.querySelectorAll('.project-screenshot').length,2);assert.match(document.querySelector('.about-portrait img').src,/portrait-secondary/);assert.match(document.querySelector('.portrait-fallback').src,/hero-source/);
 const {tools,heroTools}=await vite.ssrLoadModule('/src/data/tools.ts');assert.equal(tools.length,27);assert.ok(heroTools.length>=22);assert.ok(heroTools.every(x=>x.svg||x.image));assert.ok(!tools.some(x=>/metasploit|splunk|docker|kubernetes|nessus/i.test(x.name)));
 const {coverCrop,toolLayout}=await vite.ssrLoadModule('/src/lib/heroGeometry.ts');
 for(const [w,h,compact] of [[560,640,false],[400,580,false],[310,460,true]]){const tiles=toolLayout(w,h,heroTools.length,compact);assert.ok(tiles.length>0);if(compact)assert.ok(tiles.length<=10);for(const a of tiles){assert.ok(a.x>=0&&a.y>=0&&a.x+a.size<=w&&a.y+a.size<h-65);assert.ok(a.x+a.size<=w*.22||a.x>=w*.78,'face exclusion');}for(let i=0;i<tiles.length;i++)for(let j=i+1;j<tiles.length;j++){const a=tiles[i],b=tiles[j];assert.ok(a.x+a.size<=b.x||b.x+b.size<=a.x||a.y+a.size<=b.y||b.y+b.size<=a.y,'no icon overlap');}}const crop=coverCrop(1586,992,560,640);assert.ok(crop.x>=0&&crop.y>=0&&crop.x+crop.width<=1586&&crop.y+crop.height<=992);assert.ok(Math.abs(crop.width/crop.height-560/640)<.001);
 assert.equal(document.querySelectorAll('.certificate-card').length,11);
 assert.equal(document.querySelectorAll('.school-card').length,3);assert.equal(document.querySelectorAll('.school-logo-insa').length,1);assert.equal(document.querySelectorAll('.school-logo-hestim').length,1);
 const click=async el=>{assert.ok(el,'click target exists');el.focus();await act(async()=>{el.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));await new Promise(r=>setTimeout(r,300));});};
 await click(document.querySelector('.language-toggle'));assert.equal(document.documentElement.lang,'en');assert.match(document.querySelector('#about h2').textContent,/Understand/);
 await click(document.querySelector('.language-toggle'));assert.equal(document.documentElement.lang,'fr');
 await click(document.querySelector('[data-theme-option="dark"]'));assert.equal(document.documentElement.dataset.theme,'dark');assert.equal(localStorage.getItem('pelestrom-theme'),'dark');
 await click(document.querySelector('[data-theme-option="light"]'));assert.equal(document.documentElement.dataset.theme,'light');assert.equal(document.documentElement.style.colorScheme,'light');
 await click(document.querySelector('[data-theme-option="system"]'));assert.equal(localStorage.getItem('pelestrom-theme'),'system');
 await click(document.querySelectorAll('.project-filters button')[2]);assert.equal(document.querySelectorAll('.project-card').length,1);assert.match(document.querySelector('.project-card').textContent,/Ransomware/);await click(document.querySelector('.project-filters button'));
 const input=document.querySelector('.terminal-command-form input');assert.ok(input,'terminal loaded');
 const setInput=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
 async function command(value){await act(async()=>{setInput.call(input,value);input.dispatchEvent(new window.Event('input',{bubbles:true}));});await act(async()=>{input.closest('form').dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));await new Promise(r=>setTimeout(r,30));});}
 await command('help');assert.match(document.querySelector('.terminal-history').textContent,/theme dark/);
 await command('contact');assert.ok(document.querySelector('.terminal-history a[href^="mailto:"]'));
 await command('theme dark');assert.equal(document.documentElement.dataset.theme,'dark');
 await command('lang en');assert.equal(document.documentElement.lang,'en');await command('lang fr');

 await click(document.querySelector('#skills-tab-defensive'));assert.equal(document.querySelector('#skills-tab-defensive').getAttribute('aria-selected'),'true');assert.match(document.querySelector('#skills-panel').textContent,/Sysmon/);
 await act(async()=>{document.querySelector('#skills-tab-defensive').dispatchEvent(new window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));await new Promise(r=>setTimeout(r,300));});assert.equal(document.querySelector('#skills-tab-forensic').getAttribute('aria-selected'),'true');
 assert.equal(localStorage.getItem('pelestrom-language'),'fr');
 assert.ok(!document.querySelector('.portrait-art').classList.contains('canvas-ready'));
 await click(document.querySelector('#certifications-tab-offensive'));assert.equal(document.querySelectorAll('.certificate-card').length,2);
 await click(document.querySelector('#certifications-tab-systems'));assert.equal(document.querySelectorAll('.certificate-card').length,3);assert.match(document.querySelector('#certifications-panel').textContent,/Attestation de participation/);
 await click(document.querySelector('#certifications-tab-all'));
 await click(document.querySelector('.certificate-surface'));assert.ok(document.querySelector('dialog[open]'));assert.equal(document.body.style.overflow,'hidden');
 await click(document.querySelector('dialog [aria-label="Agrandir"]'));assert.ok(document.querySelector('.lightbox-image.is-zoomed'));
 await act(async()=>{document.querySelector('dialog').dispatchEvent(new window.Event('cancel',{cancelable:true}));});assert.equal(document.querySelector('dialog'),null);assert.notEqual(document.body.style.overflow,'hidden');assert.ok(document.activeElement.classList.contains('certificate-surface'));
 await click(document.querySelector('#contact [aria-label="Copier l’email"]'));assert.equal(copied,'Pele.Ouattara@uphf.fr');
 const detail=document.querySelector('.details-button');await click(detail);assert.equal(detail.getAttribute('aria-expanded'),'true');assert.equal(document.querySelector('#detail-veritas').hidden,false);
 for(const a of document.querySelectorAll('a[href^="#"]'))assert.ok(document.getElementById(a.getAttribute('href').slice(1)),`anchor ${a.href}`);
 for(const a of document.querySelectorAll('a[target="_blank"]')){assert.match(a.rel,/noopener/);assert.match(a.rel,/noreferrer/);assert.ok(a.href.startsWith('https://'));}
 assert.ok(!document.body.textContent.includes('TODO'));assert.ok(!document.body.textContent.includes('Maestro Digital Studio'));
 const cv=document.querySelector('a[download][href*="CV.pdf"]');assert.ok(cv);assert.ok(fs.existsSync(path.join('public','documents','Pele-Abou-Ouattara-CV.pdf')));
 console.log('PASS: FR/EN, 4 projects, 11 credentials, 3 experiences, separate INSA/HESTIM logos and initial diploma, corrected internship dates, screenshots, CV tools, hero cover/layout geometry, themes, terminal, project filters, tabs, lightbox/zoom/focus, copy, details, anchors, downloads, external-link attributes.');
} finally {if(root){const {act}=await import('react');await act(async()=>root.unmount());}await vite.close();dom.window.close();}
