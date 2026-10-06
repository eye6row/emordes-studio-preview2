// Emordes shop layer: lights toggle, cart drawer, restructured PLP. PLACEHOLDER data.
const POOL=['hero-01','work-03','hero-02','work-04','work-05','hero-03','work-06','work-07','work-08','work-01'].map(n=>`images/${n}.jpg`);
const COLORS={indigo:['Indigo','#26326b','hue-rotate(200deg) saturate(.8)'],ecru:['Ecru','#e7dfcf','sepia(.35) brightness(1.06)'],black:['Black','#121212','grayscale(1) brightness(.75)'],red:['Abel Red','#a8322d','sepia(.5) saturate(2.2) hue-rotate(-25deg)'],natural:['Natural','#c9b79a','none']};
const EXTRA={
 1:{sub:['woven','acc'],colors:['natural','indigo','ecru'],sizes:['OS'],isNew:1},
 2:{sub:['woven'],colors:['natural','red'],sizes:['OS']},
 3:{sub:['tees'],colors:['black','ecru'],sizes:['XS','S','M','L','XL'],isNew:1},
 4:{sub:['woven'],colors:['natural','indigo'],sizes:['OS']},
 5:{sub:['archive'],colors:['ecru'],sizes:['S','M','L']},
 6:{sub:['archive'],colors:['natural'],sizes:['OS']},
 7:{sub:['acc','woven'],colors:['natural','black'],sizes:['OS'],isNew:1},
 8:{sub:['woven'],colors:['red','natural'],sizes:['OS']},
 9:{sub:['acc'],colors:['indigo','ecru','red'],sizes:['OS'],isNew:1},
 10:{sub:['archive'],colors:['black'],sizes:['S','M','L','XL']},
};
const SHOP=PRODUCTS.map((p,i)=>({...p,...EXTRA[p.id],img:POOL[i],alt:POOL[(i+3)%POOL.length]}));
const SUBS=[['all','All',POOL[0]],['new','New',POOL[4]],['tees','Tees',POOL[2]],['woven','Woven / Binakol',POOL[1]],['acc','Accessories',POOL[8]],['archive','Archive',POOL[9]]];
const PRICES=[['u100','Under $100',p=>p<100],['100','$100–$300',p=>p>=100&&p<=300],['300','$300+',p=>p>300]];
const money=n=>'$'+n;
const $=s=>document.querySelector(s);

/* ---------- cart ---------- */
const Cart={
 get(){try{return JSON.parse(localStorage.ems_cart||'[]')}catch(e){return[]}},
 set(c){localStorage.ems_cart=JSON.stringify(c);Cart.paint()},
 add(id,size,color){const c=Cart.get(),k=c.find(x=>x.id===id&&x.size===size&&x.color===color);k?k.qty++:c.push({id,size,color,qty:1});Cart.set(c);Cart.open()},
 paint(){
  const c=Cart.get(),n=c.reduce((a,x)=>a+x.qty,0),cc=$('#cc');if(cc){cc.textContent=n;cc.parentElement.classList.remove('bump');void cc.offsetWidth;cc.parentElement.classList.add('bump')}
  const b=$('#cartItems');if(!b)return;
  b.innerHTML=c.length?c.map((x,i)=>{const p=SHOP.find(s=>s.id===x.id);return `<li><div class="ci"><img src="${p.img}" alt="" style="filter:${COLORS[x.color][2]}"></div>
   <div><b>${p.name}</b><span class="mono">${COLORS[x.color][0]} · ${x.size}</span>
   <span class="qty mono"><button data-q="${i}" data-d="-1" aria-label="Less">−</button>${x.qty}<button data-q="${i}" data-d="1" aria-label="More">+</button></span></div>
   <span>${money(p.price*x.qty)}</span></li>`}).join(''):'<li class="empty mono">Your cart is empty.</li>';
  $('#cartTotal').textContent=money(c.reduce((a,x)=>a+SHOP.find(s=>s.id===x.id).price*x.qty,0));
 },
 open(){$('#cart').hidden=false;$('#scrim').hidden=false;requestAnimationFrame(()=>document.body.classList.add('cart-open'))},
};
function closeDrawers(){document.body.classList.remove('cart-open','filters-open');setTimeout(()=>{['#cart','#filters','#scrim'].forEach(s=>{const e=$(s);if(e)e.hidden=true})},300)}

