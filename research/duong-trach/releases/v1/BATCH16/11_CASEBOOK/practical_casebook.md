# CASEBOOK BATCH 16 — NƯỚC / GIẾNG / BỂ

## CASE16-001 — Giếng cũ bỏ hoang trong lô đất
**Input:** `{"entity": "WELL", "status": "ABANDONED"}`  
**Classical matches:** `WAT-001`  
**Modern gate:** `fall/collapse, groundwater contamination, geotechnical closure`  
**Decision:** Do not preserve solely because old text says not to fill it; engineer safe closure or rehabilitation.

---

## CASE16-002 — Bể nước ngầm nằm giữa footprint nhà
**Input:** `{"entity": "UNDERGROUND_WATER_TANK", "center_overlap": "high"}`  
**Classical matches:** `NONE`  
**Modern gate:** `structure, waterproofing, maintenance, water quality`  
**Decision:** No direct ancient Trung Cung tank rule in verified core. Do not run WELL rules.

---

## CASE16-003 — Bể mái nằm trên phòng ngủ
**Input:** `{"entity": "ROOF_TANK", "vertical_relation": "above_bedroom"}`  
**Classical matches:** `NONE`  
**Modern gate:** `structural load, leakage, noise, maintenance`  
**Decision:** NO_DIRECT_EVIDENCE in core search for ancient omen.

---

## CASE16-004 — Giếng thật nằm sát khu bếp
**Input:** `{"entity": "WELL", "well_stove_adjacency": true}`  
**Classical matches:** `WAT-003, WAT-008`  
**Modern gate:** `water contamination, sanitary protection, fuel/fire separation`  
**Decision:** Historical motif exists; report separately from modern health engineering.

---

## CASE16-005 — Chậu rửa nằm sát bếp từ
**Input:** `{"entity": "SINK", "cooktop": "INDUCTION", "distance_m": 0.15}`  
**Classical matches:** `NONE`  
**Modern gate:** `electrical/splash/ergonomics/manufacturer`  
**Decision:** Do not transform well-stove ancient rules into sink-cooktop Feng Shui.

---

## CASE16-006 — Sân trong đọng nước sau mưa
**Input:** `{"standing_water": true, "duration": "persistent"}`  
**Classical matches:** `WAT-005`  
**Modern gate:** `stormwater drainage, mosquito/sanitation, waterproofing`  
**Decision:** Drainage repair first; ancient disease outcome remains noncausal.

---

## CASE16-007 — Mương quanh nhà bị tắc và bốc mùi
**Input:** `{"ditch_blocked": true, "odour": true}`  
**Classical matches:** `WAT-006`  
**Modern gate:** `sanitation, drain maintenance, wastewater cross-connection`  
**Decision:** Historical sanitation alignment exists; modern remediation based on engineering/health.

---

## CASE16-008 — Ống thoát thẳng ngắn nhất và đúng thủy lực
**Input:** `{"drain_path": "straight", "hydraulic_design": "PASS"}`  
**Classical matches:** `WAT-009`  
**Modern gate:** `TCVN4474/QCVN07-2 as applicable`  
**Decision:** Do NOT bend it merely to satisfy school phrase 水不宜直流.

---

## CASE16-009 — Mạng thoát nước có nhiều nhánh hợp lý
**Input:** `{"branching_topology": true, "engineering": "PASS"}`  
**Classical matches:** `WAT-010`  
**Modern gate:** `internal/external drainage standards`  
**Decision:** Do not apply 忌分流 to modern network topology.

---

## CASE16-010 — Giếng gần biển, nước nhìn trong
**Input:** `{"well_near_sea": true, "visual_clarity": "clear", "taste": "acceptable"}`  
**Classical matches:** `WAT-012`  
**Modern gate:** `QCVN01-1:2024/BYT testing, hydrogeology/salinity`  
**Decision:** Appearance/taste is insufficient; test water quality.

---

## CASE16-011 — Hộ gia đình tự khai thác giếng tại vùng nguy cơ
**Input:** `{"self_extracted_water": true, "risk_area": true}`  
**Classical matches:** `NONE`  
**Modern gate:** `QCVN01-1:2024/BYT / TT52 monitoring context`  
**Decision:** Modern quality surveillance applies according to current health regulation.

---

## CASE16-012 — Bỏ chì vào giếng theo sách cổ
**Input:** `{"lead_to_well": true}`  
**Classical matches:** `WAT-011`  
**Modern gate:** `HARD_FAIL`  
**Decision:** PROHIBIT APPLICATION. Preserve only as historical evidence.

---

## CASE16-013 — Khu nhà mới thiếu giải pháp nước mưa khi mưa cực đoan
**Input:** `{"stormwater_capacity": "insufficient", "climate_change": "relevant"}`  
**Classical matches:** `NONE`  
**Modern gate:** `QCVN07-2:2023/BXD, TCVN7957:2023`  
**Decision:** Redesign stormwater system; classical water-shape analysis cannot compensate.

---

## CASE16-014 — Bể nước sạch bị nối chéo với nước kỹ thuật
**Input:** `{"cross_connection_risk": true}`  
**Classical matches:** `NONE`  
**Modern gate:** `potable water safety, internal supply engineering`  
**Decision:** HARD FAIL/REPAIR regardless of Feng Shui sector.

---
