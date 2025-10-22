"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export interface MaterialPrice {
  id: string;
  material_id: string;
  date: string;
  price: number;
  currency: string;
}

interface UseMultiplePricesResult {
  data: Record<string, MaterialPrice[]>; // material_id -> prices[]
  loading: boolean;
}

export function useMultipleMaterialPrices(materialIds: string[]): UseMultiplePricesResult {
  const [data, setData] = useState<Record<string, MaterialPrice[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!materialIds?.length) return;

    const fetchAll = async () => {
      setLoading(true);

      const result: Record<string, MaterialPrice[]> = {};

      for (const id of materialIds) {
        const { data, error } = await supabase
          .from("material_prices")
          .select("*")
          .eq("material_id", id)
          .order("date", { ascending: true });

        if (!error && data) result[id] = data;
      }

      setData(result);
      setLoading(false);
    };

    fetchAll();
  }, [JSON.stringify(materialIds)]);

  return { data, loading };
}
