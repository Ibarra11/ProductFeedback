import clsx from "clsx";
function EditFeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className={clsx("max-w-xl w-full mx-auto px-6 pt-9 pb-14")}>
      {children}
    </article>
  );
}

export default EditFeedbackLayout;
