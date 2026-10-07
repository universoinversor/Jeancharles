"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next }: { next: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) return;
    setState("sending");
    const email = String(new FormData(e.currentTarget).get("email"));
    const redirect = new URL("/auth/callback", window.location.origin);
    redirect.searchParams.set("next", next);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect.toString() } });
    if (error) { setError(error.message); setState("error"); }
    else setState("sent");
  };

  if (state === "sent") {
    return <p className="lead">Revisa tu correo: te enviamos el enlace para entrar.</p>;
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="field">
        <label htmlFor="login-email">Email</label>
        <input className="input" id="login-email" name="email" type="email" autoComplete="email" required />
      </div>
      <button className="btn btn--gold btn--block" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Enviando…" : "Enviarme el enlace"}
      </button>
      {state === "error" ? <p className="form-note" role="alert">{error}</p> : null}
    </form>
  );
}
