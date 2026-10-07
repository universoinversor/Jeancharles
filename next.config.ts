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
    ];
  },
};

export default nextConfig;
