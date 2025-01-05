"use client";
import EditorDesktop from "@/components/editor/EditorDesktop";
// import { Toaster } from "@/components/ui/sonner";

export default function Editor() {
  return (
    <div className="flex justify-center">
      <EditorDesktop />
      {/* <Toaster position='top-center' richColors /> */}
    </div>
  );
}
