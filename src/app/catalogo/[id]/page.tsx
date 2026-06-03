"use client"

import React, { useState, use, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  MessageCircle, 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  ClipboardList, 
  Loader2,
  Ruler,
  Scale,
  Maximize2,
  Package2,
  Clock,
  Baby,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { usePublicProducts } from '@/hooks/use-products'
import { useBeeStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function ProductDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const [selectedImage, setSelectedImage] = useState(0)
  
  const { data: products = [], isLoading } = usePublicProducts()
  const product = products.find(p => p.id === params.id)
  
  const { addToCart, toggleFavorite, isFavorite, toggleCart } = useBeeStore()
  const favorite = product ? isFavorite(product.id) : false

  if (isLoading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <Navbar />
        <div className="text-center text-primary">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="font-medium">Carregando detalhes da peça...</p>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center text-center p-6">
        <Navbar />
        <h1 className="font-heading text-4xl font-bold text-primary mb-4">Produto não encontrado</h1>
        <p className="text-muted-foreground mb-8">Desculpe, a peça que você procura não existe ou foi removida.</p>
        <Link href="/catalogo">
          <Button className="rounded-full px-8">Voltar ao Catálogo</Button>
        </Link>
        <Footer />
      </main>
    )
  }

  const handleWhatsAppOrder = () => {
    const phoneNumber = '5511999999999'
    const message = encodeURIComponent(`Olá! Tenho interesse no amigurumi: ${product.name} 🐝`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleAddToList = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.images?.[0] || product.image
    })
    toggleCart()
  }

  const images = product.images || [product.image]

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para o Catálogo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-[40px] overflow-hidden bg-white shadow-xl border border-border/50"
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                      selectedImage === i ? 'border-secondary' : 'border-transparent'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-4"
              >
                {product.category}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-3xl md:text-6xl font-bold text-primary mb-6"
              >
                {product.name}
              </motion.h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex text-honey">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-muted-foreground">(5.0 de avaliação)</span>
              </div>
              
              <p className="text-4xl font-bold text-purple-deep mb-8">R$ {product.price.toFixed(2)}</p>
              
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg font-light">
                {product.description}
              </p>

              <div className="space-y-6 mb-12 p-8 bg-white/50 rounded-3xl border border-border/50">
                <h4 className="font-bold text-primary uppercase tracking-widest text-xs flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-honey" />
                  Especificações da Peça
                </h4>
                
                {product.especificacoes && Object.values(product.especificacoes).some(v => v) ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {product.especificacoes.altura && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Maximize2 className="w-4 h-4 text-honey/60" />
                        <span className="font-bold text-primary/80">Altura:</span> {product.especificacoes.altura} cm
                      </li>
                    )}
                    {product.especificacoes.largura && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Maximize2 className="w-4 h-4 text-honey/60 rotate-90" />
                        <span className="font-bold text-primary/80">Largura:</span> {product.especificacoes.largura} cm
                      </li>
                    )}
                    {product.especificacoes.peso && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Scale className="w-4 h-4 text-honey/60" />
                        <span className="font-bold text-primary/80">Peso:</span> {product.especificacoes.peso} g
                      </li>
                    )}
                    {product.especificacoes.indicadoPara && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Baby className="w-4 h-4 text-honey/60" />
                        <span className="font-bold text-primary/80">Indicado para:</span> {product.especificacoes.indicadoPara}
                      </li>
                    )}
                    {product.especificacoes.material && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground sm:col-span-2">
                        <Package2 className="w-4 h-4 text-honey/60" />
                        <span className="font-bold text-primary/80">Material:</span> {product.especificacoes.material}
                      </li>
                    )}
                    {product.especificacoes.tempoProd && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground sm:col-span-2">
                        <Clock className="w-4 h-4 text-honey/60" />
                        <span className="font-bold text-primary/80">Tempo de produção:</span> {product.especificacoes.tempoProd}
                      </li>
                    )}
                    {product.especificacoes.observacoes && (
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2 pt-2 border-t border-border/30">
                        <FileText className="w-4 h-4 text-honey/60 mt-0.5" />
                        <div>
                          <span className="font-bold text-primary/80 block mb-1">Observações:</span>
                          <p className="italic">{product.especificacoes.observacoes}</p>
                        </div>
                      </li>
                    )}
                  </ul>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(product.details || []).map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-honey rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  onClick={handleWhatsAppOrder}
                  size="lg" 
                  className="flex-[2] rounded-full h-16 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Encomendar pelo WhatsApp 🐝
                </Button>
                <Button 
                  onClick={handleAddToList}
                  size="lg" 
                  variant="outline"
                  className="flex-1 rounded-full h-16 text-lg border-primary/20 text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <ClipboardList className="w-5 h-5" />
                  Lista
                </Button>
                <Button 
                  onClick={() => toggleFavorite(product.id)}
                  size="icon" 
                  variant="outline" 
                  className={cn(
                    "h-16 w-16 rounded-full border-primary/20 transition-all",
                    favorite ? "bg-honey border-honey text-purple-deep" : "text-primary hover:bg-primary/5"
                  )}
                >
                  <Heart className={cn("w-6 h-6", favorite && "fill-current")} />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <ShieldCheck className="w-5 h-5 text-honey" />
                  Artesanato Premium
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                   <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-honey rounded-full animate-pulse" />
                   </div>
                  Feito sob encomenda
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
