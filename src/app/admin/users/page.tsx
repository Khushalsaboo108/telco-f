"use client";

import { downloadUserTemplate, getAllUsers } from "@/app/actions/user.action";
import UsersTable from "@/components/admin/users/UsersTable";
import { HandleAdmins } from "@/components/global/CommonButton";
import ExcelUploadModal from "@/components/admin/users/ExcelUploadModal";
import { IUsersResponse } from "@/types/auth";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { CirclePlus, Download } from "lucide-react";
import { useAppSelector } from "@/hooks/use-redux";
import { progilePermission } from "@/store/features/profileSlice";
import { IPermission } from "@/types/role";

function Users() {
  const [userData, setUserData] = useState<IUsersResponse | null>(null);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const permissions = useAppSelector(progilePermission) as
    | IPermission[]
    | undefined;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers({ page, limit });
        setUserData(data);
      } catch (error: any) {
        console.error("Error:", error);
        toast.error("you have not permission to access this page");
        router.push("/admin");
      }
    };

    fetchUsers();
  }, [page, limit]);

  const permissionsMap: Record<string, { create: boolean }> = {};

  if (permissions && Array.isArray(permissions)) {
    permissions.forEach((permission) => {
      permissionsMap[permission.module] = {
        create: permission.actions.create,
      };
    });
  }

  // Get permissions for the current module
  const modulePermissions = permissionsMap["users"] || {
    create: false,
  };

  const downloadExcelTemplate = async () => {
    try {
      const blobData = await downloadUserTemplate();

      // Create a blob from the response data
      const blob = new Blob([blobData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_template.xlsx");

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      toast.success("Template downloaded successfully");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to download template");
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-end items-end gap-2">
        <Button
          className="text-white px-4 py-2 rounded-md"
          onClick={() => downloadExcelTemplate()}
        >
          <Download /> Download Excel Template
        </Button>
        {modulePermissions.create && (
          <Button
            onClick={() => setIsExcelModalOpen(true)}
            className="text-white px-4 py-2 rounded-md"
          >
            <CirclePlus /> Create Multiple Users
          </Button>
        )}
        <HandleAdmins
          text="Create New user"
          url="/admin/users/create-new"
          modal="users"
        />
      </div>
      <UsersTable userData={userData} initialPage={page} initialLimit={limit} />
      <ExcelUploadModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
      />
    </div>
  );
}

export default Users;
