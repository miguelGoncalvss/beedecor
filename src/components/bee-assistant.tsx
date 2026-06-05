"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useBeeStore } from '@/lib/store'
import { useMelFluxo } from '@/hooks/use-mel-fluxo'
import { useSettings } from '@/hooks/use-settings'

// --- Types & Flow Logic ---

type NodeType = string

interface Option {
  label: string
  icon: string
  next?: NodeType
  action?: () => void
}

interface Node {
  message: string
  options: Option[]
}

const adminMessagesByPath: Record<string, string> = {
  '/admin': 'Bem-vinda ao ateliê, artesã! ✨ Precisa de ajuda?',
  '/admin/produtos': 'Dica: marque produtos como Destaque para aparecerem na Home! ⭐',
  '/admin/produtos/novo': 'Lembre de preencher a descrição com carinho — os clientes adoram! 🧶',
  '/admin/colecoes': 'Coleções bem organizadas ajudam os clientes a encontrar o presente perfeito! 🎁',
  '/admin/categorias': 'Categorias aparecem nos filtros do catálogo automaticamente! 🏷️',
  '/admin/configuracoes': 'Mantenha o WhatsApp sempre atualizado — é por lá que chegam os pedidos! 📱',
}

// Fallback nodes for when Firestore is not available
const fallbackNodes: Record<string, Node> = {
  inicio: {
    message: "Olá! Sou a Mel, assistente do Bee Ateliê! 🐝 Como posso te ajudar hoje?",
    options: [
      { label: "Ver nossos produtos", icon: "🧶", next: 'produtos' },
      { label: "Fazer uma encomenda", icon: "🎁", next: 'encomenda' },
      { label: "Prazo e entrega", icon: "📦", next: 'prazo' },
      { label: "Falar com uma artesã", icon: "💬", next: 'contato' },
    ]
  },
  admin_inicio: {
    message: "Olá! Sou a Mel, sua assistente do ateliê. 🐝\nPara onde quer ir?",
    options: [
      { label: "Gerenciar Produtos", icon: "🧶", next: 'admin_produtos' },
      { label: "Ver dicas rápidas", icon: "💡", next: 'admin_dicas' }
    ]
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 35
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(8px)',
    transition: { duration: 0.1 }
  }
} as const

