import Link from "next/link";
import { ProjectRoadmap } from "@/components/project-roadmap";

export default function RfidProjectPage() {
  return (
    <>
      <section className="project-hero section-pad">
        <div className="project-hero-main"><div className="eyebrow"><span /> Project 001 · Beginner → Intermediate</div><h1>RFID-<br /><em>Musikplayer</em></h1><p>Baue eine Jukebox, die RFID-Karten erkennt und ihnen Musik zuordnet. Dabei lernst du Elektronik, Mikrocontroller, SPI, Register, RFID-Physik, Datenmodellierung und Audio nicht isoliert, sondern als zusammenhängendes System.</p><div className="hero-actions"><Link className="button primary" href="/projects/rfid-music-player/steps/system-verstehen">Mit Schritt 1 beginnen →</Link><a className="button ghost" href="#roadmap">Lernpfad ansehen</a></div></div>
        <aside className="project-spec"><div><span>Ergebnis</span><strong>Funktionierende RFID-Jukebox</strong></div><div><span>Umfang</span><strong>11 Lernschritte · ca. 7–9 h</strong></div><div><span>Kernhardware</span><strong>ESP32 · MFRC522 · Audio</strong></div><div><span>Lernmodus</span><strong>Bauen → messen → erklären</strong></div></aside>
      </section>
      <section className="system-strip">
        <div><span>01</span><b>Sense</b><small>RFID-Feld + Tag</small></div><i>→</i><div><span>02</span><b>Transfer</b><small>SPI + Register</small></div><i>→</i><div><span>03</span><b>Decide</b><small>UID + Mapping</small></div><i>→</i><div><span>04</span><b>Act</b><small>Audio + Speaker</small></div>
      </section>
      <section className="section-pad roadmap-section" id="roadmap"><div className="section-heading"><div><div className="section-kicker">Lernpfad</div><h2>Vom ersten Signal<br />zum ganzen Gerät.</h2></div><p>Jeder Schritt hat ein überprüfbares Ergebnis. Concepts werden genau dort verknüpft, wo sie im Projekt eine echte Funktion bekommen.</p></div><ProjectRoadmap /></section>
    </>
  );
}
