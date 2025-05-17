"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Common types for both course and lab content
export interface ContentLesson {
  id: string;
  title: string;
  type: string;
  completeChapter?: boolean;
  videoUrl?: string;
  attachement?: string;
  description?: string;
}

export interface ContentSection {
  id: string;
  title: string;
  lessons: ContentLesson[];
}

interface ContentSidebarProps {
  sections: ContentSection[];
  currentLessonId: string;
  onLessonClick: (lessonId: string) => void;
  className?: string;
  contentType?: "course" | "lab";
}

export default function ContentSidebar({
  sections,
  currentLessonId,
  onLessonClick,
  className,
  contentType = "course",
}: ContentSidebarProps) {
  console.log("section", sections);
  // Initialize with first section open
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

  // Determine background color based on content type
  const bgColor = contentType === "lab" ? "bg-[#f7f9fb]" : "bg-white";

  return (
    <aside
      className={cn(`border-r ${bgColor} h-full overflow-hidden`, className)}
    >
      <div className="h-full overflow-y-auto custom-scrollbar p-4">
        <h2
          className={`text-[#2563eb] text-xl font-medium mb-4 sticky top-0 ${bgColor} z-10 pb-2`}
        >
          {contentType === "course" ? "Course Content" : "Lab Content"}
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
                          : `hover:bg-${
                              contentType === "lab" ? "[#f7f9fb]" : "gray-100"
                            } text-[#51564e]`
                      )}
                      onClick={() => onLessonClick(lesson.id)}
                    >
                      <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{lesson.title}</span>
                      {lesson.completeChapter && (
                        <span className="ml-auto bg-[#f0fdf4] text-[#158036] p-1 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" />
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
