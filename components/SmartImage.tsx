import Image, { ImageProps } from "next/image";

interface SmartImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export default function SmartImage({ src, ...props }: SmartImageProps) {
  const fixedSrc = src.startsWith("/") ? src : `/images/${src}`;
  return <Image src={fixedSrc} {...props} />;
}
