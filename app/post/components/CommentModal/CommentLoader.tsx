"use client";
import React from "react";
import { GetReplies } from "@/app/lib/mutations";
import Comments from "../Comments";
import LoadingCircle from "@/app/components/LoadingCircle";
import { Comment } from "@/app/lib/prisma";
import { IoMdAdd } from "react-icons/io";
import AddCommentModal from "./AddCommentModal";
import AddCommentButton from "./AddCommentButton";
import { Comment as T_Comment } from "@/app/lib/prisma";

interface Props {
  commentsPromise: ReturnType<GetReplies>;
  updateComment: (newReplies: Comment["replies"]) => void;
  userId: number;
  comment: T_Comment;
}
function ModalComments({
  commentsPromise,
  updateComment,
  userId,
  comment,
}: Props) {
  const { comments } = React.use(commentsPromise);
  const [isOpen, setIsOpen] = React.useState(false);

  function closeComment() {
    setIsOpen(false);
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-1 overflow-auto">
        <Comments variant="modal" comments={comments} />
      </div>

      {!isOpen && (
        <div className="grid place-content-center py-2 border-t-2 border-t-slate-200">
          <AddCommentButton disabled={false} onClick={() => setIsOpen(!isOpen)}>
            <IoMdAdd className=" text-brand-ghost_white" size={24} />
            <span className="sr-only">Add Comment</span>
          </AddCommentButton>
        </div>
      )}
      {isOpen && (
        <AddCommentModal
          closeComment={closeComment}
          comment={comment}
          updateComment={updateComment}
          userId={userId}
        />
      )}
    </div>
  );
}

function CommentLoader({
  commentsPromise,
  updateComment,
  userId,
  comment,
}: Props) {
  return (
    <React.Suspense fallback={<CommentFallback />}>
      <ModalComments
        // I add a key because when the addComment is set to open and we set a new comment.  I want to reset the addComment back to false
        key={comment.comment_id}
        updateComment={updateComment}
        userId={userId}
        commentsPromise={commentsPromise}
        comment={comment}
      />
    </React.Suspense>
  );
}

function CommentFallback() {
  return (
    <div className="relative h-full border-2">
      <LoadingCircle size="lg" color="secondary" />
    </div>
  );
}

export default CommentLoader;
