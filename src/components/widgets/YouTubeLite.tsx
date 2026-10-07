"use client";

/* eslint-disable @next/next/no-img-element -- miniatura remota de YouTube */
import { useState } from "react";

/** Miniatura que solo carga el reproductor (sin cookies) al hacer clic. */
export function YouTubeLite({ id, kicker, title, className = "", delay }: { id: string; kicker: string; title: string; className?: string; delay?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={`yt reveal ${className}`}
      style={delay ? ({ "--d": delay } as React.CSSProperties) : undefined}
      aria-label={`Reproducir: ${title}`}
      onClick={() => setPlaying(true)}
    >
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
      <span className="yt__play" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
      <span className="yt__meta"><span>{kicker}</span><strong>{title}</strong></span>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </button>
  );
}
