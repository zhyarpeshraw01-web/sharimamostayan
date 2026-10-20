(function(){
'use strict';
const S=window.Slides,I=window.Interactions,host=document.getElementById('scene-host'),stage=document.getElementById('stage');
const saved=k=>{try{return localStorage.getItem(k);}catch(_){return null;}},save=(k,v)=>{try{localStorage.setItem(k,v);}catch(_){}};
const prefers=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const App={current:1,reduced:saved('mamostayan-motion')==='reduced'||(saved('mamostayan-motion')===null&&!!prefers),presenter:false,go,toggleMotion};window.App=App;
const chapters=[['SITE',1,10],['01 / MIXED USE',11,16],['02 / COMPACT',17,25],['03 / WALK',26,31],['04 / TRANSPORT',32,37],['ASSESSMENT',38,40]];
document.getElementById('chapter-rail').innerHTML=chapters.map(([t,n])=>`<button data-goto="${n}">${t}</button>`).join('');
function resize(){const factor=Math.min(window.innerWidth/1920,window.innerHeight/1080);stage.style.transform=`scale(${factor})`;S.fitImages();}
function go(n,updateHash=true){
 n=Math.max(1,Math.min(40,Math.round(n)||1));const direction=n>=App.current?1:-1;window.Motion.stop();const previous=host.firstElementChild;App.current=n;host.innerHTML=S.render(n);
 stage.classList.toggle('is-dark',host.firstElementChild.classList.contains('dark'));
 document.getElementById('scene-category').textContent=S.getChapter(n);
 document.getElementById('counter').innerHTML=`${S.pad(n)} <em>/ 40</em>`;
 document.getElementById('previous').disabled=n===1;document.getElementById('next').disabled=n===40;
 document.getElementById('progress-line').style.width=(n/40*100)+'%';
 document.querySelectorAll('#chapter-rail button').forEach((b,i)=>{const on=n>=chapters[i][1]&&n<=chapters[i][2];b.classList.toggle('active',on);on?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current');});
 document.getElementById('live-region').textContent=`Scene ${n} of 40. ${S.titles[n-1]}`;
 if(updateHash){try{history.replaceState(null,'',`#scene-${S.pad(n)}`);}catch(_){}}
 S.fitImages(host);window.Motion.enter(host.firstElementChild,direction,previous);document.title=`${S.pad(n)} / ${S.titles[n-1]} — MAMOSTAYAN`;
 // Preload only the next scene's original assets; all paths are local.
 (window.PRESENTATION_DATA.assets[n+1]||[]).forEach(a=>{const image=new Image();image.src=a.src;});
}
function toggleMotion(force){App.reduced=typeof force==='boolean'?force:!App.reduced;document.body.classList.toggle('reduced-motion',App.reduced);const b=document.getElementById('motion-button');b.setAttribute('aria-pressed',String(App.reduced));b.querySelector('span').textContent=App.reduced?'OFF':'ON';save('mamostayan-motion',App.reduced?'reduced':'full');if(App.reduced)window.Motion.stop();}
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else I.toast('Use your browser’s fullscreen control.');}catch(_){I.toast('Use the browser fullscreen shortcut (F11 on Windows).');}}
let edgeTimer;
function presenter(){App.presenter=!App.presenter;stage.classList.toggle('presenting',App.presenter);stage.classList.remove('show-controls');I.toast(App.presenter?'Presenter mode · P restores controls':'Presentation controls restored');}
document.getElementById('brand').addEventListener('click',()=>go(1));document.getElementById('previous').addEventListener('click',()=>go(App.current-1));document.getElementById('next').addEventListener('click',()=>go(App.current+1));
document.getElementById('overview-button').addEventListener('click',I.overview);document.getElementById('source-button').addEventListener('click',()=>I.source());document.getElementById('help-button').addEventListener('click',I.help);document.getElementById('motion-button').addEventListener('click',()=>toggleMotion());document.getElementById('fullscreen-button').addEventListener('click',fullscreen);
document.addEventListener('fullscreenchange',()=>{document.getElementById('fullscreen-button').setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen');resize();});
document.addEventListener('keydown',e=>{
 if(I.isOpen()||e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
 if(e.target.closest('button')&&e.key==='Enter')return;
 const key=e.key.toLowerCase();
 if(['arrowright',' ','pagedown','arrowleft','backspace','pageup','home','end','o','s','f','p','r','?','h'].includes(key))e.preventDefault();
 if(['arrowright',' ','pagedown'].includes(key))go(App.current+1);else if(['arrowleft','backspace','pageup'].includes(key))go(App.current-1);else if(key==='home')go(1);else if(key==='end')go(40);else if(key==='o')I.overview();else if(key==='s')I.source();else if(key==='f')fullscreen();else if(key==='p')presenter();else if(key==='r')toggleMotion();else if(key==='?'||key==='h')I.help();
});
window.addEventListener('resize',resize);window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#scene-(\d+)$/);if(m){I.close(true);go(Number(m[1]),false);}});
let touchStart=null;
stage.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'||e.target.closest('button,a')||I.isOpen())return;touchStart={x:e.clientX,y:e.clientY,time:Date.now(),id:e.pointerId};});
stage.addEventListener('pointerup',e=>{if(!touchStart||touchStart.id!==e.pointerId)return;const dx=e.clientX-touchStart.x,dy=e.clientY-touchStart.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.6&&Date.now()-touchStart.time<1000)go(App.current+(dx<0?1:-1));touchStart=null;});stage.addEventListener('pointercancel',()=>touchStart=null);
stage.addEventListener('pointermove',e=>{if(!App.presenter)return;const r=stage.getBoundingClientRect(),y=(e.clientY-r.top)/r.height;if(y<.1||y>.88){stage.classList.add('show-controls');clearTimeout(edgeTimer);edgeTimer=setTimeout(()=>stage.classList.remove('show-controls'),2500);}});
document.addEventListener('error',e=>{if(e.target.tagName==='IMG'){e.target.alt='Image could not load. Extract the complete ZIP and keep the assets folder beside index.html.';}},true);
resize();toggleMotion(App.reduced);const match=location.hash.match(/^#scene-(\d+)$/);go(match?Number(match[1]):1);
})();
