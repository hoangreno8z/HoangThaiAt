/**
 * PHONG THỦY THỜ CÚNG CHÁNH TÔNG (KHO TÀNG CỔ THƯ & QUY THỨC TẾ TỰ)
 * CHƯƠNG I - LẦN NẠP KIẾN THỨC 1, 2, 3, 4, 5, 6 & 7 / 10
 */

// LẦN 1: KHỞI NGUYÊN BẢN THỂ & NGUYÊN TẮC TỌA VỊ
const WORSHIP_FENGSHUI_PART_1 = {
  chapter_id: "tho_cung_part_1",
  chapter_title: "Chương I (Lần 1/10): Khởi Nguyên Bản Thể & Nguyên Tắc Tọa Vị Gian Thờ",
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

// LẦN 2: THƯỚC LỖ BAN & KÍCH THƯỚC BÀN THỜ CHUẨN PHONG THỦY (THƯỚC 38.8CM ÂM PHẦN)
const WORSHIP_FENGSHUI_PART_2 = {
  chapter_id: "tho_cung_part_2",
  chapter_title: "Chương I (Lần 2/10): Thước Lỗ Ban 38.8cm & Kích Thước Bàn Thờ Chuẩn Phong Thủy",
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
      { index: 1, name: "Đinh (丁)", type: "cat", color: "#10B981", length: "0 - 3.88 cm", desc: "Cung Đinh (Tốt): Chủ về phúc lộc gia đình, con cháu hiếu thuận thành đạt.", sub_palaces: ["Phúc Tinh", "Cập Đệ", "Tài Vượng", "Đăng Khoa"] },
      { index: 2, name: "Hại (害)", type: "hung", color: "#EF4444", length: "3.88 - 7.76 cm", desc: "Cung Hại (Xấu): Chủ về tai ương bất ngờ, thị phi phiền toái bủa vây.", sub_palaces: ["Khẩu Thiệt", "Bệnh Lâm", "Tử Tuyệt", "Tai Chí"] },
      { index: 3, name: "Vượng (旺)", type: "cat", color: "#10B981", length: "7.76 - 11.64 cm", desc: "Cung Vượng (Tốt): Chủ về vượng khí ngập tràn, việc mừng liên tiếp, tài lộc hanh thông.", sub_palaces: ["Thiên Đức", "Hỷ Sự", "Tiến Bảo", "Nạp Phúc"] },
      { index: 4, name: "Khổ (苦)", type: "hung", color: "#EF4444", length: "11.64 - 15.52 cm", desc: "Cung Khổ (Xấu): Chủ về cay đắng nhọc nhằn, hao tốn tiền bạc, vất vả cô đơn.", sub_palaces: ["Thất Thoát", "Quan Quỷ", "Kiếp Tài", "Vô Tự"] },
      { index: 5, name: "Nghĩa (義)", type: "cat", color: "#10B981", length: "15.52 - 19.40 cm", desc: "Cung Nghĩa (Tốt): Chủ về chính nghĩa, quý nhân giúp đỡ, tăng trưởng điền trạch.", sub_palaces: ["Đại Cát", "Tài Vượng", "Ích Tử", "Thiên Khố"] },
      { index: 6, name: "Quan (官)", type: "cat", color: "#10B981", length: "19.40 - 23.28 cm", desc: "Cung Quan (Tốt): Chủ về đường quan lộ thăng tiến, quyền chức hiển hách, tài vận hoạch phát.", sub_palaces: ["Thuận Khoa", "Hoạch Tài", "Tiến Ích", "Phú Quý"] },
      { index: 7, name: "Tử (死)", type: "hung", color: "#EF4444", length: "23.28 - 27.16 cm", desc: "Cung Tử (Cực Xấu): Chủ về sự suy thoái tột cùng, tử biệt ly tán, phá sản tiêu điều.", sub_palaces: ["Ly Hương", "Tử Biệt", "Thoái Đinh", "Thất Tài"] },
      { index: 8, name: "Hưng (興)", type: "cat", color: "#10B981", length: "27.16 - 31.04 cm", desc: "Cung Hưng (Tốt): Chủ về khởi sắc hưng thịnh, sinh con quý tử, gia đạo phát đạt.", sub_palaces: ["Đăng Khoa", "Quý Tử", "Thêm Đinh", "Hưng Vượng"] },
      { index: 9, name: "Thất (失)", type: "hung", color: "#EF4444", length: "31.04 - 34.92 cm", desc: "Cung Thất (Xấu): Chủ về mất mát, cô độc lẻ loi, dính vòng lao lý kiện tụng.", sub_palaces: ["Cô Quả", "Lao Chấp", "Công Sự", "Thoái Tài"] },
      { index: 10, name: "Tài (財)", type: "cat", color: "#10B981", length: "34.92 - 38.80 cm", desc: "Cung Tài (Tốt): Chủ về tài lộc dồi dào, phúc ấm ngập tràn, vạn sự viên mãn.", sub_palaces: ["Nghinh Phúc", "Lục Hợp", "Tiến Bảo", "Tài Đức"] }
    ]
  },

  altar_golden_dimensions: {
    title: "3. Kích Thước Bàn Thờ Chuẩn Hoàng Kim (Thước 38.8cm)",
    standing_altars: [
      { width: "127 cm (Tiến Bảo)", depth: "61 cm (Tài Lộc)", height: "127 cm (Tiến Bảo)", suit_for: "Không gian thờ cúng vừa và nhỏ, nhà phố, chung cư diện tích trung bình." },
      { width: "153 cm (Lục Hợp)", depth: "67 cm (Quý Tử)", height: "127 cm (Tiến Bảo)", suit_for: "Không gian trang nghiêm, diện tích nhà ở tầm trung và nhà liền kề." },
      { width: "175 cm (Phú Quý)", depth: "81 cm (Đăng Khoa)", height: "127 cm (Tiến Bảo)", suit_for: "Phòng thờ riêng biệt rộng rãi, nhà biệt thự, nhà cổ truyền thống." },
      { width: "197 cm (Đăng Khoa)", depth: "89 cm (Thêm Phúc)", height: "127 cm (Tiến Bảo)", suit_for: "Nhà thờ họ, từ đường, phòng thờ gia tộc lớn uy nghiêm." },
      { width: "217 cm (Thuận Khoa)", depth: "107 cm (Thêm Đinh)", height: "127 cm (Tiến Bảo)", suit_for: "Đại từ đường, sập thờ lớn, không gian tâm linh quy mô lớn." }
    ],
    hanging_altars: [
      { depth: "48 cm (Hỷ Sự)", width: "81 cm (Đăng Khoa)", height_standard: "Treo cách mặt sàn: 172cm (Đại Cát) hoặc 197cm (Đăng Khoa) hoặc 217cm (Thuận Khoa)", suit_for: "Căn hộ chung cư nhỏ, diện tích thờ hẹp, bài trí 1 bát hương." },
      { depth: "48 cm (Hỷ Sự)", width: "88 cm (Tiến Bảo)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Căn hộ chung cư vừa, bày 1 đến 3 bát hương gọn gàng." },
      { depth: "49.5 cm (Tiến Bảo)", width: "95 cm (Tài Vượng)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Căn hộ có diện tích phòng khách rộng, thờ thần linh và gia tiên chung." },
      { depth: "61 cm (Tài Lộc)", width: "107 cm (Quý Tử)", height_standard: "Treo cách mặt sàn: 172cm - 217cm", suit_for: "Bàn thờ treo cỡ lớn, bày đủ tam cấp hoặc 3 bát hương trang trọng." }
    ]
  }
};

