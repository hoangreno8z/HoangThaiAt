/**
 * PHONG THỦY THỜ CÚNG CHÁNH TÔNG (KHO TÀNG CỔ THƯ & QUY THỨC TẾ TỰ)
 * ĐẠI HỆ THỐNG TOÀN THƯ: 10 TIẾT HỌC THUẬT, MẬT TRUYỀN PHẦN LINH & 2 ĐẠI CHUYÊN ĐỀ TỐI HẬU
 */

// TIẾT I: KHỞI NGUYÊN BẢN THỂ & NGUYÊN TẮC TỌA VỊ
const WORSHIP_FENGSHUI_PART_1 = {
  chapter_id: "tho_cung_part_1",
  chapter_title: "Tiết I: Khởi Nguyên Bản Thể & Nguyên Tắc Tọa Vị Gian Thờ",
  sub_title: "Định vị trung tâm linh giác gia trạch, cơ chế nạp thanh khí và phép lập hướng Tọa Cát Hướng Cát",
  
  ontology: {
    title: "1. Bản Thể Luận: Thần Vị Là Căn Bản Của Dương Trạch",
    quote: "Vạn vật bản hồ Thiên, nhân bản hồ Tổ. Tri ân báo bản, thần minh chi sở quy.",
    quote_source: "Kinh Lễ - Tế Nghĩa Thiên",
    principles: [
      { name: "Cơ Chế Khí Hóa Tâm Linh (Linh Khí & Thần Minh Chi Sở)", desc: "Trong phong thủy dương trạch, Gian thờ (Thần Vị) không chỉ là nơi tưởng nhớ mà là 'Trọng tâm Linh Giác' kết nối trường năng lượng của huyết thống gia tộc với Thiên Địa linh khí." },
      { name: "Quy Luật Âm Dương Bình Hành Trong Phòng Thờ", desc: "Không gian thờ cúng mang bản tính 'Âm Tĩnh' (cần trang nghiêm trầm mặc để tụ khí), nhưng đối tượng phụng thờ lại mang năng lượng 'Dương Quang' (ấm áp quang minh)." }
    ]
  },

  orientation_rules: {
    title: "2. Phép Định Phương Vị: 'Tọa Cát Hướng Cát' Nghiêm Ngặt",
    comparison_with_kitchen: "Khác biệt bản chất với Bếp Nấu (Bếp dùng phép 'Tọa Hung Hướng Cát' để mượn Hỏa môn thiêu đốt hung sát), Ban Thờ là nơi nạp tôn quý thần linh, BẮT BUỘC PHẢI 'TỌA CÁT HƯỚNG CÁT'.",
    palace_requirements: [
      { palace: "Cung Tọa (Vị trí đặt lưng ban thờ)", requirement: "Phải ngự tại các cung Sinh Khí, Diên Niên, Thiên Y, Phục Vị (Bát Trạch) hoặc đắc Sơn Tinh sinh vượng (Huyền Không)." },
      { palace: "Cung Hướng (Phương hướng mặt tiền ban thờ trông về)", requirement: "Phải nhìn về hướng đón ánh sáng tự nhiên ôn hòa, hướng Sinh Khí hoặc Thiên Y." }
    ]
  },

  loan_dau_rules: {
    title: "3. Quy Tắc Hình Thế Loan Đầu Gian Thờ (Tàng Phong Tụ Khí)",
    rules: [
      { aspect: "Hậu Chẩm (Bức Tường Tựa Lưng Phía Sau)", standard: "Lưng ban thờ bắt buộc phải tựa vào Bức Tường Vững Chắc (Thực Tường), phẳng phiu, sạch sẽ.", prohibitions: "CẤM KỴ: Không tựa vào kính, cửa sổ rỗng, tường nhà vệ sinh, vách phòng ngủ vợ chồng, tường có ống nước chảy bên trong." },
      { aspect: "Minh Đường (Khoảng Không Gian Phía Trước)", standard: "Khoảng không trước ban thờ phải sáng sủa, thoáng đãng, chiều sâu tối thiểu gấp 3 lần chiều rộng ban thờ.", prohibitions: "CẤM KỴ: Trực diện cửa chính đâm vào (trực xung sát), dầm xà ngang đè lên bát hương (áp đỉnh sát), gương soi chiếu vào." }
    ]
  },

  battrach_worship_matrix: [
    { gua: "Càn (Tây Tứ Mệnh)", best_pos: "Tọa Tây Bắc hướng Đông Nam, hoặc Tọa Tây hướng Đông, Tọa Đông Bắc hướng Tây Nam", note: "Đắc Thiên Y / Sinh Khí củng cố quyền uy gia chủ." },
    { gua: "Khảm (Đông Tứ Mệnh)", best_pos: "Tọa Bắc hướng Nam, hoặc Tọa Đông Nam hướng Tây Bắc, Tọa Đông hướng Tây", note: "Đắc Diên Niên / Sinh Khí gia đạo hòa thuận, thông tuệ." },
    { gua: "Cấn (Tây Tứ Mệnh)", best_pos: "Tọa Đông Bắc hướng Tây Nam, hoặc Tọa Tây Nam hướng Đông Bắc, Tọa Tây hướng Đông", note: "Đắc Phục Vị / Sinh Khí bền vững điền sản nhân đinh." },
    { gua: "Chấn (Đông Tứ Mệnh)", best_pos: "Tọa Đông hướng Tây, hoặc Tọa Nam hướng Bắc, Tọa Bắc hướng Nam", note: "Đắc Phục Vị / Sinh Khí dòng trưởng hưng thịnh phát đạt." },
    { gua: "Tốn (Đông Tứ Mệnh)", best_pos: "Tọa Đông Nam hướng Tây Bắc, hoặc Tọa Bắc hướng Nam, Tọa Nam hướng Bắc", note: "Đắc Phục Vị / Sinh Khí văn chương khoa cử hiển đạt." },
    { gua: "Ly (Đông Tứ Mệnh)", best_pos: "Tọa Nam hướng Bắc, hoặc Tọa Đông hướng Tây, Tọa Đông Nam hướng Tây Bắc", note: "Đắc Phục Vị / Sinh Khí quang minh lỗi lạc, hỷ tài." },
    { gua: "Khôn (Tây Tứ Mệnh)", best_pos: "Tọa Tây Nam hướng Đông Bắc, hoặc Tọa Tây hướng Đông, Tọa Tây Bắc hướng Đông Nam", note: "Đắc Phục Vị / Sinh Khí mẫu nghi hiền thục, tích lũy tài lộc." },
    { gua: "Đoài (Tây Tứ Mệnh)", best_pos: "Tọa Tây hướng Đông, hoặc Tọa Tây Bắc hướng Đông Nam, Tọa Tây Nam hướng Đông Bắc", note: "Đắc Phục Vị / Sinh Khí phúc thọ miên trường, gia hòa vạn sự hưng." }
  ]
};

// TIẾT II: THƯỚC LỖ BAN & KÍCH THƯỚC BÀN THỜ CHUẨN PHONG THỦY (THƯỚC 38.8CM ÂM PHẦN)
const WORSHIP_FENGSHUI_PART_2 = {
  chapter_id: "tho_cung_part_2",
  chapter_title: "Tiết II: Thước Lỗ Ban 38.8cm & Kích Thước Bàn Thờ Chuẩn Phong Thủy",
  sub_title: "Phân biệt 3 loại Thước Lỗ Ban, cấu trúc 10 Cung Thước 38.8cm (Âm Phần/Bàn Thờ) & Kích Thước Bàn Thờ Đại Cát",
  
  ruler_classification: {
    title: "1. Phân Biệt Ba Loại Thước Lỗ Ban Trong Phong Thủy Cổ Truyền",
    quote: "Kích thước bất hợp độ số, tắc họa phúc vô sở quy.",
    quote_source: "Lỗ Ban Kinh Chánh Tông",
    rulers: [
      { name: "Thước Lỗ Ban 52.2 cm (Thông Thủy / Khối Rỗng)", use_case: "Dùng để đo lường các khoảng lọt sáng của cửa đi, cửa sổ, giếng trời, chiều cao tầng nhà." },
      { name: "Thước Lỗ Ban 42.9 cm (Dương Trạch / Khối Đặc)", use_case: "Dùng để đo kích thước phủ bì các vật dụng nội thất dương trạch (giường, tủ, bàn làm việc, kệ bếp)." },
      { name: "Thước Lỗ Ban 38.8 cm (Âm Phần & Thờ Cúng)", use_case: "ĐẶC TRÁCH CHO KHÔNG GIAN TÂM LINH: Đo bàn thờ, tủ thờ, án gian, ngai thờ, bài vị, mộ phần. Gồm 10 cung (6 Cát, 4 Hung)." }
    ]
  },

  ruler_388_structure: {
    title: "2. Cấu Trúc 10 Cung Thước Lỗ Ban 38.8cm (Âm Phần / Bàn Thờ)",
    cycle_length: 38.8,
    palaces: [
      { index: 1, name: "Đinh (丁)", type: "cat", color: "#10B981", length: "0 - 3.88 cm", desc: "Cung Đinh (Tốt): Phúc lộc gia đình, con cháu đỗ đạt.", sub_palaces: ["Phúc Tinh", "Cập Đệ", "Tài Vượng", "Đăng Khoa"] },
      { index: 2, name: "Hại (害)", type: "hung", color: "#EF4444", length: "3.88 - 7.76 cm", desc: "Cung Hại (Xấu): Tai ương bất ngờ, thị phi phiền toái.", sub_palaces: ["Khẩu Thiệt", "Bệnh Lâm", "Tử Tuyệt", "Tai Chí"] },
      { index: 3, name: "Vượng (旺)", type: "cat", color: "#10B981", length: "7.76 - 11.64 cm", desc: "Cung Vượng (Tốt): Vượng khí ngập tràn, việc mừng liên tiếp.", sub_palaces: ["Thiên Đức", "Hỷ Sự", "Tiến Bảo", "Nạp Phúc"] },
      { index: 4, name: "Khổ (苦)", type: "hung", color: "#EF4444", length: "11.64 - 15.52 cm", desc: "Cung Khổ (Xấu): Cay đắng nhọc nhằn, hao tốn tiền của.", sub_palaces: ["Thất Thoát", "Quan Quỷ", "Kiếp Tài", "Vô Tự"] },
      { index: 5, name: "Nghĩa (義)", type: "cat", color: "#10B981", length: "15.52 - 19.40 cm", desc: "Cung Nghĩa (Tốt): Quý nhân giúp đỡ, tăng trưởng điền trạch.", sub_palaces: ["Đại Cát", "Tài Vượng", "Ích Tử", "Thiên Khố"] },
      { index: 6, name: "Quan (官)", type: "cat", color: "#10B981", length: "19.40 - 23.28 cm", desc: "Cung Quan (Tốt): Quan lộ thăng tiến, quyền chức hiển hách.", sub_palaces: ["Thuận Khoa", "Hoạch Tài", "Tiến Ích", "Phú Quý"] },
      { index: 7, name: "Tử (死)", type: "hung", color: "#EF4444", length: "23.28 - 27.16 cm", desc: "Cung Tử (Cực Xấu): Tử biệt ly tán, phá sản tiêu điều.", sub_palaces: ["Ly Hương", "Tử Biệt", "Thoái Đinh", "Thất Tài"] },
      { index: 8, name: "Hưng (興)", type: "cat", color: "#10B981", length: "27.16 - 31.04 cm", desc: "Cung Hưng (Tốt): Sinh con quý tử, gia đạo hưng thịnh.", sub_palaces: ["Đăng Khoa", "Quý Tử", "Thêm Đinh", "Hưng Vượng"] },
      { index: 9, name: "Thất (失)", type: "hung", color: "#EF4444", length: "31.04 - 34.92 cm", desc: "Cung Thất (Xấu): Mất mát cô độc, dính vòng lao lý.", sub_palaces: ["Cô Quả", "Lao Chấp", "Công Sự", "Thoái Tài"] },
      { index: 10, name: "Tài (財)", type: "cat", color: "#10B981", length: "34.92 - 38.80 cm", desc: "Cung Tài (Tốt): Tài lộc dồi dào, vạn sự viên mãn.", sub_palaces: ["Nghinh Phúc", "Lục Hợp", "Tiến Bảo", "Tài Đức"] }
    ]
  },

  altar_golden_dimensions: {
    title: "3. Kích Thước Bàn Thờ Chuẩn Hoàng Kim (Thước 38.8cm)",
    standing_altars: [
      { width: "127 cm (Tiến Bảo)", depth: "61 cm (Tài Lộc)", height: "127 cm (Tiến Bảo)", suit_for: "Không gian thờ cúng vừa và nhỏ, nhà phố, chung cư." },
      { width: "153 cm (Lục Hợp)", depth: "67 cm (Quý Tử)", height: "127 cm (Tiến Bảo)", suit_for: "Không gian trang nghiêm, nhà ở tầm trung và nhà liền kề." },
      { width: "175 cm (Phú Quý)", depth: "81 cm (Đăng Khoa)", height: "127 cm (Tiến Bảo)", suit_for: "Phòng thờ riêng biệt, nhà biệt thự, nhà cổ truyền thống." },
      { width: "197 cm (Đăng Khoa)", depth: "89 cm (Thêm Phúc)", height: "127 cm (Tiến Bảo)", suit_for: "Nhà thờ họ, từ đường, phòng thờ gia tộc lớn." },
      { width: "217 cm (Thuận Khoa)", depth: "107 cm (Thêm Đinh)", height: "127 cm (Tiến Bảo)", suit_for: "Đại từ đường, sập thờ lớn, quy mô đại gia tộc." }
    ],
    hanging_altars: [
      { depth: "48 cm (Hỷ Sự)", width: "81 cm (Đăng Khoa)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Căn hộ chung cư nhỏ, bài trí 1 bát hương." },
      { depth: "48 cm (Hỷ Sự)", width: "88 cm (Tiến Bảo)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Căn hộ chung cư vừa, bày 1 đến 3 bát hương." },
      { depth: "49.5 cm (Tiến Bảo)", width: "95 cm (Tài Vượng)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Căn hộ có diện tích phòng khách rộng." },
      { depth: "61 cm (Tài Lộc)", width: "107 cm (Quý Tử)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Bàn thờ treo cỡ lớn, bày đủ tam cấp trang trọng." }
    ]
  }
};

