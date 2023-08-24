export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full relative flex items-center justify-center">
      {children}
    </div>
  );
}
