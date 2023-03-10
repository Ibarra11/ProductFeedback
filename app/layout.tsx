import "./globals.css";
import clsx from "clsx";
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
      <body className={clsx("min-h-screen bg-brand-alice_blue")}>
        <main>{children}</main>
      </body>
    </html>
  );
}
