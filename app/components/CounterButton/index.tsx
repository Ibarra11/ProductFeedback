import { ChevronUp } from "react-feather";
import clsx from "clsx";
import { ButtonBase } from "@/types";

type ButtonProps = ButtonBase<{
  value: number;
  onClick: (...args: any) => void;
}>;
function CounterButton({ value, onClick, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx("bg-brand-alice-blue px-4 py-3")}
      onClick={onClick}
      {...rest}
    >
      <span className="text-brand-royal-blue">
        <ChevronUp size={16} />
      </span>
      <span className={clsx("text-brand-american-blue")}>{value}</span>
    </button>
  );
}

export default CounterButton;
