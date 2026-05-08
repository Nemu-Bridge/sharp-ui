"use client";

import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/app/content"), { ssr: false });

export default function Page() {
  return <HomePage />;
}
