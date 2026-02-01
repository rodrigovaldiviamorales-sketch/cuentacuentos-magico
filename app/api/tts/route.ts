import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, voiceId } = await request.json();

    // 1. MAPA DE VOCES: Aquí decidimos quién suena cómo
    // Las opciones de OpenAI son: 'alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'
    const voiceMap: Record<string, "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"> = {
      // MACHOS (Graves y Serios)
      'T-Rex Macho': 'onyx',      // Voz muy grave
      'León Macho': 'onyx',       // Voz grave
      'Capibara Macho': 'echo',   // Voz masculina suave
      'Búho Macho': 'fable',      // Voz de narrador clásico
      'Unicornio Macho': 'echo',  // Voz masculina suave

      // HEMBRAS (Suaves y Agudas)
      'T-Rex Hembra': 'alloy',    // Voz fuerte pero femenina
      'Leona Hembra': 'nova',     // Voz enérgica femenina
      'Capibara Hembra': 'nova',  // Voz enérgica femenina
      'Búho Hembra': 'shimmer',   // Voz suave y dulce (LA QUE ARREGLAMOS)
      'Unicornio Hembra': 'shimmer' // Voz suave y dulce
    };

    // Si no encuentra el ID, usa 'shimmer' (femenina suave) por defecto
    const selectedVoice = voiceMap[voiceId] || 'shimmer';

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: selectedVoice,
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error("Error generando audio:", error);
    return NextResponse.json({ error: "Error TTS" }, { status: 500 });
  }
}