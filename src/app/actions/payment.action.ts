import { apiClientToken } from "@/lib/axios-config";

const PAYMENT_URL = "payment";

export interface RazorPayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const createOrder = async (data: { courseIdsArr: string[] }) => {
  try {
    const response = await apiClientToken.post(`${PAYMENT_URL}/create`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create order::", error);
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

export const verifyPaymentOnServer = async (
  data: RazorPayResponse
): Promise<any> => {
  try {
    const response = await apiClientToken.post(
      `${PAYMENT_URL}/verify-payment`,
      {
        razorpay_order_id: data.razorpay_order_id,
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to verify payment::", error);
    throw new Error(
      error.response?.data?.message || "Failed to verify payment"
    );
  }
};
