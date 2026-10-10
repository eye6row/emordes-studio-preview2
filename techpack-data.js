// Emordes Smart Tech Pack data. PLACEHOLDER values, edit freely. Keyed by SKU.
// pins: x,y are percent of the sketch (400x460). view: front|back.
window.TECHPACKS = {
 'EMS-TEE-01': {
  name:'GAJE 777 Graphic Tee', productId:3, garment:'tee', season:'SS27', status:'Sample 2', fit:'Boxy, dropped shoulder',
  image:'images/hero-02.jpg', fabric:'220 GSM single jersey, 100% ringspun cotton, garment dyed',
  pins:[
   {n:1,view:'front',x:50,y:12,title:'Collar',ref:'images/work-03.jpg',notes:'1x1 rib collar, 1 in (2.5 cm) finished width, self-fabric neck tape inside, bartack at shoulder seams.',specs:{Stitch:'2-needle coverstitch, 12 SPI',Thread:'Tex 40 cotton-poly core',Rib:'1x1, 5% elastane'}},
   {n:2,view:'front',x:20,y:26,title:'Sleeve and shoulder',ref:'images/work-04.jpg',notes:'Dropped shoulder, set-in sleeve, shoulder seam taped with clear elastic to stop stretch.',specs:{Stitch:'4-thread overlock, 12 SPI',Tape:'1/4 in clear elastic',Drop:'2.5 in (6.4 cm)'}},
   {n:3,view:'front',x:50,y:42,title:'Front print placement',ref:'images/work-05.jpg',notes:'Chest print, centered, top edge 3 in (7.6 cm) below the collar seam. Water-based discharge ink.',specs:{Size:'10 x 12 in',Method:'Water-based screen print',Colors:'2 spot, see palette'}},
   {n:4,view:'front',x:88,y:35,title:'Sleeve hem',ref:'images/work-06.jpg',notes:'Double-needle coverstitch hem, 3/4 in (1.9 cm) turn-up. No tacking at side seams.',specs:{Stitch:'2-needle coverstitch',Turn:'3/4 in',Thread:'Match to body'}},
   {n:5,view:'front',x:50,y:90,title:'Bottom hem',ref:'images/work-07.jpg',notes:'1 in (2.5 cm) double-turn hem, coverstitch. Side vents 2 in (5 cm), reinforced with a bartack.',specs:{Stitch:'2-needle coverstitch',Turn:'1 in',Vent:'2 in side vents'}},
   {n:6,view:'back',x:50,y:10,title:'Neck label',ref:'images/work-08.jpg',notes:'Printed heat transfer neck label, Emordes mark plus size. Care and content on the side seam label.',specs:{Label:'Heat transfer, 2 in wide',Position:'Centered, 1/2 in below seam',Care:'Cold wash, hang dry'}},
   {n:7,view:'back',x:50,y:30,title:'Back print',ref:'images/work-01.jpg',notes:'Upper back "777" mark, 6 in wide, centered, top edge 4 in below the back neck seam.',specs:{Size:'6 x 3 in',Method:'Puff screen print',Colors:'1 spot'}},
   {n:8,view:'back',x:50,y:92,title:'Back hem tag',ref:'images/work-07.jpg',notes:'Small woven flag label sewn into the left side seam, 1 in above the hem.',specs:{Label:'Woven damask, 1 x 2 in',Position:'Left side seam',Fold:'End fold'}}
  ],
  pom:[
   {code:'A',name:'Body length (HPS)',tol:'+/- 0.5',XS:26.5,S:27.5,M:28.5,L:29.5,XL:30.5,XXL:31.5},
   {code:'B',name:'Chest (1 in below armhole)',tol:'+/- 0.5',XS:21,S:22,M:23,L:24.5,XL:26,XXL:27.5},
   {code:'C',name:'Shoulder drop',tol:'+/- 0.25',XS:5,S:5.25,M:5.5,L:5.75,XL:6,XXL:6.25},
   {code:'D',name:'Sleeve length (from shoulder)',tol:'+/- 0.375',XS:8,S:8.25,M:8.5,L:8.75,XL:9,XXL:9.25},
   {code:'E',name:'Sleeve opening',tol:'+/- 0.25',XS:8,S:8.5,M:9,L:9.5,XL:10,XXL:10.5},
   {code:'F',name:'Neck width',tol:'+/- 0.25',XS:7,S:7.25,M:7.5,L:7.75,XL:8,XXL:8.25},
   {code:'G',name:'Front neck drop',tol:'+/- 0.25',XS:3.25,S:3.5,M:3.5,L:3.75,XL:3.75,XXL:4},
   {code:'H',name:'Bottom opening',tol:'+/- 0.5',XS:21,S:22,M:23,L:24.5,XL:26,XXL:27.5}
  ],
  bom:[
   {item:'Body fabric',spec:'220 GSM single jersey, 100% ringspun cotton',supplier:'TBD, Los Angeles mill',qty:'1.6 yd'},
   {item:'Neck rib',spec:'1x1 rib, 95/5 cotton elastane',supplier:'TBD',qty:'0.1 yd'},
   {item:'Thread',spec:'Tex 40 cotton-poly core, match to body',supplier:'Coats',qty:'180 m'},
   {item:'Neck label',spec:'Heat transfer, black on ecru',supplier:'TBD',qty:'1'},
   {item:'Care label',spec:'Satin, 4 languages, side seam',supplier:'TBD',qty:'1'},
   {item:'Hangtag',spec:'Uncoated 400 GSM card, string loop',supplier:'Emordes in-house',qty:'1'},
   {item:'Poly bag',spec:'Recycled, 10 x 14 in, suffocation warning',supplier:'TBD',qty:'1'}
  ],
  assets:[
   {name:'Front artwork (vector)',file:'gaje777-front.svg',note:'Placeholder, upload final file'},
   {name:'Back artwork (vector)',file:'gaje777-back.svg',note:'Placeholder, upload final file'},
   {name:'Neck label art',file:'neck-label.pdf',note:'Placeholder, upload final file'},
   {name:'Color separation guide',file:'separations.pdf',note:'Placeholder, upload final file'}
  ],
  revisions:[
   {rev:'R3',date:'2026-10-06',by:'JH',note:'Widened sleeve opening by 0.5 in. Moved back print down 1 in.'},
   {rev:'R2',date:'2026-09-28',by:'JH',note:'Switched to garment dye. Added clear elastic at the shoulder.'},
   {rev:'R1',date:'2026-09-15',by:'JH',note:'Initial pack issued for first sample.'}
  ]
 },
 'EMS-TEE-02': {
  name:'Sirko Ringer Tee', productId:null, garment:'tee', season:'FW27', status:'Pre-production', fit:'Regular, set-in shoulder',
  image:'images/work-04.jpg', fabric:'180 GSM slub jersey, cotton and linen blend, enzyme washed',
  pins:[
   {n:1,view:'front',x:50,y:12,title:'Contrast collar',ref:'images/work-03.jpg',notes:'Contrast ringer rib, 1.25 in (3.2 cm) wide, two stripes woven into the rib.',specs:{Stitch:'Coverstitch, 12 SPI',Rib:'1x1 with stripe',Thread:'Match to rib'}},
   {n:2,view:'front',x:14,y:30,title:'Ringer sleeve band',ref:'images/work-05.jpg',notes:'Matching contrast band sewn on the sleeve hem, 1.25 in wide.',specs:{Stitch:'Flatlock',Band:'1.25 in',Match:'Collar rib dye lot'}},
   {n:3,view:'front',x:68,y:34,title:'Chest embroidery',ref:'images/work-06.jpg',notes:'Small left chest star motif, 2 in (5 cm), satin stitch, placed 7 in below the shoulder seam.',specs:{Size:'2 x 2 in',Method:'Embroidery, 6,400 stitches',Thread:'Rayon 40wt'}},
   {n:4,view:'front',x:50,y:90,title:'Bottom hem',ref:'images/work-07.jpg',notes:'3/4 in (1.9 cm) coverstitch hem with straight hem, no vents.',specs:{Stitch:'Coverstitch',Turn:'3/4 in',Vent:'None'}},
   {n:5,view:'back',x:50,y:10,title:'Neck label',ref:'images/work-08.jpg',notes:'Woven neck label, Emordes mark, center back, folded with loop.',specs:{Label:'Woven damask',Position:'Center back',Fold:'Loop fold'}},
   {n:6,view:'back',x:50,y:28,title:'Back neck tape',ref:'images/work-01.jpg',notes:'Self-fabric neck tape, printed with "Made in San Francisco" repeating.',specs:{Tape:'3/8 in, printed',Stitch:'Coverstitch',Print:'Single color'}}
  ],
  pom:[
   {code:'A',name:'Body length (HPS)',tol:'+/- 0.5',XS:26,S:27,M:28,L:29,XL:30,XXL:31},
   {code:'B',name:'Chest (1 in below armhole)',tol:'+/- 0.5',XS:19.5,S:20.5,M:21.5,L:23,XL:24.5,XXL:26},
   {code:'C',name:'Shoulder width',tol:'+/- 0.25',XS:16,S:17,M:18,L:19,XL:20,XXL:21},
   {code:'D',name:'Sleeve length',tol:'+/- 0.375',XS:7.5,S:8,M:8.5,L:9,XL:9.5,XXL:10},
   {code:'E',name:'Sleeve opening',tol:'+/- 0.25',XS:7,S:7.5,M:8,L:8.5,XL:9,XXL:9.5},
   {code:'F',name:'Neck width',tol:'+/- 0.25',XS:6.75,S:7,M:7.25,L:7.5,XL:7.75,XXL:8}
  ],
  bom:[
   {item:'Body fabric',spec:'180 GSM slub jersey, 55/45 cotton linen',supplier:'TBD',qty:'1.5 yd'},
   {item:'Contrast rib',spec:'1x1 striped rib, two color',supplier:'TBD',qty:'0.12 yd'},
   {item:'Embroidery thread',spec:'Rayon 40wt, Abel Red',supplier:'Madeira',qty:'30 m'},
   {item:'Woven neck label',spec:'Damask, loop fold',supplier:'TBD',qty:'1'},
   {item:'Hangtag',spec:'Uncoated 400 GSM card',supplier:'Emordes in-house',qty:'1'}
  ],
  assets:[
   {name:'Star embroidery file',file:'star.dst',note:'Placeholder, upload final file'},
   {name:'Neck tape print art',file:'neck-tape.svg',note:'Placeholder, upload final file'}
  ],
  revisions:[
   {rev:'R2',date:'2026-10-04',by:'JH',note:'Reduced embroidery from 2.5 in to 2 in.'},
   {rev:'R1',date:'2026-09-30',by:'JH',note:'Initial pack issued.'}
  ]
 },
 'EMS-WVN-01': {
  name:'Deconstructed Barong', productId:5, garment:'shirt', season:'FW27', status:'Sample 1', fit:'Relaxed, long placket',
  image:'images/work-06.jpg', fabric:'60 GSM piña and silk blend, sheer plain weave, hand finished',
  pins:[
   {n:1,view:'front',x:50,y:9,title:'Collar',ref:'images/work-03.jpg',notes:'Stand and spread collar, unfused for drape. Raw edge folded and hand rolled.',specs:{Stitch:'Hand rolled, 14 SPI',Interfacing:'None',Stand:'1.25 in'}},
   {n:2,view:'front',x:50,y:38,title:'Placket and embroidery',ref:'images/work-04.jpg',notes:'Front placket 1.5 in wide with calado drawn thread panel on both sides, 4 in wide.',specs:{Placket:'1.5 in, self fabric',Panel:'Calado, hand embroidered',Buttons:'6 mother of pearl, 15 mm'}},
   {n:3,view:'front',x:14,y:32,title:'Sleeve',ref:'images/work-05.jpg',notes:'Set-in sleeve, French seam to keep the sheer inside clean.',specs:{Seam:'French seam, 1/4 in',Stitch:'Lockstitch, 14 SPI',Thread:'Silk 60wt'}},
   {n:4,view:'front',x:88,y:62,title:'Cuff',ref:'images/work-06.jpg',notes:'Single button cuff, 2.5 in tall, softened with a light fuse only at the button stand.',specs:{Cuff:'2.5 in',Button:'1 at 12 mm',Fuse:'Partial, lightweight'}},
   {n:5,view:'front',x:50,y:92,title:'Shirttail hem',ref:'images/work-07.jpg',notes:'Curved shirttail hem, narrow rolled hem 1/8 in (3 mm), finished by hand.',specs:{Hem:'Rolled, 1/8 in',Curve:'3 in rise at side',Thread:'Silk 60wt'}},
   {n:6,view:'back',x:50,y:10,title:'Neck label',ref:'images/work-08.jpg',notes:'Woven Emordes label with piece number handwritten on the care label.',specs:{Label:'Woven damask',Position:'Under collar, center back',Care:'Dry clean only'}},
   {n:7,view:'back',x:50,y:22,title:'Back yoke',ref:'images/work-01.jpg',notes:'Split back yoke with a self-fabric hanger loop and a single center pleat.',specs:{Yoke:'Split, 5 in deep',Pleat:'Center box pleat',Loop:'Self fabric'}}
  ],
  pom:[
   {code:'A',name:'Body length (HPS)',tol:'+/- 0.5',XS:29,S:30,M:31,L:32,XL:33,XXL:34},
   {code:'B',name:'Chest (1 in below armhole)',tol:'+/- 0.5',XS:21,S:22,M:23,L:24.5,XL:26,XXL:27.5},
   {code:'C',name:'Shoulder width',tol:'+/- 0.25',XS:17,S:17.75,M:18.5,L:19.25,XL:20,XXL:20.75},
   {code:'D',name:'Sleeve length (from shoulder)',tol:'+/- 0.5',XS:23,S:23.5,M:24,L:24.5,XL:25,XXL:25.5},
   {code:'E',name:'Cuff height',tol:'+/- 0.125',XS:2.5,S:2.5,M:2.5,L:2.5,XL:2.5,XXL:2.5},
   {code:'F',name:'Collar stand',tol:'+/- 0.125',XS:1.25,S:1.25,M:1.25,L:1.25,XL:1.25,XXL:1.25},
   {code:'G',name:'Neck opening',tol:'+/- 0.25',XS:15,S:15.5,M:16,L:16.5,XL:17,XXL:17.5}
  ],
  bom:[
   {item:'Body fabric',spec:'60 GSM piña silk blend, sheer plain',supplier:'TBD, Aklan weaver',qty:'2.6 yd'},
   {item:'Embroidery',spec:'Calado panel, hand drawn thread',supplier:'TBD, Lumban workshop',qty:'2 panels'},
   {item:'Buttons',spec:'Mother of pearl, 15 mm and 12 mm',supplier:'TBD',qty:'6 + 2'},
   {item:'Thread',spec:'Silk 60wt, match to body',supplier:'Gutermann',qty:'220 m'},
   {item:'Light fusing',spec:'Woven lightweight, button stand only',supplier:'TBD',qty:'0.1 yd'},
   {item:'Garment bag',spec:'Cotton muslin, drawstring',supplier:'Emordes in-house',qty:'1'}
  ],
  assets:[
   {name:'Calado panel pattern',file:'calado-panel.pdf',note:'Placeholder, upload final file'},
   {name:'Pattern pieces (DXF)',file:'barong-pattern.dxf',note:'Placeholder, upload final file'},
   {name:'Label art',file:'label.svg',note:'Placeholder, upload final file'}
  ],
  revisions:[
   {rev:'R2',date:'2026-10-02',by:'JH',note:'Changed side seams to French seams. Shortened body 1 in.'},
   {rev:'R1',date:'2026-09-20',by:'JH',note:'Initial pack issued.'}
  ]
 }
};
