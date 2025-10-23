"use client";
import React from "react";
import { useCategories } from "@/components/hooks/useCategories";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();

  if (loading) return <p className="p-10 text-center">加载中...</p>;
  if (error)
    return <p className="p-10 text-center text-red-500">加载失败: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">原材料分类</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            className="group relative overflow-hidden rounded-2xl shadow hover:shadow-xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Link href={`/categories/${cat.id}`}>
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={cat.image_url || "/placeholder.png"}
                  alt={cat.name}
                  fill
                  className="object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-semibold text-black drop-shadow-md">
                  {cat.name}
                </h2>
                <p className="text-sm text-black drop-shadow-sm line-clamp-2">
                  {cat.description || "暂无描述"}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
