"use client";

import { createAdmin, updateAdmin } from "@/app/actions/admin.action";
import CustomForm from "@/components/global/CommonForm";
import { IAdminResponse, ICreateAdmin } from "@/types/admin";
import { IFormField } from "@/types/common";
import { IRolesResponse } from "@/types/role";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { select } from "react-cookies";
import toast from "react-hot-toast";
interface RoleFormProps {
  initialData?: IAdminResponse | null;
  createNew?: boolean;
  id?: string;
  role?: IRolesResponse | null;
}

function AdminForm({
  initialData,
  createNew = false,
  id,
  role,
}: RoleFormProps) {
  console.log("initialData", initialData);
  const router = useRouter();

  const adminAddFields: IFormField[] = [
    {
      type: "input",
      name: "name",
      label: "Name",
      value: initialData?.data.name || "",
      rules: [{ required: true, message: "Please enter Name" }],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      value: initialData?.data.email || "",
      rules: [
        { required: true, message: "Please enter Email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      rules: [{ required: true, message: "Please select a status" }],
      value: initialData?.data.status || "active",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "suspended", label: "Suspended" },
      ],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
    {
      type: "select",
      name: "roleId",
      label: "Role",
      rules: [{ required: true, message: "Please select a role" }],
      value: initialData?.data.role || "",
      options:
        role?.data?.map((role: any) => ({
          value: role._id,
          label: role.name,
        })) || [],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
  ];

  const onSubmit = async (data: ICreateAdmin) => {
    const request = {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      status: data.status,
    };
    console.log("create admin", request);
    try {
      let res;
      if (createNew) {
        res = await createAdmin(request);
      } else {
        res = await updateAdmin(id || "", request);
      }
      if (res?.success) {
        toast.success(res?.message || "Admin created successfully!");
        router.push("/admin/admin");
      }
    } catch (error: any) {
      console.error("error:", error.message);
      toast.error(error.message);
      // router.push("/admin");
    }
  };

  return (
    <div className=" p-5 ">
      <CustomForm
        fields={adminAddFields}
        onSubmit={onSubmit}
        submitButtonText={createNew ? "Create Admin" : "Update Admin"}
        submitButtonType="simple"
      />
    </div>
  );
}

export default AdminForm;
