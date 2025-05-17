import { apiAdminToken, apiClient } from "@/lib/axios-config";
import { IPaginations } from "@/types/common";
import {
  IContactUsResponce,
  IContactUsResponces,
  IRequestContactUs,
} from "@/types/contact-us";

const CONTACT_US_URL = "/contact-us";

export async function submitContactUs(
  request: IRequestContactUs
): Promise<IContactUsResponce | null> {
  try {
    const response = await apiAdminToken.post(`${CONTACT_US_URL}`, request);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function getContactUs(
  parems: IPaginations
): Promise<IContactUsResponces | null> {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiAdminToken.get(
      `${CONTACT_US_URL}?${queryParams}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function getOneContactUs(
  id: string
): Promise<IContactUsResponce | null> {
  try {
    const response = await apiAdminToken.get(`${CONTACT_US_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function updateContactUs(messageReply: string, id: string) {
  try {
    const response = await apiAdminToken.patch(`${CONTACT_US_URL}/${id}`, {
      messageReply: messageReply,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}

export async function deleteContactUs(id: string) {
  try {
    const response = await apiAdminToken.delete(`${CONTACT_US_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a blog");
  }
}
