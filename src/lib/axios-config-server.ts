"use server";

import { BASE_API_CONFIG } from "@/utils/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("userAccessToken");
  cookieStore.delete("userRefreshToken");
  redirect("/");
}

export async function serverAdminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("adminAccessToken");
  cookieStore.delete("adminRefreshToken");
  redirect("/admin/login"); // Adjust this as needed
}

export const createServerApiClient = async (isAdmin = false) => {
  const cookieStore = await cookies();

  let token, userRefreshToken;

  if (isAdmin) {
    token = cookieStore.get("adminAccessToken");
    userRefreshToken = cookieStore.get("adminRefreshToken");
  } else {
    token = cookieStore.get("userAccessToken");
    userRefreshToken = cookieStore.get("userRefreshToken");
  }

  // Use the common configuration and add auth headers if tokens exist
  const apiClient = axios.create({
    ...BASE_API_CONFIG,
    headers: {
      ...BASE_API_CONFIG.headers,
      ...(token && { Authorization: `Bearer ${token.value}` }),
    },
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Handle logout based on which type of client this is
        if (isAdmin) {
          await serverAdminLogout();
        } else {
          await serverLogout();
        }
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};
