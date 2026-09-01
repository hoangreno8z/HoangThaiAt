# VIỆT HÓA BATCH 15 — CỬA SỔ / ÁNH SÁNG / THÔNG GIÓ

## Phân biệt bắt buộc

`UNCONTROLLED_DRAFT != INTENTIONAL_VENTILATION`  

`TRADITIONAL_QI != AIRFLOW_RATE`  

`光澤陽氣 != LUX / SOLAR_GAIN`

## WIN-001

**[ORIGINAL]** 窗櫺樑槅須分布。  

**[HÁN-VIỆT]** Song linh lương cách tu phân bố.  

**[DỊCH SÁT]** Đoạn nội hình nói các thành phần cửa sổ/cấu kiện như song linh, lương/cách cần được phân bố.  

**Classification:** `HISTORICAL_YANGZHAI_CONSTRUCTION_FORM`  

**Observable:** `window_distribution, structural_opening_distribution`  

**[BIÊN TẬP]** Ngữ nghĩa kỹ thuật của toàn cụm chưa đủ để suy thành tỷ lệ cửa sổ, đối xứng hay số lượng cát/hung.  

**State:** `SEMANTIC_PARTIAL_NO_NUMERIC_RULE`

---

## WIN-002

**[ORIGINAL]** 凡人家，屋居滋潤，光澤陽氣者吉，乾燥無滋潤者兇。  

**[HÁN-VIỆT]** Phàm nhân gia, ốc cư tư nhuận, quang trạch dương khí giả cát, can táo vô tư nhuận giả hung.  

**[DỊCH SÁT]** Truyền bản mô tả nhà ở có trạng thái 'tư nhuận, quang trạch, dương khí' là tốt và trạng thái khô cằn thiếu 'tư nhuận' là xấu.  

**Classification:** `TRADITIONAL_QUALITATIVE_ENVIRONMENT`  

**Observable:** `surface_condition, daylight_proxy_optional, vegetation_or_moisture_context`  

**[BIÊN TẬP]** Không khoa học hóa 'dương khí'. Cũng không đọc 'tư nhuận' thành khuyến khích ẩm mốc.  

**State:** `QUALITATIVE_ONLY`

---

## WIN-003

**[ORIGINAL]** 凡人居止之室，須周密，勿有細隙，使風入。  

**[HÁN-VIỆT]** Phàm nhân cư chỉ chi thất, tu chu mật, vật hữu tế khích, sử phong nhập.  

**[DỊCH SÁT]** Phòng ở được khuyên nên kín khít, tránh khe nhỏ để gió lọt vào.  

**Classification:** `HISTORICAL_DOMESTIC_DRAFT_AVOIDANCE`  

**Observable:** `uncontrolled_air_leakage, draft_path`  

**[BIÊN TẬP]** Đây là tránh gió lùa qua khe, không phải cấm thông gió chủ động.  

**State:** `CANDIDATE_DRAFT_MOTIF`

---

## WIN-004

**[ORIGINAL]** 少覺有風，切須避之。  

**[HÁN-VIỆT]** Thiểu giác hữu phong, thiết tu tị chi.  

**[DỊCH SÁT]** Nếu cảm thấy gió lùa thì truyền bản khuyên tránh.  

**Classification:** `HISTORICAL_DOMESTIC_HEALTH`  

**Observable:** `draft_at_occupant_zone`  

**[BIÊN TẬP]** Không dùng làm tiêu chuẩn vận tốc gió hiện đại.  

**State:** `QUALITATIVE_DRAFT_MOTIF`

---

## WIN-005

**[ORIGINAL]** 房開北牖，疏欞作窗，夏為宜，冬則否。  

**[HÁN-VIỆT]** Phòng khai Bắc dũ, sơ linh tác song, hạ vi nghi, đông tắc phủ.  

**[DỊCH SÁT]** Tác giả cho rằng mở cửa sổ/thông khẩu phía Bắc với song thưa có thể hợp mùa hè nhưng không hợp mùa đông.  

**Classification:** `HISTORICAL_SEASONAL_HEALTH_DESIGN`  

**Observable:** `window_orientation, season, openable_state`  

