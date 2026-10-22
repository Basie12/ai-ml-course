"use client";

import { useState } from "react";
import { CURRICULUM_PHASES } from "@/lib/curriculum";

export function CurriculumTabs() {
  const [active, setActive] = useState(0);
  const phase = CURRICULUM_PHASES[active];

  return (
    <div className="curriculum-section" id="curriculum">
      <div className="curriculum-inner">
        <div className="section-eyebrow">Curriculum</div>
        <h2 className="section-title">8 Phases · 24 Weeks</h2>
        <p className="section-sub">
          Click a phase to see what&apos;s covered, why it matters, and the
          project you&apos;ll ship.
        </p>

        <div className="phase-tabs" role="tablist" aria-label="Curriculum phases">
          {CURRICULUM_PHASES.map((p, i) => (
            <button
              key={p.tab}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`phase-tab${active === i ? " active" : ""}`}
              onClick={() => setActive(i)}
            >
              {p.tab}
            </button>
          ))}
        </div>

        <div className="phase-panel active" role="tabpanel" key={phase.tab}>
          <div className="phase-meta">
            <div className="phase-badge">{phase.badge}</div>
            <h3>{phase.title}</h3>
            <p className="phase-desc">{phase.description}</p>
            <div className="phase-project">
              <strong>{phase.projectLabel}</strong>
              {phase.project}
            </div>
          </div>

          <div className="phase-modules">
            {phase.topicCards && (
              <>
                <div className="topics-covered-label">Topics covered</div>
                <div className="topics-covered-grid">
                  {phase.topicCards.map((card) => (
                    <div className="topics-covered-card" key={card.title}>
                      <div className="topics-covered-card-title">{card.title}</div>
                      <ul className="topics-covered-list">
                        {card.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}

            {phase.modules?.map((mod) => (
              <div className="phase-module" key={mod.label}>
                <div className="phase-module-label">{mod.label}</div>
                <div className="topic-list">
                  {mod.items.map((item) => (
                    <div className="topic-item" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {phase.topics && (
              <div className="topic-list">
                {phase.topics.map((item, idx) => {
                  const highlight = phase.highlightTopics?.includes(idx);
                  return (
                    <div
                      className={`topic-item${highlight ? " topic-highlight" : ""}`}
                      key={item}
                    >
                      {highlight ? `★ ${item}` : item}
                    </div>
                  );
                })}
              </div>
            )}

            {phase.tools && phase.tools.length > 0 && (
              <div className="phase-tools">
                <div className="phase-tools-label">Tools you&apos;ll master</div>
                <div className="phase-tools-chips">
                  {phase.tools.map((tool) => (
                    <span className="tool-chip" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
