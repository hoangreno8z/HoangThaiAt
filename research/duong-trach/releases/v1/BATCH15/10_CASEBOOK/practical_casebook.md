# CASEBOOK BATCH 15 — CỬA SỔ / THÔNG GIÓ

## CASE15-001 — Phòng có khe cửa gió lùa vào giường mùa lạnh
**Input:** `{"uncontrolled_draft": true, "season": "cool", "intentional_ventilation": false}`  
**Historical matches:** `WIN-003, WIN-004`  
**Modern layer:** `draft/thermal comfort`  
**Decision:** Seal uncontrolled leakage as appropriate; do not eliminate required ventilation.

---

## CASE15-002 — Hai cửa sổ đối diện tạo thông gió chéo tốt
**Input:** `{"opposite_windows": true, "cross_ventilation_path": true}`  
**Historical matches:** `NONE`  
**Modern layer:** `TCVN5687 design evaluation`  
**Decision:** No 'qi loss' rule in verified core. Evaluate airflow/comfort/noise/weather.

---

## CASE15-003 — Hai cửa sổ đối nhau nhưng bên ngoài ô nhiễm/ồn
**Input:** `{"cross_ventilation_path": true, "outdoor_air_quality": "poor", "noise": "high"}`  
**Historical matches:** `NONE`  
**Modern layer:** `IAQ/noise/HVAC`  
**Decision:** Natural opening may be undesirable at times; mechanical strategy may be preferable.

---

## CASE15-004 — Cửa sổ hướng Bắc ở khí hậu nóng
**Input:** `{"window_azimuth_deg": 0, "season": "hot", "location_specific_climate": "required"}`  
**Historical matches:** `WIN-005`  
**Modern layer:** `solar/wind/climate`  
**Decision:** Historical source is seasonal/contextual; no universal North-good/North-bad verdict.

---

## CASE15-005 — Phòng ngủ tối về đêm nhưng sáng vừa đủ ban ngày
**Input:** `{"night_light": "low", "daylight": "adequate"}`  
**Historical matches:** `WIN-008, WIN-009`  
**Modern layer:** `sleep/day habitability`  
**Decision:** Keep day/night variables separate.

---

## CASE15-006 — Phòng ngủ tối cả ngày
**Input:** `{"night_light": "low", "daylight": "very_low"}`  
**Historical matches:** `WIN-008, WIN-009`  
**Modern layer:** `daylight/habitability`  
**Decision:** Do not use 'tụ khí' to justify poor daytime environment.

---

## CASE15-007 — Đầu giường sát cửa sổ
**Input:** `{"window_behind_bed_head": true}`  
**Historical matches:** `NONE`  
**Modern layer:** `draft, noise, rain, light, security`  
**Decision:** NO_DIRECT_EVIDENCE in core ancient search for severe omen; evaluate actual exposures.

---

## CASE15-008 — Nhà có 4 cửa sổ phòng ngủ
**Input:** `{"window_count": 4}`  
**Historical matches:** `WIN-010`  
**Modern layer:** `NONE`  
**Decision:** Only secondary quotation supports even-count idea; original source chain incomplete -> no production verdict.

---

## CASE15-009 — Nhà phố nhỏ dưới 2500 m²
**Input:** `{"building_type": "private_house", "floor_area_m2": 180}`  
**Historical matches:** `NONE`  
**Modern layer:** `TCVN5687 may guide design; QCVN09 scope not met`  
**Decision:** Do not apply QCVN09 >=2500m² energy provisions as if mandatory for this case.

---

## CASE15-010 — Văn phòng 5000 m² năm 2026
**Input:** `{"building_type": "office", "floor_area_m2": 5000, "date": "2026-09-01"}`  
**Historical matches:** `NONE`  
**Modern layer:** `QCVN09:2017/BXD current`  
**Decision:** Use current 2017 energy code where applicable; do not activate QCVN04-3:2026 early.

---

## CASE15-011 — Văn phòng 5000 m² sau 01/02/2027
**Input:** `{"building_type": "office", "floor_area_m2": 5000, "date": "2027-02-01"}`  
**Historical matches:** `NONE`  
**Modern layer:** `QCVN04-3:2026/BXD migration target`  
**Decision:** Version switch required according to legal effect/transition provisions.

---

## CASE15-012 — Agent lấy dự thảo QCVN04-1 năm 2026 làm luật hiện hành
**Input:** `{"source": "draft", "proposed_state": "HARD_GATE"}`  
**Historical matches:** `NONE`  
**Modern layer:** `legal governance`  
**Decision:** REJECT. Draft under consultation is not law.

---
