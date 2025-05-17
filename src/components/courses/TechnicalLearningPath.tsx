"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ICourseApiResponse } from "@/types/course";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CoursePagination from "./CoursePagination";

interface ICourseData {
  coursePosts: ICourseApiResponse | null;
  initialPage?: number;
  initialLimit?: number;
}
const TechnicalLearningPath: React.FC<ICourseData> = ({
  coursePosts = null,
  initialPage = 1,
  initialLimit = 2,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tableParams, setTableParams] = useState({
    page: initialPage,
    limit: initialLimit,
  });

  // Create a clean query string that preserves CourseCatalogue params
  const buildQueryString = useCallback(() => {
    // Get course catalogue params
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "4";
    const title = searchParams.get("title") || "";

    const params = new URLSearchParams();

    // Add TechnicalLearningPath params
    params.set("pg", tableParams.page.toString());
    params.set("lm", tableParams.limit.toString());

    // Add CourseCatalogue params
    params.set("page", page);
    params.set("limit", limit);
    if (title !== "") {
      params.set("title", title);
    }

    return params.toString();
  }, [searchParams, tableParams]);

  useEffect(() => {
    // Only update when our pagination parameters change
    if (
      parseInt(searchParams.get("pg") || "1") !== tableParams.page ||
      parseInt(searchParams.get("lm") || "2") !== tableParams.limit
    ) {
      router.push(`${pathname}?${buildQueryString()}`, { scroll: false });
    }
  }, [tableParams, router, pathname, searchParams, buildQueryString]);

  const handlePageChange = (page: number) => {
    setTableParams({ ...tableParams, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="max-w-desktop mx-auto p-commonPadding my-12">
      <h2 className="text-headingSizeMobile md:text-headingSizeDesktop text-center font-bold mb-8">
        {pathname === "/labs"
          ? "Our Most Popular Trainings"
          : "Technical Learning Path"}
      </h2>
      <div className="grid gap-6">
        {coursePosts?.data &&
          coursePosts?.data.slice(0, 2).map((item, index) => (
            <div
              key={item._id}
              className=" border rounded-[20px] flex-col lg:flex-row flex gap-4 animate-fadeInSlideUp"
            >
              <div className="relative rounded-lg overflow-hidden w-full lg:w-[410px] h-[250px]">
                <span className="absolute top-2 left-2 bg-card text-sm px-2 py-1 rounded">
                  Topic
                </span>
                <Image
                  fill
                  src={item.imageUrl || "/image/images.png"}
                  alt="Course thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h3 className="font-semibold text-textSizeMobile capitalize lg:text-textSizeDesktop mb-2">
                    {item.title}
                  </h3>
                  <div className="flex gap-4 text-base text-muted-foreground mb-4">
                    <span>{item.sectionCount} Section</span>
                    {/* <span>{item.activeStudent} Students</span> */}
                    {/* <span>{item.numberOfLessons} Lessons</span> */}
                    {/* <span>2 Weeks</span> */}
                    <span>{item.enrolledCount} Students</span>
                    <span>All Levels</span>
                    {/* <span>20 Lessons</span> */}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-primary font-semibold">
                    Rs.&nbsp; {item.price} &nbsp;
                  </div>
                  <Link
                    href={`${pathname}/${item._id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className=" flex justify-end ">
        {coursePosts && coursePosts.pagination && (
          <CoursePagination
            currentPage={coursePosts.pagination.currentPage}
            totalPages={coursePosts.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default TechnicalLearningPath;
