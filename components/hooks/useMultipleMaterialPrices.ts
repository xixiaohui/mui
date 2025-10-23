// components/hooks/useMultipleMaterialPrices.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface MaterialPrice {
  id: string;
  material_id: string;
  date: string;
  price: number;
  currency: string;
}

export interface MaterialPriceMap {
  [materialId: string]: MaterialPrice[];
}

export function useMultipleMaterialPrices(materialIds: string[]) {
  const [pricesMap, setPricesMap] = useState<MaterialPriceMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 将 materialIds 稳定化，避免每次渲染触发 useEffect
  const stableIds = materialIds.join(",");

  useEffect(() => {
    if (!materialIds || materialIds.length === 0) {
      setPricesMap({});
      setLoading(false);
      return;
    }

    const fetchPrices = async () => {
      setLoading(true);
      setError(null);

      try {
        const newMap: MaterialPriceMap = {};

        // 遍历每个 materialId 查询价格
        for (const id of materialIds) {
          const { data, error } = await supabase
            .from("material_prices")
            .select("*")
            .eq("material_id", id)
            .order("date", { ascending: true });

          if (error) throw error;
          newMap[id] = data || [];
        }

        setPricesMap(newMap);
      } catch (err: any) {
        setError(err.message || "价格获取失败");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [stableIds]); // ✅ stableIds 变化才触发

  return { pricesMap, loading, error };
}
