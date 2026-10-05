import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { sendCoworkingQuoteEmail } from '../services/emailService';

export const submitCoworkingQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, spaceType, capacity, period, message } = req.body;

    if (!name || !email || !phone || !spaceType || !capacity || !period) {
      res.status(422).json({
        status: 'error',
        error: 'validation_error',
        message: 'Campos obrigatórios faltando: nome, email, telefone, tipo de espaço, capacidade e período.'
      });
      return;
    }

    const timestamp = new Date().toISOString();

    // Salva no Firestore como lead
    const leadsRef = db.collection('leads');
    const newRef = leadsRef.doc();
    const leadData = {
      id: newRef.id,
      name,
      email,
      phone,
      company: company || '',
      types: ['coworking'],
      subtypes: [spaceType],
      status: 'novo',
      pipeline_id: 'default',
      stage_id: 'novo',
      tags: ['cotacao_coworking'],
      extra_fields: { spaceType, capacity, period, message: message || '' },
      history: [{
        type: 'form_submission',
        form_id: 'coworking_quote',
        created_at: timestamp,
        metadata: { spaceType, capacity, period }
      }],
      created_at: timestamp,
      updated_at: timestamp
    };

    await newRef.set(leadData);

    // Envia email de notificação
    await sendCoworkingQuoteEmail({ name, email, phone, company, spaceType, capacity, period, message });

    res.status(201).json({
      status: 'success',
      message: 'Cotação enviada com sucesso!'
    });
  } catch (error: any) {
    console.error('Error submitting coworking quote:', error);
    res.status(500).json({
      status: 'error',
      error: 'internal_server_error',
      message: error?.message || String(error)
    });
  }
};
