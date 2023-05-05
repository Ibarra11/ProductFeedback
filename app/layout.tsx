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
            "min-h-screen grid pb-10   bg-brand-alice_blue",
            "md:py-10 md:px-10"
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
