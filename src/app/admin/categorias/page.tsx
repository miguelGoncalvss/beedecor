"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Tag, 
  Plus, 
  Trash2, 
  Loader2, 
  AlertCircle,
  Hash,
  Check,
  RefreshCw
} from 'lucide-react'
import { useCategories, useCreateCategory, useDeleteCategory, useSyncCategories } from '@/hooks/use-categories'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { auth as firebaseAuth } from '@/lib/firebase'

export default function AdminCategoriasPage() {
  const [newCategory, setNewCategory] = useState('')
  const { data: categories = [], isLoading } = useCategories()
  const createMutation = useCreateCategory()
  const deleteMutation = useDeleteCategory()
  const syncMutation = useSyncCategories()

  const handleSync = async () => {
    if (syncMutation.isPending) return
    console.log("🔄 Iniciando sincronização manual...")
    try {
      const count = await syncMutation.mutateAsync()
      alert(`${count} categorias novas sincronizadas com sucesso!`)
    } catch (error) {
      console.error(error)
      alert("Erro ao sincronizar categorias.")
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = newCategory.trim()
    if (!name || createMutation.isPending) return
    
    // Diagnóstico de Autenticação
    const currentUser = firebaseAuth.currentUser
    console.log("👤 Usuário atual no momento da criação:", currentUser ? `Logado: ${currentUser.email}` : "Não autenticado")
    
    if (!currentUser) {
      alert("Sessão expirada. Por favor, faça login novamente.")
      return
    }

    console.log(`🚀 Tentando adicionar categoria: "${name}"`)
    try {
      await createMutation.mutateAsync(name)
      console.log("✅ Categoria adicionada com sucesso!")
      setNewCategory('')
    } catch (error: any) {
      console.error("❌ Erro ao adicionar categoria:", error)
      alert(`Erro ao adicionar categoria: ${error.message || 'Verifique sua conexão ou permissões.'}`)
    }
  }

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) return
    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Categorias</h1>
          <p className="text-muted-foreground mt-1">Gerencie os segmentos do seu catálogo público</p>
        </div>
        <Button 
          onClick={handleSync}
          disabled={syncMutation.isPending}
          variant="outline"
          className="bg-card hover:bg-muted text-foreground border-border rounded-xl px-6 py-3 font-bold flex items-center gap-2"
        >
          {syncMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          Sincronizar com Produtos
        </Button>
      </div>

      {/* Add Category Inline Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border/50 p-6 rounded-[32px] shadow-sm"
      >
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nome da nova categoria (ex: Colecionáveis)"
              className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-foreground"
              disabled={createMutation.isPending}
            />
          </div>
          <Button 
            type="submit" 
            disabled={!newCategory.trim() || createMutation.isPending}
            className="h-auto py-4 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold flex items-center gap-2"
          >
            {createMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Adicionar Categoria
          </Button>
        </form>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-32 rounded-[28px] bg-muted animate-pulse" />
            ))
          ) : (
            categories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative p-6 rounded-[28px] bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {cat.nome}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Hash className="w-3 h-3" />
                      {cat.slug}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(cat.id, cat.nome)}
                    disabled={deleteMutation.isPending}
                    className="p-2.5 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 rounded-2xl border border-primary/10">
        <AlertCircle className="w-5 h-5 text-primary/60" />
        <p className="text-sm text-muted-foreground">
          As categorias removidas deixarão de aparecer nos filtros do catálogo público, mas os produtos vinculados a elas permanecerão intactos.
        </p>
      </div>
    </div>
  )
}
