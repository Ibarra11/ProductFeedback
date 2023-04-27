import React from "react";
import clsx from "clsx";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "react-feather";
import MobileFilterPills from "./MobileFilterPills";

function ModalNav({
  isOpen,
  handleOpenChange,
  children,
}: React.PropsWithChildren<{
  isOpen: boolean;
  handleOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  function closeNavModal() {
    handleOpenChange(false);
  }
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay onClick={closeNavModal} asChild>
          <motion.div
            onClick={closeNavModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 top-[var(--header-height)] left-0 bottom-0 right-0 bg-black/25 h-screen w-screen"
          ></motion.div>
        </Dialog.Overlay>
        <Dialog.Content className="fixed z-50">
          <div className="fixed top-0 h-[var(--header-height)] right-0 left-0 flex justify-end items-center pr-9">
            <Dialog.Close asChild>
              <motion.button
                exit={{ visibility: "hidden" }}
                onClick={closeNavModal}
                className="text-brand-ghost_white"
              >
                <X size={24} strokeWidth={2} />
                <span className="sr-only"> close modal</span>
              </motion.button>
            </Dialog.Close>
          </div>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className={clsx(
              "fixed  top-[var(--header-height)] w-72 max-w-full h-full right-0 flex flex-col gap-6 bg-brand-alice_blue  p-6 shadow-md"
            )}
          >
            <MobileFilterPills closeNavModal={closeNavModal} />

            {children}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ModalNav;
