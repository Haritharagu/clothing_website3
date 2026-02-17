'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { products } from '@/data/products'
import { Product } from '@/data/products'
import Link from 'next/link'

interface SearchWithAutocompleteProps {
  placeholder?: string
  className?: string
}

export default function SearchWithAutocomplete({ 
  placeholder = "Search products...", 
  className = "" 
}: SearchWithAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Product[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setIsOpen(false)
      return
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)

    setResults(filtered)
    setIsOpen(filtered.length > 0)
  }, [query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  const handleResultClick = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(results.length > 0)}
          placeholder={placeholder}
          className="w-full input-field px-4 py-2 pr-20 rounded-sm"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-4 w-4 text-dark-gray" />
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray hover:text-text-light transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-dark-bg border border-dark-gray rounded-sm shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-center text-dark-gray">
              No products found
            </div>
          ) : (
            <div className="py-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={handleResultClick}
                  className="flex items-center space-x-4 p-3 hover:bg-dark-gray transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-12 h-12 bg-dark-gray rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-light truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-dark-gray">
                      {product.brand} • ${product.price}
                    </p>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="bg-brand-gold text-dark-bg text-xs font-medium px-2 py-1 rounded-sm">
                      {product.badge}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
