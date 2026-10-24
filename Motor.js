/* IRON FIST — Motor compartido: efectos, sonido y niveles de meteoritos.
   Lo usan el Nivel 1, el Nivel 2 y el Nivel 3 (jefe final). */
(() => {
"use strict";

const $ = id => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);

/* ---------- Audio ---------- */
const play = id => {
  if (id === "Fondo_Ciberpunk") { window.ironFistSpaceMusic?.start(); return; }
  const a = $(id);
  if (a) { try { a.currentTime = 0; } catch (e) {} a.play().catch(() => {}); }
};
const pause = id => {
  if (id === "Fondo_Ciberpunk") { window.ironFistSpaceMusic?.pause(); return; }
  $(id)?.pause();
};

let actx = null;
function ctx() {
  if (!actx) {
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    actx = new A();
  }
  if (actx.state === "suspended") actx.resume().catch(() => {});
  return actx;
}
function tono(f0, f1, dur, tipo, vol) {
  const c = ctx();
  if (!c) return;
  const t = c.currentTime, o = c.createOscillator(), g = c.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + dur + 0.02);
}
const sfx = {
  laser()  { tono(1500, 280, 0.15, "square", 0.02); },
  boom()   { tono(190, 40, 0.3, "sawtooth", 0.05); },
  vida()   { tono(320, 60, 0.5, "sawtooth", 0.06); },
  alarma() { tono(560, 560, 0.1, "square", 0.025); },
  rayo()   { tono(95, 45, 0.55, "sawtooth", 0.07); tono(1000, 180, 0.5, "square", 0.02); },
  combo()  { tono(600, 1300, 0.2, "triangle", 0.04); },
  escudo() { tono(850, 320, 0.1, "triangle", 0.035); }
};

/* ---------- Avisos (SweetAlert con respaldo) ---------- */
function avisar(opts) {
  return new Promise(res => {
    if (window.Swal) {
      Swal.fire(Object.assign({ confirmButtonText: "Continuar", background: "#07101c", color: "#fff" }, opts)).then(() => res());
    } else setTimeout(res, 900);
  });
}

/* ---------- Efectos visuales ---------- */
function nuevo(cont, clase, estilo, vida) {
  const d = document.createElement("div");
  d.className = clase;
  if (estilo) for (const k in estilo) {
    if (k.indexOf("--") === 0) d.style.setProperty(k, estilo[k]); else d.style[k] = estilo[k];
  }
  cont.appendChild(d);
  setTimeout(() => d.remove(), vida);
  return d;
}
const fx = {
  laser(cont, x1, y1, x2, y2, color) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const d = nuevo(cont, "Fx_laser", { left: x1 + "px", top: y1 + "px", width: len + "px", transform: "translateY(-50%) rotate(" + ang + "deg)" }, 260);
    if (color) d.style.setProperty("--fx", color);
  },
  explosion(cont, x, y, o) {
    o = o || {};
    const n = o.n || 12, color = o.color || "#ffb347", esc = o.escala || 1;
    nuevo(cont, "Fx_onda", { left: x + "px", top: y + "px", "--fx": color, "--esc": esc }, 560);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, r = rand(28, 85) * esc;
      nuevo(cont, "Fx_particula", { left: x + "px", top: y + "px", "--dx": Math.cos(a) * r + "px", "--dy": Math.sin(a) * r + "px", "--fx": color }, 650);
    }
  },
  texto(cont, x, y, txt, color) {
    const d = nuevo(cont, "Fx_texto", { left: x + "px", top: y + "px", "--fx": color || "#fff" }, 1100);
    d.textContent = txt;
  },
  temblor(cont) {
    cont.classList.remove("Temblor");
    void cont.offsetWidth;
    cont.classList.add("Temblor");
    setTimeout(() => cont.classList.remove("Temblor"), 420);
  },
  destello(cont, color) {
    nuevo(cont, "Fx_destello", { "--fx": color || "rgba(255,40,80,.42)" }, 560);
  }
};

