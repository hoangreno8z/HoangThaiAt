# BATCH 04 — ĐỊA THẾ THỰC CHIẾN

Phạm vi: Long/Thế → Minh Đường → Nước → Thủy khẩu → Đường → thế bao/xung. Chưa đi sang Bát Trạch/Huyền Không.

## Quy tắc đọc
- `[ORIGINAL]` = cổ văn.
- `[HÁN-VIỆT]` = đọc Hán-Việt.
- `[DỊCH SÁT]` = dịch sát.
- `[THỰC CHIẾN]` = biên tập hiện đại, không phải lời cổ nhân.

## FORM-001 — Đại thế trước nội cục

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 人之居處，宜以大地山河為主。  

**[HÁN-VIỆT]** Nhân chi cư xứ, nghi dĩ đại địa sơn hà vi chủ.  

**[DỊCH SÁT]** Nơi người ở nên lấy đại thế đất đai, núi sông làm chủ.  

**[THỰC CHIẾN]** Khi khảo sát đất, phải ghi nhận địa hình, nước, đường và không gian xung quanh trước khi bàn bố trí phòng.  

**Tags:** `SITE_FIRST, DIRECT_YANGZHAI`  

**Confidence:** `HIGH_TEXT`

---

## FORM-002 — Đất cư trú rộng và bằng

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 居處須用寬平勢。  

**[HÁN-VIỆT]** Cư xứ tu dụng khoan bình thế.  

**[DỊCH SÁT]** Nơi cư trú cần thế đất rộng và tương đối bằng.  

**[THỰC CHIẾN]** Ghi width/depth/slope/usable_area. Không tự đặt ngưỡng cổ pháp; ngưỡng kỹ thuật thuộc MODERN_ENGINE.  

**Tags:** `WIDTH, SLOPE`  

**Confidence:** `HIGH_TEXT`

---

## FORM-003 — Minh đường rộng

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 明堂須當容萬馬。  

**[HÁN-VIỆT]** Minh đường tu đương dung vạn mã.  

**[DỊCH SÁT]** Minh đường được mô tả là nên đủ rộng để dung nạp rất nhiều ngựa.  

**[THỰC CHIẾN]** Hiểu là hình ảnh cường điệu chỉ độ khoáng đạt; tuyệt đối không chuyển 'vạn mã' thành diện tích mét vuông.  

**Tags:** `MINGTANG, NO_NUMERIC_INVENTION`  

**Confidence:** `HIGH_TEXT`

---

## FORM-004 — Nước bao trước sau

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 前後有水環抱貴。  

**[HÁN-VIỆT]** Tiền hậu hữu thủy hoàn bão quý.  

**[DỊCH SÁT]** Trước sau có nước ôm vòng được truyền thống xem là quý.  

**[THỰC CHIẾN]** Geometry chỉ ghi dạng cong/bao, khoảng cách và hướng dòng. An toàn thủy văn vẫn qua Hard Gate.  

**Tags:** `WATER, ENCLOSURE`  

**Confidence:** `HIGH_TEXT`

---

## FORM-005 — Đường hai bên và thế phản

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 左右有路亦如然，但遇返跳必須忌。  

**[HÁN-VIỆT]** Tả hữu hữu lộ diệc như nhiên, đãn ngộ phản khiêu tất tu kỵ.  

**[DỊCH SÁT]** Hai bên có đường cũng được xét tương tự, nhưng gặp thế phản khiêu thì sách dặn phải tránh.  

**[THỰC CHIẾN]** Không tự dịch 'phản khiêu' thành một góc số học cố định. Cần corpus hình minh họa + định nghĩa trường phái trước khi formalize.  

**Tags:** `ROAD, FAN_TIAO, NEEDS_GEOMETRIC_DEFINITION`  

**Confidence:** `HIGH_TEXT`

---

## FORM-006 — Thủy khẩu

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 更須水口收拾緊，不宜太迫成小器。  

**[HÁN-VIỆT]** Cánh tu thủy khẩu thu thập khẩn, bất nghi thái bách thành tiểu khí.  

**[DỊCH SÁT]** Thủy khẩu còn cần được thu giữ tương đối kín, nhưng không nên bức ép quá mức.  

**[THỰC CHIẾN]** Tách hai biến: containment/closure và constriction. Chưa có ngưỡng số cổ văn.  

**Tags:** `WATER_MOUTH, CONTAINMENT, CONSTRICTION`  

