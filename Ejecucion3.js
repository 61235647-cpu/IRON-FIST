/* IRON FIST — Nivel 3 */
(() => {
"use strict";
const $=id=>document.getElementById(id),play=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.start();return;}const a=$(id);if(a)a.play().catch(()=>{});},pause=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.pause();return;}$(id)?.pause()};
const ids=["Meteoritolvl3","Meteorito2lvl3","Meteorito3lvl3","Meteorito4lvl3","Meteorito5lvl3"];
let s={tiempo:50,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};
let cuentaTimer=null,cuentaFinal=null,cuentaActiva=false;
function cancelarCuenta(){if(cuentaTimer)clearInterval(cuentaTimer);if(cuentaFinal)clearTimeout(cuentaFinal);cuentaTimer=null;cuentaFinal=null;cuentaActiva=false;const box=$("Contenedor_contadorlvl3");if(box)box.style.display="none";const btn=$("Playlvl3");if(btn)btn.disabled=false;}
function hud(){if($("Tiempolvl3"))$("Tiempolvl3").textContent=s.tiempo;if($("Puntajelvl3"))$("Puntajelvl3").textContent=s.puntos+" / 5";const p=$("Puntajelvl3")?.parentElement?.querySelector(".ProgresoInternoLvl3");if(p)p.style.width=(s.puntos/5*100)+"%";}
function barra(){const box=$("Puntajelvl3");if(box&&!box.querySelector(".BarraProgresoLvl3")){const b=document.createElement("div");b.className="BarraProgresoLvl3";b.innerHTML='<div class="ProgresoInternoLvl3"></div>';box.style.position="relative";box.appendChild(b);}}
function ocultar(e){if(e){e.style.transition="none";e.style.opacity="0";e.style.visibility="hidden";e.style.left="-12%";e.dataset.tocado="0";}}
function lanzar(e,delay=0){if(!e)return;setTimeout(()=>{if(!s.jugando||s.pausado||s.terminado||s.reiniciando)return;e.dataset.tocado="0";e.style.top=Math.max(6,Math.random()*80)+"%";e.style.left="-12%";e.style.transition="none";e.style.opacity="1";e.style.visibility="visible";requestAnimationFrame(()=>{e.style.transition="left 3.3s linear";e.style.left="100%";});},delay);}
function congelarMeteoritos(ids){
  ids.forEach(id=>{
    const e=$(id);
    if(!e||e.dataset.tocado==="1")return;
    e.getAnimations().forEach(a=>a.pause());
  });
}
function reanudarMeteoritos(ids){
  ids.forEach(id=>{
    const e=$(id);
    if(!e||e.dataset.tocado==="1")return;
    e.getAnimations().forEach(a=>a.play());
  });
}
function iniciarMeteoritos(){ids.forEach((id,i)=>{const e=$(id);if(e){ocultar(e);lanzar(e,i*650);}});}
function detener(){ids.forEach(id=>{const e=$(id);if(e)e.dataset.tocado="1";});}
function perderNivel3(m){if(!s.jugando||s.terminado||s.reiniciando)return;s.reiniciando=true;s.pausado=true;s.tiempo=50;s.puntos=0;hud();ids.forEach(id=>ocultar($(id)));play("Perdiste_sound");if(window.Swal)Swal.fire({title:"¡Defensa fallida!",text:m+" La ronda se reiniciará.",icon:"warning",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});setTimeout(()=>{if(s.jugando&&!s.terminado){s.reiniciando=false;s.pausado=false;iniciarMeteoritos();}},900);}
function victoria(){s.terminado=true;s.jugando=false;clearInterval(s.timer);clearInterval(s.impact);detener();ids.forEach(id=>ocultar($(id)));pause("Fondo_Ciberpunk");play("Triunfo");play("Musica_Final");$("Pantalla_Ovnislvl3").style.display="flex";$("Pantalla_Nodrizalvl3").style.display="flex";$("Pantalla_Ovnis2lvl3").style.display="flex";$("Pantalla_creditoslvl3").style.display="block";$("Creditoslvl3").style.display="block";$("Proximolvl3").style.display="block";if(window.Swal)Swal.fire({title:"¡MISIÓN COMPLETADA!",html:"Has destruido los <b>5 meteoritos</b> del Nivel 3.<br><br>La defensa del planeta ha sido completada.",icon:"success",confirmButtonText:"Excelente",background:"#07101c",color:"#fff"});}
function explosionMeteorito(e){
 // Efecto opcional: si una animación falla, el golpe del jugador sigue funcionando.
 let capa=null;
 try{
  if(!e||!document.body)return;
  const r=e.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  capa=document.createElement("div");
  capa.setAttribute("aria-hidden","true");
  capa.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;overflow:hidden;pointer-events:none;z-index:2147483647";
  const flash=document.createElement("div");
  flash.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px;width:24px;height:24px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,#fff 0%,#fff4a3 22%,#ffae2e 48%,#ff4a1c 68%,transparent 75%);box-shadow:0 0 25px 12px rgba(255,150,30,.9)";
  const ring=document.createElement("div");
  ring.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px;width:18px;height:18px;border:4px solid #ffd166;border-radius:50%;transform:translate(-50%,-50%);box-sizing:border-box";
  capa.appendChild(flash);capa.appendChild(ring);
  const parts=[];
  for(let i=0;i<14;i++){
   const a=Math.PI*2*i/14,d=45+(i%3)*18,p=document.createElement("i");
   p.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px;width:7px;height:7px;border-radius:50%;background:"+(i%2?"#ff672f":"#d8a5ff")+";box-shadow:0 0 9px 3px rgba(255,130,40,.8)";
   capa.appendChild(p);parts.push({el:p,endX:x+Math.cos(a)*d,endY:y+Math.sin(a)*d});
  }
  document.body.appendChild(capa);
  try{if(flash.animate)flash.animate([{transform:"translate(-50%,-50%) scale(.2)",opacity:1},{transform:"translate(-50%,-50%) scale(4)",opacity:1,offset:.3},{transform:"translate(-50%,-50%) scale(6)",opacity:0}],{duration:550,fill:"forwards"});}catch(_){}
  try{if(ring.animate)ring.animate([{transform:"translate(-50%,-50%) scale(.2)",opacity:1},{transform:"translate(-50%,-50%) scale(6)",opacity:0}],{duration:650,fill:"forwards"});}catch(_){}
  parts.forEach(v=>{try{if(v.el.animate)v.el.animate([{left:x+"px",top:y+"px",opacity:1},{left:v.endX+"px",top:v.endY+"px",opacity:0}],{duration:650,fill:"forwards"});}catch(_){}});
  window.setTimeout(()=>{if(capa&&capa.parentNode)capa.remove();},800);
 }catch(err){if(capa&&capa.parentNode)capa.remove();console.warn("Efecto de explosión no disponible:",err);}
}
function reiniciar(){cancelarCuenta();clearInterval(s.timer);clearInterval(s.impact);s={tiempo:50,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};hud();ids.forEach(id=>ocultar($(id)));$("Pausa_Pantallalvl3").style.display="none";$("Pantalla_Ovnislvl3").style.display="none";$("Pantalla_Nodrizalvl3").style.display="none";$("Pantalla_Ovnis2lvl3").style.display="none";$("Pantalla_creditoslvl3").style.display="none";$("Creditoslvl3").style.display="none";$("Proximolvl3").style.display="none";$("Startlvl3").style.display="flex";pause("Fondo_Ciberpunk");pause("Musica_Final");}
function cuenta(){if(cuentaActiva)return;const box=$("Contenedor_contadorlvl3"),sp=$("RGBlvl3"),btn=$("Playlvl3");if(!box||!sp)return;cuentaActiva=true;if(btn)btn.disabled=true;let n=3;box.style.display="block";sp.textContent=n;cuentaTimer=setInterval(()=>{n--;sp.textContent=n>0?n:"¡YA!";if(n<=0){clearInterval(cuentaTimer);cuentaTimer=null;cuentaFinal=setTimeout(()=>{if(!cuentaActiva)return;box.style.display="none";cuentaActiva=false;cuentaFinal=null;if(btn)btn.disabled=false;iniciar();},350);}},800);}
window.prepararNivel3=()=>{cancelarCuenta();s={tiempo:50,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impact:null};hud();$("Startlvl3").style.display="flex";$("Pausa_Pantallalvl3").style.display="none";$("Pantalla_Ovnislvl3").style.display="none";$("Pantalla_Nodrizalvl3").style.display="none";$("Pantalla_Ovnis2lvl3").style.display="none";$("Pantalla_creditoslvl3").style.display="none";$("Creditoslvl3").style.display="none";$("Proximolvl3").style.display="none";ids.forEach(id=>ocultar($(id)));};
document.addEventListener("DOMContentLoaded",()=>{barra();hud();ids.forEach(id=>{const e=$(id);if(!e)return;e.addEventListener("pointerdown",()=>golpe(id));e.addEventListener("transitionend",ev=>{if(ev.propertyName==="left"&&s.jugando&&!s.pausado&&!s.terminado&&!s.reiniciando&&e.dataset.tocado!=="1"&&getComputedStyle(e).visibility!=="hidden"&&Number(getComputedStyle(e).opacity)>0){perderNivel3("Un meteorito llegó al final de su recorrido.");}});});$("Playlvl3")?.addEventListener("click",cuenta);$("Pauselvl3")?.addEventListener("click",pausa);$("Reiniciarlvl3")?.addEventListener("click",reiniciar);});
})();