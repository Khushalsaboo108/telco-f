"use client";

import { useState } from "react";
import Image from "next/image";
import signInImage from "@/../public/image/signin.png";
import signUpImage from "@/../public/image/signup.png";
import Navbar from "../navbar/Navbar";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import SpinnerSize from "@/app/SpinnerSize";
import { useRouter } from "next/navigation";
import Cookies from "react-cookies";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");

  if (userAccessToken && userRefreshToken) {
    router.push("/");
  }

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      {loading && <SpinnerSize />}
      <Navbar />
      <div className="flex mx-5 bg-newBackgroundColor rounded max-w-desktop border  mt-2 lg:mx-auto">
        {/* Left side - Form */}
        <div className="w-full  lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 ">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold ">
              {isSignIn ? "SIGN IN" : "SIGN UP"}
            </h1>
            <hr className="bg-gray-700 mb-8" />

            {isSignIn ? (
              <SignInForm toggleForm={toggleForm} setLoading={setLoading} />
            ) : (
              <SignUpForm toggleForm={toggleForm} setLoading={setLoading} />
            )}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="h-full w-full relative">
            <Image
              src={isSignIn ? signInImage : signUpImage}
              alt={isSignIn ? "Students collaborating" : "Students in library"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
