# VIỆT HÓA BATCH 17 — MÁI / HIÊN / NƯỚC MƯA

## Khóa nghĩa

`簷水相射` có WATER/RUNOFF semantics; không được lén đổi thành `ROOF_POINTING_SHA`.

## ROOF-001

**[ORIGINAL]** 凡屋外簷勿短促，斜雨潑壁。  

**[HÁN-VIỆT]** Phàm ốc ngoại diêm vật đoản xúc, tà vũ bát bích.  

**[DỊCH SÁT]** Hiên ngoài nhà không nên quá ngắn/gấp; văn bản liên hệ với mưa xiên hắt vào tường.  

**Classification:** `HISTORICAL_BUILDING_WEATHER_MOTIF`  

**Observable:** `eave_projection, wall_rain_exposure, wind_driven_rain`  

**Traditional outcome:** `家多痢疾 (source continuation)`  

**[BIÊN TẬP]** Phần bệnh tật không causal. Không bịa chiều dài hiên tối thiểu cổ.  

**State:** `CANDIDATE_PHYSICAL_MOTIF_NO_THRESHOLD`

---

## ROOF-002

**[ORIGINAL]** 水簷頭相射。  

**[HÁN-VIỆT]** Thủy diêm đầu tương xạ.  

**[DỊCH SÁT]** Đầu/luồng nước ở diềm mái được mô tả là 'tương xạ'.  

**Classification:** `HISTORICAL_ROOF_RUNOFF_FORM`  

**Observable:** `roof_runoff_vector, eave_edge, runoff_intersection`  

**Traditional outcome:** `主殺傷`  

**[BIÊN TẬP]** Không biến thành 'hai mái nhọn chĩa nhau'. Đối tượng chính trong câu có chữ 水.  

**State:** `CANDIDATE_RUNOFF_GEOMETRY`

---

## ROOF-003

**[ORIGINAL]** 簷水相射，主殺傷。  

**[HÁN-VIỆT]** Diêm thủy tương xạ, chủ sát thương.  

**[DỊCH SÁT]** Bản Đa Năng Bỉ Sự cũng lưu motif nước mái/diềm mái tương xạ và gắn phán truyền thống.  

**Classification:** `TEXTUAL_CROSS_WITNESS`  

**Observable:** `roof_runoff_vector, runoff_target`  

**Traditional outcome:** `主殺傷`  

**[BIÊN TẬP]** Không coi hai witness là độc lập nếu chưa chứng minh truyền bản.  

**State:** `CROSS_WITNESS_NOT_INDEPENDENCE_PROVEN`

---

## ROOF-004

**[ORIGINAL]** 廨屋漏漿。  

**[HÁN-VIỆT]** Giải ốc lậu tương.  

**[DỊCH SÁT]** Văn bản ghi một tình trạng nhà/mái bị 'lậu tương'; có yếu tố rò/dột nhưng nghĩa chính xác của 廨屋/漿 trong cụm cần thận trọng.  

**Classification:** `HISTORICAL_DEFECT_MOTIF`  

**Observable:** `roof_leakage, water_ingress`  

**Traditional outcome:** `新婦無良`  

**[BIÊN TẬP]** Chỉ giữ observable dột/rò; không dùng hậu quả gia đình. Semantic phrase remains partial.  

**State:** `SEMANTIC_PARTIAL`

---

## ROOF-005

**[ORIGINAL]** 棟梁偏欹。  

**[HÁN-VIỆT]** Đống lương thiên y.  

**[DỊCH SÁT]** Đống/lương bị lệch nghiêng.  

**Classification:** `HISTORICAL_STRUCTURAL_DEFECT`  

**Observable:** `ridge_or_beam_tilt, structural_deformation`  

**Traditional outcome:** `多生是非`  

**[BIÊN TẬP]** Hiện đại coi biến dạng kết cấu là vấn đề kỹ thuật; không dùng phán thị phi.  

**State:** `CORE_STRUCTURAL_DEFECT_MOTIF`

---

## ROOF-006

**[ORIGINAL]** 屋勢傾斜。  

**[HÁN-VIỆT]** Ốc thế khuynh tà.  

**[DỊCH SÁT]** Thế/khối nhà bị nghiêng.  

**Classification:** `HISTORICAL_STRUCTURAL_DEFECT`  

**Observable:** `building_tilt, roof_plane_tilt_anomaly`  

**Traditional outcome:** `賭博貪花`  

**[BIÊN TẬP]** Không causal. Structural investigation overrides.  

**State:** `CORE_STRUCTURAL_DEFECT_MOTIF`

---

## ROOF-007

**[ORIGINAL]** 瓦移棟摧。  

**[HÁN-VIỆT]** Ngõa di đống tồi.  

**[DỊCH SÁT]** Ngói bị dịch chuyển và phần đống/ridge bị hư hại/suy sập.  

**Classification:** `HISTORICAL_ROOF_DAMAGE`  

**Observable:** `tile_displacement, ridge_damage, roof_component_failure`  

**Traditional outcome:** `子孫貧羸`  

**[BIÊN TẬP]** Đây là condition survey input, không phải dấu hiệu vận mệnh.  

**State:** `CORE_DAMAGE_MOTIF`

---

## ROOF-008

**[ORIGINAL]** 上宇下棟，以待風雨。  

**[HÁN-VIỆT]** Thượng vũ hạ đống, dĩ đãi phong vũ.  

**[DỊCH SÁT]** Trong phần giải thích thuật ngữ mái, văn bản dẫn ý công trình có mái/đống để che đỡ gió mưa.  

**Classification:** `HISTORICAL_CONSTRUCTION_PRINCIPLE`  

**Observable:** `weather_protection`  

**Traditional outcome:** `None`  

**[BIÊN TẬP]** Không phải Feng Shui rule; dùng để hiểu chức năng lịch sử của mái/diềm.  

**State:** `REFERENCE_ONLY_TECHNICAL`

---

## ROOF-009

**[ORIGINAL]** 其結𤬦之法……修斫口縫令密。  

**[HÁN-VIỆT]** Kỳ kết ngõa chi pháp... tu trác khẩu phùng lệnh mật.  

**[DỊCH SÁT]** Phép lợp ngói yêu cầu xử lý mối/khe cho kín theo kỹ thuật của văn bản.  

**Classification:** `HISTORICAL_CONSTRUCTION_TECHNIQUE`  

**Observable:** `tile_joint_condition, roofing_tightness`  

**Traditional outcome:** `None`  

**[BIÊN TẬP]** Không sao chép cấu tạo Tống sang mái hiện đại; chỉ lưu nguyên tắc lịch sử về mối lợp.  

**State:** `REFERENCE_ONLY_TECHNICAL`

---

## ROOF-010

**[ORIGINAL]** 然後壘脊。  

**[HÁN-VIỆT]** Nhiên hậu lũy tích.  

**[DỊCH SÁT]** Sau các bước lợp/định hàng ngói, văn bản mới nói đến dựng/làm ridge.  

**Classification:** `HISTORICAL_CONSTRUCTION_SEQUENCE`  

**Observable:** `roofing_sequence, ridge_construction`  

**Traditional outcome:** `None`  

**[BIÊN TẬP]** Không dùng như construction sequencing bắt buộc cho vật liệu hiện đại.  

**State:** `REFERENCE_ONLY_TECHNICAL`

---
