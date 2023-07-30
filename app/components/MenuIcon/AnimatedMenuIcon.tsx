import { motion } from "framer-motion";
const transition = {
  type: "spring",
  damping: 200,
  stiffness: 3500,
};
export function AnimatedMenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={` overflow-visible`}
    >
      <motion.line
        transition={transition}
        initial={{
          x1: 0,
          y1: 6,
          x2: 24,
          y2: 6,
        }}
        animate={{
          x1: 0,
          y1: 0,
          x2: 24,
          y2: 24,
        }}
        exit={{
          x1: 0,
          y1: 6,
          x2: 24,
          y2: 6,
        }}
      ></motion.line>
      <motion.line
        transition={transition}
        initial={{
          x1: 0,
          y1: 12,
          x2: 24,
          y2: 12,
        }}
        animate={{
          x1: 0,
          y1: 24,
          x2: 24,
          y2: 0,
        }}
        exit={{
          x1: 0,
          y1: 12,
          x2: 24,
          y2: 12,
        }}
      ></motion.line>
      <motion.line
        transition={transition}
        initial={{
          x1: 0,
          y1: 18,
          x2: 24,
          y2: 18,
        }}
        animate={{
          x1: 0,
          y1: 24,
          x2: 24,
          y2: 0,
        }}
        exit={{
          x1: 0,
          y1: 18,
          x2: 24,
          y2: 18,
        }}
      ></motion.line>
    </svg>
  );
}
