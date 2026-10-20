const assets = import.meta.glob<string>(['../assets/**/*.{webp,svg,png,jpg}','!../assets/tools/security-onion.webp','!../assets/tools/chainsaw.webp'], { eager:true, query:'?url', import:'default' });
export function asset(path:string):string { const url=assets[`../assets/${path}`]; if(!url) throw new Error(`Missing bundled asset: ${path}`); return url; }
export const documentUrl=(name:string)=>`${import.meta.env.BASE_URL}documents/${name}`;