/* ---------- Nivel de meteoritos ---------- */
function crearNivelMeteoritos(cfg) {
  const raiz = $(cfg.raiz);
  const cont = raiz && raiz.querySelector(cfg.contenedor);
  if (!raiz || !cont) return null;
  const limiteEl = cont.querySelector(cfg.limite);
  const planetaEl = cont.querySelector(cfg.planeta);
  const ids = cfg.ids;

  cont.querySelectorAll("." + cfg.clase).forEach(e => e.remove());
  const hudVidas = document.createElement("div"); hudVidas.className = "HUD_vidas";
  const hudCombo = document.createElement("div"); hudCombo.className = "HUD_combo";
  cont.appendChild(hudVidas); cont.appendChild(hudCombo);

  const estadoNuevo = () => ({
    tiempo: cfg.tiempo, puntos: 0, vidas: cfg.vidas, jugando: false, pausado: false,
    terminado: false, reiniciando: false, combo: 0, ultimoGolpe: -99, inmune: 0,
    reloj: 0, acum: 99, spawns: 0, tMostrado: -1
  });
  let s = estadoNuevo();
  let meteoros = [];
  let ultimo = 0;

  const progreso = () => s.puntos / cfg.objetivo;
  const activo = () => s.jugando && !s.pausado && !s.terminado && !s.reiniciando;
  const estilo = (el, f) => el.style.setProperty("filter", f, "important");

  /* HUD */
  function barra() {
    const span = $(ids.puntaje), box = span && span.parentElement;
    if (!box || box.querySelector("." + cfg.barra[0])) return;
    const b = document.createElement("div");
    b.className = cfg.barra[0];
    b.innerHTML = '<div class="' + cfg.barra[1] + '"></div>';
    if (getComputedStyle(box).position === "static") box.style.position = "relative";
    box.appendChild(b);
  }
  function pintarPuntos() {
    const p = $(ids.puntaje);
    if (p) p.textContent = s.puntos + " / " + cfg.objetivo;
    const i = p && p.parentElement && p.parentElement.querySelector("." + cfg.barra[1]);
    if (i) i.style.width = (s.puntos / cfg.objetivo * 100) + "%";
  }
  function pintarTiempo() {
    const t = Math.max(0, Math.ceil(s.tiempo));
    if (t === s.tMostrado) return;
    s.tMostrado = t;
    const e = $(ids.tiempo);
    if (e) { e.textContent = t; e.classList.toggle("Urgente", t <= 10 && s.jugando); }
  }
  function pintarVidas() {
    let h = "";
    for (let k = 0; k < cfg.vidas; k++) h += '<span class="' + (k < s.vidas ? "" : "perdida") + '">❤</span>';
    hudVidas.innerHTML = h;
  }
  function pintarCombo() {
    hudCombo.textContent = s.combo >= 2 ? "COMBO x" + s.combo : "";
    if (s.combo >= 2) { hudCombo.classList.remove("pop"); void hudCombo.offsetWidth; hudCombo.classList.add("pop"); }
  }
  function hud() { pintarPuntos(); s.tMostrado = -1; pintarTiempo(); pintarVidas(); pintarCombo(); }
  function mostrarHud(v) { hudVidas.style.display = hudCombo.style.display = v ? "flex" : "none"; }

  /* Meteoritos */
  function crearMeteoro() {
    const p = progreso();
    const tipo = cfg.elegirTipo(p, s);
    s.spawns++;
    const v = cfg.velocidad(p);
    const el = document.createElement("img");
    el.src = "IMG/Metiorito.svg"; el.className = cfg.clase; el.alt = "Meteorito"; el.draggable = false;
    el.style.transition = "none";
    const m = {
      el, tipo, x: -8, y0: 0, vx: v, vy: 0, amp: 0, freq: 0, fase: rand(0, 6.28), t: 0,
      rot: rand(0, 360), vrot: rand(-140, 140), escala: 1, hp: 1, vivo: true, mitad: 0, cx: 0, cy: 0
    };
    switch (tipo) {
      case "rapido":
        m.vx = v * (cfg.factorRapido || 1.4); m.escala = 0.8; m.vrot *= 2.2;
        estilo(el, "drop-shadow(0 0 10px #5ff3ff) hue-rotate(170deg) saturate(1.5)"); break;
      case "blindado":
        m.vx = v * 0.72; m.escala = 1.45; m.hp = 2;
        estilo(el, "drop-shadow(0 0 12px #9fb7ff) grayscale(.6) brightness(1.1)"); break;
      case "onda":
        m.amp = rand(9, 15); m.freq = rand(2.4, 3.6);
        estilo(el, "drop-shadow(0 0 10px #c58bff) hue-rotate(-70deg) saturate(1.4)"); break;
      case "diagonal":
        m.vy = (Math.random() < 0.5 ? -1 : 1) * rand(11, 19);
        estilo(el, "drop-shadow(0 0 10px #ff7ef0) hue-rotate(60deg) saturate(1.3)"); break;
    }
    cont.appendChild(el);
    m.mitad = el.offsetWidth / 2;
    const hPct = (el.offsetWidth * m.escala) / Math.max(1, cont.clientHeight) * 100;
    m.yMin = cfg.yMin + m.amp;
    m.yMax = Math.max(m.yMin + 1, Math.min(cfg.yMax, 97 - hPct) - m.amp);
    m.y0 = rand(m.yMin, m.yMax);
    const o = cfg.origen ? cfg.origen(m, api) : null;
    if (o) { if (o.x != null) m.x = o.x; if (o.y != null) m.y0 = clamp(o.y, m.yMin, m.yMax); }
    el.style.left = m.x + "%"; el.style.top = m.y0 + "%";
    el.addEventListener("pointerdown", ev => { ev.preventDefault(); golpear(m); });
    meteoros.push(m);
  }
  function quitar(m) {
    m.vivo = false;
    meteoros = meteoros.filter(o => o !== m);
    m.el.remove();
  }
  function limpiarMeteoros() { meteoros.slice().forEach(quitar); }

  function golpear(m) {
    if (!activo() || !m.vivo) return;
    m.hp--;
    if (m.hp > 0) {
      sfx.escudo();
      fx.explosion(cont, m.cx, m.cy, { color: "#9fb7ff", n: 6, escala: 0.7 });
      fx.texto(cont, m.cx, m.cy - 28, "¡BLINDADO!", "#9fb7ff");
      m.el.style.setProperty("filter", "drop-shadow(0 0 14px #fff) brightness(2)", "important");
      setTimeout(() => m.vivo && estilo(m.el, "drop-shadow(0 0 12px #ff9d6b) sepia(.7) saturate(2)"), 120);
      return;
    }
    const cx = m.cx, cy = m.cy;
    quitar(m);
    s.puntos++;
    if (s.reloj - s.ultimoGolpe <= 1.6) s.combo++; else s.combo = 1;
    s.ultimoGolpe = s.reloj;
    if (s.combo >= 2) pintarCombo();
    if (s.combo > 0 && s.combo % 3 === 0) {
      s.tiempo += 2;
      fx.texto(cont, cx, cy - 34, "+2s", "#7ee8ff");
      sfx.combo();
    }
    play(cfg.sonidos[(s.puntos - 1) % cfg.sonidos.length]);
    sfx.boom();
    fx.explosion(cont, cx, cy, { color: "#ffb347", n: 12 });
    pintarPuntos();
    if (cfg.alDestruir) cfg.alDestruir(m, api);
    if (s.puntos >= cfg.objetivo) ganar();
  }

  function brecha(m) {
    const x = limiteEl ? limiteEl.offsetLeft : cont.clientWidth * 0.82;
    const y = clamp(m.cy, 24, cont.clientHeight - 24);
    quitar(m);
    fx.explosion(cont, x, y, { color: "#ff5a6e", n: 14, escala: 1.3 });
    perderVida("Un meteorito llegó a la línea de impacto.");
  }

  function perderVida(motivo) {
    if (!activo()) return;
    if (s.inmune > 0) {
      fx.texto(cont, cont.clientWidth * 0.78, cont.clientHeight * 0.45, "ESCUDO", "#7ee8ff");
      sfx.escudo();
      return;
    }
    s.vidas--; s.combo = 0; s.inmune = 1;
    pintarVidas(); pintarCombo();
    fx.temblor(cont); fx.destello(cont); sfx.vida();
    if (s.vidas <= 0) perder(motivo);
  }

  function perder(motivo) {
    if (!s.jugando || s.terminado || s.reiniciando) return;
    s.reiniciando = true;
    limpiarMeteoros();
    if (cfg.alLimpiar) cfg.alLimpiar(api);
    play("Perdiste_sound");
    const ref = s;
    avisar({ title: "¡Defensa fallida!", text: motivo + " La ronda se reiniciará.", icon: "warning" }).then(() => {
      if (s !== ref || s.terminado || !s.jugando) return;
      Object.assign(s, estadoNuevo(), { jugando: true });
      hud(); mostrarHud(true);
      if (cfg.alIniciar) cfg.alIniciar(api);
    });
  }

  function ganar() {
    s.terminado = true; s.jugando = false;
    limpiarMeteoros();
    pause("Fondo_Ciberpunk");
    mostrarHud(false);
    if (cfg.alGanar) { cfg.alGanar(api); return; }
    play("Triunfo");
    const g = $(ids.gana); if (g) g.style.display = "flex";
    const n = $("NEXT");
    if (n) { n.style.display = "block"; n.style.pointerEvents = "auto"; n.style.zIndex = "99999"; n.setAttribute("aria-hidden", "false"); }
    avisar({ title: cfg.textos.ganaTitulo, text: cfg.textos.ganaTexto, icon: "success" });
  }

  /* Ciclo de juego */
  function frame(ts) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (ts - ultimo) / 1000 || 0);
    ultimo = ts;
    if (!activo()) return;

    s.reloj += dt;
    s.tiempo -= dt;
    if (s.inmune > 0) s.inmune -= dt;
    if (s.combo && s.reloj - s.ultimoGolpe > 1.6) { s.combo = 0; pintarCombo(); }
    pintarTiempo();
    if (s.tiempo <= 0) { perder("Se agotó el tiempo."); return; }

    const p = progreso();
    s.acum += dt;
    if (meteoros.length < cfg.maxSim(p) && s.puntos + meteoros.length < cfg.objetivo && s.acum >= cfg.intervalo(p)) {
      s.acum = 0; crearMeteoro();
    }

    const W = cont.clientWidth, H = cont.clientHeight;
    const limiteX = limiteEl ? limiteEl.offsetLeft : W * 0.82;
    for (const m of meteoros.slice()) {
      m.t += dt; m.x += m.vx * dt; m.rot += m.vrot * dt;
      if (m.vy) {
        m.y0 += m.vy * dt;
        if (m.y0 < m.yMin) { m.y0 = m.yMin; m.vy = Math.abs(m.vy); }
        if (m.y0 > m.yMax) { m.y0 = m.yMax; m.vy = -Math.abs(m.vy); }
      }
      const y = m.y0 + (m.amp ? Math.sin(m.t * m.freq + m.fase) * m.amp : 0);
      m.el.style.left = m.x + "%";
      m.el.style.top = y + "%";
      m.el.style.transform = "rotate(" + m.rot + "deg) scale(" + m.escala + ")";
      m.cx = m.x / 100 * W + m.mitad;
      m.cy = y / 100 * H + m.mitad;
      if (m.cx >= limiteX) brecha(m);
    }
    if (cfg.alFrame) cfg.alFrame(dt, api);
  }
  requestAnimationFrame(frame);

  /* Acciones */
  function iniciar() {
    limpiarMeteoros();
    s = estadoNuevo(); s.jugando = true;
    const o = (id, v) => { const e = $(id); if (e) e.style.display = v; };
    o(ids.inicio, "none"); o(ids.pausaPantalla, "none"); o(ids.gana, "none");
    hud(); mostrarHud(true);
    play("Fondo_Ciberpunk");
    if (cfg.alIniciar) cfg.alIniciar(api);
  }
  function reiniciar() {
    limpiarMeteoros();
    s = estadoNuevo();
    if (cfg.alLimpiar) cfg.alLimpiar(api);
    const o = (id, v) => { const e = $(id); if (e) e.style.display = v; };
    o(ids.pausaPantalla, "none"); o(ids.gana, "none"); o(ids.inicio, "flex");
    hud(); mostrarHud(false);
    pause("Fondo_Ciberpunk");
  }
  function pausa() {
    if (!s.jugando || s.terminado || s.reiniciando) return;
    s.pausado = !s.pausado;
    const p = $(ids.pausaPantalla); if (p) p.style.display = s.pausado ? "flex" : "none";
    if (s.pausado) pause("Fondo_Ciberpunk"); else play("Fondo_Ciberpunk");
  }

  /* Disparo láser del jugador: sale de la Tierra hacia donde toques */
  cont.addEventListener("pointerdown", ev => {
    if (!activo()) return;
    const r = cont.getBoundingClientRect();
    const ox = planetaEl ? planetaEl.offsetLeft + planetaEl.offsetWidth * 0.18 : cont.clientWidth * 0.9;
    fx.laser(cont, ox, cont.clientHeight / 2, ev.clientX - r.left, ev.clientY - r.top);
    sfx.laser();
  });
  document.getElementById(ids.pausa)?.addEventListener("click", pausa);
  document.getElementById(ids.reiniciar)?.addEventListener("click", reiniciar);
  document.addEventListener("visibilitychange", () => { if (document.hidden && activo()) pausa(); });

  const api = {
    cont, fx, sfx, play, pause, avisar, rand, clamp, lerp,
    get s() { return s; },
    activo, perderVida, quitarMeteoros: limpiarMeteoros
  };
  barra(); hud(); mostrarHud(false);
  return { iniciar, reiniciar, pausa, terminado: () => s.terminado, api };
}

window.IronFist = { $, rand, clamp, lerp, play, pause, sfx, fx, avisar, crearNivelMeteoritos };
})();
