# raw/sources

불변 inbox. 사람이 관리하고, LLM은 읽기만 한다. 수정 금지.

## Rules

- 새 자료는 `YYYY-MM-DD-slug.md` 파일 하나로 추가한다. 예: `2026-10-04-molit-r171.md`
- 일을 모르면 `YYYY-MM-slug.md`, 연도만 알면 `YYYY-slug.md`로 쓰고 파일 안에 `(일/월 미확인)`을 명시한다.
- 파일 내용은 사실 + 출처 URL만. 해석·요약·재분류는 `wiki/`에서 한다.
- 한번 들어간 파일은 고치지 않는다. 정정은 새 파일을 추가한다.
- 날짜·수치가 없으면 비워둔다 (`Unknown`, `Pending`). 추측 금지.
- 우선순위: 법령 > 정부 문서 > 국회 자료 > UNECE/WP.29 문서 > 언론.
- URL에 트래커(`utm_source` 등)를 붙이지 않는다.

## Flow

```text
raw/sources/  (이곳, 사람이 추가)
    ↓ ingest (에이전트)
wiki/         (LLM 소유, 정리·연결)
    ↓ render
landing page  (같은 근거의 다른 View)
```

Ingestしたら `wiki/log.md`에 기록한다.
