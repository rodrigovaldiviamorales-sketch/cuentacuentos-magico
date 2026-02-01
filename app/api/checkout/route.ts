import { NextResponse } from 'next/server';
// CORRECCIÓN IMPORTANTE: currentUser viene de /server en las versiones nuevas
import { currentUser } from '@clerk/nextjs/server'; 
import Stripe from 'stripe';

// Inicializamos Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Usamos la versión más reciente compatible automáticamente
apiVersion: '2024-06-20' as any,
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    
    // Si no hay usuario logueado, no dejamos comprar
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Aquí definimos la "sesión de compra"
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pack Mini de Cuentos (10 Créditos)',
              description: 'Créditos mágicos para crear historias con IA.',
            },
            unit_amount: 199, // $1.99 USD (Stripe usa centavos)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // IMPORTANTE: Estas URLs deben cambiar cuando lo subas a internet
      // Si NEXT_PUBLIC_APP_URL no está definido, usa localhost por defecto
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?canceled=true`,
      // Guardamos el ID del usuario para saber a quién darle los créditos luego
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error en checkout:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}