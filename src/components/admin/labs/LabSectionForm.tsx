"use client";

import { ICourse } from "@/types/course";
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
  reOrderSection,
  updateCourse,
  uploadChapter,
  uploadSection,
} from "@/app/actions/course.action";
import { Input } from "@/components/ui/input";
import LabSectionsList from "./LabSectionsList";
import { ILab } from "@/types/lab";
import { reOrderLabSection, uploadLabSection } from "@/app/actions/lab.action";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export function LabSectionForm({
  initialData,
  labId,
}: {
  initialData: ILab | null;
  labId: string;
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
      await uploadLabSection(labId, values);
      toast.success("Lab Updated");
      toggleCreating();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating the Lab");
    }
  };
  const onReorder = async (updateData: { _id: string; order: number }[]) => {
    console.log("update data::", updateData);

    try {
      setIsUpdating(true);
      await reOrderLabSection(labId, {
        list: updateData,
      });
      toast.success("Lab Section Reorderd");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message ||
          "An error occurred while updating the lab section re order"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = async (_id: string) => {
    router.push(`/admin/labs/${labId}/sections/${_id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Lab Sections
        <Button onClick={toggleCreating} variant={"ghost"}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a lab section
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
                      placeholder="eg:Introduction to lab 1"
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
            !initialData?.labSections?.length && "text-slate-500 italic"
          )}
        >
          {!initialData?.labSections?.length && "No chapters yet."}
          <LabSectionsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData?.labSections || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the lab sections
        </p>
      )}
    </div>
  );
}