// LẦN 3: BÀI TRÍ BÁT HƯƠNG, NGŨ HÀNH ĐỒ THỜ & NGUYÊN TẮC TỤ KHÍ BÀN THỜ
const WORSHIP_FENGSHUI_PART_3 = {
  chapter_id: "tho_cung_part_3",
  chapter_title: "Chương I (Lần 3/10): Bài Trí Bát Hương, Ngũ Hành Đồ Thờ & Cốt Thất Bảo Chánh Tông",
  sub_title: "Quy thức Tam Cấp Thần Vị, bố cục 'Đông Bình Tây Quả', Ngũ Hành Đồ Thờ và thuật nạp Thất Bảo tụ khí linh thiêng",

  incense_burners_layout: {
    title: "1. Quy Thức Bài Trí Bát Hương (Tam Cấp Thần Vị)",
    quote: "Thần linh cư trung, Tiên tổ cư tả, Cô Mãnh cư hữu. Ngôi thứ phân minh, âm dương đắc tự.",
    quote_source: "Chu Tử Gia Lễ (Tế Lễ Quy Thức)",
    burners: [
      { position: "Chính Giữa (Tọa Trung - Kê Cao Nhất)", worship: "Thờ Quan Lớn Đệ Nhất Thần Linh / Thổ Công / Đông Trù Tư Mệnh Táo Phủ Thần Quân / Long Mạch Tôn Thần", specification: "Bát hương lớn nhất, kê cao hơn hai bên từ 3cm đến 5cm (bằng đôn gỗ hoặc tam sơn)." },
      { position: "Bên Tay Phải (Nhìn từ ngoài vào là bên phải, bên trái Thần vị)", worship: "Thờ Gia Tiên Tiền Tổ / Cụ Ông Cụ Bà Nội Ngoại / Thân Tộc Huyết Thống", specification: "Kê thấp hơn bát hương trung tâm, cách bát hương Thần Linh tối thiểu 10cm - 15cm." },
      { position: "Bên Tay Trái (Nhìn từ ngoài vào là bên trái, bên phải Thần vị)", worship: "Thờ Bà Cô Ông Mãnh / Huyền Cô Huyền Cậu / Tiền Chủ Hậu Chủ", specification: "Kê bằng độ cao với bát hương Gia Tiên, đối xứng hoàn hảo qua trục tâm của bát hương Thần Linh." }
    ]
  },

  five_elements_worship: {
    title: "2. Cơ Cấu Ngũ Hành Tương Sinh Trên Mặt Bàn Thờ",
    desc: "Mặt bàn thờ là một tiểu vũ trụ thu nhỏ, bắt buộc phải hội tụ đầy đủ và cân bằng năng lượng của cả 5 nguyên lý Ngũ Hành:",
    elements: [
      { element: "Kim (金) - Nghiêm Cẩn Tinh Khiết", items: "Đỉnh đồng, đôi hạc ngự quy, đôi chân nến đồng, mâm bồng đồng, ống hương đồng.", role: "Tạo nên sự trang nghiêm, khúc xạ ánh sáng ấm, ngưng tụ kim khí thanh khiết xua đuổi tà khí." },
      { element: "Mộc (木) - Sinh Trưởng Hướng Thượng", items: "Bàn thờ gỗ (gỗ gụ, hương, mít, dổi), bài vị gỗ, ngai khám thờ gỗ, đũa thờ, hoa tươi.", role: "Tượng trưng cho sinh khí mùa xuân, mộc khí nuôi dưỡng sự phát triển bền vững của gia tộc." },
      { element: "Thủy (水) - Nhu Thuận Thanh Tịnh", items: "Kỷ chén đựng nước sạch và rượu (3 chén hoặc 5 chén), bình cắm hoa tươi.", role: "Chủ về sự tẩy uế, nuôi dưỡng thanh khí, duy trì sự lưu thông tài lộc và nhu hòa trong gia đạo." },
      { element: "Hỏa (火) - Thăng Hoa Linh Thông", items: "Ngọn đèn dầu, đôi đèn thờ ánh sáng vàng ấm, nến sáp, nén hương đang thắp đỏ.", role: "Chủ về tâm hỏa bừng sáng, sợi dây năng lượng kết nối vô hình giữa cõi hữu hình và cõi siêu thực." },
      { element: "Thổ (土) - Vững Vàng Dung Nạp", items: "Bát hương bằng gốm sứ (men rạn, men lam Bát Tràng), đĩa sứ, tro nếp sạch bên trong bát hương.", role: "Đất mẹ dung nạp vạn vật, tạo điểm tựa tâm linh kiên cố vững chãi không bị lay động." }
    ]
  },

  dong_binh_tay_qua: {
    title: "3. Nguyên Tắc Bố Cục 'Đông Bình Tây Quả' & 'Tả Thanh Long Hữu Bạch Hổ'",
    principles: [
      { name: "Đông Bình - Tây Quả (Quy Luật Sinh Thành Thiên Nhiên)", desc: "Nhìn từ ngoài vào bàn thờ: Bên TAY TRÁI (Phương Đông) đặt Bình Hoa Tươi; Bên TAY PHẢI (Phương Tây) đặt Đĩa Hoa Quả (Mâm Bồng). Gió thổi từ phương Đông mang hương hoa qua đĩa quả sang phương Tây tạo luồng sinh khí tuần hoàn." },
      { name: "Tả Thanh Long - Hữu Bạch Hổ (Cân Bằng Động Tĩnh)", desc: "Bên Tả (Thanh Long - Mộc): Bố trí vật phẩm cao, trang trọng (Bình hoa, Hạc ngự quy, Cây nến cao). Bên Hữu (Bạch Hổ - Kim): Bố trí vật phẩm thấp, trang nhã (Mâm ngũ quả, Đĩa trầu cau, Kỷ nước chén)." }
    ]
  },

  that_bao_consecration: {
    title: "4. Thuật Nạp Cốt Thất Bảo & Tro Nếp Tụ Khí Bát Hương",
    quote: "Thất bảo nạp cốt, linh khí sở quy. Tro nếp tịnh thổ, vạn đại an khang.",
    quote_source: "Khai Quang Tế Tự Mật Chỉ",
    seven_treasures: [
      { name: "Vàng (Kim)", meaning: "Đại diện cho sự bất biến, tôn quý, tịch tà tối thượng." },
      { name: "Bạc (Ngân)", meaning: "Đại diện cho sự thanh khiết, quang minh, trừ khử chướng khí." },
      { name: "Ngọc Bích (Ngọc)", meaning: "Đại diện cho sự nhu hòa, quý phái, tích tụ tinh hoa trời đất." },
      { name: "Hổ Phách (Huyết Phách)", meaning: "Nhựa cây hóa thạch ngàn năm, kết nối linh khí cõi âm dương." },
      { name: "Xà Cừ (Ngọc Trai)", meaning: "Hấp thụ tinh hoa đại dương sâu thẳm, điều hòa thủy khí an lành." },
      { name: "San Hô Đỏ", meaning: "Cây huyết san hô đại diện cho sự trường thọ, may mắn, vượng khí." },
      { name: "Mã Não", meaning: "Đá quý tự nhiên mang từ trường bảo hộ, bình an, tiêu trừ ám khí." }
    ],
    ash_rule: "VẬT LIỆU ĐỰNG BÊN TRONG: Bắt buộc dùng Tro Rơm Nếp Sạch đốt tơi xốp, thơm mùi lúa mới. Trộn kèm bột Ngũ Vị Hương và nước gừng tẩy uế. TUYỆT ĐỐI KHÔNG DÙNG CÁT XÂY DỰNG BẨN."
  }
};