**Confidence:** `HIGH_TEXT`

---

## FORM-007 — Án gần nhưng minh đường không hẹp

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 星辰近案明堂寬，案近明堂非窄勢。  

**[HÁN-VIỆT]** Tinh thần cận án minh đường khoan, án cận minh đường phi trách thế.  

**[DỊCH SÁT]** Án có thể ở gần nhưng minh đường vẫn phải rộng, không thành thế chật hẹp.  

**[THỰC CHIẾN]** Khi dựng mô hình site, khoảng cách vật thể phía trước phải được đánh giá cùng độ mở ngang, không chỉ khoảng cách đơn lẻ.  

**Tags:** `MINGTANG, FRONT_OBJECT, OPENNESS`  

**Confidence:** `MEDIUM_HIGH_TEXT_SEMANTIC_REVIEW`

---

## FORM-008 — Tứ tượng dưới dạng ngoại cảnh

**Nguồn:** `SRC-YZSS-EXT-001`  

**[ORIGINAL]** 左有流水謂之青龍；右有長道謂之白虎；前有汙池謂之朱雀；後有丘陵謂之元武。  

**[HÁN-VIỆT]** Tả hữu lưu thủy vị chi Thanh Long; hữu hữu trường đạo vị chi Bạch Hổ; tiền hữu ô trì vị chi Chu Tước; hậu hữu khâu lăng vị chi Huyền Vũ.  

**[DỊCH SÁT]** Bên trái có dòng nước gọi là Thanh Long; bên phải có đường dài gọi là Bạch Hổ; trước có ao gọi Chu Tước; sau có gò đồi gọi Huyền Vũ.  

**[THỰC CHIẾN]** Đây là phép gán hình tượng của văn bản; không biến thành định nghĩa duy nhất của Tứ Tượng ở mọi trường phái.  

**Tags:** `FOUR_SYMBOLS, SITE_FEATURE_MAPPING`  

**Confidence:** `HIGH_TEXT`

---

## FORM-009 — Quy mô đất dương trạch

**Nguồn:** `SRC-YLJ-DZ-002`  

**[ORIGINAL]** 大凡陽宅要穴大，寬闊連綿又平伏。  

**[HÁN-VIỆT]** Đại phàm dương trạch yếu huyệt đại, khoan khoát liên miên hựu bình phục.  

**[DỊCH SÁT]** Dương trạch nhìn chung cần chỗ đủ lớn, khoáng đạt, liên tục và tương đối bằng.  

**[THỰC CHIẾN]** Hợp nhất với FORM-002 ở mức semantic motif; không coi hai nguồn là độc lập hoàn toàn cho tới khi kiểm lịch sử truyền văn.  

**Tags:** `DIRECT_YANGZHAI, WIDTH, CONTINUITY, SLOPE`  

**Confidence:** `HIGH_TEXT_ATTRIBUTION_DISPUTED`

---

## FORM-010 — Thế là điều cốt yếu

**Nguồn:** `SRC-YLJ-DZ-002`  

**[ORIGINAL]** 要知居止只要勢。  

**[HÁN-VIỆT]** Yếu tri cư chỉ chỉ yếu thế.  

**[DỊCH SÁT]** Muốn xét nơi cư trú, điều cốt yếu là thế.  

**[THỰC CHIẾN]** Tạo trường `site_form_summary` bắt buộc trước các school-engine khác.  

**Tags:** `FORM_FIRST, DIRECT_YANGZHAI`  

**Confidence:** `HIGH_TEXT_ATTRIBUTION_DISPUTED`

---

## FORM-011 — Nước ôm, núi chầu

**Nguồn:** `SRC-YLJ-DZ-002`  

**[ORIGINAL]** 水抱山朝必有氣。  

**[HÁN-VIỆT]** Thủy bão sơn triều tất hữu khí.  

**[DỊCH SÁT]** Nước ôm và núi chầu thì theo ngôn ngữ truyền thống được gọi là có khí.  

**[THỰC CHIẾN]** `氣` giữ nguyên là traditional concept; không ánh xạ sang trường điện từ hay năng lượng đo được.  

**Tags:** `WATER, MOUNTAIN, TRADITIONAL_QI`  

**Confidence:** `HIGH_TEXT_ATTRIBUTION_DISPUTED`

---

## FORM-012 — Thế dốc gãy nghiêng

