"use client";

import React, { useState, useMemo } from "react";
import { useMaterials, Material } from "@/components/hooks/useMaterials";
import { useMultipleMaterialPrices, MaterialPriceMap } from "@/components/hooks/useMultipleMaterialPrices";
import MultiPriceChart from "@/components/charts/MultiPriceChart";
import { PricesTable, PriceRow } from "@/components/prices/PricesTable";

export default function PricesPage() {
  const { materials, loading: loadingMaterials } = useMaterials();

  // 已选择的材料
  const [selectedMaterials, setSelectedMaterials] = useState<PriceRow[]>([]);

  // 获取已选择材料 ID
  const materialIds = useMemo(() => selectedMaterials.map(m => m.id), [selectedMaterials]);

  // 批量获取价格
  const { pricesMap, loading: loadingPrices } = useMultipleMaterialPrices(materialIds);

  // 切换选择状态
  const toggleSelect = (material: Material) => {
    setSelectedMaterials(prev => {
      const exists = prev.find(m => m.id === material.id);
      if (exists) return prev.filter(m => m.id !== material.id);
      return [...prev, { id: material.id, name: material.name }];
    });
  };

  if (loadingMaterials) return <p className="p-10 text-center">加载中...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">价格趋势对比</h1>

      {/* 材料选择列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {materials.map((m) => {
          const selected = selectedMaterials.some(s => s.id === m.id);
          return (
            <div
              key={m.id}
              className={`border rounded-lg p-4 cursor-pointer transition shadow hover:shadow-lg ${
                selected ? "bg-blue-50 border-blue-400" : "bg-white"
              }`}
              onClick={() => toggleSelect(m)}
            >
              <h3 className="font-semibold">{m.name}</h3>
              {m.brand && <p className="text-gray-500 text-sm">{m.brand}</p>}
              {m.region && <p className="text-gray-500 text-sm">产地：{m.region}</p>}
            </div>
          );
        })}
      </div>

      {/* 动态价格趋势图 */}
      {selectedMaterials.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">价格趋势图</h2>
          <MultiPriceChart
            materials={selectedMaterials.map(m => ({ id: m.id, name: m.name }))}
            pricesMap={pricesMap as MaterialPriceMap}
            loading={loadingPrices}
          />
        </div>
      )}

      {/* 价格表 */}
      {selectedMaterials.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">价格表</h2>
          <PricesTable
            selectedMaterials={selectedMaterials}
            pricesMap={pricesMap as MaterialPriceMap}
            loading={loadingPrices}
          />
        </div>
      )}
    </div>
  );
}
