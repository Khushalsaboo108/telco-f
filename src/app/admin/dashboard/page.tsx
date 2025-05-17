import { getCountsForDashboard } from "@/app/actions/dashboard.action";
import { IDashboardData } from "@/types/admin-dashboard";
import {
  Compass,
  Headset,
  LayoutPanelTop,
  UserCheck,
  UserPen,
  Users,
} from "lucide-react";
import React from "react";

async function DashboardPage() {
  let dashboardData: IDashboardData | null = null;
  try {
    dashboardData = await getCountsForDashboard();
  } catch (error) {
    dashboardData = null;
    console.error("Failed to fetch data:", error);
  }

  const CoundData = [
    {
      title: "Users",
      count: dashboardData?.data.user,
      icon: UserPen,
    },
    {
      title: "Admins",
      count: dashboardData?.data.admin,
      icon: Users,
    },
    {
      title: "Courses",
      count: dashboardData?.data.course,
      icon: Compass,
    },
    {
      title: "Blogs",
      count: dashboardData?.data.blog,
      icon: LayoutPanelTop,
    },
    {
      title: "Roles",
      count: dashboardData?.data.role,
      icon: UserCheck,
    },
    {
      title: "Contact Queries",
      count: dashboardData?.data.contactQuery,
      icon: Headset,
    },
  ];

  return (
    <div className=" p-2 ">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {CoundData.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex p-3 justify-between items-center rounded-lg gap-3 shadow-md "
            >
              <div>
                <h3 className=" font-black text-[25px] "> {item.title} </h3>
                <p>{item.count}</p>
              </div>
              <div className=" bg-blue-500 text-white p-2 rounded-lg w-10 h-10 flex justify-center items-center">
                {item.icon && <item.icon size={20} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardPage;
