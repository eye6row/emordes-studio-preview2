// Emordes Studio preview v2. Products marked PLACEHOLDER until real data arrives.
const PRODUCTS = [
 {id:1,name:'Binakol Scarf',cat:'Textiles',price:180,fabric:'Cotton',weave:'Binakol (optical whirlpool)',comp:'100% cotton',weight:'180 GSM',fn:'Wrap / scarf',origin:'Ilocos, Philippines'},
 {id:2,name:'Kusikus Woven Blanket',cat:'Textiles',price:420,fabric:'Cotton',weave:'Kusikus motif jacquard',comp:'100% cotton',weight:'420 GSM',fn:'Throw / wall hanging',origin:'Ilocos, Philippines'},
 {id:3,name:'GAJE 777 Tee',cat:'Apparel',price:48,fabric:'Jersey',weave:'Single knit',comp:'100% ringspun cotton',weight:'220 GSM',fn:'Everyday tee',origin:'Printed in USA'},
 {id:4,name:'Inabel Runner',cat:'Objects',price:160,fabric:'Cotton',weave:'Inabel plain',comp:'100% cotton',weight:'260 GSM',fn:'Table runner',origin:'Ilocos, Philippines'},
 {id:5,name:'Deconstructed Barong',cat:'Apparel',price:520,fabric:'Piña blend',weave:'Sheer plain',comp:'Piña / silk',weight:'60 GSM',fn:'Overshirt',origin:'Made in SF'},
 {id:6,name:'Bio Sample Swatch Set',cat:'Objects',price:95,fabric:'Biomaterial',weave:'Cast / non-woven',comp:'Bio-resin + fiber',weight:'Varies',fn:'Material study',origin:'EMORDES LABORATORY'},
 {id:7,name:'Whirlpool Tote',cat:'Apparel',price:110,fabric:'Cotton',weave:'Binakol',comp:'100% cotton',weight:'300 GSM',fn:'Carryall',origin:'Ilocos, Philippines'},
 {id:8,name:'Ritual Cushion',cat:'Objects',price:140,fabric:'Cotton',weave:'Twill',comp:'Cotton / kapok fill',weight:'340 GSM',fn:'Cushion',origin:'Ilocos, Philippines'},
 {id:9,name:'Collective Headwrap',cat:'Textiles',price:65,fabric:'Cotton voile',weave:'Plain',comp:'100% cotton',weight:'90 GSM',fn:'Headwrap',origin:'Made in SF'},
 {id:10,name:'Runway Ring Jacket',cat:'Apparel',price:680,fabric:'Wool / abel',weave:'Patchwork',comp:'Wool, cotton',weight:'480 GSM',fn:'Outerwear',origin:'Made in SF'},
];
const pad = n => String(n).padStart(2,'0');
const usd = n => '$' + n.toFixed(2) + ' USD';
const img = (src, label, alt='') => `<div class="phw" data-ph="${label}"><img src="${src}" alt="${alt}" loading="lazy"></div>`;

const MARK = `<svg viewBox="0 0 7 7" aria-hidden="true">${
 ['1111110','1000000','1000000','1111100','1000000','1000000','1111110'].map((r,y)=>[...r].map((c,x)=>
 `<circle cx="${x+.5}" cy="${y+.5}" r="${c=='1'?.42:.14}" fill="${c=='1'?'#141BF2':'#d0d0d0'}"/>`).join('')).join('')}</svg>`;

