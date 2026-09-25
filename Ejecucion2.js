/* IRON FIST — Nivel 2 */
(() => {
"use strict";
const $=id=>document.getElementById(id),play=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.start();return;}const a=$(id);if(a)a.play().catch(()=>{});},pause=id=>{if(id==="Fondo_Ciberpunk"){window.ironFistSpaceMusic?.pause();return;}$(id)?.pause()};
const ids=["Meteioritolvl2","Meteiorito2lvl2","Meteiorito3lvl2"];
let s={tiempo:60,puntos:0,jugando:false,pausado:false,terminado:false,timer:null,impact:null};
function hud(){if($("Tiempolvl2"))$("Tiempolvl2").textContent=s.tiempo;if($("Puntajelvl2"))$("Puntajelvl2").textContent=s.puntos+" / 10";const p=$("Puntajelvl2")?.parentElement?.querySelector(".ProgresoInternoLvl2");if(p)p.style.width=(s.puntos/10*100)+"%";}
function barra(){const box=$("Puntajelvl2");if(box&&!box.querySelector(".BarraProgresoLvl2")){const b=document.createElement("div");b.className="BarraProgresoLvl2";b.innerHTML='<div class="ProgresoInternoLvl2"></div>';box.style.position="relative";box.appendChild(b);}}
function ocultar(e){if(e){e.style.transition="none";e.style.left="-12%";e.dataset.tocado="0";}}
function lanzar(e,delay=0){if(!e)return;setTimeout(()=>{if(!s.jugando||s.pausado||s.terminado)return;e.dataset.tocado="0";e.style.top=Math.max(7,Math.random()*78)+"%";e.style.left="-12%";e.style.transition="left 4.2s linear";requestAnimationFrame(()=>e.style.left="78%");},delay);}

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