"use client";
import React, { useState } from "react";
import Editor from "../blog/Editor";
import CustomForm from "@/components/global/CommonForm";
import { IFormField } from "@/types/common";
import { labChapterContent } from "@/app/actions/lab.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

function TestComponent({
  id,
  contentData,
}: {
  id: string;
  contentData: string;
}) {
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const LabField: IFormField[] = [
    {
      type: "textEditor",
      name: "labContent",
      label: "Labs Content",
      rules: [{ required: true, message: "Please enter Labs Content" }],
      value: content,
      initialEditorContent: contentData ? contentData : "",
    },
  ];

  const onSubmit = async (data: any) => {
    console.log("Form data:", data, "id", id);
    await labChapterContent(id, data.labContent);
    toast.success("Lab content updated successfully");
    router.refresh();
  };
  return (
    <div className=" my-5 ">
      <CustomForm
        fields={LabField}
        onSubmit={onSubmit}
        submitButtonText="Update The Content"
        submitButtonType="simple"
      />
    </div>
  );
}

export default TestComponent;
