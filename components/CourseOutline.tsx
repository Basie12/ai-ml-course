"use client";

import { useState } from "react";
import { COURSE_OUTLINE } from "@/lib/course-outline";

export function CourseOutline() {
  const [open, setOpen] = useState<string>(COURSE_OUTLINE[0]?.id ?? "");

  return (
    <section className="section" id="outline">
      <p className="eyebrow">Teachable Course Outline</p>
      <h2>Full Lesson Breakdown</h2>
      <p className="sub">
        Every section, lesson, and lab organized for Teachable — ready to import
        as your course structure.
      </p>

      <div className="outline-list">
        {COURSE_OUTLINE.map((phase) => {
          const isOpen = open === phase.id;
          return (
            <div
              key={phase.id}
              className={`outline-phase${isOpen ? " open" : ""}`}
            >
              <button
                type="button"
                className="outline-phase-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? "" : phase.id)}
              >
                <span>
                  <strong>{phase.title}</strong> {phase.subtitle}
                </span>
                <span className="outline-meta">{phase.meta}</span>
              </button>
              {isOpen && (
                <div className="outline-phase-body">
                  {phase.sections.map((section) => (
                    <div key={section.title} className="outline-section">
                      <h3>{section.title}</h3>
                      <ul className="outline-lessons">
                        {section.lessons.map((lesson) => (
                          <li key={`${lesson.code}-${lesson.title}`}>
                            <span className="outline-code">{lesson.code}</span>
                            <span className="outline-kind">{lesson.kind}</span>
                            <span>{lesson.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
