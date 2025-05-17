"use client";

import { updateContactUs } from "@/app/actions/contact-us.action";
import { createNewUser, softDeleteUser } from "@/app/actions/user.action";
import CustomForm from "@/components/global/CommonForm";
import { IUserResponse } from "@/types/auth";
import { IFormField } from "@/types/common";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ContactQueryFormProps {
  initialData: IUserResponse | null;
  id: string;
  isEditing?: boolean;
}

function UserForm({ initialData, id, isEditing }: ContactQueryFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const UserField: IFormField[] = [
    {
      type: "input",
      name: "name",
      label: "Name",
      className: "text-[20px] !important",
      disable: isEditing ? true : false,
      rules: [
        {
          required: isEditing ? false : true,
          message: "Please enter user name",
        },
      ],
      value: initialData?.data?.name ? initialData.data.name : "",
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      className: "text-[20px] !important",
      disable: isEditing ? true : false,
      rules: [
        {
          required: isEditing ? false : true,
          message: "Please enter user email",
        },
      ],
      value: initialData?.data?.email ? initialData.data.email : "",
    },
    {
      type: "number",
      name: "phone",
      label: "Phone",
      className: "text-[20px] !important",
      disable: isEditing ? true : false,
      rules: [
        {
          required: isEditing ? false : true,
          message: "Please enter user phone",
        },
      ],
      value: initialData?.data?.phone ? initialData.data.phone : "",
    },
    {
      type: "select",
      name: "isDelete",
      label: "Delete Status",
      rules: [{ required: true, message: "Please select" }],
      options: [
        { label: "Active", value: "false" },
        { label: "Is Delete", value: "true" },
      ],
      value:
        isEditing && initialData?.data?.isDeleted
          ? initialData?.data.isDeleted.toString()
          : "false",
    },
  ];

  const handleSubmit = async (data: any) => {
    setLoading(true);
    const request = {
      id: id,
      isDeleted: data.isDelete === "true" ? true : false,
    };
    try {
      let response;
      if (isEditing) {
        response = await softDeleteUser(request);
        response.success
          ? toast.error(response.message)
          : toast.success(response.message);
      } else {
        console.log("data", data);
        response = await createNewUser(data);
        response.success
          ? toast.error(response.message)
          : toast.success(response.message);
      }
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-3">
      <CustomForm
        fields={UserField}
        onSubmit={handleSubmit}
        submitButtonText={
          loading ? "Sending..." : isEditing ? "Update User" : "Create user"
        }
        submitButtonType="simple"
      />
    </div>
  );
}

export default UserForm;
