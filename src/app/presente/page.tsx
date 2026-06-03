"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getPublicProducts, PublicProduct } from '@/lib/firebase-service'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, Sparkles, Heart, Gift, Users, Palette, Loader2 } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    id: 'recipient',
    question: 'Para quem é o presente?',
    options: [
      { id: 'babies', label: 'Um bebê especial', icon: Sparkles },
      { id: 'kids', label: 'Uma criança curiosa', icon: Heart },
      { id: 'adults', label: 'Um adulto apaixonado por arte', icon: Users },
      { id: 'home', label: 'Para decorar o meu lar', icon: Palette },
    ]
  },
  {
    id: 'mood',
    question: 'Qual o estilo ou emoção principal?',
    options: [
      { id: 'fun', label: 'Divertido e Alegre', icon: Sparkles },
      { id: 'cozy', label: 'Aconchegante e Macio', icon: Heart },
      { id: 'religious', label: 'Fé e Espiritualidade', icon: Gift },
      { id: 'artistic', label: 'Artístico e Único', icon: Palette },
    ]
  }
]

export default function GiftFinderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState<PublicProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getPublicProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products for gift finder:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: optionId }
    setAnswers(newAnswers)
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const recommendations = products.filter(p => {
    const giftFor = (p as any).giftFor || []
    const moods = (p as any).moods || []
    const matchesRecipient = giftFor.includes(answers.recipient)
    const matchesMood = moods.includes(answers.mood)
    return matchesRecipient || matchesMood
  }).slice(0, 3)

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="font-medium text-primary">Preparando o buscador de presentes...</p>
              </motion.div>
            ) : !showResults ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                  Passo {currentStep + 1} de {steps.length}
                </span>
                <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-12">
                  {steps[currentStep].question}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {steps[currentStep].options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(option.id)}
                      className="p-8 bg-white rounded-[32px] border border-border/50 shadow-sm hover:shadow-xl hover:border-honey/50 transition-all text-left flex items-center gap-6 group"
                    >
                      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-honey/10 group-hover:text-honey transition-colors">
                        <option.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-primary">{option.label}</h3>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mt-12 text-muted-foreground hover:text-primary flex items-center gap-2 mx-auto transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar ao passo anterior
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-honey/10 rounded-full mb-6 text-honey">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-6">
                  Peças que <span className="text-secondary italic">Combinam</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
                  Com base no que você nos contou, selecionamos estes amigurumis que carregam exatamente a energia que você procura.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
                  {recommendations.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  {recommendations.length === 0 && (
                    <div className="col-span-full py-10 bg-white rounded-3xl border border-dashed border-border">
                      <p className="text-muted-foreground">Não encontramos uma combinação exata, mas veja nossas peças em destaque no catálogo!</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button 
                    onClick={() => {
                      setShowResults(false)
                      setCurrentStep(0)
                      setAnswers({})
                    }}
                    variant="outline" 
                    className="rounded-full px-10"
                  >
                    Refazer Descoberta
                  </Button>
                  <Link href="/catalogo">
                    <Button className="rounded-full px-10 bg-primary hover:bg-primary/90">
                      Ver Todo o Catálogo
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Atmospheric Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-honey/5 clip-hexagon rotate-12 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pastel-blue/10 clip-hexagon -rotate-12 translate-y-1/2 -translate-x-1/2" />
      </section>

      <Footer />
    </main>
  )
}
