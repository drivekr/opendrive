(function () {
  'use strict';
  var path = new URLSearchParams(location.search).get('path') || '';
  var record = document.getElementById('record');
  if (!/^raw\/sources\/[A-Za-z0-9_-]+\.md$/.test(path)) {
    record.textContent = '수집기록 경로를 확인할 수 없습니다. 타임라인에서 근거를 선택해주세요.';
    return;
  }
  fetch(path).then(function (response) {
    if (!response.ok) throw new Error('Raw fetch failed');
    return response.text();
  }).then(function (text) {
    record.textContent = text;
    document.title = (text.split('\n')[0].replace(/^#\s*/, '') || '근거 수집기록') + ' — OpenDrive Korea';
    var urls = Array.from(new Set(text.match(/https?:\/\/[^\s<>"`]+/g) || []));
    var list = document.getElementById('source-links');
    urls.forEach(function (url) {
      var item = document.createElement('li'), link = document.createElement('a');
      link.href = url;
      link.textContent = url;
      item.appendChild(link);
      list.appendChild(item);
    });
    document.getElementById('originals').hidden = !urls.length;
  }).catch(function () {
    record.textContent = '수집기록을 불러오지 못했습니다. 타임라인으로 돌아가 다른 근거나 원문 출처를 확인해주세요.';
  });
})();
