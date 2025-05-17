import { apiAdminToken, apiClient, apiClientToken } from "@/lib/axios-config";
import {
  IAdminLogin,
  IAdminResponse,
  IAdminsResponse,
  IAuthLoginResponse,
  ICreateAdmin,
} from "@/types/admin";
import { IRolesResponse } from "@/types/role";

const COURSE_URL = "admin";

export async function loginAdmin(
  data: IAdminLogin
): Promise<IAuthLoginResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiClient.post(`${COURSE_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to login");
  }
}

export async function getAllAdmins(): Promise<IAdminsResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.get(`${COURSE_URL}/get-alladmins`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
}

export async function createAdmin(
  data: ICreateAdmin
): Promise<IAdminsResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.post(
      `${COURSE_URL}/create-admin`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch admin:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create a Admin"
    );
  }
}

export async function getAdminById(id: string): Promise<IAdminResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.get(`${COURSE_URL}/get-admin/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function updateAdmin(
  id: string,
  data: ICreateAdmin
): Promise<IAdminResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.patch(
      `${COURSE_URL}/update-admin/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to update admin");
  }
}

export async function adminProfile(): Promise<IAdminResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.get(`${COURSE_URL}/admin-profile`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function updateAdminProfile(formData: {
  name: string;
}): Promise<IAdminResponse | null> {
  try {
    const response = await apiAdminToken.patch(
      `${COURSE_URL}/update-profile`,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  try {
    const response = await apiAdminToken.patch(
      `${COURSE_URL}/change-password`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
  }
}

export async function getAllRoles(): Promise<IRolesResponse | null> {
  //   parems: IPaginations
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiAdminToken.get(`${COURSE_URL}/get-admin-roles`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch role");
  }
}
