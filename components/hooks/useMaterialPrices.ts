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

interface UseMaterialPricesResult {
  prices: MaterialPrice[];
  loading: boolean;
  error: string | null;
}

export function useMaterialPrices(materialId: string): UseMaterialPricesResult {
  const [prices, setPrices] = useState<MaterialPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!materialId) return;
    const fetchPrices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("material_prices")
        .select("*")
        .eq("material_id", materialId)
        .order("date", { ascending: true });
      if (error) setError(error.message);
      else setPrices(data || []);
      setLoading(false);
    };
    fetchPrices();
  }, [materialId]);

  return { prices, loading, error };
}
