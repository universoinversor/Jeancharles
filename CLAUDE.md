@AGENTS.md

# Jean Charles Official — contexto del proyecto

Marca personal de **Jean Charles**: inversionista global, estratega y conferencista
(+10 años, clientes en 3 continentes, Instagram @jeancharles.official ~475K,
YouTube @jeancharles.digital). Servicios: consultoría 1:1, cursos/mentorías,
conferencias, marketing. Embajador oficial Nipponflex (biohacking).
Repo: `universoinversor/Jeancharles` · Vercel: https://jeancharles-gilt.vercel.app (publica `main`; cada rama tiene vista previa).
Dominio final: https://jeancharlesofficial.com

Contacto real (en `src/lib/site.ts`): WhatsApp +1 (678) 760 3837, info@jeancharlesofficial.com, Chamblee, Georgia.
El formulario "Agendar una reunión" envía a Formspree (`xqegaqlq`), igual que el sitio anterior, y acepta `?service=`
(`mentoria`, `forex`, `crypto`, `nipponflex`…). Afiliados: E-Energy by Nipponflex (`sca_ref` de Jean Charles) y tarjeta Crypto.com.

## Stack y comandos

Next.js 16 (App Router, `src/`) · React 19 · TypeScript · Tailwind v4 · Supabase (`@supabase/ssr`).

- `npm run dev` → http://localhost:3000
- Antes de dar algo por terminado: `npm run lint`, `npm run typecheck`, `npm run build`.
- Next 16 cambia APIs: leer `node_modules/next/dist/docs/` antes de usar algo nuevo
  (p. ej. `middleware` ahora es `src/proxy.ts`; `PageProps`/`LayoutProps` son globales generados).

## Arquitectura

- `src/app/(site)/` sitio público (inicio, `/forex`, `/crypto`, `/nipponflex`, legales) · `src/app/(app)/` producto (miembros, cursos, agenda, login).
- Contenido editable en `src/content/*.ts` — no escribir copy dentro de componentes.
- Config en `src/lib/site.ts`, valores por entorno en `.env.local` (ver `.env.example`).
- Diálogos globales: `openDialog("consulta" | "lista")` / `<DialogLink>`; toasts: `toast()` (`src/lib/ui-events.ts`).
- Navegación por secciones (como el sitio original): cada `<section id data-nav="Etiqueta">` aparece en el
  índice lateral `<SectionRail />` y marca el menú (`useActiveSection`). Menú: Inicio, Sobre mí, Servicios,
  Forex, Cripto, Nipponflex, Blog, Contacto. El formulario de agenda es `<BookingForm>` (diálogo y sección Contacto).
- Efectos de scroll (`.reveal`, `[data-count]`, `.journey`) los activa `SiteEffects` en cada navegación:
  basta con poner las clases en el HTML.
- Widgets externos: `<TradingView kind config>` y `<YouTubeLite>` (carga diferida, sin cookies).
- Transición entre páginas: `<ViewTransition default="pagina">` en el layout + CSS en `globals.css`.
- `legacy/` es el sitio estático anterior (index, crypto, forex-landing, nipponflex): solo referencia, no se sirve.
  Sus URLs viejas redirigen solas (`next.config.ts`). `vercel.json` fija el framework en Next.js.

## Sistema de diseño (no romper)

- Todo vive en `src/styles/brand.css` (importado en la capa `components`, así las utilidades
  de Tailwind pueden ajustar cualquier clase de marca). Tokens también como utilidades:
  `bg-ink`, `text-oro-3`, `font-display`, `bg-oro`, `canto-oro`…
