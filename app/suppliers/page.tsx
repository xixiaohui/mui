// 供应商列表页
"use client";

import { useSuppliers } from "../../components/hooks/useSuppliers";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SuppliersPage() {
  const { suppliers, loading } = useSuppliers();
  const [query, setQuery] = useState("");

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        🌐 工业选材 AI 供应商目录
      </h1>

      <div className="flex justify-center mb-10">
        <Input
          placeholder="🔍 搜索供应商..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-80 border border-gray-600 bg-transparent backdrop-blur-md"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">加载中...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400">未找到供应商</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/suppliers/${s.id}`}
                className="block rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-cyan-300">
                  {s.name}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{s.region}</p>
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                  {s.description || "暂无简介"}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}



