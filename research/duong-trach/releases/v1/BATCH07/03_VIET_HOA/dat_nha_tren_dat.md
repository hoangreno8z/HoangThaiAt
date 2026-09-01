# VIỆT HÓA BATCH 07 — ĐẶT NHÀ TRÊN ĐẤT

Các đoạn cổ chỉ được dùng sau `LEGAL_GATE` và `MODERN_SAFETY_HARD_GATE`.

## PLAC-001

**[ORIGINAL]** 廳堂門廡先立位，東廂西塾及庖廚，庭院樓臺園圃地。  

**[HÁN-VIỆT]** Sảnh đường môn vũ tiên lập vị, Đông sương Tây thục cập bào trù, đình viện lâu đài viên phố địa.  

**[DỊCH SÁT]** Văn bản nói trước hết phải định vị các không gian chính như sảnh/đường/cửa-hiên, rồi mới xét các dãy bên, bếp, sân, lầu và vườn.  

**[BIÊN TẬP]** Đây là motif 'planning hierarchy': định các thành phần chính trước thành phần phụ. Một số danh từ kiến trúc cổ không nên ép sang đúng phòng hiện đại.  

**State:** `CORE_PLANNING_SEQUENCE`

---

## PLAC-002

**[ORIGINAL]** 門外不須更架屋，蔽卻好山壞明堂。  

**[HÁN-VIỆT]** Môn ngoại bất tu cánh giá ốc, tế khước hảo sơn hoại minh đường.  

**[DỊCH SÁT]** Bên ngoài cửa không nên dựng thêm nhà làm che khuất cảnh phía trước và làm hỏng minh đường theo cách nói của văn bản.  

**[BIÊN TẬP]** Chuyển thành observable: front obstruction / front openness. Không mặc định phải nhìn thấy núi ở nhà đô thị.  

**State:** `CORE_FRONT_OPENNESS_MOTIF`

---

## PLAC-003

**[ORIGINAL]** 造屋從來有次第，先內及外起自堂。  

**[HÁN-VIỆT]** Tạo ốc tòng lai hữu thứ đệ, tiên nội cập ngoại khởi tự đường.  

**[DỊCH SÁT]** Việc dựng nhà được nói là có thứ tự, từ phần trong ra ngoài và khởi từ nhà/đường chính.  

**[BIÊN TẬP]** Giữ là construction/planning sequence truyền thống, không biến thành yêu cầu kết cấu hiện đại.  

**State:** `CORE_SEQUENCE_MOTIF`

---

## PLAC-004

**[ORIGINAL]** 先造兩廊不造堂。  

**[HÁN-VIỆT]** Tiên tạo lưỡng lang bất tạo đường.  

**[DỊCH SÁT]** Văn bản phản đối việc dựng hai dãy hành lang/cánh bên trước mà chưa dựng nhà chính.  

**[BIÊN TẬP]** Tách traditional outcome khỏi lời khuyên về thứ tự bố cục.  

**State:** `SEQUENCE_MOTIF_OUTCOME_SEPARATED`

---

## PLAC-005

**[ORIGINAL]** 莫道明堂外自有，不知門內是明堂。  

**[HÁN-VIỆT]** Mạc đạo minh đường ngoại tự hữu, bất tri môn nội thị minh đường.  

**[DỊCH SÁT]** Đừng chỉ cho rằng minh đường nằm ở bên ngoài; văn bản cho rằng bên trong cửa cũng có thể là minh đường.  

**[BIÊN TẬP]** Quan trọng cho nhà đô thị: courtyard/front court bên trong cổng có thể là một lớp không gian mở; không đồng nhất minh đường với vỉa hè/đường phố.  

**State:** `CORE_INTERNAL_OPEN_SPACE_MOTIF`

---

## PLAC-006

**[ORIGINAL]** 天井不可作一字……一丈必須五尺闊，長短折半隨所至。  

**[HÁN-VIỆT]** Thiên tỉnh bất khả tác nhất tự... nhất trượng tất tu ngũ xích khoát, trường đoản chiết bán tùy sở chí.  

