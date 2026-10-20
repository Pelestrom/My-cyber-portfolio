export type Lang = 'fr' | 'en';
export type Localized = { fr: string; en: string };
export type Category = 'offensive' | 'defensive' | 'forensic' | 'systems' | 'development';
export interface Tool { id: string; name: string;  category: Category; color: string; svg?: string; logoMode?:'mask'|'image'; hero?:boolean; heroOrder?:number; level?:'pratique'|'notions'|null; source?:string; }
export interface Project { id:string; title:string; label:Localized; description:Localized; contribution:Localized; stack:string[]; githubUrl?:string; publicationUrl?:string; liveUrl?:string; liveLabel?:Localized; image?:string; extraImage?:string; visual:'veritas'|'ransomware'|'vulnerability'|'android'; note?:Localized; enabled:boolean; featured:boolean; order:number; }
export interface Certification { id:string; title:string; issuer:string; category:'offensive'|'defensive'|'fundamentals'|'systems'; kind:'certification'|'completion'|'attendance'; date:string; expiryDate?:string; credentialId?:string; image:string; fullImage:string; pdfUrl:string; accentColor:string; verifyUrl?:string; verifyLabel:Localized; enabled:boolean; featured:boolean; order:number; }
export interface Experience { id:string; title:Localized; organization:string; period:Localized; location:Localized; contract?:Localized; bullets:Localized[]; logo?:string; enabled:boolean; order:number; }
export interface Education { id:string; institution:string; title:Localized; period?:Localized; location?:Localized; note?:Localized; logo:string; enabled:boolean; order:number; }
