/** Local, deterministic extraction. Brand provenance is retained; no remote runtime assets. */
import * as icons from 'simple-icons';
import fs from 'node:fs';
const slugs=['burpsuite','jsonwebtokens','wireshark','linux','python','go','javascript','typescript','react','git','github','gitlab','postgresql','mysql','supabase','kotlin','jetpackcompose','streamlit','kalilinux','virustotal'];
const generated={};
for(const slug of slugs){const icon=Object.values(icons).find(i=>i.slug===slug);if(!icon)throw new Error(`Missing official icon: ${slug}`);fs.writeFileSync(`src/assets/tools/${slug}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="${icon.path}"/></svg>`);generated[slug]={hex:`#${icon.hex}`,source:icon.source,license:icon.license??'See Simple Icons CC0 and upstream brand policy'};}
fs.writeFileSync('src/data/tools.generated.json',JSON.stringify(generated,null,2)+'\n');console.log(`${slugs.length} local official glyphs prepared.`);
	for(const obsolete of ['security-onion.webp','chainsaw.webp'])fs.rmSync(`src/assets/tools/${obsolete}`,{force:true});
