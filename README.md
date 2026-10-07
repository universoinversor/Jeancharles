# Jean Charles Official — Super App

App web de la marca personal de Jean Charles (inversionista global, estratega y conferencista):
sitio público + academia + área de miembros, con el sistema de diseño de **oro metálico real**.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase (auth) · PWA.

## Verla en tu computadora (sin comandos)

Doble clic en **`ver-local.command`** (Mac) o **`ver-local.bat`** (Windows), o `npm run local` en la terminal.
Revisa que tengas Node.js 20.9+ (LTS en https://nodejs.org), instala lo necesario la primera vez, busca un
puerto libre, espera a que la página responda y abre el navegador. Si ya estaba abierta, solo abre el navegador.

Si no carga:
- **Mac, "no se puede abrir porque es de un desarrollador no identificado"** → clic derecho sobre
  `ver-local.command` → Abrir → Abrir.
- **"Falta Node.js" o versión vieja** → instala la LTS desde nodejs.org y vuelve a abrir el archivo.
- **No abre el navegador** → entra a mano a la dirección que muestra la ventana (http://localhost:3000).
- **No abras `index.html` con doble clic**: es una app de Next.js y necesita el servidor del lanzador.

## Publicación

Vercel publica `main` en https://jeancharles-gilt.vercel.app y crea una vista previa por cada rama/PR.
Las variables de `.env.example` se añaden en Vercel → Settings → Environment Variables (todas son opcionales:
el contacto real ya viene configurado).

## Arrancar en modo desarrollo

```bash
npm install
cp .env.example .env.local   # completa lo que tengas; lo vacío se oculta solo
npm run dev
```

Abre **http://localhost:3000**.

Otros comandos: `npm run build` (producción), `npm start`, `npm run lint`, `npm run typecheck`.

## Estructura

```
src/
├── app/
│   ├── layout.tsx            # Header, footer, diálogos, transiciones entre páginas
│   ├── globals.css           # Tailwind v4 + tokens de marca como utilidades
│   ├── (site)/               # Sitio público
│   │   ├── page.tsx          #   Home
│   │   ├── forex/            #   Forex Dashboard (divisas en vivo, servicios)
│   │   ├── crypto/           #   Cripto Terminal (TradingView, tarjeta, calculadora)
│   │   ├── nipponflex/       #   Nipponflex Health (catálogo E-Energy USA)
│   │   ├── privacidad/  terminos/
│   ├── (app)/                # Producto
│   │   ├── miembros/         #   Dashboard (protegido cuando Supabase está activo)
│   │   ├── cursos/           #   Catálogo de la academia
│   │   ├── agenda/           #   Reserva 1:1 (Calendly)
│   │   └── login/            #   Enlace mágico por email
│   ├── auth/callback/        # Intercambio de código de Supabase
│   ├── manifest.ts robots.ts sitemap.ts not-found.tsx
├── components/
│   ├── layout/               # Header (menú móvil, CTA fija), Footer
│   ├── sections/home/        # Hero, About, Method, Showcase, Media
│   ├── ui/                   # Brand, Section (GoldTitle, SectionHead, CtaBand, PageHero), DialogLink…
│   ├── widgets/              # TradingView (carga diferida), YouTubeLite
│   └── app/                  # Overlays (diálogos, toast, cookies+GA4), SiteEffects (reveal, contadores)
├── content/                  # Textos y datos editables: home.ts, nipponflex.ts, forex.ts, cursos.ts
├── lib/                      # site.ts (config), ui-events.ts, supabase/{client,server}.ts
├── styles/brand.css          # Sistema de diseño completo (oro, tipografía, componentes)
└── proxy.ts                  # Sesión de Supabase + protección de /miembros
legacy/                       # Sitio estático anterior, solo como referencia
```

## Editar contenido

- Textos, servicios, testimonios, videos: `src/content/home.ts`
- Catálogo y FAQ de Nipponflex: `src/content/nipponflex.ts` · Forex: `src/content/forex.ts`
- Cursos: `src/content/cursos.ts`
- Enlaces, redes y config: `src/lib/site.ts` y `.env.local`
- Retrato del hero: sube `public/img/jean-charles.webp`

## Activar el área de miembros

1. Crea un proyecto en Supabase y copia URL y anon key en `.env.local`.
2. En Supabase → Authentication → URL Configuration, añade `http://localhost:3000/auth/callback`
   (y la de producción).
3. Listo: `/miembros` pide login con enlace mágico.

## Pendiente antes de publicar

- Reemplazar los testimonios de ejemplo (`src/content/home.ts`) por casos reales.
- Completar `.env.local` (Calendly, WhatsApp, email, GA4, newsletter, Supabase).
- Alojar logo e imágenes en `public/` en lugar de servidores externos.
