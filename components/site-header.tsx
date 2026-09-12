import Link from "next/link";

const nav = [
  ["Projekte", "/projects"],
  ["Konzepte", "/concepts"],
  ["Bauteile", "/components"],
  ["Lab", "/lab"],
  ["Wissen", "/knowledge"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Embedded Lab Startseite">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>EMBEDDED <b>LAB</b></span>
      </Link>
      <nav className="main-nav" aria-label="Hauptnavigation">
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="/projects/rfid-music-player">Projekt starten <span>↗</span></Link>
    </header>
  );
}
