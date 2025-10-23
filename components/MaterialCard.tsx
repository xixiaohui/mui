"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SmartImage from "./SmartImage";
import { Material } from "./hooks/useMaterials";

interface MaterialCardProps extends Material {
  categoryName?: string; // 可选，方便传入类别名称
}

export default function MaterialCard({
  id,
  name,
  brand,
  image_url,
  categoryName,
}: MaterialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="border rounded-2xl shadow-sm overflow-hidden bg-white hover:shadow-lg transition"
    >
      <Link href={`/materials/${id}`}>
        <div className="relative w-full h-40">
          <SmartImage
            src={image_url || "/placeholder.png"}
            alt={name}
            width={200}
            height={200}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          {categoryName && <p className="text-sm text-gray-500">{categoryName}</p>}
          {brand && <p className="text-sm text-gray-700 mt-1">{brand}</p>}
        </div>
      </Link>
    </motion.div>
  );
}

