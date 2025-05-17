"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { IApiBlogResponse } from "@/types/blog";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedCommonButton } from "../global/CommonButton";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  comments: number;
  imageUrl: string;
}

// const blogPosts: BlogPost[] = Array(6).fill({
//     id: 1,
//     title:
//         "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat",
//     date: "21 April 2024",
//     comments: 6,
//     imageUrl: "/image/blogPost.png",
// });

interface IBlogData {
  blogPosts: IApiBlogResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const BlogPosts: React.FC<IBlogData> = ({
  blogPosts = null,
  initialPage = 1,
  initialLimit = 10,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [tableParams, setTableParams] = useState({
    page: initialPage,
    limit: initialLimit,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", tableParams.page.toString());
    searchParams.set("limit", tableParams.limit.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [tableParams, router, pathname]);

  const handleView = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <section className="w-full py-12 bg-background">
      <div className="container max-w-desktop mx-auto px-4">
        <div className=" flex justify-center items-center flex-col gap-5  ">
          <div className=" font-bold text-center text-headingSizeMobile lg:text-headingSizeDesktop ">
            Blog Post
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 lg:grid-cols-3 gap-6">
          {blogPosts &&
            blogPosts?.data.map(
              (post, index) =>
                post.isPublished && (
                  <div
                    key={index}
                    className="bg-newBackgroundColor rounded-lg p-7 "
                  >
                    <article
                      key={index}
                      className=" overflow-hidden animate-fadeInSlideUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative h-[200px]">
                        <Image
                          fill
                          src={post.blogImageUrl || "/image/blogPost.png"}
                          alt={post.blogTitle}
                          className="object-cover"
                        />
                      </div>
                      <div className="py-6 flex flex-col justify-start items-start ">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <span className="text-subHeadingOrange flex items-center gap-3">
                              {" "}
                              <FaCalendarAlt /> 21 April 2024
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <FaRegComments />
                            <span>Comment (06)</span>
                          </div>
                        </div>
                        <h3 className="font-semibold capitalize text-lg mb-4 line-clamp-2">
                          {post.blogTitle.length > 59
                            ? `${post.blogTitle.slice(0, 59)}...`
                            : post.blogTitle}
                        </h3>
                        <AnimatedCommonButton
                          text={" Read More "}
                          className="mt-0"
                          onSubmit={() => handleView(post._id || "")}
                        />
                      </div>
                    </article>
                  </div>
                )
            )}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