// TIẾT III: BÀI TRÍ BÁT HƯƠNG, NGŨ HÀNH ĐỒ THỜ & NGUYÊN TẮC TỤ KHÍ BÀN THỜ
const WORSHIP_FENGSHUI_PART_3 = {
  chapter_id: "tho_cung_part_3",
  chapter_title: "Tiết III: Bài Trí Bát Hương, Ngũ Hành Đồ Thờ & Cốt Thất Bảo Chánh Tông",
  sub_title: "Quy thức Tam Cấp Thần Vị, bố cục 'Đông Bình Tây Quả', Ngũ Hành Đồ Thờ và thuật nạp Thất Bảo tụ khí linh thiêng",

  incense_burners_layout: {
    title: "1. Quy Thức Bài Trí Bát Hương (Tam Cấp Thần Vị)",
    quote: "Thần linh cư trung, Tiên tổ cư tả, Cô Mãnh cư hữu. Ngôi thứ phân minh, âm dương đắc tự.",
    quote_source: "Chu Tử Gia Lễ (Tế Lễ Quy Thức)",
    burners: [
      { position: "Chính Giữa (Tọa Trung - Kê Cao Nhất)", worship: "Thờ Quan Lớn Đệ Nhất Thần Linh / Thổ Công / Đông Trù Tư Mệnh Táo Phủ Thần Quân / Long Mạch Tôn Thần", specification: "Bát hương lớn nhất, kê cao hơn hai bên từ 3cm đến 5cm." },
      { position: "Bên Tay Phải (Nhìn từ ngoài vào)", worship: "Thờ Gia Tiên Tiền Tổ / Cụ Ông Cụ Bà Nội Ngoại", specification: "Kê thấp hơn bát hương trung tâm, cách tối thiểu 10cm - 15cm." },
      { position: "Bên Tay Trái (Nhìn từ ngoài vào)", worship: "Thờ Bà Cô Ông Mãnh / Huyền Cô Huyền Cậu / Tiền Chủ Hậu Chủ", specification: "Kê bằng độ cao với bát hương Gia Tiên, đối xứng qua trục tâm." }
    ]
  },

  five_elements_worship: {
    title: "2. Cơ Cấu Ngũ Hành Tương Sinh Trên Mặt Bàn Thờ",
    desc: "Mặt bàn thờ là một tiểu vũ trụ thu nhỏ, bắt buộc hội tụ đầy đủ 5 nguyên lý Ngũ Hành:",
    elements: [
      { element: "Kim (金) - Nghiêm Cẩn Tinh Khiết", items: "Đỉnh đồng, đôi hạc ngự quy, đôi chân nến đồng, mâm bồng đồng.", role: "Trang nghiêm, khúc xạ ánh sáng ấm, ngưng tụ kim khí xua đuổi tà khí." },
      { element: "Mộc (木) - Sinh Trưởng Hướng Thượng", items: "Bàn thờ gỗ (gụ, hương, mít, dổi), bài vị gỗ, hoa tươi.", role: "Sinh khí mùa xuân, nuôi dưỡng sự phát triển bền vững." },
      { element: "Thủy (水) - Nhu Thuận Thanh Tịnh", items: "Kỷ chén đựng nước sạch và rượu, bình cắm hoa tươi.", role: "Tẩy uế, nuôi dưỡng thanh khí, duy trì sự lưu thông tài lộc." },
      { element: "Hỏa (火) - Thăng Hoa Linh Thông", items: "Đèn dầu, đèn thờ ánh sáng vàng, nến sáp, nén hương đỏ.", role: "Tâm hỏa bừng sáng, kết nối vô hình giữa cõi âm và cõi dương." },
      { element: "Thổ (土) - Vững Vàng Dung Nạp", items: "Bát hương gốm sứ Bát Tràng, đĩa sứ, tro nếp sạch.", role: "Đất mẹ dung nạp vạn vật, tạo điểm tựa tâm linh kiên cố." }
    ]
  },

  dong_binh_tay_qua: {
    title: "3. Nguyên Tắc Bố Cục 'Đông Bình Tây Quả' & 'Tả Thanh Long Hữu Bạch Hổ'",
    principles: [
      { name: "Đông Bình - Tây Quả", desc: "Bên TAY TRÁI (Đông) đặt Bình Hoa; Bên TAY PHẢI (Tây) đặt Đĩa Quả. Gió Đông đưa hương hoa qua đĩa quả sang Tây tạo luồng sinh khí tuần hoàn." },
      { name: "Tả Thanh Long - Hữu Bạch Hổ", desc: "Bên Tả (Thanh Long - Mộc): Bố trí đồ cao (Bình hoa, Hạc thờ). Bên Hữu (Bạch Hổ - Kim): Bố trí đồ thấp (Mâm quả, Kỷ nước)." }
    ]
  },

  that_bao_consecration: {
    title: "4. Thuật Nạp Cốt Thất Bảo & Tro Nếp Tụ Khí Bát Hương",
    quote: "Thất bảo nạp cốt, linh khí sở quy. Tro nếp tịnh thổ, vạn đại an khang.",
    quote_source: "Khai Quang Tế Tự Mật Chỉ",
    seven_treasures: [
      { name: "Vàng (Kim)", meaning: "Bất biến, tôn quý, tịch tà tối thượng." },
      { name: "Bạc (Ngân)", meaning: "Thanh khiết, quang minh, trừ khử chướng khí." },
      { name: "Ngọc Bích (Ngọc)", meaning: "Nhu hòa, quý phái, tích tụ tinh hoa trời đất." },
      { name: "Hổ Phách", meaning: "Hóa thạch ngàn năm, kết nối linh khí âm dương." },
      { name: "Xà Cừ (Ngọc Trai)", meaning: "Tinh hoa đại dương, điều hòa thủy khí an lành." },
      { name: "San Hô Đỏ", meaning: "Trường thọ, may mắn, vượng khí." },
      { name: "Mã Não", meaning: "Đá quý tự nhiên mang từ trường bảo hộ bình an." }
    ],
    ash_rule: "Bắt buộc dùng Tro Rơm Nếp Sạch trộn Ngũ Vị Hương và nước gừng tẩy uế. TUYỆT ĐỐI KHÔNG DÙNG CÁT XÂY DỰNG."
  }
};

// TIẾT IV: 18 ĐẠI KỴ TRONG PHONG THỦY BÀN THỜ & PHÉP HÓA GIẢI CHÁNH TÔNG
const WORSHIP_FENGSHUI_PART_4 = {
  chapter_id: "tho_cung_part_4",
  chapter_title: "Tiết IV: 18 Đại Kỵ Phong Thủy Bàn Thờ & Phương Pháp Hóa Giải Chánh Tông",
  sub_title: "Tổng hợp 18 sát khí nguy hiểm nhất đối với Thần Vị gia trạch từ Dương Trạch Tam Yếu & Lỗ Ban Kinh",

  taboo_categories: [
    {
      category_name: "Nhóm I: Đại Kỵ Về Không Gian Vị Trí (Tọa & Tựa Sát)",
      items: [
        { id: 1, name: "Ban thờ tựa lưng hoặc đối diện Nhà Vệ Sinh (Uế Khí Xung Sát)", danger: "Uế khí ẩm mốc xâm phạm linh vị, gia đạo lục đục, bệnh tật tiêu hao tiền của.", remedy: "Di chuyển vị trí; hoặc dựng vách gỗ kín 2 lớp ngăn cách và treo rèm hạt gỗ." },
        { id: 2, name: "Ban thờ đặt dưới hoặc cạnh Bếp Nấu (Hỏa Thiêu Thần Vị)", danger: "Hỏa khí thiêu đốt linh khí, tính khí gia chủ nóng nảy, dễ xảy ra tai ương.", remedy: "Tách biệt khỏi bếp nấu, tạo lớp cách nhiệt hoặc vách thạch cao ngăn Hỏa." },
        { id: 3, name: "Ban thờ tựa lưng vào Phòng Ngủ Vợ Chồng (Bất Kính Sắc Khí)", danger: "Phạm giới sắc bất kính, sinh bất hòa vợ chồng, giấc ngủ mộng mị.", remedy: "Kê giường cách xa tường thờ, bố trí tủ quần áo làm lớp đệm ngăn cách." },
        { id: 4, name: "Dầm xà ngang đè lên đỉnh Bàn Thờ (Áp Đỉnh Sát)", danger: "Áp lực trường khí nặng nề, ức chế công danh, đau đầu suy nhược.", remedy: "Làm trần thạch cao che kín xà dầm, hoặc treo hồ lô gỗ đào hóa sát." },
        { id: 5, name: "Đặt bàn thờ dưới gầm Cầu Thang (Đạp Đầu Sát / Tiệt Khí)", danger: "Người giẫm đạp lên đầu linh vị, sinh khí bị đè nén khiến sa sút tài vận.", remedy: "Tuyệt đối không đặt dưới cầu thang, chuyển lên gian phòng trang nghiêm trên cao." }
      ]
    },
    {
      category_name: "Nhóm II: Đại Kỵ Về Luồng Khí & Hướng Chiếu (Xung Khí Sát)",
      items: [
        { id: 6, name: "Cửa chính đâm thẳng vào chính diện Bàn Thờ (Trực Xung Sát)", danger: "Gió xộc thẳng làm tán động chân khí, người ngoài nhìn thấu nội đường.", remedy: "Lắp bình phong gỗ hoặc rèm che rủ trước bàn thờ để dòng khí uốn lượn tụ khí." },
        { id: 7, name: "Nắng gắt chiếu thẳng hoặc Gió lùa lồng lộng (Phong Xung & Quang Sát)", danger: "Dương khí thái quá hoặc gió mạnh làm tắt hương, cháy chân nhang.", remedy: "Kéo rèm che cửa sổ bằng gấm hoặc gỗ, dùng vách chắn gió lùa trực diện." },
        { id: 8, name: "Gương soi phản chiếu trực tiếp vào Bàn Thờ (Quang Minh Đảo Điên Sát)", danger: "Gương sinh từ trường phản xạ hỗn loạn, kinh động vong linh tiền tổ.", remedy: "Tháo bỏ gương hoặc di dời gương sang vị trí khác." },
        { id: 9, name: "Bàn thờ đặt sát lối đi lại ồn ào (Động Sát)", danger: "Mất tính Âm Tĩnh tôn nghiêm, linh khí bị kinh động làm gia đạo hay tranh cãi.", remedy: "Lập vách CNC chắn lối đi, tạo không gian phòng thờ biệt lập thanh tịnh." }
      ]
    },
    {
      category_name: "Nhóm III: Đại Kỵ Về Bát Hương & Đồ Thờ (Vật Khí Sát)",
      items: [
        { id: 10, name: "Tự tiện xê dịch xoay chuyển Bát Hương (Động Bát Hương Sát)", danger: "Đứt gãy trường năng lượng bảo hộ, tán tài tán lộc.", remedy: "Cố định bát hương bằng đôn gỗ/keo dán. Khi bao sái chỉ dùng khăn lau quanh." },
        { id: 11, name: "Bày hoa giả, quả nhựa, đồ chơi lên Bàn Thờ (Hư Linh Bất Kính)", danger: "Đồ giả mang năng lượng chết, làm giảm sút linh khí trang nghiêm.", remedy: "Chỉ dùng hoa tươi, quả tươi thật dâng cúng, héo úa phải thay ngay." },
        { id: 12, name: "Đồ đạc bừa bãi dưới gầm chân Bàn Thờ (Tạp Vật Ô Trọc)", danger: "Quạt hỏng, chổi quét nhà sinh uế khí bốc lên, cản trở tài lộc.", remedy: "Dọn dẹp sạch sẽ gầm bàn thờ, chỉ để trống hoặc để đồ cúng lễ sạch sẽ." },
        { id: 13, name: "Thờ lẫn lộn quá nhiều Bát Hương (Khí Trường Hỗn Loạn)", danger: "Cắm lẫn lộn bát hương họ nội ngoại gây xung đột trường khí.", remedy: "Quy hoạch chuẩn 3 bát hương; thờ họ ngoại lập ban riêng." },
        { id: 14, name: "Tượng Phật đặt thấp hơn Bài Vị Gia Tiên (Nghịch Ngôi Tôn Ty)", danger: "Phạm nghịch ngôi thứ với bậc Giác ngộ, tổn hao phúc đức.", remedy: "Tượng Phật bắt buộc đặt ở tầng trên cao hơn hẳn bài vị gia tiên." },
        { id: 15, name: "Dùng hương tẩm hóa chất cuốn tàn độc hại (Ô Nhiễm Khí Trường)", danger: "Hóa chất cháy sinh độc hại, làm tán mất chân khí thanh tịnh.", remedy: "Sử dụng hương thảo mộc tự nhiên (trầm, quế, bài) thuần khiết an toàn." },
        { id: 16, name: "Bàn thờ đặt trên nóc Tủ Quần Áo / Kệ Sinh Hoạt", danger: "Đóng mở tủ sinh rung lắc mạnh, làm động bát hương.", remedy: "Sử dụng bàn thờ chân đứng độc lập vững chãi hoặc bàn thờ treo kiên cố." },
        { id: 17, name: "Đèn thờ nhấp nháy nhiều màu hoặc quá chói lọi (Hỗn Loạn Quang Sát)", danger: "Kích động thần kinh, phá vỡ bầu không khí trang nghiêm.", remedy: "Dùng đèn thờ ánh sáng vàng ấm cố định (2700K - 3000K) dịu nhẹ." },
        { id: 18, name: "Đặt Bể Cá Cảnh ngay dưới hoặc cạnh Bàn Thờ (Chính Thần Hạ Thủy)", danger: "Nước chuyển động dập tắt hỏa khí ngưng tụ, gây tán tài phá sản.", remedy: "Di dời bể cá sang phòng khách, giữ khu vực thờ cúng khô ráo thanh tịnh." }
      ]
    }
  ]
};

