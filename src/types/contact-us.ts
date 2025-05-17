import { IPaginationRecords } from "./common";

export interface IRequestContactUs {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  messageReply?: string;
  isReplied?: boolean;
}

export interface IContactUsResponces {
  message: string;
  status: string;
  data: IRequestContactUs[];
  pagination: IPaginationRecords;
}

export interface IContactUsResponce {
  message: string;
  status: string;
  data?: IRequestContactUs;
}
