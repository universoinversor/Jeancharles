import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Overlays } from "@/components/app/Overlays";
import { SiteEffects } from "@/components/app/SiteEffects";
import { CinematicIntro, introGateScript } from "@/components/app/CinematicIntro";
import { site } from "@/lib/site";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
// Fuentes alojadas en el propio sitio (sin Google Fonts): más rápido y sin depender de terceros.
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/allura/400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jean Charles | Inversionista Global, Estratega y Conferencista",
    template: "%s | Jean Charles",
  },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "es_LA",
    title: "Jean Charles | Domina tu mente. Escala tu negocio.",
    description: "Inversionista global, estratega y conferencista. Más de 10 años ayudando a personas y empresas en tres continentes.",
    images: ["/brand/logo-full.png"],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.person,
      url: site.url,
      image: `${site.url}/brand/logo-full.png`,
      jobTitle: "Inversionista, Estratega y Conferencista",
      sameAs: Object.values(site.social).filter(Boolean),
    },
    { "@type": "WebSite", url: site.url, name: site.name, inLanguage: "es", publisher: { "@id": `${site.url}/#person` } },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CinematicIntro />
        <a className="skip-link" href="#main">Saltar al contenido</a>
        <div className="grain" aria-hidden="true" />
        <div className="cursor" aria-hidden="true"><div className="cursor__dot" /></div>
        <Header />
        <ViewTransition default="pagina">
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <WhatsAppFloat />
        <Overlays />
        <SiteEffects />
      </body>
    </html>
  );
}