function initShopChrome(){
 // lights
 const L=$('#lights'),sync=()=>{const off=document.documentElement.classList.contains('off');L.setAttribute('aria-pressed',off);L.querySelector('span').textContent=off?'Lights off':'Lights on'};
 L.addEventListener('click',()=>{const off=document.documentElement.classList.toggle('off');try{localStorage.ems_lights=off?'off':'on'}catch(e){}sync()});sync();
 // cart drawer
 if(!$('#scrim'))document.body.insertAdjacentHTML('beforeend','<div class="scrim" id="scrim" hidden></div>');
 document.body.insertAdjacentHTML('beforeend',`<aside class="drawer cart" id="cart" aria-label="Cart" hidden><div class="dh"><b class="mono">Cart</b><button class="x mono" data-close>Close ✕</button></div>
  <ul class="db citems" id="cartItems"></ul><div class="df col"><div class="tot"><span class="mono">Subtotal</span><b id="cartTotal">$0</b></div>
  <button class="mono solid" id="checkout">Checkout</button><p class="mono note">Preview only · no payments are taken</p></div></aside>`);
 $('#cartBtn').addEventListener('click',Cart.open);
 $('#checkout').addEventListener('click',e=>{e.target.textContent='Checkout coming soon';setTimeout(()=>e.target.textContent='Checkout',1800)});
 document.addEventListener('click',e=>{if(e.target.closest('[data-close]')||e.target.id==='scrim')closeDrawers();
  const q=e.target.closest('[data-q]');if(q){const c=Cart.get(),it=c[+q.dataset.q];it.qty+=+q.dataset.d;if(it.qty<1)c.splice(+q.dataset.q,1);Cart.set(c)}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawers()});
 Cart.paint();
}

