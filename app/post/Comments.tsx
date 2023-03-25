import Comment from "./Comment";

function Comments({
  comments,
}: {
  comments: {
    comment_id: number;
    username: string;
    name: string;
    image: string;
    replyingTo: string;
    content: string;
  }[];
}) {
  return (
    <div className="bg-white shadow-sm px-8 pt-6 pb-10 max-h-[920px] h-full rounded-lg overflow-y-auto overflow-x-hidden">
      {comments.map((comment, index) => (
        <>
          <Comment key={comment.comment_id} {...comment} />
          {index != comments.length - 1 && <Divder />}
        </>
      ))}
    </div>
  );
}

function Divder() {
  return <div className="h-px bg-brand-blue_gray opacity-25 my-8"></div>;
}

export default Comments;
