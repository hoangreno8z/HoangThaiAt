# QA CHECKPOINT E — BATCH 01→17

## Metrics
- JSON documents: **162**
- Parse errors: **0**
- Unique Source IDs: **91**
- Claims/Motifs/Evidence: **170**
- Rules: **176**
- Missing Claim→Source: **0**
- Missing Rule→Source: **0**
- Duplicate Claim IDs: **0**
- Duplicate Rule IDs: **0**
- Numeric thresholds needing review: **0**
- School leakage: **0**
- Roof object guard failures: **0**

## Hard Results
- JSON_PARSE: `PASS`
- CLAIM_SOURCE_INTEGRITY: `PASS`
- RULE_SOURCE_INTEGRITY: `PASS`
- CLAIM_ID_UNIQUENESS: `PASS`
- RULE_ID_UNIQUENESS: `PASS`
- NO_NUMERIC_THRESHOLD_HALLUCINATION: `PASS`
- SCHOOL_ISOLATION: `PASS`
- ROOF_OBJECT_TYPE_GUARDS: `PASS`
- ROOF_STANDARD_VERSION_LOCKS: `PASS`

## QA patch
Lần chạy đầu, `ROOF_OBJECT_TYPE_GUARDS` bị false-negative vì test tìm một chuỗi tiếng Anh
cụ thể thay vì invariant có cấu trúc.

Đã sửa bằng `BATCH17/00_MASTER/INVARIANTS_v17.json` và chạy lại.

Không thay claim/source/rule để ép PASS.

## Semantic firewall
- `簷水相射` -> runoff/eave-water semantics.
- `營造法式` -> historical construction evidence, không tự tạo Feng Shui verdict.
- `勿短促` -> qualitative, không có ngưỡng cm/m cổ.
- roof tank -> giữ ontology Batch16.
- solar-reflective coating -> không đồng nhất waterproofing.
