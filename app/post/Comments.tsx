import EmptyCommentsView from "./EmptyCommentsView";
import Comment from "./Comment";

function Comments({ comments }: { comments: Comment[] }) {
  return (
    <div className="bg-white shadow-sm px-8 pt-6 pb-10 max-h-[920px]  rounded-lg overflow-y-auto overflow-x-hidden">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <>
            <Comment key={comment.comment_id} {...comment} />
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
