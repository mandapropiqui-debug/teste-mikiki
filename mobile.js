
var LOGOS={"navy": "logo-navy.png", "white": "logo-white.png"};
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
$$('img[data-logo]').forEach(function(i){i.src=LOGOS[i.dataset.logo]});

/* ---------- gate ---------- */
var key=$('#key'),reader=$('#reader'),led=$('#led'),gate=$('#gate'),opened=false,dy=0,sy=0,drag=false,max=0;
function calc(){max=reader.offsetTop+reader.offsetHeight*0.55-(key.offsetTop+key.offsetHeight)}
calc();window.addEventListener('resize',calc);
function enter(){
  if(opened)return;opened=true;
  key.classList.remove('drag');key.style.transform='translateY('+Math.max(max,40)+'px)';led.classList.add('ok');
  setTimeout(function(){gate.classList.add('open');document.body.classList.remove('locked');window.scrollTo(0,0);start()},520);
  setTimeout(function(){gate.style.display='none'},1700);
}
key.addEventListener('pointerdown',function(e){if(opened)return;drag=true;sy=e.clientY-dy;key.classList.add('drag');key.setPointerCapture(e.pointerId)});
key.addEventListener('pointermove',function(e){if(!drag)return;dy=Math.max(0,Math.min(max+10,e.clientY-sy));key.style.transform='translateY('+dy+'px)'});
function up(){if(!drag)return;drag=false;key.classList.remove('drag');if(dy>max*0.6){enter()}else{dy=0;key.style.transform=''}}
key.addEventListener('pointerup',up);key.addEventListener('pointercancel',up);
key.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();enter()}});
key.addEventListener('click',function(){setTimeout(function(){if(dy<4)enter()},0)});
reader.addEventListener('click',enter);

/* ---------- reveal ---------- */
/* reveal: ver bloco de montagem (v6) no fim */

/* ---------- ribbon ---------- */
var tr=$('#ribbon .tr');if(tr){[].slice.call(tr.children).forEach(function(f){tr.appendChild(f.cloneNode(true))})}

/* ---------- slideshows ---------- */
$$('[data-show]').forEach(function(sh){
  var sl=$$('.sl',sh),dots=$('.dots',sh),i=0,t;
  sl.forEach(function(){dots.appendChild(document.createElement('i'))});
  var ds=$$('i',dots);
  function go(n){i=(n+sl.length)%sl.length;sl.forEach(function(s,k){s.classList.toggle('on',k===i)});ds.forEach(function(d,k){d.classList.toggle('on',k===i)})}
  function play(){clearInterval(t);if(!reduce)t=setInterval(function(){go(i+1)},+sh.dataset.int||4000)}
  sh.addEventListener('click',function(){go(i+1);play()});
  go(0);
  var vis=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)play();else clearInterval(t)})},{threshold:.3});vis.observe(sh);
});

/* ---------- avaliações ---------- */
var rvs=$('#rvs'),cards=$$('.rc',rvs),rd=$('#revdots'),rt,touched=false;
cards.forEach(function(){rd.appendChild(document.createElement('i'))});var rds=$$('i',rd);
function rcur(){var c=rvs.scrollLeft+rvs.clientWidth/2,b=0,bd=1e9;cards.forEach(function(el,k){var d=Math.abs(el.offsetLeft+el.offsetWidth/2-c);if(d<bd){bd=d;b=k}});return b}
function rmark(){var k=rcur();rds.forEach(function(d,j){d.classList.toggle('on',j===k)})}
rvs.addEventListener('scroll',rmark,{passive:true});rmark();
var rvis=true;new IntersectionObserver(function(es){rvis=es[0].isIntersecting},{threshold:.2}).observe(rvs);
function rnext(){if(touched||document.hidden||!rvis)return;var k=(rcur()+1)%cards.length,el=cards[k];rvs.scrollTo({left:el.offsetLeft-(rvs.clientWidth-el.offsetWidth)/2,behavior:'smooth'})}
['touchstart','pointerdown','wheel'].forEach(function(ev){rvs.addEventListener(ev,function(){touched=true;clearTimeout(rt);rt=setTimeout(function(){touched=false},9000)},{passive:true})});
if(!reduce)setInterval(rnext,5200);

