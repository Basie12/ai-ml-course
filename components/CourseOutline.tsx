"use client";

import { useState } from "react";
import { COURSE_OUTLINE } from "@/lib/course-outline";

const KIND_CLASS: Record<string, string> = {
  Video: "lt-video",
  Lab: "lt-lab",
  Live: "lt-live",
  Quiz: "lt-quiz",
};

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
                  {phase.meta.split(" · ").map((tag) => (
                    <span className="outline-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="outline-chevron" aria-hidden>
                  ▾
                </span>
              </button>
              <div className="outline-lessons">
                {phase.sections.map((section) => (
                  <div className="lesson-group" key={section.title}>
                    <div className="lesson-group-title">{section.title}</div>
                    <ul className="lesson-list">
                      {section.lessons.map((lesson) => (
                        <li
                          className="lesson-item"
                          key={`${lesson.code}-${lesson.title}`}
                        >
                          <span className="lesson-num">{lesson.code}</span>
                          <span
                            className={`lesson-type ${KIND_CLASS[lesson.kind] ?? "lt-video"}`}
                          >
                            {lesson.kind}
                          </span>
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
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
