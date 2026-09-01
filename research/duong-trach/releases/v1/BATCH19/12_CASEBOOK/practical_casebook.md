# CASEBOOK BATCH 19 — TRÌNH TỰ / TRẠCH NHẬT

## CASE19-001 — Lễ động thổ tượng trưng nhưng chưa đào móng
**Input:** `{"action": "CEREMONIAL_GROUNDBREAKING", "physical_excavation": false}`  
**Historical match:** `BUILD_OR_RENOVATE_GROUNDBREAKING? requires editorial mapping`  
**Safety:** `No physical work can begin until ready`  
**Decision:** Keep ceremony and first physical excavation as separate timestamps/events.

---

## CASE19-002 — Đào móng thật nhưng hồ sơ/an toàn chưa sẵn sàng
**Input:** `{"action": "FIRST_EXCAVATION", "technical_ready": false, "ritual_date": "favorable"}`  
**Historical match:** `possible 修造動土`  
**Safety:** `FAIL`  
**Decision:** NO WORK. Traditional date cannot override readiness.

---

## CASE19-003 — Muốn dùng ngày động thổ cho lễ thượng lương
**Input:** `{"source_event_selected": "修造動土", "actual_event": "豎柱上梁"}`  
**Historical match:** `wrong event`  
**Safety:** `N/A`  
**Decision:** RECLASSIFY. XJBF treats them separately.

---

## CASE19-004 — Phá tường nhà cũ để cải tạo
**Input:** `{"actual_event": "DEMOLITION", "structure_info": "incomplete"}`  
**Historical match:** `破屋壞垣 candidate`  
**Safety:** `QCVN18 demolition survey/design required`  
**Decision:** Technical demolition readiness first.

---

## CASE19-005 — Người dùng nhập 'phá thổ' nhưng muốn đào móng nhà
**Input:** `{"user_term": "破土", "intention": "HOUSE_FOUNDATION"}`  
**Historical match:** `DOMAIN CONFLICT`  
**Safety:** `N/A`  
**Decision:** Do not accept term silently; XJBF separates burial 破土 from construction 動土.

---

## CASE19-006 — Chuyển đồ vào nhà mới
**Input:** `{"action": "MOVE_IN", "ritual_label": "入宅"}`  
**Historical match:** `移徙 candidate`  
**Safety:** `occupancy readiness required`  
**Decision:** UI may say Nhập trạch, evidence layer must show mapping to 移徙 is editorial.

---

## CASE19-007 — Lắp giường cùng ngày chuyển nhà
**Input:** `{"events": ["MOVE_RESIDENCE", "INSTALL_BED_TIMING"]}`  
**Historical match:** `['移徙', '安牀']`  
**Safety:** `PASS assumed`  
**Decision:** Two event classes; do not collapse.

---

## CASE19-008 — Lắp cửa chính và yêu cầu 'ngày An Môn theo Hiệp Kỷ'
**Input:** `{"event": "DOOR_INSTALLATION", "requested_source": "XJBF"}`  
**Historical match:** `NO_SEPARATE_ANMEN_EVENT_LOCKED_IN_V11`  
**Safety:** `door/fire/egress requirements still apply`  
**Decision:** BLOCK source claim until direct witness found.

---

## CASE19-009 — Nhà thép lắp dầm chính, gọi là thượng lương
**Input:** `{"modern_event": "STEEL_BEAM_INSTALL", "ritual_label": "上梁"}`  
**Historical match:** `mapping uncertain`  
**Safety:** `steel erection safety`  
**Decision:** Do not assert exact equivalence; allow ceremonial label separately from engineering event.

---

## CASE19-010 — Ngày được coi là tốt nhưng có bão lớn
**Input:** `{"traditional_result": "favorable", "weather": "unsafe"}`  
**Historical match:** `N/A`  
**Safety:** `FAIL`  
**Decision:** NO WORK / RESCHEDULE.

---

## CASE19-011 — AI tự tạo bảng ngày tốt 2026 từ vài câu quyển 11
**Input:** `{"calendar_engine_validated": false, "request": "generate dates"}`  
**Historical match:** `insufficient`  
**Safety:** `N/A`  
**Decision:** BLOCK. Event taxonomy is verified; calendar mathematics/tables are not yet production-validated.

---

## CASE19-012 — Dẫn Trạch Kinh là lời Hoàng Đế về sửa nhà
**Input:** `{"source": "宅經", "attribution": "黃帝"}`  
**Historical match:** `text exists, attribution disputed`  
**Safety:** `N/A`  
**Decision:** Use text with pseudepigraphic warning; reject Huangdi authorship as fact.

---

## CASE19-013 — Doanh Tạo Pháp Thức có 'thứ tự', nên dùng để chọn ngày
**Input:** `{"source": "營造法式", "requested_domain": "CALENDAR_SELECTION"}`  
**Historical match:** `technical sequence only`  
**Safety:** `N/A`  
**Decision:** REJECT domain leap.

---

## CASE19-014 — Công trình đang chống đỡ tạm nhưng chủ muốn tháo để đúng giờ đẹp
**Input:** `{"temporary_support": "required", "ritual_time_pressure": true}`  
**Historical match:** `N/A`  
**Safety:** `QCVN18 HARD FAIL if unsafe`  
**Decision:** Never remove temporary support for ritual timing.

---
