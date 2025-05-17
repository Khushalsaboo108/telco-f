"use client";

import React, { useEffect, useState } from "react";
import BlogTable from "@/components/admin/blog/BlogTable";
import { getAllBlog } from "@/app/actions/blog.action";
import { HandleAdmins } from "@/components/global/CommonButton";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Blog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blogData, setBlogData] = useState<any>(null);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlog({ page, limit });
        setBlogData(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("you have not permission to access this page");
        router.push("/admin");
      }
    };

    fetchData();
  }, [page, limit, router]);

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex justify-end items-end">
        <HandleAdmins
          text="Add Blog"
          url="/admin/blog/createBlog"
          modal="blogs"
        />
      </div>
      <BlogTable blogData={blogData} initialPage={page} initialLimit={limit} />
    </div>
  );
}
