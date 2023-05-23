"use client";
import React from "react";
import { GetReplies } from "@/app/lib/mutations";
import Comments from "../Comments";
import LoadingCircle from "@/app/components/LoadingCircle";

interface Props {
  commentsPromise: ReturnType<GetReplies>;
}
function ModalComments({ commentsPromise }: Props) {
  const { comments } = React.use(commentsPromise);
  return <Comments variant="modal" comments={comments} />;
}

function CommentLoader({ commentsPromise }: Props) {
  return (
    <React.Suspense fallback={<CommentFallback />}>
      <ModalComments commentsPromise={commentsPromise} />
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
