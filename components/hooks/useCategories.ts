"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("material_categories")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) setError(error.message);
      else setCategories(data || []);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
