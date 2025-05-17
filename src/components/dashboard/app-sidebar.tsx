"use client";

import type * as React from "react";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpenText,
  CircleUser,
  FileTerminal,
  LogOut,
  SquareTerminal,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutAuth } from "@/store/features/authSlice";

const data = {
  teams: [
    {
      name: "Telco Learn Logo",
      logo: "/logo/dashboardLogo.png",
      // plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      href: "/user",
      icon: SquareTerminal,
    },
    {
      title: "Courses",
      href: "/user/courses",
      icon: BookOpenText,
    },
    {
      title: "Profile",
      href: "/user/profile",
      icon: CircleUser,
    },
    {
      title: "Labs",
      href: "/user/labs",
      icon: FileTerminal,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await dispatch(logoutAuth());
      router.push("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <Sidebar
      className={`bg-userDashboardBackground w-userSidebarWidth `}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="mt-8">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="px-3 pb-4 mt-auto">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-md py-2 px-3 bg-[#fff1f1] text-[#c30000] hover:bg-[#ffe5e5] transition"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
