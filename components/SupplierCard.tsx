//一个通用的供应商卡片组件（带动画和 hover 效果）：
"use client";

import { motion } from "framer-motion";
import SmartImage from "./SmartImage";
import Link from "next/link";
import { Supplier } from "./hooks/useSuppliers";

export default function SupplierCard({
  id,
  name,
  region,
  brand,
  description,
}: Supplier) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="border rounded-2xl p-4 bg-white shadow-sm hover:shadow-lg transition flex flex-col items-center text-center"
    >
      <Link href={`/suppliers/${id}`} className="w-full">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <SmartImage
            src={`/suppliers/${brand?.toLowerCase() || "default"}.png`}
            alt={name}
            width={200}
            height={200}
          />
        </div>

        <h3 className="text-lg font-semibold">{name}</h3>
        {region && <p className="text-sm text-gray-500 mt-1">{region}</p>}
        {brand && <p className="text-sm text-gray-700 mt-1">品牌：{brand}</p>}
        {description && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
            {description}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
