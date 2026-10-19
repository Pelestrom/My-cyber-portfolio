export function luminance(hex:string){const c=hex.replace('#','');if(!/^[0-9a-f]{6}$/i.test(c))return 0;return [0,2,4].map(i=>parseInt(c.slice(i,i+2),16)/255).map(n=>n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[0.2126,0.7152,0.0722][i],0);}
export const contrast=(a:string,b:string)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};
