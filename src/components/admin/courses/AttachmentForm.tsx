"use client";

import { IChapter, ICourse } from "@/types/course";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import {
  deleteAttachment,
  uploadAttachments,
} from "@/app/actions/course.action";

const formSchema = z.object({
  url: z.string().min(1, { message: "file is required" }),
});
export function AttachmentForm({
  initialData,
  chapterId,
}: {
  initialData: IChapter | null;
  chapterId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await uploadAttachments(chapterId, values);
      toast.success("Course Updated");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while deleting the attachment"
      );
    }
  };

  const onDelete = async (_id: string) => {
    try {
      setDeletingId(_id);
      const response = await deleteAttachment(chapterId, _id);

      toast.success("Attachment deleted");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while deleting the attachment"
      );
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Attachments
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachments?.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No Attachments yet
            </p>
          )}
          {initialData?.attachments && initialData?.attachments?.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => {
                return (
                  <div
                    key={attachment?._id}
                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 text-sky-700 rounded-md"
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">{attachment?.name}</p>
                    {deletingId === attachment._id && (
                      <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {deletingId !== attachment._id && (
                      <button
                        //@ts-ignore
                        onClick={() => onDelete(attachment._id)}
                        className="ml-auto hover:opacity-75 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="chapterAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4 ">
            Add Anything for your students
          </div>
        </div>
      )}
    </div>
  );
}
