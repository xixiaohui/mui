//供应商详情页

"use client";
import React, { useEffect, useState } from "react";
import { useSuppliers, Supplier } from "../../../components/hooks/useSuppliers";
import Link from "next/link";
import MultiPriceChart from "../../../components/charts/MultiPriceChart";
import { useMaterials } from "../../../components/hooks/useMaterials";
import { use } from "react"; // ✅ 新增（React 19 新API）

export default function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ 解包 Promise 参数

  const { suppliers, loading: loadingSuppliers } = useSuppliers();
  const { materials } = useMaterials();

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [supplierMaterials, setSupplierMaterials] = useState<any[]>([]);

  useEffect(() => {
    const s = suppliers.find((sup) => sup.id === id) || null;
    setSupplier(s);

    // 获取该供应商提供的材料
    const sm = materials.filter((m) => true); // TODO: 用 material_suppliers 关联表替换
    setSupplierMaterials(sm);
  }, [suppliers, id, materials]);

  if (loadingSuppliers || !supplier)
    return <p className="p-10 text-center">加载中...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      {/* 供应商基本信息 */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{supplier.name}</h1>
          <p className="text-gray-700">{supplier.description}</p>
          <p className="text-gray-500">品牌: {supplier.brand || "暂无"}</p>
          <p className="text-gray-500">地区: {supplier.region || "未知"}</p>
          {supplier.contact_email && <p>📧 {supplier.contact_email}</p>}
          {supplier.contact_phone && <p>📞 {supplier.contact_phone}</p>}
          {supplier.website && (
            <Link
              href={supplier.website}
              className="text-blue-600 underline"
              target="_blank"
            >
              官方网站
            </Link>
          )}
        </div>
      </div>

      {/* 多材料价格对比图 */}
      {supplierMaterials.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">供应材料价格趋势</h2>
          <MultiPriceChart
            materials={supplierMaterials.map((m) => ({
              id: m.id,
              name: m.name,
            }))}
          />
        </div>
      )}

      {/* 材料列表 */}
      {supplierMaterials.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">供应材料</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplierMaterials.map((m) => (
              <Link
                key={m.id}
                href={`/materials/${m.id}`}
                className="border p-4 rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-gray-500 text-sm">
                  价格: {m.price || "未知"} CNY
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
