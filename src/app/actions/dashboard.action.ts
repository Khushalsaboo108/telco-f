import { apiClient } from "@/lib/axios-config";

let DASHBOARD_URL = "dashboard";

export async function getCountsForDashboard() {
  try {
    const response = await apiClient.get(`${DASHBOARD_URL}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}
