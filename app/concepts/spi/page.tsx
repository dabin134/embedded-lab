import Link from "next/link";
import { SpiSignalDemo } from "@/components/spi-signal-demo";

export default function SpiPage() {
  return <>
    <section className="concept-hero section-pad"><div><div className="eyebrow"><span /> Concept 03 · Digitale Kommunikation</div><h1>SPI</h1><p>Serial Peripheral Interface ist ein synchroner Bus zwischen einem Master und einem oder mehreren Peripheriebausteinen. Entscheidend ist nicht die Abkürzung, sondern die Rollenverteilung der Signale.</p></div><div className="concept-formula"><span>MASTER</span><b>SCK</b><b>MOSI</b><b>SS</b><i>⇄</i><b>MISO</b><span>SLAVE</span></div></section>
    <section className="section-pad concept-body"><div className="article-copy"><div className="section-kicker">Mentales Modell</div><h2>Vier Leitungen, drei Aufgaben.</h2><p><strong>SCK</strong> liefert den gemeinsamen Zeitrahmen. <strong>MOSI</strong> transportiert Bits vom Master zum Slave, <strong>MISO</strong> in Gegenrichtung. <strong>SS/CS</strong> bestimmt, welcher Slave gerade zuhört.</p><p>SPI überträgt dabei nicht automatisch „Nachrichten“. Bedeutung entsteht erst durch das Protokoll des konkreten Chips – beim MFRC522 etwa aus Adress- und Datenbits für Registerzugriffe.</p><div className="callout"><span>Merksatz</span><p>SPI definiert <b>wie Bits reisen</b>. Das Datenblatt des Bauteils definiert <b>was diese Bits bedeuten</b>.</p></div></div><SpiSignalDemo /></section>
    <section className="section-pad relation-section"><div className="section-kicker">Im Wissensnetz</div><h2>Wo du SPI direkt benutzt</h2><div className="relation-cards"><Link href="/components/mfrc522"><span>Component</span><b>MFRC522 RFID Reader</b><p>Registerzugriffe über SPI</p><i>→</i></Link><Link href="/projects/rfid-music-player/steps/spi-register"><span>Project step</span><b>05 · SPI & Register</b><p>Das Konzept praktisch beobachten</p><i>→</i></Link></div></section>
  </>;
}
