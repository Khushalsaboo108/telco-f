"use client";

import { getAdminById, getAllRoles } from "@/app/actions/admin.action";
import AdminForm from "@/components/admin/admin/AdminForm";
import { IAdminResponse } from "@/types/admin";
import { IRolesResponse } from "@/types/role";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const params = useParams();
  const id = params.adminId as string;
  const router = useRouter();

  const [roleData, setRoleData] = useState<IRolesResponse | null>(null);
  const [adminData, setAdminData] = useState<IAdminResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch roles data
        const roles = await getAllRoles();
        setRoleData(roles);

        // If not creating new admin, fetch admin data
        if (id !== "new") {
          const admin = await getAdminById(id);
          setAdminData(admin);
        }
      } catch (error: any) {
        console.error("Error:", error);
        toast.error(error.message);
        router.push("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; // You might want to replace this with a proper loading component
  }

  if (id === "new") {
    return <AdminForm createNew={true} role={roleData} />;
  }

  return <AdminForm initialData={adminData} id={id} role={roleData} />;
}
