import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface AdminProduct {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  destaque: boolean;
  status: 'active' | 'out_of_stock' | 'draft';
  imageUrl: string;
  collection?: string;
  colecoes?: string[];
  tags: string[];
  moods?: string[];
  giftFor?: string[];
  especificacoes?: {
    altura?: string;
    largura?: string;
    peso?: string;
    material?: string;
    tempoProd?: string;
    indicadoPara?: string;
    observacoes?: string;
  };
  criadoEm?: any;
  atualizadoEm?: any;
}

export interface AdminCollection {
  id: string;
  nome: string;
  descricao: string;
  capa: string;
  productCount: number;
  color?: string;
  produtosIds?: string[];
  criadoEm?: any;
}

export interface AdminCategory {
  id: string;
  nome: string;
  slug: string;
  criadoEm: any;
}

export interface AdminSettings {
  whatsapp: string;
  instagram: string;
  email: string;
}

export interface MelOption {
  id: string;
  icone: string;
  label: string;
  proximo?: string;
  acao?: string;
}

export interface MelNode {
  id: string;
  mensagem: string;
  opcoes: MelOption[];
  ativo: boolean;
  admin: boolean;
  criadoEm?: any;
}

interface AdminState {
  user: AdminUser | null;
  products: AdminProduct[];
  collections: AdminCollection[];
  categories: AdminCategory[];
  settings: AdminSettings | null;
  isLoading: boolean;
  
  // Auth Actions
  setUser: (user: AdminUser | null) => void;
  
  // Data Actions
  setProducts: (products: AdminProduct[]) => void;
  setCollections: (collections: AdminCollection[]) => void;
  setCategories: (categories: AdminCategory[]) => void;
  setSettings: (settings: AdminSettings) => void;
  setLoading: (loading: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      user: null,
      products: [],
      collections: [],
      categories: [],
      settings: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setProducts: (products) => set({ products }),
      setCollections: (collections) => set({ collections }),
      setCategories: (categories) => set({ categories }),
      setSettings: (settings) => set({ settings }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'beedecor-admin-storage',
      partialize: (state) => ({ user: state.user }), // Só persiste o usuário
    }
  )
);
