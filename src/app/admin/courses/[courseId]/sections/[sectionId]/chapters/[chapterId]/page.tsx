import { getChapterById } from "@/app/actions/course.action";
import IconBadge from "@/components/global/icon-badge";
import { ArrowLeft, Eye, File, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "@/components/admin/chapters/ChapterTitleForm";
import { ChapterDescriptionForm } from "@/components/admin/chapters/ChapterDescriptionForm";
import { ChapterAccessForm } from "@/components/admin/chapters/ChapterAccessForm";
import { ChapterVideoForm } from "@/components/admin/chapters/ChapterVideoForm";
import Banner from "@/components/global/Banner";
import { IChapter } from "@/types/course";
import ChapterActions from "@/components/admin/chapters/ChapterActions";
import { AttachmentForm } from "@/components/admin/courses/AttachmentForm";

interface PageProps {
  params: Promise<{ courseId: string; chapterId: string; sectionId: string }>;
}
async function ChapterIdPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { courseId, chapterId, sectionId } = await params;
  console.log("section id inside chapter::", sectionId);

  const chapter: IChapter = await getChapterById(sectionId, chapterId);
  console.log("chapter::", chapter);

  if (!chapter) {
    return redirect("/admin/courses");
  }

  // ! apply a check which will ensure that required field are needed to create a chapter
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant={"warning"}
          label="This chapter is not published, It will be not published in the course"
        />
      )}
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="w-full ">
            <Link
              href={`/admin/courses/${courseId}/sections/${sectionId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to section setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
              </div>
              <ChapterActions
                sectionId={sectionId}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customise your chapter</h2>
              </div>
              {/* Chapter Title Form */}
              <ChapterTitleForm
                initialData={chapter}
                sectionId={sectionId}
                chapterId={chapterId}
              />
              {/* Chapter Description Form */}
              <ChapterDescriptionForm
                initialData={chapter}
                sectionId={sectionId}
                chapterId={chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              {/* Chapter Access Form */}
              <ChapterAccessForm
                initialData={chapter}
                sectionId={sectionId}
                chapterId={chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            {/* Chapter Video Form */}
            <ChapterVideoForm
              initialData={chapter}
              sectionId={sectionId}
              chapterId={chapterId}
            />
            {/* Attachment Form */}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments </h2>
              </div>
              <AttachmentForm
                initialData={chapter}
                chapterId={chapterId || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterIdPage;
