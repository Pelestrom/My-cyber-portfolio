import { asset, documentUrl } from '../lib/assets';
export const profile = {
 name:'Pélé Abou Ouattara', alias:'Pelestrom', email:'Pele.Ouattara@uphf.fr', location:'Casablanca, Maroc',
 githubUrl:'https://github.com/Pelestrom', linkedinUrl:'https://www.linkedin.com/in/p%C3%A9l%C3%A9/',
 cvUrl:{fr:documentUrl('CV-Pele-Abou-Ouattara-FR.pdf'),en:documentUrl('CV-Pele-Abou-Ouattara-EN.pdf')}, portrait:asset('hero-source.webp'), portraitWidth:1586, portraitHeight:992, secondaryPortrait:asset('portrait-secondary.webp'), secondaryWidth:1672, secondaryHeight:941,
 status:{fr:'À la recherche d’un stage en cybersécurité',en:'Seeking a cybersecurity internship'},
 intro:{fr:'Étudiant en cyberdéfense et sécurité de l’information. J’explore l’attaque, la détection et les traces numériques pour mieux comprendre et défendre les systèmes.',en:'Cyberdefence and information security student. I explore attacks, detection and digital traces to better understand and defend systems.'},
 about:{fr:'\u00c9tudiant en double diplomation HESTIM\u2013INSA Hauts-de-France, sp\u00e9cialis\u00e9 en cyberd\u00e9fense et s\u00e9curit\u00e9 de l\u2019information. Mon parcours combine des comp\u00e9tences en d\u00e9veloppement, syst\u00e8mes et bases de donn\u00e9es, renforc\u00e9es par des projets pratiques en forensic num\u00e9rique, d\u00e9tection des menaces, simulation d\u2019attaques et gestion des vuln\u00e9rabilit\u00e9s.',en:'A dual-degree student at HESTIM and INSA Hauts-de-France, specialising in cyberdefence and information security. My background combines skills in development, systems and databases, strengthened by hands-on projects in digital forensics, threat detection, attack simulation and vulnerability management.'},
 interests:{fr:['Robotique','Lecture','Tennis de table'],en:['Robotics','Reading','Table tennis']},
 languages:{fr:['Français — courant','Anglais — intermédiaire'],en:['French — fluent','English — intermediate']},
 // Photography supplied by the owner. No creative-content gallery per user instruction.
};
