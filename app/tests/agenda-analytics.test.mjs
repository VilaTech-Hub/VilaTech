import test from 'node:test';
import assert from 'node:assert/strict';
import { trackAgendaAction } from '../src/lib/agendaAnalytics.ts';

const events = [];
const storage = new Map();
globalThis.window = { location: { hostname: 'www.vilatechub.com.br', search: '' }, gtag: (...args) => events.push(args) };
globalThis.sessionStorage = { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
const course = id => ({ tipo: 'Curso', linkInscricao: `https://www.sympla.com.br/evento/curso-publico/${id}?email=PRIVATE` });

test('registration CTA counts once per session and never sends URL queries or personal data', () => {
  const value = { ...course('3623318'), titulo: 'PRIVATE', speakers: ['PRIVATE'] };
  trackAgendaAction(value);
  trackAgendaAction(value);
  assert.deepEqual(events, [
    ['event', 'education_registration_click', { send_to: 'G-0EJEFT2244', agenda_event_type: 'Curso', destination_host: 'www.sympla.com.br', registration_event_id: '3623318' }],
    ['event', 'conversion', { send_to: 'AW-18486231681/ykuqCJHOi6YdEIGF9u5E', value: 0, currency: 'USD' }],
  ]);
  assert.ok(!JSON.stringify(events).includes('PRIVATE'));
});

test('contact fallback is separate and never emits the registration conversion', () => {
  const before = events.length;
  trackAgendaAction({ tipo: 'Palestra', linkInscricao: '' });
  assert.equal(events.length, before + 1);
  assert.equal(events.at(-1)[1], 'education_contact_click');
});

test('QA and preview never emit live events or Ads conversions', () => {
  window.location.search = '?vth_test=1';
  trackAgendaAction(course('3626284'));
  assert.equal(events.at(-1)[1], 'agenda_action_test');
  window.location.search = '';
  window.location.hostname = 'preview.vercel.app';
  trackAgendaAction(course('3619054'));
  assert.equal(events.at(-1)[1], 'agenda_action_test');
  window.location.hostname = 'www.vilatechub.com.br';
});

test('unrecognized or unsafe links do not count as registrations', () => {
  const before = events.length;
  for (const link of ['javascript:alert(1)', 'https://sympla.com.br.attacker.test/evento/curso/1', 'https://www.sympla.com.br/', 'https://user:pass@sympla.com.br/evento/curso/1']) {
    trackAgendaAction({ tipo: 'Curso', linkInscricao: link });
  }
  assert.equal(events.length, before);
});

test('missing or blocked analytics never interrupts a CTA and can retry later', () => {
  window.gtag = undefined;
  assert.doesNotThrow(() => trackAgendaAction(course('3614438')));
  window.gtag = () => { throw new Error('blocked'); };
  assert.doesNotThrow(() => trackAgendaAction(course('3614438')));
  window.gtag = (...args) => events.push(args);
  const before = events.length;
  trackAgendaAction(course('3614438'));
  assert.equal(events.length, before + 2);
});
