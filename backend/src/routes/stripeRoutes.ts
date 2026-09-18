import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();

// Inicialização lazy para garantir que dotenv já rodou
let stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }
  return stripe;
}

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, isRecurring, donorName, donorEmail } = req.body;
    const frontendUrl = process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:5173';

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      success_url: `${frontendUrl}/doacao-sucesso`,
      cancel_url: `${frontendUrl}/doacao-cancelada`,
      customer_email: donorEmail,
      client_reference_id: donorName,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Doação - Instituto Vila Tech',
              description: isRecurring ? 'Doação Mensal Recorrente' : 'Doação Única',
            },
            unit_amount: amount * 100,
            ...(isRecurring && {
              recurring: {
                interval: 'month' as const,
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: isRecurring ? 'subscription' : 'payment',
    };

    const session = await getStripe().checkout.sessions.create(sessionParams);
    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
