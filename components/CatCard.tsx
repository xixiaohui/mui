"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Category } from "./hooks/useCategories";

interface CategoriesCardProps {
  category: Category;
}

export default function CatCard({ category }: CategoriesCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="relative group rounded-2xl bg-white border border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 w-[260px] h-[300px] flex flex-col"
    >
      <Link
        href={`/categories/${category.id}`}
        className="flex flex-col flex-1 items-center text-center px-6 py-6"
      >
        {/* 图标区域 */}
        <div className="relative w-20 h-20 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all">
          {category.image_url ? (
            <img
              src={category.image_url}
              alt={category.name}
              className="w-14 h-14 object-contain"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl text-blue-500">
              📦
            </div>
          )}
          {/* 光晕效果 */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-200/40 to-cyan-200/40 opacity-0 group-hover:opacity-100 blur-lg transition-all" />
        </div>

        {/* 分类名 */}
        <h3 className="text-lg font-semibold text-blue-700 tracking-wide line-clamp-1">
          {category.name}
        </h3>

        {/* 分类描述 */}
        {category.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
            {category.description}
          </p>
        )}

        {/* 底部空白撑开布局 */}
        <div className="flex-grow" />
      </Link>

      {/* hover 底部亮光线 */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </motion.div>
  );
}
