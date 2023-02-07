import React from "react";
import ProductRequestList from "./components/ProductRequestList";
import data from "../data.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <ProductRequestList />
    </div>
  );
}
