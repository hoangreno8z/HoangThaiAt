# VIỆT HÓA BATCH 11 — BẾP / HỎA / NƯỚC / KHÓI

## Cảnh báo

Một số câu cổ **không những không áp dụng được hiện đại mà còn phải bị safety engine phủ quyết**, ví dụ bỏ chì vào giếng.

## KIT-001

**[ORIGINAL]** 凡於廳屋下安竈者，有殃。  

**[HÁN-VIỆT]** Phàm ư sảnh ốc hạ an táo giả, hữu ương.  

**[DỊCH SÁT]** Truyền bản coi việc đặt bếp ở 'dưới/thuộc dưới' sảnh ốc là bất lợi.  

**[SEMANTIC NOTE]** 廳屋下 may indicate under-hall vertical relation or under/within hall structure; exact modern mapping needs architectural context.  

**Observable:** `stove_room_vertical_relation_to_hall, same_floor_relation`  

**Traditional outcome:** `有殃`  

**State:** `SEMANTIC_PARTIAL`

---

## KIT-002

**[ORIGINAL]** 井北竈南，家忤逆。  

**[HÁN-VIỆT]** Tỉnh Bắc táo Nam, gia ngỗ nghịch.  

**[DỊCH SÁT]** Truyền bản nêu một cấu hình giếng ở Bắc, bếp ở Nam và gán phán truyền thống bất lợi.  

**[SEMANTIC NOTE]** This is a directional relation between well and stove, not sink-vs-cooktop.  

**Observable:** `well_azimuth_relative_to_house, stove_azimuth_relative_to_house`  

**Traditional outcome:** `家忤逆`  

**State:** `DIRECTIONAL_TRADITION_CANDIDATE`

---

## KIT-003

**[ORIGINAL]** 凡作竈法，長七尺九寸……廣四尺……高三尺……口闊一尺二寸……突大八寸。  

**[HÁN-VIỆT]** Phàm tác táo pháp, trường thất xích cửu thốn... quảng tứ xích... cao tam xích... khẩu khoát nhất xích nhị thốn... đột đại bát thốn.  

**[DỊCH SÁT]** Văn bản đưa một bộ kích thước bếp bằng xích/thốn và gắn mỗi con số với biểu tượng vũ trụ.  

**[SEMANTIC NOTE]** True historical numeric claim, but metrology and object components are not yet locked.  

**Observable:** `historical_length_units, stove_component_dimensions`  

**Traditional outcome:** `SYMBOLIC_COSMOLOGY`  

**State:** `HISTORICAL_NUMERIC_BLOCKED_PRODUCTION`

---

## KIT-004

**[ORIGINAL]** 凡竈面向西南吉，向東北凶。  

**[HÁN-VIỆT]** Phàm táo diện hướng Tây Nam cát, hướng Đông Bắc hung.  

**[DỊCH SÁT]** Truyền bản này phán mặt bếp hướng Tây Nam tốt, Đông Bắc xấu.  

**[SEMANTIC NOTE]** Single-witness directional statement; attribution disputed; not universal.  

**Observable:** `stove_facing_azimuth`  

**Traditional outcome:** `吉/凶`  

**State:** `DIRECTIONAL_SINGLE_WITNESS_BLOCK_GENERALIZATION`

---

## KIT-005

**[ORIGINAL]** 凡刀斧不宜安竈上。  

**[HÁN-VIỆT]** Phàm đao phủ bất nghi an táo thượng.  

**[DỊCH SÁT]** Dao/rìu không nên đặt phía trên bếp theo truyền bản.  

**[SEMANTIC NOTE]** A housekeeping/spatial taboo; no need to create supernatural causality.  

**Observable:** `sharp_tool_storage_above_cooking_zone`  

**Traditional outcome:** `None`  

**State:** `CANDIDATE_HOUSEKEEPING`

---

## KIT-006

**[ORIGINAL]** 火唵即是廚房廚竈，止宜在宅凶方，不宜在吉方。  

**[HÁN-VIỆT]** Hỏa am tức thị trù phòng trù táo, chỉ nghi tại trạch hung phương, bất nghi tại cát phương.  

**[DỊCH SÁT]** Trong truyền bản này, Hỏa Am được giải là bếp/phòng bếp và được đặt ở 'hung phương' của trạch thay vì 'cát phương'.  

