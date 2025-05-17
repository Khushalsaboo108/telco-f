"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { ImTrophy } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProgressBar from "../ProgressBar";
import { useRouter } from "next/navigation";
import { ICourseApiResponse } from "@/types/course";
import { getCourseProgress } from "@/app/actions/course.action";
import { IProgressStatus } from "@/types/common";

interface ICourseData {
  coursePosts: ICourseApiResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const CourseDetail: React.FC<ICourseData> = ({
  coursePosts = null,
  initialPage = 1,
  initialLimit = 10,
}) => {
  const router = useRouter();

  const [courseProgress, setCourseProgress] = useState<
    Record<string, IProgressStatus>
  >({});

  useEffect(() => {
    async function fetchAllProgressData() {
      if (!coursePosts?.data || coursePosts.data.length === 0) return;

      const progressPromises = coursePosts.data.map(async (course) => {
        try {
          const response = await getCourseProgress(course._id);
          return { courseId: course._id, progress: response };
        } catch (error) {
          console.error(
            `Error fetching progress for course ${course._id}:`,
            error
          );
          return { courseId: course._id, progress: null };
        }
      });

      // Wait for all progress data to be fetched
      const results = await Promise.all(progressPromises);

      // Convert results array to a record object with course IDs as keys
      const progressMap: Record<string, IProgressStatus> = {};
      results.forEach((result) => {
        if (result.progress) {
          progressMap[result.courseId] = result.progress;
        }
      });

      setCourseProgress(progressMap);
    }

    fetchAllProgressData();
  }, [coursePosts]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center">
        {coursePosts?.data.map((course, index) => {
          // Get progress for this specific course
          const progress = courseProgress[course._id];

          return (
            <div
              key={index}
              className="border p-4 bg-userDashboardBackground rounded-[8px] flex justify-center items-start flex-col gap-3"
            >
              <div className="relative w-full h-[200px]">
                <Image
                  fill
                  src={course.imageUrl || "/image/images.png"}
                  alt="Course thumbnail"
                  className="object-cover rounded-[8px]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex justify-between items-start mt-3 flex-col gap-3 ">
                <h4 className="text-commonHeader text-[16px] capitalize font-semibold ">
                  {course.title}
                </h4>
                <div className="flex justify-between gap-5 items-center">
                  <p className="text-[14px] flex justify-start items-center gap-2 ">
                    <FaBookBookmark className="text-subHeadingOrange" />{" "}
                    Section:
                    {course.sections?.length || 0}
                  </p>
                  <p className="text-[14px] flex justify-start items-center gap-2 ">
                    <ImTrophy className="text-subHeadingOrange text-[18px]" />{" "}
                    Advanced
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-between items-center">
                <button
                  onClick={() => router.push(`courses/${course._id}`)}
                  className="bg-[#2563eb] text-white flex items-center gap-4 px-4 py-2 rounded-sm"
                >
                  {progress?.completedCount
                    ? "Continue Course"
                    : "Start Course"}{" "}
                  <MdOutlineKeyboardArrowRight />
                </button>
                <div>
                  <ProgressBar progressStatus={progress?.percentage || 0} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CourseDetail;
