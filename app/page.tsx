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
      <div className={clsx("h-full pb-14", "md:pt-14 md:pb-20 md:px-10 ")}>
        <div
          className={clsx(
            "h-full max-w-5xl mx-auto flex flex-col",
            "md:gap-10",
            "lg:flex-row"
          )}
        >
          {/* shown on tablet to desktop */}
          <Sidebar />
          {/* only shown on mobile to tablet */}
          <MobileHeader />
          <div
            className={clsx("flex h-full flex-col flex-1 gap-8", "lg:gap-6")}
          >
            <SortProvider>
              <Header />
              <FeedbackView />
            </SortProvider>
          </div>
        </div>
      </div>
    </FilterProvider>
  );
}
