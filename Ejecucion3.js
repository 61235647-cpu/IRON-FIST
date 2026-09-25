/* IRON FIST — Nivel 3 */
(() => {
"use strict";
const $=id=>document.getElementById(id),play=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.start();return;}const a=$(id);if(a)a.play().catch(()=>{});},pause=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.pause();return;}$(id)?.pause()};
const ids=["Meteoritolvl3","Meteorito2lvl3","Meteorito3lvl3","Meteorito4lvl3"];
let s={tiempo:50,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};
function hud(){if($("Tiempolvl3"))$("Tiempolvl3").textContent=s.tiempo;if($("Puntajelvl3"))$("Puntajelvl3").textContent=s.puntos+" / 5";const p=$("Puntajelvl3")?.parentElement?.querySelector(".ProgresoInternoLvl3");if(p)p.style.width=(s.puntos/5*100)+"%";}
function barra(){const box=$("Puntajelvl3");if(box&&!box.querySelector(".BarraProgresoLvl3")){const b=document.createElement("div");b.className="BarraProgresoLvl3";b.innerHTML='<div class="ProgresoInternoLvl3"></div>';box.style.position="relative";box.appendChild(b);}}
function ocultar(e){if(e){e.style.transition="none";e.style.left="-12%";e.dataset.tocado="0";}}
function lanzar(e,delay=0){if(!e)return;setTimeout(()=>{if(!s.jugando||s.pausado||s.terminado)return;e.dataset.tocado="0";e.style.top=Math.max(6,Math.random()*80)+"%";e.style.left="-12%";e.style.transition="left 3.3s linear";requestAnimationFrame(()=>e.style.left="78%");},delay);}

function congelarMeteoritos(ids){
  ids.forEach(id=>{
    const e=$(id);
    if(!e||e.dataset.tocado==="1")return;
    const left=e.getBoundingClientRect().left;
    const parent=e.parentElement?.getBoundingClientRect();
    if(!parent)return;
    const relative=left-parent.left;
    e.style.transition="none";
    e.style.left=relative+"px";
    void e.offsetWidth;
    e.dataset.pausadoLeft=relative+"px";
  });
})();