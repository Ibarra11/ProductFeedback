import { Category, Status } from "@prisma/client";

interface Props {
  postsPromise: Promise<
    {
      createdAt: string;
      post_id: number;
      title: string;
      content: string;
      category: Category;
      status: Status;
      user_fk_id: number;
      _count: {
        comments: number;
        upvotes: number;
      };
    }[]
  >;
}
async function PostsCount({ postsPromise }: Props) {
  const posts = await postsPromise;
  return <span className="text-lg font-bold">{posts.length} Posts</span>;
}

export default PostsCount;
