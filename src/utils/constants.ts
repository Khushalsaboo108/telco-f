export const PERMISSIONS = ["create", "read", "update", "delete"];

export const AVAILABLE_MODULES = [
  { _id: "blogs", name: "Blogs" },
  { _id: "courses", name: "Courses" },
  { _id: "admin", name: "Admin" },
  { _id: "roles", name: "Role" },
  { _id: "users", name: "Users" },
  { _id: "analytics", name: "Analytics" },
  { _id: "payments", name: "Payments" },
  { _id: "contactQuery", name: "Contact Query" },
  { _id: "labs", name: "Labs" },
];

export const LOCAL_URL = "http://localhost:8000/api/v1/";
export const WS_LOCAL_URL = "http://localhost:8000";

export const URL = process.env.NEXT_PUBLIC_BE_URL ?? LOCAL_URL;
export const SOCKET_URL = process.env.NEXT_PUBLIC_BE_SOCKET_URL ?? WS_LOCAL_URL;

export const BASE_API_CONFIG = {
  baseURL: URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};
