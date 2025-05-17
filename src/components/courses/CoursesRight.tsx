"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { Star, Users, BookOpen, Globe, Share2, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { CiHeart } from "react-icons/ci";
import { MdOutlineContentCopy } from "react-icons/md";
import { LiaFacebookF } from "react-icons/lia";
import {
  addCourse,
  removeCourse,
  selectCourses,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { ICourse } from "@/types/course";
import Cookies from "react-cookies";
import {
  createOrder,
  verifyPaymentOnServer,
} from "@/app/actions/payment.action";
import { IRazorpayOrderOptions } from "@/types/razorpay";
import { usePathname, useRouter } from "next/navigation";
import { AlertDialogDemo } from "../global/AlertDialogDemo";
import Script from "next/script";
import toast from "react-hot-toast";
import { getCoursePurchased } from "@/app/actions/course.action";
import { getLabsPurchased } from "@/app/actions/lab.action";

interface ICourseProp {
  courseDetail: ICourse;
  id: string;
  labs?: boolean;
}

function CoursesRight({ courseDetail, id, labs = false }: ICourseProp) {
  const dispatch = useAppDispatch();
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<null | string>(null);
  const [loginStatus, setLoginStatus] = useState(true);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [dataLogin, setDataLogin] = useState<any>(false);
  const cartDetails = useAppSelector(selectCourses);

  const details = {
    _id: courseDetail._id,
    title: courseDetail.title,
    isPublished: courseDetail.isPublished,
    price: courseDetail.price,
    imageUrl: courseDetail.imageUrl,
    type: labs ? "lab" : "course",
  };

  useEffect(() => {
    if (!userAccessToken && !userRefreshToken) {
      setLoading(false);
      setLoginStatus(false);
      return;
    }

    if (loginStatus) {
      async function getCourse() {
        try {
          if (labs) {
            const courseData = await getLabsPurchased(id);
            if (courseData.success) {
              setDataLogin(true);
            }
          } else {
            const courseData = await getCoursePurchased(id);
            if (courseData.success) {
              setDataLogin(true);
            }
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }
      getCourse();
    }
  }, [id, labs]);

  const handleBuyNow = async () => {
    console.log("Proceeding to checkout with course IDs:", [courseDetail._id]);
    setLoading(true);
    setPaymentStatus(null);

    if (!userAccessToken && !userRefreshToken) {
      setOpenWarning(true);
      setLoading(false);
      return;
    }

    try {
      const data = await createOrder({
        courseIdsArr: [courseDetail._id],
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      const { order, insertedPurchases } = data.data;

      openRazorpayCheckout(order, insertedPurchases[0]);
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      setOpenError(true);
      setPaymentStatus("error");
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openRazorpayCheckout = (
    order: IRazorpayOrderOptions,
    purchase: any
  ) => {
    //@ts-ignore
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded. Please refresh the page and try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_m2gW43blaQn61i",
      amount: order.amount,
      currency: order.currency,
      name: "Telco Learn",
      description: purchase.course,
      order_id: order.id,
      handler: verifyPayment,
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: () => {
          setOpenError(true);
          setPaymentStatus("canceled");
          console.log("Payment modal closed by user");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (response: any) => {
    try {
      const verifyData = await verifyPaymentOnServer(response);

      if (verifyData.success) {
        setPaymentStatus("success");
        router.push("/success");
        cartDetails.forEach((course) => {
          if (course._id === id) {
            dispatch(removeCourse(course._id));
            router.refresh();
          }
        });
      } else {
        setOpenError(true);
        setPaymentStatus("failed");
        console.error("Payment verification failed:", verifyData.message);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("error");
    }
  };

  return (
    <>
      <AlertDialogDemo
        type="warning"
        title="Please Login"
        message="You need to log in to proceed with the purchase."
        open={openWarning}
        onOpenChange={setOpenWarning}
        onSubmit={() => router.push(`/signin`)}
      />

      <AlertDialogDemo
        type="error"
        title="Error Message"
        message={paymentStatus || " Payment error "}
        open={openError}
        onOpenChange={setOpenError}
        showCancelButton={false}
        actionButtonText="OK"
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="relative overflow-hidden w-full h-[250px] ">
        <Image
          src={courseDetail?.imageUrl || "/image/images.png"}
          alt=""
          width={108}
          height={100}
          className="h-full rounded-t object-cover w-full "
        />
      </div>

      <div className="p-6 border rounded-b">
        <div className="mb-4 flex items-baseline gap-2 ">
          {/* <span className=" text-subTextSizeMobile font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text lg:text-subTextSizeDesktop">
                        Free
                    </span> */}
          <span className="text-2xl  ">Rs. {courseDetail.price}</span>
        </div>

        <CountdownTimer />

        <div className="mb-6 space-y-4 mt-5">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#ff782d]" />
            <span>{courseDetail.enrolledCount} Students</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#ff782d]" />
            <span>8 Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#ff782d]" />
            <span>3 weeks</span>
          </div> */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#ff782d]" />
            <span>Language: English</span>
          </div>
        </div>
        {dataLogin ? (
          <Button
            className="w-full bg-[#ff782d] "
            size="lg"
            onClick={() => router.push(`/user${pathname}/${id}`)}
          >
            Start Learning
          </Button>
        ) : (
          <div className="space-y-4">
            <Button
              className="w-full bg-[#ff782d] "
              size="lg"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            {!labs && (
              <Button
                variant="outline"
                className="bg-specialBackgroundColor text-[#ff782d] w-full"
                size="lg"
                onClick={async () => {
                  dispatch(addCourse(details));
                  router.refresh();
                }}
              >
                Add to cart
              </Button>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("URL copied to clipboard successfully!");
            }}
          >
            <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500">
              <Share2 className="h-4 w-4" />
              Share
            </div>
          </button>
        </div>
      </div>
      <div className=" p-5 flex gap-5 flex-col ">
        <div className="w-full flex gap-2 ">
          <input
            type="text"
            placeholder="khushalsaboo@gmail.com"
            className=" border bg-inputBackgroundColor p-2 rounded w-[95%]"
          />
          <Button className="bg-[#ff782d] " size="lg">
            <MdOutlineContentCopy className="w-3 h-3 text-white " />
          </Button>
        </div>
        <div className=" flex gap-3 ">
          <div className=" w-10 h-10 rounded-full border flex justify-center items-center bg-transparent hover:bg-orange-500 hover:text-white text-[#838B7F]">
            <LiaFacebookF className="  text-[30px] p-1" />
          </div>

          <div className=" w-10 h-10 rounded-full border flex justify-center items-center bg-transparent hover:bg-orange-500 hover:text-white text-[#838B7F]">
            <LiaFacebookF className="  text-[30px] p-1" />
          </div>

          <div className=" w-10 h-10 rounded-full border flex justify-center items-center bg-transparent hover:bg-orange-500 hover:text-white text-[#838B7F]">
            <LiaFacebookF className="  text-[30px] p-1" />
          </div>

          <div className=" w-10 h-10 rounded-full border flex justify-center items-center bg-transparent hover:bg-orange-500 hover:text-white text-[#838B7F]">
            <LiaFacebookF className="  text-[30px] p-1" />
          </div>

          <div className=" w-10 h-10 rounded-full border flex justify-center items-center bg-transparent hover:bg-orange-500 hover:text-white text-[#838B7F]">
            <LiaFacebookF className="  text-[30px] p-1" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursesRight;
