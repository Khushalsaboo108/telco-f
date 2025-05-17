"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import TerminalPanel from "./TerminalPanel";
import LabNavigation from "./LabNavigation";
import ContentSidebar, {
  type ContentSection,
} from "@/components/global/ContentSidebar";
import { ISectionResponse } from "@/types/course";
import {
  getLabProgress,
  updateLabChapterStatus,
} from "@/app/actions/lab.action";

interface LabChapter {
  _id: string;
  title: string;
  order: number;
  isPublished: boolean;
  labSectionId: string;
  content?: string;
  attachments: any[];
  createdAt: string;
  updatedAt: string;
}

interface LabSection {
  _id: string;
  title: string;
  order: number;
  isPublished: boolean;
  labId: string;
  labChapters: LabChapter[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface CoursePlayerProps {
  initialLabData: ISectionResponse | null;
  labId: string;
}

export default function LabsPlayers({
  initialLabData,
  labId,
}: CoursePlayerProps) {
  // @ts-ignore
  const labSections: LabSection[] = initialLabData?.data || [];

  // Initialize with the first chapter of the first section if available
  const firstSection = labSections[0];
  const firstChapter = firstSection?.labChapters[0];
  const initialChapterId = firstChapter?._id || "";

  const [currentChapterId, setCurrentChapterId] = useState(initialChapterId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const router = useRouter();
  const [progressStatus, setProgressStatus] = useState<{
    completedChapters: string[];
    completedCount: number;
    totalChapters: number;
    percentage: number;
  } | null>(null);

  // Transform the API data into the format expected by ContentSidebar
  const transformedSections: ContentSection[] = labSections.map((section) => ({
    id: section._id,
    title: section.title,
    lessons: section.labChapters.map((chapter) => ({
      id: chapter._id,
      title: chapter.title,
      type: "text", // Assuming all chapters are text type for now
      completeChapter:
        progressStatus?.completedChapters.includes(chapter._id) || false,
    })),
  }));

  // Flatten all chapters for navigation
  const allChapters = labSections.flatMap((section) =>
    section.labChapters.map((chapter) => ({
      ...chapter,
      sectionTitle: section.title,
    }))
  );

  // Find current chapter
  const currentChapter = allChapters.find(
    (chapter) => chapter._id === currentChapterId
  );

  // Get current chapter index for navigation
  const currentIndex = allChapters.findIndex(
    (chapter) => chapter._id === currentChapterId
  );
  const isFirstChapter = currentIndex === 0;
  const isLastChapter = currentIndex === allChapters.length - 1;

  // Navigation functions
  const goToPrevious = () => {
    if (!isFirstChapter) {
      setCurrentChapterId(allChapters[currentIndex - 1]._id);
    }
  };

  const goToNext = () => {
    if (!isLastChapter) {
      setCurrentChapterId(allChapters[currentIndex + 1]._id);
    }
  };

  const handleChapterClick = (chapterId: string) => {
    setCurrentChapterId(chapterId);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  async function handleMarkAsComplete() {
    try {
      console.log("currentLessonId", currentChapterId, "courseid", labId);
      const request = {
        chapterId: currentChapterId,
        labId: labId,
      };
      await updateLabChapterStatus(request);
      const response = await getLabProgress(labId);
      setProgressStatus(response);

      router.refresh();
    } catch (error) {
      console.error("Error marking chapter as complete:", error);
    }
  }

  // Handle terminal state
  const handleTerminalToggle = (isOpen: boolean) => {
    setIsTerminalOpen(isOpen);
  };

  // Update the transformed sections when completedChapters changes
  useEffect(() => {
    async function getProgressData() {
      try {
        const response = await getLabProgress(labId);
        setProgressStatus(response);
      } catch (error) {
        console.error("Error::", error);
      }
    }
    getProgressData();
  }, [completedChapters]);

  const isCurrentLessonCompleted =
    progressStatus?.completedChapters.includes(currentChapterId) || false;

  return (
    <div className="flex flex-col h-[87vh] bg-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b bg-white z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#e9effd] text-[#2563eb] hover:bg-[#e0f2fe] lg:flex md:flex hidden"
            aria-label="Back"
            onClick={() => router.push("/user/labs")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => router.push("/user/labs")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="text-[#2563eb] font-medium text-[20px]">
            {currentChapter?.title || "Lab Content"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LabNavigation
            isFirstLesson={isFirstChapter}
            isLastLesson={isLastChapter}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
            className="hidden md:flex"
          />

          <Button
            onClick={handleMarkAsComplete}
            className="bg-[#f0fdf4] text-[#158036] hover:bg-[#f0fdf4]/90 hidden md:flex"
          >
            {isCurrentLessonCompleted
              ? "Mark as Uncompleted"
              : "Mark as Complete"}
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <ContentSidebar
          sections={transformedSections}
          currentLessonId={currentChapterId}
          onLessonClick={handleChapterClick}
          contentType="lab"
          className={cn(
            "w-[250px] z-20 transition-all duration-300 transform lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        />

        {/* Main content */}
        <div className="flex flex-col w-full relative">
          {/* Mobile navigation */}
          <div className="flex items-center overflow-hidden justify-between md:hidden">
            <LabNavigation
              isFirstLesson={isFirstChapter}
              isLastLesson={isLastChapter}
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
            <Button
              onClick={handleMarkAsComplete}
              className="bg-[#f0fdf4] text-[#158036] hover:bg-[#f0fdf4]/90"
            >
              {isCurrentLessonCompleted
                ? "Mark as Uncompleted"
                : "Mark as Complete"}
            </Button>
          </div>

          {/* Content and Terminal Container */}
          <div className="flex flex-col h-full">
            <div
              className={cn(
                "overflow-y-scroll transition-all duration-300",
                isTerminalOpen ? "h-[50%]" : "h-full"
              )}
            >
              <div className="p-4">
                {currentChapter?.content ? (
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: currentChapter.content }}
                  />
                ) : (
                  <p>No data is available for this lab.</p>
                )}
              </div>
            </div>

            {/* Terminal Panel - takes up 50% when open */}
            <div
              className={cn(
                "w-full transition-all px-2 duration-300",
                isTerminalOpen ? "h-[69%]" : "h-auto"
              )}
            >
              <TerminalPanel onToggle={handleTerminalToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
