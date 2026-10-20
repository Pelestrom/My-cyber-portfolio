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
 return <button className="analyst-mode-toggle" type="button" aria-pressed={active} onClick={()=>setActive(value=>!value)}>
  <ScanEye size={16} aria-hidden="true"/><span>{active?t.analystModeActive:t.analystMode}</span><kbd>HUD</kbd>
 </button>;
}
