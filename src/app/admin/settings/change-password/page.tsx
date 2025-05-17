"use client";

import { changePassword } from "@/app/actions/admin.action";
import CustomForm from "@/components/global/CommonForm";
import { IFormField } from "@/types/common";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data: any) => {
    setLoading(true);

    try {
      const formData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      console.log("formData", formData);

      const res = await changePassword(formData);

      console.log("data", res);

      toast.success(res.message);
      // router.push("/admin/settings");

      //   router.refresh();
    } catch (error: any) {
      console.error("Error saving blog:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ChangePasswordField: IFormField[] = [
    {
      type: "password",
      name: "oldPassword",
      label: "Old Password",
      rules: [{ required: true, message: "Please enter Old Password" }],
      className: "text-[20px] !important",
    },
    {
      type: "password",
      name: "newPassword",
      label: "New Password",
      rules: [{ required: true, message: "Please enter New Password" }],
      className: "text-[20px] !important",
    },
    {
      type: "password",
      name: "conformPassword",
      label: "Confirm Password",
      rules: [{ required: true, message: "Please enter Confirm Password" }],
      className: "text-[20px] !important",
    },
  ];

  return (
    <div className=" p-3 ">
      <CustomForm
        fields={ChangePasswordField}
        onSubmit={handleSubmit}
        submitButtonText={loading ? "Saving..." : "Change Password"}
        submitButtonType="simple"
      />
    </div>
  );
}

export default ChangePassword;
