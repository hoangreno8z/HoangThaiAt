# QA CHECKPOINT A — BATCH 01→10

Ngày: 2026-09-01

## Kết quả máy kiểm
- JSON files scanned: **71**
- JSON parse errors: **0**
- Unique Source IDs: **39**
- Source records total: **47**
- Duplicate Source IDs across batches: **7**
- Rules scanned: **99**
- Claims/Motifs scanned: **102**
- Rule → missing Source ID: **0**
- Claim/Motif → missing Source ID: **0**
- Non-null threshold-like fields in rules: **0**

## Hard verdict
- JSON_PARSE: `PASS`
- RULE_SOURCE_REFERENTIAL_INTEGRITY: `PASS`
- CLAIM_SOURCE_REFERENTIAL_INTEGRITY: `PASS`
- NO_UNREVIEWED_ENGINE_THRESHOLDS: `PASS`
- SOURCE_REGISTRY_NORMALIZATION: `REQUIRED`

## Phát hiện thật sự cần sửa
### 1. Source Registry đang bị schema drift
Một số Source ID xuất hiện ở nhiều batch với metadata khác mức chi tiết.
Đây **không phải orphan/error**, nhưng nếu để lâu sẽ gây:
- một nơi ghi `VERIFIED`, nơi khác ghi `DISPUTED`;
- nhầm “text verified” với “author verified”;
- khó audit witness.

**Giải pháp:** từ Batch 11 bắt đầu dùng `CANONICAL_SOURCE_REGISTRY`.
Các batch cũ giữ nguyên làm immutable history.

### 2. Không dùng một trường `status` duy nhất nữa
Phải tách:
- `text_status`
- `attribution_status`
- `semantic_status`
- `rule_state`
- `evidence_class`

Ví dụ:
> 《疑龍經》 có thể `TEXT_VERIFIED_AGAINST_WITNESS`
> nhưng đồng thời `ATTRIBUTION_DISPUTED`.

Hai trạng thái này không mâu thuẫn.

### 3. Ngưỡng số
Nếu report ghi 0 non-null threshold-like fields thì hiện chưa thấy rule nào lén thêm ngưỡng số.
Nếu về sau có ngưỡng:
- cổ văn thật → `ANCIENT_NUMERIC_CLAIM`
- kỹ thuật hiện đại → `MODERN_ENGINE_THRESHOLD`
- không rõ → BLOCK.

### 4. Backward compatibility
Không sửa hàng loạt BATCH01–10 để “đẹp schema”.
Thay vào đó:
`old record -> normalization view -> canonical registry`.
Như vậy luôn truy được lịch sử.
