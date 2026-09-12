import Link from "next/link";
import { conceptById, rfidSteps } from "@/lib/data";

export function ProjectRoadmap() {
  return (
    <div className="roadmap">
      {rfidSteps.map((step, index) => (
        <article className="roadmap-step" key={step.id}>
          <div className="roadmap-rail" aria-hidden="true">
            <span>{String(step.number).padStart(2, "0")}</span>
            {index < rfidSteps.length - 1 && <i />}
          </div>
          <div className="roadmap-card">
            <div className="roadmap-meta"><span>{step.phase}</span><span>{step.duration}</span></div>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
            <div className="chip-row">
              {step.concepts.map((id) => <span className="chip" key={id}>{conceptById(id)?.title ?? id}</span>)}
            </div>
            <div className="roadmap-bottom">
              <span className="outcome">✓ {step.outcome}</span>
              <Link href={`/projects/rfid-music-player/steps/${step.id}`}>Lektion öffnen <span>→</span></Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
