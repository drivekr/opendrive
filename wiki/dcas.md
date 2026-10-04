# DCAS / Tesla FSD

> Humans collect evidence.
> LLM organizes the evidence.
> OpenDrive turns it into action.

이 파일이 진실의 원천이다. 웹페이지의 Timeline / People / Sources / Actions는
이 Markdown을 읽어서 보여주는 View에 불과하다. 새 자료가 나오면 아래
`New material` 규칙대로 이 파일에만 추가한다.

## Summary

한국에서는 중국산 Model 3/Y의 FSD 적용이 국내 안전기준과
DCAS 제도 정비 문제로 지연되고 있다.

- 2026년 8월 기준 국내 운행 테슬라 약 22.9만 대 중 **79.3%는 FSD 사용 불가**.
  주력 차종 Model Y의 FSD 사용 가능 비율은 **9.6%**에 불과하다.
- 미국산 차량은 한미 FTA 안전기준 상호인정으로 FSD 사용 가능.
  중국 상하이산 Model 3/Y는 국내 안전기준을 직접 충족해야 한다.
- 국토부는 `자동차규칙 제89조 별표6의2 제10호`와의 충돌을 지목했다.
  (운전자 방향지시등 직접 조작 전제 vs 시스템 주도 차로변경)
- 2026년 4월 28일 기준 FSD 무단 활성화 시도 **85건** 확인.
- 두 수치는 기준이 다르다: 2026-05-04 발표는 등록 180,684대 중 합법 2.4%,
  2026-09-15 보도는 운행 229,311대 중 79.3% 불가. 시점·모집단이 다르며
  사용 가능 비율이 낮다는 추세는 동일하다.

## Timeline

### UN

- [x] 2024-03 — UN R171 채택 (WP.29 192회) — DCAS 국제기준 신설
- [x] 2024-09-22 — UN R171 발효 — DCAS 인증 시작
- [x] 2025-03 — R171.01 채택 (WP.29 195회) — system-initiated manoeuvre 추가 (E-ACSF · HOR · EOR · DCA)
- [x] 2025-09-26 — R171.01 발효 — system-initiated lane change 인증 가능
- [x] 2026-06 — R171.02 채택 (WP.29 199회) — DCAS 적용 범위 정교화

### Korea

- [x] 2025-?? — 15–16개월 절차 공개 — 박상혁 의원실 서면질의 답변 · 의견수렴 6개월 + 입안 6개월 + 입법·규제·법제 3–4개월 (월 미확인)
- [x] 2026-05-04 — FSD 무단 활성화 85건 공개 — 박용갑 의원, 사후 대응 한계 지적·제도 개선 요구
- [x] 2026-07-28 — DCAS 제도 개정안 발의 — 송기헌 의원 등 11인 발의, 07-29 국토교통위원회 회부
- [>] 2026-07-29 — 개정안 상임위 심사 중 — 의안 2220196, 국토교통위원회 회부 단계
- [x] 2026-08-31 — FSD 국내기준 부적합 판단 — 국토부 민원 답변, 제89조 별표6의2 제10호 명시
- [x] 2026-09-15 — 79.3% / 9.6% 보도 — 한국경제, 카이즈유 데이터 (8월 기준)
- [ ] Pending — DCAS 국내 반영 완료 — R171.01 발효 후 측정 중 (since:2025-09-26)
- [ ] Pending — Model Y deployment — FSD 사용 가능 (since:2025-09-26)

### Japan

- [x] 2024-06-26 — 국내 검토 공개 (차량안전대책검토회) — R171 국내 반영 방침, 동년 9월 중순 개정 예정
- [x] 2024-09 — 국내 개정 + 임의적용 — 추가 hands-off 개정 대기분은 임의적용(optional)으로 처리

## Bottleneck

현재 확인된 핵심 병목:

1. 한국 안전기준은 운전자 주도 차선변경을 전제로 함 (제89조 2항 + 별표 6의2 범주 C)
2. UN R171은 system-initiated manoeuvre까지 확대 (01 series, 2025-09-26 발효)
3. 국내 DCAS 법적/관리 체계가 아직 구축 중 (자동차관리법에 정의·인증·사후관리 framework 부재)
4. 국제기준 → 국내기준 반영에 긴 행정 절차가 필요 (공식 절차상 약 15–16개월)

즉: 기술을 시험할 기준이 없어서가 아니라,
새 국제기준을 국내에서 인증하고 관리할 regulatory pipeline이 아직 완성되지 않았다.

## People / Organizations

- UNECE WP.29 / GRVA
  - UN R171 제·개정
- 국토교통부 자율주행정책과
  - 국내 자율주행 정책·안전기준 총괄
  - 자율차 안전기준, 성능인증제, 상용화 정책
- TS 자동차안전연구원 (KATRI)
  - 기준 연구·시험
  - 국제 기준 대응 (KICAS 제네바 사무소)
- 박상혁 의원
  - 국토부 서면질의 (제약 완화·도입 시기·절차)
- 박용갑 의원
  - 85건 자료 공개, 사후 대응 한계 지적·제도 개선 요구
- 송기헌 의원 등 11인
  - DCAS 자동차관리법 개정안 발의 (의안 2220196)
- 국회 국토교통위원회
  - 개정안 심사 중 (2026-07-29 회부)
- 제작사 · 수입사
  - 자기인증·출시
- Driver
  - FSD 사용 가능 여부를 체감한다

