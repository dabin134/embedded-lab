import Link from "next/link";

const nav = [
  ["Projekte", "/projects"],
  ["Konzepte", "/concepts"],
  ["Bauteile", "/components"],
  ["Lab", "/lab"],
  ["Wissen", "/knowledge"],
] as const;

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand brand-with-crest" href="/" aria-label="Embedded Lab Startseite">
        <span className="brand-crest" aria-hidden="true">
          <img src={`${publicBase}/embedded-labby-crest.svg`} alt="" />
        </span>
        <span className="brand-wordmark-small">EMBEDDED <b>LAB</b></span>
      </Link>
      <nav className="main-nav" aria-label="Hauptnavigation">
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="/projects/rfid-music-player">Projekt starten <span>↗</span></Link>
    </header>
  );
}
