import PriceChart from "../components/charts/PriceChart";

export default function MaterialDetailPage({ materialId }: { materialId: string }) {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <PriceChart materialId={materialId} materialName="碳纤维布" />
    </div>
  );
}