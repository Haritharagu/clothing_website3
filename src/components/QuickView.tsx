'use client'

import { useState } from 'react'
import { X, Heart, Minus, Plus } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    addToCart(product, quantity, selectedSize, selectedColor)
    onClose()
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-dark-bg max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-gray">
            <h2 className="text-xl font-semibold text-text-light">Quick View</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-light hover:text-brand-gold transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="aspect-[3/4] bg-dark-gray rounded-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <p className="text-dark-gray text-sm mb-2">{product.brand}</p>
                <h3 className="text-2xl font-bold text-text-light mb-4">{product.name}</h3>
                
                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-xl font-semibold text-brand-gold">${product.price}</span>
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
                <h4 className="text-text-light font-medium mb-3">Color: {selectedColor || 'Select'}</h4>
                <div className="flex flex-wrap gap-2">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
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
                <h4 className="text-text-light font-medium mb-3">Size: {selectedSize || 'Select'}</h4>
                <div className="grid grid-cols-6 gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`filter-button py-2 text-center text-sm ${
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
                <h4 className="text-text-light font-medium mb-3">Quantity</h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-dark-gray text-text-light hover:border-brand-gold hover:text-brand-gold transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-text-light font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-dark-gray text-text-light hover:border-brand-gold hover:text-brand-gold transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary"
                >
                  Add to Cart
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={toggleWishlist}
                    className={`flex-1 btn-secondary flex items-center justify-center space-x-2 text-sm ${
                      isWishlisted ? 'bg-brand-gold text-dark-bg' : ''
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                  <button
                    onClick={() => window.location.href = `/product/${product.id}`}
                    className="flex-1 btn-secondary text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-dark-gray">
                <p className="text-dark-gray text-sm leading-relaxed">
                  Experience the perfect blend of modern elegance and timeless design with this premium piece from our {product.brand} collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
