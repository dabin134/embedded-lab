import Link from "next/link";
import { ProjectRoadmap } from "@/components/project-roadmap";
import { stepLearning } from "@/lib/rfid-code";

const systemFlow = [
  {
    number: "01",
    title: "Karte erkennen",
    text: "Der RFID-Tag koppelt an das 13,56-MHz-Feld des Readers und antwortet kontaktlos.",
    meta: "RFID · Nahfeld",
  },
  {
    number: "02",
    title: "UID übertragen",
    text: "Der MFRC522 verarbeitet die Tag-Antwort und überträgt die gelesenen Daten per SPI an den Raspberry Pi.",
    meta: "MFRC522 · SPI",
  },
  {
    number: "03",
    title: "Musik zuordnen",
    text: "Die Software interpretiert die UID und ordnet ihr über das Mapping ein Album oder einen Track zu.",
    meta: "Python · Mapping",
  },
  {
    number: "04",
    title: "Musik ausgeben",
    text: "Der Player führt die gewählte Medienaktion aus und die Stereoanlage macht das Ergebnis hörbar.",
    meta: "Audio · Player",
  },
];

const hardware = [
  {
    name: "Raspberry Pi 4 Model B",
    category: "Rechner",
    role: "Embedded-Linux-Host, auf dem GPIO, SPI, Python, Netzwerk und Mediensteuerung zusammenlaufen.",
  },
  {
    name: "MFRC522 / RC522",
    category: "Reader",
    role: "13,56-MHz-RFID-Frontend: erzeugt das Feld, verarbeitet Tag-Antworten und kommuniziert über SPI.",
  },
  {
    name: "13,56-MHz-RFID-Tags",
    category: "Eingabe",
    role: "Passive physische Identitäten. Ihre UID wird später in der Software mit Musik verknüpft.",
  },
  {
    name: "Breadboard, LED & 330-Ω-Widerstand",
    category: "Grundschaltung",
    role: "Kontrollierter Einstieg in Stromkreis, Polarität, Widerstand und sichtbare GPIO-Zustände.",
  },
  {
    name: "Dupont-Kabel & Multimeter",
    category: "Labor",
    role: "Verbindungen herstellen, Spannungen prüfen und Hardwarefehler durch Messwerte statt Vermutungen eingrenzen.",
  },
  {
    name: "microSD & Pi-Netzteil",
    category: "Basis",
    role: "Massenspeicher für Raspberry Pi OS und stabile elektrische Versorgung des Rechners.",
  },
  {
    name: "Stereoanlage / Aktivlautsprecher",
    category: "Ausgabe",
    role: "Hörbare Ausgabe des Systems; bei Bedarf über einen geeigneten USB-DAC angebunden.",
  },
];

const learningGoals = [
  ["Systemdenken", "einen Embedded-Aufbau in Subsysteme, Verantwortlichkeiten und Schnittstellen zerlegen"],
  ["Elektronik", "Spannung, Strom, Widerstand, GND und digitale Logikpegel praktisch messen und begründen"],
  ["Kommunikation", "GPIO und SPI nicht nur benutzen, sondern elektrisch und protokollarisch erklären"],
  ["RFID", "den MFRC522 über Datenblatt, Register und die zugrunde liegende RFID-Physik verstehen"],
  ["Softwaremodell", "UIDs als Daten behandeln und sauber von ihrer späteren Anwendungsbedeutung trennen"],
  ["Engineering", "Hardware-, Software-, Audio- und Netzwerkfehler systematisch voneinander isolieren"],
];

const learningModes = [
  ["Quick Check", "Eine kleine, eindeutige Selbstkontrolle nach einem Concept oder einer Component."],
  ["Think Deeper", "Eine offene Erklärfrage: Ursache, Wirkung, Schnittstellen und Fachbegriffe selbst formulieren."],
  ["Connections", "Querverbindungen zu anderer Hardware und anderen Systemen – als Denkanstoß, noch nicht als Prüfung."],
  ["Transfer", "Erst nach dem Gesamtprojekt: das gelernte Modell auf ein neues technisches System übertragen."],
];

