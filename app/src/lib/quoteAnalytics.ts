interface QuoteConfirmation {
  status: 'success'; lead_id: string; form_id: 'coworking_quote'; service_type: string; is_test: boolean;
}

const serviceTypes = new Set(['workspace', 'meeting_room', 'auditorium', 'podcast_studio', 'virtual_office', 'other']);
const emitted = new Set<string>();
const storageKey = 'vth.quote.events';

export function isQuoteConfirmation(value: unknown): value is QuoteConfirmation {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  return data.status === 'success' && typeof data.lead_id === 'string' && data.lead_id.length > 0
    && data.form_id === 'coworking_quote' && typeof data.service_type === 'string'
    && serviceTypes.has(data.service_type) && typeof data.is_test === 'boolean';
}

export function trackQuoteConfirmation(confirmation: QuoteConfirmation): void {
  // The ID stays in operational/browser state and is never sent to Analytics.
  const eventName = confirmation.is_test ? 'lead_submission_test' : 'generate_lead';
  const key = `${eventName}:${confirmation.lead_id}`;
  if (emitted.has(key)) return;
  let previous: string[] = [];
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) previous = stored.filter((item): item is string => typeof item === 'string');
    if (previous.includes(key)) { emitted.add(key); return; }
  } catch { /* Browser storage may be unavailable. */ }

  const analytics = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!analytics) return;
  try {
    analytics('event', eventName, { form_id: confirmation.form_id, service_type: confirmation.service_type, lead_source: 'website' });
    emitted.add(key);
    try { sessionStorage.setItem(storageKey, JSON.stringify([...previous, key].slice(-100))); } catch { /* Storage is optional. */ }
  } catch { /* Analytics must never prevent a successful commercial submission. */ }
}
