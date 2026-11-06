'use client';
import {useState} from 'react';
// Place licensed portraits in public/portraits and add paths here to opt in.
const portraits:Record<string,string>={};
export function CharacterPortrait({id,name,mark}:{id:string,name:string,mark:string}){
 const [failed,setFailed]=useState(false);const src=portraits[id];
 return <div className={'character-portrait '+id} role="img" aria-label={(src&&!failed?'Portrait of ':'Stylized silhouette of ')+name}>{src&&!failed?<img className="portrait-image" src={src} alt="" onError={()=>setFailed(true)}/>:<><div className="silhouette"/><span>{mark}</span></>}</div>;
}
