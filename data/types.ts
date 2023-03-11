import { Category, Status } from "@prisma/client";

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Post {
  user_id: number;
  title: string;
  category: Category;
  upvotes: number;
  status: Status;
  content: string;
}
