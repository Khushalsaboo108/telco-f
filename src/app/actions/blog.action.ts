import { apiAdminToken, apiClient } from "@/lib/axios-config";
import { IApiBlogResponse, IApiSingleBlogData, IBlog } from "@/types/blog";
import { IPaginations } from "@/types/common";

const COURSE_URL = "blog";

export async function getAllBlog(
  parems: IPaginations
): Promise<IApiBlogResponse | null> {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClient.get(`${COURSE_URL}?${queryParams}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function getBlogId(
  id: string
): Promise<IApiSingleBlogData | null> {
  try {
    const queryParams = new URLSearchParams(id as any).toString();
    const response = await apiClient.get(`${COURSE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function createBlog(
  request: IBlog
): Promise<IApiBlogResponse | null> {
  try {
    const response = await apiAdminToken.post(`${COURSE_URL}`, request);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function updateBlog(
  blogId: string,
  request: any
): Promise<IApiBlogResponse | null> {
  try {
    const response = await apiAdminToken.patch(
      `${COURSE_URL}/${blogId}`,
      request
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the blog"
    );
  }
}

export async function deleteBlog(
  blogId: string
): Promise<IApiBlogResponse | null> {
  try {
    const response = await apiAdminToken.delete(`${COURSE_URL}/${blogId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the course"
    );
  }
}
