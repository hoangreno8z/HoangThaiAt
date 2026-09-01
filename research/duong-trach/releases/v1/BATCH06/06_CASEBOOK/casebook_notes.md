# CASEBOOK BATCH 06 — NHÀ MÉO & TÂM

## CASE06-001 — Chữ L
- `area centroid` và `polylabel` có thể khác đáng kể.
- Không được mặc định bounding-box center là trung cung.
- Trước khi nói "khuyết phương", phải chọn reference envelope + center + sector system.

## CASE06-002 — Chữ U
- Độ lõm lớn.
- Một center có thể nằm gần khoảng khuyết.
- Cần tách external concavity khỏi courtyard thực sự.

## CASE06-003 — Tam giác
- Không có "góc khuyết" theo nghĩa rectangle trừ khi cố ép reference rectangle.
- Không retrofit một nguyên tắc "khuyết góc" nếu cổ nguồn chỉ nói 不足.

## CASE06-004 — Notch lớn
- Có thể đo missing area liên tục.
- Chưa được gắn cát/hung bằng ngưỡng tự đặt.

## CASE06-005 — Hình thang
- Front/rear width là biến tự nhiên hơn "missing corner".
- Liên kết Batch 05.

## CASE06-006 — Notch rất nhỏ
- Đây là test chống false-positive.
- 20 cm notch không được tự biến thành "khuyết cung đại hung".

## CASE06-007 — Nhà có sân trong
- Hole nội bộ ≠ thiếu sector ngoại vi.
- Geometry phải hỗ trợ polygon holes.
