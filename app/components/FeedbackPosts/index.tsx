import clsx from "clsx";
import { prisma } from "@/db";
import FeedbackPosts from "./FeedbackPosts";

async function FeedbackPostsContainer() {
  const posts = await prisma.post.findMany();
  return (
    <div className={clsx("flex-1 px-6", "md:h-full md:px-0")}>
      <div className="h-full w-full">
        <FeedbackPosts posts={posts} />
      </div>
    </div>
  );
}

export default FeedbackPostsContainer;