// TIẾT V: NGHI THỨC BAO SÁI BÁT HƯƠNG, TẨY UẾ & RÚT TỈA CHÂN NHANG CHÁNH TÔNG
const WORSHIP_FENGSHUI_PART_5 = {
  chapter_id: "tho_cung_part_5",
  chapter_title: "Tiết V: Nghi Thức Bao Sái Bát Hương, Tẩy Uế & Rút Tỉa Chân Nhang",
  sub_title: "Trích từ Chu Tử Gia Lễ (Tu Sái Chương): Thời điểm hoàng đạo, quy trình 5 bước bao sái tịnh hóa và bài Văn Khấn Cổ Truyền",

  preparation_and_timing: {
    title: "1. Thời Điểm Hoàng Đạo & Chuẩn Bị Nước Tẩy Uế Thuần Tịnh",
    quote: "Tu sái thần vị, tẩy trừ trần trọc. Thân tâm thanh tịnh, cảm ứng thần minh.",
    quote_source: "Chu Tử Gia Lễ - Tu Sái Chi Nghi",
    timing_rules: [
      { name: "Thời Điểm Đại Lễ Cuối Năm", detail: "Nghi lễ trang trọng nhất diễn ra từ ngày 23 tháng Chạp đến ngày 30 tháng Chạp." },
      { name: "Thời Điểm Định Kỳ Trong Năm", detail: "Thực hiện vào các ngày sóc vọng (mùng 1, rằm), ngày giỗ chạp, hoặc khi chân nhang quá đầy." },
      { name: "Khung Giờ Hoàng Đạo Tốt Nhất", detail: "Giờ Thìn (7h - 9h sáng), Giờ Tỵ (9h - 11h trưa), hoặc Giờ Thân (15h - 17h chiều)." }
    ],
    purification_water: [
      { name: "Nước Ngũ Vị Hương (Thảo Mộc Dương Khí)", recipe: "Nấu từ 5 loại thảo mộc: Quế, Hồi, Đinh hương, Gỗ vang (hoặc vỏ bưởi/sả), Trầm hương." },
      { name: "Rượu Gừng Tẩy Uế (Dương Hỏa Khử Tà)", recipe: "Rượu trắng nguyên chất ngâm gừng tươi giã nhuyễn, tính dương nhiệt cực mạnh." }
    ]
  },

  five_steps_process: {
    title: "2. Quy Trình 5 Bước Bao Sái Bát Hương & Tịnh Hóa Bàn Thờ",
    steps: [
      { step: "Bước 1: Tắm Gội Sạch Sẽ & Thắp Hương Khấn Xin Phép", action: "Gia chủ tắm gội thanh tịnh, trang phục nghiêm trang, thắp 3 nén hương trầm, đọc bài Văn Khấn Xin Bao Sái." },
      { step: "Bước 2: Thứ Tự Lau Dọn Ban Thờ (Từ Trên Xuống Dưới, Từ Tôn Đến Ti)", action: "Lau tượng Phật trước  →  Lau bài vị Thần Linh  →  Lau bài vị Gia Tiên  →  Lau ngai thờ, chân nến." },
      { step: "Bước 3: Rút Tỉa Chân Nhang (Tuyệt Đối Bất Động Bát Hương)", action: "Một tay giữ chặt thân bát hương, tay kia nhẹ nhàng rút chân nhang. Chỉ để lại số lẻ mang tính Dương: 3, 5, 7 hoặc 9 chân nhang." },
      { step: "Bước 4: Bổ Sung Tro Nếp & Vệ Sinh Thân Bát Hương", action: "Múc bớt tro thừa, bổ sung tro nếp mới, nén phẳng mặt. Dùng khăn mềm thấm nước rượu gừng lau sạch thân bát hương." },
      { step: "Bước 5: An Vị Đồ Thờ & Thắp Hương Tạ Lễ", action: "Sắp xếp đồ thờ đúng trật tự Đông Bình Tây Quả, dâng hoa tươi quả mới, thắp tuần hương mới tạ lễ thỉnh thần an vị." }
    ]
  },

  canonical_prayer: {
    title: "3. Văn Khấn Xin Bao Sái Bát Hương & Tỉa Chân Nhang Cổ Truyền",
    invocation_text: `Nam mô A Di Đà Phật! (3 lần, 3 lạy)
Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Quan Đương niên Hành khiển Thái Tuế chí đức Tôn thần.
Con kính lạy ngài Bản Cảnh Thành Hoàng Chư vị Đại Vương.
Con kính lạy ngài Bản xứ Thần linh Thổ địa, Đông Trù Tư Mệnh Táo Phủ Thần Quân, Long Mạch Ngũ Phương Ngũ Thổ Tôn Thần.
Con kính lạy Hội đồng Tiên tổ nội ngoại dòng họ..., các bậc Tiền bối, Hậu bối, Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Bà Cô Ông Mãnh tại gia.

Hôm nay là ngày... tháng... năm...
Tín chủ (chúng) con là:..., ngụ tại số nhà:...
Nhân tiết giao thời, lòng thành kính cẩn, con xin được sửa biện hương hoa lễ vật, dâng lên trước án.
Kính xin chư vị Tôn Thần, chư vị Tiên Tổ giáng lâm án tiền, chứng giám lòng thành.

Nay trần trọc bụi bặm bám nơi khám thờ, con xin phép được bao sái tịnh hóa bàn thờ, rút tỉa chân nhang, lau dọn thần vị để đón rước thanh khí.
Kính xin Chư vị Tôn Thần, Tiên Tổ tạm lánh sang một bên để con cháu tiện việc bao sái lau dọn.
Cúi xin phù hộ độ trì cho toàn gia an khang thịnh vượng, vạn sự hanh thông, sở cầu như ý, sở nguyện tòng tâm.

Chúng con lễ bạc tâm thành, trước án kính lễ, cúi xin chứng giám soi xét.
Nam mô A Di Đà Phật! (3 lần, 3 lạy)`
  }
};

// TIẾT VI: PHONG THỦY BÀN THỜ THẦN TÀI - THỔ ĐỊA & QUY TẮC CHIÊU TÀI TỤ BẢO
const WORSHIP_FENGSHUI_PART_6 = {
  chapter_id: "tho_cung_part_6",
  chapter_title: "Tiết VI: Phong Thủy Bàn Thờ Thần Tài - Thổ Địa & Quy Tắc Chiêu Tài Tụ Bảo",
  sub_title: "Trích xuất từ Chiêu Tài Tụ Bảo Bí Pháp & Địa Lý Toàn Thư: Bản chất linh vị sát đất, cung Thiên Lộc - Quý Nhân và bài trí Ngũ Phương Ngũ Thổ",

  deity_nature: {
    title: "1. Bản Chất Linh Vị Của Thần Tài - Thổ Địa & Phép Tiếp Địa Khí",
    quote: "Thổ sinh Kim tắc phú quý tự lai, Địa khí thông tắc tài nguyên cuồn cuộn.",
    quote_source: "Chiêu Tài Tụ Bảo Bí Pháp",
    deities: [
      { name: "Phúc Đức Chánh Thần (Thổ Địa Tôn Thần)", position: "Ngự bên TAY PHẢI (nhìn từ ngoài vào)", role: "Cai quản long mạch, bảo hộ đất đai, ngăn chặn tà ma ám khí quấy phá trạch viên." },
      { name: "Văn Võ Thần Tài (Triệu Công Minh / Tài Bạch Tinh Quân)", position: "Ngự bên TAY TRÁI (nhìn từ ngoài vào)", role: "Cai quản tài lộc ngân lượng, kích hoạt cung tài vận kinh thương buôn bán." }
    ],
    ground_principle: "NGUYÊN TẮC TIẾP ĐỊA ĐẶC BIỆT: Bắt buộc đặt SÁT MẶT ĐẤT để hấp thu trọn vẹn Địa Khí (Thổ sinh Kim tài lộc). Nền đất phải luôn khô ráo, sạch sẽ."
  },

  positioning_and_directions: {
    title: "2. Phép Lập Hướng & Định Vị Cung Thiên Lộc - Quý Nhân",
    location_rules: [
      { name: "Vị Trí Tụ Tài Tốt Nhất", desc: "Đặt tại góc chéo 45 độ so với Cửa Chính (Góc Tụ Tài / Tụ Bảo Bồn) hoặc nhìn bao quát cửa ra vào đón khách." },
      { name: "Hậu Chẩm Tựa Tường Vững Chắc", desc: "Lưng bàn thờ bắt buộc phải tựa sát vào Bức Tường Vững Chãi (Thực Tường)." }
    ],
    wealth_palaces: [
      { palace: "Cung Thiên Lộc (Lâm Quan Cát Tinh)", benefit: "Tài lộc dồi dào, tiền của gia tăng, kinh doanh buôn bán đại phát đạt." },
      { palace: "Cung Quý Nhân (Thiên Ất Quý Nhân)", benefit: "Gặp quý nhân trợ giúp, chuyển nguy thành an, khách hàng tin cậy, gia đạo bình an." }
    ]
  },

  altar_layout: {
    title: "3. Quy Thức Bài Trí Bàn Thờ Thần Tài Chuẩn Cổ Truyền (Từ Trong Ra Ngoài)",
    items_order: [
      { step: "1. Tấm Bài Vị Gương Khảm", desc: "Khắc danh hiệu 'Ngũ Phương Ngũ Thổ Long Thần, Tiền Hậu Địa Chủ Tài Thần', dán sát vách lưng." },
      { step: "2. Tượng Hai Ông Thần", desc: "Thần Tài bên TRÁI, Thổ Địa bên PHẢI (nhìn từ ngoài vào)." },
      { step: "3. Tam Hũ Phú Quý (Muối - Gạo - Nước)", desc: "Đặt ở giữa hai ông thần. Chỉ thay vào dịp cuối năm." },
      { step: "4. Bát Hương Cốt Thất Bảo", desc: "Đặt chính giữa bàn thờ, nạp tro nếp sạch và cốt thất bảo, dán cố định." },
      { step: "5. Kỷ 5 Chén Nước", desc: "Xếp hình chữ Nhất (一) hoặc chữ Thập (十) biểu trưng Ngũ Phương Ngũ Thổ." },
      { step: "6. Cóc Thiềm Thừ", desc: "Đặt bên Trái (Thần Tài). Sáng quay đầu ra cửa đớp tài; Tối quay đầu vào trong nhả tiền." },
      { step: "7. Tô Nước Rắc Cánh Hoa (Minh Đường Tụ Thủy)", desc: "Đặt trước mặt ngoài cùng bàn thờ giữ tụ tài lộc." }
    ]
  },

  taboos_wealth_altar: {
    title: "4. Đại Kỵ Cần Tránh Khi Thờ Thần Tài - Thổ Địa",
    taboos: [
      "Không tẩy uế, khai quang tượng Thần Tài - Thổ Địa trước khi an vị lên bàn thờ.",
      "Đặt bàn thờ Thần Tài dưới gầm cầu thang, dưới nhà vệ sinh, hoặc đối diện gương soi.",
      "Góc nhọn của các đồ đạc nội thất hoặc góc tường xung chiếu thẳng vào bàn thờ (Thương sát).",
      "Để khu vực trước bàn thờ Thần Tài bừa bãi, ẩm ướt, bụi bẩn, hoặc để thú cưng quấy phá.",
      "Quên quay đầu Cóc Thiềm Thừ hoặc dùng hoa quả héo úa dâng lên bàn thờ."
    ]
  }
};

