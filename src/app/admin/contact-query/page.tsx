"use client";

import { getContactUs } from "@/app/actions/contact-us.action";
import ContactUsTable from "@/components/admin/contact-us/ContactUsTable";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ContactQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContactUs({ page, limit });
        setData(result);
      } catch (error) {
        console.error("Error:", error);
        toast.error("you have not permission to access this page");
        router.push("/admin");
      }
    };

    fetchData();
  }, [page, limit, router]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 p-3">
      <ContactUsTable
        contactData={data}
        initialPage={page}
        initialLimit={limit}
      />
    </div>
  );
}

export default ContactQuery;
