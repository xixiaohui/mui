// 供应商列表页
"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSuppliers } from "../../components/hooks/useSuppliers";
import { Input } from "@/components/ui/input"; 

export default function SuppliersPage() {
  const { suppliers, loading } = useSuppliers();
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState<string>("");

  // ✅ 从数据中动态提取品牌选项
  const brands = useMemo(
    () => Array.from(new Set(suppliers.map((s) => s.brand).filter(Boolean))),
    [suppliers]
  );

  // ✅ 搜索 + 筛选逻辑
  const filtered = suppliers.filter(
    (s) =>
      (!search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.region?.toLowerCase().includes(search.toLowerCase())) &&
      (!brandFilter || s.brand === brandFilter)
  );

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-10 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔹 顶部标题与筛选栏 */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">供应商目录</h1>

        <div className="flex flex-wrap gap-3 items-center">
          <Input
            type="text"
            placeholder="搜索供应商或地区..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
          />

          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">全部品牌</option>
            {brands.map((b) => (
              <option key={b} value={b || ""}>{/* ✅ 保证不是 null */}
                {b || "未命名品牌"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🏢 列表区域 */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">加载中...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-10">未找到符合条件的供应商</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                href={`/suppliers/${s.id}`}
                className="block bg-white/60 backdrop-blur-md border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6 h-full"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {s.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  品牌: {s.brand || "未知"}
                </p>
                <p className="text-gray-500 text-sm">地区: {s.region || "—"}</p>
                {s.website && (
                  <p className="text-blue-600 text-sm mt-2 underline">
                    访问官网 →
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

