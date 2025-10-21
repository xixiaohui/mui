//顶部 AI 搜索区

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/ai-selector?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[70vh] bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* 背景动画 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_60%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto p-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
          AI 智能选材，为工业决策提效
        </h1>

        <p className="text-gray-500 mb-8 text-lg">
          输入性能要求或用途，AI 将为你推荐最合适的材料与供应商。
        </p>

        <div className="flex items-center justify-center gap-2 max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="例如：耐高温、低密度、适合风电叶片"
            className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-md"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md"
          >
            智能推荐
          </button>
        </div>
      </motion.div>
    </section>
  );
}
