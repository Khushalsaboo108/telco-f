import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: any;
    plan?: string;
  }[];
}) {
  const [activeTeam, _] = React.useState(teams[0]);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-center w-full  rounded-lg overflow-hidden ">
          <Link href="/">
            <img
              src={isCollapsed ? "/logo/logoSmaill.png" : activeTeam.logo}
              alt="Team Logo"
              className="w-full  object-cover"
            />
          </Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
