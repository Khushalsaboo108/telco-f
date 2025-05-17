"use client";

import { useEffect, useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CourseNavigation from "./CourseNavigation";
import TabsComponent from "./Tabs";
import type { ISectionResponse } from "@/types/course";
import ContentSidebar, {
  ContentSection,
} from "@/components/global/ContentSidebar";
import {
  getCourseProgress,
  updateChapterStatus,
} from "@/app/actions/course.action";

interface CoursePlayerProps {
  initialCourseData: ISectionResponse | null;
  courseId: string;
}

export default function CoursePlayer({
  initialCourseData,
  courseId,
}: CoursePlayerProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progressStatus, setProgressStatus] = useState<{
    completedChapters: string[];
    completedCount: number;
    totalChapters: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    async function getProgressData() {
      try {
        const response = await getCourseProgress(courseId);
        setProgressStatus(response);
      } catch (error) {
        console.error("Error::", error);
      }
    }
    getProgressData();
  }, [courseId]);

  // Transform the API data into a format that works with our UI
  const transformCourseData = (apiData: ISectionResponse) => {
    const sections = apiData.data.map((section) => {
      return {
        title: section.title,
        id: section._id,
        lessons: (section.chapters ?? []).map((chapter) => {
          // Use the first attachment URL if available, otherwise use default
          const videoUrl = chapter?.videoUrl && chapter.videoUrl;
          // Check if this chapter is completed
          const isCompleted =
            progressStatus?.completedChapters.includes(chapter._id) || false;

          return {
            id: chapter._id,
            completeChapter: isCompleted,
            title: chapter.title,
            type: chapter.videoUrl ? "video" : "text",
            videoUrl,
            attachement: chapter?.attachments?.[0]?.url || "",
            description: chapter.description || "",
          };
        }),
      };
    });

    return {
      sections,
      allLessons: sections.flatMap((section) => section.lessons),
    };
  };

  const { sections, allLessons } = initialCourseData
    ? transformCourseData(initialCourseData)
    : { sections: [], allLessons: [] };

  const [currentLessonId, setCurrentLessonId] = useState(
    allLessons.length > 0 ? allLessons[0].id : ""
  );

  const currentLessonIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );

  // Determine if prev/next buttons should be disabled
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === allLessons.length - 1;

  // Navigation functions
  const goToPrevious = () => {
    if (!isFirstLesson) {
      setCurrentLessonId(allLessons[currentLessonIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (!isLastLesson) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id);
    }
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  async function handleMarkAsComplete() {
    try {
      console.log("currentLessonId", currentLessonId, "courseid", courseId);
      const request = {
        chapterId: currentLessonId,
        courseId: courseId,
      };
      await updateChapterStatus(request);
      const response = await getCourseProgress(courseId);
      setProgressStatus(response);

      router.refresh();
    } catch (error) {
      console.error("Error marking chapter as complete:", error);
    }
  }

  // Current lesson
  const currentLesson = allLessons.find(
    (lesson) => lesson.id === currentLessonId
  ) ||
    allLessons[0] || {
      description: "",
      attachement: "",
      id: "",
      title: "",
      type: "",
      videoUrl: "",
    };

  const tabsDetails = {
    detaild: currentLesson?.description || "",
    attachementUrl: currentLesson?.attachement || "",
    attachementName: "hello",
  };

  // Check if current lesson is already completed
  const isCurrentLessonCompleted =
    progressStatus?.completedChapters.includes(currentLessonId) || false;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Top navigation */}
      <header className="flex items-center justify-between p-4 border-b lg:px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#e9effd] text-[#2563eb] hover:bg-[#e0f2fe]"
            aria-label="Back"
            onClick={() => router.push("/user/courses")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-[#2563eb] capitalize text-xl font-medium">
            {currentLesson?.title || "Course"}
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </Button>

        <div className="hidden lg:flex gap-2">
          <CourseNavigation
            isFirstLesson={isFirstLesson}
            isLastLesson={isLastLesson}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
          />
          <div className="ml-auto">
            <Button
              onClick={handleMarkAsComplete}
              className="bg-[#f0fdf4] hover:bg-[#f0fdf4] text-[#158036]"
            >
              {isCurrentLessonCompleted
                ? "Mark as Uncompleted"
                : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile unless toggled */}
        <ContentSidebar
          sections={sections as ContentSection[]}
          currentLessonId={currentLessonId}
          onLessonClick={handleLessonClick}
          contentType="course"
          className={cn(
            "lg:w-[18%] transition-all h-full overflow-hidden flex-shrink-0",
            isSidebarOpen ? "block w-full" : "hidden lg:block"
          )}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {/* Navigation buttons - mobile only */}
            <div className="lg:hidden flex gap-2 mb-4">
              <CourseNavigation
                isFirstLesson={isFirstLesson}
                isLastLesson={isLastLesson}
                goToPrevious={goToPrevious}
                goToNext={goToNext}
              />
              <div className="ml-auto">
                <Button
                  onClick={handleMarkAsComplete}
                  className="bg-[#f0fdf4] hover:bg-[#f0fdf4] text-[#158036]"
                >
                  {isCurrentLessonCompleted
                    ? "Mark as Uncompleted"
                    : "Mark as Complete"}
                </Button>
              </div>
            </div>

            {/* Video player */}
            {currentLesson && (
              <iframe
                src={currentLesson.videoUrl}
                className="w-full h-[75vh] mb-5"
                title={currentLesson.title}
                allow="autoplay; fullscreen; picture-in-picture"
              ></iframe>
            )}

            {/* Tabs */}
            <TabsComponent details={tabsDetails} />
          </div>
        </main>
      </div>
    </div>
  );
}
