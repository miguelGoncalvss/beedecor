"use client"

import React from 'react'
import Link from 'next/link'
import { Logo, LogoText } from './ui/logo'
import { Camera, Globe, Mail, Phone, Heart } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'

export const Footer = () => {
  const { data: settings } = useSettings()

  return (
    <footer className="bg-purple-deep text-cream py-20 px-6 overflow-hidden relative dark">
      {/* Decorative Honeycomb */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-honey/5 clip-hexagon translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <LogoText />
          </Link>
          <p className="text-cream/60 font-sans font-light leading-relaxed">
            Arte em crochê feita com amor e dedicação por uma família apaixonada por artesanato.
          </p>
          <div className="flex items-center gap-4">
            {settings?.instagram && (
              <a 
                href={`https://instagram.com/${settings.instagram.replace('@','')}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-honey hover:text-purple-deep transition-all"
                title="Instagram"
              >
                <Camera className="w-5 h-5" />
              </a>
            )}
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-honey hover:text-purple-deep transition-all">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-xl mb-6">Links Rápidos</h4>
          <ul className="flex flex-col gap-4 text-cream/60">
            <li><Link href="/catalogo" className="hover:text-honey transition-colors">Catálogo</Link></li>
            <li><Link href="/sobre" className="hover:text-honey transition-colors">Sobre Nós</Link></li>
            <li><Link href="/contato" className="hover:text-honey transition-colors">Contato</Link></li>
            <li><Link href="/faq" className="hover:text-honey transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-xl mb-6">Categorias</h4>
          <ul className="flex flex-col gap-4 text-cream/60">
            <li><Link href="/catalogo" className="hover:text-honey transition-colors">Amigurumis</Link></li>
            <li><Link href="/catalogo" className="hover:text-honey transition-colors">Colecionáveis</Link></li>
            <li><Link href="/catalogo" className="hover:text-honey transition-colors">Decoração Infantil</Link></li>
            <li><Link href="/catalogo" className="hover:text-honey transition-colors">Presentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-xl mb-6">Contato</h4>
          <ul className="flex flex-col gap-4 text-cream/60">
            {settings?.whatsapp && (
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-honey flex-shrink-0 mt-1" />
                <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} className="hover:text-honey transition-colors break-all">
                  {settings.whatsapp}
                </a>
              </li>
            )}
            {settings?.email && (
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-honey flex-shrink-0 mt-1" />
                <a href={`mailto:${settings.email}`} className="hover:text-honey transition-colors break-all">
                  {settings.email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-honey flex-shrink-0 mt-1" />
              <span>Enviamos para todo o Brasil</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-cream/40 text-xs uppercase tracking-widest">
        <p>© 2026 Bee Decoração e Arte. Todos os direitos reservados.</p>
        <p>Desenvolvido com carinho por Bee Ateliê</p>
      </div>
    </footer>
  )
}
