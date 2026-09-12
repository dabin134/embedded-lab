import Link from "next/link";

const pins = [
  ["3.3V", "Versorgung", "Energie"], ["GND", "Bezugspotenzial", "Energie"], ["SCK", "Serial Clock", "SPI"], ["MOSI", "Master → Reader", "SPI"], ["MISO", "Reader → Master", "SPI"], ["SDA/SS", "Slave Select", "SPI"], ["RST", "Reset", "Control"], ["IRQ", "Interrupt", "Optional"],
];

export default function MfrcPage() {
  return <>
    <section className="component-hero section-pad"><div><div className="eyebrow"><span /> Component · RFID Reader</div><h1>MFRC522</h1><p>Der MFRC522 verbindet zwei Welten: Auf der einen Seite erzeugt und demoduliert er das 13,56-MHz-RFID-Feld. Auf der anderen Seite präsentiert er dem Mikrocontroller steuerbare Register über eine digitale Schnittstelle.</p><div className="hero-actions"><Link className="button primary" href="/projects/rfid-music-player/steps/mfrc522-anschliessen">Im Projekt verwenden →</Link><Link className="button ghost" href="/concepts/spi">SPI verstehen</Link></div></div><div className="chip-visual"><div className="chip-body"><small>NXP</small><strong>MFRC522</strong><span>RFID FRONTEND</span></div>{Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ top: `${12 + i * 10}%` }} />)}{Array.from({ length: 8 }).map((_, i) => <b key={i} style={{ top: `${12 + i * 10}%` }} />)}</div></section>
    <section className="section-pad pin-section"><div className="section-heading"><div><div className="section-kicker">Pinout Explorer</div><h2>Pins nach Funktion,<br />nicht nach Position.</h2></div><p>Die Modulbeschriftung ist nur die Oberfläche. Für den Aufbau zählt, welche elektrische oder protokollarische Aufgabe eine Leitung übernimmt.</p></div><div className="pin-table">{pins.map(([pin, role, group]) => <div key={pin}><code>{pin}</code><b>{role}</b><span>{group}</span></div>)}</div></section>
    <section className="section-pad dark-section compact-dark"><div className="section-kicker light">Verknüpfte Concepts</div><div className="dark-link-grid"><Link href="/concepts/spi"><span>03</span><b>SPI</b><p>Bits zwischen ESP32 und Reader transportieren.</p></Link><Link href="/concepts"><span>04</span><b>Register</b><p>Readerzustand lesen und konfigurieren.</p></Link><Link href="/concepts"><span>05</span><b>RFID</b><p>Feld, Kopplung und Tag-Kommunikation verstehen.</p></Link></div></section>
  </>;
}
