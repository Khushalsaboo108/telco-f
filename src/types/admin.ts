import { IPaginationRecords } from "./common";
import { IPermission, IRole } from "./role";

export interface IAdminLogin {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      _id: string;
      name: string;
      email: string;
      status: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  status: string;
  customPermissions: IPermission[];
  role: IRole;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface IAdminsResponse {
  success: boolean;
  message: string;
  data: IAdmin[];
  pagination: IPaginationRecords;
}

export interface IAdminResponse {
  success: boolean;
  message: string;
  data: IAdmin;
}

export interface ICreateAdmin {
  name: string;
  email: string;
  roleId: string;
  status?: string;
}