// TIẾT VII: PHONG THỦY BÀN THỜ PHẬT TẠI GIA & QUY THỨC THỜ CHUNG PHẬT - GIA TIÊN
const WORSHIP_FENGSHUI_PART_7 = {
  chapter_id: "tho_cung_part_7",
  chapter_title: "Tiết VII: Phong Thủy Bàn Thờ Phật Tại Gia & Quy Thức Thờ Chung Phật - Gia Tiên",
  sub_title: "Trích từ Phật Thuyết Bát Đại Nhân Giác Kinh & Chu Tử Gia Lễ (Thích Đạo Phối Tự): Quy tắc 'Tiền Phật Hậu Linh', phân cấp nhị tầng và giới luật cúng dường chay tịnh",

  spiritual_hierarchy: {
    title: "1. Thứ Bậc Tôn Ty Tâm Linh: 'Tiền Phật Hậu Linh / Phật Thượng Tiên Hạ'",
    quote: "Phật thị Tam Giới Đạo Sư, Tứ Sanh Từ Phụ. Tiên tổ nương thừa Phật lực, siêu sinh Tịnh Độ.",
    quote_source: "Thích Môn Quy Kính Nghi",
    hierarchy_rules: [
      { name: "Đức Phật & Chư Đại Bồ Tát (Đấng Giác Ngộ Tối Thượng)", desc: "Đức Phật là bậc Thiên Nhân Sư tối thượng đã thoát luân hồi, ngự ở tầng cao nhất thanh tịnh tuyệt đối." },
      { name: "Gia Tiên Tiền Tổ (Huyết Thống Đang Nương Tựa Phật Pháp)", desc: "Tiền nhân nương nhờ ánh sáng Phật pháp để tiêu trừ nghiệp chướng, siêu sinh an lành." },
      { name: "Quy Tắc Tuyệt Đối Về Chiều Cao & Vị Trí", desc: "Tượng Phật BẮT BUỘC ĐẶT CAO HƠN bài vị gia tiên từ 15cm đến 30cm, không đặt ngang hàng hoặc thấp hơn." }
    ]
  },

  dual_altar_models: {
    title: "2. Hai Mô Hình Bố Cục Bàn Thờ Phật & Gia Tiên Chuẩn Phong Thủy",
    models: [
      {
        model_name: "Mô Hình 1: Bàn Thờ Phân Cấp (Nhị Cấp / Tam Cấp)",
        suitable: "Phù hợp nhà phố, căn hộ chung cư hoặc diện tích vừa phải.",
        structure: [
          "Tầng Thượng (Cấp trên): Đặt Tượng Phật, 1 bát hương Phật, hoa tươi, đĩa quả chay, nước trong.",
          "Tầng Hạ (Cấp dưới): Đặt bài vị Gia Tiên, 3 bát hương thờ Thần Linh & Gia Tiên & Bà Cô Ông Mãnh, kỷ chén nước."
        ]
      },
      {
        model_name: "Mô Hình 2: Hai Bàn Thờ Tách Biệt Độc Lập",
        suitable: "Phù hợp biệt thự, nhà thờ họ, hoặc gian phòng thờ rộng rãi.",
        structure: [
          "Bàn Thờ Phật: Đặt ở chính giữa gian phòng thờ, kê cao nhất, hướng ra cửa sáng.",
          "Bàn Thờ Gia Tiên: Đặt bên tay Phải (nhìn từ ngoài vào) hoặc thấp hơn bàn thờ Phật 1 bậc."
        ]
      }
    ]
  },

  offering_commandments: {
    title: "3. Giới Luật Cúng Dường Bàn Thờ Phật (100% Chay Tịnh)",
    rules: [
      { item: "Lễ Vật Cúng Phật", detail: "TUYỆT ĐỐI 100% ĐỒ CHAY THANH TỊNH: Hoa tươi (Sen, Cúc, Huệ), Quả tươi ngọt, Nước lọc tinh khiết, Trà thơm, Xôi chè, Oản phẩm." },
      { item: "Đại Kỵ Tuyệt Đối", detail: "CẤM KỴ: Không dâng đồ mặn (thịt, cá, trứng), rượu, tỏi ớt, không đốt vàng mã tiền âm phủ trên bàn thờ Phật." },
      { item: "Xử Lý Khi Cúng Mặn Gia Tiên", detail: "Mâm cỗ mặn cúng Gia Tiên PHẢI ĐẶT Ở BÀN RIÊNG PHÍA DƯỚI, không đặt lên mặt bàn thờ Phật." }
    ]
  },

  orientations_and_statues: {
    title: "4. Hướng Đặt Bàn Thờ Phật & Lựa Chọn Tượng Phật Bản Mệnh",
    statues: [
      { name: "Tây Phương Tam Thánh", desc: "Đức Phật A Di Đà (ở giữa), Quán Thế Âm Bồ Tát (bên trái), Đại Thế Chí Bồ Tát (bên phải)." },
      { name: "Đức Bổn Sư Thích Ca Mâu Ni", desc: "Bậc Giáo Chủ cõi Ta Bà, ngồi kiết già tòa sen khai mở trí tuệ thanh tịnh." },
      { name: "Quán Thế Âm Bồ Tát", desc: "Hiện thân lòng đại từ đại bi, cứu khổ cứu nạn che chở gia đạo bình an." }
    ],
    orientation_rule: "Bàn thờ Phật nên nhìn về hướng TÂY (Tây Phương Cực Lạc) hoặc hướng nhìn thẳng ra Minh Đường đón ánh sáng tự nhiên. Mặt tượng Phật phải hướng ra nơi thanh tịnh."
  }
};

// TIẾT VIII: PHONG THỦY NHÀ THỜ HỌ, TỪ ĐƯỜNG DÒNG TỘC & BỐ CỤC 'TẢ CHIÊU HỮU MỤC'
const WORSHIP_FENGSHUI_PART_8 = {
  chapter_id: "tho_cung_part_8",
  chapter_title: "Tiết VIII: Phong Thủy Nhà Thờ Họ, Từ Đường Dòng Tộc & Bố Cục 'Tả Chiêu Hữu Mục'",
  sub_title: "Trích xuất từ Kinh Lễ (Tế Thống) & Chu Tử Gia Lễ (Tông Từ Thiên): Bản thể long mạch từ đường, quy luật Chiêu Mục thế thứ và hình thế Loan Đầu 3 gian / 5 gian",

  ancestral_hall_ontology: {
    title: "1. Bản Thể Luận Từ Đường: Điểm Tụ Long Mạch & Huyết Mạch Dòng Tộc",
    quote: "Tế giả, phụng tổ chi bản dã. Chiêu Mục đắc tự, tôn ti hữu tự, thiên địa hòa yên, nhân luân chính yên.",
    quote_source: "Kinh Lễ - Tế Thống Thiên",
    principles: [
      { name: "Trung Tâm Tụ Khí Toàn Tộc (Huyết Thống Chi Căn)", desc: "Từ đường là 'Huyệt Vị Tâm Linh' tối cao quy tụ trường sinh học của toàn bộ con cháu muôn đời." },
      { name: "Nguyên Lý Bất Biến Về Trật Tự Thế Thứ", desc: "Quy luật 'Tôn Ti Phân Minh' được xem là rường cột, đảm bảo trường khí hòa hợp không chia rẽ." }
    ]
  },

  chieu_muc_system: {
    title: "2. Quy Tắc Bố Cục 'Tả Chiêu Hữu Mục' (Trật Tự Tông Tộc Vĩnh Cửu)",
    quote: "Tổ cư trung, Chiêu cư tả, Mục cư hữu. Đời đời nối dõi không sai thứ bậc.",
    quote_source: "Chu Tử Gia Lễ - Tông Từ Chi Đồ",
    generation_rules: [
      { rank: "Thủy Tổ (Vị Tổ Khởi Đầu)", placement: "Tọa Trung (Chính giữa hậu cung, tầng cao nhất)", symbol: "Gốc rễ đại thụ dòng họ, độc tôn trung tâm." },
      { rank: "Đời Chẵn / Nhánh Chiêu (2, 4, 6, 8...)", placement: "Ngự bên TẢ (Trái Thủy Tổ - Phương Đông / Dương)", symbol: "CHIÊU (昭) - ánh sáng sinh sôi nảy nở." },
      { rank: "Đời Lẻ / Nhánh Mục (3, 5, 7, 9...)", placement: "Ngự bên HỮU (Phải Thủy Tổ - Phương Tây / Âm)", symbol: "MỤC (穆) - thuần hòa, gìn giữ cơ nghiệp." }
    ]
  },

  architectural_loan_dau: {
    title: "3. Hình Thế Kiến Trúc & Loan Đầu Nhà Thờ Họ (3 Gian / 5 Gian)",
    bays_layout: [
      { bay: "Gian Chính Giữa (Trung Gian)", role: "Khám Thờ Thần Chủ Lớn, Bàn thờ Thủy Tổ và Viễn Tổ, Hoành phi câu đối chính." },
      { bay: "Gian Bên Trái (Tả Gian - Chiêu)", role: "Thờ Chi Trưởng, các bậc tiền bối khoa bảng hiển đạt." },
      { bay: "Gian Bên Phải (Hữu Gian - Mục)", role: "Thờ Chi Thứ, Mẹ Việt Nam anh hùng, Liệt sĩ xả thân vì nước." }
    ],
    landscape_features: [
      { feature: "Hậu Chẩm Tựa Sơn", detail: "Thế đất cao ráo, tựa vào đồi núi hoặc tường kiên cố." },
      { feature: "Minh Đường Tụ Thủy", detail: "Sân gạch rộng (Ngoại Minh Đường), ao bán nguyệt tụ thủy sinh tài." },
      { feature: "Tả Long Hữu Hổ", detail: "Dãy nhà ngang hoặc tường cây che chắn, tạo thế tay ngai ôm trọn linh đường." }
    ]
  },

  sacred_tablets_and_motto: {
    title: "4. Quy Cách Thần Chủ (Bài Vị) & Hoành Phi Điển Tích Dòng Họ",
    tablet_material: "GỖ LÀM BÀI VỊ THẦN CHỦ: Bắt buộc dùng Gỗ Vàng Tâm, Gỗ Mít hoặc Gỗ Thị cổ thụ không mối mọt, thơm tự nhiên.",
    famous_mottos: [
      { motto: "ĐỨC LƯU QUANG (德流光)", meaning: "Đức độ tổ tiên tỏa sáng lưu truyền muôn đời." },
      { motto: "ẨM THỦY TƯ NGUYÊN (飲水思源)", meaning: "Uống nước nhớ nguồn, không quên công lao tiên tổ." },
      { motto: "QUANG TIỀN DỤ HẬU (光前裕後)", meaning: "Rạng rỡ đời trước, mở lối giàu sang cho đời sau." },
      { motto: "PHÚC MÃN ĐƯỜNG (福滿堂)", meaning: "Phúc ấm tràn ngập khắp linh đường dòng tộc." }
    ]
  }
};

