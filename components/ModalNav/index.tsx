import React from "react";
import clsx from "clsx";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { AnimatedMenuIcon } from "../MenuIcon";
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
  user: User | undefined;
  postsPromise: PostsPromise;
}>) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0  flex flex-col">
          <Dialog.Overlay onClick={closeNavModal} asChild>
            <motion.div
              onClick={closeNavModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed  inset-0 top-[var(--header-height)]    bg-black/25 "
            ></motion.div>
          </Dialog.Overlay>
          <div className="relative h-[var(--header-height)] w-full">
            <button
              aria-label={isOpen ? "Close menu" : "Open Menu"}
              onClick={closeNavModal}
              className="absolute top-1/2 right-6 -translate-x-[var(--removed-body-scroll-bar-size)] -translate-y-1/2 cursor-pointer text-brand-ghost_white "
            >
              <AnimatedMenuIcon />
              <span className="sr-only">Toggle mobile menu</span>
            </button>
          </div>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className={clsx(
              "relative z-20 flex h-full w-72 flex-1 flex-col gap-4 self-end overflow-auto    bg-brand-alice_blue py-6 px-4 shadow-md"
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
            {user && <UserProfile user={user} />}
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

export default ModalNav;
