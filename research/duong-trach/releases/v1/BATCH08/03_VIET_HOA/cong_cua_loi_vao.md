# VIỆT HÓA BATCH 08 — CỔNG / CỬA / LỐI VÀO

## DOOR-001

**[ORIGINAL]** 惟是居房屋中，氣因隔別，所以通氣，秖此門戶耳。  

**[HÁN-VIỆT]** Duy thị cư phòng ốc trung, khí nhân cách biệt, sở dĩ thông khí, chỉ thử môn hộ nhĩ.  

**[DỊCH SÁT]** Theo văn bản, trong nhà các không gian bị ngăn cách, nơi thông 'khí' chính là cửa ngõ.  

**[BIÊN TẬP]** Khí ở đây là khái niệm truyền thống; không đồng nhất với lưu lượng gió HVAC.  

**State:** `TRADITIONAL_FRAMEWORK`

---

## DOOR-002

**[ORIGINAL]** 門戶通氣之處，和氣則致祥，乖氣則致戾。  

**[HÁN-VIỆT]** Môn hộ thông khí chi xứ, hòa khí tắc trí tường, quai khí tắc trí lệ.  

**[DỊCH SÁT]** Cửa là nơi văn bản xem như chỗ thông khí; 'hòa khí' được coi thuận, 'quai khí' bị coi nghịch.  

**[BIÊN TẬP]** Không sử dụng câu này để khoa học hóa khí. Geometry chỉ mô tả cửa, hướng, vật cản, luồng tiếp cận.  

**State:** `TRADITIONAL_FRAMEWORK`

---

## DOOR-003

**[ORIGINAL]** 須避直衝尖射、砂水斜割、悲崖險道、惡石山拗、崩破歪峰、枯木神廟之類。  

**[HÁN-VIỆT]** Tu tị trực xung tiêm xạ, sa thủy tà cát, bi nhai hiểm đạo, ác thạch sơn ảo, băng phá oa phong, khô mộc thần miếu chi loại.  

**[DỊCH SÁT]** Khi xét cửa, văn bản khuyên tránh các thế trực xung, vật nhọn hướng tới, hình thế/nước cắt xiên, đường hiểm và một số ngoại cảnh bất lợi.  

**[BIÊN TẬP]** Tách các observable hình học khỏi các danh mục mang màu sắc truyền thống. 'Thần miếu' không được chuyển thành nguy cơ vật lý.  

**State:** `CORE_GEOMETRY_MOTIF`

---

## DOOR-004

**[ORIGINAL]** 宜迎水迎山方吉。  

**[HÁN-VIỆT]** Nghi nghênh thủy nghênh sơn phương cát.  

**[DỊCH SÁT]** Văn bản cho rằng cửa thuận thế đón nước/đón núi thì tốt.  

**[BIÊN TẬP]** Chỉ giữ traditional form statement; mọi nguy cơ thủy/sườn dốc đi qua hard gate.  

**State:** `FORM_MOTIF_HARD_GATE_REQUIRED`

---

## DOOR-005

**[ORIGINAL]** 凡宅開門路及車門，不要直射，謂之穿心殺。  

**[HÁN-VIỆT]** Phàm trạch khai môn lộ cập xa môn, bất yếu trực xạ, vị chi xuyên tâm sát.  

**[DỊCH SÁT]** Lối vào/cửa xe không nên trực xạ theo văn bản; thế này được gọi 'xuyên tâm sát'.  

**[BIÊN TẬP]** Geometry tag = DIRECT_ACCESS_AXIS. Không mang theo phán tử vong của cổ văn.  

**State:** `CORE_ACCESS_GEOMETRY`

---

## DOOR-006

**[ORIGINAL]** 凡宅側屋，不可衝大門。  

**[HÁN-VIỆT]** Phàm trạch trắc ốc, bất khả xung đại môn.  

**[DỊCH SÁT]** Cánh/nhà phụ bên cạnh không nên xung trực tiếp đại môn.  

**[BIÊN TẬP]** Cần xác định cạnh/góc/trục công trình phụ hướng vào opening của cổng.  

**State:** `CORE_OBJECT_AXIS_GEOMETRY`

---

## DOOR-007

