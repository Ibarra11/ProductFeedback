import React from "react";
import FilterProvider from "./components/FilterProvider";
import SortProvider from "./components/SortProvider";
import FeedbackView from "./components/FeedbackView";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <FilterProvider>
      <div className="max-w-5xl mx-auto flex gap-8">
        <Sidebar />
        <div className="flex flex-col flex-1 gap-6">
          <SortProvider>
            <Header />
            <FeedbackView />
          </SortProvider>
        </div>
      </div>
    </FilterProvider>
  );
}