## Documents

- UN R171 01 series 영문 (UNECE)
  - URL: https://unece.org/sites/default/files/2025-03/R171e.pdf
  - 핵심: system-initiated manoeuvre 요구사항 포함 ("Additional requirements for system-initiated lane changes")
- EU 2025/1899 — R171.01 (EUR-Lex)
  - URL: https://eur-lex.europa.eu/eli/reg/2025/1899/oj
  - 핵심: 01 series EU 법제화 문서
- R171 02 series 제안·채택 기록 (GAR)
  - URL: https://globalautoregs.com/documents/42373
  - 핵심: WP.29 199회 (2026-06) 채택
- MLIT 차량안전대책검토회 회의자료 (PDF)
  - URL: https://www.mlit.go.jp/jidosha/content/001843891.pdf
  - 핵심: 2024-06-26 공개, 9월 중순 개정 예정, 추가 개정 대기분 임의적용 명시
- 자동차규칙 제89조 (국가법령정보센터)
  - URL: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1031833383
  - 핵심: 조향장치는 별표 6의2 기준 준수
- 자동차관리법 개정안 의안 2220196 (국민참여입법센터)
  - URL: https://community.lawmaking.go.kr/gcom/nsmLmSts/out/2220196/detailRP
  - 핵심: DCAS 정의·안전관리체계·조사·시정·벌칙 신설, 2026-07-28 발의·07-29 회부
- 국토교통부 자율주행정책과 업무
  - URL: https://www.molit.go.kr/USR/deptInfo/m_94/lst.jsp?DEPT_ID=1613787
  - 핵심: 안전기준·성능인증제·상용화 정책 총괄
- 자동차 안전기준 종합정보시스템 (KICAS)
  - URL: https://kicas.katri.or.kr/info/life/citationSystem
  - 핵심: 기준·국제조화 자료
- 국토부가 밝힌 FSD 국내 기준 충돌 지점 (블로터)
  - URL: https://v.daum.net/v/9ZP6yT6bUZ
  - 핵심: 2026-08-31 민원 답변, 별표6의2 제10호 부적합, DCAS만으로 도심 기능 수용 곤란
- 박상혁 의원 질의와 국토부 답변·도입 시기 (블로터)
  - URL: https://v.daum.net/v/UaHa6f71e4
  - 핵심: 제89조 제약 완화 질의, 15–16개월 절차·2027년 이후 전망
- FSD 무단 활성화 85건 (연합뉴스, 2026-05-04)
  - URL: https://www.yna.co.kr/view/AKR20260501058600003
  - 핵심: 85건 (4월 28일 기준), 합법 FSD 2.4%, 박용갑 의원 제도 개선 요구
- 국내 Tesla FSD 적용 현황 (한국경제, 2026-09-15)
  - URL: https://www.hankyung.com/article/202609142445g
  - 핵심: 22.9만 대 중 79.3% 불가, Model Y 9.6%

## Korea vs Japan

### Korea

- UN 기준 완성 후 국내 검토 시작 (순차 처리)
- DCAS 법적 framework 자체가 아직 심사 중
- 공식 절차상 약 15–16개월

### Japan

- WP.29 논의 단계부터 국내 검토 병렬 진행
- 일부 기준은 임의적용(optional)으로 우선 도입
- 2024년 3월 합의 → 9월 국내 개정, 약 6개월

## Questions

- 국토부가 R171 국내 도입 검토를 정확히 언제 시작했나?
- 현재 안전기준 개정은 어느 단계인가?
- 일본의 01 series 국내 반영 시점은? (2025년 패턴 미확인)
- 국제기준 논의 단계부터 국내 검토를 시작할 수 있는가?
- 임의적용(early adoption) 방식이 한국에도 가능한가?
- 15–16개월 중 단축 가능한 단계는 어디인가?

## Actions

- [x] 한국·일본 타임라인 초안 (2026-10-04)
- [ ] 한국 규제 반영 타임라인 완성 (날짜 확정)
- [ ] 일본 타임라인 완성 (01 series 반영 시점 포함)
- [ ] 한국/일본 lead time 비교 (day count)
- [ ] 가장 긴 병목 구간 선정 → 첫 OpenDrive Action
- [ ] 담당 기관에 질의 (검토 착수일·절차)
- [ ] 가설 1 — Pre-adoption 검증 (순차 → 병렬, 단축 효과 계산)
- [ ] 가설 2 — Optional early adoption 검토 (의무 시행 전 우선 인증 가능 여부)

## New material

새 자료는 해석하지 말고 그대로 추가한다. 형식:

```md
### YYYY-MM-DD
내용 한두 줄.
Source: URL 또는 출처명
```

정리는 다음 패스에서 이 파일 전체를 다시 읽으며 반영한다.
(Timeline 추가, Bottleneck 갱신, People 추가, Action 갱신, 해결된 Question 정리)

### 2026-10-04

- R171.01 발효일 2025-09-26 확정 (복수 출처 교차 확인).
- R171.02 WP.29 199회 (2026-06) 채택 확인.
- 일본 2024 체인 확인 (MLIT 06-26 회의 → 09월 중순 개정·임의적용).
- 일본 2025년 01 series 국내 반영 패턴은 미확인 → Questions로 이동.
- 박상혁 의원 질의 시점의 월 단위는 미확인 → `2025-??` 표기.

Source: UNECE 문서, MLIT 회의자료, GAR, 국내 언론 보도
