"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart } from 'lucide-react'

export const StorySection = () => {
  const containerRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 bg-purple-deep overflow-hidden dark">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-honey/5 clip-hexagon -rotate-12 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div style={{ y }} className="relative">
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden border-8 border-honey/10">
            <img
              src="/pics/io_personagemUrsihopoo.jpg"
              alt="Personagem Bisonho Amigurumi"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-honey rounded-[30px] p-8 flex flex-col justify-center shadow-2xl">
            <Heart className="w-10 h-10 text-purple-deep mb-4 fill-current" />
            <p className="text-purple-deep font-bold leading-tight">100% Feito à Mão</p>
          </div>
        </motion.div>

        <motion.div style={{ opacity }}>
          <span className="text-honey font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            Nossa Essência
          </span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            De Mãe para Filhas, <br />
            de Nós para <span className="text-honey">Você</span>.
          </h2>
          <p className="text-xl text-cream/70 font-sans font-light leading-relaxed mb-10">
            A Bee Decoração e Arte nasceu do amor passado de mãe para filhas. Cada amigurumi que sai do nosso ateliê carrega consigo o legado dessa arte manual, transformando fios em memórias afetivas.
          </p>
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div>
              <h4 className="text-honey text-3xl font-bold mb-2">1+</h4>
              <p className="text-cream/50 text-sm uppercase tracking-widest">Ano de História</p>
            </div>
            <div>
              <h4 className="text-honey text-3xl font-bold mb-2">1k+</h4>
              <p className="text-cream/50 text-sm uppercase tracking-widest">Corações Aquecidos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
