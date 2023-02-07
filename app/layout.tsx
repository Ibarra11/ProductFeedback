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
        <main className="flex max-w-5xl gap-7 border-2 border-red-700  mx-auto">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
