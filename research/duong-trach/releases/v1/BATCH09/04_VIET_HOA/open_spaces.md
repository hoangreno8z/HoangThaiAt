# VIỆT HÓA BATCH 09 — MINH ĐƯỜNG / 天井 / GIẾNG TRỜI

## OPEN-001 — EXTERNAL_MINGTANG

**[ORIGINAL]** 明堂須當容萬馬。  

**[HÁN-VIỆT]** Minh đường tu đương dung vạn mã.  

**[DỊCH SÁT]** Minh đường được mô tả bằng hình ảnh phải đủ rộng để 'dung vạn mã'.  

**[BIÊN TẬP]** Hình ảnh chỉ sự khoáng đạt; không chuyển thành m².  

**State:** `QUALITATIVE_OPENNESS`

---

## OPEN-002 — EXTERNAL_MINGTANG

**[ORIGINAL]** 星辰近案明堂寬，案近明堂非窄勢。  

**[HÁN-VIỆT]** Tinh thần cận án minh đường khoan, án cận minh đường phi trách thế.  

**[DỊCH SÁT]** Vật/án phía trước có thể ở gần nhưng minh đường vẫn được nhấn mạnh là rộng, không thành thế chật.  

**[BIÊN TẬP]** Đo cả distance và angular/open width; khoảng cách đơn lẻ không đủ.  

**State:** `GEOMETRY_CANDIDATE`

---

## OPEN-003 — INTERNAL_FRONT_COURT

**[ORIGINAL]** 莫道明堂外自有，不知門內是明堂。  

**[HÁN-VIỆT]** Mạc đạo minh đường ngoại tự hữu, bất tri môn nội thị minh đường.  

**[DỊCH SÁT]** Văn bản nói không chỉ bên ngoài mới có minh đường; bên trong cửa cũng được gọi là minh đường.  

**[BIÊN TẬP]** Tạo relation `INTERNAL_FRONT_COURT may_classify_as MINGTANG_IN_THIS_TEXT` thay vì global synonym.  

**State:** `TEXT_SPECIFIC_CLASSIFICATION`

---

## OPEN-004 — TRADITIONAL_TIANJING

**[ORIGINAL]** 天井不可作一字。  

**[HÁN-VIỆT]** Thiên tỉnh bất khả tác nhất tự.  

**[DỊCH SÁT]** Văn bản phản đối một dạng thiên tỉnh được gọi là 'nhất tự'.  

**[BIÊN TẬP]** Hình học '一字' chưa được production-lock chỉ từ từ ngữ.  

**State:** `SHAPE_TERM_UNRESOLVED`

---

## OPEN-005 — TRADITIONAL_TIANJING

**[ORIGINAL]** 一丈必須五尺闊，長短折半隨所至。  

**[HÁN-VIỆT]** Nhất trượng tất tu ngũ xích khoát, trường đoản chiết bán tùy sở chí.  

**[DỊCH SÁT]** Đoạn này nêu một tỷ lệ bằng trượng và xích, thể hiện quan hệ độ dài–rộng trong thiên tỉnh.  

**[BIÊN TẬP]** Ancient numeric claim exists, nhưng phải kiểm scan/punctuation và unit lineage trước khi đưa vào engine.  

**State:** `HISTORICAL_NUMERIC_SCAN_REQUIRED`

---

## OPEN-006 — TRADITIONAL_TIANJING

**[ORIGINAL]** 凡宅，天井中不可積屋水。  

**[HÁN-VIỆT]** Phàm trạch, thiên tỉnh trung bất khả tích ốc thủy.  

**[DỊCH SÁT]** Thiên tỉnh không nên tích đọng nước từ mái/nhà.  

**[BIÊN TẬP]** Đây là motif rất phù hợp với drainage engineering; phần phán bệnh cổ bị tách.  

**State:** `CORE_DRAINAGE_MOTIF`

---

## OPEN-007 — TRADITIONAL_TIANJING

**[ORIGINAL]** 天井宜寬深吉／宜平坦吉／宜深聚吉。  

**[HÁN-VIỆT]** Thiên tỉnh nghi khoan thâm cát / nghi bình thản cát / nghi thâm tụ cát.  

**[DỊCH SÁT]** Trong phần phương vị thủy pháp, thiên tỉnh được mô tả bằng nhiều dạng như rộng-sâu, bằng, sâu-tụ tùy sơn.  

**[BIÊN TẬP]** Không hợp nhất thành một rule chung vì ngay trong nguồn mô tả thay đổi theo sơn/hướng.  

**State:** `SCHOOL_DIRECTIONAL_DEFERRED`

---

## OPEN-008 — EXTERNAL_MINGTANG

**[ORIGINAL]** 門外不須更架屋，蔽卻好山壞明堂。  

**[HÁN-VIỆT]** Môn ngoại bất tu cánh giá ốc, tế khước hảo sơn hoại minh đường.  

**[DỊCH SÁT]** Không nên dựng vật kiến trúc ngoài cửa làm che phía trước và phá trạng thái minh đường theo văn bản.  

**[BIÊN TẬP]** Modern outputs: obstruction angle, daylight/sky view, access; traditional classification riêng.  

**State:** `FRONT_OBSTRUCTION_MOTIF`

---
