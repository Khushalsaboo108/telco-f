"use client";

import type React from "react";
import { getOneContactUs } from "@/app/actions/contact-us.action";
import ContactUsForm from "@/components/admin/contact-us/Form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ContactQueryPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const contactId = params.contactQuery as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOneContactUs(contactId);
        setData(result);
      } catch (error) {
        console.error("Error:", error);
        toast.error("you have not permission to access this page");
        router.push("/admin");
      }
    };

    fetchData();
  }, [contactId, router]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-3 py-10">
      <h1 className="text-2xl font-bold mb-6">Reply on the query</h1>
      <ContactUsForm initialData={data} id={contactId} />
    </div>
  );
}
