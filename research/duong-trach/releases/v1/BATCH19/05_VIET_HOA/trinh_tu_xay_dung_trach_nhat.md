# VIỆT HÓA BATCH 19 — TRÌNH TỰ XÂY DỰNG / TRẠCH NHẬT

## Luật gốc

`選擇由事起`: phải xác định đúng **sự việc** rồi mới được xét lịch.

## Không đồng nhất

`動土 != 破土 != 上梁 != 破屋壞垣 != 移徙 != 安牀`.

## TIM-001

**[ORIGINAL]** 彼家云吉，此家云凶。  

**[HÁN-VIỆT]** Bỉ gia vân cát, thử gia vân hung.  

**[DỊCH SÁT]** Lời tựa nêu tình trạng các nhà thuật số phán cát-hung trái ngược nhau.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `OFFICIAL_META_CRITIQUE`  

**[BIÊN TẬP]** Chính nguồn chuẩn hóa trạch nhật thừa nhận mâu thuẫn truyền thống; engine không được giả vờ mọi hệ đồng nhất.  

**State:** `GOVERNANCE_CORE`

---

## TIM-002

**[ORIGINAL]** 捏造大言。  

**[HÁN-VIỆT]** Niết tạo đại ngôn.  

**[DỊCH SÁT]** Tấu nghị phê phán việc bịa dựng/phóng đại lời lẽ trong tranh luận về lựa chọn ngày giờ.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `OFFICIAL_META_CRITIQUE`  

**[BIÊN TẬP]** Dùng làm anti-hallucination invariant; không phải lời phủ định toàn bộ trạch nhật.  

**State:** `GOVERNANCE_CORE`

---

## TIM-003

**[ORIGINAL]** 選擇由事起也。  

**[HÁN-VIỆT]** Tuyển trạch do sự khởi dã.  

**[DỊCH SÁT]** Việc lựa chọn ngày giờ bắt đầu từ chính loại sự việc cần làm.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `TRADITIONAL_CALENDAR_METHOD`  

**[BIÊN TẬP]** Đây là căn cứ trực tiếp cho Event-First engine.  

**State:** `CORE_EVENT_FIRST`

---

## TIM-004

**[ORIGINAL]** 修造動土　豎柱上梁  

**[HÁN-VIỆT]** Tu tạo động thổ; thụ trụ thượng lương.  

**[DỊCH SÁT]** Quyển Dụng sự liệt kê sửa/xây-động thổ và dựng cột-thượng lương thành các mục riêng.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `EVENT_TAXONOMY`  

**[BIÊN TẬP]** Không dùng một ngày 'động thổ' cho mọi mốc thi công.  

**State:** `CORE_EVENT_SEPARATION`

---

## TIM-005

**[ORIGINAL]** 興造動土〈修造同〉  

**[HÁN-VIỆT]** Hưng tạo động thổ (tu tạo đồng).  

**[DỊCH SÁT]** Trong mục này, sách ghi Hưng tạo động thổ và chú rằng Tu tạo cùng loại.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `SOURCE_DEFINED_EVENT_EQUIVALENCE`  

**[BIÊN TẬP]** Chỉ equivalence trong ontology nguồn này; không mở rộng sang mọi động tác xây dựng.  

**State:** `CORE_ALIAS`

---

## TIM-006

**[ORIGINAL]** 移徙　安牀  

**[HÁN-VIỆT]** Di tỷ; an sàng.  

**[DỊCH SÁT]** Chuyển chỗ ở và an giường là hai mục riêng trong danh mục dân dụng.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `EVENT_TAXONOMY`  

**[BIÊN TẬP]** Move-in và bed-installation timing không được gộp.  

**State:** `CORE_EVENT_SEPARATION`

---

## TIM-007

**[ORIGINAL]** 破屋壞垣  

**[HÁN-VIỆT]** Phá ốc hoại viên.  

**[DỊCH SÁT]** Phá nhà/hủy tường được ghi thành một loại sự việc riêng.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `EVENT_TAXONOMY`  

