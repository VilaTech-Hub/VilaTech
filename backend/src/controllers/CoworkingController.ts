import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { sendCoworkingQuoteEmail } from '../services/emailService';
import { parseQuote, persistQuote, QuoteError } from '../services/coworkingQuoteService';

export const submitCoworkingQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const confirmation = await persistQuote(
      parseQuote(req.body),
      id => db.collection('leads').doc(id),
      sendCoworkingQuoteEmail,
      () => console.error('Coworking quote persisted, but notification email failed.'),
    );
    res.status(confirmation.replayed ? 200 : 201).json({ ...confirmation, message: 'Cotação enviada com sucesso!' });
  } catch (error: unknown) {
    if (error instanceof QuoteError) {
      res.status(error.status).json({ status: 'error', message: error.message });
      return;
    }
    console.error('Error persisting coworking quote.');
    res.status(500).json({ status: 'error', message: 'Não foi possível registrar a cotação. Tente novamente.' });
  }
};
