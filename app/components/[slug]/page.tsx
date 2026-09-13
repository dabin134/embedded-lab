import Link from "next/link";
import { notFound } from "next/navigation";
import { componentById, components, conceptById, rfidSteps } from "@/lib/data";
import { componentLearning } from "@/lib/rfid-code";

export const dynamicParams = false;
export function generateStaticParams() {
  return components.filter((component) => component.id !== "mfrc522").map((component) => ({ slug: component.id }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = componentById(slug);
  if (!component) notFound();

  const projectSteps = rfidSteps.filter((step) => step.components.includes(component.id));
  const learning = componentLearning[component.id];

  return (
    <>
      <section className="component-hero section-pad">
        <div>
          <div className="eyebrow"><span /> Component · {component.category}</div>
          <h1>{component.title}</h1>
          <p>{component.summary}</p>
          <div className="component-role"><span>Rolle im System</span><strong>{component.role}</strong></div>
        </div>
        <div className="component-function-card"><span>Funktion</span><p>{component.function}</p></div>
      </section>

      <section className="section-pad component-detail-grid">
        <article>
          <div className="section-kicker">Schnittstellen</div>
          <h2>Womit verbindet sich das Bauteil?</h2>
          <ul className="lesson-list">{component.interfaces.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <div className="section-kicker">Elektrisch</div>
          <h2>Welche Bedingungen müssen stimmen?</h2>
          <ul className="lesson-list">{component.electrical.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      {learning && (
        <section className="section-pad component-learning">
          <div className="section-kicker">Learning check</div>
          <h2>Quick Check & Think Deeper</h2>
          <div className="learning-grid">
            {learning.quickCheck && (
              <article className="learning-card quick-check-card">
                <div className="learning-label">Quick Check</div>
                <h3>{learning.quickCheck.question}</h3>
                <details><summary>Lösung prüfen</summary><p>{learning.quickCheck.answer}</p></details>
              </article>
            )}
            {learning.thinkDeeper && (
              <article className="learning-card think-deeper-card">
                <div className="learning-label">Think Deeper</div>
                <div className="deep-question-list">
                  {learning.thinkDeeper.map((question, index) => (
                    <div key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></div>
                  ))}
                </div>
              </article>
            )}
          </div>
          {learning.connections && (
            <div className="component-connections">
              <div className="section-kicker">Connections</div>
              <div className="connection-grid">
                {learning.connections.map((connection) => (
                  <article key={connection.title}><span>↗ Verbindung</span><h3>{connection.title}</h3><p>{connection.text}</p></article>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="section-pad component-project-use">
        <div className="section-kicker">Im Projekt</div>
        <h2>Warum dieses Bauteil hier vorkommt.</h2>
        <p>{component.projectUse}</p>
        <div className="relation-cards concept-step-links">
          {projectSteps.map((step) => (
            <Link href={`/projects/rfid-music-player/steps/${step.id}`} key={step.id}>
              <span>Project step {String(step.number).padStart(2, "0")}</span>
              <b>{step.title}</b>
              <p>{step.summary}</p>
              <i>→</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad dark-section compact-dark">
        <div className="section-kicker light">Verknüpfte Concepts</div>
        <div className="dark-link-grid">
          {component.concepts.map((id) => {
            const concept = conceptById(id);
            return (
              <Link href={`/concepts/${id}`} key={id}>
                <span>{concept?.accent}</span>
                <b>{concept?.title ?? id}</b>
                <p>{concept?.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {component.cautions.length > 0 && (
        <section className="section-pad component-cautions">
          <div className="section-kicker">Grenzen & Sicherheit</div>
          <h2>Was du nicht blind voraussetzen solltest.</h2>
          <ul className="lesson-list warning-list">{component.cautions.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      )}

      {component.sources.length > 0 && (
        <section className="section-pad component-sources">
          <div className="section-kicker">Quellen</div>
          <h2>Datenblatt und technische Referenzen</h2>
          <div className="source-list">
            {component.sources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <b>{source.title}</b>{source.note && <span>{source.note}</span>}<i>↗</i>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
