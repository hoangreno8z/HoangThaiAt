# CASEBOOK BATCH 13 — CẦU THANG

## CASE13-001 — Cầu thang 17 bậc an toàn
**Input:** `{"step_count": 17, "safety": "PASS"}`  
**Classical match:** `NONE`  
**Decision:** Do not label auspicious from 4n+1 without source.

---

## CASE13-002 — Cầu thang 18 bậc nhưng hình học an toàn
**Input:** `{"step_count": 18, "safety": "PASS"}`  
**Classical match:** `NONE`  
**Decision:** No penalty from Sinh-Lão-Bệnh-Tử in verified corpus.

---

## CASE13-003 — 21 bậc nhưng mặt bậc/trình tự thoát nạn không đạt
**Input:** `{"step_count": 21, "safety": "FAIL"}`  
**Classical match:** `NONE`  
**Decision:** HARD FAIL/REDESIGN regardless of lucky-number folklore.

---

## CASE13-004 — Cửa chính nhìn thấy cầu thang
**Input:** `{"door_to_stair_visibility": true}`  
**Classical match:** `NONE`  
**Decision:** Collect sightline/circulation. NO_DIRECT_EVIDENCE in current core search.

---

## CASE13-005 — Cửa mở thẳng tới mép thang
**Input:** `{"door_to_first_step_distance": "small", "collision_risk": true}`  
**Classical match:** `NONE`  
**Decision:** Modern safety/function issue first; no need for a mystical rule.

---

## CASE13-006 — Cầu thang cắt qua area centroid nhà chữ L
**Input:** `{"stair_over_area_centroid": true}`  
**Classical match:** `NONE`  
**Decision:** Store geometry only. Do not call 'Trung Cung đại hung' until school/source method exists.

---

## CASE13-007 — Cầu thang không ở centroid nhưng nằm ở functional center
**Input:** `{"area_centroid_overlap": false, "functional_center_overlap": true}`  
**Classical match:** `NONE`  
**Decision:** Demonstrates why 'center' must be defined before any claim.

---

## CASE13-008 — Cầu thang xoắn ốc nhà riêng
**Input:** `{"stair_type": "spiral"}`  
**Classical match:** `NONE`  
**Decision:** No ancient verdict. Check geometry, fall safety, code applicability and usability.

---

## CASE13-009 — Văn phòng chỉ có thang nhưng route tiếp cận yêu cầu thang máy
**Input:** `{"building_type": "office", "accessible_vertical_route": "missing"}`  
**Classical match:** `NONE`  
**Decision:** QCVN10 applicability check; if required -> REDESIGN.

---

## CASE13-010 — Cầu thang thoát nạn bị bịt để tránh 'khí thoát'
**Input:** `{"feng_shui_proposal": "block_or_narrow_egress"}`  
**Classical match:** `NONE`  
**Decision:** REJECT. Fire egress hard gate.

---

## CASE13-011 — Bậc cong/rẻ quạt trong công trình thuộc QCVN06
**Input:** `{"winder_steps": true}`  
**Classical match:** `NONE`  
**Decision:** Evaluate under applicable fire-code provisions; no numerology.

---

## CASE13-012 — Muốn đổi 20 bậc thành 21 chỉ vì phong thủy
**Input:** `{"design_change": "change_geometry_for_lucky_count"}`  
**Classical match:** `NONE`  
**Decision:** Do not change unless architecture/safety/function supports it; current cổ evidence insufficient.

---
