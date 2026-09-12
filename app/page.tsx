import Link from "next/link";
import { SpiSignalDemo } from "@/components/spi-signal-demo";
import { rfidSteps } from "@/lib/data";

const paths = [
  { n: "01", title: "Bauen", text: "Lerne entlang echter Projekte. Jeder Schritt erzeugt ein sicht- oder messbares Ergebnis.", href: "/projects", label: "Projekte entdecken" },
  { n: "02", title: "Verstehen", text: "Vertiefe wiederverwendbare Konzepte wie GPIO, SPI, Register, RFID und digitales Audio.", href: "/concepts", label: "Konzepte öffnen" },
  { n: "03", title: "Experimentieren", text: "Untersuche Signale, Pins, Protokolle und Messwerte in interaktiven Laborbausteinen.", href: "/lab", label: "Ins Lab" },
  { n: "04", title: "Wiederholen", text: "Verdichte Wissen, prüfe mentale Modelle und finde gezielt Lücken statt Seiten auswendig zu lernen.", href: "/knowledge", label: "Wissen prüfen" },
];

export default function Home() {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Lernsystem für Embedded Engineering</div>
          <h1>Baue Systeme.<br /><em>Verstehe</em> jedes Signal.</h1>
          <p className="lead">Embedded Lab verbindet reale Projekte mit wiederverwendbaren Concepts und Components. Nicht nur nachbauen – sondern erklären können, warum es funktioniert.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects/rfid-music-player">RFID-Musikplayer starten <span>→</span></Link>
            <Link className="button ghost" href="/concepts">Konzeptbibliothek</Link>
          </div>
          <div className="hero-stats">
            <div><strong>11</strong><span>Projektstufen</span></div>
            <div><strong>8</strong><span>Kernkonzepte</span></div>
            <div><strong>6</strong><span>Bauteile</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Systemdiagramm RFID-Musikplayer">
          <div className="visual-top"><span>PROJECT / 001</span><span className="status"><i /> READY</span></div>
          <div className="system-flow">
            <div className="system-node"><small>INPUT</small><b>RFID</b><span>13.56 MHz</span></div>
            <div className="flow-arrow">→</div>
            <div className="system-node active"><small>PROCESS</small><b>ESP32</b><span>UID → Track</span></div>
            <div className="flow-arrow">→</div>
            <div className="system-node"><small>OUTPUT</small><b>AUDIO</b><span>I²S → Speaker</span></div>
          </div>
          <div className="mini-board">
            <div className="board-chip"><span>ESP32</span><i /><i /><i /><i /></div>
            <div className="board-lines"><i /><i /><i /><i /><i /></div>
            <div className="board-module">MFRC522</div>
          </div>
          <div className="visual-bottom"><span>Next: {rfidSteps[0].title}</span><span>01 / 11</span></div>
        </div>
      </section>

      <section className="section-pad intro-section">
        <div className="section-kicker">Vier Zugänge · ein Wissensnetz</div>
        <div className="section-heading"><h2>Wähle deinen Einstieg.<br />Das Wissen bleibt verbunden.</h2><p>Projects referenzieren Concepts und Components, anstatt dieselben Erklärungen immer wieder zu kopieren. Was du einmal wirklich verstanden hast, nimmst du in jedes neue Projekt mit.</p></div>
        <div className="path-grid">
          {paths.map((path) => <Link href={path.href} className="path-card" key={path.n}><span className="path-number">{path.n}</span><h3>{path.title}</h3><p>{path.text}</p><span className="card-link">{path.label} →</span></Link>)}
        </div>
      </section>

      <section className="section-pad dark-section">
        <div className="section-kicker light">Nicht Black Box lernen</div>
        <div className="lab-showcase">
          <div>
            <h2>Sieh, was zwischen<br />zwei Codezeilen passiert.</h2>
            <p>Protokolle, Register und physikalische Signale werden als eigene Lernobjekte sichtbar. Der Code ist nur eine Ebene des Systems.</p>
            <Link className="text-link light" href="/lab">Alle Lab-Module ansehen →</Link>
          </div>
          <SpiSignalDemo />
        </div>
      </section>

      <section className="section-pad project-feature">
        <div className="feature-index">001</div>
        <div className="feature-copy"><div className="section-kicker">Erstes vollständiges Projekt</div><h2>RFID-Musikplayer</h2><p>Vom ersten Stromkreis bis zur integrierten Jukebox. Elf Lernschritte bauen technisch und didaktisch aufeinander auf – mit einem echten Gerät als Ergebnis.</p><Link className="button primary" href="/projects/rfid-music-player">Projekt öffnen <span>→</span></Link></div>
        <div className="feature-steps">{rfidSteps.slice(0, 6).map((step) => <div key={step.id}><span>{String(step.number).padStart(2, "0")}</span><b>{step.title}</b><small>{step.phase}</small></div>)}</div>
      </section>
    </>
  );
}
