"use client";
import React from "react";
import Banner from "../Banner";
import { Menu, X } from "react-feather";
import ModalNav from "../ModalNav";
import clsx from "clsx";
function MobileHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  // When the modal opens there is a 15px gap between the bg and the right side of the viewport
  const scrollBarMargin = isOpen ? "-mr-[15px]" : "";
  return (
    <header className={clsx(`${scrollBarMargin}`, "relative", "md:hidden")}>
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute  top-1/2 right-6 -translate-y-1/2 text-brand-ghost_white"
      >
        {!isOpen && (
          <>
            <Menu size={24} strokeWidth={2} />

            <span className="sr-only">{"open nav"}</span>
          </>
        )}
      </button>
      <ModalNav handleOpenChange={setIsOpen} isOpen={isOpen} />
    </header>
  );
}

export default MobileHeader;
