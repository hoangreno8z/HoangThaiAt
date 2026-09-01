# VIỆT HÓA BATCH 18 — VẬT LIỆU / KẾT CẤU / HƯ HỎNG

## Quy tắc uy tín nguồn

- `A1` không đồng nghĩa mọi câu đều là phong thủy.

- `B1` chứng minh văn bản cổ có motif nhưng không được gán tên danh sư.

- `C1` chỉ đối chứng, không tạo doctrine.

## STR-001

**[ORIGINAL]** 凡構屋之制，皆以材為主；材有八等，度屋之大小，因而用之。  

**[HÁN-VIỆT]** Phàm cấu ốc chi chế, giai dĩ tài vi chủ; tài hữu bát đẳng, độ ốc chi đại tiểu, nhân nhi dụng chi.  

**[DỊCH SÁT]** Trong hệ Doanh Tạo Pháp Thức, việc cấu tạo nhà lấy hệ 'tài' làm nền; tài chia tám cấp và dùng theo quy mô công trình.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `AUTHENTICATED_HISTORICAL_CONSTRUCTION`  

**Observable:** `building_scale, historical_material_grade_or_module`  

**[BIÊN TẬP]** Chứng minh tư duy tương quan quy mô–cấu kiện trong hệ Tống; không chuyển 8 cấp này sang code hiện đại.  

**State:** `REFERENCE_TECHNICAL_HIGH_AUTHORITY`

---

## STR-002

**[ORIGINAL]** 凡梁之大小各隨其廣分為三分以二分為厚。  

**[HÁN-VIỆT]** Phàm lương chi đại tiểu các tùy kỳ quảng phân vi tam phân, dĩ nhị phân vi hậu.  

**[DỊCH SÁT]** Hệ này quy định một quan hệ tỷ lệ lịch sử giữa bề rộng và bề dày của lương.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `AUTHENTICATED_HISTORICAL_CONSTRUCTION`  

**Observable:** `historical_beam_width, historical_beam_thickness`  

**[BIÊN TẬP]** Historical numeric/proportional claim; không dùng như tỷ lệ dầm bê tông/thép/gỗ hiện đại.  

**State:** `HISTORICAL_NUMERIC_REFERENCE_ONLY`

---

## STR-003

**[ORIGINAL]** 若直梁狹即兩面安槫栿版……不得剜刻梁面。  

**[HÁN-VIỆT]** Nhược trực lương hiệp tức lưỡng diện an đoàn phục bản... bất đắc oan khắc lương diện.  

**[DỊCH SÁT]** Văn bản mô tả một xử lý kỹ thuật cho lương hẹp và cấm một dạng khoét/khắc mặt lương trong hệ cấu tạo của sách.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `AUTHENTICATED_HISTORICAL_CONSTRUCTION`  

**Observable:** `historical_beam_reinforcement_detail, beam_surface_cutting`  

**[BIÊN TẬP]** Không biến thành phương án gia cường hiện đại; chỉ lưu lịch sử kỹ thuật.  

**State:** `REFERENCE_TECHNICAL_HIGH_AUTHORITY`

---

## STR-004

**[ORIGINAL]** 桑樹不宜作屋木。死樹不宜作棟梁。  

**[HÁN-VIỆT]** Tang thụ bất nghi tác ốc mộc. Tử thụ bất nghi tác đống lương.  

**[DỊCH SÁT]** Nguồn đời Nguyên phản đối dùng gỗ dâu làm gỗ nhà và dùng cây chết làm đống/lương.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_HISTORICAL_MATERIAL_TABOO`  

**Observable:** `timber_species, source_tree_condition`  

**[BIÊN TẬP]** Không được gọi là 'Lý Giới/Lưu Cơ dạy'. Không đồng nhất cây chết với mọi gỗ tái sử dụng đã được kiểm định.  

**State:** `HISTORICAL_MOTIF_NOT_MODERN_MATERIAL_RULE`

---

## STR-005

**[ORIGINAL]** 更防有倒木作柱。令人不吉。  

**[HÁN-VIỆT]** Cánh phòng hữu đảo mộc tác trụ, lệnh nhân bất cát.  

**[DỊCH SÁT]** Nguồn cảnh báo một trường hợp gọi là 'đảo mộc tác trụ'.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_HISTORICAL_CONSTRUCTION_TABOO`  

**Observable:** `NONE`  

**[BIÊN TẬP]** `倒木` chưa khóa nghĩa kỹ thuật. Không tự dịch thành cây đổ, gỗ đặt ngược đầu hay đảo chiều thớ.  

**State:** `SEMANTIC_UNRESOLVED_BLOCKED`

---

## STR-006

**[ORIGINAL]** 梁棟偏欹。  

