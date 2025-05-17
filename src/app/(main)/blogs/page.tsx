import { getAllBlog } from "@/app/actions/blog.action";
import BlogPosts from "@/components/blogpost/BlogPosts";
import OurClients from "@/components/blogpost/OurClients";
interface PageProps {
  searchParams: Promise<{ page: string; limit: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const queryParams = {
    page: (resolvedSearchParams?.page as string) || "1",
    limit: (resolvedSearchParams?.limit as string) || "10",
  };

  const page = parseInt(queryParams.page);
  const limit = parseInt(queryParams.limit);

  const fetchParams = {
    page,
    limit,
  };

  let data;
  try {
    data = await getAllBlog(fetchParams);
  } catch (error: any) {
    data = null;
    console.error("Error:", error);
  }
  return (
    <div className=" max-w-desktop pb-commonPadding mx-auto  ">
      <BlogPosts blogPosts={data} initialPage={page} initialLimit={limit} />
      <OurClients />
    </div>
  );
}
