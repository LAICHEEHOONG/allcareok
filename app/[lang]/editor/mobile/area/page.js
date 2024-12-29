"use client";
import dynamic from "next/dynamic";

const AreaRightCard = dynamic(
  () => import("@/components/editor/AreaRightCard"),
  {
    ssr: false,
  }
);

export default function MobileArea() {
  return (
    <div className="p-4">
      <AreaRightCard />
    </div>
  );
}
