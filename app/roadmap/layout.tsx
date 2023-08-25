import clsx from "clsx";
import Header from "@/components/Header";
function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={clsx(
        " h-full flex flex-col max-w-5xl w-full mx-auto space-y-6 md:space-y-8 lg:space-y-12"
      )}
    >
      <Header />
      <main className="flex-1">{children}</main>
    </section>
  );
}

export default RoadmapLayout;
