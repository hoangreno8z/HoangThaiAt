# Kiểm toán nguồn Vấn đáp — Chương 01

Ngày đối chiếu: 2026-09-06. Phạm vi: **Lập Cực Định Vị, câu 01–10**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Git status ban đầu sạch; SHA ban đầu: `a87ed5fed6fdb388f81bd4528cf666fda4011d9e`.
- Nhánh dự phòng: `backup/van-dap-ch01-a87ed5f`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js`, lớp `HoiDapUI`; CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 1 đúng 10 câu với ID 1–10. Danh mục chương và 90 đối tượng câu 11–100 được kiểm tra bằng so sánh sâu với SHA ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 01 | Lộ Xung Sát | Không lấy đường thẳng hoặc khoảng cách cố định để quyết định tai họa | Hình thế; đường/môn trong Thiên Nguyên Ngũ Ca; chuyển dụng đô thị |
| 02 | Hoàn Bão Thủy | Phân biệt vị trí với đường cong; không đồng nhất nước thật và xe | Hình thế thủy trong Táng Thư; chuyển dụng đường cong |
| 03 | Tiễn Đao Sát | Ngã T, ngã Y, xung cửa và xung góc là các cấu hình khác nhau | Hình thế; tên truyền thị; đối chiếu đường/môn |
| 04 | Bế Khí Thủy | Hẻm cụt không tự động là tụ thủy hay khí chết; bỏ hội thoại rác | Hình thế; đường nội/ngoại; thông thoáng và thoát nước |
| 05 | Cận Viễn Thủy | Phân tích quan hệ tiếp cận từng làn thay vì chỉ chọn làn gần | Đường/môn; mô hình hư thủy; giao thông hiện đại |
| 06 | Nghịch Khí Cục | Tách cao độ nền, dốc mặt đường, thoát nước và tọa hướng | Hình thế và khảo sát kỹ thuật |
| 07 | Tà Môn Khẩu | Tách hướng nhà, hướng khung cửa, góc cánh cửa và vòng la kinh | Quy ước đo; Tam Hợp/Tam Nguyên không hoán đổi |
| 08 | Xạ Hạp Sát | Không suy tốc độ gió chỉ từ bề rộng hẻm; không áp bảng 144 chung | Tàng phong; chuyển dụng đô thị; khí động học |
| 09 | Lưỡng Môn Khẩu | Cửa sử dụng nhiều không tự thay toàn bộ tọa hướng nhà | Dương trạch, môn/lộ và điều kiện truyền thừa |
| 10 | Ám Thủy Nghịch | Sửa nguồn câu nội/ngoại khí; tách nước cống, nước mặt và luồng xe | Thanh Ô Kinh; phân hệ thoát nước hiện đại |

## Schema và cách đọc mức chứng cứ

Giữ các trường hiện hữu: `index`, `chapter`, `chapter_title`, `title`, `subtitle`, `topo`, `hanzi`, `hanviet`, `meaning`, `qi_mechanism`, `hoa_phuc`, `remediation`. Thêm `sources[]` cho riêng 10 câu; mỗi nguồn lưu `id`, `title`, `section`, `url`, `author`, `attributionStatus`, `evidenceLevel`, `quote`, `note`.

`VERIFIED` chỉ xác nhận văn bản trích tìm thấy trong nguồn nêu rõ, hoặc phép suy toán được chứng minh; không xác nhận hiệu nghiệm của phán đoán phong thủy. `SUPPORTED`, `LINEAGE_DEPENDENT`, `MODERN_EXTENSION`, `UNRESOLVED` được hiểu ở cấp luận điểm/nguồn, không gán cả bài thành chân lý. Tác giả đề tên truyền thống được phân biệt với tác giả đã chứng minh; bản chép lại được phân biệt với hình ảnh cổ bản. Không xem nhãn trên chính website là bằng chứng độc lập.

Nguồn cổ là nền cho cách quan sát hình thế và môn/lộ. Phần giải nghĩa biên soạn mới, phép chuyển dụng đường/xe và kiến thức kỹ thuật được ghi rõ trong từng bài. Không tạo bảng Tứ Cục/12 Trường Sinh mới khi chưa có hướng, thủy khẩu, quy ước la bàn và bản truyền thừa để tính; không sửa engine hoặc dữ liệu 144 của module khác.

Bộ hiển thị chỉ chọn bố cục bài đã khảo chứng khi `chapter === 1 && sources`; gom nội dung thành năm phần, kèm nguồn có liên kết và mức chứng cứ bằng tiếng Việt. Phần giới thiệu riêng khi mở chương 1 được sửa cho đúng phạm vi. Chương khác dùng nhánh hiển thị cũ; theme và routing giữ nguyên. Ba tham chiếu tài nguyên Hỏi đáp trong `index.html` đổi phiên bản để nhận nội dung mới.

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 01 | Táng Thư, Dương Trạch Tam Yếu, Khẩu quyết Hình thế | Gán nhãn cồng kềnh trong Hán văn, áp ngưỡng cứng 100m | 《葬書》, 《雪心賦》 | VERIFIED | Bỏ markdown/nhãn trong Hán văn, bỏ ngưỡng mét bịa, phân tầng Chân/Hư thủy, bổ sung phép đo và thứ tự ưu tiên hóa giải |
| 02 | Táng Thư, Thanh Nang Tự, Thủy Long Kinh | Gán phản cung suy diễn con cái bỏ đi, thiếu phân tích ly tâm | 《葬書》, 《青囊序》 | VERIFIED | Trích đúng câu cổ, giải thích cơ chế ly tâm/đèn pha xe cộ, bỏ phán đoán mê tín, đưa giải pháp cách âm và tường rào |
| 03 | Tuyết Tâm Phú, Khẩu quyết Dương Tùng, Thủy Long Kinh | Lẫn lộn ngã ba T và Y, suy diễn đau ốm theo góc nhà | 《雪心賦》, Khẩu quyết Hình thế | VERIFIED / LINEAGE_DEPENDENT | Phân biệt rõ ngã T và Y, giải thích cơ chế điểm nghẽn giao thông, bỏ phán bệnh tật, đề xuất vát góc và vùng đệm xanh |
| 04 | Táng Thư, Thanh Nang Tự, Thủy Long Kinh | Tự tạo ngưỡng 3m, 4m, 150m, dính hội thoại AI rác | 《葬書》 (Chu Tước thiên) | VERIFIED | Loại bỏ 100% hội thoại rác, bỏ số mốc cứng, phân tích vi khí hậu (túi khí quẩn, PCCC, thoát hiểm, giếng trời) |
| 05 | Thủy Long Kinh, Địa Lý Ngũ Quyết (AI bịa câu) | Câu Hán AI tự tạo gán cho Tưởng Đại Hồng và Địa Lý Ngũ Quyết | 《葬書》, 《地理辨正》 (Thiên Ngọc Kinh chú) | VERIFIED / SUPPORTED | Thay bằng câu cổ xác thực, phân tích làn xe cận/viễn, giải pháp vỉa hè giật cấp và kính hộp cách âm |
| 06 | Táng Thư (câu sai), Dương Trạch Thập Thư | Ghép sai văn bản Táng Thư, suy diễn bệnh thoái hóa cột sống | 《黃帝宅經》, 《陽宅十書》 (Hình thể ca) | VERIFIED / SUPPORTED | Đính chính kinh văn chuẩn, phân tích thủy văn thoát nước mặt và xói lở móng sau, bổ sung giải pháp tường kè chịu lực |
| 07 | Thanh Nang Áo Ngữ (câu ghép), Thẩm Thị Huyền Không Học | Câu Hán bị AI ghép vế sau, gượng ép phân kim 15-30 độ | 《天玉經》 (Nội Biện Thiên), 《青囊奧語》 | VERIFIED | Khôi phục nguyên văn cổ, tách bạch 3 cấp độ đo (khối nhà, khung cửa, lối đi), cảnh báo tuyến Không Vong, khuyên giữ cửa vuông vức |
| 08 | Táng Thư (câu bịa), Thủy Long Kinh (câu bịa) | Câu Hán AI tự sáng tác gán bừa cho Táng Thư | 《雪心賦》 (Ao phong xạ huyệt) | VERIFIED | Khảo chứng câu chuẩn trong Tuyết Tâm Phú, phân tích hiệu ứng Venturi trong khí động học, đưa giải pháp huyền quan đệm |
| 09 | Dương Trạch Tam Yếu (bịa), Địa Lý Biện Chính (bịa) | Câu Hán do AI tạo ra, phán đoán bệnh thận/đau lưng | 《黃帝宅經》, 《陽宅三要》 (Đại Môn Biện) | VERIFIED / SUPPORTED | Dẫn đúng nguyên văn kinh thư, phân tích Động - Tĩnh khí khẩu, đề xuất thông gió đối lưu trước sau và đảm bảo an toàn PCCC |
| 10 | Nhân Tử Tu Tri (bịa), Táng Thư (ghép sai) | Câu Hán bịa gán cho Từ Thiện Kế, thần bí hóa cống ngầm | 《葬書》 (Nội khí manh sinh) | VERIFIED | Khôi phục nguyên văn Táng Thư, tách bạch hạ tầng ngầm kỹ thuật với long mạch, giải quyết khí H2S/mùi hôi bằng bẫy nước và màng chống thấm |

---

# Kiểm toán nguồn Vấn đáp — Chương 02

Ngày đối chiếu: 2026-09-06. Phạm vi: **Khúc Thủy Chiết Xung, câu 11–20**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 1: `e6851fe8fbfa18f97bb3dd49980d90d7915ec551`.
- Nhánh dự phòng: `backup/van-dap-ch02-e6851fe`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 2), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 2 đúng 10 câu với ID 11–20. Danh mục chương, Chương 1 (câu 01–10) và 80 đối tượng câu 21–100 được kiểm tra bằng so sánh sâu với SHA release Chương 1 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 11 | Cửu Khúc Thủy | Đường uốn nhiều nhịp; loại bỏ nhãn AI gán ghép và số đo cứng | Hình thế thủy trong Táng Thư, Tuyết Tâm Phú; chuyển dụng giao thông |
| 12 | Cung Lõm Thủy | Đáy cung tụ khí; tách bạch hư thủy luồng xe với sông hồ thật | Chu Tước thiên trong Táng Thư; vi khí hậu đô thị |
| 13 | Phản Cung Sát | Loại bỏ phán đoán tán gia bại sản mê tín; phân tích lực ly tâm | Tuyết Tâm Phú, Táng Thư; an toàn giao thông và chấn động xe cộ |
| 14 | Chiết Khí Sát | Loại bỏ thuật ngữ dân gian bịa đặt; phân tích góc ngoặt khuất tầm nhìn | Tuyết Tâm Phú; bán kính khúc cua và góc mù thị giác |
| 15 | Triền Sơn Thủy | Đường bao quanh chân gò/đồi; loại bỏ số đo giả mạo | Táng Thư; an toàn địa chất trượt lở và rãnh thoát nước mái dốc |
| 16 | Bán Cung Trực | Đường nửa cong nửa thẳng; loại bỏ nhị phân giàu/nghèo mê tín | Tuyết Tâm Phú, Táng Thư; tương phản vận tốc lưu thông phương tiện |
| 17 | Điệp Lãng Thủy | Thay danh pháp dân gian "Điệp Lãng Sát"; phân tích địa hình dốc lượn sóng | Thanh Nang Áo Ngữ, Tuyết Tâm Phú; kỹ thuật thoát nước mặt chân dốc |
| 18 | Hồ Lô Khí | Tách hình tượng túi khí đô thị khỏi suy diễn thần bí | Táng Thư, Thanh Nang Tự; lưu thông vi khí hậu và đệm cảnh quan |
| 19 | Trực Tiết Khí | Dốc thẳng xói thẳng; bỏ danh xưng bí truyền tự chế | Táng Thư, Tuyết Tâm Phú; thủy lực dòng chảy bề mặt và bậc tam cấp giật cấp |
| 20 | Triền Thân Thủy | Ba mặt đường bao bán đảo; loại bỏ hội thoại AI rác cuối bài | Táng Thư, Hoàng Đế Trạch Kinh; an ninh đô thị, định vị khí khẩu |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 11 | Cổ quyết Hình thế (AI ghép), Thủy Long Kinh | Gán nhãn cồng kềnh, tự đặt số đo nhịp uốn | 《葬書》, 《雪心賦》 | VERIFIED | Trích đúng kinh văn cổ, giải thích cơ chế giảm vận tốc luồng khí, bổ sung giải pháp vỉa hè đệm và gờ giảm tốc |
| 12 | Táng Thư (ghép sai), Thanh Nang Tự | Tự đặt số đo bán kính cung cong, phán tài lộc tuyệt đối | 《葬書》 (Chu Tước thiên), 《青囊序》 | VERIFIED | Dẫn đúng nguyên văn cổ bản, phân tích khí tụ tại vùng khuất gió ly tâm, đề xuất giải pháp cảnh quan bồn hoa |
| 13 | Tuyết Tâm Phú (sai lệch), Phong thủy yếu quyết | Phán đoán mê tín đoạn tuyệt tử tôn, tai nạn máu me | 《雪心賦》, 《葬書》 | VERIFIED | Bỏ phán đoán mê tín, giải thích cơ chế lực văng ly tâm xe cơ giới, đèn pha quét đêm, giải pháp hàng rào cách âm và cây xanh cản quang |
| 14 | Khẩu quyết dân gian (tự chế danh xưng) | Bịa đặt tên "Triết Triết Khí Sát", thiếu cơ sở kinh điển | 《雪心賦》 | VERIFIED | Khôi phục nguyên lý chiết giác xung xạ kinh điển, phân tích góc chết điểm mù giao thông, đề xuất vát góc tường và gương cầu lồi |
| 15 | Táng Thư (ghép nhãn), Địa Lý Toàn Thư | Đưa mốc mét và % dốc bịa đặt, thần bí hóa long mạch | 《葬書》 | VERIFIED | Dẫn nguyên văn Táng Thư, giải thích an toàn cơ học đất sườn đồi, dòng bùn đất mùa mưa bão, thiết kế mương đón nước sườn dốc |
| 16 | Thủy Long Kinh (bịa), Tuyết Tâm Phú | Chia nửa cát nửa hung theo mét máy móc | 《雪心賦》, 《葬書》 | VERIFIED | Phân tích xung đột động học giữa đoạn thẳng gia tốc và đoạn cua giảm tốc, giải pháp hàng cây phân tầng giảm chấn |
| 17 | Khẩu quyết (bịa danh "Điệp Lãng Sát") | Tự bịa Hán văn về sóng nước đập vào nhà | 《青囊奧語》, 《雪心賦》 | VERIFIED | Khảo chứng câu chuẩn trong kinh văn cổ, phân tích quán tính xe trôi dốc và nước tràn chân dốc khi mưa lớn, giải pháp rãnh thu nước ngầm |
| 18 | Táng Thư (bịa), Thủy Long Kinh | Thần bí hóa bình hồ lô tích tài vượng phát | 《葬書》, 《青囊序》 | VERIFIED | Giải thích nguyên lý thắt hẹp điều tiết tốc độ gió, giải pháp sân trong giếng trời thông gió tự nhiên, cây xanh lọc bụi |
| 19 | Khẩu quyết bí truyền (AI tự phong), Táng Thư | Tự chế câu chữ cổ, dọa dẫm tán gia bại sản | 《葬書》, 《雪心賦》 | VERIFIED | Khảo chứng nguyên văn chuẩn, phân tích động năng dòng nước mặt xói mòn chân móng, đề xuất bậc tam cấp phân dòng và gờ chắn nước |
| 20 | Táng Thư (sai vế), dính hội thoại AI rác | Dính 1 đoạn dài hội thoại AI rác và ghi chú phần II cuối bài | 《葬書》, 《黃帝宅經》 | VERIFIED | Loại bỏ 100% rác AI, dẫn đúng kinh văn Hoàng Đế Trạch Kinh & Táng Thư, phân định động khí và tĩnh khí, mở cổng nạp khí vượng |

---

# Kiểm toán nguồn Vấn đáp — Chương 03

Ngày đối chiếu: 2026-09-06. Phạm vi: **Kỳ Lộ Giao Xoa, câu 21–30**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 2: `dec1e5e` (chứa đầy đủ Chương 1 & Chương 2 đã nghiệm thu).
- Nhánh dự phòng: `backup/van-dap-ch03-dec1e5e`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 3), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 3 đúng 10 câu với ID 21–30. Danh mục chương, Chương 1 (câu 01–10), Chương 2 (câu 11–20) và 70 đối tượng câu 31–100 được kiểm tra bằng so sánh sâu với SHA release Chương 2 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 21 | Song Xuyên Sát | Cục chữ H kẹp giữa hai ngã ba; phân định Thiên Môn nạp sinh khí và Địa Hộ khóa bế | Táng Thư, Nhập Địa Nhãn Đồ Thuyết; hiệu ứng đường hầm đô thị |
| 22 | Xuyên Tâm Sát | Cửa trước đối thẳng cửa sau; phân biệt thông gió tự nhiên với gió giật Venturi | Hoàng Đế Trạch Kinh, Dương Trạch Thập Thư; huyền quan đệm |
| 23 | Phân Thủy Khẩu | Ngã ba chữ Y chẻ đôi dòng lộ; loại bỏ phán đoán bi ai thần bí, phân tích điểm nghẽn rẽ | Thiên Ngọc Kinh, Táng Thư; an toàn giao thông và giảm chấn |
| 24 | Trực Xung Vượng | Tuyến đường đâm đắc vận; phân biệt xung lực vật lý thực tế với lý thuyết la kinh | Dương Trạch Tập Thành, Thiên Ngọc Kinh; khoảng lùi thương mại |
| 25 | Giao Kiếm Sát | Ngã tư cắt chéo góc nhọn; loại bỏ số đo góc giả định (< 45°), phân tích góc chết | Thủy Long Kinh, Táng Thư; vát góc công trình và an toàn giao thông |
| 26 | Toàn Oa Thủy | Bùng binh vòng xoay đa khẩu; loại bỏ văn bản dính tiếng Việt trong Hán văn | Thẩm Thị Huyền Không Học, Táng Thư; phân tích tiếp tuyến (tang tuyến) |
| 27 | Đao Khắc Sát | Mũi nhọn dải phân cách con lươn; giải mã Hỏa hình tiêm xạ và chấn thương quang học | Tuyết Tâm Phú, Thanh Nang Tự; gờ giảm tốc và bồn hoa bán nguyệt |
| 28 | Tà Xạ Sát | Tuyến đường đâm xiên sườn nhà; loại bỏ dán nhãn giới tính mê tín, phân tích xung sườn | Dương Trạch Thập Thư, Tuyết Tâm Phú; cách âm cách nhiệt mạn sườn |
| 29 | Ngũ Quỷ Sát | Ngã năm hỗn loạn không đảo điều tiết; khử bỏ màu sắc ma quỷ, phân tích nội minh đường | Táng Thư, Địa Lý Ngũ Quyết; khoảng lùi sân vườn và cửa kính cách âm |
| 30 | Mũi Tàu Sát | Khu đất mũi tàu hai dòng hợp lưu; phân tích áp lực gió đỉnh chóp và điểm ngắm thương mại | Táng Thư, Tuyết Tâm Phú; bo tròn góc mũi tàu và bố trí lối vào an toàn |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 21 | Táng Thư (ghép), Nhân Tử Tu Tri | Dính nhãn cồng kềnh, gán ghép văn bản | 《葬書》, 《入地眼圖說》 | VERIFIED / SUPPORTED | Trích đúng câu cổ, giải thích cơ chế đối lưu hai ngã ba, thiết lập huyền quan và phân tầng cửa trước/sau |
| 22 | Hoàng Đế Trạch Kinh (ghép), Khẩu quyết | Nhãn Hán văn cồng kềnh, câu rác truyền thị | 《黃帝宅經》 (Tổng luận), 《陽宅十書》 | VERIFIED / SUPPORTED | Dẫn đúng kinh văn chuẩn, phân tích hiệu ứng Venturi trong khí động học, đưa giải pháp bình phong bẻ cong dòng khí |
| 23 | Thiên Ngọc Kinh (ghép nhãn), Táng Thư | Tự chế nhãn gán ghép, thần bí hóa Chu Tước bi khốc | 《天玉經》, 《葬書》 (Chu Tước thiên) | VERIFIED | Dẫn đúng nguyên văn, phân tích tiếng ồn rẽ dòng và đèn pha ban đêm, đề xuất đảo cây xanh tam giác cản xung |
| 24 | Dương Trạch Tập Thành, Thiên Ngọc Kinh | Ngộ nhận đường đâm không cần hóa giải nếu đắc vận | 《陽宅集成》, 《天玉經》 | SUPPORTED / VERIFIED | Làm rõ rủi ro cơ học trực diện, phân biệt công trình thương mại có minh đường lớn với nhà ở gia cư |
| 25 | Thủy Long Kinh (ghép), Táng Thư | Tự chế góc đo < 45° và > 135°, dính nhãn cồng kềnh | 《水龍經》, 《葬書》 | VERIFIED | Khảo chứng câu chuẩn, phân tích hai vệt áp suất động cắt chéo, giải pháp vát góc tường và mở lối vào an toàn |
| 26 | Thẩm Thị Huyền Không Học (dính tiếng Việt), Táng Thư | Đoạn Hán văn dính liền tiếng Việt giải nghĩa thô | 《沈氏玄空學》, 《葬書》 | VERIFIED | Khôi phục Hán văn sạch 100%, phân tích cơ chế vòng xoay minh đường động, xác định tiếp tuyến nạp khí |
| 27 | Ngũ Tinh Hình Quyết (tự xưng), Hỏa Tinh Sa Quyết | Câu Hán AI tự ghép nhãn, dọa nạt quan phi hỏa hoạn | 《雪心賦》, 《青囊序》 | VERIFIED / SUPPORTED | Khảo chứng câu chuẩn trong kinh văn cổ, phân tích điểm phân luồng xung đột giao thông, giải pháp bồn hoa bo tròn |
| 28 | Dương Trạch Thập Thư (dính tiếng Việt), Khẩu quyết | Dính tiếng Việt trong Hán văn, phán hại nam hại nữ | 《陽宅十書》, 《雪心賦》 | VERIFIED / SUPPORTED | Bỏ phán đoán mê tín, phân tích rung chấn vi mô tường hông và tiếng ồn dội phòng ngủ, giải pháp tiêu âm mạn sườn |
| 29 | Bát Trạch (dính tiếng Việt trong Hán), Địa Lý Thủy Khẩu | Dính tiếng Việt trong Hán, thần bí hóa sao Liêm Trinh | 《葬書》, 《地理五訣》 | VERIFIED / SUPPORTED | Khôi phục nguyên văn cổ, phân tích nút giao 5 ngã đa xung đột, đề xuất lập nội minh đường và giếng trời lấy gió sạch |
| 30 | Thiên Ngọc Kinh, Hợp Cấm La Tinh Quyết | Dính nhãn cồng kềnh, phân tích thiếu ranh giới | 《葬書》, 《雪心賦》 | VERIFIED / SUPPORTED | Dẫn đúng nguyên văn Táng Thư & Tuyết Tâm Phú, phân tích giá trị nhận diện thương mại đối chiếu với rủi ro va đập đỉnh chóp |

---

# Kiểm toán nguồn Vấn đáp — Chương 04

Ngày đối chiếu: 2026-09-06. Phạm vi: **Thâm Hẻm Bế Khí, câu 31–40**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 3: `3845404` (chứa đầy đủ Chương 1, 2, 3 đã nghiệm thu).
- Nhánh dự phòng: `backup/van-dap-ch04-3845404`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 4), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 4 đúng 10 câu với ID 31–40. Danh mục chương, Chương 1 (câu 01–10), Chương 2 (câu 11–20), Chương 3 (câu 21–30) và 60 đối tượng câu 41–100 được kiểm tra bằng so sánh sâu với SHA release Chương 3 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 31 | Tiệt Khí Sát | Hẻm nhánh xương cá trút vào hông; phân biệt can đạo và chi đạo | Thiên Ngọc Kinh, Tuyết Tâm Phú; tiêu âm vách sườn và vát góc cua |
| 32 | Thủy Tận Khí | Nhà cuối hẻm cụt; phân định khí tụ hay khí tán, loại bỏ liên kết kho rác | Táng Thư, Hoàng Đế Trạch Kinh; giếng trời đối lưu và PCCC |
| 33 | Nội Minh Đường | Sân chung cuối hẻm; xác định trung minh đường cụm dân cư | Địa Lý Ngũ Quyết, Thủy Long Kinh; rãnh thu nước mặt và cây cảnh |
| 34 | Thúc Khí Sát | Hẻm thắt nút cổ chai; giải mã cơ chế nén khí Venturi và tiếng rít động cơ | Táng Thư (Chu Tước thiên & Nguyên lý); sảnh đệm và gương cầu lồi |
| 35 | Đắc Khí Khẩu | Hẻm miệng hẹp trong rộng; giải mã thế nở hậu tụ khí thanh lọc xô bồ | Địa Lý Ngũ Quyết, Thủy Long Kinh; vi khí hậu yên bình ngõ phố |
| 36 | Xạ Cốt Sát | Hẻm sâu hun hút hai vách cao kẹp chặt; giải mã gió hẻm vực đô thị | Táng Thư, Nhập Địa Nhãn Đồ Thuyết; mặt tiền giật cấp bẻ gãy luồng gió |
| 37 | Cát Cước Thủy | Đường hẻm cọ sát mép móng; phân biệt Ám Củng hộ vệ với cát cước cào chân | Thủy Long Kinh, Táng Thư; gờ bê tông chống va và ốp đá chống ẩm |
| 38 | Hãm Oa Thủy | Đáy hẻm trũng thấp đọng nước và khí lạnh; giải mã bẫy nghịch nhiệt | Táng Thư, Tuyết Tâm Phú, Hoàng Đế Trạch Kinh; tôn nền và máy bơm |
| 39 | Dương Trường Thủy | Hẻm ngoằn ngoèo ruột dê; giải mã cơ chế giảm tốc và hữu tình che chở | Thủy Long Kinh, Táng Thư, Nhập Địa Nhãn Đồ Thuyết; đèn cảm ứng |
| 40 | Hồi Phong Sát | Cửa đối diện tường đầu hồi đặc chắn; giải mã thế Án Bức dội ngược khí | Táng Thư, Tuyết Tâm Phú, Hoàng Đế Trạch Kinh; đèn daylight và giếng sau |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 31 | Thủy Long Kinh (ghép nhãn), Tuyết Tâm Phú | Tự chế nhãn gán ghép, đưa số đo cứng 4m, 1.5m | 《天玉經》, 《雪心賦》 | VERIFIED | Trích đúng câu cổ, giải thích cơ chế phân lưu can chi, đề xuất vách cách âm và vát góc mở tầm nhìn |
| 32 | Táng Thư (ghép), dính ghi chú kho rác | Dính đoạn text rác "Kết nối kho: nguyên tắc bốn tham số..." | 《葬書》, 《黃帝宅經》 (Tổng luận) | VERIFIED | Loại bỏ 100% rác AI, dẫn đúng kinh văn chuẩn, phân tích giếng trời đối lưu và an toàn thoát hiểm PCCC |
| 33 | Minh Đường tam cấp (tự xưng), Thủy Khẩu quyết | Dính nhãn cồng kềnh, thiếu nguồn kinh điển | 《地理五訣》, 《水龍經》 | VERIFIED / SUPPORTED | Dẫn đúng nguyên văn, giải thích cơ chế nội minh đường cụm dân cư, giải pháp rãnh thu nước mặt |
| 34 | Táng Thư (ghép nhãn), Long Pháp Thúc Khí | Tự chế nhãn gán ghép, dọa dẫm Chu Tước bi khốc | 《葬書》 (Chu Tước thiên & Nguyên lý) | VERIFIED | Dẫn đúng nguyên văn Táng Thư, phân tích hiệu ứng Venturi tăng vận tốc gió, đề xuất sảnh đệm và gương cầu lồi |
| 35 | Nhân Tử Tu Tri, Quyết truyền thị | Đưa số đo cứng 1.5m, 5m, dính nhãn cồng kềnh | 《地理五訣》, 《水龍經》 | VERIFIED / SUPPORTED | Dẫn đúng lời bàn Tưởng Đại Hồng, phân tích cơ chế miệng hẹp cản ồn trong rộng tụ khí êm |
| 36 | Táng Thư, Phong Sát quyết | Đưa số đo giả định 100m, 1.2m, dính nhãn | 《葬書》, 《入地眼圖說》 | VERIFIED / SUPPORTED | Khảo chứng câu chuẩn, phân tích hiệu ứng hẻm vực (street canyon), giải pháp mặt tiền giật cấp nạp khí |
| 37 | Thủy Long Kinh, Táng Thư | Dính nhãn cồng kềnh, phân tích lẫn lộn hộ vệ | 《水龍經》, 《葬書》 | VERIFIED | Khôi phục Hán văn sạch, phân tích rung chấn cơ học chân móng, giải pháp gờ chắn và ốp đá chống thấm |
| 38 | Táng Thư, Hình Thế quyết, Đài Cơ quyết | Dính nhãn cồng kềnh, thần bí hóa âm hàn | 《葬書》, 《雪心賦》, 《黃帝宅經》 | VERIFIED / SUPPORTED | Dẫn đúng kinh văn chuẩn, phân tích hiện tượng nghịch nhiệt và vi khuẩn yếm khí, giải pháp tôn nền vượt trội |
| 39 | Thủy Pháp quyết, Táng Thư | Dính nhãn cồng kềnh, phân tích thiếu ranh giới | 《水龍經》, 《葬書》, 《入地眼圖說》 | VERIFIED / SUPPORTED | Khảo chứng câu chuẩn, giải thích cơ chế giảm tốc tự nhiên của các khúc cua ruột dê, chọn cung lõm đặt cổng |
| 40 | Táng Thư, Triều Án hệ | Dính nhãn cồng kềnh, đưa tỷ lệ số đo áp bức | 《葬書》, 《雪心賦》, 《黃帝宅經》 | VERIFIED / SUPPORTED | Dẫn đúng nguyên văn kinh điển, phân tích vùng xoáy áp suất âm trước bức tường đặc, giải pháp đèn daylight và giếng trời sau |

---

# Kiểm toán nguồn Vấn đáp — Chương 05

Ngày đối chiếu: 2026-09-06. Phạm vi: **Cao Không Thủy Sát, câu 41–50**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 4: `e0610c5` (chứa đầy đủ Chương 1, 2, 3, 4 đã nghiệm thu).
- Nhánh dự phòng: `backup/van-dap-ch05-e0610c5`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 5), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 5 đúng 10 câu với ID 41–50. Danh mục chương, Chương 1 (câu 01–10), Chương 2 (câu 11–20), Chương 3 (câu 21–30), Chương 4 (câu 31–40) và 50 đối tượng câu 51–100 được kiểm tra bằng so sánh sâu với SHA release Chương 4 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 41 | Trảm Yêu Sát | Cầu vượt / đường trên cao ngang tầm thắt lưng công trình; phân tầng khí hóa giải xung chấn | Táng Thư, Thanh Nang Kinh; kính cách âm 2 lớp, rèm cản quang và thanh lọc vi khí hậu tầng lầu |
| 42 | Thác Thủy Sát | Cầu vượt cắm trụ dốc đổ xiên dội thẳng áp sát; cơ chế thủy lưu xối xả phóng xuống chân | Táng Thư, Tuyết Tâm Phú; bình phong chuyển hướng dòng khí nạp, tiểu cảnh tụ thủy trước sảnh |
| 43 | Áp Đỉnh Sát | Nhà kẹp dưới gầm dạ cầu hoặc đường trên cao che phủ; hóa giải bóng râm âm u và đè nén | Hoàng Đế Trạch Kinh (Tổng luận & Ngũ Hư Ngũ Thực); bổ sung quang phổ nhân tạo, giếng trời và quạt áp lực dương |
| 44 | Cao Phản Cung | Cầu vượt uốn cong lưng chém vào ban công tầng cao; phân biệt nội hoàn bao bọc với ngoại phản cắt xé | Thủy Long Kinh, Táng Thư; vách kính cường lực dán phim tán xạ, bồn cây xanh cản bụi và tán xung khí |
| 45 | Thôn Hư Sát | Đường trên cao chạy sát vách tạo hốc hút gió bụi mù; bẫy áp suất chân không và vi chấn động | Táng Thư, Tuyết Tâm Phú; thiết kế cửa kín khí (air-tight), lam chắn gió khí động học bẻ gãy lực hút |
| 46 | Kình Thiên Trụ | Trụ bê tông cầu vượt đồ sộ án ngữ trước mặt tiền; giải phóng thị giác Minh Đường bị nghẽn | Tuyết Tâm Phú, Táng Thư; chuyển trục tiếp cận sảnh chính, chiếu sáng nghệ thuật và thảm xanh che chắn |
| 47 | Quyển Liêm Hầm | Cửa hầm chui / dốc hầm xe đâm nghiêng trước cửa; cơ chế dốc tuột cuốn bay sinh khí | Táng Thư, Thủy Long Kinh; gờ chắn đổi dốc, bậc tam cấp nâng cốt và bồn cây xanh giữ tụ tụ khí |
| 48 | Hoành Thước Khóa | Cầu vượt đi bộ bắc ngang ngang mắt chắn Minh Đường; giải tỏa thế then cài cửa và góc nhìn xâm phạm | Tuyết Tâm Phú, Táng Thư; rèm cuốn một chiều, nâng vòm đón khí và tiểu cảnh nội đình thanh thoát |
| 49 | Lập Thể Thủy | Nút giao lập thể nhiều tầng chằng chịt bao vây; phân biệt hư thủy đắc vận với loạn lưu xung sát | Thẩm Thị Huyền Không Học, Thiên Ngọc Kinh, Táng Thư; đo la bàn chính xác từ tâm trạch, mở nạp khí ở phương vị sinh vượng |
| 50 | Triệt Khí Sát | Nhánh cầu vượt cắt chéo chia cắt không gian; cân bằng lại thế trạch xiên xẹo mất phương vị | Tuyết Tâm Phú, Táng Thư; tạo khoảng lùi đệm, nắn vuông vắn nội thất và định vị trục khí chủ đạo |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 41 | Táng Thư (ghép), Trảm Yêu Quyết | Câu Hán AI tự chế nhãn, đưa số đo cứng 3 tầng lầu | 《葬書》, 《青囊經》 | VERIFIED | Trích đúng kinh văn chuẩn, phân tích cơ chế cắt tầng khí quyển và vi chấn động tần số thấp, giải pháp kính cách âm 2 lớp |
| 42 | Táng Thư, Thủy Triều Quyết | Gán ghép nhãn cồng kềnh, dọa tuyệt đinh phá sản | 《葬書》, 《雪心賦》 | VERIFIED | Dẫn đúng nguyên văn Táng Thư & Tuyết Tâm Phú, phân tích động năng phương tiện đổ dốc và bụi khói cuốn theo, giải pháp bình phong |
| 43 | Hoàng Đế Trạch Kinh (dính tiếng Việt), Táng Thư | Dính tiếng Việt trong Hán văn, dọa âm khí tà ma | 《黃帝宅經》 (Tổng luận & Ngũ Hư Ngũ Thực) | VERIFIED | Khôi phục Hán văn sạch 100%, phân tích thiếu hụt quang thông và tích tụ vi khí hậu ẩm lạnh, giải pháp chiếu sáng nhân tạo toàn phổ |
| 44 | Thủy Long Kinh (ghép), Táng Thư | Tự chế nhãn gán ghép, dọa lưỡi đao chém đứt gia tài | 《水龍經》, 《葬書》 | VERIFIED | Dẫn đúng nguyên văn Thủy Long Kinh, giải thích lực ly tâm cơ học và vệt đèn pha quét ban đêm, giải pháp phim cản nhiệt tán xạ |
| 45 | Táng Thư, Hư Phong Quyết | Dính nhãn cồng kềnh, đưa số đo giả định 1m | 《葬書》, 《雪心賦》 | VERIFIED | Dẫn đúng kinh văn chuẩn, giải mã hiệu ứng áp suất âm Bernoulli hút khí và bụi mịn, đề xuất cửa kính kín khí và lam chắn gió |
| 46 | Tuyết Tâm Phú (ghép), Táng Thư | Câu Hán AI tự ghép nhãn, dọa dẫm trụ đá đè chết | 《雪心賦》, 《葬書》 | VERIFIED | Trích đúng câu chuẩn trong Tuyết Tâm Phú, phân tích cảm giác bức bách thị giác và điểm mù giao thông, giải pháp đổi hướng tiếp cận |
| 47 | Thủy Long Kinh (ghép nhãn), Táng Thư | Dính nhãn cồng kềnh, phân tích thiếu ranh giới | 《葬書》, 《水龍經》 | VERIFIED | Khôi phục Hán văn sạch, phân tích dòng xả khí thải từ hầm xe và lực hút dốc âm, đề xuất tam cấp nâng cốt sàn và gờ đổi dốc |
| 48 | Tuyết Tâm Phú, Triều Án Quyết | Đưa số đo giả định 2m, dính nhãn cồng kềnh | 《雪心賦》, 《葬書》 | VERIFIED | Dẫn đúng kinh văn chuẩn, giải thích thế then ngang cản trở tầm nhìn và ánh sáng, giải pháp rèm cuốn một chiều bảo toàn riêng tư |
| 49 | Thẩm Thị Huyền Không Học (dính tiếng Việt), Thiên Ngọc Kinh | Dính tiếng Việt trong Hán văn, phán toàn họa không phân cát hung | 《沈氏玄空學》, 《天玉經》, 《葬書》 | VERIFIED | Khôi phục nguyên văn cổ, phân biệt hư thủy động tĩnh theo vượng suy thời vận, giải pháp la bàn lập cực tìm phương vị thu nạp khí |
| 50 | Tuyết Tâm Phú, Hình Sát Quyết | Tự chế nhãn gán ghép, dọa dẫm hình đao phạt trạch | 《雪心賦》, 《葬書》 | VERIFIED | Khảo chứng câu chuẩn, giải thích thế trạch bị cắt xéo mất cân đối hình học, đề xuất thiết kế cảnh quan bù góc và nắn trục khí |

---

# Kiểm toán nguồn Vấn đáp — Chương 06

Ngày đối chiếu: 2026-09-06. Phạm vi: **Hạp Phong Tiêm Giác, câu 51–60**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 5: `3a05adc` (chứa đầy đủ Chương 1, 2, 3, 4, 5 đã nghiệm thu).
- Nhánh dự phòng: `backup/van-dap-ch06-3a05adc`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 6), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 6 đúng 10 câu với ID 51–60. Danh mục chương, Chương 1 (câu 01–10), Chương 2 (câu 11–20), Chương 3 (câu 21–30), Chương 4 (câu 31–40), Chương 5 (câu 41–50) và 40 đối tượng câu 61–100 được kiểm tra bằng so sánh sâu với SHA release Chương 5 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 51 | Thiên Trảm Sát | Khe hẹp giữa hai tòa cao ốc chém thẳng vào trạch; cơ chế tăng tốc dòng khí quyển qua khe hẹp | Táng Thư, Tuyết Tâm Phú; hàng cây xanh tán dày, tiền sảnh huyền quan và cửa kính hộp cách âm chịu áp |
| 52 | Khiếu Phong Sát | Tiếng gió rít hú qua khe hẹp kiến trúc tạo thanh sát; phân tích cộng hưởng âm học và hạ âm | Tuyết Tâm Phú, Táng Thư; nẹp nhôm bo tròn triệt tiêu nguồn âm, cửa kính hộp chân không và rèm nỉ tiêu âm |
| 53 | Phản Quang Sát | Vách kính tòa cao ốc phản xạ quang nhiệt thiêu đốt; hội tụ nhiệt quang học và lóa mắt | Hoàng Đế Trạch Kinh, Tuyết Tâm Phú; phim nano-ceramic chống chói, lam chắn nắng tự động và giàn cây xanh |
| 54 | Tứ Bức Thành | Nhà thấp tầng bị bốn bề cao ốc vây kín đáy giếng; cơ chế bế tắc khí đối lưu và thiếu hụt thiên quang | Hoàng Đế Trạch Kinh, Táng Thư; trổ giếng trời thông gió cưỡng bức, đèn quang phổ ban ngày và sơn tường sáng màu |
| 55 | Tiêm Giác Sát | Góc nhọn công trình lân cận chĩa thẳng vào môn hộ; kích ứng thị giác vô thức và bóc tách luồng gió | Tuyết Tâm Phú, Thanh Nang Tự; chậu cây cảnh lá tròn tán dày, rèm cuốn che chắn và ban công vát góc êm dịu |
| 56 | Uế Phong Sát | Miệng tháp giải nhiệt xả hơi nóng và uế khí xông trạch; phát tán vi sinh vật Legionella và hóa chất | Hoàng Đế Trạch Kinh, Táng Thư; đóng kín cửa hướng xả, hệ thống cấp gió tươi HRV lọc HEPA than hoạt tính |
| 57 | Khai Khẩu Sát | Cửa căn hộ mở ra đối diện trực tiếp buồng thang máy; xung đột giao thông đứng và luồng gió pít-tông | Dương Trạch Thập Thư, Táng Thư; thiết kế tiền sảnh huyền quan, gioăng cao su cách âm kép và tay co thủy lực |
| 58 | Khiêu Khí Khẩu | Cửa căn hộ đối diện thang bộ dốc tuột thất tán khí; hiệu ứng ống khói hút thoát khí và trượt dốc | Tuyết Tâm Phú, Thủy Long Kinh; nâng cao ngạch cửa 2–3cm, thảm ấm cúng và đảm bảo cửa thoát hiểm PCCC đóng kín |
| 59 | Nhất Tiễn Sát | Hành lang chung cư dài hun hút đâm thẳng cửa phòng; hiệu ứng đường hầm gió và mất mát tính riêng tư | Dương Trạch Tập Thành, Táng Thư; huyền quan chữ S uốn nắn dòng khí, cửa dày cách âm và tranh phong cảnh |
| 60 | Tượng Hình Thủy | Mái tôn cong và kết cấu kim loại phản xạ quang nhiệt; bức xạ nhiệt đối lưu ngược và tiếng ồn mưa va đập | Tuyết Tâm Phú, Thanh Nang Kinh; chậu cây tán xòe lan can, kính hộp cách âm nhiệt và rèm cuốn chống nóng |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 51 | Táng Thư (ghép), Ao Phong Hệ | Câu Hán AI tự chế nhãn, đưa số đo cứng 1-2m, 30-40 tầng | 《葬書》, 《雪心賦》 | VERIFIED | Trích đúng kinh văn chuẩn, phân tích hiệu ứng Venturi và dải xoáy khí động học, giải pháp hàng cây và huyền quan |
| 52 | Táng Thư (ghép), Chu Tước Khiêu Quyết | Dính nhãn cồng kềnh, phân tích lẫn lộn thanh sát | 《雪心賦》, 《葬書》 | VERIFIED | Dẫn đúng nguyên văn Tuyết Tâm Phú & Táng Thư, phân tích hiện tượng cộng hưởng khí động học và sóng hạ âm, giải pháp nẹp bo tròn |
| 53 | Chu Dịch Thuyết Quái Truyền (ghép) | Trích quẻ Dịch chung chung không sát trạch pháp | 《黃帝宅經》 (Tổng luận), 《雪心賦》 | VERIFIED | Khôi phục trạch pháp chuẩn, giải thích hội tụ nhiệt độ và chói lóa võng mạc, đề xuất phim nano-ceramic và lam chắn nắng |
| 54 | Hoàng Đế Trạch Kinh (dính tiếng Việt) | Dính tiếng Việt trong Hán văn, đưa số đo 2 tầng kẹp 4 tháp | 《黃帝宅經》 (Tổng luận & Ngũ Hư), 《葬書》 | VERIFIED | Khôi phục Hán văn sạch 100%, phân tích bẫy nhiệt và tù đọng vi khí hậu đáy giếng, giải pháp giếng trời và đèn toàn phổ |
| 55 | Hỏa Tinh Sa Quyết (tự xưng) | Câu Hán AI tự ghép nhãn, dọa nạt quan phi hỏa hoạn | 《雪心賦》, 《青囊序》 | VERIFIED | Dẫn đúng nguyên văn kinh điển, phân tích phản xạ phòng vệ hạch hạnh nhân và xoáy tách dòng, đề xuất bình phong cây xanh |
| 56 | Hoàng Đế Trạch Kinh (dính tiếng Việt) | Dính tiếng Việt trong Hán văn, thiếu phân tích kỹ thuật | 《黃帝宅經》 (Tổng luận), 《葬書》 | VERIFIED | Dẫn đúng câu chuẩn, giải mã vi khuẩn Legionella và hơi hóa chất tháp giải nhiệt, đề xuất cấp gió tươi lọc HEPA |
| 57 | Dương Trạch Thập Thư (dính Lược Ý) | Dính nhãn [LƯỢC Ý], dọa mạ môn thoái bại chung chung | 《陽宅十書》 (Môn đối quyết), 《葬書》 | VERIFIED | Khôi phục Hán văn sạch, phân tích hiệu ứng pít-tông buồng thang và tiếng ồn cơ học, giải pháp tiền sảnh huyền quan |
| 58 | Quyển Liêm / Khiên Ngưu Quyết (tự xưng) | Gán ghép nhãn cồng kềnh, dọa tiêu tán tiền của | 《雪心賦》, 《水龍經》 | VERIFIED | Dẫn đúng nguyên văn cổ bản, phân tích hiệu ứng ống khói và trượt dốc tâm lý, giải pháp nâng gờ ngạch cửa ngăn tuột khí |
| 59 | Dương Trạch Tập Thành (dính Lược Ý) | Dính nhãn [LƯỢC Ý], dọa dẫm súng bắn mũi thương | 《陽宅集成》 (Lang chương), 《葬書》 | VERIFIED | Dẫn đúng kinh văn chuẩn, giải mã hiệu ứng đường hầm gió và mất mát riêng tư thị giác, giải pháp huyền quan chữ S |
| 60 | Ngũ Tinh Hình Quyết (tự xưng) | Câu Hán AI tự chế nhãn, phân tích thiếu ranh giới | 《雪心賦》, 《青囊經》 | VERIFIED | Khảo chứng câu chuẩn trong Tuyết Tâm Phú, phân tích bức xạ nhiệt đối lưu và tiếng ồn mưa va đập, giải pháp phủ xanh ban công |

---

# Kiểm toán nguồn Vấn đáp — Chương 07

Ngày đối chiếu: 2026-09-06. Phạm vi: **Chân Hư Tương Phối, câu 61–70**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 6: `69b85fd` (chứa đầy đủ Chương 1, 2, 3, 4, 5, 6 đã nghiệm thu).
- Nhánh dự phòng: `backup/van-dap-ch07-69b85fd`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 7), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 7 đúng 10 câu với ID 61–70. Danh mục chương, Chương 1 (câu 01–10), Chương 2 (câu 11–20), Chương 3 (câu 21–30), Chương 4 (câu 31–40), Chương 5 (câu 41–50), Chương 6 (câu 51–60) và 30 đối tượng câu 71–100 được kiểm tra bằng so sánh sâu với SHA release Chương 6 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 61 | Chân Hư Nghịch | Sông thật và đường xe ngược chiều dòng chảy; cơ chế giao thoa dòng chảy và vi khí hậu giảm tốc | Thủy Long Kinh, Thẩm Thị Huyền Không Học; cổng sảnh tại tiếp tuyến êm đềm, khoảng lùi sân vườn và cửa chớp |
| 62 | Song Hoàn Bão | Sông và đường cùng uốn ngọc đái ôm trọn trạch; lắng tụ bồi đắp thủy lực và giảm tốc an toàn | Táng Thư, Thủy Long Kinh; mở rộng sảnh đón hướng tâm vòng cung, kè sinh thái bậc thang và hồ cá Koi |
| 63 | Phản Ba Sát | Bờ kè thẳng đứng dội ngược sóng va đập cơ học; phản xạ sóng dừng và rung chấn vi mô móng kè | Táng Thư, Tuyết Tâm Phú; kè mái dốc lát đá hộc xốp tiêu năng, cây xanh ngập nước và móng cọc lùi sâu |
| 64 | Động Tĩnh Thủy | Hồ cảnh quan đài phun nước động tĩnh phân định; vi tuần hoàn khí dung, bay hơi làm mát và ion âm | Thanh Nang Áo Ngữ, Táng Thư; vòi phun lăn tăn hướng vượng khí, lọc sinh học tuần hoàn và máy bơm êm |
| 65 | Trực Thủy Tuyệt | Kênh đào nhân tạo thẳng tắp trút dòng cuốn trôi khí; dòng chảy xiết tạo áp suất âm cuốn hơi ẩm | Thủy Long Kinh, Táng Thư; bậc nước tam cấp giảm tốc kênh, hồ cảnh bán nguyệt tụ thủy và hàng cây chống sạt lở |
| 66 | Uế Thủy Sát | Kênh đen bốc mùi hôi thối và trọc khí tràn ngập; phân hủy yếm khí sinh H2S, NH4 và vi khuẩn gây bệnh | Táng Thư, Hoàng Đế Trạch Kinh; tường rào kín kết hợp thảm cây xanh lọc độc, đóng kín cửa mặt kênh và lọc than hoạt tính |
| 67 | Tam Xoa Thủy | Ngã ba sông hội tụ giao thoa cùng ngã ba đường bộ; minh đường khoáng đạt và giao thương đường thủy bộ | Thiên Ngọc Kinh, Thủy Long Kinh; gia cố mũi cừ chống xói lở, sảnh thương mại vát cánh cung và hoa viên nội bộ |
| 68 | Lậu Sào Thủy | Rãnh cống ngầm chảy tuột ngang trước cổng nhà; xói ngầm nền móng và xông khí hố ga ô nhiễm | Địa Lý Ngũ Quyết, Táng Thư; nắp gang đúc kín có roong ngăn mùi, dầm cổng độc lập và tam cấp nâng cao 30-45cm |
| 69 | Triều Đường Mạch | Hàng cọc cầu tàu và bến du thuyền cắm sâu lòng sông; tiêu năng phân tán dòng chảy và lắng đọng phù sa | Thủy Long Kinh, Táng Thư; cọc tròn khí động học giảm cản, sàn composite chống trượt và đèn hắt dịu mắt |
| 70 | Án Sơn Thủy | Cù lao cồn cát nổi giữa dòng sông lớn chắn trước mặt; phân lưu thủy lực, cản sóng gió bão và điều hòa sinh thái | Tuyết Tâm Phú, Thủy Long Kinh; mở tối đa tầm nhìn phòng khách, kiến trúc giật cấp mở và kè sinh thái tự nhiên |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 61 | Táng Thư (ghép) | Trích câu phong thủy chung chung, thiếu lý luận chân hư phối hợp | 《水龍經》, 《沈氏玄空學》 | VERIFIED | Dẫn đúng kinh văn chuyên luận chân thủy và hư thủy, phân tích đệm xoáy giảm tốc, giải pháp bố trí cổng đón khí |
| 62 | Táng Thư (ghép) | Trích đoạn ngắn, phân tích thiếu chiều sâu giao thông và thủy lực | 《葬書》, 《水龍經》 | VERIFIED | Khôi phục nguyên văn cổ bản, phân tích hiện tượng bồi tụ phù sa và giảm tốc an toàn, giải pháp sảnh đón panorama |
| 63 | Táng Thư (ghép) | Dính nhãn cồng kềnh, giải thích sơ sài về rung chấn sóng | 《葬書》, 《雪心賦》 | VERIFIED | Dẫn đúng câu chuẩn, phân tích sóng dừng và xói ngầm hàm ếch móng kè, đề xuất kè mái nghiêng tiêu năng |
| 64 | Tĩnh Động Phân Quy (tự xưng) | Câu Hán AI tự chế nhãn, thiếu kinh điển nền tảng | 《青囊奧語》, 《葬書》 | VERIFIED | Trích đúng câu kinh điển của Dương Quân Tùng & Quách Phác, phân tích ion âm và oxy hòa tan, giải pháp lọc tuần hoàn |
| 65 | Táng Thư (ghép) | Trích đoạn lửng lơ, không làm rõ cơ chế kênh đào nhân tạo | 《水龍經》, 《葬書》 | VERIFIED | Khôi phục nguyên văn Thủy Long Kinh về trực thủy vô tình, phân tích áp suất âm cuốn ẩm, giải pháp hồ bán nguyệt |
| 66 | Thủy Chất Định Cát Quy (tự xưng) | Câu Hán AI tự ghép nhãn, thiếu phân tích độc học môi trường | 《葬書》, 《黃帝宅經》 | VERIFIED | Dẫn đúng chính văn cổ thư, phân tích khí H2S/NH3 phân hủy kỵ khí, đề xuất màng đệm cây xanh hấp thụ độc tố |
| 67 | Thiên Ngọc Kinh (dính Lược Ý) | Dính nhãn [LƯỢC Ý], câu Hán AI tự chế | 《天玉經》 (Nội truyền), 《水龍經》 | VERIFIED | Khôi phục Hán văn sạch 100%, phân tích vùng nước sâu êm đềm và giao thương thủy bộ, giải pháp gia cố mũi kè cừ |
| 68 | Âm Câu Kỵ Quy (tự xưng) | Câu Hán AI tự ghép nhãn, dọa hao tài tốn của chung chung | 《地理五訣》 (Minh đường thiên), 《葬書》 | VERIFIED | Dẫn đúng kinh văn Địa Lý Ngũ Quyết, phân tích sụt lún vi mô nền móng và xông mùi, giải pháp nắp kín và tam cấp cao |
| 69 | Thủy Khẩu Sa Hệ (tự xưng) | Câu Hán AI tự chế nhãn, giải thích lẫn lộn la tinh | 《水龍經》, 《葬書》 | VERIFIED | Dẫn đúng nguyên văn Thủy Long Kinh & Táng Thư, phân tích hệ tiêu năng giảm vận tốc dòng chảy, giải pháp cầu tàu an toàn |
| 70 | Phù Ấn Quyết (tự xưng) | Câu Hán AI tự ghép nhãn, dọa đỗ đầu thi cử sáo rỗng | 《雪心賦》, 《水龍經》 | VERIFIED | Khảo chứng câu chuẩn trong Tuyết Tâm Phú & Thủy Long Kinh, phân tích đê chắn sóng tự nhiên và vi khí hậu sinh thái |

---

# Kiểm toán nguồn Vấn đáp — Chương 08

Ngày đối chiếu: 2026-09-06. Phạm vi: **Địa Cốt Trồi Sụt, câu 71–80**. Không triển khai chương kế tiếp.

## Điểm khôi phục và kiểm kê

- Repository: https://github.com/hoangreno8z/HoangThaiAt ; nhánh triển khai: `main`.
- Điểm kiểm tra release Chương 7: `b74879a` (chứa đầy đủ Chương 1, 2, 3, 4, 5, 6, 7 đã nghiệm thu).
- Nhánh dự phòng: `backup/van-dap-ch08-b74879a`. Dùng nhánh này để xem bản trước; nếu cần hoàn tác production, tạo commit revert cho commit sửa chương rồi triển khai theo luồng hiện có.
- Dữ liệu: `js/hoidap_data.js`, `data/hoidap_data.json`, `window.HOIDAP_CHAPTERS`, `window.HOIDAP_DATA`.
- Bộ hiển thị: `js/hoidap_ui.js` (hỗ trợ `renderReviewedBody` cho tất cả câu có `sources[]`, cập nhật hero description Chương 8), CSS: `css/hoidap.css`; route hiện hữu: `#/van-dap`.
- Kiểm kê: 100 câu; chương 8 đúng 10 câu với ID 71–80. Danh mục chương, Chương 1 (câu 01–10), Chương 2 (câu 11–20), Chương 3 (câu 21–30), Chương 4 (câu 31–40), Chương 5 (câu 41–50), Chương 6 (câu 51–60), Chương 7 (câu 61–70) và 20 đối tượng câu 81–100 được kiểm tra bằng so sánh sâu với SHA release Chương 7 và SHA baseline ban đầu.

