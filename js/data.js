/**
 * ĐẠI BÁCH KHOA TOÀN THƯ ĐỊA LÝ PHONG THỦY HỌC & THUẬT TOÁN CÀN KHÔN
 * Hệ thống hóa 2 mạch chính: Thư Tịch Cốt Lõi (Loan Đầu, Lý Khí, Tả Ao) & Thuật Toán Số Hóa (Bát Trạch, Huyền Không, Can Chi)
 * 100% Tiếng Việt học thuật phương Đông chuẩn mực.
 */

const COSMIC_DATA = {
  // =========================================================================
  // MẠCH 1: THƯ TỊCH CỐT LÕI (NỀN TẢNG LÝ THUYẾT ĐỊA LÝ PHONG THỦY)
  // =========================================================================
  geographic_treatises: [
    {
      id: "tang_thu",
      school: "Loan Đầu (Hình Thể)",
      title: "Táng Thư (葬書) - Quách Phác",
      author: "Quách Phác (276 - 324 SCN, Thời Đông Tấn)",
      role: "Khởi tổ định danh bộ môn Phong Thủy học",
      famous_quote: "Khí thừa phong tắc tán, giới thủy tắc chỉ. Cổ nhân tụ chi sử bất tán, hành chi sử hữu chỉ, cố vị chi phong thủy.",
      quote_trans: "Khí gặp gió thổi thì phân tán, gặp nước ngăn thì dừng lại. Người xưa thu gom khí khiến cho không bị tán, dẫn dắt khí khiến cho có chỗ dừng tụ, cho nên gọi đó là Phong Thủy.",
      core_principles: [
        "ĐỊNH NGHĨA KHỞI THỦY CỦA PHONG THỦY: Khẳng định bản chất của phong thủy là 'Tàng Phong Tụ Khí'. Mục đích tối thượng của địa lý không phải là cầu cúng mê tín, mà là tìm kiếm vị trí có hình thế núi đồi che chắn gió độc và có dòng nước hiền hòa làm ranh giới giữ chân sinh khí.",
        "KHÁI NIỆM SINH KHÍ (VITAL QI): Khí là mẹ của nước, đất là thịt của khí. Khí hành trong lòng đất gọi là Mạch Khí (Long Mạch), phát tiết ra ngoài nuôi dưỡng vạn vật gọi là Sinh Khí.",
        "TỨ TƯỢNG ĐỊA THẾ HÌNH HỌC: Xác lập mô hình kinh điển bảo bọc huyệt vị: Tả Thanh Long (Núi ôm bên trái), Hữu Bạch Hổ (Đồi phục bên phải), Tiền Chu Tước (Minh đường nước tụ phía trước), Hậu Huyền Vũ (Núi cao tựa lưng phía sau)."
      ]
    },
    {
      id: "tuyet_tam_phu",
      school: "Loan Đầu (Hình Thể)",
      title: "Tuyết Tâm Phú (雪心賦) - Bốc Tắc Úy",
      author: "Bốc Tắc Úy (Thời Đường)",
      role: "Đỉnh cao thi ca hình thể loan đầu & sa thủy",
      famous_quote: "Cô dương bất sinh, độc âm bất trưởng. Khởi ngung chi thế nhĩ kiến kỳ chân, định huyệt chi cơ ngô tri kỳ bí.",
      quote_trans: "Thuần dương không sinh, thuần âm không dưỡng. Thế núi nhô lên gập ghềnh ta thấy được chân tướng, cơ vi định huyệt ta thấu hiểu chỗ huyền bí.",
      core_principles: [
        "HÌNH THÁI NÚI NON & CẢM ỨNG ĐỊA KHÍ: Miêu tả chi tiết hình dáng gò đồi theo Ngũ Hành: Kim Tinh (núi tròn vòm), Mộc Tinh (núi cao thẳng), Thủy Tinh (núi nhấp nhô lượn sóng), Hỏa Tinh (núi nhọn đỉnh răng cưa), Thổ Tinh (núi vuông đỉnh bằng).",
        "SA THỦY TÌNH Ý: Phân tích tường tận Sa (gò đồi vây quanh) và Thủy (dòng sông uốn lượn). Sa phải 'hữu tình' bao bọc, Thủy phải 'khúc khúc hữu tình' chảy quanh co ôm ấp, kỵ nhất trực xung đâm thẳng hay nghịch thủy chảy xiết tống táng tài khí.",
        "NGHỆ THUẬT ĐIỂM HUYỆT: Dạy phương pháp nhận diện điểm dừng chân của Long Mạch qua các dấu hiệu 'Thư hùng giao cấu', 'Thái cực biên sương', 'Oa Kiềm Đột Nhũ'."
      ]
    },
    {
      id: "thanh_nang_kinh",
      school: "Lý Khí (Tính Toán La Bàn & Thời Gian)",
      title: "Thanh Nang Kinh (青囊經) - Hoàng Thạch Công / Dương Quân Tùng",
      author: "Hoàng Thạch Công truyền thừa Dương Quân Tùng (Dương Cứu Bần)",
      role: "Khởi nguồn trường phái Huyền Không Phi Tinh (Flying Star)",
      famous_quote: "Càn Khôn đại phụ mẫu, Cửu khí phối Cửu tinh. Nhất bạch nhị hắc tam bích tứ lục ngũ hoàng lục bạch thất xích bát bạch cửu tử.",
      quote_trans: "Càn Khôn là cha mẹ lớn của vạn vật, 9 luồng khí phối hợp cùng 9 ngôi sao trên bầu trời. Gồm: 1 Nhất Bạch, 2 Nhị Hắc, 3 Tam Bích, 4 Tứ Lục, 5 Ngũ Hoàng, 6 Lục Bạch, 7 Thất Xích, 8 Bát Bạch, 9 Cửu Tử.",
      core_principles: [
        "ĐỘNG LỰC HỌC CỬU TINH: Giải thích cách 9 ngôi sao Bắc Đẩu (Bắc Đẩu Thất Tinh + Tả Phụ Hữu Bật) di chuyển luân chuyển theo thời gian trong ma trận 9 cung Lạc Thư, làm thay đổi toàn bộ trường năng lượng và cát hung của một trạch nhà.",
        "TAM NGUYÊN CỬU VẬN: Phân chia thời gian vũ trụ thành 3 Nguyên (Thượng, Trung, Hạ), mỗi Nguyên gồm 3 Vận, mỗi Vận 20 năm, tạo thành một đại chu kỳ 180 năm luân chuyển năng lượng hoàn hảo.",
        "KHÁI NIỆM ĐẮC THỜI & THẤT THỜI: Một phương vị có thể là Đại Cát ở Vận này (khi đắc vượng tinh) nhưng lại trở thành Đại Hung ở Vận khác (khi suy tử tinh thoái khí)."
      ]
    },
    {
      id: "la_kinh_thau_giai",
      school: "Lý Khí (Tính Toán La Bàn & Thời Gian)",
      title: "La Kinh Thấu Giải (羅經透解) - Phương Ngoại Nhân",
      author: "Phương Ngoại Nhân (Thời Thanh khảo đính toàn diện)",
      role: "Bách khoa toàn thư giải mã 36 tầng La bàn Phong thủy",
      famous_quote: "Thấu thiên đạt địa chi cơ, tẫn tại Tam Thập Lục tầng chi nội.",
      quote_trans: "Cơ vi thấu suốt trời đất, đều nằm trọn vẹn bên trong 36 tầng của chiếc La Kinh.",
      core_principles: [
        "GIẢI MÃ TAM BÀN CỐT LÕI: Phân định ranh giới và công năng của 3 vòng 24 Sơn Hướng then chốt: Địa Bàn Chính Châm (đo hướng nhà đất theo từ trường địa cầu), Thiên Bàn Phùng Châm (đo dòng chảy tiêu nạp thủy), Nhân Bàn Trung Châm (đo phương vị các đỉnh núi ngọn đồi xung quanh).",
        "TAM NGUYÊN LONG HỆ THỐNG: Phân chia 24 Sơn Hướng thành Địa Nguyên Long, Thiên Nguyên Long và Nhân Nguyên Long với thuộc tính Âm - Dương nghiêm ngặt để phi tinh thuận nghịch.",
        "XUYÊN SƠN 72 LONG & THẤU ĐỊA 60 LONG: Hệ thống đo lường vi tế để tìm đúng mạch khí thanh khiết, tránh rơi vào các cung Không Vong, Sai Thác hay Cô Hư sát khí."
      ]
    },
    {
      id: "dia_ly_ta_ao",
      school: "Di Sản Địa Lý Việt Nam",
      title: "Địa Lý Tả Ao (Địa Đạo Diễn Ca & Dã Đàm Tả Ao)",
      author: "Thánh tổ Địa lý Việt Nam: Tả Ao (Nguyễn Đức Huyên, Thời Lê)",
      role: "Pho kinh điển phong thủy ứng dụng chuẩn mực cho hình thế núi sông Việt Nam",
      famous_quote: "Trăm loài nhờ đất mà sinh / Gió dừng nước tụ ấy tình đất thiêng / Họa phúc tại mạch kết liền / Thư hùng giao phối lập nên thế nhà.",
      quote_trans: "Kinh nghiệm thực chứng địa hình đồi núi, đồng bằng châu thổ sông Hồng và sông Mã.",
      core_principles: [
        "VIỆT HÓA PHONG THỦY THÀNH THƠ NÔM DỄ HIỂU: Tả Ao đúc kết những giáo lý phức tạp thành các bài thơ lục bát bình dị, giúp người dân dễ dàng ghi nhớ cách nhận biết thế đất tốt xấu.",
        "ĐẶC THÙ ĐỒI NÚI & CHÂU THỔ VIỆT NAM: Không rập khuôn máy móc lý thuyết đồng bằng phương Bắc, sách Tả Ao chú trọng đặc tính sông ngòi phù sa lượn sóng, gò đồi đất đỏ bazan và hướng gió mùa Đông Bắc - Tây Nam của nước Việt.",
        "ĐẠO ĐỨC HỌC TẦM LONG ĐIỂM HUYỆT: Nhấn mạnh tâm đức của người thầy địa lý: 'Địa lý cốt ở đức nhân / Đất lành chim đậu phúc phần đời sau'."
      ]
    }
  ],

  // =========================================================================
  // MẠCH 2: DỮ LIỆU THUẬT TOÁN SỐ HÓA (ALGORITHMS & FORMULAS)
  // =========================================================================
  
  // 1. Dữ liệu Bát Trạch (Eight Mansions Algorithm)
  bat_trach: {
    title: "Thuật Toán Bát Trạch Minh Kính (Eight Mansions)",
    desc: "Tính toán Mệnh Quái (Quái số) theo Năm sinh và Giới tính, phân định Đông Tứ Mệnh và Tây Tứ Mệnh cùng ma trận 8 phương vị Cát - Hung.",
    gua_names: ["Khảm", "Khôn", "Chấn", "Tốn", "Trung Cung", "Càn", "Đoài", "Cấn", "Ly"],
    stars: {
      sinh_khi: { name: "Sinh Khí", type: "cat", score: 100, element: "Mộc", desc: "Thượng cát: Tăng trưởng tài lộc, danh vọng, sinh khí vươn tỏa dồi dào." },
      thien_y: { name: "Thiên Y", type: "cat", score: 90, element: "Thổ", desc: "Thượng cát: Sức khỏe trường thọ, quý nhân phù trợ, tiêu trừ tật ách." },
      dien_nien: { name: "Diên Niên", type: "cat", score: 85, element: "Kim", desc: "Trung cát: Gia đạo hòa thuận, tình duyên bền chặt, các mối quan hệ êm ấm." },
      phuc_vi: { name: "Phục Vị", type: "cat", score: 75, element: "Mộc", desc: "Tiểu cát: Tinh thần tĩnh tại, học hành thi cử đỗ đạt, củng cố nội lực." },
      hoa_hai: { name: "Họa Hại", type: "hung", score: 35, element: "Thổ", desc: "Tiểu hung: Dễ gặp thị phi tranh chấp, hao tài nhỏ, mệt mỏi phiền toái." },
      luc_sat: { name: "Lục Sát", type: "hung", score: 25, element: "Thủy", desc: "Thứ hung: Xáo trộn tình cảm, kiện tụng tai tiếng, hao tổn sức khỏe." },
      ngu_quy: { name: "Ngũ Quỷ", type: "hung", score: 15, element: "Hỏa", desc: "Đại hung: Tai họa bất ngờ, hỏa hoạn, mất mát của cải, bất an nội bộ." },
      tuyet_menh: { name: "Tuyệt Mệnh", type: "hung", score: 0, element: "Kim", desc: "Cực hung: Tổn hại sinh mạng, bệnh tật hiểm nghèo, phá sản tiêu điều." }
    },
    // Ma trận phối 8 Quẻ: [Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn]
    // 8 hướng tương ứng: Bắc, Đông Bắc, Đông, Đông Nam, Nam, Tây Nam, Tây, Tây Bắc
    directions: [
      { id: "N", name: "Chính Bắc (Khảm)", angle: 0 },
      { id: "NE", name: "Đông Bắc (Cấn)", angle: 45 },
      { id: "E", name: "Chính Đông (Chấn)", angle: 90 },
      { id: "SE", name: "Đông Nam (Tốn)", angle: 135 },
      { id: "S", name: "Chính Nam (Ly)", angle: 180 },
      { id: "SW", name: "Tây Nam (Khôn)", angle: 225 },
      { id: "W", name: "Chính Tây (Đoài)", angle: 270 },
      { id: "NW", name: "Tây Bắc (Càn)", angle: 315 }
    ]
  },

  // 2. Dữ liệu Huyền Không Phi Tinh (Xuan Kong Flying Stars)
  huyen_khong: {
    title: "Thuật Toán Ma Trận Cửu Cung Huyền Không Phi Tinh (Flying Star)",
    desc: "Tính toán Tinh Bàn 3 tầng (Vận Tinh - Tọa Tinh - Hướng Tinh) phi thuận/nghịch trên ma trận Lạc Thư cho 24 Sơn Hướng trong 9 Vận.",
    periods: [
      { period: 1, years: "1864 - 1883", star: "Nhất Bạch Khảm Thủy" },
      { period: 2, years: "1884 - 1903", star: "Nhị Hắc Khôn Thổ" },
      { period: 3, years: "1904 - 1923", star: "Tam Bích Chấn Mộc" },
      { period: 4, years: "1924 - 1943", star: "Tứ Lục Tốn Mộc" },
      { period: 5, years: "1944 - 1963", star: "Ngũ Hoàng Trung Thổ" },
      { period: 6, years: "1964 - 1983", star: "Lục Bạch Càn Kim" },
      { period: 7, years: "1984 - 2003", star: "Thất Xích Đoài Kim" },
      { period: 8, years: "2004 - 2023", star: "Bát Bạch Cấn Thổ" },
      { period: 9, years: "2024 - 2043 (ĐƯƠNG VẬN)", star: "Cửu Tử Ly Hỏa" }
    ],
    stars_info: [
      { num: 1, name: "Nhất Bạch", hanzi: "一白", trigram: "Khảm", element: "Thủy", nature: "Sao Tham Lang (Cát): Chủ về công danh, học vấn, thi cử đỗ đạt, trí tuệ thông tuệ." },
      { num: 2, name: "Nhị Hắc", hanzi: "二黑", trigram: "Khôn", element: "Thổ", nature: "Sao Cự Môn (Hung - Bệnh Phù): Chủ về tật ách, đau ốm kinh niên, phụ nữ bất lợi." },
      { num: 3, name: "Tam Bích", hanzi: "三碧", trigram: "Chấn", element: "Mộc", nature: "Sao Lộc Tồn (Hung - Siểm Xích): Chủ về thị phi, kiện tụng, tranh chấp bất hòa, trộm cắp." },
      { num: 4, name: "Tứ Lục", hanzi: "四綠", trigram: "Tốn", element: "Mộc", nature: "Sao Văn Khúc (Cát): Chủ về văn chương, tài hoa nghệ thuật, thi cử, đào hoa tình duyên." },
      { num: 5, name: "Ngũ Hoàng", hanzi: "五黃", trigram: "Trung Cung", element: "Thổ", nature: "Sao Liêm Trinh (Đại Sát Tinh): Sát khí cực mạnh, chủ về tai họa, hung hiểm, thương vong bất ngờ." },
      { num: 6, name: "Lục Bạch", hanzi: "六白", trigram: "Càn", element: "Kim", nature: "Sao Vũ Khúc (Cát): Chủ về quyền uy, quan chức quân sự, tài lộc hoạch phát, lãnh đạo." },
      { num: 7, name: "Thất Xích", hanzi: "七赤", trigram: "Đoài", element: "Kim", nature: "Sao Phá Quân (Hung - Tặc Tinh): Chủ về đâm chém thương tích, hỏa hoạn, trộm cắp, phá sản." },
      { num: 8, name: "Bát Bạch", hanzi: "八白", trigram: "Cấn", element: "Thổ", nature: "Sao Tả Phụ (Đại Cát Tinh): Chủ về tài lộc dồi dào, điền sản đất đai, phúc đức vững bền." },
      { num: 9, name: "Cửu Tử", hanzi: "九紫", trigram: "Ly", element: "Hỏa", nature: "Sao Hữu Bật (Đương Lệnh Vận 9): Chủ về hỷ sự, công nghệ, ánh sáng, thịnh vượng huy hoàng." }
    ],
    // 24 Sơn Hướng với độ số và thuộc tính Tam Nguyên Long
    mountains_24: [
      { id: "nham", name: "Nhâm", degree: "337.5° - 352.5°", group: "Địa Bàn Khảm", dragon: "Địa Nguyên Long", polarity: "+" },
      { id: "ty", name: "Tý", degree: "352.5° - 7.5°", group: "Địa Bàn Khảm", dragon: "Thiên Nguyên Long", polarity: "-" },
      { id: "quy", name: "Quý", degree: "7.5° - 22.5°", group: "Địa Bàn Khảm", dragon: "Nhân Nguyên Long", polarity: "-" },
      { id: "suu", name: "Sửu", degree: "22.5° - 37.5°", group: "Địa Bàn Cấn", dragon: "Địa Nguyên Long", polarity: "-" },
      { id: "can", name: "Cấn", degree: "37.5° - 52.5°", group: "Địa Bàn Cấn", dragon: "Thiên Nguyên Long", polarity: "+" },
      { id: "dan", name: "Dần", degree: "52.5° - 67.5°", group: "Địa Bàn Cấn", dragon: "Nhân Nguyên Long", polarity: "+" },
      { id: "giap", name: "Giáp", degree: "67.5° - 82.5°", group: "Địa Bàn Chấn", dragon: "Địa Nguyên Long", polarity: "+" },
      { id: "mao", name: "Mão", degree: "82.5° - 97.5°", group: "Địa Bàn Chấn", dragon: "Thiên Nguyên Long", polarity: "-" },
      { id: "at", name: "Ất", degree: "97.5° - 112.5°", group: "Địa Bàn Chấn", dragon: "Nhân Nguyên Long", polarity: "-" },
      { id: "thin", name: "Thìn", degree: "112.5° - 127.5°", group: "Địa Bàn Tốn", dragon: "Địa Nguyên Long", polarity: "-" },
      { id: "ton", name: "Tốn", degree: "127.5° - 142.5°", group: "Địa Bàn Tốn", dragon: "Thiên Nguyên Long", polarity: "+" },
      { id: "ti", name: "Tỵ", degree: "142.5° - 157.5°", group: "Địa Bàn Tốn", dragon: "Nhân Nguyên Long", polarity: "+" },
      { id: "binh", name: "Bính", degree: "157.5° - 172.5°", group: "Địa Bàn Ly", dragon: "Địa Nguyên Long", polarity: "+" },
      { id: "ngo", name: "Ngọ", degree: "172.5° - 187.5°", group: "Địa Bàn Ly", dragon: "Thiên Nguyên Long", polarity: "-" },
      { id: "dinh", name: "Đinh", degree: "187.5° - 202.5°", group: "Địa Bàn Ly", dragon: "Nhân Nguyên Long", polarity: "-" },
      { id: "mui", name: "Mùi", degree: "202.5° - 217.5°", group: "Địa Bàn Khôn", dragon: "Địa Nguyên Long", polarity: "-" },
      { id: "khon", name: "Khôn", degree: "217.5° - 232.5°", group: "Địa Bàn Khôn", dragon: "Thiên Nguyên Long", polarity: "+" },
      { id: "than", name: "Thân", degree: "232.5° - 247.5°", group: "Địa Bàn Khôn", dragon: "Nhân Nguyên Long", polarity: "+" },
      { id: "canh", name: "Canh", degree: "247.5° - 262.5°", group: "Địa Bàn Đoài", dragon: "Địa Nguyên Long", polarity: "+" },
      { id: "dau", name: "Dậu", degree: "262.5° - 277.5°", group: "Địa Bàn Đoài", dragon: "Thiên Nguyên Long", polarity: "-" },
      { id: "tan", name: "Tân", degree: "277.5° - 292.5°", group: "Địa Bàn Đoài", dragon: "Nhân Nguyên Long", polarity: "-" },
      { id: "tuat", name: "Tuất", degree: "292.5° - 307.5°", group: "Địa Bàn Càn", dragon: "Địa Nguyên Long", polarity: "-" },
      { id: "can_mountain", name: "Càn", degree: "307.5° - 322.5°", group: "Địa Bàn Càn", dragon: "Thiên Nguyên Long", polarity: "+" },
      { id: "hoi", name: "Hợi", degree: "322.5° - 337.5°", group: "Địa Bàn Càn", dragon: "Nhân Nguyên Long", polarity: "+" }
    ]
  },

  // 3. Mạng Lưới Đồ Thị Tri Thức Địa Lý & Thuật Toán (30+ Nút D3.js)
  knowledge_graph: {
    nodes: [
      { id: "Táng Thư", group: "books", radius: 36, cat: "Thư Tịch Cốt Lõi", desc: "Quách Phác soạn: Định nghĩa 'Khí thừa phong tắc tán, giới thủy tắc chỉ' - khởi thủy bộ môn Phong Thủy.", quote: "Tàng phong tụ khí, đắc thủy vi thượng." },
      { id: "Tuyết Tâm Phú", group: "books", radius: 32, cat: "Thư Tịch Cốt Lõi", desc: "Bốc Tắc Úy soạn: Tuyệt phẩm thi phú về thế núi Ngũ Tinh, sa thủy hữu tình và thuật điểm huyệt.", quote: "Cô dương bất sinh, độc âm bất trưởng." },
      { id: "Thanh Nang Kinh", group: "books", radius: 32, cat: "Thư Tịch Cốt Lõi", desc: "Hoàng Thạch Công & Dương Cứu Bần: Nền tảng Huyền Không Phi Tinh, Cửu Tinh và Tam Nguyên Cửu Vận.", quote: "Càn Khôn đại phụ mẫu, Cửu khí phối Cửu tinh." },
      { id: "La Kinh Thấu Giải", group: "books", radius: 30, cat: "Thư Tịch Cốt Lõi", desc: "Giải mã 36 tầng La bàn phong thủy: Tam Bàn (Địa Bàn, Thiên Bàn, Nhân Bàn) và 24 Sơn Hướng.", quote: "Thấu thiên đạt địa, tẫn tại Tam Thập Lục tầng." },
      { id: "Địa Lý Tả Ao", group: "books", radius: 34, cat: "Di Sản Việt Nam", desc: "Thánh tổ Tả Ao Nguyễn Đức Huyên: Địa đạo diễn ca, Dã đàm Tả Ao đúc kết chuẩn mực địa hình Việt Nam.", quote: "Trăm loài nhờ đất mà sinh, gió dừng nước tụ ấy tình đất thiêng." },

      { id: "Loan Đầu Phái", group: "school", radius: 30, cat: "Trường Phái", desc: "Phái hình thể: Chuyên khảo sát Long Mạch, Huyệt Vị, Sa Đồi, Thủy Lưu bảo bọc không gian sống.", quote: "Nhất Loan Đầu, nhị Lý Khí." },
      { id: "Lý Khí Phái", group: "school", radius: 30, cat: "Trường Phái", desc: "Phái tính toán: Dùng La bàn, Cửu Cung Lạc Thư, Can Chi và thời gian để xác định cát hung phương vị.", quote: "Lý khí định thời không biến dịch." },

      { id: "Bát Trạch Minh Kính", group: "algo", radius: 28, cat: "Thuật Toán Số Hóa", desc: "Thuật toán tính Mệnh Quái, chia Đông Tứ Mệnh và Tây Tứ Mệnh, định 4 Cát Tinh và 4 Hung Tinh.", quote: "Đông Tây phối trạch, biến hóa âm dương." },
      { id: "Huyền Không Phi Tinh", group: "algo", radius: 34, cat: "Thuật Toán Số Hóa", desc: "Ma trận 9 cung phi thuận/nghịch của Tọa Tinh và Hướng Tinh theo 9 Vận 180 năm.", quote: "Cửu tinh phi bố, trạch vận lưu chuyển." },
      { id: "Tam Nguyên Cửu Vận", group: "algo", radius: 26, cat: "Thời Không", desc: "Đại chu kỳ 180 năm: Thượng Nguyên (Vận 1-3), Trung Nguyên (Vận 4-6), Hạ Nguyên (Vận 7-9). Đang ở Vận 9 (2024-2043).", quote: "Vận 9 Cửu Tử Ly Hỏa đương quyền." },
      
      { id: "24 Sơn Hướng", group: "compass", radius: 28, cat: "La Bàn Địa Lý", desc: "Hệ thống 24 phương vị chia theo Bát Quái: 8 Can, 12 Chi, 4 Càn Khôn Cấn Tốn, phân Tam Nguyên Long.", quote: "Địa - Thiên - Nhân Nguyên Long." },
      { id: "Long Mạch", group: "loandau", radius: 22, cat: "Loan Đầu", desc: "Mạch núi uốn lượn mang sinh khí từ tổ sơn truyền về huyệt trường.", quote: "Long hành hữu tình." },
      { id: "Minh Đường", group: "loandau", radius: 22, cat: "Loan Đầu", desc: "Khoảng không gian thoáng đãng trước mặt nhà, nơi dòng nước tụ hội và sinh khí ngưng kết.", quote: "Minh đường tụ thủy." },
      { id: "Thanh Long - Bạch Hổ", group: "loandau", radius: 22, cat: "Loan Đầu", desc: "Hai gò núi ôm lấy tả hữu bảo vệ huyệt trường khỏi gió độc thổi ngang.", quote: "Tả hữu tương bão." },
      { id: "Cửu Tinh Lạc Thư", group: "lykhi", radius: 26, cat: "Lý Khí", desc: "Chín ngôi sao phối ma phương bậc 3: Nhất Bạch, Nhị Hắc, Tam Bích, Tứ Lục, Ngũ Hoàng, Lục Bạch, Thất Xích, Bát Bạch, Cửu Tử.", quote: "Ma phương hằng số 15." }
    ],
    links: [
      { source: "Táng Thư", target: "Loan Đầu Phái", value: 5 },
      { source: "Tuyết Tâm Phú", target: "Loan Đầu Phái", value: 5 },
      { source: "Thanh Nang Kinh", target: "Lý Khí Phái", value: 5 },
      { source: "La Kinh Thấu Giải", target: "Lý Khí Phái", value: 5 },
      { source: "Địa Lý Tả Ao", target: "Loan Đầu Phái", value: 4 },
      { source: "Địa Lý Tả Ao", target: "Lý Khí Phái", value: 4 },
      { source: "Loan Đầu Phái", target: "Long Mạch", value: 3 },
      { source: "Loan Đầu Phái", target: "Minh Đường", value: 3 },
      { source: "Loan Đầu Phái", target: "Thanh Long - Bạch Hổ", value: 3 },
      { source: "Lý Khí Phái", target: "Bát Trạch Minh Kính", value: 4 },
      { source: "Lý Khí Phái", target: "Huyền Không Phi Tinh", value: 5 },
      { source: "Huyền Không Phi Tinh", target: "Tam Nguyên Cửu Vận", value: 5 },
      { source: "Huyền Không Phi Tinh", target: "Cửu Tinh Lạc Thư", value: 4 },
      { source: "Huyền Không Phi Tinh", target: "24 Sơn Hướng", value: 5 },
      { source: "La Kinh Thấu Giải", target: "24 Sơn Hướng", value: 4 },
      { source: "Bát Trạch Minh Kính", target: "24 Sơn Hướng", value: 3 }
    ]
  }
};
