"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react'
import { useBeeStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useBeeStore()
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleWhatsAppOrder = () => {
    const phoneNumber = '5511999999999' // Use the official studio number
    const intro = "Olá! Tenho interesse nas seguintes peças do ateliê: 🐝\n\n"
    const items = cart.map(item => `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')
    const total = `\n\nTotal estimado: R$ ${subtotal.toFixed(2)}`
    const outro = "\n\nComo podemos prosseguir com a encomenda?"
    
    const fullMessage = encodeURIComponent(intro + items + total + outro)
    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl font-bold text-primary">Lista de Interesse</h2>
                <span className="bg-honey text-purple-deep px-2 py-0.5 rounded-full text-xs font-bold">
                  {cart.length}
                </span>
              </div>
              <button onClick={toggleCart} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Sua lista está vazia</h3>
                  <p className="text-muted-foreground mb-8">Escolha as peças que mais tocaram seu coração.</p>
                  <Button onClick={toggleCart} variant="secondary" className="rounded-full px-8">
                    Ver Catálogo
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border/50"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-border/50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-primary truncate">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-muted rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-purple-deep">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-border space-y-4">
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Subtotal Estimado</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  O valor final e o frete serão combinados via WhatsApp.
                </p>
                <Button 
                  onClick={handleWhatsAppOrder}
                  className="w-full h-14 rounded-full text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Encomendar via WhatsApp 🐝
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
