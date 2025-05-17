import {
  getPopularPublishedLabs,
  getPublishedLabs,
} from "@/app/actions/lab.action";
import CourseCatalogue from "@/components/courses/CourseCatalogue";
import TechnicalLearningPath from "@/components/courses/TechnicalLearningPath";
import { HeroSection } from "@/components/labs/HeroSection";
import PopularTrainings from "@/components/labs/PopularTrainings";
import React from "react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function LabsPage({ searchParams }: Props) {
  // Await searchParams before accessing properties
  const resolvedParams = await searchParams;

  // Extract parameters for TechnicalLearningPath
  const pg = parseInt(resolvedParams.pg as string) || 1;
  const lm = parseInt(resolvedParams.lm as string) || 2;

  // Extract parameters for CourseCatalogue
  const page = parseInt(resolvedParams.page as string) || 1;
  const limit = parseInt(resolvedParams.limit as string) || 4;
  const title = resolvedParams.title as string;

  // Fetch data in parallel for better performance
  const [popularCoursesData, coursesData] = await Promise.all([
    getPopularPublishedLabs({ pg, lm }).catch(() => null),
    getPublishedLabs({
      page,
      limit,
      title: title && title !== "undefined" ? title : "",
    }).catch(() => null),
  ]);

  return (
    <>
      <HeroSection />
      <TechnicalLearningPath
        coursePosts={popularCoursesData}
        initialPage={pg}
        initialLimit={lm}
      />
      <CourseCatalogue
        coursePosts={coursesData}
        initialPage={page}
        initialLimit={limit}
        initialQuery={title}
      />
    </>
  );
}

export default LabsPage;
