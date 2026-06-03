"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  FolderHeart, 
  Tag, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Hexagon
} from 'lucide-react'
import { useAdminStore } from '@/lib/admin-store'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import { logoutAdmin, useAdminAuth } from '@/lib/firebase-admin-auth'

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produtos', href: '/admin/produtos', icon: Package },
  { name: 'Coleções', href: '/admin/colecoes', icon: FolderHeart },
  { name: 'Categorias', href: '/admin/categorias', icon: Tag },
  { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  const { user, loading } = useAdminAuth()

  useEffect(() => {
    setMounted(true)
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [user, loading, router, pathname])

  // If we are on the login page, don't show the admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!mounted || loading || !user) return null

  return (
    <div className="dark min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar Desktop */}
      <motion.aside 
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="hidden md:flex flex-col border-r border-border/40 bg-card/30 backdrop-blur-md relative z-20 h-screen"
      >
        <div className="p-6 flex items-center justify-between h-20 border-b border-border/30">
          <Link href="/admin" className={cn("flex items-center gap-3 overflow-hidden", !isSidebarOpen && "justify-center w-full")}>
            <Logo className="w-8 h-8 text-primary flex-shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-heading font-bold text-lg text-primary whitespace-nowrap"
                >
                  Ateliê Digital
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative",
                  isActive ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/5 text-muted-foreground hover:text-primary",
                  !isSidebarOpen && "justify-center"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabAdmin" 
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <link.icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                  
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-sans font-medium whitespace-nowrap relative z-10"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip for collapsed state */}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-foreground text-background text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-xl transition-opacity z-50">
                      {link.name}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-border/30 mt-auto">
          <div className={cn("flex items-center gap-3 mb-4", !isSidebarOpen && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
               {user.avatar ? (
                 <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
               ) : (
                 <Hexagon className="w-5 h-5 text-primary" />
               )}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.role}</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={async () => {
              await logoutAdmin()
              router.push('/admin/login')
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors group",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-sans font-medium">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
         {/* Subtle background pattern for main content */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.02] honeycomb-grid z-0" />
         
        {/* Top Header */}
        <header className="h-20 border-b border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-between px-6 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="hidden md:flex p-2 rounded-lg hover:bg-primary/5 text-muted-foreground transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-primary/5 text-muted-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground">
              {adminLinks.find(l => l.href === pathname)?.name || 'Painel Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             {/* Add subtle glowing orb indicator for "Online" */}
             <div className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold text-green-700 dark:text-green-400">
                  <span className="hidden xs:inline">Ateliê</span> Aberto
                </span>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 custom-scrollbar">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden flex"
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-4/5 max-w-sm h-full bg-card border-r border-border shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-border/30">
                <Link href="/admin" className="flex items-center gap-3">
                  <Logo className="w-8 h-8 text-primary" />
                  <span className="font-heading font-bold text-lg text-primary">Ateliê Digital</span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                {adminLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        isActive ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/5 text-muted-foreground"
                      )}>
                        <link.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                        <span className="font-sans font-medium">{link.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.aside>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
