"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { removeCourse, selectCourses } from "@/store/features/cartSlice";
import { Star } from "lucide-react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cartDetails = useAppSelector(selectCourses);
  const router = useRouter();

  const orderDetails = useMemo(() => {
    const price = cartDetails.reduce(
      (total, item) => total + (item.price || 0),
      0
    );
    const discount = 0;
    const tax = 0;
    const total = price - discount + tax;

    return {
      price: price,
      discount: discount,
      tax: tax,
      total: total,
    };
  }, [cartDetails]);

  return (
    <div className="max-w-desktop mx-auto p-commonPadding py-8">
      <h1 className="text-headingSizeDesktop md:text-headingSizeMobile font-bold text-center mb-10">
        Your Cart
      </h1>

      {cartDetails.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartDetails.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary orderDetails={orderDetails} cartItems={cartDetails} />
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Browse our courses and find something you'd like to learn!
          </p>
          <button
            className="bg-[#00032D] hover:bg-[#00032D]/90 text-white"
            onClick={() => router.push("/courses")}
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
}
