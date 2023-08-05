"use client";
import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,

    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
};
function AnimatedPost({ children }: React.PropsWithChildren) {
  return <li>{children}</li>;
}

export default AnimatedPost;