/* ---------- PLP ---------- */
function initCatalog(){
 const q=new URLSearchParams(location.search),term=(q.get('q')||'').toLowerCase();
 const legacy={Textiles:'woven',Apparel:'tees',Objects:'archive'};
 const st={sub:legacy[q.get('c')]||q.get('sub')||'all',size:new Set,color:new Set,cat:new Set,price:new Set,sort:'feat',
  cols:+(localStorage.ems_cols||4),mcols:+(localStorage.ems_mcols||2)};
 const mob=()=>innerWidth<760;
 // subcategory thumbnails
 $('#subcats').innerHTML=SUBS.map(([k,l,src])=>`<button class="sc" data-sub="${k}"><span class="st"><img src="${src}" alt=""></span><span class="mono">${l}</span></button>`).join('');
 // filter groups
 const sizes=['XS','S','M','L','XL','OS'],cats=[...new Set(SHOP.map(p=>p.cat))];
 const groups=[['size','Size',sizes.map(s=>[s,s])],['color','Color',Object.entries(COLORS).map(([k,v])=>[k,`<i class="dot" style="background:${v[1]}"></i>${v[0]}`])],['cat','Category',cats.map(c=>[c,c])],['price','Price',PRICES.map(p=>[p[0],p[1]])]];
 const opts=(g,list)=>list.map(([v,l])=>`<label class="opt"><input type="checkbox" data-g="${g}" value="${v}"><span>${l}</span></label>`).join('');
 $('#fx').innerHTML=groups.map(([g,l,list])=>`<details class="dd"><summary class="mono">${l} <em data-n="${g}"></em></summary><div class="pop">${opts(g,list)}</div></details>`).join('')+`<button class="mono allf" id="allf">All filters ☰</button>`;
 $('#fbody').innerHTML=groups.map(([g,l,list])=>`<fieldset><legend class="mono">${l}</legend>${opts(g,list)}</fieldset>`).join('');
 const viewBtns=()=>{$('#view').innerHTML='<span>View</span>'+(mob()?[1,2]:[3,4,6]).map(n=>`<button data-v="${n}" aria-pressed="${(mob()?st.mcols:st.cols)===n}">${n}</button>`).join('')};

 const list=()=>{let r=SHOP.filter(p=>(st.sub==='all'||(st.sub==='new'?p.isNew:p.sub.includes(st.sub)))
  &&(!st.size.size||p.sizes.some(s=>st.size.has(s)))&&(!st.color.size||p.colors.some(c=>st.color.has(c)))
  &&(!st.cat.size||st.cat.has(p.cat))&&(!st.price.size||PRICES.some(x=>st.price.has(x[0])&&x[2](p.price)))
  &&(!term||JSON.stringify(p).toLowerCase().includes(term)));
  if(st.sort==='lo')r=[...r].sort((a,b)=>a.price-b.price);if(st.sort==='hi')r=[...r].sort((a,b)=>b.price-a.price);if(st.sort==='new')r=[...r].sort((a,b)=>(b.isNew||0)-(a.isNew||0));
  return r};

 const card=(p,i)=>`<article class="pc" data-id="${p.id}" style="--d:${i*45}ms">
  <a class="cm" href="product.html?id=${p.id}"><span class="spot"></span>
   <img class="i1" src="${p.img}" alt="${p.name}" ${i<4?'':'loading="lazy"'} style="filter:${COLORS[p.colors[0]][2]}">
   <img class="i2" src="${p.alt}" alt="" loading="lazy">
   ${p.isNew?'<span class="flag mono">New</span>':''}</a>
  <div class="qa"><button class="qadd mono" data-add="${p.id}">Add – ${money(p.price)}</button>
   <div class="szs" hidden>${p.sizes.map(s=>`<button class="mono" data-size="${s}">${s}</button>`).join('')}<button class="mono xs" data-cancel aria-label="Cancel">✕</button></div></div>
  <div class="ct"><a href="product.html?id=${p.id}"><b>${p.name}</b></a><span>${money(p.price)}</span></div>
  <div class="sw" role="group" aria-label="Colors">${p.colors.map((c,j)=>`<button class="swb" data-c="${c}" aria-pressed="${j===0}" title="${COLORS[c][0]}" style="background:${COLORS[c][1]}"></button>`).join('')}<span class="mono">${p.colors.length>1?p.colors.length+' colors':COLORS[p.colors[0]][0]}</span></div>
 </article>`;
 const media=`<a class="tile media" href="?sub=woven"><div class="kb"><img src="${POOL[5]}" alt=""><img src="${POOL[0]}" alt=""><img src="${POOL[2]}" alt=""></div>
  <span class="mono live">● Loop</span><div class="mcap"><span class="mono">Film 01</span><b>Binakol, in motion</b></div></a>`;
 const edit=[`<a class="tile ed" href="?sub=woven"><img src="${POOL[6]}" alt="" loading="lazy"><div><span class="mono">Journal · Craft</span><h3>The whirlpool that <em>wards off</em> spirits</h3><p>Binakol is woven on Ilocano floor looms in optical spirals. We cut it into everyday form.</p><span class="mono u">Shop the weave →</span></div></a>`,
  `<a class="tile ed rev" href="?sub=archive"><img src="${POOL[7]}" alt="" loading="lazy"><div><span class="mono">Lookbook · Sirko</span><h3>Circus, ritual, <em>runway</em></h3><p>Pieces from the archive, worn the way they were made to move.</p><span class="mono u">See the archive →</span></div></a>`];
 const banner=`<section class="camp"><img src="${POOL[2]}" alt="" loading="lazy"><div class="cc"><span class="mono">Campaign · FW26</span><h2>We weave the story.<br><em>You wear the culture.</em></h2><a class="mono" href="?sub=new">Shop new arrivals</a></div></section>`;

 const render=()=>{
  const g=$('#grid'),r=list(),cols=mob()?st.mcols:st.cols;
  g.style.setProperty('--cols',cols);g.dataset.cols=cols;
  const span=cols>=3?2:1;let cells=[],used=0,bannerAt=cols*(mob()?4:2),placed=false;
  const push=(h,s)=>{cells.push(h);used+=s;if(!placed&&used>=bannerAt&&r.length>4){cells.push(banner);placed=true}};
  if(st.sub==='all'&&!term)push(media,1);
  r.forEach((p,i)=>{push(card(p,i),1);if(st.sub==='all'&&!term&&(i===4||i===8)&&cols>1)push(edit[i===4?0:1],span)});
  g.innerHTML=cells.join('')||'<p class="none mono">No pieces match. <button id="clr2">Clear filters</button></p>';
  $('#count').textContent=r.length+' pieces';$('#fcount').textContent=r.length;
  document.querySelectorAll('.sc').forEach(b=>b.setAttribute('aria-current',b.dataset.sub===st.sub));
  document.querySelectorAll('input[data-g]').forEach(i=>i.checked=st[i.dataset.g].has(i.value));
  document.querySelectorAll('[data-n]').forEach(e=>{const n=st[e.dataset.n].size;e.textContent=n?n:''});
  const ch=[];groups.forEach(([gk,,lst])=>st[gk].forEach(v=>ch.push(`<button class="chip mono" data-rm="${gk}:${v}">${lst.find(x=>x[0]===v)[1].replace(/<[^>]+>/g,'')} ✕</button>`)));
  $('#chips').innerHTML=ch.length?ch.join('')+'<button class="chip mono clr" id="clr">Clear all</button>':'';
  viewBtns();
 };
 const clear=()=>{['size','color','cat','price'].forEach(k=>st[k].clear());render()};
 document.addEventListener('change',e=>{const i=e.target.closest('input[data-g]');if(i){st[i.dataset.g][i.checked?'add':'delete'](i.value);render()}});
 $('#sort').addEventListener('change',e=>{st.sort=e.target.value;render()});
 $('#fclear').addEventListener('click',clear);
 document.addEventListener('click',e=>{
  const t=e.target;
  const sc=t.closest('.sc');if(sc){st.sub=sc.dataset.sub;history.replaceState(0,'','?sub='+st.sub);render();return}
  const v=t.closest('[data-v]');if(v){mob()?(st.mcols=+v.dataset.v,localStorage.ems_mcols=st.mcols):(st.cols=+v.dataset.v,localStorage.ems_cols=st.cols);render();return}
  const rm=t.closest('[data-rm]');if(rm){const[k,val]=rm.dataset.rm.split(':');st[k].delete(val);render();return}
  if(t.id==='clr'||t.id==='clr2'){clear();return}
  if(t.closest('#allf')){$('#filters').hidden=false;$('#scrim').hidden=false;requestAnimationFrame(()=>document.body.classList.add('filters-open'));return}
  if(!t.closest('.dd'))document.querySelectorAll('.dd[open]').forEach(d=>d.open=false);
  const c=t.closest('.pc');if(!c)return;const p=SHOP.find(s=>s.id===+c.dataset.id),color=()=>c.querySelector('.swb[aria-pressed=true]').dataset.c;
  const sw=t.closest('.swb');if(sw){c.querySelectorAll('.swb').forEach(b=>b.setAttribute('aria-pressed',b===sw));c.querySelector('.i1').style.filter=COLORS[sw.dataset.c][2];return}
  if(t.closest('[data-add]')){if(p.sizes.length===1){Cart.add(p.id,p.sizes[0],color());flash(c)}else{c.querySelector('.qadd').hidden=true;c.querySelector('.szs').hidden=false}return}
  if(t.closest('[data-cancel]')){c.querySelector('.qadd').hidden=false;c.querySelector('.szs').hidden=true;return}
  const s=t.closest('[data-size]');if(s){Cart.add(p.id,s.dataset.size,color());c.querySelector('.qadd').hidden=false;c.querySelector('.szs').hidden=true;flash(c)}
 });
 document.addEventListener('toggle',e=>{if(e.target.open)document.querySelectorAll('.dd[open]').forEach(d=>d!==e.target&&(d.open=false))},true);
 const flash=c=>{const b=c.querySelector('.qadd'),o=b.textContent;b.textContent='Added ✓';setTimeout(()=>b.textContent=o,1400)};
 // spotlight follows cursor in lights-off mode
 document.addEventListener('pointermove',e=>{const m=e.target.closest&&e.target.closest('.cm');if(m){const r=m.getBoundingClientRect();m.style.setProperty('--x',(e.clientX-r.left)/r.width*100+'%');m.style.setProperty('--y',(e.clientY-r.top)/r.height*100+'%')}});
 let wasMob=mob();addEventListener('resize',()=>{if(mob()!==wasMob){wasMob=mob();render()}});
 render();
}
document.addEventListener('DOMContentLoaded',initShopChrome);
