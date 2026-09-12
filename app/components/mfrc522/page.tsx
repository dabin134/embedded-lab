import Link from "next/link";

const pins = [
  ["3.3V", "Versorgung", "3,3 V"],
  ["GND", "Bezugspotenzial", "GND"],
  ["SCK", "Serial Clock", "GPIO11 · Pin 23"],
  ["MOSI", "Pi → Reader", "GPIO10 · Pin 19"],
  ["MISO", "Reader → Pi", "GPIO9 · Pin 21"],
  ["SDA/SS", "Chip Select", "GPIO8 / CE0 · Pin 24"],
  ["RST", "Reset", "GPIO23 · Pin 16"],
  ["IRQ", "Interrupt", "im Grundaufbau frei"],
];

export default function MfrcPage() {
  return (
    <>
      <section className="component-hero section-pad">
        <div>
          <div className="eyebrow"><span /> Component · 13,56-MHz-RFID-Frontend</div>
          <h1>MFRC522</h1>
          <p>Der MFRC522 verbindet zwei Welten: Auf der einen Seite treibt und empfängt er ein 13,56-MHz-RFID-System. Auf der anderen Seite stellt er dem Raspberry Pi Register über eine digitale Host-Schnittstelle bereit.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects/rfid-music-player/steps/mfrc522-anschliessen">Im Projekt verwenden →</Link>
            <Link className="button ghost" href="/concepts/spi">SPI verstehen</Link>
          </div>
        </div>
        <div className="chip-visual">
          <div className="chip-body"><small>NXP</small><strong>MFRC522</strong><span>RFID FRONTEND</span></div>
          {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ top: `${12 + i * 10}%` }} />)}
          {Array.from({ length: 8 }).map((_, i) => <b key={i} style={{ top: `${12 + i * 10}%` }} />)}
        </div>
      </section>

      <section className="section-pad component-detail-grid">
        <article>
          <div className="section-kicker">Funktion</div>
          <h2>Was übernimmt der Chip selbst?</h2>
          <ul className="lesson-list">
            <li>Treibt die Reader-Antenne für kontaktlose Kommunikation bei 13,56 MHz.</li>
            <li>Empfängt, demoduliert und dekodiert Antworten kompatibler ISO/IEC-14443-A-Tags.</li>
            <li>Übernimmt Framing sowie Paritäts- und CRC-Funktionen auf der RFID-Seite.</li>
            <li>Stellt Status und Konfiguration über adressierbare Register bereit.</li>
          </ul>
        </article>
        <article>
          <div className="section-kicker">Systemgrenze</div>
          <h2>Was macht dagegen der Raspberry Pi?</h2>
          <ul className="lesson-list">
            <li>Aktiviert und konfiguriert die digitale Schnittstelle.</li>
            <li>Liest Register beziehungsweise UID-Daten über SPI.</li>
            <li>Interpretiert die UID im Anwendungskontext.</li>
            <li>Entscheidet, welche Medienaktion daraus entsteht.</li>
          </ul>
        </article>
      </section>

      <section className="section-pad pin-section">
        <div className="section-heading">
          <div><div className="section-kicker">Pinout Explorer</div><h2>Pins nach Funktion,<br />nicht nach Position.</h2></div>
          <p>Die Modulbeschriftung ist nur die Oberfläche. Für den Aufbau zählt, welche elektrische oder protokollarische Aufgabe eine Leitung übernimmt. Die Tabelle bezieht sich auf unseren Raspberry-Pi-4-Aufbau.</p>
        </div>
        <div className="pin-table">
          {pins.map(([pin, role, connection]) => <div key={pin}><code>{pin}</code><b>{role}</b><span>{connection}</span></div>)}
        </div>
        <div className="callout component-callout"><span>Wichtig</span><p>Der auf vielen RC522-Boards mit <b>SDA</b> beschriftete Pin wird in unserem SPI-Aufbau als <b>SS/CS</b> benutzt. Das ist eine häufige Quelle von Verwirrung.</p></div>
      </section>

      <section className="section-pad dark-section compact-dark">
        <div className="section-kicker light">Verknüpfte Concepts</div>
        <div className="dark-link-grid">
          <Link href="/concepts/spi"><span>05</span><b>SPI</b><p>Bits zwischen Raspberry Pi und Reader transportieren.</p></Link>
          <Link href="/concepts/data-representation"><span>06</span><b>Bits, Bytes & Register</b><p>Registeradresse, Bitfelder und Antwortbytes lesen.</p></Link>
          <Link href="/concepts/rfid"><span>07</span><b>RFID & Induktion</b><p>Feld, Kopplung und Tag-Kommunikation verstehen.</p></Link>
          <Link href="/concepts/uid"><span>08</span><b>UID & Datenmodell</b><p>Readerdaten in Anwendungsidentität übersetzen.</p></Link>
        </div>
      </section>

      <section className="section-pad component-cautions">
        <div className="section-kicker">Grenzen & Sicherheit</div>
        <h2>Was du beim Aufbau beachten musst.</h2>
        <ul className="lesson-list warning-list">
          <li>Das verwendete RC522-Modul wird in diesem Projekt mit 3,3 V versorgt.</li>
          <li>IRQ wird in unserem ersten Aufbau nicht benötigt.</li>
          <li>Metall unmittelbar an der Antenne kann die Kopplung und Reichweite verschlechtern.</li>
          <li>Eine gelesene UID ist praktisch für Medienzuordnung, aber keine sichere Authentifizierung.</li>
        </ul>
      </section>

      <section className="section-pad component-sources">
        <div className="section-kicker">Quellen</div>
        <h2>Datenblatt und Referenzaufbau</h2>
        <div className="source-list">
          <a href="https://www.nxp.com/docs/en/data-sheet/MFRC522.pdf" target="_blank" rel="noreferrer"><b>NXP · MFRC522 data sheet</b><span>Primärquelle für RF-, Interface- und Registereigenschaften.</span><i>↗</i></a>
          <a href="https://talaexe.com/moderndayrecordplayer/" target="_blank" rel="noreferrer"><b>talaexe · A Modern Day Record Player</b><span>Referenzverdrahtung des nachgebauten Musikplayers.</span><i>↗</i></a>
        </div>
      </section>
    </>
  );
}
