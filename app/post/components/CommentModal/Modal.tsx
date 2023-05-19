"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Comment } from "@/app/lib/prisma";
import CommentContainer from "./CommentContainer";
import AddComment from "../AddComment";
import { getReplies } from "@/app/lib/mutations";
import CommentLoader from "./CommentLoader";
import CommentModalProvider from "./CommentModalProvider";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  comment: Comment;
  userId: number;
}

function CommentModal({ isOpen, closeModal, comment, userId }: Props) {
  const [replies, setReplies] = React.useState(comment.replies);
  const [currentComment, setCurrentComment] = React.useState(comment);

  async function addReply(content: string) {
    const res = await fetch("/api/comment", {
      method: "PUT",
      body: JSON.stringify({
        content: content,
        userId: userId,
        postId: currentComment.post_fk_id,
        commentId: currentComment.comment_id,
        replyingTo: currentComment.User.username,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setReplies(data.replies as any);
      return true;
    }
    return false;
  }

  function handleCommentChange(comment: Comment) {
    setCurrentComment(comment);
    setReplies(comment.replies);
  }

  const commentsPromise = getReplies(replies);

  return (
    <CommentModalProvider
      handleCommentChange={handleCommentChange}
      comment={currentComment}
    >
      <Dialog.Root open={isOpen} onOpenChange={closeModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed bg-black/75 inset-0" />
          <Dialog.Content
            className="fixed flex flex-col  w-3/4 bg-brand-alice_blue rounded-md top-1/2 
        left-1/2  -translate-x-1/2 -translate-y-1/2 h-5/6"
          >
            <CommentContainer comment={currentComment} />
            <div className="flex-1 h-full overflow-auto">
              <CommentLoader commentsPromise={commentsPromise} />
            </div>
            <AddComment
              postFkId={currentComment.comment_id}
              mutation={addReply}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CommentModalProvider>
  );
}

export default CommentModal;
