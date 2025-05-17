"use client";
import {
  deleteChapter,
  deleteSection,
  updateSection,
} from "@/app/actions/course.action";
import { deleteLabSection, updateLabSection } from "@/app/actions/lab.action";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LabSectionActionProps {
  sectionId: string;
  labId: string;
  isPublished: boolean;
}
const LabSectionActions = ({
  sectionId,
  labId,
  isPublished,
}: LabSectionActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async () => {
    try {
      setIsLoading(true);
      await updateLabSection(labId, sectionId, { isPublished: !isPublished });
      toast.success(`Lab Chapter ${isPublished ? "Unpublished" : "Published"}`);
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
      await deleteLabSection(labId, sectionId);
      router.refresh();
      router.push(`/admin/labs/${labId}`);
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

export default LabSectionActions;
