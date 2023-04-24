import clsx from "clsx";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={clsx("max-w-3xl h-full w-full mx-auto")}>
      {children}
    </section>
  );
}
