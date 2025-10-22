"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMaterialPrices } from "../hooks/useMaterialPrices";

interface PriceChartProps {
  materialId: string;
  materialName?: string;
}

const chartContainerVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PriceChart({ materialId, materialName }: PriceChartProps) {
  const { prices, loading } = useMaterialPrices(materialId);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        加载中...
      </div>
    );
  }

  if (!prices.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        暂无价格数据
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-80 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow"
      initial="hidden"
      animate="visible"
      variants={chartContainerVariants}
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        {materialName || "材料"} 价格走势
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={prices}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            domain={["auto", "auto"]}
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
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#3b82f6" }}
            activeDot={{ r: 5 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
