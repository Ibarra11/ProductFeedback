"use client";
import React from "react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import Banner from "../Banner";
import { Menu } from "react-feather";
import { motion } from "framer-motion";
import ModalNav from "../ModalNav";

import { PostsPromise, User } from "@/types";

function MobileHeader({
  user,
  postsPromise,
}: React.PropsWithChildren<{ user: User; postsPromise: PostsPromise }>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    if (headerRef.current) {
      const { height } = getComputedStyle(headerRef.current);
      document.documentElement.style.setProperty("--header-height", height);
    }
  }, []);

  React.useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("margin", "0px !important");
    } else {
      document.body.style.setProperty("margin", "0px !important");
    }
  }, [isOpen]);

  return (
    <header ref={headerRef} className={clsx("relative  w-full", "md:hidden")}>
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <button
        aria-label={isOpen ? "Close menu" : "Open Menu"}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsAnimating(true);
        }}
        className={`absolute top-1/2 right-6 -translate-y-1/2 text-brand-ghost_white ${
          isOpen || isAnimating ? "opacity-0" : ""
        }`}
      >
        <MenuIcon isOpen={isOpen} />
        <span className="sr-only">Toggle mobile menu</span>
      </button>

      <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
        {isOpen && (
          <ModalNav
            postsPromise={postsPromise}
            user={user}
            closeNavModal={() => setIsOpen(false)}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`${
        isOpen ? "-rotate-45" : "rotate-0"
      } overflow-visible border-2 border-red-500`}
    >
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1.5,
        }}
        x1={isOpen ? "16" : "0"}
        y1={isOpen ? "0" : "8"}
        x2={isOpen ? "16" : "32"}
        y2={isOpen ? "32" : "8"}
      ></motion.line>
      <motion.line
        x1={isOpen ? "0" : "0"}
        y1={isOpen ? "16" : "16"}
        x2={isOpen ? "32" : "32"}
        y2={isOpen ? "16" : "16"}
      ></motion.line>
      <motion.line
        x1={isOpen ? "0" : "0"}
        y1={isOpen ? "16" : "24"}
        x2={isOpen ? "32" : "32"}
        y2={isOpen ? "16" : "24"}
      ></motion.line>
    </svg>
  );
}

export default MobileHeader;
