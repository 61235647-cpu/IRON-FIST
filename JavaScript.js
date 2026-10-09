/* IRON FIST — controlador general y Nivel 1 */
(() => {
"use strict";
const $=id=>document.getElementById(id);
const spaceMusic=(()=>{
  let ctx=null, master=null, timer=null, step=0, running=false;
  const notes=[220,277.18,329.63,293.66,246.94,329.63,369.99,293.66,220,246.94,293.66,369.99,329.63,277.18,246.94,196];
  function tone(freq,dur,when,type="sawtooth",gain=0.035){
    if(!ctx||!master)return;
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(0.0001,when);
    g.gain.exponentialRampToValueAtTime(gain,when+0.025);
    g.gain.exponentialRampToValueAtTime(0.0001,when+dur);
    o.connect(g); g.connect(master); o.start(when); o.stop(when+dur+0.03);
  }
  function beat(){
    if(!running||!ctx)return;
    const now=ctx.currentTime, n=notes[step%notes.length];
    tone(n,0.42,now,"sawtooth",0.028);
    tone(n/2,0.55,now,"triangle",0.018);
    if(step%4===0) tone(n*2,0.16,now,"square",0.012);
    step++;
    timer=setTimeout(beat,420);
  }
  return {
    start(){
      if(running)return;
      const A=window.AudioContext||window.webkitAudioContext;
      if(!A)return;
      if(!ctx){ctx=new A();master=ctx.createGain();master.gain.value=0.55;master.connect(ctx.destination);}
      ctx.resume(); running=true; step=0; beat();
    },
    pause(){running=false;if(timer)clearTimeout(timer);if(ctx)ctx.suspend().catch(()=>{});},
    stop(){running=false;if(timer)clearTimeout(timer);if(ctx)ctx.suspend().catch(()=>{});}
  };
})();
window.ironFistSpaceMusic=spaceMusic;
const play=id=>{
  if(id==="Fondo_Ciberpunk"){spaceMusic.start();return;}
  const a=$(id);if(a)a.play().catch(()=>{});
};
const pause=id=>{
  if(id==="Fondo_Ciberpunk"){spaceMusic.pause();return;}
  const a=$(id);if(a)a.pause();
};
window.Mover=()=>{$("Seccion_01").style.display="none";$("Reglas").style.display="grid";};
window.Mover_2=()=>{$("Reglas").style.display="none";$("Seccion_2").style.display="block";};
window.Mover_3=()=>{$("Seccion_2").style.display="none";$("Seccion_Juego").style.display="flex";$("NIVEL_01").style.display="flex";$("NIVEL_02").style.display="none";$("NIVEL3").style.display="none";};
window.Graficos_fondo=()=>{const r=$("Recursos"),b=$("Fondo");if(!r||!b)return;const on=r.dataset.on!=="1";r.dataset.on=on?"1":"0";r.style.marginLeft=on?"38px":"1px";b.style.backgroundImage=on?'url("IMG/Fondo_Espacio2.svg")':'url("IMG/Fondo_Espacio.svg")';};
function configurarNarracion(){const c=$("Contenedor_narracion");if(!c)return;c.addEventListener("click",()=>{const a=$("narracion");if(!a)return;const activo=!a.paused;if(activo){a.pause();$("VOLUMEN").style.display="inline";$("PAUSE").style.display="none";}else{a.play().catch(()=>{});$("VOLUMEN").style.display="none";$("PAUSE").style.display="inline";}});}
function barra(id,clase,interno){const box=$(id);if(!box||box.querySelector("."+clase))return;const b=document.createElement("div");b.className=clase;b.innerHTML='<div class="'+interno+'"></div>';box.style.position="relative";box.appendChild(b);}
let estado={tiempo:70,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impactTimer:null};
let cuentaTimer=null,cuentaFinal=null,cuentaActiva=false;
function cancelarCuenta(){if(cuentaTimer)clearInterval(cuentaTimer);if(cuentaFinal)clearTimeout(cuentaFinal);cuentaTimer=null;cuentaFinal=null;cuentaActiva=false;const box=$("Contenedor_contador");if(box)box.style.display="none";const btn=$("Play");if(btn)btn.disabled=false;}
const meteoritos=["Meteiorito","Meteiorito2","Meteiorito3","Meteiorito4","Meteiorito5"];
function actualizarHUD(){if($("Tiempo"))$("Tiempo").textContent=estado.tiempo;if($("Puntaje"))$("Puntaje").textContent=estado.puntos+" / 5";const p=$("Puntaje")?.parentElement?.querySelector(".ProgresoInternoLvl1");if(p)p.style.width=(estado.puntos/5*100)+"%";}
function area(){return $("NIVEL_01")?.querySelector(".Contenedor");}
function ocultar(e){if(e){e.style.transition="none";e.style.opacity="0";e.style.visibility="hidden";e.style.left="-12%";e.dataset.tocado="0";}}
function lanzar(e,delay=0){if(!e)return;setTimeout(()=>{if(!estado.jugando||estado.pausado||estado.terminado||estado.reiniciando)return;e.dataset.tocado="0";e.style.top=Math.max(7,Math.random()*78)+"%";e.style.left="-12%";e.style.transition="none";e.style.opacity="1";e.style.visibility="visible";requestAnimationFrame(()=>{e.style.transition="left 5.2s linear";e.style.left="100%";});},delay);}
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
function iniciarMeteoritos(){meteoritos.forEach((id,i)=>{const e=$(id);if(!e)return;ocultar(e);lanzar(e,i*1200);});}
function detenerMeteoritos(){meteoritos.forEach(id=>{const e=$(id);if(e)e.dataset.tocado="1";});}
function perderNivel1(mensaje){if(!estado.jugando||estado.terminado||estado.reiniciando)return;estado.reiniciando=true;estado.tiempo=70;estado.puntos=0;actualizarHUD();meteoritos.forEach(id=>ocultar($(id)));play("Perdiste_sound");if(window.Swal)Swal.fire({title:"¡Defensa fallida!",text:mensaje+" La ronda se reiniciará.",icon:"warning",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});setTimeout(()=>{if(estado.jugando&&!estado.terminado){estado.reiniciando=false;iniciarMeteoritos();}},900);}
function ganarNivel1(){estado.terminado=true;estado.jugando=false;clearInterval(estado.timer);clearInterval(estado.impactTimer);detenerMeteoritos();meteoritos.forEach(id=>ocultar($(id)));pause("Fondo_Ciberpunk");play("Triunfo");$("GANASTE_PANTALLA").style.display="flex";$("NEXT").style.display="block";$("NEXT").style.pointerEvents="auto";$("NEXT").setAttribute("aria-hidden","false");if(window.Swal)Swal.fire({title:"¡Nivel 1 completado!",text:"Has destruido 15 meteoritos. Continúa con el Nivel 2.",icon:"success",confirmButtonText:"Continuar",background:"#07101c",color:"#fff"});}
function golpear(id){if(!estado.jugando||estado.pausado||estado.terminado||estado.reiniciando)return;const e=$(id);if(!e||e.dataset.tocado==="1")return;e.dataset.tocado="1";estado.puntos++;actualizarHUD();play(id==="Meteiorito"?"Puntos_sound":"Punto2");ocultar(e);setTimeout(()=>{if(estado.jugando&&!estado.terminado)lanzar(e);},450);if(estado.puntos>=5)ganarNivel1();}
function iniciarNivel1(){estado={tiempo:70,puntos:0,jugando:true,pausado:false,terminado:false,timer:null,impactTimer:null};actualizarHUD();$("Start").style.display="none";$("Pausa_Pantalla").style.display="none";$("GANASTE_PANTALLA").style.display="none";play("Fondo_Ciberpunk");iniciarMeteoritos();estado.timer=setInterval(()=>{if(!estado.pausado&&estado.jugando&&!estado.reiniciando){estado.tiempo--;actualizarHUD();if(estado.tiempo<=0)perderNivel1("Se agotó el tiempo.")}},1000);estado.impactTimer=setInterval(()=>{if(estado.pausado||estado.reiniciando||!estado.jugando||estado.terminado)return;const linea=$("NIVEL_01")?.querySelector(".Limite");if(!linea)return;const x=linea.getBoundingClientRect().left;for(const id of meteoritos){const e=$(id);if(!e||e.dataset.tocado==="1"||getComputedStyle(e).visibility==="hidden"||Number(getComputedStyle(e).opacity)===0)continue;const r=e.getBoundingClientRect();if(r.left+r.width*0.5>=x){perderNivel1("Un meteorito llegó a la línea de impacto.");return;}}},40);}
function pausarNivel1(){if(!estado.jugando||estado.terminado)return;estado.pausado=!estado.pausado;$("Pausa_Pantalla").style.display=estado.pausado?"flex":"none";if(estado.pausado){congelarMeteoritos(meteoritos);pause("Fondo_Ciberpunk");}else{reanudarMeteoritos(meteoritos);play("Fondo_Ciberpunk");}}
function reiniciarNivel1(){cancelarCuenta();clearInterval(estado.timer);clearInterval(estado.impactTimer);estado={tiempo:70,puntos:0,jugando:false,pausado:false,terminado:false,reiniciando:false,timer:null,impactTimer:null};meteoritos.forEach(id=>ocultar($(id)));actualizarHUD();$("Pausa_Pantalla").style.display="none";$("GANASTE_PANTALLA").style.display="none";$("Start").style.display="flex";pause("Fondo_Ciberpunk");}
function cuenta(id,callback){if(cuentaActiva)return;const box=$(id),sp=box?.querySelector("span");if(!box||!sp){callback();return;}cuentaActiva=true;const btn=$("Play");if(btn)btn.disabled=true;box.style.display="block";let n=3;sp.textContent=n;cuentaTimer=setInterval(()=>{n--;sp.textContent=n>0?n:"¡YA!";if(n<=0){clearInterval(cuentaTimer);cuentaTimer=null;cuentaFinal=setTimeout(()=>{if(!cuentaActiva)return;box.style.display="none";cuentaActiva=false;cuentaFinal=null;if(btn)btn.disabled=false;callback();},350);}},800);}
function conectar(id){const e=$(id);if(!e)return;e.addEventListener("pointerdown",()=>golpear(id));e.addEventListener("transitionend",ev=>{if(ev.propertyName==="left"&&estado.jugando&&!estado.pausado&&!estado.terminado&&!estado.reiniciando&&e.dataset.tocado!=="1"&&getComputedStyle(e).visibility!=="hidden"&&Number(getComputedStyle(e).opacity)>0){perderNivel1("Un meteorito llegó al final de su recorrido.");}});}
function configurar(){barra("Puntaje","BarraProgresoLvl1","ProgresoInternoLvl1");$("Pause")?.addEventListener("click",pausarNivel1);$("Reiniciar")?.addEventListener("click",reiniciarNivel1);meteoritos.forEach(conectar);$("NEXT").style.display="none";$("NEXT").style.pointerEvents="none";$("NEXT").setAttribute("aria-hidden","true");actualizarHUD();}
window.iniciarNivel1=()=>{cancelarCuenta();iniciarNivel1();};
window.jugarNivel1=()=>cuenta("Contenedor_contador",iniciarNivel1);
window.nivel1Terminado=()=>estado.terminado;
function inicializarNivel1(){configurarNarracion();configurar();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",inicializarNivel1,{once:true});else inicializarNivel1();
})();
/* Navegación única y segura entre niveles */
function avanzarNivelSeguro(){
 const a=document.getElementById("NIVEL_01"),b=document.getElementById("NIVEL_02"),c=document.getElementById("NIVEL3"),n=document.getElementById("NEXT");
 if(!a||!b||!c||!n)return;
 if(a.style.display!=="none" && window.nivel1Terminado?.()){
  a.style.display="none";b.style.display="flex";c.style.display="none";
  n.style.display="none";n.style.pointerEvents="none";
  window.prepararNivel2?.();return;
 }
 if(b.style.display!=="none" && window.nivel2Terminado?.()){
  b.style.display="none";c.style.display="flex";
  n.style.display="none";n.style.pointerEvents="none";
  window.prepararNivel3?.();
 }
}
window.avanzarNivelSeguro=avanzarNivelSeguro;
document.addEventListener("DOMContentLoaded",()=>{
 const n=document.getElementById("NEXT");
 if(!n)return;
 // Sacamos el botón de cualquier contenedor que pueda bloquear sus clics.
 if(n.parentElement!==document.body)document.body.appendChild(n);
 n.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();avanzarNivelSeguro();});
 n.addEventListener("pointerup",(e)=>{e.preventDefault();e.stopPropagation();});
});
