# DCAS / Tesla FSD

근거의 원천은 [raw 수집기록](../raw/sources/README.md)과 그 기록에 연결된 외부 자료다.
이 문서는 LLM이 근거에 따라 수정하는 현재의 정리와 해석이다. 원문·확인 수준을 우선하며 새 근거가 나오면 판단을 바꾼다.

## Summary

국내 Tesla FSD의 제공 범위와 DCAS 제도 반영을 조사한다. 블로터가 인용한 국토부 민원 답변은 시스템 주도 차로변경과 국내 조향 안전기준의 충돌, 일부 미국산 차량에 대한 한미 FTA 안전기준 상호인정을 설명한다. 민원 답변 원문은 아직 확보하지 못했다. [보도 수집기록](../raw/sources/2026-08-31-molit-fsd-ruling.md)

DCAS 국내 반영과 제작사의 공식 배포는 구분해서 확인해야 한다. 의안 공개 정보에는 법안 발의·위원회 회부가 기록되어 있지만, 최종 법령 반영일과 중국산 Model 3/Y의 공식 FSD 제공 시점은 현재 수집한 근거로 확정할 수 없다. [의안 수집기록](../raw/sources/2026-07-28-dcas-bill-2220196.md), [진행정보 확인](../raw/sources/2026-10-04-dcas-bill-status.md), [제작사 배포 관련 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md)

2026년 10월 보도에는 테슬라코리아의 두 차례 검증 협력·시험차량 제공 제안 설명과 국토부·한국교통안전공단의 FSD 시험 실적 없음 답변이 함께 나타난다. 제안의 정식 접수·처리와 공식 거절 여부는 Unknown이다. 중국산 허용에 대한 현재 협의 없음도 보도됐으나 과거의 일반 FSD 출시 사전 협의와는 범위를 구분한다. [제안·기관 답변 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md), [검증·협의 관련 방송 보도](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)

## Measurement

- 시작: 2025-09-26
- 시작 근거: [R171.01 발효 기록](../raw/sources/2026-10-04-un-r171-01-official-text.md)
- 표시: R171.01 발효 후 경과
- 종료: Unknown
- 범위: OpenDrive의 관찰 기준. 국내 최종 반영일을 확인하기 전에는 실제 행정 소요 시간이나 특정 기관의 지연 기간으로 확정하지 않는다.
- 목표: 동일한 시작·종료 기준을 확보한 뒤 설정

## Statistics

- 국내 Tesla FSD 사용 불가 비율
  - Value: 79.3%
  - Detail: 한국경제 보도 · 2026년 8월 운행 229,311대 중 181,853대
  - Evidence: [통계 수집기록](../raw/sources/2026-09-15-tesla-fsd-korea-stats.md)
- Model Y FSD 사용 가능 비율
  - Value: 9.6%
  - Detail: 한국경제 보도 · 2026년 8월 기준 · 중국산 차량만의 비율은 아님
  - Evidence: [통계 수집기록](../raw/sources/2026-09-15-tesla-fsd-korea-stats.md)
- FSD 무단 활성화 시도
  - Value: 85건
  - Detail: 연합뉴스가 인용한 박용갑 의원실 자료 · 2026-04-28 기준
  - Evidence: [85건 수집기록](../raw/sources/2026-05-04-fsd-85-cases.md)

## Timeline

### UN

