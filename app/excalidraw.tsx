"use client";



import dynamic from "next/dynamic";
import { useState } from "react";



const Excalidraw2 = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function ExcalidrawPage(){

  const [elements, setElements] = useState([]);
  const [appState, setAppState] = useState({});

  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw2
        initialData={{
          elements: elements,
          appState: appState,
        }}
        onChange={(elements, appState) => {
          setElements(elements);
          setAppState(appState);
        }}
      />
    </div>
  );

}