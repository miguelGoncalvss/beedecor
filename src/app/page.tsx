"use client"

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { StorySection } from "@/components/story-section";
import { Footer } from "@/components/footer";
import { Gift, Box, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Entry Points with Isolated Groups */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gift Finder Entry */}
            <Link href="/presente" className="group/entry-gift">
              <div className="relative h-80 rounded-[48px] overflow-hidden bg-purple-deep flex items-center p-12 transition-transform duration-700 hover:scale-[1.02]">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-honey/20 rounded-2xl flex items-center justify-center text-honey border border-honey/30">
                    <Gift className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading text-xl md:text-3xl font-bold text-white mb-2">Descoberta de Presente</h3>
                    <p className="text-cream/60 max-w-xs">Deixe a magia te guiar até o amigurumi perfeito para quem você ama.</p>
                  </div>
                  <div className="flex items-center gap-2 text-honey font-bold uppercase tracking-widest text-xs">
                    Começar Jornada <ArrowRight className="w-4 h-4 transition-transform group-hover/entry-gift:translate-x-2" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-honey/5 clip-hexagon rotate-12 translate-x-1/4" />
              </div>
            </Link>

            {/* Collections Entry */}
            <Link href="/colecoes" className="group/entry-col">
              <div className="relative h-80 rounded-[48px] overflow-hidden bg-white border border-border/50 flex items-center p-12 transition-transform duration-700 hover:scale-[1.02] shadow-sm hover:shadow-xl">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-pastel-blue/20 rounded-2xl flex items-center justify-center text-primary border border-pastel-blue/30">
                    <Box className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading text-xl md:text-3xl font-bold text-primary mb-2">Nossas Coleções</h3>
                    <p className="text-muted-foreground max-w-xs">Mergulhe em universos temáticos curados com carinho.</p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs">
                    Explorar Mundos <ArrowRight className="w-4 h-4 transition-transform group-hover/entry-col:translate-x-2" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-pastel-blue/10 clip-hexagon -rotate-12 translate-y-1/4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <StorySection />
      
      {/* Testimonials */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-primary">O que dizem nossos clientes</h2>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative flex overflow-hidden py-10">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...Array(2)].map((_, listIdx) => (
              <div key={listIdx} className="flex gap-8">
                {[
                  {
                    name: "Juliana Mendes",
                    text: "O amigurumi é simplesmente maravilhoso! O acabamento é perfeito e dá para sentir o carinho em cada ponto. Uma verdadeira obra de arte.",
                    initial: "J"
                  },
                  {
                    name: "Ricardo Alves",
                    text: "Comprei para presentear e a pessoa ficou encantada. A qualidade do material e o cuidado com a embalagem mostram o profissionalismo do ateliê.",
                    initial: "R"
                  },
                  {
                    name: "Camila Rocha",
                    text: "Minha encomenda chegou dentro do prazo e superou todas as expectativas. É muito mais lindo de perto! Com certeza comprarei mais vezes.",
                    initial: "C"
                  },
                  {
                    name: "Fernanda Lima",
                    text: "Atendimento impecável! Tiraram todas as minhas dúvidas e o resultado final ficou exatamente como eu imaginei. Recomendo muito!",
                    initial: "F"
                  }
                ].map((review, i) => (
                  <div key={`${listIdx}-${i}`} className="inline-block w-[350px] md:w-[450px] bg-white p-10 rounded-[40px] shadow-sm border border-border/50 hover:shadow-xl transition-shadow duration-500 whitespace-normal">
                    <div className="flex text-honey mb-6 justify-center">
                      {[...Array(5)].map((_, star) => <Sparkles key={star} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-muted-foreground italic mb-8 leading-relaxed text-sm md:text-base">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-pastel-blue/20 rounded-full flex items-center justify-center font-bold text-primary">{review.initial}</div>
                      <div className="text-left">
                        <p className="font-bold text-primary text-sm">{review.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Cliente Verificado(a)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
