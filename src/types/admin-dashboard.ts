export interface IDashboardData {
  success: boolean;
  message: string;
  data: {
    user: number;
    admin: number;
    course: number;
    blog: number;
    role: number;
    contactQuery: number;
  };
}
