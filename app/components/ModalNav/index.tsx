import React from "react";
import clsx from "clsx";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "react-feather";
import UserProfile from "../UserProfile";
import MobileFilterPills from "./MobileFilterPills";
import RoadmapSkeleton from "../Sidebar/RoadmapSkeleton";
import Roadmap from "../Sidebar/roadmap";
import RoadmapList from "../Sidebar/RoadmapList";
import { PostsPromise, User } from "@/types";
import CustomLink from "../CustomLink";

function ModalNav({
  isOpen,
  closeNavModal,
  user,
  postsPromise,
}: React.PropsWithChildren<{
  isOpen: boolean;
  closeNavModal: () => void;
  user: User;
  postsPromise: PostsPromise;
}>) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        {/* <div className="fixed inset-0 isolate z-50 flex flex-col"> */}
        {/* <div className="relative h-[var(--header-height)]"> */}
        {/* <button
              aria-label={isOpen ? "Close menu" : "Open Menu"}
              onClick={closeNavModal}
              className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer text-brand-ghost_white"
            >
             
              <MenuIcon isOpen={true} />
              <span className="sr-only">Toggle mobile menu</span>
            </button> */}
        {/* </div> */}

        <Dialog.Content className="fixed inset-0  flex flex-col">
          <Dialog.Overlay onClick={closeNavModal} asChild>
            <motion.div
              onClick={closeNavModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-[var(--header-height)]  z-10  bg-black/25 "
            ></motion.div>
          </Dialog.Overlay>
          <div className="relative h-[var(--header-height)] w-full">
            <button
              aria-label={isOpen ? "Close menu" : "Open Menu"}
              onClick={closeNavModal}
              className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer text-brand-ghost_white"
            >
              <MenuIcon isOpen={true} />
              <span className="sr-only">Toggle mobile menu</span>
            </button>
          </div>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className={clsx(
              "relative z-20 flex h-full w-72 flex-1 flex-col gap-4 self-end overflow-auto    bg-brand-alice_blue py-6 shadow-md "
            )}
          >
            <div className="px-4">
              <CustomLink
                // @ts-ignore
                href="/new-feedback"
                variant="primary"
              >
                + Add Feedback
              </CustomLink>
            </div>
            <UserProfile user={user} />
            <MobileFilterPills closeNavModal={closeNavModal} />
            <React.Suspense fallback={<RoadmapSkeleton />}>
              <Roadmap>
                <RoadmapList postsPromise={postsPromise} />
              </Roadmap>
            </React.Suspense>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      initial={{
        rotate: 0,
      }}
      animate={{
        rotate: "-45deg",
      }}
      transition={{
        type: "spring",
        duration: 1,
      }}
      className={` overflow-visible `}
    >
      <motion.line
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          type: "spring",
          duration: 0.5,
          delay: 0.25,
        }}
        x1={isOpen ? "16" : "0"}
        y1={isOpen ? "0" : "8"}
        x2={isOpen ? "16" : "32"}
        y2={isOpen ? "32" : "8"}
      ></motion.line>
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.5,
          delay: 0.25,
        }}
        x1={isOpen ? "0" : "0"}
        y1={isOpen ? "16" : "16"}
        x2={isOpen ? "32" : "32"}
        y2={isOpen ? "16" : "16"}
      ></motion.line>
      {/* <line x1="0" y1="16" x2="32" y2="16"></line> */}
      {/* <line x1="0" y1="24" x2="32" y2="24"></line> */}
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1.5,
        }}
        x1={isOpen ? "0" : "0"}
        y1={isOpen ? "16" : "24"}
        x2={isOpen ? "32" : "32"}
        y2={isOpen ? "16" : "24"}
      ></motion.line>
    </motion.svg>
  );
}

export default ModalNav;
