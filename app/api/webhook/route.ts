import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '../../../lib/db'; 

// Inicializamos Stripe una sola vez
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;

    if (userId) {
      await db.user.update({
        where: { userId: userId },
        data: {
          credits: {
            increment: 10,
          },
        },
      });
      console.log(`✅ ¡Pago recibido! Créditos añadidos a: ${userId}`);
    }
  }

  return new NextResponse(null, { status: 200 });
}