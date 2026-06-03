"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useBeeStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Heart, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { usePublicProducts } from '@/hooks/use-products'

export default function FavoritesPage() {
  const [mounted, setMounted] = useState(false)
  const { favorites } = useBeeStore()
  const { data: products = [], isLoading } = usePublicProducts()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const favoriteProducts = useMemo(() => {
    if (!mounted) return []
    return products.filter(p => favorites.includes(p.id))
  }, [favorites, products, mounted])

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex p-4 bg-honey/10 rounded-full mb-6 text-honey">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-4">Meus Favoritos</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Sua coleção pessoal de peças que ganharam seu coração.
            </p>
          </motion.div>

          {isLoading || !mounted ? (
            <div className="flex flex-col items-center justify-center py-32 text-primary">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="font-medium">Buscando seus favoritos...</p>
            </div>
          ) : favoriteProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border border-dashed border-border">
              <h3 className="text-2xl font-bold text-primary mb-4">Sua lista está vazia</h3>
              <p className="text-muted-foreground mb-10">Que tal explorar nosso catálogo e escolher seu primeiro amigurumi?</p>
              <Link href="/catalogo">
                <Button size="lg" className="rounded-full px-10">
                  Explorar Catálogo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode='popLayout'>
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
