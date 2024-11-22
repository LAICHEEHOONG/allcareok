// import { NavCarousel } from "@/components/NavCarousel";
import Fruits from "@/components/Fruits";
// import { NavCarousel2 } from "@/components/NavCarousel2";
// import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="">
      <main className="flex justify-center flex-col items-center">
        {/* <Divider className="m-3" />
        <NavCarousel /> */}
        <div className="m-2">
          <Fruits />
          <Fruits />
        </div>
      </main>
      <footer className=""> </footer>
    </div>
  );
}
