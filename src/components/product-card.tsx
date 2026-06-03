"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Eye, Star, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBeeStore } from '@/lib/store'
import Link from 'next/link'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  tag?: string
}

interface ProductCardProps {
  product: Product
  className?: string
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const [mounted, setMounted] = useState(false)
  const { addToCart, toggleFavorite, isFavorite, toggleCart } = useBeeStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const favorite = mounted ? isFavorite(product.id) : false

  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toggleCart()
  }

  const handleWhatsAppDirect = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const phoneNumber = '5511999999999'
    const message = encodeURIComponent(`Olá! Tenho interesse no amigurumi: ${product.name} 🐝`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className={cn("group/card relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50", className)}
    >
      {/* Image Container */}
      <Link href={`/catalogo/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted cursor-pointer group/image">
           <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
          />

          {product.tag && (
            <div className="absolute top-5 left-5 z-10 px-3 py-1 bg-honey text-purple-deep text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg pointer-events-none">
              {product.tag}
            </div>
          )}
          
          <button 
            onClick={handleFavorite}
            className={cn(
              "absolute top-5 right-5 z-20 p-2.5 rounded-full transition-all duration-300 shadow-md",
              favorite ? "bg-honey text-purple-deep" : "bg-white/80 backdrop-blur-sm text-primary hover:bg-white"
            )}
          >
            <Heart className={cn("w-4 h-4", favorite && "fill-current")} />
          </button>

          {/* Mobile Quick Add Button (Floating) */}
          <div className="absolute bottom-3 right-3 z-20 md:hidden">
            <Button 
              onClick={handleAddToList}
              size="icon" 
              variant="secondary" 
              className="rounded-full shadow-xl w-10 h-10 bg-white/90 backdrop-blur-sm text-primary"
            >
              <ClipboardList className="w-5 h-5" />
            </Button>
          </div>

          {/* Desktop Quick Add Overlay */}
          <div className="absolute inset-0 bg-purple-deep/20 opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center gap-3 z-10">
            <Button 
              onClick={handleAddToList}
              size="icon" 
              variant="secondary" 
              className="rounded-full scale-0 md:group-hover/card:scale-100 transition-transform duration-500 delay-75 shadow-xl w-10 h-10"
              title="Adicionar à Lista"
            >
              <ClipboardList className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full scale-0 md:group-hover/card:scale-100 transition-transform duration-500 delay-150 shadow-xl w-10 h-10"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-6">
        <Link href={`/catalogo/${product.id}`} className="block group/text">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-honey fill-current" />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">(5.0)</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">
            {product.category}
          </span>
          <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover/text:text-secondary transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-purple-deep">
            R$ {product.price.toFixed(2)}
          </span>
          <Button 
            onClick={handleWhatsAppDirect}
            variant="ghost" 
            className="text-[10px] font-bold uppercase tracking-widest hover:text-secondary p-0 h-auto flex items-center gap-2"
          >
            Encomendar <MessageCircle className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
