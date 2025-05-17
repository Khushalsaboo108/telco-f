"use client"

import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    href: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      href: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useSidebar() // Get the sidebar state
  const isCollapsed = state === "collapsed"

  const isActive = (item: { href: string }) => {
    if (pathname === "/" && item.href === "/") {
      return true
    }

    if (pathname === item.href) {
      return true
    }

    if (pathname.startsWith(`${item.href}/`)) {
      const remainingPath = pathname.slice(item.href.length + 1)
      const nextSegment = remainingPath.split("/")[0]
      return !nextSegment
    }

    return false
  }

  return (
    <SidebarGroup>
      <SidebarMenu className={`flex flex-col gap-4 ${isCollapsed ? "w-14 px-0" : "px-2 w-full"}`}>
        {items.map((item) => {
          const isActiveItem = isActive(item)

          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  tooltip={isCollapsed ? item.title : undefined}
                  className={`flex items-center ${isCollapsed ? "justify-center" : ""} gap-3 py-5 w-full rounded px-3 hover:text-black  ${isActiveItem
                    ? "bg-[#e9effd] text-[#2563eb] font-medium border-r-4 border-[#2563eb] hover:bg-[#e9effd] hover:text-[#2563eb]"
                    : "text-[#404040] hover:bg-gray-100"
                    }`}
                >
                  {item.icon && (
                    <span className="flex-shrink-0">
                      <item.icon className="h-5 w-5" />
                    </span>
                  )}
                  {!isCollapsed && <span>{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

