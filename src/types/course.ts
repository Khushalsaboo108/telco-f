import { IUser } from "./auth";
import { IPaginationRecords } from "./common";

export interface IAttachment {
  _id?: string;
  name: string;
  url: string;
  // ! add courseId field if there is some bug creating bug corresponding to the attachment
}

export interface IChapter {
  _id?: string;
  title: string;
  description?: string;
  videoUrl: string;
  order: number;
  isPublished: boolean;
  isFree: boolean;
  courseId?: string;
  attachments?: IAttachment[];
  createdAt?: Date;
  updatedAt?: Date;
  updateChapterStatus?: boolean;
}

export interface ICourse {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  userId?: string;
  categoryId?: string;
  chapters?: IChapter[];
  sections?: ISection[];
  enrolledCount: number;
  sectionCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IApiResponse {
  data: {
    data: ICourse;
  };
}

export interface ICategory {
  _id: string;
  name: string;
}
export interface ICourseApiResponse {
  success: boolean;
  message: string;
  data: ICourse[];
  pagination: IPaginationRecords;
}

export interface ISingleCourseApiResponse {
  success: boolean;
  message: string;
  data: ICourse;
}

export interface ISection {
  _id: string;
  title: string;
  isPublished: boolean;
  order: number;
  courseId: string;
  chapters?: Chapter[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Chapter {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  order: number;
  isPublished: boolean;
  isFree: boolean;
  courseId?: string;
  sectionId?: string;
  attachments?: IAttachment[];
  completeChapter?: boolean;
}

export interface ISectionResponse {
  success: boolean;
  message: string;
  data: ISection[];
}

export interface IShortSection {
  isPublished: boolean;
  title: string;
  _id: string;
  chapter: {
    isFree: boolean;
    isPublished: boolean;
    title: string;
    _id: string;
  }[];
}

export interface IShortChapter {
  _id?: string;
  title?: string;
  isPublished?: boolean;
  description?: string;
  isFree?: boolean;
  videoUrl?: string;
}

export interface IPurchaseCourseDetail {
  success: boolean;
  message: string;
  data: IPurchaseDetail[] | [];
  pagination: IPaginationRecords;
}

export interface IPurchaseDetail {
  _id: string;
  user: IUser | null;
  course: ICourse | null;
}
