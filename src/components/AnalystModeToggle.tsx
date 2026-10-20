import { useEffect, useState } from 'react';
import { ScanEye } from 'lucide-react';
import { useLocale } from '../lib/Locale';

export function AnalystModeToggle(){
 const {t}=useLocale();const [active,setActive]=useState(false);
 useEffect(()=>{
  if(active)document.documentElement.dataset.analystMode='true';
  else delete document.documentElement.dataset.analystMode;
  return()=>{delete document.documentElement.dataset.analystMode;};
 },[active]);
 return <button className="analyst-mode-toggle" type="button" aria-pressed={active} title={active?t.analystModeActive:t.analystMode} onClick={()=>setActive(value=>!value)}>
  <ScanEye size={16} aria-hidden="true"/><span>{t.analystMode}</span>
 </button>;
}
