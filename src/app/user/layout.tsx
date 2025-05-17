import { IoSearch } from "react-icons/io5";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Greeting from "@/components/user/Greeting";
import { getHours, format } from "date-fns";
import DarkMode from "@/components/navbar/DarkMode";
import { IApiResponseUserProfile } from "@/types/auth";
import { userProfile } from "../actions/user.action";
import UserIcon from "@/components/navbar/UserIcon";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const currentDate = new Date();
const formattedDate = format(currentDate, "MMMM d, yyyy");
const dayOfWeek = format(currentDate, "EEEE");

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile: IApiResponseUserProfile | null = null;
  const cookieStore = await cookies();
  const userAccessToken = cookieStore.get("userAccessToken");
  const userRefreshToken = cookieStore.get("userRefreshToken");

  if (!userAccessToken && !userRefreshToken) {
    redirect("/signin");
  }

  try {
    profile = await userProfile();
  } catch (error) {
    profile = null;
    console.error("Failed to fetch user profile:", error);
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex border-b-2 sticky z-[999] py-2 px-5 top-0  shrink-0 items-center bg-userDashboardBackground gap-2 justify-between transition-[width,height] ease-linear ">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="" />
              <DarkMode />
            </div>

            <div className=" w-full px-6 flex justify-between items-center gap-9  ">
              <div className=" flex items-center columns-2 gap-4 ">
                <UserIcon username={profile?.data?.name || "User"} size="md" />
                <div className="flex-col flex">
                  <Greeting />
                  <h2 className=" font-bold text-[19px] capitalize ">
                    {profile?.data?.name}
                  </h2>
                </div>
              </div>

              <div className=" flex justify-center border bg-white rounded-2xl p-3 gap-4 w-[55%] ">
                <IoSearch className="h-5 w-5 text-gray-400 mr-2" />

                <input
                  type="text"
                  placeholder="Search courses"
                  className="bg-transparent outline-none w-full text-gray-600 placeholder-gray-400"
                />
              </div>

              <div className=" flex items-end flex-col columns-2 gap-1 ">
                <h3 className="text-[18px] font-semibold ">
                  {" "}
                  {formattedDate}{" "}
                </h3>
                <h3 className="text-[18px] font-semibold "> {dayOfWeek} </h3>
              </div>
            </div>
          </header>
          <div className=" p-5 py-0 overflow-hidden bg-userBodyBackground ">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
