"use client";
import { getLabProgress } from "@/app/actions/lab.action";
import { IProgressStatus } from "@/types/common";
import { ILabApiResponse } from "@/types/lab";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";

interface ICourseData {
  labsPosts: ILabApiResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const LabCard: React.FC<ICourseData> = ({
  labsPosts = null,
  initialPage = 1,
  initialLimit = 10,
}) => {
  const router = useRouter();
  const [courseProgress, setCourseProgress] = useState<
    Record<string, IProgressStatus>
  >({});
  console.log("data", labsPosts);

  useEffect(() => {
    async function fetchAllProgressData() {
      if (!labsPosts?.data || labsPosts.data.length === 0) return;

      const progressPromises = labsPosts.data.map(async (labs) => {
        try {
          const response = await getLabProgress(labs._id);
          return { courseId: labs._id, progress: response };
        } catch (error) {
          console.error(`Error fetching progress for labs ${labs._id}:`, error);
          return { courseId: labs._id, progress: null };
        }
      });

      // Wait for all progress data to be fetched
      const results = await Promise.all(progressPromises);

      // Convert results array to a record object with labs IDs as keys
      const progressMap: Record<string, IProgressStatus> = {};
      results.forEach((result) => {
        if (result.progress) {
          progressMap[result.courseId] = result.progress;
        }
      });

      setCourseProgress(progressMap);
    }

    fetchAllProgressData();
  }, [labsPosts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {labsPosts?.data.map((item, index) => {
        const progress = courseProgress[item._id];

        return (
          <div
            key={index}
            className="border border-[#cfd3d6] rounded-lg p-4 bg-white"
          >
            <div className="flex gap-4">
              <div className=" w-48 relative rounded-md overflow-hidden">
                <Image
                  src={item.imageUrl || "/image/images.png"}
                  alt="Student reading"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 capitalize ">
                    {" "}
                    {item.title}{" "}
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-[#ff782d] mr-2"></span>
                    <span>Ends in 23 Days</span>
                  </div>

                  <div className="text-sm text-gray-600">points : 25 / 100</div>
                </div>

                {/* <button
                  onClick={() => route.push(`/user/labs/${item._id}`)}
                  className="bg-[#2563eb] text-white px-4 py-2 rounded-md mt-2 flex items-center justify-center w-28"
                >
                  Let's Go <ChevronRight className="h-4 w-4 ml-1" />
                </button> */}
                <div className="flex w-full justify-between items-center">
                  <button
                    onClick={() => router.push(`/user/labs/${item._id}`)}
                    className="bg-[#2563eb] text-white flex items-center gap-4 px-4 py-2 rounded-sm"
                  >
                    {progress?.completedCount ? "Continue Lab" : "Let's Go"}{" "}
                    <ChevronRight />
                  </button>
                  <div>
                    <ProgressBar progressStatus={progress?.percentage || 0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LabCard;