function header(){
 return `<a class="skip" href="#main">Skip to content</a>
 <header class="hdr"><div class="hdr-in">
  <a class="mark" href="home.html" aria-label="Emordes Studio home">${MARK}<span class="mono">Emordes&nbsp;Studio</span></a>
  <nav class="nav" id="nav" aria-label="Main">
   <button type="button" aria-expanded="false" aria-controls="mega" id="megaBtn">Work</button>
   <a href="catalog.html?c=Textiles">Textiles</a>
   <a href="catalog.html">Shop</a>
   <a href="home.html#journal">Journal</a>
  </nav>
  <div class="util mono">
   <a href="catalog.html">Bag (0)</a>
   <span class="lang"><b>EN</b> / <span>TL</span></span>
   <button class="burger mono" aria-expanded="false" aria-controls="nav" id="burger">Menu</button>
  </div></div>
  <div class="mega" id="mega" role="region" aria-label="Browse">
   <div><h4 class="mono">Discipline</h4><ul><li><a href="home.html#showcase">Creative Direction</a></li><li><a href="home.html#showcase">Visual Merchandising</a></li><li><a href="home.html#showcase">Events</a></li></ul></div>
   <div><h4 class="mono">Category</h4><ul><li><a href="catalog.html?c=Textiles">Textiles</a></li><li><a href="catalog.html?c=Apparel">Apparel</a></li><li><a href="catalog.html?c=Objects">Objects</a></li></ul></div>
   <div><h4 class="mono">Brands / Collabs</h4><ul><li><a href="home.html#works">JH × IZ</a></li><li><a href="https://gaje777.emordes.studio">GAJE 777</a></li><li><a href="https://izlab.emordes.studio">Emordes Laboratory</a></li></ul></div>
   <div><h4 class="mono">Journal</h4><ul><li><a href="home.html#journal">On Binakol</a></li><li><a href="home.html#journal">Kusikus, Reworked</a></li><li><a href="mailto:jh@emordes.studio">Contact</a></li></ul></div>
   <div><h4 class="mono">Search</h4><form class="search" action="catalog.html" role="search"><label class="skip" for="q">Search</label><input id="q" name="q" placeholder="Search the archive"><span class="mono">↵</span></form>
    <a class="feat ph-host" href="https://izlab.emordes.studio" style="display:block;margin-top:16px">${img('images/hero-03.jpg','hero-03.jpg')}<span class="mono">Emordes Laboratory ↗</span></a></div>
  </div>
 </header>`;
}
function footer(){
 return `<footer class="ftr">
  <div><img src="assets/wordmark.png" alt="Emordes Studio"><p class="mono" style="color:#888;margin-top:16px">Interdisciplinary creative house · San Francisco</p></div>
  <div><h4 class="mono">Studio</h4><ul><li><a href="home.html#works">Work</a></li><li><a href="catalog.html">Shop</a></li><li><a href="home.html#journal">Journal</a></li></ul></div>
  <div><h4 class="mono">Worlds</h4><ul><li><a href="https://gaje777.emordes.studio">GAJE 777 ↗</a></li><li><a href="https://izlab.emordes.studio">Laboratory ↗</a></li></ul></div>
  <div><h4 class="mono">Contact</h4><ul><li><a href="mailto:jh@emordes.studio">jh@emordes.studio</a></li></ul></div>
  <div class="bar mono"><span>© 2026 Emordes Studio</span><span>Preview v2 · not live</span></div>
 </footer>`;
}

// placeholder fallback: when an image 404s, show striped slot labeled with expected filename
function wirePlaceholders(root=document){
 root.querySelectorAll('.phw').forEach(w=>{
  const i=w.querySelector('img'); w.style.width='100%'; w.style.height='100%';
  const fail=()=>{w.classList.add('ph');};
  if(i.complete && i.naturalWidth===0) fail(); else i.addEventListener('error',fail);
 });
}

function initChrome(){
 document.body.insertAdjacentHTML('afterbegin',header());
 document.body.insertAdjacentHTML('beforeend',footer());
 const mb=document.getElementById('megaBtn'),mega=document.getElementById('mega');
 mb.addEventListener('click',()=>{const o=mega.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){mega.classList.remove('open');mb.setAttribute('aria-expanded',false)}});
 const bu=document.getElementById('burger'),nav=document.getElementById('nav');
 bu.addEventListener('click',()=>{const o=nav.classList.toggle('open');bu.setAttribute('aria-expanded',o)});
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

function itemCard(p){
 return `<a class="item" href="product.html?id=${p.id}" data-cat="${p.cat}">
  <div class="im"><span class="tag">PLACEHOLDER</span>
   <div class="a">${img(`images/product-${pad(p.id)}.jpg`,`product-${pad(p.id)}.jpg`,p.name)}</div>
   <div class="b">${img(`images/product-${pad(p.id)}-detail.jpg`,`product-${pad(p.id)}-detail.jpg`,p.name+' fabric detail')}</div>
  </div>
  <div class="info"><b>${p.name}</b><span class="mono" style="color:var(--mute)">${p.cat} · ${p.weave}</span><span>${usd(p.price)}</span></div></a>`;
}

