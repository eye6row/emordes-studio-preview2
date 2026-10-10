// Emordes Smart Tech Pack renderer. Data lives in techpack-data.js.
(()=>{
const $=(s,r=document)=>r.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SIZES=['XS','S','M','L','XL','XXL'];
const DATA=window.TECHPACKS,keys=Object.keys(DATA);
const qs=new URLSearchParams(location.search);
let sku=(qs.get('sku')||'').toUpperCase();
if(!DATA[sku]){const pid=+qs.get('id');sku=keys.find(k=>DATA[k].productId===pid)||keys[0]}
const tp=DATA[sku],root=$('#main');
let view='front',active=null,unit='in';

// flat sketches, 400x460
const S='fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
const D='fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".6"';
const SK={
 tee:{
  front:'<path '+S+' d="M140 40 L72 62 L22 150 L72 178 L96 140 L96 420 L304 420 L304 140 L328 178 L378 150 L328 62 L260 40 Q200 80 140 40Z"/><path '+S+' d="M140 40 Q200 96 260 40"/><path '+D+' d="M150 50 Q200 100 250 50"/><path '+D+' d="M96 408 L304 408"/><path '+D+' d="M30 148 L74 170"/><path '+D+' d="M370 148 L328 170"/><rect '+D+' x="150" y="170" width="100" height="120"/>',
  back:'<path '+S+' d="M140 40 L72 62 L22 150 L72 178 L96 140 L96 420 L304 420 L304 140 L328 178 L378 150 L328 62 L260 40 Q200 54 140 40Z"/><path '+D+' d="M150 48 Q200 60 250 48"/><path '+D+' d="M96 408 L304 408"/><rect '+D+' x="160" y="110" width="80" height="50"/>'
 },
 shirt:{
  front:'<path '+S+' d="M146 34 L84 56 L26 300 L72 312 L100 130 L100 424 L300 424 L300 130 L328 312 L374 300 L316 56 L254 34 L226 70 L200 54 L174 70Z"/><path '+S+' d="M146 34 L200 90 L254 34"/><path '+S+' d="M200 90 L200 424"/><path '+D+' d="M184 100 L184 424 M216 100 L216 424"/><path '+D+' d="M26 280 L72 292"/><path '+D+' d="M374 280 L328 292"/><path '+D+' d="M100 408 Q200 440 300 408"/>',
  back:'<path '+S+' d="M146 34 L84 56 L26 300 L72 312 L100 130 L100 424 L300 424 L300 130 L328 312 L374 300 L316 56 L254 34 Q200 50 146 34Z"/><path '+D+' d="M100 100 Q200 120 300 100"/><path '+S+' d="M200 100 L200 150"/><path '+D+' d="M100 408 Q200 440 300 408"/>'
 }
};
const PAL=[['Black','#121212'],['Ecru','#e7dfcf'],['Abel Red','#a8322d'],['Indigo','#26326b'],['Natural','#c9b79a']];

function pantone(r,g,b){
 // approximate TCX-style name from nearest curated swatch plus code derived from hue/lightness
 const L=(0.299*r+0.587*g+0.114*b)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;
 let h=0;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=Math.round(h*60);if(h<0)h+=360}
 const sat=mx?d/mx:0;
 const names=[[15,'Red Clay'],[40,'Burnt Sienna'],[65,'Golden Straw'],[95,'Olive Branch'],[150,'Fern Green'],[190,'Lagoon'],[225,'Deep Cobalt'],[265,'Violet Night'],[300,'Orchid Smoke'],[335,'Rose Wine'],[361,'Red Clay']];
 let n;
 if(sat<.12)n=L>.88?'Bright White':L>.68?'Pearl Gray':L>.4?'Steel Gray':L>.16?'Charcoal':'Jet Black';
 else if(sat<.35&&L>.55)n=h<70?'Ecru Sand':'Dove Haze';
 else{n=names.find(x=>h<x[0])[1];if(L<.25)n='Deep '+n.split(' ').pop();else if(L>.75)n='Pale '+n.split(' ').pop()}
 const code=String(Math.round(h/360*19)+11).padStart(2,'0')+'-'+String(Math.round(L*40)+10).padStart(4,'0')+' TCX';
 return {name:n,code};
}
const hex=(r,g,b)=>'#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
function extract(src,cb){
 const im=new Image();im.crossOrigin='anonymous';
 im.onload=()=>{try{
  const c=document.createElement('canvas'),w=c.width=64,h=c.height=64,x=c.getContext('2d');x.drawImage(im,0,0,w,h);
  const px=x.getImageData(0,0,w,h).data,bins={};
  for(let i=0;i<px.length;i+=4){if(px[i+3]<200)continue;const k=[px[i]>>5,px[i+1]>>5,px[i+2]>>5].join(',');const b=bins[k]||(bins[k]={n:0,r:0,g:0,b:0});b.n++;b.r+=px[i];b.g+=px[i+1];b.b+=px[i+2]}
  const arr=Object.values(bins).sort((a,b)=>b.n-a.n).map(b=>[Math.round(b.r/b.n),Math.round(b.g/b.n),Math.round(b.b/b.n)]);
  const out=[];for(const c of arr){if(out.every(o=>Math.abs(o[0]-c[0])+Math.abs(o[1]-c[1])+Math.abs(o[2]-c[2])>90))out.push(c);if(out.length===6)break}
  cb(out.map(c=>({hex:hex(...c),...pantone(...c)})));
 }catch(e){cb(null)}};
 im.onerror=()=>cb(null);im.src=src;
}

const fmt=v=>unit==='in'?String(v):(v*2.54).toFixed(1);
const tolFmt=t=>unit==='in'?t:t.replace(/[\d.]+/,m=>(parseFloat(m)*2.54).toFixed(2));

function sigKey(w){return 'ems_tp_sign_'+sku+'_'+w}
function getSig(w){try{return JSON.parse(localStorage.getItem(sigKey(w)))}catch(e){return null}}

function render(){
 const pins=tp.pins.filter(p=>p.view===view);
 const prod=tp.productId?'product.html?id='+tp.productId:'catalog.html';
 root.innerHTML=''+
 '<div class="tp-head"><div><p class="crumb mono"><a href="home.html">Home</a> / <a href="catalog.html">Shop</a> / Tech pack</p>'+
 '<h1>Smart <em>tech pack</em></h1><p class="smeta" style="margin:8px 0 0">'+esc(tp.name)+' · '+esc(sku)+'</p></div>'+
 '<dl class="tp-meta mono"><dt>Season</dt><dd>'+esc(tp.season)+'</dd><dt>Status</dt><dd>'+esc(tp.status)+'</dd><dt>Fit</dt><dd>'+esc(tp.fit)+'</dd><dt>Revision</dt><dd>'+esc(tp.revisions[0].rev)+'</dd></dl>'+
 '<div class="tp-actions"><button class="tp-btn" id="share">Copy share link</button><button class="tp-btn" id="csv">Export spec CSV</button><button class="tp-btn" id="prt">Print / PDF</button></div></div>'+
 '<nav class="tp-sel mono" aria-label="Tech packs">'+keys.map(k=>'<a href="techpack.html?sku='+k+'" '+(k===sku?'aria-current="true"':'')+'>'+esc(DATA[k].name)+'</a>').join('')+'</nav>'+

 '<section class="tp-sec" aria-labelledby="h1"><h2 id="h1">Construction <span class="mono">Tap a pin</span></h2><div class="tp-stage">'+
 '<div class="tp-sketch"><div class="tp-views"><button class="tp-btn '+(view==='front'?'on':'')+'" data-view="front">Front</button><button class="tp-btn '+(view==='back'?'on':'')+'" data-view="back">Back</button></div>'+
 '<div class="tp-canvas"><svg viewBox="0 0 400 460" role="img" aria-label="'+esc(tp.name)+' flat sketch, '+view+' view">'+SK[tp.garment][view]+'</svg>'+
 pins.map(p=>'<button class="tp-pin" style="left:'+p.x+'%;top:'+p.y+'%" data-pin="'+p.n+'" aria-pressed="'+(active===p.n)+'" aria-label="Detail '+p.n+', '+esc(p.title)+'">'+p.n+'</button>').join('')+'</div>'+
 '<div class="tp-legend">'+pins.map(p=>'<button data-pin="'+p.n+'" aria-pressed="'+(active===p.n)+'">'+p.n+' '+esc(p.title)+'</button>').join('')+'</div></div>'+
 '<div class="tp-panel" id="panel" aria-live="polite">'+panel()+'</div></div>'+
 '<div class="tp-print-pins"><ol>'+tp.pins.map(p=>'<li><b>'+esc(p.title)+'</b> ('+p.view+'). '+esc(p.notes)+'</li>').join('')+'</ol></div></section>'+

 '<section class="tp-sec" aria-labelledby="h2"><h2 id="h2">Color palette <span class="mono">Sampled from product image</span></h2><div class="tp-pal" id="pal"><p class="mono">Sampling...</p></div><p class="tp-note mono">Names are nearest matches, not licensed Pantone chips. Confirm with a physical swatch book.</p></section>'+

 '<section class="tp-sec" aria-labelledby="h3"><h2 id="h3">Points of measure <span class="mono">Tolerances in '+(unit==='in'?'inches':'cm')+'</span>'+
 '<span class="tp-unit"><button class="tp-btn '+(unit==='in'?'on':'')+'" data-unit="in">in</button><button class="tp-btn '+(unit==='cm'?'on':'')+'" data-unit="cm">cm</button></span></h2>'+
 '<div class="tp-tblw"><table class="tp-tbl"><caption class="skip">Points of measure</caption><thead><tr><th>POM</th><th>Measurement</th><th>Tol.</th>'+SIZES.map(s=>'<th>'+s+'</th>').join('')+'</tr></thead><tbody>'+
 tp.pom.map(r=>'<tr><td class="n">'+r.code+'</td><td>'+esc(r.name)+'</td><td class="n">'+esc(tolFmt(r.tol))+'</td>'+SIZES.map(s=>'<td class="n">'+fmt(r[s])+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></section>'+

 '<section class="tp-sec tp-two"><div aria-labelledby="h4"><h2 id="h4" style="margin:0 0 14px;font:900 24px/1 var(--sans);text-transform:uppercase;letter-spacing:-.02em">Bill of materials</h2><ul class="tp-list">'+
 tp.bom.map(b=>'<li><span><b>'+esc(b.item)+'</b></span><span class="mono">'+esc(b.qty)+'</span><small>'+esc(b.spec)+' · '+esc(b.supplier)+'</small></li>').join('')+'</ul><p class="tp-note">Fabric: '+esc(tp.fabric)+'</p></div>'+
 '<div aria-labelledby="h5"><h2 id="h5" style="margin:0 0 14px;font:900 24px/1 var(--sans);text-transform:uppercase;letter-spacing:-.02em">Downloadable assets</h2><ul class="tp-list">'+
 tp.assets.map(a=>'<li><span><b>'+esc(a.name)+'</b></span><button class="tp-btn" data-asset="'+esc(a.file)+'">Get</button><small>'+esc(a.file)+' · '+esc(a.note)+'</small></li>').join('')+
 '<li><span><b>Spec sheet</b></span><button class="tp-btn" id="csv2">CSV</button><small>Points of measure, BOM and revisions</small></li></ul></div></section>'+

 '<section class="tp-sec" aria-labelledby="h6"><h2 id="h6">Readiness check <span class="mono">Sign off before production</span></h2><div class="tp-rdy" id="rdy"></div></section>'+

 '<section class="tp-sec" aria-labelledby="h7"><h2 id="h7">Revision log</h2><div class="tp-tblw"><table class="tp-tbl"><thead><tr><th>Rev</th><th>Date</th><th>By</th><th>Change</th></tr></thead><tbody>'+
 tp.revisions.map(r=>'<tr><td class="n">'+r.rev+'</td><td class="n">'+r.date+'</td><td>'+esc(r.by)+'</td><td style="white-space:normal">'+esc(r.note)+'</td></tr>').join('')+'</tbody></table></div>'+
 '<a class="tp-link mono" href="'+prod+'">Back to product ↗</a></section>';
 renderRdy();samples();
}
function panel(){
 const p=tp.pins.find(x=>x.n===active);
 if(!p)return '<div class="bd"><span class="mono" style="color:var(--mute)">Construction detail</span><h3>Select a pin</h3><p>Numbered pins mark collar, sleeve, hem, labels and print placement. Tap one for notes and stitch specs.</p></div>';
 return '<div class="ph"><img src="'+p.ref+'" alt="Reference for '+esc(p.title)+'"></div><div class="bd"><span class="mono" style="color:var(--mute)">Detail '+p.n+' · '+p.view+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.notes)+'</p><dl class="mono">'+Object.entries(p.specs).map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl></div>';
}
let palCache={};
function samples(){
 const el=$('#pal');
 const draw=l=>{el.innerHTML=l.map(c=>'<button class="tp-sw" data-hex="'+c.hex+'" title="Copy '+c.hex+'"><i style="background:'+c.hex+'"></i><span><b>'+esc(c.name)+'</b><span class="mono">'+esc(c.code)+'</span><span class="mono">'+c.hex.toUpperCase()+'</span></span></button>').join('')};
 if(palCache[sku])return draw(palCache[sku]);
 extract(tp.image,l=>{if(!l){l=PAL.map(([n,h])=>({hex:h,name:n,code:'Brand palette'}))}palCache[sku]=l;if($('#pal'))draw(l)});
}
function renderRdy(){
 const el=$('#rdy'),roles=[['design','Design approval','Design lead'],['factory','Factory countersign','Factory contact']];
 let done=0;
 el.innerHTML=roles.map(([w,t,ph])=>{const s=getSig(w);if(s)done++;
  return '<div class="tp-sig '+(s?'ok':'')+'"><b>'+t+'</b>'+(s?'<span class="st mono">Signed by '+esc(s.name)+' on '+esc(s.date)+'</span><button class="tp-btn" data-clear="'+w+'">Revoke</button>':
  '<label class="mono" for="n-'+w+'">Name</label><input id="n-'+w+'" placeholder="'+ph+'" autocomplete="name"><label class="mono" for="d-'+w+'">Date</label><input id="d-'+w+'" type="date" value="'+new Date().toLocaleDateString('en-CA')+'"><button class="tp-btn" data-sign="'+w+'">Sign off</button>')+'</div>'}).join('')+
 '<div class="tp-rdy-sum"><span class="mono">'+done+' of 2 signed</span><div class="tp-bar"><i style="width:'+done*50+'%"></i></div><b class="mono">'+(done===2?'Ready for production':'Not ready')+'</b></div>';
}
function toast(t){const e=document.createElement('div');e.className='tp-toast';e.textContent=t;e.setAttribute('role','status');document.body.appendChild(e);setTimeout(()=>e.remove(),1800)}
function csv(){
 const q=v=>'"'+String(v).replace(/"/g,'""')+'"',rows=[];
 rows.push(['Tech pack',tp.name,sku,tp.season,tp.status].map(q).join(','),'');
 rows.push(['POM','Measurement','Tolerance (in)',...SIZES.map(s=>s+' (in)')].map(q).join(','));
 tp.pom.forEach(r=>rows.push([r.code,r.name,r.tol,...SIZES.map(s=>r[s])].map(q).join(',')));
 rows.push('',['Item','Spec','Supplier','Qty'].map(q).join(','));
 tp.bom.forEach(b=>rows.push([b.item,b.spec,b.supplier,b.qty].map(q).join(',')));
 rows.push('',['Rev','Date','By','Change'].map(q).join(','));
 tp.revisions.forEach(r=>rows.push([r.rev,r.date,r.by,r.note].map(q).join(',')));
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));a.download=sku+'-spec.csv';document.body.appendChild(a);a.click();a.remove();toast('Spec CSV downloaded');
}
document.addEventListener('click',e=>{
 const t=e.target;if(!root.contains(t))return;
 let b;
 if(b=t.closest('[data-pin]')){active=+b.dataset.pin;const p=tp.pins.find(x=>x.n===active);if(p)view=p.view;render();if(innerWidth<860)$('#panel').scrollIntoView({behavior:'smooth',block:'nearest'});return}
 if(b=t.closest('[data-view]')){view=b.dataset.view;active=null;render();return}
 if(b=t.closest('[data-unit]')){unit=b.dataset.unit;render();return}
 if(b=t.closest('[data-hex]')){navigator.clipboard&&navigator.clipboard.writeText(b.dataset.hex).catch(()=>{});toast('Copied '+b.dataset.hex);return}
 if(b=t.closest('[data-asset]')){toast('Placeholder file. Upload the real '+b.dataset.asset+' to the assets folder.');return}
 if(b=t.closest('[data-sign]')){const w=b.dataset.sign,n=$('#n-'+w).value.trim(),d=$('#d-'+w).value;if(!n||!d){toast('Add a name and date');return}
  try{localStorage.setItem(sigKey(w),JSON.stringify({name:n,date:d}))}catch(x){}renderRdy();return}
 if(b=t.closest('[data-clear]')){try{localStorage.removeItem(sigKey(b.dataset.clear))}catch(x){}renderRdy();return}
 if(t.closest('#csv')||t.closest('#csv2')){csv();return}
 if(t.closest('#prt')){window.print();return}
 if(t.closest('#share')){const u=location.origin+location.pathname+'?sku='+sku;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast('Link copied, no login needed'),()=>toast(u));return}
});
document.title=tp.name+' tech pack · Emordes Studio';
render();
})();
