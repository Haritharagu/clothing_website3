'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { categories, sizes, colors } from '@/data/products'

interface FiltersProps {
  onFilterChange: (filters: {
    categories: string[]
    sizes: string[]
    colors: string[]
    priceRange: [number, number]
  }) => void
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([40, 450])

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    
    setSelectedCategories(newCategories)
    onFilterChange({
      categories: newCategories,
      sizes: selectedSizes,
      colors: selectedColors,
      priceRange
    })
  }

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size]
    
    setSelectedSizes(newSizes)
    onFilterChange({
      categories: selectedCategories,
      sizes: newSizes,
      colors: selectedColors,
      priceRange
    })
  }

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color]
    
    setSelectedColors(newColors)
    onFilterChange({
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: newColors,
      priceRange
    })
  }

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange: [number, number] = type === 'min' 
      ? [value, priceRange[1]]
      : [priceRange[0], value]
    
    setPriceRange(newRange)
    onFilterChange({
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
      priceRange: newRange
    })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([40, 450])
    onFilterChange({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [40, 450]
    })
  }

  return (
    <div className="w-full lg:w-64 space-y-8">
      {/* Clear Filters */}
      <button
        onClick={clearAllFilters}
        className="w-full btn-secondary text-sm"
      >
        Clear All Filters
      </button>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-text-light mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.name} className="flex items-center justify-between cursor-pointer">
              <span className="text-text-light hover:text-brand-gold transition-colors">
                {category.name}
              </span>
              <span className="text-dark-gray text-sm">({category.count})</span>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryToggle(category.name)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border-2 rounded ${
                selectedCategories.includes(category.name)
                  ? 'bg-brand-gold border-brand-gold'
                  : 'border-dark-gray'
              }`}>
                {selectedCategories.includes(category.name) && (
                  <div className="w-full h-full flex items-center justify-center text-dark-bg text-xs">
                    ✓
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold text-text-light mb-4">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`filter-button px-3 py-2 text-sm text-center rounded-sm ${
                selectedSizes.includes(size) ? 'active' : ''
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold text-text-light mb-4">Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorToggle(color.name)}
              className={`relative w-10 h-10 rounded-full border-2 ${
                selectedColors.includes(color.name)
                  ? 'border-brand-gold'
                  : 'border-dark-gray'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {selectedColors.includes(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-text-light mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-text-light">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
