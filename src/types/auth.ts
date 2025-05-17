import { IPaginationRecords } from "./common";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRegistered {
  name: string;
  email: string;
  phone: string | number;
  password: string;
}

export interface IApiResponseUserProfile {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
    _id: string;
    name: string;
    email: string;
    discription?: string;
    phone: string | number;
  };
}

export interface IUpdate {
  name: string;
  discription: string;
  imageUrl: string;
}

export interface IUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
  pagination: IPaginationRecords;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser;
  pagination: IPaginationRecords;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string | number;
  isDeleted?: boolean;
}
