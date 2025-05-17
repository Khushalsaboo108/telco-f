import { IPaginationRecords } from "./common";

export interface ILab {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished?: boolean;
  adminId?: string;
  categoryId?: string;
  labSections?: ILabSection[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILabSection {
  _id: string;
  title: string;
  description?: string;
  order: number;
  isPublished: boolean;
  labId: string;
  labChapters: ILabChapter[];
}

export interface ILabAttachment {
  name: string;
  url: string;
  // ! add courseId field if there is some bug creating bug corresponding to the attachment
}
export interface ILabChapter {
  title: string;
  description?: string;
  videoUrl: string;
  order: number;
  isPublished: boolean;
  isFree: boolean;
  courseId?: string;
  labSectionId?: string;
  attachments?: ILabAttachment[];
  completeChapter: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  content?: string;
}

export interface ISingleLabsApiResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface ILabData {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  userId?: string;
  categoryId?: string;
  chapters?: any;
  labSections?: ILabSection[];
  enrolledCount: number;
  sectionCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILabApiResponse {
  success: boolean;
  message: string;
  data: ILabData[];
  pagination: IPaginationRecords;
}

export interface ISection {
  _id: string;
  title: string;
  isPublished: boolean;
  order: number;
  courseId: string;
  labChapters?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}
