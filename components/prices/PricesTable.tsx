"use client";

import React from "react";
import { MaterialPriceMap } from "@/components/hooks/useMultipleMaterialPrices";

export interface PriceRow {
  id: string;
  name: string;
  highlight?: boolean; // 可选：高亮行
}

interface PricesTableProps {
  selectedMaterials: PriceRow[];
  pricesMap: MaterialPriceMap;
  loading?: boolean;
}

export const PricesTable: React.FC<PricesTableProps> = ({
  selectedMaterials,
  pricesMap,
  loading = false,
}) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              材料名称
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              最新价格 (CNY)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              平均价格 (CNY)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading && (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                加载中...
              </td>
            </tr>
          )}

          {!loading && selectedMaterials.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                请选择材料进行对比
              </td>
            </tr>
          )}

          {!loading &&
            selectedMaterials.map(m => {
              const prices = pricesMap[m.id] || [];
              const latestPrice = prices.length ? prices[prices.length - 1].price : null;
              const avgPrice =
                prices.length > 0
                  ? (prices.reduce((acc, p) => acc + p.price, 0) / prices.length).toFixed(2)
                  : null;

              return (
                <tr
                  key={m.id}
                  className={`transition ${
                    m.highlight ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{m.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {latestPrice !== null ? latestPrice.toFixed(2) : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{avgPrice || "-"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
