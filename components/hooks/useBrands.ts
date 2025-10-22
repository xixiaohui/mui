"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export interface Brand {
  id: number;
  name: string;
  country: string | null;
  website: string | null;
}

interface UseBrandsResult {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

export function useBrands(): UseBrandsResult {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("material_brands")
        .select("*")
        .order("id", { ascending: true });
      if (error) setError(error.message);
      else setBrands(data || []);
      setLoading(false);
    };
    fetchBrands();
  }, []);

  return { brands, loading, error };
}
