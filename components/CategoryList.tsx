//材料分类导航

"use client";
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Category } from "./hooks/useCategories";
import  CatCard  from "@/components/CatCard"


export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("material_categories")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) console.error("加载分类失败:", error);
      setCategories(data || []);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <p className="text-gray-400 text-center py-10 animate-pulse">
        分类加载中...
      </p>
    );

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {categories.map((cat) => (
        <motion.div
          key={cat.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <CatCard category={cat} />
        </motion.div>
      ))}
    </motion.div>
  );
}
