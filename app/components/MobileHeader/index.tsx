"use client";
import React from "react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";

import Banner from "../Banner";
import { Menu, X } from "react-feather";
import ModalNav from "../ModalNav";

function MobileHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (headerRef.current) {
      const { height } = getComputedStyle(headerRef.current);
      document.documentElement.style.setProperty("--header-height", height);
    }
  }, []);

  React.useEffect(() => {
    if (headerRef.current) {
      const { width } = getComputedStyle(headerRef.current);
      const widthValue = Number(width.slice(0, width.indexOf("p")));
      if (!isOpen) {
        setTimeout(() => {
          (headerRef.current as any).style.width = "";
        }, 250);
      } else {
        headerRef.current.style.width = `${widthValue + 12}px`;
      }
    }
  }, [isOpen]);

  console.log("open", isOpen);
  console.log("animating", isAnimating);

  return (
    <header ref={headerRef} className={clsx("relative w-full", "md:hidden")}>
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />

      {!isOpen && !isAnimating && (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsAnimating(!isAnimating);
          }}
          className="absolute top-1/2 right-6 -translate-y-1/2 text-brand-ghost_white"
        >
          <Menu size={24} strokeWidth={2} />
          <span className="sr-only">{isOpen ? "close nav" : "open nav"}</span>
        </button>
      )}

      <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
        {isOpen && <ModalNav handleOpenChange={setIsOpen} isOpen={isOpen} />}
      </AnimatePresence>
    </header>
  );
}

export default MobileHeader;
