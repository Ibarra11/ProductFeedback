import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FilterPills from "../Sidebar/filter_pills";
import Roadmap from "../Sidebar/roadmap";
import { X } from "react-feather";
import clsx from "clsx";
function ModalNav({
  isOpen,
  handleOpenChange,
}: {
  isOpen: boolean;
  handleOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function closeNavModal() {
    handleOpenChange(false);
  }
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-50 top-[var(--header-height)] left-0 inset-0 bg-black/25 h-screen w-screen" />
        <Dialog.Content className="fixed z-50 inset-0">
          <div
            style={{ height: "var(--header-height)" }}
            className="fixed top-0 right-0 left-0 flex justify-end items-center pr-4"
          >
            <Dialog.Close
              className="text-brand-ghost_white"
              onClick={closeNavModal}
            >
              <X size={24} strokeWidth={2} />
              <span className="sr-only"> close navigation</span>
            </Dialog.Close>
          </div>
          <div
            className={clsx(
              "fixed  h-full right-0 flex flex-col gap-6 bg-brand-alice_blue w-72 max-w-full p-6 shadow-md",
              `top-[var(--header-height)]`
            )}
          >
            <FilterPills closeNavModal={closeNavModal} />
            <Roadmap />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ModalNav;
