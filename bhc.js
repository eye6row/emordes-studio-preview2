/* Black Hole carousel: inactive slides are discs, active slide morphs into a pill. */
window.BHC=function(root,slides,o){
o=o||{};var n=slides.length,i=0,gap=o.gap||0.022,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,hold=o.hold||1700,timer,paused=false;
root.classList.add('bhc');
root.innerHTML='<div class="bhc-meta"><span class="bhc-a"></span><span class="bhc-b"></span></div><div class="bhc-vp"></div><div class="bhc-t" aria-live="polite"></div>';
var vp=root.querySelector('.bhc-vp'),ta=root.querySelector('.bhc-t'),ma=root.querySelector('.bhc-a'),mb=root.querySelector('.bhc-b');
var els=slides.map(function(s,k){var e=document.createElement(s.href?'a':'div');e.className='bhc-s';if(s.href)e.href=s.href;e.setAttribute('aria-label',s.title);
 if(s.img){e.innerHTML='<img alt="" src="'+s.img+'"'+(k?' loading="lazy"':'')+'>'}else{e.classList.add('void');e.innerHTML='<canvas></canvas>'}
 if(!o.keys&&o.keys!==undefined){}else e.addEventListener('click',function(ev){if(k!==i){ev.preventDefault();go(k);restart()}else if(s.soon){ev.preventDefault()}});
 vp.appendChild(e);return e});
var prev=0;
function rel(k){var r=((k-i)%n+n)%n;if(r>n/2)r-=n;return r}
function layout(jump){var vw=vp.clientWidth,H=vp.clientHeight,W=Math.min(vw*.64,H*3.3),g=vw*gap;
 els.forEach(function(e,k){var r=rel(k),act=r===0,w=act?W:H,x;
  if(r===0)x=0;else if(r>0)x=W/2+g+H/2+(r-1)*(H+g);else x=-(W/2+g+H/2+(-r-1)*(H+g));
  var far=Math.abs(r)>2;
  var wrapped=Math.abs(r-(e._r||0))>2;e._r=r;
  e.style.transition=(jump||wrapped||reduce)?'none':'';
  e.style.width=w+'px';e.style.left=(vw/2+x-w/2)+'px';e.style.opacity=far?0:1;e.classList.toggle('on',act);e.tabIndex=act?0:-1;
  if(e.querySelector('img')){e.querySelector('img').style.transform=act?'scale(1)':'scale(1.25)'}});
 var s=slides[i];ta.textContent=s.title;ma.textContent='['+(o.prefix||'001')+'-'+(i+1)+']';mb.textContent='['+(o.prefix||'001')+'-'+(((i+1)%n)+1)+']';
 if(o.onchange)o.onchange(i,s)}
function go(k){i=(k+n)%n;layout(false)}
function restart(){clearInterval(timer);if(!reduce)timer=setInterval(function(){if(!paused&&!document.hidden)go(i+1)},hold+1100)}
root.addEventListener('mouseenter',function(){paused=true});root.addEventListener('mouseleave',function(){paused=false});
root.addEventListener('focusin',function(){paused=true});root.addEventListener('focusout',function(){paused=false});
addEventListener('resize',function(){layout(true)});if(window.ResizeObserver)new ResizeObserver(function(){layout(true)}).observe(vp);
if(o.keys!==false)document.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1)});
var sx=0;vp.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});vp.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){go(i+(d<0?1:-1));restart()}});
layout(true);requestAnimationFrame(function(){layout(true)});if(o.delay)setTimeout(restart,o.delay);else restart();
// black hole canvas for void slides
var cv=els.map(function(e){return e.querySelector('canvas')});
function draw(t){cv.forEach(function(c){if(!c)return;var w=c.clientWidth,h=c.clientHeight;if(!w)return;if(c.width!==w||c.height!==h){c.width=w;c.height=h}var x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,w,h);var ph=(t/5000)%1,cx=w/2,cy=h/2,R=Math.min(w,h)/2;
 for(var k=0;k<12;k++){var f=(k+ph)/12,rr=R*(1.5-f*1.2),al=Math.sin(f*Math.PI)*.7;x.save();x.translate(cx,cy);x.scale(1.9,.5);x.beginPath();x.arc(0,0,rr,0,6.283);x.lineWidth=1+f*3;x.strokeStyle='rgba(255,140,60,'+al+')';x.stroke();x.restore()}
 x.fillStyle='#000';x.beginPath();x.arc(cx,cy,R*.34,0,6.283);x.fill();x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=1.5;x.beginPath();x.arc(cx,cy,R*.34,0,6.283);x.stroke()});
 if(!reduce)requestAnimationFrame(draw)}
requestAnimationFrame(draw);
return{go:go}};
