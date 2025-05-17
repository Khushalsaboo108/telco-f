"use client";

import React, { useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "@/components/navbar/NavbarRoutes";
import { useAppDispatch } from "@/hooks/use-redux";
import { profileData } from "@/store/features/profileSlice";
import { useRouter } from "next/navigation";

function AdminNavbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      await dispatch(profileData());
      router.refresh();
    }
    getData();
  }, []);
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      {/* // ! remove this navbar routes after implementing sidebar and top bar */}
      <NavbarRoutes />
    </div>
  );
}

export default AdminNavbar;
