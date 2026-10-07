import type { Metadata } from "next";
import { GoldTitle } from "@/components/ui/Section";
import { supabaseConfigured } from "@/lib/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Ingresar", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  return (
    <div className="app-shell">
      <div className="container--narrow" style={{ maxWidth: 520 }}>
        <span className="eyebrow">Área de miembros</span>
        <GoldTitle as="h1" className="display h2" pre="Bienvenido al" gold="círculo" style={{ margin: "1.2rem 0 1rem" }} />
        <p className="muted" style={{ marginBottom: "2rem" }}>
          Te enviamos un enlace mágico a tu correo: sin contraseñas.
        </p>
        {supabaseConfigured ? (
          <LoginForm next={typeof next === "string" ? next : "/miembros"} />
        ) : (
          <p className="badge">Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local</p>
        )}
      </div>
    </div>
  );
}
