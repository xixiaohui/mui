// hooks/useMaterialSuppliers.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { Material } from "./useMaterials";
import { Supplier } from "./useSuppliers";


export interface MaterialSupplier {
  material: Material;
  supplier: Supplier;
}

export function useMaterialSuppliers(options?: { materialId?: string }) {
  const [data, setData] = useState<MaterialSupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // 关联查询：materials_suppliers 中间表
        let query = supabase
          .from("materials_suppliers")
          .select(
            `
            material:materials (
              id, name, category, brand, description, image_url
            ),
            supplier:suppliers (
              id, name, country, website, contact_email
            )
          `
          );

        if (options?.materialId) {
          query = query.eq("material_id", options.materialId);
        }

        const { data, error } = await query;

        if (error) throw error;

        // ✅ 解包 Supabase 的嵌套数组
        const mapped =
          data?.map((item: any) => ({
            material: Array.isArray(item.material)
              ? item.material[0]
              : item.material,
            supplier: Array.isArray(item.supplier)
              ? item.supplier[0]
              : item.supplier,
          })) ?? [];

        setData(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [options?.materialId]);

  return { data, loading, error };
}
