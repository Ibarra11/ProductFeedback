import clsx from "clsx";
function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={clsx(
        "border-2 max-w-5xl w-full mx-auto md:pt-10 md:pb-10   border-red-500"
      )}
    >
      {children}
    </section>
  );
}

export default RoadmapLayout;
