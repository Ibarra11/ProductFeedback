import React from "react";
import FilterProvider from "./components/FilterProvider";
import ProductRequestList from "./components/ProductRequestList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import type { FeedbackCategories } from "../types";

export default function Home() {
  return (
    <FilterProvider>
      <div className="flex gap-6">
        <Sidebar />
        <div>
          <Header />
          <ProductRequestList />
        </div>
      </div>
    </FilterProvider>
  );
}
