import { apiClient, apiClientToken } from "@/lib/axios-config";
import { createServerApiClient } from "@/lib/axios-config-server";
import {
  IApiResponseUserProfile,
  ILogin,
  IRegistered,
  IUpdate,
  IUser,
  IUsersResponse,
} from "@/types/auth";
import { IPaginations } from "@/types/common";

const USER_URL = "auth";

export async function login(values: ILogin) {
  console.log("values", values);
  try {
    const response = await apiClient.post(`${USER_URL}/login`, values);
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Invalid email or password");
      }
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}

export async function signup(values: IRegistered) {
  console.log("values", values);
  try {
    const response = await apiClient.post(`${USER_URL}/signup`, values);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Invalid email or password");
      }
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}

export async function userProfile() {
  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`${USER_URL}/profile`);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error);
  }
}

export async function updateProfile(values: IUpdate) {
  try {
    const response = await apiClientToken.patch(
      `${USER_URL}/update-user`,
      values
    );
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
  }
}

export async function getAllUsers(parems: IPaginations) {
  try {
    const queryParams = new URLSearchParams(parems as any).toString();
    const response = await apiClient.get(
      `${USER_URL}/get-users?${queryParams}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
  }
}

export async function getUserById(id: string) {
  try {
    const response = await apiClient.get(`${USER_URL}/get-users/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
  }
}

export async function softDeleteUser(request: {
  id: string;
  isDeleted: boolean;
}) {
  try {
    const response = await apiClient.patch(
      `${USER_URL}/delete-user/${request.id}`,
      { isDeleted: request.isDeleted }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
  }
}

export async function createNewUser(data: IUser) {
  try {
    const response = await apiClient.post(`${USER_URL}/create-user`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
  }
}

export async function bulkUserRegistration(formData: FormData) {
  try {
    const response = await apiClient.post(
      `${USER_URL}/bulk-register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in bulk registration:", error);
    throw error; // Re-throw to handle in component
  }
}

export async function downloadUserTemplate() {
  try {
    const response = await apiClient.get(`${USER_URL}/download-template`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error:", error);
    throw error;
  }
}
