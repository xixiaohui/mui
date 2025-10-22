"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export interface Material {
  id: string;
  name: string;
  category_id: string | null;
  brand: string | null;
  model: string | null;
  description: string | null;
  properties: Record<string, string> | null;
  image_url: string | null;
  region: string | null;
  created_at: string;
}

interface UseMaterialsResult {
  materials: Material[];
  loading: boolean;
  error: string | null;
}

export function useMaterials(categoryId?: string): UseMaterialsResult {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      let query = supabase.from("materials").select("*");
      if (categoryId) query = query.eq("category_id", categoryId);
      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setMaterials(data || []);
      setLoading(false);
    };

    fetchMaterials();
  }, [categoryId]);

  return { materials, loading, error };
}
