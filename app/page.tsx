import Link from "next/link";
import { SpiSignalDemo } from "@/components/spi-signal-demo";
import { rfidSteps } from "@/lib/data";

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const paths = [
  {
    n: "01",
    title: "Bauen",
    text: "Lerne an echten Systemen. Jeder Schritt endet mit etwas, das du sehen, messen oder erklären kannst.",
    href: "/projects",
    label: "Projekte entdecken",
    className: "path-build",
  },
  {
    n: "02",
    title: "Verstehen",
    text: "GPIO, SPI, Register oder RFID werden zu wiederverwendbarem Wissen statt zu Einmal-Erklärungen.",
    href: "/concepts",
    label: "Concepts öffnen",
    className: "path-understand",
  },
  {
    n: "03",
    title: "Experimentieren",
    text: "Beobachte Pins, Protokolle und Signale in kleinen interaktiven Laboren statt sie nur zu lesen.",
    href: "/lab",
    label: "Ins Lab",
    className: "path-lab",
  },
  {
    n: "04",
    title: "Wiederholen",
    text: "Prüfe mentale Modelle mit Recall-Fragen und repariere gezielt die Stellen, die noch unscharf sind.",
    href: "/knowledge",
    label: "Wissen prüfen",
    className: "path-recall",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero-wrap">
        <div className="home-bento">
          <article className="bento-card hero-story-card">
            <div className="soft-eyebrow"><span /> Embedded Engineering, das man wirklich versteht</div>
            <h1>
              Baue echte Systeme.
              <br />
              <em>Verstehe, was darin passiert.</em>
            </h1>
            <p>
              Embedded Lab verbindet Projekte, Concepts und Components zu einem Lernsystem. Du baust nicht bloß nach – du siehst, misst und erklärst die Zusammenhänge dahinter.
            </p>
            <div className="hero-actions soft-actions">
              <Link className="soft-button primary" href="/projects/rfid-music-player">
                RFID-Musikplayer starten <span>↗</span>
              </Link>
              <Link className="soft-button secondary" href="/concepts">
                Concepts ansehen
              </Link>
            </div>
            <div className="soft-stats">
              <div><strong>11</strong><span>Lernschritte</span></div>
              <div><strong>11</strong><span>Concepts</span></div>
              <div><strong>7</strong><span>Components</span></div>
            </div>
          </article>

          <Link className="bento-card hero-project-card" href="/projects/rfid-music-player">
            <div className="card-topline">
              <span>PROJECT 001</span>
              <span className="soft-status"><i /> aktiv</span>
            </div>
            <div className="project-orbit" aria-hidden="true">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-chip">RFID</div>
              <div className="orbit-core">PI 4</div>
              <div className="orbit-node">AUDIO</div>
            </div>
            <div className="project-card-copy">
              <small>Starterprojekt</small>
              <h2>RFID-Musikplayer</h2>
              <p>Vom ersten Stromkreis bis zur funktionierenden Raspberry-Pi-Jukebox.</p>
            </div>
            <div className="project-card-footer">
              <span>01 → 11</span>
              <b>Projekt öffnen →</b>
            </div>
          </Link>

          <Link className="bento-card hero-concept-card" href="/concepts/spi">
            <div className="card-topline"><span>CONCEPT</span><span>05 / SPI</span></div>
            <div className="concept-lines" aria-hidden="true">
              <span>SCK</span><i /><span>MOSI</span><i /><span>MISO</span><i />
            </div>
            <div>
              <small>Wiederverwendbares Wissen</small>
              <h3>Ein Konzept.<br />Viele Projekte.</h3>
            </div>
          </Link>

          <Link className="bento-card hero-lab-card" href="/lab">
            <div className="card-topline"><span>LAB / LIVE</span><span className="lab-pulse" /></div>
            <div className="micro-wave" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div>
              <small>Signale sichtbar machen</small>
              <h3>Zwischen Code<br />und Hardware.</h3>
            </div>
          </Link>

          <article className="bento-card hero-note-card">
            <span className="note-mark">↳</span>
            <p>„Ich kann es erklären“ ist das eigentliche Erfolgskriterium.</p>
            <span className="note-caption">Build · Observe · Explain</span>
          </article>
        </div>
      </section>

      <section className="brand-mission-strip" aria-labelledby="mission-heading">
        <div className="brand-mission-mark">
          <img src={`${publicBase}/embedded-labby-logo.webp`} alt="Embedded-Labby Wappen mit Adler, offenem Buch und dem Leitmotiv Ideas · Systems · Real World" />
        </div>
        <div className="brand-mission-copy">
          <div className="soft-eyebrow"><span /> Leitbild</div>
          <h2 id="mission-heading">Ideen verstehen. Systeme bauen. In die reale Welt bringen.</h2>
          <p>
            Das Wappen steht für die Mission hinter Embedded Lab: Wissen nicht als isolierte Theorie zu sammeln, sondern es in nachvollziehbare Systeme, Experimente und reale Anwendungen zu übersetzen.
          </p>
          <div className="brand-values" aria-label="Leitwerte">
            <span>Ideas</span><span>Systems</span><span>Real World</span>
          </div>
        </div>
      </section>

      <section className="soft-section learning-section">
        <div className="soft-section-head">
          <div>
            <div className="soft-eyebrow"><span /> Ein Wissensnetz statt einzelner Lektionen</div>
            <h2>Vier Zugänge.<br />Ein zusammenhängendes System.</h2>
          </div>
          <p>
            Projects erzeugen die Fragen. Concepts erklären die Prinzipien. Components zeigen, wie diese Prinzipien in echter Hardware auftauchen. Das Lab verbindet alles mit Beobachtung.
          </p>
        </div>

        <div className="soft-path-grid">
          {paths.map((path) => (
            <Link href={path.href} className={`soft-path-card ${path.className}`} key={path.n}>
              <div className="path-head"><span>{path.n}</span><i>↗</i></div>
              <div className="path-symbol" aria-hidden="true"><b /><i /><i /></div>
              <h3>{path.title}</h3>
              <p>{path.text}</p>
              <span className="path-cta">{path.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="soft-section lab-section-soft">
        <div className="lab-shell">
          <div className="lab-copy-soft">
            <div className="soft-eyebrow dark"><span /> Nicht Black Box lernen</div>
            <h2>Unsichtbare Vorgänge<br />werden beobachtbar.</h2>
            <p>
              In Embedded Systems passiert das Entscheidende zwischen Software und Physik. Deshalb bekommen Signale, Register und Protokolle eigene interaktive Lernmodule.
            </p>
            <div className="lab-points">
              <span>Protocol traces</span>
              <span>Pinout explorer</span>
              <span>Register views</span>
            </div>
            <Link className="soft-button lab-button" href="/lab">Lab öffnen <span>→</span></Link>
          </div>
          <div className="lab-demo-frame">
            <div className="frame-label"><span>LIVE MODULE</span><span>SPI / TRACE</span></div>
            <SpiSignalDemo />
          </div>
        </div>
      </section>

      <section className="soft-section project-section-soft">
        <div className="project-editorial-card">
          <div className="project-editorial-intro">
            <div className="soft-eyebrow"><span /> Erstes vollständiges Lernprojekt</div>
            <h2>RFID-Musikplayer</h2>
            <p>
              Elf Schritte bilden einen nachvollziehbaren Lernbogen: Systemmodell, Embedded Linux, Elektronik, GPIO, SPI, RFID-Physik, Datenmodell, Audio und schließlich Integration.
            </p>
            <Link className="soft-button primary" href="/projects/rfid-music-player">Projekt öffnen <span>↗</span></Link>
          </div>
          <div className="project-editorial-list">
            {rfidSteps.slice(0, 6).map((step) => (
              <Link href={`/projects/rfid-music-player/steps/${step.id}`} key={step.id}>
                <span>{String(step.number).padStart(2, "0")}</span>
                <div><b>{step.title}</b><small>{step.phase}</small></div>
                <i>→</i>
              </Link>
            ))}
            <Link className="remaining-steps" href="/projects/rfid-music-player">
              <span>+5</span><div><b>Weitere Schritte</b><small>bis zum fertigen Gerät</small></div><i>↗</i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
