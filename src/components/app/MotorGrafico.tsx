"use client";

import { useEffect, useRef } from "react";

/**
 * Motor gráfico del sitio (WebGL2, sin librerías): un universo de partículas de oro en 3D que vive detrás de
 * todo el contenido.
 * - Toda la animación corre en la GPU (vertex shader); la CPU solo actualiza unos uniforms por cuadro.
 * - Al bajar, las partículas se transforman de galaxia espiral a una onda de datos y vuelven.
 * - El mouse gira la cámara y aparta las partículas cercanas; cada clic lanza una onda expansiva.
 * - Se pausa con la pestaña oculta; con prefers-reduced-motion dibuja un solo cuadro quieto; sin WebGL2 no hace nada.
 */

const VERT = `#version 300 es
precision highp float;
in vec3 aSeed;
uniform float uTime, uMorph, uAspect, uPx, uScroll, uIntensity;
uniform vec2 uMouse, uRot;
uniform vec3 uClick;
out float vAlpha;
out vec3 vColor;

mat3 rotY(float a){ float c=cos(a), s=sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
mat3 rotX(float a){ float c=cos(a), s=sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }

void main(){
  // Forma A: galaxia espiral de tres brazos
  float r = pow(aSeed.x, .6) * 2.5;
  float arm = floor(aSeed.y * 3.0);
  float jitter = (fract(sin(aSeed.z * 91.7) * 4375.5) - .5) * .55;
  float ang = arm * 2.0944 + r * 2.6 + jitter - uTime * .06 * (2.2 - r);
  vec3 galaxia = vec3(cos(ang) * r, (aSeed.z - .5) * .18 * (2.0 - r), sin(ang) * r);

  // Forma B: onda de datos (malla que fluye)
  float gx = (aSeed.x - .5) * 8.0, gz = (aSeed.y - .5) * 8.0;
  float gy = sin(gx * 1.2 + uTime * .7) * .22 + cos(gz * 1.6 + uTime * .55) * .2 - .55;
  vec3 onda = vec3(gx, gy, gz);

  float m = smoothstep(0., 1., uMorph);
  vec3 p = mix(galaxia, onda, m);

  // Cámara: gira con el mouse y con el scroll
  p = rotX(.55 + uRot.y + m * .25) * rotY(uRot.x + uScroll * 1.4) * p;
  float z = p.z - 3.1;
  float f = 1.7;
  vec4 pos = vec4(p.x * f / uAspect, p.y * f, 0., -z);

  // Repulsión del mouse (en pantalla)
  vec2 ndc = pos.xy / pos.w;
  vec2 d = (ndc - uMouse) * vec2(uAspect, 1.);
  float push = exp(-dot(d, d) * 18.) * .05;
  ndc += normalize(d + 1e-5) * push / vec2(uAspect, 1.);

  // Onda expansiva del clic
  float age = uTime - uClick.z;
  if (age > 0. && age < 2.5) {
    vec2 dc = (ndc - uClick.xy) * vec2(uAspect, 1.);
    float dist = length(dc), ring = age * 1.1;
    float band = exp(-pow((dist - ring) * 9., 2.)) * exp(-age * 1.4);
    ndc += normalize(dc + 1e-5) * band * .06 / vec2(uAspect, 1.);
  }
  pos.xy = ndc * pos.w;
  gl_Position = pos;

  float tw = .55 + .45 * sin(uTime * (1.2 + aSeed.z * 2.) + aSeed.x * 60.);
  gl_PointSize = (1.0 + aSeed.z * 2.2) * uPx * (2.2 / pos.w) * (.7 + .3 * tw);
  float chispa = step(.985, fract(aSeed.y * 97.3));
  // blanco y oro: un tercio de las partículas son blancas (platino), el resto en la rampa de oro
  float blanca = step(.66, fract(aSeed.x * 53.1));
  vec3 oro = mix(vec3(.62,.45,.12), vec3(.96,.86,.56), aSeed.z);
  vColor = mix(mix(oro, vec3(.93,.93,.96), blanca), vec3(1.), chispa);
  vAlpha = clamp((.22 + .4 * tw) * (1.5 / pos.w), 0., 1.) * (.6 + chispa * .4) * uIntensity;
}`;

const FRAG = `#version 300 es
precision mediump float;
in float vAlpha;
in vec3 vColor;
out vec4 o;
void main(){
  float d = length(gl_PointCoord - .5);
  float a = smoothstep(.5, .0, d);
  a *= a;
  o = vec4(vColor * a * vAlpha, a * vAlpha);
}`;

export function MotorGrafico() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: "high-performance" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
      return s;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link");
    } catch {
      return; // sin motor: quedan las capas CSS
    }
    gl.useProgram(prog);

    const mobile = matchMedia("(max-width: 760px)").matches;
    const N = mobile ? 2600 : 6500;
    const seeds = new Float32Array(N * 3);
    for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aSeed");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = { intensity: u("uIntensity"), time: u("uTime"), morph: u("uMorph"), aspect: u("uAspect"), px: u("uPx"), scroll: u("uScroll"), mouse: u("uMouse"), rot: u("uRot"), click: u("uClick") };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    let dpr = 1, w = 0, h = 0;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      w = innerWidth; h = innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let click = [0, 0, -10];
    const t0 = performance.now();
    const now = () => (performance.now() - t0) / 1000;
    const onMove = (e: PointerEvent) => { mouse.tx = (e.clientX / w) * 2 - 1; mouse.ty = -((e.clientY / h) * 2 - 1); };
    const onDown = (e: PointerEvent) => { click = [(e.clientX / w) * 2 - 1, -((e.clientY / h) * 2 - 1), now()]; };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    addEventListener("resize", resize);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, morph = 0;
    const draw = () => {
      const t = reduce ? 4 : now();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const max = document.documentElement.scrollHeight - innerHeight;
      const sp = max > 0 ? scrollY / max : 0;
      // galaxia → onda → galaxia → onda a lo largo de la página
      const target = 0.5 - 0.5 * Math.cos(sp * Math.PI * 3);
      morph += (target - morph) * 0.06;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(U.time, t);
      gl.uniform1f(U.morph, morph);
      gl.uniform1f(U.aspect, w / h);
      gl.uniform1f(U.px, dpr * (mobile ? 1.6 : 1.9));
      gl.uniform1f(U.scroll, sp);
      // Sutil en la portada y casi imperceptible en el resto: acompaña, no compite con el contenido.
      const intensidad = 0.16 + 0.4 * Math.max(0, 1 - scrollY / (innerHeight * 0.9));
      gl.uniform1f(U.intensity, intensidad);
      gl.uniform2f(U.mouse, mouse.x, mouse.y);
      gl.uniform2f(U.rot, mouse.x * 0.18, -mouse.y * 0.1);
      gl.uniform3f(U.click, click[0], click[1], click[2]);
      gl.drawArrays(gl.POINTS, 0, N);
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(draw); };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    canvas.classList.add("is-on");

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={ref} className="motor" aria-hidden="true" />;
}
