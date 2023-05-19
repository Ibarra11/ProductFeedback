import clsx from "clsx";
import { BiCommentAdd } from "react-icons/bi";
function ReplyButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        `appearance-none  font-semibold text-lg `,
        "hover:underline",
        isOpen ? " text-brand-royal_blue" : " text-slate-500"
      )}
      onClick={onClick}
    >
      <BiCommentAdd />
      <span className=" sr-only"> Add Comment</span>
    </button>
  );
}

export default ReplyButton;
