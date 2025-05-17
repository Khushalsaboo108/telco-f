import { Star } from "lucide-react";
import CoursesRight from "@/components/courses/CoursesRight";
import CourseAccordion from "@/components/courses/CourseAccordion";
import Reviews from "@/components/courses/Reviews";
import { IShortChapter } from "@/types/course";
import { getPublishedLabsById } from "@/app/actions/lab.action";
import LabAccordion from "@/components/labs/LabAccordion";
import { ISingleLabsApiResponse } from "@/types/lab";

interface PageProps {
  params: Promise<{ labsId: string }>;
}
export default async function SingleCourse({ params }: PageProps) {
  const labsId = (await params).labsId;

  let courseDetail: ISingleLabsApiResponse | null = null;
  try {
    courseDetail = await getPublishedLabsById(labsId);
  } catch (error) {
    courseDetail = null;
  }

  function getCourseCounts(courseDetail: any) {
    // Check for valid data structure
    if (
      !courseDetail?.success ||
      !courseDetail?.data ||
      !courseDetail?.data?.labSections
    ) {
      return {
        sectionCount: 0,
        chapterCount: 0,
      };
    }

    // Get valid sections - ones that are published and have at least one published chapter
    const validSections = courseDetail.data.labSections.filter(
      (section: any) =>
        section.isPublished &&
        section.labChapters.some((chapter: any) => chapter.isPublished)
    );

    // Count all published chapters across all valid sections
    const publishedChaptersCount = validSections.reduce(
      (total: number, section: any) => {
        const sectionPublishedChapters = section.labChapters.filter(
          (chapter: any) => chapter.isPublished
        ).length;
        return total + sectionPublishedChapters;
      },
      0
    );

    return {
      sectionCount: validSections.length,
      chapterCount: publishedChaptersCount,
    };
  }

  const length = getCourseCounts(courseDetail);

  return (
    <div className=" max-w-desktop m-auto bg-background">
      <div className="mx-auto px-4 py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            Home
          </a>
          <span>/</span>
          <a href="/labs" className="hover:text-foreground">
            All labs
          </a>
          <span>/</span>
          <span className="text-foreground capitalize">
            {courseDetail?.data.title}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="mb-4 capitalize text-headingSizeMobile font-bold lg:text-headingSizeDesktop">
                {courseDetail?.data.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm">4.8 (280)</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Last updated:{" "}
                  {courseDetail?.data?.updatedAt
                    ? new Date(courseDetail.data.updatedAt)
                        .toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        .replace(",", "")
                    : "N/A"}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
              <p className="text-muted-foreground ">
                {courseDetail?.data.description
                  ? courseDetail?.data.description
                  : "No description"}
              </p>
            </section>

            <div className=" block lg:hidden ">
              {courseDetail?.data && (
                <CoursesRight
                  courseDetail={courseDetail.data}
                  id={labsId}
                  labs={true}
                />
              )}
            </div>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Curriculum</h2>
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{length.sectionCount} sections</span>
                <span>•</span>
                <span>{length.chapterCount} lectures</span>
                {/* <span>•</span>
                <span>9hrs 30mins</span> */}
              </div>
              <LabAccordion
                labSection={courseDetail?.data?.labSections || null}
              />
            </section>

            <Reviews />
          </div>

          <div className="lg:col-span-1 hidden lg:block ">
            {courseDetail?.data && (
              <CoursesRight
                courseDetail={courseDetail.data}
                id={labsId}
                labs={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
