import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptById, concepts, rfidSteps } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return concepts.filter((concept) => concept.id !== "spi").map((concept) => ({ slug: concept.id }));
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = conceptById(slug);
  if (!concept) notFound();

  const projectSteps = rfidSteps.filter((step) => step.concepts.includes(concept.id));

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

      <section className="section-pad concept-transfer">
        <div className="section-kicker">Transfer</div>
        <h2>Dieses Wissen endet nicht beim RFID-Musikplayer.</h2>
        <div className="transfer-chips">{concept.transfer.map((item) => <span key={item}>{item}</span>)}</div>
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
