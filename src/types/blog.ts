import { IPaginationRecords } from "./common";

export interface IBlog {
  _id?: string;
  blogTitle: string;
  blogContent: string;
  isPublished: boolean;
  blogImageUrl?: string;
}

export interface IApiBlogResponse {
  success: boolean;
  message: string;
  data: IBlog[];
  pagination: IPaginationRecords;
}

export interface IApiSingleBlogData {
  success: boolean;
  message: string;
  data: IBlog;
}
