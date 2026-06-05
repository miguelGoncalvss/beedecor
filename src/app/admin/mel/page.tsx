"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Trash2, 
  Save, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  User,
  ShieldCheck,
  RefreshCw
} from 'lucide-react'
import { useMelFluxo, useUpdateMelNode, useCreateMelNode, useDeleteMelNode } from '@/hooks/use-mel-fluxo'
import { MelNode, MelOption } from '@/lib/admin-store'
import { cn } from '@/lib/utils'

export default function MelAdminPage() {
  const { data: melFluxo = [], isLoading, refetch } = useMelFluxo()
  const updateNode = useUpdateMelNode()
  const createNode = useCreateMelNode()
  const deleteNode = useDeleteMelNode()

  const [activeTab, setActiveTab] = useState<'cliente' | 'admin'>('cliente')
  const [isCreating, setIsCreating] = useState(false)
  const [newNodeId, setNewNodeId] = useState('')

  const clientNodes = melFluxo.filter(n => !n.admin)
  const adminNodes = melFluxo.filter(n => n.admin)
  const activeNodes = activeTab === 'cliente' ? clientNodes : adminNodes

  const handleCreateNode = async () => {
    if (!newNodeId.trim()) return
    const id = newNodeId.toLowerCase().replace(/\s+/g, '_')
    
    if (melFluxo.some(n => n.id === id)) {
      alert('Já existe um nó com este ID.')
      return
    }

    await createNode.mutateAsync({
      id,
      mensagem: 'Nova mensagem da Mel...',
      opcoes: [{ id: 'op1', icone: '✨', label: 'Nova Opção', proximo: 'inicio' }],
      ativo: true,
      admin: activeTab === 'admin'
    })
    setIsCreating(false)
    setNewNodeId('')
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <RefreshCw className="w-10 h-10 text-honey animate-spin" />
        <p className="text-honey font-heading font-medium">Carregando fluxo da Mel...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <MessageCircle className="text-honey w-8 h-8" />
            Assistente Mel
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o fluxo de conversas da Mel no site e no painel admin.
          </p>
        </div>

        <button 
          onClick={() => setIsCreating(true)}
          className="bg-honey hover:bg-honey/90 text-primary-foreground font-heading font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-honey/20"
        >
          <Plus className="w-5 h-5" />
          Novo Nó
        </button>
      </div>

      {/* Tabs Section */}
      <div className="flex p-1 bg-card/50 backdrop-blur-md rounded-2xl border border-border/40 w-fit">
        <button
          onClick={() => setActiveTab('cliente')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold transition-all",
            activeTab === 'cliente' 
              ? "bg-honey text-primary-foreground shadow-md" 
              : "text-muted-foreground hover:text-white"
          )}
        >
          <User className="w-4 h-4" />
          Fluxo Cliente
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold transition-all",
            activeTab === 'admin' 
              ? "bg-purple-deep text-white shadow-md border border-honey/20" 
              : "text-muted-foreground hover:text-white"
          )}
        >
          <ShieldCheck className="w-4 h-4" />
          Fluxo Admin
        </button>
      </div>

      {/* Create Modal Area */}
      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card/40 border border-honey/20 p-8 rounded-[32px] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-honey/10 rounded-2xl flex items-center justify-center text-honey">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">Criar Novo Nó</h3>
                  <p className="text-sm text-muted-foreground">O ID deve ser único e sem espaços.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text"
                  placeholder="Ex: tutorial_encomenda"
                  value={newNodeId}
                  onChange={(e) => setNewNodeId(e.target.value)}
                  className="flex-1 bg-background border border-border/40 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-honey outline-none text-white font-sans"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleCreateNode}
                    className="bg-honey text-primary-foreground px-8 py-4 rounded-2xl font-heading font-bold hover:bg-honey/90 transition-all"
                  >
                    Confirmar
                  </button>
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="bg-white/5 text-white px-8 py-4 rounded-2xl font-heading font-bold hover:bg-white/10 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Nodes */}
      <div className="grid grid-cols-1 gap-8">
        {activeNodes.map((node) => (
          <NodeEditorCard key={node.id} node={node} allNodeIds={melFluxo.map(n => n.id)} />
        ))}
        {activeNodes.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-border/20 rounded-[40px]">
            <p className="text-muted-foreground font-heading">Nenhum nó encontrado neste fluxo.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function NodeEditorCard({ node, allNodeIds }: { node: MelNode, allNodeIds: string[] }) {
  const updateNode = useUpdateMelNode()
  const deleteNode = useDeleteMelNode()
  
  const [editedNode, setEditedNode] = useState<MelNode>(node)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const isSystemNode = ['inicio', 'admin_inicio'].includes(node.id)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateNode.mutateAsync({ id: node.id, data: editedNode })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (isSystemNode) {
      alert('Nós iniciais do sistema não podem ser excluídos.')
      return
    }
    if (confirm(`Tem certeza que deseja excluir o nó "${node.id}"?`)) {
      await deleteNode.mutateAsync(node.id)
    }
  }

  const addOption = () => {
    const newOp: MelOption = {
      id: `op_${Date.now()}`,
      icone: '✨',
      label: 'Nova Opção',
      proximo: 'inicio'
    }
    setEditedNode({ ...editedNode, opcoes: [...editedNode.opcoes, newOp] })
  }

  const removeOption = (opId: string) => {
    setEditedNode({ 
      ...editedNode, 
      opcoes: editedNode.opcoes.filter(o => o.id !== opId) 
    })
  }

  const updateOption = (opId: string, data: Partial<MelOption>) => {
    setEditedNode({
      ...editedNode,
      opcoes: editedNode.opcoes.map(o => o.id === opId ? { ...o, ...data } : o)
    })
  }

  const actions = [
    { label: 'Nenhum (Usar Próximo Nó)', value: '' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Catálogo', value: 'catalogo' },
    { label: 'Buscador de Presentes', value: 'presente' },
    { label: 'Painel: Produtos', value: 'admin_produtos' },
    { label: 'Painel: Coleções', value: 'admin_colecoes' },
    { label: 'Painel: Categorias', value: 'admin_categorias' },
    { label: 'Painel: Configurações', value: 'admin_configuracoes' },
  ]

  return (
    <motion.div 
      layout
      className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-[40px] overflow-hidden group"
    >
      {/* Card Header */}
      <div className="p-8 border-b border-border/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-deep/40 rounded-2xl flex items-center justify-center border border-honey/20">
            <MessageCircle className="w-6 h-6 text-honey" />
          </div>
          <div>
             <div className="flex items-center gap-2">
                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">{node.id}</h3>
                {isSystemNode && <span className="bg-honey/10 text-honey text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Sistema</span>}
             </div>
             <p className="text-xs text-muted-foreground mt-0.5">Editando comportamento do assistente</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={() => setEditedNode({ ...editedNode, ativo: !editedNode.ativo })}
             className={cn(
               "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all",
               editedNode.ativo ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 text-muted-foreground border border-white/10"
             )}
           >
             {editedNode.ativo ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
             {editedNode.ativo ? 'Ativo' : 'Inativo'}
           </button>

           {!isSystemNode && (
             <button 
               onClick={handleDelete}
               className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all"
             >
               <Trash2 className="w-5 h-5" />
             </button>
           )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Message Editor */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-honey uppercase tracking-widest flex items-center gap-2">
            Mensagem da Mel
            <div className="w-1 h-1 rounded-full bg-honey" />
          </label>
          <textarea 
            value={editedNode.mensagem}
            onChange={(e) => setEditedNode({ ...editedNode, mensagem: e.target.value })}
            placeholder="O que a Mel deve falar?"
            rows={3}
            className="w-full bg-white/5 border border-border/40 rounded-2xl p-6 text-white font-sans outline-none focus:ring-2 focus:ring-honey transition-all"
          />
        </div>

        {/* Options Editor */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-honey uppercase tracking-widest flex items-center gap-2">
              Opções de Resposta
              <div className="w-1 h-1 rounded-full bg-honey" />
            </label>
            <button 
              onClick={addOption}
              className="text-xs font-bold text-honey hover:text-white transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> ADICIONAR OPÇÃO
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {editedNode.opcoes.map((op, idx) => (
              <div 
                key={op.id}
                className="bg-white/5 border border-border/30 rounded-3xl p-6 relative group/option"
              >
                <div className="grid grid-cols-[60px_1fr] gap-4">
                  {/* Emoji/Icon */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-muted-foreground font-bold uppercase">Ícone</label>
                    <input 
                      type="text"
                      value={op.icone}
                      onChange={(e) => updateOption(op.id, { icone: e.target.value })}
                      className="w-full bg-white/5 border border-border/20 rounded-xl py-3 text-center text-xl outline-none focus:ring-1 focus:ring-honey"
                    />
                  </div>

                  {/* Label */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-muted-foreground font-bold uppercase">Texto do Botão</label>
                    <input 
                      type="text"
                      value={op.label}
                      onChange={(e) => updateOption(op.id, { label: e.target.value })}
                      className="w-full bg-white/5 border border-border/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-honey"
                    />
                  </div>

                  {/* Destination */}
                  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-muted-foreground font-bold uppercase">Ação Especial</label>
                      <select 
                        value={op.acao || ''}
                        onChange={(e) => updateOption(op.id, { acao: e.target.value || undefined })}
                        className="w-full bg-white/5 border border-border/20 rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-1 focus:ring-honey appearance-none"
                      >
                        {actions.map(act => (
                          <option key={act.value} value={act.value} className="bg-purple-deep text-white">{act.label}</option>
                        ))}
                      </select>
                    </div>

                    {!op.acao && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-muted-foreground font-bold uppercase">Próximo Nó</label>
                        <select 
                          value={op.proximo || ''}
                          onChange={(e) => updateOption(op.id, { proximo: e.target.value })}
                          className="w-full bg-white/5 border border-border/20 rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-1 focus:ring-honey appearance-none"
                        >
                          <option value="" className="bg-purple-deep text-white">Selecione o próximo nó...</option>
                          {allNodeIds.map(id => (
                            <option key={id} value={id} className="bg-purple-deep text-white">{id}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Remove button inside card */}
                <button 
                  onClick={() => removeOption(op.id)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-destructive/10 text-destructive rounded-full flex items-center justify-center opacity-0 group-hover/option:opacity-100 transition-all border border-destructive/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-border/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-2 text-xs">
             {showSuccess ? (
               <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400 font-bold uppercase">
                 <CheckCircle2 className="w-4 h-4" /> Nó salvo com sucesso!
               </motion.span>
             ) : (
               <span className="text-muted-foreground flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> Alterações não salvas serão perdidas.
               </span>
             )}
           </div>

           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="bg-honey hover:bg-honey/90 text-primary-foreground font-heading font-bold px-10 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-honey/10 disabled:opacity-50"
           >
             {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
             Salvar Alterações
           </button>
        </div>
      </div>
    </motion.div>
  )
}
