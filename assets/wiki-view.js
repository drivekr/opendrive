(function (root) {
  'use strict';
  var DAY = 86400000;
  var WIKI_PATH = 'wiki/dcas.md';
  var WIKI_VIEW = 'https://github.com/drivekr/opendrive/blob/main/wiki/dcas.md';
  var LANES = [['un', '국제 · UN / WP.29'], ['kr', '한국'], ['jp', '일본']];
  var STATUS = { done: '기록 확인', progress: '진행 확인', tbd: '결과 미확인' };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function links(text) {
    var result = [], re = /\[([^\]]+)\]\(([^\s)]+)\)/g, match;
    while ((match = re.exec(text || ''))) result.push({ label: match[1], href: match[2] });
    return result;
  }

  function safeHref(href, pageURL) {
    try {
      var wikiURL = new URL(WIKI_PATH, pageURL), url = new URL(href, wikiURL);
      if (!/^https?:$/.test(url.protocol)) return '';
      var siteURL = new URL('../', wikiURL), rawURL = new URL('raw/sources/', siteURL);
      if (url.origin === rawURL.origin && url.pathname.indexOf(rawURL.pathname) === 0 && /\.md$/.test(url.pathname)) {
        var viewer = new URL('source.html', siteURL);
        viewer.searchParams.set('path', url.pathname.slice(siteURL.pathname.length));
        return viewer.href;
      }
      return url.href;
    } catch (_) { return ''; }
  }

  function inline(text, pageURL) {
    var result = '', offset = 0;
    var re = /\[([^\]]+)\]\(([^\s)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g, match;
    while ((match = re.exec(text))) {
      result += escapeHTML(text.slice(offset, match.index));
      if (match[1]) {
        var href = safeHref(match[2], pageURL);
        result += href ? '<a href="' + escapeHTML(href) + '">' + escapeHTML(match[1]) + '</a>' : escapeHTML(match[1]);
      } else if (match[3]) result += '<strong>' + escapeHTML(match[3]) + '</strong>';
      else result += '<code>' + escapeHTML(match[4]) + '</code>';
      offset = re.lastIndex;
    }
    return result + escapeHTML(text.slice(offset));
  }

  function markdown(text, pageURL) {
    var result = '', paragraph = [], list = false;
    function flush() {
      if (paragraph.length) result += '<p>' + inline(paragraph.join(' '), pageURL) + '</p>';
      paragraph = [];
    }
    function closeList() { if (list) result += '</ul>'; list = false; }
    text.split('\n').forEach(function (line) {
      var heading = line.match(/^#{3,6} (.+)$/), item = line.match(/^- (.+)$/);
      if (heading) { flush(); closeList(); result += '<h3 class="sub">' + inline(heading[1], pageURL) + '</h3>'; }
      else if (item) { flush(); if (!list) result += '<ul>'; list = true; result += '<li>' + inline(item[1], pageURL) + '</li>'; }
      else if (!line.trim()) { flush(); closeList(); }
      else { closeList(); paragraph.push(line.trim()); }
    });
    flush(); closeList();
    return result;
  }

  function sections(md) {
    var result = {}, current = '';
    md.split('\n').forEach(function (line) {
      var match = line.match(/^## (.+)$/);
      if (match) { current = match[1]; result[current] = ''; }
      else if (current) result[current] += line + '\n';
    });
    return result;
  }

  function items(text, checked) {
    var result = [], current;
    (text || '').split('\n').forEach(function (line) {
      var field = line.match(/^  - ([^:]+):\s*(.*)$/);
      if (field && current) { current.attrs[field[1]] = field[2]; return; }
      var match = checked ? line.match(/^- \[([ x>])\] (.+)$/) : line.match(/^- (.+)$/);
      if (match) {
        current = { name: checked ? match[2] : match[1], status: checked ? match[1] : '', attrs: {} };
        result.push(current);
      }
    });
    return result;
  }

  function dateRange(token) {
    var match = (token || '').match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
    if (!match) return null;
    var year = +match[1], month = match[2] ? +match[2] : 1, day = match[3] ? +match[3] : 1;
    var start = Date.UTC(year, month - 1, day), check = new Date(start);
    if (month < 1 || month > 12 || check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
    var end = match[3] ? start : (match[2] ? Date.UTC(year, month, 1) - DAY : Date.UTC(year + 1, 0, 1) - DAY);
    return { start: start, end: end, exact: Boolean(match[3]) };
  }

  function timeline(text) {
    var result = [], lane = '', current;
    (text || '').split('\n').forEach(function (line) {
      var heading = line.match(/^### (UN|Korea|Japan)$/);
      if (heading) { lane = { UN: 'un', Korea: 'kr', Japan: 'jp' }[heading[1]]; current = null; return; }
      var field = line.match(/^  - (Evidence|Actors|Verification):\s*(.*)$/);
      if (field && current) { current[field[1].toLowerCase()] = field[2]; return; }
      var match = line.match(/^- \[([ x>])\] (Pending|\d{4}(?:-\d{2})?(?:-\d{2})?) — (.+)$/);
      if (!match || !lane) return;
      var parts = match[3].split(' — ');
      current = {
        lane: lane, status: match[1] === 'x' ? 'done' : match[1] === '>' ? 'progress' : 'tbd',
        date: match[2], range: dateRange(match[2]), label: parts.shift(), detail: parts.join(' — '),
        evidence: '', actors: '', verification: ''
      };
      result.push(current);
    });
    return result;
  }

  function parse(md) {
    var content = sections(md), measurement = {};
    (content.Measurement || '').split('\n').forEach(function (line) {
      var match = line.match(/^- ([^:]+):\s*(.*)$/);
      if (match) measurement[match[1]] = match[2];
    });
    return {
      sections: content, events: timeline(content.Timeline), docs: items(content.Documents),
      people: items(content['People / Organizations']), stats: items(content.Statistics),
      actions: items(content.Actions, true), measurement: measurement
    };
  }

  function koreaDate(now) {
    var values = {};
    new Intl.DateTimeFormat('en', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(now).forEach(function (part) { values[part.type] = part.value; });
    return values.year + '-' + values.month + '-' + values.day;
  }

  function interval(current, previous) {
    if (!current.range || !previous || !previous.range) return '';
    if (!current.range.exact || !previous.range.exact) return '정확한 날짜 미확인 · 일수 계산 보류';
    return '직전 기록과 ' + Math.round((current.range.start - previous.range.start) / DAY) + '일 간격';
  }

  function measurementDays(startToken, endToken, todayToken) {
    var start = dateRange(startToken);
    var end = dateRange(!endToken || /^(Unknown|Pending)$/.test(endToken) ? todayToken : endToken);
    if (!start || !end || !start.exact || !end.exact || end.start < start.start) return null;
    return Math.round((end.start - start.start) / DAY);
  }

  function originalSources(evidence, docs) {
    var paths = links(evidence).map(function (link) { return link.href; });
    var byURL = {};
    docs.forEach(function (doc) {
      var relevant = links(doc.attrs.Raw).some(function (link) { return paths.indexOf(link.href) >= 0; });
      var url = doc.attrs.URL;
      if (relevant && url) byURL[url] = doc;
    });
    return Object.keys(byURL).map(function (url) { return byURL[url]; });
  }

  // Unknown outcomes never acquire a position on the calendar.
  function timelineGroups(events) {
    var dated = events.filter(function (event) { return event.range && event.date.length > 4; })
      .slice().sort(function (a, b) { return b.range.start - a.range.start; });
    var years = events.filter(function (event) { return event.range && event.date.length === 4; })
      .slice().sort(function (a, b) { return b.range.start - a.range.start; });
    var months = [];
    dated.forEach(function (event) {
      var key = event.date.slice(0, 7), group = months.find(function (item) { return item.date === key; });
      if (!group) { group = { date: key, events: [] }; months.push(group); }
      group.events.push(event);
    });
    return {
      korea: dated.filter(function (event) { return event.lane === 'kr'; }),
      koreaYears: years.filter(function (event) { return event.lane === 'kr'; }),
      pending: events.filter(function (event) { return event.lane === 'kr' && event.date === 'Pending'; }),
      months: months, years: years
    };
  }

  function displayDate(token) {
    if (token === 'Pending') return '날짜 미확인';
    if (token.length === 4) return token + '년 · 월일 미확인';
    return token.replace(/-/g, '.') + (token.length === 7 ? ' · 일자 미확인' : '');
  }

  function verificationLabel(event) {
    // Only shorten the recorded wording; do not assign an inferred confidence score.
    return (event.verification || '확인 수준 미기록').split(/\.\s|。/)[0];
  }

  function eventCard(event, index, context) {
    return '<button id="event-' + index + '-' + context + '" class="event-card" data-i="' + index
      + '" aria-haspopup="dialog" aria-controls="drawer" aria-expanded="false">'
      + '<span class="event-top"><time class="event-date" datetime="' + escapeHTML(event.date) + '">' + escapeHTML(displayDate(event.date))
      + '</time><span class="event-arrow" aria-hidden="true">↗</span></span>'
      + '<span class="event-title">' + escapeHTML(event.label) + '</span>'
      + '<span class="event-meta"><span>' + escapeHTML(event.actors || '관련 주체 미확인') + '</span>'
      + '<span class="verification"><span aria-hidden="true">◇</span><span>' + escapeHTML(verificationLabel(event)) + '</span></span></span></button>';
  }

  function mount(document, fetcher) {
    var pageURL = document.location.href;
    var model, groups, opener, comparison = false, expanded = false;
    var drawer = document.getElementById('drawer'), back = document.getElementById('drawer-back');
    var page = document.getElementById('page-content'), host = document.getElementById('tl-inner');
    var compare = document.getElementById('compare-toggle'), study = document.getElementById('study-open');
    function put(id, html) { var element = document.getElementById(id); if (element) element.innerHTML = html; }
    function text(id, value) { var element = document.getElementById(id); if (element) element.textContent = value; }
    function fields(record) {
      return Object.keys(record.attrs).map(function (key) {
        return '<p><span class="field-label">' + escapeHTML(key === 'Evidence' ? 'raw 수집기록' : key) + '</span> ' + inline(record.attrs[key], pageURL) + '</p>';
      }).join('');
    }
    function disclosure(label, body, open) {
      return '<details class="disclosure"' + (open ? ' open' : '') + '><summary>' + escapeHTML(label) + '</summary>' + body + '</details>';
    }
    function sources(evidence) {
      return '<ul class="source-list">' + originalSources(evidence, model.docs).map(function (doc) {
        return '<li>' + inline('[' + doc.name + '](' + doc.attrs.URL + ')', pageURL)
          + '<small>' + escapeHTML(doc.attrs['확인'] || '확인 범위 미기록') + '</small></li>';
      }).join('') + '</ul>';
    }
    function actions() {
      return '<ul class="action-list">' + model.actions.map(function (action) {
        var status = action.status === 'x' ? '기록상 완료' : action.status === '>' ? '진행 중' : '다음 행동';
        return '<li><span aria-hidden="true">' + (action.status === 'x' ? '✓' : action.status === '>' ? '…' : '○')
          + '</span><div><small>' + status + '</small>' + inline(action.name, pageURL) + fields(action) + '</div></li>';
      }).join('') + '</ul>';
    }
    function interpretation() {
      return '<p class="scope-note">아래는 조사 주제 전체에 대한 현재의 해석입니다. 선택한 사건의 확정 원인이나 문제 해결을 뜻하지 않습니다.</p>'
        + markdown(model.sections.Bottleneck || '', pageURL) + '<h3>다음 행동</h3>' + actions();
    }
    function list(events, context) {
      return '<ol class="event-list">' + events.map(function (event) {
        return '<li>' + eventCard(event, model.events.indexOf(event), context) + '</li>';
      }).join('') + '</ol>';
    }
    function unknownYears(events, compareMode) {
      if (!events.length) return '';
      var content;
      if (compareMode) {
        var years = [];
        events.forEach(function (event) { if (years.indexOf(event.date) < 0) years.push(event.date); });
        content = years.map(function (year) {
          return '<div class="period"><h4 class="period-title">' + escapeHTML(year) + '년</h4>'
            + countries(events.filter(function (event) { return event.date === year; }), 'year') + '</div>';
        }).join('');
      } else content = list(events, 'year');
      return '<div class="undated"><h3>정확한 날짜 미확인</h3><p class="view-note">연도만 알려진 기록은 시간축에서 분리했습니다.</p>' + content + '</div>';
    }
    function countries(events, context) {
      return '<div class="comparison-grid">' + LANES.map(function (lane) {
        var records = events.filter(function (event) { return event.lane === lane[0]; });
        return '<div class="country ' + lane[0] + (records.length ? '' : ' empty') + '"><h4>' + lane[1] + '</h4>'
          + (records.length ? records.map(function (event) { return eventCard(event, model.events.indexOf(event), context); }).join('')
            : '<p class="empty-records">수집한 기록 없음</p>') + '</div>';
      }).join('') + '</div>';
    }
    function renderTimeline() {
      compare.setAttribute('aria-pressed', String(comparison));
      text('view-title', comparison ? '국제·한국·일본의 기록' : '한국의 기록');
      text('view-note', comparison ? '같은 연·월의 기록입니다. 카드 간격은 소요 시간을 뜻하지 않습니다.'
        : '최신순 · 사건을 선택하면 근거와 관련 주체를 볼 수 있습니다.');
      if (comparison) {
        put('tl-inner', groups.months.map(function (group) {
          return '<div class="period"><h3 class="period-title">' + escapeHTML(group.date.replace('-', '.')) + '</h3>'
            + countries(group.events, 'compare') + '</div>';
        }).join('') + unknownYears(groups.years, true));
      } else {
        var recent = groups.korea.slice(0, 4), earlier = groups.korea.slice(4);
        put('tl-inner', (recent.length ? '<div id="recent-records">' + list(recent, 'korea') + '</div>' : '<p class="view-note">날짜가 확인된 한국 기록이 없습니다.</p>')
          + (earlier.length ? '<div id="earlier-records"' + (expanded ? '' : ' hidden') + '>' + list(earlier, 'korea') + '</div>'
            + '<button id="earlier-toggle" class="more" aria-controls="earlier-records" aria-expanded="' + expanded + '">'
            + (expanded ? '이전 기록 접기' : '이전 기록 보기 · ' + earlier.length + '건') + '</button>' : '')
          + unknownYears(groups.koreaYears, false));
      }
    }
    function renderCurrent() {
      put('current-state', '<div class="current-state"><p class="current-heading">현재 확인할 결과</p><div class="outcomes">'
        + (groups.pending.length ? groups.pending.map(function (event) {
          var index = model.events.indexOf(event);
          return '<button class="outcome" data-i="' + index + '" aria-haspopup="dialog" aria-controls="drawer" aria-expanded="false">'
            + '<span class="outcome-name">' + escapeHTML(event.label.replace(/ 확인$/, '')) + '</span><span class="result">결과 미확인 ↗</span></button>';
        }).join('') : '<p class="view-note">등록된 미확인 결과 없음</p>') + '</div></div>');
      var measurement = model.measurement;
      var elapsed = measurementDays(measurement['시작'], measurement['종료'], koreaDate(new Date()));
      put('measurement-view', '<span>' + escapeHTML(measurement['표시'] || '경과') + ' ' + (elapsed === null ? '미확인' : elapsed + '일')
        + '</span> · <details><summary>계산 기준</summary><p>' + escapeHTML(measurement['시작'] || 'Unknown') + ' 기준 · 종료: '
        + escapeHTML(measurement['종료'] || 'Unknown') + '. ' + inline(measurement['범위'] || '', pageURL) + ' '
        + inline(measurement['시작 근거'] || '', pageURL) + '</p></details>');
    }
    function studyContent() {
      return markdown(model.sections.Summary || '', pageURL)
        + disclosure('조사의 병목과 다음 행동', interpretation(), true)
        + disclosure('통계와 확인 범위', '<div class="stats">' + model.stats.map(function (stat) {
          return '<article class="stat"><strong>' + escapeHTML(stat.attrs.Value || 'Unknown') + '</strong><span>' + escapeHTML(stat.name)
            + '</span><span>' + escapeHTML(stat.attrs.Detail || '') + '</span><span>' + inline(stat.attrs.Evidence || '', pageURL) + '</span></article>';
        }).join('') + '</div>')
        + disclosure('확인할 질문', markdown(model.sections.Questions || '', pageURL))
        + disclosure('관련 사람·기관', model.people.map(function (person) {
          return '<article class="register"><strong>' + escapeHTML(person.name) + '</strong>' + fields(person) + '</article>';
        }).join(''))
        + disclosure('근거 문서 · raw와 원문', model.docs.map(function (doc) {
          return '<article class="register"><strong>' + inline('[' + doc.name + '](' + doc.attrs.URL + ')', pageURL) + '</strong>'
            + fields({ attrs: { 'raw 수집기록': doc.attrs.Raw || 'Unknown', '정리': doc.attrs['핵심'] || '', '확인 범위': doc.attrs['확인'] || 'Unknown' } }) + '</article>';
        }).join(''))
        + disclosure('한국·일본 비교의 범위', markdown(model.sections['Korea vs Japan'] || '', pageURL))
        + disclosure('국제·일본의 미확인 결과', model.events.filter(function (event) {
          return event.date === 'Pending' && event.lane !== 'kr';
        }).map(function (event) {
          return '<article class="register"><strong>' + escapeHTML(event.label) + '</strong><p>' + escapeHTML(event.detail)
            + '</p><p>' + escapeHTML(event.verification) + '</p><p>' + inline(event.evidence, pageURL) + '</p>' + sources(event.evidence) + '</article>';
        }).join(''))
        + disclosure('조사 범위와 근거 해석', markdown(model.sections.Investigation || '', pageURL) + markdown(model.sections['Evidence notes'] || '', pageURL))
        + '<p style="margin-top:24px"><a href="' + WIKI_VIEW + '">위키 정리 전체 보기 ↗</a></p>';
    }
    function open(button, event) {
      opener = button;
      button.setAttribute('aria-expanded', 'true');
      text('d-kicker', event ? '사건 상세 · ' + STATUS[event.status] : '조사 정리 · DCAS / Tesla FSD');
      text('d-title', event ? event.label : '근거에서 다음 행동까지');
      if (event) {
        put('d-content', '<p>' + escapeHTML(event.detail || '설명 미기록') + '</p>'
          + '<h3>raw 수집기록</h3><p>' + inline(event.evidence || '근거 미기록', pageURL) + '</p>'
          + '<h3>원문 출처</h3>' + sources(event.evidence)
          + '<dl><dt>날짜</dt><dd>' + escapeHTML(displayDate(event.date)) + '</dd><dt>관련 주체</dt><dd>' + escapeHTML(event.actors || 'Unknown')
          + '</dd><dt>확인 수준</dt><dd>' + escapeHTML(event.verification || 'Unknown') + '</dd></dl>'
          + disclosure('조사의 병목과 다음 행동', interpretation())
          + '<p style="margin-top:24px"><a href="' + WIKI_VIEW + '">위키 정리 전체 보기 ↗</a></p>');
      } else put('d-content', studyContent());
      drawer.hidden = false; back.hidden = false;
      document.body.classList.add('panel-open');
      page.inert = true;
      document.getElementById('d-content').scrollTop = 0;
      document.getElementById('drawer-close').focus({ preventScroll: true });
    }
    function close() {
      if (drawer.hidden) return;
      drawer.hidden = true; back.hidden = true;
      page.inert = false;
      document.body.classList.remove('panel-open');
      if (opener) { opener.setAttribute('aria-expanded', 'false'); opener.focus({ preventScroll: true }); }
      opener = null;
    }
    document.getElementById('drawer-close').addEventListener('click', close);
    back.addEventListener('click', close);
    document.addEventListener('keydown', function (event) {
      if (drawer.hidden) return;
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        var focusable = Array.from(drawer.querySelectorAll('button:not([disabled]), a[href], summary, [tabindex="0"]'))
          .filter(function (element) { return element.getClientRects().length; });
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    page.addEventListener('click', function (click) {
      var button = click.target.closest('button');
      if (!button || button.disabled) return;
      if (button.id === 'retry-load') return load();
      if (!model) return;
      if (button.hasAttribute('data-i')) { var event = model.events[Number(button.dataset.i)]; if (event) open(button, event); }
      else if (button.id === 'study-open') open(button);
      else if (button.id === 'compare-toggle') { comparison = !comparison; renderTimeline(); }
      else if (button.id === 'earlier-toggle') {
        expanded = !expanded;
        document.getElementById('earlier-records').hidden = !expanded;
        button.setAttribute('aria-expanded', String(expanded));
        button.textContent = expanded ? '이전 기록 접기' : '이전 기록 보기 · ' + (groups.korea.length - 4) + '건';
      }
    });
    function load() {
      model = null; comparison = false; expanded = false;
      compare.disabled = true; study.disabled = true;
      compare.setAttribute('aria-pressed', 'false');
      host.setAttribute('aria-busy', 'true');
      put('current-state', '<p class="view-note">조사 기록을 읽는 중…</p>');
      put('measurement-view', ''); put('tl-inner', '');
      text('view-title', '한국의 기록');
      text('view-note', '최신순 · 사건을 선택하면 근거와 관련 주체를 볼 수 있습니다.');
      return Promise.resolve().then(function () { return fetcher(WIKI_PATH); }).then(function (response) {
        if (!response.ok) throw new Error('Wiki fetch failed');
        return response.text();
      }).then(function (md) {
        model = parse(md);
        if (!model.events.some(function (event) { return event.range; })) throw new Error('No dated records');
        groups = timelineGroups(model.events);
        renderCurrent(); renderTimeline();
        compare.disabled = false; study.disabled = false;
        host.setAttribute('aria-busy', 'false');
        return model;
      }).catch(function () {
        model = null;
        compare.disabled = true; study.disabled = true;
        put('current-state', '<p class="view-note">현재 확인 상태를 불러오지 못했습니다.</p>');
        put('measurement-view', '');
        put('tl-inner', '<div class="load-message" role="alert"><p>조사 기록을 불러오지 못했습니다. 잠시 후 다시 시도하거나 근거 문서를 확인해주세요.</p>'
          + '<p><a href="' + WIKI_VIEW + '">위키 정리 보기</a> · '
          + inline('[raw 근거 안내](../raw/sources/README.md)', pageURL) + '</p><button id="retry-load" class="control">다시 불러오기</button></div>');
        host.setAttribute('aria-busy', 'false');
        return null;
      });
    }
    return load();
  }

  var api = { parse: parse, dateRange: dateRange, interval: interval, measurementDays: measurementDays, koreaDate: koreaDate, markdown: markdown, inline: inline, links: links, originalSources: originalSources, timelineGroups: timelineGroups, displayDate: displayDate, eventCard: eventCard, mount: mount };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else {
    root.OpenDriveWiki = api;
    if (root.document.getElementById('tl-inner')) mount(root.document, root.fetch.bind(root));
  }
})(typeof window === 'undefined' ? globalThis : window);
