import { IPaginationRecords } from "./common";

export interface IRolesResponse {
  success: boolean;
  message: string;
  data: IRole[];
  pagination: IPaginationRecords;
}

export interface IRoleResponse {
  success: boolean;
  message: string;
  data: IRole;
}

export interface IRole {
  _id?: string;
  name: string;
  description: string;
  permissions: IPermission[];
  createdBy?: ICreatedBy;
  createdAt?: string; // or Date if you're converting it
  updatedAt?: string;
}

export interface IPermission {
  _id?: string;
  module: string;
  actions: IAction;
}

export interface IAction {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface ICreatedBy {
  _id: string;
  name: string;
  email: string;
}
