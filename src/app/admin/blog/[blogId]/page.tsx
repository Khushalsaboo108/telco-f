"use client";

import type React from "react";
import BlogForm from "@/components/admin/blog/BlogForm";
import { getBlogId } from "@/app/actions/blog.action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BlogIdPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const blogId = params?.blogId as string;
  const isNewBlog = blogId === "createBlog";

  useEffect(() => {
    const fetchBlog = async () => {
      if (!isNewBlog) {
        try {
          const blogData = await getBlogId(blogId);
          setBlog(blogData);
        } catch (error) {
          console.error("Error:", error);
          toast.error("you have not permission to access this page");
          router.push("/admin");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, isNewBlog, router]);

  if (isLoading) {
    return <div>Loading...</div>; // You might want to replace this with a proper loading component
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {isNewBlog ? "Add New Blog" : `Edit Blog:`}
      </h1>
      <BlogForm initialData={blog} isEditing={!isNewBlog} />
    </div>
  );
}