| ID | Tiêu đề giữ lại | Trọng tâm cần sửa | Phạm vi trường phái |
|---|---|---|---|
| 71 | Hãm Địa Sát | Nền nhà thấp trũng sâu hơn mặt đường lộ; bẫy tụ khí CO2/ẩm mốc và rủi ro ngập úng tràn ngược | Hoàng Đế Trạch Kinh, Tuyết Tâm Phú; tam cấp nâng cốt nền, mương thu nước ngầm rãnh sỏi và bơm tự động |
| 72 | Triều Tịch Động | Nền đất ven sông biển chịu chấn động thủy triều; biến động áp lực nước lỗ rỗng và xâm nhập mặn | Táng Thư, Thủy Long Kinh; móng cọc sâu qua tầng bùn, màng chống thấm bentonite và bể tự hoại composite |
| 73 | Tiễn Đài Sát | Nhà xây trên mỏm đất dốc nhô cao cắt xén; xói mòn rửa trôi sườn dốc và hiệu ứng vi khí hậu gió lộng | Dương Trạch Tập Thành, Táng Thư; tường chắn bê tông rọ đá tiêu năng, hệ thống thoát nước mái dốc và thảm cỏ giữ đất |
| 74 | Trệ Khí Thủy | Vũng nước tù đọng ô nhiễm hôi hám sát nách nhà; phân hủy kỵ khí sinh H2S và phát sinh mầm bệnh muỗi mạt | Tuyết Tâm Phú, Thủy Long Kinh; san lấp đáy trũng đầm nén, rãnh xương cá thoát nước và trồng thủy sinh lọc nước |
| 75 | Chấn Động Sát | Nhà cạnh tuyến đường sắt hay trọng tải nặng chấn động; vi rung chấn chu kỳ mỏi nứt móng và ô nhiễm tiếng ồn | Táng Thư, Tuyết Tâm Phú; rãnh cắt rung chấn chèn cao su bọt khí, móng bè đệm cát và tường kính cách âm hai lớp |
| 76 | Tà Thác Sát | Nền đất trồi sụt không đều lồi lõm sườn đồi; chuyển vị trượt trượt dốc và ứng suất cắt không đồng nhất | Tuyết Tâm Phú, Thủy Long Kinh; khảo sát địa chất móng cọc ngàm đá, kết cấu khung giằng đàn hồi và giật cấp theo dốc |
| 77 | Đáy Hư Sát | Nhà xây trùm lên hệ thống cống ngầm, hầm rỗng; sụt lún rỗng đáy móng và hơi khí metan xông ngược | Táng Thư, Hoàng Đế Trạch Kinh; dầm giằng chuyển lực độc lập bắc cầu, sàn bê tông cốt thép chống thấm và ống thông hơi |
| 78 | Đoạn Khí Thủy | Khe rãnh xói mòn đứt đoạn cắt ngang minh đường; dòng chảy mặt xói mòn mạch đất và ngắt quãng vi khí hậu | Thủy Long Kinh, Táng Thư; cống hộp ngầm liền mạch, hoàn trả mặt bằng lát gạch tự chèn và thảm cây cỏ tự nhiên |
| 79 | Quy Đường Thủy | Địa thế lòng chảo tụ thủy trung tâm tự nhiên; cơ chế lắng tụ dưỡng khí hiền hòa và tuần hoàn nước ngầm | Hoàng Đế Trạch Kinh, Táng Thư; mương tràn kiểm soát cao độ mực nước, cảnh quan hồ sinh thái và kè đá lát bậc |
| 80 | Hạc Tất Thủy | Dòng nước hoặc rãnh thoát phình to giữa thắt nghẽn hai đầu; nút thắt thủy lực tăng áp đột ngột và xoáy lở | Tuyết Tâm Phú, Địa Lý Ngũ Quyết; nạo vét mở rộng cổ thắt tiết diện đều, nắn thoải dòng uốn lượn và bờ kè cỏ vát nghiêng |

