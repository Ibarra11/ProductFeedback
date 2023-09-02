import clsx from "clsx";

export default async function PostLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <section className={clsx("max-w-3xl min-h-screen w-full mx-auto p-6")}>
      {children}
    </section>
  );
}
