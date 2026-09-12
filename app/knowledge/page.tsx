import Link from "next/link";

const prompts = [
  ["SPI", "Warum braucht SPI einen separaten Clock, UART aber nicht zwingend?"],
  ["RFID", "Wie gewinnt ein passiver Tag Energie und wie antwortet er?"],
  ["Register", "Was ist der Unterschied zwischen einem Registerbit und einer Variablen im Programm?"],
  ["System", "An welcher Stelle im RFID-Musikplayer wird aus Identität eine Aktion?"],
];

export default function KnowledgePage() {
  return <section className="section-pad page-top knowledge-page"><div className="page-intro"><div className="eyebrow"><span /> Recall path</div><h1>Wissen heißt:<br />erklären können.</h1><p>Wiederholung orientiert sich nicht an gelesenen Seiten, sondern an mentalen Modellen. Gute Fragen zwingen dich, Zusammenhänge selbst zu rekonstruieren.</p></div><div className="knowledge-layout"><div className="recall-stack">{prompts.map(([topic, question], i) => <article key={topic}><div><span>{String(i + 1).padStart(2, "0")}</span><small>{topic}</small></div><h2>{question}</h2><p>Beantworte die Frage zuerst ohne Unterlagen. Prüfe anschließend das passende Concept und korrigiere dein Modell.</p></article>)}</div><aside className="knowledge-aside"><span>LEARNING LOOP</span><div><b>01</b>Recall</div><i>↓</i><div><b>02</b>Explain</div><i>↓</i><div><b>03</b>Test</div><i>↓</i><div><b>04</b>Repair</div><Link href="/concepts">Concepts öffnen →</Link></aside></div></section>;
}
