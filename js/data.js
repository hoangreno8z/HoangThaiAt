/**
 * KHO TÀNG ĐẠI BÁCH KHOA VŨ TRỤ HỌC CỔ ĐẠI & DỊCH LÝ LẠC VIỆT
 * Tuyệt đối 100% Tiếng Việt học thuật, chuẩn mực bản thể luận, khảo cổ học và cơ học trường khí.
 */

const COSMIC_DATA = {
  // 1. DÒNG THỜI GIAN LỊCH SỬ TIẾN HÓA (9 KỶ NGUYÊN)
  timeline: [
    {
      id: "era_1",
      era: "Thuở Hồng Hoang (Tiền Vật Chất)",
      period: "Vô Thủy Vô Chung (Hỗn Độn Nguyên Sơ)",
      title: "Khởi Nguyên Bản Thể Luận: Vô Cực -> Thái Cực -> Lưỡng Nghi",
      category: "Bản Thể Luận",
      desc: "Trạng thái trước khi không gian và thời gian hình thành (Vô Cực). Đạo Đức Kinh chép: 'Hữu vật hỗn thành, tiên thiên địa sinh'. Năng lượng chân không lượng tử nguyên sơ đạt tới trạng thái kích hoạt, ngưng tụ thành một điểm kỳ dị duy nhất mang tên Thái Cực. Từ điểm kỳ dị này, hai xung lực cơ bản xuất hiện: Động (Dương khí bức xạ) và Tĩnh (Âm khí thu liễm), mở ra nhịp đập đầu tiên của vũ trụ.",
      treatise: "Vô Cực không phải là hư không tuyệt đối, mà là 'Hư vô chi lý, vạn hữu chi bản'. Khi Thái Cực động thì sinh Dương, động cực điểm thì chuyển sang Tĩnh; khi Tĩnh thì sinh Âm, tĩnh cực điểm lại quay về Động. Đây là định luật chuyển pha liên tục của năng lượng trường sơ khai."
    },
    {
      id: "era_2",
      era: "Thời Đại Đồ Đá Mới & Nông Nghiệp Sơ Khởi Phương Nam",
      period: "Khoảng 5000 - 3000 TCN (Văn hóa Hòa Bình - Bắc Sơn)",
      title: "Cội Nguồn Dịch Lý Nông Nghiệp Lúa Nước (Viêm Việt / Thần Nông)",
      category: "Cội Nguồn Việt",
      desc: "Cư dân nông nghiệp trồng lúa nước cổ đại tại lưu vực sông Hồng, sông Mã và vùng Lĩnh Nam phụ thuộc trực tiếp vào nhịp điệu của tự nhiên. Trông trời, trông đất, trông mây, trông mưa, trông nắng, trông ngày, trông đêm. Sự biến thiên của nhật nguyệt, con nước triều cường và chu kỳ gieo cấy đã tạo nên nền tảng thực nghiệm sớm nhất của tư duy Dịch lý.",
      treatise: "Huyền sử Hồng Bàng ghi nhận sự kết hợp giữa Mẹ Âu Cơ (dòng Tiên/Núi non/Âm tính/Tĩnh tại) và Cha Lạc Long Quân (dòng Rồng/Sông biển/Dương tính/Chuyển động). Phép chia 50 con theo Cha xuống biển khai mở nguồn lợi thủy sản, 50 con theo Mẹ lên núi khai hoang trồng trọt chính là mô hình phân hóa Thái Cực sinh Lưỡng Nghi và quy hoạch không gian sinh tồn cân bằng sinh thái đầu tiên trong lịch sử nhân loại."
    },
    {
      id: "era_3",
      era: "Thời Đại Phục Hy (Tiên Thiên)",
      period: "Khoảng 2800 TCN",
      title: "Hà Đồ & Tiên Thiên Bát Quái (Bản Thể Không Gian Đối Xứng)",
      category: "Số Học Vũ Trụ",
      desc: "Hà Đồ xuất hiện với kết cấu 55 chấm đen trắng. Quy luật Số Sinh (1, 2, 3, 4, 5) và Số Thành (6, 7, 8, 9, 10) định vị trật tự 5 nguyên lý Ngũ Hành trong không gian nguyên thủy: Bắc Thủy (1-6), Nam Hỏa (2-7), Đông Mộc (3-8), Tây Kim (4-9), Trung Cung Thổ (5-10). Phục Hy quan sát trời đất, ngẩng xem thiên tượng, cúi xem địa hình mà vạch ra Tiên Thiên Bát Quái.",
      treatise: "Tiên Thiên Bát Quái là mô hình đối xứng nhị phân bù trừ tuyệt đối trong không gian 3 chiều: Càn (111) đối Khôn (000), Ly (101) đối Khảm (010), Đoài (110) đối Cấn (001), Chấn (100) đối Tốn (011). Mọi cặp quẻ đối diện cộng lại đều triệt tiêu đối kháng để đạt trạng thái cân bằng lực hoàn hảo (Zero Point Energy)."
    },
    {
      id: "era_4",
      era: "Thời Đại Vũ Trị Thủy",
      period: "Khoảng 2200 TCN",
      title: "Lạc Thư & Ma Trận Cửu Cung (Động Lực Học Thời Không)",
      category: "Số Học Vũ Trụ",
      desc: "Trong công cuộc trị thủy sông Lạc, Thần Quy nổi lên mang trên mai ma trận cửu cung số học bậc 3 (Magic Square of order 3). Khác với Hà Đồ mang tính sinh thành đối xứng tĩnh, Lạc Thư là mô hình động lực học không-thời gian với quy tắc tương khắc và biến chuyển tuần hoàn.",
      treatise: "Ma trận Lạc Thư có hằng số cân bằng bằng 15 trên mọi trục ngang, dọc, chéo. 'Đới cửu lý nhất, tả tam hữu thất, nhị tứ vi kiên, lục bát vi túc, ngũ cư trung cung'. Lạc Thư đặt nền móng cho thuật toán Cửu Cung, Tam Nguyên Cửu Vận, Bát Môn và toàn bộ các bộ môn dự báo thời không sau này."
    },
    {
      id: "era_5",
      era: "Thời Đại Đồ Đồng Đông Sơn",
      period: "Khoảng 1000 TCN - Thế kỷ 1 SCN",
      title: "Trống Đồng Đông Sơn: Đúc Trọn Vẹn Vũ Trụ Quan Vào Đồng Thau",
      category: "Cội Nguồn Việt",
      desc: "Đỉnh cao của văn minh Lạc Việt. Người Việt cổ không dùng chữ viết trừu tượng mà đúc toàn bộ tri thức thiên văn, thời tiết, mùa vụ và triết học Âm Dương lên mặt trống đồng Ngọc Lũ, Hoàng Hạ, Sông Đà.",
      treatise: "Tâm mặt trống là Ngôi sao 14 cánh (hoặc 12 cánh) tượng trưng cho Mặt Trời - Thái Cực sơ khai; vòng đàn chim Lạc bay ngược chiều kim đồng hồ mô phỏng quỹ đạo tự quay của Trái Đất và chuyển động biểu kiến của thiên thể; 4 tượng cóc ngậm mưa phân bổ 4 phương đại diện cho Tứ Tượng Thủy khí điều hòa mưa thuận gió hòa; vành hoa văn răng cưa nhị phân biểu thị tia bức xạ ánh sáng."
    },
    {
      id: "era_6",
      era: "Thời Chu Văn Vương & Chu Công (Hậu Thiên)",
      period: "Khoảng 1100 TCN",
      title: "Hậu Thiên Bát Quái & Chu Kỳ Khí Tiết Bốn Mùa",
      category: "Hình Học Vũ Trụ",
      desc: "Chu Văn Vương bị giam ở ngục Dữu Lý đã sắp xếp lại Bát Quái theo trật tự Hậu Thiên để phản ánh sự dịch chuyển của Mặt Trời và thời tiết 4 mùa trên Trái Đất: Ly ở phương Nam (Mùa Hạ - Cực Dương), Khảm ở phương Bắc (Mùa Đông - Cực Âm), Chấn ở phương Đông (Mùa Xuân - Sinh khởi), Đoài ở phương Tây (Mùa Thu - Thu hoạch).",
      treatise: "Nếu Tiên Thiên là 'Thể' (Bản thể không gian vũ trụ tĩnh tại) thì Hậu Thiên là 'Dụng' (Ứng dụng vào thời gian, mùa màng, phong thủy địa lý, nông nghiệp và đời sống nhân sinh). Sự chuyển dịch từ Càn-Khôn định trục sang Ly-Khảm định trục phản ánh sự tương giao Thủy Hỏa trên mặt đất."
    },
    {
      id: "era_7",
      era: "Thời Xuân Thu - Chiến Quốc",
      period: "770 - 221 TCN",
      title: "Hệ Từ Truyện, Đạo Đức Kinh & Thuyết Ngũ Hành Khí Hóa",
      category: "Triết Học Khí Hóa",
      desc: "Giai đoạn bùng nổ triết học phương Đông (Bách gia tranh minh). Khổng Tử biên soạn Thập Dực (trong đó có Hệ Từ Thượng, Hệ Từ Hạ) giải mã cơ chế sinh thành Cát - Hung; Lão Tử đúc kết bản thể luận Đạo Đức Kinh ('Đạo sinh Nhất, Nhất sinh Nhị, Nhị sinh Tam, Tam sinh vạn vật').",
      treatise: "Học phái Âm Dương Gia (Trâu Diễn) và các danh y thời Tiên Tần đã đúc kết Ngũ Hành thành hệ thống 5 vector vận động của Khí: Mộc (Vươn tỏa), Hỏa (Thăng hoa), Thổ (Trung hòa), Kim (Thu liễm), Thủy (Lắng đọng), hoàn thiện cơ chế Tương Sinh, Tương Khắc và Chế Hóa tự cân bằng."
    },
    {
      id: "era_8",
      era: "Thời Hán - Đường - Tống",
      period: "206 TCN - 1279 SCN",
      title: "Đỉnh Cao Tam Thức Đại Đạo & Y Đạo Hoàng Đế Nội Kinh",
      category: "Toán Học Cổ Đại",
      desc: "Hệ thống hóa toàn diện các cỗ máy toán học vũ trụ đỉnh cao: Thái Ất Thần Kinh (Thiên Đạo - Dự báo đại chu kỳ thiên văn, vận nước), Kỳ Môn Độn Giáp (Địa Đạo - Bố trận thời không 4 tầng bàn), Đại Lục Nhâm (Nhân Đạo - Phân tích vi mô sự vụ đời sống qua Tứ Khóa Tam Truyền).",
      treatise: "Hoàng Đế Nội Kinh (Tố Vấn, Linh Khu) ứng dụng trọn vẹn Âm Dương Ngũ Hành vào Y học: 'Âm Dương giả thiên địa chi đạo dã, vạn vật chi cương kỷ'. Thiết lập mối liên hệ hữu cơ giữa Ngũ Tạng (Tâm, Can, Tỳ, Phế, Thận) với Ngũ Hành, Ngũ Khí thời tiết và thời gian sinh học Tý Ngọ Lưu Chú."
    },
    {
      id: "era_9",
      era: "Thời Hiện Đại & Đương Đại",
      period: "Thế kỷ 20 - Nay",
      title: "Việt Lý Tố Nguyên & Đối Chiếu Khoa Học Lượng Tử Hiện Đại",
      category: "Hiện Đại Hóa",
      desc: "Triết gia Kim Định xuất bản công trình 'Việt Lý Tố Nguyên', 'Cửa Khổng', 'Chữ Thời', chứng minh Dịch lý là sản phẩm của nền văn minh nông nghiệp Lạc Việt. Các nhà khoa học phương Tây (Leibniz, Niels Bohr, Carl Jung) phát hiện sự tương đồng kỳ diệu giữa Bát Quái với Hệ thống Số Nhị Phân, Cơ học Lượng tử và 64 Mã Bộ Ba Di Truyền DNA.",
      treatise: "Âm Dương không còn bị xem là mê tín mà được nhìn nhận là Lý thuyết Trường Thống Nhất sơ khai, nơi các cặp lưỡng cực đối xứng (hạt và phản hạt, sóng và hạt, spin lên và spin xuống) liên tục chuyển hóa để duy trì sự tồn tại của vũ trụ."
    }
  ],

  // 2. MẠNG LƯỚI ĐỒ THỊ TRI THỨC ANTIGRAVITY (30+ NÚT ĐA CHIỀU)
  knowledge_graph: {
    nodes: [
      // Khởi nguyên
      { id: "Vô Cực", group: "genesis", radius: 36, cat: "Bản Thể Luận", desc: "Trường chân không tiềm năng nguyên sơ, chưa phân định không-thời gian, là nguồn gốc phát sinh vạn hữu.", quote: "Vô cực nhi Thái cực. (Chu Đôn Di)" },
      { id: "Thái Cực", group: "genesis", radius: 32, cat: "Bản Thể Luận", desc: "Điểm kỳ dị sơ khởi mang ý thức và năng lượng tự thân, tâm trục xoay chuyển của tạo hóa.", quote: "Dịch hữu Thái cực, thị sinh Lưỡng nghi. (Hệ Từ)" },
      { id: "Âm Khí", group: "polarity", radius: 26, cat: "Lưỡng Nghi", desc: "Vector năng lượng thu liễm, hướng nội, ngưng tụ, hấp thu nhiệt lượng, tĩnh lặng.", quote: "Âm tĩnh dĩ ngưng chất." },
      { id: "Dương Khí", group: "polarity", radius: 26, cat: "Lưỡng Nghi", desc: "Vector năng lượng giãn nở, hướng ngoại, bức xạ, phát tán nhiệt lượng, vận động.", quote: "Dương động dĩ phát sinh." },
      { id: "Tứ Tượng", group: "polarity", radius: 28, cat: "Lưỡng Nghi", desc: "Bốn pha dao động nhiệt lượng: Thái Dương (Hạ), Thiếu Dương (Xuân), Thái Âm (Đông), Thiếu Âm (Thu).", quote: "Lưỡng nghi sinh Tứ tượng." },
      
      // Số học Hà Lạc
      { id: "Hà Đồ", group: "math", radius: 28, cat: "Số Học Vũ Trụ", desc: "Trật tự Sinh-Thành số Tiên Thiên, cấu trúc cân bằng tĩnh gồm 55 chấm đen trắng.", quote: "Thiên địa chi số ngũ thập hữu ngũ." },
      { id: "Lạc Thư", group: "math", radius: 28, cat: "Số Học Vũ Trụ", desc: "Ma phương Cửu Cung bậc 3 với hằng số cân bằng động bằng 15 trên mọi trục.", quote: "Đới cửu lý nhất, ngũ cư trung cung." },
      { id: "Số Sinh", group: "math", radius: 20, cat: "Số Học Vũ Trụ", desc: "Các số khởi phát từ 1 đến 5 (1 Thủy, 2 Hỏa, 3 Mộc, 4 Kim, 5 Thổ).", quote: "Thiên nhất sinh Thủy, Địa nhị sinh Hỏa." },
      { id: "Số Thành", group: "math", radius: 20, cat: "Số Học Vũ Trụ", desc: "Các số hoàn tất từ 6 đến 10 (6 Thủy, 7 Hỏa, 8 Mộc, 9 Kim, 10 Thổ).", quote: "Địa lục thành chi, Thiên thất thành chi." },

      // Cội nguồn Lạc Việt
      { id: "Trống Đồng Đông Sơn", group: "viet", radius: 42, cat: "Cội Nguồn Việt", desc: "Bản đồ thiên văn và vũ trụ luận đúc bằng đồng thau: Sao Thái Cực 14 cánh, chim Lạc, cóc gọi mưa.", quote: "La bàn vũ trụ quan nền văn minh lúa nước sông Hồng." },
      { id: "Việt Lý Tố Nguyên", group: "viet", radius: 30, cat: "Cội Nguồn Việt", desc: "Học thuyết triết học của Kim Định chứng minh Dịch lý khởi nguyên từ văn hóa Viêm Việt phương Nam.", quote: "Dịch là bản đồ tâm thức nông nghiệp Lạc Việt." },
      { id: "Lạc Long Quân", group: "viet", radius: 24, cat: "Cội Nguồn Việt", desc: "Biểu trưng Rồng / Biển / Dương tính / Động năng / Mở mang kinh tế sông nước.", quote: "50 con theo Cha xuống biển." },
      { id: "Âu Cơ", group: "viet", radius: 24, cat: "Cội Nguồn Việt", desc: "Biểu trưng Tiên / Núi / Âm tính / Tĩnh tại / Bồi đắp văn hóa trồng trọt.", quote: "50 con theo Mẹ lên núi." },

      // Bát quái
      { id: "Bát Quái", group: "bagua", radius: 30, cat: "Hình Học Vũ Trụ", desc: "Mạng lưới 8 quẻ đơn (3 hào nhị phân) mô phỏng 8 trạng thái năng lượng vật chất nền tảng.", quote: "Bát quái định cát hung." },
      { id: "Tiên Thiên Bát Quái", group: "bagua", radius: 24, cat: "Bát Quái", desc: "Trật tự không gian đối xứng bù trừ tuyệt đối của Phục Hy (Càn Nam Khôn Bắc).", quote: "Thiên Địa định vị, Sơn Trạch thông khí." },
      { id: "Hậu Thiên Bát Quái", group: "bagua", radius: 24, cat: "Bát Quái", desc: "Trật tự chu kỳ thời gian và thời tiết 4 mùa của Văn Vương (Ly Nam Khảm Bắc).", quote: "Đế xuất hồ Chấn, tương kiến hồ Ly." },
      { id: "Càn (Trời)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Thuần Dương, cương kiện, cực tính trọng trường phát xuất, phương Tây Bắc (Hậu Thiên) / Nam (Tiên Thiên).", quote: "Càn vi thiên, vi phụ." },
      { id: "Khôn (Đất)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Thuần Âm, nhu thuận, vật chất dung nạp bao bọc, phương Tây Nam (Hậu Thiên) / Bắc (Tiên Thiên).", quote: "Khôn vi địa, vi mẫu." },
      { id: "Khảm (Nước)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Chất lỏng trôi chảy, hiểm sâu, phương Chính Bắc (Hậu Thiên) / Tây (Tiên Thiên).", quote: "Khảm vi thủy, vi nguyệt." },
      { id: "Ly (Lửa)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Bức xạ nhiệt quang minh rực rỡ, phương Chính Nam (Hậu Thiên) / Đông (Tiên Thiên).", quote: "Ly vi hỏa, vi nhật." },

      // Ngũ Hành
      { id: "Ngũ Hành", group: "wuxing", radius: 30, cat: "Khí Hóa", desc: "Năm pha chuyển hóa vector của Khí: Mộc (Tỏa), Hỏa (Thăng), Thổ (Trung), Kim (Thu), Thủy (Tàng).", quote: "Khí hóa vạn vật, biến dịch vô cùng." },
      { id: "Mộc", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector vươn tỏa, hướng thượng, mùa Xuân, phương Đông, tạng Can, khí Ôn.", quote: "Mộc viết khúc trực." },
      { id: "Hỏa", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector bùng phát, thăng hoa, mùa Hạ, phương Nam, tạng Tâm, khí Nhiệt.", quote: "Hỏa viết viêm thượng." },
      { id: "Thổ", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector trung hòa, dung chứa, chuyển tiếp mùa, trung ương, tạng Tỳ, khí Thấp.", quote: "Thổ viên giá sắc." },
      { id: "Kim", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector thu liễm, ngưng kết, mùa Thu, phương Tây, tạng Phế, khí Táo.", quote: "Kim viết tòng cách." },
      { id: "Thủy", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector lắng đọng, phục tàng, mùa Đông, phương Bắc, tạng Thận, khí Hàn.", quote: "Thủy viết nhuận hạ." },
      { id: "Chế Hóa", group: "wuxing", radius: 24, cat: "Khí Hóa", desc: "Cơ chế tự cân bằng hồi tiếp (Homeostasis): Khắc mà có Sinh, Sinh mà có Khắc.", quote: "Vô khắc tắc quá cực vi hại." },

      // Cát Hung & Tam Thức
      { id: "Cát Hung Phương Vị", group: "physics", radius: 32, cat: "Cơ Học Khí", desc: "Hiện tượng cộng hưởng pha (Cát) hoặc xung đột bẻ gãy từ trường (Hung) giữa Thiên-Địa-Nhân.", quote: "Đồng thanh tương ứng, đồng khí tương cầu." },
      { id: "Cộng Hưởng Pha", group: "physics", radius: 22, cat: "Cơ Học Khí", desc: "Sự khuếch đại năng lượng khi tần số sinh học trùng khớp với từ trường phương vị và thiên thời.", quote: "Constructive Phase Resonance." },
      { id: "Xung Đột Pha", group: "physics", radius: 22, cat: "Cơ Học Khí", desc: "Nhiễu loạn dòng xoáy năng lượng khi vector khí quyển và địa lý đối kháng trực diện.", quote: "Destructive Phase Interference." },
      { id: "Thái Ất Thần Kinh", group: "tamthuc", radius: 24, cat: "Tam Thức", desc: "Cỗ máy tính toán Thiên Đạo: 16 Thần, 72 Cục khảo sát đại chu kỳ thiên văn và biến động địa cầu.", quote: "Thái Ất thống quản chu kỳ vũ trụ." },
      { id: "Kỳ Môn Độn Giáp", group: "tamthuc", radius: 24, cat: "Tam Thức", desc: "Cỗ máy tính toán Địa Đạo: Ma trận 4 tầng bàn (Địa-Thiên-Nhân-Thần) điều hướng phương vị Cát lành.", quote: "Cửu Cung Bát Môn định vị trận đồ." },
      { id: "Đại Lục Nhâm", group: "tamthuc", radius: 24, cat: "Tam Thức", desc: "Cỗ máy tính toán Nhân Đạo: Tứ Khóa Tam Truyền phân tích nhân tâm và vi mô đời sống nhân thế.", quote: "Tam truyền phân định quá khứ hiện tại vị lai." }
    ],
    links: [
      { source: "Vô Cực", target: "Thái Cực", value: 5 },
      { source: "Thái Cực", target: "Âm Khí", value: 4 },
      { source: "Thái Cực", target: "Dương Khí", value: 4 },
      { source: "Âm Khí", target: "Tứ Tượng", value: 3 },
      { source: "Dương Khí", target: "Tứ Tượng", value: 3 },
      { source: "Tứ Tượng", target: "Bát Quái", value: 4 },
      { source: "Âm Khí", target: "Hà Đồ", value: 3 },
      { source: "Dương Khí", target: "Hà Đồ", value: 3 },
      { source: "Hà Đồ", target: "Số Sinh", value: 3 },
      { source: "Hà Đồ", target: "Số Thành", value: 3 },
      { source: "Hà Đồ", target: "Lạc Thư", value: 5 },
      { source: "Lạc Thư", target: "Ngũ Hành", value: 5 },
      { source: "Ngũ Hành", target: "Mộc", value: 2 },
      { source: "Ngũ Hành", target: "Hỏa", value: 2 },
      { source: "Ngũ Hành", target: "Thổ", value: 2 },
      { source: "Ngũ Hành", target: "Kim", value: 2 },
      { source: "Ngũ Hành", target: "Thủy", value: 2 },
      { source: "Ngũ Hành", target: "Chế Hóa", value: 4 },
      { source: "Bát Quái", target: "Tiên Thiên Bát Quái", value: 4 },
      { source: "Bát Quái", target: "Hậu Thiên Bát Quái", value: 4 },
      { source: "Tiên Thiên Bát Quái", target: "Càn (Trời)", value: 2 },
      { source: "Tiên Thiên Bát Quái", target: "Khôn (Đất)", value: 2 },
      { source: "Hậu Thiên Bát Quái", target: "Khảm (Nước)", value: 2 },
      { source: "Hậu Thiên Bát Quái", target: "Ly (Lửa)", value: 2 },
      { source: "Trống Đồng Đông Sơn", target: "Thái Cực", value: 6 },
      { source: "Trống Đồng Đông Sơn", target: "Ngũ Hành", value: 4 },
      { source: "Trống Đồng Đông Sơn", target: "Bát Quái", value: 4 },
      { source: "Việt Lý Tố Nguyên", target: "Hà Đồ", value: 4 },
      { source: "Việt Lý Tố Nguyên", target: "Trống Đồng Đông Sơn", value: 5 },
      { source: "Lạc Long Quân", target: "Dương Khí", value: 4 },
      { source: "Âu Cơ", target: "Âm Khí", value: 4 },
      { source: "Lạc Long Quân", target: "Trống Đồng Đông Sơn", value: 3 },
      { source: "Âu Cơ", target: "Trống Đồng Đông Sơn", value: 3 },
      { source: "Lạc Thư", target: "Cát Hung Phương Vị", value: 5 },
      { source: "Hậu Thiên Bát Quái", target: "Cát Hung Phương Vị", value: 5 },
      { source: "Cát Hung Phương Vị", target: "Cộng Hưởng Pha", value: 4 },
      { source: "Cát Hung Phương Vị", target: "Xung Đột Pha", value: 4 },
      { source: "Thái Cực", target: "Thái Ất Thần Kinh", value: 4 },
      { source: "Lạc Thư", target: "Kỳ Môn Độn Giáp", value: 5 },
      { source: "Hậu Thiên Bát Quái", target: "Đại Lục Nhâm", value: 4 }
    ]
  },

  // 3. ĐẠI LUẬN THUYẾT CHUYÊN SÂU (6 CHƯƠNG ĐẠI HỌC THUẬT)
  treatises: [
    {
      id: "treatise_1",
      number: "I",
      title: "Bản Thể Luận Vũ Trụ: Từ Hư Vô Tiền Vật Chất Đến Điểm Kỳ Dị Thái Cực",
      author: "Nghiên cứu Cổ thư & Cơ học Lượng tử",
      content: `
        <p><strong>1. Khái Niệm Vô Cực (Wuji) - Trường Tiềm Năng Lượng Tử Tuyệt Đối:</strong></p>
        <p>Trong tư tưởng Tiên Tần và Đạo gia, 'Vô Cực' không phải là sự trống rỗng hư vô (Nothingness), mà là trạng thái năng lượng chân không thuần túy ở mức kích thích nền thấp nhất. Nơi đây không có kích thước không gian, không có mũi tên thời gian, không có vật chất phân cực. Đạo Đức Kinh chương 25 gọi đó là: <em>'Hữu vật hỗn thành, tiên thiên địa sinh. Tịch hề liêu hề, độc lập bất cải, chu hành nhi bất đãi, khả dĩ vi thiên địa mẫu'</em>.</p>
        
        <p><strong>2. Thái Cực (Taiji) - Điểm Kỳ Dị Khởi Nguyên (Cosmic Singularity):</strong></p>
        <p>Khi trường năng lượng tiềm năng vượt qua ngưỡng dao động tới hạn, sự bất đối xứng xuất hiện. Điểm tụ hội năng lượng đầu tiên được gọi là <strong>Thái Cực</strong>. Chu Đôn Di viết trong <em>Thái Cực Đồ Thuyết</em>: <em>'Vô cực nhi Thái cực. Thái cực động nhi sinh Dương, động cực nhi tĩnh, tĩnh nhi sinh Âm, tĩnh cực phục động. Nhất động nhất tĩnh, hỗ vi kỳ căn'</em>.</p>
        
        <p><strong>3. Bản Chất Của Lưỡng Nghi (Âm - Dương Polarities):</strong></p>
        <p>Âm Dương không phải hai vật thể hữu hình, mà là hai vector trạng thái của Khí:
        <br>• <strong>Dương (Yang):</strong> Vector ly tâm, hướng ngoại, bành trướng nhiệt lượng, tần số dao động cao.
        <br>• <strong>Âm (Yin):</strong> Vector hướng tâm, cô đặc, ngưng tụ khối lượng, bảo toàn tiềm năng.</p>
      `
    },
    {
      id: "treatise_2",
      number: "II",
      title: "Vũ Trụ Quan Lạc Việt: Mật Mã Thiên Văn & Triết Học Nông Nghiệp Trống Đồng",
      author: "Khảo Cổ Học Đông Sơn & Việt Lý Tố Nguyên",
      content: `
        <p><strong>1. Khảo Cổ Học Mặt Trống Đồng Đông Sơn - La Bàn Thiên Văn Cổ:</strong></p>
        <p>Các phát hiện tại di chỉ Ngọc Lũ, Hoàng Hạ, Cổ Loa, Sông Đà chứng minh người Lạc Việt đã nắm giữ hệ thống thiên văn học chính xác từ trước thiên niên kỷ 1 TCN. Mặt trống đồng chính là một đồ hình biểu diễn bầu trời và chu kỳ Trái Đất:</p>
        <ul>
          <li><strong>Ngôi sao 14 cánh (hoặc 12 cánh):</strong> Tượng trưng cho Mặt Trời trung tâm phát xạ năng lượng. 14 tia sáng chia mặt tròn thành các góc chuẩn, phân định 24 tiết khí trong năm nông nghiệp.</li>
          <li><strong>Đàn chim Lạc vươn cánh bay ngược chiều kim đồng hồ:</strong> Phản ánh trực giác chính xác về chiều tự quay của Trái Đất (từ Tây sang Đông) khiến thiên thể biểu kiến quay ngược chiều kim đồng hồ từ Đông sang Tây.</li>
          <li><strong>Bốn tượng Cóc/Ếch trên tang trống:</strong> Biểu tượng của Thủy khí và sấm sét gọi mưa. Khi cóc nghiến răng thì trời đổ mưa - quy luật điều hòa mùa vụ lúa nước.</li>
        </ul>

        <p><strong>2. Triết Học 'Việt Lý Tố Nguyên' Của Giáo Sư Kim Định:</strong></p>
        <p>Triết gia Kim Định đã chứng minh Dịch lý mang bản chất của nền văn minh Nông nghiệp lúa nước phương Nam: nương tựa vào đất trời, sông ngòi, lấy sự sinh tồn hòa hợp với tự nhiên làm cứu cánh. Triết lý bánh chưng vuông (Đất/Khôn/Âm) và bánh giầy tròn (Trời/Càn/Dương) từ thời Hùng Vương chính là biểu hiện trực quan sớm nhất của mô hình Trời Tròn Đất Vuông trước khi có văn tự chữ Hán du nhập.</p>
      `
    },
    {
      id: "treatise_3",
      number: "III",
      title: "Mật Mã Số Học Vũ Trụ: Hà Đồ (Tiên Thiên) & Lạc Thư (Hậu Thiên Ma Phương)",
      author: "Toán Học Cổ Đại & Hình Học Không Gian",
      content: `
        <p><strong>1. Hà Đồ - Quy Luật Số Sinh & Số Thành Cân Bằng Tĩnh (Static Equilibrium):</strong></p>
        <p>Hà Đồ gồm 55 chấm, đại diện cho Đại Diễn chi số (Thiên số lẻ: 1+3+5+7+9=25; Địa số chẵn: 2+4+6+8+10=30; Tổng = 55):</p>
        <ul>
          <li><strong>Bắc:</strong> 1 (Dương Sinh) phối 6 (Âm Thành) -> Thủy</li>
          <li><strong>Nam:</strong> 2 (Âm Sinh) phối 7 (Dương Thành) -> Hỏa</li>
          <li><strong>Đông:</strong> 3 (Dương Sinh) phối 8 (Âm Thành) -> Mộc</li>
          <li><strong>Tây:</strong> 4 (Âm Sinh) phối 9 (Dương Thành) -> Kim</li>
          <li><strong>Trung:</strong> 5 (Dương Sinh) phối 10 (Âm Thành) -> Thổ</li>
        </ul>
        <p><em>Chứng minh toán học:</em> Hiệu số ở mọi phương vị: <code>6-1=5, 7-2=5, 8-3=5, 9-4=5, 10-5=5</code>. Hằng số 5 tại trung tâm chứng minh Thổ là tâm trục chuyển tiếp của mọi sự sinh hóa trong vũ trụ.</p>

        <p><strong>2. Lạc Thư - Động Lực Học Ma Phương Cửu Cung (Dynamic Magic Square):</strong></p>
        <p>Ma phương bậc 3 kinh điển với tổng mọi trục bằng 15. Sự sắp xếp <code>[4,9,2; 3,5,7; 8,1,6]</code> tạo nên sự dịch chuyển năng lượng không ngừng giữa 8 hướng, làm cơ sở cho sự luân chuyển của 9 Vận và phân bố trường khí trên mặt đất.</p>
      `
    },
    {
      id: "treatise_4",
      number: "IV",
      title: "Động Lực Học Khí Hóa: Ngũ Hành Bản Thể & Cơ Chế Chế Hóa (Homeostasis)",
      author: "Hoàng Đế Nội Kinh & Vật Lý Sinh Thái",
      content: `
        <p><strong>1. Ngũ Hành Là 5 Vector Pha Chuyển Động Của Khí:</strong></p>
        <p>Ngũ Hành không phải là 5 chất liệu thô sơ (cây cối, ngọn lửa, đất cát...), mà là 5 trạng thái vận động:</p>
        <ul>
          <li><strong>Mộc (Wood):</strong> Vector sinh trưởng, tỏa rộng, đàn hồi, khai phá mùa xuân.</li>
          <li><strong>Hỏa (Fire):</strong> Vector thăng hoa, cực đại, bức xạ nhiệt, quang minh mùa hạ.</li>
          <li><strong>Thổ (Earth):</strong> Vector trung hòa, dung nạp, điều phối, chuyển tiếp giữa các mùa.</li>
          <li><strong>Kim (Metal):</strong> Vector thu liễm, cô đặc, kết tinh, thanh lọc mùa thu.</li>
          <li><strong>Thủy (Water):</strong> Vector lắng đọng, phục tàng, thâm nhập sâu, tiềm thức mùa đông.</li>
        </ul>

        <p><strong>2. Cơ Chế Chế Hóa Tối Cao (Homeostasis Cổ Đại):</strong></p>
        <p>Trong Dịch lý, không có sự Sinh thuần túy cũng không có sự Khắc thuần túy. Khắc mà có Sinh, Sinh mà có Khắc:
        <br>• Kim khắc Mộc, nhưng Mộc sinh Hỏa để Hỏa rèn lại Kim.
        <br>• Thủy khắc Hỏa, nhưng Hỏa sinh Thổ để Thổ đắp đê ngăn Thủy.
        <br>Nhờ vòng hồi tiếp này mà hệ sinh thái vũ trụ luôn duy trì được trạng thái cân bằng động bất diệt.</p>
      `
    },
    {
      id: "treatise_5",
      number: "V",
      title: "Cơ Học Trường Khí: Vì Sao Sinh Ra Phương Vị Cát - Hung?",
      author: "Vật Lý Địa Từ Trường & Cộng Hưởng Sinh Học",
      content: `
        <p><strong>1. Bản Chất Khoa Học Của Cát - Hung (Auspiciousness / Inauspiciousness):</strong></p>
        <p>Cát Hung không phải sự ban ơn hay trừng phạt của thần linh, mà là <strong>Mức độ tương thích pha (Phase Resonance) của 3 trường lực</strong>:</p>
        <ul>
          <li><strong>Thiên Khí (Time / Solar Radiation):</strong> Góc chiếu bức xạ mặt trời, vị trí tinh tú, chu kỳ bão từ.</li>
          <li><strong>Địa Khí (Space / Geomagnetic Vector):</strong> Hướng từ trường Trái Đất, cấu trúc địa hình loan đầu, sự tụ khí hay tán khí.</li>
          <li><strong>Nhân Khí (Human Biofield):</strong> Tần số sinh học, trạng thái tâm thể, nếp sống và hành vi con người.</li>
        </ul>

        <p><strong>2. Đồng Khí Tương Cầu & Nhiễu Loạn Xung Sát:</strong></p>
        <p>• <strong>Cát (Constructive Interference):</strong> Khi Thiên - Địa - Nhân đồng pha, dòng năng lượng lưu thông êm dịu, tế bào thần kinh thư giãn, tâm trí minh mẫn -> Đưa ra quyết định sáng suốt -> Thành công, trường thọ.
        <br>• <strong>Hung (Destructive Turbulence):</strong> Khi phương vị hoặc thời điểm nghịch pha trực diện (ví dụ Tọa Bắc phạm sát khí cực đại, gió lạnh bẻ gãy từ trường sinh học), gây ức chế hệ thần kinh, tạo ra ảo giác, mệt mỏi -> Quyết định sai lầm -> Tai họa, hao tổn tài lộc.</p>
      `
    },
    {
      id: "treatise_6",
      number: "VI",
      title: "Tam Thức Đại Đạo: Ba Cỗ Máy Tính Toán Không - Thời Gian Đỉnh Cao",
      author: "Toán Học Cổ & Khảo Sát Thiên Văn",
      content: `
        <p><strong>1. Thái Ất Thần Kinh (Thiên Đạo - Macro Cosmos):</strong></p>
        <p>Sử dụng 16 Thần và 72 Cục để theo dõi quỹ đạo biểu kiến của sao Thái Ất quanh sao Bắc Cực. Chuyên dùng để phân tích đại biến thiên khí hậu toàn cầu, sự dịch chuyển lục địa, dịch bệnh, hạn hán, lũ lụt và các chu kỳ hưng thịnh của các triều đại lịch sử qua hàng ngàn năm.</p>

        <p><strong>2. Kỳ Môn Độn Giáp (Địa Đạo - Space Grid Tactics):</strong></p>
        <p>Ma trận 4 tầng bàn xếp chồng (Địa Bàn - Thiên Bàn - Nhân Bàn - Thần Bàn) kết hợp cùng Cửu Cung Lạc Thư, Bát Môn (Hưu, Sinh, Thương, Đỗ, Cảnh, Tử, Kinh, Khai) và Cửu Tinh. Cho phép người vận hành xác định chính xác Cửa Sinh (Sinh Môn) và phương vị cát lợi trong từng canh giờ để nắm bắt thời không vi diệu.</p>

        <p><strong>3. Đại Lục Nhâm (Nhân Đạo - Micro Human Interactions):</strong></p>
        <p>Hệ thống phân tích xác suất tương tác xã hội và tâm lý con người. Sử dụng Thiên Bàn Nguyệt Tướng phối Địa Bàn, thiết lập Tứ Khóa (Bốn mối quan hệ tương quan) và Tam Truyền (Sơ truyền, Trung truyền, Mạt truyền đại diện cho Quá khứ, Hiện tại, Tương lai) để giải mã tường tận mọi sự việc nhân sinh.</p>
      `
    }
  ],

  // 4. HÀ ĐỒ & LẠC THƯ FORMULA
  ha_do: {
    title: "Hà Đồ - Bản Thể Tiên Thiên & Trật Tự Sinh Thành",
    origin: "Tương truyền thời Phục Hy, Long Mã xuất hiện trên sông Hoàng Hà mang đồ hình chấm đen trắng từ 1 đến 10.",
    philosophy: "Hà Đồ biểu thị trạng thái Vũ trụ ở thế CÂN BẰNG TĨNH (Thể), là trật tự sinh thành của Ngũ Hành nguyên thủy. Vạn vật lấy 'Sinh' làm gốc, lấy 'Thành' làm quả.",
    formula: [
      { pair: "1 - 6", text: "Thiên nhất sinh Thủy, Địa lục thành chi", direction: "Phương Bắc", element: "Thủy", num_sinh: 1, num_thanh: 6, hanzi: "天一生水 地六成之" },
      { pair: "2 - 7", text: "Địa nhị sinh Hỏa, Thiên thất thành chi", direction: "Phương Nam", element: "Hỏa", num_sinh: 2, num_thanh: 7, hanzi: "地二生火 天七成之" },
      { pair: "3 - 8", text: "Thiên tam sinh Mộc, Địa bát thành chi", direction: "Phương Đông", element: "Mộc", num_sinh: 3, num_thanh: 8, hanzi: "天三生木 地八成之" },
      { pair: "4 - 9", text: "Địa tứ sinh Kim, Thiên cửu thành chi", direction: "Phương Tây", element: "Kim", num_sinh: 4, num_thanh: 9, hanzi: "地四生金 天九成之" },
      { pair: "5 - 10", text: "Thiên ngũ sinh Thổ, Địa thập thành chi", direction: "Trung Cung", element: "Thổ", num_sinh: 5, num_thanh: 10, hanzi: "天五生土 地十成之" }
    ],
    math_insight: "Tổng Thiên số lẻ (1+3+5+7+9=25) + Địa số chẵn (2+4+6+8+10=30) = 55 (Đại Diễn số). Hiệu số Thành và Sinh ở mọi hướng luôn bằng đúng 5 (Hằng số điều phối Thổ chuyển tiếp)."
  },

  lac_thu: {
    title: "Lạc Thư - Động Lực Hậu Thiên & Ma Trận Cửu Cung",
    origin: "Tương truyền thời Đại Vũ trị thủy, Thần Quy nổi lên từ sông Lạc mang ma trận cửu cung số học bí ẩn.",
    philosophy: "Lạc Thư biểu thị Vũ trụ ở thế VẬN ĐỘNG ĐỘNG LỰC HỌC (Dụng), là sự phân bố năng lượng theo không gian 8 hướng và thời gian 9 vận.",
    rhyme: "Đới cửu lý nhất (Đội 9 đạp 1)\nTả tam hữu thất (Trái 3 phải 7)\nNhị tứ vi kiên (2 và 4 làm hai vai)\nLục bát vi túc (6 và 8 làm hai chân)\nNgũ cư trung cung (5 ngự chính giữa)",
    matrix: [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ],
    math_insight: "Ma phương hoàn hảo bậc 3 (Magic Square of order 3). Mọi hàng ngang, cột dọc, đường chéo chính và phụ đều có tổng bằng đúng 15. Tổng toàn thể ma trận = 45."
  },

  // 5. BÁT QUÁI
  bat_quai: {
    tien_thien: {
      name: "Tiên Thiên Bát Quái (Phục Hy)",
      nature: "Bản thể đối xứng không gian, vũ trụ tĩnh tại (Thể)",
      quote: "Thiên Địa định vị, Sơn Trạch thông khí, Lôi Phong tương bạc, Thủy Hỏa bất tương xạ.",
      trigrams: [
        { name: "Càn", symbol: "Càn", binary: "111", direction: "Nam", nature: "Trời (Thiên)", element: "Kim (Cực Dương)", meaning: "Cương kiện, thuần dương, trọng trường phát xuất" },
        { name: "Khôn", symbol: "Khôn", binary: "000", direction: "Bắc", nature: "Đất (Địa)", element: "Thổ (Cực Âm)", meaning: "Nhu thuận, thuần âm, vật chất dung nạp" },
        { name: "Đoài", symbol: "Đoài", binary: "110", direction: "Đông Nam", nature: "Đầm (Trạch)", element: "Kim", meaning: "Hân hoan, giao hòa bề mặt" },
        { name: "Ly", symbol: "Ly", binary: "101", direction: "Đông", nature: "Lửa (Hỏa)", element: "Hỏa", meaning: "Sáng rực, nhiệt lượng, bên ngoài sáng bên trong rỗng" },
        { name: "Chấn", symbol: "Chấn", binary: "100", direction: "Đông Bắc", nature: "Sấm (Lôi)", element: "Mộc", meaning: "Động khởi, xung năng bộc phát dưới sâu" },
        { name: "Tốn", symbol: "Tốn", binary: "011", direction: "Tây Nam", nature: "Gió (Phong)", element: "Mộc", meaning: "Thâm nhập, thuận hòa, tản mạn" },
        { name: "Khảm", symbol: "Khảm", binary: "010", direction: "Tây", nature: "Nước (Thủy)", element: "Thủy", meaning: "Hiểm sâu, trôi chảy, bên ngoài mềm bên trong đặc" },
        { name: "Cấn", symbol: "Cấn", binary: "001", direction: "Tây Bắc", nature: "Núi (Sơn)", element: "Thổ", meaning: "Ngăn dừng, tĩnh lặng, bề mặt kiên cố" }
      ]
    },
    hau_thien: {
      name: "Hậu Thiên Bát Quái (Văn Vương)",
      nature: "Quy luật thời gian, chu kỳ 4 mùa, khí hậu và sinh thái Trái Đất (Dụng)",
      quote: "Đế xuất hồ Chấn, tề hồ Tốn, tương kiến hồ Ly, trí dịch hồ Khôn, duyệt ngôn hồ Đoài, chiến hồ Càn, lao hồ Khảm, thành ngôn hồ Cấn.",
      trigrams: [
        { name: "Khảm", symbol: "Khảm", number: 1, direction: "Chính Bắc", season: "Đông Chí (Tháng 11)", element: "Thủy", meaning: "Lao hồ Khảm - Mùa đông lắng đọng, phục tàng năng lượng" },
        { name: "Cấn", symbol: "Cấn", number: 8, direction: "Đông Bắc", season: "Lập Xuân (Tháng 1)", element: "Thổ", meaning: "Thành ngôn hồ Cấn - Điểm giao thời cuối đông đầu xuân, vạn vật chuyển hóa" },
        { name: "Chấn", symbol: "Chấn", number: 3, direction: "Chính Đông", season: "Xuân Phân (Tháng 2)", element: "Mộc", meaning: "Đế xuất hồ Chấn - Mùa xuân chấn động, mầm sống bật dậy" },
        { name: "Tốn", symbol: "Tốn", number: 4, direction: "Đông Nam", season: "Lập Hạ (Tháng 4)", element: "Mộc", meaning: "Tề hồ Tốn - Gió ấm thuận hòa, vạn vật đồng đều xanh tốt" },
        { name: "Ly", symbol: "Ly", number: 9, direction: "Chính Nam", season: "Hạ Chí (Tháng 5)", element: "Hỏa", meaning: "Tương kiến hồ Ly - Ánh dương chói lọi, vạn vật quang minh hội tụ" },
        { name: "Khôn", symbol: "Khôn", number: 2, direction: "Tây Nam", season: "Lập Thu (Tháng 7)", element: "Thổ", meaning: "Trí dịch hồ Khôn - Đất nuôi dưỡng trĩu hạt, vạn vật thành thục" },
        { name: "Đoài", symbol: "Đoài", number: 7, direction: "Chính Tây", season: "Thu Phân (Tháng 8)", element: "Kim", meaning: "Duyệt ngôn hồ Đoài - Mùa thu hoạch kết trái, vạn vật hân hoan" },
        { name: "Càn", symbol: "Càn", number: 6, direction: "Tây Bắc", season: "Lập Đông (Tháng 10)", element: "Kim", meaning: "Chiến hồ Càn - Âm Dương giao tranh, khí lạnh bắt đầu thâu tàng" }
      ]
    }
  },

  // 6. NGŨ HÀNH
  ngu_hanh: {
    phases: [
      {
        id: "wood",
        name: "Mộc",
        hanzi: "木",
        vector: "Vươn tỏa - Hướng thượng - Khúc trực",
        season: "Mùa Xuân (Dương khí sơ sinh)",
        direction: "Phương Đông",
        color: "#10B981",
        body: "Can (Gan), Cân (Gân), Mắt",
        sound: "Tiếng Giác (Giác âm)",
        taste: "Vị Chua (Toan)",
        nature: "Khí Ôn, chủ sự sinh trưởng, sáng tạo, khai mở, lòng nhân ái."
      },
      {
        id: "fire",
        name: "Hỏa",
        hanzi: "火",
        vector: "Bùng phát - Thăng hoa - Viêm thượng",
        season: "Mùa Hạ (Dương khí cực thịnh)",
        direction: "Phương Nam",
        color: "#EF4444",
        body: "Tâm (Tim), Mạch, Lưỡi",
        sound: "Tiếng Chủy (Chủy âm)",
        taste: "Vị Đắng (Khổ)",
        nature: "Khí Nhiệt, chủ sự bộc lộ, phát tán, huy hoàng, nhiệt huyết, lễ nghi."
      },
      {
        id: "earth",
        name: "Thổ",
        hanzi: "土",
        vector: "Trung hòa - Dung chứa - Giá sắc",
        season: "Trưởng Hạ / Tứ Quý (Chuyển tiếp 4 mùa)",
        direction: "Trung Ương",
        color: "#F59E0B",
        body: "Tỳ (Lá lách), Nhục (Thịt), Miệng",
        sound: "Tiếng Cung (Cung âm)",
        taste: "Vị Ngọt (Cam)",
        nature: "Khí Thấp, chủ sự nuôi dưỡng, chuyển tiếp, sinh hóa vạn vật, chữ tín."
      },
      {
        id: "metal",
        name: "Kim",
        hanzi: "金",
        vector: "Thu liễm - Ngưng kết - Tòng cách",
        season: "Mùa Thu (Âm khí sơ giáng)",
        direction: "Phương Tây",
        color: "#CBD5E1",
        body: "Phế (Phổi), Bì mao (Da lông), Mũi",
        sound: "Tiếng Thương (Thương âm)",
        taste: "Vị Cay (Tân)",
        nature: "Khí Táo, chủ sự nghiêm cẩn, thanh lọc, kỷ luật, kết tinh, nghĩa khí."
      },
      {
        id: "water",
        name: "Thủy",
        hanzi: "水",
        vector: "Lắng đọng - Thâm nhập - Nhuận hạ",
        season: "Mùa Đông (Âm khí cực thịnh)",
        direction: "Phương Bắc",
        color: "#3B82F6",
        body: "Thận (Thận), Cốt (Xương tủy), Tai",
        sound: "Tiếng Vũ (Vũ âm)",
        taste: "Vị Mặn (Hàm)",
        nature: "Khí Hàn, chủ sự tàng ẩn, thông tuệ, uyển chuyển, tiềm thức, trí tuệ."
      }
    ],
    cycles: {
      che_hoa_explain: "Nguyên lý Chế Hóa tối cao: Khắc mà có Sinh, Sinh mà có Khắc. Kim khắc Mộc, nhưng Mộc sinh Hỏa để Hỏa rèn Kim; Thủy khắc Hỏa, nhưng Hỏa sinh Thổ để Thổ chế ngự Thủy. Nhờ Chế Hóa mà vũ trụ luôn duy trì được trạng thái cân bằng nội môi trường (Homeostasis) bất diệt."
    }
  },

  // 7. KHO THƯ TỊCH CỔ & HƯỚNG DẪN SCRAPER / API
  data_sources: {
    title: "Kho Tàng Mã Nguồn & Thư Tịch Cổ Quốc Tế & Việt Nam",
    subtitle: "Các trung tâm lưu trữ văn bản mở để trích xuất, nghiên cứu học thuật và xây dựng cơ sở dữ liệu",
    repositories: [
      {
        name: "Chinese Text Project (CText)",
        url: "https://ctext.org/",
        type: "Database mở lớn nhất thế giới, hỗ trợ CText API & Text Tools",
        desc: "Lưu trữ toàn bộ trước tác Tiên Tần, Dịch học, Đạo gia, Nho gia, Binh gia bản chữ Hán cổ có tra cứu ngữ liệu song ngữ.",
        api_tip: "Có thể dùng thư viện Python `urllib` hoặc `requests` gọi API `/api.pl?if=en` để lấy JSON bản văn gốc kèm số chương đoạn."
      },
      {
        name: "Viện Nghiên Cứu Hán Nôm (Việt Nam)",
        url: "http://www.hannom.org.vn/",
        type: "Thư tịch cổ Việt Nam, mộc bản, thần phả, địa bạ",
        desc: "Lưu giữ hàng vạn tài liệu Hán Nôm, văn bia, gia phả ghi chép về thiên văn, phong thổ, y dược và cội nguồn Bách Việt.",
        api_tip: "Nghiên cứu cấu trúc phân loại danh mục mộc bản, trích lục bản dịch nghĩa của các nhà Hán Nôm học hàng đầu."
      },
      {
        name: "Scripta Sinica (Viện Hàn Lâm Academia Sinica - Đài Loan)",
        url: "https://hanchi.ihp.sinica.edu.tw/",
        type: "Kho dữ liệu Hán tịch chuẩn học thuật cao cấp nhất",
        desc: "Hơn 1.3 tỉ chữ văn bản cổ chuẩn xác tuyệt đối, bao gồm Nhị Thập Tứ Sử, Toàn Đường Văn, Tứ Khoa Toàn Thư.",
        api_tip: "Sử dụng cho việc đối chiếu văn bản học (Textual Criticism) để loại bỏ dị bản và sai lệch lịch sử."
      },
      {
        name: "Gallica - Thư Viện Quốc Gia Pháp (BNF)",
        url: "https://gallica.bnf.fr/",
        type: "Bản thảo cổ, bản đồ địa lý & tài liệu Đông Dương số hóa chất lượng cao",
        desc: "Chứa nhiều tài liệu quý hiếm về văn hóa, thiên văn, phong tục Lạc Việt được số hóa dạng PDF/IIIF độ nét cao.",
        api_tip: "Cung cấp IIIF API (International Image Interoperability Framework) để xem ảnh bản thảo trực tiếp trên canvas."
      }
    ],
    scraper_example_code: `# PYTHON SCRAPER TEMPLATE ĐỂ CÀO DỮ LIỆU CTEXT / KANRIPO
import requests
from bs4 import BeautifulSoup
import json

def fetch_ancient_text(urn_identifier):
    """
    Trích xuất văn bản cổ từ CText API / Web
    Ví dụ URN: ctext:dao-de-jing (Đạo Đức Kinh)
    """
    url = f"https://ctext.org/{urn_identifier}"
    headers = {"User-Agent": "AncientCosmologyResearcher/1.0"}
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        chapters = []
        for row in soup.find_all("table", class_="ctext"):
            chinese_text = row.find("td", class_="ctext").get_text(strip=True)
            chapters.append(chinese_text)
        return chapters
    return []

# Dữ liệu xuất ra JSON chuẩn để nạp vào Database trang web`
  },

  // 8. TRÍCH DẪN KINH ĐIỂN
  classics: [
    {
      source: "Kinh Dịch - Hệ Từ Thượng",
      original: "易有太極，是生兩儀，兩儀生四象，四象生八卦，八卦定吉凶，吉凶生大業。",
      trans: "Dịch hữu Thái Cực, thị sinh Lưỡng Nghi, Lưỡng Nghi sinh Tứ Tượng, Tứ Tượng sinh Bát Quái, Bát Quái định cát hung, cát hung sinh đại nghiệp.",
      meaning: "Trong đạo Dịch có Thái Cực, Thái Cực sinh Lưỡng Nghi, Lưỡng Nghi sinh Tứ Tượng, Tứ Tượng sinh Bát Quái, Bát Quái xác định trạng thái hòa hợp hay nghịch chuyển (Cát/Hung), hiểu rõ Cát Hung mới kiến tạo nên sự nghiệp lớn lao.",
      tag: "Khởi Nguyên"
    },
    {
      source: "Đạo Đức Kinh - Chương 42",
      original: "道生一，一生二，二生三，三生萬物。萬物負陰而抱陽，沖氣以為和。",
      trans: "Đạo sinh Nhất, Nhất sinh Nhị, Nhị sinh Tam, Tam sinh vạn vật. Vạn vật phụ Âm nhi bão Dương, trùng khí dĩ vi hòa.",
      meaning: "Đạo sinh Một (Thái Cực), Một sinh Hai (Âm Dương), Hai sinh Ba (Âm - Dương - Khí giao hòa), Ba sinh ra vạn vật. Vạn vật đều cõng Âm mà ôm Dương, nhờ dòng khí xung đột dung hòa mà đạt tới trạng thái hài hòa sinh sôi.",
      tag: "Bản Thể Luận"
    },
    {
      source: "Hoàng Đế Nội Kinh - Tố Vấn",
      original: "陰陽者，天地之道也，萬物之綱紀，變化之父母，生殺之本始，神明之府也。",
      trans: "Âm Dương giả, thiên địa chi đạo dã, vạn vật chi cương kỷ, biến hóa chi phụ mẫu, sinh sát chi bản thủy, thần minh chi phủ dã.",
      meaning: "Âm Dương chính là quy luật của Trời Đất, kỷ cương trật tự của muôn loài, cha mẹ của mọi sự biến dịch, nguồn gốc của sinh sôi và tiêu diệt.",
      tag: "Khí Hóa Y Đạo"
    },
    {
      source: "Việt Lý Tố Nguyên - Kim Định",
      original: "Dịch lý là bản đồ tâm thức và vũ trụ quan của nền văn minh lúa nước Bách Việt phương Nam.",
      trans: "Dịch lý nông nghiệp lúa nước.",
      meaning: "Khẳng định nền tảng thực nghiệm của Kinh Dịch khởi nguồn từ việc cày cấy, trông mưa trông nắng, quan sát dòng chảy sông nước của cư dân Việt cổ.",
      tag: "Cội Nguồn Việt"
    }
  ]
};
