"use client";
import React from "react";
import EmptyCommentsView from "./EmptyCommentsView";
import Comment from "./Comment";

function Comments({
  comments,
  variant,
}: {
  comments: Comment[];
  variant?: "modal";
}) {
  return (
    <div className="bg-white shadow-sm p-8 pb-10 h-full  border-2 border-green-500  overflow-auto rounded-lg">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <>
            <Comment variant={variant} key={comment.comment_id} {...comment} />
            {index != comments.length - 1 && <Divder />}
          </>
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
