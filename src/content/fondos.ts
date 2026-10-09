// Imágenes de lujo para los fondos "a medio ver" (desenfocadas, con paralaje).
// Unsplash (licencia libre, enlace directo permitido). Para usar fotos propias: ponerlas en public/fondos/ y cambiar la ruta.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=55`;

export const fondos = {
  villa: u("photo-1613490493576-7fde63acd811"),
  casa: u("photo-1512917774080-9991f1c4c750"),
  rascacielos: u("photo-1486406146926-c627a92ad1ab"),
  ciudad: u("photo-1477959858617-67f85cf4f1df"),
  reloj: u("photo-1523170335258-f5ed11844a49"),
  deportivo: u("photo-1503376780353-7e6692767b70"),
} as const;

export type FondoId = keyof typeof fondos;
