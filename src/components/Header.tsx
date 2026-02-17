'use client'

import { useState } from 'react'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import Cart from './Cart'
import SearchWithAutocomplete from './SearchWithAutocomplete'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-bg border-b border-dark-gray">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-brand-gold">AURA</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/shop" className="text-text-light hover:text-brand-gold transition-colors">Shop</a>
              <a href="/collections" className="text-text-light hover:text-brand-gold transition-colors">Collections</a>
              <a href="/new-arrivals" className="text-text-light hover:text-brand-gold transition-colors">New Arrivals</a>
              <a href="/sale" className="text-text-light hover:text-brand-gold transition-colors">Sale</a>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <SearchWithAutocomplete />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="text-text-light hover:text-brand-gold transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-dark-bg text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {state.itemCount}
                  </span>
                )}
              </button>
              <button className="text-text-light hover:text-brand-gold transition-colors">
                <User className="h-5 w-5" />
              </button>
              <button 
                className="md:hidden text-text-light hover:text-brand-gold transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-dark-gray">
              <nav className="flex flex-col space-y-4">
                <a href="/shop" className="text-text-light hover:text-brand-gold transition-colors">Shop</a>
                <a href="/collections" className="text-text-light hover:text-brand-gold transition-colors">Collections</a>
                <a href="/new-arrivals" className="text-text-light hover:text-brand-gold transition-colors">New Arrivals</a>
                <a href="/sale" className="text-text-light hover:text-brand-gold transition-colors">Sale</a>
                <div className="pt-4">
                  <SearchWithAutocomplete />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
