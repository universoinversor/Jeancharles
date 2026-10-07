"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { servicios, site, whatsappLink, type ServicioId } from "@/lib/site";
import { toast, type DialogId } from "@/lib/ui-events";

const CONSENT_KEY = "jc_consent";

/** Diálogos globales (consulta, lista de espera), toast y consentimiento de cookies. */
export function Overlays() {
  const consulta = useRef<HTMLDialogElement>(null);
  const lista = useRef<HTMLDialogElement>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [consent, setConsent] = useState<string | null>("pending");
  const [servicio, setServicio] = useState<ServicioId | "">("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const onDialog = (e: Event) => {
      const { id, servicio: srv } = (e as CustomEvent<{ id: DialogId; servicio?: ServicioId }>).detail;
      if (srv) setServicio(srv);
      if (id === "consulta") setEnviado(false);
      const dlg = id === "consulta" ? consulta.current : lista.current;
      if (dlg && !dlg.open) dlg.showModal();
    };
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setToastMsg((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setToastMsg(""), 3600);
    };
    window.addEventListener("jc:dialog", onDialog);
    window.addEventListener("jc:toast", onToast);
    // Abrir por URL: /#consulta, y preseleccionar con ?service=crypto (como el sitio anterior).
    const pre = new URLSearchParams(window.location.search).get("service");
    const valido = servicios.find((x) => x.value === pre)?.value;
    if (valido) setServicio(valido); // eslint-disable-line react-hooks/set-state-in-effect -- se lee la URL una sola vez al montar
    if (window.location.hash === "#consulta" || window.location.hash === "#contactos") consulta.current?.showModal();

    let stored: string | null = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch { /* sin almacenamiento */ }
    const t = setTimeout(() => setConsent(stored), 1500);

    return () => {
      window.removeEventListener("jc:dialog", onDialog);
      window.removeEventListener("jc:toast", onToast);
      clearTimeout(timer);
      clearTimeout(t);
    };
  }, []);

  const decide = (value: "all" | "essential") => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* sin almacenamiento */ }
    setConsent(value);
  };

  const closeOnBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };

  /** Envía a Formspree (llega al correo de Jean Charles). Si falla, ofrece WhatsApp con el mismo mensaje. */
  const submitBooking = async (e: FormEvent<HTMLFormElement>) => {
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

  const submitWaitlist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    // TODO(fase 2): guardar en Supabase (tabla `waitlist`) vía Server Action.
    try {
      const list = JSON.parse(localStorage.getItem("jc_waitlist") || "[]");
      list.push({ email, at: new Date().toISOString() });
      localStorage.setItem("jc_waitlist", JSON.stringify(list));
    } catch { /* sin almacenamiento */ }
    form.reset();
    lista.current?.close();
    toast("¡Listo! Estás dentro. Revisa tu bandeja de entrada.");
  };

  const calendly = site.calendlyUrl
    ? (() => {
        const u = new URL(site.calendlyUrl);
        u.searchParams.set("hide_gdpr_banner", "1");
        u.searchParams.set("background_color", "0d0d11");
        u.searchParams.set("text_color", "efe8da");
        u.searchParams.set("primary_color", "e0b84a");
        return u.toString();
      })()
    : "";

  return (
    <>
      <dialog ref={consulta} className="modal" id="consulta" aria-labelledby="consulta-title" onClick={closeOnBackdrop}>
        <div className="modal__head">
          <div>
            <span className="eyebrow">Aplicación privada</span>
            <h2 className="display h3" id="consulta-title" style={{ marginTop: ".6rem" }}>Agenda tu consultoría</h2>
          </div>
          <button className="modal__close" type="button" aria-label="Cerrar" onClick={() => consulta.current?.close()}>✕</button>
        </div>
        <div className="modal__body">
          {calendly ? (
            <iframe className="calendly-frame" src={calendly} title="Agenda con Jean Charles" loading="lazy" />
          ) : (
            enviado ? (
              <div className="form-grid" style={{ textAlign: "center", justifyItems: "center", paddingBlock: "1.5rem" }}>
                <span className="eyebrow eyebrow--plain">Solicitud recibida</span>
                <p className="display h3">Gracias. <span className="italic gold-text">Hablamos pronto.</span></p>
                <p className="muted">El equipo de Jean Charles te contactará personalmente. Si prefieres adelantar la conversación:</p>
                <a className="btn btn--gold" href={whatsappLink()} target="_blank" rel="noopener">Escribir por WhatsApp</a>
              </div>
            ) : (
            <form className="form-grid" onSubmit={submitBooking}>
              <p className="muted" style={{ fontSize: ".95rem" }}>
                Cuéntanos sobre tu proyecto o interés. El equipo de Jean Charles revisa cada solicitud personalmente.
              </p>
              <div className="form-grid form-grid--2">
                <div className="field"><label htmlFor="b-nombre">Nombre completo</label><input className="input" id="b-nombre" name="full_name" autoComplete="name" required /></div>
                <div className="field"><label htmlFor="b-email">Email</label><input className="input" id="b-email" name="email" type="email" autoComplete="email" required /></div>
              </div>
              <div className="form-grid form-grid--2">
                <div className="field"><label htmlFor="b-tel">Teléfono / WhatsApp</label><input className="input" id="b-tel" name="phone" type="tel" autoComplete="tel" required /></div>
                <div className="field">
                  <label htmlFor="b-servicio">Me interesa</label>
                  <select className="select" id="b-servicio" name="service" required value={servicio} onChange={(ev) => setServicio(ev.target.value as ServicioId)}>
                    <option value="" disabled>Selecciona una opción</option>
                    {servicios.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="b-msg">Tu proyecto o interés</label>
                <textarea className="textarea" id="b-msg" name="message" required placeholder="Ej. quiero estructurar mi portafolio y escalar mi negocio digital" />
              </div>
              <button className="btn btn--gold btn--block" type="submit" disabled={enviando}>
                {enviando ? "Enviando…" : <>Agendar una reunión <span className="arrow" aria-hidden="true">→</span></>}
              </button>
              <p className="form-note">Al enviar aceptas nuestra <Link href="/privacidad" style={{ textDecoration: "underline" }}>política de privacidad</Link>. También puedes escribir a <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>{site.email}</a>.</p>
            </form>
            )
          )}
        </div>
      </dialog>

      <dialog ref={lista} className="modal" id="lista" aria-labelledby="lista-title" onClick={closeOnBackdrop}>
        <div className="modal__head">
          <div>
            <span className="eyebrow">Acceso anticipado</span>
            <h2 className="display h3" id="lista-title" style={{ marginTop: ".6rem" }}>Lista de espera</h2>
          </div>
          <button className="modal__close" type="button" aria-label="Cerrar" onClick={() => lista.current?.close()}>✕</button>
        </div>
        <div className="modal__body">
          <p className="muted">Sé el primero en recibir el libro, los nuevos cursos y las fechas de próximas conferencias.</p>
          <form className="form-grid" onSubmit={submitWaitlist}>
            <div className="field"><label htmlFor="w-email">Email</label><input className="input" id="w-email" name="email" type="email" autoComplete="email" required /></div>
            <button className="btn btn--gold btn--block" type="submit">Unirme</button>
          </form>
        </div>
      </dialog>

      <div className={`cookie${consent === null ? " is-visible" : ""}`} role="region" aria-label="Preferencias de cookies">
        <p>
          Usamos cookies analíticas para mejorar tu experiencia, solo si lo autorizas. Más detalles en nuestra{" "}
          <Link href="/privacidad">política de privacidad</Link>.
        </p>
        <div className="cookie__actions">
          <button className="btn btn--gold btn--sm" type="button" onClick={() => decide("all")}>Aceptar</button>
          <button className="btn btn--sm" type="button" onClick={() => decide("essential")}>Solo esenciales</button>
        </div>
      </div>

      {consent === "all" && site.gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      <div className={`toast${toastMsg ? " is-visible" : ""}`} role="status" aria-live="polite">{toastMsg}</div>
    </>
  );
}
