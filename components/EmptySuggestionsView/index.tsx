import Image from "next/image";
function EmptySuggestionsView() {
  return (
    <div className="h-full grid place-content-center bg-white rounded-lg p-6">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <Image
          className="mb-12"
          src="/suggestions/illustration-empty.svg"
          alt=""
          aria-hidden
          width={130}
          height={136}
        />

        <h2 className="text-2xl font-bold mb-4">There is no feedback yet.</h2>
        <p className="text-base text-center font-normal mb-12">
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
      </div>
    </div>
  );
}

export default EmptySuggestionsView;
