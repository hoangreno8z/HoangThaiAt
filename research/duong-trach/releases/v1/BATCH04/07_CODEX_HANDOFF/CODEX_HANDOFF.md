# CODEX HANDOFF — LAPQUE DƯƠNG TRẠCH CORPUS

## Vai trò
Codex là **kỹ sư corpus/repo**, KHÔNG phải nguồn thẩm quyền về cổ thư.

ChatGPT research thread là Source Authority.
Dữ liệu trong thư mục BATCHxx là immutable evidence input trừ khi task nói rõ migration.

## Nhiệm vụ đầu tiên trong Codex
1. Đọc toàn bộ `README.md`, `AGENTS.md`, các `source_registry*.json`, `claims*.json`, `rule_candidates*.json`.
2. Không sửa code sản phẩm hiện hữu ở lượt đầu.
3. Tạo nhánh riêng: `research/duong-trach-corpus`.
4. Tạo khu vực:
   `research/duong-trach/`
5. Import corpus theo cấu trúc:
   - `sources/`
   - `claims/`
   - `rules/`
   - `schemas/`
   - `audits/`
   - `translations/`
6. Viết validator deterministic:
   - rule bắt buộc có `source_id`;
   - source_id phải tồn tại;
   - `modern_engine_threshold` không được có nếu rule tự nhận là `ANCIENT_NUMERIC_RULE` mà không có citation chứng minh;
   - source `YINZHAI` không được publish thẳng thành `DIRECT_YANGZHAI`;
   - attribution DISPUTED/PSEUDEPIGRAPHIC phải được giữ;
   - trạng thái UNKNOWN/CONFLICTED không được tự resolve.
7. Viết test cho tất cả validator.
8. Tạo lệnh audit, ưu tiên TypeScript nếu repo hiện dùng TS:
   `npm run corpus:audit`
9. Sinh report máy đọc được:
   `research/duong-trach/audit/latest.json`
10. Chỉ sau khi test xanh mới đề xuất bước tích hợp Rule Engine; KHÔNG tích hợp ngay.

## Không được làm
- Không tự crawl thêm nguồn rồi nhập như VERIFIED.
- Không sửa câu Hán văn cho “đẹp”.
- Không đổi `DISPUTED` thành `VERIFIED`.
- Không trộn Bát Trạch/Tam Hợp/Huyền Không/Hình Thế.
- Không thêm ngưỡng %/mét/độ vào cổ pháp nếu corpus không có.
- Không thay đổi logic an quẻ/Kinh Dịch hoặc geometry hiện hữu ngoài phạm vi task.
- Không xóa file cũ.
- Không đại refactor.
- Không thay dependency nếu chưa cần.

## Tiêu chuẩn hoàn thành Task Codex #1
- Import không mất record.
- Validator chạy deterministic.
- Test pass.
- Audit report liệt kê orphan source/rule, scope violation, attribution loss, invented threshold risk.
- Có diff nhỏ, dễ review.
- Không có thay đổi chức năng production.
