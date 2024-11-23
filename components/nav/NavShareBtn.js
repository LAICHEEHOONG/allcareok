"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NavShareBtn({share}) {
    const router = useRouter()
  return (
    <Button
      className="hidden lg:flex "
      color="default"
      variant="light"
      radius="full"
      size="lg"
      onPress={() => router.push('/dashboard')}
    >
      {share}
    </Button>
  );
}
