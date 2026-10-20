export const site = { bootEnabled:false, // Enable the short optional introduction if desired.
 title:'Pelestrom — Pélé Abou Ouattara', // Public domain is configured in the root site.config.json.
 sections:['about','skills','projects','certifications','experience','education','contact'],
 bootLines:['> init portfolio_session ... OK','> load evidence_registry ... OK','> render interface ... READY'],
 terminalPrompt:'pelestrom@portfolio:~$', sessionKey:'pelestrom-boot', languageKey:'pelestrom-language',
 motion:{fast:0.12,base:0.22,medium:0.35,reveal:0.7,stagger:0.08,ease:[0.22,1,0.36,1] as [number,number,number,number]},
};
