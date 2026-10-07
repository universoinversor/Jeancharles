import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jean Charles Official",
    short_name: "Jean Charles",
    description: "Inversión, negocios digitales y alto rendimiento con Jean Charles.",
    lang: "es",
    start_url: "/",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#07070a",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcuts: [
      { name: "Área de miembros", url: "/miembros" },
      { name: "Crypto Nexus", url: "/crypto" },
      { name: "Agendar", url: "/agenda" },
    ],
  };
}
