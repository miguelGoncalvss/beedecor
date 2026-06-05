import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp, setDoc, doc, getDocs, getDoc, query, where } from "firebase/firestore";

/**
 * Script para popular o Firestore com dados iniciais (Seed)
 * Rode com: npx tsx src/scripts/seed.ts
 */

const LIB_COLLECTIONS = [
  {
    id: 'encantada',
    name: 'Coleção Encantada',
    description: 'Um mundo de fantasia e seres mágicos para despertar a imaginação.',
    image: '/pics/io_personagemUrsihopoo.jpg',
    color: '#F4B942'
  },
  {
    id: 'religiosa',
    name: 'Fé & Devoção',
    description: 'Peças que transmitem paz, proteção e espiritualidade em cada ponto.',
    image: '/pics/nossaSenhora.jpg',
    color: '#C8E6F0'
  },
  {
    id: 'casa-estilo',
    name: 'Casa & Estilo',
    description: 'Amigurumis que elevam a decoração e trazem personalidade ao seu ambiente.',
    image: '/pics/fridaKhalo.jpg',
    color: '#4B1366'
  }
];

const LIB_PRODUCTS = [
  {
    id: '1',
    name: 'Frida Kahlo',
    price: 120.00,
    category: 'Colecionáveis',
    image: '/pics/fridaKhalo.jpg',
    tag: 'Destaque',
    collections: ['casa-estilo', 'encantada'],
    moods: ['artistic', 'strong', 'classic'],
    giftFor: ['adults', 'home'],
    description: 'Nossa Frida Kahlo é uma homenagem artística à icônica pintora mexicana. Feita com riqueza de detalhes, desde as flores em seu cabelo até sua expressão marcante, esta peça é perfeita para colecionadores e amantes de arte.',
  },
  {
    id: '2',
    name: 'Bisonho (Eeyore)',
    price: 145.00,
    category: 'Personagens',
    image: '/pics/io_personagemUrsihopoo.jpg',
    tag: 'Novo',
    collections: ['encantada'],
    moods: ['cozy', 'nostalgic', 'fun'],
    giftFor: ['kids', 'babies', 'adults'],
    description: 'O Bisonho (Eeyore) é um clássico que encanta gerações. Com suas orelhas caídas e expressão melancólica porém adorável, ele é tecido com fios de altíssima qualidade para garantir um toque macio e reconfortante.',
  },
  {
    id: '3',
    name: 'Nossa Senhora',
    price: 95.00,
    category: 'Religiosos',
    image: '/pics/nossaSenhora.jpg',
    collections: ['religiosa'],
    moods: ['religious', 'peaceful', 'classic'],
    giftFor: ['adults', 'home', 'babies'],
    description: 'Uma peça que transmite paz e devoção. Nossa Senhora em amigurumi é ideal para oratórios, decorações religiosas ou como um presente significativo para batizados e datas especiais.',
  },
  {
    id: '4',
    name: 'Chaveiros Vaquinhas',
    price: 45.00,
    category: 'Chaveiros',
    image: '/pics/chaveirosVaquinhasVermelhaRosa.jpg',
    collections: ['casa-estilo'],
    moods: ['fun', 'cute'],
    giftFor: ['kids', 'adults'],
    description: 'Nossas vaquinhas são as companheiras perfeitas para suas chaves ou mochila. Pequenas, charmosas e cheias de personalidade, elas trazem um toque de fofura para o seu dia a dia.',
  },
  {
    id: '5',
    name: 'Gatinho Miau',
    price: 85.00,
    category: 'Pets',
    image: '/pics/gato.jpg',
    collections: ['casa-estilo', 'encantada'],
    moods: ['cozy', 'fun', 'cute'],
    giftFor: ['kids', 'home', 'adults'],
    description: 'Inspirado no amor felino da nossa família. Este gatinho é tão fofo que você vai querer abraçá-lo o dia todo. Disponível em várias cores para combinar com seu pet real!',
  },
  {
    id: '6',
    name: 'Dente de Leite',
    price: 55.00,
    category: 'Bebês',
    image: '/pics/dente.jpg',
    collections: ['encantada'],
    moods: ['fun', 'magical'],
    giftFor: ['kids', 'babies'],
    description: 'Uma forma lúdica e carinhosa de celebrar a fase de troca de dentes das crianças. O dente de leite amigurumi vem com um pequeno bolsinho atrás para a Fada do Dente deixar a moedinha!',
  },
  {
    id: '7',
    name: 'Santa Amigurumi',
    price: 110.00,
    category: 'Religiosos',
    image: '/pics/santa.jpg',
    collections: ['religiosa'],
    moods: ['religious', 'artistic'],
    giftFor: ['adults', 'home'],
    description: 'Peça artesanal exclusiva com manto detalhado e coroa. Uma expressão de fé em forma de arte têxtil, criada com extremo cuidado nos detalhes litúrgicos.',
  }
];

