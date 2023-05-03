"use client";
import { Category } from "@prisma/client";
import CategoryPills from "../CategoryPills";
import { usePostsContext } from "../PostsProvider";
function SidebarCategoryPills() {
  const { filters, handleFilterChange } = usePostsContext();

  function handleClick(category: Category) {
    handleFilterChange(category);
  }
  return (
    <div className="bg-white md:flex-1 p-6 pt-4  lg:flex-initial rounded-lg">
      <h2 className="mb-4 text-lg text-brand-american_blue font-bold">Tags</h2>
      <CategoryPills
        variant={"light"}
        handleClick={handleClick}
        categories={filters}
      />
    </div>
  );
}
export default SidebarCategoryPills;
