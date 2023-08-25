"use client";
import React from "react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import Banner from "../Banner";
import { MenuIcon } from "../MenuIcon";
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
        <MenuIcon />
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

export default MobileHeader;