**[HÁN-VIỆT]** Lương đống thiên y.  

**[DỊCH SÁT]** Lương/đống bị lệch nghiêng.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_PHYSICAL_DEFECT_MOTIF`  

**Observable:** `member_tilt, ridge_or_beam_deformation`  

**[BIÊN TẬP]** Defect geometry is real; traditional social outcome is not causal.  

**State:** `CANDIDATE_CONDITION_OBSERVABLE`

---

## STR-007

**[ORIGINAL]** 門面上枋空蛀窟痕。  

**[HÁN-VIỆT]** Môn diện thượng phương không chú quật ngân.  

**[DỊCH SÁT]** Phần phương phía trên cửa có dấu hốc/rỗng do bị mọt/sâu đục theo mô tả văn bản.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_PHYSICAL_DEFECT_MOTIF`  

**Observable:** `insect_void_damage, member_section_loss`  

**[BIÊN TẬP]** Không xác định loài côn trùng chỉ từ câu này.  

**State:** `CANDIDATE_BIODETERIORATION_OBSERVABLE`

---

## STR-008

**[ORIGINAL]** 棟柱空蛀。  

**[HÁN-VIỆT]** Đống trụ không chú.  

**[DỊCH SÁT]** Đống/trụ bị rỗng do côn trùng đục theo truyền bản.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_PHYSICAL_DEFECT_MOTIF`  

**Observable:** `structural_member_borer_damage, section_loss`  

**[BIÊN TẬP]** Cần kiểm tra kết cấu/mối mọt hiện đại; phán mù/điếc trong nguồn không causal.  

**State:** `CANDIDATE_BIODETERIORATION_OBSERVABLE`

---

## STR-009

**[ORIGINAL]** 凡蓋屋，布椽勿當柱頭梁上著，須是兩邊騎梁著。  

**[HÁN-VIỆT]** Phàm cái ốc, bố duyên vật đương trụ đầu lương thượng trước, tu thị lưỡng biên kỵ lương trước.  

**[DỊCH SÁT]** Nguồn đưa ra một cách bố trí duyên/rafter đối với đầu trụ và lương.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_HISTORICAL_FRAMING_RULE`  

**Observable:** `rafter_beam_column_joint_topology`  

**[BIÊN TẬP]** Hình học cấu tạo cần reconstruction đúng hệ khung cổ trước khi formalize; chưa dùng cho modern framing.  

**State:** `SEMANTIC_STRUCTURAL_PARTIAL`

---

## STR-010

**[ORIGINAL]** 棟梁蛀空。  

**[HÁN-VIỆT]** Đống lương chú không.  

**[DỊCH SÁT]** Bản Đa Năng Bỉ Sự cũng ghi đống/lương bị mọt rỗng.  

**Authority:** `C1_ATTRIBUTION_DISPUTED`  

**Class:** `DISPUTED_ATTRIBUTION_CROSS_WITNESS`  

**Observable:** `structural_member_borer_damage, section_loss`  

**[BIÊN TẬP]** Chỉ làm cross-witness; không gọi là lời Lưu Cơ.  

**State:** `CROSS_WITNESS_ONLY`

---

## STR-011

**[ORIGINAL]** 凡桑樹不宜作屋木，死樹不宜作棟梁。  

**[HÁN-VIỆT]** Phàm tang thụ bất nghi tác ốc mộc, tử thụ bất nghi tác đống lương.  

**[DỊCH SÁT]** Bản Đa Năng Bỉ Sự truyền lại cùng motif tránh gỗ dâu/cây chết.  

**Authority:** `C1_ATTRIBUTION_DISPUTED`  

**Class:** `DISPUTED_ATTRIBUTION_CROSS_WITNESS`  

**Observable:** `timber_species, source_tree_condition`  

**[BIÊN TẬP]** Không chứng minh independence; không nâng độ chắc bằng cách đếm hai bản như hai tác giả.  

**State:** `CROSS_WITNESS_ONLY`

---

## STR-012

**[ORIGINAL]** 宅材鼎新。  

**[HÁN-VIỆT]** Trạch tài đỉnh tân.  

**[DỊCH SÁT]** Nguồn dùng một cụm ca ngợi trạng thái vật liệu nhà mới/được đổi mới trong chuỗi phán truyền thống.  

**Authority:** `B1_EARLY_ANONYMOUS_WITNESS`  

**Class:** `EARLY_TEXTUAL_MOTIF`  

**Observable:** `material_renewal_state`  

**[BIÊN TẬP]** Không suy rằng 'cứ thay toàn bộ vật liệu cũ là tốt'; repair/reuse phải dựa condition + heritage + engineering.  

**State:** `REFERENCE_ONLY`

---
