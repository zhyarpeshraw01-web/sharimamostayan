(function(){
'use strict';
let players=[],raf=0;
const ease='cubic-bezier(.16,1,.3,1)';
function stop(){players.forEach(a=>{try{a.finish();a.cancel();}catch(_){}});players=[];cancelAnimationFrame(raf);document.querySelectorAll('[data-parallax]').forEach(el=>el.style.transform='');document.querySelectorAll('.transition-ghost,.atlas-transition-slat').forEach(el=>el.remove());document.querySelectorAll('[data-count]').forEach(el=>el.textContent=Number(el.dataset.count).toLocaleString('en-US'));}
function play(el,frames,opts){if(!el||!el.animate)return;const p=el.animate(frames,{duration:650,easing:ease,fill:'both',...opts});players.push(p);p.onfinish=()=>{if(el.matches('.transition-ghost,.atlas-transition-slat'))el.remove();try{p.cancel();}catch(_){}};}
function enter(scene,direction=1,previous=null){
 stop();if(window.App?.reduced)return;
 if(previous){previous.classList.add('transition-ghost');previous.setAttribute('aria-hidden','true');previous.inert=true;scene.parentNode.appendChild(previous);play(previous,[{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-100*direction}px)`}],{duration:380});setTimeout(()=>previous.remove(),400);}
 const n=Number(scene.dataset.scene),isPolicy=scene.classList.contains('policy-scene'),chapter=scene.classList.contains('chapter-scene');
 if(isPolicy){scene.querySelectorAll('.policy').forEach((p,i)=>play(p,[{opacity:0,transform:`translateX(${i===0?-65:65}px)`},{opacity:1,transform:'translateX(0)'}],{delay:70+i*60,duration:640}));}
 else if(chapter){play(scene.querySelector('.atlas-chapter-exhibit'),[{opacity:0,transform:`perspective(1600px) translateX(${110*direction}px) rotateY(-9deg)`},{opacity:1,transform:'perspective(1600px) translateX(0) rotateY(0)'}],{duration:950});play(scene.querySelector('.atlas-chapter-ghost'),[{opacity:0,transform:'translateY(100px)'},{opacity:.08,transform:'translateY(0)'}],{duration:1000});}
 else if(n===1){play(scene.querySelector('.atlas-plan-stack'),[{opacity:0,transform:'perspective(1800px) translateY(80px) rotateX(13deg) rotate(-7deg)'},{opacity:1,transform:'perspective(1800px) translateY(0) rotateX(0) rotate(0deg)'}],{duration:1500,delay:180});}
 else if([2,3,5].includes(n)){play(scene.querySelector('.map-photo,.plan-large'),[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],{duration:850});}
 else if([6,8,9,10,24,39].includes(n)){scene.querySelectorAll('.evidence').forEach((el,i)=>play(el,[{opacity:0,transform:'perspective(1800px) translateY(45px) rotateX(6deg)'},{opacity:1,transform:'perspective(1800px) translateY(0) rotateX(0)'}],{delay:i*85,duration:760}));}
 if(chapter){for(let i=0;i<4;i++){const slat=document.createElement('div');slat.className='atlas-transition-slat';slat.style.left=(i*25)+'%';scene.parentNode.appendChild(slat);play(slat,[{transform:'scaleY(1)',transformOrigin:direction>0?'top':'bottom'},{transform:'scaleY(0)',transformOrigin:direction>0?'top':'bottom'}],{duration:620,delay:i*55});setTimeout(()=>slat.remove(),850);}}
 scene.querySelectorAll('.atlas-cover-chapters button,.atlas-finale-principles button').forEach((el,i)=>play(el,[{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],{delay:300+i*85,duration:700}));
 scene.querySelectorAll('.atlas-cover-subtitle,.atlas-chapter-ident,.atlas-score-ticket,.atlas-finale-plan').forEach((el,i)=>play(el,[{opacity:0,translate:'0 45px'},{opacity:1,translate:'0 0'}],{delay:140+i*90,duration:850}));
 if(!isPolicy){scene.querySelectorAll('[data-motion="heading"]').forEach((el,i)=>play(el,[{opacity:0,transform:'translateY(38px)',clipPath:'inset(0 0 100% 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}],{duration:n===1?1050:670,delay:80+i*100}));scene.querySelectorAll('[data-motion="copy"]').forEach((el,i)=>play(el,[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{delay:170+i*50,duration:650}));}
 scene.querySelectorAll('.matrix-cell').forEach((el,i)=>play(el,[{opacity:0,transform:'scaleY(.15) translateY(15px)'},{opacity:1,transform:'scaleY(1) translateY(0)'}],{delay:100+(i%10)*26+Math.floor(i/10)*90,duration:420}));
 scene.querySelectorAll('.policy-verdict').forEach((el,i)=>play(el,[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{delay:350+i*70,duration:450}));
 scene.querySelectorAll('.coverage-line>span,.allocation-row i').forEach((el,i)=>play(el,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:800,delay:200+i*75}));
 const nums=[...scene.querySelectorAll('[data-count]')],start=performance.now();
 function tick(now){const t=Math.min(1,(now-start)/850),q=1-Math.pow(1-t,3);nums.forEach(el=>{const v=Number(el.dataset.count),digits=Number.isInteger(v)?0:1;el.textContent=(t===1?v:Number((v*q).toFixed(digits))).toLocaleString('en-US',{maximumFractionDigits:digits});});if(t<1)raf=requestAnimationFrame(tick);}
 if(nums.length)raf=requestAnimationFrame(tick);
}
document.addEventListener('pointermove',e=>{if(window.App?.reduced||e.pointerType==='touch')return;const scene=document.querySelector('#scene-host>.scene:not(.transition-ghost)');if(!scene)return;const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;scene.querySelectorAll('[data-parallax]').forEach(el=>{el.style.transform=`perspective(1800px) translate(${x*7}px,${y*7}px) rotateX(${-y*.9}deg) rotateY(${x*.9}deg)`;});});
 window.Motion={enter,stop};
})();
