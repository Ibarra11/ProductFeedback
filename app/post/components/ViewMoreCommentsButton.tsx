"use client";
import clsx from "clsx";
import { BiCommentDetail } from "react-icons/bi";
function ViewMoreCommentsButton({
  isOpen,
  disabled,
  onClick,
  size,
}: {
  isOpen: boolean;
  disabled: boolean;
  onClick: () => void;
  size: number;
}) {
  return (
    <button
      className={clsx(
        `appearance-none text-brand-royal_blue`,
        "hover:underline",
        isOpen ? " text-brand-royal_blue" : " text-slate-500"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <BiCommentDetail size={size} />
      <span className="sr-only">Open Comments</span>
    </button>
  );
}

export default ViewMoreCommentsButton;
