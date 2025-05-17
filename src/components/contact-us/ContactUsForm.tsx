"use client";

import { IFormField } from "@/types/common";
import React from "react";
import CustomForm from "../global/CommonForm";
import { ContactFormData } from "@/schema/contactFormSchema";
import { submitContactUs } from "@/app/actions/contact-us.action";
import { IRequestContactUs } from "@/types/contact-us";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ContactUsForm() {
  const router = useRouter();
  const onSubmit = async (data: IRequestContactUs) => {
    try {
      await submitContactUs(data);
      toast.success("Message sent successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const adminAddFields: IFormField[] = [
    {
      type: "input",
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please enter Name" }],
      className: " text-[20px] !important ",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter Email" },
        { type: "email", message: "Please enter a valid email" },
      ],
    },
    {
      type: "number",
      name: "phone",
      label: "Phone",
      rules: [{ required: true, message: "Please enter Phone number" }],
    },
    {
      type: "input",
      name: "subject",
      label: "Subject",
      rules: [{ required: true, message: "Please enter your Subject" }],
    },
    {
      type: "textarea",
      name: "message",
      label: "Message",
      placeholder: "Enter Message",
    },
  ];
  return (
    <CustomForm
      fields={adminAddFields}
      onSubmit={onSubmit}
      submitButtonText="Send message"
      submitButtonType="simple"
    />
  );
}

export default ContactUsForm;
