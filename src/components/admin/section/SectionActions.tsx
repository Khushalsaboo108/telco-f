"use client";
import {
  deleteChapter,
  deleteSection,
  updateSection,
} from "@/app/actions/course.action";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SectionActionProps {
  sectionId: string;
  courseId: string;
  isPublished: boolean;
}
const SectionActions = ({
  sectionId,
  courseId,
  isPublished,
}: SectionActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async () => {
    try {
      setIsLoading(true);
      await updateSection(courseId, sectionId, { isPublished: !isPublished });
      toast.success(`Chapter ${isPublished ? "Unpublished" : "Published"}`);
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
      // action for deleting chapter
      await deleteSection(courseId, sectionId);
      router.refresh();
      router.push(`/admin/courses/${courseId}`);
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

export default SectionActions;
