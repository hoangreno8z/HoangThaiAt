# CASEBOOK BATCH 18 — VẬT LIỆU / KẾT CẤU / SỬA CHỮA

## CASE18-001 — Dầm bê tông xuất hiện vết nứt mới
**Input:** `{"material": "RC", "defect": "CRACK", "change": "NEW"}`  
**Historical matches:** `NONE`  
**Modern gate:** `TCVN9381 danger screen, RC specialist/maintenance`  
**Decision:** Do not predict vận. Determine crack type, activity and structural significance.

---

## CASE18-002 — Cột nhà nghiêng thấy rõ bằng mắt
**Input:** `{"member": "COLUMN", "defect": "TILT", "load_bearing": "UNKNOWN"}`  
**Historical matches:** `STR-006`  
**Modern gate:** `TCVN9381`  
**Decision:** Treat as potentially high-consequence until assessed; traditional social outcome ignored.

---

## CASE18-003 — Xà gỗ bị mọt rỗng
**Input:** `{"material": "TIMBER", "member": "BEAM", "defect": "BORER_SECTION_LOSS"}`  
**Historical matches:** `STR-008, STR-010`  
**Modern gate:** `TCVN8268 if termite, timber condition/strength assessment`  
**Decision:** Inspect species/cause/remaining section/load path. Cross-witness does not add causal omen.

---

## CASE18-004 — Gỗ tái sử dụng còn tốt muốn làm cấu kiện
**Input:** `{"material": "RECLAIMED_TIMBER", "condition": "UNKNOWN"}`  
**Historical matches:** `NONE`  
**Modern gate:** `timber grading/testing/design`  
**Decision:** Do not reject as 死樹. Require actual material evidence.

---

## CASE18-005 — Cây chết mới hạ muốn dùng làm dầm chính
**Input:** `{"source_tree_condition": "DEAD_TREE", "intended_role": "PRIMARY_BEAM"}`  
**Historical matches:** `STR-004, STR-011`  
**Modern gate:** `timber suitability/grading, decay/insect/moisture checks`  
**Decision:** Historical taboo exists in Yuan witness; modern acceptance still depends on material engineering.

---

## CASE18-006 — Muốn khoét dầm để tránh xà ngang đè giường
**Input:** `{"proposal": "CUT_LOAD_BEARING_BEAM", "reason": "FENG_SHUI"}`  
**Historical matches:** `NONE`  
**Modern gate:** `STRUCTURAL_HARD_FAIL`  
**Decision:** REJECT unless engineered modification proves safety.

---

## CASE18-007 — Cốt thép lộ và có rỉ
**Input:** `{"material": "RC", "defect": ["SPALLING", "CORROSION_EVIDENCE"]}`  
**Historical matches:** `NONE`  
**Modern gate:** `TCVN9348, TCVN12251, TCVN9343`  
**Decision:** Technical corrosion assessment/repair; no 'metal element weakened' metaphysics.

---

## CASE18-008 — Nhà thép cũ sửa mở rộng
**Input:** `{"material": "STEEL", "action": "RENOVATION_EXTENSION"}`  
**Historical matches:** `NONE`  
**Modern gate:** `TCVN5575:2024, TCVN12251:2020`  
**Decision:** Use current structural/corrosion standards; old 2012 steel standard not treated as current.

---

## CASE18-009 — Nhà bê tông nứt do môi trường nóng ẩm nghi ngờ
**Input:** `{"material": "RC", "defect": "CRACK", "climate": "HOT_HUMID"}`  
**Historical matches:** `NONE`  
**Modern gate:** `TCVN9345 context, TCVN9381 if danger`  
**Decision:** Do not assume climate is the cause; investigate before diagnosis.

---

## CASE18-010 — Thợ nói cột gỗ đã đặt 'ngược' nên phải phá
**Input:** `{"claim": "倒木作柱", "construction_meaning": "UNRESOLVED"}`  
**Historical matches:** `STR-005`  
**Modern gate:** `condition/load assessment`  
**Decision:** BLOCK. Phrase semantics unresolved; no demolition from philological uncertainty.

---

## CASE18-011 — Muốn lấy tỷ lệ dầm đời Tống để thiết kế dầm mới
**Input:** `{"source": "營造法式", "modern_member": "RC_BEAM"}`  
**Historical matches:** `STR-002`  
**Modern gate:** `TCVN5574:2018`  
**Decision:** CATEGORY ERROR. Historical system is reference, not modern sizing.

---

## CASE18-012 — Nhà cũ có nhiều defect nhưng chủ muốn chỉ hóa giải phong thủy
**Input:** `{"defects": ["TILT", "TERMITE", "LEAK", "CORROSION"], "repair_requested": false}`  
**Historical matches:** `STR-006, STR-008`  
**Modern gate:** `TCVN9381, TCVN8268, TCVN9343/12251 as applicable`  
**Decision:** Escalate engineering/maintenance. Feng Shui commentary only after safety.

---

## CASE18-013 — Nguồn ghi Lưu Cơ nhưng thư mục học nghi ngờ
**Input:** `{"source": "多能鄙事", "requested_label": "Lưu Cơ chân truyền"}`  
**Historical matches:** `STR-010, STR-011`  
**Modern gate:** `NONE`  
**Decision:** REJECT attribution as fact. Display 'old editions attribute to Liu Ji; attribution disputed'.

---

## CASE18-014 — Lý Giới quy định kỹ thuật cấu kiện
**Input:** `{"source": "營造法式", "requested_use": "FENG_SHUI_AUSPICIOUSNESS"}`  
**Historical matches:** `STR-001, STR-002, STR-003`  
**Modern gate:** `NONE`  
**Decision:** REJECT domain leap. High authority technical source remains technical.

---