export const BeeAssistant = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { cart } = useBeeStore()
  const { data: melFluxo = [] } = useMelFluxo()
  const { data: settings } = useSettings()
  const prevCartLength = useRef(0)

  // Core UI State
  const [isOpen, setIsOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Conversation State
  const [currentNode, setCurrentNode] = useState<NodeType>('inicio')
  const [chatHistory, setChatHistory] = useState<{ role: 'assistant' | 'user'; text: string; id: number }[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const isAdminMode = pathname.startsWith('/admin')

  // Resolve actions by string
  const resolveAcao = (acao: string) => {
    const acoes: Record<string, () => void> = {
      whatsapp: () => window.open(`https://wa.me/${settings?.whatsapp?.replace(/\D/g, '') || '5511999999999'}`, '_blank'),
      instagram: () => window.open(`https://instagram.com/${settings?.instagram?.replace('@', '') || 'beedecoracaoearte'}`, '_blank'),
      catalogo: () => { router.push('/catalogo'); setIsOpen(false) },
      presente: () => { router.push('/presente'); setIsOpen(false) },
      admin_produtos: () => { router.push('/admin/produtos'); setIsOpen(false) },
      admin_colecoes: () => { router.push('/admin/colecoes'); setIsOpen(false) },
      admin_categorias: () => { router.push('/admin/categorias'); setIsOpen(false) },
      admin_configuracoes: () => { router.push('/admin/configuracoes'); setIsOpen(false) },
    }
    return acoes[acao]
  }

  // Conversation State Machine Definitions - Computed from Firestore
  const nodes: Record<string, Node> = melFluxo.length > 0 
    ? melFluxo.reduce((acc, node) => {
        if (!node.ativo) return acc
        acc[node.id] = {
          message: node.mensagem,
          options: node.opcoes.map(op => ({
            label: op.label,
            icon: op.icone,
            next: op.proximo,
            action: op.acao ? resolveAcao(op.acao) : undefined
          }))
        }
        return acc
      }, {} as Record<string, Node>)
    : fallbackNodes

  // --- Handlers ---

  const handleOptionClick = (option: Option) => {
    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', text: `${option.icon} ${option.label}`, id: Date.now() }])
    
    if (option.action) {
      option.action()
      return
    }

    if (option.next && nodes[option.next]) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setCurrentNode(option.next!)
        setChatHistory(prev => [...prev, { 
          role: 'assistant', 
          text: nodes[option.next!].message, 
          id: Date.now() + 1 
        }])
      }, 800)
    }
  }

  // Reset chat when opening or switching modes
  useEffect(() => {
    if (isOpen) {
      const initialNode = isAdminMode ? 'admin_inicio' : 'inicio'
      setCurrentNode(initialNode)
      if (nodes[initialNode]) {
        setChatHistory([{ role: 'assistant', text: nodes[initialNode].message, id: Date.now() }])
      }
    }
  }, [isOpen, isAdminMode, nodes])

  // Contextual Greetings logic
  useEffect(() => {
    const messagesByPath: Record<string, string> = {
      '/': 'Bem-vindo ao nosso ateliê mágico! ✨',
      '/catalogo': 'Tantas fofuras, né? Se precisar de ajuda para escolher, me chame!',
      '/colecoes': 'Nossas coleções contam histórias únicas. Qual a sua favorita?',
      '/sobre': 'Adoro contar nossa história! Somos uma família apaixonada pelo que faz.',
      '/contato': 'Dúvidas? Pode falar comigo ou usar o formulário!',
      '/favoritos': 'Sua lista de desejos está linda! 😍',
      '/presente': 'O buscador de presentes é mágico! Deixa eu te ajudar.',
    }

    const activeMessages = isAdminMode ? adminMessagesByPath : messagesByPath
    let msg = activeMessages[pathname] || (isAdminMode ? 'Estou aqui se precisar de ajuda com o ateliê! 🐝' : 'Estou aqui se precisar de suporte! 🐝')
    
    if (!isAdminMode && pathname.startsWith('/catalogo/')) {
      msg = 'Esse amigurumi é feito com muito carinho. Quer saber mais sobre ele?'
    }

    const timer = setTimeout(() => {
      setBubbleText(msg)
      setShowBubble(true)
      const hideTimer = setTimeout(() => setShowBubble(false), 6000)
      return () => clearTimeout(hideTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [pathname, isAdminMode])

  // Cart Reaction
  useEffect(() => {
    if (!isAdminMode && cart.length > prevCartLength.current) {
      setBubbleText('Ótima escolha! Esse item é um dos nossos favoritos. ✨')
      setShowBubble(true)
      setTimeout(() => setShowBubble(false), 5000)
    }
    prevCartLength.current = cart.length
  }, [cart.length, isAdminMode])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, isTyping])

  // --- Components ---

  const MelBeeIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg viewBox="0 0 40 40" className={className}>
      {/* Glow shadow */}
      <circle cx="20" cy="22" r="8" fill="rgba(0,0,0,0.1)" />
      
      {/* Wings */}
      <motion.path
        d="M18 18C10 5 2 15 15 22"
        fill="url(#wingGradient)"
        animate={{ scaleY: [1, 0.2, 1] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "15px 22px" }}
      />
      <motion.path
        d="M22 18C30 5 38 15 25 22"
        fill="url(#wingGradient)"
        animate={{ scaleY: [1, 0.2, 1] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "25px 22px" }}
      />
      
      <defs>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8E6F0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Body - Rechonchudo */}
      <ellipse cx="20" cy="21" rx="9" ry="8" fill="#F4B942" />
      {/* Stripes */}
      <path d="M14 18.5 Q20 16 26 18.5" stroke="#4B1366" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 21 Q20 19 28 21" stroke="#4B1366" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 24 Q20 22 26 24" stroke="#4B1366" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Eyes with sparkle */}
      <circle cx="16.5" cy="19.5" r="1.2" fill="#4B1366" />
      <circle cx="16.8" cy="19" r="0.4" fill="white" />
      <circle cx="23.5" cy="19.5" r="1.2" fill="#4B1366" />
      <circle cx="23.8" cy="19" r="0.4" fill="white" />
      
      {/* Little smile */}
      <path d="M18.5 22.5 Q20 23.5 21.5 22.5" stroke="#4B1366" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      
      {/* Antennas */}
      <path d="M18 14.5 Q17 10 15 9" stroke="#4B1366" strokeWidth="1" fill="none" />
      <circle cx="15" cy="9" r="1.2" fill="#4B1366" />
      <path d="M22 14.5 Q23 10 25 9" stroke="#4B1366" strokeWidth="1" fill="none" />
      <circle cx="25" cy="9" r="1.2" fill="#4B1366" />
    </svg>
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Floating Assistant Entity */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Contextual Bubble */}
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white/90 backdrop-blur-md border border-honey/20 shadow-xl p-4 rounded-[2rem] rounded-br-none max-w-[220px] relative z-10 flex items-start gap-2"
            >
              <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-honey">
                 <MelBeeIcon className="w-full h-full" />
              </div>
              <p className="text-[12px] font-heading font-medium text-primary leading-tight">
                {bubbleText}
              </p>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-honey/20 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mel Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          animate={isOpen
            ? { scale: 0.85, opacity: 0.7 }
            : { scale: 1, opacity: 1 }
          }
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="cursor-pointer relative group"
        >
          {/* Enhanced Aura */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={cn(
                "absolute inset-0 rounded-full blur-2xl",
                isAdminMode ? "bg-purple-deep/40" : "bg-honey/40"
            )}
          />

          <div className={cn(
              "relative p-1 rounded-full border shadow-2xl overflow-hidden transition-colors duration-500",
              isAdminMode 
                ? "bg-gradient-to-br from-honey to-amber-500 border-purple-deep/30 shadow-purple-deep/20" 
                : "bg-gradient-to-br from-purple-deep to-purple-800 border-honey/30 shadow-honey/20"
          )}>
             {/* Glass Reflection */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
             
             <motion.div
               animate={{ y: [0, -6, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="bg-white/5 backdrop-blur-sm p-2 rounded-full"
             >
                <MelBeeIcon className="w-14 h-14" />
             </motion.div>
             
             {/* Discret status badge */}
             <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-deep shadow-sm" />
          </div>
        </motion.div>
      </div>

      {/* 2. Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute bottom-28 right-6 w-20 h-20 bg-honey/20 rounded-full pointer-events-none"
              style={{ transformOrigin: 'center' }}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                y: 40,
                x: 20,
                filter: 'blur(10px)',
                borderRadius: '9999px',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: 0,
                filter: 'blur(0px)',
                borderRadius: '40px',
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 0.6,
                }
              }}
              exit={{
                opacity: 0,
                scale: 0,
                y: 60,
                x: 40,
                filter: 'blur(15px)',
                transition: {
                  duration: 0.25,
                  ease: [0.4, 0, 1, 1]
                }
              }}
              style={{
                transformOrigin: 'bottom right',
                willChange: 'transform, opacity, filter',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="absolute bottom-28 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[600px] bg-white shadow-[0_30px_60px_rgba(75,19,102,0.2)] border border-honey/10 flex flex-col overflow-hidden pointer-events-auto"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col h-full"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="bg-purple-deep p-6 text-white relative overflow-hidden shrink-0">
                  {/* Golden Particles Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute w-1 h-1 bg-honey rounded-full"
                        initial={{ x: Math.random() * 400, y: Math.random() * 100 }}
                        animate={{ y: [0, -20], opacity: [0, 1, 0] }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <MelBeeIcon className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl leading-tight">Mel</h3>
                        <p className="text-[10px] text-honey/80 font-medium uppercase tracking-[0.2em]">
                            {isAdminMode ? 'Suporte da Artesã' : 'Assistente do Ateliê'}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                            <p className="text-[10px] text-green-400 font-bold uppercase">Online</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)} 
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </motion.div>

                {/* Message Area */}
                <motion.div variants={itemVariants} className="flex-1 overflow-y-auto p-6 space-y-4 bg-cream/10 custom-scrollbar flex flex-col">
                  {chatHistory.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}
                    >
                      <div className={cn(
                        "px-5 py-3.5 rounded-[28px] text-sm leading-relaxed relative flex items-start gap-2",
                        msg.role === 'user' 
                          ? "bg-purple-deep text-white rounded-tr-none shadow-md shadow-purple-deep/10" 
                          : "bg-cream/40 border border-honey/10 text-primary rounded-tl-none"
                      )}>
                        {msg.role === 'assistant' && <MelBeeIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="bg-cream/40 border border-honey/10 p-4 rounded-[28px] rounded-tl-none w-20 flex justify-center gap-1.5"
                      >
                      {[0, 1, 2].map(i => (
                        <motion.div 
                          key={i}
                          className="w-1.5 h-1.5 bg-honey rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </motion.div>
                  )}
                  <div ref={chatEndRef} />
                </motion.div>

                {/* Options Area */}
                <motion.div variants={itemVariants} className="px-6 py-4 bg-white/50 border-t border-honey/10">
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="wait">
                        {!isTyping && nodes[currentNode].options.map((option, idx) => (
                          <motion.button
                            key={option.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.1, type: 'spring', damping: 20 }}
                            onClick={() => handleOptionClick(option)}
                            className="px-5 py-2.5 bg-white border border-honey/30 rounded-full text-sm font-heading font-medium text-primary shadow-sm hover:bg-honey/10 hover:border-honey/60 hover:shadow-md transition-all flex items-center gap-2 group"
                          >
                            <span className="group-hover:scale-125 transition-transform">{option.icon}</span>
                            {option.label}
                          </motion.button>
                        ))}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="p-4 bg-white border-t border-honey/5 shrink-0 flex items-center justify-center">
                  <p className="text-[10px] text-honey font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    🐝 Bee Decoração e Arte
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
