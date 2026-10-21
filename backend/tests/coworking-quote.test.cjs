const test = require('node:test');
const assert = require('node:assert/strict');
const { parseQuote, persistQuote } = require('../dist/services/coworkingQuoteService.js');

const payload = {
  name: 'TESTE TECNICO', email: 'qa@example.invalid', phone: '00000000000',
  spaceType: 'Sala de Reunião', capacity: '4 pessoas', period: 'Por Período',
  submission_id: '11111111-1111-4111-8111-111111111111',
};
function harness() {
  const records = new Map();
  let notifications = 0;
  const getDocument = id => ({
    id,
    async create(data) {
      if (records.has(id)) throw Object.assign(new Error('exists'), { code: 6 });
      records.set(id, data);
    },
    async get() { return { exists: records.has(id), data: () => records.get(id) }; },
  });
  return { records, getDocument, notify: async () => { notifications++; }, count: () => notifications };
}

test('concurrent retries create one persisted lead and one notification', async () => {
  const h = harness();
  const save = () => persistQuote(parseQuote(payload), h.getDocument, h.notify, () => {});
  const confirmations = await Promise.all([save(), save(), save()]);
  assert.equal(h.records.size, 1);
  assert.equal(h.count(), 1);
  assert.equal(new Set(confirmations.map(row => row.lead_id)).size, 1);
  assert.equal(confirmations.filter(row => row.replayed).length, 2);
  assert.equal(confirmations[0].service_type, 'meeting_room');
  assert.equal(confirmations[0].is_test, false);
});

test('notification failure preserves success, and retry does not create another lead', async () => {
  const h = harness();
  let failures = 0;
  const notify = async () => { throw new Error('offline'); };
  const row = await persistQuote(parseQuote(payload), h.getDocument, notify, () => { failures++; });
  assert.equal(row.status, 'success');
  assert.equal(failures, 1);
  const retry = await persistQuote(parseQuote(payload), h.getDocument, notify, () => { failures++; });
  assert.equal(retry.replayed, true);
  assert.equal(failures, 1);
});

test('database failure never returns a persistence confirmation or sends notification', async () => {
  const h = harness();
  const failing = id => ({ id, create: async () => { throw new Error('db offline'); } });
  await assert.rejects(persistQuote(parseQuote(payload), failing, h.notify, () => {}), /db offline/);
  assert.equal(h.count(), 0);
});

test('technical tests are identified and do not email the commercial team', async () => {
  const h = harness();
  const result = await persistQuote(parseQuote({ ...payload, is_test: true }), h.getDocument, h.notify, () => {});
  assert.equal(result.is_test, true);
  assert.equal(h.count(), 0);
  assert.ok([...h.records.values()][0].tags.includes('teste_tecnico'));
});

test('same operation ID with changed data is rejected, not overwritten', async () => {
  const h = harness();
  await persistQuote(parseQuote(payload), h.getDocument, h.notify, () => {});
  await assert.rejects(persistQuote(parseQuote({ ...payload, period: 'Anual' }), h.getDocument, h.notify, () => {}), error => error.status === 409);
  assert.equal(h.records.size, 1);
});

test('invalid fields and operation IDs fail before persistence; older clients remain supported', () => {
  assert.throws(() => parseQuote({ ...payload, spaceType: '' }), error => error.status === 422);
  assert.throws(() => parseQuote({ ...payload, submission_id: '../invalid' }), error => error.status === 422);
  assert.throws(() => parseQuote(null), error => error.status === 422);
  assert.match(parseQuote({ ...payload, submission_id: undefined }).submission_id, /^[0-9a-f-]{36}$/);
});
