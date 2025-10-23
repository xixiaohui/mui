//推荐材料展示
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MaterialCard from "./MaterialCard";
import { supabase } from "@/lib/supabaseClient";

import { Material } from "./hooks/useMaterials";

export default function FeaturedMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6); // 只展示最新6条，可修改

      if (error) {
        console.error("获取材料失败:", error.message);
        setMaterials([]);
      } else {
        // 确保每条数据都满足 Material 类型
        setMaterials(
          (data || []).map((m: any) => ({
            id: m.id,
            name: m.name,
            category_id: m.category_id ?? null,
            brand: m.brand ?? null,
            model: m.model ?? null,
            description: m.description ?? null,
            properties: m.properties ?? null,
            image_url: m.image_url ?? null,
            region: m.region ?? null,
            created_at: m.created_at,
          }))
        );
      }
      setLoading(false);
    };

    fetchMaterials();
  }, []);

  if (loading) {
    return <p className="p-10 text-center text-gray-500">加载中...</p>;
  }

  if (materials.length === 0) {
    return <p className="p-10 text-center text-gray-500">暂无材料数据</p>;
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {materials.map((item) => (
            <motion.div
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <MaterialCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

