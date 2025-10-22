"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export interface Supplier {
  id: string;
  name: string;
  brand: string | null;
  region: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  description: string | null;
  created_at: string;
}

interface UseSuppliersResult {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

export function useSuppliers(): UseSuppliersResult {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("suppliers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setSuppliers(data || []);
      setLoading(false);
    };
    fetchSuppliers();
  }, []);

  return { suppliers, loading, error };
}
