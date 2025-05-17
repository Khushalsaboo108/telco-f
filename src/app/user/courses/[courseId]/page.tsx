import { getPublisherPurchaseCourseById } from "@/app/actions/course.action";
import CoursePlayer from "@/components/user/course/CoursePlayer";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const id = (await params).courseId;
  let sectionDetail: any | null;

  try {
    sectionDetail = await getPublisherPurchaseCourseById(id);
  } catch (error) {
    sectionDetail = null;
    redirect("/user/courses/");
  }

  return <CoursePlayer initialCourseData={sectionDetail} courseId={id} />;
}
