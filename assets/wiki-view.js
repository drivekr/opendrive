(function (root) {
  'use strict';
  var DAY = 86400000;
  var WIKI_PATH = 'wiki/dcas.md';
  var WIKI_VIEW = 'https://github.com/drivekr/opendrive/blob/main/wiki/dcas.md';
  var LANES = [['un', 'UN / WP.29'], ['kr', 'KOREA'], ['jp', 'JAPAN']];
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

  function mount(document, fetcher) {
    var pageURL = root.location.href;
    var model, opener;
    function put(id, html) { document.getElementById(id).innerHTML = html; }
    function detail(doc) {
      return Object.keys(doc.attrs).map(function (key) {
        return '<p><span class="field-label">' + escapeHTML(key === 'Evidence' ? '근거' : key) + '</span> ' + inline(doc.attrs[key], pageURL) + '</p>';
      }).join('');
    }
    function renderTimeline() {
      var dated = model.events.filter(function (event) { return event.range; });
      if (!dated.length) throw new Error('Timeline has no dated records');
      var today = dateRange(koreaDate(new Date())).start;
      var start = Math.min.apply(null, dated.map(function (event) { return event.range.start; })) - 30 * DAY;
      var end = Math.max(today, Math.max.apply(null, dated.map(function (event) { return event.range.end; }))) + 150 * DAY;
      function position(stamp) { return 6 + (stamp - start) / (end - start) * 86; }
      var years = '';
      for (var year = new Date(start).getUTCFullYear() + 1; Date.UTC(year, 0, 1) < end; year++) {
        years += '<span class="tl-year" style="left:' + position(Date.UTC(year, 0, 1)).toFixed(2) + '%">' + year + '</span>';
      }
      var html = '<div class="tl-years">' + years + '</div>';
      LANES.forEach(function (lane) {
        var laneEvents = model.events.filter(function (event) { return event.lane === lane[0]; });
        var slots = [], previous = null, nodes = '';
        laneEvents.forEach(function (event) {
          var x = event.range ? position((event.range.start + event.range.end) / 2) : 96;
          var slot = slots.findIndex(function (lastX) { return x - lastX >= 16; });
          if (slot < 0) slot = slots.length;
          slots[slot] = x;
          event.elapsed = interval(event, previous);
          if (event.range) previous = event;
          var index = model.events.indexOf(event), top = slot * 94;
          nodes += '<button class="node ' + event.status + (event.range && !event.range.exact ? ' approx' : '') + '" style="left:' + x.toFixed(2) + '%;top:' + top + 'px" data-i="' + index + '" aria-label="' + escapeHTML(event.date + ' ' + event.label) + '">'
            + (slot ? '<span class="stem" style="top:-' + (top - 7) + 'px;height:' + top + 'px"></span>' : '')
            + '<span class="d"></span><span class="t">' + escapeHTML(event.label) + '</span><span class="dt">' + escapeHTML(event.date) + '</span></button>';
        });
        html += '<div class="lane ' + lane[0] + '"><div class="lane-name">' + lane[1] + '</div><div class="track" style="height:' + Math.max(110, slots.length * 94) + 'px">' + nodes + '</div></div>';
      });
      put('tl-inner', html);
    }

    function render() {
      renderTimeline();
      var measurement = model.measurement;
      var elapsed = measurementDays(measurement['시작'], measurement['종료'], koreaDate(new Date()));
      var current = elapsed === null ? 'Unknown' : elapsed + '일';
      put('measurement-view', '<div class="metric"><div class="metric-item"><span class="metric-label">' + escapeHTML(measurement['표시'] || '경과')
        + '</span><strong>' + escapeHTML(current) + '</strong><span class="metric-note">' + escapeHTML(measurement['시작'] || 'Unknown') + ' 기준 · 종료: ' + escapeHTML(measurement['종료'] || 'Unknown')
        + '</span></div><div class="metric-item"><span class="metric-label">목표</span><strong>미정</strong><span class="metric-note">' + escapeHTML(measurement['목표'] || 'Unknown')
        + '</span></div></div><p class="lane-note">' + inline(measurement['범위'] || '', pageURL) + ' ' + inline(measurement['시작 근거'] || '', pageURL) + '</p>');
      put('panel-people', '<div class="org">' + model.people.map(function (person) {
        return '<article class="org-item"><strong>' + escapeHTML(person.name) + '</strong>' + detail(person) + '</article>';
      }).join('') + '</div>');
      put('panel-docs', '<ul class="doc-list">' + model.docs.map(function (doc) {
        var href = safeHref(doc.attrs.URL || '', pageURL);
        return '<li>' + (href ? '<a href="' + escapeHTML(href) + '">' + escapeHTML(doc.name) + '</a>' : escapeHTML(doc.name)) + detail({ attrs: {
          '수집기록': doc.attrs.Raw || 'Unknown', '정리': doc.attrs['핵심'] || '', '확인 범위': doc.attrs['확인'] || 'Unknown'
        } }) + '</li>';
      }).join('') + '</ul>');
      put('panel-actions', '<h3 class="sub">한국·일본 비교</h3>' + markdown(model.sections['Korea vs Japan'] || '', pageURL)
        + '<h3 class="sub">다음 행동</h3><ul class="action-list">' + model.actions.map(function (action) {
          return '<li><span class="mark">' + (action.status === 'x' ? '✓' : action.status === '>' ? '…' : '○') + '</span><div>' + inline(action.name, pageURL) + detail(action) + '</div></li>';
        }).join('') + '</ul>');
      put('summary-view', markdown(model.sections.Summary || '', pageURL));
      put('statistics-view', model.stats.map(function (stat) {
        return '<div class="stat"><strong>' + escapeHTML(stat.attrs.Value || 'Unknown') + '</strong><span>' + escapeHTML(stat.name) + '</span><span>' + escapeHTML(stat.attrs.Detail || '') + '</span><span>' + inline(stat.attrs.Evidence || '', pageURL) + '</span></div>';
      }).join(''));
      put('bottleneck-view', markdown(model.sections.Bottleneck || '', pageURL));
      put('investigation-view', markdown(model.sections.Investigation || '', pageURL));
      put('questions-view', markdown(model.sections.Questions || '', pageURL));
      put('evidence-notes-view', markdown(model.sections['Evidence notes'] || '', pageURL));
    }

    var drawer = document.getElementById('drawer'), back = document.getElementById('drawer-back');
    function close() { drawer.hidden = true; back.hidden = true; if (opener) opener.focus(); }
    document.getElementById('drawer-close').addEventListener('click', close);
    back.addEventListener('click', close);
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !drawer.hidden) close(); });
    document.getElementById('tl-inner').addEventListener('click', function (click) {
      var button = click.target.closest('.node');
      if (!button || !model) return;
      var event = model.events[Number(button.dataset.i)];
      if (!event) return;
      opener = button;
      document.getElementById('d-event').textContent = event.label;
      var sourceHTML = originalSources(event.evidence, model.docs).map(function (doc) {
        return inline('[' + doc.name + '](' + doc.attrs.URL + ')', pageURL);
      }).join('<br>');
      var rows = [
        ['날짜', escapeHTML(event.date)], ['기록 상태', escapeHTML(STATUS[event.status])],
        ['관련 주체', escapeHTML(event.actors || 'Unknown')], ['확인 수준', escapeHTML(event.verification || 'Unknown')],
        ['설명', escapeHTML(event.detail)], ['기록 간 간격', escapeHTML(event.elapsed || '')],
        ['raw 근거', inline(event.evidence || 'Unknown', pageURL)], ['원문 출처', sourceHTML],
        ['위키 정리', '<a href="' + WIKI_VIEW + '">LLM이 정리한 문서 보기</a>']
      ];
      put('d-fields', rows.filter(function (row) { return row[1]; }).map(function (row) {
        return '<dt>' + escapeHTML(row[0]) + '</dt><dd>' + row[1] + '</dd>';
      }).join(''));
      drawer.hidden = false; back.hidden = false;
      document.getElementById('drawer-close').focus();
    });
    document.querySelectorAll('.tab').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(function (tab) { tab.setAttribute('aria-selected', String(tab === button)); });
        ['timeline', 'people', 'docs', 'actions'].forEach(function (name) {
          document.getElementById('panel-' + name).hidden = name !== button.dataset.tab;
        });
      });
    });
    return fetcher(WIKI_PATH).then(function (response) {
      if (!response.ok) throw new Error('Wiki fetch failed');
      return response.text();
    }).then(function (md) {
      model = parse(md);
      render();
      return model;
    }).catch(function () {
      var message = '<p class="lane-note">조사 정리를 불러오지 못했습니다. <a href="' + WIKI_VIEW + '">위키 정리 보기</a> · ' + inline('[raw 근거 안내](../raw/sources/README.md)', pageURL) + '</p>';
      ['measurement-view', 'tl-inner', 'panel-people', 'panel-docs', 'panel-actions', 'summary-view', 'statistics-view', 'bottleneck-view', 'investigation-view', 'questions-view', 'evidence-notes-view'].forEach(function (id) { put(id, message); });
      return null;
    });
  }

  var api = { parse: parse, dateRange: dateRange, interval: interval, measurementDays: measurementDays, koreaDate: koreaDate, markdown: markdown, inline: inline, links: links, originalSources: originalSources, mount: mount };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else {
    root.OpenDriveWiki = api;
    if (root.document.getElementById('tl-inner')) mount(root.document, root.fetch.bind(root));
  }
})(typeof window === 'undefined' ? globalThis : window);
