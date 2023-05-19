import { Comment as Comment_Type } from "@/app/lib/prisma";
import Comment from "../Comment";
function CommentContainer({ comment }: { comment: Comment_Type }) {
  return (
    <div className="p-6">
      <Comment {...comment} variant="modal" />
    </div>
  );
}

export default CommentContainer;
