"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "2025-01", price: 2300 },
  { date: "2025-02", price: 2800 },
  { date: "2025-03", price: 2600 },
  { date: "2025-04", price: 3000 },
];

export default function TestRecharts() {
  return (
    <div className="w-full h-[400px] p-6">
      <h2 className="text-xl font-semibold mb-4">Recharts 折线图测试</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
