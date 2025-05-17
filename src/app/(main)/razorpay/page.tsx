"use client";
import { useState } from "react";
import Script from "next/script";
import {
  createOrder,
  verifyPaymentOnServer,
} from "@/app/actions/payment.action";

interface OrderNotes {
  courseId: string;
  userId: string;
}

interface RazorpayOrderOptions {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: OrderNotes;
  offer_id: string | null;
  receipt: string;
  status: string;
}

export default function CoursePage() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<null | string>(null);

  const handleBuyNow = async () => {
    setLoading(true);
    setPaymentStatus(null);

    try {
      const data = await createOrder({
        courseIdsArr: ["67d6aa1bc29e71317099c8f5"],
      });

      console.log("data", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }
      openRazorpayCheckout(data.data.order, data.data.insertedPurchases[0]);
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      setPaymentStatus("error");
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openRazorpayCheckout = (order: RazorpayOrderOptions, course: any) => {
    //@ts-ignore
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded. Please refresh the page and try again.");
      setLoading(false);
      return;
    }
    console.log("order", order);
    console.log("course", course);
    console.log(
      "NEXT_PUBLIC_RAZORPAY_KEY_ID",
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    );

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount, // Amount in paise (e.g., 50000 for ₹500)
      currency: order.currency,
      name: "Telco Learn", // Your business name
      description: course.name,
      order_id: order.id,
      handler: verifyPayment, // Function to handle payment response
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
      } else {
        setPaymentStatus("failed");
        console.error("Payment verification failed:", verifyData.message);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("error");
    }
  };

  return (
    <div>
      {/* Load Razorpay SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <h1>Course Purchase</h1>
      <button onClick={handleBuyNow} disabled={loading}>
        {loading ? "Processing..." : "Buy Now"}
      </button>

      {/* Payment status feedback */}
      {paymentStatus === "success" && (
        <p style={{ color: "green" }}>
          Payment successful! You can now access the course.
        </p>
      )}
      {paymentStatus === "failed" && (
        <p style={{ color: "red" }}>
          Payment failed. Please try again or contact support.
        </p>
      )}
      {paymentStatus === "canceled" && (
        <p style={{ color: "orange" }}>Payment was canceled.</p>
      )}
      {paymentStatus === "error" && (
        <p style={{ color: "red" }}>
          An error occurred. Please check your connection and try again.
        </p>
      )}
    </div>
  );
}
