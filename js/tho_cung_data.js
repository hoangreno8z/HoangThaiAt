/**
 * PHONG THỦY THỜ CÚNG CHÁNH TÔNG (KHO TÀNG CỔ THƯ & QUY THỨC TẾ TỰ)
 * CHƯƠNG I: ĐẠI BÁCH KHOA PHONG THỦY THỜ CÚNG & LINH VỊ GIA TIÊN CHÁNH TÔNG
 * 10 TIẾT CHUYÊN KHẢO TOÀN DIỆN
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
      { step: "Bước 2: Thứ Tự Lau Dọn Ban Thờ (Từ Trên Xuống Dưới, Từ Tôn Đến Ti)", action: "Lau tượng Phật trước $\rightarrow$ Lau bài vị Thần Linh $\rightarrow$ Lau bài vị Gia Tiên $\rightarrow$ Lau ngai thờ, chân nến." },
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

// TIẾT X: TỜ DỊ HIỆU BÁT HƯƠNG (GIẢI MÃ PHÙ VĂN, HÌNH VẼ, QUY CÁCH VIẾT) & ĐẠI TỔNG KẾT CHƯƠNG I
const WORSHIP_FENGSHUI_PART_10 = {
  chapter_id: "tho_cung_part_10",
  chapter_title: "Tiết X: Tờ Dị Hiệu Bát Hương (Cấu Trúc, Phù Văn, Phép Viết) & Đại Tổng Kết",
  sub_title: "Giải mã 'Thẻ căn cước tâm linh' của Bát Hương, ý nghĩa linh phù đồ hình Bát Quái, Thái Cực, Long Phụng và Đại Ma Trận Phong Thủy Thờ Cúng",

  // 1. Bản chất & Cấu trúc đồ hình Tờ Dị Hiệu
  di_hieu_anatomy: {
    title: "1. Bản Chất & Cấu Trúc Đồ Hình Tờ Dị Hiệu Bát Hương Chánh Tông",
    quote: "Dị hiệu định danh, thần linh ngự vị. Thất bảo tụ khí, vạn tà bất xâm.",
    quote_source: "Khai Quang An Vị Chánh Tông",
    definition: "Tờ Dị Hiệu (hay Tờ Hiệu / Linh Phù Định Vị) là bản 'Căn cước tâm linh' bắt buộc phải có trong mỗi bát hương. Tờ hiệu xác lập tọa độ tâm thức để Thần Linh hoặc Gia Tiên giáng ngự đúng ngôi thứ, đồng thời ngăn chặn tuyệt đối các vong linh vãng lai ngoại quỷ xâm nhập chiếm đoạt linh khí.",
    visual_symbols: [
      {
        symbol_name: "Đồ Hình Thái Cực & Bát Quái Trấn Trạch (Ở Đỉnh Trên Cùng)",
        meaning: "Biểu trưng cho khởi nguồn càn khôn vũ trụ, tạo lập từ trường cân bằng Âm Dương và kết giới bảo hộ, trấn trừ tà khí xâm phạm vào danh xưng thần thánh."
      },
      {
        symbol_name: "Phù Đầu Tam Thanh (Ba Dấu Chấm Hoặc Phù Ấn)",
        meaning: "Đại diện cho Tam Bảo (Phật - Pháp - Tăng) hoặc Tam Thanh (Ngọc Thanh - Thượng Thanh - Thái Thanh), là ấn chỉ sắc lệnh cho phép chân linh an ngự."
      },
      {
        symbol_name: "Khung Ô Trống Viền Long Phượng / Kim Cang",
        meaning: "Khung chữ nhật màu đỏ bảo vệ không gian ghi danh hiệu tôn kính, biểu trưng cho sự tôn nghiêm, không để ô trọc bụi trần xâm phạm danh tính linh thiêng."
      },
      {
        symbol_name: "Hình Tượng Song Long Chầu Nguyệt (Hai Bên Thân)",
        meaning: "Rồng là linh vật đứng đầu Tứ Linh, đại diện cho dương khí thuần khiết, bảo hộ linh vị bất khả xâm phạm và gia tăng uy lực chiêu phúc."
      }
    ],
    color_rule: "MÀU SẮC & CHẤT LIỆU CHUẨN MỰC: Tờ Dị Hiệu dùng giấy màu VÀNG in mực ĐỎ (hoặc giấy ĐỎ in mực VÀNG), đại diện cho Hoàng Thổ và Chu Sa Tịch Tà. Chữ viết bên trong dùng bút mực đỏ hoặc mực đen đậm nét, trang nghiêm."
  },

  // 2. Quy cách viết nội dung chữ trên 5 loại Tờ Dị Hiệu
  di_hieu_writing_templates: {
    title: "2. Quy Cách Soạn Thảo Nội Dung 5 Bản Dị Hiệu Bát Hương Chánh Tông",
    rule_note: "Chữ viết dọc từ trên xuống dưới theo truyền thống, hoặc viết chữ in hoa trang trọng:",
    templates: [
      {
        altar_type: "1. Bát Hương Quan Lớn Thần Linh (Chính Giữa Ban Gia Tiên)",
        content: "PHỤNG THỊ: QUAN ĐƯƠNG NIÊN HÀNH KHIỂN THÁI TUẾ CHÍ ĐỨC TÔN THẦN, BẢN CẢNH THÀNH HOÀNG CHƯ VỊ ĐẠI VƯƠNG, BẢN XỨ THẦN LINH THỔ ĐỊA, ĐÔNG TRÙ TƯ MỆNH TÁO PHỦ THẦN QUÂN, NGŨ PHƯƠNG NGŨ THỔ LONG MẠCH TÔN THẦN, TIỀN HẬU ĐỊA CHỦ TÀI THẦN CHI VỊ."
      },
      {
        altar_type: "2. Bát Hương Gia Tiên Tiền Tổ (Bên Tay Phải Nhìn Vào)",
        content: "PHỤNG THỊ: HỘI ĐỒNG CAO TẰNG TỔ KHẢO, CAO TẰNG TỔ TỶ, BÁ THÚC HUYNH ĐỆ, CÔ DI TỶ MUỘI, TIÊN TỔ NỘI NGOẠI DÒNG HỌ [ĐIỀN TÊN HỌ GIA ĐÌNH] CHÂN LINH VỊ TIỀN."
      },
      {
        altar_type: "3. Bát Hương Bà Cô Ông Mãnh (Bên Tay Trái Nhìn Vào)",
        content: "PHỤNG THỊ: HỘI ĐỒNG BÀ CÔ, ÔNG MÃNH, HUYỀN CÔ HUYỀN CẬU, TIỀN CHỦ HẬU CHỦ DÒNG HỌ [ĐIỀN TÊN HỌ GIA ĐÌNH] VỊ TIỀN."
      },
      {
        altar_type: "4. Bát Hương Bàn Thờ Thần Tài - Thổ Địa",
        content: "PHỤNG THỊ: ĐÔNG HẢI THÁI TẠNG, NAM HẢI CỬU LONG, TÂY HẢI BẠCH HỔ, BẮC HẢI HUYỀN VŨ, TRUNG ƯƠNG HUỲNH LONG NGŨ PHƯƠNG NGŨ THỔ THẦN KỲ, TIỀN HẬU ĐỊA CHỦ TÀI THẦN VỊ TIỀN."
      },
      {
        altar_type: "5. Bát Hương Bàn Thờ Phật Tại Gia",
        content: "PHỤNG THỊ: THẬP PHƯƠNG THƯỜNG TRỤ TAM BẢO, NAM MÔ BẢN SƯ THÍCH CA MÂU NI PHẬT, NAM MÔ ĐẠI TỪ ĐẠI BI QUÁN THẾ ÂM BỒ TÁT VỊ TIỀN."
      }
    ]
  },

  // 3. Quy luật gói Dị Hiệu cùng Cốt Thất Bảo
  wrapping_process: {
    title: "3. Quy Luật Gói Tờ Dị Hiệu Bao Bọc Cốt Thất Bảo Đặt Đáy Bát Hương",
    steps: [
      "Bước 1: Viết đầy đủ, chính xác danh hiệu của bát hương lên tờ Dị Hiệu bằng tâm thành kính.",
      "Bước 2: Đặt gói Cốt Thất Bảo (Vàng, Bạc, Ngọc, San Hô, Mã Não, Hổ Phách, Xà Cừ) vào chính giữa lòng tờ Dị Hiệu.",
      "Bước 3: Gấp tờ Dị Hiệu lại thành hình vuông hoặc hình chữ nhật bao bọc kín gói Cốt Thất Bảo bên trong (mặt chữ danh xưng hướng vào trong ôm lấy Thất Bảo).",
      "Bước 4: Đặt gói Dị Hiệu Thất Bảo xuống chính giữa đáy bát hương.",
      "Bước 5: Đổ tro rơm nếp sạch đã sàng lọc và tẩm hương gừng lên trên cho đến khi cách miệng bát hương khoảng 1-2 cm."
    ]
  },

  // 4. Đại Tổng Kết Chương I: Bảng Ma Trận Tổng Hành Dinh Phong Thủy Thờ Cúng
  chapter_summary_matrix: {
    title: "4. Đại Tổng Kết Chương I: Ma Trận Toàn Cảnh Phong Thủy Thờ Cúng",
    summary_pillars: [
      { pillar: "Định Vị Tọa Hướng", standard: "Bàn thờ luôn TỌA CÁT HƯỚNG CÁT theo Mệnh Quái, lưng tựa Thực Tường vững chãi, Minh Đường thoáng đãng tụ thủy." },
      { pillar: "Thước Số Hoàng Kim", standard: "Dùng Thước Lỗ Ban 38.8cm (Âm Phần) đo kích thước bàn thờ đứng và bàn thờ treo tường rơi vào các cung Cát (Đỏ)." },
      { pillar: "Ngũ Hành Hội Tụ", standard: "Bàn thờ hội tụ đủ Kim (Đỉnh/Hạc đồng) - Mộc (Bàn thờ/Bài vị gỗ) - Thủy (Chén nước/Bình hoa) - Hỏa (Đèn/Nến/Nhang) - Thổ (Bát hương sứ/Tro nếp)." },
      { pillar: "Trật Tự Tôn Ty", standard: "Phật Thượng Tiên Hạ, Thần Linh Cư Trung, Tiên Tổ Cư Tả, Cô Mãnh Cư Hữu, Thần Tài tiếp sát địa khí." },
      { pillar: "Bảo Hộ Khí Trường", standard: "Cốt Thất Bảo bọc trong Tờ Dị Hiệu định danh đặt đáy bát hương, tro nếp sạch thuần khiết, 4 lớp chắn khói bảo vệ." }
    ]
  }
};
