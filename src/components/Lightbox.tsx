import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useLocale } from '../lib/Locale';
export interface LightboxContent { image:string;title:string;pdfUrl?:string; }
export function Lightbox({content,onClose}:{content:LightboxContent;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const closeButton=useRef<HTMLButtonElement>(null);const [zoom,setZoom]=useState(false);const {t}=useLocale();
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const d=dialog.current;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';d?.showModal();closeButton.current?.focus();return()=>{d?.close();document.body.style.overflow=overflow;previous?.focus();};},[]);
 return createPortal(<dialog className="lightbox" ref={dialog} aria-label={content.title} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
 <div className="lightbox-toolbar"><p>{content.title}</p><div><button className="icon-button" onClick={()=>setZoom(z=>!z)} aria-label={zoom?t.zoomOut:t.zoomIn}>{zoom?<ZoomOut/>:<ZoomIn/>}</button>{content.pdfUrl&&<a href={content.pdfUrl} download className="icon-button" aria-label={t.download}><Download/></a>}<button className="icon-button" ref={closeButton} onClick={onClose} aria-label={t.close}><X/></button></div></div>
 <div className={`lightbox-image ${zoom?'is-zoomed':''}`} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><img src={content.image} alt={content.title}/></div>
 </dialog>,document.body);
}