// TIẾT IX: PHONG THỦY BÀN THỜ TREO TƯỜNG CHUNG CƯ & NHÀ PHỐ HIỆN ĐẠI
const WORSHIP_FENGSHUI_PART_9 = {
  chapter_id: "tho_cung_part_9",
  chapter_title: "Tiết IX: Bàn Thờ Treo Tường Chung Cư & Không Gian Thờ Hiện Đại",
  sub_title: "Quy chuẩn độ cao Thước Lỗ Ban 38.8cm từ mặt sàn, giải pháp 4 lớp bảo vệ tụ khí và 6 đại kỵ không gian hẹp",

  hanging_altar_heights: {
    title: "1. Độ Cao Treo Bàn Thờ Chuẩn Thước Lỗ Ban 38.8cm (Tính Từ Mặt Sàn Hoàn Thiện)",
    quote: "Cao bất quá đầu, đê bất quá phúc. Tôn ti đắc nghi, linh khí trường tồn.",
    quote_source: "Dương Trạch Khí Pháp Tân Biên",
    height_levels: [
      {
        level: "Tầm Thấp (Cung Đại Cát / Tiến Bảo)",
        height_cm: "172 cm (Cung Đại Cát) hoặc 175 cm (Cung Phú Quý)",
        suitable: "Phù hợp trần nhà thấp dưới 2.6m, gia chủ có chiều cao vừa phải dễ dàng với tay thắp nhang và bao sái."
      },
      {
        level: "Tầm Trung Chuẩn Mực (Cung Tiến Bảo / Đăng Khoa)",
        height_cm: "193.5 cm (Cung Tiến Bảo) hoặc 197.5 cm (Cung Đăng Khoa)",
        suitable: "CHIỀU CAO HOÀNG KIM CHO CĂN HỘ CHUNG CƯ: Trần cao từ 2.6m - 2.8m, vừa đảm bảo sự tôn nghiêm thoát tục, vừa thuận tiện đứng trên ghế đôn cúng bái."
      },
      {
        level: "Tầm Cao Tôn Nghiêm (Cung Thuận Khoa / Tài Vượng)",
        height_cm: "212 cm (Cung Thuận Khoa) hoặc 217 cm (Cung Tài Vượng)",
        suitable: "Phù hợp nhà phố hoặc chung cư cao cấp trần cao trên 3m, bàn thờ treo độc lập trên cao không bị ai vô tình chạm vào."
      }
    ]
  },

  four_layer_protection: {
    title: "2. Giải Pháp 4 Lớp Bảo Vệ & Tàng Phong Tụ Khí Cho Bàn Thờ Chung Cư",
    layers: [
      { layer: "Lớp 1: Tấm Chống Ám Khói Hương Ốp Trần", role: "Gắn trên trần thạch cao ngay trên đỉnh bát hương, chạm khắc chữ Phúc/Lộc/Thọ hoặc hoa sen, vừa tịnh hóa nhiệt hỏa vừa ngăn ố vàng trần nhà." },
      { layer: "Lớp 2: Cặp Vách Ngăn CNC Bọc Hai Bên (Tả Long - Hữu Hổ Mini)", role: "Tạo thành một 'Gian Thờ Ảo', chắn gió tạt từ điều hòa, quạt trần và che khuất tầm nhìn trực diện từ khu vực sinh hoạt, sofa, bàn ăn." },
      { layer: "Lớp 3: Bàn Thờ Gỗ Tự Nhiên Bắt Vít Nở Sắt Chịu Lực", role: "Bắt vít nở sắt trực tiếp vào Tường Bê Tông Chịu Lực (tuyệt đối không bắt vào vách thạch cao rỗng), tích hợp ngăn kéo nhỏ đựng văn khấn, nến, bật lửa." },
      { layer: "Lớp 4: Tấm Ốp Lưng Gỗ Hậu Chẩm (Thực Tường Giả Lập)", role: "Ốp tấm gỗ màu nâu trầm tựa sát tường để tạo điểm tựa Hậu Chẩm vững chãi, cách ly tường ẩm và tạo sự ấm cúng trang trọng." }
    ]
  },

  apartment_taboos: {
    title: "3. 6 Đại Kỵ Cực Nguy Hiểm Riêng Cho Căn Hộ Chung Cư & Cách Hóa Giải",
    taboos: [
      { id: 1, title: "Treo bàn thờ ngay dưới Miệng Gió Điều Hòa (Phong Thủy Sát)", danger: "Gió lạnh thổi tắt nhang, làm tán loạn chân khí; hơi ẩm điều hòa nhỏ giọt vào bát hương.", solution: "Di dời vị trí bàn thờ hoặc lắp tấm kính/gỗ chắn hướng gió điều hòa không cho phả trực tiếp." },
      { id: 2, title: "Treo bàn thờ dựa lưng vào tường Nhà Vệ Sinh chung cư (Uế Sát)", danger: "Tường nhà vệ sinh căn hộ ẩm ướt và chứa ống thoát nước thải ngầm làm ô uế linh vị.", solution: "Chuyển sang bức tường phòng khách độc lập, hoặc ốp tấm gỗ cách ly dày 2 lớp phía sau." },
      { id: 3, title: "Treo bàn thờ đối diện Tivi hoặc Dàn Âm Thanh Lớn (Động Sát)", danger: "Tiếng ồn và sóng từ trường loa bass rung lắc làm kinh động thần linh, gia trạch bất an.", solution: "Bố trí lệch góc, dùng vách CNC che chắn phân chia ranh giới âm thanh." },
      { id: 4, title: "Tầng trên có Nhà Vệ Sinh hoặc Giường Ngủ đè lên đầu Bàn Thờ", danger: "Khí ô uế hoặc năng lượng sinh hoạt nặng nề đè ép linh vị bên dưới (Áp Đỉnh Ô Uế).", solution: "Khảo sát kỹ sơ đồ mặt bằng tầng trên, chọn vị trí trần trên là phòng khách hoặc phòng làm việc tĩnh." },
      { id: 5, title: "Treo bàn thờ đối diện Bếp Nấu / Bàn Ăn Sinh Hoạt", danger: "Mùi dầu mỡ thức ăn xộc vào làm mất thanh tịnh, nhìn thẳng vào cảnh nhậu nhẹt dung tục.", solution: "Sử dụng rèm hạt gỗ hoặc rèm che rủ trước bàn thờ khi không thắp hương." },
      { id: 6, title: "Treo bàn thờ bằng vít lỏng lẻo trên Vách Thạch Cao Rỗng", danger: "Nguy cơ rơi vỡ bàn thờ và bát hương - điềm báo hung hiểm cực kỳ nghiêm trọng trong phong thủy.", solution: "Bắt buộc tìm xương thép hộp hoặc đục tường bắt vít nở sắt vào bê tông cốt thép kiên cố." }
    ]
  }
};

