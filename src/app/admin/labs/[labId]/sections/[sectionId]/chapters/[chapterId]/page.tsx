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
import { ILabChapter } from "@/types/lab";
import { getLabChapterById } from "@/app/actions/lab.action";
import LabChapterActions from "@/components/admin/labs/LabChapterActions";
import { LabChapterTitleForm } from "@/components/admin/labs/LabChapterTitleForm";
import { LabChapterDescriptionForm } from "@/components/admin/labs/LabChapterDescriptionForm";
import { LabChapterAccessForm } from "@/components/admin/labs/LabChapterAccessForm";
import TestComponent from "@/components/admin/labs/TestComponent";

interface PageProps {
  params: Promise<{ labId: string; chapterId: string; sectionId: string }>;
}
async function LabChapterIdPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { labId, chapterId, sectionId } = await params;

  const chapter: ILabChapter = await getLabChapterById(sectionId, chapterId);

  if (!chapter) {
    return redirect("/admin/labs");
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
              href={`/admin/labs/${labId}/sections/${sectionId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to lab section setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Lab Chapter Creation</h1>
              </div>
              <LabChapterActions
                sectionId={sectionId}
                labId={labId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-16">
          <div className="space-y-4 w-[40%] ">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customise your lab chapter</h2>
              </div>
              {/* Chapter Title Form */}
              <LabChapterTitleForm
                initialData={chapter}
                sectionId={sectionId}
                chapterId={chapterId}
              />
              {/* Chapter Description Form */}
              <LabChapterDescriptionForm
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
              <LabChapterAccessForm
                initialData={chapter}
                sectionId={sectionId}
                chapterId={chapterId}
              />
            </div>
          </div>
          <div className=" w-[60%] ">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            {/* ! replace this with text editor Chapter Video Form */}
            <TestComponent
              id={chapterId}
              contentData={chapter?.content || ""}
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

export default LabChapterIdPage;
