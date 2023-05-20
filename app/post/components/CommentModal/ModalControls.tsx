"use client";
import clsx from "clsx";
import { IoMdArrowBack, IoMdArrowForward, IoMdClose } from "react-icons/io";

interface Props {
  handleNavigation: (direction: "previous" | "forward") => void;
  disabled: {
    previous: boolean;
    forward: boolean;
  };
  closeModal: () => void;
}
function ModalControls({ handleNavigation, disabled, closeModal }: Props) {
  const { forward, previous } = disabled;
  return (
    <div className="flex gap-6 px-6 py-3">
      <button
        onClick={() => handleNavigation("previous")}
        disabled={previous}
        className={clsx("text-brand-american_blue", previous && "opacity-50")}
      >
        <IoMdArrowBack size={16} />
        <span className=" sr-only">Go to previous comment</span>
      </button>
      <button
        onClick={() => handleNavigation("forward")}
        disabled={forward}
        className={clsx("text-brand-american_blue", forward && "opacity-50")}
      >
        <IoMdArrowForward size={16} />
        <span className=" sr-only">Go to next comment</span>
      </button>
      <button
        onClick={closeModal}
        className=" ml-auto text-brand-american_blue"
      >
        <IoMdClose size={16} />
        <span className=" sr-only">Close modal</span>
      </button>
    </div>
  );
}

export default ModalControls;
