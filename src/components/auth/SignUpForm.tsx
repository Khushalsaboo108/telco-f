"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { IFormField } from "@/types/common";
import CustomForm from "../global/CommonForm";
import { AnimatedCommonButton } from "../global/CommonButton";
import { IRegistered } from "@/types/auth";
import { signup } from "@/app/actions/user.action";
import toast from "react-hot-toast";

// Define the sign-up schema
const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  toggleForm: () => void;
  setLoading: (loading: boolean) => void;
}

export function SignUpForm({ toggleForm, setLoading }: SignUpFormProps) {
  // Handle sign-up form submission
  const onSubmit = async (data: SignUpFormValues) => {
    const request: IRegistered = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    console.log("Sign Up Data:", request);
    try {
      setLoading(true);
      const res = await signup(request);
      if (res.status) {
        toast.success(
          res.message ||
            "User registered successfully. You will get conformation email soon."
        );
        toggleForm();
      }
    } catch (error: any) {
      console.error("error:", error.message);
      toast.error(error.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const adminAddFields: IFormField[] = [
    {
      type: "input",
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please enter Name" }],
      className:
        " text-[20px] !important py-0 !important px-[10px] !important ",
    },
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
      type: "number",
      name: "phone",
      label: "Phone",
      rules: [
        { required: true, message: "Please enter Phone number" },
        // { pattern: /^[0-9]{10}$/, message: "Please enter exactly 10 digits (0-9 only)" }
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
    {
      type: "password",
      name: "conformPassword",
      label: "Confirm Password",
      rules: [{ required: true, message: "Please enter Confirm Password" }],
      className: " text-[20px] !important py-0 px-[10px] ",
    },
  ];

  return (
    <div className=" flex flex-col w-full ">
      <CustomForm
        fields={adminAddFields}
        onSubmit={onSubmit}
        submitButtonText="Sign Up"
        submitButtonType="unique"
      />
      <SocialLoginButtons />
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-orange-500 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
