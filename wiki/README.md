# Wiki

진실의 원천 single source of truth. 웹페이지는 이 디렉토리의 Markdown을
읽어서 보여주는 View다. Timeline 데이터를 웹 코드에 따로 두지 않는다.

## Files

- `dcas.md` — DCAS / Tesla FSD의 전부 (Korea + Japan 한 파일)
- `log.md` — append-only 작업 로그
- 필요해지면 주제별로 분리한다. 서두르지 않는다.

원본 자료는 `../raw/sources/`에 먼저 넣고 ingest한다. 이 디렉토리는 정리된 지식만 둔다.

## Conventions

### Timeline 한 줄 형식

```md
- [x] 2025-09-26 — R171.01 발효 — 부가 설명 (선택)
- [>] 2026-07-29 — 개정안 상임위 심사 중
- [ ] Pending — DCAS 국내 반영 완료
```

- `[x]` done, `[>]` 진행 중, `[ ]` 미완료·측정 중
- 날짜는 ISO (`YYYY-MM-DD`). 월·연까지만 알면 `YYYY-MM`, `YYYY`로 쓴다.
- 월을 모르면 `YYYY-??`로 쓰고 `(월 미확인)`을 뒤에 붙인다.
- 정확한 일이 아니면 페이지에서 점선 노드로 표시된다.
- ` — ` 뒤 첫 조각은 짧은 라벨, 두 번째 ` — ` 뒤는 drawer용 상세다.
- Pending 줄 끝에 `(since:YYYY-MM-DD)`를 붙이면 그 날짜부터 측정한다.
  없으면 같은 레인의 직전 dated 노드부터 잰다 (어림값이면 `~` 표시).

### Documents 한 항목 형식

```md
- 제목
  - URL: https://...
  - 핵심: 한 줄 요약
```

### 추가 규칙

- `New material`에만 날짜순으로 raw 추가. 해석·재분류는 다음 패스에서.
- 불확실하면 `??`·`미확인`·`미정`으로 남긴다. 추측해서 확정 수치로 쓰지 않는다.
- 인명은 역할이 다른 동명이인·유사 사안에 주의 (예: 박용갑 85건 vs 박상혁 질의).
- URL에 트래커(`utm_source` 등)를 붙이지 않는다.