**[BIÊN TẬP]** Ritual event class separate from renovation/building; modern demolition additionally requires safety engineering.  

**State:** `CORE_EVENT_SEPARATION`

---

## TIM-008

**[ORIGINAL]** 破土　安葬　啓攢  

**[HÁN-VIỆT]** Phá thổ; an táng; khải toàn.  

**[DỊCH SÁT]** Trong danh sách dân dụng, Phá thổ nằm cùng nhóm thuật ngữ việc tang/táng.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `DOMAIN_SEPARATION`  

**[BIÊN TẬP]** Chặn lỗi dịch `破土` thành đồng nghĩa với động thổ xây nhà.  

**State:** `CORE_YIN_YANG_DOMAIN_GUARD`

---

## TIM-009

**[ORIGINAL]** 豎柱上梁  

**[HÁN-VIỆT]** Thụ trụ thượng lương.  

**[DỊCH SÁT]** Dựng cột/thượng lương có mục 宜忌 riêng, không chỉ là tên khác của động thổ.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `TRADITIONAL_CALENDAR_EVENT`  

**[BIÊN TẬP]** Không tự đồng nhất với ngày đổ mái, cất nóc RC, lắp dầm thép hoặc hoàn thành roof.  

**State:** `SOURCE_EVENT_ONLY`

---

## TIM-010

**[ORIGINAL]** 取正　定平　立基　築基  

**[HÁN-VIỆT]** Thủ chính; định bình; lập cơ; trúc cơ.  

**[DỊCH SÁT]** Doanh Tạo Pháp Thức quyển 3 phân các hạng mục định hướng/cao độ và nền-móng thành các mục kỹ thuật riêng.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `AUTHENTICATED_HISTORICAL_CONSTRUCTION`  

**[BIÊN TẬP]** Không khẳng định bốn tiêu đề này tự nó là toàn bộ chronological schedule hiện đại; dùng làm technical taxonomy.  

**State:** `REFERENCE_TECHNICAL_HIGH_AUTHORITY`

---

## TIM-011

**[ORIGINAL]** 造石作次序之制有六。  

**[HÁN-VIỆT]** Tạo thạch tác thứ tự chi chế hữu lục.  

**[DỊCH SÁT]** Sách có một trình tự kỹ thuật sáu bước riêng cho công tác đá.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `AUTHENTICATED_HISTORICAL_CONSTRUCTION_SEQUENCE`  

**[BIÊN TẬP]** Chứng minh `次序` ở đây là quy trình nghề xây dựng, không phải trạch nhật.  

**State:** `REFERENCE_TECHNICAL_SEQUENCE`

---

## TIM-012

**[ORIGINAL]** 總鋪作次序  

**[HÁN-VIỆT]** Tổng phô tác thứ tự.  

**[DỊCH SÁT]** Quyển 4 có riêng mục 'Tổng phô tác thứ tự' cho hệ cấu kiện phô tác.  

**Authority:** `A1_AUTHENTICATED_OFFICIAL_CLASSIC`  

**Class:** `AUTHENTICATED_HISTORICAL_CONSTRUCTION_SEQUENCE`  

**[BIÊN TẬP]** Không phải bằng chứng cát-hung.  

**State:** `REFERENCE_TECHNICAL_SEQUENCE`

---

## TIM-013

**[ORIGINAL]** 凡修築垣牆建造宅宇。  

**[HÁN-VIỆT]** Phàm tu trúc viên tường kiến tạo trạch vũ.  

**[DỊCH SÁT]** Trạch Kinh có bàn trực tiếp việc tu sửa tường và xây dựng nhà.  

**Authority:** `C1_ATTRIBUTION_DISPUTED`  

**Class:** `EARLY_TRADITIONAL_CROSS_WITNESS`  

**[BIÊN TẬP]** Textual tradition is relevant, nhưng không được viết 'Hoàng Đế dạy' vì Tứ Khố xác định đề Hoàng Đế là 依託.  

**State:** `REFERENCE_ONLY_ATTRIBUTION_DISPUTED`

---
