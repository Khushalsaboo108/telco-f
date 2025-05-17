"use client";

import { updateContactUs } from "@/app/actions/contact-us.action";
import CustomForm from "@/components/global/CommonForm";
import { IFormField } from "@/types/common";
import { IContactUsResponce } from "@/types/contact-us";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ContactQueryFormProps {
  initialData: IContactUsResponce | null;
  id: string;
}

function ContactUsForm({ initialData, id }: ContactQueryFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ContactUsField: IFormField[] = [
    {
      type: "input",
      name: "name",
      label: "Name",
      className: "text-[20px] !important",
      disable: true,
      value: initialData?.data?.name ? initialData.data.name : "",
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      className: "text-[20px] !important",
      disable: true,
      value: initialData?.data?.email ? initialData.data.email : "",
    },
    {
      type: "number",
      name: "phone",
      label: "Phone",
      className: "text-[20px] !important",
      disable: true,
      value: initialData?.data?.phone ? initialData.data.phone : "",
    },
    {
      type: "input",
      name: "subject",
      label: "Subject",
      className: "text-[20px] !important",
      disable: true,
      value: initialData?.data?.subject ? initialData.data.subject : "",
    },
    {
      type: "textarea",
      name: "message",
      label: "Message",
      className: "text-[20px] !important",
      disable: true,
      value: initialData?.data?.message ? initialData.data.message : "",
    },
    {
      type: "textarea",
      name: "messageReply",
      label: "Reply Message",
      className: "text-[20px] !important",
      rules: [{ required: true, message: "Please enter Message" }],
    },
  ];

  const handleSubmit = async (data: any) => {
    setLoading(true);

    const { messageReply } = data;

    console.log("messageReply", messageReply);

    try {
      const responce = await updateContactUs(messageReply, id);
      router.push("/admin/contact-query");
      router.refresh();
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("you have not permission message");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-3">
      <CustomForm
        fields={ContactUsField}
        onSubmit={handleSubmit}
        submitButtonText={loading ? "Sending..." : "Send message"}
        submitButtonType="simple"
      />
    </div>
  );
}

export default ContactUsForm;