/* ---------- datas mais baratas ---------- */
(function(){
var OFF=MK.OFF,SN=MK.SN,D0=MK.D0,DAY=MK.DAY,N=MK.N,days=MK.days;
var WD=I18N.LX('WD',['dom','seg','ter','qua','qui','sex','sáb']),WDL=I18N.LX('WDL',['domingo','segunda','terça','quarta','quinta','sexta','sábado']),MO=I18N.LX('MO',['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']),MOL=I18N.LX('MOL',['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']);
function U(t){return new Date(t)}
function money(v){return v.toLocaleString(window.LOC||'pt-BR',{maximumFractionDigits:0})}
function money0(v){return v.toLocaleString(window.LOC||'pt-BR',{maximumFractionDigits:0})}
function dm(t){var d=U(t);return d.getUTCDate()+' '+MO[d.getUTCMonth()]}
function dd2(t){var d=U(t);return ('0'+d.getUTCDate()).slice(-2)+'/'+('0'+(d.getUTCMonth()+1)).slice(-2)}
function ev(t){var s=new Date(t).toISOString().slice(5,10);
  if(s>='12-24'&&s<='12-29')return 'Natal';if(s>='12-30'||s<='01-04')return 'Réveillon';if(s>='02-04'&&s<='02-09')return 'Carnaval';if(s>='03-25'&&s<='03-28')return 'Páscoa';return ''}
var pkg=MK.pkg;
var first=MK.first();
var nn=2,mon=-1,sel=-1,su=0;
var el={n:document.getElementById('dtn'),s:document.getElementById('dts'),best:document.getElementById('dtbest'),m:document.getElementById('dtm'),mon:document.getElementById('dtmon'),ch:document.getElementById('dtchart'),ax:document.getElementById('dtaxis'),sel:document.getElementById('dtsel')};
if(!el.n)return;
function wa(txt){return 'https://wa.me/5586999426066?text='+encodeURIComponent(I18N.tr(txt))}
function tier(p){return p<=551?'lo':(p>700?'hi':'')}
function unk(i){return (su>0&&pkg(i))||days[i].p==null}            /* pacote de réveillon: valor das outras suítes sob consulta */
function P(i){var b=MK.base(su,i,0);return b===null?0:Math.round(b*MK.DISC)}
function win(i,n){ if(i+n>N)return null;var s=0;for(var k=0;k<n;k++){if(unk(i+k))return null;s+=P(i+k)}return s}
/* expõe o menor preço por suíte para a seção Suítes */
window.__mk={setSuite:function(s){setSuite(s,true)}};
var months=[];function mkMonths(){months.length=0;days.forEach(function(d,i){var dt=U(d.t),k=dt.getUTCFullYear()*12+dt.getUTCMonth();if(!months.length||months[months.length-1].k!==k)months.push({k:k,y:dt.getUTCFullYear(),m:dt.getUTCMonth(),a:i,b:i});months[months.length-1].b=i})}mkMonths();
var gmin=1e9;
function calcMonths(){gmin=1e9;months.forEach(function(M){var mn=1e9;for(var i=Math.max(M.a,first);i<=M.b;i++){if(unk(i))continue;mn=Math.min(mn,P(i))}M.min=mn===1e9?null:mn;if(M.min!==null)gmin=Math.min(gmin,M.min)})}
function bestWin(n){var bi=-1,bs=1e12;for(var i=first;i+n<=N;i++){if(n<days[i].m)continue;var s=win(i,n);if(s===null)continue;if(s<bs){bs=s;bi=i}}return bi<0?null:{i:bi,s:bs}}
function renderBest(){
  var b=bestWin(nn);
  if(!b){el.best.innerHTML='<div class="dtbadge">Datas</div><div class="dtrange">Consulte as datas disponíveis<small>Fale com a nossa central para ver as próximas datas da Suíte '+SN[su]+'.</small></div><a class="btn" href="'+wa('Olá! Vi o biolink e quero saber as próximas datas com melhor preço na Suíte '+SN[su]+' do Mikiki.')+'" target="_blank" rel="noopener"><svg class="ic"><use href="#wa"/></svg>Falar com a central</a>';return}
  var a=days[b.i],out=a.t+nn*DAY;
  var txt='Olá! Vi no biolink as datas mais baratas e quero reservar a Suíte '+SN[su]+I18N.OF+dd2(a.t)+I18N.TO+dd2(out)+' ('+nn+' noites) no Mikiki.';
  el.best.innerHTML='<div class="dtbadge"><i></i>Menor preço · Suíte '+SN[su]+' · '+nn+' noites</div>'
   +'<div class="dtrange">'+dm(a.t)+I18N.TO+dm(out)+'<small>'+WD[U(a.t).getUTCDay()]+I18N.TO+WD[U(out).getUTCDay()]+' · '+nn+' noites</small></div>'
   +'<div class="dtprice"><b>R$ '+money(b.s/nn)+'</b><span>por noite · total R$ '+money(b.s)+'</span></div>'
   +'<button type="button" class="btn" data-pick="'+su+','+b.i+','+nn+'"><svg class="ic"><use href="#cal"/></svg>Quero essas datas</button>';
}
function renderMonths(){
  el.m.innerHTML='';
  months.forEach(function(M,k){
    var b=document.createElement('button');b.type='button';
    b.innerHTML=MO[M.m]+'<small>'+(M.min===null?'–':money0(M.min))+'</small>';
    if(M.min===null)b.disabled=true;
    if(M.min!==null&&M.min===gmin)b.classList.add('low');
    if(k===mon)b.classList.add('on');
    b.addEventListener('click',function(){setMonth(k)});
    el.m.appendChild(b);
  });
}
function renderChart(){
  var M=months[mon],mx=0;for(var i=M.a;i<=M.b;i++)mx=Math.max(mx,P(i));
  el.mon.textContent=MOL[M.m]+' '+M.y;
  el.ch.className='dtchart rv vis';el.ch.innerHTML='';el.ax.innerHTML='';
  var cnt=M.b-M.a+1;
  for(var i=M.a;i<=M.b;i++){
    var d=days[i],b=document.createElement('button');b.type='button';b.className='b '+tier(d.p)+(i<first?' past':'')+(unk(i)?' est':'');b.dataset.i=i;
    b.setAttribute('aria-label',WD[U(d.t).getUTCDay()]+' '+dm(d.t)+(unk(i)?', sob consulta':', R$ '+money(P(i))));
    var bar=document.createElement('i');bar.style.height=Math.max(14,P(i)/mx*100)+'%';b.appendChild(bar);
    bar.style.transitionDelay=(i-M.a)*14+'ms';
    el.ch.appendChild(b);
    var dn=U(d.t).getUTCDate();
    if(dn===1||dn===8||dn===15||dn===22||dn===29){var s=document.createElement('span');s.textContent=dn;s.style.left=((i-M.a+.5)/cnt*100)+'%';el.ax.appendChild(s)}
  }
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.ch.classList.add('go')})});
}
function markSel(){[].slice.call(el.ch.children).forEach(function(b){b.classList.toggle('sel',+b.dataset.i===sel)})}
function renderSel(){
  if(sel<0||!days[sel]){el.sel.innerHTML='';return}
  var d=days[sel],u=U(d.t),n=Math.max(nn,d.m),e=ev(d.t),past=sel<first;
  var out=d.t+n*DAY,t=tier(d.p),lab=t==='lo'?'mais em conta':(t==='hi'?'alta temporada':'intermediário');
  var head=WDL[u.getUTCDay()]+', '+u.getUTCDate()+' de '+MO[u.getUTCMonth()]+(e?'<span class="ev">'+e+'</span>':'');
  if(days[sel].p==null){el.sel.innerHTML='<div class="top"><div class="dd">'+head+'<small>Suíte '+SN[su]+'</small></div><div class="pp"><b style="font-size:19px;padding-top:4px">indisponível</b></div></div><div class="tot">Essa data não está disponível. Escolha outra ou fale com a nossa central.</div>';return}
  if(unk(sel)){
    el.sel.innerHTML='<div class="top"><div class="dd">'+head+'<small>Suíte '+SN[su]+' · pacote de Réveillon</small></div><div class="pp"><b style="font-size:19px;padding-top:4px">sob consulta</b></div></div><div class="tot">Na virada do ano as suítes seguem o pacote do Réveillon. Peça o valor da Suíte '+SN[su]+' pela nossa central.</div>'
     +(past?'':'<a class="btn" href="'+wa('Olá! Quero o valor do pacote de Réveillon na Suíte '+SN[su]+' do Mikiki.')+'" target="_blank" rel="noopener"><svg class="ic"><use href="#wa"/></svg>Pedir valor pelo WhatsApp</a>');return}
  var T=win(sel,n);
  var txt='Olá! Vi no biolink e quero reservar a Suíte '+SN[su]+' de '+dd2(d.t)+I18N.TO+dd2(out)+' ('+n+' noites) no Mikiki.';
  el.sel.innerHTML='<div class="top"><div class="dd">'+head+'<small>'+lab+(d.m>1?' · mínimo de '+d.m+' noites':'')+'</small></div><div class="pp"><b>R$ '+money(P(sel))+'</b><small>por noite</small></div></div>'
   +(T!==null&&!past?'<div class="tot"><b>'+n+' noites</b> · '+dm(d.t)+I18N.TO+dm(out)+' · total <b>R$ '+money(T)+'</b></div>':'<div class="tot">Consulte o valor total com a nossa central.</div>')
   +(past?'':'<button type="button" class="btn" data-pick="'+su+','+sel+','+n+'"><svg class="ic"><use href="#cal"/></svg>Escolher essas datas</button>');
}
function setSel(i){if(i<first&&sel>=0)return;sel=i;markSel();renderSel()}
function cheapestIn(k){var M=months[k],bi=-1,bp=1e9;for(var i=Math.max(M.a,first);i<=M.b;i++){if(unk(i))continue;if(P(i)<bp){bp=P(i);bi=i}}return bi<0?Math.max(M.a,first):bi}
function setMonth(k){mon=k;renderMonths();renderChart();sel=-1;setSel(cheapestIn(k))}
function setSuite(s,scroll){
  su=s;[].slice.call(el.s.children).forEach(function(b,k){b.classList.toggle('on',k===s)});
  calcMonths();renderBest();
  var keep=mon<0?0:mon;if(months[keep]&&months[keep].min===null){for(var k=0;k<months.length;k++){if(months[k].min!==null){keep=k;break}}}
  setMonth(keep);
  if(scroll){var d=document.getElementById('dtn');window.scrollTo({top:d.getBoundingClientRect().top+window.scrollY-110,behavior:'smooth'})}
}
[].slice.call(el.n.children).forEach(function(b){b.addEventListener('click',function(){
  nn=+b.dataset.n;[].slice.call(el.n.children).forEach(function(x){x.classList.toggle('on',x===b)});renderBest();renderSel()})});
