'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-sm transition-colors ${
          currentPage === 1
            ? 'text-dark-gray cursor-not-allowed'
            : 'text-text-light hover:text-brand-gold hover:bg-dark-gray'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-text-light hover:text-brand-gold hover:bg-dark-gray rounded-sm transition-colors"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-dark-gray">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-sm transition-colors ${
            page === currentPage
              ? 'bg-brand-gold text-dark-bg font-medium'
              : 'text-text-light hover:text-brand-gold hover:bg-dark-gray'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-dark-gray">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-text-light hover:text-brand-gold hover:bg-dark-gray rounded-sm transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-sm transition-colors ${
          currentPage === totalPages
            ? 'text-dark-gray cursor-not-allowed'
            : 'text-text-light hover:text-brand-gold hover:bg-dark-gray'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
