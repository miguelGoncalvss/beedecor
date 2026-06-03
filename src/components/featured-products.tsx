"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import { getPublicProducts, PublicProduct } from '@/lib/firebase-service'
import Link from 'next/link'

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<PublicProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getPublicProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const featured = products.filter(p => p.destaque).slice(0, 4)

  return (
    <section className="py-24 bg-cream min-h-[600px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-4 block"
            >
              Coleção Encantada
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-5xl font-bold text-primary leading-tight"
            >
              Nossos Amigurumis <br />
              Mais Queridinhos
            </motion.h2>
          </div>
          <Link href="/catalogo">
            <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
              Ver Coleção Completa
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-sm font-medium">Buscando as peças mais fofas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {featured.length === 0 && products.length > 0 && (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-10 text-muted-foreground italic">
            Novas peças sendo tecidas no momento... 🐝
          </div>
        )}
      </div>
    </section>
  )
}
