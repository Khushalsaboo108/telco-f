"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  type: string;
  completed?: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface SidebarNavigationProps {
  sections: Section[];
  currentLessonId: string;
  onLessonClick: (lessonId: string) => void;
  className?: string;
}

export default function SidebarNavigation({
  sections,
  currentLessonId,
  onLessonClick,
  className,
}: SidebarNavigationProps) {
  const [openSections, setOpenSections] = useState<string[]>(
    sections.length > 0 ? [sections[0].id] : []
  );

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside
      className={cn("border-r bg-[#f7f9fb] h-full overflow-hidden", className)}
    >
      <div className="h- overflow-y-auto p-4">
        <h2 className="text-[#2563eb] text-xl font-medium mb-4 sticky top-0 bg-[#f7f9fb] z-10 pb-2">
          Lab Content
        </h2>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <button
                className="flex items-center justify-between w-full mb-2 text-[#1c1c1c] hover:text-[#2563eb] transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <h3 className="font-medium text-left capitalize">
                  {section.title}
                </h3>
                <ChevronRight
                  className={cn(
                    "h-5 w-5 text-[#838b7f] transition-transform duration-200",
                    openSections.includes(section.id) && "transform rotate-90"
                  )}
                />
              </button>

              {openSections.includes(section.id) && (
                <div className="space-y-1 pl-2">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={cn(
                        "flex items-center w-full p-2 rounded-md text-left text-sm transition-colors",
                        currentLessonId === lesson.id
                          ? "bg-[#e9effd] text-[#2563eb]"
                          : "hover:bg-[#f7f9fb] text-[#51564e]"
                      )}
                      onClick={() => onLessonClick(lesson.id)}
                    >
                      {lesson.type === "video" ? (
                        <Video className="h-4 w-4 mr-2 flex-shrink-0" />
                      ) : (
                        <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                      {lesson.completed && (
                        <span className="ml-auto bg-[#f0fdf4] text-[#158036] p-1 rounded-full flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
