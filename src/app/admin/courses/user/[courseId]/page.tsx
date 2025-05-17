import { getNumberOfUsersPurchasedCourse } from "@/app/actions/course.action";
import UserDetailTable from "@/components/admin/courses/UserDetailTable";
import { IPurchaseCourseDetail } from "@/types/course";
import React from "react";

interface PageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ page: string; limit: string }>;
}

async function UserDetail({
  params,
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const courseId = (await params).courseId;
  let courseDetail: IPurchaseCourseDetail | null = null;
  const resolvedSearchParams = await searchParams;

  const queryParams = {
    page: (resolvedSearchParams?.page as string) || "1",
    limit: (resolvedSearchParams?.limit as string) || "10",
  };

  const page = parseInt(queryParams.page);
  const limit = parseInt(queryParams.limit);

  const fetchParams = {
    page,
    limit,
  };

  try {
    courseDetail = await getNumberOfUsersPurchasedCourse(courseId);
  } catch (error) {
    courseDetail = null;
    console.error("Error:", error);
  }

  console.log("data", courseDetail);
  return (
    <div className="p-2">
      <UserDetailTable
        userDetailData={courseDetail}
        initialPage={page}
        initialLimit={limit}
      />
    </div>
  );
}

export default UserDetail;
