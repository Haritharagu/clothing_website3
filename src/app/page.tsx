import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import { products } from '@/data/products'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <HeroSection />
      
      {/* Product Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
            Featured Products
          </h2>
          <p className="text-dark-gray text-lg">
            Discover our curated selection of premium fashion pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
