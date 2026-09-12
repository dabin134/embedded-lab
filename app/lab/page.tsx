import { SpiSignalDemo } from "@/components/spi-signal-demo";

const modules = [
  ["01", "Circuit Block", "Strompfade, Knoten und Messpunkte sichtbar machen.", "electric"],
  ["02", "Pinout Explorer", "Pins nach Funktion gruppieren statt Tabellen auswendig lernen.", "pins"],
  ["03", "Signal Viewer", "Digitale Pegel als zeitlichen Verlauf lesen.", "signal"],
  ["04", "Protocol Trace", "Transfers in Clock, Adresse und Daten zerlegen.", "protocol"],
  ["05", "Register Explorer", "Bits setzen und ihre Hardwarewirkung nachvollziehen.", "register"],
  ["06", "Code Walkthrough", "Codezeilen mit physikalischen Effekten verknüpfen.", "code"],
];

export default function LabPage() {
  return <section className="section-pad page-top lab-page"><div className="page-intro"><div className="eyebrow"><span /> Experiment path</div><h1>Das Lab macht<br />Unsichtbares sichtbar.</h1><p>Embedded Systems leben zwischen Code, elektrischen Signalen und physikalischer Hardware. Lab-Module verbinden diese Ebenen interaktiv.</p></div><div className="lab-live"><div><span className="badge">Live prototype</span><h2>Protocol Trace</h2><p>Ein erster interaktiver Baustein ist bereits funktionsfähig. Schalte durch die Phasen eines SPI-Transfers.</p></div><SpiSignalDemo /></div><div className="module-grid">{modules.map(([n, title, text, kind]) => <article key={n}><span>{n}</span><div className={`module-icon ${kind}`}><i /><i /><b /></div><h2>{title}</h2><p>{text}</p><small>{n === "04" ? "PROTOTYPE ACTIVE" : "PLANNED MODULE"}</small></article>)}</div></section>;
}
