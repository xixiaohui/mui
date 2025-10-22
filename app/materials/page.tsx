// 材料列表页（支持搜索/筛选）
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMaterials } from "../../components/hooks/useMaterials"
import { useCategories } from "../../components/hooks/useCategories";

export default function MaterialsPage() {
  const { materials, loading, error } = useMaterials();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  if (loading) return <p className="p-10 text-center">加载中...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  const filteredMaterials = selectedCategory
    ? materials.filter((m) => m.category_id === selectedCategory)
    : materials;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">材料列表</h1>

      {/* 分类筛选 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-lg border ${
            selectedCategory === "" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === cat.id ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 材料列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((m) => (
          <Link
            key={m.id}
            href={`/materials/${m.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={m.image_url || "/placeholder.png"}
              alt={m.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg">{m.name}</h3>
            <p className="text-sm text-gray-500">{m.region}</p>
            <p className="text-sm mt-1 text-gray-600 truncate">{m.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
