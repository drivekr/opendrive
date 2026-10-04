# Log

Append-only. ingest·수정·판단 변경이 있을 때마다 날짜와 함께 한 줄씩 추가한다.
과거 항목은 고치지 않는다.

- 2026-10-04 — v0.1 랜딩 (단일 `index.html`, Mission → Bottleneck → Why → …) 생성·배포.
- 2026-10-04 — Bottleneck 섹션 추가 (Tesla FSD, `IDENTIFIED`, 79.3% / 9.6% / 85건).
- 2026-10-04 — Bottleneck 2단계 심화 (제89조 별표6의2, R171.01 2025-09-26, 의안 2220196, 15–16개월).
- 2026-10-04 — v0.2 인터랙티브 타임라인 (Mission 바로 아래, Korea/Japan 비교선, drawer).
- 2026-10-04 — `wiki/dcas.md`를 single source of truth로. 페이지 4개 뷰(Timeline/People/Documents/Actions)가 md 파싱 렌더로 전환.
- 2026-10-04 — `AGENTS.md` 작성. llmwiki 패턴 채택: `raw/`(사람·불변) → `wiki/`(LLM 소유) → landing.
- 2026-10-04 — 모순 수정: 어림 날짜 기반 Elapsed에 `~` 표기, Pending 측정 기준일을 R171.01로 통일 (`since:` 규칙 신설), 5월/9월 두 통계의 분모 관계 명시.
- 2026-10-04 — `raw/sources/` backfill 15건 (UN/EU/JP/법령/의안/기관/언론). EUR-Lex `/oj/eng`·MOLIT full URL로 교체, MLIT 회의 목록 URL 추가, 제89조 현행 시행일(2026-07-10) 기록.
- 2026-10-04 — 역할 정정: 근거의 원천은 raw이며 wiki는 LLM이 수정하는 해석이다. 과거 single source of truth 판단을 철회하고 AGENTS·raw 안내·wiki 안내·프로젝트 README를 통일. 기존 raw 근거 15건은 보존하고 조사 메모·측정 선택의 근거 사용 범위를 wiki에서 구분.
- 2026-10-04 — 새 raw 4건 반영: `2026-10-04-un-r171-cn351.md`, `2026-10-04-un-r171-01-official-text.md`, `2026-10-04-mlit-dcas-review-records.md`, `2026-10-04-dcas-bill-status.md`. CN.351의 R171.01 교차검증 연결을 제외, 일본 2024년 개정 월을 후속 MLIT 원문으로 보완, 임의적용 해석 정정, 회부와 실제 심사 구분.
- 2026-10-04 — dcas 정리의 사실·통계·타임라인·관련 주체에 raw 링크와 확인 범위 추가. 한국/일본의 순차·병렬 단정과 서로 다른 규정 버전의 소요 시간 직접 비교를 보류. 두 FSD 통계의 추세 단정을 철회하고 분류 기준 확인을 Actions에 추가.
- 2026-10-04 — 랜딩 조사 내용을 wiki 렌더링으로 통일. 사건별 raw·원문·관련 주체·확인 수준 표시, raw 파일을 그대로 읽는 source 뷰 추가, 월·연 단위 날짜의 일수 계산 보류, 한국 날짜와 확인된 종료일에 따른 경과 계산. Pages 배포 전에 근거 연결·렌더러 검사 실행하도록 추가.
- 2026-10-04 — 랜딩 본문을 Mission → 타임라인으로 축소. 한국 기록 최신 4건·이전 기록 펼치기, 연도만 확인된 기록 분리, 국내 미확인 결과 상단 표시, 연·월별 국제·한국·일본 비교로 변경. raw·원문 우선 사건 상세와 조사 정리 패널에 해석·통계·질문·관련 주체·문서·행동을 모으고 키보드 닫기·포커스 복귀·로딩 실패 재시도를 추가. 기존 raw와 dcas 조사 판단은 유지.
