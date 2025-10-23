"use client";

import { useEffect, useState } from "react";

import MaterialCard from "@/components/MaterialCard";
import SupplierCard from "@/components/SupplierCard";
import CatCard from "@/components/CatCard";

import { supabase } from "@/lib/supabaseClient";

import { Material } from "@/components/hooks/useMaterials";
import { Supplier } from "@/components/hooks/useSuppliers";
import { Category } from "@/components/hooks/useCategories";

export default function DashboardPage() {

  const [materials, setMaterials] = useState<Material[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({ materials: 0, suppliers: 0, categories: 0 });

  useEffect(() => {
    async function fetchData() {
      const [matRes, supRes, catRes] = await Promise.all([
        supabase.from("materials").select("*").limit(6),
        supabase.from("suppliers").select("*").limit(6),
        supabase.from("material_categories").select("id,name,description").limit(6),
      ]);

      setMaterials(matRes.data || []);
      setSuppliers(supRes.data || []);
      setCategories(catRes.data || []);
      setStats({
        materials: matRes.count ?? matRes.data?.length ?? 0,
        suppliers: supRes.count ?? supRes.data?.length ?? 0,
        categories: catRes.count ?? catRes.data?.length ?? 0,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* 顶部标题 */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">仪表盘总览</h1>
          <p className="text-gray-600">
            查看平台的原材料、供应商与分类导航概况。
          </p>
        </header>

        {/* 概览统计卡 */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-blue-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">材料总数</h3>
            <p className="text-3xl font-semibold text-blue-600">{stats.materials}</p>
          </div>
          <div className="bg-white border border-cyan-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">供应商数</h3>
            <p className="text-3xl font-semibold text-cyan-600">{stats.suppliers}</p>
          </div>
          <div className="bg-white border border-teal-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">分类数</h3>
            <p className="text-3xl font-semibold text-teal-600">{stats.categories}</p>
          </div>
        </section>

        {/* 材料区块 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">最新材料</h2>
            <a href="/materials" className="text-blue-600 hover:underline text-sm">
              查看全部 →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((m) => (
              <MaterialCard key={m.id} {...m}/>
            ))}
          </div>
        </section>

        {/* 供应商区块 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">推荐供应商</h2>
            <a href="/suppliers" className="text-cyan-600 hover:underline text-sm">
              查看全部 →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {suppliers.map((s) => (
              <SupplierCard key={s.id} {...s}/>
            ))}
          </div>
        </section>

        {/* 分类导航区块 */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">分类导航</h2>
            <a href="/categories" className="text-teal-600 hover:underline text-sm">
              查看全部 →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {categories.map((c) => (
              <CatCard key={c.id} category={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