[].slice.call(el.s.children).forEach(function(b){b.addEventListener('click',function(){setSuite(+b.dataset.s,false);document.dispatchEvent(new CustomEvent('mksuite',{detail:+b.dataset.s}))})});
function pick(e){
  var r=el.ch.getBoundingClientRect(),M=months[mon],cnt=M.b-M.a+1;
  var k=Math.floor((e.clientX-r.left)/r.width*cnt);k=Math.max(0,Math.min(cnt-1,k));
  var i=M.a+k;if(i!==sel)setSel(i)
}
var dragging=false;
el.ch.addEventListener('pointerdown',function(e){dragging=true;pick(e)});
el.ch.addEventListener('pointermove',function(e){if(dragging)pick(e)});
['pointerup','pointercancel','pointerleave'].forEach(function(ev){el.ch.addEventListener(ev,function(){dragging=false})});
var start=0;
if(first>=N){el.n.style.display='none';el.s.style.display='none';el.m.style.display='none';el.ch.style.display='none';el.sel.style.display='none';calcMonths();renderBest();return}
for(var k=0;k<months.length;k++){if(first>=months[k].a&&first<=months[k].b){start=k;break}}
mon=start;setSuite(0,false);
MK.on(function(){N=MK.N;D0=MK.D0;first=MK.first();mkMonths();calcMonths();renderBest();setMonth(Math.max(0,Math.min(mon,months.length-1)))});
})();

/* ---------- suítes: galerias, variantes, preços ---------- */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var SN=['Encanto','Refúgio','Mikiki'];
var V=[[{pp:'2 pessoas',ar:'14,7 m²',bd:'queen',add:0,nm:'duplo'},{pp:'3 pessoas',ar:'18 m²',bd:'queen + solteiro',add:40.5,nm:'triplo'}],[{pp:'2 pessoas',ar:'14,7 m²',bd:'queen',add:0,nm:'duplo'},{pp:'3 pessoas',ar:'18 m²',bd:'queen + solteiro',add:40.5,nm:'triplo'}],[{pp:'2 pessoas',ar:'14,7 m²',bd:'queen',add:0,nm:'duplo'}]];
var tabs=$$('#tabs button'),panels=$$('.stp'),cur=[0,0,0],reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function money(v){return v.toLocaleString(window.LOC||'pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function money0(v){return v.toLocaleString(window.LOC||'pt-BR',{maximumFractionDigits:0})}
function wa(t){return 'https://wa.me/5586999426066?text='+encodeURIComponent(I18N.tr(t))}
function fillPrice(i){
  var p=panels[i],v=V[i][cur[i]],m=MK.min(i,v.add>0);
  $('.ar',p).textContent=v.ar;$('.pp',p).textContent=v.pp;$('.bd',p).textContent=v.bd;
  
  if(m){$('.pv',p).textContent='R$ '+money0(m);$('.pn',p).innerHTML='Menor valor dos próximos meses, para <b>'+v.pp.replace('pessoas','hóspedes')+'</b>, com café da manhã. Sujeito à disponibilidade, confirmada pelo WhatsApp.'}
  else{$('.pv',p).textContent='Consulte';$('.pn',p).textContent='Peça o valor atualizado pela nossa central.'}
  var c=$('.cmp[data-s="'+i+'"]');if(c&&v.add===0)c.textContent=m?'R$ '+money0(m):'–';
}
function gallery(p){
  var tr=$('.tr',p),figs=$$('figure',tr),cnt=$('.cnt',p),cap=$('.stcap',p),th=$('.stth',p),ths=[];
  figs.forEach(function(f,k){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Foto '+(k+1));var im=document.createElement('img');im.src=$('img',f).src;im.alt='';b.appendChild(im);b.addEventListener('click',function(){go(k)});th.appendChild(b);ths.push(b)});
  function go(k){var f=figs[k];tr.scrollTo({left:f.offsetLeft-(tr.clientWidth-f.offsetWidth)/2,behavior:reduce?'auto':'smooth'})}
  function idx(){var c=tr.scrollLeft+tr.clientWidth/2,b=0,bd=1e9;figs.forEach(function(f,k){var d=Math.abs(f.offsetLeft+f.offsetWidth/2-c);if(d<bd){bd=d;b=k}});return b}
  var last=-1;
  function mark(){var k=idx();if(k===last)return;last=k;cnt.textContent=(k+1)+'/'+figs.length;cap.textContent=figs[k].dataset.c;ths.forEach(function(b,j){b.classList.toggle('on',j===k)});var t=ths[k];th.scrollTo({left:t.offsetLeft-(th.clientWidth-t.offsetWidth)/2,behavior:'auto'})}
  tr.addEventListener('scroll',mark,{passive:true});mark();
  p._mark=function(){last=-1;mark()};
}
panels.forEach(function(p,i){
  gallery(p);
  $$('.stvar button',p).forEach(function(b){b.addEventListener('click',function(){cur[i]=+b.dataset.v;$$('.stvar button',p).forEach(function(x){x.classList.toggle('on',x===b)});fillPrice(i)})});
  var rs=$('.rsv',p);if(rs)rs.addEventListener('click',function(e){e.preventDefault();if(window.__bk)window.__bk.pickSuite(i,cur[i])});
  var s=$('.seed',p);if(s)s.addEventListener('click',function(e){e.preventDefault();if(window.__mk)window.__mk.setSuite(i)});
  fillPrice(i);
});
function show(i){
  tabs.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});
  panels.forEach(function(p,k){p.classList.toggle('on',k===i)});
  if(panels[i]._mark)panels[i]._mark();
}
tabs.forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.s)})});
document.addEventListener('mksuite',function(){ });
MK.on(function(){panels.forEach(function(p,i){fillPrice(i)})});
show(0);
})();

/* ---------- nav, mascote, CTA ---------- */
var nav=$('#nav'),links=$$('#nav a'),secs=$$('[data-msg]'),mascot=$('#mascot'),m=$('#m'),bub=$('#bubble'),cta=$('#cta'),cur='',hideT,walkT,ctaT,started=false,lastY=0;
function setNav(t){links.forEach(function(a){a.classList.toggle('on',a.dataset.t===t)})}
var mW=0,bW=0;
function size(){mW=mascot.offsetWidth}
function place(){
  var x=parseFloat(m.dataset.x)||0,w=bW||160,left=Math.max(12,Math.min(mW-w-12,x-w/2+25))-x;
  bub.style.left=left+'px';
}
function say(msg){
  size();bub.style.maxWidth=Math.min(186,mW-24)+'px';bub.textContent=msg;bW=bub.offsetWidth||160;place();bub.classList.add('show');
  clearTimeout(hideT);hideT=setTimeout(function(){bub.classList.remove('show')},3600);
}
var so=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting||document.body.classList.contains('locked'))return;
  var id=e.target.id;if(id===cur)return;cur=id;setNav(e.target.dataset.nav||id);say(e.target.dataset.msg);
})},{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(function(s){so.observe(s)});
var po=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('paused',!e.isIntersecting)})},{rootMargin:'120px 0px'});
$$('section').forEach(function(s){po.observe(s)});
m.addEventListener('click',function(){var i=secs.indexOf($('#'+cur));var n=secs[(i+1)%secs.length];window.scrollTo({top:n.getBoundingClientRect().top+window.scrollY-70,behavior:'smooth'})});
var tick=false,ctaOn=false;
function move(){
  var y=window.scrollY,S=56,span=mW+S*2;
  var x=((y*0.55)%span+span)%span-S;
  m.style.transform='translate3d('+x+'px,0,0)';m.dataset.x=x;place();
  var fl=y<lastY;if(fl!==flipped){m.classList.toggle('flip',fl);flipped=fl}
  if(!walking){m.classList.remove('idle');m.classList.add('walk');walking=true}lastY=y;
  clearTimeout(walkT);walkT=setTimeout(function(){m.classList.remove('walk');m.classList.add('idle');walking=false},220);
}
var flipped=false,walking=false;
window.addEventListener('scroll',function(){
  if(!started)return;
  if(!tick){tick=true;requestAnimationFrame(function(){tick=false;move()})}
  if(cta.classList.contains('show'))cta.classList.remove('show');
  clearTimeout(ctaT);ctaT=setTimeout(function(){cta.classList.add('show')},650);
},{passive:true});
window.addEventListener('resize',size);
function start(){started=true;size();nav.classList.add('show');mascot.classList.add('show');m.style.transform='translate3d(20px,0,0)';m.dataset.x=20;setTimeout(function(){cta.classList.add('show')},1200);setTimeout(function(){say(secs[0].dataset.msg)},900)}