**[SEMANTIC NOTE]** School-specific directional doctrine; requires its own house-direction calculation.  

**Observable:** `kitchen_sector, school_house_sector_classification`  

**Traditional outcome:** `None`  

**State:** `SCHOOL_SPECIFIC_BLOCK_GENERAL_ENGINE`

---

## KIT-007

**[ORIGINAL]** 古人極言煙火之害。  

**[HÁN-VIỆT]** Cổ nhân cực ngôn yên hỏa chi hại.  

**[DỊCH SÁT]** Đoạn văn nhấn mạnh cái hại của khói/lửa.  

**[SEMANTIC NOTE]** This is historical rationale inside the text; not a modern smoke toxicology model.  

**Observable:** `combustion, smoke_source`  

**Traditional outcome:** `None`  

**State:** `HISTORICAL_RATIONALE`

---

## KIT-008

**[ORIGINAL]** 此歌與前互相發，但「離修乙」三字不合……或傳流之誤。  

**[HÁN-VIỆT]** Thử ca dữ tiền hỗ tương phát, đãn 'Ly tu Ất' tam tự bất hợp... hoặc truyền lưu chi ngộ.  

**[DỊCH SÁT]** Chính văn bản nhận xét ba chữ 'Ly tu Ất' không phù hợp với hệ trước và có thể là sai lầm trong quá trình truyền chép.  

**[SEMANTIC NOTE]** Self-identified textual conflict; never silently harmonize.  

**Observable:** `NONE`  

**Traditional outcome:** `None`  

**State:** `TEXTUAL_CONFLICT_EXPLICIT`

---

## KIT-009

**[ORIGINAL]** 廚竈必須居左位，不宜安在白虎方。  

**[HÁN-VIỆT]** Trù táo tất tu cư tả vị, bất nghi an tại Bạch Hổ phương.  

**[DỊCH SÁT]** Trong đoạn nội hình này, bếp được đặt phía trái và tránh phía được gọi là Bạch Hổ.  

**[SEMANTIC NOTE]** Reference frame left/right must be resolved from house facing/context; not universal screen-left.  

**Observable:** `kitchen_relative_side, house_facing_reference`  

**Traditional outcome:** `None`  

**State:** `FORM_DIRECTIONAL_PARTIAL`

---

## KIT-010

**[ORIGINAL]** 井畔栽花，物業荒。  

**[HÁN-VIỆT]** Tỉnh bạn tài hoa, vật nghiệp hoang.  

**[DỊCH SÁT]** Truyền bản phản đối trồng hoa sát bên giếng và gán hậu quả truyền thống.  

**[SEMANTIC NOTE]** Not a kitchen rule; retained only as well-environment motif.  

**Observable:** `vegetation_near_well`  

**Traditional outcome:** `物業荒`  

**State:** `REFERENCE_WELL_ENVIRONMENT`

---

## KIT-011

**[ORIGINAL]** 卯不穿井，水不香。  

**[HÁN-VIỆT]** Mão bất xuyên tỉnh, thủy bất hương.  

**[DỊCH SÁT]** Truyền bản có cấm kỵ đào giếng theo phương/thời? liên quan chữ Mão; ngữ nghĩa áp dụng cần bối cảnh.  

**[SEMANTIC NOTE]** Do not infer whether 卯 means direction, time/day or combined rule without source context.  

**Observable:** `NONE`  

**Traditional outcome:** `水不香`  

**State:** `SEMANTIC_UNRESOLVED_BLOCKED`

---

## KIT-012

**[ORIGINAL]** 以鉛十餘斤實井中，水清而甘。  

**[HÁN-VIỆT]** Dĩ duyên thập dư cân thực tỉnh trung, thủy thanh nhi cam.  

**[DỊCH SÁT]** Văn bản khuyên bỏ hơn mười cân chì vào giếng để nước trong/ngọt.  

**[SEMANTIC NOTE]** This is a historically transmitted practice that is unsafe by modern toxicology; must be explicitly invalidated for modern application.  

**Observable:** `lead_added_to_well`  

**Traditional outcome:** `水清而甘`  

**State:** `MODERN_SAFETY_INVALID`

---
