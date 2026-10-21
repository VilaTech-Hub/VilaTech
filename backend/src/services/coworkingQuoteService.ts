import { createHash, randomUUID } from 'node:crypto';

export class QuoteError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

export interface QuoteInput {
  name: string; email: string; phone: string; company: string;
  spaceType: string; capacity: string; period: string; message: string;
  submission_id: string; is_test: boolean;
}

interface QuoteDocument {
  id: string;
  create(data: Record<string, unknown>): Promise<unknown>;
  get(): Promise<{ exists: boolean; data(): Record<string, unknown> | undefined }>;
}

export function parseQuote(body: unknown): QuoteInput {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new QuoteError(422, 'Dados da cotação inválidos.');
  const source = body as Record<string, unknown>;
  const fields = ['name', 'email', 'phone', 'company', 'spaceType', 'capacity', 'period', 'message'] as const;
  const text = Object.fromEntries(fields.map(key => [key, typeof source[key] === 'string' ? source[key].trim() : ''])) as Record<typeof fields[number], string>;
  if (['name', 'email', 'phone', 'spaceType', 'capacity', 'period'].some(key => !text[key as keyof typeof text])) {
    throw new QuoteError(422, 'Preencha nome, e-mail, telefone, tipo de espaço, capacidade e período.');
  }
  if (fields.some(key => text[key].length > (key === 'message' ? 5000 : 300))) throw new QuoteError(422, 'Um dos campos excede o tamanho permitido.');
  // Older published clients do not yet send an operation ID.
  const submissionId = source.submission_id === undefined ? randomUUID() : source.submission_id;
  if (typeof submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    throw new QuoteError(422, 'Identificador da solicitação inválido.');
  }
  return { ...text, submission_id: submissionId.toLowerCase(), is_test: source.is_test === true };
}

export async function persistQuote(
  input: QuoteInput,
  getDocument: (id: string) => QuoteDocument,
  notify: (input: QuoteInput) => Promise<unknown>,
  notificationFailed: () => void,
) {
  const doc = getDocument(`coworking_${input.submission_id}`);
  const { submission_id, ...payload } = input;
  const fingerprint = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  const timestamp = new Date().toISOString();
  const serviceTypes: Record<string, string> = {
    'Estação de Trabalho': 'workspace', 'Sala de Reunião': 'meeting_room',
    'Auditório': 'auditorium', 'Estúdio Podcast': 'podcast_studio', 'Endereço Fiscal': 'virtual_office',
  };
  const serviceType = serviceTypes[input.spaceType] || 'other';
  let replayed = false;
  try {
    await doc.create({
      id: doc.id, name: input.name, email: input.email, phone: input.phone, company: input.company,
      types: ['coworking'], subtypes: [input.spaceType], status: 'novo', pipeline_id: 'default', stage_id: 'novo',
      tags: input.is_test ? ['cotacao_coworking', 'teste_tecnico'] : ['cotacao_coworking'], is_test: input.is_test,
      submission_id, submission_fingerprint: fingerprint,
      extra_fields: { spaceType: input.spaceType, capacity: input.capacity, period: input.period, message: input.message },
      history: [{ type: 'form_submission', form_id: 'coworking_quote', created_at: timestamp,
        metadata: { spaceType: input.spaceType, capacity: input.capacity, period: input.period } }],
      created_at: timestamp, updated_at: timestamp,
    });
  } catch (error: unknown) {
    const code = (error as { code?: unknown })?.code;
    if (code !== 6 && code !== 'already-exists') throw error;
    const existing = await doc.get();
    if (!existing.exists || existing.data()?.submission_fingerprint !== fingerprint) {
      throw new QuoteError(409, 'Esta solicitação já foi usada com outros dados.');
    }
    replayed = true;
  }
  if (!replayed && !input.is_test) {
    // Persisted leads remain successful even if their email notification fails.
    try { await notify(input); } catch { notificationFailed(); }
  }
  return { status: 'success' as const, lead_id: doc.id, form_id: 'coworking_quote' as const,
    service_type: serviceType, is_test: input.is_test, replayed };
}
