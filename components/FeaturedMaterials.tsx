//推荐材料展示

"use client";

import { motion } from "framer-motion";
import MaterialCard from "./MaterialCard";

const mockData = [
  {
    id: "1",
    name: "E-Glass Chopped Strand",
    category: "玻璃纤维",
    brand: "Taishan Fiberglass",
    image: "/materials/e-glass.png",
  },
  {
    id: "2",
    name: "Carbon Fiber Fabric",
    category: "碳纤维",
    brand: "Toray",
    image: "/materials/carbon.png",
  },
  {
    id: "3",
    name: "Epoxy Resin 618",
    category: "树脂",
    brand: "Huntsman",
    image: "/materials/resin.png",
  },
];

export default function FeaturedMaterials() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6"
        >
          精选材料
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
          {mockData.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <MaterialCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
