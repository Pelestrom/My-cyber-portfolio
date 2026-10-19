import { Navigation } from './components/Navigation';
import { Boot } from './components/Boot';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience, Education } from './sections/Experience';
import { Contact } from './sections/Contact';
import { LazyCertifications } from './components/LazyCertifications';
export default function App(){return <><Boot/><Navigation/><main id="main"><Hero/><div className="content-wrap"><About/><Skills/><Projects/><LazyCertifications/><Experience/><Education/><Contact/></div></main><CustomCursor/></>;}
