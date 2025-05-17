"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "./ImageUpload";
import { IApiResponseUserProfile } from "@/types/auth";
import { updateProfile, userProfile } from "@/app/actions/user.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  profileImage: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\s()-]{7,15}$/, "Invalid phone number format"),
  description: z.string().optional(),
});

interface IProfile {
  profileDetail: IApiResponseUserProfile | null;
}

export default function ProfileForm({ profileDetail }: IProfile) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const router = useRouter();

  const nameParts = profileDetail?.data.name
    ? profileDetail?.data.name.split(" ")
    : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: profileDetail?.data.imageUrl || "",
      firstName,
      lastName,
      email: profileDetail?.data?.email,
      phoneNumber: profileDetail?.data.phone,
      description: profileDetail?.data.discription,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const updatedUserData = {
        name: `${data.firstName} ${data.lastName}`,
        imageUrl: profileImage,
        discription: data.description,
      };

      // Add API call to update user profile here
      const response = await updateProfile(updatedUserData);

      if (response.status) {
        toast.success(response.message);
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (url: string) => {
    setProfileImage(url);
    form.setValue("profileImage", url);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <ImageUpload
        value={profileImage}
        onChange={handleImageChange}
        disabled={isSubmitting}
      />

      <div className="w-full max-w-desktop p-8 rounded-[16px] border-4 shadow-light">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#656565] text-textSizeMobile md:text-textSizeDesktop">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter Your First Name"
                        className="p-4 border w-full border-[#cfd3d6] capitalize rounded-md bg-inputBackgroundColor"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#656565] text-textSizeMobile md:text-textSizeDesktop">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter Your Last Name"
                        className="p-4 border w-full border-[#cfd3d6] capitalize text-[14px] rounded-md bg-inputBackgroundColor"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#656565] text-textSizeMobile md:text-textSizeDesktop">
                      Email
                    </FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="p-4 border w-full border-[#cfd3d6] rounded-md text-[14px] bg-inputBackgroundColor"
                        disabled={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#656565] text-textSizeMobile md:text-textSizeDesktop">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <input
                        placeholder="Enter Your Phone Number"
                        className="p-4 border w-full border-[#cfd3d6] text-[14px] rounded-md bg-inputBackgroundColor"
                        disabled={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#656565] text-textSizeMobile md:text-textSizeDesktop">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="About Yourself"
                      className="p-4 border w-full border-[#cfd3d6] text-[14px] rounded-md bg-inputBackgroundColor min-h-[120px]"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
              {/* <Button
                                type="button"
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={handleShareProfile}
                                disabled={isSubmitting || !profileData?._id}
                            >
                                <Share2 size={16} />
                                Share Profile
                            </Button> */}
              <Button
                type="submit"
                className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
