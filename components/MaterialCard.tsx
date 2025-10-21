"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MaterialCardProps {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
}

export default function MaterialCard({
  id,
  name,
  category,
  brand,
  image,
}: MaterialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="border rounded-2xl shadow-sm overflow-hidden bg-white hover:shadow-lg transition"
    >
      <Link href={`/materials/${id}`}>
        <div className="relative w-full h-40">
          <Image
            src={image || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
          <p className="text-sm text-gray-700 mt-1">{brand}</p>
        </div>
      </Link>
    </motion.div>
  );
}
