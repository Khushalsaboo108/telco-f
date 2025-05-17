import {
  IApiResponse,
  ICourse,
  ICourseApiResponse,
  ISectionResponse,
  ISingleCourseApiResponse,
} from "@/types/course";
import { apiAdminToken, apiClient, apiClientToken } from "@/lib/axios-config";
import { IPaginations } from "@/types/common";
import { createServerApiClient } from "@/lib/axios-config-server";

const COURSE_URL = "course";

export async function fetchCourse(courseId: string): Promise<ICourse | null> {
  try {
    const response: IApiResponse = await apiAdminToken.get(
      `${COURSE_URL}/get-course/${courseId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch course:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch a course"
    );
  }
}

export async function createCourse(values: any) {
  try {
    const response = await apiAdminToken.post(
      `${COURSE_URL}/create-course`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to create course:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create a course"
    );
  }
}
export async function updateCourse(
  courseId: string,
  values: any
): Promise<ICourse | null> {
  try {
    const response: IApiResponse = await apiAdminToken.patch(
      `${COURSE_URL}/get-course/${courseId}`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}

export async function deleteCourse(courseId: string): Promise<ICourse | null> {
  try {
    const response: IApiResponse = await apiAdminToken.delete(
      `${COURSE_URL}/get-course/${courseId}`
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the course"
    );
  }
}

export async function getCategories() {
  try {
    const response = await apiClient.get(`${COURSE_URL}/categories`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}

// chapter
export async function uploadAttachments(chapterId: string, values: any) {
  try {
    const response = await apiClient.post(
      `${COURSE_URL}/current-course/${chapterId}/attachment`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to upload attachment:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload a attachment"
    );
  }
}

export async function deleteAttachment(courseId: string, attachmentId: string) {
  try {
    const response = await apiClient.delete(
      `course/current-course/${courseId}/attachment/${attachmentId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to delete attachment:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete attachment"
    );
  }
}

export async function uploadChapter(sectionId: string, values: any) {
  try {
    const response = await apiClient.post(
      `course/current-course/${sectionId}/chapter`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to create a chapter::", error);
    throw new Error(
      error.response?.data?.message || "Failed to create a chapter"
    );
  }
}

export async function reOrderChapter(sectionId: string, values: any) {
  try {
    await apiClient.put(
      `course/current-course/${sectionId}/chapter/reorder`,
      values
    );
  } catch (error: any) {
    console.error("Failed to reorder chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to reorder chapter"
    );
  }
}

export async function getChapterById(sectionId: string, chapterId: string) {
  try {
    const response = await apiClient.get(
      `course/current-course/${sectionId}/chapter/${chapterId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to reorder chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete attachment"
    );
  }
}
export async function updateChapter(
  sectionId: string,
  chapterId: string,
  values: any
) {
  try {
    const response = await apiClient.patch(
      `course/current-course/${sectionId}/chapter/${chapterId}`,
      values
    );
    // http://localhost:8000/api/v1${COURSE_URL}/current-course/${courseId}/chapter/${chapterId}
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to update chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update chapter"
    );
  }
}

export async function deleteChapter(sectionId: string, chapterId: string) {
  try {
    const response = await apiClient.delete(
      `course/current-course/${sectionId}/chapter/${chapterId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to delete chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete chapter"
    );
  }
}

export async function getPublishedCourses(
  parems: IPaginations
): Promise<ICourseApiResponse | null> {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClient.get(
      `${COURSE_URL}/publisher?${queryParams}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPublishedCourseById(
  id: string
): Promise<ISingleCourseApiResponse | null> {
  try {
    const response = await apiClient.get(`${COURSE_URL}/publisher/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getAllCourses() {
  try {
    const response = await apiAdminToken.get(`${COURSE_URL}/all-courses`);
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch course:", error);
    throw new Error(error.response?.data?.message || "Failed to get a courses");
  }
}

// sections
export async function uploadSection(courseId: string, values: any) {
  try {
    const response = await apiClient.post(
      `course/current-course/${courseId}/section`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to upload a section", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload a section"
    );
  }
}

export async function reOrderSection(courseId: string, values: any) {
  try {
    await apiClient.put(
      `course/current-course/${courseId}/section/reorder`,
      values
    );
  } catch (error: any) {
    console.error("Failed to reorder sections:", error);
    throw new Error(
      error.response?.data?.message || "Failed to reorder sections"
    );
  }
}

export async function getSectionById(courseId: string, sectionId: string) {
  try {
    const response = await apiClient.get(
      `course/current-course/${courseId}/section/${sectionId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch section:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch section");
  }
}

export async function updateSection(
  courseId: string,
  sectionId: string,
  values: any
) {
  try {
    const response = await apiClient.patch(
      `course/current-course/${courseId}/section/${sectionId}`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to reorder chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete attachment"
    );
  }
}

export async function deleteSection(courseId: string, sectionId: string) {
  try {
    const response = await apiClient.delete(
      `course/current-course/${courseId}/section/${sectionId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to delete section:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete section"
    );
  }
}

export async function getPublisherPurchaseCourse(): Promise<ICourseApiResponse | null> {
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`${COURSE_URL}/user-publisher`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPublisherPurchaseCourseById(
  id: string
): Promise<ISectionResponse | null> {
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`${COURSE_URL}/user-publisher/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPopularPublishedCourse(parems: {
  pg: number;
  lm: number;
}): Promise<ICourseApiResponse | null> {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClient.get(
      `${COURSE_URL}/popular-publisher?${queryParams}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getCoursePurchased(id: string) {
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClientToken.get(
      `${COURSE_URL}/user-course-purchased/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch course:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create a course"
    );
  }
}

export async function updateChapterStatus(body: {
  chapterId: string;
  courseId: string;
}) {
  try {
    const response = await apiClientToken.patch(
      `${COURSE_URL}/chapter-completed`,
      body
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}

export async function getCourseProgress(courseId: string) {
  try {
    const response = await apiClientToken.patch(
      `${COURSE_URL}/course-progress`,
      {
        courseId: courseId,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}

export async function getNumberOfUsersPurchasedCourse(id: string) {
  try {
    const response = await apiClientToken.get(
      `${COURSE_URL}/get-course-user/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}
