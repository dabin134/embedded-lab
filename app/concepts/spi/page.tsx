import Link from "next/link";
import { SpiSignalDemo } from "@/components/spi-signal-demo";

export default function SpiPage() {
  return (
    <>
      <section className="concept-hero section-pad">
        <div>
          <div className="eyebrow"><span /> Concept 05 · Digitale Kommunikation</div>
          <h1>SPI</h1>
          <p>Serial Peripheral Interface ist ein synchrones serielles Kommunikationsverfahren zwischen einem Controller und einem oder mehreren Peripheriebausteinen. Im RFID-Projekt verbindet es den Raspberry Pi 4 mit dem MFRC522.</p>
        </div>
        <div className="concept-formula"><span>CONTROLLER</span><b>SCK</b><b>MOSI</b><b>CS</b><i>⇄</i><b>MISO</b><span>PERIPHERAL</span></div>
      </section>

      <section className="section-pad concept-body">
        <div className="article-copy">
          <div className="section-kicker">Mentales Modell</div>
          <h2>Vier Leitungen, drei Aufgaben.</h2>
          <p><strong>SCK</strong> liefert den gemeinsamen Zeitrahmen. <strong>MOSI</strong> transportiert Bits vom Controller zum Peripheriegerät, <strong>MISO</strong> in Gegenrichtung. <strong>CS/CE</strong> bestimmt, welches Peripheriegerät gerade angesprochen wird.</p>
          <p>SPI überträgt nicht automatisch bedeutungsvolle „Nachrichten“. Bedeutung entsteht erst durch das Protokoll des konkreten Chips – beim MFRC522 etwa aus Adress- und Datenbits für Registerzugriffe.</p>
          <div className="callout"><span>Merksatz</span><p>SPI definiert <b>wie Bits reisen</b>. Das Datenblatt des Bauteils definiert <b>was diese Bits bedeuten</b>.</p></div>
        </div>
        <SpiSignalDemo />
      </section>

      <section className="section-pad principle-section">
        <div className="section-kicker">Auf dem Raspberry Pi 4</div>
        <h2>SPI0 wird auf konkrete GPIOs abgebildet.</h2>
        <div className="pin-table">
          <div><code>MOSI</code><b>GPIO10 · Pin 19</b><span>Pi → MFRC522</span></div>
          <div><code>MISO</code><b>GPIO9 · Pin 21</b><span>MFRC522 → Pi</span></div>
          <div><code>SCLK</code><b>GPIO11 · Pin 23</b><span>Takt</span></div>
          <div><code>CE0</code><b>GPIO8 · Pin 24</b><span>Chip Select</span></div>
        </div>
      </section>

      <section className="section-pad relation-section">
        <div className="section-kicker">Im Wissensnetz</div>
        <h2>Wo du SPI direkt benutzt</h2>
        <div className="relation-cards">
          <Link href="/components/mfrc522"><span>Component</span><b>MFRC522 RFID Reader</b><p>Registerzugriffe über SPI</p><i>→</i></Link>
          <Link href="/projects/rfid-music-player/steps/mfrc522-anschliessen"><span>Project step 05</span><b>MFRC522 anschließen</b><p>Bus und Versorgung korrekt verdrahten</p><i>→</i></Link>
          <Link href="/projects/rfid-music-player/steps/spi-register"><span>Project step 06</span><b>SPI, Bits & Register</b><p>Den Transfer unterhalb der Bibliothek verstehen</p><i>→</i></Link>
        </div>
      </section>

      <section className="section-pad concept-sources">
        <div className="section-kicker">Quellen</div>
        <h2>Technische Referenzen</h2>
        <div className="source-list">
          <a href="https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header" target="_blank" rel="noreferrer"><b>Raspberry Pi Documentation · GPIO & SPI</b><span>SPI0-Belegung und 3,3-V-GPIO.</span><i>↗</i></a>
          <a href="https://www.nxp.com/docs/en/data-sheet/MFRC522.pdf" target="_blank" rel="noreferrer"><b>NXP · MFRC522 data sheet</b><span>Host-Schnittstelle, Register und SPI-Timing.</span><i>↗</i></a>
        </div>
      </section>
    </>
  );
}