function initHome(){
 // hero
 const slides=[...document.querySelectorAll('.hero .slide')],btns=[...document.querySelectorAll('.ind button')];
 let cur=0,t;
 const go=i=>{slides[cur].classList.remove('on');btns[cur].classList.remove('on');cur=i;slides[i].classList.add('on');
  btns[i].classList.remove('on');void btns[i].offsetWidth;btns[i].classList.add('on');
  btns.forEach((b,j)=>b.setAttribute('aria-selected',j===i));clearTimeout(t);t=setTimeout(()=>go((cur+1)%slides.length),6000)};
 btns.forEach((b,i)=>{b.addEventListener('click',()=>go(i));b.addEventListener('mouseenter',()=>go(i))});
 go(0);
 // rail
 const rail=document.getElementById('rail');
 document.querySelectorAll('[data-rail]').forEach(b=>b.addEventListener('click',()=>rail.scrollBy({left:(+b.dataset.rail)*rail.clientWidth*.6,behavior:'smooth'})));
}

function initCatalog(){
 const g=document.getElementById('grid'),q=new URLSearchParams(location.search);
 let cat=q.get('c')||'All';const term=(q.get('q')||'').toLowerCase();
 const render=()=>{g.innerHTML=PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&(!term||JSON.stringify(p).toLowerCase().includes(term))).map(itemCard).join('')||'<p class="mono" style="background:#fff;padding:20px;grid-column:1/-1">No results</p>';
  wirePlaceholders(g);document.getElementById('count').textContent=g.querySelectorAll('.item').length+' items';
  document.querySelectorAll('.filters button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cat))};
 document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.c;render()}));
 render();
}

function initProduct(){
 const id=+new URLSearchParams(location.search).get('id')||1,p=PRODUCTS.find(x=>x.id===id)||PRODUCTS[0],n=pad(p.id);
 document.title=p.name+' · Emordes Studio';
 document.getElementById('pdp').innerHTML=`
 <div class="l"><table class="spec"><caption class="skip">Specifications</caption>
  ${[['Fabric',p.fabric],['Weave',p.weave],['Composition',p.comp],['Weight',p.weight],['Function',p.fn],['Origin',p.origin],['Ref','EMS-'+n]].map(r=>`<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</table>
  <p>Hand-loomed in the Ilocano tradition and reworked in San Francisco. The binakol pattern, an optical whirlpool once woven to ward off spirits, is carried into everyday form. We weave the story; you wear the culture.</p>
  <p class="mono" style="color:var(--red)">PLACEHOLDER product · details to be confirmed</p></div>
 <div class="stream" aria-label="Product images">
  ${img(`images/product-${n}.jpg`,`product-${n}.jpg`,p.name)}
  ${img(`images/product-${n}-detail.jpg`,`product-${n}-detail.jpg`,'Fabric detail')}
  ${img(`images/product-${n}-b.jpg`,`product-${n}-b.jpg`,'Alternate view')}
  ${img(`images/product-${n}-c.jpg`,`product-${n}-c.jpg`,'Worn')}</div>
 <div class="r"><nav class="crumb mono" aria-label="Breadcrumb"><a href="home.html">Home</a> / <a href="catalog.html">Shop</a> / <a href="catalog.html?c=${p.cat}">${p.cat}</a></nav>
  <h1>${p.name}</h1><div class="price">${usd(p.price)}</div>
  <div class="mono">Size</div>
  <div class="sizes" role="group" aria-label="Size">${['XS','S','M','L','XL','OS'].slice(p.cat==='Apparel'?0:5).map((s,i)=>`<button type="button" aria-pressed="${i===0}">${s}</button>`).join('')}</div>
  <a class="add" id="add" href="#">Add to Bag</a>
  <p class="note mono">Made to order · inquiries via jh@emordes.studio</p></div>`;
 wirePlaceholders(document.getElementById('pdp'));
 const sz=[...document.querySelectorAll('.sizes button')];
 const upd=()=>{const s=sz.find(b=>b.getAttribute('aria-pressed')==='true').textContent;
  document.getElementById('add').href=`mailto:jh@emordes.studio?subject=${encodeURIComponent('Inquiry: '+p.name+' ('+s+')')}`};
 sz.forEach(b=>b.addEventListener('click',()=>{sz.forEach(x=>x.setAttribute('aria-pressed',x===b));upd()}));upd();
}

document.addEventListener('DOMContentLoaded',()=>{
 initChrome();
 const pg=document.body.dataset.page;
 if(pg==='home')initHome();if(pg==='catalog')initCatalog();if(pg==='product')initProduct();
 wirePlaceholders();
});
