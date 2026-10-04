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

test('Korea starts with the four newest dated events; unknown years and outcomes stay separate', () => {
  const groups = view.timelineGroups(model.events);
  assert.deepEqual(groups.korea.slice(0, 4).map(event => event.date), ['2026-10-04', '2026-10-01', '2026-09-15', '2026-08-31']);
  assert.deepEqual(groups.korea.slice(4).map(event => event.date), ['2026-07-29', '2026-07-28', '2026-07', '2026-05-04', '2025-11']);
  assert.deepEqual(groups.koreaYears.map(event => event.date), ['2025']);
  assert.equal(groups.pending.length, 2);
  assert.ok(groups.pending.every(event => event.date === 'Pending' && !event.range));
  assert.equal(groups.months.flatMap(group => group.events).length, 17);
  assert.deepEqual(groups.months.find(group => group.date === '2024-09').events.map(event => event.lane), ['un', 'jp']);
  assert.ok(groups.months.every(group => group.events.every(event => event.date.slice(0, 7) === group.date)));
  assert.equal(view.displayDate('2024-09'), '2024.09 · 일자 미확인');
  assert.equal(view.displayDate('2025'), '2025년 · 월일 미확인');
  assert.equal(view.displayDate('Pending'), '날짜 미확인');
});

test('review offers retain company attribution and month precision; absent tests are dated as reports', () => {
  for (const date of ['2025-11', '2026-07']) {
    const offer = model.events.find(event => event.lane === 'kr' && event.date === date);
    assert.match(offer.label, /테슬라 설명/);
    assert.match(offer.verification, /회사 설명/);
    assert.match(offer.detail, /2026-10-04 보도/);
    assert.equal(offer.range.exact, false);
    assert.equal(view.originalSources(offer.evidence, model.docs)[0].attrs.URL, 'https://v.daum.net/v/20261004145706476');
  }
  for (const date of ['2026-10-01', '2026-10-04']) {
    const report = model.events.find(event => event.lane === 'kr' && event.date === date);
    assert.match(report.label, /보도$/);
    assert.match(report.verification, /날짜는 보도일/);
  }
  assert.match(model.sections.Bottleneck, /제안 설명 → FSD 시험·평가 실적 없음 → 후속 행정처리 미확인/);
  assert.match(model.sections.Bottleneck, /공단의 검사기술·제도 연구와 FSD 자체 시험은 구분/);
  assert.match(model.sections.Summary, /정식 접수·처리와 공식 거절 여부는 Unknown/);
});

// A small DOM boundary fixture exercises mounting and delegated controls without
// adding a browser dependency to the static site's CI. Real layout/focus QA is
// performed in the browser; this fixture deliberately has no layout engine.
function fixture() {
  const elements = new Map();
  const handlers = {};
  const document = {
    location: { href: pageURL }, activeElement: null,
    getElementById: id => elements.get(id) || null,
    addEventListener: (type, fn) => { handlers[type] = fn; },
    body: { classList: { add() {}, remove() {} } }
  };
  function element(id, attrs = {}) {
    const callbacks = {};
    let html = '';
    const node = {
      id, dataset: {}, hidden: 'hidden' in attrs, disabled: 'disabled' in attrs, textContent: '',
      attrs, callbacks,
      addEventListener: (type, fn) => { callbacks[type] = fn; },
      setAttribute(key, value) { attrs[key] = value; },
      hasAttribute: key => key in attrs,
      closest: () => node,
      focus() { document.activeElement = node; },
      set innerHTML(value) {
        html = value;
        for (const match of value.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)) {
          const attributes = Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(pair => [pair[1], pair[2]]));
          if (/\bhidden(?:\s|>)/.test(match[0])) attributes.hidden = '';
          const child = element(match[1], attributes);
          if (attributes['data-i']) child.dataset.i = attributes['data-i'];
          elements.set(child.id, child);
        }
      },
      get innerHTML() { return html; }
    };
    return node;
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const match of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)) {
    const attrs = {};
    if (/\bhidden(?:\s|>)/.test(match[0])) attrs.hidden = '';
    if (/\bdisabled(?:\s|>)/.test(match[0])) attrs.disabled = '';
    elements.set(match[1], element(match[1], attrs));
  }
  const click = id => elements.get('page-content').callbacks.click({ target: elements.get(id) });
  return { document, elements, click, handlers };
}

