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
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { SectionForm } from "@/components/admin/section/SectionForm";
import { getAllLabCategories, getLabById } from "@/app/actions/lab.action";
import { LabTitleForm } from "@/components/admin/labs/LabTitleForm";
import { LabDescriptionForm } from "@/components/admin/labs/LabDescriptionForm";
import { LabImageForm } from "@/components/admin/labs/LabImageForm";
import { LabSectionForm } from "@/components/admin/labs/LabSectionForm";
import { LabPriceForm } from "@/components/admin/labs/LabPriceForm";
import LabActions from "@/components/admin/labs/LabActions";

// ! there is a bug in this code where if user is doing api call , and the server is down , he can still see the success toast

interface PageProps {
  params: Promise<{ labId: string }>;
}

async function LabIdPage({ params }: PageProps): Promise<React.JSX.Element> {
  const labId = (await params).labId;
  const lab = await getLabById(labId);
  console.log("lab::", lab);
  if (!lab) {
    toast.error("lab not found");
    return redirect("/admin/labs");
  }
  // const categories: ICategory[] = await getAllLabCategories();

  return (
    <>
      {!lab?.isPublished && (
        <Banner label="This Lab is unpublished. It will not be visible to students." />
      )}
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Lab Setup</h1>
          </div>
          <LabActions
            labId={lab?._id}
            isPublished={lab?.isPublished || false}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your Lab</h2>
            </div>
            <LabTitleForm initialData={lab} labId={lab?._id} />
            <LabDescriptionForm initialData={lab} labId={lab?._id} />
            <LabImageForm initialData={lab} labId={lab?._id} />
            {/* // TODO cretae a new category component for this category of lab */}
            form
            {/* <CategoryForm
              initialData={lab}
              courseId={lab?._id}
              options={categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
            /> */}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Lab Sections</h2>
              </div>
              {/* <SectionForm initialData={lab} courseId={lab?._id} /> */}
              <LabSectionForm initialData={lab} labId={lab?._id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BadgeIndianRupee} />
                <h2 className="text-xl">Sell your Lab</h2>
              </div>
              <LabPriceForm initialData={lab} labId={lab?._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabIdPage;
