"use client";

import { getRoleById } from "@/app/actions/role.action";
import RoleForm from "@/components/admin/role/RolePermission";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RolePage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const [response, setResponse] = useState<any>(null);
  const id = params?.roleId as string;

  useEffect(() => {
    const fetchData = async () => {
      if (id === "new") {
        return;
      }

      try {
        const result = await getRoleById(id);
        setResponse(result);
      } catch (error: any) {
        console.error("Error:", error);
        toast.error("you have not permission to access this page");
        router.push("/admin");
      }
    };

    fetchData();
  }, [id, router]);

  if (id === "new") {
    return <RoleForm createNew={true} />;
  }
  if (!response || !response.success) {
    return <div>Loading...</div>;
  }

  return <RoleForm initialData={response} id={id} />;
}
