import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '../lib/Locale';
import { useTheme, type ThemePreference } from '../lib/Theme';
import { profile } from '../data/profile';
import { refinement } from '../data/refinement';
interface Line { command:string;text:string;url?:string;download?:boolean; }
export function ContactTerminal(){const {lang,setLang}=useLocale();const {setPreference}=useTheme();const copy=refinement[lang];const [value,setValue]=useState('');const [history,setHistory]=useState<Line[]>([]);
 function submit(e:FormEvent){e.preventDefault();const input=value.trim().slice(0,100);setValue('');if(!input)return;const [command,arg]=input.toLowerCase().split(/\s+/);let line:Line={command:input,text:copy.unknown};
 if(command==='help')line.text=copy.terminalHelp;else if(command==='contact')line={command:input,text:profile.email,url:`mailto:${profile.email}`};else if(command==='cv')line={command:input,text:profile.name,url:profile.cvUrl[lang],download:true};else if(command==='github')line={command:input,text:profile.githubUrl,url:profile.githubUrl};else if(command==='linkedin')line={command:input,text:'LinkedIn',url:profile.linkedinUrl};else if(command==='theme'&&['dark','light'].includes(arg)){setPreference(arg as ThemePreference);line.text=copy.terminalTheme;}else if(command==='lang'&&(arg==='fr'||arg==='en')){setLang(arg);line.text=refinement[arg].terminalLanguage;}else if(command==='clear'){setHistory([]);return;}
 setHistory(lines=>[...lines.slice(-14),line]);}
 return <div className="terminal-interactive"><div className="terminal-header"><span>{copy.terminalTitle}</span><span>pelestrom@portfolio:~</span></div><div className="terminal-console"><p>{copy.terminalHint}</p><div className="terminal-history" role="log" aria-live="polite">{history.map((line,i)=><div key={i}><code>$ {line.command}</code><p>{line.url?<a href={line.url} download={line.download||undefined} target={line.url.startsWith('https')?'_blank':undefined} rel={line.url.startsWith('https')?'noopener noreferrer':undefined}>{line.text}</a>:line.text}</p></div>)}</div><form className="terminal-command-form" onSubmit={submit}><span aria-hidden="true">$</span>{!value&&<span className="terminal-input-caret" aria-hidden="true"/>}<input aria-label={copy.terminalLabel} value={value} onChange={e=>setValue(e.target.value)} spellCheck={false} autoComplete="off" autoCapitalize="off" maxLength={100}/><button className="icon-button" type="submit" aria-label={copy.execute}><ArrowRight size={18}/></button></form></div></div>;
}
