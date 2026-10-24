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

/* ---------- NIVEL 1: UMBRAL ESTELAR ---------- */
let nivel1=null;
function inicializarNivel1(){
  configurarNarracion();
  const IF=window.IronFist;
  const nx=$("NEXT");if(nx){nx.style.display="none";nx.style.pointerEvents="none";nx.setAttribute("aria-hidden","true");}
  nivel1=IF.crearNivelMeteoritos({
    raiz:"NIVEL_01",contenedor:".Contenedor",limite:".Limite",planeta:".Planeta",clase:"Meteiorito",
    ids:{tiempo:"Tiempo",puntaje:"Puntaje",pausa:"Pause",reiniciar:"Reiniciar",inicio:"Start",pausaPantalla:"Pausa_Pantalla",gana:"GANASTE_PANTALLA"},
    barra:["BarraProgresoLvl1","ProgresoInternoLvl1"],
    objetivo:10,tiempo:40,vidas:3,yMin:6,yMax:80,
    sonidos:["Puntos_sound","Punto2","Punto3","Punto4"],
    velocidad:p=>IF.lerp(30,42,p),
    maxSim:p=>Math.round(IF.lerp(3,5,p)),
    intervalo:p=>IF.lerp(1.0,0.6,p),
    elegirTipo:(p,s)=>{
      if(s.spawns<3)return"normal";
      const r=Math.random();
      if(p>=0.6&&r<0.30)return"blindado";
      if(p>=0.3&&r<0.30)return"rapido";
      return"normal";
    },
    textos:{ganaTitulo:"¡Nivel 1 completado!",ganaTexto:"Has destruido los 10 meteoritos. Continúa con el Nivel 2."}
  });
}
window.iniciarNivel1=()=>nivel1&&nivel1.iniciar();
window.jugarNivel1=window.iniciarNivel1;
window.nivel1Terminado=()=>!!nivel1&&nivel1.terminado();
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
