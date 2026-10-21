import test from 'node:test';
import assert from 'node:assert/strict';
import { isQuoteConfirmation, trackQuoteConfirmation } from '../src/lib/quoteAnalytics.ts';

const events = [];
const storage = new Map();
globalThis.window = { gtag: (...args) => events.push(args) };
globalThis.sessionStorage = { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
const confirmation = id => ({ status: 'success', lead_id: id, form_id: 'coworking_quote', service_type: 'meeting_room', is_test: false });

test('duplicate confirmations emit one lead event without personal data or CRM ID', () => {
  const data = { ...confirmation('opaque-real'), name: 'PRIVATE', email: 'qa@example.invalid', message: 'PRIVATE' };
  trackQuoteConfirmation(data);
  trackQuoteConfirmation(data);
  assert.deepEqual(events, [
    ['event', 'generate_lead', { form_id: 'coworking_quote', service_type: 'meeting_room', lead_source: 'website' }],
    ['event', 'conversion', { send_to: 'AW-18486231681/uRSyCNn5gKUdEIGF9u5E', value: 0, currency: 'USD' }],
  ]);
  assert.ok(!JSON.stringify(events).includes('PRIVATE'));
  assert.ok(!JSON.stringify(events).includes('opaque-real'));
});

test('QA emits its separate event, never generate_lead', () => {
  const before = events.length;
  trackQuoteConfirmation({ ...confirmation('opaque-qa'), is_test: true });
  assert.equal(events.at(-1)[1], 'lead_submission_test');
  assert.equal(events.length, before + 1);
});

test('only explicit persistence responses are accepted', () => {
  assert.equal(isQuoteConfirmation({ status: 'success' }), false);
  assert.equal(isQuoteConfirmation({ ...confirmation('id'), service_type: 'arbitrary-free-text' }), false);
  assert.equal(isQuoteConfirmation(confirmation('id')), true);
  const before = events.length;
  trackQuoteConfirmation({ status: 'success' });
  assert.equal(events.length, before);
});

test('blocked storage and analytics never throw to the form', () => {
  globalThis.sessionStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  globalThis.window.gtag = () => { throw new Error('blocked'); };
  assert.doesNotThrow(() => trackQuoteConfirmation(confirmation('opaque-blocked')));
});

test('an event can be queued before the deferred Google script is loaded', async () => {
  const { readFile } = await import('node:fs/promises');
  const { runInNewContext } = await import('node:vm');
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const browser = { addEventListener() {} };
  runInNewContext(inline, { window: browser, document: { readyState: 'loading' }, Date });
  browser.gtag('event', 'lead_submission_test', { form_id: 'coworking_quote' });
  assert.deepEqual(Array.from(browser.dataLayer, args => args[0]), ['js', 'config', 'config', 'event']);
  assert.equal(browser.dataLayer[2][1], 'AW-18486231681');
  assert.equal(browser.dataLayer[2][2].allow_ad_personalization_signals, false);
});

test('a blocked destination does not duplicate a destination already queued', () => {
  globalThis.sessionStorage = { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
  let blockAds = true;
  const sent = [];
  globalThis.window.gtag = (...args) => {
    if (args[1] === 'conversion' && blockAds) throw new Error('blocked');
    sent.push(args);
  };
  trackQuoteConfirmation(confirmation('retry-destination'));
  blockAds = false;
  trackQuoteConfirmation(confirmation('retry-destination'));
  assert.deepEqual(sent.map(args => args[1]), ['generate_lead', 'conversion']);
});
