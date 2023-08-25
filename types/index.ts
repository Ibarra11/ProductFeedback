import { BRAND_COLORS } from "@/app/constants";
import { Category } from ".prisma/client";
import { getAllPost } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export type FeedbackCategories =
  | "Feature"
  | "UX"
  | "UI"
  | "Enhancement"
  | "Bug";

export type ButtonProps<T = {}> = React.ComponentProps<"button"> & T;

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

export interface FormData {
  title: string;
  category: Category;
  content: string;
}

export interface EditFormData extends FormData {
  status: FeedbackStatus;
}

type BrandColors = keyof (typeof BRAND_COLORS)["brand"];

export type RoadmapBorderColor = `border-t-brand-${BrandColors}`;

export type RoadmapCircleBg = `bg-brand-${BrandColors}`;

type ConvertDateToString<T extends Promise<Array<{ createdAt: Date }>>> =
  Awaited<T> extends Array<infer TData>
    ? Omit<TData, "createdAt"> & { createdAt: string }
    : never;

export type Post = ConvertDateToString<ReturnType<typeof getAllPost>>;

export type PostsPromise = Promise<Post[]>;

export type WithUserId<T> = T & { id: string };

export type User = RemoveUndefined<Awaited<ReturnType<typeof getCurrentUser>>>;

type RemoveUndefined<T> = T extends undefined ? never : T;
