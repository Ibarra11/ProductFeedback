import { ButtonHTMLAttributes } from "react";
import { BRAND_COLORS } from "@/app/constants";
import { Category } from ".prisma/client";
export type ButtonBase<T extends { [key: string]: any }> =
  ButtonHTMLAttributes<HTMLButtonElement> & T;

export type FeedbackCategories =
  | "Feature"
  | "UX"
  | "UI"
  | "Enhancement"
  | "Bug";

export type FilterCategories = FeedbackCategories;

export type SortByTypes =
  | "Date Posted"
  | "Most Comments"
  | "Least Comments"
  | "Most Upvotes"
  | "Least Upvotes";

export type FeedbackStatus = "live" | "in-progress" | "planned" | "suggestion";

export type RoadmapOption = {
  status: FeedbackStatus;
  count: number;
  color: RoadmapCircleBg;
};

export type CommentReply = {
  id: number;
  replyingTo: string;
  content: string;
  user: CommentType["user"];
  level: number;
  replies?: CommentReply[];
};

export type CommentType = {
  id: number;
  content: string;
  replyingTo?: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  level?: number;
  replies?: CommentType[];
};
export interface Post {
  status: FeedbackStatus;
  id: number;
  title: string;
  description: string;
  upvotes: number;
  comments?: CommentType[];
  category: FeedbackCategories;
}

export interface FormData {
  title: string;
  category: Category;
  content: string;
}

export interface EditFormData extends FormData {
  status: FeedbackStatus;
}

type BrandColors = keyof typeof BRAND_COLORS["brand"];

export type RoadmapBorderColor = `border-t-brand-${BrandColors}`;

export type RoadmapCircleBg = `bg-brand-${BrandColors}`;
