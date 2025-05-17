import { LucideIcon } from "lucide-react";

interface IFieldOption {
  label: string;
  value: string | boolean;
}

// Define the possible field types
type FieldType = "input" | "password" | "select" | "radio" | "textarea";

// Define the field interface
interface IField {
  name: string;
  label: string;
  type: FieldType;
  value?: string;
  disable?: boolean;
  options?: IFieldOption[];
}

export interface IFormRule {
  required?: boolean;
  message?: string;
  type?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
}
export interface IFormField {
  type:
    | "input"
    | "select"
    | "radio"
    | "textarea"
    | "date"
    | "number"
    | "password"
    | "email"
    | "textEditor";
  name: string;
  label: string;
  placeholder?: string;
  rules?: IFormRule[];
  options?: IFieldOption[];
  value?: any;
  inputType?: string;
  disable?: boolean;
  details?: Array<{ title: string; key: string }>;
  className?: string;
  onChange?: any;
  initialEditorContent?: any;
}

export interface IPaginationRecords {
  currentLimit: number;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
}

export interface IPaginations {
  page: number;
  limit: number;
  query?: any;
  title?: string;
  price?: string;
  level?: string;
}

export interface IRouteItem {
  icon: LucideIcon;
  label: string;
  href: string;
  module: string | null;
}

export interface ICartDetails {
  _id: string;
  title: string;
  isPublished: boolean;
  price: number;
  imageUrl: string;
  type: string;
}

export interface IProgressStatus {
  completedChapters: string[];
  completedCount: number;
  totalChapters: number;
  percentage: number;
}
