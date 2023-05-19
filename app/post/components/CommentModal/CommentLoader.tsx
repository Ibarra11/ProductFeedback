"use client";
import React from "react";
import { GetReplies } from "@/app/lib/mutations";
import Comments from "../Comments";
interface Props {
  commentsPromise: ReturnType<GetReplies>;
}
function ModalComments({ commentsPromise }: Props) {
  const comments = React.use(commentsPromise);
  return <Comments variant="modal" comments={comments} />;
}

function CommentLoader({ commentsPromise }: Props) {
  return (
    <React.Suspense fallback={<h1>Loading</h1>}>
      <ModalComments commentsPromise={commentsPromise} />
    </React.Suspense>
  );
}

export default CommentLoader;