**[DỊCH SÁT]** Đoạn văn phản đối một dạng thiên tỉnh 'nhất tự' và đưa ra một tỷ lệ bằng đơn vị trượng–xích, trong đó bề rộng được nêu bằng khoảng một nửa một chiều dài trong văn cảnh.  

**[BIÊN TẬP]** Đây là HISTORICAL_NUMERIC_CLAIM thật sự, khác với ngưỡng % do AI tự bịa. Cần kiểm scan/punctuation trước khi formalize tỷ lệ production.  

**State:** `HISTORICAL_NUMERIC_CLAIM_SCAN_CHECK_REQUIRED`

---

## PLAC-007

**[ORIGINAL]** 堂前門廊不可空。  

**[HÁN-VIỆT]** Đường tiền môn lang bất khả không.  

**[DỊCH SÁT]** Đoạn văn cho rằng phần cửa/hành lang phía trước nhà chính không nên để theo dạng bị mô tả là 'không'.  

**[BIÊN TẬP]** Nghĩa kỹ thuật của 空 trong câu cần thêm văn cảnh/đồ hình; chưa sinh rule geometry.  

**State:** `SEMANTIC_UNRESOLVED`

---

## PLAC-008

**[ORIGINAL]** 凡宅，天井中不可積屋水。  

**[HÁN-VIỆT]** Phàm trạch, thiên tỉnh trung bất khả tích ốc thủy.  

**[DỊCH SÁT]** Trong thiên tỉnh/sân trong không nên để nước từ nhà tích đọng.  

**[BIÊN TẬP]** Có thể song song với drainage engineering, nhưng phán bệnh tật đi kèm trong cổ văn không được coi là quan hệ nhân quả.  

**State:** `CORE_DRAINAGE_MOTIF`

---

## PLAC-009

**[ORIGINAL]** 凡宅側屋，不可衝大門。  

**[HÁN-VIỆT]** Phàm trạch trắc ốc, bất khả xung đại môn.  

**[DỊCH SÁT]** Nhà/cánh phụ bên cạnh không nên tạo thế xung trực tiếp với đại môn theo văn bản.  

**[BIÊN TẬP]** Geometry cần trục của side-building và gate opening; chỉ từ 'có nhà phụ' chưa đủ.  

**State:** `GEOMETRY_CANDIDATE`

---

## PLAC-010

**[ORIGINAL]** 凡宅開門路及車門，不要直射，謂之穿心殺。  

**[HÁN-VIỆT]** Phàm trạch khai môn lộ cập xa môn, bất yếu trực xạ, vị chi xuyên tâm sát.  

**[DỊCH SÁT]** Lối cửa và cửa xe không nên tạo thế trực xạ; văn bản gọi đó là 'xuyên tâm sát'.  

**[BIÊN TẬP]** Chỉ giữ geometry motif direct-axis. Traditional severe outcome bị tách hoàn toàn.  

**State:** `ACCESS_AXIS_CANDIDATE`

---

## PLAC-011

**[ORIGINAL]** 凡宅屋角，不可漫街。  

**[HÁN-VIỆT]** Phàm trạch ốc giác, bất khả mạn nhai.  

**[DỊCH SÁT]** Góc nhà không nên vươn/lấn ra đường theo lời văn.  

**[BIÊN TẬP]** Từ 漫街 cần semantic check; hiện đại mọi phần công trình phải tôn trọng ranh đất/chỉ giới và an toàn giao thông.  

**State:** `LEGAL_PARALLEL_SEMANTIC_CHECK`

---

## PLAC-012

**[ORIGINAL]** 大凡人家建立新宅，莫要先築牆。  

**[HÁN-VIỆT]** Đại phàm nhân gia kiến lập tân trạch, mạc yếu tiên trúc tường.  

**[DỊCH SÁT]** Khi dựng nhà mới, văn bản khuyên không xây tường bao trước.  

**[BIÊN TẬP]** Đây là sequence/taboo truyền thống, không phải lệnh thi công hiện đại. Biện pháp thi công, rào chắn công trường phải theo an toàn/pháp luật.  

**State:** `TRADITIONAL_SEQUENCE_ONLY`

---
