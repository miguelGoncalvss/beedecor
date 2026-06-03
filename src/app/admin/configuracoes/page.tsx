"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Phone, Camera, Mail, Loader2, Sparkles, ShieldCheck } from 'lucide-react'
import { useSettings, useUpdateSettings } from '@/hooks/use-settings'
import { AdminSettings } from '@/lib/admin-store'

export default function AdminConfiguracoesPage() {
  const [mounted, setMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const { data: settings, isLoading } = useSettings()
  const updateSettingsMutation = useUpdateSettings()

  const [formData, setFormData] = useState<AdminSettings | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  if (!mounted) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    
    setIsSaving(true)
    try {
      await updateSettingsMutation.mutateAsync(formData)
    } catch (error) {
      console.error(error)
      alert("Erro ao salvar configurações.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading && !formData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-20 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie os canais de contato oficiais do ateliê</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving || !formData}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
          <span>Salvar Alterações</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border/50 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-honey/5 rounded-full blur-[80px] -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-honey/10 rounded-2xl text-honey">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Canais de Atendimento</h2>
              <p className="text-sm text-muted-foreground">Estes dados aparecem no rodapé e no fluxo de pedidos.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-10">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-honey rounded-full" />
                WhatsApp Comercial
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-honey transition-colors" />
                <input 
                  name="whatsapp" 
                  value={formData?.whatsapp || ''} 
                  onChange={handleChange}
                  placeholder="Ex: 5511999999999"
                  className="w-full bg-background border border-border rounded-2xl px-12 py-4 focus:border-honey/50 focus:outline-none transition-all focus:ring-4 focus:ring-honey/5" 
                />
              </div>
              <p className="text-xs text-muted-foreground pl-1">Inclua o DDI (55) e o DDD. Ex: 5511999999999</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-honey rounded-full" />
                Instagram Oficial
              </label>
              <div className="relative group">
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-honey transition-colors" />
                <input 
                  name="instagram" 
                  value={formData?.instagram || ''} 
                  onChange={handleChange}
                  placeholder="Ex: @beedecoracaoearte"
                  className="w-full bg-background border border-border rounded-2xl px-12 py-4 focus:border-honey/50 focus:outline-none transition-all focus:ring-4 focus:ring-honey/5" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-honey rounded-full" />
                E-mail de Contato
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-honey transition-colors" />
                <input 
                  name="email" 
                  type="email"
                  value={formData?.email || ''} 
                  onChange={handleChange}
                  placeholder="contato@beedecor.com"
                  className="w-full bg-background border border-border rounded-2xl px-12 py-4 focus:border-honey/50 focus:outline-none transition-all focus:ring-4 focus:ring-honey/5" 
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center gap-4 px-8 py-6 bg-white/50 rounded-3xl border border-dashed border-border">
         <ShieldCheck className="w-8 h-8 text-honey" />
         <div>
            <p className="font-bold text-foreground">Sessão Segura</p>
            <p className="text-sm text-muted-foreground">Suas informações de contato são criptografadas e armazenadas com segurança.</p>
         </div>
      </div>
    </div>
  )
}