function go(t,off){window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-off,behavior:reduce?'auto':'smooth'})}
links.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var t=$(a.getAttribute('href'));if(t)go(t,t.id==='inicio'?0:6)})});
$$('a[href="#reveillon"]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();go($('#reveillon'),6)})});
$$('.wrap a[href="#datas"]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();go($('#datas'),6)})});
})();

;

/* ===== reservar + carrinho (tudo fecha no WhatsApp) ===== */
(function(){
var d=document,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var WA='5586999426066',DAY=MK.DAY,SN=MK.SN;
var WD=I18N.LX('WD',['dom','seg','ter','qua','qui','sex','sáb']),WDL=I18N.LX('WDL',['domingo','segunda','terça','quarta','quinta','sexta','sábado']),MO=I18N.LX('MO',['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']),MOL=I18N.LX('MOL',['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']);
var VN=['Suíte Luxo','Suíte Super Luxo','Suíte Premium'];
var B={s:0,g:2,i:-1,o:-1,arr:'',m:0};      /* reserva em montagem */
var C={items:[],name:'',obs:''};            /* extras no carrinho */
var months=[];
function money0(v){return v.toLocaleString(window.LOC||'pt-BR',{maximumFractionDigits:0})}
function U(t){return new Date(t)}
function dm(t){var x=U(t);return x.getUTCDate()+' '+MO[x.getUTCMonth()]}
function dd2(t){var x=U(t);return ('0'+x.getUTCDate()).slice(-2)+'/'+('0'+(x.getUTCMonth()+1)).slice(-2)}
function wdd(t){return WD[U(t).getUTCDay()]+', '+dd2(t)}
function iso(t){return U(t).toISOString().slice(0,10)}
function fromIso(s){var a=(s||'').split('-');return a.length===3?Date.UTC(+a[0],+a[1]-1,+a[2]):null}
function T(i){return MK.D0+i*DAY}
function cap(){return B.s===2?2:3}
function minStay(i){var x=MK.days[i];return Math.max(1,x?x.m:1)}
function lim(i){var j=i;while(j<MK.N&&MK.days[j].p!=null&&j-i<30)j++;return j}
function go(t,off){window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-(off==null?6:off),behavior:'smooth'})}

var E={s:$('#bks'),bin:$('#bkin'),bout:$('#bkout'),mon:$('#bkmon'),prev:$('#bkprev'),next:$('#bknext'),grid:$('#bkgrid'),hint:$('#bkhint'),gm:$('#gm'),gp:$('#gp'),gn:$('#gn'),arr:$('#bkarr'),sum:$('#bksum'),cbtn:$('#cartbtn'),sheet:$('#sheet'),body:$('#shbody'),ft:$('#shft'),toast:$('#toast')};
if(!E.grid)return;

function mkMonths(){
  months=[];var a=new Date(MK.D0),y=a.getUTCFullYear(),m=a.getUTCMonth(),end=new Date(MK.D0+MK.N*DAY);
  while(y<end.getUTCFullYear()||(y===end.getUTCFullYear()&&m<=end.getUTCMonth())){months.push({y:y,m:m});m++;if(m>11){m=0;y++}}
}
function monthOf(i){var x=U(T(i));for(var k=0;k<months.length;k++){if(months[k].y===x.getUTCFullYear()&&months[k].m===x.getUTCMonth())return k}return 0}
function stay(){
  if(B.i<0||B.o<0||B.o<=B.i)return null;
  var tri=B.g>=3,n=B.o-B.i,sum=0,unk=0;
  for(var i=B.i;i<B.o;i++){var v=MK.night(B.s,i,tri);if(v===null)unk++;else sum+=v}
  return {n:n,sum:sum,unk:unk,tri:tri,avg:unk<n?sum/(n-unk):null};
}

/* ---------- calendário ---------- */
function renderCal(){
  var first=MK.first(),M=months[B.m];if(!M)return;
  E.mon.textContent=MOL[M.m]+' '+M.y;
  E.prev.disabled=B.m<=monthOf(first);E.next.disabled=B.m>=months.length-1;
  var fd=new Date(Date.UTC(M.y,M.m,1)).getUTCDay(),dim=new Date(Date.UTC(M.y,M.m+1,0)).getUTCDate(),h='',tri=B.g>=3;
  var pick=B.i>=0&&B.o<0,ms=pick?minStay(B.i):1,lm=pick?lim(B.i):0;
  for(var k=0;k<fd;k++)h+='<span></span>';
  for(var day=1;day<=dim;day++){
    var t=Date.UTC(M.y,M.m,day),i=Math.round((t-MK.D0)/DAY),cls='bkd',ok=true,lab='',price=null;
    if(i<first||i<0||i>MK.N){ok=false}
    else if(pick&&i>B.i){ok=(i>=B.i+ms&&i<=lm)}
    else{ok=i<MK.N&&MK.days[i].p!=null}
    if(i>=0&&i<MK.N){
      price=MK.night(B.s,i,tri);
      if(price!==null)lab=money0(price);else lab=MK.days[i].p==null?'–':'pacote';
      if(price!==null&&MK.days[i].p<=551)cls+=' lo';
    }
    if(!ok)cls+=' off';
    if(i===B.i)cls+=' st';else if(i===B.o)cls+=' en';else if(B.i>=0&&B.o>=0&&i>B.i&&i<B.o)cls+=' mid';
    if(i===first)cls+=' tod';
    h+='<button type="button" class="'+cls+'" data-i="'+i+'"'+(ok?'':' disabled')+' aria-label="'+WDL[U(t).getUTCDay()]+', '+day+' de '+MOL[M.m]+(price!==null?', R$ '+price:'')+'">'+day+'<small>'+lab+'</small></button>';
  }
  E.grid.innerHTML=h;
  var s=stay();
  E.hint.textContent=B.i<0?'Toque na data de entrada':(B.o<0?(ms>1?'Agora a saída (mínimo de '+ms+' noites nessa data)':'Agora toque na data de saída'):(s?s.n+(s.n>1?' noites':' noite')+' · toque em outra data para mudar':''));
}
function clickDay(i){
  var first=MK.first();if(i<first||i>MK.N)return;
  if(B.i<0||B.o>=0){B.i=i;B.o=-1}
  else if(i<=B.i){B.i=i;B.o=-1}
  else{
    if(i<B.i+minStay(B.i)){hint('Nessa data o mínimo é de '+minStay(B.i)+' noites');return}
    if(i>lim(B.i)){hint('Essa saída passa de uma data sem disponibilidade');return}
    B.o=i;
  }
  render();
  if(stay())toast('Estadia no carrinho');
}
var hT;function hint(t){E.hint.textContent=t;clearTimeout(hT);hT=setTimeout(renderCal,2400)}

/* ---------- campos ---------- */
function renderFields(){
  var a=B.i>=0,b=B.o>=0;
  E.bin.innerHTML='<small>Entrada</small><b'+(a?'':' class="ph"')+'>'+(a?wdd(T(B.i)):'Escolha no calendário')+'</b>';
  E.bout.innerHTML='<small>Saída</small><b'+(b?'':' class="ph"')+'>'+(b?wdd(T(B.o)):(a?'Agora a saída':'—'))+'</b>';
  E.bin.classList.toggle('act',!a||b);E.bout.classList.toggle('act',a&&!b);
  E.gn.textContent=B.g;E.gm.disabled=B.g<=1;E.gp.disabled=B.g>=cap();
  $$('button',E.s).forEach(function(x){x.classList.toggle('on',+x.dataset.s===B.s)});
}

