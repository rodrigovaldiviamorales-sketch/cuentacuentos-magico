import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth, currentUser } from '@clerk/nextjs/server'; 
import { db } from '@/lib/db'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Verificar usuario
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Usuario no autorizado" }, { status: 401 });
    }

    // 2. Verificar Saldo
    let dbUser = await db.user.findUnique({ where: { userId } });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: { userId, email: user.emailAddresses[0].emailAddress, credits: 3 }
      });
    }

    if (dbUser.credits <= 0) {
      return NextResponse.json({ error: "No tienes créditos suficientes" }, { status: 403 });
    }

    // 3. Generar CONTENIDO SEPARADO 🧠
    const { tema, protagonista, narrador } = await req.json();

    // Pedimos JSON estricto para separar la Historia de la Imagen
    const prompt = `Escribe un cuento infantil.
    - Protagonista: ${protagonista}
    - Tema: ${tema}
    - Narrador: ${narrador}

    IMPORTANTE: Responde SOLO con un JSON válido con este formato exacto:
    {
      "titulo": "Un título corto",
      "historia": "El cuento completo en español (aprox 300 palabras), sin títulos ni introducciones extrañas.",
      "imagePrompt": "A detailed description of the main scene in English, style 3D Pixar, colorful, cute. NO TEXT, NO LETTERS."
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" } // 👈 ESTO EVITA QUE SE MEZCLE TODO
    });

    const content = JSON.parse(completion.choices[0].message.content || "{}");

    // 4. Cobrar
    await db.user.update({
      where: { userId },
      data: { credits: dbUser.credits - 1 }
    });

    // 5. RESPUESTA FINAL (Aquí devolvemos el narrador para que se vea)
    return NextResponse.json({ 
      story: content.historia,       // El cuento limpio
      title: content.titulo,         // El título aparte
      imagePrompt: content.imagePrompt, // La instrucción para la imagen (sin texto)
      narrador: narrador,            // 👈 ¡AQUÍ RECUPERAMOS AL NARRADOR!
      credits: dbUser.credits - 1 
    });

  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ error: 'Error generando cuento' }, { status: 500 });
  }
}