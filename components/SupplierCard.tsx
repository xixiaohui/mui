//一个通用的供应商卡片组件（带动画和 hover 效果）：
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SupplierCardProps {
  id: string;
  name: string;
  region: string;
  mainProduct: string;
  logo: string;
}

export default function SupplierCard({
  id,
  name,
  region,
  mainProduct,
  logo,
}: SupplierCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="border rounded-2xl p-4 bg-white shadow-sm hover:shadow-lg transition flex flex-col items-center text-center"
    >
      <Link href={`/suppliers/${id}`} className="w-full">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <Image
            src={logo || "/supplier-placeholder.png"}
            alt={name}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{region}</p>
        <p className="text-sm text-gray-700 mt-2">{mainProduct}</p>
      </Link>
    </motion.div>
  );
}
