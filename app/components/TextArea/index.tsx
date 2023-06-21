import { TextareaHTMLAttributes } from "react";

function TextArea({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`h-20 resize-none overflow-y-auto rounded-md bg-brand-alice_blue px-6 ${className}`}
      {...rest}
    />
  );
}

export default TextArea;
