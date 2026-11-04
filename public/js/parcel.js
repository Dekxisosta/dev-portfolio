
(function(){
var st=document.getElementById('parcel');if(!st||!window.THREE)return;
var T=THREE,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var R;try{R=new T.WebGLRenderer({antialias:true,alpha:true})}catch(e){return}
R.setPixelRatio(Math.min(window.devicePixelRatio||1,2));R.outputEncoding=T.sRGBEncoding;
st.appendChild(R.domElement);
function init(){
function mb(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var rnd=mb(11),SANS="'Libre Franklin',Helvetica,sans-serif",SERIF="'Playfair Display',Georgia,serif";
var WHITE={bg:'#e7e4f0',bg2:'#fdfcff',pan:'#15131b',ink:'#f5f3fb',dim:'rgba(245,243,251,.55)',vio:'#a98bff',logo:'#1b1923',logoDim:'rgba(27,25,35,.5)',star:'#6d3fd1',fold:'rgba(0,0,0,.08)',grain:'0,0,0',chev:'245,243,251'};
var BLACK={bg:'#15131b',bg2:'#35313f',pan:'#f5f3fb',ink:'#15131b',dim:'rgba(21,19,27,.55)',vio:'#6d3fd1',logo:'#f5f3fb',logoDim:'rgba(245,243,251,.55)',star:'#a98bff',fold:'rgba(255,255,255,.1)',grain:'255,255,255',chev:'21,19,27'};
var P=BLACK;
function isDark(){var t=document.documentElement.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches}
function txt(x,s,px,py,font,col,al,ls){x.font=font;x.fillStyle=col;x.textAlign=al||'left';if('letterSpacing' in x)x.letterSpacing=(ls||0)+'px';x.fillText(s,px,py)}
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function star(x,cx,cy,R,r,n){x.beginPath();for(var i=0;i<n*2;i++){var a=-Math.PI/2+i*Math.PI/n,d=i%2?r:R;x[i?'lineTo':'moveTo'](cx+d*Math.cos(a),cy+d*Math.sin(a))}x.closePath();x.fill()}
function ct(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');
 var lg=x.createLinearGradient(0,0,w,h);lg.addColorStop(0,P.bg2);lg.addColorStop(1,P.bg);x.fillStyle=lg;x.fillRect(0,0,w,h);
 for(var i=0;i<700;i++){x.fillStyle='rgba('+P.grain+','+(.02+rnd()*.025)+')';x.fillRect(rnd()*w,rnd()*h,1.5,1.5)}
 if(fn)fn(x,w,h);var t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=8;return t}
function chev(x,a,b,w,h){var r=mb(9),cols=Math.floor(w/30);for(var c=0;c<cols;c++){var cx=a+15+c*30,rows=Math.floor(h/16*(.55+r()*.45));for(var k=0;k<rows;k++){var y=b+h-10-k*16;x.strokeStyle='rgba('+P.chev+','+(.75-k/rows*.5)+')';x.lineWidth=2.2;x.beginPath();x.moveTo(cx-9,y+7);x.lineTo(cx,y);x.lineTo(cx+9,y+7);x.stroke();x.beginPath();x.moveTo(cx,y+7);x.lineTo(cx,y+15);x.stroke()}}}
function build(){
var front=ct(600,550,function(x,w,h){
 x.fillStyle=P.pan;rr(x,36,120,w-72,h-160,6);x.fill();
 txt(x,'PORTFOLIO · VOL. 01',64,160,'700 13px '+SANS,P.dim,'left',3);
 x.save();x.scale(.74,1);
 txt(x,'WEB',64/.74,255,'900 100px '+SANS,P.ink,'left',-2);txt(x,'DESIGN',64/.74,352,'900 100px '+SANS,P.vio,'left',-2);txt(x,'& DEV',64/.74,449,'900 100px '+SANS,P.ink,'left',-2);
 x.restore();
 txt(x,'NET WT. 1 PROJECT',64,492,'700 12px '+SANS,P.dim,'left',3);
 chev(x,w-210,150,150,330)});
var right=ct(600,550,function(x,w,h){x.fillStyle=P.pan;rr(x,36,120,w-72,h-160,6);x.fill();chev(x,56,140,w-112,h-200);
 x.fillStyle=P.pan;rr(x,w/2-110,h-150,220,46,23);x.fill();txt(x,'dekxi.',w/2,h-118,'800 28px '+SANS,P.ink,'center',-1)});
var left=ct(600,550,function(x,w,h){x.fillStyle=P.logo;star(x,w/2,h/2-30,46,20,8);txt(x,'dekxi.',w/2,h/2+70,'800 54px '+SANS,P.logo,'center',-2);txt(x,'HANDLE WITH CARE',w/2,h/2+112,'700 12px '+SANS,P.logoDim,'center',4)});
var back=ct(600,550,function(x,w,h){x.fillStyle=P.pan;rr(x,36,120,w-72,h-160,6);x.fill();txt(x,'BEST SERVED',w/2,h/2-8,'800 40px '+SANS,P.ink,'center',2);txt(x,'with a clean brief.',w/2,h/2+40,'italic 700 34px '+SERIF,P.vio,'center')});
var flat=ct(600,600,null);
var slopeF=ct(600,350,function(x,w,h){x.fillStyle=P.star;star(x,w/2,h/2-24,40,17,8);txt(x,'dekxi',w/2,h/2+62,'800 50px '+SANS,P.logo,'center',-2);x.fillStyle=P.fold;x.fillRect(0,h-3,w,3)});
var slopeB=ct(600,350,function(x,w,h){x.fillStyle=P.fold;x.fillRect(0,h-3,w,3)});
var gable=ct(400,260,function(x,w,h){x.fillStyle=P.fold;x.fillRect(w/2-1,0,2,h)});
return{front:front,right:right,left:left,back:back,flat:flat,slopeF:slopeF,slopeB:slopeB,gable:gable}}
var M={};function mat(k){return M[k]=new T.MeshPhysicalMaterial({roughness:.55,metalness:.02,clearcoat:.3,clearcoatRoughness:.5,side:T.DoubleSide})}
function rbox(w,h,d,r,seg){var g=new T.BoxGeometry(w,h,d,seg,seg,seg),p=g.attributes.position,n=g.attributes.normal,v=new T.Vector3(),c=new T.Vector3(),hw=w/2-r,hh=h/2-r,hd=d/2-r;
 for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i);c.set(Math.max(-hw,Math.min(hw,v.x)),Math.max(-hh,Math.min(hh,v.y)),Math.max(-hd,Math.min(hd,v.z)));var dir=v.sub(c).normalize();n.setXYZ(i,dir.x,dir.y,dir.z);p.setXYZ(i,c.x+dir.x*r,c.y+dir.y*r,c.z+dir.z*r)}return g}
function quad(a,b,c,d){var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute([].concat(a,b,c,d),3));g.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,1,1,0,1],2));g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();return g}
var W=1.25,H=1.0,D=1.25,RH=.42,FH=.22,t=.025;
var c=new T.Group();c.position.y=-.31;
var body=new T.Mesh(rbox(W,H,D,.035,24),[mat('right'),mat('left'),mat('flat'),mat('flat2'),mat('front'),mat('back')]);c.add(body);
var mG=mat('gable');var y0=H/2,hw=W/2,hd=D/2;
c.add(new T.Mesh(quad([-hw,y0,hd],[hw,y0,hd],[hw,y0+RH,t],[-hw,y0+RH,t]),mat('slopeF')));
c.add(new T.Mesh(quad([hw,y0,-hd],[-hw,y0,-hd],[-hw,y0+RH,-t],[hw,y0+RH,-t]),mat('slopeB')));
c.add(new T.Mesh(quad([hw,y0,hd],[hw,y0,-hd],[hw,y0+RH,-t],[hw,y0+RH,t]),mG));
c.add(new T.Mesh(quad([-hw,y0,-hd],[-hw,y0,hd],[-hw,y0+RH,t],[-hw,y0+RH,-t]),mG));
var fin=new T.Mesh(new T.BoxGeometry(W,FH,t*2),mat('fin'));fin.position.y=y0+RH+FH/2;c.add(fin);
// twine
var jm=new T.MeshStandardMaterial({color:0xc6a064,roughness:1}),yf=y0+RH+FH*.52,rad=.011;
function tube(pts,closed,r){var cu=new T.CatmullRomCurve3(pts,closed,'catmullrom',.5);var m=new T.Mesh(new T.TubeGeometry(cu,closed?48:32,r||rad,6,closed),jm);c.add(m)}
tube([[0,yf+.07,.04],[0,yf+.07,-.04],[0,yf-.07,-.04],[0,yf-.07,.04]].map(function(p){return new T.Vector3(p[0],p[1],p[2])}),true);
function loop(sx){var pts=[],n=14;for(var i=0;i<n;i++){var a=i/n*Math.PI*2,x=Math.cos(a)*.1,y=Math.sin(a)*.055,ca=Math.cos(sx*.45),sa=Math.sin(sx*.45);pts.push(new T.Vector3(sx*.11+x*ca-y*sa*sx,yf+.075+x*sa*sx+y*ca,.055))}tube(pts,true,.009)}
loop(1);loop(-1);
tube([[.0,yf+.07,.05],[.05,yf-.02,.07],[.09,yf-.15,.075]].map(function(p){return new T.Vector3(p[0],p[1],p[2])}),false,.009);
tube([[.0,yf+.07,.05],[-.05,yf-.04,.07],[-.1,yf-.2,.07]].map(function(p){return new T.Vector3(p[0],p[1],p[2])}),false,.009);
var knot=new T.Mesh(new T.SphereGeometry(.026,10,8),jm);knot.position.set(0,yf+.07,.052);c.add(knot);
function apply(){P=isDark()?WHITE:BLACK;var set=build();for(var k in M){var key=k==='flat2'||k==='fin'?'flat':k;if(M[k].map)M[k].map.dispose();M[k].map=set[key];M[k].needsUpdate=true}}
apply();
var g=new T.Group();g.add(c);
var scene=new T.Scene();scene.add(g);
var cam=new T.PerspectiveCamera(32,1,.1,50);
scene.add(new T.HemisphereLight(0xffffff,0x8878b8,.95));
var dl=new T.DirectionalLight(0xffffff,1.0);dl.position.set(3,4.5,4);scene.add(dl);
var pl=new T.PointLight(0x6d3fd1,1.1,14);pl.position.set(-3.5,2.5,-2.5);scene.add(pl);
function acc(){try{pl.color.set(getComputedStyle(document.documentElement).getPropertyValue('--acc').trim())}catch(e){}}acc();
new MutationObserver(function(){apply();acc();draw()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
var sc=document.createElement('canvas');sc.width=sc.height=128;var sx=sc.getContext('2d'),gr=sx.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(36,18,88,.42)');gr.addColorStop(1,'rgba(36,18,88,0)');sx.fillStyle=gr;sx.fillRect(0,0,128,128);
var sh=new T.Mesh(new T.PlaneGeometry(3,3),new T.MeshBasicMaterial({map:new T.CanvasTexture(sc),transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=-.9;scene.add(sh);
try{matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){apply();draw()})}catch(e){}
var yaw=0,vy=0,drag=false,lx=0,mx=0,my=0,tx=0,ty=0,vis=true,t0=performance.now();
function size(){var w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;R.setSize(w,h,false);cam.aspect=w/h;
 var v=cam.fov*Math.PI/180,hf=2*Math.atan(Math.tan(v/2)*cam.aspect),f=Math.min(v,hf);cam.position.set(0,.3,1.78/Math.sin(f/2));cam.lookAt(0,-.05,0);cam.updateProjectionMatrix();draw()}
function draw(){var tt=(performance.now()-t0)/1000;if(reduce)tt=0;
 var b=Math.sin(tt*1.3)*.07;g.position.y=b;sh.scale.setScalar(1-b*.5);
 g.rotation.y=-.62+yaw+Math.sin(tt*.5)*.4+mx*.3;g.rotation.x=.2+my*.1+Math.sin(tt*.7)*.03;
 R.render(scene,cam)}
function loop(){if(vis&&!document.hidden){
 if(!drag){yaw+=vy;vy*=.95}
 mx+=(tx-mx)*.06;my+=(ty-my)*.06;st.style.setProperty('--mx',mx.toFixed(3));st.style.setProperty('--my',my.toFixed(3));draw()}
 requestAnimationFrame(loop)}
var cv=R.domElement;
cv.addEventListener('pointerdown',function(ev){drag=true;lx=ev.clientX;vy=0;try{cv.setPointerCapture(ev.pointerId)}catch(e){}});
cv.addEventListener('pointermove',function(ev){if(!drag)return;var d=(ev.clientX-lx)*.012;lx=ev.clientX;yaw+=d;vy=d*.6;if(reduce)draw()});
['pointerup','pointercancel'].forEach(function(n){cv.addEventListener(n,function(){drag=false})});
window.addEventListener('pointermove',function(ev){var r=st.getBoundingClientRect();tx=Math.max(-1,Math.min(1,(ev.clientX-r.left)/r.width*2-1));ty=Math.max(-1,Math.min(1,(ev.clientY-r.top)/r.height*2-1))});
new IntersectionObserver(function(en){vis=en[0].isIntersecting}).observe(st);
new ResizeObserver(size).observe(st);size();
if(!reduce)requestAnimationFrame(loop)}
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(init)}else init();
})();
