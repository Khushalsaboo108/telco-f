"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ICourse } from "@/types/course";
import {
  createOrder,
  verifyPaymentOnServer,
} from "@/app/actions/payment.action";
import { IRazorpayOrderOptions } from "@/types/razorpay";
import Script from "next/script";
import Cookies from "react-cookies";
import { AlertDialogDemo } from "../global/AlertDialogDemo";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/use-redux";
import { removeCourse, removeLab } from "@/store/features/cartSlice";
import { ICartDetails } from "@/types/common";

interface OrderDetailsProps {
  price: number;
  discount: number;
  tax: number;
  total: number;
}

interface OrderSummaryProps {
  orderDetails: OrderDetailsProps;
  cartItems: ICartDetails[];
}

function OrderSummary({ orderDetails, cartItems }: OrderSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<null | string>(null);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const courseIds = cartItems.map((item) => item._id);

  const handleBuyNow = async () => {
    console.log("Proceeding to checkout with course IDs:", courseIds);
    setLoading(true);
    setPaymentStatus(null);

    if (!userAccessToken && !userRefreshToken) {
      setOpenWarning(true);
      setLoading(false);
      return;
    }

    try {
      const data = await createOrder({
        courseIdsArr: courseIds,
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      const order = data.data.order;
      const courses = data.data.insertedPurchases;

      openRazorpayCheckout(order, courses);
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
    courses: any[]
  ) => {
    //@ts-ignore
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded. Please refresh the page and try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_m2gW43blaQn61i",
      amount: order.amount, // Amount in paise (e.g., 50000 for ₹500)
      currency: order.currency,
      name: "Telco Learn", // Your business name
      description: "Course Purchase",
      order_id: order.id,
      handler: (response: any) => verifyPayment(response, courses), // Pass courses to verifyPayment
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

  const verifyPayment = async (response: any, courses: any[]) => {
    try {
      const verifyData = await verifyPaymentOnServer(response);

      if (verifyData.success) {
        setPaymentStatus("success");
        router.push("/success");
        courses.forEach((course) => {
          dispatch(removeCourse(course.course));
          router.refresh();
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

      <div className="border border-[#e7e7e7] rounded-lg p-6 bg-newBackgroundColor shadow-light">
        <h2 className="text-xl font-bold mb-6">Order Details</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Price</span>
            <span className="font-semibold">
              Rs. {orderDetails.price.toFixed(2)}
            </span>
          </div>

          {orderDetails.discount > 0 && (
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-semibold text-[#c30000]">
                -Rs. {orderDetails.discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold">
              Rs. {orderDetails.tax.toFixed(2)}
            </span>
          </div>

          <div className="h-px bg-[#e7e7e7] my-4"></div>

          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">
              Rs. {orderDetails.total.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-6 bg-[#00032D] hover:bg-[#00032D]/90 text-white py-6"
          disabled={orderDetails.price <= 0}
          onClick={handleBuyNow}
        >
          Proceed To Checkout
        </Button>
      </div>
    </>
  );
}

export default OrderSummary;