// TIẾT X: GIẢI MÃ TOÀN DIỆN PHÙ CỐT BÁT HƯƠNG (ĐỒ HÌNH TRẬN ĐỒ THIÊN ĐỊA BÁT QUÁI - 28 TÚ)
const WORSHIP_FENGSHUI_PART_10 = {
  chapter_id: "tho_cung_part_10",
  chapter_title: "Tiết X: Đại Giải Mã 'Phù Cốt Bát Hương' (Trận Đồ Càn Khôn Bát Quái - Nhị Thập Bát Tú)",
  sub_title: "Khảo cứu toàn văn Đạo Phù Khai Linh Bát Hương: Ý nghĩa từng chữ Hán, chân ngôn Om, Cửu Cung Bát Quái, Thập Can, Thập Nhị Chi và 28 Chòm Sao",

  image_url: "assets/phu_cot_bat_huong.webp",

  talisman_anatomy: {
    title: "1. Bản Thể & Trận Đồ Vũ Trụ Thu Nhỏ Của Phù Cốt Bát Hương",
    quote: "Phù giả, hợp dã. Thượng ứng thiên tinh, hạ chiêu địa chỉ, trung an nhân tâm.",
    quote_source: "Đạo Tạng - Huyền Môn Khoa Nghi & Tế Tự Mật Chỉ",
    overview: "Phù Cốt Bát Hương không đơn thuần là một tờ giấy viết chữ, mà là một 'Tiểu Vũ Trụ Càn Khôn Thu Nhỏ' (Trận Đồ Thiên - Địa - Thần - Thời - Không). Tờ phù thiết lập một 'Kết Giới Năng Lượng Tuyệt Đối' gồm 5 lớp bảo vệ, giúp chân linh Tôn Thần và Tiên Tổ định ngự, đồng thời cô lập hoàn toàn mọi tà ma, cô hồn dã quỷ, uế khí tam giới không thể xâm nhập vào bát hương.",
    
    five_columns: [
      {
        column_name: "CỘT 1 (TRỤC TRUNG TÂM): THẦN ĐẠO LINH VỊ & SẮC LỆNH TỐC HÀNG",
        character_details: [
          { han: "恭請 (Cung Thỉnh)", pinyin: "Gōng Qǐng", meaning: "Đại tự đỉnh đầu: Cung kính kính cẩn cung thỉnh Chư vị Tôn Thần ngự lâm đàn tràng." },
          { han: "奉事 本家土公地主五方萬福夫人 (Phụng sự Bản gia Thổ Công Địa Chủ Ngũ Phương Vạn Phúc Phu Nhân)", pinyin: "Thổ Công Địa Chủ", meaning: "Thần chủ cai quản trạch thổ, Mẫu độ mạng che chở đất đai, ban vạn phúc cho gia đình." },
          { han: "本家東廚司命灶府神君 (Bản gia Đông Trù Tư Mệnh Táo Phủ Thần Quân)", pinyin: "Táo Phủ Thần Quân", meaning: "Vị Táo Quân coi sóc thiện ác, tài phúc, ấm êm của ngọn lửa bếp trạch viên." },
          { han: "本處土地福德正神 (Bản xứ Thổ Địa Phúc Đức Chính Thần)", pinyin: "Phúc Đức Chính Thần", meaning: "Thần Thổ Địa cai quản địa giới xóm làng, ban phúc tích đức cho gia trạch an khang." },
          { han: "五方龍脈前後地王接引財神 (Ngũ Phương Long Mạch Tiền Hậu Địa Vương Tiếp Dẫn Tài Thần)", pinyin: "Long Mạch Tài Thần", meaning: "Rút khí Long Mạch 5 phương, kết nối Tiền Hậu Địa Vương chiêu tài tiến bảo tụ lộc." },
          { han: "尊神洞垂照監在家... (Tôn Thần Động Thùy Chiếu Giám Tại Gia...)", pinyin: "Chiếu Giám", meaning: "Chư vị Tôn Thần soi xét sáng suốt, chứng giám lòng thành con cháu tại gia." },
          { han: "速降炉香 (Tốc Hàng Lô Hương) + 2 chữ 土 (Thổ)", pinyin: "Tốc Hàng Lô Hương", meaning: "SẮC LỆNH TỐI THƯỢNG: Thần tốc giáng lâm an ngự vào lò hương. Hai chữ 'Thổ' (土) hai bên chân chữ Hương đại diện cho Trung Ương Hoàng Thổ, ghim chặt long khí, tạo điểm tựa vĩnh cửu như núi Thái Sơn." }
        ]
      },
      {
        column_name: "CỘT 2 (HỮU DỰC NỘI): CHÂN NGÔN TAM QUANG, 4 DƯƠNG QUÁI & 10 THIÊN CAN",
        character_details: [
          { han: "唵 三光毓秀 (Án Tam Quang Dục Tú)", pinyin: "Om San Guang Yu Xiu", meaning: "Chữ đầu '唵' (Án/Om - tiếng Phạn) khai thông năng lượng vũ trụ. 'Tam Quang Dục Tú' thỉnh ánh sáng của Mặt Trời (Nhật), Mặt Trăng (Nguyệt), và Các Tinh Tú (Tinh) kết tụ tinh hoa tú khí nuôi dưỡng bát hương." },
          { han: "4 QUẺ BÁT QUÁI (DƯƠNG & CHỦ KHÍ):  乾 (Càn),  坎 (Khảm),  艮 (Cấn),  震 (Chấn)", pinyin: "Càn - Khảm - Cấn - Chấn", meaning: "Càn (Trời/Tây Bắc/Thuần Dương), Khảm (Nước/Bắc), Cấn (Núi/Đông Bắc/Vững bền), Chấn (Sấm/Đông/Sinh khởi). 4 Quái lập trận đồ sinh vượng khí." },
          { han: "THẬP THIÊN CAN (10 CAN VẬN HÀNH): 甲 乙 丙 丁 戊 己 庚 辛 壬 癸 (Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý)", pinyin: "Thập Can", meaning: "Bao quát toàn bộ 10 chu kỳ biến hóa năng lượng của Thiên Đạo: Giáp-Ất (Mộc), Bính-Đinh (Hỏa), Mậu-Kỷ (Thổ), Canh-Tân (Kim), Nhâm-Quý (Thủy)." },
          { han: "ĐẨU QUÂN CƯƠNG QUYỀN (斗, 軍, 權)", pinyin: "Bắc Đẩu Tinh Quân", meaning: "Khí uy lực của chòm sao Bắc Đẩu điều hành sinh tử tài lộc." }
        ]
      },
      {
        column_name: "CỘT 3 (TẢ DỰC NỘI): 4 ÂM QUÁI, 12 ĐỊA CHI & PHƯƠNG VỊ THỜI KHÔNG",
        character_details: [
          { han: "4 QUẺ BÁT QUÁI (ÂM & BIẾN HÓA):  巽 (Tốn),  離 (Ly),  坤 (Khôn),  兌 (Đoài)", pinyin: "Tốn - Ly - Khôn - Đoài", meaning: "Tốn (Gió/Đông Nam), Ly (Lửa/Nam), Khôn (Đất mẹ/Tây Nam/Dung nạp), Đoài (Đầm/Tây/Hỷ lạc). Kết hợp cùng 4 quẻ cột 2 tạo thành BÁT QUÁI CÀN KHÔN ĐẦY ĐỦ 8 HƯỚNG." },
          { han: "THẬP NHỊ ĐỊA CHI (12 CHI THỜI GIAN): 子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥 (Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi)", pinyin: "Thập Nhị Chi", meaning: "Đại diện trọn vẹn cho 12 tháng trong năm, 12 canh giờ trong ngày, 12 hướng không gian và chu kỳ 12 năm. Đảm bảo Bát Hương được bảo hộ BẤT KỂ GIỜ NÀO, NGÀY NÀO, THÁNG NÀO, NĂM NÀO." },
          { han: "PHƯƠNG VỊ HÀNH KHÍ (南 - Nam, 行 - Hành)", pinyin: "Định Phương", meaning: "Luân chuyển ngũ hành khí trong trạch viên thông thuận không bị ách tắc." }
        ]
      },
      {
        column_name: "CỘT 4 & 5 (NGOẠI DỰC TẢ HỮU): TRẬN ĐỒ 28 CHÒM SAO NHỊ THẬP BÁT TÚ (KẾT GIỚI THIÊN VĂN)",
        character_details: [
          { han: "NGOẠI HỮU (CỘT NGOÀI CÙNG BÊN PHẢI): 唵 木 (Án - Mộc)", pinyin: "Đông & Bắc Tinh Tú", meaning: "Khởi động Thanh Long & Huyền Vũ:" },
          { han: "• 7 Sao Đông Phương Thanh Long: 角 (Giác), 亢 (Cang), 氐 (Đê), 房 (Phòng), 心 (Tâm), 尾 (Vĩ), 箕 (Cơ)", pinyin: "Đông Phương Thất Tú", meaning: "Mang năng lượng sinh sôi mùa xuân, rồng xanh hộ vệ phương Đông." },
          { han: "• 7 Sao Bắc Phương Huyền Vũ: 斗 (Đẩu), 牛 (Ngưu), 女 (Nữ), 虚 (Hư), 危 (Nguy), 室 (Thất), 壁 (Bích)", pinyin: "Bắc Phương Thất Tú", meaning: "Mang năng lượng trí tuệ, nước nguồn mùa đông, rùa rắn hộ vệ phương Bắc." },
          { han: "NGOẠI TẢ (CỘT NGOÀI CÙNG BÊN TRÁI): 唵 金 (Án - Kim) & 火 (Hỏa)", pinyin: "Tây & Nam Tinh Tú", meaning: "Khởi động Bạch Hổ & Chu Tước:" },
          { han: "• 7 Sao Tây Phương Bạch Hổ: 奎 (Khuê), 婁 (Lâu), 胃 (Vị), 昴 (Mão), 畢 (Tất), 觜 (Chủy), 參 (Sâm)", pinyin: "Tây Phương Thất Tú", meaning: "Mang năng lượng uy dũng nghiêm cẩn mùa thu, hổ trắng trừ tà sát khí phương Tây." },
          { han: "• 7 Sao Nam Phương Chu Tước: 井 (Tỉnh), 鬼 (Quỷ), 柳 (Liễu), 星 (Tinh), 張 (Trương), 翼 (Dực), 軫 (Chẩn)", pinyin: "Nam Phương Thất Tú", meaning: "Mang năng lượng quang minh rực rỡ mùa hạ, phượng hoàng lửa bảo hộ phương Nam." }
        ]
      }
    ]
  },

  matrix_significance: {
    title: "2. Tại Sao Tờ Phù Cốt Này Là Đỉnh Cao Khoa Nghi Huyền Môn?",
    points: [
      { name: "Khóa Chặt Thời Gian & Không Gian (Thời Không Nhất Thể)", desc: "10 Thiên Can phối hợp 12 Địa Chi tạo thành 60 Hoa Giáp; 8 Quẻ Bát Quái phân định 8 hướng; 28 Chòm Sao bao quát toàn bộ bầu trời đêm 360 độ. Nghĩa là bát hương được định vị bất biến giữa tâm vũ trụ." },
      { name: "Kết Giới Kim Cang Bất Khả Xâm Phạm", desc: "Sự hiện diện của 28 vị Tinh Quân và Tứ Linh (Long - Lân - Quy - Phụng) khiến mọi tà tinh, ma quỷ ngoại đạo khi nhìn vào bát hương đều thấy hào quang thiên binh thiên tướng trấn giữ, tuyệt đối không dám mạo phạm." },
      { name: "Cầu Nối Thần Giao Cách Cảm Tối Thượng", desc: "Các chân ngôn (唵 - Om, 三光毓秀 - Tam Quang Dục Tú, 速降炉香 - Tốc Hàng Lô Hương) hoạt động như tần số sóng tinh thần, giúp lời khấn cầu của gia chủ xuyên qua không gian đến đúng tai Chư vị Tôn Thần." }
    ]
  },

  ritual_consecration_steps: {
    title: "3. Quy Trình Nạp Cốt & An Vị Phù Cốt Bát Hương Chuẩn Mật Chỉ",
    steps: [
      "1. Tịnh hóa tờ Phù Cốt bằng khói trầm hương và nước ngũ vị hương (không để nhăn rách, dính uế).",
      "2. Điền chính xác thông tin bản gia (nếu là bản khấn trống) hoặc giữ nguyên bản in sắc lệnh chánh thần.",
      "3. Đặt gói Thất Bảo (Vàng, Bạc, Ngọc, Hổ Phách, Xà Cừ, San Hô, Mã Não) vào giữa lòng tờ Phù.",
      "4. Gấp tờ Phù bọc kín Thất Bảo bên trong (hướng chữ 'Cung Thỉnh' lên phía trên).",
      "5. Đặt gói Phù Cốt xuống chính giữa đáy bát hương sạch, sau đó phủ tro rơm nếp thanh tịnh lên trên."
    ]
  }
};

