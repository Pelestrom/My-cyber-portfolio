import { Copy, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocale } from '../lib/Locale';
export function CopyButton({value,label,compact=false}:{value:string;label:string;compact?:boolean}){
 const {t}=useLocale();const [state,setState]=useState<'idle'|'copied'|'error'>('idle');const timer=useRef<number>();useEffect(()=>()=>window.clearTimeout(timer.current),[]);
 async function copy(){try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(value);setState('copied');}catch{setState('error');}window.clearTimeout(timer.current);timer.current=window.setTimeout(()=>setState('idle'),2600);}
 return <span className="copy-control"><button className={compact?'icon-button':'button button-outline'} onClick={copy} aria-label={state==='copied'?t.copied:label} title={label}>{state==='copied'?<Check size={16}/>:<Copy size={16}/>} {!compact&&(state==='copied'?t.copied:label)}</button><span className={state==='error'?'copy-error':'sr-only'} role="status">{state==='copied'?t.copied:state==='error'?t.copyFailed:''}</span></span>;
}
