// A click starts the external registration journey; it never proves enrollment or payment.
const conversionDestination = 'AW-18486231681/ykuqCJHOi6YdEIGF9u5E';
const analyticsDestination = 'G-0EJEFT2244';
const emitted = new Set<string>();
const storageKey = 'vth.agenda.clicks';
const eventTypes = new Set(['Curso', 'Palestra', 'Evento']);

export function trackAgendaAction(event: { tipo?: string; linkInscricao?: string }): void {
  if (typeof window === 'undefined') return;
  const eventType = eventTypes.has(event.tipo || '') ? event.tipo : 'Evento';
  const registration = getRegistration(event.linkInscricao);
  // Unknown or invalid registration destinations must not count as a confirmed tracked action.
  if (event.linkInscricao && !registration) return;
  const action = registration ? 'registration' : 'contact';
  const test = !['www.vilatechub.com.br', 'vilatechub.com.br'].includes(window.location.hostname)
    || new URLSearchParams(window.location.search).get('vth_test') === '1';
  const key = `${test ? 'test' : 'live'}:${action}:${registration?.id || eventType}`;
  const parameters = {
    send_to: analyticsDestination,
    agenda_event_type: eventType,
    destination_host: registration ? 'www.sympla.com.br' : 'wa.link',
    ...(registration ? { registration_event_id: registration.id } : {}),
  };
  sendOnce(`${key}:ga4`, test ? 'agenda_action_test' : `education_${action}_click`, parameters);
  if (registration && !test) {
    sendOnce(`${key}:ads`, 'conversion', { send_to: conversionDestination, value: 0, currency: 'USD' });
  }
}

function getRegistration(link?: string): { id: string } | null {
  if (!link) return null;
  try {
    const url = new URL(link);
    if (url.protocol !== 'https:' || !['sympla.com.br', 'www.sympla.com.br'].includes(url.hostname)
      || url.username || url.password) return null;
    const match = url.pathname.match(/^\/evento(?:-online)?\/[^/]+\/(\d+)\/?$/);
    return match ? { id: match[1] } : null;
  } catch { return null; }
}

function sendOnce(key: string, name: string, parameters: Record<string, unknown>): void {
  if (emitted.has(key)) return;
  let previous: string[] = [];
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) previous = stored.filter((value): value is string => typeof value === 'string');
    if (previous.includes(key)) { emitted.add(key); return; }
  } catch { /* Storage is optional. */ }
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  try {
    gtag('event', name, parameters);
    emitted.add(key);
    try { sessionStorage.setItem(storageKey, JSON.stringify([...previous, key].slice(-100))); } catch { /* Optional. */ }
  } catch { /* Tracking must never interrupt navigation to the registration or contact. */ }
}
