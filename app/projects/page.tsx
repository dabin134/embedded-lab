import Link from "next/link";

export default function ProjectsPage() {
  return (
    <section className="section-pad page-top">
      <div className="page-intro"><div className="eyebrow"><span /> Build path</div><h1>Projekte sind der<br />rote Faden.</h1><p>Du lernst nicht zuerst Theorie auf Vorrat. Ein reales System erzeugt Fragen – Concepts und Components liefern genau dann die Tiefe, wenn du sie brauchst.</p></div>
      <div className="project-list">
        <Link className="project-list-card featured" href="/projects/rfid-music-player">
          <div className="project-number">001</div>
          <div><span className="badge">Aktiv · Starterprojekt</span><h2>RFID-Musikplayer</h2><p>RFID-Karte auflegen, UID erkennen, Track zuordnen und Musik abspielen – vom Stromkreis bis zur Systemintegration.</p><div className="project-tags"><span>ESP32</span><span>MFRC522</span><span>SPI</span><span>RFID</span><span>Audio</span></div></div>
          <div className="project-side"><strong>11</strong><span>Lernschritte</span><i>→</i></div>
        </Link>
        <div className="project-list-card muted"><div className="project-number">002</div><div><span className="badge subtle">Als Nächstes</span><h2>Environmental Node</h2><p>Sensorik, I²C, Sampling und drahtlose Telemetrie als zweites Projekt mit wiederverwendetem Grundlagenwissen.</p></div><div className="project-side"><strong>—</strong><span>in Planung</span></div></div>
      </div>
    </section>
  );
}
