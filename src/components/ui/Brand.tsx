/* eslint-disable @next/next/no-img-element -- recursos de marca locales en /public/brand */
import Link from "next/link";

/** Logo oficial: escudo león-águila + wordmark. */
export function Brand({ height = 42 }: { height?: number }) {
  return (
    <Link href="/" className="brand brand-lockup" aria-label="Jean Charles — Inicio">
      <img className="brand-lockup__crest" src="/brand/crest.webp" alt="" width={440} height={480} style={{ height }} />
      <img className="brand-lockup__word" src="/brand/wordmark.webp" alt="Jean Charles" width={579} height={70} style={{ height: Math.round(height * 0.4) }} />
    </Link>
  );
}
