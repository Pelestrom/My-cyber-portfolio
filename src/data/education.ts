import { asset } from '../lib/assets';
import type { Education } from '../types';
export const education:Education[] = [
 {id:'inp',institution:'INP-HB',title:{fr:'Diplôme de technicien supérieur en électronique, informatique et télécommunications (Bac +3)',en:'Higher Technician Diploma in Electronics, Computing and Telecommunications (three-year degree)'},note:{fr:'Mention Bien',en:'Graduated with honours'},logo:asset('logos/inp.webp'),enabled:true,order:1},
 {id:'hestim',institution:'HESTIM Engineering Business School',title:{fr:'Master professionnel Cybersécurité',en:'Professional Master’s programme in Cybersecurity'},period:{fr:'2025 – En cours',en:'2025 – Present'},location:{fr:'Casablanca, Maroc',en:'Casablanca, Morocco'},logo:asset('logos/hestim.webp'),enabled:true,order:2},
];
// TODO: INP-HB dates and location omitted because the CV line is inconsistent; request corrected values.
