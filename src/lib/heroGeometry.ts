/** Cover-crop geometry matches the static fallback's object-fit: cover. */
export function coverCrop(sourceWidth:number,sourceHeight:number,width:number,height:number){
 const aspect=width/height;const sourceAspect=sourceWidth/sourceHeight;
 const cropWidth=sourceAspect>aspect?sourceHeight*aspect:sourceWidth;
 const cropHeight=sourceAspect>aspect?sourceHeight:sourceWidth/aspect;
 return {x:(sourceWidth-cropWidth)/2,y:(sourceHeight-cropHeight)/2,width:cropWidth,height:cropHeight};
}
/** Two exterior rails keep tool glyphs out of the central face region and above the HUD. */
export function toolLayout(width:number,height:number,total:number,compact:boolean){
 if(width<180||height<180)return [];
 const size=width<440?34:38,top=36,bottom=height-82-size;
 const fitRows=Math.max(1,Math.floor((bottom-top)/(size+6))+1);
 const count=Math.min(total,compact?10:24,fitRows*2);
 const rows=Math.ceil(count/2),step=rows>1?(bottom-top)/(rows-1):0;
 return Array.from({length:count},(_,index)=>({x:index%2===0?8:width-size-8,y:top+Math.floor(index/2)*step,size}));
}
