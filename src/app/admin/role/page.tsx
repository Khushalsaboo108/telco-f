"use client";

import { getAllRoles } from "@/app/actions/role.action";
import RoleTable from "@/components/admin/role/RoleTable";
import { HandleAdmins } from "@/components/global/CommonButton";
import { IRolesResponse } from "@/types/role";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Role() {
  const [data, setData] = useState<IRolesResponse | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllRoles();
        setData(result);
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
        <HandleAdmins text="Add Role" url="/admin/role/new" modal="roles" />
      </div>
      <RoleTable blogData={data} />
    </div>
  );
}

export default Role;
