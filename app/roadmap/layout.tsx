import clsx from "clsx";
function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={clsx(
        "max-w-5xl w-full mx-auto pb-16",
        "md:pt-14 md:px-10 md:pb-20"
      )}
    >
      {children}
    </section>
  );
}

export default RoadmapLayout;