const MOCK_SETTINGS = {
  whatsapp: "(11) 99999-9999",
  instagram: "@beedecor",
  email: "contato@beedecor.com"
};

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const seed = async () => {
  console.log("🚀 Iniciando migração de dados para o Firestore...");

  try {
    // 1. Migrar Categorias
    console.log("🏷️ Migrando categorias...");
    const categoriesCol = collection(db, "categorias");
    const initialCategories = [
      "Personagens",
      "Religiosos",
      "Pets",
      "Chaveiros",
      "Bebês",
      "Especiais",
      "Colecionáveis"
    ];

    for (const nome of initialCategories) {
      const slug = generateSlug(nome);
      // Check if already exists
      const q = query(categoriesCol, where("slug", "==", slug));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        await addDoc(categoriesCol, {
          nome,
          slug,
          criadoEm: serverTimestamp()
        });
        console.log(`✅ Categoria "${nome}" criada.`);
      } else {
        console.log(`ℹ️ Categoria "${nome}" já existe, pulando.`);
      }
    }

    // 2. Migrar Produtos
    console.log("📦 Migrando produtos...");
    const productsCol = collection(db, "produtos");
    
    for (const p of LIB_PRODUCTS) {
      // Check if already exists by name
      const q = query(productsCol, where("nome", "==", p.name));
      const snap = await getDocs(q);

      if (snap.empty) {
        await addDoc(productsCol, {
          nome: p.name,
          preco: p.price,
          categoria: p.category,
          tags: [],
          descricao: p.description,
          imageUrl: p.image,
          status: "active",
          moods: p.moods || [],
          giftFor: p.giftFor || [],
          colecoes: p.collections || [],
          destaque: p.tag === "Destaque",
          criadoEm: serverTimestamp(),
          atualizadoEm: serverTimestamp()
        });
        console.log(`✅ Produto "${p.name}" criado.`);
      }
    }

    // 3. Migrar Coleções
    console.log("📂 Migrando coleções...");
    const collectionsCol = collection(db, "colecoes");
    for (const c of LIB_COLLECTIONS) {
      const q = query(collectionsCol, where("nome", "==", c.name));
      const snap = await getDocs(q);

      if (snap.empty) {
        await addDoc(collectionsCol, {
          nome: c.name,
          descricao: c.description,
          capa: c.image,
          color: c.color,
          produtosIds: [],
          productCount: 0,
          criadoEm: serverTimestamp()
        });
        console.log(`✅ Coleção "${c.name}" criada.`);
      }
    }

    // 4. Migrar Configurações
    console.log("⚙️ Migrando configurações...");
    const settingsDoc = doc(db, "configuracoes", "site");
    await setDoc(settingsDoc, {
      whatsapp: MOCK_SETTINGS.whatsapp,
      instagram: MOCK_SETTINGS.instagram,
      email: MOCK_SETTINGS.email,
      atualizadoEm: serverTimestamp()
    }, { merge: true });
    console.log("✅ Configurações migradas!");

    // 5. Migrar Fluxo da Mel
    console.log("🐝 Migrando fluxo da Mel...");
    const melCol = collection(db, "mel_fluxo");
    const initialMelFlow = [
      {
        id: "inicio",
        mensagem: "Olá! Sou a Mel, assistente do Bee Ateliê! 🐝 Como posso te ajudar hoje?",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "🧶", label: "Ver nossos produtos", proximo: "produtos" },
          { id: "op2", icone: "🎁", label: "Fazer uma encomenda", proximo: "encomenda" },
          { id: "op3", icone: "📦", label: "Prazo e entrega", proximo: "prazo" },
          { id: "op4", icone: "💬", label: "Falar com uma artesã", proximo: "contato" },
        ]
      },
      {
        id: "produtos",
        mensagem: "Temos peças lindas feitas com muito amor! O que você está procurando?",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "🐾", label: "Animais e Pets", proximo: "catalogo" },
          { id: "op2", icone: "👸", label: "Personagens", proximo: "catalogo" },
          { id: "op3", icone: "🙏", label: "Religiosos", proximo: "catalogo" },
          { id: "op4", icone: "🎀", label: "Quero uma surpresa!", proximo: "presente" },
        ]
      },
      {
        id: "catalogo",
        mensagem: "Que ótimo gosto! Vou te levar direto para o nosso catálogo. 🌟",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "👀", label: "Ver catálogo completo", acao: "catalogo" },
          { id: "op2", icone: "🔙", label: "Voltar ao início", proximo: "inicio" },
        ]
      },
      {
        id: "presente",
        mensagem: "Deixa eu te ajudar a encontrar o presente perfeito! ✨",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "🎯", label: "Usar o buscador de presentes", acao: "presente" },
          { id: "op2", icone: "🔙", label: "Voltar ao início", proximo: "inicio" },
        ]
      },
      {
        id: "encomenda",
        mensagem: "Adoramos fazer peças personalizadas! Cada amigurumi é único e feito com carinho. 🧶 Como prefere continuar?",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "📱", label: "Chamar no WhatsApp", acao: "whatsapp" },
          { id: "op2", icone: "🛍️", label: "Ver o catálogo primeiro", acao: "catalogo" },
          { id: "op3", icone: "🔙", label: "Voltar ao início", proximo: "inicio" },
        ]
      },
      {
        id: "prazo",
        mensagem: "Cada peça é feita à mão com muito carinho, por isso o prazo médio é de 7 a 15 dias úteis após a confirmação. 📦 Mais alguma dúvida?",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "📦", label: "Como funciona a entrega?", proximo: "entrega" },
          { id: "op2", icone: "💬", label: "Falar com uma artesã", proximo: "contato" },
          { id: "op3", icone: "🔙", label: "Voltar ao início", proximo: "inicio" },
        ]
      },
      {
        id: "entrega",
        mensagem: "Enviamos para todo o Brasil pelos Correios e transportadoras parceiras. O frete é calculado no momento da encomenda! 🚚",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "🎁", label: "Quero fazer uma encomenda", proximo: "encomenda" },
          { id: "op2", icone: "🔙", label: "Voltar ao início", proximo: "inicio" },
        ]
      },
      {
        id: "contato",
        mensagem: "Nossas artesãs adoram conversar com você! Escolha como prefere falar:",
        ativo: true,
        admin: false,
        opcoes: [
          { id: "op1", icone: "📱", label: "WhatsApp", acao: "whatsapp" },
          { id: "op2", icone: "📸", label: "Instagram", acao: "instagram" },
          { id: "op3", icone: "🔙", label: "Voltar ao início", proximo: "inicio" },
        ]
      },
      // Admin Nodes
      {
        id: "admin_inicio",
        mensagem: "Olá! Sou a Mel, sua assistente do ateliê. 🐝\nPara onde quer ir?",
        ativo: true,
        admin: true,
        opcoes: [
          { id: "op1", icone: "🧶", label: "Gerenciar Produtos", acao: "admin_produtos" },
          { id: "op2", icone: "📂", label: "Coleções", acao: "admin_colecoes" },
          { id: "op3", icone: "🏷️", label: "Categorias", acao: "admin_categorias" },
          { id: "op4", icone: "⚙️", label: "Configurações", acao: "admin_configuracoes" },
          { id: "op5", icone: "💡", label: "Ver dicas rápidas", proximo: "admin_dicas" }
        ]
      },
      {
        id: "admin_dicas",
        mensagem: "Aqui vão algumas dicas rápidas para o ateliê! ✨",
        ativo: true,
        admin: true,
        opcoes: [
          { id: "op1", icone: "⭐", label: "Como destacar produtos?", proximo: "admin_dica_destaque" },
          { id: "op2", icone: "📱", label: "Atualizar WhatsApp", acao: "admin_configuracoes" },
          { id: "op3", icone: "🔙", label: "Voltar", proximo: "admin_inicio" }
        ]
      },
      {
        id: "admin_dica_destaque",
        mensagem: "Na página de Produtos, abra qualquer produto e ative a estrela de Destaque ⭐ — ele aparece automaticamente na seção principal da Home!",
        ativo: true,
        admin: true,
        opcoes: [
          { id: "op1", icone: "🧶", label: "Ir para Produtos", acao: "admin_produtos" },
          { id: "op2", icone: "🔙", label: "Voltar", proximo: "admin_inicio" }
        ]
      }
    ];

    for (const node of initialMelFlow) {
      const nodeDoc = doc(melCol, node.id);
      const snap = await getDoc(nodeDoc);

      if (!snap.exists()) {
        await setDoc(nodeDoc, {
          ...node,
          criadoEm: serverTimestamp()
        });
        console.log(`✅ Nó Mel "${node.id}" criado.`);
      } else {
        console.log(`ℹ️ Nó Mel "${node.id}" já existe, pulando.`);
      }
    }

    console.log("✨ Migração concluída com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    process.exit(1);
  }
};

seed();
