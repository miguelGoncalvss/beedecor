"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useCollections, useDeleteCollection } from '@/hooks/use-collections'

export default function AdminColecoesPage() {
  const [mounted, setMounted] = useState(false)
  const { data: collections = [], isLoading } = useCollections()
  const deleteCollectionMutation = useDeleteCollection()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja excluir a coleção ${name}?`)) return
    try {
      await deleteCollectionMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  if (!mounted) return null

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Coleções</h1>
          <p className="text-muted-foreground mt-1">Agrupe os produtos por temas e histórias</p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Nova Coleção</span>
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {!isLoading && collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                {collection.capa ? (
                  <img src={collection.capa} alt={collection.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <ImageIcon className="w-10 h-10 text-muted-foreground opacity-30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-heading font-bold mb-1">{collection.nome}</h3>
                  <p className="text-xs text-white/80">{collection.productCount || 0} produtos vinculados</p>
                </div>
                
                {/* Actions - Always visible on mobile, hover on desktop */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity translate-y-0 md:translate-y-[-10px] md:group-hover:translate-y-0">
                  <button className="p-2 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full text-white transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(collection.id, collection.nome)}
                    className="p-2 bg-destructive/80 hover:bg-destructive backdrop-blur-md rounded-full text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground line-clamp-2">{collection.descricao}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!isLoading && collections.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Nenhuma coleção criada ainda.</p>
        </div>
      )}
    </div>
  )
}
