interface Props {
  title: string;
  subTitle: string;
}
function Banner({ title, subTitle }: Props) {
  return (
    <div className="banner-gradient flex flex-col justify-end h-36  p-6 rounded-lg text-brand-ghost_white ">
      <h1 className="text-xl font-bold text-brand-ghost_white">{title}</h1>
      <p className="font-medium opacity-75">{subTitle}</p>
    </div>
  );
}

export default Banner;
