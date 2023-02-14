import { ButtonHTMLAttributes } from "react";

export type ButtonBase<T extends { [key: string]: any }> =
  ButtonHTMLAttributes<HTMLButtonElement> & T;

export type FeedbackCategories =
  | "Feature"
  | "UX"
  | "UI"
  | "Enhancement"
  | "Bug";

export type FilterCategories = FeedbackCategories | "All";

export type SortByTypes =
  | "Most Comments"
  | "Least Comments"
  | "Most Upvotes"
  | "Least Upvotes";

export type FeedbackStatus = "live" | "in-progress" | "planned" | "suggestion";

export type RoadmapOption = {
  type: FeedbackStatus;
  count: number;
  color: string;
};

export type CommentType = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
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
  category: FeedbackCategories;
  detail: string;
}

export interface EditFormData extends FormData {
  status: FeedbackStatus;
}