/* ---------- resumo ---------- */
function totals(){
  var s=stay(),t=0,pend=false;
  if(s){t+=s.sum;if(s.unk)pend=true}
  C.items.forEach(function(it){if(it.price==null)pend=true;else t+=it.price*it.q});
  return {t:t,pend:pend};
}
function suiteLine(){return 'Suíte '+SN[B.s]+(B.g>=3?' (triplo)':' (duplo)')}
function renderSum(){
  var s=stay();
  if(!s){
    E.sum.innerHTML='<div class="mu">Escolha a entrada e a saída no calendário. O valor da diária aparece em cada dia e o total é calculado aqui.</div>'
      +(cartCount()?'<button type="button" class="btn" data-open><svg class="ic"><use href="#bag"/></svg>Ver carrinho e enviar</button>':'')
      +'<button type="button" class="btn ghost" data-go="mimos"><svg class="ic"><use href="#heart"/></svg>Ver mimos e experiências</button>';
    return;
  }
  var h='<div class="l1"><span>'+suiteLine()+'</span><b style="font-weight:400">'+s.n+(s.n>1?' noites':' noite')+'</b></div>'
   +'<div class="l1"><span>'+wdd(T(B.i))+I18N.TO+wdd(T(B.o))+'</span><span></span></div>';
  if(s.avg!==null)h+='<div class="l1"><span>R$ '+money0(s.avg)+' por noite'+(s.unk?' (parte da estadia)':'')+'</span><span></span></div>';
  h+='<div class="tt"><span>Hospedagem</span><b>'+(s.avg!==null?'R$ '+money0(s.sum):'sob consulta')+'</b></div>';
  if(s.unk)h+='<div class="pd">'+(s.unk===s.n?'Nessas datas a suíte segue o pacote do Réveillon.':'Em '+s.unk+(s.unk>1?' noites':' noite')+' a suíte segue o pacote do Réveillon.')+' O valor entra como a confirmar na mensagem.</div>';
  else h+='<div class="pd">Valores por noite, com café da manhã. Sujeito à disponibilidade, confirmada pelo WhatsApp.</div>';
  h+='<button type="button" class="btn" data-open><svg class="ic"><use href="#bag"/></svg>Ver carrinho e enviar</button>'
   +'<button type="button" class="btn ghost" data-go="mimos"><svg class="ic"><use href="#heart"/></svg>Adicionar mimos e experiências</button>';
  E.sum.innerHTML=h;
}

/* ---------- carrinho ---------- */
function cartCount(){return (stay()?1:0)+C.items.length}
function renderBtn(){
  var n=cartCount(),b=E.cbtn;
  if(!n){b.className='btn';b.innerHTML='<svg class="ic"><use href="#cal"/></svg>Montar minha reserva';return}
  var t=totals();
  b.className='btn has';
  b.innerHTML='<svg class="ic"><use href="#bag"/></svg>Carrinho <span class="nb">'+n+'</span>'+(t.t>0?'<b>R$ '+money0(t.t)+'</b>':'<span>a confirmar</span>');
}
function bump(){E.cbtn.classList.remove('bump');void E.cbtn.offsetWidth;E.cbtn.classList.add('bump')}
var tT;function toast(t){E.toast.textContent=t;E.toast.classList.add('show');clearTimeout(tT);tT=setTimeout(function(){E.toast.classList.remove('show')},1900)}
function setAddState(btn,on){
  btn.classList.toggle('on',on);
  var u=$('use',btn);if(u)u.setAttribute('href',on?'#check':'#plus');
  var l=$('.lbl',btn);if(l)l.textContent=on?'No carrinho · ver':l.dataset.t;
}
function syncAdds(){
  $$('[data-add]').forEach(function(b){
    var on=C.items.some(function(i){return i.id===b.dataset.id});
    setAddState(b,on);
  });
}
function addItem(b){
  var id=b.dataset.id;
  if(C.items.some(function(i){return i.id===id})){openSheet();return}
  var pr=b.dataset.price;
  var it={id:id,name:b.dataset.name,price:pr===''||pr==null?null:+pr,q:1,unit:b.dataset.unit||'',note:b.dataset.note||'',date:b.dataset.nodate?null:'' };
  if(it.date!==null&&B.i>=0)it.date=iso(T(B.i));
  C.items.push(it);
  syncAdds();renderBtn();renderSum();bump();toast(it.name+' no carrinho');
  if($('#sheet.open'))renderSheet();
}
function today(){var n=new Date();return iso(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()))}
function fmtIso(s){var t=fromIso(s);return t==null?'':wdd(t)}
function lineTxt(it){
  var tx='• '+it.name;
  if(it.date)tx+=' · dia '+dd2(fromIso(it.date));
  if(it.unit==='pessoa')tx+=' · '+it.q+(it.q>1?' pessoas':' pessoa');else if(it.q>1)tx+=' · '+it.q+' un.';
  if(it.price!=null){tx+=' · R$ '+money0(it.price*it.q);if(it.unit==='pessoa'&&it.q>1)tx+=' ('+it.q+' × R$ '+money0(it.price)+')'}
  else tx+=' · valor a confirmar';
  if(it.note)tx+=' · '+it.note;
  return tx;
}
function message(){
  var L=['Oi, pessoal do Mikiki! 🌴','Vim pelo link da bio e quero montar a minha estadia:',''],s=stay();
  if(s){
    L.push('*SUÍTE*');
    L.push(suiteLine()+' · '+B.g+(B.g>1?' hóspedes':' hóspede'));
    L.push('Entrada: '+wdd(T(B.i)));
    L.push('Saída: '+wdd(T(B.o))+' ('+s.n+(s.n>1?' noites':' noite')+')');
    if(B.arr)L.push('Horário de chegada: '+B.arr);
    L.push(s.avg!==null?'Hospedagem: R$ '+money0(s.sum)+(s.n>1?' (média de R$ '+money0(s.avg)+' por noite)':''):'Hospedagem: valor a confirmar (Réveillon)');
    if(s.unk&&s.avg!==null)L.push('(parte das noites no pacote do Réveillon, a confirmar)');
    L.push('');
  }
  if(C.items.length){
    L.push('*EXTRAS*');
    C.items.forEach(function(it){L.push(lineTxt(it))});
    L.push('');
  }
  var t=totals();
  L.push('*TOTAL: '+(t.t>0?'R$ '+money0(t.t):'a confirmar')+'*'+(t.t>0&&t.pend?' (+ itens a confirmar)':''));
  if(C.name){L.push('');L.push('Meu nome: '+C.name)}
  if(C.obs){L.push('Obs: '+C.obs)}
  L.push('');L.push('Dá pra confirmar a disponibilidade? Obrigado(a)! 😊');
  return I18N.trMsg(L);
}
function waHref(){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(message())}

