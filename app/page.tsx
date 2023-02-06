"use client";
import React from "react";
import Image from "next/image";
import Button from "./components/Button";
import ButtonWithChevronLeft from "./components/ButtonWithChevronLeft";
import CounterButton from "./components/CounterButton";
import Pill from "./components/Pill";
import Select from "./components/Select";
export default function Home() {
  const [state, setState] = React.useState(0);
  return (
    <main className="min-h-screen bg-slate-400">
      <Button color="american_blue">Click Me</Button>
      <ButtonWithChevronLeft withBg={true}>Go Back</ButtonWithChevronLeft>
      <CounterButton value={state} onClick={() => setState(state + 1)} />
      <Pill>hello</Pill>
      <Select
        items={["Feature", "UX", "UI", "Enhancement", "Bug"]}
        defaultValue="Feature"
      />
    </main>
  );
}