// ĐẠI CHUYÊN ĐỀ MẬT TRUYỀN: PHẦN "LINH" (MẬT GIÁO & PHÙ CHÚ KHOA NGHI CHÁNH TÔNG)
const WORSHIP_ESOTERIC_RITUALS = {
  section_id: "worship_esoteric_rituals",
  section_title: "ĐẠI BÁCH KHOA MẬT GIÁO & PHÙ CHÚ KHOA NGHI BÁT HƯƠNG",
  sub_title: "Trích từ Đạo Tạng Bí Chỉ, Khoa Nghi Bốc Bát Hương & Khai Quang Điểm Nhãn Huyền Môn: Bảy bước khởi linh, Chân ngôn Mật chú, Thủ ấn Khai quang và Phép chiêu linh hô thần",

  esoteric_ontology: {
    title: "1. Bản Thể Luận Về 'Linh' Trong Huyền Môn: Hình - Khí - Thần Tam Tài",
    quote: "Họa phù bất tri khiếu, địch đắc quỷ thần tiếu. Họa phù tri đắc khiếu, kinh đắc quỷ thần khiếu.",
    quote_source: "Huyền Môn Bí Chỉ - Phù Đạo Khẩu Quyết",
    concepts: [
      { name: "HÌNH (Phần Thô - Thể Xác Bát Hương)", desc: "Là cái bát bằng gốm sứ/đồng, tro rơm nếp sạch, đỉnh nến, mâm bồng. Nếu chỉ có 'Hình' mà không có 'Linh' thì bát hương chỉ là một đồ gốm vô tri vô giác, thậm chí trở thành nơi cho cô hồn tà quỷ ẩn náu." },
      { name: "KHÍ (Phần Vận Động - Trường Năng Lượng Đồ Trận)", desc: "Là trường sinh học của Đạo Phù Cốt Bát Hương (Trận đồ Càn Khôn Bát Quái - Nhị Thập Bát Tú - Thất Bảo ngọc báu) kết hợp với hướng Tọa Cát Hướng Cát đón sinh khí của vũ trụ." },
      { name: "THẦN (Phần Linh Cảm - Thần Thức Chân Linh Giáng Ngự)", desc: "Là kết quả của Nghi Thức Khai Quang Trì Chú, Chiêu Linh Hô Thần và Tâm Thức Thành Kính của gia chủ. Khi Thần - Khí - Hình hòa làm một, bát hương mới chính thức 'ĐẮC LINH'." }
    ]
  },

  seven_consecration_steps: {
    title: "2. Quy Trình 7 Bước Khởi Linh & Nạp Cốt Bát Hương Chuẩn Khoa Nghi",
    steps: [
      { step: "Bước 1: Tịnh Đàn Khử Uế Chi Pháp (Tẩy Uế Tuyệt Đối)", action: "Dùng nước Ngũ Vị Hương nấu sôi để nguội hoặc Rượu Gừng tịnh sái Bát hương rỗng và bàn hành lễ. Thắp 1 nén nhang trầm xông quanh 3 vòng. Tay bắt ấn Bảo Bình, miệng trì tụng Tịnh Pháp Giới Chân Ngôn và Tịnh Khẩu Nghiệp Chân Ngôn để tống khứ mọi uế khí tạp niệm." },
      { step: "Bước 2: Phép Nạp Khí Thất Bảo (Thất Bảo Bí Quyết)", action: "Chuẩn bị 7 bảo vật thuần khiết tự nhiên (Vàng, Bạc, Ngọc bích, Hổ phách, Xà cừ, San hô đỏ, Mã não). Đặt Thất Bảo vào đĩa sứ, sái tịnh bằng rượu gừng. Trì niệm Lục Tự Đại Minh Chân Ngôn (Om Mani Padme Hum - 21 biến hoặc 108 biến) để phóng linh quang kích hoạt linh khí ngũ hành trong từng hạt bảo ngọc." },
      { step: "Bước 3: Phép Thần Chú Khai Bút & Chuẩn Bị Đạo Phù", action: "Trải tờ Phù Cốt (Hoàng chỉ Chu sa) lên mặt đàn sạch. Người bốc bát hương tay cầm bút lông (hoặc kiếm chỉ), hướng mặt về phương Đông hít một hơi chân khí, niệm Khai Bút Thần Chú: 'Cư bi bút, hạ bi mặc. Thiên viên địa phương, luật lệnh cửu chương. Ngô kim hạ bút, vạn quỷ phục tàng. Cấp cấp như luật lệnh!'." },
      { step: "Bước 4: Phép Kết Ấn Khai Quang Điểm Nhãn Phù Cốt", action: "Tay trái bắt Tam Sơn Ấn (hoặc Kim Cang Quyền), tay phải bắt Kiếm Chỉ chỉ thẳng vào chữ 'Cung Thỉnh' và 'Tốc Hàng Lô Hương'. Niệm Tam Quang Khai Linh Chú: 'Thiên quang, Địa quang, Nhật Nguyệt Tinh quang, Tam Quang Dục Tú, chiếu diệu thập phương, thần thông hiển hiện!'. Sau đó thổi 3 hơi Dương khí ấm áp từ đan điền vào mặt phù để truyền thần thức." },
      { step: "Bước 5: Thuật Gói Càn Khôn (Bọc Thất Bảo Đặt Đáy Bát Hương)", action: "Đặt gói Thất Bảo vào chính giữa lòng tờ Phù. Gấp theo chiều từ Dưới lên Trên, từ Trái sang Phải (chiều Thuận Âm Dương bao bọc). Đặt gói Phù Cốt Thất Bảo ngay ngắn xuống chính giữa đáy Bát Hương, mặt chữ 'Cung Thỉnh' hướng lên trời." },
      { step: "Bước 6: Phép Nạp Tro Nếp & Phong Cương Tụ Khí", action: "Dùng bát sứ sạch múc từng bát tro rơm nếp đã trộn bột quế trầm hương trút vào bát hương. Vừa trút vừa nhẩm niệm: 'Nhất trút Thiên Nguyên bình an, Nhị trút Địa Mạch phú quý, Tam trút Nhân Đinh hưng vượng'. Đổ tro đến khi cách mép miệng bát hương 1 - 2 cm, dùng lòng bàn tay nén nhẹ cho phẳng mặt (không nén quá chặt làm gãy chân nhang)." },
      { step: "Bước 7: Đại Lễ Khai Quang Điểm Nhãn & Chiêu Linh Hô Thần", action: "An vị bát hương lên đúng vị trí trên bàn thờ. Thắp 3 nén nhang trầm thượng đẳng cắm thẳng đứng vào tâm bát hương. Dùng cành hoa sen hoặc hoa cúc nhúng nước thơm sái tịnh 3 vòng theo chiều kim đồng hồ quanh bát hương. Gia chủ quỳ nghiêm trang đọc 'Văn Khấn An Vị & Chiêu Linh Hô Thần Thần Chú' để chính thức cung nghinh Chư Thần Tiên Tổ an ngự vĩnh cửu." }
    ]
  },

  four_sacred_mantras: {
    title: "3. Hệ Thống 4 Chân Ngôn & Mật Chú Bắt Buộc Khi Bốc Bát Hương",
    mantras: [
      { id: 1, name: "Tịnh Pháp Giới Chân Ngôn (Tẩy trừ uế khí không gian)", sanskrit: "Oṃ Ram Svāhā", phonetic: "Án Lam Tát Bà Ha (hoặc Án Lam Tỏa Ha)", count: "Trì tụng 7 biến hoặc 21 biến", effect: "Thanh tịnh hóa toàn bộ không gian đàn tràng, đốt cháy mọi chướng khí vô hình, biến nơi thờ tự thành thanh tịnh cõi Phật." },
      { id: 2, name: "Tịnh Khẩu Nghiệp Chân Ngôn (Tịnh hóa khẩu nghiệp người hành lễ)", sanskrit: "Śrī Śrī Mahā-Śrī Śrīnī Svāhā", phonetic: "Tu rị tu rị, ma ha tu rị, tu tu rị, tát bà ha", count: "Trì tụng 7 biến", effect: "Tẩy rửa mọi lời nói thô uế, khẩu nghiệp trần tục, giúp lời khẩn nguyện phát ra trở thành luồng thanh âm thuần khiết rung động cõi thiêng." },
      { id: 3, name: "An Thổ Địa Chân Ngôn (Triệu thỉnh Long Thần nạp địa mạch)", sanskrit: "Namo Samanta Buddhānām Oṃ Dhuru Dhuru Pṛthivyī Svāhā", phonetic: "Nam mô tam mãn đa một đà nẫm, án độ rô độ rô, địa vĩ tát bà ha", count: "Trì tụng 21 biến", effect: "Kích hoạt Long Mạch ngũ phương, liên kết Thần Thổ Địa và Tiền Hậu Địa Chủ bảo hộ mảnh đất, khiến tà ma quỷ quái lập tức thối lui." },
      { id: 4, name: "Chiêu Linh Hô Thần Chân Ngôn (An Vị Thần Vị)", sanskrit: "Mật chú Đạo Gia Thỉnh Thần", phonetic: "Cung thỉnh Chư Tôn Thần / Bản gia Tiên Tổ giáng phó lô hương, thường trụ cát bảo, bất ly bổn vị, thùy từ chứng giám, độ trì toàn gia khang ninh thịnh vượng, cấp cấp như luật lệnh!", count: "Đọc 3 lần khi cắm tuần hương đầu tiên", effect: "Mở đường linh thông dẫn truyền linh giác của Tiên Tổ và Tôn Thần an tọa đúng ngôi thứ trong bát hương." }
    ]
  },

  mudras_system: {
    title: "4. Hệ Thống 3 Thủ Ấn Khởi Linh Huyền Môn",
    mudras: [
      { name: "Tam Sơn Ấn (Thủ Ấn Tả Ngạn)", gesture: "Ngón cái bấm giữ móng ngón áp út và ngón út; ngón trỏ, ngón giữa và ngón áp út dựng thẳng", role: "Tượng trưng cho Tam Sơn (Thái Sơn - Hoa Sơn - Côn Lôn Sơn) vững vàng như bàn thạch, dùng tay trái giữ ấn khi trì chú." },
      { name: "Kiếm Chỉ / Lôi Cục Chỉ (Thủ Ấn Phóng Linh Quang)", gesture: "Ngón trỏ và ngón giữa duỗi thẳng song song khép sát; ngón cái bấm lên móng ngón áp út và ngón út", role: "Tập trung toàn bộ Dương khí và tâm lực phóng xuất qua đầu 2 ngón tay để điểm nhãn khai quang phù chú và bát hương." },
      { name: "Bảo Bình Ấn (Thủ Ấn Tụ Khí)", gesture: "Hai bàn tay đan các ngón vào nhau, hai ngón cái và hai ngón trỏ dựng đứng chạm đầu vào nhau tạo hình bình hoa sen", role: "Hấp thụ tú khí của Tam Quang (Nhật Nguyệt Tinh) dung nạp vào tâm thức trước khi truyền khí vào đồ thờ." }
    ]
  },

  signs_and_remedies: {
    title: "5. Dấu Hiệu Bát Hương 'Đắc Linh' & Phương Pháp Hóa Giải Khi Bị 'Mất Linh'",
    signs_dac_linh: [
      { name: "Khí Trường Ấm Áp & Tự Nhiên Cuốn Tàn", desc: "Phòng thờ bước vào cảm giác ấm cúng, thanh thản, thoang thoảng hương trầm thảo mộc tự nhiên. Chân nhang đỏ thắm, tàn hương uốn cong tự nhiên (không dùng hóa chất)." },
      { name: "Gia Đạo Bình An & Công Việc Hanh Thông", desc: "Các thành viên trong gia đình hòa thuận, ít ốm đau vặt, công việc kinh doanh buôn bán thuận buồm xuôi gió, tâm trí minh mẫn sáng suốt." }
    ],
    signs_mat_linh: [
      { name: "Bát Hương Bốc Hỏa (Cháy Chân Nhang Bất Thường)", desc: "Do uế khí tích tụ hoặc trường năng lượng xung đột khiến chân nhang bốc cháy dữ dội. Cần bình tĩnh dập lửa bằng nước gừng hoặc nước thơm, tuyệt đối không dùng chân giẫm đạp." },
      { name: "Phòng Thờ Lạnh Lẽo, Cảm Giác Bất An", desc: "Bước vào phòng thờ cảm thấy lạnh gáy, rợn người, nặng nề u ám; gia đình liên tục xảy ra tranh cãi vô cớ, hao tài tán lộc." }
    ],
    remedy_protocol: "PHƯƠNG PHÁP TÁI TỊNH HÓA (HỒI LINH CHI PHÁP): Tiến hành bao sái toàn diện bằng nước Ngũ Vị Hương và rượu gừng  →  Thắp 7 ngọn nến sáp quanh bàn thờ để bổ sung Dương Hỏa  →  Trì tụng An Thổ Địa Chân Ngôn 108 biến  →  Dâng lễ chay thanh tịnh thỉnh thần an vị trở lại."
  }
};

// ĐẠI CHUYÊN ĐỀ TỐI HẬU I: KHAI QUANG ĐIỂM NHÃN THẤT KHIẾU TƯỢNG THẦN & LINH VẬT CHIÊU TÀI
const WORSHIP_KHAI_QUANG_STATUES = {
  section_id: "worship_khai_quang_statues",
  section_title: "CHUYÊN ĐỀ: KHAI QUANG ĐIỂM NHÃN THẤT KHIẾU TƯỢNG THẦN & LINH VẬT",
  sub_title: "Trích từ Khai Quang Điểm Nhãn Khoa Nghi & Hô Thần Nhập Tượng Chi Pháp: Quy chuẩn điểm nhãn Thất khiếu, Khai quang Gương Kính và Chiêu tài Thần thú",

  statue_consecration_doctrine: {
    title: "1. Bản Thể Luận: Tại Sao Tượng Thờ Bắt Buộc Phải Khai Quang Điểm Nhãn?",
    quote: "Tượng bất khai quang, tắc đồng ngoan thạch. Điểm nhãn hữu linh, thần quang chiếu triệt.",
    quote_source: "Khai Quang Khoa Nghi Bí Quyết",
    desc: "Tượng Thần Tài, Thổ Địa, Tượng Phật, Thiềm Thừ, Tỳ Hưu khi mới thỉnh từ xưởng sản xuất về bản chất chỉ là 'Khối vật chất trần tục' (gốm, đá, đồng, gỗ) chứa đựng tạp khí của nơi chế tác và bàn tay người thợ. Nếu đặt thẳng lên bàn thờ mà không Khai Quang Điểm Nhãn thì tượng vô linh, chẳng những không chiêu được tài lộc mà còn dễ bị tà ma, ngạ quỷ tá túc hưởng hương khói."
  },

  seven_apertures_ceremony: {
    title: "2. Nghi Thức Điểm Nhãn Thất Khiếu (7 Cửa Linh Giác)",
    preparation: "Chuẩn bị: Nước Ngũ Vị Hương, Bột Chu Sa trộn rượu trắng, Bút lông mới tinh khiết, Khăn vải đỏ bịt mắt tượng, Gương đồng (hoặc gương soi mới chưa qua sử dụng).",
    incantations: [
      { organ: "1. ĐIỂM MẮT (ĐIỂM NHÃN)", incantation: "Điểm nhãn nhãn quang minh, chiếu triệt tam thiên đại thiên thế giới, thấu thị càn khôn vạn vật.", role: "Mở linh nhãn để Tôn Thần nhìn thấu thiện ác, phân biệt chân giả, dẫn đường tài lộc." },
      { organ: "2. ĐIỂM TAI (ĐIỂM NHĨ)", incantation: "Điểm nhĩ nhĩ thông thính, văn thanh cứu khổ, lắng nghe tâm nguyện thiện tâm của gia chủ.", role: "Mở linh nhĩ để tiếp nhận lời cầu khấn, thấu triệt âm thanh bốn phương." },
      { organ: "3. ĐIỂM MŨI (ĐIỂM TỴ)", incantation: "Điểm tỵ tỵ thông hương, nạp thiên địa chi thanh khí, phân biệt tà chính trần hoàn.", role: "Mở linh tỵ để thưởng thức hương hoa quả mới thuần khiết." },
      { organ: "4. ĐIỂM MIỆNG (ĐIỂM KHẨU)", incantation: "Điểm khẩu khẩu năng ngôn, khai khẩu xuất chân ngôn, hộ trì thiện gia tăng phúc thọ.", role: "Mở linh khẩu để ban phúc lành, hóa giải khẩu thiệt thị phi." },
      { organ: "5. ĐIỂM TIM (ĐIỂM TÂM)", incantation: "Điểm tâm tâm giác ngộ, từ bi phổ độ, ngưng tụ kim ngân tài bảo vào trạch viên.", role: "Kích hoạt tâm giác ngộ, biến pho tượng thành trung tâm tụ phúc." },
      { organ: "6. ĐIỂM TAY (ĐIỂM THỦ)", incantation: "Điểm thủ thủ năng cầm, chưởng quản thiên tài, nắm giữ ngân lượng châu báu vững bền.", role: "Mở linh thủ để cầm giữ ngọc ngà, tài bảo không bị thất thoát." },
      { organ: "7. ĐIỂM CHÂN (ĐIỂM TÚC)", incantation: "Điểm túc túc năng hành, bộ bộ sinh liên hoa, giáng phó đàn tràng bất ly linh vị.", role: "Mở linh túc để thần tốc giáng lâm, an vị vững chắc như bàn thạch." }
    ]
  },

  mirror_and_cloth_ritual: {
    title: "3. Bí Quyết Mở Khăn Đỏ & Phép Soi Gương Khai Quang",
    steps: [
      "Bước 1: Sau khi chấm son chu sa vào Thất Khiếu, người hành lễ tay cầm Gương soi hướng mặt kính về phía ánh sáng mặt trời (hoặc ánh nến bàn thờ) để hứng tụ 'Dương Quang'.",
      "Bước 2: Phản chiếu luồng ánh sáng từ mặt gương thẳng vào trán và giữa ngực của Tượng Thần.",
      "Bước 3: Mở dải khăn đỏ bịt mắt tượng, đồng thanh hô lớn: 'KHAI TÂM, KHAI THẦN, KHAI QUANG ĐẮC LINH! CẤP CẤP NHƯ LUẬT LỆNH!'",
      "Bước 4: An vị Tượng Thần lên bàn thờ, thắp tuần hương đầu tiên dâng lễ tạ."
    ]
  }
};