- [x] 2024-03 — UN R171 채택 — DCAS 국제기준 신설. 정확한 채택 일자는 미확인
  - Evidence: [채택 기록](../raw/sources/2024-03-un-r171-adopted.md), [MLIT 공식 회고](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - Actors: UNECE WP.29 / GRVA
  - Verification: 채택 월은 MLIT 1차 자료로 확인. WP.29 회의보고서 원문 미확보
- [x] 2024-09-22 — UN R171 발효 — 원래 버전의 발효일에 대한 2차 수집기록
  - Evidence: [발효 기록](../raw/sources/2024-09-22-un-r171-in-force.md)
  - Actors: UNECE WP.29 / 적용 당사국
  - Verification: 2차 자료. 공식 발효 통고 추가 확보 필요
- [x] 2025-03 — R171.01 채택 — MLIT가 WP.29 제195회 채택을 기록. 정확한 의결 일자는 미확인
  - Evidence: [MLIT 공식 기록](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - Actors: UNECE WP.29 / GRVA
  - Verification: 1차 자료. 기존 CN.351 통고는 이 사건의 근거에서 제외
- [x] 2025-09-26 — R171.01 발효 — 공식 수록본에 발효일 명시. 시스템 주도 차로변경 요구사항의 범위와 FSD 전체 제공 여부는 구분
  - Evidence: [공식 수록본 확인](../raw/sources/2026-10-04-un-r171-01-official-text.md), [기존 발효 기록](../raw/sources/2025-09-26-r171-01-in-force.md)
  - Actors: UNECE WP.29 / 적용 당사국
  - Verification: EUR-Lex 공식 검색 색인 확인. 기존 기록의 CN.351 교차검증 주장은 제외
- [x] 2026-06 — R171.02 채택 기록 — GAR에 WP.29 제199회 채택 기록. UN 회의보고서와 발효 여부 추가 확인 필요
  - Evidence: [GAR 수집기록](../raw/sources/2026-06-r171-02-adopted.md)
  - Actors: UNECE WP.29 / GRVA
  - Verification: 2차 기록(GAR). UN 회의보고서 원문 미확보

### Korea

- [x] 2025 — DCAS 반영 절차 보도 — 국토부 답변을 인용한 의견수렴 6개월·입안 6개월·입법 절차 최소 3–4개월. 질의·보도 월일은 미확인
  - Evidence: [절차 보도](../raw/sources/2025-molit-15mo-procedure.md)
  - Actors: 국토교통부 / 박상혁 의원실 / 블로터
  - Verification: 2차 보도. 예상 절차이며 실제 착수·종료일 기록은 아님
- [x] 2025-11 — 테슬라 설명: FSD 검증 협력 제안 — 국내 출시 전 국토부와 사전 협의하며 안전성 검증 협력·시험차량 제공을 제안했다는 회사 설명이 2026-10-04 보도됨. 정확한 제안 일자와 정식 접수 여부는 미확인
  - Evidence: [테슬라 제안 설명 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
  - Actors: 테슬라코리아 / 국토교통부
  - Verification: 2차 보도 · 회사 설명. 제안 공문·접수 기록 미확보
- [x] 2026-05-04 — FSD 무단 활성화 85건 보도 — 박용갑 의원실 자료를 연합뉴스가 보도. 집계 기준일은 4월 28일
  - Evidence: [85건 수집기록](../raw/sources/2026-05-04-fsd-85-cases.md)
  - Actors: 박용갑 의원실 / 국토교통부 / 테슬라코리아
  - Verification: 2차 보도. 의원실 제출자료 원문 미확보
- [x] 2026-07 — 테슬라 설명: 검증·시험차량 제공 재제안 — FSD V14 라이트 출시 전 자료와 시험차량 제공을 다시 제안했다는 회사 설명이 2026-10-04 보도됨. 중국산 Model 3/Y의 제한적 시험·임시운행허가 활용 방안도 설명. 신청 접수·허가 여부는 미확인
  - Evidence: [재제안 설명 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
  - Actors: 테슬라코리아 / 국토교통부
  - Verification: 2차 보도 · 회사 설명. 제안 일자는 월 단위, 신청·처리 기록 미확보
- [x] 2026-07-28 — DCAS 법안 발의 — 송기헌 의원 등 11인, 의안 2220196
  - Evidence: [법안 수집기록](../raw/sources/2026-07-28-dcas-bill-2220196.md)
  - Actors: 송기헌 의원 등 11인
  - Verification: 1차 자료(국민참여입법센터)
- [x] 2026-07-29 — 법안 국토위 회부 — 공개 진행정보에서 회부 확인. 실제 심사 활동·의결 여부는 별도 확인 대상
  - Evidence: [진행정보 확인](../raw/sources/2026-10-04-dcas-bill-status.md)
  - Actors: 국회 국토교통위원회
  - Verification: 1차 자료. 2026-10-04 조회 기준 회부 정보
- [x] 2026-08-31 — FSD 국내기준 충돌 답변 — 블로터가 국민신문고 답변의 제89조 별표6의2 제10호 부적합 판단을 인용
  - Evidence: [민원 답변 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md)
  - Actors: 국토교통부 / 민원인 / 블로터
  - Verification: 2차 보도. 국민신문고 답변 원문 미확보
- [x] 2026-09-15 — FSD 제공 범위 통계 보도 — 한국경제가 카이즈유의 2026년 8월 차량 통계를 보도
  - Evidence: [통계 수집기록](../raw/sources/2026-09-15-tesla-fsd-korea-stats.md)
  - Actors: 카이즈유데이터연구소 / 한국경제 / 테슬라 차량 소유자
  - Verification: 2차 보도. 원데이터와 사용 가능 분류 기준 미확보
- [x] 2026-10-01 — 정부 FSD 시험·검증 없음 보도 — 연합뉴스TV가 공공 검증·시험과 중국산 허용 협의가 없다고 보도. 정책적 모순 인정은 방송의 서술이며 기관 답변 원문은 미확보
  - Evidence: [연합뉴스TV 보도](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)
  - Actors: 국토교통부 / 장종태 의원실 / 연합뉴스TV
  - Verification: 2차 보도 · 기관 설명 인용. 날짜는 보도일, 공식 거절 기록은 아님
- [x] 2026-10-04 — FSD 검증 제안·시험 실적 없음 보도 — 전남일보가 두 차례 제안에 대한 테슬라 설명과 국토부·공단의 시험 실적 없음 답변을 보도. 중국산 허용 별도 협의도 없다고 설명. 정식 접수·거절은 미확인이고 공단은 관련 검사기술·제도 연구 중이라고 답변
  - Evidence: [전남일보 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
  - Actors: 테슬라코리아 / 국토교통부 / 한국교통안전공단
  - Verification: 2차 보도 · 회사·기관 설명 인용. 날짜는 보도일, 기관 답변일은 Unknown
- [ ] Pending — DCAS 국내 반영일 확인 — 최종 법령·안전기준 반영일 및 적용 범위 미확인
  - Evidence: [공개 진행정보](../raw/sources/2026-10-04-dcas-bill-status.md), [절차 보도](../raw/sources/2025-molit-15mo-procedure.md)
  - Actors: 국토교통부 / 국회 / 제작사·수입사
  - Verification: Unknown. 회부 기록만으로 국내 제도 전체의 완료 여부를 판단하지 않음
- [ ] Pending — 중국산 Model 3/Y 공식 FSD 제공 확인 — 제작사의 공식 배포와 대상 차량·하드웨어·기능을 확인할 필요
  - Evidence: [제공 조건 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md)
  - Actors: 테슬라코리아 / 차량 소유자
  - Verification: Unknown. 일부 미국산 Model Y 제공과 구분

### Japan

- [x] 2024-06-26 — R171 국내 반영 계획 공개 — 9월 중순 개정·적용 예정. 추가 국제 개정의 국내 반영 전까지 DCAS 기준 임의적용 방침
  - Evidence: [MLIT 원문 확인](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - Actors: 일본 국토교통성(MLIT) / 차량안전대책검토회
  - Verification: 1차 자료. 계획 공개가 확인된 사건
- [x] 2024-09 — R171 국내 개정·공포 — 2025-06-09 MLIT 공식 자료가 2024년 9월 개정·공포를 회고. 정확한 공포일은 미확인
  - Evidence: [MLIT 후속 확인](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - Actors: 일본 국토교통성(MLIT)
  - Verification: 1차 자료로 개정 월 확인. 당시의 계획 자료만으로 완료를 판정하지 않음
- [x] 2025-06-09 — R171.01 국내 반영 계획 공개 — 2025년 9월 하순 개정 예정. 신형차 2029년 9월·계속생산차 2031년 9월 적용 예정
  - Evidence: [MLIT 01 series 계획](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - Actors: 일본 국토교통성(MLIT) / 차량안전대책검토회
  - Verification: 1차 자료. 개정 예정과 차종별 적용 예정을 구분
- [ ] Pending — R171.01 국내 반영 실행일 확인 — 계획 이후의 공포·시행 문서 확보 필요
  - Evidence: [MLIT 반영 계획](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - Actors: 일본 국토교통성(MLIT)
  - Verification: Unknown. 실행 여부와 날짜는 현재 수집한 1차 자료로 미확인

## Bottleneck

### 검증 제안과 공공 시험의 연결

관찰 상태는 **제안 설명 → FSD 시험·평가 실적 없음 → 후속 행정처리 미확인**이다. 2025년 11월·2026년 7월 제안은 회사 설명으로, 시험 실적 없음은 2026년 10월 보도에 인용된 기관 답변으로 기록한다. 현재 공개 근거만으로 정식 접수, 제안 수용·거절 또는 모든 후속 조치의 부재를 확정할 수 없다. 공단의 검사기술·제도 연구와 FSD 자체 시험은 구분한다. [제안·기관 답변 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md), [방송 보도](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)

조사할 병목은 제안이 접수·시험계획·실행으로 연결되는 과정의 공백이다. 이는 현재 위키의 조사 가설이며 국내 미제공의 유일한 원인이나 정부의 거절 의도로 단정하지 않는다. 회사의 누적 주행 자료도 공공 검증 완료나 안전성 입증과 같지 않다. 접수·처리 기록과 시험 담당·일정을 확보해 연결 여부를 확인한다. [제안과 공개 확인의 한계](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)

### 안전기준과 작동 방식

블로터가 인용한 국토부 설명은 운전자의 방향지시등 조작을 전제로 한 국내 기준과 시스템 주도 차로변경 사이의 충돌을 지목한다. 이는 현재 근거로 추적할 수 있는 규정상 쟁점이다. 별표6의2 제10호 전체 원문과 적용 대상 기능은 별도로 확인해야 한다. [민원 답변 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md), [제89조 수집기록](../raw/sources/2026-07-10-auto-rule-art89.md)

### 안전관리 체계와 공식 배포

DCAS 법안의 제안이유는 정의·제작·운행 관련 제도의 부재를 지적한다. 이를 제안자의 설명으로 기록하며, 법안 회부가 현재 제도 전체의 부재나 FSD 출시의 유일한 원인을 증명하는 것은 아니다. 제작사의 공식 인증·배포 조건도 함께 확인해야 한다. [법안 제안이유](../raw/sources/2026-07-28-dcas-bill-2220196.md), [공개 진행정보](../raw/sources/2026-10-04-dcas-bill-status.md), [공식 배포 관련 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md)

### 반영 절차의 소요 시간

국토부 답변을 인용한 보도는 의견수렴·입안·입법 절차를 합쳐 최소 약 15–16개월로 설명한다. 이 수치는 예상 절차의 합계이며 실제 지연 시간이나 차량 출시까지의 보장된 기간이 아니다. 단계별 착수·종료일을 확보한 뒤 단축 가능한 구간을 판단한다. [절차 보도](../raw/sources/2025-molit-15mo-procedure.md)

## People / Organizations

- UNECE WP.29 / GRVA
  - 역할: DCAS 국제기준 논의·채택
  - Evidence: [국제 채택에 대한 MLIT 기록](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
- 국토교통부
  - 역할: 국내 기준 관련 질의·민원 답변 주체. 자동차정책과의 중국산 FSD 허용 별도 협의 없음과 자체 시험 실적 없음이 보도됨. DCAS L2 기준의 구체적 실무 분담은 Unknown
  - Evidence: [국토부 답변 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md), [부서 업무 수집기록](../raw/sources/2026-10-04-molit-ts-roles.md), [시험·협의 답변 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
- 한국교통안전공단 / 자동차안전연구원(KICAS)
  - 역할: 안전기준 연구·시험·국제조화. 공단의 FSD 시험·평가·분석 실적 없음 및 검사기술·제도 연구 답변이 보도됨. 해당 답변의 세부 수행 부서와 DCAS 반영 업무 분담은 Unknown
  - Evidence: [기관 업무 수집기록](../raw/sources/2026-10-04-molit-ts-roles.md), [공단 답변 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
- 박상혁 의원실
  - 역할: 국토부에 제약 완화·도입 시기·절차를 질의한 주체로 보도됨
  - Evidence: [질의 보도](../raw/sources/2025-molit-15mo-procedure.md)
- 박용갑 의원실
  - 역할: FSD 무단 활성화 자료를 공개한 주체로 보도됨
  - Evidence: [85건 보도](../raw/sources/2026-05-04-fsd-85-cases.md)
- 장종태 의원실
  - 역할: 테슬라코리아의 주행 자료 공개 및 FSD 기준·검증 관련 문제 제기 주체로 보도됨. 의원실 제출자료 원문은 미확보
  - Evidence: [의원실 자료 인용 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md), [검증 관련 발언 보도](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)
- 송기헌 의원 등 11인 / 국회 국토교통위원회
  - 역할: 의안 2220196 발의 / 회부 대상 위원회. 실제 심사 활동은 추가 확인 필요
  - Evidence: [법안 기록](../raw/sources/2026-07-28-dcas-bill-2220196.md), [회부 정보](../raw/sources/2026-10-04-dcas-bill-status.md)
- 일본 국토교통성(MLIT)
  - 역할: R171 국내 기준 개정과 후속 개정 계획 공개
  - Evidence: [MLIT 공식 자료](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
- 테슬라코리아 / 국내 차량 소유자
  - 역할: 공식 소프트웨어 배포 주체이자 검증 협력·시험차량 제공 제안을 설명한 회사 / 제공 범위에 영향을 받는 차량 소유자. 제안 원문과 정식 접수는 미확인
  - Evidence: [배포 조건 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md), [제공 범위 통계](../raw/sources/2026-09-15-tesla-fsd-korea-stats.md), [검증 제안 설명](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)

## Documents

- Tesla FSD 검증 협력 제안과 기관 답변 보도 (전남일보)
  - Raw: [수집기록](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
  - URL: https://v.daum.net/v/20261004145706476
  - 핵심: 회사가 설명한 두 차례 제안, 기관의 시험 실적 없음·중국산 허용 별도 협의 없음 답변, 정식 접수 확인의 한계
  - 확인: 기사 본문 직접 확인한 2차 근거. 제안·접수·처리·기관 답변 원문은 미확보. 공식 거절은 확인되지 않음
- 정부 FSD 검증·시험 관련 보도 (연합뉴스TV)
  - Raw: [수집기록](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)
  - URL: https://v.daum.net/v/20261001231718258
  - 핵심: 정부 시험·검증 및 중국산 허용 협의 없음에 대한 2026-10-01 보도
  - 확인: 방송 기사 본문 직접 확인한 2차 근거. 정책적 모순 인정은 보도의 서술이며 기관 답변 원문은 미확보
- UN R171 초기 채택에 대한 해설
  - Raw: [수집기록](../raw/sources/2024-03-un-r171-adopted.md)
  - URL: https://www.pwc.com/jp/ja/knowledge/column/automotive-research-and-development/unece-wp29-grva-un-r171.html
  - 핵심: 2024년 3월 채택·WP.29 회차에 대한 기존 2차 자료
  - 확인: 2차 자료. 채택 월은 MLIT 후속 공식 자료에서도 확인
- UN R171 초기 발효에 대한 기존 기록
  - Raw: [수집기록](../raw/sources/2024-09-22-un-r171-in-force.md)
  - URL: https://www.stradalex.eu/en/se_src_publ_leg_eur_jo/document/ojeu_202402689
  - 핵심: 2024-09-22 발효 기록
  - 확인: 2차 자료. 국가별 적용 및 59개국 채택 주장은 이 위키의 근거로 사용하지 않음
- MLIT 2024년 국내 반영 계획
  - Raw: [당시 수집기록](../raw/sources/2024-06-26-mlit-dcas-review.md)
  - URL: https://www.mlit.go.jp/jidosha/content/001843891.pdf
  - 핵심: 2024-06-26의 개정·적용 계획 및 임의적용 방침
  - 확인: 기존 기록은 검색 스니펫 기반. 새 수집기록에서 PDF 원문 확인
- 일본 2024년 개정에 대한 과거 예정 기록
  - Raw: [기존 수집기록](../raw/sources/2024-09-mlit-dcas-revision.md)
  - URL: https://www.mlit.go.jp/jidosha/content/001843891.pdf
  - 핵심: 계획을 근거로 정리했던 과거 기록
  - 확인: 이 기록 단독으로 완료를 입증하지 않음. MLIT 후속 기록으로 개정 월 보완
- MLIT 2024년 개정 회고·2025년 반영 계획
  - Raw: [직접 확인 수집기록](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
  - URL: https://www.mlit.go.jp/jidosha/content/001895048.pdf
  - 핵심: 2024년 9월 개정·공포 확인, 01 series의 개정·차종별 적용 예정 구분
  - 확인: 1차 자료 직접 확인. 2025년 실행일은 미확인
- R171.01 채택에 대한 기존 기록
  - Raw: [기존 수집기록](../raw/sources/2025-03-r171-01-adopted.md)
  - URL: https://unece.org/sites/default/files/2025-03/R171e.pdf
  - 핵심: 과거 채택·기술 내용 정리
  - 확인: 이 PDF의 01 series 판본 표시는 이번에 검증하지 못함. CN.351은 다른 개정 통고이므로 제외
- R171.01 발효에 대한 기존 기록
  - Raw: [기존 수집기록](../raw/sources/2025-09-26-r171-01-in-force.md)
  - URL: https://eur-lex.europa.eu/eli/reg/2025/1899/oj/eng
  - 핵심: 발효일 기록
  - 확인: CN.351 교차검증 주장은 제외. 측정 기준일 선택은 위키 Measurement에서 관리
- R171.01 공식 수록본
  - Raw: [새 수집기록](../raw/sources/2026-10-04-un-r171-01-official-text.md)
  - URL: https://eur-lex.europa.eu/eli/reg/2025/1899/oj/eng
  - 핵심: 01 series 2025-09-26 발효. 진본 문서는 WP.29/2025/7
  - 확인: 공식 검색 색인 확인. EU 관보 수록 자체를 별도의 국내 채택·인증 완료로 해석하지 않음
- UN 통고 C.N.351.2025
  - Raw: [통고 직접 확인](../raw/sources/2026-10-04-un-r171-cn351.md)
  - URL: https://treaties.un.org/doc/Publication/CN/2025/CN.351.2025-Eng.pdf
  - 핵심: 문서 WP.29/2024/146에 대한 2025-06-12 채택·구속력 통고
  - 확인: 1차 자료 직접 확인. R171.01 발효 교차검증 근거로 사용하지 않음
- R171.02 채택 기록 (GAR)
  - Raw: [수집기록](../raw/sources/2026-06-r171-02-adopted.md)
  - URL: https://globalautoregs.com/documents/42373
  - 핵심: WP.29 제199회 채택 기록
  - 확인: 2차 자료. 공식 회의보고서와 발효 여부 추가 확인 필요
- 자동차규칙 제89조
  - Raw: [수집기록](../raw/sources/2026-07-10-auto-rule-art89.md)
  - URL: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1031833383
  - 핵심: 조향장치가 별표6의2 기준을 따르도록 규정
  - 확인: 수집 당시 조문 확인. 별표6의2 제10호 전체 원문은 미확보
- DCAS 자동차관리법 개정안 의안 2220196
  - Raw: [발의·제안이유 수집기록](../raw/sources/2026-07-28-dcas-bill-2220196.md), [진행정보 확인](../raw/sources/2026-10-04-dcas-bill-status.md)
  - URL: https://community.lawmaking.go.kr/gcom/nsmLmSts/out/2220196/detailRP
  - 핵심: 발의·회부 및 제도 신설 제안
  - 확인: 1차 자료. 회부와 실제 심사·의결을 구분
- 국토부 FSD 민원 답변에 대한 보도
  - Raw: [수집기록](../raw/sources/2026-08-31-molit-fsd-ruling.md)
  - URL: https://v.daum.net/v/9ZP6yT6bUZ
  - 핵심: 국내 기준 충돌·FTA 상호인정·공식 배포 조건에 대한 답변 인용
  - 확인: 2차 보도. 답변 원문 미확보
- 박상혁 의원 질의·국토부 절차 설명 보도
  - Raw: [수집기록](../raw/sources/2025-molit-15mo-procedure.md)
  - URL: https://v.daum.net/v/UaHa6f71e4
  - 핵심: 반영 절차의 예상 기간 및 도입 전망
  - 확인: 2차 보도. 질의·보도 월일 및 실제 절차 착수일 미확인
- FSD 무단 활성화 85건 보도
  - Raw: [수집기록](../raw/sources/2026-05-04-fsd-85-cases.md)
  - URL: https://www.yna.co.kr/view/AKR20260501058600003
  - 핵심: 의원실 자료에 따른 85건과 당시 합법 FSD 제공 범위
  - 확인: 2차 보도. 제출자료 원문 미확보
- 국내 Tesla FSD 제공 범위 통계 보도
  - Raw: [수집기록](../raw/sources/2026-09-15-tesla-fsd-korea-stats.md)
  - URL: https://www.hankyung.com/article/202609142445g
  - 핵심: 2026년 8월 기준 차량 통계
  - 확인: 2차 보도. 원데이터·차량 분류 정의 미확보
- 국토부·TS 일반 업무
  - Raw: [수집기록](../raw/sources/2026-10-04-molit-ts-roles.md)
  - URL: https://kicas.katri.or.kr/info/life/citationSystem
  - 핵심: 기관의 일반 업무 범위
  - 확인: 국토부 부서 업무는 검색 색인, TS는 직접 확인한 기존 기록. L2 DCAS 실무 담당 확정 근거로 사용하지 않음
- MLIT 후속 회의 목록
  - Raw: [기존 조사 메모](../raw/sources/2026-10-04-mlit-sessions-lead.md)
  - URL: https://www.mlit.go.jp/jidosha/jidosha_tk7_000005.html
  - 핵심: 회의자료 탐색에 사용한 목록
  - 확인: 외부 사실은 개최 목록에 한정. 파일의 가능성·다음 수집 문장은 근거로 사용하지 않음

## Korea vs Japan

### Korea

- 국토부가 제시한 것으로 보도된 반영 절차는 최소 약 15–16개월이다. 실제 소요 시간을 측정한 값은 아니다. [절차 보도](../raw/sources/2025-molit-15mo-procedure.md)
- 국내 검토의 정확한 착수일과 최종 반영일은 Unknown이다. 순차 처리만 했다고 단정할 근거는 부족하다. [절차 보도](../raw/sources/2025-molit-15mo-procedure.md), [공개 진행정보](../raw/sources/2026-10-04-dcas-bill-status.md)

### Japan

- 원래 R171은 2024년 3월 국제 합의와 9월 국내 개정·공포가 확인된다. 월 단위 약 6개월의 간격이며, 검토 착수부터의 실제 행정 소요 시간은 아니다. [MLIT 기록](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
- 2024년 자료의 임의적용은 후속 국제 개정의 국내 반영 전까지 기존 DCAS 기준을 임의적용한다는 방침이다. 추가 hands-off 기능 자체를 먼저 허용했다는 뜻으로 사용하지 않는다. [MLIT 원문](../raw/sources/2026-10-04-mlit-dcas-review-records.md)
- 01 series의 국내 개정·차종별 적용 계획은 확보했다. 실행일은 Unknown이다. WP.29 논의 단계부터 국내 검토를 병렬로 했다는 주장도 추가 근거가 필요하다. [MLIT 계획](../raw/sources/2026-10-04-mlit-dcas-review-records.md)

### 비교의 한계

- 한국의 01 series 예상 절차와 일본의 원래 버전 합의→개정 간격은 버전·시작점·종료점이 다르다. 직접적인 지연 차이·절감 일수 계산은 보류한다. [한국 절차](../raw/sources/2025-molit-15mo-procedure.md), [일본 기록](../raw/sources/2026-10-04-mlit-dcas-review-records.md)

## Questions

- 2025년 11월·2026년 7월 검증·시험차량 제공 제안은 어떤 경로로 전달됐으며 정식 공문·임시운행허가 신청이 접수됐는가?
- 제안에 대한 접수번호·검토·회신·시험계획 기록이 있는가? 수용·거절·미처리 여부와 담당 기관·부서는 무엇인가?
- 기관의 FSD 시험 실적 없음 답변은 어느 날짜·기능·생산지·하드웨어를 대상으로 하며 현재도 같은가?
- 중국산 허용 관련 협의 범위와 향후 시험 가능 조건은 무엇인가? 일반 FSD 출시 사전 협의와 어떻게 구분되는가?
- 국토부의 DCAS 검토 착수일과 단계별 착수·종료일은 언제인가?
- 국내 법률·안전기준·안전관리 절차의 최신 반영 상태와 적용 범위는 무엇인가?
- 별표6의2 제10호 원문과 국민신문고 답변 원문을 확보할 수 있는가?
- DCAS L2 조향 안전기준의 실무 담당 부서와 책임자는 누구인가?
- 일본 01 series의 실제 공포·시행일과 임의적용·의무적용의 법적 관계는 무엇인가?
- 제작사의 공식 FSD 배포 대상·하드웨어·기능은 무엇이며 차량별 미제공 원인은 무엇인가?
- 5월과 9월 통계에서 합법·사용 가능의 분류 기준과 제공 차종 범위는 어떻게 달라졌는가?

## Actions

- [x] raw·wiki 역할 정정 및 사건별 근거 연결 (2026-10-04)
- [x] 일본 2024년 개정 기록과 01 series 계획을 MLIT 원문으로 보완 (2026-10-04)
- [ ] 테슬라 검증 제안·기관 답변·접수 및 처리 기록의 원문 확보
  - 담당: OpenDrive. 테슬라·국토부·공단에 확인할 질의 초안을 작성하고 2025년 11월·2026년 7월 제안의 경로·접수번호·회신 및 임시운행허가 신청 여부를 구분
  - Evidence: [보도와 정식 접수 확인의 한계](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)
- [ ] FSD 공공 시험 실적·담당·계획과 중국산 허용 협의의 최신 상태 확인
  - 담당: OpenDrive. 시험 대상·하드웨어·기능·답변 기준일과 검사기술 연구를 구분하고, 회신은 새 raw로 보존
  - Evidence: [기관 답변 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md), [검증·협의 보도](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)
- [ ] 국토부 질의 초안 작성: DCAS 검토 착수일, 단계별 일정, 현 담당 부서, 적용 대상
  - 담당: OpenDrive. 원문 답변을 받으면 새 raw로 보존
- [ ] 국내 최신 법령·별표6의2 제10호 및 의안 심사 자료 확보
  - 담당: OpenDrive. 회부 이후 실제 심사·의결 기록을 구분
- [ ] 일본 01 series 공포·시행 문서와 임의적용 근거 확보
  - 담당: OpenDrive. MLIT 계획과 실행일을 대조
- [ ] UNECE 원문 판본·회의보고서·발효 통고 확보
  - 담당: OpenDrive. 00·01·02 series와 supplement를 구분
- [ ] Tesla 공식 배포 공지 및 카이즈유 통계 분류 기준 확보
  - 담당: OpenDrive. 일부 미국산 제공과 중국산 대상의 차이를 확인
- [ ] 같은 규정 버전·시작·종료 기준으로 한국·일본 소요 시간 비교
  - 담당: OpenDrive. 선행 자료 확보 후 단축할 구간과 병렬 검토·우선 적용 가설을 검증

## Investigation

진행 중: DCAS 국제기준의 한국 반영과 차량별 FSD 공식 제공 조건을 조사한다. 확인된 규정상 쟁점, 법안 기록, 제작사 배포 조건을 함께 추적한다. [민원 답변 보도](../raw/sources/2026-08-31-molit-fsd-ruling.md), [의안 기록](../raw/sources/2026-10-04-dcas-bill-status.md)

후속 조사 후보: 중국 제조사의 도심 NOA 기능과 한국 판매 차량의 제공 범위. 제조사·차종별 공식 근거를 먼저 수집한다. 현재 이 위키의 근거만으로 상용화·국내 미제공 원인을 확정하지 않는다. 상태: Unknown.

## Evidence notes

- 기존 raw는 불변 수집 이력으로 보존한다. 위키가 근거로 사용하는 범위는 외부 자료에 대응하는 사실이다. [raw 운영 규칙](../raw/sources/README.md)
- 기존 [발효 기록](../raw/sources/2025-09-26-r171-01-in-force.md)의 측정 기준일 문장은 OpenDrive의 선택이므로 Measurement에서 관리한다. CN.351 교차검증 주장은 [통고 원문](../raw/sources/2026-10-04-un-r171-cn351.md)에 따라 제외한다. 발효일은 [공식 수록본](../raw/sources/2026-10-04-un-r171-01-official-text.md)으로 뒷받침한다.
- 기존 [01 series 채택 기록](../raw/sources/2025-03-r171-01-adopted.md)의 CN.351과 R171e.pdf 판본 설명을 01 series의 확정 근거로 사용하지 않는다. 채택 월은 [MLIT 공식 자료](../raw/sources/2026-10-04-mlit-dcas-review-records.md)로 확인하며 기술 항목은 UN 진본 대조 전까지 보류한다.
- 기존 [일본 예정 기록](../raw/sources/2024-09-mlit-dcas-revision.md)은 실행 확인이 없는 자료였다. 개정·공포 월은 [후속 MLIT 자료](../raw/sources/2026-10-04-mlit-dcas-review-records.md)로 보완했다. 추가 hands-off 개정 대기분 자체를 우선 허용했다는 해석은 철회한다.
- [MLIT 조사 메모](../raw/sources/2026-10-04-mlit-sessions-lead.md)의 가능성·다음 행동은 외부 사실이 아니다. 미해결 과제는 Questions·Actions에서 관리한다.
- [5월 자료](../raw/sources/2026-05-04-fsd-85-cases.md)는 등록 180,684대 중 합법 FSD 2.4%, [9월 자료](../raw/sources/2026-09-15-tesla-fsd-korea-stats.md)는 운행 229,311대 중 사용 불가 79.3%를 보도한다. 시점·대상 차종·분류가 다르므로 같은 추세나 변화폭으로 묶지 않는다. 통계 원데이터와 제공 범위 변화는 추가 확인한다.
- 과거 로그의 single source of truth·일본 검증 완료 표현은 당시의 판단 이력이다. 현재 원칙과 판단은 이 문서 및 로그의 새 정정 항목을 따른다.
- 새 [제안 보도](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)의 2025년 11월·2026년 7월은 회사가 설명한 제안 시점이다. 10월 1일·4일 사건은 시험 부재를 보도한 날짜이며 기관 답변일이나 거절일로 사용하지 않는다. 일반 출시 사전 협의와 중국산 허용 별도 협의의 범위를 구분하고, 공식 거절·정식 접수·후속 처리 미확인을 유지한다.
- [연합뉴스TV](../raw/sources/2026-10-05-fsd-public-testing-yonhapnewstv.md)의 정책적 모순 표현은 보도의 서술로 인용한다. 기사 속 관계자 발언이나 국제기준 부재 설명을 위키의 독립적인 확정 판단으로 채택하지 않는다. [전남일보](../raw/sources/2026-10-05-tesla-fsd-review-offers-jnilbo.md)의 주행 자료는 국내·해외 포함 범위가 다르므로 방송의 약 9,200만㎞와 같은 국내 누적값으로 합치거나 안전성 입증으로 해석하지 않는다.