**Nguồn:** `SRC-YLJ-DZ-002`  

**[ORIGINAL]** 破碎斜傾非吉地。  

**[HÁN-VIỆT]** Phá toái tà khuynh phi cát địa.  

**[DỊCH SÁT]** Địa hình vỡ vụn, xiên nghiêng không được xem là đất tốt.  

**[THỰC CHIẾN]** Song song với kiểm tra địa kỹ thuật nhưng không thay thế nó.  

**Tags:** `BROKEN_TERRAIN, SLOPE, HARD_GATE_PARALLEL`  

**Confidence:** `HIGH_TEXT_ATTRIBUTION_DISPUTED`

---

## FORM-013 — Minh đường và vòng bao

**Nguồn:** `SRC-YLJ-MT-003`  

**[ORIGINAL]** 問君如何辯明堂，外山抱裏內平洋。  

**[HÁN-VIỆT]** Vấn quân như hà biện minh đường, ngoại sơn bão lý nội bình dương.  

**[DỊCH SÁT]** Hỏi cách phân biệt minh đường: núi phía ngoài ôm vào, phía trong là khoảng tương đối bằng rộng.  

**[THỰC CHIẾN]** Nguồn nằm trong hệ hình thế có bối cảnh âm trạch mạnh; chỉ dùng để định nghĩa motif hình học, gắn `SCOPE_WARNING`.  

**Tags:** `MINGTANG, ENCLOSURE, FLAT_OPEN_AREA, SCOPE_WARNING`  

**Confidence:** `HIGH_TEXT_SCOPE_LIMITED`

---

## FORM-014 — Minh đường - nước - tránh gió

**Nguồn:** `SRC-YLJ-MT-003`  

**[ORIGINAL]** 明堂惜水如惜血，穴裏避風如避賊。  

**[HÁN-VIỆT]** Minh đường tích thủy như tích huyết, huyệt lý tị phong như tị tặc.  

**[DỊCH SÁT]** Minh đường coi trọng việc giữ nước như giữ máu; chỗ huyệt tránh gió như tránh giặc.  

**[THỰC CHIẾN]** Chỉ là ngôn ngữ cổ Hình thế. Không dùng để kết luận thông gió nhà càng ít càng tốt; vi khí hậu hiện đại được đánh giá độc lập.  

**Tags:** `MINGTANG, WATER, WIND, SCOPE_WARNING`  

**Confidence:** `HIGH_TEXT_SCOPE_LIMITED`

---

## FORM-015 — Mô hình hệ thống ngoại cảnh

**Nguồn:** `SRC-ZJ-SYS-004`  

**[ORIGINAL]** 宅以形勢為身體，以泉水為血脈，以土地為皮肉，以草木為毛髮。  

**[HÁN-VIỆT]** Trạch dĩ hình thế vi thân thể, dĩ tuyền thủy vi huyết mạch, dĩ thổ địa vi bì nhục, dĩ thảo mộc vi mao phát.  

**[DỊCH SÁT]** Nhà lấy hình thế làm thân thể, suối nước làm huyết mạch, đất làm da thịt, cây cỏ làm lông tóc.  

**[THỰC CHIẾN]** Dùng làm thứ tự checklist khảo sát, không coi ẩn dụ là cơ chế vật lý.  

**Tags:** `SITE_AUDIT_MODEL, METAPHOR_GUARD`  

**Confidence:** `HIGH_TEXT_PSEUDEPIGRAPHIC_AUTHOR`

---

## FORM-016 — Tàng phong - giới thủy

**Nguồn:** `SRC-ZANG-005`  

**[ORIGINAL]** 氣乘風則散，界水則止。  

**[HÁN-VIỆT]** Khí thừa phong tắc tán, giới thủy tắc chỉ.  

**[DỊCH SÁT]** Theo văn bản, khí gặp gió thì tán, gặp giới hạn nước thì dừng.  

**[THỰC CHIẾN]** Nguồn gốc thuộc Táng thư/âm trạch; chỉ lưu để theo dõi lịch sử thuật ngữ. Không dùng trực tiếp thành rule nhà ở nếu chưa có nguồn Dương trạch tiếp nhận.  

**Tags:** `CONCEPT_HISTORY, YINZHAI, REFERENCE_ONLY`  

**Confidence:** `TEXT_STRONG_ATTRIBUTION_AND_SCOPE_DISPUTED`

---
