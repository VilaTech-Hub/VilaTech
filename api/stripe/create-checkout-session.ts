import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, isRecurring, donorName, donorEmail } = req.body;

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Parâmetros da sessão do Stripe Checkout
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      success_url: `${frontendUrl}/doacao-sucesso`,
      cancel_url: `${frontendUrl}/doacao-cancelada`,
      customer_email: donorEmail,
      client_reference_id: donorName, // Armazena o nome do doador como referência
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Doação - Instituto Vila Tech',
              description: isRecurring ? 'Doação Mensal Recorrente' : 'Doação Única',
            },
            unit_amount: amount * 100, // Stripe usa centavos
            ...(isRecurring && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: isRecurring ? 'subscription' : 'payment',
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