test('the landing mounts without removed sections, preserves expanded history and restores panel focus', async () => {
  const { document, elements, click, handlers } = fixture();
  assert.equal(elements.has('panel-people'), false);
  const result = await view.mount(document, async () => ({ ok: true, text: async () => md }));
  assert.ok(result);
  assert.equal(elements.get('compare-toggle').disabled, false);
  assert.equal(elements.get('earlier-records').hidden, true);
  const recentHTML = elements.get('tl-inner').innerHTML.match(/id="recent-records">([\s\S]*?)<\/div>/)[1];
  assert.equal((recentHTML.match(/class="event-card"/g) || []).length, 4);
  assert.match(elements.get('current-state').innerHTML, /DCAS 국내 반영일.*결과 미확인/s);
  assert.doesNotMatch(elements.get('measurement-view').innerHTML, /목표/);
  click('earlier-toggle');
  assert.equal(elements.get('earlier-records').hidden, false);
  assert.equal(elements.get('earlier-toggle').attrs['aria-expanded'], 'true');
  click('compare-toggle');
  assert.equal(elements.get('compare-toggle').attrs['aria-pressed'], 'true');
  assert.match(elements.get('tl-inner').innerHTML, /comparison-grid/);
  assert.match(elements.get('tl-inner').innerHTML, /국제 · UN \/ WP.29/);
  assert.doesNotMatch(elements.get('tl-inner').innerHTML, /Pending/);
  const referralButton = 'event-' + model.events.findIndex(event => event.date === '2026-07-29') + '-compare';
  click(referralButton);
  assert.equal(elements.get('drawer').hidden, false);
  assert.equal(elements.get('page-content').inert, true);
  assert.equal(document.activeElement.id, 'drawer-close');
  assert.match(elements.get('d-content').innerHTML, /raw 수집기록.*원문 출처.*확인 수준/s);
  assert.match(elements.get('d-content').innerHTML, /조사 주제 전체.*확정 원인/s);
  assert.doesNotMatch(elements.get('d-content').innerHTML, /<details class="disclosure" open/);
  handlers.keydown({ key: 'Escape', preventDefault() {} });
  assert.equal(elements.get('drawer').hidden, true);
  assert.equal(elements.get('page-content').inert, false);
  assert.equal(document.activeElement.id, referralButton);
  click('compare-toggle');
  assert.equal(elements.get('earlier-records').hidden, false);
  click('study-open');
  const content = elements.get('d-content').innerHTML;
  for (const label of ['통계와 확인 범위', '확인할 질문', '관련 사람·기관', '근거 문서', '한국·일본 비교의 범위', '국제·일본의 미확인 결과']) assert.ok(content.includes(label), label);
  elements.get('drawer-close').callbacks.click();
  assert.equal(document.activeElement.id, 'study-open');
});

test('failed or empty wiki loads preserve the landing and can recover through retry', async () => {
  for (const failure of ['network', 'http', 'empty']) {
    const { document, elements, click } = fixture();
    let fail = true;
    const result = await view.mount(document, async () => {
      if (!fail) return { ok: true, text: async () => md };
      if (failure === 'network') throw new Error('offline');
      return { ok: failure !== 'http', text: async () => '# Empty' };
    });
    assert.equal(result, null);
    assert.equal(elements.get('compare-toggle').disabled, true);
    assert.equal(elements.get('study-open').disabled, true);
    assert.equal(elements.get('tl-inner').attrs['aria-busy'], 'false');
    assert.match(elements.get('tl-inner').innerHTML, /role="alert".*위키 정리 보기.*raw 근거 안내.*다시 불러오기/s);
    assert.ok(elements.has('mission-title'));
    fail = false;
    assert.ok(await click('retry-load'));
    assert.equal(elements.get('compare-toggle').disabled, false);
    assert.equal(elements.get('earlier-records').hidden, true);
    assert.equal(elements.get('tl-inner').attrs['aria-busy'], 'false');
  }
});
