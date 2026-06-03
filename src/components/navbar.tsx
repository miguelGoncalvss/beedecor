"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Heart } from 'lucide-react'
import { Logo } from './ui/logo'
import { cn } from '@/lib/utils'
import { useBeeStore } from '@/lib/store'

import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Início', href: '/' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Coleções', href: '/colecoes' },
  { name: 'Sobre Nós', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
]

export const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cart, toggleCart, favorites } = useBeeStore()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0
  const favoritesCount = mounted ? favorites.length : 0

  // Pages that start with a light background
  const isLightPage = [
    '/contato', 
    '/favoritos', 
    '/presente',
  ].some(p => pathname?.startsWith(p)) || pathname?.startsWith('/catalogo/')

  // Determine if we should show dark text/background
  const showScrolledStyle = isScrolled || isLightPage

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        showScrolledStyle 
          ? "bg-background/80 backdrop-blur-md py-3 shadow-sm border-b border-border/50 text-foreground" 
          : "bg-transparent text-cream"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 shadow-2xl" />
          <div className="flex flex-col items-start leading-none">
            <span className={cn(
              "font-heading font-bold text-2xl tracking-tighter transition-colors duration-500",
              showScrolledStyle ? "text-primary" : "text-honey"
            )}>Bee</span>
            <span className={cn(
              "font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-500",
              showScrolledStyle ? "text-muted-foreground" : "text-cream/60"
            )}>Decoração e Arte</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-sans text-sm font-medium transition-colors relative group",
                showScrolledStyle ? "hover:text-secondary" : "hover:text-honey"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                showScrolledStyle ? "bg-secondary" : "bg-honey"
              )} />
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          
          <Link href="/favoritos" className={cn(
            "p-2.5 rounded-full transition-colors relative group",
            showScrolledStyle ? "hover:bg-secondary/10" : "hover:bg-white/10"
          )}>
            <Heart className={cn(
              "w-5 h-5 group-hover:fill-current transition-all", 
              mounted && favorites.length > 0 
                ? (showScrolledStyle ? "text-foreground" : "text-cream") 
                : (showScrolledStyle ? "text-foreground" : "text-cream")
            )} />
            {favoritesCount > 0 && (
              <span className={cn(
                "absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-background animate-pulse",
                showScrolledStyle ? "bg-foreground" : "bg-cream"
              )} />
            )}
          </Link>
          
          <button 
            onClick={toggleCart}
            className={cn(
              "p-2.5 rounded-full transition-colors relative group",
              showScrolledStyle ? "hover:bg-secondary/10 text-foreground" : "hover:bg-white/10 text-cream"
            )}
          >
            <ShoppingBag className="w-5 h-5 transition-all" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  "absolute top-1 right-1 w-5 h-5 text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background shadow-lg",
                  showScrolledStyle ? "bg-foreground" : "bg-cream text-primary"
                )}
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button
            className={cn(
              "md:hidden p-2.5 rounded-full transition-colors",
              showScrolledStyle ? "hover:bg-secondary/10 text-foreground" : "hover:bg-white/10 text-cream"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-cream md:hidden flex flex-col p-8 pt-24"
          >
            <button
              className="absolute top-8 right-8 p-3 bg-white rounded-full shadow-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-heading font-bold text-primary hover:text-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto pt-12 border-t border-border/50">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Redes Sociais</p>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (
                  <span key={social} className="text-primary font-bold">{social}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
