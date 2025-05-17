"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import Cookies from "react-cookies";
import { AlertDialogDemo } from "../global/AlertDialogDemo";
import { useRouter } from "next/navigation";

function Reviews() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");

  const handleBuyNow = async () => {
    setLoading(true);

    if (!userAccessToken && !userRefreshToken) {
      setOpenWarning(true);
      setLoading(false);
      return;
    }
    console.log("hello can you write your review");
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
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>
        <div className=" border rounded p-6">
          <div className=" flex gap-2 justify-between">
            <div className="flex flex-col items-start gap-3">
              <div className="text-[90px] font-bold">5.0</div>
              <div className="flex w-full flex-col">
                <div className="flex w-full justify-between ">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">6 ratings</span>
              </div>
            </div>
            <div className=" w-full flex flex-col justify-between ">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="mb-2 flex items-center gap-2">
                  <span className="w-4 text-sm">{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Progress
                    value={rating === 5 ? 100 : 0}
                    className="h-2 fill-yellow-400 -yellow-400"
                  />
                  <span className="w-4 text-sm ">
                    {rating === 5 ? "6" : "0"}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={handleBuyNow}>
              Write A Review
            </Button>
          </div>
        </div>

        <div className=" bg-newBackgroundColor border rounded p-5 my-5 flex items-center flex-col gap-5 ">
          <div className="flex flex-col gap-3 ">
            <div className=" flex justify-between items-center  ">
              <div className="flex justify-between h-[48px] items-center gap-3 ">
                <div>
                  <Image
                    src={"/image/AvtarImage60.png"}
                    width={100}
                    height={100}
                    alt=""
                    className=" rounded-full w-12 h-12  "
                  />
                </div>
                <div className=" capitalize flex flex-col items-start justify-center ">
                  narendra
                  <div className=" flex ">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 h-full">
                <LuThumbsUp className="  h-7 w-7" />
                <LuThumbsDown className="h-7 w-7" />
              </div>
            </div>
            <div className=" text-[18px] font-bold ">Title in here</div>
            <div className=" text-textSizeMobile ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
          </div>
          <Button variant="outline">Learn More</Button>
        </div>

        <div className=" flex flex-col items-start ">
          <h2 className="mb-4 text-2xl font-semibold text-subTextSizeDesktop ">
            Leave a comment
          </h2>
          <textarea
            name=""
            id=""
            placeholder="Enter your comment"
            className="w-full bg-transparent p-2 border rounded my-3 h-[116px] resize-none"
          ></textarea>
          <Button className="bg-[#ff782d] " size="lg">
            Post A Comment
          </Button>
        </div>
      </section>
    </>
  );
}

export default Reviews;
