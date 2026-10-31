import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageSeo = {
  title: string;
  description: string;
  /** Ruta canónica de la página, p. ej. "/credito". */
  path: string;
};

/** Tarjeta para compartir que genera `src/app/opengraph-image.tsx`. */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Jean Charles — Inversionista global, estratega y conferencista",
};

/**
 * Metadatos de una página pública: título, descripción, URL canónica y tarjeta
 * para compartir. Los `openGraph`/`twitter` de una página reemplazan a los del
 * layout, por eso la imagen se repite aquí.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "es_LA",
      url: path,
      title: `${title} | ${site.person}`,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.person}`,
      description,
      images: [shareImage.url],
    },
  };
}
