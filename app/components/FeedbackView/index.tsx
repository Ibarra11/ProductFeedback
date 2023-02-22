"use client";
import { Post } from "@/types";
import React from "react";
import clsx from "clsx";
import data from "../../../data.json";
import EmptySuggestionsView from "../EmptySuggestionsView";
import ProductRequestList from "../ProductRequestList";

function FeedbackView() {
  const [posts, setPosts] = React.useState<Post[]>(
    data.productRequests as any as Post[]
  );

  return (
    <div className={
      clsx(
        " flex-1 px-6 pb-14 border-2 border-red-700",
        "lg:h-full  "
      )
    }>
      <div className="h-full w-full">
        {posts.length > 0 ? <ProductRequestList /> : <EmptySuggestionsView />}
      </div>
    </div>
  );
}

export default FeedbackView;
