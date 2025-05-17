import {
  IApiResponse,
  ICourse,
  ICourseApiResponse,
  ISectionResponse,
  ISingleCourseApiResponse,
} from "@/types/course";
import { apiClient, apiClientToken } from "@/lib/axios-config";
import { IPaginations } from "@/types/common";
import { createServerApiClient } from "@/lib/axios-config-server";

const LAB_URL = "labs";

export async function createLab(values: any) {
  try {
    const response = await apiClient.post(`${LAB_URL}/create-lab`, values);
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to create lab:", error);
    throw new Error(error.response?.data?.message || "Failed to create a lab");
  }
}

export async function getAllLabs() {
  try {
    const response = await apiClient.get(`${LAB_URL}/all-labs`);
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch course:", error);
    throw new Error(error.response?.data?.message || "Failed to get a courses");
  }
}

export async function getLabById(labId: string): Promise<ICourse | null> {
  try {
    const response: IApiResponse = await apiClient.get(
      `${LAB_URL}/get-lab/${labId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch lab:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch a lab");
  }
}

export async function updateLab(
  labId: string,
  values: any
): Promise<ICourse | null> {
  try {
    const response: IApiResponse = await apiClient.patch(
      `${LAB_URL}/get-lab/${labId}`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the lab"
    );
  }
}

export async function deleteLab(labId: string): Promise<ICourse | null> {
  try {
    const response: IApiResponse = await apiClient.delete(
      `${LAB_URL}/get-lab/${labId}`
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the lab"
    );
  }
}

export async function getAllLabCategories() {
  try {
    const response = await apiClient.get(`${LAB_URL}/lab-categories`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}

// chapter
export async function uploadLabAttachments(labChapterId: string, values: any) {
  try {
    const response = await apiClient.post(
      `${LAB_URL}/current-lab/${labChapterId}/attachment`,
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

// export async function deleteAttachment(courseId: string, attachmentId: string) {
//   try {
//     const response = await apiClient.delete(
//       `course/current-course/${courseId}/attachment/${attachmentId}`
//     );
//     return response.data.data;
//   } catch (error: any) {
//     console.error("Failed to delete attachment:", error);
//     throw new Error(
//       error.response?.data?.message || "Failed to delete attachment"
//     );
//   }
// }

// sections
export async function uploadLabSection(labId: string, values: any) {
  try {
    const response = await apiClient.post(
      `${LAB_URL}/current-lab/${labId}/section`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to upload a lab section", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload a lab section"
    );
  }
}

export async function reOrderLabSection(labId: string, values: any) {
  try {
    await apiClient.put(
      `${LAB_URL}/current-lab/${labId}/section/reorder`,
      values
    );
  } catch (error: any) {
    console.error("Failed to reorder lab sections:", error);
    throw new Error(
      error.response?.data?.message || "Failed to reorder lab sections"
    );
  }
}

export async function uploadLabChapter(labSectionId: string, values: any) {
  try {
    const response = await apiClient.post(
      `${LAB_URL}/current-lab/${labSectionId}/chapter`,
      values
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to create a lab chapter::", error);
    throw new Error(
      error.response?.data?.message || "Failed to create a lab chapter"
    );
  }
}

export async function getLabChapterById(
  labSectionId: string,
  labChapterId: string
) {
  try {
    const response = await apiClient.get(
      `${LAB_URL}/current-lab/${labSectionId}/chapter/${labChapterId}`
    );
    console.log("response::", response.data.data);

    return response.data.data;
  } catch (error: any) {
    console.error("Failed to reorder chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete attachment"
    );
  }
}

export async function updateLabChapter(
  labSectionId: string,
  labChapterId: string,
  values: any
) {
  console.log("labSectionId::", labSectionId);
  console.log("labChapterId::", labChapterId);

  try {
    const response = await apiClient.patch(
      `${LAB_URL}/current-lab/${labSectionId}/chapter/${labChapterId}`,
      values
    );
    // http://localhost:8000/api/v1${LAB_URL}/current-course/${courseId}/chapter/${chapterId}
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to update chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update chapter"
    );
  }
}

export async function deleteLabChapter(
  labSectionId: string,
  labChapterId: string
) {
  try {
    const response = await apiClient.delete(
      `${LAB_URL}/current-lab/${labSectionId}/chapter/${labChapterId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to delete chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete chapter"
    );
  }
}

export async function getLabSectionById(labId: string, labSectionId: string) {
  try {
    const response = await apiClient.get(
      `${LAB_URL}/current-lab/${labId}/section/${labSectionId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch lab section:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch lab section"
    );
  }
}

export async function updateLabSection(
  labId: string,
  labSectionId: string,
  values: any
) {
  try {
    const response = await apiClient.patch(
      `${LAB_URL}/current-lab/${labId}/section/${labSectionId}`,
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

export async function deleteLabSection(labId: string, labSectionId: string) {
  try {
    const response = await apiClient.delete(
      `${LAB_URL}/current-lab/${labId}/section/${labSectionId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to delete lab section:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete lab section"
    );
  }
}

export async function reOrderLabChapter(labSectionId: string, values: any) {
  try {
    await apiClient.put(
      `${LAB_URL}/current-lab/${labSectionId}/chapter/reorder`,
      values
    );
  } catch (error: any) {
    console.error("Failed to reorder lab chapter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to reorder lab chapter"
    );
  }
}

// saboo work

export async function getPublishedLabs(
  parems: IPaginations
): Promise<ICourseApiResponse | null> {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClient.get(
      `${LAB_URL}/publisher-lab?${queryParams}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPublishedLabsById(
  id: string
): Promise<ISingleCourseApiResponse | null> {
  try {
    const response = await apiClient.get(`${LAB_URL}/publisher/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPublisherPurchaseLabs() {
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`${LAB_URL}/user-publisher-lab`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPublisherPurchaseLabsById(id: string) {
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`${LAB_URL}/user-publisher-lab/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getPopularPublishedLabs(parems: {
  pg: number;
  lm: number;
}): Promise<ICourseApiResponse | null> {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClient.get(
      `${LAB_URL}/popular-publisher-lab?${queryParams}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function getLabsPurchased(id: string) {
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClientToken.get(
      `${LAB_URL}/user-labs-purchased/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch course:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create a course"
    );
  }
}

export async function updateLabChapterStatus(body: {
  chapterId: string;
  labId: string;
}) {
  try {
    const response = await apiClientToken.patch(
      `${LAB_URL}/lab-chapter-status`,
      body
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}

export async function getLabProgress(labId: string) {
  try {
    const response = await apiClientToken.patch(`${LAB_URL}/lab-progress`, {
      labId: labId,
    });
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
      `${LAB_URL}/get-course-user/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}

export async function labChapterContent(id: string, content: string) {
  try {
    const response = await apiClient.patch(
      `${LAB_URL}/lab-chapter-content/${id}`,
      {
        content: content,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the course"
    );
  }
}
