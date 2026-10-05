import { PROCESS } from "@/lib/content";

export function Process() {
  return (
    <section className="bg-paper">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>{PROCESS.headline}</h2>
        </div>
        <div className="steps">
          {PROCESS.steps.map((step, i) => (
            <div
              className="step"
              key={step.n}
              data-reveal
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
            >
              <p className="mono">{step.n}</p>
              <h3 className="h3">{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
