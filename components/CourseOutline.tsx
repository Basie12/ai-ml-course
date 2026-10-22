"use client";

import { useState } from "react";
import { COURSE_OUTLINE } from "@/lib/course-outline";

export function CourseOutline() {
  const [open, setOpen] = useState<string>(COURSE_OUTLINE[0]?.id ?? "");

  return (
    <section className="outline-section" id="outline">
      <div className="section-eyebrow">Teachable Course Outline</div>
      <h2 className="section-title">Full Lesson Breakdown</h2>
      <p className="section-sub">
        Every section, lesson, and lab organized for Teachable — ready to import
        as your course structure.
      </p>

      <div className="outline-grid">
        {COURSE_OUTLINE.map((phase) => {
          const isOpen = open === phase.id;
          return (
            <div
              key={phase.id}
              className={`outline-phase${isOpen ? " open" : ""}`}
            >
              <button
                type="button"
                className="outline-phase-header"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? "" : phase.id)}
              >
                <span className="outline-phase-num">{phase.title}</span>
                <span className="outline-phase-title">{phase.subtitle}</span>
                <span className="outline-phase-meta">
                  <span className="outline-tag">{phase.meta}</span>
                </span>
                <span className="outline-chevron" aria-hidden>
                  ▾
                </span>
              </button>
              <div className="outline-lessons">
                {phase.sections.map((section) => (
                  <div key={section.title} style={{ marginBottom: "1rem" }}>
                    <div className="phase-module-label">{section.title}</div>
                    {section.lessons.map((lesson) => (
                      <div className="lesson-item" key={`${lesson.code}-${lesson.title}`}>
                        <span className="outline-code">{lesson.code}</span>{" "}
                        <span className="outline-kind">{lesson.kind}</span>{" "}
                        {lesson.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
