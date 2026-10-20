import { asset } from '../lib/assets';
import generated from './tools.generated.json';
import external from './tools.external.json';
import type { Tool } from '../types';
// Local official SVGs only. Missing artwork is represented by the name, never an invented monogram.
// Levels require explicit confirmation; null means no proficiency claim.
// TODO: add { id, name, category, color, svg?:asset('tools/name.svg') } for a confirmed tool.
export const tools:Tool[] = [
 {id:'burp',name:'Burp Suite',category:'offensive',color:'#ff6633',svg:asset('tools/burpsuite.svg'),hero:true,heroOrder:2},
 {id:'nmap',name:'Nmap',category:'offensive',color:'#6ca9ff',svg:asset('tools/nmap.svg'),logoMode:'image',hero:true,heroOrder:1},
 {id:'jwt',name:'JWT / JWT.io',category:'offensive',color:'#fb7cc3',svg:asset('tools/jsonwebtokens.svg')},
 {id:'onion',name:'Security Onion',category:'defensive',color:'#52b8df',svg:asset('tools/security-onion.svg'),hero:true,heroOrder:4},
 {id:'virustotal',name:'VirusTotal',category:'defensive',color:'#394EFF',svg:asset('tools/virustotal.svg')},
 {id:'sysmon',name:'Sysmon',category:'defensive',color:'#5eadff'},
 {id:'sigma',name:'Sigma',category:'defensive',color:'#ffd080',svg:asset('tools/sigma.svg'),logoMode:'image',hero:true,heroOrder:7},
 {id:'yara',name:'YARA',category:'defensive',color:'#ff6877',svg:asset('tools/yara.svg'),logoMode:'image',hero:true,heroOrder:8},
 {id:'chainsaw',name:'Chainsaw',category:'defensive',color:'#ff9970',svg:asset('tools/chainsaw.svg')},
 {id:'wireshark',name:'Wireshark',category:'forensic',color:'#54b4ed',svg:asset('tools/wireshark.svg'),hero:true,heroOrder:3},
 {id:'exiftool',name:'ExifTool',category:'forensic',color:'#4c9be8',svg:asset('tools/exiftool.svg')},
 {id:'cyberchef',name:'CyberChef',category:'forensic',color:'#d89b31',svg:asset('tools/cyberchef.svg')},
 {id:'tcpdump',name:'tcpdump',category:'forensic',color:'#8b91ff',svg:asset('tools/tcpdump.svg')},
 {id:'kalilinux',name:'Kali Linux',category:'forensic',color:'#557c94',svg:asset('tools/kalilinux.svg')},
 {id:'linux',name:'Linux',category:'systems',color:'#efca56',svg:asset('tools/linux.svg'),hero:true,heroOrder:5},
 {id:'windows',name:'Windows',category:'systems',color:'#59a9ff',svg:asset('tools/windows.svg'),hero:true,heroOrder:9},
 {id:'python',name:'Python',category:'development',color:'#5faff1',svg:asset('tools/python.svg'),hero:true,heroOrder:6},
 {id:'powershell',name:'PowerShell',category:'development',color:'#65acff',svg:asset('tools/powershell.svg'),logoMode:'image',hero:true,heroOrder:10},
 {id:'go',name:'Go',category:'development',color:'#48d3e3',svg:asset('tools/go.svg')},
 {id:'javascript',name:'JavaScript',category:'development',color:'#f7df1e',svg:asset('tools/javascript.svg')},
 {id:'typescript',name:'TypeScript',category:'development',color:'#69b5ff',svg:asset('tools/typescript.svg')},
 {id:'react',name:'React',category:'development',color:'#61dafb',svg:asset('tools/react.svg')},
 {id:'git',name:'Git',category:'development',color:'#f97050',svg:asset('tools/git.svg')},
 {id:'github',name:'GitHub',category:'development',color:'#f0f3ff',svg:asset('tools/github.svg')},
 {id:'gitlab',name:'GitLab',category:'development',color:'#fc9865',svg:asset('tools/gitlab.svg')},
 {id:'postgresql',name:'PostgreSQL',category:'development',color:'#6ea7cf',svg:asset('tools/postgresql.svg')},
 {id:'mysql',name:'MySQL',category:'development',color:'#73b6db',svg:asset('tools/mysql.svg')},
 {id:'supabase',name:'Supabase',category:'development',color:'#3ecf8e',svg:asset('tools/supabase.svg')},

 {id:'kotlin',name:'Kotlin',category:'development',color:'#7F52FF',svg:asset('tools/kotlin.svg')},
 {id:'jetpackcompose',name:'Jetpack Compose',category:'development',color:'#4285F4',svg:asset('tools/jetpackcompose.svg')},
 {id:'okhttp',name:'OkHttp',category:'development',color:'#2E7D32'},
 {id:'streamlit',name:'Streamlit',category:'development',color:'#FF4B4B',svg:asset('tools/streamlit.svg')},
];
tools.forEach(tool=>{tool.level=null;const slug=tool.id==='burp'?'burpsuite':tool.id==='jwt'?'jsonwebtokens':tool.id;const record=generated[slug as keyof typeof generated];if(record){tool.color=record.hex;tool.source=record.source;}else if(tool.id in external)tool.source=external[tool.id as keyof typeof external].source;else tool.source='CV; official artwork pending';});
export const heroTools=tools.filter(tool=>tool.hero).sort((a,b)=>(a.heroOrder??0)-(b.heroOrder??0));
