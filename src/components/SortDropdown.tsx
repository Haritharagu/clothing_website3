'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SortDropdownProps {
  onSortChange: (sortOption: string) => void
}

const sortOptions = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'alphabetical', label: 'Alphabetical' }
]

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('newest')

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option.value)
    onSortChange(option.value)
    setIsOpen(false)
  }

  const selectedLabel = sortOptions.find(option => option.value === selectedOption)?.label

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-dark-gray text-text-light hover:border-brand-gold transition-colors"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-dark-bg border border-dark-gray rounded-sm shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-dark-gray transition-colors ${
                selectedOption === option.value ? 'text-brand-gold' : 'text-text-light'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
