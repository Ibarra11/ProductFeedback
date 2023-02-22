import clsx from "clsx";
interface Props {
  title: string;
  subTitle: string;
}
function Banner({ title, subTitle }: Props) {
  return (
    <div
      className={clsx(
        "flex-1 banner-gradient flex flex-col justify-end px-6 py-4 text-brand-ghost_white",
        "md:rounded-lg",
        "lg:h-36 lg:p-6 lg:flex-initial"
      )}
    >
      <h1 className={clsx("text-base font-bold ", "lg:text-xl")}>{title}</h1>
      <p className={clsx("text-xs font-medium opacity-75", "lg:text-sm")}>
        {subTitle}
      </p>
    </div>
  );
}

export default Banner;
