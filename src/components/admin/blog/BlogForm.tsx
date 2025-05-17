"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomForm from "@/components/global/CommonForm";
import { IFormField } from "@/types/common";
import { createBlog, updateBlog } from "@/app/actions/blog.action";
import toast from "react-hot-toast";

interface BlogFormProps {
  initialData: any | null;
  isEditing: boolean;
}

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

export default function BlogForm({ initialData, isEditing }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>("");

  // Set initial content when editing
  useEffect(() => {
    if (isEditing && initialData?.data?.blogContent) {
      // Preserve the exact content format as it is stored
      setContent(initialData.data.blogContent);
    }
  }, [isEditing, initialData]);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const formData = {
        blogTitle: data.blogTitle,
        blogContent: data.blogContent,
        isPublished: data.isPublished,
      };

      if (isEditing) {
        await updateBlog(initialData.data._id, formData);
      } else {
        await createBlog(formData);
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("you have not permission to access this page");
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  // Update the BlogField array with the actual current value of content
  const BlogField: IFormField[] = [
    {
      type: "input",
      name: "blogTitle",
      label: "Blog Title",
      rules: [{ required: true, message: "Please enter Name" }],
      className: "text-[20px] !important",
      value:
        isEditing && initialData?.data?.blogTitle
          ? initialData.data.blogTitle
          : "",
    },
    {
      type: "textEditor",
      name: "blogContent",
      label: "Blog Content",
      rules: [{ required: true, message: "Please enter Blog Content" }],
      value: content,
      initialEditorContent:
        isEditing && initialData?.data?.blogContent
          ? initialData.data.blogContent
          : "",
    },
    {
      type: "select",
      name: "isPublished",
      label: "Published",
      rules: [{ required: true, message: "Please select Published" }],
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      value:
        isEditing && initialData?.data?.isPublished
          ? initialData.data.isPublished.toString()
          : "false",
    },
  ];

  return (
    <div className="p-6">
      <CustomForm
        fields={BlogField}
        onSubmit={handleSubmit}
        submitButtonText={
          isLoading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"
        }
        submitButtonType="simple"
      />
    </div>
  );
}
