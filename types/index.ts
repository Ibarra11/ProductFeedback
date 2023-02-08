import { ButtonHTMLAttributes } from "react";

export type ButtonBase<T extends { [key: string]: any }> =
  ButtonHTMLAttributes<HTMLButtonElement> & T;

export type FeedbackCategories =
  | "All"
  | "Feature"
  | "UX"
  | "UI"
  | "Enhancement"
  | "Bug";

export type SortByTypes =
  | "Most Comments"
  | "Least Comments"
  | "Most Upvotes"
  | "Least Upvotes";

type RoadmapOptions = "Live" | "In-Progress" | "Planned";

export type RoadmapOption = { type: RoadmapOptions; count: number };

export type Comment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};
export interface Post {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  comments?: Comment[];
  category: FeedbackCategories;
}
