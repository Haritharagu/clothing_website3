'use client'

import { useState } from 'react'
import { Heart, Eye } from 'lucide-react'
import { Product } from '@/data/products'
import Link from 'next/link'
import QuickView from './QuickView'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsQuickViewOpen(true)
  }

  return (
    <>
      <Link href={`/product/${product.id}`}>
        <div className="product-card group cursor-pointer">
          <div className="relative overflow-hidden">
            {/* Product Image */}
            <div className="aspect-[3/4] bg-dark-gray">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-2 left-2 bg-brand-gold text-dark-bg text-xs font-medium px-2 py-1">
                {product.badge}
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={toggleWishlist}
                className="p-2 bg-dark-bg/80 backdrop-blur-sm rounded-full text-text-light hover:text-brand-gold transition-colors"
              >
                <Heart 
                  className={`h-4 w-4 ${isWishlisted ? 'fill-brand-gold text-brand-gold' : ''}`} 
                />
              </button>
              <button
                onClick={openQuickView}
                className="p-2 bg-dark-bg/80 backdrop-blur-sm rounded-full text-text-light hover:text-brand-gold transition-colors"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-sm text-dark-gray mb-1">{product.brand}</p>
            <h3 className="font-medium text-text-light mb-2 group-hover:text-brand-gold transition-colors">
              {product.name}
            </h3>
            
            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-text-light font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-dark-gray line-through text-sm">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="text-brand-gold text-sm font-medium">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}
