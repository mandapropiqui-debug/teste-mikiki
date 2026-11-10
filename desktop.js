
(function(){
var d=document,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var DAY=MK.DAY,SN=MK.SN,WA='5586999426066';
var WD=I18N.LX('WD',['dom','seg','ter','qua','qui','sex','sáb']),WDL=I18N.LX('WDL',['domingo','segunda','terça','quarta','quinta','sexta','sábado']),MO=I18N.LX('MO',['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']),MOL=I18N.LX('MOL',['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']);
function money(v){return v.toLocaleString(window.LOC||'pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function money0(v){return v.toLocaleString(window.LOC||'pt-BR',{maximumFractionDigits:0})}
function U(t){return new Date(t)}
function dm(t){var x=U(t);return x.getUTCDate()+' '+MO[x.getUTCMonth()]}
function dd2(t){var x=U(t);return ('0'+x.getUTCDate()).slice(-2)+'/'+('0'+(x.getUTCMonth()+1)).slice(-2)}
function wdd(t){return WD[U(t).getUTCDay()]+', '+dd2(t)}
function iso(t){return U(t).toISOString().slice(0,10)}
function fromIso(s){var a=(s||'').split('-');return a.length===3?Date.UTC(+a[0],+a[1]-1,+a[2]):null}
function T(i){return MK.D0+i*DAY}
function go(t,off){window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-(off==null?90:off),behavior:'smooth'})}
function wa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(I18N.tr(t))}
var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ================= SUÍTES ================= */
var V=[[{pp:'2 pessoas',ar:'14,7 m²',bd:'queen',add:0},{pp:'3 pessoas',ar:'18 m²',bd:'queen + solteiro',add:40.5}],[{pp:'2 pessoas',ar:'14,7 m²',bd:'queen',add:0},{pp:'3 pessoas',ar:'18 m²',bd:'queen + solteiro',add:40.5}],[{pp:'2 pessoas',ar:'14,7 m²',bd:'queen',add:0}]];
var tabs=$$('#tabs button'),panels=$$('.stp'),cur=[0,0,0];
function fillPrice(i){
  var p=panels[i],v=V[i][cur[i]],m=MK.min(i,v.add>0);
  $('.ar',p).textContent=v.ar;$('.pp',p).textContent=v.pp;$('.bd',p).textContent=v.bd;
  if(m){$('.pv',p).textContent='R$ '+money0(m);$('.pn',p).innerHTML='Menor valor dos próximos meses, para <b>'+v.pp.replace('pessoas','hóspedes')+'</b>, com café da manhã. Sujeito à disponibilidade, confirmada pelo WhatsApp.'}
  else{$('.pv',p).textContent='Consulte';$('.pn',p).textContent='Peça o valor atualizado pela nossa central.'}
  var c=$('.cmp[data-s="'+i+'"]');if(c&&v.add===0)c.textContent=m?'R$ '+money0(m):'–';
}
function gallery(p){
  var figs=$$('.figs figure',p),main=$('.main img',p),cnt=$('.cnt',p),cap=$('.stcap',p),ths=$$('.stth button',p),k=0;
  function show(n){k=(n+figs.length)%figs.length;main.style.opacity=0;setTimeout(function(){main.src=$('img',figs[k]).src;main.style.opacity=1},160);cnt.textContent=(k+1)+'/'+figs.length;cap.textContent=figs[k].dataset.c;ths.forEach(function(b,j){b.classList.toggle('on',j===k)})}
  ths.forEach(function(b,j){b.addEventListener('click',function(){show(j)})});
  $('.pv_',p).addEventListener('click',function(){show(k-1)});$('.nx_',p).addEventListener('click',function(){show(k+1)});
  cap.textContent=figs[0].dataset.c;
}
panels.forEach(function(p,i){
  gallery(p);
  $$('.stvar button',p).forEach(function(b){b.addEventListener('click',function(){cur[i]=+b.dataset.v;$$('.stvar button',p).forEach(function(x){x.classList.toggle('on',x===b)});fillPrice(i)})});
  $('.rsv',p).addEventListener('click',function(e){e.preventDefault();api.pickSuite(i,cur[i])});
  $('.seed',p).addEventListener('click',function(e){e.preventDefault();setSuiteDatas(i,true)});
  fillPrice(i);
});
tabs.forEach(function(b){b.addEventListener('click',function(){var i=+b.dataset.s;tabs.forEach(function(x,k){x.classList.toggle('on',k===i)});panels.forEach(function(p,k){p.classList.toggle('on',k===i)})})});

/* ================= RESERVA + CARRINHO ================= */
var B={s:0,g:2,i:-1,o:-1,arr:'',m:0},C={items:[],name:'',obs:''},months=[];
var E={s:$('#bks'),bin:$('#bkin'),bout:$('#bkout'),mon:$('#bkmon'),mon2:$('#bkmon2'),prev:$('#bkprev'),next:$('#bknext'),grid:$('#bkgrid'),grid2:$('#bkgrid2'),hint:$('#bkhint'),gm:$('#gm'),gp:$('#gp'),gn:$('#gn'),arr:$('#bkarr'),sum:$('#bksum'),cbtn:$('#cartbtn'),sheet:$('#sheet'),body:$('#shbody'),ft:$('#shft'),toast:$('#toast'),navlbl:$('#navlbl'),navnb:$('#navnb'),navcart:$('#navcart')};
function cap(){return B.s===2?2:3}
function minStay(i){var x=MK.days[i];return Math.max(1,x?x.m:1)}
function lim(i){var j=i;while(j<MK.N&&MK.days[j].p!=null&&j-i<30)j++;return j}
function mkMonths(){months=[];var a=new Date(MK.D0),y=a.getUTCFullYear(),m=a.getUTCMonth(),end=new Date(MK.D0+MK.N*DAY);while(y<end.getUTCFullYear()||(y===end.getUTCFullYear()&&m<=end.getUTCMonth())){months.push({y:y,m:m});m++;if(m>11){m=0;y++}}}
function monthOf(i){var x=U(T(i));for(var k=0;k<months.length;k++){if(months[k].y===x.getUTCFullYear()&&months[k].m===x.getUTCMonth())return k}return 0}
function stay(){
  if(B.i<0||B.o<0||B.o<=B.i)return null;
  var tri=B.g>=3,n=B.o-B.i,sum=0,unk=0;
  for(var i=B.i;i<B.o;i++){var v=MK.night(B.s,i,tri);if(v===null)unk++;else sum+=v}
  return {n:n,sum:sum,unk:unk,tri:tri,avg:unk<n?sum/(n-unk):null};
}
function calMonth(M,box,monEl){
  var first=MK.first();
  if(!M){box.innerHTML='';monEl.textContent='';return}
  monEl.textContent=MOL[M.m]+' '+M.y;
  var fd=new Date(Date.UTC(M.y,M.m,1)).getUTCDay(),dim=new Date(Date.UTC(M.y,M.m+1,0)).getUTCDate(),h='',tri=B.g>=3;
  var pick=B.i>=0&&B.o<0,ms=pick?minStay(B.i):1,lm=pick?lim(B.i):0;
  for(var k=0;k<fd;k++)h+='<span></span>';
  for(var day=1;day<=dim;day++){
    var t=Date.UTC(M.y,M.m,day),i=Math.round((t-MK.D0)/DAY),cls='bkd',ok=true,lab='',price=null;
    if(i<first||i<0||i>MK.N){ok=false}
    else if(pick&&i>B.i){ok=(i>=B.i+ms&&i<=lm)}
    else{ok=i<MK.N&&MK.days[i].p!=null}
    if(i>=0&&i<MK.N){price=MK.night(B.s,i,tri);lab=price!==null?money0(price):(MK.days[i].p==null?'–':'pacote');if(price!==null&&MK.days[i].p<=551)cls+=' lo'}
    if(!ok)cls+=' off';
    if(i===B.i)cls+=' st';else if(i===B.o)cls+=' en';else if(B.i>=0&&B.o>=0&&i>B.i&&i<B.o)cls+=' mid';
    if(i===first)cls+=' tod';
    h+='<button type="button" class="'+cls+'" data-i="'+i+'"'+(ok?'':' disabled')+' aria-label="'+WDL[U(t).getUTCDay()]+', '+day+' de '+MOL[M.m]+(price!==null?', R$ '+price:'')+'">'+day+'<small>'+lab+'</small></button>';
  }
  box.innerHTML=h;
}
function renderCal(){
  var first=MK.first();
  calMonth(months[B.m],E.grid,E.mon);calMonth(months[B.m+1],E.grid2,E.mon2);
  E.prev.disabled=B.m<=monthOf(first);E.next.disabled=B.m>=months.length-2;
  var s=stay(),pick=B.i>=0&&B.o<0,ms=pick?minStay(B.i):1;
  E.hint.textContent=B.i<0?'Clique na data de entrada':(B.o<0?(ms>1?'Agora a saída (mínimo de '+ms+' noites nessa data)':'Agora clique na data de saída'):(s?s.n+(s.n>1?' noites':' noite')+' · clique em outra data para mudar':''));
}
var hT;function hint(t){E.hint.textContent=t;clearTimeout(hT);hT=setTimeout(renderCal,2400)}
function clickDay(i){
  var first=MK.first();if(i<first||i>MK.N)return;
  if(B.i<0||B.o>=0){B.i=i;B.o=-1}
  else if(i<=B.i){B.i=i;B.o=-1}
  else{
    if(i<B.i+minStay(B.i)){hint('Nessa data o mínimo é de '+minStay(B.i)+' noites');return}
    if(i>lim(B.i)){hint('Essa saída passa de uma data sem disponibilidade');return}
    B.o=i;
  }
  render();if(stay())toast('Estadia no carrinho');
}
function renderFields(){
  var a=B.i>=0,b=B.o>=0;
  E.bin.innerHTML='<small>Entrada</small><b'+(a?'':' class="ph_"')+'>'+(a?wdd(T(B.i)):'Escolha no calendário')+'</b>';
  E.bout.innerHTML='<small>Saída</small><b'+(b?'':' class="ph_"')+'>'+(b?wdd(T(B.o)):(a?'Agora a saída':'—'))+'</b>';
  E.bin.classList.toggle('act',!a||b);E.bout.classList.toggle('act',a&&!b);
  E.gn.textContent=B.g;E.gm.disabled=B.g<=1;E.gp.disabled=B.g>=cap();
  $$('button',E.s).forEach(function(x){x.classList.toggle('on',+x.dataset.s===B.s)});
}
function totals(){var s=stay(),t=0,pend=false;if(s){t+=s.sum;if(s.unk)pend=true}C.items.forEach(function(it){if(it.price==null)pend=true;else t+=it.price*it.q});return {t:t,pend:pend}}
function suiteLine(){return 'Suíte '+SN[B.s]+(B.g>=3?' (triplo)':' (duplo)')}
function cartCount(){return (stay()?1:0)+C.items.length}
var ICB='<svg class="ic"><use href="#bag"/></svg>',ICH='<svg class="ic"><use href="#heart"/></svg>';
function renderSum(){
  var s=stay();
  if(!s){E.sum.innerHTML='<div class="mu">Escolha a entrada e a saída no calendário. O valor da diária aparece em cada dia e o total é calculado aqui.</div>'+(cartCount()?'<button type="button" class="btn" data-open>'+ICB+'Ver carrinho e enviar</button>':'')+'<button type="button" class="btn ghost" data-go="mimos">'+ICH+'Ver mimos e experiências</button>';return}
  var h='<div class="l1"><span>'+suiteLine()+'</span><b style="font-weight:400">'+s.n+(s.n>1?' noites':' noite')+'</b></div><div class="l1"><span>'+wdd(T(B.i))+I18N.TO+wdd(T(B.o))+'</span><span></span></div>';
  if(s.avg!==null)h+='<div class="l1"><span>R$ '+money0(s.avg)+' por noite'+(s.unk?' (parte da estadia)':'')+'</span><span></span></div>';
  h+='<div class="tt"><span>Hospedagem</span><b>'+(s.avg!==null?'R$ '+money0(s.sum):'sob consulta')+'</b></div>';
  if(s.unk)h+='<div class="pd">'+(s.unk===s.n?'Nessas datas a suíte segue o pacote do Réveillon.':'Em '+s.unk+(s.unk>1?' noites':' noite')+' a suíte segue o pacote do Réveillon.')+' O valor entra como a confirmar na mensagem.</div>';
  else h+='<div class="pd">Valores por noite, com café da manhã. Sujeito à disponibilidade, confirmada pelo WhatsApp.</div>';
  h+='<button type="button" class="btn" data-open>'+ICB+'Ver carrinho e enviar</button><button type="button" class="btn ghost" data-go="mimos">'+ICH+'Adicionar mimos e experiências</button>';
  E.sum.innerHTML=h;
}
function renderBtn(){
  var n=cartCount(),t=totals(),b=E.cbtn;
  if(!n){b.className='btn fab'+(b._show?' show':'');b.innerHTML='<svg class="ic"><use href="#cal"/></svg>Montar minha reserva';E.navlbl.textContent='Minha reserva';E.navnb.hidden=true;return}
  b.className='btn fab has'+(b._show?' show':'');
  b.innerHTML=ICB+'Carrinho <span class="nb">'+n+'</span>'+(t.t>0?'<b style="font-weight:500">R$ '+money0(t.t)+'</b>':'<span>a confirmar</span>');
  E.navlbl.textContent=t.t>0?'R$ '+money0(t.t):'Carrinho';E.navnb.hidden=false;E.navnb.textContent=n;
}
function bump(){[E.cbtn].forEach(function(b){b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')})}
var tT;function toast(t){E.toast.textContent=t;E.toast.classList.add('show');clearTimeout(tT);tT=setTimeout(function(){E.toast.classList.remove('show')},1900)}
function syncAdds(){
  $$('[data-add]').forEach(function(b){
    var on=C.items.some(function(i){return i.id===b.dataset.id});
    b.classList.toggle('on',on);
    var u=$('use',b);if(u)u.setAttribute('href',on?'#check':'#plus');
    var l=$('.lbl',b);if(l)l.textContent=on?'No carrinho · ver':l.dataset.t;
  });
}
function addItem(b){
  var id=b.dataset.id;
  if(C.items.some(function(i){return i.id===id})){openSheet();return}
  var pr=b.dataset.price;
  var it={id:id,name:b.dataset.name,price:pr===''||pr==null?null:+pr,q:1,unit:b.dataset.unit||'',note:b.dataset.note||'',date:b.dataset.nodate?null:''};
  if(it.date!==null&&B.i>=0)it.date=iso(T(B.i));
  C.items.push(it);syncAdds();renderBtn();renderSum();bump();toast(it.name+' no carrinho');
}
function today(){var n=new Date();return iso(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()))}
function lineTxt(it){
  var tx='• '+it.name;
  if(it.date)tx+=' · dia '+dd2(fromIso(it.date));
  if(it.unit==='pessoa')tx+=' · '+it.q+(it.q>1?' pessoas':' pessoa');else if(it.q>1)tx+=' · '+it.q+' un.';
  if(it.price!=null){tx+=' · R$ '+money0(it.price*it.q);if(it.unit==='pessoa'&&it.q>1)tx+=' ('+it.q+' × R$ '+money0(it.price)+')'}else tx+=' · valor a confirmar';
  if(it.note)tx+=' · '+it.note;
  return tx;
}
function message(){
  var L=['Oi, pessoal do Mikiki! 🌴','Vim pelo site e quero montar a minha estadia:',''],s=stay();
  if(s){
    L.push('*SUÍTE*');L.push(suiteLine()+' · '+B.g+(B.g>1?' hóspedes':' hóspede'));
    L.push('Entrada: '+wdd(T(B.i)));L.push('Saída: '+wdd(T(B.o))+' ('+s.n+(s.n>1?' noites':' noite')+')');
    if(B.arr)L.push('Horário de chegada: '+B.arr);
    L.push(s.avg!==null?'Hospedagem: R$ '+money0(s.sum)+(s.n>1?' (média de R$ '+money0(s.avg)+' por noite)':''):'Hospedagem: valor a confirmar (Réveillon)');
    if(s.unk&&s.avg!==null)L.push('(parte das noites no pacote do Réveillon, a confirmar)');
    L.push('');
  }
  if(C.items.length){L.push('*EXTRAS*');C.items.forEach(function(it){L.push(lineTxt(it))});L.push('')}
  var t=totals();
  L.push('*TOTAL: '+(t.t>0?'R$ '+money0(t.t):'a confirmar')+'*'+(t.t>0&&t.pend?' (+ itens a confirmar)':''));
  if(C.name){L.push('');L.push('Meu nome: '+C.name)}
  if(C.obs)L.push('Obs: '+C.obs);
  L.push('');L.push('Dá pra confirmar a disponibilidade? Obrigado(a)! 😊');
  return I18N.trMsg(L);
}
function waHref(){return wa(message())}
function renderSheet(){
  var s=stay(),h='',n=cartCount(),t=totals();
  if(B.i>=0&&B.o<0)h+='<div class="shwarn">Você escolheu a entrada ('+wdd(T(B.i))+'), mas falta a saída. <button type="button" data-edit>Escolher a saída</button></div>';
  if(s)h+='<div class="ci"><div class="cih"><b>'+suiteLine()+'</b><button type="button" data-edit>Editar</button></div><p>'+B.g+(B.g>1?' hóspedes':' hóspede')+' · '+wdd(T(B.i))+I18N.TO+wdd(T(B.o))+' · '+s.n+(s.n>1?' noites':' noite')+'</p><p>'+(B.arr?'Chegada: '+B.arr:'Horário de chegada: não informado')+'</p><div class="cip"><span>'+(s.avg!==null?'R$ '+money0(s.avg)+' por noite':'Réveillon: a confirmar')+'</span><b>'+(s.avg!==null?'R$ '+money0(s.sum):'a confirmar')+'</b></div></div>';
  C.items.forEach(function(it,k){
    var sub=it.price!=null?'R$ '+money0(it.price*it.q):'a confirmar';
    h+='<div class="ci"><div class="cih"><b>'+it.name+'</b><button type="button" class="rm" data-rm="'+k+'" aria-label="Remover"><svg class="ic"><use href="#x"/></svg></button></div>';
    if(it.note)h+='<p>'+it.note+'</p>';
    h+='<div class="cir">';
    if(it.date!==null)h+='<label>Dia<input type="date" data-d="'+k+'" min="'+today()+'" value="'+it.date+'"></label>';
    h+='<div class="qs"><button type="button" data-q="'+k+'" data-v="-1" aria-label="Menos"><svg class="ic"><use href="#minus"/></svg></button><b>'+it.q+'</b><button type="button" data-q="'+k+'" data-v="1" aria-label="Mais"><svg class="ic"><use href="#plus"/></svg></button><small>'+(it.unit==='pessoa'?'pessoas':'un.')+'</small></div></div>';
    h+='<div class="cip"><span>'+(it.price!=null?'R$ '+money0(it.price)+(it.unit==='pessoa'?' por pessoa':''):'sob consulta')+'</span><b>'+sub+'</b></div></div>';
  });
  if(!n)h='<div class="shempty"><svg class="ic"><use href="#bag"/></svg><br>Seu carrinho está vazio.<br>Escolha uma suíte e as datas, ou adicione um mimo, o Day Use ou o Wellness.<br><button type="button" class="btn" data-edit><svg class="ic"><use href="#cal"/></svg>Escolher datas</button></div>';
  else h+='<label class="shf">Seu nome<input type="text" id="cname" autocomplete="name" placeholder="Como podemos te chamar?" value="'+(C.name||'').replace(/"/g,'&quot;')+'"></label><label class="shf">Alguma observação?<textarea id="cobs" rows="2" placeholder="Aniversário, lua de mel, restrição alimentar…">'+(C.obs||'').replace(/</g,'&lt;')+'</textarea></label>';
  E.body.innerHTML=h;
  E.ft.innerHTML=n?'<div class="tt"><span>Total'+(t.pend?' (sem os itens a confirmar)':'')+'</span><b>'+(t.t>0?'R$ '+money0(t.t):'a confirmar')+'</b></div><div class="pd">Você não paga nada agora. A nossa central confirma a disponibilidade e combina o pagamento com você pelo WhatsApp.</div><a class="btn" id="send" href="'+waHref()+'" target="_blank" rel="noopener"><svg class="ic"><use href="#wa"/></svg>Enviar no WhatsApp</a>':'';
}
function refreshSend(){var a=$('#send');if(a)a.href=waHref()}
function openSheet(){renderSheet();E.sheet.classList.add('open');d.body.classList.add('sheetopen');requestAnimationFrame(function(){requestAnimationFrame(function(){E.sheet.classList.add('in')})});E.sheet.setAttribute('aria-hidden','false')}
function closeSheet(){E.sheet.classList.remove('in');E.sheet.setAttribute('aria-hidden','true');setTimeout(function(){E.sheet.classList.remove('open');d.body.classList.remove('sheetopen')},380)}
function after(){syncAdds();renderBtn();renderSum()}
E.sheet.addEventListener('click',function(e){
  var t=e.target.closest('button,[data-close]');
  if(e.target.classList.contains('shbg')||(t&&t.hasAttribute('data-close'))){closeSheet();return}
  if(!t)return;
  if(t.hasAttribute('data-edit')){closeSheet();setTimeout(function(){go($('#reservar'),90)},300);return}
  if(t.dataset.rm!=null){C.items.splice(+t.dataset.rm,1);after();renderSheet();return}
  if(t.dataset.q!=null){var it=C.items[+t.dataset.q];it.q=Math.max(1,Math.min(20,it.q+(+t.dataset.v)));after();renderSheet();return}
});
E.sheet.addEventListener('input',function(e){var t=e.target;if(t.id==='cname'){C.name=t.value.trim();refreshSend()}else if(t.id==='cobs'){C.obs=t.value.trim();refreshSend()}});
E.sheet.addEventListener('change',function(e){var t=e.target;if(t.dataset.d!=null){C.items[+t.dataset.d].date=t.value;refreshSend()}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&E.sheet.classList.contains('open'))closeSheet()});
function openOrGo(){if(cartCount())openSheet();else go($('#reservar'),90)}
E.cbtn.addEventListener('click',openOrGo);E.navcart.addEventListener('click',openOrGo);
d.addEventListener('click',function(e){
  var a=e.target.closest('[data-add]');if(a){e.preventDefault();addItem(a);return}
  var p=e.target.closest('[data-pick]');if(p){var x=p.dataset.pick.split(',').map(Number);api.pick(x[0],x[1],x[2]);return}
  var o=e.target.closest('[data-open]');if(o){openSheet();return}
  var g=e.target.closest('[data-go]');if(g){var t=$('#'+g.dataset.go);if(t)go(t,90);return}
});
E.s.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;B.s=+b.dataset.s;if(B.g>cap())B.g=cap();if(B.o>=0&&B.o>lim(B.i))B.o=-1;render()});
function dayClick(e){var b=e.target.closest('.bkd');if(b&&!b.disabled)clickDay(+b.dataset.i)}
E.grid.addEventListener('click',dayClick);E.grid2.addEventListener('click',dayClick);
E.prev.addEventListener('click',function(){if(B.m>0){B.m--;renderCal()}});
E.next.addEventListener('click',function(){if(B.m<months.length-2){B.m++;renderCal()}});
E.gm.addEventListener('click',function(){if(B.g>1){B.g--;render()}});
E.gp.addEventListener('click',function(){if(B.g<cap()){B.g++;render()}});
E.arr.addEventListener('change',function(){B.arr=E.arr.value});
(function(){var h='<option value="">Escolher</option>';for(var k=6;k<=23;k++)h+='<option value="por volta das '+k+'h">por volta das '+k+'h</option>';h+='<option value="de madrugada">de madrugada</option><option value="ainda não sei">ainda não sei</option>';E.arr.innerHTML=h})();
function render(){
  var first=MK.first();if(B.i>=0&&B.i<first){B.i=-1;B.o=-1}
  renderFields();renderCal();renderSum();renderBtn();syncAdds();
  if(E.sheet.classList.contains('open'))renderSheet();
}
var api={
  pick:function(s,i,n){B.s=s;if(B.g>cap())B.g=cap();B.i=i;B.o=Math.min(MK.N,i+Math.max(n,minStay(i)));B.m=Math.min(monthOf(i),Math.max(0,months.length-2));render();toast('Estadia no carrinho');setTimeout(function(){go($('#reservar'),90)},60)},
  pickSuite:function(s,v){B.s=s;B.g=v===1?Math.min(3,cap()):Math.min(B.g,2);if(B.o>=0&&B.o>lim(B.i))B.o=-1;render();setTimeout(function(){go($('#reservar'),90)},60)}
};
mkMonths();B.m=Math.min(monthOf(MK.first()),Math.max(0,months.length-2));render();

/* ================= DATAS MAIS BARATAS ================= */
var pkg=MK.pkg,N=MK.N,first=MK.first(),nn=2,mon=-1,sel=-1,su=0,dmonths=[],gmin=1e9;
var el={n:$('#dtn'),s:$('#dts'),best:$('#dtbest'),m:$('#dtm'),mon:$('#dtmon'),ch:$('#dtchart'),ax:$('#dtaxis'),sel:$('#dtsel')};
function tier(p){return p<=551?'lo':(p>700?'hi':'')}
function days(){return MK.days}
function unk(i){return (su>0&&pkg(i))||days()[i].p==null}
function P(i){var b=MK.base(su,i,0);return b===null?0:Math.round(b*MK.DISC)}
function win(i,n){if(i+n>N)return null;var s=0;for(var k=0;k<n;k++){if(unk(i+k))return null;s+=P(i+k)}return s}
function evn(t){var s=U(t).toISOString().slice(5,10);if(s==='12-31')return 'Réveillon';if(s>='12-30'||s<='01-03')return 'Réveillon';if(s>='02-14'&&s<='02-18')return 'Carnaval';return ''}
function mkDM(){dmonths=[];days().forEach(function(x,i){var dt=U(x.t),k=dt.getUTCFullYear()*12+dt.getUTCMonth();if(!dmonths.length||dmonths[dmonths.length-1].k!==k)dmonths.push({k:k,y:dt.getUTCFullYear(),m:dt.getUTCMonth(),a:i,b:i});dmonths[dmonths.length-1].b=i})}
function calcMonths(){gmin=1e9;dmonths.forEach(function(M){var mn=1e9;for(var i=Math.max(M.a,first);i<=M.b;i++){if(unk(i))continue;mn=Math.min(mn,P(i))}M.min=mn===1e9?null:mn;if(M.min!==null)gmin=Math.min(gmin,M.min)})}
function bestWin(n){var bi=-1,bs=1e12;for(var i=first;i+n<=N;i++){if(n<days()[i].m)continue;var s=win(i,n);if(s===null)continue;if(s<bs){bs=s;bi=i}}return bi<0?null:{i:bi,s:bs}}
var WAI='<svg class="ic"><use href="#wa"/></svg>',CALI='<svg class="ic"><use href="#cal"/></svg>';
function renderBest(){
  var b=bestWin(nn);
  if(!b){el.best.innerHTML='<div class="dtrange">Consulte as datas disponíveis<small>Fale com a nossa central para ver as próximas datas da Suíte '+SN[su]+'.</small></div><a class="btn" href="'+wa('Olá! Quero saber as próximas datas com melhor preço na Suíte '+SN[su]+' do Mikiki.')+'" target="_blank" rel="noopener">'+WAI+'Falar com a central</a>';return}
  var a=days()[b.i],out=a.t+nn*DAY;
  el.best.innerHTML='<div class="dtbadge"><i></i>Menor preço · Suíte '+SN[su]+' · '+nn+' noites</div><div class="dtrange">'+dm(a.t)+I18N.TO+dm(out)+'<small>'+WD[U(a.t).getUTCDay()]+I18N.TO+WD[U(out).getUTCDay()]+' · '+nn+' noites</small></div><div class="dtprice"><b>R$ '+money(b.s/nn)+'</b><span>por noite · total R$ '+money(b.s)+'</span></div><button type="button" class="btn" data-pick="'+su+','+b.i+','+nn+'">'+CALI+'Quero essas datas</button>';
}
function renderMonths(){
  el.m.innerHTML='';
  dmonths.forEach(function(M,k){
    var b=d.createElement('button');b.type='button';b.innerHTML=MO[M.m]+'<small>'+(M.min===null?'–':money0(M.min))+'</small>';
    if(M.min===null)b.disabled=true;if(M.min!==null&&M.min===gmin)b.classList.add('low');if(k===mon)b.classList.add('on');
    b.addEventListener('click',function(){setMonth(k)});el.m.appendChild(b);
  });
}
function renderChart(){
  var M=dmonths[mon],mx=0;for(var i=M.a;i<=M.b;i++)mx=Math.max(mx,P(i));
  el.mon.textContent=MOL[M.m]+' '+M.y;el.ch.className='dtchart';el.ch.innerHTML='';el.ax.innerHTML='';
  var cnt=M.b-M.a+1;
  for(var i=M.a;i<=M.b;i++){
    var x=days()[i],b=d.createElement('button');b.type='button';b.className='b '+tier(x.p)+(i<first?' past':'')+(unk(i)?' est':'');b.dataset.i=i;
    b.setAttribute('aria-label',WD[U(x.t).getUTCDay()]+' '+dm(x.t)+(unk(i)?', sob consulta':', R$ '+money(P(i))));
    var bar=d.createElement('i');bar.style.setProperty('--h',Math.max(14,P(i)/mx*100)+'%');bar.style.transitionDelay=(i-M.a)*14+'ms';b.appendChild(bar);el.ch.appendChild(b);
    var dn=U(x.t).getUTCDate();
    if(dn===1||dn===8||dn===15||dn===22||dn===29){var sp=d.createElement('span');sp.textContent=dn;sp.style.left=((i-M.a+.5)/cnt*100)+'%';el.ax.appendChild(sp)}
  }
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.ch.classList.add('go')})});
}
function markSel(){[].slice.call(el.ch.children).forEach(function(b){b.classList.toggle('sel',+b.dataset.i===sel)})}
function renderSel(){
  if(sel<0||!days()[sel]){el.sel.innerHTML='';return}
  var x=days()[sel],u=U(x.t),n=Math.max(nn,x.m),e=evn(x.t),past=sel<first;
  var out=x.t+n*DAY,t=tier(x.p),lab=t==='lo'?'mais em conta':(t==='hi'?'alta temporada':'intermediário');
  var head=WDL[u.getUTCDay()]+', '+u.getUTCDate()+' de '+MO[u.getUTCMonth()]+(e?'<span class="ev">'+e+'</span>':'');
  if(x.p==null){el.sel.innerHTML='<div class="top"><div class="dd">'+head+'<small>Suíte '+SN[su]+'</small></div><div class="pp"><b style="font-size:19px;padding-top:4px">indisponível</b></div></div><div class="tot">Essa data não está disponível. Escolha outra ou fale com a nossa central.</div>';return}
  if(unk(sel)){el.sel.innerHTML='<div class="top"><div class="dd">'+head+'<small>Suíte '+SN[su]+' · pacote de Réveillon</small></div><div class="pp"><b style="font-size:19px;padding-top:4px">sob consulta</b></div></div><div class="tot">Na virada do ano as suítes seguem o pacote do Réveillon. Peça o valor da Suíte '+SN[su]+' pela nossa central.</div>'+(past?'':'<a class="btn" href="'+wa('Olá! Quero o valor do pacote de Réveillon na Suíte '+SN[su]+' do Mikiki.')+'" target="_blank" rel="noopener">'+WAI+'Pedir valor pelo WhatsApp</a>');return}
  var Tt=win(sel,n);
  el.sel.innerHTML='<div class="top"><div class="dd">'+head+'<small>'+lab+(x.m>1?' · mínimo de '+x.m+' noites':'')+'</small></div><div class="pp"><b>R$ '+money(P(sel))+'</b><small>por noite</small></div></div>'
   +(Tt!==null&&!past?'<div class="tot"><b>'+n+' noites</b> · '+dm(x.t)+I18N.TO+dm(out)+' · total <b>R$ '+money(Tt)+'</b></div>':'<div class="tot">Consulte o valor total com a nossa central.</div>')
   +(past?'':'<button type="button" class="btn" data-pick="'+su+','+sel+','+n+'">'+CALI+'Escolher essas datas</button>');
}
function setSel(i){if(i<first&&sel>=0)return;sel=i;markSel();renderSel()}
function cheapestIn(k){var M=dmonths[k],bi=-1,bp=1e9;for(var i=Math.max(M.a,first);i<=M.b;i++){if(unk(i))continue;if(P(i)<bp){bp=P(i);bi=i}}return bi<0?Math.max(M.a,first):bi}
function setMonth(k){mon=k;renderMonths();renderChart();sel=-1;setSel(cheapestIn(k))}
function setSuiteDatas(s,scroll){
  su=s;[].slice.call(el.s.children).forEach(function(b,k){b.classList.toggle('on',k===s)});
  calcMonths();renderBest();
  var keep=mon<0?0:mon;if(dmonths[keep]&&dmonths[keep].min===null){for(var k=0;k<dmonths.length;k++){if(dmonths[k].min!==null){keep=k;break}}}
  setMonth(keep);
  if(scroll)go($('#datas'),90);
}
[].slice.call(el.n.children).forEach(function(b){b.addEventListener('click',function(){nn=+b.dataset.n;[].slice.call(el.n.children).forEach(function(x){x.classList.toggle('on',x===b)});renderBest();renderSel()})});
[].slice.call(el.s.children).forEach(function(b){b.addEventListener('click',function(){setSuiteDatas(+b.dataset.s,false)})});
function pickBar(e){var b=e.target.closest('.b');if(b&&+b.dataset.i!==sel)setSel(+b.dataset.i)}
el.ch.addEventListener('mouseover',pickBar);el.ch.addEventListener('click',pickBar);
function initDatas(){
  N=MK.N;first=MK.first();mkDM();
  if(first>=N){calcMonths();renderBest();return}
  var start=0;for(var k=0;k<dmonths.length;k++){if(first>=dmonths[k].a&&first<=dmonths[k].b){start=k;break}}
  mon=start;setSuiteDatas(su,false);
}
initDatas();
MK.on(function(){mkMonths();B.m=Math.min(B.m,Math.max(0,months.length-2));render();panels.forEach(function(p,i){fillPrice(i)});initDatas()});

