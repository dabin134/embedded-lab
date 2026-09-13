import Link from "next/link";

const futureProjects = [
  {
    number: "002",
    title: "Quadcopter / Drone",
    description: "Motoren, ESCs, IMU, Sensorfusion, Regelung, Mechanik und später Kamera – als nächster großer Schritt von Embedded Systems zu Robotik.",
    tags: ["Motoren", "IMU", "PID", "Mechanik"],
  },
  {
    number: "003",
    title: "Robot Car",
    description: "Sensoren, Motorsteuerung, Energieversorgung und Zustandslogik in einem mobilen System verbinden.",
    tags: ["Motor Driver", "Sensorik", "Control", "Power"],
  },
  {
    number: "004",
    title: "Thermostat",
    description: "Messen, Soll- und Istwert vergleichen und einen Aktor regeln – ein kompaktes Projekt für Sensorik und Regelkreise.",
    tags: ["Temperatur", "Feedback", "Aktor", "Regelung"],
  },
  {
    number: "005",
    title: "Local-first Home Network",
    description: "Eigene Dienste im Heimnetz betreiben und verstehen, welche Funktionen lokal, offline und unabhängig von Cloud-Anbietern möglich sind.",
    tags: ["Linux", "Netzwerk", "Services", "Local-first"],
  },
];

export default function ProjectsPage() {
  return (
    <section className="section-pad page-top">
      <div className="page-intro">
        <div className="eyebrow"><span /> Build path</div>
        <h1>Projekte sind der<br />rote Faden.</h1>
        <p>Du lernst nicht zuerst Theorie auf Vorrat. Ein reales System erzeugt Fragen – Concepts und Components liefern genau dann die Tiefe, wenn du sie brauchst. Gelerntes Wissen wird in späteren Projekten wieder aufgegriffen statt neu dupliziert.</p>
      </div>
      <div className="project-list">
        <Link className="project-list-card featured" href="/projects/rfid-music-player">
          <div className="project-number">001</div>
          <div>
            <span className="badge">Aktiv · Referenzprojekt</span>
            <h2>RFID-Musikplayer</h2>
            <p>RFID-Karte auflegen, UID erkennen, Album zuordnen und Musik abspielen – vom ersten Stromkreis über SPI und Induktion bis zur Systemintegration.</p>
            <div className="project-tags"><span>Raspberry Pi 4</span><span>MFRC522</span><span>SPI</span><span>RFID</span><span>Python</span></div>
          </div>
          <div className="project-side"><strong>11</strong><span>Lernschritte</span><i>→</i></div>
        </Link>

        {futureProjects.map((project) => (
          <div className="project-list-card muted" key={project.number}>
            <div className="project-number">{project.number}</div>
            <div>
              <span className="badge subtle">Späteres Projekt</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="project-side"><strong>—</strong><span>noch nicht ausgearbeitet</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
