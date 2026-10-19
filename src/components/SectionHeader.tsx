import { useDecodeText } from '../hooks/useDecodeText';
export function SectionHeader({number,label,title,description}:{number:string;label:string;title:string;description:string}){
 const {display,decode}=useDecodeText(title);
 return <header className="section-heading">
 <div className="section-caption"><span>{number}</span><p>{label}</p></div>
 <div className="section-heading-row"><h2 onMouseEnter={decode} aria-label={title}><span aria-hidden="true">{display}</span></h2><p>{description}</p></div>
 </header>;
}
