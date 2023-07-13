"use client";
import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Post from ".";
const variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
};
function AnimatedPost({ children }: React.PropsWithChildren) {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  React.useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, controls]);
  return (
    <motion.li
      variants={variants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {children}
      {/* <Post {...props} /> */}
    </motion.li>
  );
}

export default AnimatedPost;
