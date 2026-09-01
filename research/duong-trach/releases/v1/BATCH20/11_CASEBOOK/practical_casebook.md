# CASEBOOK BATCH 20 — HOÀN THÀNH / NHẬP TRẠCH

## CASE20-001 — Nhà mới chưa nghiệm thu nhưng đã chọn được ngày nhập trạch
**Input:** `{"acceptance": "NOT_READY", "traditional_date": "favorable"}`  
**Historical matches:** `OCC-004/OCC-005 context`  
**Decision:** DO NOT OCCUPY if legally/technically not ready.

---

## CASE20-002 — Nhà hoàn thành kỹ thuật, người dùng muốn chọn ngày chuyển đồ
**Input:** `{"occupancy_ready": true, "event": "MOVE_RESIDENCE"}`  
**Historical matches:** `OCC-001`  
**Decision:** Event classified as 移徙; date engine still disabled pending validation.

---

## CASE20-003 — Người dùng chọn nút Nhập trạch
**Input:** `{"ui_event": "入宅", "occupancy_ready": true}`  
**Historical matches:** `OCC-004, OCC-005, OCC-006`  
**Decision:** Historical term attested in embedded source; do not pretend it is v11's event label.

---

## CASE20-004 — Dọn vệ sinh nhà trước khi chuyển vào
**Input:** `{"event": "CLEAN_HOUSE"}`  
**Historical matches:** `OCC-002`  
**Decision:** Can map to 掃舍宇; do not invent salt/fire/incense ritual.

---

## CASE20-005 — Lắp giường sau khi chuyển nhà
**Input:** `{"events": ["MOVE_RESIDENCE", "INSTALL_BED"]}`  
**Historical matches:** `OCC-001, OCC-003`  
**Decision:** Two historical event classes.

---

## CASE20-006 — Lắp cửa chính yêu cầu ngày An Môn Hiệp Kỷ
**Input:** `{"event": "INSTALL_DOOR", "requested_source": "XJBF v11"}`  
**Historical matches:** `NONE`  
**Decision:** BLOCK. No independent v11 An-Men event locked.

---

## CASE20-007 — Dẫn Trạch Kinh cho vị trí An Môn
**Input:** `{"source": "宅經", "purpose": "SPATIAL_DOOR_PLACEMENT"}`  
**Historical matches:** `OCC-007, OCC-008`  
**Decision:** May display textual rule with attribution warning; not calendar timing.

---

## CASE20-008 — Nhà có nước nhưng chưa kiểm chất lượng nguồn tự khai thác
**Input:** `{"occupancy_ready_other": true, "water_quality": "UNKNOWN"}`  
**Historical matches:** `NONE`  
**Decision:** Water hard gate remains unresolved; ritual date irrelevant.

---

## CASE20-009 — Công trình thuộc diện PCCC nhưng chưa đủ thủ tục/nghiệm thu áp dụng
**Input:** `{"fire_scope": "APPLICABLE", "fire_ready": false}`  
**Historical matches:** `NONE`  
**Decision:** NO OCCUPANCY/OPERATION as applicable under current fire law.

---

## CASE20-010 — Nhà đã nghiệm thu nhưng còn mùi, ẩm và thông gió kém
**Input:** `{"legal_acceptance": "PASS", "habitability": "POOR"}`  
**Historical matches:** `NONE`  
**Decision:** Technical/legal acceptance and practical habitability are separate; fix indoor environment.

---

## CASE20-011 — Chủ nhà muốn 'quy hỏa' bắt buộc
**Input:** `{"ritual": "歸火", "belief": "universal_required"}`  
**Historical matches:** `OCC-004, OCC-006`  
**Decision:** Historical source-specific ritual term; not universal requirement.

---

## CASE20-012 — AI tạo nghi thức mang gạo muối nước rồi nói là Hiệp Kỷ
**Input:** `{"ritual_recipe": "rice_salt_water", "source_claim": "XJBF"}`  
**Historical matches:** `NONE`  
**Decision:** REJECT unsupported source attribution.

---

## CASE20-013 — AI dùng chữ 入宅 trong sách muộn để nói quyển 11 có mục 入宅
**Input:** `{"source_layer_confused": true}`  
**Historical matches:** `OCC-005`  
**Decision:** REJECT. Preserve v11 taxonomy vs v34-35 embedded source layer.

---

## CASE20-014 — Nhà riêng nhỏ không thuộc cùng quy trình nghiệm thu cơ quan như dự án lớn
**Input:** `{"building_scope": "SMALL_PRIVATE_HOUSE", "regulatory_scope": "NEEDS_RESOLUTION"}`  
**Historical matches:** `NONE`  
**Decision:** Do not overapply project-level acceptance workflow; resolve applicable law by project class.

---
