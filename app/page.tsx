import React from "react";
import ProductRequestList from "./components/ProductRequestList";
import Header from "./components/Header";
import data from "../data.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <ProductRequestList />
    </div>
  );
}
