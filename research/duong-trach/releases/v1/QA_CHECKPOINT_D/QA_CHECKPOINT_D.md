# QA CHECKPOINT D — BATCH 01→16

## Metrics
- JSON documents: **149**
- Parse errors: **0**
- Unique source IDs: **81**
- Claims/Motifs/Evidence: **160**
- Rules: **163**
- Missing Claim→Source: **0**
- Missing Rule→Source: **0**
- Duplicate Claim IDs: **0**
- Duplicate Rule IDs: **0**
- Numeric thresholds needing review: **0**
- School leakage: **0**
- Water object-type guard failures: **0**
- Dangerous historical-practice leaks: **0**

## Hard Results
- JSON_PARSE: `PASS`
- CLAIM_SOURCE_INTEGRITY: `PASS`
- RULE_SOURCE_INTEGRITY: `PASS`
- CLAIM_ID_UNIQUENESS: `PASS`
- RULE_ID_UNIQUENESS: `PASS`
- NO_NUMERIC_THRESHOLD_HALLUCINATION: `PASS`
- SCHOOL_ISOLATION: `PASS`
- WATER_OBJECT_TYPE_GUARDS: `PASS`
- HISTORICAL_DANGER_CONTAINMENT: `PASS`
- LEGAL_VERSION_LOCKS: `PASS`

## New invariant
Before a rule executes:
`SOURCE OBJECT TYPE -> ENGINE OBJECT TYPE`
must be compatible.

Examples:
- ancient `井` -> modern `WELL`: possible after context checks.
- ancient `井` -> `ROOF_TANK`: forbidden.
- ancient `井` -> `UNDERGROUND_WATER_TANK`: forbidden.
- ancient `糞屋` -> `SEPTIC_TANK`: forbidden without textual bridge.

This prevents semantic hallucination even when a sentence itself is quoted correctly.
