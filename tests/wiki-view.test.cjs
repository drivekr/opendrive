const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const view = require('../assets/wiki-view.js');
const root = path.resolve(__dirname, '..');
const md = fs.readFileSync(path.join(root, 'wiki/dcas.md'), 'utf8');
const model = view.parse(md);
const pageURL = 'https://example.org/opendrive/';

test('each timeline event can be traced to an existing raw record and an original source', () => {
  assert.ok(model.events.length);
  for (const event of model.events) {
    assert.ok(event.actors, event.label);
    assert.ok(event.verification, event.label);
    if (event.date !== 'Pending') assert.ok(event.range, event.date);
    const evidence = view.links(event.evidence);
    assert.ok(evidence.length, event.label);
    for (const link of evidence) {
      assert.match(link.href, /^\.\.\/raw\/sources\/.+\.md$/);
      assert.ok(fs.existsSync(path.resolve(root, 'wiki', link.href)), link.href);
    }
    assert.ok(view.originalSources(event.evidence, model.docs).length, event.label);
  }
});

test('every raw evidence record is represented in the document register', () => {
  const registered = model.docs.flatMap(doc => view.links(doc.attrs.Raw).map(link => path.basename(link.href)));
  for (const name of fs.readdirSync(path.join(root, 'raw/sources'))) {
    if (name !== 'README.md' && name.endsWith('.md')) assert.ok(registered.includes(name), name);
  }
  for (const doc of model.docs) {
    assert.ok(doc.attrs['확인'], doc.name);
    assert.match(doc.attrs.URL, /^https:\/\//, doc.name);
  }
});

test('statistics and measurement use evidence in the wiki', () => {
  assert.ok(model.stats.length);
  for (const stat of model.stats) {
    assert.ok(stat.attrs.Value);
    assert.ok(stat.attrs.Detail);
    assert.ok(view.originalSources(stat.attrs.Evidence, model.docs).length);
  }
  assert.ok(model.measurement['종료']);
  assert.ok(view.originalSources(model.measurement['시작 근거'], model.docs).length);
});

test('month and year precision never become an exact elapsed day count', () => {
  const exact = { range: view.dateRange('2026-07-29') };
  assert.equal(view.interval(exact, { range: view.dateRange('2026-07-28') }), '직전 기록과 1일 간격');
  assert.equal(view.interval(exact, { range: view.dateRange('2026-07') }), '정확한 날짜 미확인 · 일수 계산 보류');
  assert.equal(view.dateRange('2025').exact, false);
  assert.equal(view.dateRange('2025-02-29'), null);
  assert.equal(view.dateRange('2026-13'), null);
  assert.equal(view.dateRange('Pending'), null);
  assert.equal(view.dateRange(), null);
  assert.equal(view.interval({ range: null }, exact), '');
});

test('daily counts follow the Korea date at the UTC day boundary', () => {
  assert.equal(view.koreaDate(new Date('2026-10-03T14:59:59Z')), '2026-10-03');
  assert.equal(view.koreaDate(new Date('2026-10-03T15:00:00Z')), '2026-10-04');
});

test('a verified measurement endpoint stops the count and imprecise endpoints are not invented', () => {
  assert.equal(view.measurementDays('2026-07-28', 'Unknown', '2026-07-30'), 2);
  assert.equal(view.measurementDays('2026-07-28', '2026-07-29', '2026-07-30'), 1);
  assert.equal(view.measurementDays('2026-07', 'Unknown', '2026-07-30'), null);
  assert.equal(view.measurementDays('2026-07-28', '2026-08', '2026-07-30'), null);
  assert.equal(view.measurementDays('2026-07-28', '2026-07-27', '2026-07-30'), null);
});

test('wiki-relative evidence links work under a GitHub Pages project path', () => {
  const html = view.inline('[근거](../raw/sources/example.md)', pageURL);
  assert.match(html, /href="https:\/\/example.org\/opendrive\/source.html\?path=raw%2Fsources%2Fexample.md"/);
  assert.doesNotMatch(view.inline('[위험](javascript:alert)', pageURL), /href=/);
  assert.equal(view.inline('<img src=x>', pageURL), '&lt;img src=x&gt;');
  assert.match(view.markdown('### 쟁점\n\n본문 **강조**\n\n- [근거](../raw/sources/example.md)', pageURL), /<h3.*<strong>강조<\/strong>.*<ul>/s);
});

test('corrected pending results and attribution survive parsing', () => {
  const referral = model.events.find(event => event.date === '2026-07-29');
  assert.equal(referral.status, 'done');
  assert.match(referral.verification, /회부/);
  const pending = view.parse('## Timeline\n### Korea\n- [ ] Pending — 결과 확인 — 미확인\n  - Verification: Unknown').events[0];
  assert.equal(pending.status, 'tbd');
  assert.equal(pending.range, null);
  const adoption = model.events.find(event => event.lane === 'un' && event.date === '2025-03');
  assert.doesNotMatch(adoption.evidence, /cn351/i);
});
