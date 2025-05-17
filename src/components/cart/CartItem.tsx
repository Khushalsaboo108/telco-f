"use client";

import { getCoursePurchased } from "@/app/actions/course.action";
import { useAppDispatch } from "@/hooks/use-redux";
import { removeCourse } from "@/store/features/cartSlice";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "react-cookies";
import { toast } from "react-hot-toast";

function CartItem({ item }: { item: any }) {
  console.log("data");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  useEffect(() => {
    if (!userAccessToken && !userRefreshToken) {
      setLoginStatus(false);
      return;
    }

    if (loginStatus) {
      async function getCourse() {
        try {
          const courseData = await getCoursePurchased(item._id);
          console.log("data", courseData);
          if (courseData.success) {
            dispatch(removeCourse(item._id));
            toast.success(`${item.title} course is all ready purchased`, {
              duration: 6000,
            });
            router.refresh();
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }
      getCourse();
    }
  }, [item._id]);

  return (
    <div className="border border-[#e7e7e7] rounded-lg p-4 flex flex-col md:flex-row gap-4 bg-newBackgroundColor shadow-light hover:shadow-light-hover transition-shadow duration-300">
      <div className="w-full md:w-1/4 h-48 md:h-auto relative">
        <Image
          src={item.imageUrl || "/image/images.png"}
          alt={item.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row my-3 md:justify-between capitalize gap-2">
          <div className=" flex justify-start flex-col ">
            <h2 className=" font-semibold">{item.title}</h2>

            <div className="flex items-center mt-2">
              <span className="font-bold text-[#f4bf08] mr-2">
                {item.rating}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-muted-foreground ml-2">
                ({item.ratingCount} rating)
              </span>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                className="text-[#c30000] "
                onClick={() => {
                  dispatch(removeCourse(item._id));
                  router.refresh();
                }}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="text-2xl font-bold mt-4 md:mt-0">
            {item.price !== undefined
              ? `Rs. ${item.price.toFixed(2)}`
              : "Price not available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