**[ORIGINAL]** 凡宅住屋，莫要屋角水射其門。  

**[HÁN-VIỆT]** Phàm trạch trụ ốc, mạc yếu ốc giác thủy xạ kỳ môn.  

**[DỊCH SÁT]** Văn bản tránh thế góc nhà hoặc dòng nước 'xạ' vào cửa.  

**[BIÊN TẬP]** Tách `corner_ray_to_door` và `water_flow_to_door` thành hai observables; câu có thể cần punctuation/context check.  

**State:** `GEOMETRY_CANDIDATE_SCAN_CHECK`

---

## DOOR-008

**[ORIGINAL]** 氣口者門也，門為初爻永不變更。  

**[HÁN-VIỆT]** Khí khẩu giả môn dã, môn vi sơ hào vĩnh bất biến canh.  

**[DỊCH SÁT]** Trong phép Trang Quái của đoạn này, cửa được gọi là khí khẩu và dùng làm sơ hào cố định.  

**[BIÊN TẬP]** Đây là SCHOOL-SPECIFIC rule của 元空裝卦 trong truyền bản, không nâng thành định nghĩa chung cho mọi phái.  

**State:** `SCHOOL_SPECIFIC_DEFERRED`

---

## DOOR-009

**[ORIGINAL]** 凡宅中有牆隔斷，牆間開有門，其九星即當從此處起，與別院并無關涉。  

**[HÁN-VIỆT]** Phàm trạch trung hữu tường cách đoạn, tường gian khai hữu môn, kỳ cửu tinh tức đương tòng thử xứ khởi, dữ biệt viện tịnh vô quan thiệp.  

**[DỊCH SÁT]** Trong phép '截路分房', nếu trong nhà có tường ngăn và cửa xuyên qua tường, phép tính cửu tinh được khởi lại từ đó, tách với viện khác.  

**[BIÊN TẬP]** Rất quan trọng cho compound nhiều sân, nhưng là school-specific. Geometry engine chỉ xây enclosure graph; rule cửu tinh deferred.  

**State:** `SCHOOL_SPECIFIC_ENCLOSURE_GRAPH`

---

## DOOR-010

**[ORIGINAL]** 凡宅雖有二十四山，專以八山主之。  

**[HÁN-VIỆT]** Phàm trạch tuy hữu nhị thập tứ sơn, chuyên dĩ bát sơn chủ chi.  

**[DỊCH SÁT]** Trong Môn Hộ Ca của truyền bản này, 24 sơn cửa được quy về tám nhóm.  

**[BIÊN TẬP]** Mapping 24 sơn → 8 quái giữ trong school layer; không kích hoạt ở Batch 08.  

**State:** `DIRECTION_SCHOOL_DEFERRED`

---

## DOOR-011

**[ORIGINAL]** 海內相傳，門尺數種……後人名為魯班尺。  

**[HÁN-VIỆT]** Hải nội tương truyền, môn xích sổ chủng... hậu nhân danh vi Lỗ Ban xích.  

**[DỊCH SÁT]** Văn bản thừa nhận lưu truyền nhiều loại thước cửa và gọi loại được trình bày ở đây là Lỗ Ban xích.  

**[BIÊN TẬP]** Chính câu 'có nhiều loại' là lý do không lấy một kích thước cm trên internet làm chuẩn cổ duy nhất.  

**State:** `MEASUREMENT_TRADITION_VARIANT_WARNING`

---

## DOOR-012

**[ORIGINAL]** 其尺前面八寸，以財、病、離、義、官劫、害、吉為序。  

**[HÁN-VIỆT]** Kỳ xích tiền diện bát thốn, dĩ tài, bệnh, ly, nghĩa, quan, kiếp, hại, cát vi tự.  

**[DỊCH SÁT]** Mặt trước thước trong truyền bản chia thành tám phần với các nhãn Tài, Bệnh, Ly, Nghĩa, Quan, Kiếp, Hại, Cát.  

**[BIÊN TẬP]** Không quy đổi thốn cổ sang mm nếu chưa xác định witness, chuẩn thước và niên đại vật chất.  

**State:** `HISTORICAL_MEASUREMENT_NOT_PRODUCTION`

---
