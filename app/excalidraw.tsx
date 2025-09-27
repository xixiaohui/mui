"use client";

import dynamic from "next/dynamic";

const Excalidraw2 = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function ExcalidrawPage(){

  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw2 />
    </div>
  );

}