function renderSheet(){
  var s=stay(),h='',n=cartCount(),t=totals();
  if(B.i>=0&&B.o<0)h+='<div class="shwarn">Você escolheu a entrada ('+wdd(T(B.i))+'), mas falta a saída. <button type="button" data-edit>Escolher a saída</button></div>';
  if(s){
    h+='<div class="ci"><div class="cih"><b>'+suiteLine()+'</b><button type="button" data-edit>Editar</button></div>'
     +'<p>'+B.g+(B.g>1?' hóspedes':' hóspede')+' · '+wdd(T(B.i))+I18N.TO+wdd(T(B.o))+' · '+s.n+(s.n>1?' noites':' noite')+'</p>'
     +'<p>'+(B.arr?'Chegada: '+B.arr:'Horário de chegada: não informado')+'</p>'
     +'<div class="cip"><span>'+(s.avg!==null?'R$ '+money0(s.avg)+' por noite':'Réveillon: a confirmar')+'</span><b>'+(s.avg!==null?'R$ '+money0(s.sum):'a confirmar')+'</b></div></div>';
  }
  C.items.forEach(function(it,k){
    var sub=it.price!=null?'R$ '+money0(it.price*it.q):'a confirmar';
    h+='<div class="ci" data-k="'+k+'"><div class="cih"><b>'+it.name+'</b><button type="button" class="rm" data-rm="'+k+'" aria-label="Remover '+it.name+'"><svg class="ic"><use href="#x"/></svg></button></div>';
    if(it.note)h+='<p>'+it.note+'</p>';
    h+='<div class="cir">';
    if(it.date!==null)h+='<label>Dia<input type="date" data-d="'+k+'" min="'+today()+'" value="'+it.date+'"></label>';
    h+='<div class="qs"><button type="button" data-q="'+k+'" data-v="-1" aria-label="Menos"><svg class="ic"><use href="#minus"/></svg></button><b>'+it.q+'</b><button type="button" data-q="'+k+'" data-v="1" aria-label="Mais"><svg class="ic"><use href="#plus"/></svg></button><small>'+(it.unit==='pessoa'?'pessoas':'un.')+'</small></div></div>';
    h+='<div class="cip"><span>'+(it.price!=null?'R$ '+money0(it.price)+(it.unit==='pessoa'?' por pessoa':''):'sob consulta')+'</span><b>'+sub+'</b></div></div>';
  });
  if(!n){
    h='<div class="shempty"><svg class="ic"><use href="#bag"/></svg><br>Seu carrinho está vazio.<br>Escolha uma suíte e as datas, ou adicione um mimo, o Day Use ou o Wellness.<button type="button" class="btn" data-edit><svg class="ic"><use href="#cal"/></svg>Escolher datas</button></div>';
  }else{
    h+='<label class="shf">Seu nome<input type="text" id="cname" autocomplete="name" placeholder="Como podemos te chamar?" value="'+(C.name||'').replace(/"/g,'&quot;')+'"></label>'
     +'<label class="shf">Alguma observação?<textarea id="cobs" rows="2" placeholder="Aniversário, lua de mel, restrição alimentar…">'+(C.obs||'').replace(/</g,'&lt;')+'</textarea></label>';
  }
  E.body.innerHTML=h;
  var f='';
  if(n){
    f='<div class="tt"><span>Total'+(t.pend?' (sem os itens a confirmar)':'')+'</span><b>'+(t.t>0?'R$ '+money0(t.t):'a confirmar')+'</b></div>'
     +'<div class="pd">Você não paga nada agora. A nossa central confirma a disponibilidade e combina o pagamento com você pelo WhatsApp.</div>'
     +'<a class="btn" id="send" href="'+waHref()+'" target="_blank" rel="noopener"><svg class="ic"><use href="#wa"/></svg>Enviar no WhatsApp</a>';
  }
  E.ft.innerHTML=f;
}
function refreshSend(){var a=$('#send');if(a)a.href=waHref()}
function openSheet(){
  renderSheet();E.sheet.classList.add('open');d.body.classList.add('sheetopen');
  requestAnimationFrame(function(){requestAnimationFrame(function(){E.sheet.classList.add('in')})});
  E.sheet.setAttribute('aria-hidden','false');
}
function closeSheet(){
  E.sheet.classList.remove('in');E.sheet.setAttribute('aria-hidden','true');
  setTimeout(function(){E.sheet.classList.remove('open');d.body.classList.remove('sheetopen')},380);
}
E.sheet.addEventListener('click',function(e){
  var t=e.target.closest('button,[data-close]');if(!t&&!e.target.classList.contains('shbg'))return;
  if(e.target.classList.contains('shbg')||(t&&t.hasAttribute('data-close'))){closeSheet();return}
  if(!t)return;
  if(t.hasAttribute('data-edit')){closeSheet();setTimeout(function(){go($('#reservar'),6)},300);return}
  if(t.dataset.rm!=null){C.items.splice(+t.dataset.rm,1);after();renderSheet();return}
  if(t.dataset.q!=null){var it=C.items[+t.dataset.q];it.q=Math.max(1,Math.min(20,it.q+(+t.dataset.v)));after();renderSheet();return}
});
E.sheet.addEventListener('input',function(e){
  var t=e.target;
  if(t.id==='cname'){C.name=t.value.trim();refreshSend()}
  else if(t.id==='cobs'){C.obs=t.value.trim();refreshSend()}
});
E.sheet.addEventListener('change',function(e){
  var t=e.target;if(t.dataset.d!=null){C.items[+t.dataset.d].date=t.value;refreshSend()}
});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&E.sheet.classList.contains('open'))closeSheet()});
function after(){syncAdds();renderBtn();renderSum();if(E.sheet.classList.contains('open')){/* sheet re-render by caller */}}

/* ---------- eventos da página ---------- */
E.cbtn.addEventListener('click',function(){if(cartCount())openSheet();else go($('#reservar'),6)});
d.addEventListener('click',function(e){
  var a=e.target.closest('[data-add]');if(a){e.preventDefault();addItem(a);return}
  var p=e.target.closest('[data-pick]');if(p){var x=p.dataset.pick.split(',').map(Number);api.pick(x[0],x[1],x[2]);return}
  var o=e.target.closest('[data-open]');if(o){openSheet();return}
  var g=e.target.closest('[data-go]');if(g){var t=$('#'+g.dataset.go);if(t)go(t,6);return}
});
E.s.addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  B.s=+b.dataset.s;if(B.g>cap())B.g=cap();
  if(B.o>=0&&B.o>lim(B.i))B.o=-1;
  render();
});
E.grid.addEventListener('click',function(e){var b=e.target.closest('.bkd');if(b&&!b.disabled)clickDay(+b.dataset.i)});
E.prev.addEventListener('click',function(){if(B.m>0){B.m--;renderCal()}});
E.next.addEventListener('click',function(){if(B.m<months.length-1){B.m++;renderCal()}});
E.gm.addEventListener('click',function(){if(B.g>1){B.g--;render()}});
E.gp.addEventListener('click',function(){if(B.g<cap()){B.g++;render()}});
E.arr.addEventListener('change',function(){B.arr=E.arr.value;if($('#send'))refreshSend()});
(function(){
  var h='<option value="">Escolher</option>';
  for(var k=6;k<=23;k++)h+='<option value="por volta das '+k+'h">por volta das '+k+'h</option>';
  h+='<option value="de madrugada">de madrugada</option><option value="ainda não sei">ainda não sei</option>';
  E.arr.innerHTML=h;
})();

function render(){
  var first=MK.first();
  if(B.i>=0&&B.i<first){B.i=-1;B.o=-1}
  renderFields();renderCal();renderSum();renderBtn();syncAdds();
  if(E.sheet.classList.contains('open'))renderSheet();
}
/* ---------- API para Suítes e Datas ---------- */
var api=window.__bk={
  pick:function(s,i,n){
    B.s=s;if(B.g>cap())B.g=cap();B.i=i;B.o=Math.min(MK.N,i+Math.max(n,minStay(i)));B.m=monthOf(i);
    render();toast('Estadia no carrinho');
    setTimeout(function(){go($('#reservar'),6)},60);
  },
  pickSuite:function(s,v){
    B.s=s;B.g=v===1?Math.min(3,cap()):Math.min(B.g,2);if(B.o>=0&&B.o>lim(B.i))B.o=-1;
    render();setTimeout(function(){go($('#reservar'),6)},60);
  }
};
mkMonths();B.m=monthOf(MK.first());render();
MK.on(function(){mkMonths();B.m=Math.min(B.m,months.length-1);render()});
})();