/* ================= SLIDESHOWS ================= */
$$('[data-show]').forEach(function(sh){
  var sl=$$('.sl',sh),dots=$('.dots',sh),i=0,t;
  sl.forEach(function(){dots.appendChild(d.createElement('i'))});var ds=$$('i',dots);
  function g(n){i=(n+sl.length)%sl.length;sl.forEach(function(s,k){s.classList.toggle('on',k===i)});ds.forEach(function(x,k){x.classList.toggle('on',k===i)})}
  function play(){clearInterval(t);if(!reduce)t=setInterval(function(){g(i+1)},+sh.dataset.int||4000)}
  sh.addEventListener('click',function(){g(i+1);play()});g(0);
  new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)play();else clearInterval(t)})},{threshold:.3}).observe(sh);
});
var tr=$('#tr');if(tr){[].slice.call(tr.children).forEach(function(f){tr.appendChild(f.cloneNode(true))})}

/* ================= NAV, FAB, REVELAR ================= */
var links=$$('.nav nav a');
function setNav(t){links.forEach(function(a){a.classList.toggle('on',a.dataset.t===t)});E.cbtn.classList.toggle('hide',t==='reservar')}
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)setNav(e.target.dataset.nav==='inicio'?'':(e.target.dataset.nav||e.target.id))})},{rootMargin:'-45% 0px -50% 0px'});
$$('section[data-nav]').forEach(function(s){so.observe(s)});
E.cbtn._show=false;
function fabv(){var s=window.scrollY>500;if(s!==E.cbtn._show){E.cbtn._show=s;E.cbtn.classList.toggle('show',s)}}
window.addEventListener('scroll',fabv,{passive:true});fabv();
$$('.nav nav a,.brand,.cta a[href^="#"],.rows a').forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href');if(h&&h.charAt(0)==='#'){var t=$(h);if(t){e.preventDefault();go(t,h==='#inicio'?0:80)}}})});
if(!reduce&&'IntersectionObserver' in window){
  var rvEls=$$('.head,.tabs,.stcmp,.pk,.rc,.photos,.strip,.card,.slides,.sl-text,.mapcard,.dtbest,.dtr,.bkl,.bkc').map(function(x){x.classList.add('rv');return x});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
  rvEls.forEach(function(x){io.observe(x)});
}
})();

