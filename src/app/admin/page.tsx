"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  FolderHeart, 
  Tag, 
  Settings, 
  ArrowRight,
  Sparkles,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/firebase-admin-auth'
import { useAdminProducts } from '@/hooks/use-products'
import { useCollections } from '@/hooks/use-collections'
import { useCategories } from '@/hooks/use-categories'

const QuickActionCard = ({ title, icon: Icon, href, color }: { title: string, icon: any, href: string, color: string }) => (
  <Link href={href}>
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative p-8 rounded-[32px] bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 rounded-full blur-[50px] -mr-10 -mt-10 opacity-30 group-hover:opacity-60 transition-opacity`} />
      
      <div className="relative z-10 space-y-4">
        <div className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            Gerenciar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>
    </motion.div>
  </Link>
)

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false)
  const { user } = useAdminAuth()
  const { data: products = [] } = useAdminProducts()
  const { data: collections = [] } = useCollections()
  const { data: categories = [] } = useCategories()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !user) return null

  const activeProductsCount = products.filter(p => p.status === 'active').length
  const displayName = user.name?.split('@')[0]?.split(' ')[0] || 'Artesã'

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <section className="relative p-10 rounded-[40px] bg-gradient-to-br from-[#2D0A45] to-[#4B1366] border border-honey/20 shadow-2xl overflow-hidden shadow-inner">
        {/* Atmospheric Elements */}
        <div className="absolute inset-0 honeycomb-grid opacity-[0.03] z-0" />
        
        {/* Golden Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-honey rounded-full blur-[1px]"
            initial={{ 
              x: Math.random() * 800, 
              y: Math.random() * 200,
              opacity: 0.1
            }}
            animate={{ 
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
          />
        ))}

        {/* Decorative Hexagon */}
        <div className="absolute top-0 right-0 w-64 h-64 text-honey/10 -mr-20 -mt-20 transform rotate-12 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M25 0 L75 0 L100 50 L75 100 L25 100 L0 50 Z" />
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 text-honey mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Painel do Ateliê</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
              Bem-vinda ao seu Ateliê, <span className="text-honey">{displayName}</span>! 🐝
            </h1>
            <p className="text-white/60 max-w-lg font-light">
              Tudo pronto para criar novas memórias afetivas hoje? Suas ferramentas de gestão estão logo abaixo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 — Produtos */}
        <Link href="/admin/produtos">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-8 rounded-[32px] bg-card border border-honey/10 hover:border-honey/40 shadow-sm hover:shadow-honey/10 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-honey/5 rounded-full blur-[40px] -mr-10 -mt-10 opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-honey/10 flex items-center justify-center text-honey border border-honey/20">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Gerenciar Produtos</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  Gerenciar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Card 2 — Coleções */}
        <Link href="/admin/colecoes">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-8 rounded-[32px] bg-card border border-[#C8E6F0]/20 hover:border-[#C8E6F0]/40 shadow-sm hover:shadow-[#C8E6F0]/10 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8E6F0]/5 rounded-full blur-[40px] -mr-10 -mt-10 opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C8E6F0]/10 flex items-center justify-center text-[#C8E6F0] border border-[#C8E6F0]/20">
                <FolderHeart className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Coleções</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  Gerenciar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Card 3 — Categorias */}
        <Link href="/admin/categorias">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-8 rounded-[32px] bg-card border border-purple-400/10 hover:border-purple-400/40 shadow-sm hover:shadow-purple-400/10 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/5 rounded-full blur-[40px] -mr-10 -mt-10 opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-400/10 flex items-center justify-center text-purple-300 border border-purple-400/20">
                <Tag className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Categorias</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  Gerenciar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Card 4 — Assistente Mel */}
        <Link href="/admin/mel">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-8 rounded-[32px] bg-card border border-amber-400/10 hover:border-amber-400/40 shadow-sm hover:shadow-amber-400/10 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-[40px] -mr-10 -mt-10 opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 flex items-center justify-center text-honey border border-amber-400/20">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Assistente Mel</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  Gerenciar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Card 5 — Configurações */}
        <Link href="/admin/configuracoes">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-8 rounded-[32px] bg-card border border-white/5 hover:border-white/20 shadow-sm hover:shadow-white/5 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 border border-white/10">
                <Settings className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Configurações</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  Gerenciar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Stats Summary Area */}
      <div className="bg-card/30 border border-border/40 rounded-[40px] p-10 backdrop-blur-sm">
        <h3 className="text-xl font-heading font-bold text-foreground mb-10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-honey" />
          Resumo do Ateliê
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-honey/10">
          <div className="py-6 md:py-0 md:px-10 first:pl-0 space-y-2">
            <div className="flex items-center gap-2 text-honey/60">
              <Package className="w-3 h-3" />
              <p className="text-sm font-medium uppercase tracking-widest">Produtos Ativos</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-heading font-bold text-honey">{activeProductsCount}</span>
              <span className="text-sm text-muted-foreground">peças visíveis</span>
            </div>
          </div>
          
          <div className="py-6 md:py-0 md:px-10 space-y-2">
            <div className="flex items-center gap-2 text-honey/60">
              <FolderHeart className="w-3 h-3" />
              <p className="text-sm font-medium uppercase tracking-widest">Total de Coleções</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-heading font-bold text-honey">{collections.length}</span>
              <span className="text-sm text-muted-foreground">temas criados</span>
            </div>
          </div>

          <div className="py-6 md:py-0 md:px-10 last:pr-0 space-y-2">
            <div className="flex items-center gap-2 text-honey/60">
              <Tag className="w-3 h-3" />
              <p className="text-sm font-medium uppercase tracking-widest">Categorias</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-heading font-bold text-honey">{categories.length}</span>
              <span className="text-sm text-muted-foreground">segmentos ativos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
