import Card from "../global/Card";
import type { ICourse, ICourseApiResponse } from "@/types/course";
import CoursePagination from "./CoursePagination";

interface CourseGridProps {
  coursePosts?: ICourseApiResponse | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function CourseGrid({
  coursePosts,
  currentPage,
  totalPages,
  onPageChange,
}: CourseGridProps) {
  return (
    <div className="lg:col-span-2">
      <div className="grid md:grid-cols-2 gap-6">
        {coursePosts && coursePosts.data && coursePosts.data.length > 0 ? (
          coursePosts.data.map((course: ICourse) => (
            <Card
              key={course._id}
              subTitle={course.title}
              title={course.title}
              image={course.imageUrl || "/image/images.png"}
              // timeOfCourse={"2"}
              activeStudent={course.enrolledCount}
              priceOfLessons={String(course.price) || "200"}
              link={course._id}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-muted-foreground">No courses found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {coursePosts && coursePosts.pagination && (
        <CoursePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

export default CourseGrid;
