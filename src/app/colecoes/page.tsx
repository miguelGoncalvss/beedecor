"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCollections } from '@/hooks/use-collections'
import { usePublicProducts } from '@/hooks/use-products'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CollectionsPage() {
  const { data: collections, isLoading: isLoadingCol } = useCollections()
  const { data: products, isLoading: isLoadingProd } = usePublicProducts()

  const isLoading = isLoadingCol || isLoadingProd

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-purple-deep dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-honey/5 clip-hexagon -rotate-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] uppercase border border-honey/30 rounded-full text-honey bg-honey/5">
              Universos Curados
            </span>
            <h1 className="font-heading text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
              Nossas <span className="text-honey text-glow italic">Coleções</span>
            </h1>
            <p className="text-cream/60 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Mergulhe em mundos temáticos onde cada peça é cuidadosamente selecionada para contar uma história única.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections List */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-primary">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-sm font-medium italic">Revelando universos encantados...</p>
            </div>
          ) : collections?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground italic">Nenhuma coleção encontrada no momento. 🐝</p>
            </div>
          ) : (
            collections?.map((col, index) => {
              const colProducts = products?.filter(p => p.colecoes?.includes(col.id || col.nome)).slice(0, 3) || []
              
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group/collection"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center mb-16`}>
                    {/* Collection Visual */}
                    <div className="w-full lg:w-1/2 relative">
                      <div className="aspect-[16/9] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white group-hover/collection:scale-[1.02] transition-transform duration-700">
                        <img
                          src={col.imagem || '/pics/io_personagemUrsihopoo.jpg'}
                          alt={col.nome}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-12">
                          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">{col.nome}</h2>
                          <p className="text-white/80 text-lg font-light max-w-md">{col.descricao}</p>
                        </div>
                      </div>
                      {/* Decorative Hexagon */}
                      <div className="absolute -top-10 -left-10 w-32 h-32 bg-honey/20 clip-hexagon animate-spin-slow -z-10" />
                    </div>

                    {/* Collection CTA & Preview */}
                    <div className="w-full lg:w-1/2 space-y-8">
                       <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs">
                          <Sparkles className="w-4 h-4" />
                          Curadoria Especial
                       </div>
                       <h3 className="text-3xl font-heading font-bold text-primary leading-tight">
                          Explore o encanto da <br />
                          <span className="text-secondary">{col.nome}</span>
                       </h3>
                       <p className="text-muted-foreground leading-relaxed">
                          Peças selecionadas que harmonizam entre si, perfeitas para criar composições afetivas em seu ambiente ou presentear com significado.
                       </p>
                       <Link href="/catalogo">
                          <Button className="rounded-full px-10 h-14 bg-primary hover:bg-primary/90 mt-4 group/btn">
                            Ver Coleção Completa
                            <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                       </Link>
                    </div>
                  </div>

                  {/* Product Preview Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                     {colProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                     ))}
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
