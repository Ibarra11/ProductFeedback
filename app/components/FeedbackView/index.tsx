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
    <>{posts.length > 0 ? <ProductRequestList /> : <EmptySuggestionsView />}</>
  );
}

export default FeedbackView;
