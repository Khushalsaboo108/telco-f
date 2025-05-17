import { logoutAdmin } from "@/store/features/adminSlice";
import { logoutAuth } from "@/store/features/authSlice";
import { store } from "@/store/store";
import { BASE_API_CONFIG } from "@/utils/constants";
import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "react-cookies";

export const apiClient = axios.create({
  ...BASE_API_CONFIG,
});

export const apiClientToken = axios.create({
  ...BASE_API_CONFIG,
});

// Add a request interceptor with the correct type
apiClientToken.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const userAccessToken = Cookies.load("userAccessToken");
    const userRefreshToken = Cookies.load("userRefreshToken");

    if (userAccessToken) {
      config.headers.Authorization = `Bearer ${userAccessToken}`;
    } else if (userRefreshToken) {
      config.headers.Authorization = `Bearer ${userRefreshToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor to handle token expiration
apiClientToken.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const apiAdminToken = axios.create({
  ...BASE_API_CONFIG,
});

// Add a request interceptor with the correct type
apiAdminToken.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const adminAccessToken = Cookies.load("adminAccessToken");
    const adminRefreshToken = Cookies.load("adminRefreshToken");

    if (adminAccessToken) {
      config.headers.Authorization = `Bearer ${adminAccessToken}`;
    } else if (adminRefreshToken) {
      config.headers.Authorization = `Bearer ${adminRefreshToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiAdminToken.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// export default apiClient;
