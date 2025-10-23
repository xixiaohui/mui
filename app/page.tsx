//首页：AI选材入口

// ┌────────────────────────────────────┐
// │ 🧠 [LOGO] SmartMaterial.AI          │
// │------------------------------------│
// │   “AI智能选材，为工业决策提效”       │
// │   [输入框：请输入性能或用途]         │
// │   [按钮：立即推荐]                  │
// │------------------------------------│
// │   🧩 材料分类：玻璃纤维 | 碳纤维 | 树脂... │
// │------------------------------------│
// │   🔍 推荐材料卡片（示例展示）         │
// │------------------------------------│
// │   🏭 合作供应商 / 品牌展示            │
// │------------------------------------│
// │   © 2025 SmartMaterial.AI           │
// └────────────────────────────────────┘

"use client";

import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";
import FeaturedMaterials from "../components/FeaturedMaterials";
import SupplierShowcase from "../components/SupplierShowcase";
import FooterMaterial from "@/components/FooterMaterial";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* 顶部 AI 搜索区 */}
      <HeroSection />

      {/* 分类导航 */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-semibold mb-6">分类导航</h2>
        <CategoryList />
      </section>

      {/* 推荐材料 */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-6">推荐材料</h2>
        <FeaturedMaterials />
      </section>

      {/* 供应商展示 */}
      <section className="max-w-6xl mx-auto px-4 mt-16 mb-20">
        <h2 className="text-2xl font-semibold mb-6">合作供应商</h2>
        <SupplierShowcase />
      </section>

      {/* 页脚 */}
      <footer className="text-center text-sm text-gray-500 py-10">
        
        <FooterMaterial></FooterMaterial>
      </footer>
    </main>
  );
}
