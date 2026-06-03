import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy, 
  serverTimestamp,
  Timestamp,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { AdminProduct, AdminCollection, AdminSettings, AdminCategory } from "./admin-store";

// Helper for slugs
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

// --- Helpers ---
const getCol = (name: string) => collection(db, name);

// --- Produtos ---

export const getProducts = async (): Promise<AdminProduct[]> => {
  console.log("🔍 Buscando todos os produtos...");
  // Removido orderBy para evitar excluir produtos sem o campo criadoEm
  const q = query(getCol("produtos"));
  const snapshot = await getDocs(q);
  
  const products = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Garantir campos para legado
      imageUrl: data.imageUrl || data.image || '/pics/nossaSenhora.jpg',
      status: data.status || 'active'
    } as AdminProduct;
  });

  // Ordenação em memória para ser resiliente
  return products.sort((a, b) => {
    const dateA = a.criadoEm?.seconds || 0;
    const dateB = b.criadoEm?.seconds || 0;
    return dateB - dateA;
  });
};

export const getProductById = async (id: string): Promise<AdminProduct | null> => {
  const docRef = doc(db, "produtos", id);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data();
    return { 
      id: snap.id, 
      ...data,
      imageUrl: data.imageUrl || data.image || '/pics/nossaSenhora.jpg',
      status: data.status || 'active'
    } as AdminProduct;
  }
  return null;
};

export const createProduct = async (data: Omit<AdminProduct, "id">): Promise<string> => {
  // Limpar especificacoes se estiver vazio
  if (data.especificacoes) {
    const hasValues = Object.values(data.especificacoes).some(v => v && String(v).trim() !== '');
    if (!hasValues) delete data.especificacoes;
  }

  const docRef = await addDoc(getCol("produtos"), {
    ...data,
    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  });
  return docRef.id;
};

export const updateProduct = async (id: string, data: Partial<AdminProduct>): Promise<void> => {
  // Limpar especificacoes se estiver vazio
  if (data.especificacoes) {
    const hasValues = Object.values(data.especificacoes).some(v => v && String(v).trim() !== '');
    if (!hasValues) delete data.especificacoes;
  }

  const docRef = doc(db, "produtos", id);
  await updateDoc(docRef, {
    ...data,
    atualizadoEm: serverTimestamp()
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, "produtos", id);
  await deleteDoc(docRef);
};

// --- Coleções ---

export const getCollections = async (): Promise<AdminCollection[]> => {
  const q = query(getCol("colecoes"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as AdminCollection));
};

export const createCollection = async (data: Omit<AdminCollection, "id">): Promise<string> => {
  const docRef = await addDoc(getCol("colecoes"), {
    ...data,
    criadoEm: serverTimestamp()
  });
  return docRef.id;
};

export const updateCollection = async (id: string, data: Partial<AdminCollection>): Promise<void> => {
  const docRef = doc(db, "colecoes", id);
  await updateDoc(docRef, data);
};

export const deleteCollection = async (id: string): Promise<void> => {
  const docRef = doc(db, "colecoes", id);
  await deleteDoc(docRef);
};

// --- Categorias ---

export const getCategories = async (): Promise<AdminCategory[]> => {
  console.log("🔍 Buscando categorias no Firestore...");
  const q = query(getCol("categorias"), orderBy("nome", "asc"));
  const snapshot = await getDocs(q);
  console.log(`✅ ${snapshot.size} categorias encontradas.`);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as AdminCategory));
};

export const createCategory = async (nome: string): Promise<string> => {
  console.log(`📝 Criando categoria: ${nome}...`);
  const slug = generateSlug(nome);
  const docRef = await addDoc(getCol("categorias"), {
    nome,
    slug,
    criadoEm: serverTimestamp()
  });
  console.log(`✅ Categoria criada com ID: ${docRef.id}`);
  return docRef.id;
};

export const deleteCategory = async (id: string): Promise<void> => {
  console.log(`🗑️ Excluindo categoria ID: ${id}...`);
  const docRef = doc(db, "categorias", id);
  await deleteDoc(docRef);
  console.log("✅ Categoria excluída.");
};

export const syncCategoriesFromProducts = async (): Promise<number> => {
  console.log("🔄 Iniciando sincronização de categorias...");
  const products = await getProducts();
  const existingCategories = await getCategories();
  const existingNames = new Set(existingCategories.map(c => c.nome.toLowerCase()));
  
  const uniqueProductCategories = Array.from(new Set(products.map(p => p.categoria).filter(Boolean)));
  let createdCount = 0;

  for (const catName of uniqueProductCategories) {
    if (!existingNames.has(catName.toLowerCase())) {
      await createCategory(catName);
      createdCount++;
      console.log(`✅ Categoria "${catName}" sincronizada.`);
    }
  }

  return createdCount;
};

// --- Configurações ---

const getSettingsDoc = () => doc(db, "configuracoes", "site");

export const getSettings = async (): Promise<AdminSettings | null> => {
  const snap = await getDoc(getSettingsDoc());
  if (snap.exists()) {
    return snap.data() as AdminSettings;
  }
  return null;
};

export const updateSettings = async (data: Partial<AdminSettings>): Promise<void> => {
  await setDoc(getSettingsDoc(), data, { merge: true });
};

// --- Public Fetching & Mapping ---

export interface PublicProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  description?: string;
  details?: string[];
  images?: string[];
  destaque?: boolean;
  colecoes?: string[];
  especificacoes?: AdminProduct['especificacoes'];
}

const mapProductToPublic = (p: AdminProduct): PublicProduct => ({
  id: p.id,
  name: p.nome,
  price: p.preco,
  category: p.categoria,
  image: p.imageUrl,
  tag: p.destaque ? "Destaque" : undefined,
  description: p.descricao,
  details: p.tags || [],
  images: [p.imageUrl],
  destaque: p.destaque,
  colecoes: p.colecoes || [],
  especificacoes: p.especificacoes
});

export const getPublicProducts = async (): Promise<PublicProduct[]> => {
  console.log("🔍 Buscando produtos públicos...");
  const allProducts = await getProducts();
  return allProducts
    .filter(p => p.status === 'active')
    .map(mapProductToPublic);
};

export const getPublicProductById = async (id: string): Promise<PublicProduct | null> => {
  const product = await getProductById(id);
  if (product && (product.status === 'active' || !product.status)) {
    return mapProductToPublic(product);
  }
  return null;
};
