/* IRON FIST — Nivel 2 */
(() => {
"use strict";
const $=id=>document.getElementById(id),play=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.start();return;}const a=$(id);if(a)a.play().catch(()=>{});},pause=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.pause();return;}$(id)?.pause()};
const ids=["Meteioritolvl2","Meteiorito2lvl2","Meteiorito3lvl2","Meteiorito4lvl2","Meteiorito5lvl2"];
let s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};
let cuentaTimer=null,cuentaFinal=null,cuentaActiva=false;
function cancelarCuenta(){if(cuentaTimer)clearInterval(cuentaTimer);if(cuentaFinal)clearTimeout(cuentaFinal);cuentaTimer=null;cuentaFinal=null;cuentaActiva=false;const box=$("Contenedor_contadorlvl2");if(box)box.style.display="none";const btn=$("Playlvl2");if(btn)btn.disabled=false;}
function hud(){if($("Tiempolvl2"))$("Tiempolvl2").textContent=s.tiempo;if($("Puntajelvl2"))$("Puntajelvl2").textContent=s.puntos+" / 5";const p=$("Puntajelvl2")?.parentElement?.querySelector(".ProgresoInternoLvl2");if(p)p.style.width=(s.puntos/5*100)+"%";}
function barra(){const box=$("Puntajelvl2");if(box&&!box.querySelector(".BarraProgresoLvl2")){const b=document.createElement("div");b.className="BarraProgresoLvl2";b.innerHTML='<div class="ProgresoInternoLvl2"></div>';box.style.position="relative";box.appendChild(b);}}
function ocultar(e){if(e){e.style.transition="none";e.style.opacity="0";e.style.visibility="hidden";e.style.left="-12%";e.dataset.tocado="0";}}
function lanzar(e,delay=0){if(!e)return;setTimeout(()=>{if(!s.jugando||s.pausado||s.terminado||s.reiniciando)return;e.dataset.tocado="0";e.style.top=Math.max(7,Math.random()*78)+"%";e.style.left="-12%";e.style.transition="none";e.style.opacity="1";e.style.visibility="visible";requestAnimationFrame(()=>{e.style.transition="left 4.2s linear";e.style.left="100%";});},delay);}
function congelarMeteoritos(ids){ids.forEach(id=>{const e=$(id);if(!e||e.dataset.tocado==="1")return;e.getAnimations().forEach(a=>a.pause());});}
function reanudarMeteoritos(ids){ids.forEach(id=>{const e=$(id);if(!e||e.dataset.tocado==="1")return;e.getAnimations().forEach(a=>a.play());});}
function iniciarMeteoritos(){ids.forEach((id,i)=>{const e=$(id);if(e){ocultar(e);lanzar(e,i*850);}});}
function detener(){ids.forEach(id=>{const e=$(id);if(e)e.dataset.tocado="1";});}
function perderNivel2(m){if(!s.jugando||s.terminado||s.reiniciando)return;s.reiniciando=true;s.pausado=true;s.tiempo=60;s.puntos=0;hud();ids.forEach(id=>ocultar($(id)));play("Perdiste_sound");if(window.Swal)Swal.fire({title:"¡Defensa fallida!",text:m+" La ronda se reiniciará.",icon:"warning",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});setTimeout(()=>{if(s.jugando&&!s.terminado){s.reiniciando=false;s.pausado=false;iniciarMeteoritos();}},900);}
function ganar(){s.terminado=true;s.jugando=false;clearInterval(s.timer);clearInterval(s.impact);detener();ids.forEach(id=>ocultar($(id)));pause("Fondo_Ciberpunk");play("Triunfo");$("GanastePantallaLvL2").style.display="flex";$("NEXT").style.display="block";$("NEXT").style.pointerEvents="auto";$("NEXT").style.zIndex="99999";}
function explosionMeteorito(e){
 if(!e)return;
 const r=e.getBoundingClientRect();
 const x=r.left+r.width/2, y=r.top+r.height/2;
 const capa=document.createElement("div");
 Object.assign(capa.style,{position:"fixed",inset:"0",width:"100vw",height:"100vh",overflow:"visible",pointerEvents:"none",zIndex:"2147483647"});
 capa.setAttribute("aria-hidden","true");
 const centro=document.createElement("div");
 Object.assign(centro.style,{position:"absolute",left:x+"px",top:y+"px",width:"24px",height:"24px",borderRadius:"50%",transform:"translate(-50%,-50%)",background:"radial-gradient(circle,#fff 0%,#fff8b0 18%,#ffb52e 40%,#ff4b21 66%,rgba(168,85,247,.5) 78%,transparent 80%)",boxShadow:"0 0 20px 12px rgba(255,190,50,.9),0 0 48px 25px rgba(255,75,33,.65)"});
 capa.appendChild(centro);
 if(centro.animate)centro.animate([{transform:"translate(-50%,-50%) scale(.2)",opacity:1},{transform:"translate(-50%,-50%) scale(4.5)",opacity:1,offset:.25},{transform:"translate(-50%,-50%) scale(7)",opacity:0}],{duration:700,easing:"ease-out",fill:"forwards"});
 const anillo=document.createElement("div");
 Object.assign(anillo.style,{position:"absolute",left:x+"px",top:y+"px",width:"18px",height:"18px",boxSizing:"border-box",border:"4px solid #ffe08a",borderRadius:"50%",boxShadow:"0 0 18px #ff7b35",transform:"translate(-50%,-50%)"});
 capa.appendChild(anillo);
 if(anillo.animate)anillo.animate([{transform:"translate(-50%,-50%) scale(.2)",opacity:1},{transform:"translate(-50%,-50%) scale(7)",opacity:0}],{duration:800,easing:"ease-out",fill:"forwards"});
 for(let i=0;i<20;i++){
  const ang=i*Math.PI/10,dist=65+(i%4)*18;
  const p=document.createElement("i");
  Object.assign(p.style,{position:"absolute",left:x+"px",top:y+"px",width:(i%3===0?9:6)+"px",height:(i%3===0?9:6)+"px",borderRadius:"50%",background:i%2?"#ff6b35":"#f4c7ff",boxShadow:"0 0 12px 4px "+(i%2?"rgba(255,143,40,.95)":"rgba(168,85,247,.95)"),transform:"translate(-50%,-50%)"});
  capa.appendChild(p);
  if(p.animate)p.animate([{transform:"translate(-50%,-50%) scale(1.3)",opacity:1},{transform:"translate(calc(-50% + "+(Math.cos(ang)*dist)+"px),calc(-50% + "+(Math.sin(ang)*dist)+"px)) scale(.1)",opacity:0}],{duration:850,delay:(i%5)*15,easing:"cubic-bezier(.1,.7,.2,1)",fill:"forwards"});
 }
 document.body.appendChild(capa);
 window.setTimeout(()=>capa.remove(),1100);
}function iniciar(){s={tiempo:60,puntos:0,jugando:true,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};hud();$("Startlvl2").style.display="none";$("Pausa_Pantallalvl2").style.display="none";$("GanastePantallaLvL2").style.display="none";play("Fondo_Ciberpunk");iniciarMeteoritos();s.timer=setInterval(()=>{if(!s.pausado&&s.jugando){s.tiempo--;hud();if(s.tiempo<=0)perderNivel2("Se agotó el tiempo.")}},1000);s.impact=setInterval(()=>{if(s.pausado||s.reiniciando||!s.jugando||s.terminado)return;const linea=$("NIVEL_02")?.querySelector(".Limitelvl2");if(!linea)return;const x=linea.getBoundingClientRect().left;for(const id of ids){const e=$(id);if(!e||e.dataset.tocado==="1"||getComputedStyle(e).visibility==="hidden"||Number(getComputedStyle(e).opacity)===0)continue;const r=e.getBoundingClientRect();if(r.left+r.width*0.5>=x){perderNivel2("Un meteorito llegó a la línea de impacto.");return;}}},40);}
function pausa(){if(!s.jugando||s.terminado)return;s.pausado=!s.pausado;$("Pausa_Pantallalvl2").style.display=s.pausado?"flex":"none";if(s.pausado){congelarMeteoritos(ids);pause("Fondo_Ciberpunk");}else{reanudarMeteoritos(ids);play("Fondo_Ciberpunk");}}
function reiniciar(){cancelarCuenta();clearInterval(s.timer);clearInterval(s.impact);s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};hud();ids.forEach(id=>ocultar($(id)));$("Pausa_Pantallalvl2").style.display="none";$("GanastePantallaLvL2").style.display="none";$("Startlvl2").style.display="flex";pause("Fondo_Ciberpunk");}
function cuenta(){if(cuentaActiva)return;const box=$("Contenedor_contadorlvl2"),sp=$("RGBlvl2"),btn=$("Playlvl2");if(!box||!sp)return;cuentaActiva=true;if(btn)btn.disabled=true;let n=3;box.style.display="block";sp.textContent=n;cuentaTimer=setInterval(()=>{n--;sp.textContent=n>0?n:"¡YA!";if(n<=0){clearInterval(cuentaTimer);cuentaTimer=null;cuentaFinal=setTimeout(()=>{if(!cuentaActiva)return;box.style.display="none";cuentaActiva=false;cuentaFinal=null;if(btn)btn.disabled=false;iniciar();},350);}},800);}
window.nivel2Terminado=()=>s.terminado;
window.prepararNivel2=()=>{cancelarCuenta();s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};hud();$("Startlvl2").style.display="flex";$("GanastePantallaLvL2").style.display="none";ids.forEach(id=>ocultar($(id)));};
document.addEventListener("DOMContentLoaded",()=>{barra();hud();ids.forEach(id=>{const e=$(id);if(!e)return;e.addEventListener("pointerdown",()=>golpe(id));e.addEventListener("transitionend",ev=>{if(ev.propertyName==="left"&&s.jugando&&!s.pausado&&!s.terminado&&!s.reiniciando&&e.dataset.tocado!=="1"&&getComputedStyle(e).visibility!=="hidden"&&Number(getComputedStyle(e).opacity)>0){perderNivel2("Un meteorito llegó al final de su recorrido.");}});});$("Playlvl2")?.addEventListener("click",cuenta);$("Pauselvl2")?.addEventListener("click",pausa);$("Reiniciarlvl2")?.addEventListener("click",reiniciar);});
})();