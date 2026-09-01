# QA CHECKPOINT F — BATCH 01→18

## Mục tiêu mới
Không chỉ kiểm "có source hay không", mà kiểm:
**source đó có đủ uy tín để được gọi là danh sư/chân truyền hay không**.

## Metrics
- JSON documents: **177**
- Parse errors: **0**
- Unique Source IDs: **105**
- Claims/Motifs/Evidence: **182**
- Rules: **191**
- Missing Claim→Source: **0**
- Missing Rule→Source: **0**
- Duplicate Claim IDs: **0**
- Duplicate Rule IDs: **0**
- Numeric threshold review: **0**
- Authority violations: **0**
- Technical→Feng Shui leaps: **0**

## Hard results
- JSON_PARSE: `PASS`
- CLAIM_SOURCE_INTEGRITY: `PASS`
- RULE_SOURCE_INTEGRITY: `PASS`
- CLAIM_ID_UNIQUENESS: `PASS`
- RULE_ID_UNIQUENESS: `PASS`
- NO_NUMERIC_THRESHOLD_HALLUCINATION: `PASS`
- SCHOOL_ISOLATION: `PASS`
- DISPUTED_SOURCE_NOT_MASTER_AUTHORITY: `PASS`
- AUTHENTIC_TECHNICAL_SOURCE_NOT_FENGSHUI_LEAP: `PASS`
- BATCH18_NO_UNJUSTIFIED_MASTER_DOCTRINE: `PASS`
- STRUCTURE_SEMANTIC_GUARDS: `PASS`
- MODERN_STANDARD_VERSION_LOCKS: `PASS`

## New invariant
```text
SOURCE PRESTIGE
    does not override
DOMAIN
    does not override
SEMANTIC MATCH
    does not override
MODERN SAFETY
```

Ví dụ:
- 李誡《營造法式》: uy tín rất cao → kỹ thuật kiến trúc.
- Nhưng không vì uy tín cao mà một tỷ lệ dầm trong sách trở thành Feng Shui.
- 《多能鄙事》: có giá trị đối chứng nhưng attribution bị nghi ngờ → không gọi là 'Lưu Cơ chân truyền'.
