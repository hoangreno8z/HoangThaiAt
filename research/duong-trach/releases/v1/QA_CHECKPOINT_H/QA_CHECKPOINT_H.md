# QA CHECKPOINT H — BATCH 01→20

## Hard Results
- JSON_PARSE: `PASS`
- CLAIM_SOURCE_INTEGRITY: `PASS`
- RULE_SOURCE_INTEGRITY: `PASS`
- CLAIM_ID_UNIQUENESS: `PASS`
- RULE_ID_UNIQUENESS: `PASS`
- NO_NUMERIC_THRESHOLD_HALLUCINATION: `PASS`
- SCHOOL_ISOLATION: `PASS`
- OCCUPANCY_SEMANTIC_LAYERING: `PASS`
- CURRENT_OCCUPANCY_LEGAL_GATES: `PASS`
- NO_UNVALIDATED_DATE_OUTPUT: `PASS`

## Metrics
- JSON: 207
- unique source IDs: 119
- claims/motifs/evidence: 203
- rules: 218
- missing Claim→Source: 0
- missing Rule→Source: 0
- duplicate claim IDs: 0
- duplicate rule IDs: 0
- numeric threshold review: 0

## New invariant
Historical word `入宅` is now confirmed in the corpus,
but that does not rewrite `移徙` into the same textual event.

Evidence layers remain explicit.
