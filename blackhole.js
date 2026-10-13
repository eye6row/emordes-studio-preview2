(function(){var main=document.getElementById('main');if(!main)return;
var d=document.createElement('section');d.className='bh';d.id='bhhero';d.setAttribute('aria-label','Featured');
var sh=main.querySelector('.shead');sh.parentNode.insertBefore(d,sh.nextSibling);
var names=['Gargantua','Singularity','Event Horizon','Accretion Disk','Spacetime'];var imgs=['hero-01','work-03','hero-02','work-04','hero-03'];
BHC(d,names.map(function(t,k){return{title:t,img:'images/'+imgs[k]+'.jpg'}}),{});
})();