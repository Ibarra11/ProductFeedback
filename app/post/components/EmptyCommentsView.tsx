import Image from "next/image";
function EmptyCommentsView() {
  return (
    <div className="h-full grid place-content-center bg-white rounded-lg p-6">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <Image
          className=" mb-12"
          src="/suggestions/illustration-empty.svg"
          alt=""
          aria-hidden
          width={130}
          height={136}
        />

        <h2 className="text-2xl font-bold mb-4">There are no comments yet.</h2>
      </div>
    </div>
  );
}

export default EmptyCommentsView;
