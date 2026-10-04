# Wiki

근거의 원천은 `../raw/`에 보존한 자료와 출처다.
위키는 LLM이 그 근거를 읽고 정리·연결·해석하는 수정 가능한 지식이다.
새 근거나 정정이 나오면 위키의 판단을 바꾼다. 위키 자체를 독립적인 증거로 인용하지 않는다.

## Files

- `dcas.md` — DCAS / Tesla FSD의 근거에 따른 현재 정리, 병목, 비교, 미확인 사항, 행동.
- `log.md` — 수집기록 반영·수정·판단 변경의 append-only 이력. 과거의 잘못된 판단도 이력으로 남기고 새 항목으로 정정한다.

## Flow

1. 외부 자료의 사실과 URL을 `../raw/sources/`에 새 파일로 보존한다.
2. raw를 읽고 위키의 관련 항목을 바로 갱신한다. 원문을 위키에 쌓는 inbox는 두지 않는다.
3. 사실에는 raw 링크, 인용 주체, 확인 수준을 붙인다. 해석·가설·측정 규칙은 위키에서 명시한다.
4. 반영한 자료와 판단 변경을 `log.md`에 추가한다.
5. 랜딩 페이지는 이 정리를 표시한다. 조사 내용과 수치를 웹 코드에 따로 복사하지 않는다.

## Timeline

```md
- [x] YYYY-MM-DD — 짧은 사건명 — 출처가 확인하는 내용
  - Evidence: [수집기록](../raw/sources/YYYY-MM-DD-slug.md)
  - Actors: 관련 기관·사람
  - Verification: 1차 자료 직접 확인 / 2차 보도 / 계획 공개 / Unknown
- [ ] Pending — 확인할 결과 — 완료 여부 또는 시점 미확인
  - Evidence: [관련 수집기록](../raw/sources/YYYY-MM-DD-slug.md)
  - Actors: 관련 기관·사람
  - Verification: Unknown
```

- `[x]`는 그 줄의 사건이 확인됐다는 뜻이다. 계획을 공개한 사건과 계획의 실행을 구분한다.
- `[>]`는 출처에서 진행 상태를 확인했을 때만 사용한다. 회부 사실만으로 실질 심사가 진행 중이라고 단정하지 않는다.
- `[ ]`는 예정 또는 결과 미확인이다. 정확한 일이 없으면 `YYYY-MM`, 연도만 알면 `YYYY`, 날짜가 없으면 `Pending`으로 쓴다.
- 월·연 단위 날짜의 그래프 위치는 시각적 배치다. 그 위치에서 소요 일수를 계산하지 않는다.
- 사건마다 Evidence·Actors·Verification을 붙인다. 원문 URL은 Documents의 같은 raw 항목에서 연결한다.

## Documents

```md
- 자료 제목
  - Raw: [수집기록](../raw/sources/YYYY-MM-DD-slug.md)
  - URL: https://원문주소
  - 핵심: 출처에서 확인한 내용의 정리
  - 확인: 직접 확인 여부·제한
```

## Interpretation

- 위키의 Summary·Statistics·Bottleneck·비교에는 주장에 대응하는 raw 링크를 붙인다.
- Measurement는 OpenDrive의 측정 선택이다. 발효 후 경과일을 행정기관의 지연 기간이나 실제 출시 소요 시간으로 단정하지 않는다. 시작·종료의 근거와 미확인 상태를 명시한다.
- 상충하는 근거를 모두 보존하고 시점·대상·정의의 차이와 미해결 관계를 설명한다.
- raw의 과거 조사 메모·가설은 외부 근거로 쓰지 않는다. Evidence notes에 사용할 사실과 제외할 해석을 설명한다.
- 부서의 일반 업무만으로 특정 DCAS 규정의 실무 담당을 확정하지 않는다. 인명·규정 series·발효와 적용·제안과 완료를 구분한다.
- 비교는 동일한 기준의 시작·종료·규정 버전이 확인된 뒤 계산한다. 미확인 사항은 Questions, 다음 작업은 Actions에 둔다.

## Web view checks

- `assets/wiki-view.js`가 이 문서를 읽고 조사 화면을 만든다. raw 링크는 `source.html`에서 해당 파일의 내용 그대로 표시하고 원문 URL을 연결한다.
- `node --test tests/wiki-view.test.cjs`로 사건별 근거·원문 연결, 수집기록 목록, 날짜 정밀도와 한국 날짜, 링크 경로를 확인한다.
