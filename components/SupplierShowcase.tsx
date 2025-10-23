//合作品牌展示

"use client";

import { motion } from "framer-motion";
import SupplierCard from "./SupplierCard";
import { supabase } from "@/lib/supabaseClient";

import { Supplier } from "./hooks/useSuppliers";
import { useEffect, useState } from "react";

export default function SupplierShowcase() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from("suppliers")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6); // 只展示最新6条，可修改

      if (error) {
        console.error("获取材料失败:", error.message);
        setSuppliers([]);
      } else {
        // 确保每条数据都满足 Material 类型
        setSuppliers(
          (data || []).map((m: any) => ({
            id: m.id,
            name: m.name,
            brand: m.brand ?? null,
            region: m.region ?? null,
            contact_email: m.contact_email ?? null,
            contact_phone: m.contact_phone ?? null,
            website: m.website ?? null,
            description: m.description ?? null,
            created_at: m.created_at ?? null,
          }))
        );
      }
      setLoading(false);
    };

    fetchSuppliers();
  }, []);

  if (loading) {
    return <p className="p-10 text-center text-gray-500">加载中...</p>;
  }

  if (suppliers.length === 0) {
    return <p className="p-10 text-center text-gray-500">暂无材料数据</p>;
  }

  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {suppliers.map((s) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <SupplierCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
