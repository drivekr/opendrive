# OpenDrive Agents

- OpenDrive tracks bottlenecks between autonomous-driving technology / international standards and safe deployment in Korea.
- Follow an LLM Wiki model: `raw/ → wiki/ → landing page`. `raw/` is the source of evidence, human-owned and immutable. `wiki/` is an LLM-maintained, revisable interpretation of that evidence, never an independent source of truth. The rules live in this file.
- Put newly found public evidence in `raw/sources/` as `YYYY-MM-DD-slug.md` (facts + source URL, append-only, never edit). Ingest into `wiki/`, then append to `wiki/log.md`.
- Use the collection date for new evidence filenames; record publication/event dates separately with their actual precision. Preserve legacy filenames and existing evidence files. Correct errors with new evidence records and explain the correction in the wiki. Directory README files are editable documentation, not evidence records.
- Keep hypotheses, comparisons, measurement choices, research leads, and next actions in `wiki/`. Do not put them in new raw evidence records. Treat legacy research notes in raw as notes, not independently verified facts.
- Link each factual wiki claim and timeline event to the relevant raw record. Retain attribution and verification limits: a news report of a government answer is not a directly inspected government document, and a scheduled change is not a completed change.
- OpenDrive extends the pattern: `Raw → Knowledge → Bottleneck → Action`. From the same evidence, derive bottlenecks and concrete actions — that is the product.
- Prefer primary sources: laws, government documents, National Assembly material, UNECE/WP.29 documents, then news.
- Never invent missing dates or facts; mark them `Unknown` or `Pending`.
- Preserve conflicting evidence and let the wiki explain the disagreement.
- The landing page must always start with **Mission**, followed immediately by a clear **interactive timeline**.
- The timeline should let ordinary visitors quickly see what happened, where the delay is, who is involved, and the supporting sources.
- From the same evidence, keep bottlenecks, related people/organizations, comparisons, and concrete actions up to date.
- Render investigation facts, statistics, bottlenecks, comparisons, and measurement settings on the landing page from the wiki. Do not maintain a second copy in HTML or JavaScript. Visitors must be able to follow an event to its raw evidence and original source.
- Keep the product simple: humans collect evidence, AI organizes it, OpenDrive turns it into action.