// ĐẠI CHUYÊN ĐỀ TỐI HẬU II: TOÀN THƯ 12 BÀI VĂN KHẤN CỔ TRUYỀN & THỰC DƯỠNG TẾ TỰ 24 TIẾT KHÍ
const WORSHIP_CANONICAL_PRAYERS_FULL = {
  section_id: "worship_canonical_prayers_full",
  section_title: "TOÀN THƯ 12 BÀI VĂN KHẤN CỔ TRUYỀN & NGUYÊN TẮC DÂNG LỄ 24 TIẾT KHÍ",
  sub_title: "Tuyển tập 12 bản văn khấn chánh tông cổ truyền ngàn năm của dân tộc và nghệ thuật dâng lễ thuận theo âm dương thời tiết",

  twelve_prayers_list: [
    {
      id: 1,
      occasion: "1. Văn Khấn Ngày Mùng 1 & Ngày Rằm (Sóc Vọng Thường Nhật)",
      theme: "Cầu bình an, gia đạo hòa thuận, công việc hanh thông định kỳ mỗi tháng.",
      core_quote: "Cung thỉnh Thành Hoàng Bản Cảnh, Thổ Địa Tôn Thần, Gia Tiên Tiền Tổ... giáng lâm án tiền chứng giám lòng thành."
    },
    {
      id: 2,
      occasion: "2. Văn Khấn Lễ Tạ Táo Quân Chầu Trời (23 Tháng Chạp)",
      theme: "Tiễn Táo Phủ Thần Quân cưỡi cá chép về Thiên Đình tâu báo việc trần gian.",
      core_quote: "Kính lạy Đông Trù Tư Mệnh Táo Phủ Thần Quân, ngài thượng đạt thiên đình, tâu lời thiện lành, bảo hộ toàn gia."
    },
    {
      id: 3,
      occasion: "3. Văn Khấn Lễ Tất Niên (Chiều 30 Tháng Chạp)",
      theme: "Tống cựu nghinh tân, tạ ơn Thần Linh và Tiên Tổ đã che chở suốt một năm qua.",
      core_quote: "Kính cẩn sửa biện hương hoa cơm canh, dâng lên trước án, kính thỉnh Chư Thần Tiên Tổ về sum vầy Tết cổ truyền."
    },
    {
      id: 4,
      occasion: "4. Văn Khấn Giao Thừa Ngoài Trời (Trừ Tịch Thiên Địa)",
      theme: "Nghinh đón Quan Đương Niên Hành Khiển Thái Tuế Chí Đức Tôn Thần kế nhiệm cai quản năm mới.",
      core_quote: "Kính lạy Quan Đương Niên, Quan Đương Cảnh, Thiên Binh Thiên Tướng... phán xét cát hung, ban phúc thái hòa."
    },
    {
      id: 5,
      occasion: "5. Văn Khấn Giao Thừa Trong Nhà (Thời Khắc Đầu Năm Mới)",
      theme: "Kính thỉnh Bản Gia Thần Linh và Hội Đồng Gia Tiên ngự tại linh từ trong giờ khắc chuyển giao năm mới.",
      core_quote: "Thời khắc thiêng liêng, càn khôn giao hòa, kính rước Tôn Thần Tiên Tổ giáng lâm hưởng lễ đón xuân an khang."
    },
    {
      id: 6,
      occasion: "6. Văn Khấn Sáng Mùng 1 Tết Nguyên Đán",
      theme: "Nghi lễ mở đầu nguyên đán, cầu phúc thọ khang ninh cho toàn thể huyết tộc.",
      core_quote: "Tiết khai hoa nở, con cháu dâng quả thực trà sen, kính chúc tổ tiên an lạc, độ trì con cháu thăng tiến vinh hoa."
    },
    {
      id: 7,
      occasion: "7. Văn Khấn Lễ Hóa Vàng / Tạ Năm Mới (Mùng 3 hoặc Mùng 4 Tết)",
      theme: "Nghi lễ tạ linh, tiễn đưa tổ tiên trở lại cõi vô vi thanh tịnh sau những ngày Tết đầm ấm.",
      core_quote: "Kính dâng kim ngân lễ bạc hóa thiêu, tiễn đưa chư vị quy hồi bản vị, lưu phúc lưu ân lưu tài tại gia."
    },
    {
      id: 8,
      occasion: "8. Văn Khấn Tết Nguyên Tiêu (Rằm Tháng Giêng - Thượng Nguyên Cát Khánh)",
      theme: "Cúng cả năm không bằng Rằm tháng Giêng - Cầu tài lộc thông thuận nguyên niên.",
      core_quote: "Thượng Nguyên Tứ Phúc Thiên Quan giáng lâm, xá tội giải ách, ban phát tài lộc trường cửu."
    },
    {
      id: 9,
      occasion: "9. Văn Khấn Tết Hàn Thực (Mùng 3 Tháng Ba)",
      theme: "Dâng bánh trôi bánh chay, tưởng nhớ cội nguồn và thanh lọc thân tâm đón khí thanh minh.",
      core_quote: "Bánh thơm ngọt mát dâng lên án tiền, tỏ lòng hiếu kính, cầu thanh tịnh an lành."
    },
    {
      id: 10,
      occasion: "10. Văn Khấn Tết Đoan Ngọ (Mùng 5 Tháng Năm - Giết Sâu Bọ)",
      theme: "Thuận theo khí cực Dương của mùa hè, trừ khử tà khí chướng dịch, trừ sâu bọ hại mùa màng.",
      core_quote: "Tiết Đoan Dương dương khí cực thịnh, dâng hoa quả tươi ngọt, xua tan tật bệnh tai ương."
    },
    {
      id: 11,
      occasion: "11. Văn Khấn Đại Lễ Vu Lan Báo Hiếu & Tết Trung Nguyên (Rằm Tháng Bảy)",
      theme: "Báo ân cha mẹ tổ tiên, mở lượng từ bi cúng thí cô hồn giải thoát nghiệp chướng.",
      core_quote: "Địa Quan Xá Tội, Đức Mục Kiền Liên cứu mẹ, ngưỡng nhờ Phật lực gia trì siêu độ cửu huyền thất tổ."
    },
    {
      id: 12,
      occasion: "12. Văn Khấn Lễ Nhập Trạch / Cung Thỉnh An Vị Bàn Thờ Mới",
      theme: "Nghi lễ trang nghiêm nhất khi chuyển về nhà mới hoặc tôn tạo bàn thờ gia tiên.",
      core_quote: "Đất lành chim đậu, trạch viên kiên cố, kính thỉnh Chư Tôn Thần giáng ngự an vị, khai sinh tài lộc muôn đời."
    }
  ],

  seasonal_offerings_guide: {
    title: "Nguyên Tắc Dâng Lễ Thuận 4 Mùa & 24 Tiết Khí",
    seasons: [
      { season: "MÙA XUÂN (MỘC VƯỢNG - SINH KHÍ)", offering: "Dâng hoa tươi đầu cành (đào, mai, cúc), quả ngọt mọng, bánh nếp thơm. Kỵ đồ vị đắng chát, đồ khô héo." },
      { season: "MÙA HẠ (HỎA VƯỢNG - QUANG MINH)", offering: "Dâng hoa sen thơm mát, nước suối nguồn thanh khiết, chè sen long nhãn, trà ướp hương hoa dịu nhiệt Hỏa." },
      { season: "MÙA THU (KIM VƯỢNG - THU HOẠCH)", offering: "Dâng ngũ quả mùa thu (bưởi vàng, hồng đỏ, chuối chín ngự), bánh nướng bánh dẻo tạ ơn mùa màng bội thu." },
      { season: "MÙA ĐÔNG (THỦY VƯỢNG - TÀNG KHÍ)", offering: "Dâng xôi gấc đỏ thắm, nến sáp mật ong ấm áp, thắp hương trầm bài nguyên chất để bổ sung Dương Hỏa xua tan hàn khí." }
    ]
  }
};


// Explicit Global Window Exports for Scholarly Reader
if (typeof window !== 'undefined') {
  if (typeof WORSHIP_FENGSHUI_PART_1 !== 'undefined') window.WORSHIP_FENGSHUI_PART_1 = WORSHIP_FENGSHUI_PART_1;
  if (typeof WORSHIP_FENGSHUI_PART_2 !== 'undefined') window.WORSHIP_FENGSHUI_PART_2 = WORSHIP_FENGSHUI_PART_2;
  if (typeof WORSHIP_FENGSHUI_PART_3 !== 'undefined') window.WORSHIP_FENGSHUI_PART_3 = WORSHIP_FENGSHUI_PART_3;
  if (typeof WORSHIP_FENGSHUI_PART_4 !== 'undefined') window.WORSHIP_FENGSHUI_PART_4 = WORSHIP_FENGSHUI_PART_4;
  if (typeof WORSHIP_FENGSHUI_PART_5 !== 'undefined') window.WORSHIP_FENGSHUI_PART_5 = WORSHIP_FENGSHUI_PART_5;
  if (typeof WORSHIP_FENGSHUI_PART_6 !== 'undefined') window.WORSHIP_FENGSHUI_PART_6 = WORSHIP_FENGSHUI_PART_6;
  if (typeof WORSHIP_FENGSHUI_PART_7 !== 'undefined') window.WORSHIP_FENGSHUI_PART_7 = WORSHIP_FENGSHUI_PART_7;
  if (typeof WORSHIP_FENGSHUI_PART_8 !== 'undefined') window.WORSHIP_FENGSHUI_PART_8 = WORSHIP_FENGSHUI_PART_8;
  if (typeof WORSHIP_FENGSHUI_PART_9 !== 'undefined') window.WORSHIP_FENGSHUI_PART_9 = WORSHIP_FENGSHUI_PART_9;
  if (typeof WORSHIP_FENGSHUI_PART_10 !== 'undefined') window.WORSHIP_FENGSHUI_PART_10 = WORSHIP_FENGSHUI_PART_10;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORSHIP_FENGSHUI_PART_1: typeof WORSHIP_FENGSHUI_PART_1 !== 'undefined' ? WORSHIP_FENGSHUI_PART_1 : null,
    WORSHIP_FENGSHUI_PART_2: typeof WORSHIP_FENGSHUI_PART_2 !== 'undefined' ? WORSHIP_FENGSHUI_PART_2 : null,
    WORSHIP_FENGSHUI_PART_3: typeof WORSHIP_FENGSHUI_PART_3 !== 'undefined' ? WORSHIP_FENGSHUI_PART_3 : null,
    WORSHIP_FENGSHUI_PART_4: typeof WORSHIP_FENGSHUI_PART_4 !== 'undefined' ? WORSHIP_FENGSHUI_PART_4 : null,
    WORSHIP_FENGSHUI_PART_5: typeof WORSHIP_FENGSHUI_PART_5 !== 'undefined' ? WORSHIP_FENGSHUI_PART_5 : null,
    WORSHIP_FENGSHUI_PART_6: typeof WORSHIP_FENGSHUI_PART_6 !== 'undefined' ? WORSHIP_FENGSHUI_PART_6 : null,
    WORSHIP_FENGSHUI_PART_7: typeof WORSHIP_FENGSHUI_PART_7 !== 'undefined' ? WORSHIP_FENGSHUI_PART_7 : null,
    WORSHIP_FENGSHUI_PART_8: typeof WORSHIP_FENGSHUI_PART_8 !== 'undefined' ? WORSHIP_FENGSHUI_PART_8 : null,
    WORSHIP_FENGSHUI_PART_9: typeof WORSHIP_FENGSHUI_PART_9 !== 'undefined' ? WORSHIP_FENGSHUI_PART_9 : null,
    WORSHIP_FENGSHUI_PART_10: typeof WORSHIP_FENGSHUI_PART_10 !== 'undefined' ? WORSHIP_FENGSHUI_PART_10 : null,
  };
}
