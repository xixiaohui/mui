"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";

import { useSuppliers, Supplier } from "@/components/hooks/useSuppliers";
import { useMaterials, Material } from "@/components/hooks/useMaterials";
import { useMultipleMaterialPrices } from "@/components/hooks/useMultipleMaterialPrices";
import MultiPriceChart from "@/components/charts/MultiPriceChart";

export default function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // React 19 新 API：解包 Promise

  const { suppliers, loading: loadingSuppliers } = useSuppliers();
  const { materials, loading: loadingMaterials } = useMaterials();

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [supplierMaterials, setSupplierMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const s = suppliers.find((sup) => sup.id === id) || null;
    setSupplier(s);

    // TODO: 实际应通过 material_suppliers 表查询
    const sm = materials.filter((m) => true);
    setSupplierMaterials(sm);
  }, [suppliers, id, materials]);

  // 准备价格数据
  const { pricesMap, loading: loadingPrices } = useMultipleMaterialPrices(
    supplierMaterials.map((m) => m.id)
  );

  if (loadingSuppliers || loadingMaterials || loadingPrices) {
    return <p className="p-10 text-center text-gray-500">加载中...</p>;
  }

  if (!supplier) {
    return <p className="p-10 text-center text-red-500">未找到该供应商。</p>;
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto py-10 px-4 space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 🏢 供应商信息卡 */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 items-start bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{supplier.name}</h1>
          <p className="text-gray-600 leading-relaxed">
            {supplier.description || "该供应商暂无简介。"}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700">
            <p><strong>品牌：</strong>{supplier.brand || "暂无"}</p>
            <p><strong>地区：</strong>{supplier.region || "未知"}</p>
            {supplier.contact_email && <p><strong>邮箱：</strong>{supplier.contact_email}</p>}
            {supplier.contact_phone && <p><strong>电话：</strong>{supplier.contact_phone}</p>}
          </div>

          {supplier.website && (
            <Link
              href={supplier.website}
              target="_blank"
              className="inline-block text-blue-600 font-medium hover:underline mt-2"
            >
              🌐 访问官方网站
            </Link>
          )}
        </div>
      </motion.div>

      {/* 📈 多材料价格趋势 */}
      {supplierMaterials.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            供应材料价格趋势
          </h2>
          <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-6">
            <MultiPriceChart
              materials={supplierMaterials.map((m) => ({ id: m.id, name: m.name }))}
              pricesMap={pricesMap} // ✅ 传入价格数据
            />
          </div>
        </motion.div>
      )}

      {/* 📦 供应材料列表 */}
      {supplierMaterials.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">供应材料</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplierMaterials.map((m) => (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/materials/${m.id}`}
                  className="block bg-white/60 backdrop-blur-md border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-5 h-full"
                >
                  <h3 className="font-semibold text-gray-800">{m.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    品牌：{m.brand || "未知"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    价格：{pricesMap[m.id]?.length
                      ? `${pricesMap[m.id][pricesMap[m.id].length - 1].price} CNY`
                      : "暂无数据"}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
