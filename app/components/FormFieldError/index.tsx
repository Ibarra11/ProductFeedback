export default function FormFieldError({ children }: React.PropsWithChildren) {
  return <p className="text-xs text-red-600">{children}</p>;
}
