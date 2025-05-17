"use client";

import { getAllAdmins } from "@/app/actions/admin.action";
import AdminTable from "@/components/admin/admin/AdminTable";
import { HandleAdmins } from "@/components/global/CommonButton";
import { IAdminsResponse } from "@/types/admin";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Admin() {
  const [data, setData] = useState<IAdminsResponse | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await getAllAdmins();
        setData(adminData);
      } catch (error: any) {
        console.error("Error:", error);
        setData(null);
        toast.error("you have not permission to access this page");
        router.push("/admin");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex justify-end items-end">
        <HandleAdmins text="Add Admin" url="/admin/admin/new" modal="admin" />
      </div>
      <AdminTable blogData={data} />
    </div>
  );
}

export default Admin;
