/* IRON FIST — Nivel 2 */
(() => {
"use strict";
const $=id=>document.getElementById(id),play=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.start();return;}const a=$(id);if(a)a.play().catch(()=>{});},pause=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.pause();return;}$(id)?.pause()};
const ids=["Meteioritolvl2","Meteiorito2lvl2","Meteiorito3lvl2"];
let s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};
function hud(){if($("Tiempolvl2"))$("Tiempolvl2").textContent=s.tiempo;if($("Puntajelvl2"))$("Puntajelvl2").textContent=s.puntos+" / 10";const p=$("Puntajelvl2")?.parentElement?.querySelector(".ProgresoInternoLvl2");if(p)p.style.width=(s.puntos/10*100)+"%";}
function barra(){const box=$("Puntajelvl2");if(box&&!box.querySelector(".BarraProgresoLvl2")){const b=document.createElement("div");b.className="BarraProgresoLvl2";b.innerHTML='<div class="ProgresoInternoLvl2"></div>';box.style.position="relative";box.appendChild(b);}}
function ocultar(e){if(e){e.style.transition="none";e.style.left="-12%";e.dataset.tocado="0";}}
function lanzar(e,delay=0){if(!e)return;setTimeout(()=>{if(!s.jugando||s.pausado||s.terminado)return;e.dataset.tocado="0";e.style.top=Math.max(7,Math.random()*78)+"%";e.style.transition="none";e.dataset.progreso="0";animarMeteorito(e,0);},delay);}
function animarMeteorito(e,progresoInicial=0){
  if(!e)return;
  cancelAnimationFrame(e._ironFistFrame);
  const duracion=4.2*1000;
  const inicio=performance.now()-(Math.max(0,Math.min(1,progresoInicial))*duracion);
  function frame(ahora){
    if(!s.jugando||s.terminado)return;
    const progreso=Math.max(0,Math.min(1,(ahora-inicio)/duracion));
    if(!s.pausado){
      e.dataset.progreso=String(progreso);
      e.style.left=(-12+90*progreso)+"%";
    }
    if(progreso<1)e._ironFistFrame=requestAnimationFrame(frame);
  }
  e._ironFistFrame=requestAnimationFrame(frame);
}

function congelarMeteoritos(ids){
  ids.forEach(id=>{
    const e=$(id);
    if(!e||e.dataset.tocado==="1")return;
    cancelAnimationFrame(e._ironFistFrame);
    const left=e.getBoundingClientRect().left;
    const parent=e.parentElement?.getBoundingClientRect();
    if(!parent)return;
    const progreso=Math.max(0,Math.min(1,(left-parent.left)/(parent.width||1)));
    e.dataset.progreso=String(progreso);
    e.style.transition="none";
    e.style.left=(-12+90*progreso)+"%";
  });
}
function reanudarMeteoritos(ids){
  ids.forEach(id=>{
    const e=$(id);
    if(!e||e.dataset.tocado==="1")return;
    animarMeteorito(e,parseFloat(e.dataset.progreso||"0"));
  });
}
function iniciarMeteoritos(){ids.forEach((id,i)=>{const e=$(id);if(e){ocultar(e);lanzar(e,i*850);}});}
function detener(){ids.forEach(id=>{const e=$(id);if(e)e.dataset.tocado="1";});}
function reiniciar(m){s.tiempo=60;s.puntos=0;hud();ids.forEach(id=>ocultar($(id)));play("Perdiste_sound");if(window.Swal)Swal.fire({title:"¡Defensa fallida!",text:m+" La ronda se reiniciará.",icon:"warning",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});setTimeout(()=>{if(s.jugando&&!s.terminado)iniciarMeteoritos();},900);}
function ganar(){s.terminado=true;s.jugando=false;clearInterval(s.timer);clearInterval(s.impact);detener();ids.forEach(id=>ocultar($(id)));pause("Fondo_Ciberpunk");play("Triunfo");$("GanastePantallaLvL2").style.display="flex";$("NEXT").style.display="block";if(window.Swal)Swal.fire({title:"¡Nivel 2 completado!",text:"Has destruido 10 meteoritos. Continúa con el Nivel 3.",icon:"success",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});}
function golpe(id){if(!s.jugando||s.pausado||s.terminado)return;const e=$(id);if(!e||e.dataset.tocado==="1")return;e.dataset.tocado="1";s.puntos++;hud();play(id===ids[0]?"Puntos_sound":id===ids[1]?"Punto2":"Punto3");ocultar(e);setTimeout(()=>{if(s.jugando&&!s.terminado)lanzar(e);},450);if(s.puntos>=10)ganar();}
function iniciar(){s={tiempo:60,puntos:0,jugando:true,pausado:false,terminado:false,timer:null,impact:null};hud();$("Startlvl2").style.display="none";$("Pausa_Pantallalvl2").style.display="none";$("GanastePantallaLvL2").style.display="none";play("Fondo_Ciberpunk");iniciarMeteoritos();s.timer=setInterval(()=>{if(!s.pausado&&s.jugando){s.tiempo--;hud();if(s.tiempo<=0)reiniciar("Se agotó el tiempo.")}},1000);s.impact=setInterval(()=>{const a=$("NIVEL_02")?.querySelector(".Contenedorlvl2");if(!a||s.pausado)return;const limite=a.getBoundingClientRect().right*.79;ids.forEach(id=>{const e=$(id);if(e&&e.dataset.tocado!=="1"&&e.getBoundingClientRect().left>=limite)reiniciar("Un meteorito alcanzó la zona de impacto.");});},150);}
function pausa(){if(!s.jugando||s.terminado)return;s.pausado=!s.pausado;$("Pausa_Pantallalvl2").style.display=s.pausado?"flex":"none";if(s.pausado){congelarMeteoritos(ids);pause("Fondo_Ciberpunk");}else{reanudarMeteoritos(ids);play("Fondo_Ciberpunk");}}
function reiniciar(){clearInterval(s.timer);clearInterval(s.impact);s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};hud();ids.forEach(id=>ocultar($(id)));$("Pausa_Pantallalvl2").style.display="none";$("GanastePantallaLvL2").style.display="none";$("Startlvl2").style.display="flex";pause("Fondo_Ciberpunk");}
function cuenta(){const box=$("Contenedor_contadorlvl2"),sp=$("RGBlvl2");let n=3;box.style.display="block";sp.textContent=n;const t=setInterval(()=>{n--;sp.textContent=n>0?n:"¡YA!";if(n<=0){clearInterval(t);setTimeout(()=>{box.style.display="none";iniciar();},350);}},800);}
window.nivel2Terminado=()=>s.terminado;
window.prepararNivel2=()=>{s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};hud();$("Startlvl2").style.display="flex";$("GanastePantallaLvL2").style.display="none";ids.forEach(id=>ocultar($(id)));};
document.addEventListener("DOMContentLoaded",()=>{barra();hud();ids.forEach(id=>$(id)?.addEventListener("pointerdown",()=>golpe(id)));$("Playlvl2")?.addEventListener("click",cuenta);$("Pauselvl2")?.addEventListener("click",pausa);$("Reiniciarlvl2")?.addEventListener("click",reiniciar);});
})();