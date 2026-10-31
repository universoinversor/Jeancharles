import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Tarjeta para compartir (WhatsApp, Facebook, LinkedIn, X) de todas las páginas.
export const alt = "Jean Charles — Inversionista global, estratega y conferencista";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-full.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          gap: 64,
          background: "radial-gradient(ellipse at 30% 40%, #2a2010 0%, #07070a 62%)",
          color: "#efe8da",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={380} height={362} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#E0B84A" }}>JEAN CHARLES</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, lineHeight: 1.05, fontWeight: 700 }}>
            <span>Domina tu mente.</span>
            <span style={{ color: "#F2D98B" }}>Escala tu negocio.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#cfc6b4" }}>
            Inversionista global · Estratega · Conferencista
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#C29327", marginTop: 12 }}>jeancharlesofficial.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
