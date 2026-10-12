# Bee Decoração e Arte 🐝✨
### *Plataforma Completa de E-commerce & Catálogo Digital para Ateliês e Produtos Artesanais*

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

---

## 📖 Visão Geral do Projeto

O **Bee Decoração e Arte** é uma solução digital de alto padrão desenvolvida especificamente para negócios artesanais, ateliês de amigurumis, presentes afetivos e produtos sob encomenda. 

Diferente de e-commerces tradicionais genéricos e frios, o projeto foi planejado para **transmitir o valor do trabalho manual** através de uma experiência imersiva e cinematográfica, aliada a um **fluxo de vendas direto no WhatsApp** que converte clientes sem cobrar taxas de intermediação de plataformas.

> 💡 **Pronto para Comercialização:** Esta solução foi estruturada para ser comercializada como uma plataforma completa de catálogo e vendas para artesãos, ceramistas, joalherias artesanais, confeitarias gourmet e criadores autorais.

---

## 💎 Diferenciais & Proposta de Valor Comercial

Por que esta plataforma é altamente atrativa para venda e implantação em pequenos e médios ateliês?

| Diferencial | Benefício para o Negócio |
| :--- | :--- |
| **💬 Conversão Direta via WhatsApp** | Zero comissões para gateways de pagamento. O cliente monta o pedido no carrinho e é direcionado com uma mensagem formatada e detalhada diretamente para o WhatsApp oficial do ateliê. |
| **🎨 Dupla Atmosfera Visual** | Alternância intencional entre o conceito **Midnight Atelier** (tons nobres, acolhimento e emoção para storytelling) e **Daylight Atelier** (foco em usabilidade, clareza e catálogo de produtos). |
| **✨ Experiência Viva e Interativa** | Microinterações com partículas dinâmicas de pólen reativas ao cursor e o assistente animado **"Bee"** que acompanha a navegação, gerando encantamento imediato no usuário. |
| **🎁 Buscador de Presentes Gamificado** | Um quiz interativo de recomendação que guia compradores indecisos até a peça ideal com base na ocasião e perfil de quem vai receber, aumentando a conversão. |
| **⚙️ CMS Administrativo Próprio (`/admin`)** | Painel completo e intuitivo para o lojista cadastrar produtos, coleções, categorias dinâmicas e editar canais de contato sem precisar de conhecimento técnico em programação. |
| **☁️ Pipeline de Mídia Otimizado** | Compressão automática de imagens no navegador do administrador antes do envio + CDN global via **Cloudinary**, garantindo carregamento ultrarrápido e economia de banda. |
| **⚡ Arquitetura Moderna e Escalável** | Desenvolvido com **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** e **Firebase Firestore**, garantindo performance máxima no Google (SEO) e velocidade instantânea. |

---

## 🛠️ Stack Tecnológica

