import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las URLs del sitio estático anterior siguen funcionando.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/biohacking", destination: "/nipponflex", permanent: true },
      { source: "/biohacking.html", destination: "/nipponflex", permanent: true },
      { source: "/nipponflex.html", destination: "/nipponflex", permanent: true },
      { source: "/forex-landing", destination: "/forex", permanent: true },
      { source: "/forex-landing.html", destination: "/forex", permanent: true },
      { source: "/crypto.html", destination: "/crypto", permanent: true },
      { source: "/privacy.html", destination: "/privacidad", permanent: true },
      { source: "/terms.html", destination: "/terminos", permanent: true },
      // URLs del WordPress anterior (tema de demostración) que Google pudo indexar.
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/#sobre", permanent: true },
      { source: "/our-team", destination: "/#sobre", permanent: true },
      { source: "/team-details", destination: "/#sobre", permanent: true },
      { source: "/contact", destination: "/#contacto", permanent: true },
      { source: "/frequently-asked-questions", destination: "/#contacto", permanent: true },
      { source: "/blog", destination: "/#journal", permanent: true },
      { source: "/our-services", destination: "/#servicios", permanent: true },
      { source: "/services/:path*", destination: "/#servicios", permanent: true },
      { source: "/services-cat/:path*", destination: "/#servicios", permanent: true },
      { source: "/tendencias-de-consumo-para-2023-y-2024", destination: "/#journal", permanent: true },
      { source: "/modelos-de-negocio-en-tendencia", destination: "/#journal", permanent: true },
      { source: "/innovacion-y-negocios-para-2023within-year", destination: "/#journal", permanent: true },
      { source: "/category/:path*", destination: "/#journal", permanent: true },
      { source: "/tag/:path*", destination: "/#journal", permanent: true },
      { source: "/author/:path*", destination: "/#sobre", permanent: true },
      ...[
        "/sample-page", "/sample-page-2", "/construction", "/creative-portfolio", "/digital-agency",
        "/marketing-agency", "/portfolio-showcase", "/case-study-showcase", "/our-portfolio",
        "/freelancer-agency", "/photography-agency", "/shop", "/cart", "/checkout", "/my-account", "/wishlist",
        "/portfolio/:path*", "/portfolio-cat/:path*", "/case/:path*", "/case-cat/:path*",
        "/wp-admin/:path*", "/wp-login.php", "/wp-content/:path*", "/feed", "/wp-sitemap.xml",
      ].map((source) => ({ source, destination: "/", permanent: true })),
    ];
  },
};

export default nextConfig;
