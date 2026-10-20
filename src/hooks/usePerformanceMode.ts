import { useState } from 'react';

function prefersLiteMode(){
 if(typeof navigator==='undefined')return false;
 const device=navigator as Navigator&{deviceMemory?:number};
 return (device.hardwareConcurrency||8)<=4||(device.deviceMemory!==undefined&&device.deviceMemory<=4);
}

export function usePerformanceMode(){
 const [lite]=useState(prefersLiteMode);
 return lite;
}
