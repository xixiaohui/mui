// @ts-nocheck

"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";

const ExcalidrawWrapper: React.FC = () => {
  const elements = convertToExcalidrawElements([
    {
      type: "text",
      x: 0,
      y: 250,
      text: "中秋快乐",
      fontSize: 20,
      strokeColor: "#5f3dc4",
    },
    {
      type: "rectangle",
      x: 100,
      y: 250,
      strokeColor: "#f08c00",
      backgroundColor: "#ffec99",
    },
    {
      type: "ellipse",
      x: 250,
      y: 250,
    },
    {
      type: "diamond",
      x: 380,
      y: 250,
    },
    {
      type: "arrow",
      x: 100,
      y: 400,
      strokeColor: "#1098ad",
      strokeWidth: 2,
      label: {
        text: "ANOTHER STYLED LABELLED ARROW",
        strokeColor: "#099268",
      },
    },
    {
      type: "rectangle",
      x: 10,
      y: 10,
      strokeWidth: 2,
      id: "1",
    },
    {
      type: "diamond",
      x: 120,
      y: 20,
      backgroundColor: "#fff3bf",
      strokeWidth: 2,
      label: {
        text: "HELLO EXCALIDRAW",
        strokeColor: "#099268",
        fontSize: 30,
      },
      id: "2",
    },
    {
      type: "frame",
      children: ["1", "2"],
      name: "My frame",
    },
  ]);

  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw
        initialData={
          {
            elements,
            appState: { zenModeEnabled: false, viewBackgroundColor: "#a5d8ff" },
            scrollToContent: true,
          } as any
        }
        renderTopRightUI={() => {
          return (
            <button
              style={{
                background: "#70b1ec",
                border: "none",
                color: "#fff",
                width: "max-content",
                fontWeight: "bold",
              }}
              onClick={() => window.alert("This is dummy top right UI")}
            >
              Click me
            </button>
          );
        }}
      />
    </div>
  );
};
export default ExcalidrawWrapper;
