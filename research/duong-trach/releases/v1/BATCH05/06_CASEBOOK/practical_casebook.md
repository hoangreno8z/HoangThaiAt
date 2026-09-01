# CASEBOOK BATCH 05 — 12 CASE THỰC CHIẾN

## CASE05-001 — Lô trước hẹp sau rộng
**Input:** `{"front_width_m": 5.0, "rear_width_m": 7.0, "depth_m": 20.0, "measurement_uncertainty_m": 0.03}`  
**Geometry:** `FRONT_NARROWER_THAN_REAR`  
**Cổ pháp match:** `MOTIF-014`  
**Hard Gate:** `PASS_ASSUMED_FOR_DEMO_ONLY`  
**Kết luận biên tập:** Truyền bản coi dạng này thuận. Không được viết 'sẽ giàu'. Kiến trúc có thể dùng phần sau rộng cho không gian sinh hoạt/sân; cần kiểm thông gió, thoát nước và pháp lý riêng.

---

## CASE05-002 — Lô trước rộng sau hẹp
**Input:** `{"front_width_m": 7.0, "rear_width_m": 5.0, "depth_m": 20.0, "measurement_uncertainty_m": 0.03}`  
**Geometry:** `FRONT_WIDER_THAN_REAR`  
**Cổ pháp match:** `MOTIF-015`  
**Hard Gate:** `PASS_ASSUMED_FOR_DEMO_ONLY`  
**Kết luận biên tập:** Truyền bản có phán bất lợi, nhưng không phải lý do kỹ thuật tự động loại đất. Có thể thiết kế footprint tương đối quy chỉnh; giữ conflict text chưa giải ở nguồn hình.

---

## CASE05-003 — Bồn trũng giữa khu đất
**Input:** `{"perimeter_elevation_m": 3.0, "center_elevation_m": 2.2, "drainage": "poor"}`  
**Geometry:** `CENTER_SINK`  
**Cổ pháp match:** `MOTIF-013`  
**Hard Gate:** `ESCALATE_DRAINAGE_FLOOD`  
**Kết luận biên tập:** Đây là nơi cổ pháp và kỹ thuật có thể cùng cảnh báo nhưng vì lý do khác nhau. Kỹ thuật kiểm thoát nước/ngập có quyền phủ quyết.

---

## CASE05-004 — Trước thấp sau cao nhẹ
**Input:** `{"front_elevation_m": 10.0, "rear_elevation_m": 11.2, "depth_m": 30.0}`  
**Geometry:** `FRONT_LOWER_REAR_HIGHER`  
**Cổ pháp match:** `MOTIF-011`  
**Hard Gate:** `REQUIRES_SLOPE_DRAINAGE_CHECK`  
**Kết luận biên tập:** Truyền bản phán tốt; thực tế phải kiểm nước chảy về đâu, độ dốc, nền móng, tiếp cận và cao độ đường.

---

## CASE05-005 — Trước cao sau thấp
**Input:** `{"front_elevation_m": 12.0, "rear_elevation_m": 10.5, "depth_m": 25.0}`  
**Geometry:** `FRONT_HIGHER_REAR_LOWER`  
**Cổ pháp match:** `MOTIF-012`  
**Hard Gate:** `CHECK_REAR_DRAINAGE`  
**Kết luận biên tập:** Cổ pháp phán bất lợi. Hiện đại kiểm nguy cơ nước dồn phía sau; không dùng phán cổ để chẩn đoán 'hôn mê' hay bệnh.

---

## CASE05-006 — Đường giao xung nhiều phía
**Input:** `{"road_approach_axes": 4, "traffic_volume": "unknown"}`  
**Geometry:** `MULTI_APPROACH_NETWORK`  
**Cổ pháp match:** `MOTIF-010, MOTIF-023`  
**Hard Gate:** `CHECK_TRAFFIC_NOISE_SAFETY`  
**Kết luận biên tập:** Không đồng nhất 'bốn mặt có đường' với '四面交衝'. Cần xem trục tiếp cận thực sự, giao lộ, tốc độ và khoảng lùi.

---

## CASE05-007 — Dòng suối chảy trực diện vào ranh đất
**Input:** `{"channel_axis_intersects_site": true, "official_flash_flood_hazard": "HIGH"}`  
**Geometry:** `DIRECT_FLOW_IMPACT`  
**Cổ pháp match:** `MOTIF-007`  
**Hard Gate:** `FAIL_OR_ENGINEERING_ESCALATION`  
**Kết luận biên tập:** Hard Gate thủy văn đứng trước mọi phán phong thủy. Nếu nguy cơ lũ quét/xói lở không chấp nhận được thì loại hoặc yêu cầu chuyên gia.

---

## CASE05-008 — Nước uốn ôm nhưng vùng ngập cao
**Input:** `{"water_curvature": "EMBRACING", "official_flood_hazard": "HIGH"}`  
**Geometry:** `EMBRACING_WATER`  
**Cổ pháp match:** `MOTIF-003`  
**Hard Gate:** `FAIL_OR_ENGINEERING_ESCALATION`  
**Kết luận biên tập:** Ví dụ điển hình: cổ hình thế có thể đánh giá thuận nhưng an toàn hiện đại phủ quyết.

---

## CASE05-009 — Đường cong bị nghi là '返跳'
**Input:** `{"road_curvature": "CONVEX_RELATIVE_TO_SITE"}`  
**Geometry:** `CURVE_OBSERVED`  
**Cổ pháp match:** `MOTIF-004`  
**Hard Gate:** `PASS_ASSUMED_FOR_DEMO_ONLY`  
**Kết luận biên tập:** Không kết luận. `返跳` chưa được chứng minh đồng nghĩa 'phản cung'. Output bắt buộc UNKNOWN.

---

## CASE05-010 — Mương trước nhà tách hai nhánh hình chữ V
**Input:** `{"channel_split": "V_SHAPE_FRONT"}`  
**Geometry:** `CHANNEL_SPLIT`  
**Cổ pháp match:** `MOTIF-020`  
**Hard Gate:** `CHECK_DRAINAGE_EASEMENT`  
**Kết luận biên tập:** Ghi nhận motif chữ Bát theo nguồn. Hiện đại kiểm quyền thoát nước, xói lở, mùi, vệ sinh và ngập.

---

## CASE05-011 — Có đồi phía sau nhưng nguy cơ sạt lở cao
**Input:** `{"rear_landform": "HILL", "official_landslide_hazard": "HIGH"}`  
**Geometry:** `REAR_MASS_PRESENT`  
**Cổ pháp match:** `MOTIF-022`  
**Hard Gate:** `FAIL_OR_ENGINEERING_ESCALATION`  
**Kết luận biên tập:** Không được dùng khái niệm 'Huyền Vũ có tựa' để bỏ qua nguy cơ sạt lở.

---

## CASE05-012 — Lô bị đo gần như bằng trước/sau
**Input:** `{"front_width_m": 6.0, "rear_width_m": 6.02, "measurement_uncertainty_m": 0.03}`  
**Geometry:** `INDETERMINATE_WITHIN_MEASUREMENT_UNCERTAINTY`  
**Cổ pháp match:** `NONE`  
**Hard Gate:** `PASS_ASSUMED_FOR_DEMO_ONLY`  
**Kết luận biên tập:** Không ép hệ thống gắn 'nở hậu' chỉ vì chênh 2 cm nằm trong sai số đo.

---
