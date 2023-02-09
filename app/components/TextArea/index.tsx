import { TextareaHTMLAttributes } from "react";

function TextArea({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`h-20 resize-none overflow-y-auto bg-brand-alice_blue rounded-md ${className}`}
      {...rest}
    />
  );
}

export default TextArea;
