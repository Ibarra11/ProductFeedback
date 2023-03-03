import clsx from "clsx";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        "max-w-3xl mx-auto p-6 pb-12",
        "md:pt-14 md:px-10 md:pb-20"
      )}
    >
      {children}
    </section>
  );
}
