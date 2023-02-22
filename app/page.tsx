import React from "react";
import clsx from "clsx";
import FilterProvider from "./components/FilterProvider";
import SortProvider from "./components/SortProvider";
import FeedbackView from "./components/FeedbackView";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <FilterProvider>
      <main className="h-full">
        <div
          className={clsx(
            "h-full max-w-5xl mx-auto flex flex-col gap-10  border-2 border-green-500",
            "lg:flex-row"
          )}
        >
          <Sidebar />
          <div className="flex h-full flex-col flex-1 gap-6">
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
