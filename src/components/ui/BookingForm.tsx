"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { servicios, site, whatsappLink, type ServicioId } from "@/lib/site";
import { toast } from "@/lib/ui-events";

type Props = {
  /** Prefijo para los id de los campos: el formulario aparece en el diálogo y en la sección Contacto. */
  idPrefix: string;
  servicio?: ServicioId | "";
  onServicio?: (s: ServicioId) => void;
};

/** Formulario de agenda: envía a Formspree (llega al correo de Jean Charles). Si falla, ofrece WhatsApp con el mismo mensaje. */
export function BookingForm({ idPrefix, servicio: controlled, onServicio }: Props) {
  const [local, setLocal] = useState<ServicioId | "">("");
  const servicio = controlled ?? local;
  const setServicio = onServicio ?? setLocal;
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const id = (s: string) => `${idPrefix}-${s}`;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const etiqueta = servicios.find((x) => x.value === data.get("service"))?.label ?? "";
    setEnviando(true);
    try {
      const res = await fetch(site.formspree, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setEnviado(true);
    } catch {
      const text = [
        "Hola Jean Charles, quiero agendar una reunión.",
        `Nombre: ${data.get("full_name") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Teléfono: ${data.get("phone") ?? ""}`,
        `Interés: ${etiqueta}`,
        `Mensaje: ${data.get("message") ?? ""}`,
      ].join("\n");
      toast("No pudimos enviar el formulario. Te llevamos a WhatsApp con tu mensaje listo.");
      window.open(whatsappLink(text), "_blank", "noopener");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="form-grid" style={{ textAlign: "center", justifyItems: "center", paddingBlock: "1.5rem" }} role="status">
        <span className="eyebrow eyebrow--plain">Solicitud recibida</span>
        <p className="display h3">Gracias. <span className="italic gold-text">Hablamos pronto.</span></p>
        <p className="muted">El equipo de Jean Charles te contactará personalmente. Si prefieres adelantar la conversación:</p>
        <a className="btn btn--gold" href={whatsappLink()} target="_blank" rel="noopener">Escribir por WhatsApp</a>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="form-grid form-grid--2">
        <div className="field"><label htmlFor={id("nombre")}>Nombre completo</label><input className="input" id={id("nombre")} name="full_name" autoComplete="name" required /></div>
        <div className="field"><label htmlFor={id("email")}>Email</label><input className="input" id={id("email")} name="email" type="email" autoComplete="email" required /></div>
      </div>
      <div className="form-grid form-grid--2">
        <div className="field"><label htmlFor={id("tel")}>Teléfono / WhatsApp</label><input className="input" id={id("tel")} name="phone" type="tel" autoComplete="tel" required /></div>
        <div className="field">
          <label htmlFor={id("servicio")}>Me interesa</label>
          <select className="select" id={id("servicio")} name="service" required value={servicio} onChange={(ev) => setServicio(ev.target.value as ServicioId)}>
            <option value="" disabled>Selecciona una opción</option>
            {servicios.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={id("msg")}>Tu proyecto o interés</label>
        <textarea className="textarea" id={id("msg")} name="message" required placeholder="Ej. quiero estructurar mi portafolio y escalar mi negocio digital" />
      </div>
      <button className="btn btn--gold btn--block" type="submit" disabled={enviando}>
        {enviando ? "Enviando…" : <>Agendar una reunión <span className="arrow" aria-hidden="true">→</span></>}
      </button>
      <p className="form-note">Al enviar aceptas nuestra <Link href="/privacidad" style={{ textDecoration: "underline" }}>política de privacidad</Link>. También puedes escribir a <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>{site.email}</a>.</p>
    </form>
  );
}
