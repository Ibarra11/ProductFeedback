"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Comment } from "@/app/lib/prisma";
import CommentContainer from "./CommentContainer";
import AddComment from "../AddComment";
import { getReplies } from "@/app/lib/mutations";
import CommentLoader from "./CommentLoader";
import CommentModalProvider from "./CommentModalProvider";
import ModalControls from "./ModalControls";

interface Props {
  closeModal: () => void;
  comment: Comment;
  userId: number;
}

function CommentModal({ closeModal, comment, userId }: Props) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [comments, setComments] = React.useState<Comment[]>([comment]);
  const [commentIndex, setCommentIndex] = React.useState(0);

  async function addReply(content: string) {
    const res = await fetch("/api/comment", {
      method: "PUT",
      body: JSON.stringify({
        content: content,
        userId: userId,
        postId: comments[commentIndex].post_fk_id,
        commentId: comments[commentIndex].comment_id,
        replyingTo: comments[commentIndex].User.username,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      const updatedComment = { ...comments[commentIndex] };
      updatedComment.replies = data.replies;
      setComments([...comments.slice(0, commentIndex), updatedComment]);
      return true;
    }
    return false;
  }

  function handleCommentChange(comment: Comment) {
    setComments([...comments, comment]);
    setCommentIndex(comments.length);
  }

  function handleNavigation(direction: "previous" | "forward") {
    if (direction === "previous") {
      setCommentIndex(commentIndex - 1);
    } else {
      setCommentIndex(commentIndex + 1);
    }
  }

  const currentComment = comments[commentIndex];
  const commentsPromise = getReplies(currentComment.replies);

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
            <ModalControls
              closeModal={closeModal}
              handleNavigation={handleNavigation}
              disabled={{
                previous: commentIndex === 0,
                forward: commentIndex === comments.length - 1,
              }}
            />
            <CommentContainer comment={comments[commentIndex]} />
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
