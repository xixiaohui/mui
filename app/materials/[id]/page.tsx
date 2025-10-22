"use client";
import React from "react";
import { useMaterials } from "../../../components/hooks/useMaterials"
import { useSuppliers } from "../../../components/hooks/useSuppliers";
import MultiPriceChart from "../../../components/charts/MultiPriceChart";
import Link from "next/link";

interface MaterialDetailProps {
  params: { id: string };
}

export default function MaterialDetailPage({ params }: MaterialDetailProps) {
  const { materials, loading: loadingMaterials } = useMaterials();
  const { suppliers, loading: loadingSuppliers } = useSuppliers();

  if (loadingMaterials || loadingSuppliers)
    return <p className="p-10 text-center">加载中...</p>;

  const material = materials.find((m) => m.id === params.id);
  if (!material) return <p className="p-10 text-center text-red-500">材料未找到</p>;

  // 假设 materialSuppliers 通过 material_suppliers 关联表关联
  const materialSuppliers = suppliers.filter((s) => true); // TODO: 用 hook 获取实际关联

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">

      {/* 上半部分：材料信息卡片 */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={material.image_url || "/default-material.jpg"}
          alt={material.name}
          className="w-full md:w-96 h-72 object-cover rounded-lg shadow"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{material.name}</h1>
          <p className="text-gray-700">{material.description}</p>

          {material.properties && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(material.properties).map(([k, v]) => (
                <div key={k} className="bg-gray-50 p-2 rounded shadow-sm text-sm">
                  <strong>{k}:</strong> {v}
                </div>
              ))}
            </div>
          )}

          <p className="text-gray-500">产地: {material.region || "未知"}</p>
        </div>
      </div>

      {/* 下半部分：价格趋势 + 供应商 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 左两列：多材料价格对比图 */}
        <div className="md:col-span-2">
          <MultiPriceChart
            materials={[
              { id: material.id, name: material.name },
              // 可以扩展：其他品牌或相似材料
            ]}
          />
        </div>

        {/* 右一列：供应商信息 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">供应商</h2>
          {materialSuppliers.length ? (
            materialSuppliers.map((s) => (
              <Link
                key={s.id}
                href={s.website || "#"}
                className="block border p-4 rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-gray-500 text-sm">{s.region}</p>
                <p className="text-gray-400 text-sm">{s.brand}</p>
                {s.contact_email && <p className="text-sm mt-1">📧 {s.contact_email}</p>}
                {s.contact_phone && <p className="text-sm">📞 {s.contact_phone}</p>}
              </Link>
            ))
          ) : (
            <p className="text-gray-400">暂无供应商信息</p>
          )}
        </div>
      </div>
    </div>
  );
}
