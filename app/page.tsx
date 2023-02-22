import React from "react";
import clsx from "clsx";
import FilterProvider from "./components/FilterProvider";
import SortProvider from "./components/SortProvider";
import FeedbackView from "./components/FeedbackView";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";

export default function Home() {
  return (
    <FilterProvider>
      <main className="h-full">
        <div
          className={clsx(
            "h-full max-w-5xl mx-auto flex flex-col  border-2 border-green-500",
            "lg:flex-row lg:gap-10"
          )}
        >
          {/* shown on tablet to desktop */}
          <Sidebar />
          {/* only shown on mobile to tablet */}
          <MobileHeader />
          <div
            className={clsx("flex h-full flex-col flex-1 gap-8", " lg:gap-6")}
          >
            <SortProvider>
              <Header />
              <FeedbackView />
            </SortProvider>
          </div>
        </div>
      </main>
    </FilterProvider>
  );
}
