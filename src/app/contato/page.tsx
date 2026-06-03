"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send, Camera, MessageCircle, Loader2 } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import { Skeleton } from '@/components/ui/skeleton'

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const { data: settings, isLoading } = useSettings()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-honey/10 clip-hexagon -rotate-12 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pastel-blue/20 clip-hexagon rotate-45 -translate-x-1/4 translate-y-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-secondary font-bold uppercase tracking-[0.4em] text-xs mb-6 block"
            >
              Vamos Conversar
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-6xl md:text-7xl font-bold text-primary mb-8"
            >
              Fale <span className="text-secondary">Conosco</span>
            </motion.h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light">
              Tem alguma dúvida, quer fazer um pedido personalizado ou apenas dizer um oi? Estamos aqui para te ouvir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 md:p-12 rounded-[40px] shadow-xl border border-border/50"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">Nome</label>
                    <input type="text" placeholder="Seu nome" className="w-full px-6 py-4 bg-muted/50 border border-transparent rounded-full focus:bg-white focus:border-honey/50 focus:ring-4 focus:ring-honey/10 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">E-mail</label>
                    <input type="email" placeholder="seu@email.com" className="w-full px-6 py-4 bg-muted/50 border border-transparent rounded-full focus:bg-white focus:border-honey/50 focus:ring-4 focus:ring-honey/10 transition-all outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">Assunto</label>
                  <select className="w-full px-6 py-4 bg-muted/50 border border-transparent rounded-full focus:bg-white focus:border-honey/50 focus:ring-4 focus:ring-honey/10 transition-all outline-none appearance-none">
                    <option>Dúvida Geral</option>
                    <option>Pedido Personalizado</option>
                    <option>Elogio/Sugestão</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">Mensagem</label>
                  <textarea rows={5} placeholder="Como podemos te ajudar?" className="w-full px-6 py-4 bg-muted/50 border border-transparent rounded-3xl focus:bg-white focus:border-honey/50 focus:ring-4 focus:ring-honey/10 transition-all outline-none resize-none"></textarea>
                </div>
                <Button className="w-full rounded-full h-16 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Enviar Mensagem
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center space-y-12 lg:pl-12">
              <div className="space-y-8">
                {(!mounted || isLoading) ? (
                  <>
                    <div className="flex items-start gap-6">
                      <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {settings?.whatsapp && (
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-md shrink-0">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xl text-primary mb-1">Telefone / WhatsApp</h4>
                          <a 
                            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-secondary transition-colors"
                          >
                            {settings.whatsapp}
                          </a>
                        </div>
                      </div>
                    )}

                    {settings?.email && (
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-md shrink-0">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xl text-primary mb-1">E-mail</h4>
                          <a 
                            href={`mailto:${settings.email}`}
                            className="text-muted-foreground hover:text-secondary transition-colors"
                          >
                            {settings.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-md shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl text-primary mb-1">Nosso Ateliê</h4>
                    <p className="text-muted-foreground">São Paulo, SP - Enviamos para todo o Brasil</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-border/50">
                <h4 className="font-heading font-bold text-xl text-primary mb-6">Redes Sociais</h4>
                <div className="flex flex-wrap gap-4">
                  {mounted && settings?.instagram && (
                    <a 
                      href={`https://instagram.com/${settings.instagram.replace('@','')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="rounded-full px-8 border-primary/10 hover:bg-primary hover:text-white transition-all">
                        <Camera className="mr-2 w-4 h-4" />
                        Instagram
                      </Button>
                    </a>
                  )}
                  {mounted && settings?.whatsapp && (
                    <a 
                      href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="rounded-full px-8 border-primary/10 hover:bg-green-600 hover:text-white transition-all">
                        <MessageCircle className="mr-2 w-4 h-4" />
                        WhatsApp
                      </Button>
                    </a>
                  )}
                  {(!mounted || isLoading) && (
                    <>
                      <Skeleton className="h-10 w-32 rounded-full" />
                      <Skeleton className="h-10 w-32 rounded-full" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
