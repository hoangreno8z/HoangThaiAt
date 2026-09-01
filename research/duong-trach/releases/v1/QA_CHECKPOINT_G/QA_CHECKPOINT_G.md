# QA CHECKPOINT G — BATCH 01→19

## Trọng tâm
Lần đầu kiểm tự động việc **phân loại sự kiện trước khi chọn ngày**.

## Metrics
- JSON documents: **193**
- Parse errors: **0**
- Unique Source IDs: **112**
- Claims/Motifs/Evidence: **195**
- Rules: **207**
- Missing Claim→Source: **0**
- Missing Rule→Source: **0**
- Duplicate Claim IDs: **0**
- Duplicate Rule IDs: **0**
- Numeric threshold review: **0**
- Authority violations: **0**
- Unvalidated date outputs: **0**

## Hard Results
- JSON_PARSE: `PASS`
- CLAIM_SOURCE_INTEGRITY: `PASS`
- RULE_SOURCE_INTEGRITY: `PASS`
- CLAIM_ID_UNIQUENESS: `PASS`
- RULE_ID_UNIQUENESS: `PASS`
- NO_NUMERIC_THRESHOLD_HALLUCINATION: `PASS`
- SCHOOL_ISOLATION: `PASS`
- DISPUTED_SOURCE_NOT_HIGH_AUTHORITY: `PASS`
- EVENT_ONTOLOGY_SEPARATION: `PASS`
- DOMAIN_SEPARATION_TECHNICAL_VS_RITUAL: `PASS`
- MODERN_CONSTRUCTION_SAFETY_OVERRIDE: `PASS`
- NO_UNVALIDATED_LUCKY_DATE_OUTPUT: `PASS`

## New invariant
```text
WHAT ARE YOU ACTUALLY DOING?
        ↓
EVENT CLASS
        ↓
SOURCE-SPECIFIC TRADITION
        ↓
TECHNICAL / LEGAL / SAFETY READY?
        ↓
OPTIONAL DATE PREFERENCE
```

Không còn:
`nhà -> một ngày đại cát -> áp cho mọi việc`.
