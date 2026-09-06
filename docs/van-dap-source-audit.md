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




