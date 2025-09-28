// @ts-nocheck

import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import "@excalidraw/excalidraw/index.css";

export const metadata: Metadata = {
  title: "excalidraw + .gpx运动轨迹",
  description: "excalidraw 添加.gpx运动轨迹路径绘制"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
