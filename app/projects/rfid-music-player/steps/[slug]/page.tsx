import Link from "next/link";
import { notFound } from "next/navigation";
import { componentById, conceptById, rfidSteps, stepById, stepLessons } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return rfidSteps.map((step) => ({ slug: step.id })); }

export default async function StepPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const step = stepById(slug);
  const lesson = stepLessons[slug];
  if (!step || !lesson) notFound();
  const previous = rfidSteps[step.number - 2];
  const next = rfidSteps[step.number];
  return (
    <div className="lesson-layout">
      <aside className="lesson-sidebar">
        <Link href="/projects/rfid-music-player" className="back-link">← RFID-Musikplayer</Link>
        <div className="lesson-progress"><span>Schritt {step.number} von 11</span><div><i style={{ width: `${(step.number / 11) * 100}%` }} /></div></div>
        <nav>{rfidSteps.map((item) => <Link className={item.id === step.id ? "active" : ""} href={`/projects/rfid-music-player/steps/${item.id}`} key={item.id}><span>{String(item.number).padStart(2, "0")}</span>{item.title}</Link>)}</nav>
      </aside>
      <article className="lesson-content">
        <header><div className="eyebrow"><span /> {step.phase} · {step.duration}</div><h1>{step.title}</h1><p className="lesson-question">{lesson.question}</p></header>
        <section className="lesson-block"><div className="block-label">01 · Mentales Modell</div><h2>Was du hier wirklich verstehen sollst</h2><p>{lesson.explanation}</p></section>
        <section className="lesson-block experiment"><div className="block-label">02 · Experiment</div><h2>Nicht nur lesen. Beobachten.</h2><p>{lesson.experiment}</p><div className="experiment-status"><span>LAB NOTE</span><strong>Vorhersagen → aufbauen → messen → erklären</strong></div></section>
        <section className="lesson-block"><div className="block-label">03 · Verknüpftes Wissen</div><h2>Concepts & Components</h2><div className="relation-grid"><div><h3>Concepts</h3>{step.concepts.map((id) => { const concept = conceptById(id); return <Link key={id} href={id === "spi" ? "/concepts/spi" : "/concepts"}><span>{concept?.eyebrow}</span><b>{concept?.title ?? id}</b><i>→</i></Link>; })}</div><div><h3>Components</h3>{step.components.map((id) => { const component = componentById(id); return <Link key={id} href={id === "mfrc522" ? "/components/mfrc522" : "/components"}><span>{component?.category}</span><b>{component?.title ?? id}</b><i>→</i></Link>; })}</div></div></section>
        <section className="lesson-block"><div className="block-label">04 · Erfolgskriterium</div><h2>Kannst du weiter?</h2><div className="check-list">{lesson.check.map((item) => <label key={item}><input type="checkbox" /> <span>{item}</span></label>)}</div></section>
        <nav className="lesson-nav">{previous ? <Link href={`/projects/rfid-music-player/steps/${previous.id}`}>← <span><small>Zurück</small>{previous.title}</span></Link> : <span />}{next ? <Link className="next" href={`/projects/rfid-music-player/steps/${next.id}`}><span><small>Weiter</small>{next.title}</span> →</Link> : <Link className="next" href="/projects/rfid-music-player"><span><small>Fertig</small>Projektübersicht</span> →</Link>}</nav>
      </article>
    </div>
  );
}
