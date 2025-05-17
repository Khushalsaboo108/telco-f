import React from "react";
import Sidebar from "../../components/admin/sidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminAccessToken = cookieStore.get("adminAccessToken");
  const adminRefreshToken = cookieStore.get("adminRefreshToken");

  if (!adminRefreshToken?.value && !adminAccessToken?.value) {
    redirect("/admin-login");
  }

  // If we reach here, we have valid tokens
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-40">
        <AdminNavbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full pt-[80px]">{children}</main>
    </div>
  );
}
