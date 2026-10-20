import { forwardRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Expand, Download } from 'lucide-react';
import { site } from '../data/site';
import { refinement } from '../data/refinement';
import type { Certification } from '../types';
import { LocaleFade, useLocale } from '../lib/Locale';
import { CopyButton } from './CopyButton';
import { useTilt } from '../hooks/useTilt';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CertificateCardProps { cert: Certification; onOpen: (cert: Certification) => void; }

export const CertificateCard = forwardRef<HTMLElement, CertificateCardProps>(function CertificateCard({ cert, onOpen }, ref) {
  const { t, lang } = useLocale();
  const tilt = useTilt(12);
  const reduced = useReducedMotion();
  return <motion.article ref={ref} layout={!reduced} className={`certificate-card ${cert.featured ? 'featured-credential' : ''}`} style={{ '--cert-color': cert.accentColor } as CSSProperties} initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: false, margin: '-12% 0px' }} exit={reduced ? { opacity: 1 } : { opacity: 0, scale: .97, filter: 'blur(4px)' }} transition={{ duration: reduced ? 0 : .7, ease: site.motion.ease, layout: reduced ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 42 } }}>
    <div className="certificate-perspective"><button ref={el => { tilt.ref.current = el; }} className="certificate-surface" onPointerMove={tilt.move} onPointerLeave={tilt.leave} onClick={() => onOpen(cert)} aria-label={`${t.openCert} : ${cert.title}`}><motion.img src={cert.image} alt={cert.title} loading="lazy" width="1000" height="707" layoutId={`certificate-image-${cert.id}`}/><span className="certificate-glare"/><span className="card-inspection-label" aria-hidden="true"><LocaleFade>{t.inspectAction}</LocaleFade></span><span className="cert-zoom"><Expand size={17}/></span></button></div>
    <div className="certificate-meta"><div className="cert-kind"><span><LocaleFade>{t.certKinds[cert.kind]}</LocaleFade></span><span>{cert.date}</span></div><h3>{cert.title}</h3><p>{cert.issuer}</p><a className="credential-pdf" href={cert.pdfUrl} download><Download size={14}/><LocaleFade>{refinement[lang].pdf}</LocaleFade></a>{cert.expiryDate && <p className="cert-expiry"><LocaleFade>{t.expiry}</LocaleFade> {cert.expiryDate}</p>}{cert.credentialId && <div className="credential-id"><code>{cert.credentialId}</code><CopyButton value={cert.credentialId} label={t.copyId} compact/></div>}{cert.verifyUrl && <a className="verify-link" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"><LocaleFade>{cert.verifyLabel[lang]}</LocaleFade><ArrowUpRight size={16}/></a>}</div>
  </motion.article>;
});