// LẦN 4: 18 ĐẠI KỴ TRONG PHONG THỦY BÀN THỜ & PHÉP HÓA GIẢI CHÁNH TÔNG
const WORSHIP_FENGSHUI_PART_4 = {
  chapter_id: "tho_cung_part_4",
  chapter_title: "Chương I (Lần 4/10): 18 Đại Kỵ Phong Thủy Bàn Thờ & Phương Pháp Hóa Giải Chánh Tông",
  sub_title: "Tổng hợp 18 sát khí nguy hiểm nhất đối với Thần Vị gia trạch từ Dương Trạch Tam Yếu & Lỗ Ban Kinh",

  taboo_categories: [
    {
      category_name: "Nhóm I: Đại Kỵ Về Không Gian Vị Trí (Tọa & Tựa Sát)",
      items: [
        { id: 1, name: "Ban thờ tựa lưng hoặc đối diện Nhà Vệ Sinh (Uế Khí Xung Sát)", danger: "Uế khí ẩm mốc xâm phạm linh vị, dẫn tới gia đạo lục đục, bệnh tật đường ruột, tiêu hao tiền của.", remedy: "Di chuyển vị trí; nếu không thể di chuyển, dựng vách gỗ kín 2 lớp ngăn cách và treo rèm hạt gỗ hóa giải." },
        { id: 2, name: "Ban thờ đặt dưới hoặc cạnh Bếp Nấu (Hỏa Thiêu Thần Vị)", danger: "Hỏa khí quá vượng thiêu đốt linh khí, khiến tính khí gia chủ nóng nảy, dễ xảy ra hỏa hoạn, tai ương.", remedy: "Tách biệt hoàn toàn khỏi bếp nấu, tạo lớp cách nhiệt hoặc dùng vách thạch cao ngăn khí Hỏa." },
        { id: 3, name: "Ban thờ tựa lưng vào Phòng Ngủ Vợ Chồng (Bất Kính Sắc Khí)", danger: "Phạm vào giới sắc bất kính với thần linh tiền tổ, sinh ra bất hòa vợ chồng, giấc ngủ bất an mộng mị.", remedy: "Kê giường ngủ cách xa tường thờ, bố trí tủ quần áo làm lớp đệm ngăn cách giữa hai không gian." },
        { id: 4, name: "Dầm xà ngang đè lên đỉnh Bàn Thờ (Áp Đỉnh Sát)", danger: "Tạo áp lực trường khí cực nặng nề, ức chế con đường công danh, gia chủ thường xuyên đau đầu suy nhược.", remedy: "Làm trần thạch cao che kín xà dầm, hoặc treo hồ lô gỗ đào tự nhiên dưới dầm để hóa sát." },
        { id: 5, name: "Đặt bàn thờ dưới gầm Cầu Thang (Đạp Đầu Sát / Tiệt Khí)", danger: "Người đi lại giẫm đạp lên đầu linh vị, sinh khí bị đè nén khiến con cháu khó phát triển, sa sút tài vận.", remedy: "Tuyệt đối không đặt dưới gầm cầu thang, bắt buộc chuyển lên gian phòng trang nghiêm ở tầng trên." }
      ]
    },
    {
      category_name: "Nhóm II: Đại Kỵ Về Luồng Khí & Hướng Chiếu (Xung Khí Sát)",
      items: [
        { id: 6, name: "Cửa chính đâm thẳng vào chính diện Bàn Thờ (Trực Xung Sát)", danger: "Luồng gió xộc thẳng làm tán động chân khí, người ngoài nhìn thấu nội đường, tài lộc khó tích tụ.", remedy: "Lắp đặt bình phong gỗ hoặc rèm che rủ trước bàn thờ để dòng khí uốn lượn tụ khí êm dịu." },
        { id: 7, name: "Nắng gắt chiếu thẳng hoặc Gió lùa lồng lộng (Phong Xung & Quang Sát)", danger: "Dương khí thái quá hoặc gió mạnh làm tắt hương, cháy chân nhang, tạo cảm giác bất an tán khí.", remedy: "Kéo rèm che cửa sổ bằng vải gấm hoặc gỗ, sử dụng vách ngăn chắn gió lùa trực diện." },
        { id: 8, name: "Gương soi phản chiếu trực tiếp vào Bàn Thờ (Quang Minh Đảo Điên Sát)", danger: "Gương sinh ra từ trường phản xạ hỗn loạn, tạo ảo giác kinh động vong linh tiền tổ, gia trạch bất an.", remedy: "Tháo bỏ gương hoặc di dời gương sang vị trí khác, tuyệt đối không để gương đối diện ban thờ." },
        { id: 9, name: "Bàn thờ đặt sát lối đi lại ồn ào (Động Sát)", danger: "Mất đi tính Âm Tĩnh tôn nghiêm, linh khí bị kinh động làm gia đạo hay tranh cãi, khó an định tâm trí.", remedy: "Lập vách CNC chắn lối đi, tạo không gian phòng thờ biệt lập, tĩnh lặng thanh tịnh." }
      ]
    },
    {
      category_name: "Nhóm III: Đại Kỵ Về Bát Hương & Đồ Thờ (Vật Khí Sát)",
      items: [
        { id: 10, name: "Tự tiện xê dịch xoay chuyển Bát Hương (Động Bát Hương Sát)", danger: "Bát hương đã an vị tụ khí khi bị xê dịch tùy tiện sẽ làm đứt gãy trường năng lượng bảo hộ, tán tài tán lộc.", remedy: "Cố định bát hương bằng đôn gỗ/keo dán đế. Khi bao sái chỉ dùng khăn sạch lau quanh, giữ chặt thân bát hương." },
        { id: 11, name: "Bày hoa giả, quả nhựa, đồ chơi lên Bàn Thờ (Hư Linh Bất Kính)", danger: "Thờ cúng lấy chữ 'Thành' và 'Chân' làm gốc, đồ giả mang năng lượng chết, làm giảm sút linh khí trang nghiêm.", remedy: "Chỉ dùng hoa tươi (cúc, sen, huệ, đồng tiền), quả tươi thật dâng cúng, héo úa phải thay ngay." },
        { id: 12, name: "Đồ đạc bừa bãi dưới gầm chân Bàn Thờ (Tạp Vật Ô Trọc)", danger: "Để quạt hỏng, giày dép, chổi quét nhà dưới gầm bàn thờ sinh uế khí bốc lên, cản trở tài lộc.", remedy: "Dọn dẹp sạch sẽ gầm bàn thờ, chỉ để trống hoặc để đồ cúng lễ sạch sẽ chưa dùng tới." },
        { id: 13, name: "Thờ lẫn lộn quá nhiều Bát Hương (Khí Trường Hỗn Loạn)", danger: "Cắm lẫn lộn bát hương họ nội, họ ngoại, bạn bè cùng một chỗ làm xung đột trường khí gia tộc.", remedy: "Quy hoạch chuẩn 3 bát hương (Thần Linh, Gia Tiên, Bà Cô Ông Mãnh); thờ họ ngoại lập ban riêng." },
        { id: 14, name: "Tượng Phật đặt thấp hơn Bài Vị Gia Tiên (Nghịch Ngôi Tôn Ty)", danger: "Phật là bậc Giác ngộ tối thượng Tam Giới, đặt dưới gia tiên là phạm nghịch ngôi thứ, tổn hao phúc đức.", remedy: "Tượng Phật / Ảnh Phật bắt buộc đặt ở tầng trên cao hơn hẳn bài vị và bát hương gia tiên." },
        { id: 15, name: "Dùng hương tẩm hóa chất cuốn tàn độc hại (Ô Nhiễm Khí Trường)", danger: "Hóa chất cháy sinh khí độc làm ngột ngạt không gian thờ, gây hại sức khỏe và làm tán mất chân khí thanh tịnh.", remedy: "Sử dụng hương thảo mộc tự nhiên (hương trầm, quế, bài) thuần khiết, thơm dịu, an toàn." },
        { id: 16, name: "Bàn thờ đặt trên nóc Tủ Quần Áo / Kệ Sinh Hoạt", danger: "Đóng mở tủ sinh rung lắc mạnh, làm động bát hương và thể hiện sự thiếu tôn kính trang nghiêm.", remedy: "Sử dụng bàn thờ chân đứng độc lập vững chãi hoặc bàn thờ treo tường bắt vít kiên cố." },
        { id: 17, name: "Đèn thờ nhấp nháy nhiều màu hoặc quá chói lọi (Hỗn Loạn Quang Sát)", danger: "Tạo cảm giác ma mị, kích động thần kinh, phá vỡ bầu không khí trang nghiêm thanh tịnh.", remedy: "Dùng đèn thờ ánh sáng vàng ấm cố định (2700K - 3000K), ánh sáng dịu nhẹ, tĩnh tại." },
        { id: 18, name: "Đặt Bể Cá Cảnh ngay dưới hoặc cạnh Bàn Thờ (Chính Thần Hạ Thủy)", danger: "Bàn thờ thuộc Hỏa/Thổ ngưng tụ, nước chuyển động liên tục của bể cá dập tắt hỏa khí, gây tán tài phá sản.", remedy: "Di dời bể cá sang cung tài lộc phòng khách, tuyệt đối giữ khu vực thờ cúng khô ráo thanh tịnh." }
      ]
    }
  ]
};

