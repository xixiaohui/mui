"use client";

import React, { useState, useMemo } from "react";
import { useMaterials } from "@/components/hooks/useMaterials";
import { useCategories } from "@/components/hooks/useCategories";
import { use } from "react";
import { motion } from "framer-motion";
import PriceChart from "@/components/charts/PriceChart";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // React 19 新 API 解包
  const { categories } = useCategories();
  const { materials } = useMaterials();

  // 当前分类
  const category = categories.find((c) => c.id === id);

  // 当前分类的所有材料
  const categoryMaterials = useMemo(
    () => materials.filter((m) => m.category_id === id),
    [materials, id]
  );

  // 搜索 & 筛选状态
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  // 过滤逻辑
  const filteredMaterials = useMemo(() => {
    return categoryMaterials.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.brand || "").toLowerCase().includes(search.toLowerCase());
      const matchBrand = selectedBrand === "all" || m.brand === selectedBrand;
      const matchRegion =
        selectedRegion === "all" || m.region === selectedRegion;
      return matchSearch && matchBrand && matchRegion;
    });
  }, [categoryMaterials, search, selectedBrand, selectedRegion]);

  // 动态生成品牌 & 产地列表
  const brands = Array.from(
    new Set(categoryMaterials.map((m) => m.brand).filter(Boolean))
  );
  const regions = Array.from(
    new Set(categoryMaterials.map((m) => m.region).filter(Boolean))
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold">{category?.name}</h1>
      {category?.description && (
        <p className="text-gray-600">{category.description}</p>
      )}

      {/* 搜索 & 筛选 */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
        <input
          type="text"
          placeholder="搜索名称/品牌"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">全部品牌</option>
          {brands.map((b) => (
            <option key={b!} value={b!}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">全部产地</option>
          {regions.map((r) => (
            <option key={r!} value={r!}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* 材料卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {filteredMaterials.map((m, index) => (
          <motion.div
            key={m.id}
            className="group border rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            onClick={() =>
              setSelectedMaterial(selectedMaterial === m.id ? null : m.id)
            }
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={m.image_url || "/default-material.jpg"}
                alt={m.name}
                className="object-cover w-full h-full transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{m.name}</h3>
              {m.brand && <p className="text-gray-500 text-sm">{m.brand}</p>}
              {m.region && (
                <p className="text-gray-500 text-sm">产地：{m.region}</p>
              )}
            </div>

            {/* 动态价格趋势图 */}
            {selectedMaterial === m.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-gray-50">
                  <PriceChart materialId= {m.id} materialName= {m.name} />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <p className="text-gray-500 text-center mt-8">暂无材料数据</p>
      )}
    </div>
  );
}
