import "./globals.css";
import { Jost } from "@next/font/google";

const jost = Jost({
  subsets: ["latin"],
  display: "optional",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.className}>
      <head />
      <body className="min-h-screen bg-brand-alice_blue pt-24 pb-16 px-10">
        {children}
      </body>
    </html>
  );
}
