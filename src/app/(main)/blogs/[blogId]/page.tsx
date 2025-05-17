import { getBlogId } from "@/app/actions/blog.action";
import { IApiSingleBlogData } from "@/types/blog";
import React from "react";

interface PageProps {
  params: Promise<{ blogId: string }>;
}

async function SingleBlog({ params }: PageProps) {
  const blogId = (await params).blogId;

  let blogSingleData: IApiSingleBlogData | null;

  try {
    blogSingleData = await getBlogId(blogId);
  } catch (error) {
    blogSingleData = null;
  }

  console.log("data", blogSingleData);
  return (
    <>
      <div className=" mx-auto max-w-desktop  ">
        <h1> {blogSingleData?.data.blogTitle} </h1>
        <div
          className="prose dark:prose-invert prose-headings:font-title m-3 font-default focus:outline-none max-w-full [&>p]:my-[10px] [&>ul]:pl-5 [&>ol]:pl-5 [&>li]:my-[10px]"
          dangerouslySetInnerHTML={{
            __html: blogSingleData?.data.blogContent || "",
          }}
        />
      </div>
    </>
  );
}

export default SingleBlog;
