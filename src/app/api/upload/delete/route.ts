import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/verify-admin';

export async function POST(request: Request) {
  try {
    // Verificar autenticação admin
    const isAdmin = await verifyAdminToken(request)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Não autorizado.' },
        { status: 401 }
      )
    }

    // Configurar Cloudinary dentro da função para garantir carregamento de env vars
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: 'publicId é obrigatório' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json({ error: 'Erro ao deletar imagem' }, { status: 500 });
  }
}