- **Framework Web:** [Next.js 16](https://nextjs.org/) com App Router e Server/Client Components.
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) com tipagem estrita para segurança e manutenibilidade.
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) para design responsivo e performático.
- **Animações e Efeitos:** [Framer Motion](https://www.framer.com/motion/) para transições fluidas e microinterações imersivas.
- **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand) (Carrinho de compras, Favoritos e UI).
- **Data Fetching & Cache:** [TanStack React Query v5](https://tanstack.com/query) com invalidação automática de cache.
- **Banco de Dados & Autenticação:** [Firebase](https://firebase.google.com/) (Firestore NoSQL em tempo real e Firebase Authentication).
- **Backend Seguro:** [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) para validação criptográfica de tokens no servidor.
- **Hospedagem e CDN de Imagens:** [Cloudinary](https://cloudinary.com/) via API protegida.
- **Compressão de Mídia no Cliente:** `browser-image-compression`.
- **Componentes de UI & Ícones:** [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) e [Lucide React](https://lucide.dev/).

---

## 🎨 Sistema de Design & Identidade Visual

O design do projeto equilibra arte têxtil e elegância digital através de duas atmosferas complementares:

### 🌌 1. Midnight Atelier (Cinemática & Narrativa)
- **Onde é aplicada:** Hero da página inicial, seção de História/Sobre, Rodapé e Painel Administrativo.
- **Paleta de Cores:**
  - `Deep Royal Purple` (`#4B1366`): Elegância, mistério e profundidade artesanal.
  - `Honey Gold` (`#F4B942`): Calor, brilho do mel e sofisticação.
  - `Soft Cream` (`#FFF7EA`): Conforto e contraste legível.

### ☀️ 2. Daylight Atelier (Transacional & Funcional)
- **Onde é aplicada:** Catálogo de produtos, filtros, página de detalhes do produto, carrinho e formulários de contato.
- **Paleta de Cores:**
  - `Soft Cream` (`#FFF7EA`): Fundo claro e acolhedor.
  - `Pastel Blue` (`#C8E6F0`): Toques de frescor e serenidade.
  - `Deep Purple` (`#4B1366`): Textos e botões de alta legibilidade.

### ✍️ Tipografia
- **Títulos e Destaques:** `Outfit` (Visual moderno, geométrico e editorial).
- **Textos de Apoio e Leitura:** `Inter` (Clareza visual, legibilidade máxima em telas mobile).

---

## 🗺️ Como o Projeto Funciona na Prática

### 1. Loja Pública (Storefront)
- **`src/app/page.tsx`:** Página inicial com Hero interativo, carrossel de produtos em destaque, apresentação das artesãs e depoimentos.
- **`src/app/catalogo/page.tsx`:** Grid dinâmico com ordenação (preço, novidades) e filtros por categorias gerenciadas em tempo real pelo Firebase.
- **`src/app/catalogo/[id]/page.tsx`:** Página de detalhes com galeria de fotos, dimensões, materiais, prazo estimado de confecção e chamada para encomenda.
- **`src/app/colecoes/page.tsx`:** Vitrine temática agrupando produtos por linhas de lançamento (ex: *Coleção Encantada*, *Fé & Devoção*, *Casa & Estilo*).
- **`src/app/presente/page.tsx`:** Quiz interativo em etapas para recomendar o amigurumi ideal conforme quem vai receber e o estilo desejado.
- **`src/app/favoritos/page.tsx`:** Lista de desejos salva no navegador do cliente para fácil consulta posterior.
- **`src/app/sobre/page.tsx` & `src/app/faq/page.tsx`:** Narrativa da marca, apresentação da equipe e acordeão dinâmico com respostas para dúvidas comuns.
- **Carrinho Lateral (`CartDrawer`):** Permite adicionar múltiplos itens, ajustar quantidades e clicar em **"Finalizar Encomenda no WhatsApp"**, gerando automaticamente uma mensagem estruturada com todos os itens, quantidades e valores.

### 2. Painel Administrativo (`src/app/admin/`)
- **Login Seguro (`/admin/login`):** Tela de autenticação integrada ao Firebase Auth com layout refinado.
- **Dashboard Geral (`/admin`):** Métricas rápidas com contadores em tempo real de produtos ativos, coleções cadastradas e categorias.
- **Gestão de Produtos (`/admin/produtos`):** Criação, edição e exclusão de itens, com badges visuais de status (*Ativo*, *Esgotado*, *Rascunho*), upload seguro de imagens e vinculação de coleções.
- **Gestão de Categorias (`/admin/categorias`):** Criação dinâmica de novas categorias do catálogo com geração automática de `slug` amigável para URLs.
- **Gestão de Coleções (`/admin/colecoes`):** Agrupamento temático com personalização de cores de capa e imagens de banner.
- **Configurações de Canais (`/admin/configuracoes`):** Atualização instantânea dos canais de contato (WhatsApp, Instagram e E-mail comercial) sem mexer no código.

### 3. Backend e Camada de Mídia
- **`src/lib/firebase-service.ts`:** Serviços encapsulados para consultas e mutações no Firestore.
- **`src/app/api/upload/route.ts`:** Endpoint de servidor Next.js que valida o token do administrador e realiza o upload para o Cloudinary de forma protegida.
- **`src/lib/verify-admin.ts`:** Middleware interno que verifica a assinatura do token JWT emitido pelo Firebase e confirma o `UID` do administrador autorizado.

---

## 📁 Estrutura de Diretórios

```bash
beedecor/
├── public/                 # Imagens estáticas institucionais e ícones
├── src/
│   ├── app/                # Rotas da aplicação (Next.js App Router)
│   │   ├── admin/          # Painel administrativo protegido (CMS)
│   │   │   ├── categorias/ # CRUD de categorias
│   │   │   ├── colecoes/   # CRUD de coleções temáticas
│   │   │   ├── configuracoes/ # Edição de contatos e redes sociais
│   │   │   ├── login/      # Tela de login administrativo
│   │   │   └── produtos/   # CRUD e gestão de produtos
│   │   ├── api/            # API Routes do Next.js (Upload e remoção de imagens)
│   │   ├── catalogo/       # Catálogo público e detalhes do produto
│   │   ├── colecoes/       # Visualização das coleções
│   │   ├── contato/        # Página de contato
│   │   ├── faq/            # Perguntas frequentes
│   │   ├── favoritos/      # Lista de favoritos
│   │   ├── presente/       # Buscador interativo de presentes
│   │   ├── sobre/          # História do ateliê
│   │   ├── layout.tsx      # Layout raiz com fontes, provedores e atmosfera
│   │   └── page.tsx        # Página inicial (Home)
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/             # Primitivos de UI (Botões, Inputs, Modais)
│   │   ├── atmosphere.tsx  # Partículas flutuantes de pólen
│   │   ├── bee-assistant.tsx # Mascote interativo que voa pela tela
│   │   ├── cart-drawer.tsx # Carrinho com integração WhatsApp
│   │   ├── navbar.tsx      # Barra de navegação adaptativa
│   │   └── footer.tsx      # Rodapé cinematográfico
│   ├── hooks/              # Custom React Hooks (useProducts, useCategories, etc.)
│   ├── lib/                # Serviços (Firebase, Cloudinary, Zustand Store)
│   └── scripts/
│       └── seed.ts         # Script para popular o banco de dados com dados de exemplo
├── .env.example            # Modelo de variáveis de ambiente
├── firestore.rules         # Regras de segurança do Firebase Firestore
└── package.json            # Dependências e scripts do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** 20.x ou superior
- Gerenciador de pacotes: **npm**, **pnpm** ou **yarn**
- Uma conta no [Firebase](https://firebase.google.com/) (gratuita)
- Uma conta no [Cloudinary](https://cloudinary.com/) (gratuita)

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/beedecor.git
cd beedecor
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Copie o arquivo de modelo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Preencha as variáveis em `.env.local` com as suas credenciais reais:
- As chaves de cliente do Firebase (`NEXT_PUBLIC_FIREBASE_*`).
- As chaves do Firebase Admin SDK (`FIREBASE_ADMIN_*`).
- As chaves do Cloudinary (`CLOUDINARY_*`).

> 🔒 **Importante:** O arquivo `.env.local` nunca é enviado para o controle de versão por conter chaves e segredos.

### 4. Popular o Banco com Dados de Demonstração (Opcional)
Para iniciar a aplicação já com produtos, categorias e coleções temáticas cadastradas, execute o script de seed:
```bash
npm run seed
```

### 5. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a loja.

---

## 🔐 Configuração do Acesso Administrativo

Por motivos de segurança e boas práticas de desenvolvimento, **este projeto não possui senhas gravadas no código-fonte**. A autenticação é gerenciada diretamente pelo **Firebase Authentication**:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. No menu lateral, acesse **Build > Authentication > Users**.
3. Clique em **Add user** (Adicionar usuário) e informe o e-mail e a senha desejados para o administrador.
4. Após criar o usuário, copie o valor do campo **User UID** gerado pelo Firebase.
5. Cole esse valor na variável `FIREBASE_ADMIN_UID` no seu arquivo `.env.local` (e nas variáveis de ambiente da sua plataforma de deploy):
   ```env
   FIREBASE_ADMIN_UID="coloque-o-uid-aqui"
   ```
6. Acesse a rota `/admin/login` e faça login com as credenciais que você acabou de criar.

---

## 📦 Deploy em Produção

O projeto está otimizado para deploy em um clique na [Vercel](https://vercel.com/):

1. Suba o repositório no seu GitHub/GitLab.
2. Importe o projeto no painel da Vercel.
3. Nas configurações de **Environment Variables**, adicione todas as variáveis configuradas no seu `.env.local`.
4. Clique em **Deploy**.

Para testar o build de produção localmente:
```bash
npm run build
npm run start
```

---

## 💡 Como Adaptar ou Vender este Projeto para Outros Nichos

Esta base de código modular foi concebida para ser facilmente customizável para qualquer negócio artesanal ou boutique:

1. **Alteração de Tema e Cores:**
   - Ajuste as variáveis de cores no Tailwind CSS (`src/app/globals.css`) para a paleta da nova marca (ex: tons terrosos para cerâmica, tons pastéis para maternidade, minimalista monocromático para velas/joias).
2. **Atualização de Logotipo e Mascote:**
   - Substitua o componente de mascote (`bee-assistant.tsx`) pelo mascote ou ícone da marca parceira, ou desative-o com apenas uma linha no `layout.tsx`.
3. **Canais de Venda:**
   - Altere o número de WhatsApp e redes sociais diretamente pelo painel `/admin/configuracoes` sem tocar no código.

---

## 📄 Licença & Propriedade

Desenvolvido para **Bee Decoração e Arte** 🐝.  
Idealizado com dedicação para honrar a união entre a tradição artesanal manual e a excelência digital.
