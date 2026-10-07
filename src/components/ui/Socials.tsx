import { site, type SocialKey } from "@/lib/site";

const ICONS: Record<SocialKey, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z" /></svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4L23 21.7h-6.8l-5.3-6.9-6.1 6.9H1.4l7.9-9L.9 2.3h7l4.8 6.3 5.5-6.3zm-1.2 17.4h1.9L7.1 4.2H5.1l11.9 15.5z" /></svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6a22 22 0 0 0-2.5-.1c-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.7v8z" /></svg>
  ),
};

const LABELS: Record<SocialKey, string> = {
  instagram: "Instagram", youtube: "YouTube", tiktok: "TikTok", linkedin: "LinkedIn", x: "X", facebook: "Facebook",
};

export function Socials() {
  const keys = (Object.keys(site.social) as SocialKey[]).filter((k) => site.social[k]);
  return (
    <div className="socials">
      {keys.map((k) => (
        <a key={k} href={site.social[k]} target="_blank" rel="noopener" aria-label={`Jean Charles en ${LABELS[k]}`}>
          {ICONS[k]}
        </a>
      ))}
    </div>
  );
}
