import { getPublisherPurchaseCourse } from "@/app/actions/course.action";
import { Button } from "@/components/ui/button";
import CourseDetail from "@/components/user/course/CourseDetail";
import { ICourseApiResponse } from "@/types/course";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ page: string; limit: string }>;
}

async function Course({ searchParams }: Props) {
  const resolvedSearchParams = searchParams;

  // const queryParams = {
  //   page: (resolvedSearchParams?.page as string) || "1",
  //   limit: (resolvedSearchParams?.limit as string) || "2",
  // };

  // const page = parseInt(queryParams.page);
  // const limit = parseInt(queryParams.limit);

  // const fetchParams = {
  //   page,
  //   limit,
  // };

  let course: ICourseApiResponse | null;

  try {
    course = await getPublisherPurchaseCourse();
  } catch (error) {
    course = null;
  }

  return (
    <div>
      {/* {
        course
      } */}
      <div className=" flex justify-between items-center  ">
        <h2 className=" mb-6 mt-3 text-commonHeader font-bold ">My Courses</h2>
        {course?.success && (
          <Link href={"/courses"}>
            <Button> Purchase More Course </Button>
          </Link>
        )}
      </div>
      {course?.success ? (
        <CourseDetail coursePosts={course} />
      ) : (
        <div className=" flex flex-col font-bold text-[25px] gap-5 h-[75vh] justify-center items-center">
          Please purchase the course
          <Link href={"/courses"}>
            <Button> Purchase Course </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Course;
