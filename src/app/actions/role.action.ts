import { apiAdminToken, apiClient } from "@/lib/axios-config";
import { IPaginations } from "@/types/common";
import { IRole, IRoleResponse, IRolesResponse } from "@/types/role";

const COURSE_URL = "admin";

export async function getAllRoles(): Promise<IRolesResponse | null> {
  //   parems: IPaginations
  try {
    // const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiAdminToken.get(`${COURSE_URL}/get-allroles`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch role");
  }
}

export async function getRoleById(id: string): Promise<IRoleResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.get(`${COURSE_URL}/get-role/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
}

export async function createRole(data: IRole): Promise<IRolesResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.post(
      `${COURSE_URL}/create-role`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to create a role");
  }
}

export async function updateRole(
  id: string,
  data: IRole
): Promise<IRolesResponse | null> {
  //   parems: IPaginations
  try {
    const response = await apiAdminToken.patch(
      `${COURSE_URL}/update-role/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blog:", error);
    throw new Error(error.response?.data?.message || "Failed to update role");
  }
}
