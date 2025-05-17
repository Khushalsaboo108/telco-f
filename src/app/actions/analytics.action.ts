import { apiClient } from "@/lib/axios-config";

const PURCHASES_URL = "purchases";

export async function fetchTransactions(courseId: string) {
  try {
    const response = await apiClient.get(`${PURCHASES_URL}/get-transactions`);
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch transactions:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
}