;

/* ===== v6: montagem por scroll ===== */
(function(){
var d=document,body=d.body;
var $=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function allVis(){$$('.rv,.kb,.a,.wd').forEach(function(e){e.classList.add('vis')})}
if(reduce){allVis();return}
try{
body.classList.add('setup');
var ready=!body.classList.contains('locked'),held=[];

/* ---------- motor: observa e dispara ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  var el=e.target;
  if(!e.isIntersecting){el._held=0;return}
  if(!ready){el._held=1;held.push(el);return}
  io.unobserve(el);fire(el);
})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
function fire(el){if(el._fired)return;el._fired=1;if(el._fn)el._fn()}
function reg(el,fn){var p=el._fn;el._fn=p?function(){p();fn()}:fn;if(!el._reg){el._reg=1;io.observe(el)}}
function release(){
  if(ready)return;ready=true;
  setTimeout(function(){held.forEach(function(el){if(el._held){io.unobserve(el);fire(el)}});held=[]},420);
}
if(!ready){var mo=new MutationObserver(function(){if(!body.classList.contains('locked')){mo.disconnect();release()}});mo.observe(body,{attributes:true,attributeFilter:['class']})}

/* ---------- utilidades ---------- */
function show(el,delay){
  if(el._v)return;el._v=1;el.classList.add('vis');
  if(el.classList.contains('a')){
    var t=(delay!=null?delay:(parseFloat(el.style.getPropertyValue('--d'))||0))+1500;
    setTimeout(function(){if(el._keep)return;el.classList.remove('a');if(!el.classList.contains('kb'))el.classList.remove('vis');el.removeAttribute('data-a');el.style.removeProperty('--d')},t);
  }
}
function A(el,v,delay){
  if(!el)return el;
  el.classList.remove('rv');el.classList.add('a');
  if(v&&v!=='up')el.setAttribute('data-a',v);
  el.style.setProperty('--d',(delay||0)+'ms');el._v=0;return el;
}
function G(cSel,kSel,v,step,base,ic){
  $$(cSel).forEach(function(c){
    var kids=$$(kSel,c);if(!kids.length)return;
    c.classList.remove('rv');
    kids.forEach(function(k,i){
      var dl=(base||0)+i*step;
      A(k,Array.isArray(v)?v[i%v.length]:v,dl);
      if(ic){var g=$('.ic',k);if(g&&g!==k)A(g,'pop',dl+260)}
    });
    reg(c,function(){kids.forEach(function(k){show(k);var g=$('.ic',k);if(ic&&g&&g.classList.contains('a'))show(g)})});
  });
}
function S(sel,v,delay,root){
  $$(sel,root).forEach(function(el){
    if(el._reg)return;
    A(el,v,delay);reg(el,function(){show(el)});
  });
}

/* ---------- títulos palavra por palavra ---------- */
function split(h){
  if(h.classList.contains('wd'))return;
  h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());
  var n=0;
  (function walk(node){
    [].slice.call(node.childNodes).forEach(function(c){
      if(c.nodeType===3){
        var fr=d.createDocumentFragment();
        c.nodeValue.split(/(\s+)/).forEach(function(t){
          if(!t)return;
          if(/^\s+$/.test(t)){fr.appendChild(d.createTextNode(' '));return}
          var w=d.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
          var wi=d.createElement('span');wi.className='wi';wi.style.setProperty('--i',n++);wi.textContent=t;
          w.appendChild(wi);fr.appendChild(w);
        });
        node.replaceChild(fr,c);
      }else if(c.nodeType===1&&c.tagName!=='BR'){walk(c)}
    });
  })(h);
  h.classList.remove('rv');h.classList.add('wd');
}
var heads=$$('.wrap h1,.wrap h2,.wrap h3').filter(function(h){return !h.closest('.slides')});
heads.forEach(split);
heads.forEach(function(h){
  var dl=h.closest('.hero')?120:0;
  if(dl)h.style.setProperty('--d',dl+'ms');
  reg(h,function(){h.classList.add('vis')});
});

/* ---------- contadores ---------- */
function count(el,delay){
  if(el._cd||el.children.length)return;
  var t=el.textContent.trim(),m=t.match(/^(\D*?)([\d.]*\d(?:,\d+)?)(\D*)$/);if(!m)return;
  var dec=(m[2].split(',')[1]||'').length,v=parseFloat(m[2].replace(/\./g,'').replace(',','.'));
  if(!isFinite(v)||v<=0)return;
  el._cd=1;el.style.minWidth=el.offsetWidth+'px';el.style.fontVariantNumeric='tabular-nums';
  var fmt=function(x){return m[1]+x.toLocaleString(window.LOC||'pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec})+m[3]};
  el.textContent=fmt(0);
  setTimeout(function(){
    var t0=performance.now(),dur=1200;
    (function step(now){
      var p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,4);
      if(p<1){el.textContent=fmt(v*e);requestAnimationFrame(step)}
      else{el.textContent=t;el.style.minWidth='';el.style.fontVariantNumeric='';el._cd=0}
    })(t0);
  },delay||0);
}
function C(sel,delay){$$(sel).forEach(function(el){
  var t=el.textContent.trim();if(!/\d/.test(t)||el.children.length)return;
  reg(el,function(){count(el,delay)});
})}

/* ---------- HERO (entra depois da chave) ---------- */
S('.hero .palms','pop',100);
G('.hero .tags','.tag','pop',70,200);
S('.heroph','zoom',260);
S('.heroph .wl','fade',560);
G('.hero .rows','.row','left',90,420,true);
S('.hero > div:last-child','up',700);
S('#ribbon','fade',760);

/* ---------- varia por tipo ---------- */
G('.chipset','span','pop',65,0);
G('.dtleg','span','fade',90,0);
G('#dtn','button','zoom',70,0);
G('#dts','button','zoom',85,0);
G('#bks','button','zoom',85,0);
G('.tabs','button','zoom',90,0);
$$('.pk').forEach(function(p){p.parentNode._pk=1});
$$('.pk').map(function(p){return p.parentNode}).filter(function(c,i,a){return a.indexOf(c)===i}).forEach(function(c,i){
  var id='pkg'+i;c.id=c.id||id;G('#'+c.id,'.pk','left',120,0,true);
});
G('.mimos','.row','left',90,0,true);
G('.strip','figure','slab',110,0);
G('.chk','li','left',100,0,true);
G('.steps','.row','left',150,0,true);
G('.soc','a','pop',90,0);
G('#rvs','.rc','zoom',120,0);
G('.photoduo','figure',['tilt','tiltr'],160,0);
G('.mascotbox','img, p',['pop','up'],200,0);

/* ---------- Suítes: painéis (montam de novo a cada aba) ---------- */
$$('.stp').forEach(function(p){
  var items=[];
  [].slice.call(p.children).forEach(function(c,i){
    var v='up';
    if(c.classList.contains('stg'))v='zoom';
    else if(c.classList.contains('stpr'))v='zoom';
    else if(c.classList.contains('stcat'))v='left';
    var word=c.classList.contains('wd');
    items.push({el:c,v:v,d:i*55,word:word});
    if(!word){A(c,v,0);}
    reg(c,function(){if(word)c.classList.add('vis');else show(c)});
  });
  var inner=[['.sthl','div','left',70],['.stck','span','fade',32],['.stspec','div','pop',90]];
  inner.forEach(function(g,gi){
    var c=$(g[0],p);if(!c)return;
    var kids=$$(g[1],c);
    kids.forEach(function(k,j){A(k,g[2],j*g[3]);items.push({el:k,v:g[2],d:260+gi*60+j*g[3]})});
    reg(c,function(){kids.forEach(function(k){show(k)})});
  });
  p._items=items;
  var pv=$('.pv',p);if(pv)reg($('.stpr',p),function(){count(pv,200)});
  p._pv=pv;
});
function replay(p){
  if(!p||!p._items)return;
  p._items.forEach(function(it){
    var el=it.el;el._v=1;el._keep=0;el.classList.remove('vis');
    if(it.word){el.style.setProperty('--d',it.d+'ms')}
    else{el.classList.add('a');if(it.v!=='up')el.setAttribute('data-a',it.v);else el.removeAttribute('data-a');el.style.setProperty('--d',it.d+'ms')}
  });
  void p.offsetWidth;
  p._items.forEach(function(it){
    var el=it.el;el.classList.add('vis');
    if(!it.word){(function(el,dl){setTimeout(function(){el.classList.remove('a','vis');el.removeAttribute('data-a');el.style.removeProperty('--d')},dl+1500)})(el,it.d)}
  });
  if(p._pv)count(p._pv,350);
}
$$('#tabs button').forEach(function(b){b.addEventListener('click',function(){
  var p=$('.stp[data-s="'+b.dataset.s+'"]');
  /* espera o painel ficar visível (a troca de aba ocorre no clique do outro script) */
  requestAnimationFrame(function(){replay(p)});
})});

/* ---------- avulsos (.rv e afins) ---------- */
var MAP=[['.kick','left'],['.slides','tilt'],['.dtbest','zoom'],['.bkc','zoom'],['.bksum','zoom'],['.bkbox','pop'],['.dtsel','zoom'],['.card','zoom'],['.award','zoom'],['.stcmp','zoom'],['.dttip','tilt'],['.mapcard','zoom'],['.note','fade'],['.dtfoot','fade'],['.dtleg','fade'],['.revdots','fade']];
$$('.rv').forEach(function(el){
  if(el.id==='dtchart')return;
  var v='up';for(var i=0;i<MAP.length;i++){if(el.matches(MAP[i][0])){v=MAP[i][1];break}}
  A(el,v,0);reg(el,function(){show(el)});
});
S('.kick .ic','pop',220);
S('.mapcard','zoom',0);
S('footer img','pop',0);S('footer p','up',120);

/* kb (fotos com zoom suave) */
$$('.kb').forEach(function(el){reg(el,function(){el.classList.add('vis')})});

/* contadores */
C('.pk .v',200);C('.bigprice b',250);C('.award b',300);

/* gráfico de barras refaz a subida quando aparece */
var ch=$('#dtchart');
if(ch){reg(ch,function(){ch.classList.remove('go');void ch.offsetWidth;requestAnimationFrame(function(){ch.classList.add('go')})})}

/* ---------- nav em cascata ---------- */
$$('#nav a').forEach(function(a,i){a.style.setProperty('--k',i)});

/* ---------- parallax, decoração, progresso, fita ---------- */
var px=[];
function addPx(box,img,amp){if(box&&img)px.push({b:box,i:img,a:amp})}
addPx($('.heroph'),$('.heroph>img:first-child'),.075);
$$('.photoduo figure').forEach(function(f,i){f.classList.add('px');addPx(f,$('img',f),(i%2?-1:1)*.075)});
addPx($('.mapcard'),$('.mapcard img'),.09);
$$('.strip figure').forEach(function(f){f.classList.add('px');f.classList.add('kb');reg(f,function(){f.classList.add('vis')});addPx(f,$('img',f),.06)});

var DEC=[
 ['reveillon',[['spark','78%',70,30,-.16,1],['spark','8%',440,18,.2,0],['spark','88%',820,22,-.12,1]]],
 ['reservar',[['cal','86%',60,34,.14,0],['cj','5%',640,24,-.16,1],['spark','88%',1100,22,.12,1]]],
 ['datas',[['cal','86%',90,34,.14,0],['spark','6%',520,20,-.18,1]]],
 ['suites',[['cj','84%',60,34,-.14,1],['cj','4%',700,26,.18,0],['bed','90%',1400,30,-.1,0]]],
 ['mimos',[['heart','82%',80,36,-.16,1],['spark','5%',560,22,.2,0],['gift','88%',1000,30,.12,0]]],
 ['dayuse',[['sun','84%',70,38,.16,0],['cj','6%',520,24,-.16,1]]],
 ['wellness',[['lotus','80%',70,40,-.14,1],['spark','7%',480,20,.18,0]]],
 ['avaliacoes',[['heart','10%',60,26,.14,0],['spark','88%',420,24,-.16,1]]],
 ['chegar',[['pin','84%',70,34,-.14,1],['spark','6%',380,20,.2,0],['palms','80%',820,46,.1,0]]]
];
var dec=[];
DEC.forEach(function(g){
  var s=d.getElementById(g[0]);if(!s)return;
  var item={s:s,l:[]};
  g[1].forEach(function(o){
    var e=d.createElementNS('http://www.w3.org/2000/svg','svg');e.setAttribute('class','ic decor'+(o[3]>34?' big':''));e.setAttribute('aria-hidden','true');
    var u=d.createElementNS('http://www.w3.org/2000/svg','use');u.setAttribute('href','#'+o[0]);e.appendChild(u);
    e.style.left=o[1];e.style.top=o[2]+'px';e.style.fontSize=o[3]+'px';
    s.insertBefore(e,s.firstChild);
    item.l.push({e:e,sp:o[4],r:o[5]});
  });
  dec.push(item);
});

var prog=d.createElement('div');prog.id='prog';prog.setAttribute('aria-hidden','true');body.appendChild(prog);
var tr=$('#ribbon .tr'),rAnim=null,rate=1,lastY=window.scrollY,tick=false,vh=window.innerHeight;
function ribbon(){if(rAnim||!tr||!tr.getAnimations)return rAnim;var a=tr.getAnimations();rAnim=a[0]||null;return rAnim}
function frame(){
  tick=false;
  var y=window.scrollY,dy=y-lastY;lastY=y;vh=window.innerHeight;
  var i,r,rs=[],ds=[];
  /* leituras */
  for(i=0;i<px.length;i++){r=px[i].b.getBoundingClientRect();rs.push(r)}
  for(i=0;i<dec.length;i++){ds.push(dec[i].s.getBoundingClientRect().top)}
  /* escritas */
  for(i=0;i<px.length;i++){
    r=rs[i];if(r.bottom<-80||r.top>vh+80)continue;
    var c=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);
    px[i].i.style.translate='0 '+(-c*px[i].a*r.height).toFixed(1)+'px';
  }
  for(i=0;i<dec.length;i++){
    var st=ds[i],sh=dec[i].s.offsetHeight;if(st>vh+200||st<-sh-200)continue;
    dec[i].l.forEach(function(o){o.e.style.transform='translate3d(0,'+(-st*o.sp).toFixed(1)+'px,0) rotate('+(st*.06*(o.r?1:-1)).toFixed(1)+'deg)'});
  }
  var max=Math.max(1,d.documentElement.scrollHeight-vh);
  prog.style.transform='scaleX('+Math.min(1,Math.max(0,y/max)).toFixed(4)+')';
  prog.classList.toggle('on',!body.classList.contains('locked')&&y>8);
  var an=ribbon();
  if(an){
    var target=1+Math.min(Math.abs(dy)*.28,7);
    rate+=(target-rate)*.14;
    if(Math.abs(rate-1)<.03)rate=1;
    an.playbackRate=rate;
    if(rate!==1&&!tick){tick=true;requestAnimationFrame(frame)}
  }
}
window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
window.addEventListener('resize',function(){if(!tick){tick=true;requestAnimationFrame(frame)}});
frame();
void body.offsetWidth;body.classList.remove('setup');
}catch(err){
  body.classList.remove('setup');
  try{console.error('montagem',err)}catch(_){}
  allVis();
}
})();
