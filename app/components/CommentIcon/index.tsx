import Image from "next/image";
import clsx from "clsx";
function CommentIcon({ comments }: { comments: number }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={18}
        height={16}
        src="/shared/icon-comments.svg"
        aria-hidden="true"
        alt=""
      />
      <p
        className={clsx(
          `${comments === 0 ? "opacity-50" : ""}`,
          "text-brand-blue_gray text-base font-semibold "
        )}
      >
        <span className="sr-only">Number of comments</span>
        {comments}
      </p>
    </div>
  );
}

export default CommentIcon;
