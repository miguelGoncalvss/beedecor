"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Play, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getSettings } from '@/lib/firebase-service'
import { AdminSettings } from '@/lib/admin-store'

export const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState<AdminSettings | null>(null)

  useEffect(() => {
    setMounted(true)
    const fetchSettings = async () => {
      try {
        const data = await getSettings()
        setSettings(data)
      } catch (error) {
        console.error("Error fetching settings for hero:", error)
      }
    }
    fetchSettings()
  }, [])

  // Generate random values only once on client-side
  const animations = useMemo(() => {
    return {
      hexagons: [...Array(6)].map((_, i) => ({
        id: i,
        width: Math.random() * 300 + 100,
        height: Math.random() * 300 + 100,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 20 + 20,
      })),
      particles: [...Array(20)].map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      }))
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark bg-purple-deep pt-20">
      {/* Animated Honeycomb Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 honeycomb-grid" />
        {/* Animated Hexagons */}
        {mounted && animations.hexagons.map((hex) => (
          <motion.div
            key={hex.id}
            className="absolute border-2 border-honey/30 clip-hexagon"
            style={{
              width: hex.width,
              height: hex.height,
              top: `${hex.top}%`,
              left: `${hex.left}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: hex.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && animations.particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-honey rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase border border-honey/30 rounded-full text-honey bg-honey/5">
            Feito à mão com carinho
          </span>
          
          <h1 className="font-heading text-4xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
            Arte que <br />
            <span className="text-honey">Aquece</span> o <br />
            Coração.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-cream/70 mb-10 font-sans font-light leading-relaxed">
            Transformando fios de algodão em memórias afetivas. Amigurumis exclusivos criados com amor para decorar e encantar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/catalogo">
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-lg bg-honey hover:bg-honey-dark text-purple-deep font-bold transition-all hover:scale-105 active:scale-95"
              >
                Ver Catálogo
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/sobre">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Nossa História
                <Play className="ml-2 w-4 h-4 fill-current" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-honey to-transparent" />
      </motion.div>
    </section>
  )
}
