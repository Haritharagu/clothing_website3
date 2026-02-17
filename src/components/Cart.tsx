'use client'

import { useState } from 'react'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state, updateQuantity, removeFromCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-dark-bg shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-dark-gray">
            <h2 className="text-xl font-semibold text-text-light">
              Shopping Cart ({state.itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-text-light hover:text-brand-gold transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-dark-gray mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="btn-primary"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 border border-dark-gray rounded-sm">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-dark-gray rounded-sm flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium text-text-light text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-dark-gray text-xs mb-2">
                        {item.brand} • Size: {item.selectedSize} • Color: {item.selectedColor}
                      </p>
                      <p className="text-brand-gold font-medium">
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-text-light hover:text-brand-gold transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-text-light text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-text-light hover:text-brand-gold transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-dark-gray hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-dark-gray p-4 space-y-4">
              <div className="flex justify-between text-text-light">
                <span>Subtotal</span>
                <span className="font-semibold">${state.total.toFixed(2)}</span>
              </div>
              <button className="w-full btn-primary">
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
