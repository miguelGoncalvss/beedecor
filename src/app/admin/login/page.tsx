"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Hexagon, Loader2, Sparkles } from 'lucide-react'
import { useAdminStore } from '@/lib/admin-store'
import { Logo } from '@/components/ui/logo'
import { loginAdmin } from '@/lib/firebase-admin-auth'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const user = useAdminStore((state) => state.user)

  useEffect(() => {
    setMounted(true)
    if (user) {
      router.push('/admin')
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      await loginAdmin(email, password)
      router.push('/admin')
    } catch (error) {
      console.error(error)
      alert('Erro ao entrar. Verifique seu e-mail e senha.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden text-cream selection:bg-honey selection:text-primary">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-honey/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute inset-0 honeycomb-grid opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 sm:p-12"
      >
        <div className="glass rounded-[2rem] p-10 shadow-2xl relative overflow-hidden border border-white/10 bg-black/20 backdrop-blur-xl">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-honey to-transparent opacity-50" />
          
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-honey/30 blur-2xl rounded-full" />
              <Logo className="w-16 h-16 text-honey relative z-10 drop-shadow-[0_0_15px_rgba(244,185,66,0.5)]" />
            </motion.div>
            
            <h1 className="mt-6 text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-cream to-cream/70 text-center tracking-tight">
              Ateliê Digital
            </h1>
            <p className="text-cream/60 mt-2 text-sm text-center font-sans">
              Acesso exclusivo para artesãs
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail mágico"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-honey/50 focus:bg-white/10 transition-all font-sans"
                  required
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-honey/50 focus:bg-white/10 transition-all font-sans"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-honey hover:bg-honey-dark text-primary font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(244,185,66,0.3)] hover:shadow-[0_0_30px_rgba(244,185,66,0.5)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entrando no Ateliê...</span>
                </>
              ) : (
                <>
                  <span>Abrir as Portas</span>
                  <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
             <p className="text-xs text-cream/40 flex items-center justify-center gap-1">
                <Hexagon className="w-3 h-3" />
                Bee Decoração e Arte
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
