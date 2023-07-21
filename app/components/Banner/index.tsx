import clsx from "clsx";
interface Props {
  title: string;
  subTitle: string;
}
function Banner({ title, subTitle }: Props) {
  return (
    <div
      className={clsx(
        "banner-gradient  flex  flex-1 flex-col justify-center   p-6 text-brand-ghost_white",
        "md:flex-1 md:justify-end md:rounded-md",
        "lg:h-36 lg:flex-initial  lg:p-6"
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
