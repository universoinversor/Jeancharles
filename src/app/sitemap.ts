import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/credito", "/forex", "/crypto", "/nipponflex", "/cursos", "/agenda", "/privacidad", "/terminos"];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
    priority: r === "" ? 1 : r === "/privacidad" || r === "/terminos" ? 0.2 : 0.8,
  }));
}
