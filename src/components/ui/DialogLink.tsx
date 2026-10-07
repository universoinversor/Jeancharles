"use client";

import type { ReactNode } from "react";
import { openDialog, type DialogId } from "@/lib/ui-events";
import type { ServicioId } from "@/lib/site";

/** Enlace que abre un diálogo; sin JS sigue apuntando al ancla. */
export function DialogLink({
  dialog,
  servicio,
  className,
  children,
}: {
  dialog: DialogId;
  servicio?: ServicioId;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={servicio ? `?service=${servicio}#${dialog}` : `#${dialog}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openDialog(dialog, servicio);
      }}
    >
      {children}
    </a>
  );
}
