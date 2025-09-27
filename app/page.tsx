"use client";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CanvasApp from "./CanvasApp"

import ExcalidrawPage from './excalidraw';

export default function HomePage() {
  return (
    
    <DndProvider backend={HTML5Backend}>
      {/* <CanvasApp></CanvasApp> */}
      
      <ExcalidrawPage />
    </DndProvider>

    

  );
}
