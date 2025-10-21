//合作品牌展示


"use client";

import { motion } from "framer-motion";
import SupplierCard from "./SupplierCard";

const mockSuppliers = [
  {
    id: "1",
    name: "Taishan Fiberglass",
    region: "山东，中国",
    mainProduct: "玻璃纤维纱、短切毡",
    logo: "/suppliers/taishan.png",
  },
  {
    id: "2",
    name: "Toray Industries",
    region: "日本",
    mainProduct: "碳纤维布、复合材料",
    logo: "/suppliers/toray.png",
  },
  {
    id: "3",
    name: "Huntsman Advanced Materials",
    region: "美国",
    mainProduct: "环氧树脂、固化剂",
    logo: "/suppliers/huntsman.png",
  },
];

export default function SupplierShowcase() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 text-center"
        >
          优质供应商展示
        </motion.h2> */}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {mockSuppliers.map((s) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <SupplierCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
