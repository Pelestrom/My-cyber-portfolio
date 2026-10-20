import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { certifications } from '../data/certifications';
import type { Certification } from '../types';
import { CertificateCard } from '../components/CertificateCard';
import { LocaleFade, useLocale } from '../lib/Locale';
import { SectionHeader } from '../components/SectionHeader';
import { Lightbox } from '../components/Lightbox';
import { useReducedMotion } from '../hooks/useReducedMotion';
export default function Certifications(){
 const {t}=useLocale();
 const [selected,setSelected]=useState<Certification|null>(null);
 const reduced=useReducedMotion();
 const featured=certifications.filter(c=>c.enabled&&c.featured).sort((a,b)=>a.order-b.order);
 const total=certifications.filter(c=>c.enabled).length;
 return <div className="section certifications-section"><SectionHeader number="04" label={t.labels[3]} title={t.certTitle} description={t.certSub}/><motion.div className="certificate-grid" layout={!reduced} transition={{layout:reduced?{duration:0}:{type:'spring',stiffness:520,damping:42}}}>{featured.map(c=><CertificateCard key={c.id} cert={c} onOpen={setSelected}/>)}</motion.div><a className="button button-outline all-certifications-link" href="#/certifications"><LocaleFade>{t.allCertifications}</LocaleFade><span>({total})</span><ArrowRight size={17}/></a>{selected&&<Lightbox content={{image:selected.fullImage,title:selected.title,pdfUrl:selected.pdfUrl,layoutId:`certificate-image-${selected.id}`}} onClose={()=>setSelected(null)}/>}</div>;
}
