'use strict';
/* Nur die Darstellung ist vor dem Entsperren lesbar, niemals der Finanzplan.
   Synchron vor dem Stylesheet laden, damit der Sperrbildschirm sofort passt. */
(() => {
 const KEY='vermoegensaufbau-theme-v1';
 const valid=value=>['system','light','dark'].includes(value);
 const media=window.matchMedia?.('(prefers-color-scheme: dark)');
 let preference='system';
 try{const stored=localStorage.getItem(KEY);if(valid(stored))preference=stored}catch{}
 function apply(){
  const theme=preference==='system'?(media?.matches?'dark':'light'):preference;
  document.documentElement.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#111513':'#f7f8fa');
  return theme;
 }
 window.AppTheme={
  set(value){
   preference=valid(value)?value:'system';
   try{if(localStorage.getItem(KEY)!==preference)localStorage.setItem(KEY,preference)}catch{}
   return apply();
  },
  apply
 };
 const systemChanged=()=>{if(preference==='system')apply()};
 if(media?.addEventListener)media.addEventListener('change',systemChanged);
 else media?.addListener?.(systemChanged);
 window.addEventListener('storage',event=>{
  if(event.key===KEY||event.key===null){preference=valid(event.newValue)?event.newValue:'system';apply()}
 });
 apply();
})();
