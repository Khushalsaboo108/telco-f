"use client";
import CustomForm from "@/components/global/CommonForm";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { updateProfile } from "@/store/features/adminSlice";
import { IFormField } from "@/types/common";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function UpdateProgile() {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const adminDetail = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  console.log("data", adminDetail);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);

    try {
      const formData = {
        name: data.name,
      };

      console.log("data", formData);
      await dispatch(updateProfile(formData));

      router.push("/admin/settings");
      //   router.refresh();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const ProfileField: IFormField[] = [
    {
      type: "input",
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please enter Name" }],
      className: "text-[20px] !important",
      value: adminDetail.name,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      disable: true,
      className: "text-[20px] !important",
      value: adminDetail.email,
    },
    {
      type: "input",
      name: "status",
      label: "Status",
      disable: true,
      className: "text-[20px] !important",
      value: adminDetail.status,
    },
  ];

  return (
    <div className=" p-4 ">
      <h2>Profile Detail</h2>
      <CustomForm
        fields={ProfileField}
        onSubmit={handleSubmit}
        submitButtonText={loading ? "Saving..." : "Update Profile"}
        submitButtonType="simple"
      />
    </div>
  );
}

export default UpdateProgile;
