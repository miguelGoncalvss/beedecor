import imageCompression from "browser-image-compression";
import { auth } from './firebase'

const compressionOptions = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1200,
  useWebWorker: true,
};

/**
 * Comprime e faz upload de uma imagem para o Cloudinary via API Route
 * @param file O arquivo de imagem original
 * @param onProgress Callback opcional para acompanhar o progresso simulado (0-100)
 */
export const uploadImage = async (
  file: File, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // 1. Simular progresso de compressão (0% -> 50%)
    if (onProgress) onProgress(10);
    const compressedFile = await imageCompression(file, compressionOptions);
    if (onProgress) onProgress(50);
    
    // 2. Buscar token de autenticação
    const token = await auth.currentUser?.getIdToken()

    // 3. Preparar FormData
    const formData = new FormData();
    formData.append('file', compressedFile);

    // 4. Fazer POST para a nossa API Route
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Falha no upload para o servidor');
    }

    if (onProgress) onProgress(100);

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw error;
  }
};

/**
 * Remove uma imagem do Cloudinary pela URL
 * @param url A URL pública da imagem
 */
export const deleteImage = async (url: string): Promise<void> => {
  if (!url || url.startsWith('/pics/')) return; // Não deleta imagens locais/mock
  
  try {
    // 1. Buscar token de autenticação
    const token = await auth.currentUser?.getIdToken()

    // 2. Extrair o public_id da URL do Cloudinary
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    
    // Procura pela pasta no caminho
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return;
    
    // Pega tudo após o 'vXXXXXX/' (versão) ou após o 'upload/' se não houver versão
    const afterUpload = parts.slice(uploadIndex + 1);
    // Se o próximo item começar com 'v' e for um número, pula ele
    if (afterUpload[0].startsWith('v') && !isNaN(Number(afterUpload[0].substring(1)))) {
      afterUpload.shift();
    }
    
    // O public_id é o que sobrou sem a extensão do arquivo
    const publicIdWithExt = afterUpload.join('/');
    const publicId = publicIdWithExt.split('.')[0];

    await fetch('/api/upload/delete', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ publicId }),
    });
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
