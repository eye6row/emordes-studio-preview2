(function(){
var main=document.getElementById('main');if(!main)return;
var names=['Gargantua','Singularity','Event Horizon','Accretion','Spacetime'];
var imgs=['hero-01','work-03','hero-02','work-04','hero-03'];
var d=document.createElement('section');d.className='bh';d.setAttribute('aria-label','Featured');
d.innerHTML='<div class="bh-meta"><span><b id="bhn">001</b> / 005</span><span>Emordes loop</span><span>Scroll right to left</span></div><div class="bh-vp"><div class="bh-tr" id="bhtr">'+imgs.map(function(n,i){return '<div class="bh-s"><img src="images/'+n+'.jpg" alt=""'+(i?' loading="lazy"':'')+'><canvas></canvas></div>'}).join('')+'</div></div><p class="bh-t" id="bht" aria-live="polite"></p>';
var sh=main.querySelector('.shead');sh.parentNode.insertBefore(d,sh.nextSibling);
var tr=d.querySelector('#bhtr'),sl=[].slice.call(tr.children),i=0,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(k){i=(k+sl.length)%sl.length;var s=sl[i];tr.style.transform='translateX('+(-(s.offsetLeft+s.offsetWidth/2))+'px)';sl.forEach(function(e,j){e.classList.toggle('on',j===i)});d.querySelector('#bht').textContent=names[i];d.querySelector('#bhn').textContent=('00'+(i+1)).slice(-3)}
addEventListener('resize',function(){go(i)});
setTimeout(function(){go(0)},50);
if(!reduce)setInterval(function(){if(!document.hidden)go(i+1)},2800);
var cv=sl.map(function(s){return s.querySelector('canvas')});
function draw(t){cv.forEach(function(c,n){var w=c.clientWidth,h=c.clientHeight;if(!w)return;if(c.width!==w){c.width=w;c.height=h}var x=c.getContext('2d');x.clearRect(0,0,w,h);var ph=(t/5000+n*.2)%1,cx=w/2,cy=h/2,R=h*.5;
for(var k=0;k<10;k++){var f=(k+ph)/10;var rr=R*(1.6-f*1.3);var al=Math.sin(f*Math.PI)*.5;x.save();x.translate(cx,cy);x.scale(2.2,.5);x.beginPath();x.arc(0,0,rr,0,6.283);x.lineWidth=1+f*2;x.strokeStyle='rgba(255,170,90,'+al+')';x.stroke();x.restore()}
x.fillStyle='#000';x.beginPath();x.ellipse(cx,cy,R*.3,R*.3,0,0,6.283);x.fill()});
if(!reduce)requestAnimationFrame(draw)}
requestAnimationFrame(draw);
})();