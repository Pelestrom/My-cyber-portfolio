import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { certifications } from '../data/certifications';
import { CertificateCard } from '../components/CertificateCard';
import { Lightbox } from '../components/Lightbox';
import { LocaleFade, useLocale } from '../lib/Locale';
import type { Certification } from '../types';

const categories = ['offensive', 'defensive', 'fundamentals', 'systems'];
const batchSize = 12;
const enabled = certifications.filter(cert => cert.enabled);

function dateValue(value: string): number {
  const [day, month, year] = value.split('/').map(Number);
  return year && month && day ? new Date(year, month - 1, day).getTime() : 0;
}

export function CertificationsPage() {
  const { t, lang, toggle } = useLocale();
  const heading = useRef<HTMLHeadingElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [issuer, setIssuer] = useState('all');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [limit, setLimit] = useState(batchSize);
  const [selected, setSelected] = useState<Certification | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, []);

  const issuers = [...new Set(enabled.map(cert => cert.issuer))].sort((a, b) => a.localeCompare(b));
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return enabled
      .filter(cert => category === 'all' || cert.category === category)
      .filter(cert => issuer === 'all' || cert.issuer === issuer)
      .filter(cert => !needle || [cert.title, cert.issuer, cert.id, cert.credentialId ?? ''].some(value => value.toLocaleLowerCase().includes(needle)))
      .sort((a, b) => (sort === 'newest' ? -1 : 1) * (dateValue(a.date) - dateValue(b.date)));
  }, [enabled, query, category, issuer, sort]);

  function resetBatch(action: () => void) {
    setLimit(batchSize);
    action();
  }

  return <main className="certifications-page">
    <div className="certifications-page-top"><a className="certifications-back" href="#hero"><ArrowLeft size={18}/><LocaleFade>{t.backPortfolio}</LocaleFade></a><button className="language-toggle certifications-language" onClick={toggle} aria-label={t.language}><span className={lang==='fr'?'selected':''}>FR</span><span>/</span><span className={lang==='en'?'selected':''}>EN</span></button></div>
    <header className="certifications-page-header">
      <span className="small-label"><LocaleFade>{t.labels[3]}</LocaleFade></span>
      <h1 ref={heading} tabIndex={-1}><LocaleFade>{t.allCertificationsTitle}</LocaleFade></h1>
      <p><LocaleFade>{t.certSub}</LocaleFade></p>
    </header>
    <div className="certification-filters">
      <label className="certification-search" htmlFor="certification-search"><Search size={18}/><span className="sr-only"><LocaleFade>{t.searchCertifications}</LocaleFade></span><input id="certification-search" type="search" value={query} placeholder={t.searchCertifications} onChange={event => resetBatch(() => setQuery(event.target.value))}/></label>
      <label htmlFor="certification-category"><span><LocaleFade>{t.categoryFilter}</LocaleFade></span><select id="certification-category" value={category} onChange={event => resetBatch(() => setCategory(event.target.value))}><option value="all">{t.certCategories[0]}</option>{categories.map((id, index) => <option key={id} value={id}>{t.certCategories[index + 1]}</option>)}</select></label>
      <label htmlFor="certification-issuer"><span><LocaleFade>{t.issuerFilter}</LocaleFade></span><select id="certification-issuer" value={issuer} onChange={event => resetBatch(() => setIssuer(event.target.value))}><option value="all">{t.allIssuers}</option>{issuers.map(name => <option key={name} value={name}>{name}</option>)}</select></label>
      <label htmlFor="certification-sort"><span><LocaleFade>{t.sortByDate}</LocaleFade></span><select id="certification-sort" value={sort} onChange={event => setSort(event.target.value as 'newest' | 'oldest')}><option value="newest">{t.newestFirst}</option><option value="oldest">{t.oldestFirst}</option></select></label>
    </div>
    <p className="certification-results" role="status" aria-live="polite"><strong>{filtered.length}</strong> <LocaleFade>{t.certResults}</LocaleFade></p>
    <div className="certificate-grid certifications-page-grid">{filtered.slice(0, limit).map(cert => <CertificateCard key={cert.id} cert={cert} onOpen={setSelected}/>)}</div>
    {filtered.length > limit && <button className="button button-outline certifications-more" onClick={() => setLimit(value => value + batchSize)}><LocaleFade>{t.showMore}</LocaleFade></button>}
    {selected && <Lightbox content={{ image: selected.fullImage, title: selected.title, pdfUrl: selected.pdfUrl, layoutId: `certificate-image-${selected.id}` }} onClose={() => setSelected(null)}/>}
  </main>;
}
