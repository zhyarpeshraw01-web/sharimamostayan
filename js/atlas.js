(function(){
'use strict';
const S=window.Slides,D=window.PRESENTATION_DATA,E=S.escape,baseRender=S.render;
const pad=S.pad;
const group=n=>n===1?'cover':n<=10?'context':n<=16?'mix':n<=25?'compact':n<=31?'walk':n<=37?'move':'synthesis';
const small=t=>`<div class="atlas-kicker">${t}</div>`;
const count=v=>`<span class="count" data-count="${v}">${Number(v).toLocaleString('en-US')}</span>`;
const icon=(i,cls='')=>`<svg class="atlas-glyph ${cls}" viewBox="0 0 120 120" aria-hidden="true">${[
 '<rect x="14" y="14" width="58" height="58"/><rect x="48" y="48" width="58" height="58"/><path d="M14 48H106M48 14V106"/>',
 '<path d="M14 106V55H38V106M48 106V30H72V106M82 106V14H106V106M8 106H112"/>',
 '<path d="M14 100H47V65H82V28H106"/><circle cx="14" cy="100" r="7"/><circle cx="47" cy="65" r="7"/><circle cx="82" cy="28" r="7"/><path d="M14 72V14H106" class="glyph-secondary"/>',
 '<path d="M12 60H108M60 12V108M26 26L94 94"/><circle cx="60" cy="60" r="24"/><circle cx="12" cy="60" r="6"/><circle cx="60" cy="12" r="6"/><circle cx="108" cy="60" r="6"/>'
 ][i]}</svg>`;
function section(n,klass,body,preview){return `<section class="scene atlas-scene ${klass} ${preview?'preview-scene':''} atlas-group-${group(n)}" data-scene="${n}" aria-label="Scene ${n}: ${E(S.titles[n-1])}">${body}<span class="source-page technical">SOURCE / PHYSICAL PAGE ${pad(n)}</span></section>`;}
function cover(preview){
 return section(1,'cover-scene dark atlas-cover',`
 <div class="atlas-cover-grid" aria-hidden="true"></div>
 <div class="atlas-cover-ribbon"><span>ARCHITECTURAL URBAN STUDY</span><span>SHAWAYS / ERBIL / KURDISTAN REGION / IRAQ</span><span>EDITION 02</span></div>
 <div class="atlas-cover-title" data-motion="heading"><span>MAMOSTAYAN</span><h1>CITY<span class="atlas-asterisk" aria-hidden="true">✳</span></h1></div>
 <div class="atlas-cover-subtitle">AN URBAN<br><i>ATLAS.</i></div>
 <div class="atlas-plan-stack" data-parallax="plan">
   <div class="atlas-plan-backing backing-one" aria-hidden="true"></div><div class="atlas-plan-backing backing-two" aria-hidden="true"></div>
   <div class="atlas-plan-sheet">${small('EXHIBIT 01 / THE ORIGINAL FRAMEWORK')}${S.photo(S.A(1),'atlas-master-photo','Original Mamostayan City master plan',`<svg class="plan-trace" viewBox="0 0 1516 1071" aria-hidden="true"><path d="M159 204 L1303 219 L1368 566 L1120 565 L1117 674 L414 669 L326 504 L169 574 Z"/></svg>`)}<span class="atlas-sheet-note">READ THE NEIGHBOURHOOD THROUGH ITS LAYERS ↗</span></div>
 </div>
 <div class="atlas-cover-caption">Smart Urban Growth.<br><strong>Four principles.<br>Forty policies.</strong></div>
 <button class="atlas-enter" data-goto="2"><span>ENTER<br>THE STUDY</span><b>↗</b></button>
 <div class="atlas-cover-chapters">${D.chapters.map((c,i)=>`<button data-goto="${c.start}">${icon(i)}<span><i>0${i+1}</i>${c.name}</span><b>↗</b></button>`).join('')}</div>
 `,preview);
}
function chapter(n,preview){
 const i=[11,17,26,32].indexOf(n),c=D.chapters[i];
 const titles=['DAILY NEEDS.<br>CLOSE TO<br><em>HOME.</em>','MORE HOMES.<br>LESS<br><em>LAND.</em>','SHORT TRIPS.<br>ON<br><em>FOOT.</em>','MORE WAYS.<br>TO EVERYDAY<br><em>PLACES.</em>'];
 const lead=['Daily needs close to home','More homes on less land, with shared outdoor space','Make daily trips easy on foot','More ways to reach everyday places'];
 const body=['Shops and homes share buildings, with local services nearby. This mix helps people meet their daily needs close to home.','Apartments fit more homes on less land by building upwards. Houses, roads and parking take up more ground space. These parts need to work well together.','Nearby shops, schools and green spaces give people reasons to walk. The next step is to make the routes between them safer, clearer and easier for everyone to use.','An unclear policy receives 0.5, even when the street or building itself is visible. Physical evidence and confirmed policy availability are different questions.'];
 let annotation='';
 if(n===11)annotation='<span class="annotation-label" style="left:66%;top:38%">A / Residential</span><span class="annotation-label" style="left:66%;top:74%">B / Commercial</span>';
 if(n===26)annotation='<svg class="photo-annotation walking-trace" viewBox="0 0 1120 840"><path d="M237 774 L332 547 L423 460"/></svg><span class="annotation-label" style="left:5%;top:89%">Visible walking path</span>';
 return section(n,'chapter-scene dark atlas-chapter',`
 <div class="atlas-chapter-band" aria-hidden="true"></div><div class="atlas-chapter-ghost" aria-hidden="true">0${i+1}</div>
 <div class="atlas-chapter-ident">${icon(i)}<span>PRINCIPLE 0${i+1}<br><b>${c.name.toUpperCase()}</b></span></div>
 <h1 class="atlas-chapter-title" data-motion="heading">${titles[i]}</h1>
 <div class="atlas-chapter-story" data-motion="copy">${small(lead[i])}<p>${body[i]}</p></div>
 <div class="atlas-chapter-exhibit" data-parallax="chapter"><div class="exhibit-tag"><span>FIELD EVIDENCE</span><b>${c.code} / 01—10</b></div>${S.photo(S.A(n),'chapter-photo',S.A(n).caption,annotation)}<div class="atlas-photo-edge"><span>OBSERVED / MAMOSTAYAN</span><span>EXPLORE IN FULL ↗</span></div></div>
 <div class="atlas-chapter-bottom"><span><b>1</b> Available</span><span><b>0.5</b> Unsure</span><span><b>0</b> Not available</span><button data-goto="${n+1}">OPEN THE TEN POLICIES <b>↗</b></button></div>
 <div class="atlas-chapter-scope">${i===1?'Using land well depends on buildings, streets and parking together.':'40 policies · availability, not a percentage of design quality.'}</div>
 `,preview);
}
function finalMatrix(preview){return section(38,'matrix-scene dark atlas-matrix',`
 <div class="atlas-assessment-heading">${small('FOUR PRINCIPLES / FORTY POLICIES')}<h1 data-motion="heading">A CITY, READ THROUGH<br><em>ITS EVIDENCE.</em></h1><div class="atlas-assessment-stamp">FINAL<br>ASSESSMENT<span>38 / 40</span></div></div>
 <aside class="atlas-score-ticket"><div class="ticket-notch" aria-hidden="true"></div>${small('TOTAL POLICY SCORE')}<div class="ticket-number">${count(21.5)}<small>/ 40</small></div><div class="ticket-line"></div><p>A measure of policy<br><strong>availability.</strong></p><div class="ticket-counts"><div><b>19</b><span>AVAILABLE</span></div><div><b>5</b><span>UNSURE</span></div><div><b>16</b><span>NOT AVAILABLE</span></div></div><span class="ticket-foot">SOURCE MATRIX / PHYSICAL PAGE 38</span></aside>
 <div class="atlas-matrix-board"><div class="atlas-matrix-head"><span>POLICY →</span>${Array.from({length:10},(_,i)=>`<span>${pad(i+1)}</span>`).join('')}<span>/ 10</span></div>${D.chapters.map((c,i)=>`<div class="atlas-matrix-row"><div class="atlas-matrix-name"><span>0${i+1}</span><b>${c.name}</b></div>${D.scores[i].map((v,j)=>`<button class="matrix-cell ${S.tone(v)}" data-policy="${c.code}-${pad(j+1)}" aria-label="${c.name}, policy ${j+1}, score ${v}">${v}<i aria-hidden="true">↗</i></button>`).join('')}<strong>${count(c.score)}</strong></div>`).join('')}<div class="atlas-matrix-legend"><span class="yes"><i></i>1 / Available</span><span class="unsure"><i></i>0.5 / Unsure</span><span class="no"><i></i>0 / Not available</span></div></div>
 <div class="atlas-assessment-note"><span>SELECT A POLICY<br>TO OPEN ITS EVIDENCE ↗</span><p>Half points mark unsure policies. They do not confirm availability.<br>This is a policy-status evaluation, not a percentage of urban-design quality.</p></div>
 `,preview);}
function finale(preview){return section(40,'closing-scene dark atlas-finale',`
 <div class="atlas-finale-label">${small('FOUR PRINCIPLES / ONE NEIGHBOURHOOD')}<span class="atlas-end-mark">END / 40</span></div>
 <h1 class="atlas-finale-title" data-motion="heading">THE PLACES<br>ARE <em>CLOSE.</em></h1><div class="atlas-finale-answer" data-motion="heading">The connections<br>can be better.</div>
 <div class="atlas-finale-plan">${S.photo(S.A(1),'','Original master plan / return to the urban framework')}</div>
 <p class="atlas-finale-copy">Mamostayan combines homes, shops and open spaces. Connected streets and parking support daily life. Better walking access and clearer transport links would help these places work together.</p>
 <button class="atlas-finale-score" data-goto="38"><span>21.5 <small>/ 40</small></span><b>REVISIT THE ASSESSMENT ↗</b></button>
 <div class="atlas-finale-principles">${D.chapters.map((c,i)=>`<button data-goto="${c.start}"><div>${icon(i)}<strong>${c.score}<small>/10</small></strong></div><span>0${i+1} / ${c.name}</span><p>${['Homes and local shops share space and bring daily needs closer.','Apartments use land efficiently, with shared lawns and private homes nearby.','Paths and speed humps help. Steps, gaps and obstacles still need attention.','Local streets and parking are clear strengths. Wider travel choices remain unsure.'][i]}</p></button>`).join('')}</div>
 `,preview);}
function enhance(n,preview){
 let html=baseRender(n,preview);const pp=D.policies.filter(p=>p.page===n);const gi=pp.length?pp[0].chapter:null;
 html=html.replace('class="scene ',`class="scene atlas-scene atlas-group-${group(n)} atlas-layout-${n%3} `);
 html=html.replace(/(<section\b[^>]*>)/,`$1<div class="atlas-registration" aria-hidden="true"><i></i><i></i><i></i><i></i></div>`);
 if(pp.length){
  html=html.replace(/(<article class="policy" data-policy-id="([A-Z]+)-(\d+)">)/g,'$1<span class="atlas-record-number" aria-hidden="true">$3</span><span class="atlas-record-tab">FIELD RECORD</span>');
  const c=D.chapters[gi];const ruler=`<div class="atlas-policy-ruler"><span>${c.code} / INDEX</span>${Array.from({length:10},(_,i)=>`<button class="${pp.some(p=>p.number===i+1)?'selected':''}" data-policy="${c.code}-${pad(i+1)}" aria-label="Inspect ${c.code} policy ${i+1}">${pad(i+1)}</button>`).join('')}</div>`;
  html=html.replace('</section>',ruler+'</section>');
 }else if([2,3,5,6,7,8,9,10,24,25,39].includes(n)){
  html=html.replace('</section>',`<div class="atlas-scene-number" aria-hidden="true">${pad(n)}</div></section>`);
 }
 return html;
}
S.render=(n,preview=false)=>n===1?cover(preview):[11,17,26,32].includes(n)?chapter(n,preview):n===38?finalMatrix(preview):n===40?finale(preview):enhance(n,preview);
S.glyph=icon;S.atlasGroup=group;
})();
