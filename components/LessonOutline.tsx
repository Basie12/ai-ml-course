"use client";

import { useState } from "react";
import { COURSE_OUTLINE } from "@/lib/course-outline";

const KIND_CLASS: Record<string, string> = { Video: "lt-video", Lab: "lt-lab", Live: "lt-live", Quiz: "lt-quiz" };

export function LessonOutline() {
  const [open, setOpen] = useState<Set<string>>(() => new Set([COURSE_OUTLINE[0]?.id]));

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="outline-grid">
      {COURSE_OUTLINE.map((phase) => {
        const isOpen = open.has(phase.id);
        return (
          <div key={phase.id} className={`outline-phase${isOpen ? " open" : ""}`} id={phase.id}>
            <button
              className="outline-phase-header"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${phase.id}-lessons`}
              onClick={() => toggle(phase.id)}
            >
              <span className="outline-phase-num">{phase.title}</span>
              <span className="outline-phase-title">{phase.subtitle}</span>
              <span className="outline-phase-meta">
                <span className="outline-tag">{phase.weeks}</span>
                <span className="outline-tag">{phase.lessonCount}</span>
              </span>
              <span className="outline-chevron" aria-hidden="true" />
            </button>
            <div className="outline-lessons" id={`${phase.id}-lessons`}>
              {phase.sections.map((section) => (
                <div className="lesson-group" key={section.title}>
                  <p className="lesson-group-title">{section.title}</p>
                  <ul className="lesson-list">
                    {section.lessons.map((lesson) => (
                      <li className="lesson-item" key={`${lesson.code}-${lesson.title}`}>
                        <span className="lesson-num">{lesson.code}</span>
                        <span className={`lesson-type ${KIND_CLASS[lesson.kind] ?? "lt-video"}`}>{lesson.kind}</span>
                        <span>{lesson.title}</span>
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
  );
}
