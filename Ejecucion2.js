/* IRON FIST — Nivel 2: DOMINIO GALÁCTICO
   10 meteoritos, 3 vidas. Aparecen cometas rápidos, meteoritos en onda,
   diagonales y blindados que necesitan 2 impactos. */
(() => {
"use strict";
const IF = window.IronFist;
let nivel2 = null;

function inicializarNivel2() {
  nivel2 = IF.crearNivelMeteoritos({
    raiz: "NIVEL_02", contenedor: ".Contenedorlvl2", limite: ".Limitelvl2", planeta: ".Planetalvl2", clase: "Meteioritolvl2",
    ids: { tiempo: "Tiempolvl2", puntaje: "Puntajelvl2", pausa: "Pauselvl2", reiniciar: "Reiniciarlvl2", inicio: "Startlvl2", pausaPantalla: "Pausa_Pantallalvl2", gana: "GanastePantallaLvL2" },
    barra: ["BarraProgresoLvl2", "ProgresoInternoLvl2"],
    objetivo: 10, tiempo: 34, vidas: 3, yMin: 6, yMax: 80, factorRapido: 1.35,
    sonidos: ["Puntos_sound", "Punto2", "Punto3", "Punto4"],
    velocidad: p => IF.lerp(38, 50, p),
    maxSim: p => Math.round(IF.lerp(4, 6, p)),
    intervalo: p => IF.lerp(0.8, 0.45, p),
    elegirTipo: (p, s) => {
      if (s.spawns < 2) return "normal";
      const r = Math.random();
      if (r < 0.14) return "blindado";
      if (r < 0.34) return "rapido";
      if (r < 0.58) return "onda";
      if (r < 0.78) return "diagonal";
      return "normal";
    },
    textos: { ganaTitulo: "¡Nivel 2 completado!", ganaTexto: "Has destruido los 10 meteoritos. Prepárate para el jefe final del Nivel 3." }
  });
}

window.iniciarNivel2 = () => nivel2 && nivel2.iniciar();
window.jugarNivel2 = window.iniciarNivel2;
window.nivel2Terminado = () => !!nivel2 && nivel2.terminado();
window.prepararNivel2 = () => nivel2 && nivel2.reiniciar();

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inicializarNivel2, { once: true });
else inicializarNivel2();
})();
