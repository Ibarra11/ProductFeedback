import "./globals.css";
import { Jost } from "@next/font/google";
import Sidebar from "./components/Sidebar";

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
      <body className="min-h-screen bg-brand-alice_blue">
        <main className="max-w-5xl pt-16 pb-12 mx-auto border-2 border-green-600">
          {children}
        </main>
      </body>
    </html>
  );
}
