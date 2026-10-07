import { site, whatsappLink } from "@/lib/site";

/** Acceso directo a WhatsApp, siempre a mano (como en el sitio anterior). */
export function WhatsAppFloat() {
  if (!site.whatsapp) return null;
  return (
    <a className="wa-float" href={whatsappLink()} target="_blank" rel="noopener" aria-label={`Escribir a Jean Charles por WhatsApp (${site.phoneLabel})`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 13.7 13.7 0 0 0 5.3 4.6c2 .8 2.7.9 3.7.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.3-1.7a11.8 11.8 0 0 0 5.6 1.4A11.9 11.9 0 0 0 20.4 3.6z" />
      </svg>
    </a>
  );
}
