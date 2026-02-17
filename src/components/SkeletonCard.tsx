export default function SkeletonCard() {
  return (
    <div className="product-card animate-pulse">
      <div className="aspect-[3/4] bg-dark-gray rounded-sm mb-4" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-dark-gray rounded w-1/4" />
        <div className="h-4 bg-dark-gray rounded w-3/4" />
        <div className="h-4 bg-dark-gray rounded w-1/2" />
      </div>
    </div>
  )
}
