"use client";

import { ICourse, ISection } from "@/types/course";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Grip, Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  reOrderChapter,
  updateCourse,
  uploadChapter,
} from "@/app/actions/course.action";
import { Input } from "@/components/ui/input";
import ChaptersList from "./ChaptersList";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
export function ChapterForm({
  initialData,
  sectionId,
  courseId,
}: {
  initialData: ISection | null;
  sectionId: string;
  courseId: string;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const toggleCreating = () => setIsCreating((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await uploadChapter(sectionId, values);
      toast.success("Course Updated");
      toggleCreating();
      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while updating the course"
      );
    }
  };

  const onReorder = async (updateData: { _id: string; order: number }[]) => {
    console.log("update data::", updateData);

    try {
      setIsUpdating(true);
      await reOrderChapter(sectionId, {
        list: updateData,
      });
      toast.success("Chapters Reorderd");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while reordering the chapter"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = async (_id: string) => {
    // router.push(`/admin/courses/${courseId}/chapters/${_id}`);
    router.push(
      `/admin/courses/${courseId}/sections/${sectionId}/chapters/${_id}`
    );
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button onClick={toggleCreating} variant={"ghost"}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="eg:Introduction to course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.chapters?.length && "text-slate-500 italic"
          )}
        >
          {!initialData?.chapters?.length && "No chapters yet."}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData?.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
}
