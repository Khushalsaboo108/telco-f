"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Github, Facebook } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useAppDispatch } from "@/hooks/use-redux";
import { authLogin } from "@/store/features/authSlice";
import CustomForm from "../global/CommonForm";
import { IFormField } from "@/types/common";
import { useState } from "react";

// Define the sign-in schema
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
  rememberMe: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  toggleForm: () => void;
  setLoading: (loading: boolean) => void;
}

export function SignInForm({ toggleForm, setLoading }: SignInFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openModel, setOpenModel] = useState<boolean>(false);

  // Handle sign-in form submission
  const onSubmit = async (data: SignInFormValues) => {
    console.log("Sign In Data:", data);
    const request = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);
      const response = await dispatch(authLogin(request)).unwrap();
      if (response.success) {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className=" w-full ">
      <CustomForm
        fields={adminAddFields}
        onSubmit={onSubmit}
        submitButtonText="Sign In"
        submitButtonType="unique"
      />

      <div
        onClick={() => setOpenModel(true)}
        className="flex justify-between mt-5 items-center text-sm text-cyan-400 cursor-pointer hover:underline"
      >
        Forgot Password?
      </div>

      <SocialLoginButtons />

      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-orange-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
