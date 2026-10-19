import { asset, documentUrl } from '../lib/assets';
export const profile = {
 name:'Pélé Abou Ouattara', alias:'Pelestrom', email:'Pele.Ouattara@uphf.fr', location:'Casablanca, Maroc',
 githubUrl:'https://github.com/Pelestrom', linkedinUrl:'https://www.linkedin.com/in/p%C3%A9l%C3%A9/',
 cvUrl:documentUrl('Pele-Abou-Ouattara-CV.pdf'), portrait:asset('hero-source.webp'), portraitWidth:1586, portraitHeight:992, secondaryPortrait:asset('portrait-secondary.webp'), secondaryWidth:1672, secondaryHeight:941,
 status:{fr:'À la recherche d’un stage en cybersécurité',en:'Seeking a cybersecurity internship'},
 intro:{fr:'Étudiant en cyberdéfense et sécurité de l’information. J’explore l’attaque, la détection et les traces numériques pour mieux comprendre et défendre les systèmes.',en:'Cyberdefence and information security student. I explore attacks, detection and digital traces to better understand and defend systems.'},
 about:{fr:'Étudiant en double diplomation HESTIM–INSA Hauts-de-France, spécialisé en cyberdéfense et sécurité de l’information. Mes bases en développement, systèmes et bases de données s’appuient sur des projets pratiques en forensic numérique, détection, simulation d’attaques, gestion des vulnérabilités et sécurité réseau.',en:'A student in the HESTIM–INSA Hauts-de-France dual degree programme, specialising in cyberdefence and information security. My background in development, systems and databases supports hands-on projects in digital forensics, detection, attack simulation, vulnerability management and network security.'},
 interests:{fr:['Robotique','Lecture','Tennis de table'],en:['Robotics','Reading','Table tennis']},
 languages:{fr:['Français — courant','Anglais — intermédiaire'],en:['French — fluent','English — intermediate']},
 // Photography supplied by the owner. No creative-content gallery per user instruction.
};
