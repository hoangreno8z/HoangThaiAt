# CASEBOOK BATCH 14 — WC / VỆ SINH

## CASE14-001 — WC nằm gần tâm nhà phố
**Input:** `{"toilet_center_overlap": "high", "school": "none"}`  
**Classical matches:** `NONE`  
**Modern gate:** `ventilation, waterproofing, drainage`  
**Decision:** No universal Trung Cung verdict. Geometry stored; wait for explicit school/source.

---

## CASE14-002 — WC tầng 2 nằm trên bếp
**Input:** `{"toilet_above_kitchen": true}`  
**Classical matches:** `NONE`  
**Modern gate:** `leak risk, waterproofing, soil stack, fire/electrical separation`  
**Decision:** NO_DIRECT_EVIDENCE in verified Batch14 core. Engineering review only.

---

## CASE14-003 — Cửa WC trong nhà nhìn thẳng cửa chính
**Input:** `{"wc_door_axis_to_main_door": true}`  
**Classical matches:** `NONE`  
**Modern gate:** `privacy, odour, ventilation`  
**Decision:** Do not map 糞屋對門 automatically to this modern interior condition.

---

## CASE14-004 — Nhà xí/khối vệ sinh ngoài sân đối cổng
**Input:** `{"external_waste_structure_to_gate_axis": true}`  
**Classical matches:** `SAN-001, SAN-002`  
**Modern gate:** `sanitation, odour, drainage`  
**Decision:** Historical form match exists; traditional health omen remains noncausal.

---

## CASE14-005 — WC đặt ở hung phương theo Du Nghệ Lục
**Input:** `{"school": "YOU_YI_LU_XIANG_ZHAI", "life_group": "resolved", "toilet_sector": "bad"}`  
**Classical matches:** `SAN-006`  
**Modern gate:** `safe sanitation`  
**Decision:** Valid only as that school's result; not a general recommendation.

---

## CASE14-006 — WC ở 'suy phương' theo Dương Trạch Chính Tông
**Input:** `{"school": "YANG_ZHAI_ZHENG_ZONG", "declining_sector": "resolved"}`  
**Classical matches:** `SAN-005`  
**Modern gate:** `safe sanitation`  
**Decision:** School-only. Do not substitute Bát Trạch bad sectors.

---

## CASE14-007 — Muốn dùng bảng phương vị 廁 của Dương Trạch Toát Yếu
**Input:** `{"school": "YANG_ZHAI_CUO_YAO", "ocr_direction_table": "not_collated"}`  
**Classical matches:** `SAN-003, SAN-004`  
**Modern gate:** `NONE`  
**Decision:** BLOCK detailed directional automation until scan collation.

---

## CASE14-008 — Nhà hàng có WC đạt phong thủy nhưng hệ thoát nước không đạt
**Input:** `{"building_type": "business", "classical_sector": "favorable_by_selected_school", "wastewater_system": "fail"}`  
**Classical matches:** `NONE`  
**Modern gate:** `QCVN07/project infrastructure, QCVN14 if discharge scope applies`  
**Decision:** HARD FAIL/REDESIGN. Classical sector cannot override sanitation.

---

## CASE14-009 — Văn phòng công cộng thiếu WC tiếp cận
**Input:** `{"building_type": "public_or_in_scope", "accessible_toilet": "missing"}`  
**Classical matches:** `NONE`  
**Modern gate:** `QCVN10:2024/BXD`  
**Decision:** If QCVN10 applies -> REDESIGN regardless of preferred Feng Shui sector.

---

## CASE14-010 — Bể tự hoại đặt gần nguồn nước sạch
**Input:** `{"septic_tank_near_potable_source": true}`  
**Classical matches:** `NONE`  
**Modern gate:** `sanitation risk assessment, project/environmental requirements`  
**Decision:** Modern health/environmental protection first; no need to invent a 'Thủy sát'.

---

## CASE14-011 — WC đối giường ngủ
**Input:** `{"wc_door_axis_to_bed": true}`  
**Classical matches:** `NONE`  
**Modern gate:** `privacy, noise, odour, humidity`  
**Decision:** NO_DIRECT_EVIDENCE_IN_VERIFIED_CORE_SEARCH for severe ancient medical omen.

---

## CASE14-012 — WC sạch, thông gió tốt nhưng nằm phương không hợp một school
**Input:** `{"modern_sanitation": "PASS", "school_result": "unfavorable"}`  
**Classical matches:** `school-dependent`  
**Modern gate:** `PASS`  
**Decision:** Report two layers separately; do not convert school result into health hazard.

---
