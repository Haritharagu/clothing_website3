'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import Filters from '@/components/Filters'
import SortDropdown from '@/components/SortDropdown'
import Pagination from '@/components/Pagination'
import { products } from '@/data/products'

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortOption, setSortOption] = useState('newest')
  
  const productsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handleFilterChange = (filters: {
    categories: string[]
    sizes: string[]
    colors: string[]
    priceRange: [number, number]
  }) => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const sizeMatch = filters.sizes.length === 0 || filters.sizes.some(size => product.size.includes(size))
      const colorMatch = filters.colors.length === 0 || filters.colors.some(color => product.color.includes(color))
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      
      return categoryMatch && sizeMatch && colorMatch && priceMatch
    })
    
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handleSortChange = (option: string) => {
    setSortOption(option)
    let sorted = [...filteredProducts]
    
    switch (option) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        sorted.sort((a, b) => b.id - a.id)
        break
    }
    
    setFilteredProducts(sorted)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-light mb-2">Shop</h1>
            <p className="text-dark-gray">
              Showing {currentProducts.length} of {filteredProducts.length} products
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <SortDropdown onSortChange={handleSortChange} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <Filters onFilterChange={handleFilterChange} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-text-light mb-2">
                  No products found
                </h3>
                <p className="text-dark-gray">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
