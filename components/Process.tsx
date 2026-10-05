import { Num } from "./Bits";
import { PROCESS } from "@/lib/content";

/**
 * Three steps, offset vertically so the eye travels a line that undulates
 * rather than running as a straight rail. That single move is what keeps it
 * editorial instead of reading as a departure board.
 */
export function Process() {
  return (
    <section className="on-paper-2 s-std">
      <div className="offset">
        <div>
          <div className="s-head">
            <h2 className="h2" data-reveal>{PROCESS.headline}</h2>
          </div>
          <div className="steps">
            {PROCESS.steps.map((s, i) => (
              <div className="step" key={s.n} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                <Num outline={i !== 0}>{s.n}</Num>
                <p className="mono">{["Under 2 min", "15 min", "Arrival day"][i]}</p>
                <h3 className="h3 step-t">{s.title}</h3>
                <p className="small" style={{ maxWidth: "34ch" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
