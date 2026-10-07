"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BookingForm } from "@/components/ui/BookingForm";
import { servicios, site, type ServicioId } from "@/lib/site";
import { toast, type DialogId } from "@/lib/ui-events";

const CONSENT_KEY = "jc_consent";

/** Diálogos globales (consulta, lista de espera), toast y consentimiento de cookies. */
export function Overlays() {
  const consulta = useRef<HTMLDialogElement>(null);
  const lista = useRef<HTMLDialogElement>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [consent, setConsent] = useState<string | null>("pending");
  const [servicio, setServicio] = useState<ServicioId | "">("");
  const [apertura, setApertura] = useState(0);

  useEffect(() => {
    const onDialog = (e: Event) => {
      const { id, servicio: srv } = (e as CustomEvent<{ id: DialogId; servicio?: ServicioId }>).detail;
      if (srv) setServicio(srv);
      if (id === "consulta") setApertura((n) => n + 1);
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
    // Enlaces viejos a #contactos: si la página tiene sección Contacto se va ahí; si no, se abre el diálogo.
    const contacto = document.getElementById("contacto");
    if (window.location.hash === "#contactos" && contacto) contacto.scrollIntoView();
    else if (window.location.hash === "#consulta" || window.location.hash === "#contactos") consulta.current?.showModal();

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
            <>
              <p className="muted" style={{ fontSize: ".95rem", marginBottom: "1rem" }}>
                Cuéntanos sobre tu proyecto o interés. El equipo de Jean Charles revisa cada solicitud personalmente.
              </p>
              <BookingForm key={apertura} idPrefix="b" servicio={servicio} onServicio={setServicio} />
            </>
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
