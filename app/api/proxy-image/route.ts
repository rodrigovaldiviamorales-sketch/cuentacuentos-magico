import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Falta la URL', { status: 400 });
  }

  try {
    // 1. Buscamos la imagen en OpenAI
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Error al obtener imagen: ${response.status}`);
    }

    // 2. La convertimos a un formato seguro (Buffer)
    const buffer = await response.arrayBuffer();
    
    // 3. La enviamos al navegador como si fuera nuestra
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png', // DALL-E siempre da PNG
        'Access-Control-Allow-Origin': '*', // Permiso total
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error("Error en el Proxy de Imágenes:", error);
    return new NextResponse('Error interno', { status: 500 });
  }
}