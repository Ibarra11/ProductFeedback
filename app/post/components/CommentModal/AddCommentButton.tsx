"use client";
import clsx from "clsx";
interface Props {
  onClick: () => void;
  disabled: boolean;
}
export default function AddCommentButton({
  onClick,
  children,
  disabled,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "grid place-content-center h-6 w-6  bg-brand-purple rounded-full",
        "hover:bg-purple-600 duration-200 transition-all",
        "outline-none focus:outline-2 focus:outline-purple-600"
      )}
    >
      {children}
    </button>
  );
}
