import {
  getPopularPublishedCourse,
  getPublishedCourses,
} from "@/app/actions/course.action";
import CourseCatalogue from "@/components/courses/CourseCatalogue";
import TechnicalLearningPath from "@/components/courses/TechnicalLearningPath";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CoursesPage({ searchParams }: Props) {
  // Await searchParams before accessing properties
  const resolvedParams = await searchParams;

  // Extract parameters for TechnicalLearningPath
  const pg = parseInt(resolvedParams.pg as string) || 1;
  const lm = parseInt(resolvedParams.lm as string) || 2;

  // Extract parameters for CourseCatalogue
  const page = parseInt(resolvedParams.page as string) || 1;
  const limit = parseInt(resolvedParams.limit as string) || 4;
  const title = resolvedParams.title as string;
  const price = resolvedParams.price as string;
  const level = resolvedParams.level as string;

  // Fetch data in parallel for better performance
  const [popularCoursesData, coursesData] = await Promise.all([
    getPopularPublishedCourse({ pg, lm }).catch(() => null),
    getPublishedCourses({
      page,
      limit,
      title: title && title !== "undefined" ? title : "",
      price: price && price !== "undefined" ? price : "",
      level: level && level !== "undefined" ? level : "",
    }).catch(() => null),
  ]);

  return (
    <main>
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
    </main>
  );
}

export default CoursesPage;
