//材料分类导航

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  {
    id: "glass-fiber",
    name: "玻璃纤维",
    desc: "高强度、耐腐蚀、绝缘性好",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "carbon-fiber",
    name: "碳纤维",
    desc: "高模量、轻量化、耐高温",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "resin",
    name: "树脂材料",
    desc: "成型灵活、化学稳定性强",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "aramid",
    name: "芳纶纤维",
    desc: "阻燃、耐磨、抗冲击",
    color: "from-yellow-300 to-amber-600",
  },
  {
    id: "basalt",
    name: "玄武岩纤维",
    desc: "天然环保、抗高温、强度高",
    color: "from-green-400 to-emerald-600",
  },
];

export default function CategoryList() {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/materials?category=${id}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleClick(cat.id)}
          className={`cursor-pointer rounded-2xl p-5 text-white shadow-md bg-gradient-to-br ${cat.color} hover:shadow-lg transition-all`}
        >
          <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
          <p className="text-sm text-white/80">{cat.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

