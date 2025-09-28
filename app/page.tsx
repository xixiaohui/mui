"use client";

import dynamic from "next/dynamic";

// const ExcalidrawWrapper = dynamic(
//   async () => (await import("./excalidrawWrapper")).default,
//   {
//     ssr: false,
//   },
// );

// export default function HomePage() {
//   return (
//     <ExcalidrawWrapper />
//   );
// }


const GpxExcalidrawPage = dynamic(
  async () => (await import("./gpxexcalidrawpage")).default,
  {
    ssr: false,
  },
);

export default function HomePage() {
  return (
    <GpxExcalidrawPage />
  );
}
