"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MaterialPrice, MaterialPriceMap } from "@/components/hooks/useMultipleMaterialPrices";

interface ChartMaterial {
  id: string;
  name: string;
}

interface MultiPriceChartProps {
  materials: ChartMaterial[];
  pricesMap: MaterialPriceMap;
  loading?: boolean;
}

export default function MultiPriceChart({
  materials,
  pricesMap,
  loading = false,
}: MultiPriceChartProps) {
  if (loading) return <p className="p-4 text-center">加载中...</p>;
  if (materials.length === 0) return <p className="p-4 text-center">请选择材料</p>;

  // 合并日期为横坐标，生成每一天的数据对象
  const allDates = Array.from(
    new Set(
      materials.flatMap(m => (pricesMap[m.id] || []).map(p => p.date))
    )
  ).sort();

  const chartData = allDates.map(date => {
    const obj: Record<string, any> = { date };
    materials.forEach(m => {
      const priceObj = (pricesMap[m.id] || []).find(p => p.date === date);
      obj[m.name] = priceObj?.price ?? null;
    });
    return obj;
  });

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {materials.map((m, i) => (
          <Line
            key={m.id}
            type="monotone"
            dataKey={m.name}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
