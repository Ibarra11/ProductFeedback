"use client";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { BiSortAlt2 } from "react-icons/bi";
import { Category } from ".prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { SortByTypes } from "@/types";
import SortRadioGroup from "./SortRadioGroup";
import { usePostsContext } from "@/app/components/PostsProvider";
import { SORT_OPTIONS } from "@/app/constants";
import CategoryPills from "@/app/components/CategoryPills";

function SortAndFilterModal({
  handleOpenChange,
  isOpen,
}: {
  handleOpenChange: () => void;
  isOpen: boolean;
}) {
  const { handleSortByChange, filters, handleFilterChange } = usePostsContext();
  const [localSortValue, setLocalSortValue] = React.useState<SortByTypes>(
    SORT_OPTIONS[0]
  );
  const [localCategoryValues, setLocalCategoryValues] =
    React.useState<Category[]>(filters);

  function handleCategoryChange(category: Category) {
    const categoryIndex = localCategoryValues.indexOf(category);
    if (categoryIndex === -1) {
      setLocalCategoryValues([...localCategoryValues, category]);
      return;
    }
    setLocalCategoryValues([
      ...localCategoryValues.slice(0, categoryIndex),
      ...localCategoryValues.slice(categoryIndex + 1),
    ]);
  }

  function resetDefaults() {
    setLocalCategoryValues([]);
    setLocalSortValue(SORT_OPTIONS[0]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSortByChange(localSortValue);
    handleFilterChange(localCategoryValues);
    handleOpenChange();
  }
  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 "
          ></motion.div>
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.4, bounce: 0.2, type: "spring" },
            }}
            exit={{
              opacity: 1,
              height: 0,
              transition: { duration: 0.2 },
            }}
            className="fixed  bottom-0 left-0  bg-slate-700 text-slate-300 text-base  w-full"
          >
            <Dialog.Title className="flex  bg-gray-900  gap-2 items-center p-4 text-brand-ghost_white rounded-tr-md rounded-tl-md">
              <BiSortAlt2 size={18} />
              <span className=" font-medium">Sort & Filter</span>
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="p-4">
              <div>
                <h2 className="mb-4 text-lg font-bold">Filter By:</h2>

                <CategoryPills
                  variant="dark"
                  handleClick={handleCategoryChange}
                  categories={localCategoryValues}
                />
              </div>
              <hr className="rounded border-t-slate-500 opacity-40 my-6" />
              <div>
                <h2 className="mb-4 text-lg font-bold">Sort By:</h2>
                <SortRadioGroup
                  value={localSortValue}
                  onChange={(val: SortByTypes) => setLocalSortValue(val)}
                />
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <button
                  className={clsx(
                    "w-full p-2  text-white text-base  bg-brand-purple rounded-md",
                    "hover:bg-purple-700 transition-colors duration-200"
                  )}
                >
                  Show Posts
                </button>
                <button
                  onClick={resetDefaults}
                  type="button"
                  className="w-full p-2 "
                >
                  Reset to default
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SortAndFilterModal;