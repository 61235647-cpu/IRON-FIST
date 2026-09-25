/* IRON FIST — Nivel 2 */
(() => {
"use strict";
const $=id=>document.getElementById(id),play=id=>{$(id)?.play().catch(()=>{})},pause=id=>{$(id)?.pause()};
const ids=["Meteioritolvl2","Meteiorito2lvl2","Meteiorito3lvl2"];
let s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};
function hud(){if($("Tiempolvl2"))$("Tiempolvl2").textContent=s.tiempo;if($("Puntajelvl2"))$("Puntajelvl2").textContent=s.puntos+" / 34";const p=$("Puntajelvl2")?.parentElement?.querySelector(".ProgresoInternoLvl2");if(p)p.style.width=(s.puntos/34*100)+"%";}
function barra(){const box=$("Puntajelvl2");if(box&&!box.querySelector(".BarraProgresoLvl2")){const b=document.createElement("div");b.className="BarraProgresoLvl2";b.innerHTML='<div class="ProgresoInternoLvl2"></div>';box.style.position="relative";box.appendChild(b);}}
function ocultar(e){if(e){e.style.transition="none";e.style.left="-15%";e.dataset.tocado="0";}}
function mover(e){if(!e||!s.jugando||s.pausado)return;e.dataset.tocado="0";e.style.transition="left 1.8s linear,top .15s linear";e.style.top=Math.max(6,Math.random()*84)+"%";e.style.left="82%";}
function detener(){ids.forEach(id=>{const e=$(id);if(e){clearInterval(Number(e.dataset.timer));e.dataset.timer="";}});}
function iniciarMeteoritos(){ids.forEach((id,i)=>{const e=$(id);if(!e)return;ocultar(e);setTimeout(()=>mover(e),600+i*350);e.dataset.timer=setInterval(()=>mover(e),1850+i*300);});}
function reiniciar(m){s.tiempo=60;s.puntos=0;hud();ids.forEach(id=>ocultar($(id)));play("Perdiste_sound");if(window.Swal)Swal.fire({title:"¡Defensa fallida!",text:m+" La ronda se reiniciará.",icon:"warning",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});setTimeout(()=>{if(s.jugando&&!s.terminado)iniciarMeteoritos();},700);}
function ganar(){s.terminado=true;s.jugando=false;clearInterval(s.timer);clearInterval(s.impact);detener();ids.forEach(id=>ocultar($(id)));pause("Fondo_Ciberpunk");play("Triunfo");$("GanastePantallaLvL2").style.display="flex";$("NEXT").style.display="block";if(window.Swal)Swal.fire({title:"¡Nivel 2 completado!",text:"Has destruido 34 meteoritos. Continúa con el Nivel 3.",icon:"success",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});}
function golpe(id){if(!s.jugando||s.pausado||s.terminado)return;const e=$(id);if(!e||e.dataset.tocado==="1")return;e.dataset.tocado="1";s.puntos++;hud();play(id===ids[0]?"Puntos_sound":id===ids[1]?"Punto2":"Punto3");ocultar(e);if(s.puntos>=34)ganar();}
function iniciar(){s={tiempo:60,puntos:0,jugando:true,pausado:false,terminado:false,timer:null,impact:null};hud();$("Startlvl2").style.display="none";$("Pausa_Pantallalvl2").style.display="none";$("GanastePantallaLvL2").style.display="none";play("Fondo_Ciberpunk");iniciarMeteoritos();s.timer=setInterval(()=>{if(!s.pausado&&s.jugando){s.tiempo--;hud();if(s.tiempo<=0)reiniciar("Se agotó el tiempo.")}},1000);s.impact=setInterval(()=>{const a=$("NIVEL_02")?.querySelector(".Contenedorlvl2");if(!a||s.pausado)return;const limite=a.getBoundingClientRect().right*.78;ids.forEach(id=>{const e=$(id);if(e&&e.getBoundingClientRect().left>=limite)reiniciar("Un meteorito alcanzó la zona de impacto.");});},120);}
function pausa(){if(!s.jugando||s.terminado)return;s.pausado=!s.pausado;$("Pausa_Pantallalvl2").style.display=s.pausado?"flex":"none";if(s.pausado)pause("Fondo_Ciberpunk");else play("Fondo_Ciberpunk");}
function cuenta(){const box=$("Contenedor_contadorlvl2"),sp=$("RGBlvl2");let n=3;box.style.display="block";sp.textContent=n;const t=setInterval(()=>{n--;sp.textContent=n>0?n:"¡YA!";if(n<=0){clearInterval(t);setTimeout(()=>{box.style.display="none";iniciar();},350);}},800);}
window.nivel2Terminado=()=>s.terminado;
window.prepararNivel2=()=>{s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};hud();$("Startlvl2").style.display="flex";$("GanastePantallaLvL2").style.display="none";ids.forEach(id=>ocultar($(id)));};
window.iniciarNivel2=iniciar;
document.addEventListener("DOMContentLoaded",()=>{barra();hud();ids.forEach(id=>$(id)?.addEventListener("pointerdown",()=>golpe(id)));$("Playlvl2")?.addEventListener("click",cuenta);$("Pauselvl2")?.addEventListener("click",pausa);});
})();