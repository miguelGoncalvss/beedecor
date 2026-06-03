"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Search, ArrowUpDown, Loader2 } from 'lucide-react'
import { usePublicProducts } from '@/hooks/use-products'
import { useCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  
  const { data: products = [], isLoading } = usePublicProducts()
  const { data: categoriesData = [] } = useCategories()

  // Dynamic Categories list starting with 'Todos'
  const categories = useMemo(() => {
    const dynamicCats = categoriesData.map(c => c.nome)
    return ['Todos', ...dynamicCats]
  }, [categoriesData])

  const filteredProducts = useMemo(() => {
    let result = products

    if (activeCategory !== 'Todos') {
      result = result.filter(p => p.category === activeCategory)
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, activeCategory, searchQuery, sortBy])

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 bg-purple-deep dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-honey/5 clip-hexagon -rotate-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] uppercase border border-honey/30 rounded-full text-honey bg-honey/5">
              Peças Exclusivas
            </span>
            <h1 className="font-heading text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
              Nossas <span className="text-honey text-glow italic">Criações</span>
            </h1>
            <p className="text-cream/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
              Explore nossa galeria de amigurumis reais, onde cada ponto é tecido com memórias e afeto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Advanced Filter Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between mb-12 lg:mb-16 gap-6 bg-white p-6 lg:p-2 rounded-[32px] lg:rounded-full shadow-sm border border-border/50">
            {/* Categories Scrollable Area */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto px-2 lg:px-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-5 py-2.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-lg" 
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto px-2 lg:px-4">
              {/* Search Input */}
              <div className="relative w-full sm:flex-1 lg:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar amigurumi..."
                  className="w-full pl-12 pr-6 py-3.5 lg:py-4 bg-muted/30 border-transparent rounded-full text-sm focus:bg-white focus:border-honey/50 focus:ring-4 focus:ring-honey/10 transition-all outline-none"
                />
              </div>
              
              {/* Sort Selector - Now visible on mobile */}
              <div className="relative w-full sm:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto appearance-none pl-12 pr-10 py-3.5 lg:py-4 bg-muted/30 rounded-full text-sm font-medium outline-none focus:bg-white transition-all cursor-pointer"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                </select>
                <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-8 px-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Carregando..." : (
                <>Mostrando <span className="text-primary font-bold">{filteredProducts.length}</span> amigurumis</>
              )}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline"
              >
                Limpar Busca
              </button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-32 text-primary">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="font-medium">Tecendo o catálogo...</p>
            </div>
          )}

          {/* Grid with layout animation */}
          {!isLoading && (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-[40px] border border-dashed border-border"
            >
              <h3 className="text-2xl font-heading font-bold text-primary mb-2">Nenhuma peça encontrada</h3>
              <p className="text-muted-foreground">Tente buscar por outro termo ou categoria.</p>
              <Button onClick={() => {setSearchQuery(''); setActiveCategory('Todos');}} variant="link" className="mt-4 text-secondary">
                Ver todo o catálogo
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
