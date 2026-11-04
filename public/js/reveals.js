
(function(){var M=window.Motion;if(!M||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var hid=[];
try{
var A=M.animate,I=M.inView,SC=M.scroll;
var spring={type:'spring',stiffness:120,damping:20};
function hide(e){e.style.opacity=0;hid.push(e)}
function show(e,d){A(e,{opacity:[0,1],y:[40,0]},{type:'spring',stiffness:120,damping:20,delay:d||0});setTimeout(function(){e.style.opacity=''},(d||0)*1000+1800)}
document.querySelectorAll('.hero .folio,.hbot .lead,.hbot .cta').forEach(function(e,i){hide(e);show(e,.9+i*.1)});
document.querySelectorAll('.hw').forEach(function(e,i){var t=+(e.getAttribute('data-t')||0);hide(e);
A(e,{opacity:[0,1],y:[90,0],rotate:[t*4,t],scale:[.7,1]},{type:'spring',stiffness:110,damping:12,delay:.15+i*.12});
setTimeout(function(){e.style.opacity=''},2800+i*120);
var o=t<0?-6:6,sp={type:'spring',stiffness:300,damping:10};
e.addEventListener('mouseenter',function(){A(e,{rotate:t+o,scale:1.05},sp)});e.addEventListener('mouseleave',function(){A(e,{rotate:t,scale:1},sp)})});
document.querySelectorAll('.hr').forEach(function(r,i){var d=[70,-100,60,-70,90][i]||0;SC(A(r,{x:[0,d]},{ease:'linear'}),{target:document.querySelector('.hero'),offset:['start start','end start']})});
document.querySelectorAll('.stats .fig').forEach(function(el){var m=el.textContent.match(/^(\d+)(.*)$/);if(!m)return;var n=+m[1],suf=m[2];el.textContent='0'+suf;I(el,function(){A(0,n,{duration:1.6,ease:'easeOut',onUpdate:function(v){el.textContent=Math.round(v)+suf}})})});
document.querySelectorAll('.sh,.sub,.card,.row,.stats>div,.ab>*,.two>div,.contact>:not(.big)').forEach(function(e){hide(e);var k=[].indexOf.call(e.parentNode.children,e);I(e,function(){show(e,Math.min(k,3)*.08)},{margin:'0px 0px -10% 0px'})});
document.querySelectorAll('.btn').forEach(function(b){var s={type:'spring',stiffness:400,damping:18};b.addEventListener('mouseenter',function(){A(b,{scale:1.06},s)});b.addEventListener('mouseleave',function(){A(b,{scale:1},s)})});
SC(A('#bar',{scaleX:[0,1]},{ease:'linear'}));
}catch(err){hid.forEach(function(e){e.style.opacity=''})}
})();
