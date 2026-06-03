"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export const Atmosphere = () => {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    
    // Generate particles ONLY on client side
    setParticles({
      pollen: [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 5,
        mouseXMult: 20 + Math.random() * 40,
        mouseYMult: 20 + Math.random() * 40,
      })),
      dust: [...Array(10)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 1 + 1,
        duration: Math.random() * 30 + 30,
      })),
      hexagons: [...Array(5)].map((_, i) => ({
        id: i,
        width: Math.random() * 400 + 200,
        height: Math.random() * 400 + 200,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 20 + i * 5,
      }))
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted || !particles) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* 1. Pollen Particles */}
      {particles.pollen.map((p: any) => (
        <motion.div
          key={`pollen-${p.id}`}
          className="absolute w-1 h-1 bg-honey/40 rounded-full blur-[1px]"
          initial={{
            x: `${p.x}%`,
            y: `${p.y}%`,
            opacity: 0
          }}
          animate={{
            x: [`${p.x}%`, `${p.targetX}%`],
            y: [`${p.y}%`, `${p.targetY}%`],
            opacity: [0, 0.4, 0],
            translateX: mousePos.x * p.mouseXMult,
            translateY: mousePos.y * p.mouseYMult,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}

      {/* 2. Honey Dust */}
      {particles.dust.map((d: any) => (
        <motion.div
          key={`dust-${d.id}`}
          className="absolute w-4 h-4 bg-honey/10 rounded-full blur-[12px]"
          initial={{
            x: `${d.x}%`,
            y: `${d.y}%`,
            scale: d.scale,
          }}
          animate={{
            y: [`${d.y}%`, '-20%'],
            rotate: [0, 360],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 3. Drifting Hexagons */}
      {particles.hexagons.map((h: any) => (
        <motion.div
          key={`hex-${h.id}`}
          className="absolute border border-honey/5 clip-hexagon"
          style={{
            width: h.width,
            height: h.height,
            left: `${h.left}%`,
            top: `${h.top}%`,
          }}
          animate={{
            rotate: [0, 15, 0],
            scale: [1, 1.05, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 4. Ambient Depth Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-honey/3 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-deep/5 rounded-full blur-[150px]" />
      
      {/* 5. Signature Honey Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-honey/1 via-transparent to-purple-deep/1" />
    </div>
  )
}
