'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { products } from '@/data/products'
import { Heart, Minus, Plus, Truck, Shield, RefreshCw, Maximize2 } from 'lucide-react'
import ImageZoom, { FullscreenZoom } from '@/components/ImageZoom'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const product = products.find(p => p.id === productId)
  const { addToCart } = useCart()
  
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFullscreenZoom, setIsFullscreenZoom] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-light mb-4">Product Not Found</h1>
            <p className="text-dark-gray mb-8">The product you're looking for doesn't exist.</p>
            <a href="/shop" className="btn-primary">Continue Shopping</a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    addToCart(product, quantity, selectedSize, selectedColor)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-dark-gray rounded-sm overflow-hidden relative group">
              <ImageZoom
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full"
              />
              <button
                onClick={() => setIsFullscreenZoom(true)}
                className="absolute top-4 right-4 p-2 bg-dark-bg/80 backdrop-blur-sm rounded-full text-text-light hover:text-brand-gold transition-colors opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-dark-gray rounded-sm overflow-hidden transition-all ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-brand-gold' 
                      : 'hover:border hover:border-brand-gold'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-dark-gray text-sm mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-text-light mb-4">{product.name}</h1>
              
              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-semibold text-brand-gold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-dark-gray line-through">${product.originalPrice}</span>
                    <span className="bg-brand-gold text-dark-bg text-sm font-medium px-2 py-1 rounded-sm">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-text-light font-medium mb-3">Color: {selectedColor || 'Select'}</h3>
              <div className="flex flex-wrap gap-2">
                {product.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-brand-gold ring-2 ring-brand-gold/50'
                        : 'border-dark-gray hover:border-brand-gold'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() === 'black' ? '#000000' : 
                                          color.toLowerCase() === 'beige' ? '#F5F5DC' :
                                          color.toLowerCase() === 'tan' ? '#D2B48C' :
                                          color.toLowerCase() === 'blue' ? '#0000FF' :
                                          color.toLowerCase() === 'gray' ? '#808080' :
                                          color.toLowerCase() === 'red' ? '#FF0000' : '#4A4A4A' }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-text-light font-medium mb-3">Size: {selectedSize || 'Select'}</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`filter-button py-3 text-center ${
                      selectedSize === size ? 'active' : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-text-light font-medium mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-dark-gray text-text-light hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-text-light font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-dark-gray text-text-light hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-4"
              >
                Add to Cart
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={toggleWishlist}
                  className={`flex-1 btn-secondary flex items-center justify-center space-x-2 ${
                    isWishlisted ? 'bg-brand-gold text-dark-bg' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-dark-gray pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-brand-gold" />
                <span className="text-text-light text-sm">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-brand-gold" />
                <span className="text-text-light text-sm">2-year warranty on all products</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-brand-gold" />
                <span className="text-text-light text-sm">30-day return policy</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-dark-gray pt-6">
              <h3 className="text-text-light font-medium mb-3">Description</h3>
              <p className="text-dark-gray leading-relaxed">
                Experience the perfect blend of modern elegance and timeless design with this premium piece from our {product.brand} collection. 
                Crafted with attention to detail and using only the finest materials, this item embodies the sophisticated aesthetic that defines Aura Fashion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Fullscreen Zoom Modal */}
      <FullscreenZoom
        src={productImages[selectedImageIndex]}
        alt={product.name}
        isOpen={isFullscreenZoom}
        onClose={() => setIsFullscreenZoom(false)}
      />
    </div>
  )
}
