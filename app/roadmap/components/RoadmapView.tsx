import React from "react";
import { Category, Status, Upvotes, User } from "@prisma/client";
import RoadmapLoading from "./RoadmapLoading";
import RoadmapPostList from "./RoadmapPostList";
import RoadmapTabs from "./RoadmapTabs";
interface Props {
  user: User & {
    Upvotes: Upvotes[];
  };
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
        upvotes: number;
        comments: number;
      };
    }[]
  >;
  status: Status;
}

function RoadmapView({ user, postsPromise, status }: Props) {
  return (
    <div className="h-full hidden md:block">
      <RoadmapTabs status={status}>
        <React.Suspense fallback={<RoadmapLoading />}>
          {/* @ts-expect-error Server Component */}
          <RoadmapPostList
            postsPromise={postsPromise}
            status={status}
            user={user}
          />
        </React.Suspense>
      </RoadmapTabs>
    </div>
  );
}

export default RoadmapView;
