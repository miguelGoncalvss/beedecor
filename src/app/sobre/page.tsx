"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Heart, Sparkles, Users, Coffee, Scissors, CheckCircle } from 'lucide-react'

const features = [
  { icon: Heart, title: 'Feito com Amor', description: 'Cada ponto é dado com dedicação total.' },
  { icon: Sparkles, title: 'Design Exclusivo', description: 'Criações próprias e personalizadas.' },
  { icon: Users, title: 'Família em Primeiro', description: 'Um negócio unido por gerações.' },
  { icon: Coffee, title: 'Processo Lento', description: 'Respeitamos o tempo do artesanal.' },
]

const processSteps = [
  {
    title: 'A Escolha do Fio',
    description: 'Tudo começa com a curadoria dos melhores fios. Buscamos texturas que abracem e cores que encantem, priorizando sempre fibras naturais e antialérgicas.',
    icon: Scissors,
    image: '/pics/fridaKhalo.jpg'
  },
  {
    title: 'O Primeiro Nó',
    description: 'Cada peça nasce de um anel mágico. É o início de uma jornada de milhares de pontos, onde a paciência e a técnica se encontram.',
    icon: Sparkles,
    image: '/pics/io_personagemUrsihopoo.jpg'
  },
  {
    title: 'Modelagem Têxtil',
    description: 'Sem moldes rígidos, a agulha vai esculpindo formas. É aqui que o volume aparece e a personalidade da peça começa a se revelar.',
    icon: Heart,
    image: '/pics/santa.jpg'
  },
  {
    title: 'O Brilho nos Olhos',
    description: 'O momento mais emocionante: dar vida. A colocação dos olhos e os bordados finais trazem a alma para o nosso amigurumi.',
    icon: CheckCircle,
    image: '/pics/gato.jpg'
  }
]

export default function AboutPage() {
  const processRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  })

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden dark bg-purple-deep">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/pics/io_personagemUrsihopoo.jpg"
            alt="Ateliê Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-deep/80" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-honey font-bold uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            Nossa Jornada
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-6xl md:text-8xl font-bold text-white mb-8"
          >
            Nossa <span className="text-honey text-glow italic">História</span>
          </motion.h1>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl font-bold text-primary mb-8">Um sonho que nasceu entre linhas e agulhas.</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                A Bee Decoração e Arte não é apenas uma loja; é a materialização de um talento passado de geração em geração. Tudo começou na mesa da cozinha, onde nossa mãe nos ensinou que a paciência de um ponto de crochê pode criar mundos inteiros.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Hoje, unimos a tradição do artesanal com um design moderno e artístico, criando amigurumis que não são apenas brinquedos, mas companheiros de vida e peças de decoração exclusivas.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="/pics/fridaKhalo.jpg" className="rounded-2xl aspect-[3/4] object-cover shadow-lg" alt="Frida Kahlo Amigurumi" />
                <img src="/pics/gato.jpg" className="rounded-2xl aspect-square object-cover shadow-lg" alt="Gatinho Real" />
              </div>
              <div className="space-y-4 pt-12">
                <img src="/pics/santa.jpg" className="rounded-2xl aspect-square object-cover shadow-lg" alt="Santa Amigurumi" />
                <img src="/pics/nossaSenhora.jpg" className="rounded-2xl aspect-[3/4] object-cover shadow-lg" alt="Nossa Senhora" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTISAN PROCESS - WOW SECTION */}
      <section ref={processRef} className="py-32 bg-purple-deep dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full honeycomb-grid opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-honey font-bold uppercase tracking-[0.4em] text-xs mb-6 block"
            >
              Imersão
            </motion.span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tighter">O Processo <span className="text-honey italic">Lento</span></h2>
          </div>

          <div className="space-y-40">
            {processSteps.map((step, i) => (
               <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full lg:w-1/2 relative"
                  >
                     <div className="aspect-[4/3] rounded-[60px] overflow-hidden border-8 border-honey/10 shadow-2xl">
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-honey rounded-3xl flex items-center justify-center shadow-xl">
                        <step.icon className="w-10 h-10 text-purple-deep" />
                     </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 space-y-6"
                  >
                     <span className="text-honey/50 font-heading text-6xl md:text-8xl font-black">0{i+1}</span>
                     <h3 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">{step.title}</h3>
                     <p className="text-xl text-cream/60 font-light leading-relaxed">
                        {step.description}
                     </p>
                  </motion.div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-cream overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16 text-center">As mãos por trás das linhas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Elaine */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-56 h-56 rounded-[40px] bg-honey/10 border-4 border-honey/20 mb-8 overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl">
                <div className="w-full h-full bg-honey/5 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-honey" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Elaine</h3>
              <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-4">Mestra Artesã & Inspiração</p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Aos 56 anos, Elaine é professora infantil e a alma do ateliê. Apaixonada por plantas e por seus 4 gatos, ela traz a delicadeza e o olhar lúdico da educação para cada ponto de crochê.
              </p>
            </motion.div>

            {/* Beatriz */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-56 h-56 rounded-[40px] bg-pastel-blue/10 border-4 border-pastel-blue/20 mb-8 overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl">
                <div className="w-full h-full bg-pastel-blue/5 flex items-center justify-center">
                  <Users className="w-16 h-16 text-pastel-blue" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Beatriz (Be)</h3>
              <p className="text-pastel-blue text-xs uppercase tracking-[0.2em] font-bold mb-4">Arquitetura & Design</p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Arquiteta de 30 anos, a Be une a precisão técnica ao mundo fantástico dos amigurumis. Amante de gatos, livros e jogos, ela é responsável por trazer estrutura e criatividade para as peças.
              </p>
            </motion.div>

            {/* Rafaela */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-56 h-56 rounded-[40px] bg-honey/10 border-4 border-honey/20 mb-8 overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-500 shadow-xl">
                <div className="w-full h-full bg-honey/5 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-honey" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Rafaela (Rafa)</h3>
              <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-4">Contabilidade & Gestão</p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Aos 23 anos, a Rafa é contadora e garante que o ateliê cresça com solidez. Apaixonada por animais e velas aromáticas, ela traz o equilíbrio entre a razão dos números e o conforto do lar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
