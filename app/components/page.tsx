import Link from "next/link";
import { components } from "@/lib/data";

export default function ComponentsPage() {
  return <section className="section-pad page-top"><div className="page-intro"><div className="eyebrow"><span /> Hardware library</div><h1>Components sind<br />keine Black Boxes.</h1><p>Jedes Bauteil wird über Rolle, Pins, Schnittstellen und die Concepts beschrieben, die sein Verhalten verständlich machen.</p></div><div className="component-grid">{components.map((component, index) => <Link className="component-card" href={component.id === "mfrc522" ? "/components/mfrc522" : "/components"} key={component.id}><span className="component-index">C{String(index + 1).padStart(2, "0")}</span><div className="component-glyph"><i /><i /><i /><b /></div><small>{component.category}</small><h2>{component.title}</h2><p>{component.summary}</p><div><span>{component.role}</span><b>→</b></div></Link>)}</div></section>;
}