export default function RfidProjectPage() {
  const transferQuestions = stepLearning.integration.transfer ?? [];

  return (
    <main className="rfid-project-page">
      <section className="project-hero section-pad">
        <div className="project-hero-main">
          <div className="eyebrow"><span /> Project 001 · Einstieg in Embedded Systems</div>
          <h1>RFID-<br /><em>Musikplayer</em></h1>
          <p>
            Baue eine RFID-Jukebox mit Raspberry Pi 4 und MFRC522 – aber nicht als Copy-and-paste-Tutorial. Jeder Projektschritt führt von einer beobachtbaren Funktion zu den elektrischen, physikalischen und softwareseitigen Grundlagen dahinter.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects/rfid-music-player/steps/system-verstehen">Mit Schritt 1 beginnen →</Link>
            <a className="button ghost" href="#roadmap">Lernpfad ansehen</a>
          </div>
        </div>

        <aside className="project-spec" aria-label="Projektübersicht">
          <div><span>Ergebnis</span><strong>Funktionierende RFID-Jukebox</strong></div>
          <div><span>Lernpfad</span><strong>11 Schritte · ca. 9–12 Stunden</strong></div>
          <div><span>Kernhardware</span><strong>Raspberry Pi 4 + MFRC522</strong></div>
          <div><span>Methode</span><strong>Predict → Build → Measure → Explain</strong></div>
        </aside>
      </section>

      <section className="project-system-flow" aria-labelledby="system-flow-title">
        <div className="system-flow-head">
          <div>
            <div className="section-kicker">Systemweg</div>
            <h2 id="system-flow-title">Vom Auflegen der Karte bis zur Musik.</h2>
          </div>
          <p>Vier Funktionen reichen zunächst, um das Gesamtsystem mental zu ordnen. Die technischen Details erschließen wir anschließend Schritt für Schritt.</p>
        </div>
        <div className="system-flow-grid">
          {systemFlow.map((item, index) => (
            <article key={item.number}>
              <div className="flow-card-top"><span>{item.number}</span><small>{item.meta}</small></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {index < systemFlow.length - 1 && <i aria-hidden="true">→</i>}
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad project-foundation project-panel">
        <div className="section-heading">
          <div><div className="section-kicker">Projektidee</div><h2>Ein Gerät.<br />Drei Ebenen des Lernens.</h2></div>
          <p>Das Projekt ist der rote Faden. Concepts liefern das wiederverwendbare Fachwissen, Components erklären die reale Hardware und die Project Steps bringen beides in einer konkreten Handlung zusammen.</p>
        </div>
        <div className="foundation-grid">
          <article><span>PROJECT STEP</span><h3>Was mache ich?</h3><p>Ein praktischer Schritt mit beobachtbarem Ergebnis, Messung, Debugging und Erfolgskriterium.</p></article>
          <article><span>COMPONENT</span><h3>Womit mache ich es?</h3><p>Bauteile werden über Funktion, Schnittstellen, elektrische Bedingungen und Grenzen verstanden.</p></article>
          <article><span>CONCEPT</span><h3>Warum funktioniert es?</h3><p>Physik, Elektronik und Informatik werden als wiederverwendbares Wissen unabhängig vom Einzelprojekt erklärt.</p></article>
        </div>
      </section>

      <section className="section-pad project-equipment project-panel" id="hardware">
        <div className="section-heading">
          <div><div className="section-kicker">Hardware</div><h2>Was du für Project 001 wirklich brauchst.</h2></div>
          <p>Die Hardware ist nach ihrer Funktion im Gesamtsystem geordnet. So siehst du sofort, warum ein Teil überhaupt vorkommt und welches Wissen daran hängt.</p>
        </div>
        <div className="equipment-grid">
          {hardware.map((item, index) => (
            <article key={item.name}>
              <div className="equipment-card-top"><span>{String(index + 1).padStart(2, "0")}</span><small>{item.category}</small></div>
              <h3>{item.name}</h3>
              <p>{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad project-goals project-panel">
        <div className="section-heading">
          <div><div className="section-kicker">Lernziele</div><h2>Am Ende soll nicht nur Musik laufen.</h2></div>
          <p>Das Gerät ist das sichtbare Ergebnis. Das eigentliche Ziel ist ein belastbares mentales Modell, das du in das nächste Projekt mitnehmen kannst.</p>
        </div>
        <div className="goal-list">
          {learningGoals.map(([title, goal], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><small>{title}</small><p>{goal}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad learning-architecture project-panel">
        <div className="section-heading learning-heading">
          <div><div className="section-kicker">Lernlogik</div><h2>Vier Fragentypen.<br />Vier verschiedene Aufgaben.</h2></div>
          <p>Die Website soll nicht jeden Gedanken automatisch bewerten. Sie liefert gute Fragen; tiefe Erklärungen können separat mit einem LLM-Tutor diskutiert werden.</p>
        </div>
        <div className="learning-mode-grid">
          {learningModes.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="section-pad roadmap-section project-panel" id="roadmap">
        <div className="section-heading">
          <div><div className="section-kicker">Lernpfad</div><h2>Vom ersten Stromkreis<br />zum ganzen Gerät.</h2></div>
          <p>Jeder Schritt hat ein überprüfbares Ergebnis. Concepts und Components werden genau dort aktiviert, wo sie im Projekt eine echte Funktion bekommen.</p>
        </div>
        <ProjectRoadmap />
      </section>

      <section className="section-pad project-transfer project-panel">
        <div className="section-heading learning-heading">
          <div><div className="section-kicker">Nach Schritt 11 · Transfer</div><h2>Jetzt das Modell<br />aus der Jukebox lösen.</h2></div>
          <p>Diese Fragen sind bewusst erst für den Projektabschluss gedacht. Jetzt geht es nicht mehr um Wiedergeben, sondern darum, das gelernte Systemdenken auf andere Hardware zu übertragen.</p>
        </div>
        <div className="transfer-question-list">
          {transferQuestions.map((question, index) => <article key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></article>)}
        </div>
      </section>

      <section className="section-pad project-reference project-panel">
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
    </main>
  );
}
