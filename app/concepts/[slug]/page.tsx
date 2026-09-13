import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptById, concepts, rfidSteps } from "@/lib/data";
import { conceptLearning } from "@/lib/rfid-code";

export const dynamicParams = false;
export function generateStaticParams() {
  return concepts.filter((concept) => concept.id !== "spi").map((concept) => ({ slug: concept.id }));
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = conceptById(slug);
  if (!concept) notFound();

  const projectSteps = rfidSteps.filter((step) => step.concepts.includes(concept.id));
  const learning = conceptLearning[concept.id];

  return (
    <>
      <section className="concept-hero section-pad">
        <div>
          <div className="eyebrow"><span /> Concept {concept.accent} · {concept.eyebrow}</div>
          <h1>{concept.title}</h1>
          <p>{concept.summary}</p>
        </div>
        <div className="concept-question-card"><span>Leitfrage</span><strong>{concept.question}</strong><small>{concept.level}</small></div>
      </section>

      <section className="section-pad concept-body">
        <div className="article-copy">
          <div className="section-kicker">Mentales Modell</div>
          <h2>Die Idee hinter dem Begriff.</h2>
          <p>{concept.mentalModel}</p>
          {concept.prerequisites.length > 0 && (
            <div className="concept-prereqs"><span>Vorwissen</span>{concept.prerequisites.map((id) => {
              const prerequisite = conceptById(id);
              return <Link href={`/concepts/${id}`} key={id}>{prerequisite?.title ?? id} →</Link>;
            })}</div>
          )}
        </div>
        <div className="principle-card">
          <span>Kernprinzipien</span>
          <ol>{concept.principles.map((item) => <li key={item}>{item}</li>)}</ol>
        </div>
      </section>

      {learning && (learning.quickCheck || learning.thinkDeeper?.length) && (
        <section className="section-pad learning-section">
          <div className="section-heading learning-heading">
            <div><div className="section-kicker">Learning check</div><h2>Verstanden – oder nur gelesen?</h2></div>
            <p>Der Quick Check prüft einen Kernpunkt. Think Deeper verlangt eine eigene, fachlich präzise Erklärung und eignet sich später für den LLM-Tutor.</p>
          </div>
          <div className="learning-grid">
            {learning.quickCheck && (
              <article className="learning-card quick-check-card">
                <div className="learning-label"><span>01</span> Quick Check</div>
                <h3>{learning.quickCheck.question}</h3>
                <details><summary>Lösung prüfen</summary><p>{learning.quickCheck.answer}</p></details>
              </article>
            )}
            {learning.thinkDeeper && (
              <article className="learning-card think-deeper-card">
                <div className="learning-label"><span>02</span> Think Deeper</div>
                <div className="deep-question-list">
                  {learning.thinkDeeper.map((question, index) => <div key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></div>)}
                </div>
                <div className="tutor-note"><span>Für den Tutor</span><p>Nicht nur die Endantwort nennen: Begrifflichkeiten, Kausalzusammenhänge und Systemgrenzen vollständig erklären.</p></div>
              </article>
            )}
          </div>
        </section>
      )}

      <section className="section-pad relation-section">
        <div className="section-heading">
          <div><div className="section-kicker">Im Projekt</div><h2>Wo dieses Concept praktisch gebraucht wird.</h2></div>
          <p>Das Konzept bleibt projektunabhängig. Hier siehst du nur die Stellen, an denen Projekt 001 es gerade aktiviert.</p>
        </div>
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

      <section className="section-pad connections-section">
        <div className="section-heading learning-heading">
          <div><div className="section-kicker">Connections</div><h2>Wo dasselbe Prinzip wieder auftaucht.</h2></div>
          <p>Connections sind noch keine Transferprüfung. Sie zeigen dir, wie ein allgemeines Concept in anderen technischen Systemen wiederkehrt.</p>
        </div>
        {learning?.connections && learning.connections.length > 0 ? (
          <div className="connection-grid">
            {learning.connections.map((connection) => <article key={connection.title}><span>↗ Verbindung</span><h3>{connection.title}</h3><p>{connection.text}</p></article>)}
          </div>
        ) : (
          <div className="transfer-chips">{concept.transfer.map((item) => <span key={item}>{item}</span>)}</div>
        )}
      </section>

      {concept.sources.length > 0 && (
        <section className="section-pad concept-sources">
          <div className="section-kicker">Quellen</div>
          <h2>Primärquellen und technische Referenzen</h2>
          <div className="source-list">
            {concept.sources.map((source) => (
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
