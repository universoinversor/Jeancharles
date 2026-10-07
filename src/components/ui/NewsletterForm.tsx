"use client";

import { site } from "@/lib/site";
import { toast } from "@/lib/ui-events";

export function NewsletterForm({ id }: { id: string }) {
  return (
    <form
      className="inline-form"
      action={site.newsletterAction || undefined}
      method={site.newsletterAction ? "post" : undefined}
      target={site.newsletterAction ? "_blank" : undefined}
      onSubmit={(e) => {
        if (site.newsletterAction) return; // envío nativo al proveedor
        e.preventDefault();
        // TODO(fase 2): Server Action → Supabase / proveedor de email.
        e.currentTarget.reset();
        toast("¡Listo! Estás dentro. Revisa tu bandeja de entrada.");
      }}
    >
      <label htmlFor={id} className="sr-only">Correo electrónico</label>
      <input id={id} className="input" type="email" name="email" placeholder="tu@email.com" autoComplete="email" required />
      <button className="btn btn--gold" type="submit">Unirme</button>
    </form>
  );
}
