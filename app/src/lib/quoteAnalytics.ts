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
  if (!isQuoteConfirmation(confirmation)) return;
  const parameters = { form_id: confirmation.form_id, service_type: confirmation.service_type, lead_source: 'website' };
  sendOnce(confirmation.is_test ? 'lead_submission_test' : 'generate_lead', parameters, confirmation.lead_id);
  if (!confirmation.is_test) {
    sendOnce('conversion', { send_to: 'AW-18486231681/uRSyCNn5gKUdEIGF9u5E', value: 0, currency: 'USD' }, confirmation.lead_id);
  }
}

function sendOnce(eventName: string, parameters: Record<string, unknown>, leadId: string): void {
  // The ID stays in operational/browser state and is never sent to Analytics.
  // Each destination is deduplicated separately so one blocked tag cannot duplicate the other.
  const key = `${eventName}:${leadId}`;
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
    analytics('event', eventName, parameters);
    emitted.add(key);
    try { sessionStorage.setItem(storageKey, JSON.stringify([...previous, key].slice(-100))); } catch { /* Storage is optional. */ }
  } catch { /* Analytics must never prevent a successful commercial submission. */ }
}
