import { ArrowDown, Download } from 'lucide-react';
import { useLocale } from '../lib/Locale';
import { profile } from '../data/profile';
import { refinement } from '../data/refinement';
import { PortraitCanvas } from '../components/PortraitCanvas';
import { LiveClock } from '../components/LiveClock';
import { useDecodeText } from '../hooks/useDecodeText';
export function Hero(){const {t,lang}=useLocale();const copy=refinement[lang];const {display,decode}=useDecodeText('OUATTARA.');return <section id="hero" className="hero bracket"><div className="hero-grid" aria-hidden="true"/><div className="hero-top"><span>{copy.mission}</span><LiveClock/></div><div className="hero-content"><div className="hero-copy"><p className="hero-alias">Pelestrom / {copy.seek}</p><h1 aria-label={profile.name}>Pélé Abou<br/><span className="glitch-title" onMouseEnter={decode} aria-hidden="true">{display}</span></h1><p className="hero-statement">{copy.heroStatement}</p><p className="hero-description">{profile.intro[lang]}</p><div className="hero-buttons"><a className="button button-primary" href="#projects">{t.projects}</a><a className="button button-outline" href={profile.cvUrl} download><Download size={17}/>{t.cv}</a></div><div className="hero-domains" aria-label={copy.focusLabel}>{copy.focus.map(s=><span key={s}>{s}</span>)}</div></div><PortraitCanvas/></div><div className="hero-bottom"><span className="availability"><span className="signal-dot"/>{profile.status[lang]}</span><a href="#about" className="scroll-cue">{t.scroll}<ArrowDown size={16}/></a></div></section>;}
