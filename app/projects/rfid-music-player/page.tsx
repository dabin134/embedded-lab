import Link from "next/link";
import { ProjectRoadmap } from "@/components/project-roadmap";

const hardware = [
  ["Raspberry Pi 4 Model B", "Embedded-Linux-Host, GPIO, SPI, Netzwerk und Mediensteuerung"],
  ["MFRC522 / RC522", "13,56-MHz-RFID-Frontend und SPI-Peripherie"],
  ["13,56-MHz-RFID-Tags", "physische Album-Identitäten für die Zuordnung"],
  ["Breadboard, LED, 330-Ω-Widerstand", "kontrollierter Einstieg in Stromkreis und GPIO"],
  ["Dupont-Kabel + Multimeter", "Aufbau, Messung und systematisches Debugging"],
  ["microSD + Pi-Netzteil", "Betriebssystem und stabile Versorgung"],
  ["Stereoanlage / Aktivlautsprecher", "hörbare Ausgabe; optional über USB-DAC"],
];

const learningGoals = [
  "einen Embedded-Aufbau in Subsysteme und Schnittstellen zerlegen",
  "Spannung, Strom, Widerstand, GND und Logikpegel praktisch messen",
  "GPIO und SPI nicht nur benutzen, sondern elektrisch und protokollarisch erklären",
  "den MFRC522 über Datenblatt, Register und RFID-Physik verstehen",
  "UIDs als Daten modellieren und von ihrer Anwendungsbedeutung trennen",
  "Hardware-, Software-, Audio- und Netzwerkfehler methodisch auseinanderhalten",
];

export default function RfidProjectPage() {
  return (
    <>
      <section className="project-hero section-pad">
        <div className="project-hero-main">
          <div className="eyebrow"><span /> Project 001 · Einstieg in Embedded Systems</div>
          <h1>RFID-<br /><em>Musikplayer</em></h1>
          <p>
            Baue die RFID-Jukebox aus dem Referenzvideo mit Raspberry Pi 4 und MFRC522 nach – aber nicht als Copy-and-paste-Tutorial. Jeder Projektschritt führt von einer beobachtbaren Funktion zu den elektrischen, physikalischen und softwareseitigen Grundlagen dahinter.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects/rfid-music-player/steps/system-verstehen">Mit Schritt 1 beginnen →</Link>
            <a className="button ghost" href="#roadmap">Lernpfad ansehen</a>
          </div>
        </div>
        <aside className="project-spec">
          <div><span>Ergebnis</span><strong>Funktionierende RFID-Jukebox</strong></div>
          <div><span>Umfang</span><strong>11 Lernschritte · ca. 9–12 h</strong></div>
          <div><span>Kernhardware</span><strong>Raspberry Pi 4 · MFRC522</strong></div>
          <div><span>Lernmodus</span><strong>Predict → Build → Measure → Explain</strong></div>
        </aside>
      </section>

      <section className="system-strip">
        <div><span>01</span><b>Couple</b><small>13,56 MHz · Tag</small></div><i>→</i>
        <div><span>02</span><b>Transfer</b><small>SPI · Register</small></div><i>→</i>
        <div><span>03</span><b>Interpret</b><small>UID · Mapping</small></div><i>→</i>
        <div><span>04</span><b>Act</b><small>Audio · Spotify</small></div>
      </section>

      <section className="section-pad project-foundation">
        <div className="section-heading">
          <div><div className="section-kicker">Projektidee</div><h2>Ein Gerät.<br />Mehrere Abstraktionsebenen.</h2></div>
          <p>Der RFID-Musikplayer ist unser roter Faden. Concepts werden als wiederverwendbares Fachwissen gepflegt, Components erklären konkrete Bauteile und die Project Steps setzen beides in einer realen Handlung zusammen.</p>
        </div>
        <div className="foundation-grid">
          <article><span>PROJECT STEP</span><h3>Was mache ich jetzt?</h3><p>Ein klarer praktischer Schritt mit beobachtbarem Ergebnis, Messung, Debugging und Erfolgskriterium.</p></article>
          <article><span>COMPONENT</span><h3>Womit mache ich es?</h3><p>Raspberry Pi, MFRC522, RFID-Tag oder Messgerät werden über Funktion, Pins, Schnittstellen und Grenzen erklärt.</p></article>
          <article><span>CONCEPT</span><h3>Warum funktioniert es?</h3><p>Spannung, GPIO, SPI, Register, Induktion oder Zustandslogik bleiben projektunabhängig und können später wiederverwendet werden.</p></article>
        </div>
      </section>

      <section className="section-pad project-equipment">
        <div className="section-heading">
          <div><div className="section-kicker">Hardware</div><h2>Was du für Projekt 001 brauchst.</h2></div>
          <p>Wir kaufen möglichst wenig Spezialhardware. Breadboard, Multimeter und Jumper bleiben für alle folgenden Embedded-Projekte relevant.</p>
        </div>
        <div className="equipment-grid">
          {hardware.map(([name, role], index) => (
            <div key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><p>{role}</p></div></div>
          ))}
        </div>
      </section>

      <section className="section-pad project-goals">
        <div className="section-heading">
          <div><div className="section-kicker">Lernziele</div><h2>Am Ende soll nicht nur Musik laufen.</h2></div>
          <p>Das Gerät ist das sichtbare Ergebnis. Das eigentliche Ziel ist ein belastbares mentales Modell, das du in das nächste Projekt mitnehmen kannst.</p>
        </div>
        <div className="goal-list">
          {learningGoals.map((goal, index) => <div key={goal}><span>{String(index + 1).padStart(2, "0")}</span><p>{goal}</p></div>)}
        </div>
      </section>

      <section className="section-pad roadmap-section" id="roadmap">
        <div className="section-heading">
          <div><div className="section-kicker">Lernpfad</div><h2>Vom ersten Signal<br />zum ganzen Gerät.</h2></div>
          <p>Jeder Schritt hat ein überprüfbares Ergebnis. Concepts werden genau dort verknüpft, wo sie im Projekt eine echte Funktion bekommen.</p>
        </div>
        <ProjectRoadmap />
      </section>

      <section className="section-pad project-reference">
        <div className="reference-card">
          <div><div className="section-kicker">Referenz & Abgrenzung</div><h2>Wir bauen das Original nach – und gehen fachlich tiefer.</h2></div>
          <p>Ausgangspunkt ist Tala Exes „Modern Day Record Player“ mit Raspberry Pi 4, RC522 und Spotify. Embedded Lab übernimmt die Projektidee, strukturiert sie aber als Lernpfad: lokale Tests vor Integration, Messungen statt bloßer Verkabelung, Datenblattarbeit und klare Trennung von Concepts, Components und Project Steps.</p>
          <div className="reference-links">
            <a href="https://talaexe.com/moderndayrecordplayer/" target="_blank" rel="noreferrer">Originalprojekt ↗</a>
            <a href="https://www.nxp.com/docs/en/data-sheet/MFRC522.pdf" target="_blank" rel="noreferrer">MFRC522-Datenblatt ↗</a>
            <a href="https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header" target="_blank" rel="noreferrer">Raspberry-Pi-GPIO-Dokumentation ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}
