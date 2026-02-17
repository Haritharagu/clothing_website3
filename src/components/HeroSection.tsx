export default function HeroSection() {
  return (
    <div className="relative h-[600px] bg-dark-gray overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/api/placeholder/1920/600"
          alt="Autumn/Winter Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-bg/60"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-text-light mb-4">
            AUTUMN/WINTER COLLECTION
          </h1>
          <p className="text-xl text-text-light/90 mb-8">
            Discover timeless elegance with our curated seasonal pieces. Premium craftsmanship meets modern design.
          </p>
          <button className="btn-primary text-lg">
            SHOP THE SALE
          </button>
        </div>
      </div>
    </div>
  )
}
