import Link from "next/link";
import { concepts } from "@/lib/data";

export default function ConceptsPage() {
  return <section className="section-pad page-top"><div className="page-intro"><div className="eyebrow"><span /> Understand path</div><h1>Concepts sind<br />wiederverwendbar.</h1><p>Ein Konzept gehört keinem einzelnen Projekt. SPI, GPIO oder Register tauchen immer wieder auf – deshalb werden sie einmal sauber erklärt und aus Projekten referenziert.</p></div><div className="library-grid">{concepts.map((concept) => <Link className="library-card" href={concept.id === "spi" ? "/concepts/spi" : "/concepts"} key={concept.id}><div className="library-top"><span>{concept.accent}</span><span>{concept.level}</span></div><small>{concept.eyebrow}</small><h2>{concept.title}</h2><p>{concept.summary}</p><div className="library-bottom"><span>In {concept.usedIn.length} Projekt verknüpft</span><b>→</b></div></Link>)}</div></section>;
}
