"use client";

import type { ServicioId } from "@/lib/site";

// Pequeño bus de eventos para abrir diálogos y mostrar toasts desde cualquier componente.
export type DialogId = "consulta" | "lista";

export function openDialog(id: DialogId, servicio?: ServicioId) {
  window.dispatchEvent(new CustomEvent<{ id: DialogId; servicio?: ServicioId }>("jc:dialog", { detail: { id, servicio } }));
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>("jc:toast", { detail: message }));
}
