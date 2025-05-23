"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { createLab } from "@/app/actions/lab.action";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

function CreateLabPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createLab(values);
      router.push(`/admin/labs/${response?._id}`);
      toast.success("Lab Created");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while creating the lab");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div className="">
        <h1 className="text-2xl">Name Your Lab</h1>
        <p>What Would you like to name your Lab?</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lab Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Advance Web Dev"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What Will You teach in this Lab?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={"/admin/courses"}>
                <Button variant={"ghost"}>Cancel</Button>
              </Link>
              <Button disabled={!isValid || isSubmitting} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateLabPage;