**[BIÊN TẬP]** Ý kiến khí hậu của tác giả 1773; không thành quy tắc phong thủy hướng Bắc phổ quát.  

**State:** `CONTEXTUAL_SEASONAL`

---

## WIN-006

**[ORIGINAL]** 臥房只宜清晨洞啟窗戶，以散竟夜之郁悶。  

**[HÁN-VIỆT]** Ngọa phòng chỉ nghi thanh thần động khải song hộ, dĩ tán cánh dạ chi uất muộn.  

**[DỊCH SÁT]** Tác giả đề nghị mùa nóng mở rộng cửa sổ phòng ngủ vào sáng sớm để giải tỏa khí tù đọng qua đêm.  

**Classification:** `HISTORICAL_SEASONAL_HEALTH_DESIGN`  

**Observable:** `morning_purge_ventilation, season, window_open_fraction`  

**[BIÊN TẬP]** Không dùng giờ cụ thể như rule hiện đại; đây là lịch sử thực hành.  

**State:** `CONTEXTUAL_SEASONAL`

---

## WIN-007

**[ORIGINAL]** 窗牖不可少開，便微風得入臥所。  

**[HÁN-VIỆT]** Song dũ bất khả thiểu khai, tiện vi phong đắc nhập ngọa sở.  

**[DỊCH SÁT]** Ở bối cảnh mùa hè, tác giả cho rằng cửa sổ nên được mở để gió nhẹ đi vào nơi nằm.  

**Classification:** `HISTORICAL_SEASONAL_HEALTH_DESIGN`  

**Observable:** `intentional_ventilation, air_movement_at_bed, season`  

**[BIÊN TẬP]** Đây là đối chứng trực tiếp với việc tuyệt đối hóa 'phòng phải kín gió'.  

**State:** `CORE_CONTEXT_CONFLICT`

---

## WIN-008

**[ORIGINAL]** 臥房暗則能斂神聚氣，此亦陰陽家之說。  

**[HÁN-VIỆT]** Ngọa phòng ám tắc năng liễm thần tụ khí, thử diệc âm dương gia chi thuyết.  

**[DỊCH SÁT]** Tác giả ghi nhận một quan niệm âm dương gia rằng phòng ngủ tối giúp 'liễm thần tụ khí'.  

**Classification:** `HISTORICAL_REPORTED_BELIEF`  

**Observable:** `night_light, day_light`  

**[BIÊN TẬP]** Tác giả ngay sau đó phân biệt ban ngày và điều kiện sáng sủa; không được biến thành 'phòng tối cả ngày là tốt'.  

**State:** `REPORTED_BELIEF_CONTEXT_REQUIRED`

---

## WIN-009

**[ORIGINAL]** 暗則又非白晝所宜。  

**[HÁN-VIỆT]** Ám tắc hựu phi bạch trú sở nghi.  

**[DỊCH SÁT]** Tác giả nói trạng thái tối lại không thích hợp cho ban ngày.  

**Classification:** `HISTORICAL_DOMESTIC_HEALTH`  

**Observable:** `daylight_condition`  

**[BIÊN TẬP]** Khóa tách DAY vs SLEEP/NIGHT; không dùng một biến 'brightness good/bad'.  

**State:** `CORE_DAY_NIGHT_SEPARATION`

---

## WIN-010

**[ORIGINAL]** 《青田秘記》曰：『臥房窗取偶，門取奇，合陰陽也。』  

**[HÁN-VIỆT]** Thanh Điền Bí Ký viết: Ngọa phòng song thủ ngẫu, môn thủ kỳ, hợp âm dương dã.  

**[DỊCH SÁT]** Tào Đình Đống dẫn một sách tên Thanh Điền Bí Ký nói cửa sổ phòng ngủ lấy số chẵn, cửa lấy số lẻ để hợp âm dương.  

**Classification:** `SECONDARY_QUOTATION_OF_ANOTHER_TRADITION`  

**Observable:** `window_count, door_leaf_or_door_count`  

**[BIÊN TẬP]** Chưa có bản Thanh Điền Bí Ký độc lập được khóa trong corpus; không dùng lời dẫn này làm rule production.  

**State:** `REFERENCE_ONLY_SOURCE_CHAIN_INCOMPLETE`

---
