"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Comment } from "@/lib/prisma";
import CommentContainer from "./CommentContainer";
import { IoMdAdd } from "react-icons/io";
import AddCommentModal from "./AddCommentModal";
import { getReplies } from "@/lib/mutations";
import CommentLoader from "./CommentLoader";
import CommentModalProvider from "./CommentModalProvider";
import ModalControls from "./ModalControls";
import clsx from "clsx";
import { Session } from "next-auth";
import { useUserContext } from "@/app/components/UserProvider";

interface Props {
  closeModal: () => void;
  comment: Comment;
}

function CommentModal({ closeModal, comment }: Props) {
  const user = useUserContext();
  const [isOpen, setIsOpen] = React.useState(true);
  const [comments, setComments] = React.useState<Comment[]>([comment]);
  const [commentIndex, setCommentIndex] = React.useState(0);

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

  function updateComment(newReplies: Comment["replies"]) {
    setComments([
      ...comments.slice(0, commentIndex),
      { ...currentComment, replies: newReplies },
      ...comments.slice(commentIndex + 1),
    ]);
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
            <CommentContainer comment={currentComment} />
            <div className="flex-1 h-full overflow-auto">
              <CommentLoader
                comment={currentComment}
                updateComment={updateComment}
                user={user}
                commentsPromise={commentsPromise}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CommentModalProvider>
  );
}

export default CommentModal;