- Ojo: Tailwind trae su propio `.container`; está redefinido con `@utility container` en `globals.css`.
- Dirección "Private Bank Editorial": tinta `#07070a`, marfil `#efe8da`, **oro metálico real**.
- Oro = misma rampa que ZOKUNO (`universoinversor/zokuno-app`, `src/app/globals.css`):
  `--oro-1 #FFF4CE` (especular, estrecho) · `--oro-2 #F2D98B` · `--oro-3 #E0B84A` ·
  `--oro-4 #C29327` · `--oro-5 #8E6616` · `--oro-6 #5C3F08`.
  Degradados de 7 paradas `--oro-metal` / `--oro-metal-h` / `--oro-metal-min`,
  canto `--oro-canto` en botones, relieve con `filter: drop-shadow` (nunca `text-shadow`
  sobre texto recortado). En hover se mueve la luz, no el color. Texto sobre oro: `#241A04`.
  Palabra dorada en títulos: `<GoldTitle pre="El Método" gold="JC" />`.
- Tipografías alojadas con `@fontsource` (importadas en `layout.tsx`, sin Google Fonts): Bodoni Moda (display), Instrument Sans (texto),
  IBM Plex Mono (datos), Allura (firma).
- Respetar `prefers-reduced-motion`. Sin scroll horizontal en 390px.

## Identidad visual oficial

- Retrato oficial de Jean Charles (fondo transparente): `public/img/jean-charles.webp`, de pie delante del sello en el hero.
- Logo oficial: escudo león-águila en oro + wordmark de pincel "JEAN CHARLES".
  Archivos en `public/brand/`: `logo-full`, `crest` (solo escudo), `wordmark` (.webp/.png, fondo transparente).
  Íconos de app: `src/app/icon.png`, `apple-icon.png`, `public/brand/icon-*.png`.
- Sin video ni imágenes de autos (decisión de Jean Charles, 2026-10-07: "el video ese no me gusta").
  El movimiento del fondo es la **aurora dorada** (`.aurora`, CSS puro) + `<GoldDust>`; fondo noche `--night #05050c`.
- Estilo: lujo extravagante y MUY visual — imágenes grandes, oro con brillo, polvo de oro (`<GoldDust>`).
  Capa en `src/styles/cinematic.css` (aurora, hero, `.crest` con reflejo, `.cinema` con escudo gigante, `.universe`).
- Motor gráfico `<MotorGrafico />` (WebGL2 propio, sin librerías, en el layout): universo de partículas de oro
  en 3D detrás de todo; galaxia ↔ onda según el scroll, cámara con el mouse, onda expansiva al hacer clic.
  Por eso las secciones usan fondos traslúcidos. Se pausa en pestaña oculta; reduced-motion = un cuadro fijo.
- Capa `src/styles/tech.css` + `<TechFx />` (en el layout): barra de progreso, tarjetas que se inclinan en 3D con luz
  bajo el cursor, esquinas HUD, destello al hacer clic, rótulos que se decodifican, piso de cuadrícula dorada
  (`.tech-grid`/`.tech-scan` en los héroes) y velocímetro digital con segmentos LED. Todo respeta reduced-motion.
- Capa `src/styles/lujo.css`: tarjetas de vidrio dorado, destello entre secciones (`.section--line`),
  monedas flotantes `<Monedas set="hero|seccion|cripto">` y arte en oro `<OroArt kind="cripto|forex|bio|mente|negocios|libro">`
  en lugar de fotos de stock. Bodoni pierde trazos finos en pantallas 1x: hay un `-webkit-text-stroke` mínimo solo ahí.

## Reglas de contenido

- Español neutro/latino. Tono premium, directo, sin exageraciones.
- No inventar logros, medios ("visto en Forbes"), cifras ni testimonios. Los 3 testimonios
  actuales son de ejemplo: reemplazar por reales.
- Salud (Nipponflex): productos de bienestar, sin afirmaciones médicas.
- Inversión/crypto: siempre aviso de riesgo; no es asesoría financiera.

## Hoja de ruta

1. ✅ Estructura: Next.js + diseño + todas las páginas migradas + área de miembros (vista previa).
2. Datos reales: Supabase (waitlist, newsletter, perfiles) vía Server Actions; Calendly; GA4.
3. Academia: cursos con lecciones en video, progreso por usuario, certificados.
4. Pagos (Stripe) para cursos/mentorías; tienda Biohacking.
5. PWA completa (service worker, offline), notificaciones, imágenes propias en `public/`.
