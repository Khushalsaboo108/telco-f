import React from "react";
import { getSectionById } from "@/app/actions/course.action";
import { ISection } from "@/types/course";
import { redirect } from "next/navigation";
import Banner from "@/components/global/Banner";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, BookTemplate } from "lucide-react";
import SectionActions from "@/components/admin/section/SectionActions";
import IconBadge from "@/components/global/icon-badge";
import { SectionTitleForm } from "@/components/admin/section/SectionTitleForm";
import { ChapterForm } from "@/components/admin/courses/ChapterForm";

interface PageProps {
  params: Promise<{ courseId: string; sectionId: string }>;
}

// export interface ISection {
//   _id: string;
//   title: string;
//   isPublished: boolean;
//   order: number;
//   chapters?: IChapter[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }

async function SectionIdPage({ params }: PageProps) {
  const { courseId, sectionId } = await params;

  const section: ISection = await getSectionById(courseId, sectionId);
  console.log("section::", section);

  if (!section) {
    return redirect("/admin/courses");
  }

  return (
    <>
      {!section.isPublished && (
        <Banner
          variant={"warning"}
          label="This section is not published, It will be not published in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/admin/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Section Creation</h1>
              </div>
              <SectionActions
                courseId={courseId}
                sectionId={sectionId}
                isPublished={section.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customise your section</h2>
              </div>
              {/* Section Title Form */}
              <SectionTitleForm
                initialData={section}
                courseId={courseId}
                sectionId={sectionId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={BookTemplate} />
              <h2 className="text-xl">Add a chapter</h2>
            </div>
            <ChapterForm
              courseId={courseId}
              initialData={section}
              sectionId={section?._id}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionIdPage;
