import React from "react";
import EmptyCommentsView from "./EmptyCommentsView";
import Comment from "./Comment";
import { Comment as T_Comment } from "@/lib/prisma";

interface Props {
  comments: T_Comment[];
  variant?: "modal";
}

function Comments({ comments, variant }: Props) {
  return (
    <div className="bg-white flex-1 shadow-sm p-8 pb-10 h-full   overflow-auto rounded-lg">
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
