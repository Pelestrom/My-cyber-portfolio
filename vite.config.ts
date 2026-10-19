import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from './site.config.json';
// Optional public URL, never a secret. No environment variable is required.
const siteUrl=config.siteUrl as string|null;
const canonical=siteUrl?new URL(siteUrl.endsWith('/')?siteUrl:siteUrl+'/').href:null;
export default defineConfig({plugins:[react(),{
 name:'portfolio-seo',
 transformIndexHtml(html){html=html.replace(/<meta property="og:image"[^>]*>/,'');const tags=[{tag:'meta',attrs:{name:'twitter:card',content:'summary_large_image'}},{tag:'meta',attrs:{property:'og:locale',content:'fr_FR'}}];if(canonical)tags.push({tag:'meta',attrs:{property:'og:url',content:canonical}},{tag:'meta',attrs:{property:'og:image',content:new URL('social-card.png',canonical).href}});return {html,tags:[...tags,...(canonical?[{tag:'link',attrs:{rel:'canonical',href:canonical}}]:[])]};},
 generateBundle(){this.emitFile({type:'asset',fileName:'robots.txt',source:'User-agent: *\nAllow: /\n'+(canonical?'Sitemap: '+new URL('sitemap.xml',canonical).href+'\n':'')});if(canonical)this.emitFile({type:'asset',fileName:'sitemap.xml',source:'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+canonical.replaceAll('&','&amp;')+'</loc></url></urlset>'});}
}],base:'./',build:{target:'es2022'}});
