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
      {/* marginRight needed to offset the margin applied when modal is opened otherwise there is a gap. */}
      <body style={{ marginRight: "0px !important" }}>
        <main
          className={clsx(
            "grid min-h-screen bg-brand-alice_blue   pb-10",
            "md:py-10 md:px-10"
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
