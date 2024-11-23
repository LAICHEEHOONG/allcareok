import Fruits from "@/components/Fruits";

export default function Home() {
  return (
    <div className="">
      <main className="flex justify-center flex-col items-center">
        <div className="m-2">
          <Fruits />
          <Fruits />
        </div>
      </main>
      <footer className=""> </footer>
    </div>
  );
}
