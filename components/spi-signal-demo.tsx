"use client";

import { useState } from "react";

const traces = {
  idle: { sck: "0 0 0 0 0 0 0 0", mosi: "— — — — — — — —", miso: "— — — — — — — —" },
  address: { sck: "▁▔▁▔▁▔▁▔", mosi: "0 1 1 0 1 0 1 0", miso: "· · · · · · · ·" },
  data: { sck: "▁▔▁▔▁▔▁▔", mosi: "· · · · · · · ·", miso: "1 0 0 1 0 0 1 0" },
};

type TraceKey = keyof typeof traces;

export function SpiSignalDemo() {
  const [phase, setPhase] = useState<TraceKey>("address");
  const trace = traces[phase];
  return (
    <div className="signal-demo">
      <div className="signal-toolbar">
        <div><span className="live-dot" /> Protocol trace / SPI</div>
        <div className="segmented">
          {(Object.keys(traces) as TraceKey[]).map((key) => <button className={phase === key ? "active" : ""} onClick={() => setPhase(key)} key={key}>{key === "idle" ? "Idle" : key === "address" ? "Adresse" : "Daten"}</button>)}
        </div>
      </div>
      <div className="trace-grid">
        <span>SS</span><code>{phase === "idle" ? "▔▔▔▔▔▔▔▔" : "▔▁▁▁▁▁▁▔"}</code>
        <span>SCK</span><code>{trace.sck}</code>
        <span>MOSI</span><code>{trace.mosi}</code>
        <span>MISO</span><code>{trace.miso}</code>
      </div>
      <p>{phase === "idle" ? "Kein Slave ist ausgewählt; der Bus wartet." : phase === "address" ? "Der Master taktet ein Adress-/Kommando-Byte zum Reader." : "Der Reader liefert synchron zum Clock ein Datenbyte zurück."}</p>
    </div>
  );
}
