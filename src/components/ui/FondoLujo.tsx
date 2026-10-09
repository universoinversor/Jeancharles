import { fondos, type FondoId } from "@/content/fondos";

/**
 * Imagen de lujo detrás de una sección, a medio ver: desenfocada, teñida en oro y con paralaje al hacer scroll.
 * Va como primer hijo de una <section className="... has-fondo">. Si la imagen no carga, simplemente no se ve.
 */
export function FondoLujo({ img, pos = "center" }: { img: FondoId; pos?: string }) {
  return <div className="fondo-lujo" aria-hidden="true" style={{ backgroundImage: `url("${fondos[img]}")`, backgroundPosition: pos }} />;
}
