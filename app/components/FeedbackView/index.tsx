"use client";
import { Post } from "@/types";
import React from "react";
import data from "../../../data.json";
import EmptySuggestionsView from "../EmptySuggestionsView";
import ProductRequestList from "../ProductRequestList";

function FeedbackView() {
  const [posts, setPosts] = React.useState<Post[]>(
    data.productRequests as any as Post[]
  );

  return (
    <div className="relative h-full  flex-1 overflow-y-auto">
      <div className="h-full w-full">
        {posts.length > 0 ? <ProductRequestList /> : <EmptySuggestionsView />}
      </div>
    </div>
  );
}

export default FeedbackView;
