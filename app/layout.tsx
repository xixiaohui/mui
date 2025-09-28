// @ts-nocheck

import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import "@excalidraw/excalidraw/index.css";

export const metadata: Metadata = {
  title: "Next.js 15 + MUI Demo",
  description: "最小可运行示例，避免 hydration 错误"
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
