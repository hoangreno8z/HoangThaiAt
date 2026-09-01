# CASEBOOK BATCH 10 — PHÂN KHU PHÒNG

## CASE10-001 — Nhà phố hiện đại: khách–ăn liên thông
**Input:** `{"rooms": ["living", "dining", "kitchen"], "open_plan": true}`  
**Historical mapping:** `NONE_AUTO`  
**Graph:** `entry -> living/dining -> kitchen`  
**Matches:** `NONE`  
**Decision:** Không gắn living room = 堂. Chờ bếp Batch11; chỉ kiểm circulation hiện đại.

---

## CASE10-002 — Nhà ba gian mô phỏng không gian chính + hai cánh
**Input:** `{"primary_space_area": 35, "left_side_area": 18, "right_side_area": 18}`  
**Historical mapping:** `PRIMARY_HALL_CANDIDATE + SIDE_WINGS`  
**Graph:** `side-left <-> primary <-> side-right`  
**Matches:** `ROOM-001, ROOM-002, ROOM-004`  
**Decision:** Có thể so motif hierarchy; không dùng kết quả gia đình cổ như dự báo.

---

## CASE10-003 — Hai cánh lớn hơn không gian chính
**Input:** `{"primary_space_area": 24, "side_halls_area": [40, 38]}`  
**Historical mapping:** `CANDIDATE_ONLY`  
**Graph:** `two side spaces dominate primary`  
**Matches:** `ROOM-003`  
**Decision:** Ghi relative-scale ratio; rule phán bị PARTIAL vì '廳若欺堂' chưa có ngưỡng.

---

## CASE10-004 — Cửa phòng chính đối sân trong hở trời
**Input:** `{"room_door_axis_intersects_tianjing": true}`  
**Historical mapping:** `房門 + TRADITIONAL_TIANJING candidate`  
**Graph:** `room -> door -> tianjing`  
**Matches:** `ROOM-005`  
**Decision:** Candidate classical match. Không bịa độ lệch 5°/10° để hóa giải.

---

## CASE10-005 — Cửa kho đối thẳng cửa phòng
**Input:** `{"service_storage_candidate": true, "door_to_door_axis": true}`  
**Historical mapping:** `窖房 uncertain`  
**Graph:** `storage? <-> corridor <-> room`  
**Matches:** `ROOM-006`  
**Decision:** UNKNOWN vì 窖房 chưa khóa nghĩa. Không tự gọi kho hiện đại là 窖房.

---

## CASE10-006 — Compound ba hộ dùng chung một cổng
**Input:** `{"units": 3, "shared_gate": 1, "shared_path": 1}`  
**Historical mapping:** `compound topology`  
**Graph:** `gate -> shared path -> U1/U2/U3`  
**Matches:** `ROOM-008, ROOM-009`  
**Decision:** Text chỉ hỗ trợ mô hình topology. PCCC/accessibility/ownership circulation đánh giá riêng.

---

## CASE10-007 — Văn phòng có một hành lang cụt dài
**Input:** `{"building_type": "office", "dead_end_corridor": true}`  
**Historical mapping:** `NONE`  
**Graph:** `egress graph contains dead-end`  
**Matches:** `NONE`  
**Decision:** QCVN06/applicable fire design first. Không dùng phong thủy để hợp thức hóa egress yếu.

---

## CASE10-008 — Showroom có tuyến khách dùng bậc duy nhất, không có route tiếp cận
**Input:** `{"building_type": "commercial_service", "accessible_route_broken": true}`  
**Historical mapping:** `NONE`  
**Graph:** `public entry route inaccessible`  
**Matches:** `NONE`  
**Decision:** Nếu thuộc phạm vi QCVN10:2024/BXD -> HARD GATE FAIL/REDESIGN.

---

## CASE10-009 — Nhà riêng có hành lang hẹp nhưng không thuộc QCVN10 bắt buộc theo loại này
**Input:** `{"building_type": "detached_private_house", "narrow_corridor": true}`  
**Historical mapping:** `NONE`  
**Graph:** `functional route constrained`  
**Matches:** `NONE`  
**Decision:** Không giả vờ QCVN10 tự động áp dụng; đánh giá công năng/an toàn theo hồ sơ pháp lý cụ thể.

---

## CASE10-010 — Phòng bị gió lùa từ khe cửa đối diện
**Input:** `{"uncontrolled_draft": true, "mechanical_or_natural_ventilation": "unknown"}`  
**Historical mapping:** `室`  
**Graph:** `draft path observed`  
**Matches:** `ROOM-010`  
**Decision:** Ghi motif tránh gió lùa. Không suy 'bịt kín phòng'; IAQ/ventilation cần thiết kế độc lập.

---

## CASE10-011 — Bếp nằm ngay dưới không gian tiếp khách tầng trên
**Input:** `{"kitchen_below_hall": true}`  
**Historical mapping:** `possible 廳屋 relation`  
**Graph:** `vertical adjacency`  
**Matches:** `ROOM-011`  
**Decision:** DEFER TO BATCH11. Không phán ở Batch10.

---

## CASE10-012 — Agent cố diễn '中堂不可架直屋' thành hành lang xuyên tâm
**Input:** `{"proposed_mapping": "central corridor through house"}`  
**Historical mapping:** `架直屋 unresolved`  
**Graph:** `n/a`  
**Matches:** `ROOM-012`  
**Decision:** REJECT HALLUCINATED MAPPING. State remains SEMANTIC_UNRESOLVED.

---