## Nhật ký kiểm chứng từng câu

| ID | Nguồn cũ | Vấn đề | Nguồn xác minh | Mức độ | Thay đổi |
|---|---|---|---|---|---|
| 71 | Táng Thư (ghép) | Trích đoạn chung chung không sát địa thế hãm địa trũng thấp | 《黃帝宅經》 (Tổng luận), 《雪心賦》 | VERIFIED | Dẫn đúng kinh văn Hoàng Đế Trạch Kinh & Tuyết Tâm Phú, phân tích bẫy khí nặng CO2 và ẩm ướt, giải pháp tam cấp nâng cốt |
| 72 | Táng Thư (ghép) | Thiếu phân tích cơ học đất và biến động thủy triều bão hòa | 《葬書》, 《水龍經》 | VERIFIED | Khôi phục câu chuẩn Táng Thư & Thủy Long Kinh, giải mã áp lực nước lỗ rỗng và độ ẩm biến thiên, đề xuất móng cọc và màng bentonite |
| 73 | Địa Lý Ngũ Quyết (ghép) | Trích ghép lỏng lẻo, dọa dẫm trơ trọi cô độc chung chung | 《陽宅集成》, 《葬書》 | VERIFIED | Dẫn đúng Dương Trạch Tập Thành & Táng Thư, phân tích xói lở trượt dốc và phong sát thổi thốc, giải pháp rọ đá kè giằng |
| 74 | Táng Thư (ghép) | Thiếu kinh văn chuẩn về nước đọng tù hãm và độc học | 《雪心賦》, 《水龍經》 | VERIFIED | Trích đúng nguyên văn Tuyết Tâm Phú & Thủy Long Kinh, phân tích bốc mùi yếm khí H2S và mầm bệnh vi sinh, giải pháp san lấp rãnh ngầm |
| 75 | Táng Thư (ghép) | Dính nhãn tự chế, thiếu phân tích tải trọng động và rung chấn | 《葬書》, 《雪心賦》 | VERIFIED | Khôi phục nguyên văn cổ thư, phân tích hiện tượng mỏi kết cấu và sóng cơ học truyền qua đất, đề xuất rãnh tiêu chấn cách ly |
| 76 | Tuyết Tâm Phú (ghép) | Trích đoạn vụn vặt, không làm rõ cơ chế ứng suất cắt sườn đồi | 《雪心賦》, 《水龍經》 | VERIFIED | Dẫn đúng kinh văn Tuyết Tâm Phú & Thủy Long Kinh, phân tích sụt lún không đều và lực trượt trượt dốc, giải pháp móng cọc ngàm đá |
| 77 | Táng Thư (ghép) | Dính nhãn cồng kềnh, dọa rỗng ruột ma quái | 《葬書》, 《黃帝宅經》 | VERIFIED | Dẫn đúng chính văn Táng Thư & Hoàng Đế Trạch Kinh, phân tích xói ngầm rỗng đáy và rò rỉ khí độc metan, giải pháp đà giằng cầu vượt |
| 78 | Thủy Long Kinh (ghép) | Dính nhãn tự chế, giải thích thiếu chiều sâu dòng chảy mặt | 《水龍經》, 《葬書》 | VERIFIED | Khôi phục kinh điển Thủy Long Kinh & Táng Thư, phân tích cắt đứt dòng ngầm và xói mòn rãnh sâu, giải pháp cống luồn thu nước kín |
| 79 | Táng Thư (ghép) | Thiếu kinh văn chuyên sâu về minh đường lòng chảo tụ thủy | 《黃帝宅經》 (Tổng luận), 《葬書》 | VERIFIED | Trích đúng câu chuẩn Hoàng Đế Trạch Kinh & Táng Thư, phân tích sinh thái đầm nước điều hòa và tích lũy phù sa, giải pháp hồ sinh thái tràn ngầm |
| 80 | Địa Lý Ngũ Quyết (ghép) | Ghép nhãn vụng, dọa tật nguyền cẳng chân mê tín sáo rỗng | 《雪心賦》, 《地理五訣》 | VERIFIED | Dẫn đúng Tuyết Tâm Phú & Địa Lý Ngũ Quyết, phân tích nút thắt cổ chai thủy lực tăng tốc phá hủy bờ kè, giải pháp mở rộng tiết diện nắn dòng |








