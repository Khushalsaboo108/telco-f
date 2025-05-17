"use client";

import CustomForm from "@/components/global/CommonForm";
import { IAdminLogin } from "@/types/admin";
import { IFormField } from "@/types/common";
import React from "react";
import toast from "react-hot-toast";
import { loginAdmin } from "../actions/admin.action";
import { useAppDispatch } from "@/hooks/use-redux";
import { adminLogin } from "@/store/features/adminSlice";
import { useRouter } from "next/navigation";

function AdminLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const adminAddFields: IFormField[] = [
    {
      type: "email",
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter Email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      rules: [{ required: true, message: "Please enter Password" }],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
  ];

  const onSubmit = async (data: IAdminLogin) => {
    const request: IAdminLogin = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await dispatch(adminLogin(request)).unwrap();
      if (res?.success) {
        toast.success(
          res?.message ||
            "User registered successfully. You will get conformation email soon."
        );
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 100);
      }
    } catch (error: any) {
      console.error("error:", error.message);
      toast.error(error.message || "Error");
    }
  };
  return (
    <div className="  flex items-center justify-center h-[80vh] mx-auto">
      <div className="border shadow-lg p-5 py-8 w-[450px] rounded-lg">
        <h2 className=" text-center"> Admin Login </h2>
        <CustomForm
          fields={adminAddFields}
          onSubmit={onSubmit}
          submitButtonText="Login"
          submitButtonType="unique"
        />
      </div>
    </div>
  );
}

export default AdminLogin;
