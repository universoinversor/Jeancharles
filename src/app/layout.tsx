import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Overlays } from "@/components/app/Overlays";
import { SiteEffects } from "@/components/app/SiteEffects";
import { site } from "@/lib/site";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
// Fuentes alojadas en el propio sitio (sin Google Fonts): más rápido y sin depender de terceros.
import "@fontsource-variable/bodoni-moda/standard.css";
import "@fontsource-variable/bodoni-moda/standard-italic.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/allura/400.css";
import "./globals.css";
import { TechFx } from "@/components/app/TechFx";
import { MotorGrafico } from "@/components/app/MotorGrafico";
import { Idioma } from "@/components/app/Idioma";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jean Charles | Inversionista Global, Estratega y Conferencista",
    template: "%s | Jean Charles",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  publisher: site.name,
  keywords: [
    "Jean Charles",
    "inversionista",
    "conferencista",
    "estratega de negocios",
    "mentoría financiera",
    "forex",
    "criptomonedas",
    "crédito",
    "neuroventas",
    "PNL",
    "Nipponflex",
    "Atlanta",
  ],
  category: "business",
  // La imagen para compartir la genera src/app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "es_LA",
    url: "/",
    title: "Jean Charles | Domina tu mente. Escala tu negocio.",
    description: "Inversionista global, estratega y conferencista. Más de 10 años ayudando a personas y empresas en tres continentes.",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
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
      image: `${site.url}/img/jean-charles.webp`,
      description: site.description,
      jobTitle: "Inversionista, Estratega y Conferencista",
      email: `mailto:${site.email}`,
      telephone: site.phoneLabel,
      knowsAbout: ["Inversión", "Forex", "Criptomonedas", "Crédito", "Neuroventas", "PNL", "Negocios digitales", "Biohacking"],
      sameAs: Object.values(site.social).filter(Boolean),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#negocio`,
      name: site.name,
      url: site.url,
      image: `${site.url}/brand/logo-full.png`,
      logo: `${site.url}/brand/logo-full.png`,
      description: site.description,
      email: site.email,
      telephone: site.phoneLabel,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chamblee",
        addressRegion: "GA",
        postalCode: "30341",
        addressCountry: "US",
      },
      areaServed: ["US", "Latinoamérica"],
      founder: { "@id": `${site.url}/#person` },
      sameAs: Object.values(site.social).filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "es",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Saltar al contenido</a>
        <MotorGrafico />
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
        <TechFx />
        <Idioma />
      </body>
    </html>
  );
}
