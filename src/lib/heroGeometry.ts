/** Cover-crop geometry matches the static fallback's object-fit: cover. */
export interface HeroToolPosition { x:number; y:number; size:number; rotation:number; depth:number; driftX:number; driftY:number; speedX:number; speedY:number; phaseX:number; phaseY:number; phaseOffset:number; holdDuration:number; }
export function seededRandom(initialSeed:number){let seed=initialSeed;return()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};}
export const HERO_FOCAL={x:.43,y:.51,zoom:1.1};

export function coverCrop(sourceWidth:number,sourceHeight:number,width:number,height:number,fx=.5,fy=.5,zoom=1){
 const aspect=width/height;const sourceAspect=sourceWidth/sourceHeight;
 const cropWidth=(sourceAspect>aspect?sourceHeight*aspect:sourceWidth)/Math.max(1,zoom);
 const cropHeight=(sourceAspect>aspect?sourceHeight:sourceWidth/aspect)/Math.max(1,zoom);
 const x=Math.max(0,Math.min(sourceWidth-cropWidth,Math.max(0,Math.min(1,fx))*sourceWidth-cropWidth/2));
 const y=Math.max(0,Math.min(sourceHeight-cropHeight,Math.max(0,Math.min(1,fy))*sourceHeight-cropHeight/2));
 return {x,y,width:cropWidth,height:cropHeight};
}
export function subjectEdgeAtY(y:number){
 const points=[[0,.5],[.34,.5],[.52,.57],[.68,.64],[1,.7]] as const;
 const normalized=Math.max(0,Math.min(1,y));
 for(let index=1;index<points.length;index++){
  const [endY,endX]=points[index], [startY,startX]=points[index-1];
  if(normalized<=endY)return startX+(endX-startX)*(normalized-startY)/(endY-startY);
 }
 return .7;
}
export function projectSourcePoint(sourceX:number,sourceY:number,crop:{x:number;y:number;width:number;height:number},width:number,height:number){
 return{x:(sourceX-crop.x)*width/crop.width,y:(sourceY-crop.y)*height/crop.height};
}
/** Seeded stratified placement with Poisson spacing and independent drift/lifecycle phases. */
export function heroToolLayout(width:number,height:number,total:number,compact:boolean):HeroToolPosition[]{
 if(width<180||height<180)return [];
 const count=Math.min(total,compact?6:10),usefulTop=height*.08,usefulBottom=height*.78,minDistance=Math.min(width,height)*.15;
 let best:HeroToolPosition[]=[];
 for(let restart=0;restart<36;restart++){
  const random=seededRandom(641+restart*7919),strata=Array.from({length:count},(_,index)=>index),positions:HeroToolPosition[]=[];
  for(let index=strata.length-1;index>0;index--){const swap=Math.floor(random()*(index+1));[strata[index],strata[swap]]=[strata[swap],strata[index]];}
  for(const stratum of strata){
   let placed:HeroToolPosition|undefined,bestSpacing=-1;
   for(let attempt=0;attempt<500;attempt++){
    const size=30+random()*26,minX=width*.58+size/2,maxX=Math.min(width*.94-size/2,width-size/2),minY=Math.max(usefulTop+size/2,size/2+2),maxY=Math.min(usefulBottom-size/2,height-size/2-42);
    if(maxX<=minX||maxY<=minY)break;
    const x=minX+random()*(maxX-minX),bandHeight=(maxY-minY)/count,y=minY+(stratum+random())*bandHeight;
    let spacing=Infinity,valid=true,alignmentPenalty=0;
    for(const other of positions){const dx=Math.abs(x-(other.x+other.size/2)),dy=Math.abs(y-(other.y+other.size/2)),distance=Math.hypot(dx,dy);spacing=Math.min(spacing,distance);if(distance<Math.max(minDistance,(size+other.size)/2+7)){valid=false;break;}if(dx<=24||dy<=24)alignmentPenalty+=minDistance;}
    spacing-=alignmentPenalty;
    if(valid&&spacing>bestSpacing){bestSpacing=spacing;placed={x:x-size/2,y:y-size/2,size,rotation:(random()-.5)*.20944,depth:random(),driftX:6+random()*8,driftY:6+random()*8,speedX:.55+random()*1.2,speedY:.5+random()*1.1,phaseX:random()*Math.PI*2,phaseY:random()*Math.PI*2,phaseOffset:random()*5.8,holdDuration:2.6+random()*2.2};}
   }
   if(placed)positions.push(placed);
  }
  if(positions.length>best.length)best=positions;
  if(best.length===count)break;
 }
 return best;
}
