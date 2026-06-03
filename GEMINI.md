# Bee Decoração e Arte - Documentação Completa do Projeto

Este documento é o guia definitivo sobre a arquitetura, design, funcionalidades e estrutura do site "Bee Decoração e Arte", um ateliê familiar de amigurumis artesanais.

---

## 1. Stack Tecnológica (O Coração do Projeto)

O site utiliza as tecnologias mais avançadas do ecossistema Frontend moderno:

- **Framework Principal:** Next.js 16+ (App Router).
- **Linguagem:** TypeScript (Tipagem estrita).
- **Estilização:** Tailwind CSS v4 (Performance máxima e CSS moderno).
- **Animações:** Framer Motion (Transições imersivas e microinterações).
- **Estado Global:** Zustand (Carrinho, Favoritos e UI).
- **Backend:** Firebase (Firestore para DB e Auth para login administrativo).
- **Mídia:** Cloudinary (Gerenciamento e otimização de imagens via API segura).

---

## 2. Sistema de Design (Identidade Visual)

O projeto alterna entre duas "atmosferas" principais:

### 2.1. Atmosfera "Midnight Atelier" (Cinemática)
- **Cores:** Deep Royal Purple (`#4B1366`) e Honey Gold (`#F4B942`).
- **Uso:** Hero, História, Rodapé, Login e Painel Administrativo.

### 2.2. Interface "Daylight Atelier" (Transacional)
- **Cores:** Soft Cream (`#FFF7EA`), Deep Purple e Pastel Blue (`#C8E6F0`).
- **Uso:** Catálogo, Carrinho, Contato e FAQ.

---

## 3. Funcionalidades de Destaque

- **Atmosfera Viva:** Sistema de partículas de pólen e o assistente "Bee" que voa pela tela.
- **Fluxo WhatsApp:** Conversão direta de interesse em venda através de mensagens formatadas.
- **Painel Administrativo:** Gerenciamento completo de produtos, coleções, mídia e configurações em tempo real.
- **Buscador de Presentes:** Experiência gamificada para encontrar o amigurumi ideal.

---

## 4. Estrutura de Arquivos (Arquivo por Arquivo)

### 📂 `src/app/` (Rotas e Páginas)
- `layout.tsx`: Estrutura base com fontes (`Outfit`, `Inter`), Providers e componentes globais (Atmosphere, BeeAssistant).
- `page.tsx`: Home cinematográfica com seções de destaque e história.
- `catalogo/page.tsx`: Grid de produtos com filtros por categoria e ordenação.
- `catalogo/[id]/page.tsx`: Detalhes individuais do produto e botão de encomenda.
- `sobre/page.tsx`: Narrativa da marca e apresentação da equipe de artesãs.
- `contato/page.tsx`: Formulário e informações de contato (WhatsApp/Email).
- `faq/page.tsx`: Acordeão interativo com dúvidas frequentes sobre o ateliê.
- `presente/page.tsx`: Questionário interativo para recomendação de produtos.
- `colecoes/page.tsx`: Visualização de produtos agrupados por temas.
- `favoritos/page.tsx`: Lista de produtos marcados pelo usuário.
- `admin/`: Subdiretório protegido por autenticação para gestão do site.
  - `login/`: Tela de entrada imersiva para administradores.
  - `produtos/`: CRUD de produtos com upload de imagem via Cloudinary.
  - `categorias/` e `colecoes/`: Gestão das taxonomias do site.
  - `configuracoes/`: Edição de textos de marketing e links de contato.
- `api/upload/`: Rotas de servidor para comunicação segura com a API do Cloudinary.

### 📂 `src/components/` (Interface e UI)
- `ui/`: Componentes básicos reutilizáveis (Botões, Logo, Skeletons).
- `navbar.tsx`: Navegação adaptativa que flutua no topo.
- `footer.tsx`: Rodapé imersivo com links rápidos e identidade visual "Midnight".
- `cart-drawer.tsx`: Menu lateral do carrinho com integração para WhatsApp.
- `atmosphere.tsx`: Sistema de partículas flutuantes.
- `bee-assistant.tsx`: A pequena abelha animada que traz vida ao site.
- `product-card.tsx`: Card de produto com efeitos de hover e botões de ação rápida.

### 📂 `src/lib/` (Lógica e Serviços)
- `firebase.ts`: Inicialização do cliente Firebase.
- `firebase-service.ts`: Camada de abstração para chamadas ao Firestore (getProducts, updateSettings, etc).
- `upload-service.ts`: Lógica de compressão de imagem no cliente e envio para a API de upload.
- `store.ts`: Estado global (Zustand) para o lado público (Carrinho, UI).
- `admin-store.ts`: Estado global focado em operações administrativas.
- `utils.ts`: Funções utilitárias (formatação de moeda, classes dinâmicas).

### 📂 `src/hooks/` (Hooks de Dados)
- `use-products.ts`, `use-categories.ts`, etc: Hooks que utilizam React Query para caching e sincronização de dados do Firebase.

### 📂 `src/scripts/`
- `seed.ts`: Script para popular o banco de dados inicial com dados de exemplo.

### 📂 `public/`
- `pics/`: Armazenamento de imagens estáticas locais usadas em seções institucionais.

---

## 5. Fluxos de Trabalho Reais

1. **Gestão de Mídia:** Imagens são comprimidas via `browser-image-compression` antes do upload para economizar banda e garantir performance.
2. **Segurança Admin:** Rotas `/admin` verificam a sessão do Firebase Auth. Tokens são gerenciados pelo Next.js middleware/componentes de servidor quando aplicável.
3. **Conversão:** O `CartDrawer` formata uma mensagem de texto rica para o WhatsApp, incluindo nomes de produtos, quantidades e preços.

---
*Este projeto honra a arte têxtil manual através da excelência digital.*
