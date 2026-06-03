"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Plus, Minus, HelpCircle, ShoppingBag, Truck, Heart, Scissors, CheckCircle } from 'lucide-react'

const faqItems = [
  {
    question: "O que é um Amigurumi?",
    answer: "Amigurumi é uma técnica japonesa para criar pequenos bonecos feitos de crochê ou tricô. Na Bee, focamos em peças artísticas, decorativas e afetivas, feitas ponto a ponto com fios de alta qualidade e muito carinho.",
    icon: Heart
  },
  {
    question: "Vocês fazem encomendas personalizadas?",
    answer: "Sim! Adoramos transformar ideias em fios. Se você tem um personagem, pet ou ideia específica, entre em contato via WhatsApp. Analisamos a viabilidade técnica e enviamos um orçamento personalizado para o seu projeto.",
    icon: Scissors
  },
  {
    question: "Qual o prazo de produção?",
    answer: "Por serem peças 100% artesanais, o prazo de produção varia entre 7 a 20 dias úteis, dependendo da complexidade da peça e da nossa demanda atual. Itens em pronta-entrega são enviados em até 2 dias úteis após a confirmação.",
    icon: ShoppingBag
  },
  {
    question: "Vocês enviam para todo o Brasil?",
    answer: "Sim! Enviamos para todo o território nacional via Correios (PAC ou SEDEX) ou transportadoras parceiras. O valor do frete e o prazo estimado são calculados no momento do fechamento do pedido via WhatsApp.",
    icon: Truck
  },
  {
    question: "Como cuidar do meu amigurumi?",
    answer: "Recomendamos lavagem à mão com sabão neutro e água fria. Não deixe de molho por muito tempo e nunca use secadora. Seque sempre à sombra, em posição horizontal, para manter a forma original e a durabilidade dos pontos.",
    icon: HelpCircle
  },
  {
    question: "As peças são seguras para crianças?",
    answer: "Sim! Utilizamos fios de algodão de alta qualidade e fibra siliconada antialérgica. Usamos olhos com trava de segurança em quase todos os modelos. No entanto, para bebês e crianças pequenas, recomendamos sempre a supervisão de um adulto.",
    icon: CheckCircle
  }
]

const FAQItem = ({ item, index }: { item: typeof faqItems[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-purple-deep/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-honey text-purple-deep shadow-lg shadow-honey/20' : 'bg-purple-deep/5 text-purple-deep group-hover:bg-purple-deep/10'}`}>
            <item.icon className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`} />
          </div>
          <h3 className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-secondary' : 'text-primary'}`}>{item.question}</h3>
        </div>
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-honey/20' : 'bg-transparent'}`}>
            {isOpen ? <Minus className="w-5 h-5 text-honey" /> : <Plus className="w-5 h-5 text-primary/40" />}
          </div>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[72px] pr-4">
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-honey/5 clip-hexagon -rotate-12 translate-x-1/4 -translate-y-1/4" />
         <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-deep/5 clip-hexagon rotate-45 -translate-x-1/4 translate-y-1/4" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full honeycomb-grid opacity-[0.03] pointer-events-none" />

         <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-secondary font-bold uppercase tracking-[0.4em] text-xs mb-6 block"
              >
                Suporte & Informações
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-6xl md:text-7xl font-bold text-primary mb-8"
              >
                Dúvidas <span className="text-secondary italic">Frequentes</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground font-light max-w-2xl mx-auto"
              >
                Tudo o que você precisa saber sobre nossos amigurumis artesanais, processos de criação e envios.
              </motion.p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-[48px] p-2 md:p-8 border border-white/50 shadow-2xl shadow-purple-deep/5">
              <div className="divide-y divide-purple-deep/5">
                {faqItems.map((item, index) => (
                  <FAQItem key={index} item={item} index={index} />
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 p-12 md:p-20 bg-purple-deep rounded-[60px] text-center dark relative overflow-hidden shadow-3xl shadow-purple-deep/20"
            >
              <div className="absolute inset-0 honeycomb-grid opacity-10" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-honey/10 clip-hexagon rotate-12" />
              
              <div className="relative z-10">
                <span className="inline-block p-4 bg-honey/10 rounded-2xl mb-8">
                  <HelpCircle className="w-8 h-8 text-honey" />
                </span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Ainda tem alguma dúvida?</h2>
                <p className="text-xl text-cream/60 mb-12 max-w-xl mx-auto font-light">
                  Se você não encontrou a resposta que procurava, entre em contato diretamente com nossas artesãs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/contato" 
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-honey text-purple-deep font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-honey/20 group"
                  >
                    Fale com a gente
                    <motion.span 
                      animate={{ x: [0, 5, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </a>
                  <a 
                    href="/catalogo" 
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-colors border border-white/10"
                  >
                    Ver Catálogo
                  </a>
                </div>
              </div>
            </motion.div>
         </div>
      </section>

      <Footer />
    </main>
  )
}
