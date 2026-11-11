import test from 'node:test';
import assert from 'node:assert/strict';
import { trackWhatsAppClick } from '../src/lib/whatsappAnalytics.ts';

const events = [];
const storage = new Map();
globalThis.window = {
  location: { hostname: 'www.vilatechub.com.br', search: '', pathname: '/coworking' },
  gtag: (...args) => events.push(args),
};
globalThis.sessionStorage = {
  getItem: key => storage.get(key) || null,
  setItem: (key, value) => storage.set(key, value),
};

test('whatsapp floating button click emits one whatsapp_click event without personal data', () => {
  events.length = 0;
  storage.clear();

  trackWhatsAppClick({ location: 'floating', destinationUrl: 'https://wa.me/5511993710652' });
  // Second click in same session should be deduplicated
  trackWhatsAppClick({ location: 'floating', destinationUrl: 'https://wa.me/5511993710652' });

  assert.equal(events.length, 1);
  assert.deepEqual(events[0], [
    'event',
    'whatsapp_click',
    {
      send_to: 'G-0EJEFT2244',
      button_location: 'floating',
      destination_url: 'https://wa.me/5511993710652',
      page_path: '/coworking',
    },
  ]);
});

test('QA environment emits only whatsapp_click_test event', () => {
  events.length = 0;
  storage.clear();

  window.location.hostname = 'localhost';
  trackWhatsAppClick({ location: 'courses_page' });

  assert.equal(events.length, 1);
  assert.equal(events[0][1], 'whatsapp_click_test');
  assert.equal(events[0][2].button_location, 'courses_page');

  // Reset
  window.location.hostname = 'www.vilatechub.com.br';
});

test('blocked analytics or storage never throws an exception to user', () => {
  window.gtag = () => { throw new Error('blocked'); };
  assert.doesNotThrow(() => trackWhatsAppClick({ location: 'floating' }));
  window.gtag = (...args) => events.push(args);
});

