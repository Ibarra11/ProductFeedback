import "./globals.css";
import clsx from "clsx";
import { Jost } from "@next/font/google";

const jost = Jost({
  subsets: ["latin"],
  display: "optional",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.className}>
      <head />
      <body>
        <main
          className={clsx(
            "h-screen overflow-y-auto  bg-brand-alice_blue border-2 border-green-400",
            "md:py-10 md:px-10"
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
