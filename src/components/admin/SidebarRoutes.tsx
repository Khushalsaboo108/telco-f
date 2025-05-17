"use client";
import {
  Compass,
  Layout,
  LayoutPanelTop,
  UserCheck,
  Users,
  Settings,
  LucideIcon,
  Headset,
  UserPen,
  FlaskConical,
} from "lucide-react";
import React, { useMemo } from "react";
import SidebarItem from "./SidebarItem";
import { useAppSelector } from "@/hooks/use-redux";
import { progilePermission } from "@/store/features/profileSlice";
import { IAction, IPermission } from "@/types/role";

interface RouteItem {
  icon: LucideIcon;
  label: string;
  href: string;
  module: string | null;
}

// Define a type for the permissions map
interface PermissionsMap {
  [key: string]: IAction;
}

const allRoutes: RouteItem[] = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/admin",
    module: null, // Always visible
  },
  {
    icon: Users,
    label: "Admin",
    href: "/admin/admin",
    module: "admin",
  },
  {
    icon: UserCheck,
    label: "Role",
    href: "/admin/role",
    module: "roles",
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/admin/courses",
    module: "courses",
  },
  {
    icon: FlaskConical,
    label: "Labs",
    href: "/admin/labs",
    module: "labs",
  },
  {
    icon: UserPen,
    label: "Users",
    href: "/admin/users",
    module: "users",
  },
  {
    icon: LayoutPanelTop,
    label: "Blog",
    href: "/admin/blog",
    module: "blogs",
  },
  // {
  //   icon: Compass,
  //   label: "Browse",
  //   href: "/admin/search",
  //   module: null, // Always visible
  // },
  {
    icon: Headset,
    label: "Contact Query",
    href: "/admin/contact-query",
    module: "contactQuery",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    module: null,
  },
];

function SidebarRoutes() {
  const permissions = useAppSelector(progilePermission) as
    | IPermission[]
    | undefined;

  const permissionsMap = useMemo<PermissionsMap>(() => {
    if (!permissions || !Array.isArray(permissions))
      return {} as PermissionsMap;

    return permissions.reduce<PermissionsMap>((map, permission) => {
      map[permission.module] = permission.actions;
      return map;
    }, {} as PermissionsMap);
  }, [permissions]);

  const authorizedRoutes = useMemo(() => {
    if (!permissions || !Array.isArray(permissions)) {
      return allRoutes.filter((route) => route.module === null);
    }

    return allRoutes.filter((route) => {
      if (route.module === null) return true;

      return permissionsMap[route.module]?.read === true;
    });
  }, [permissions, permissionsMap]);

  return (
    <div className="flex flex-col w-full">
      {authorizedRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

export default SidebarRoutes;
