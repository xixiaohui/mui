"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMaterials } from "../../../components/hooks/useMaterials";
import { useSuppliers } from "../../../components/hooks/useSuppliers";
import { useMultipleMaterialPrices } from "../../../components/hooks/useMultipleMaterialPrices";
import MultiPriceChart from "../../../components/charts/MultiPriceChart";
import Link from "next/link";
import { use } from "react";

export default function MaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // 解包 Promise 参数
  const { materials, loading: loadingMaterials } = useMaterials();
  const { suppliers, loading: loadingSuppliers } = useSuppliers();

  const [material, setMaterial] = useState<any | null>(null);
  const [materialSuppliers, setMaterialSuppliers] = useState<any[]>([]);

  useEffect(() => {
    if (!materials || !suppliers) return;

    const m = materials.find((mat) => mat.id === id) || null;
    setMaterial(m);

    // TODO: 后续用 material_suppliers 表查询
    setMaterialSuppliers(suppliers.filter((s) => true));
  }, [materials, suppliers, id]);

  // 获取多材料价格
  const { pricesMap, loading: loadingPrices } = useMultipleMaterialPrices(
    material ? [material.id] : []
  );

  if (loadingMaterials || loadingSuppliers)
    return (
      <motion.p className="p-10 text-center text-gray-500"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        加载中...
      </motion.p>
    );

  if (!material)
    return (
      <motion.p className="p-10 text-center text-red-500"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        材料未找到
      </motion.p>
    );

  return (
    <motion.div
      className="max-w-7xl mx-auto py-10 px-4 space-y-10 text-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* 🧱 材料信息卡片 */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 items-start bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <motion.img
          src={material.image_url || "/default-material.jpg"}
          alt={material.name}
          className="w-full md:w-96 h-72 object-cover rounded-lg shadow-lg border border-gray-700"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="flex-1 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-cyan-400">{material.name}</h1>
          <p className="text-gray-400">{material.description}</p>

          {material.properties && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(material.properties).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white/5 p-2 rounded-lg shadow-sm text-sm border border-gray-700"
                >
                  <strong>{k}:</strong> {String(v)}
                </div>
              ))}
            </div>
          )}

          <p className="text-gray-500">🌍 产地: {material.region || "未知"}</p>
        </motion.div>
      </motion.div>

      {/* 📈 下半部分：价格趋势 + 供应商 */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 左两列：价格趋势 */}
        <motion.div
          className="md:col-span-2 p-4 bg-white/10 border border-gray-700 rounded-xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">📊 价格趋势对比</h2>
          {!loadingPrices ? (
            <MultiPriceChart
              materials={[{ id: material.id, name: material.name }]}
              pricesMap={pricesMap}
            />
          ) : (
            <p className="text-gray-400 text-center">加载价格数据中...</p>
          )}
        </motion.div>

        {/* 右一列：供应商 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-cyan-300">🏭 供应商</h2>
          {materialSuppliers.length ? (
            materialSuppliers.map((s, idx) => (
              <motion.div
                key={s.id}
                className="border border-gray-700 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <h3 className="font-semibold text-white">{s.name}</h3>
                <p className="text-gray-400 text-sm">{s.region}</p>
                {s.brand && <p className="text-gray-500 text-sm mb-1">品牌: {s.brand}</p>}
                {s.contact_email && <p className="text-gray-400 text-xs">📧 {s.contact_email}</p>}
                {s.contact_phone && <p className="text-gray-400 text-xs">📞 {s.contact_phone}</p>}
                {s.website && (
                  <Link href={s.website} target="_blank" className="text-cyan-400 text-sm">
                    官网 →
                  </Link>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">暂无供应商信息</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
