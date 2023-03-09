import Comment from "./Comment";
import { CommentType } from "@/types";

function CommentList({ comments }: { comments: CommentType[] }) {
  return (
    <div className="bg-white shadow-sm px-8 pt-6 pb-10 max-h-[920px] h-full rounded-lg overflow-y-auto overflow-x-hidden">
      {comments.map((comment, index) => (
        <>
          <Comment key={comment.id + index} {...comment} />
          {index % 2 == 0 && index != comments.length - 1 && <Divder />}
        </>
      ))}
    </div>
  );
}

function Divder() {
  return <div className="h-px bg-brand-blue_gray opacity-25 my-8"></div>;
}

export default CommentList;
