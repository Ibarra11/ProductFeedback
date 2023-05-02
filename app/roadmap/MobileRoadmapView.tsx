import React from "react";
import { Category, Status, Upvotes, User } from "@prisma/client";
import PostsProvider from "../components/PostsProvider";
import RoadmapPostList from "./RoadmapPostList";
import SortAndFilterButton from "./SortAndFilterButton";
import SortAndFilterModal from "./SortAndFIlterModal";
import RoadmapLoading from "./RoadmapLoading";
import RoadmapControls from "./RoadmapControls";

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
function MobileRoadmapView({ user, postsPromise, status }: Props) {
  return (
    <div className="relative pt-4 pb-6 px-4 h-full md:hidden">
      <PostsProvider>
        <RoadmapControls status={status} />

        <React.Suspense fallback={<RoadmapLoading />}>
          <RoadmapPostList
            status={status}
            user={user}
            postsPromise={postsPromise}
          />
        </React.Suspense>
      </PostsProvider>
    </div>
  );
}

export default MobileRoadmapView;