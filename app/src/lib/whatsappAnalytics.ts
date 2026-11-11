const analyticsDestination = 'G-0EJEFT2244';
const emitted = new Set<string>();
const storageKey = 'vth.whatsapp.clicks';

export interface WhatsAppClickOptions {
  location: 'floating' | 'courses_page' | 'agenda_empty_fallback' | 'header' | 'footer' | string;
  destinationUrl?: string;
}

export function trackWhatsAppClick(options: WhatsAppClickOptions): void {
  if (typeof window === 'undefined') return;

  const test = !['www.vilatechub.com.br', 'vilatechub.com.br'].includes(window.location.hostname)
    || new URLSearchParams(window.location.search).get('vth_test') === '1';

  const locationKey = options.location || 'unknown';
  const key = `${test ? 'test' : 'live'}:${locationKey}`;

  const parameters = {
    send_to: analyticsDestination,
    button_location: locationKey,
    destination_url: options.destinationUrl || 'whatsapp',
    page_path: window.location.pathname,
  };

  sendOnce(key, test ? 'whatsapp_click_test' : 'whatsapp_click', parameters);
}

function sendOnce(key: string, name: string, parameters: Record<string, unknown>): void {
  if (emitted.has(key)) return;

  let previous: string[] = [];
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) {
      previous = stored.filter((value): value is string => typeof value === 'string');
    }
    if (previous.includes(key)) {
      emitted.add(key);
      return;
    }
  } catch {
    /* Storage is optional in private/restricted browsing */
  }

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  try {
    gtag('event', name, parameters);
    emitted.add(key);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify([...previous, key].slice(-100)));
    } catch {
      /* Optional storage */
    }
  } catch {
    /* Analytics must never interrupt user navigation to WhatsApp */
  }
}

