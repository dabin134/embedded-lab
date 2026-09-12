import Link from "next/link";
import { notFound } from "next/navigation";
import { componentById, conceptById, rfidSteps, stepById, stepLessons } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return rfidSteps.map((step) => ({ slug: step.id }));
}

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
        <div className="lesson-progress">
          <span>Schritt {step.number} von {rfidSteps.length}</span>
          <div><i style={{ width: `${(step.number / rfidSteps.length) * 100}%` }} /></div>
        </div>
        <nav>
          {rfidSteps.map((item) => (
            <Link
              className={item.id === step.id ? "active" : ""}
              href={`/projects/rfid-music-player/steps/${item.id}`}
              key={item.id}
            >
              <span>{String(item.number).padStart(2, "0")}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <article className="lesson-content">
        <header>
          <div className="eyebrow"><span /> {step.phase} · {step.duration}</div>
          <h1>{step.title}</h1>
          <p className="lesson-question">{lesson.question}</p>
          <div className="lesson-deliverable"><span>Ergebnis dieses Schritts</span><b>{step.deliverable}</b></div>
        </header>

        <section className="lesson-block">
          <div className="block-label">01 · Mentales Modell</div>
          <h2>Was du hier wirklich verstehen sollst</h2>
          <p className="lesson-lead">{lesson.explanation}</p>
          <ul className="lesson-list">
            {lesson.theory.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="lesson-block">
          <div className="block-label">02 · Concepts & Components</div>
          <h2>Wissen und Hardware dieses Schritts</h2>
          <div className="relation-grid">
            <div>
              <h3>Concepts</h3>
              {step.concepts.map((id) => {
                const concept = conceptById(id);
                return (
                  <Link key={id} href={`/concepts/${id}`}>
                    <span>{concept?.eyebrow}</span>
                    <b>{concept?.title ?? id}</b>
                    <i>→</i>
                  </Link>
                );
              })}
            </div>
            <div>
              <h3>Components</h3>
              {step.components.map((id) => {
                const component = componentById(id);
                return (
                  <Link key={id} href={`/components/${id}`}>
                    <span>{component?.category}</span>
                    <b>{component?.title ?? id}</b>
                    <i>→</i>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lesson-block experiment">
          <div className="block-label">03 · Predict → Build → Measure</div>
          <h2>Nicht nur lesen. Vorhersagen und überprüfen.</h2>
          <div className="predict-card"><span>Vorhersage</span><p>{lesson.predict}</p></div>
          <div className="lab-columns">
            <div>
              <h3>Vorbereitung</h3>
              <ol className="lesson-list numbered">{lesson.preparation.map((item) => <li key={item}>{item}</li>)}</ol>
            </div>
            <div>
              <h3>Durchführung</h3>
              <ol className="lesson-list numbered">{lesson.procedure.map((item) => <li key={item}>{item}</li>)}</ol>
            </div>
          </div>
          <div className="experiment-status"><span>LAB NOTE</span><strong>Vorhersagen → aufbauen → messen → erklären</strong></div>
        </section>

        <section className="lesson-block">
          <div className="block-label">04 · Beobachten</div>
          <h2>Was du aus dem Versuch herauslesen sollst</h2>
          <ul className="lesson-list observation-list">{lesson.observe.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="lesson-block">
          <div className="block-label">05 · Erklären & Transfer</div>
          <h2>Aus Beobachtung wird Verständnis</h2>
          <div className="question-stack">
            {lesson.reflect.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
          </div>
        </section>

        <section className="lesson-block troubleshooting-block">
          <div className="block-label">06 · Debugging</div>
          <h2>Wenn es nicht funktioniert</h2>
          <ul className="lesson-list">{lesson.troubleshooting.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="lesson-block">
          <div className="block-label">07 · Erfolgskriterium</div>
          <h2>Kannst du weiter?</h2>
          <div className="check-list">
            {lesson.check.map((item) => <label key={item}><input type="checkbox" /> <span>{item}</span></label>)}
          </div>
          <div className="step-outcome"><span>Ziel</span><strong>{step.outcome}</strong></div>
        </section>

        {lesson.sources.length > 0 && (
          <section className="lesson-block source-block">
            <div className="block-label">08 · Quellen</div>
            <h2>Primär- und Referenzquellen</h2>
            <div className="source-list">
              {lesson.sources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  <b>{source.title}</b>
                  {source.note && <span>{source.note}</span>}
                  <i>↗</i>
                </a>
              ))}
            </div>
          </section>
        )}

        <nav className="lesson-nav">
          {previous ? (
            <Link href={`/projects/rfid-music-player/steps/${previous.id}`}>← <span><small>Zurück</small>{previous.title}</span></Link>
          ) : <span />}
          {next ? (
            <Link className="next" href={`/projects/rfid-music-player/steps/${next.id}`}><span><small>Weiter</small>{next.title}</span> →</Link>
          ) : (
            <Link className="next" href="/projects/rfid-music-player"><span><small>Fertig</small>Projektübersicht</span> →</Link>
          )}
        </nav>
      </article>
    </div>
  );
}
