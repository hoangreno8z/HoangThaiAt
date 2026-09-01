# CASEBOOK BATCH 08 — CỔNG/CỬA

## CASE08-001 — Cổng và cửa chính thẳng tuyệt đối
**Inputs:** `{"gate_center": [5, 0], "main_door_center": [5, 10], "access_path": [[5, 0], [5, 10]]}`  
**Observables:** `{"direct_access_axis": true, "angular_offset_deg": 0}`  
**Matches:** `DOOR-005`  
**Decision:** Tag DIRECT_ACCESS_AXIS. Do not render severe traditional outcome as fact.

---

## CASE08-002 — Cổng lệch, lối đi bẻ nhẹ
**Inputs:** `{"gate_center": [2, 0], "main_door_center": [6, 10], "access_path": [[2, 0], [3, 4], [6, 10]]}`  
**Observables:** `{"direct_access_axis": false, "path_curved_or_bent": true}`  
**Matches:** `NONE`  
**Decision:** No direct-axis match. Check accessibility, drainage, practical circulation.

---

## CASE08-003 — Cổng xe thẳng nhưng cửa người lệch
**Inputs:** `{"vehicle_gate": [5, 0], "pedestrian_gate": [2, 0], "main_door": [2.5, 9]}`  
**Observables:** `{"vehicle_axis_to_building": true, "pedestrian_axis_to_main_door": "near"}`  
**Matches:** `DOOR-005`  
**Decision:** Analyze each opening by role; do not collapse all gates into one.

---

## CASE08-004 — Góc nhà phụ hướng vào đại môn
**Inputs:** `{"annex_corner": [7, 5], "gate_center": [3, 0]}`  
**Observables:** `{"corner_ray_to_gate": true}`  
**Matches:** `DOOR-006, DOOR-007`  
**Decision:** Candidate classical match; modern check for actual collision/sight/access separately.

---

## CASE08-005 — Cột/đối tượng nhọn gần trục cửa
**Inputs:** `{"obstacle_type": "pole_or_sharp_object", "door_center": [5, 10]}`  
**Observables:** `{"sharp_object_alignment": "observed"}`  
**Matches:** `DOOR-003`  
**Decision:** Record geometry. No invented distance/angle cutoff.

---

## CASE08-006 — Rãnh nước chảy thẳng về cổng
**Inputs:** `{"water_flow_axis": "intersects gate opening", "flood_hazard": "unknown"}`  
**Observables:** `{"water_flow_to_gate": true}`  
**Matches:** `DOOR-003, DOOR-007`  
**Decision:** Require drainage/hydrology check before classical interpretation.

---

## CASE08-007 — Nhà hai sân có tường và cửa ngăn
**Inputs:** `{"courtyard_count": 2, "partition_wall": true, "intermediate_door": true}`  
**Observables:** `{"enclosure_graph": "C1 -> D1 -> C2"}`  
**Matches:** `DOOR-009`  
**Decision:** Geometry supports separate enclosure nodes; 九星 restart remains school-deferred.

---

## CASE08-008 — Hai cổng: khách và dịch vụ
**Inputs:** `{"gates": ["visitor", "service"], "main_door": "visitor route"}`  
**Observables:** `{"multi_gate": true}`  
**Matches:** `NONE`  
**Decision:** Do not choose a single 'main gate' until role/hierarchy is explicitly defined.

---

## CASE08-009 — Văn phòng có cổng xe tải và cửa nhân viên
**Inputs:** `{"site_type": "business", "truck_gate": true, "staff_entry": true}`  
**Observables:** `{"role_separation": true}`  
**Matches:** `NONE`  
**Decision:** Enterprise circulation/safety dominates; classical analysis is per entrance role.

---

## CASE08-010 — Cửa thoát nạn bị đề xuất dịch để tránh trực xung
**Inputs:** `{"required_egress": true, "feng_shui_proposal": "move_or_block"}`  
**Observables:** `{"safety_conflict": true}`  
**Matches:** `DOOR-005`  
**Decision:** REJECT Feng Shui modification if it degrades compliant egress.

---

## CASE08-011 — Kích thước cửa rơi vào nhãn Lỗ Ban internet
**Inputs:** `{"door_width_mm": 810, "internet_ruler_claim": "unknown edition"}`  
**Observables:** `{"historical_ruler_witness": "not_resolved"}`  
**Matches:** `DOOR-011, DOOR-012`  
**Decision:** UNKNOWN. Do not alter structural/egress dimension until ruler lineage and current code constraints are resolved.

---

## CASE08-012 — Cửa mở theo một sơn nhưng chưa chọn trường phái
**Inputs:** `{"door_azimuth_deg": 102.0}`  
**Observables:** `{"azimuth_known": true}`  
**Matches:** `DOOR-010`  
**Decision:** Store azimuth. Do not output Bát Trạch/Huyền Không verdict in Batch 08.

---
