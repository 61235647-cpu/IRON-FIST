/* IRON FIST — Nivel 3: TRONO DEL COSMOS (jefe final)
   La Nodriza lanza meteoritos desde la izquierda y carga RAYOS LÁSER contra la Tierra.
   - Cada meteorito destruido rompe un trozo de su escudo (10 en total).
   - Mientras carga un láser, haz clic sobre la Nodriza para interrumpirlo (+3s y la aturdes).
   - Si el láser se dispara, la Tierra pierde una vida.
   - Al llegar a la mitad del escudo, la Nodriza se enfurece: carga más rápido y ataca más seguido. */
(() => {
"use strict";
const IF = window.IronFist, $ = IF.$, rand = IF.rand;
const OBJETIVO = 10;
const cont = $("NIVEL3").querySelector(".Contenedorlvl3");
let nivel3 = null, apiRef = null;

const timers = [];
const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
const limpiarTimers = () => { timers.forEach(clearTimeout); timers.length = 0; };

/* ---------- Elementos del jefe ---------- */
function crear(clase, html) {
  const d = document.createElement("div");
  d.className = clase; d.style.display = "none";
  if (html) d.innerHTML = html;
  cont.appendChild(d);
  return d;
}
const telegrafo = crear("Jefe_telegrafo");
const rayo = crear("Jefe_rayo");
const jefe = crear("Jefe", '<img src="IMG/nodriza.svg" alt="Nodriza" draggable="false"><span class="Jefe_alerta">¡CLIC PARA INTERRUMPIR!</span>');
const hp = crear("Jefe_hp", "<span>NODRIZA · ESCUDO</span><div><i></i></div>");
jefe.id = "Jefe_lvl3";

const j = { estado: "idle", t: 0, y: 50, lane: 50, cd: 3.6, carga: 0, cargaMax: 1.7, fuego: 0, stun: 0, furia: false, bip: 0 };

function mostrarJefe(v) {
  const d = v ? "" : "none";
  jefe.style.display = d; hp.style.display = v ? "block" : "none";
  telegrafo.style.display = d; rayo.style.display = d;
}
function resetJefe() {
  Object.assign(j, { estado: "idle", t: 0, y: 50, lane: 50, cd: 3.6, carga: 0, fuego: 0, stun: 0, furia: false, bip: 0 });
  jefe.classList.remove("cargando", "aturdido", "furia", "muriendo", "golpeado");
  telegrafo.classList.remove("on"); rayo.classList.remove("on");
  hp.querySelector("i").style.width = "100%";
  jefe.style.top = j.y + "%";
}
function centroJefe() {
  const r = jefe.getBoundingClientRect(), c = cont.getBoundingClientRect();
  return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
}

/* ---------- Ataque láser ---------- */
function cargar(api) {
  j.estado = "cargando";
  j.cargaMax = j.furia ? 1.2 : 1.7;
  j.carga = j.cargaMax; j.lane = j.y; j.bip = 0;
  jefe.classList.add("cargando");
  telegrafo.style.top = j.lane + "%"; telegrafo.classList.add("on");
  api.sfx.alarma();
  api.fx.texto(cont, cont.clientWidth * 0.5, cont.clientHeight * (j.lane / 100) - 26, "⚠ LÁSER CARGANDO", "#ff6b8b");
}
function disparar(api) {
  j.estado = "disparando"; j.fuego = 0.6;
  jefe.classList.remove("cargando");
  telegrafo.classList.remove("on");
  rayo.style.top = j.lane + "%"; rayo.classList.add("on");
  api.sfx.rayo(); api.fx.temblor(cont);
  api.fx.explosion(cont, cont.clientWidth * 0.9, cont.clientHeight * (j.lane / 100), { color: "#ff4d8d", n: 16, escala: 1.5 });
  api.perderVida("¡El rayo láser de la Nodriza impactó la Tierra!");
}
function interrumpir(api) {
  j.estado = "aturdido"; j.stun = 2.4;
  jefe.classList.remove("cargando"); jefe.classList.add("aturdido");
  telegrafo.classList.remove("on");
  api.s.tiempo += 3;
  const c = centroJefe();
  api.fx.explosion(cont, c.x, c.y, { color: "#7ee8ff", n: 18, escala: 1.4 });
  api.fx.texto(cont, c.x + 60, c.y - 40, "¡INTERRUMPIDO! +3s", "#7ee8ff");
  api.sfx.combo(); api.sfx.boom(); api.play("Punto3");
}
jefe.addEventListener("pointerdown", ev => {
  ev.preventDefault();
  if (j.estado === "cargando" && apiRef && apiRef.activo()) interrumpir(apiRef);
});

function alFrame(dt, api) {
  const s = api.s;
  j.t += dt;
  if (!j.furia && s.puntos >= OBJETIVO / 2) {
    j.furia = true; jefe.classList.add("furia");
    api.fx.texto(cont, cont.clientWidth * 0.5, cont.clientHeight * 0.5, "¡LA NODRIZA SE ENFURECE!", "#ff7ef0");
    api.fx.destello(cont, "rgba(190,60,255,.35)"); api.sfx.alarma();
  }
  switch (j.estado) {
    case "idle":
      j.y = 50 + Math.sin(j.t * (j.furia ? 1.15 : 0.8)) * 30;
      j.cd -= dt;
      if (j.cd <= 0) cargar(api);
      break;
    case "cargando":
      j.carga -= dt; j.bip -= dt;
      if (j.bip <= 0) { api.sfx.alarma(); j.bip = 0.28; }
      if (j.carga <= 0) disparar(api);
      break;
    case "disparando":
      j.fuego -= dt;
      if (j.fuego <= 0) { rayo.classList.remove("on"); j.estado = "idle"; j.cd = j.furia ? rand(2.2, 3.2) : rand(3.4, 4.8); }
      break;
    case "aturdido":
      j.stun -= dt;
      if (j.stun <= 0) { jefe.classList.remove("aturdido"); j.estado = "idle"; j.cd = rand(1.8, 2.6); }
      break;
  }
  jefe.style.top = j.y + "%";
}

function alDestruir(m, api) {
  const falta = Math.max(0, OBJETIVO - api.s.puntos);
  hp.querySelector("i").style.width = (falta / OBJETIVO * 100) + "%";
  jefe.classList.add("golpeado");
  later(() => jefe.classList.remove("golpeado"), 220);
}

/* ---------- Ciclo del nivel ---------- */
function ocultarFinal() {
  ["Pantalla_Ovnislvl3", "Pantalla_Nodrizalvl3", "Pantalla_Ovnis2lvl3", "Pantalla_creditoslvl3", "Creditoslvl3", "Proximolvl3"]
    .forEach(id => { const e = $(id); if (e) e.style.display = "none"; });
  IF.pause("Musica_Final");
  const x = $("Extra_titan"); if (x) x.style.display = "none";
}
function alIniciar(api) {
  apiRef = api;
  limpiarTimers(); ocultarFinal();
  resetJefe(); mostrarJefe(true);
  jefe.style.pointerEvents = "";
}
function alLimpiar(api) {
  apiRef = api;
  limpiarTimers(); ocultarFinal();
  resetJefe(); mostrarJefe(false);
}
function mostrarCreditos(api) {
  ["Pantalla_Ovnislvl3", "Pantalla_Nodrizalvl3", "Pantalla_Ovnis2lvl3"].forEach(id => { const e = $(id); if (e) e.style.display = "flex"; });
  $("Pantalla_creditoslvl3").style.display = "block";
  $("Creditoslvl3").style.display = "block";
  $("Proximolvl3").style.display = "block";
  const x = $("Extra_titan"); if (x) x.style.display = "block";
  api.play("Musica_Final");
  api.avisar({
    title: "¡MISIÓN COMPLETADA!",
    html: "Has destruido los <b>10 meteoritos</b> y derrotado a la <b>Nodriza</b>.<br><br>La defensa del planeta ha sido completada.",
    icon: "success", confirmButtonText: "Excelente"
  });
}
function alGanar(api) {
  limpiarTimers();
  telegrafo.classList.remove("on"); rayo.classList.remove("on");
  jefe.classList.remove("cargando", "aturdido", "golpeado");
  jefe.classList.add("muriendo");
  api.play("Triunfo");
  for (let i = 0; i < 9; i++) {
    later(() => {
      const r = jefe.getBoundingClientRect(), c = cont.getBoundingClientRect();
      api.fx.explosion(cont, r.left - c.left + rand(0, r.width), r.top - c.top + rand(0, r.height), { color: i % 2 ? "#ff7ef0" : "#ffd43b", n: 12, escala: 1.3 });
      api.sfx.boom(); api.fx.temblor(cont);
    }, i * 210);
  }
  later(() => { mostrarJefe(false); mostrarCreditos(api); }, 2200);
}

function inicializarNivel3() {
  nivel3 = IF.crearNivelMeteoritos({
    raiz: "NIVEL3", contenedor: ".Contenedorlvl3", limite: ".Limitelvl3", planeta: ".Planetalvl3", clase: "Meteoritolvl3",
    ids: { tiempo: "Tiempolvl3", puntaje: "Puntajelvl3", pausa: "Pauselvl3", reiniciar: "Reiniciarlvl3", inicio: "Startlvl3", pausaPantalla: "Pausa_Pantallalvl3", gana: "Pantalla_creditoslvl3" },
    barra: ["BarraProgresoLvl3", "ProgresoInternoLvl3"],
    objetivo: OBJETIVO, tiempo: 50, vidas: 3, yMin: 8, yMax: 80, factorRapido: 1.3,
    sonidos: ["Puntos_sound", "Punto2", "Punto3", "Punto4"],
    velocidad: p => IF.lerp(38, 50, p),
    maxSim: p => Math.round(IF.lerp(4, 6, p)),
    intervalo: p => IF.lerp(0.75, 0.42, p),
    elegirTipo: (p, s) => {
      if (s.spawns < 2) return "normal";
      const r = Math.random();
      if (r < 0.16) return "blindado";
      if (r < 0.36) return "rapido";
      if (r < 0.58) return "onda";
      if (r < 0.76) return "diagonal";
      return "normal";
    },
    origen: () => ({ x: 12, y: j.y - 4 + rand(-6, 6) }),
    alIniciar, alLimpiar, alFrame, alDestruir, alGanar,
    textos: {}
  });
}

window.iniciarNivel3 = () => nivel3 && nivel3.iniciar();
window.jugarNivel3 = window.iniciarNivel3;
window.prepararNivel3 = () => nivel3 && nivel3.reiniciar();

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inicializarNivel3, { once: true });
else inicializarNivel3();
})();
