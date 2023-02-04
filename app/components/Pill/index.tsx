import * as React from "react";
import clsx from "clsx";
function Pill({ children, ...rest }: React.PropsWithChildren) {
  return (
    <button
      className={clsx(
        "bg-blue-200 px-4 py-2 rounded-xl transition-colors duration-200",
        "hover:bg-blue-300",
        "active:bg-blue-600"
      )}
      {...rest}
    >
      <span
        className={clsx(
          "text-brand-american-blue transition-all duration-200",
          "active:text-brand-ghost_white"
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default Pill;
