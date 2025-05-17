"use client";

import { fetchCourse, getCategories } from "@/app/actions/course.action";
import IconBadge from "@/components/global/icon-badge";
import {
  BadgeIndianRupee,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { TitleForm } from "@/components/admin/courses/TitleForm";
import { DescriptionForm } from "@/components/admin/courses/DescriptionForm";
import { ImageForm } from "@/components/admin/courses/ImageForm";
import { CategoryForm } from "@/components/admin/courses/CategoryForm";
import { ICategory, ICourse } from "@/types/course";
import { PriceForm } from "@/components/admin/courses/PriceForm";
import { ChapterForm } from "@/components/admin/courses/ChapterForm";
import Banner from "@/components/global/Banner";
import CourseActions from "@/components/admin/courses/CourseActions";
import { redirect, useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SectionForm } from "@/components/admin/section/SectionForm";
import { useEffect, useState } from "react";

function CourseIdPage(): React.JSX.Element {
  const [course, setCourse] = useState<ICourse | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  useEffect(() => {
    const initializePage = async () => {
      try {
        const courseData = await fetchCourse(courseId);
        if (!courseData) {
          toast.error("Course not found");
          router.push("/admin/courses");
          return;
        }
        setCourse(courseData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        toast.error("Something went wrong");
        router.push("/admin/courses");
      }
    };

    initializePage();
  }, [params.courseId, router]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!course?.isPublished && (
        <Banner label="This Course is unpublished. It will not be visible to students." />
      )}
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
          </div>
          <CourseActions
            courseId={course?._id}
            isPublished={course?.isPublished || false}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course?._id} />
            <DescriptionForm initialData={course} courseId={course?._id} />
            <ImageForm initialData={course} courseId={course?._id} />
            <CategoryForm
              initialData={course}
              courseId={course?._id}
              options={categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Sections</h2>
              </div>
              {/* <ChapterForm initialData={course} courseId={course?._id} /> */}
              <SectionForm initialData={course} courseId={course?._id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BadgeIndianRupee} />
                <h2 className="text-xl">Sell your Course</h2>
              </div>
              <PriceForm initialData={course} courseId={course?._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;
