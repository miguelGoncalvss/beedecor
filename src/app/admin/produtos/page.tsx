"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Copy, 
  Star, 
  Package,
  Image as ImageIcon,
  X,
  Check,
  Loader2,
  Tag,
  Ruler
} from 'lucide-react'
import Link from 'next/link'
import { useAdminStore, AdminProduct } from '@/lib/admin-store'
import { useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/use-products'
import { useCategories } from '@/hooks/use-categories'
import { uploadImage, deleteImage } from '@/lib/upload-service'
import { cn } from '@/lib/utils'

const StatusBadge = ({ status }: { status: AdminProduct['status'] }) => {
  const configs = {
    active: { label: 'Ativo', classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
    out_of_stock: { label: 'Esgotado', classes: 'bg-red-500/20 text-red-400 border-red-500/30' },
    draft: { label: 'Rascunho', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
  }
  const config = configs[status] || configs.draft
  return (
    <span className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border", config.classes)}>
      {config.label}
    </span>
  )
}

export default function AdminProdutosPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  const { data: products = [], isLoading } = useAdminProducts()
  const { data: categories = [], isLoading: isLoadingCats } = useCategories()
  const createProductMutation = useCreateProduct()
  const deleteProductMutation = useDeleteProduct()
  const updateProductMutation = useUpdateProduct(editingProduct?.id || '')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredProducts = products.filter(p => 
    (p.nome?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (p.categoria?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  )

  const openAddModal = () => {
    setEditingProduct(null)
    setPreviewUrl(null)
    setSelectedFile(null)
    setUploadProgress(0)
    setIsModalOpen(true)
    setActiveDropdown(null)
  }

  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product)
    setPreviewUrl(product.imageUrl)
    setSelectedFile(null)
    setUploadProgress(0)
    setIsModalOpen(true)
    setActiveDropdown(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteProduct = async (product: AdminProduct) => {
    if (!confirm(`Deseja realmente excluir ${product.nome}?`)) return
    
    try {
      await deleteProductMutation.mutateAsync(product.id)
      if (product.imageUrl) await deleteImage(product.imageUrl)
    } catch (error) {
      console.error(error)
      alert("Erro ao excluir produto.")
    }
  }

  const handleDuplicateProduct = async (product: AdminProduct) => {
    try {
      const { id, criadoEm, atualizadoEm, ...data } = product
      await createProductMutation.mutateAsync({
        ...data,
        nome: `${product.nome} (Cópia)`,
        status: 'draft'
      } as any)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsSaving(true)
    
    try {
      let imageUrl = editingProduct?.imageUrl || '/pics/nossaSenhora.jpg'

      if (selectedFile) {
        if (editingProduct?.imageUrl && !editingProduct.imageUrl.startsWith('/pics/')) {
          await deleteImage(editingProduct.imageUrl)
        }
        
        imageUrl = await uploadImage(selectedFile, (progress) => {
          setUploadProgress(progress)
        })
      }

      const productData = {
        nome: formData.get('nome') as string,
        descricao: formData.get('descricao') as string,
        preco: Number(formData.get('preco')),
        categoria: formData.get('categoria') as string,
        destaque: formData.get('destaque') === 'on',
        status: formData.get('status') as 'active' | 'out_of_stock' | 'draft',
        imageUrl: imageUrl,
        tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
        especificacoes: {
          altura: formData.get('altura') as string,
          largura: formData.get('largura') as string,
          peso: formData.get('peso') as string,
          indicadoPara: formData.get('indicadoPara') as string,
          material: formData.get('material') as string,
          tempoProd: formData.get('tempoProd') as string,
          observacoes: formData.get('observacoes') as string,
        }
      }

      if (editingProduct) {
        await updateProductMutation.mutateAsync(productData as any)
      } else {
        await createProductMutation.mutateAsync(productData as any)
      }
      
      setIsModalOpen(false)
    } catch (error) {
      console.error("❌ Erro ao salvar:", error)
      alert("Erro ao salvar produto.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground mt-1">Gerencie as criações do ateliê ({products.length})</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Buscar por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border/50 rounded-xl hover:bg-muted/50 transition-colors text-foreground">
          <Filter className="w-5 h-5" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Products List (Table for Desktop, Cards for Mobile) */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                  <th className="p-4 pl-6">Produto</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center pr-6">Ações</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors group"
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border flex-shrink-0 bg-muted flex items-center justify-center">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.nome} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            )}
                            {product.destaque && (
                              <div className="absolute top-0 right-0 bg-yellow-500 text-white p-0.5 rounded-bl-lg">
                                <Star className="w-3 h-3 fill-current" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">{product.nome}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{product.descricao}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        <span className="px-3 py-1 bg-accent/30 text-accent-foreground rounded-full border border-accent/20">
                          {product.categoria}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-foreground">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="p-4 pr-6 relative">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                            className="p-2 rounded-lg hover:bg-border transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <AnimatePresence>
                          {activeDropdown === product.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-12 top-10 z-50 w-48 bg-[#2D0A45] border border-honey/20 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-none"
                              >
                                <button onClick={() => openEditModal(product)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                                  <Edit className="w-4 h-4 text-honey" /> Editar
                                </button>
                                <button onClick={() => { handleDuplicateProduct(product); setActiveDropdown(null) }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                                  <Copy className="w-4 h-4 text-honey" /> Duplicar
                                </button>
                                <div className="h-px bg-honey/10 w-full" />
                                <button onClick={() => { handleDeleteProduct(product); setActiveDropdown(null) }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                  <Trash2 className="w-4 h-4" /> Excluir
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border flex-shrink-0 bg-muted flex items-center justify-center">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.nome} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                    {product.destaque && (
                      <div className="absolute top-0 right-0 bg-yellow-500 text-white p-1 rounded-bl-lg">
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground truncate">{product.nome}</h3>
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                        className="p-1 rounded-lg hover:bg-border text-muted-foreground"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.descricao}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 bg-accent/30 text-accent-foreground text-[10px] font-bold rounded-full border border-accent/20">
                        {product.categoria}
                      </span>
                      <StatusBadge status={product.status} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Preço</span>
                    <span className="font-bold text-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                     {/* No stock display anymore */}
                  </div>
                </div>

                <AnimatePresence>
                  {activeDropdown === product.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border/30 grid grid-cols-3 gap-2"
                    >
                      <button onClick={() => openEditModal(product)} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 text-foreground">
                        <Edit className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Editar</span>
                      </button>
                      <button onClick={() => { handleDuplicateProduct(product); setActiveDropdown(null) }} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 text-foreground">
                        <Copy className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Duplicar</span>
                      </button>
                      <button onClick={() => { handleDeleteProduct(product); setActiveDropdown(null) }} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive">
                        <Trash2 className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Excluir</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!isLoading && filteredProducts.length === 0 && (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center bg-card border border-border/50 rounded-2xl">
            <Package className="w-12 h-12 mb-4 opacity-20" />
            <p>Nenhum produto encontrado com estes filtros.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSaving && setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-muted/30">
                <h2 className="text-xl font-heading font-bold text-foreground">
                  {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                <button 
                  disabled={isSaving}
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-border text-muted-foreground transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form id="productForm" onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                <div 
                  onClick={() => !isSaving && document.getElementById('fileInput')?.click()}
                  className="w-full h-48 rounded-2xl bg-muted/50 border-2 border-dashed border-border/50 flex flex-col items-center justify-center group hover:bg-muted transition-colors cursor-pointer relative overflow-hidden"
                >
                   <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    disabled={isSaving}
                   />
                   
                   {previewUrl ? (
                      <img src={previewUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Preview" />
                   ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Clique para selecionar foto do produto</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</p>
                      </>
                   )}
                   
                   {isSaving && uploadProgress > 0 && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 px-10">
                         <p className="text-white text-sm font-bold mb-2">Subindo imagem... {Math.round(uploadProgress)}%</p>
                         <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-primary" 
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadProgress}%` }}
                            />
                         </div>
                      </div>
                   )}

                   {!isSaving && (
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">Alterar Imagem</span>
                    </div>
                   )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Nome do Produto</label>
                    <input name="nome" defaultValue={editingProduct?.nome} required disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors" placeholder="Ex: Ursinho Pooh" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Preço (R$)</label>
                    <input name="preco" type="number" step="0.01" defaultValue={editingProduct?.preco} required disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors" placeholder="Ex: 145.00" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Categoria</label>
                    {isLoadingCats ? (
                      <div className="h-12 bg-muted animate-pulse rounded-xl" />
                    ) : categories.length > 0 ? (
                      <select name="categoria" defaultValue={editingProduct?.categoria || categories[0].nome} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors appearance-none cursor-pointer">
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center justify-between">
                        <span className="text-xs text-destructive font-medium">Nenhuma categoria encontrada</span>
                        <Link href="/admin/categorias" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                          Criar <Tag className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-foreground">Descrição</label>
                    <textarea name="descricao" defaultValue={editingProduct?.descricao} rows={3} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors resize-none" placeholder="Conte a história dessa peça..." />
                  </div>

                  {/* Especificações da Peça */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-honey/20" />
                      <div className="flex items-center gap-2 text-honey font-heading font-bold text-xs uppercase tracking-widest">
                        <Ruler className="w-4 h-4" />
                        Especificações da Peça
                      </div>
                      <div className="h-px flex-1 bg-honey/20" />
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Altura (cm)</label>
                        <input name="altura" defaultValue={editingProduct?.especificacoes?.altura} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:border-honey/50 focus:outline-none transition-colors" placeholder="25" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Largura (cm)</label>
                        <input name="largura" defaultValue={editingProduct?.especificacoes?.largura} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:border-honey/50 focus:outline-none transition-colors" placeholder="15" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Peso (g)</label>
                        <input name="peso" defaultValue={editingProduct?.especificacoes?.peso} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:border-honey/50 focus:outline-none transition-colors" placeholder="120" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Indicado para</label>
                        <input name="indicadoPara" defaultValue={editingProduct?.especificacoes?.indicadoPara} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:border-honey/50 focus:outline-none transition-colors" placeholder="+3 anos" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Material</label>
                        <input name="material" defaultValue={editingProduct?.especificacoes?.material} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:border-honey/50 focus:outline-none transition-colors" placeholder="Fio 100% algodão, enchimento antialérgico" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Tempo de produção</label>
                        <input name="tempoProd" defaultValue={editingProduct?.especificacoes?.tempoProd} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:border-honey/50 focus:outline-none transition-colors" placeholder="7-10 dias úteis" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Observações</label>
                        <textarea name="observacoes" defaultValue={editingProduct?.especificacoes?.observacoes} rows={3} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-honey/50 focus:outline-none transition-colors resize-none" placeholder="Informações adicionais sobre a peça..." />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Status</label>
                    <select name="status" defaultValue={editingProduct?.status || 'active'} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors appearance-none cursor-pointer">
                      <option value="active">Ativo (Visível na loja)</option>
                      <option value="draft">Rascunho (Oculto)</option>
                      <option value="out_of_stock">Esgotado</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Tags (separadas por vírgula)</label>
                    <input name="tags" defaultValue={editingProduct?.tags?.join(', ')} disabled={isSaving} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors" placeholder="amigurumi, infantil, urso" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                  <input type="checkbox" id="highlight" name="destaque" defaultChecked={editingProduct?.destaque} disabled={isSaving} className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary" />
                  <label htmlFor="highlight" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    Destacar este produto na página inicial
                  </label>
                </div>
              </form>

              <div className="p-6 border-t border-border/50 bg-muted/30 flex justify-end gap-4">
                <button 
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl font-bold text-foreground hover:bg-border transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  form="productForm"
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  {isSaving ? 'Salvando...' : 'Salvar Mágica'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
