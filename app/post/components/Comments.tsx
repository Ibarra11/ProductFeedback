"use client";
import React from "react";
import EmptyCommentsView from "./EmptyCommentsView";
import Comment from "./Comment";
import { Comment as T_Comment } from "@/app/lib/prisma";

function Comments({
  comments,
  variant,
}: {
  comments: T_Comment[];
  variant?: "modal";
}) {
  return (
    <div className="bg-white shadow-sm p-8 pb-10 h-full  overflow-auto rounded-lg">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <React.Fragment key={comment.comment_id}>
            <Comment variant={variant} {...comment} />
            {index != comments.length - 1 && <Divder />}
          </React.Fragment>
        ))
      ) : (
        <EmptyCommentsView />
      )}
    </div>
  );
}

function Divder() {
  return <div className="h-px bg-brand-blue_gray opacity-25 my-8"></div>;
}

export default Comments;
