import React from "react";
import FilterProvider from "./components/FilterProvider";
import SortProvider from "./components/SortProvider";
import ProductRequestList from "./components/ProductRequestList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <FilterProvider>
      <div className="flex gap-8">
        <Sidebar />
        <div className="flex flex-col gap-6">
          <SortProvider>
            <Header />
            <ProductRequestList />
          </SortProvider>
        </div>
      </div>
    </FilterProvider>
  );
}
