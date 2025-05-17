"use client";

import { navlinks } from "@/utils/links/nav-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex gap-16 ">
      {navlinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            className={`
              text-base 
              transition-colors
              ${
                isActive
                  ? "bg-gradient-to-r from-[#00A8E8] to-[#00D084] bg-clip-text text-transparent font-semibold"
                  : "text-black dark:text-white font-normal hover:bg-gradient-to-r hover:from-[#00A8E8] hover:to-[#00D084] hover:bg-clip-text hover:text-transparent dark:hover:text-transparent"
              }
            `}
            key={link.href}
            href={link.href}
          >
            <span className=" text-[23px] ">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default NavLinks;
