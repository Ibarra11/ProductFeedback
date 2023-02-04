import Image from "next/image";
import Button from "./components/Button";
import ButtonWithChevronLeft from "./components/ButtonWithChevronLeft";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-300">
      <Button color="american_blue">Click Me</Button>
      <ButtonWithChevronLeft withBg={true}>Go Back</ButtonWithChevronLeft>
    </main>
  );
}
