import clsx from "clsx";
import { getAllPost } from "@/app/lib/prisma/post";
import FeedbackPosts from "./FeedbackPosts";

async function FeedbackPostsContainer() {
  const posts = await getAllPost();
  return (
    <div className={clsx("flex-1 px-6", "md:h-full md:px-0")}>
      <div className="h-full w-full">
        <FeedbackPosts posts={posts} />
      </div>
    </div>
  );
}

export default FeedbackPostsContainer;
