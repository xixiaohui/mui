
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
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
import { useMultipleMaterialPrices } from "../hooks/useMultipleMaterialPrices";

interface MultiPriceChartProps {
  materials: { id: string; name: string }[];
}

const chartContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// 🎨 颜色自动分配
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];

export default function MultiPriceChart({ materials }: MultiPriceChartProps) {
  const { data, loading } = useMultipleMaterialPrices(materials.map((m) => m.id));

  if (loading)
    return <div className="text-center text-gray-500 py-10">加载中...</div>;

  if (Object.keys(data).length === 0)
    return <div className="text-center text-gray-400 py-10">暂无价格数据</div>;

  // === 合并数据 ===
  const merged: Record<string, any> = {};
  for (const [materialId, prices] of Object.entries(data)) {
    for (const p of prices) {
      if (!merged[p.date]) merged[p.date] = { date: p.date };
      merged[p.date][materialId] = p.price;
    }
  }
  const chartData = Object.values(merged).sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <motion.div
      className="w-full h-96 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow"
      initial="hidden"
      animate="visible"
      variants={chartContainerVariants}
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        多材料价格走势对比
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: "价格 (CNY)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />
          <Legend />
          {materials.map((m, i) => (
            <Line
              key={m.id}
              type="monotone"
              dataKey={m.id}
              name={m.name}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              animationDuration={800}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