// LẦN 5: NGHI THỨC BAO SÁI BÁT HƯƠNG, TẨY UẾ & RÚT TỈA CHÂN NHANG CHÁNH TÔNG
const WORSHIP_FENGSHUI_PART_5 = {
  chapter_id: "tho_cung_part_5",
  chapter_title: "Chương I (Lần 5/10): Nghi Thức Bao Sái Bát Hương, Tẩy Uế & Rút Tỉa Chân Nhang",
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

// LẦN 6: PHONG THỦY BÀN THỜ THẦN TÀI - THỔ ĐỊA & QUY TẮC CHIÊU TÀI TỤ BẢO
const WORSHIP_FENGSHUI_PART_6 = {
  chapter_id: "tho_cung_part_6",
  chapter_title: "Chương I (Lần 6/10): Phong Thủy Bàn Thờ Thần Tài - Thổ Địa & Quy Tắc Chiêu Tài TỤ BẢO",
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

// LẦN 7: PHONG THỦY BÀN THỜ PHẬT TẠI GIA & QUY THỨC THỜ CHUNG PHẬT - GIA TIÊN
const WORSHIP_FENGSHUI_PART_7 = {
  chapter_id: "tho_cung_part_7",
  chapter_title: "Chương I (Lần 7/10): Phong Thủy Bàn Thờ Phật Tại Gia & Quy Thức Thờ Chung Phật - Gia Tiên",
  sub_title: "Trích từ Phật Thuyết Bát Đại Nhân Giác Kinh & Chu Tử Gia Lễ (Thích Đạo Phối Tự): Quy tắc 'Tiền Phật Hậu Linh', phân cấp nhị tầng và giới luật cúng dường chay tịnh",

  // 1. Bản thể luận & Thứ bậc tôn ty
  spiritual_hierarchy: {
    title: "1. Thứ Bậc Tôn Ty Tâm Linh: 'Tiền Phật Hậu Linh / Phật Thượng Tiên Hạ'",
    quote: "Phật thị Tam Giới Đạo Sư, Tứ Sanh Từ Phụ. Tiên tổ nương thừa Phật lực, siêu sinh Tịnh Độ.",
    quote_source: "Thích Môn Quy Kính Nghi",
    hierarchy_rules: [
      {
        name: "Đức Phật & Chư Đại Bồ Tát (Đấng Giác Ngộ Tối Thượng)",
        desc: "Đức Phật là bậc Thiên Nhân Sư (Thầy của Trời và Người), đã thoát khỏi luân hồi sinh tử. Do đó linh vị của Phật bắt buộc phải ngự ở tầng cao nhất, tôn nghiêm nhất, thanh tịnh tuyệt đối."
      },
      {
        name: "Gia Tiên Tiền Tổ (Huyết Thống Đang Nương Tựa Phật Pháp)",
        desc: "Tiền nhân huyết thống vẫn còn trong cõi luân hồi. Thờ Phật chung với Gia Tiên là để Tiên Tổ ngày ngày nghe kinh niệm Phật, tiêu trừ nghiệp chướng, nương nhờ đại nguyện của Phật để vãng sinh Tây Phương."
      },
      {
        name: "Quy Tắc Tuyệt Đối Về Chiều Cao & Vị Trí",
        desc: "Tượng Phật / Ảnh Phật BẮT BUỘC ĐẶT CAO HƠN bài vị và bát hương Gia Tiên tối thiểu từ 15cm đến 30cm. Tuyệt đối không bao giờ đặt linh vị Gia Tiên ngang hàng hoặc cao hơn tượng Phật (phạm đại nghịch tôn ty làm tổn hao phước đức)."
      }
    ]
  },

  // 2. Mô hình bố cục bàn thờ Phật và Gia Tiên
  dual_altar_models: {
    title: "2. Hai Mô Hình Bố Cục Bàn Thờ Phật & Gia Tiên Chuẩn Phong Thủy",
    models: [
      {
        model_name: "Mô Hình 1: Bàn Thờ Phân Cấp (Nhị Cấp / Tam Cấp)",
        suitable: "Phù hợp nhà phố, căn hộ chung cư hoặc không gian thờ cúng có diện tích vừa phải.",
        structure: [
          "Tầng Thượng (Cấp trên cao nhất): Đặt Tượng Phật (hoặc Tam Thánh Phật), 1 bát hương Phật riêng, 1 bình hoa tươi, 1 đĩa quả chay, 1 chén nước thanh tịnh.",
          "Tầng Hạ (Cấp dưới thấp hơn): Đặt bài vị Gia Tiên, 3 bát hương thờ Thần Linh & Gia Tiên & Bà Cô Ông Mãnh, kỷ chén nước, đĩa trầu cau."
        ]
      },
      {
        model_name: "Mô Hình 2: Hai Bàn Thờ Tách Biệt Độc Lập",
        suitable: "Phù hợp biệt thự, nhà thờ họ, hoặc gia trạch có phòng thờ riêng biệt rộng rãi.",
        structure: [
          "Bàn Thờ Phật: Đặt ở chính giữa gian phòng thờ, kê cao nhất, trang nghiêm thanh tịnh hướng ra cửa sáng.",
          "Bàn Thờ Gia Tiên: Đặt bên tay Phải (nhìn từ ngoài vào) hoặc thấp hơn bàn thờ Phật 1 bậc, tạo sự hài hòa âm dương."
        ]
      }
    ]
  },

  // 3. Giới luật cúng dường chay tịnh
  offering_commandments: {
    title: "3. Giới Luật Cúng Dường Bàn Thờ Phật (100% Chay Tịnh)",
    rules: [
      { item: "Lễ Vật Cúng Phật", detail: "TUYỆT ĐỐI 100% ĐỒ CHAY THANH TỊNH: Hoa tươi (Hoa Sen, Hoa Cúc, Hoa Huệ), Quả tươi ngọt ngào, Nước lọc tinh khiết, Trà thơm, Xôi chè, Oản phẩm, Cơm chay." },
      { item: "Đại Kỵ Tuyệt Đối", detail: "CẤM KỴ TUYỆT ĐỐI: Không dâng đồ mặn (thịt, cá, tôm, trứng), không dâng rượu, tỏi ớt, không đốt vàng mã tiền âm phủ trên bàn thờ Phật (Phật không dùng tiền âm phủ và không sát sinh)." },
      { item: "Xử Lý Khi Cúng Mặn Gia Tiên", detail: "Nếu gia đình làm cỗ mặn cúng Gia Tiên, mâm cỗ mặn PHẢI ĐẶT Ở BÀN RIÊNG PHÍA DƯỚI, tuyệt đối không đặt mâm cỗ mặn lên cùng mặt phẳng bàn thờ Phật." }
    ]
  },

  // 4. Hướng đặt & Chọn tượng Phật tại gia
  orientations_and_statues: {
    title: "4. Hướng Đặt Bàn Thờ Phật & Lựa Chọn Tượng Phật Bản Mệnh",
    statues: [
      { name: "Tây Phương Tam Thánh", desc: "Đức Phật A Di Đà (ở giữa), Quán Thế Âm Bồ Tát (bên trái cầm nhành dương liễu và bình cam lộ), Đại Thế Chí Bồ Tát (bên phải cầm hoa sen xanh)." },
      { name: "Đức Bổn Sư Thích Ca Mâu Ni", desc: "Bậc Giáo Chủ cõi Ta Bà, ngồi kiết già tọa thiền trên tòa sen, khai mở trí tuệ thanh tịnh." },
      { name: "Quán Thế Âm Bồ Tát", desc: "Hiện thân của lòng đại từ đại bi, cứu khổ cứu nạn, che chở gia đạo bình an tai qua nạn khỏi." }
    ],
    orientation_rule: "HƯỚNG ĐẠT ĐẠI CÁT: Bàn thờ Phật nên nhìn về hướng TÂY (hướng về cõi Tây Phương Cực Lạc) hoặc hướng nhìn thẳng ra Minh Đường đón ánh sáng tự nhiên. Mặt tượng Phật phải hướng ra nơi thanh tịnh, cấm nhìn thẳng vào giường ngủ, cửa nhà vệ sinh, bàn ăn hoặc góc bếp."
  }
};
