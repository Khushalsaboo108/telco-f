"use client";
import { deleteCourse, updateCourse } from "@/app/actions/course.action";
import { deleteLab, updateLab } from "@/app/actions/lab.action";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionProps {
  labId: string;
  isPublished: boolean;
}
const LabActions = ({ labId, isPublished }: CourseActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async () => {
    console.log("is published::", isPublished);

    try {
      setIsLoading(true);
      await updateLab(labId, { isPublished: !isPublished });
      toast.success(`Course ${isPublished ? "UnPublished" : "Published"}`);

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteLab(labId);
      router.refresh();
      router.push(`/admin/labs`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onPublish} variant={"outline"} size={"sm"}>
        {isPublished ? "Unpublish" : "publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} size={"sm"}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default LabActions;
