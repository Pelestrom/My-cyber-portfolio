import { useEffect, useState } from 'react';
import { useLocale } from '../lib/Locale';
import { refinement } from '../data/refinement';
export function LiveClock(){const {lang}=useLocale();const [now,setNow]=useState(()=>new Date());useEffect(()=>{const id=window.setInterval(()=>{if(!document.hidden)setNow(new Date());},1000);return()=>clearInterval(id);},[]);return <span className="live-clock"><span>{refinement[lang].localTime}</span><time dateTime={now.toISOString()}>{new Intl.DateTimeFormat(lang,{timeZone:'Africa/Casablanca',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now)}</time></span>;}
