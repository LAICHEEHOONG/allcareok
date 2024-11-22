import { NavCarousel } from "@/components/NavCarousel";
import Fruits from "@/components/Fruits";
import { NavCarousel2 } from "@/components/NavCarousel2";

export default function Home() {
  return (
    <div className="">
      <main className="flex justify-center flex-col items-center">
        {/* <NavCarousel /> */}
        <NavCarousel2 />
        <div className="m-2">
          <Fruits />
          <Fruits />
        </div>
      </main>
      <footer className=""> </footer>
    </div>
  );
}
