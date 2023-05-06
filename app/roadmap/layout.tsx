import clsx from "clsx";
function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={clsx(" h-full max-w-5xl w-full mx-auto")}>
      {children}
    </section>
  );
}

export default RoadmapLayout;
