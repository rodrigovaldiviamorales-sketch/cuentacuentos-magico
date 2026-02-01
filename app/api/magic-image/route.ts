import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Leer prompt
    const body = await req.json();
    const { prompt } = body; 

    if (!prompt) {
      return NextResponse.json({ error: "Falta el prompt" }, { status: 400 });
    }

    console.log("🎨 Generando imagen...");

    // 2. Pedir imagen a OpenAI
    const response = await openai.images.generate({
      model: "dall-e-3", 
      prompt: `Cartoon style, 3D Pixar render, cute, vibrant colors, magical lighting, 4k. Scene: ${prompt}`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    // 3. EXTRAER URL DE FORMA SEGURA (Sin línea roja) 🛡️
    let imageUrl = "";
    
    // Verificamos si existe 'data' y si tiene al menos un elemento
    if (response.data && response.data.length > 0) {
        // Si existe, tomamos la URL. Si es null, ponemos comillas vacías.
        imageUrl = response.data[0].url || "";
    }

    // 4. Devolver respuesta
    return NextResponse.json({ url: imageUrl });

  } catch (error) {
    console.error("❌ Error generando imagen:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}