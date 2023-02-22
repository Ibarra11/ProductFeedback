import clsx from "clsx";
interface Props {
  title: string;
  subTitle: string;
}
function Banner({ title, subTitle }: Props) {
  return (
    <div
      className={clsx(
        "flex-1 banner-gradient flex flex-col justify-end p-6 rounded-lg text-brand-ghost_white",
        "lg:h-36 lg:flex-initial"
      )}
    >
      <h1 className="text-xl font-bold text-brand-ghost_white">{title}</h1>
      <p className="font-medium opacity-75">{subTitle}</p>
    </div>
  );
}

export default Banner;
