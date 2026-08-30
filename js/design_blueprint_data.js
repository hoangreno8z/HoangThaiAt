/**
 * DỮ LIỆU CÔNG CỤ: GỢI Ý THIẾT KẾ KHÍ ĐỘNG HỌC & CỔ TRUYỀN TOÀN THƯ (BẢN CHUẨN KỸ THUẬT VẬT LÝ)
 * Tích hợp toàn diện 6 Đại Nguyên Lý Cốt Lõi (Cổ Thư & Khí Động Học),
 * 8 Bộ Bản Vẽ Mẫu Chuẩn Kỹ Thuật (SVG Vector & Tiêu Chuẩn Thực Tế ISO/TCVN/ASCE/FEMA),
 * và Ma Trận 10 Đại Rủi Ro Xây Dựng Thực Tế.
 */

const DESIGN_BLUEPRINT_THEORY = {
  title: "Lý Thuyết Khí Động Học & Cổ Thư Phong Thủy Trị Thiên Tai",
  sections: [
    {
      id: "bernoulli_uplift",
      title: "1. Bản Chất Sự Cố Tốc Mái Bão & Lực Nâng Bernoulli",
      classic_source: "《葬書》 (Táng Thư - Quách Phác: Khí Thừa Phong Tắc Tán & Quát Cốt Phong)",
      physics_law: "Định Luật Bernoulli: Áp Suất Động & Chênh Lệch Áp Suất Âm Mái Nhà (\u0394P = 0.5 * \u03C1 * (v_top^2 - v_in^2))",
      mechanism: "Khi luồng gió bão giật với vận tốc cao (cấp 10-12, v = 28 - 35 m/s) lướt qua nóc nhà, các đường dòng không khí bị bóp nghẽn và tăng tốc trên bề mặt mái. Theo định luật Bernoulli, vận tốc gió càng tăng thì áp suất tĩnh phía trên mái càng giảm sâu tạo thành vùng Áp Suất Âm (Suction/Uplift). Trong khi đó, không khí bên trong nhà vẫn duy trì áp suất dương. Sự chênh lệch áp suất khổng lồ này sinh ra LỰC NÂNG BỐC MÁI lên tới hàng trăm kg/m2, đủ sức bẻ gãy đinh vít và cuốn bay toàn bộ mái tôn hoặc mái ngói.",
      classical_view: "Quách Phác trong 《Táng Thư》 cảnh báo: 'Khí thừa phong tắc tán' — Khí gặp gió cuồng loạn ắt bị xé tan. Phong thủy tối kỵ thế 'Quát Cốt Phong' (gió cạo xương) là luồng gió mạnh di chuyển thẳng tắp với gia tốc cực nhanh phá nát sinh khí và kết cấu gia trạch.",
      remedy_principle: "1. Cân bằng áp suất trong - ngoài: Bố trí lam gió hở vĩnh viễn ở vách dưới mái hoặc khe thoát áp mặt khuất gió (Leeward); khi bão đến không đóng kín bưng 100%, hé cửa mặt sau để xả áp suất dương bên trong.\n2. Khí động học góc dốc mái: Sử dụng Mái Bốn Mái (Mái Hiệp/Bát Giác) độ dốc 30° - 35°. Luồng khí trượt êm ôm sát mái, triệt tiêu vùng xoáy tách dòng và giảm 50% - 70% lực bốc mái so với mái dốc hai phía hoặc mái phẳng."
    },
    {
      id: "venturi_downwash",
      title: "2. Gió Luồn Khe Hẹp (Venturi) & Gió Cuộn Thác Đổ (Downwash Dưới Chân Cao Ốc)",
      classic_source: "《黃帝宅經》 (Hoàng Đế Trạch Kinh: Thiên Trảm Sát & Tứ Diện Phong Ao)",
      physics_law: "Hiệu Ứng Phễu Gió Venturi (A1*v1 = A2*v2) & Hiện Tượng Gió Cuộn Đảo Dòng (Corner Downwash Vortex)",
      mechanism: "Khi khối không khí khổng lồ của bão đập vào mặt đứng của tòa nhà cao tầng, luồng gió bị nén dội ngược thẳng đứng xuống mặt đất với vận tốc cực lớn (Gió Cuộn Thác Đổ - Downwash). Đồng thời, khi luồng gió này bị ép qua khe hẹp giữa 2 khối nhà cao tầng, thiết diện lưu thông bị co hẹp làm vận tốc gió tăng vọt từ 1.5 đến 2.5 lần (Hiệu ứng Phễu Gió Venturi), tạo thành những luồng xoáy xé toạc cửa sổ, giật bung mái hiên và quật ngã người đi bộ.",
      classical_view: "《Hoàng Đế Trạch Kinh》 chỉ rõ: Nhà nằm đối diện khe hẹp giữa 2 tòa nhà lớn phạm vào thế 'Thiên Trảm Sát' (Thanh đao của Trời chém xuống), dẫn đến khí tán gia bại. Nhà trơ trọi giữa đất trống phạm thế 'Tứ Diện Phong Ao' (Bốn bề gió quật), kết cấu nhanh suy đổ.",
      remedy_principle: "1. Mái đón sảnh chữ V hất ngược: Lắp đặt mái sảnh cong chữ V nghiêng 15° tại mặt tiền để hứng và hất ngược luồng gió Downwash lên trên.\n2. Vát cong bo tròn góc tường (R >= 50cm): Triệt tiêu điểm tụ áp suất cao, xé luồng khí nén rẽ sang 2 bên.\n3. Tiền sảnh thụt lùi (1.5m - 2.0m) kết hợp Tấm bình phong tán khí: Tạo vùng đệm khí tĩnh bảo vệ cánh cửa chính."
    },
    {
      id: "stack_effect_cooling",
      title: "3. Cơ Chế Thoát Hơi Nóng Mùa Hè & Trị Gió Phơn Tây Nam (Gió Lào)",
      classic_source: "《考工記》 (Khảo Công Ký: Thiên Tỉnh Thiên Tâm) & 《陽宅十書》 (Dương Trạch Thập Thư: Thủy Khí Hạ Nhiệt)",
      physics_law: "Hiệu Ứng Cột Áp Ống Khói (Thermal Stack Effect: \u0394P = \u03C1 * g * H * \u0394T / T) & Đối Lưu Nhiệt Tự Nhiên",
      mechanism: "Vào mùa hè và khi có gió Phơn Tây Nam (Gió Lào), không khí trong nhà bị hun nóng bởi bức xạ mặt trời. Không khí nóng có khối lượng riêng nhẹ hơn sẽ bốc lên cao tích tụ sát trần nhà. Cơ chế thoát nhiệt tự nhiên hiệu quả nhất là tạo độ chênh áp suất nhiệt (Hiệu Ứng Ống Khói): Mở cửa thoát khí nóng trên đỉnh mái (Giếng trời) và mở cửa đón khí mát ở chân tường tầng trệt.",
      classical_view: "Cổ nhân thiết kế nhà truyền thống luôn có 'Thiên Tỉnh' (Giếng trời) ở Trung Cung để âm dương giao hòa, đón gió mát và thoát nhiệt; phía trước hoặc góc Tây Nam luôn bố trí ao hồ bán nguyệt để nước bốc hơi làm mát luồng gió trước khi vào nhà.",
      remedy_principle: "1. Giếng trời trung tâm (Thiên Tỉnh) có cửa chớp thoát nhiệt trên nóc: Tạo lực hút đối lưu liên tục 24/7.\n2. Mái 2 lớp cách nhiệt: Lớp ngói trên và lớp trần dưới cách nhau 10-15cm có luồng khí lưu thông giải nhiệt.\n3. Mặt nước ao hồ/tiểu cảnh góc Tây Nam: Hạ nhiệt độ gió vào nhà từ 3°C - 5°C."
    },
    {
      id: "conical_vortex",
      title: "4. Hiệu Ứng Cắt Gió Góc Mái & Bung Mép Tôn (Conical Corner Vortices)",
      classic_source: "《營造法式》 (Doanh Tạo Pháp Thức: Đẩu Củng Phi Diêm & Ngõa Trích Thủy)",
      physics_law: "Hiện Tượng Xoáy Nón Khí Động Học Góc Mái (Conical Edge Vortices Peak Suction)",
      mechanism: "Khi gió bão thổi xiên góc 45° vào góc công trình, dòng khí bị tách đôi cuốn tròn dọc theo 2 mép diềm mái tạo thành cặp Xoáy Nón. Vùng tâm xoáy nón này có áp suất âm cục bộ gấp 2.5 - 3.0 lần so với vùng giữa mái, làm bung đinh vít mép tôn đầu tiên rồi lật tung toàn bộ mái.",
      classical_view: "Kiến trúc cổ truyền trong 《Doanh Tạo Pháp Thức》 uốn cong góc mái (Phi Diêm) và dùng hàng ngói câu đầu trích thủy nặng đè mép mái để triệt tiêu góc chết tụ xoáy.",
      remedy_principle: "1. Bố trí gờ chắn gió dốc 15° dọc viền mái.\n2. Gia cố mật độ đinh vít ke chống bão tại dải biên 1.5m quanh mái với khoảng cách < 40cm."
    },
    {
      id: "internal_pressurization",
      title: "5. Vỡ Kính Mặt Đón Gió Làm Bùng Nổ Áp Suất Trong (Internal Pressurization)",
      classic_source: "《黃帝宅經》 (Môn Khẩu Trực Xung Thất Khí & Tụ Khí Tàng Phong)",
      physics_law: "Hiện Tượng Đột Biến Áp Suất Buồng Kín (Building Envelope Breach & Internal Pressurization Surge)",
      mechanism: "Khi cửa sổ hoặc cửa đi mặt đón gió bị bão giật vỡ do mảnh vụn văng đập, khối không khí áp suất dương khổng lồ tràn vào nhà làm áp suất trong buồng kín tăng vọt (+0.8 Cp). Áp suất đẩy từ bên trong kết hợp với áp suất hút âm bên trên mái (-1.0 Cp) tạo lực xé toạc mái từ dưới lên trên chỉ trong vài giây.",
      classical_view: "Cổ thư coi cửa chính là 'Khẩu' nạp khí; nếu Khẩu bị xung phá trực diện thì sinh khí tan biến, gia trạch đổ vỡ.",
      remedy_principle: "1. Sử dụng kính dán an toàn 2 lớp dày 10.38mm có màng film PVB chống vỡ vụn.\n2. Cửa cuốn khe thoáng có thanh chống bão ray sâu > 75mm và chốt âm sàn 3 điểm."
    },
    {
      id: "dew_point_condensation",
      title: "6. Gió Nồm Ẩm Bão Hòa & Hiện Tượng Đọng Sương Sàn Nhà (Dew Point Condensation)",
      classic_source: "《陽宅十書》 (Ẩm Khí Trọc Thủy Đọng Nền & Cách Ẩm Hóa Thổ)",
      physics_law: "Hiện Tượng Ngưng Tụ Điểm Sương (Dew Point Psychrometric Condensation & Thermal Mass Lag)",
      mechanism: "Vào mùa xuân tại Miền Bắc và Bắc Trung Bộ, gió Đông Nam mang khối khí có độ ẩm tương đối > 95% tràn vào nhà. Mặt sàn bê tông và tường đá có quán tính nhiệt lớn nên nhiệt độ bề mặt vẫn lạnh hơn nhiệt độ điểm sương của không khí, khiến hơi nước ngưng tụ thành vũng gây ẩm mốc, trơn trượt và hư hỏng thiết bị điện tử.",
      classical_view: "《Dương Trạch Thập Thư》 xếp ẩm thấp nền nhà vào 'Trọc Thủy Sát', làm suy giảm chính khí và phát sinh bệnh tật.",
      remedy_principle: "1. Lớp đệm xỉ than hoặc đất sét nung cách nhiệt dưới sàn dày 15-20cm chống cầu lạnh.\n2. Màng chống ẩm PE 2 lớp lót trước khi đổ bê tông lót sàn.\n3. Đóng kín cửa hướng Đông Nam trong những ngày nồm ẩm, chỉ mở cửa thông gió cưỡng bức mặt Bắc."
    }
  ]
};

const DESIGN_BLUEPRINTS = [
  {
    "id": "nha_bao_mientrung",
    "name": "Chống Tốc Mái",
    "code": "MẪU 01 - MÁI BỐN MÁI 32° & ĐAI TRE PHÂN TẦNG",
    "summary": "Thiết kế khí động học giải tỏa áp suất âm Bernoulli (TCVN 2737:2023 & ASCE 7-22) chống bão cấp 11 - 13 vùng duyên hải Miền Trung.",
    "problem_analysis": "Mái dốc 1-2 phía thông thường sinh lực nâng bốc mái ΔP = 1.2 - 2.5 kPa khi gió bão v > 33 m/s. Đinh vít mép mái bị mỏi nhổ đứt, làm bung toàn bộ dàn xà gồ.",
    "engineering_standards": "TCVN 2737:2023 (Tải trọng gió & Bão) • ASCE 7-22 • 《Táng Thư》 Quách Phác",
    "formula": "P_net = 0.5 * \\rho * v^2 * (C_pe - C_pi) | \\Delta P_uplift giảm từ 2.4 kPa xuống 0.7 kPa",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <defs>\n          <linearGradient id=\"wind1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n            <stop offset=\"0%\" stop-color=\"#38BDF8\" stop-opacity=\"0.9\"/>\n            <stop offset=\"100%\" stop-color=\"#38BDF8\" stop-opacity=\"0.1\"/>\n          </linearGradient>\n          <pattern id=\"grid1\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n            <line x1=\"0\" y1=\"0\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"20\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n          </pattern>\n        </defs>\n        <rect width=\"800\" height=\"420\" fill=\"url(#grid1)\"/>\n        <!-- NỀN ĐẤT VÀ MẶT CẮT ĐỊA CHẤT -->\n        <rect x=\"0\" y=\"320\" width=\"800\" height=\"100\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"320\" x2=\"800\" y2=\"320\" stroke=\"#64748B\" stroke-width=\"2\"/>\n        <text x=\"730\" y=\"340\" fill=\"#64748B\" font-size=\"10\">±0.000</text>\n        <!-- HỆ THỐNG CÂY CHẮN BÃO 2 TẦNG (CÁCH 12m) -->\n        <g transform=\"translate(40, 160)\">\n          <!-- Cây bụi thấp -->\n          <circle cx=\"30\" cy=\"140\" r=\"20\" fill=\"#065F46\" stroke=\"#10B981\"/>\n          <circle cx=\"60\" cy=\"145\" r=\"16\" fill=\"#047857\" stroke=\"#34D399\"/>\n          <!-- Rặng tre ngà thân dẻo -->\n          <path d=\"M90,160 Q100,60 85,0 Q110,70 110,160\" fill=\"#047857\"/>\n          <circle cx=\"85\" cy=\"0\" r=\"26\" fill=\"#059669\" stroke=\"#34D399\"/>\n          <path d=\"M125,160 Q135,50 120,-20 Q145,60 145,160\" fill=\"#047857\"/>\n          <circle cx=\"120\" cy=\"-20\" r=\"30\" fill=\"#10B981\" stroke=\"#6EE7B7\"/>\n          <text x=\"85\" y=\"180\" fill=\"#34D399\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">Đai Tre (h=7.5m, L=12m)</text>\n        </g>\n        <!-- CÁC ĐƯỜNG DÒNG KHÍ BỊ HẤT LƯỚT QUA NÓC -->\n        <path d=\"M10,190 C140,170 180,90 320,80 C440,70 560,95 790,110\" fill=\"none\" stroke=\"url(#wind1)\" stroke-width=\"3\" stroke-dasharray=\"6,4\"/>\n        <path d=\"M10,230 C140,210 180,120 320,105 C440,95 560,115 790,130\" fill=\"none\" stroke=\"url(#wind1)\" stroke-width=\"2\"/>\n        <text x=\"20\" y=\"170\" fill=\"#38BDF8\" font-size=\"11\" font-weight=\"700\">GIÓ BÃO CẤP 12 (v=35m/s) →</text>\n        <!-- CÔNG TRÌNH NHÀ MÁI BỐN MÁI (MẶT CẮT KỸ THUẬT) -->\n        <g transform=\"translate(360, 120)\">\n          <!-- Móng đà kiềng BTCT -->\n          <rect x=\"20\" y=\"190\" width=\"300\" height=\"20\" fill=\"#334155\" stroke=\"#94A3B8\"/>\n          <!-- Cột bê tông cốt thép -->\n          <rect x=\"40\" y=\"60\" width=\"16\" height=\"130\" fill=\"#475569\" stroke=\"#94A3B8\"/>\n          <rect x=\"280\" y=\"60\" width=\"16\" height=\"130\" fill=\"#475569\" stroke=\"#94A3B8\"/>\n          <!-- Dầm BTCT neo xà gồ -->\n          <rect x=\"20\" y=\"60\" width=\"300\" height=\"14\" fill=\"#475569\" stroke=\"#F59E0B\"/>\n          <text x=\"170\" y=\"71\" fill=\"#FEF3C7\" font-size=\"9\" text-anchor=\"middle\">Dầm Giằng BTCT Neo Xà Gồ Thép D10</text>\n          <!-- Tường ngăn và cửa lùi -->\n          <rect x=\"56\" y=\"74\" width=\"224\" height=\"116\" fill=\"#0F172A\" stroke=\"#334155\"/>\n          <rect x=\"70\" y=\"110\" width=\"35\" height=\"80\" fill=\"#1E293B\" stroke=\"#F59E0B\"/>\n          <text x=\"87\" y=\"150\" fill=\"#FBBF24\" font-size=\"8\" text-anchor=\"middle\">Tiền Sảnh</text>\n          <!-- Khung Kèo & Mái Bốn Mái Dốc 32 độ -->\n          <polygon points=\"170,-20 10,60 330,60\" fill=\"#B45309\" stroke=\"#FEF3C7\" stroke-width=\"2\"/>\n          <!-- Kèo thép tam giác bên trong -->\n          <line x1=\"170\" y1=\"-20\" x2=\"170\" y2=\"60\" stroke=\"#FEF3C7\" stroke-width=\"1.5\" stroke-dasharray=\"3,3\"/>\n          <line x1=\"90\" y1=\"20\" x2=\"170\" y2=\"60\" stroke=\"#FEF3C7\" stroke-width=\"1\"/>\n          <line x1=\"250\" y1=\"20\" x2=\"170\" y2=\"60\" stroke=\"#FEF3C7\" stroke-width=\"1\"/>\n          <!-- Lam xả áp suất Leeward mặt sau -->\n          <rect x=\"285\" y=\"62\" width=\"20\" height=\"10\" fill=\"#38BDF8\"/>\n          <text x=\"295\" y=\"55\" fill=\"#38BDF8\" font-size=\"8\" text-anchor=\"middle\">Lam Xả Áp</text>\n          <!-- Ký hiệu góc dốc 32 độ -->\n          <path d=\"M50,60 A40,40 0 0,0 75,44\" fill=\"none\" stroke=\"#FBBF24\" stroke-width=\"1.5\"/>\n          <text x=\"82\" y=\"55\" fill=\"#FBBF24\" font-size=\"10\" font-weight=\"700\">32°</text>\n          <text x=\"170\" y=\"-30\" fill=\"#FEF3C7\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">Mái Bốn Mái Khí Động Học 32°</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Chắn Bão (Phong Đai Bậc Thang)",
      "species": "Tre Ngà (Bambusa blumeana), Phi Lao (Casuarina equisetifolia), Cau Vua.",
      "distance": "Khoảng cách L = 10m - 15m (L = 1.5 - 2.0 lần chiều cao công trình h).",
      "structure": "Bố cục 2 tầng: Tầng dưới cây bụi cản gió sát đất (h=1.5m); Tầng trên tre ngà dẻo uốn cong h=7.5m nâng luồng bão lướt qua nóc.",
      "benefit": "Giảm 50% - 60% động năng gió bão trước khi tiếp xúc mặt tiền công trình."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Kiến Trúc & Kết Cấu Chống Tốc Mái",
      "shape": "Mái Bốn Mái dốc 30° - 35° (hệ số khí động C_pe = -0.3 đến -0.4, giảm 65% lực bốc so với mái dốc 2 phía C_pe = -0.9).",
      "position": "Tiền sảnh thụt lùi 1.8m tạo đệm khí tĩnh; cửa sổ khuất gió có lam thoát áp.",
      "structure": "Đai thép D10 neo bản mã xà gồ vào dầm bê tông cốt thép; đinh vít ke chống bão bước vít <= 60cm.",
      "benefit": "Cân bằng áp suất trong - ngoài, triệt tiêu nguy cơ tốc mái khi bão giật cấp 12 - 13."
    }
  },
  {
    "id": "nha_chan_chungcu",
    "name": "Nhà Bị Kẹp",
    "code": "MẪU 02 - MÁI ĐÓN CHỮ V & GÓC BO TRÒN",
    "summary": "Hóa giải hiện tượng gió cuộn dội ngược (Corner Downwash Vortex) và gia tốc phễu gió Venturi chân cao ốc theo Tiêu chuẩn Khí Động Học Đô Thị.",
    "problem_analysis": "Cao ốc chặn đứng khối không khí lớn, sinh dòng Downwash dội thẳng đứng xuống mặt đất với vận tốc v_down = 0.6*v_top (v đạt 22-28 m/s ở chân công trình). Khe hẹp giữa 2 tòa nhà ép gió tăng tốc 2.4 lần.",
    "engineering_standards": "Eurocode 1: Actions on structures (Wind actions EN 1991-1-4) • 《Hoàng Đế Trạch Kinh》 Thiên Trảm Sát",
    "formula": "v_downwash \\approx 0.6 * v_gradient * \\sqrt{H/W} | Lực dội tiêu tán 60% qua Mái Đón Chữ V",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <defs>\n          <pattern id=\"grid2\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n            <line x1=\"0\" y1=\"0\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"20\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n          </pattern>\n        </defs>\n        <rect width=\"800\" height=\"420\" fill=\"url(#grid2)\"/>\n        <!-- NỀN ĐẤT -->\n        <rect x=\"0\" y=\"340\" width=\"800\" height=\"80\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"340\" x2=\"800\" y2=\"340\" stroke=\"#64748B\" stroke-width=\"2\"/>\n        <!-- TOÀ CAO ỐC CHUNG CƯ (H=75m) -->\n        <rect x=\"40\" y=\"20\" width=\"180\" height=\"320\" fill=\"#1E293B\" stroke=\"#475569\" stroke-width=\"2\"/>\n        <text x=\"130\" y=\"45\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">CAO ỐC (H=75m)</text>\n        <g fill=\"#0F172A\" stroke=\"#334155\">\n          <rect x=\"60\" y=\"60\" width=\"30\" height=\"20\"/><rect x=\"110\" y=\"60\" width=\"30\" height=\"20\"/><rect x=\"160\" y=\"60\" width=\"30\" height=\"20\"/>\n          <rect x=\"60\" y=\"100\" width=\"30\" height=\"20\"/><rect x=\"110\" y=\"100\" width=\"30\" height=\"20\"/><rect x=\"160\" y=\"100\" width=\"30\" height=\"20\"/>\n          <rect x=\"60\" y=\"140\" width=\"30\" height=\"20\"/><rect x=\"110\" y=\"140\" width=\"30\" height=\"20\"/><rect x=\"160\" y=\"140\" width=\"30\" height=\"20\"/>\n        </g>\n        <!-- LUỒNG GIÓ ĐẬP VÀO CAO ỐC DỘI XUỐNG ĐẤT (DOWNWASH) -->\n        <path d=\"M20,120 L180,120 Q210,120 210,180 L210,310\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"4\" stroke-dasharray=\"6,4\"/>\n        <path d=\"M20,90 L195,90 Q225,90 225,180 L225,310\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"3\" stroke-dasharray=\"6,4\"/>\n        <text x=\"240\" y=\"210\" fill=\"#F87171\" font-size=\"11\" font-weight=\"800\">Gió Dội Xuống (Downwash) ↓</text>\n        <!-- HÀNG CÂY TÁN NGANG XÉ DÒNG GIÓ DỘI -->\n        <g transform=\"translate(255, 230)\">\n          <line x1=\"20\" y1=\"110\" x2=\"20\" y2=\"20\" stroke=\"#047857\" stroke-width=\"5\"/>\n          <ellipse cx=\"20\" cy=\"20\" rx=\"25\" ry=\"14\" fill=\"#059669\" stroke=\"#34D399\"/>\n          <text x=\"20\" y=\"125\" fill=\"#34D399\" font-size=\"9\" text-anchor=\"middle\">Cau Vua</text>\n        </g>\n        <!-- NHÀ THẤP TẦNG CÓ MÁI ĐÓN CHỮ V VÀ BO GÓC TRÒN -->\n        <g transform=\"translate(350, 160)\">\n          <path d=\"M40,30 Q0,30 0,60 L0,180 L320,180 L320,30 Z\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <text x=\"160\" y=\"110\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">NHÀ THẤP TẦNG HÓA GIẢI</text>\n          <polygon points=\"-30,35 60,60 10,75\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <text x=\"15\" y=\"20\" fill=\"#38BDF8\" font-size=\"9\" font-weight=\"700\">Mái Chữ V Nghiêng 15°</text>\n          <path d=\"M-15,65 Q-25,15 40,-15\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"3\" stroke-dasharray=\"4,3\"/>\n          <text x=\"45\" y=\"-15\" fill=\"#34D399\" font-size=\"9\" font-weight=\"700\">Hất Ngược Gió Dội ↑</text>\n          <rect x=\"30\" y=\"100\" width=\"40\" height=\"80\" fill=\"#1E293B\" stroke=\"#F59E0B\"/>\n          <text x=\"50\" y=\"140\" fill=\"#FBBF24\" font-size=\"8\" text-anchor=\"middle\">Cửa Lùi</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Tiêu Tán Năng Lượng Gió Cuộn",
      "species": "Cau Vua (Roystonea regia), Cọ Dầu, Cây Bàng Đài Loan tầng tán ngang.",
      "distance": "Trồng cách tường nhà 2.0m - 3.0m giáp mép khoảng hở cao ốc.",
      "structure": "Thân cây cột tròn cản dòng, tán xòe ngang hoạt động như cánh quạt tiêu tán 40% - 50% xung lực gió dội.",
      "benefit": "Bảo vệ mái hiên và cửa sổ tầng 2 không bị áp lực gió giật vỡ."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Mái Đón Chữ V & Bo Tròn Khí Động Học",
      "shape": "Mái đón sảnh chữ V ngược nghiêng 15° vươn 2.2m; góc tường hướng khe gió bo tròn R >= 80cm.",
      "position": "Cửa chính lùi sâu 2.0m làm sảnh đệm; không mở cửa sổ lớn đối diện khe hẹp giữa 2 tòa tháp.",
      "structure": "Khung vách kính dán an toàn 2 lớp dày 10.38mm có màng film PVB; tấm bình phong hoa gió che chắn cửa.",
      "benefit": "Bẻ gãy luồng khí nén Venturi và hất ngược luồng Downwash lên tầng cao."
    }
  },
  {
    "id": "nha_canh_cau_vuot",
    "name": "Gần Cầu Vượt",
    "code": "MẪU 13 - KHE CO GIÃN CHỐNG RUNG & VÁCH CÁCH ÂM HỘP KÍNH",
    "summary": "Hóa giải ô nhiễm tiếng ồn xe cơ giới (75-80 dBA theo ISO 9613-2 & FHWA), rung chấn giao thông và Liềm Đao Sát từ cầu vượt cao tốc.",
    "problem_analysis": "Cầu vượt trên cao cách mặt tiền 10-15m phát sinh tiếng ồn giao thông L_Aeq = 78 dBA và rung chấn mặt đất tần số thấp 10-30 Hz truyền thẳng vào dầm móng. Trồng cây đơn thuần chỉ giảm 2-3 dBA, không thể cách âm nếu không có giải pháp âm học & đệm móng thực tế.",
    "engineering_standards": "ISO 9613-2 (Acoustics Sound Attenuation) • FHWA Highway Traffic Noise Model • TCVN 7838:2007 (Rung động công trình)",
    "formula": "TL = 20*\\log_{10}(m \\cdot f) - 47 dB | Giảm 38-42 dBA với Kính Hộp PVB + Khe Chống Rung",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <defs>\n          <pattern id=\"grid13\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n            <line x1=\"0\" y1=\"0\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"20\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n          </pattern>\n        </defs>\n        <rect width=\"800\" height=\"420\" fill=\"url(#grid13)\"/>\n        <!-- NỀN ĐẤT ĐỊA CHẤT -->\n        <rect x=\"0\" y=\"330\" width=\"800\" height=\"90\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"330\" x2=\"800\" y2=\"330\" stroke=\"#64748B\" stroke-width=\"2\"/>\n        <!-- CẦU VƯỢT CAO TỐC (MẶT CẮT KỸ THUẬT THỰC TẾ) -->\n        <g transform=\"translate(60, 100)\">\n          <!-- Trụ cầu BTCT cao 7.5m -->\n          <rect x=\"50\" y=\"80\" width=\"40\" height=\"150\" fill=\"#334155\" stroke=\"#94A3B8\" stroke-width=\"1.5\"/>\n          <!-- Dầm cầu hộp BTCT -->\n          <polygon points=\"0,50 140,50 120,80 20,80\" fill=\"#475569\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n          <!-- Mặt đường nhựa và lan can -->\n          <rect x=\"0\" y=\"45\" width=\"140\" height=\"6\" fill=\"#0F172A\"/>\n          <rect x=\"0\" y=\"30\" width=\"140\" height=\"15\" fill=\"none\" stroke=\"#64748B\" stroke-width=\"1.5\"/>\n          <!-- Xe ô tô chạy phát âm 78 dBA -->\n          <rect x=\"35\" y=\"20\" width=\"40\" height=\"18\" fill=\"#D97706\" rx=\"3\"/>\n          <text x=\"70\" y=\"10\" fill=\"#EF4444\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">TIẾNG ỒN 78 dBA & RUNG CHẤN</text>\n          <!-- Tường chắn âm Acrylic mép cầu vượt (Noise Barrier) -->\n          <rect x=\"135\" y=\"10\" width=\"4\" height=\"35\" fill=\"#38BDF8\" stroke=\"#0284C7\"/>\n          <text x=\"145\" y=\"25\" fill=\"#38BDF8\" font-size=\"8\">Tấm Chắn Âm</text>\n        </g>\n        <!-- SÓNG ÂM VÀ DAO ĐỘNG ĐỊA CHẤT TRUYỀN ĐI -->\n        <path d=\"M210,130 Q270,140 330,170\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2\" stroke-dasharray=\"4,3\"/>\n        <path d=\"M210,150 Q270,170 330,210\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2\" stroke-dasharray=\"4,3\"/>\n        <!-- RÃNH KHE CO GIÃN CÁCH LY RUNG CHẤN CHÂN MÓNG (Vibration Trench) -->\n        <rect x=\"340\" y=\"310\" width=\"12\" height=\"70\" fill=\"#0284C7\" stroke=\"#38BDF8\"/>\n        <text x=\"346\" y=\"400\" fill=\"#38BDF8\" font-size=\"9\" text-anchor=\"middle\">Khe Chống Rung (Cao Su)</text>\n        <!-- HÀNG RÀO CÂY XANH TÁN DÀY TÁN XẠ ÂM VÀ BỤI -->\n        <g transform=\"translate(355, 200)\">\n          <circle cx=\"15\" cy=\"80\" r=\"18\" fill=\"#047857\" stroke=\"#10B981\"/>\n          <circle cx=\"15\" cy=\"115\" r=\"16\" fill=\"#065F46\"/>\n          <text x=\"15\" y=\"145\" fill=\"#34D399\" font-size=\"8\" text-anchor=\"middle\">Dải Cây</text>\n        </g>\n        <!-- CÔNG TRÌNH NHÀ Ở VỚI LOGIA ĐỆM & KÍNH HỘP CÁCH ÂM -->\n        <g transform=\"translate(400, 80)\">\n          <!-- Khối nhà 3 tầng -->\n          <rect x=\"0\" y=\"0\" width=\"360\" height=\"250\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <!-- Logia đệm sâu 1.8m mặt tiền -->\n          <rect x=\"0\" y=\"40\" width=\"70\" height=\"180\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-dasharray=\"3,3\"/>\n          <text x=\"35\" y=\"130\" fill=\"#FBBF24\" font-size=\"9\" text-anchor=\"middle\" transform=\"rotate(-90 35 130)\">Logia Đệm 1.8m (-10 dB)</text>\n          <!-- Cửa kính hộp 2 lớp dán film PVB (Sound Transmission Class STC 42) -->\n          <line x1=\"70\" y1=\"50\" x2=\"70\" y2=\"210\" stroke=\"#38BDF8\" stroke-width=\"6\"/>\n          <text x=\"80\" y=\"130\" fill=\"#38BDF8\" font-size=\"9\">Kính Hộp PVB (-32 dB)</text>\n          <!-- Không gian phòng ngủ yên tĩnh bên trong -->\n          <rect x=\"180\" y=\"60\" width=\"160\" height=\"150\" fill=\"#0A0F1D\" stroke=\"#34D399\"/>\n          <text x=\"260\" y=\"125\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">PHÒNG NGỦ YÊN TĨNH</text>\n          <text x=\"260\" y=\"145\" fill=\"#34D399\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">L_in = 36 dBA (Đạt Tiêu Chuẩn)</text>\n          <text x=\"260\" y=\"165\" fill=\"#94A3B8\" font-size=\"9\" text-anchor=\"middle\">(Triệt Tiêu 42 dBA Tiếng Ồn)</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Hấp Thụ Bụi Mịn & Tán Xạ Sóng Âm",
      "species": "Trắc Bách Diệp (Platycladus orientalis), Cây Sanh tán rậm, Cây Chuối Cảnh bản lá rộng.",
      "distance": "Trồng thành dải dày 2.0m - 3.0m sát ranh giới lộ giới đối diện cầu vượt.",
      "structure": "Lớp lá dày hấp thụ 70% bụi mịn PM2.5 do ma sát lốp xe và tán xạ sóng âm tần số cao (> 1000 Hz, giảm 3-5 dB).",
      "benefit": "Cải thiện đáng kể chất lượng không khí và giảm phản xạ âm thanh dội vào mặt đứng."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Kính Hộp Âm Học & Khe Khớp Chống Rung Móng",
      "shape": "Mặt tiền hướng cầu vượt bố trí ban công logia thụt sâu 1.8m làm buồng tiêu âm tự nhiên (giảm 8-10 dBA trước khi vào cửa kính).",
      "position": "Phòng ngủ và phòng làm việc bố trí lùi về phía sau nhà; mặt tiền dùng làm cầu thang, kho hoặc hành lang đệm.",
      "structure": "Cửa nhôm cầu cách nhiệt lắp Kính hộp 2 lớp (6mm Cường lực + 12mm Khí trơ Argon + 6.38mm Dán PVB âm học, đạt STC 42); Khe chống rung móng đệm cao su Neoprene dày 50mm cách ly rung động mặt đất 15-30 Hz.",
      "benefit": "Hạ mức ồn từ 78 dBA xuống dưới 38 dBA (mức tiêu chuẩn yên tĩnh phòng ngủ theo TCVN 3985:1999) và triệt tiêu 80% rung chấn giao thông."
    }
  },
  {
    "id": "nha_thoat_nhiet_muahe",
    "name": "Thoát Nhiệt",
    "code": "MẪU 04 - GIẾNG TRỜI THIÊN TÂM & MÁI 2 LỚP",
    "summary": "Ứng dụng Hiệu ứng Cột Áp Ống Khói (Thermal Stack Effect: ASHRAE Fundamentals) và vi khí hậu mặt nước Tây Nam hạ nhiệt gió Lào.",
    "problem_analysis": "Bức xạ mặt trời hun đốt mái bê tông lên 52°C, tỏa nhiệt thứ cấp xuống trần. Gió Phơn Tây Nam độ ẩm thấp (< 35%) thổi khô rát làm nhiệt độ phòng lên tới 39°C nếu không có hệ thống thoát nhiệt đối lưu.",
    "engineering_standards": "ASHRAE Handbook of Fundamentals • CIBSE Guide A: Environmental Design • 《Khảo Công Ký》 Thiên Tỉnh",
    "formula": "Q = C_d * A * \\sqrt{2 * g * H * \\frac{\\Delta T}{T_in}} | Lưu lượng hút thoát nhiệt tự nhiên 2.8 m^3/s",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <defs>\n          <pattern id=\"grid4\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n            <line x1=\"0\" y1=\"0\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"20\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n          </pattern>\n        </defs>\n        <rect width=\"800\" height=\"420\" fill=\"url(#grid4)\"/>\n        <!-- NỀN ĐẤT -->\n        <rect x=\"0\" y=\"340\" width=\"800\" height=\"80\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"340\" x2=\"800\" y2=\"340\" stroke=\"#64748B\" stroke-width=\"2\"/>\n        <!-- HỒ NƯỚC BÁN NGUYỆT GÓC TÂY NAM (HẠ NHIỆT GIÓ PHƠN) -->\n        <path d=\"M40,320 Q120,290 200,320 L200,360 L40,360 Z\" fill=\"#0284C7\" opacity=\"0.8\"/>\n        <text x=\"120\" y=\"345\" fill=\"#FEF3C7\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">Ao Nước Tây Nam (Hạ -4°C)</text>\n        <path d=\"M120,310 C200,290 240,300 320,310\" fill=\"none\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n        <text x=\"210\" y=\"295\" fill=\"#38BDF8\" font-size=\"9\">Gió Mát Vào Cửa Trệt →</text>\n        <!-- CÔNG TRÌNH NHÀ PHỐ VỚI GIẾNG TRỜI THIÊN TÂM (MẶT CẮT KỸ THUẬT) -->\n        <g transform=\"translate(300, 80)\">\n          <!-- Khung nhà 3 tầng -->\n          <rect x=\"0\" y=\"60\" width=\"440\" height=\"200\" fill=\"#0F172A\" stroke=\"#475569\" stroke-width=\"2\"/>\n          <!-- Mái ngói 2 lớp đệm khí lưu thông 12cm -->\n          <polygon points=\"220,-20 -20,60 460,60\" fill=\"#B45309\" stroke=\"#FEF3C7\" stroke-width=\"2\"/>\n          <line x1=\"-15\" y1=\"48\" x2=\"455\" y2=\"48\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <text x=\"220\" y=\"40\" fill=\"#FDE68A\" font-size=\"9\" text-anchor=\"middle\">Lớp Đệm Khí Giải Nhiệt Mái 12cm (-6°C)</text>\n          <!-- Giếng trời Thiên Tâm ở giữa nhà -->\n          <rect x=\"180\" y=\"50\" width=\"80\" height=\"210\" fill=\"#1E293B\" stroke=\"#38BDF8\" stroke-dasharray=\"4,2\"/>\n          <text x=\"220\" y=\"170\" fill=\"#38BDF8\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">GIẾNG TRỜI</text>\n          <text x=\"220\" y=\"185\" fill=\"#7DD3FC\" font-size=\"9\" text-anchor=\"middle\">(Cột Áp Ống Khói)</text>\n          <!-- Cửa chớp thoát khí nóng đỉnh nóc mái -->\n          <rect x=\"185\" y=\"-30\" width=\"70\" height=\"20\" fill=\"#0284C7\" stroke=\"#38BDF8\"/>\n          <path d=\"M210,250 L210,30 L200,-10\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"3\" stroke-dasharray=\"4,2\"/>\n          <path d=\"M230,250 L230,30 L240,-10\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"3\" stroke-dasharray=\"4,2\"/>\n          <text x=\"220\" y=\"-40\" fill=\"#F87171\" font-size=\"10\" font-weight=\"800\" text-anchor=\"middle\">Khí Nóng Thoát Nóc (Q=2.8m³/s) ↑</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Che Bức Xạ & Bốc Hơi Làm Mát",
      "species": "Cây Lộc Vừng (Barringtonia acutangula), Hoa Giấy, Cây Bàng, Giàn Dây Leo Cát Đằng.",
      "distance": "Bố trí giàn lam che nắng mặt hướng Tây và cây bóng mát cách hiên 3.0m - 5.0m.",
      "structure": "Màn chắn sinh thái xanh cản 80% bức xạ mặt trời; quá trình thoát hơi nước của lá cây hạ nhiệt không khí xung quanh 3°C - 5°C.",
      "benefit": "Giảm nhiệt độ bề mặt tường hướng Tây từ 6°C - 8°C."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Giếng Trời & Mái Đệm 2 Lớp Đối Lưu",
      "shape": "Giếng trời diện tích tối thiểu 6% - 8% diện tích sàn (chiều rộng giếng >= 1.8m); đỉnh giếng có cửa chớp thông gió nghiêng 45°.",
      "position": "Bố trí tại vị trí Trung Cung (tâm nhà) tạo lực hút đối lưu thẳng đứng xuyên suốt các tầng.",
      "structure": "Mái 2 lớp: Lớp ngói ngoài và trần thạch cao/bê tông trong cách nhau 12-15cm có khe thông gió liên tục; mặt nước hồ cảnh góc Tây Nam.",
      "benefit": "Tạo luồng gió mát tự nhiên 24/7, hạ nhiệt độ trong nhà 4°C - 6°C, giảm 40% chi phí điều hòa."
    }
  },
  {
    "id": "nha_dinh_doi_suon_doc",
    "name": "Nhà Sườn Dốc",
    "code": "MẪU 05 - BÁN ÂM NƯƠNG ĐỊA HÌNH & MÓNG BÈ CẮM ĐÁ",
    "summary": "Hóa giải hiện tượng gia tốc gió leo dốc (Topographic Speed-up Multiplier K_zt theo ASCE 7-22) và nguy cơ trượt lở mái dốc.",
    "problem_analysis": "Độ dốc địa hình nén các đường dòng không khí làm vận tốc gió tại đỉnh đồi tăng từ 1.4 đến 2.0 lần. Nước mưa ngấm bão hòa đất taluy gây sạt lở cuốn trôi móng nông nếu không có hệ thống thoát nước ngầm chữ U và rễ cây giữ đất.",
    "engineering_standards": "ASCE 7-22 (Topographic Factors K_zt) • Eurocode 7 (Geotechnical Design) • 《Táng Thư》 Đoạn Sơn Sát",
    "formula": "K_zt = (1 + K_1 K_2 K_3)^2 | Áp lực gió tăng 2.0 lần, móng bè cắm đá gốc sâu 2.5m",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <defs>\n          <pattern id=\"grid5\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n            <line x1=\"0\" y1=\"0\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"20\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>\n          </pattern>\n        </defs>\n        <rect width=\"800\" height=\"420\" fill=\"url(#grid5)\"/>\n        <!-- SƯỜN ĐỒI ĐỊA HÌNH (DỐC 1:3) -->\n        <path d=\"M0,380 Q220,360 380,220 L800,220 L800,420 L0,420 Z\" fill=\"#1E293B\" stroke=\"#475569\" stroke-width=\"2\"/>\n        <!-- ĐƯỜNG DÒNG GIÓ LEO DỐC TĂNG GẤP ĐÔI TỐC ĐỘ -->\n        <path d=\"M10,340 Q220,320 360,180 L790,180\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"4\" stroke-dasharray=\"6,4\"/>\n        <text x=\"280\" y=\"165\" fill=\"#F87171\" font-size=\"11\" font-weight=\"800\">Gió Nén Gia Tốc (K_zt = 2.0x) →</text>\n        <!-- HỆ THỐNG CỎ VETIVER RỄ SÂU 3M GIỮ TALUY -->\n        <g transform=\"translate(180, 260)\">\n          <circle cx=\"20\" cy=\"40\" r=\"16\" fill=\"#059669\"/>\n          <circle cx=\"45\" cy=\"20\" r=\"20\" fill=\"#10B981\"/>\n          <!-- Rễ cọc đâm sâu 3m -->\n          <line x1=\"20\" y1=\"55\" x2=\"20\" y2=\"120\" stroke=\"#047857\" stroke-width=\"2\" stroke-dasharray=\"2,2\"/>\n          <line x1=\"45\" y1=\"40\" x2=\"45\" y2=\"120\" stroke=\"#047857\" stroke-width=\"2\" stroke-dasharray=\"2,2\"/>\n          <text x=\"30\" y=\"80\" fill=\"#34D399\" font-size=\"9\" text-anchor=\"middle\">Cỏ Vetiver (Rễ Sâu 3m)</text>\n        </g>\n        <!-- CÔNG TRÌNH NHÀ BÁN ÂM NƯƠNG SƯỜN ĐỒI (MẶT CẮT KỸ THUẬT) -->\n        <g transform=\"translate(440, 100)\">\n          <!-- Móng cọc cắm sâu vào tầng đá gốc -->\n          <rect x=\"40\" y=\"120\" width=\"20\" height=\"80\" fill=\"#475569\"/>\n          <rect x=\"200\" y=\"120\" width=\"20\" height=\"80\" fill=\"#475569\"/>\n          <text x=\"130\" y=\"170\" fill=\"#94A3B8\" font-size=\"9\" text-anchor=\"middle\">Móng Cọc Cắm Tầng Đá Gốc</text>\n          <!-- Thân nhà bán âm lùi xa mép dốc -->\n          <polygon points=\"0,120 260,120 260,10 120,10\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <text x=\"140\" y=\"70\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">NHÀ BÁN ÂM NƯƠNG ĐỒI</text>\n          <!-- Mái dốc xuôi theo chiều gió leo dốc -->\n          <line x1=\"0\" y1=\"120\" x2=\"120\" y2=\"10\" stroke=\"#F59E0B\" stroke-width=\"5\"/>\n          <line x1=\"120\" y1=\"10\" x2=\"260\" y2=\"10\" stroke=\"#F59E0B\" stroke-width=\"5\"/>\n          <!-- Đường gió lướt êm qua mái -->\n          <path d=\"M-20,130 L110,0 L280,0\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"3\"/>\n          <text x=\"180\" y=\"-10\" fill=\"#34D399\" font-size=\"10\" font-weight=\"700\">Gió Trượt Êm Qua Nóc</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Giữ Đất Taluy & Phân Tán Luồng Gió",
      "species": "Cỏ Vetiver (Chrysopogon zizanioides) rễ sâu 3m, Thông Ba Lá, Keo Dậu.",
      "distance": "Trồng phủ xanh toàn bộ sườn dốc phía trước và hai bên hông nhà.",
      "structure": "Mạng lưới rễ cọc Vetiver đan dày đặc như lưới cốt thép tự nhiên giữ đất chống trượt lở taluy khi mưa bão.",
      "benefit": "Chống xói mòn sạt lở 100% và phân tán 40% vận tốc gió gia tốc leo dốc."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Nhà Bán Âm & Mái Xuôi Chiều Gió",
      "shape": "Công trình thấp tầng, mái dốc xuôi theo hướng gió leo dốc (góc nghiêng 20°-25°); vát tròn mép mái.",
      "position": "Lùi xa mép bờ dốc tối thiểu khoảng cách d = chiều cao bờ dốc H (d >= H); lưng tựa sườn đồi.",
      "structure": "Móng cọc bê tông cốt thép cắm sâu vào tầng đá gốc; rãnh thoát nước ngầm chữ U quanh chân móng chống xói ngầm.",
      "benefit": "Tránh hoàn toàn vùng áp lực gió xoáy cực đại tại mép đồi và đảm bảo ổn định địa chất tuyệt đối."
    }
  },
  {
    "id": "nha_chong_nom_am",
    "name": "Chống Nồm Ẩm",
    "code": "MẪU 06 - CÁCH NHIỆT SÀN ĐIỂM SƯƠNG & ĐỆM XỈ THAN",
    "summary": "Giải pháp triệt tiêu hiện tượng ngưng tụ điểm sương sàn nhà (Psychrometric Dew Point) và ẩm mốc chân tường mùa xuân Miền Bắc.",
    "problem_analysis": "Gió Đông Nam ẩm độ phi mã > 95% tràn vào gặp sàn nhà bê tông lạnh khiến hơi nước ngưng tụ thành vũng nếu nhiệt độ bề mặt sàn T_floor < T_dew.",
    "engineering_standards": "Psychrometric Chart Standards • TCVN 9386 (Chống ẩm công trình) • 《Dương Trạch Thập Thư》",
    "formula": "T_floor > T_dew = T - ((100 - RH)/5) | Đệm xỉ than 20cm nâng nhiệt độ sàn thêm +3.5°C",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <rect x=\"0\" y=\"340\" width=\"800\" height=\"80\" fill=\"#1E293B\"/>\n        <g transform=\"translate(100, 100)\">\n          <rect x=\"0\" y=\"80\" width=\"600\" height=\"150\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <text x=\"300\" y=\"60\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">MẶT CẮT KẾT CẤU SÀN CÁCH NHIỆT CHỐNG NỒM</text>\n          <!-- Lớp bê tông lót móng -->\n          <rect x=\"20\" y=\"190\" width=\"560\" height=\"25\" fill=\"#334155\"/>\n          <text x=\"300\" y=\"207\" fill=\"#94A3B8\" font-size=\"9\" text-anchor=\"middle\">Bê Tông Lót Mác 100</text>\n          <!-- Lớp xỉ than hoạt tính cách nhiệt -->\n          <rect x=\"20\" y=\"145\" width=\"560\" height=\"40\" fill=\"#475569\" stroke=\"#F59E0B\"/>\n          <text x=\"300\" y=\"170\" fill=\"#FBBF24\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">Lớp Đệm Xỉ Than / Gốm Xốp Cách Nhiệt (15cm - 20cm)</text>\n          <!-- Màng PE chống thấm ngược -->\n          <line x1=\"20\" y1=\"140\" x2=\"580\" y2=\"140\" stroke=\"#38BDF8\" stroke-width=\"4\" stroke-dasharray=\"6,2\"/>\n          <text x=\"300\" y=\"135\" fill=\"#38BDF8\" font-size=\"9\" text-anchor=\"middle\">Màng Chống Thấm PE 2 Lớp (Chống Thấm Ngược 100%)</text>\n          <!-- Lớp gạch gốm ấm chân -->\n          <rect x=\"20\" y=\"95\" width=\"560\" height=\"25\" fill=\"#1E293B\" stroke=\"#34D399\"/>\n          <text x=\"300\" y=\"112\" fill=\"#34D399\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">Gạch Gốm / Sàn Gỗ Tự Nhiên (T_floor Luôn > T_dew)</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Hút Ẩm & Thông Thoáng Sân",
      "species": "Cây Cau, Trúc Chỉ Vàng hướng Nam; Tuyệt đối không trồng cây rậm rạp che kín sân.",
      "distance": "Cách mép hiên tối thiểu 4m để nắng sớm chiếu khô ráo sân gạch.",
      "structure": "Cây thân thẳng tạo khoảng hở lớn cho nắng và gió khô lưu thông sát mặt sân.",
      "benefit": "Giảm 30% độ ẩm tồn đọng quanh chân móng."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Sàn Đệm Cách Nhiệt Điểm Sương",
      "shape": "Cốt nền nhà tôn cao 45cm - 75cm so với mặt sân; chân tường ốp gạch gốm thông hơi.",
      "position": "Cửa sổ hướng Đông Nam có rèm chắn ẩm; mở ô thoáng hút gió đối lưu khô ở mặt Bắc.",
      "structure": "Lớp xỉ than dày 15-20cm lót dưới sàn bê tông; màng chống thấm PE 2 lớp.",
      "benefit": "Sàn nhà luôn khô ráo 100% trong những ngày nồm ẩm khắc nghiệt nhất."
    }
  },
  {
    "id": "nha_chong_lut_lo_mong",
    "name": "Chống Lụt Sạt Móng",
    "code": "MẪU 07 - MÓNG BÈ CỐT THÉP & SÀN GÁC VƯỢT LŨ",
    "summary": "Thiết kế móng bè bê tông cốt thép chống xói lở đất phù sa và sàn tầng 1 vượt đỉnh lũ lịch sử cho Miền Trung & Đồng Bằng Sông Cửu Long.",
    "problem_analysis": "Nước lũ dâng ngập cuốn trôi đất móng nông, dòng chảy xiết tạo lực đẩy thủy tĩnh phá vỡ tường gạch.",
    "engineering_standards": "FEMA Coastal Construction Manual • TCVN 2737 • 《Thủy Long Kinh》",
    "formula": "F_buoyancy = \\rho_water * g * V_submerged | Van xả áp ngầm triệt tiêu lực đẩy nổi",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <rect x=\"0\" y=\"320\" width=\"800\" height=\"100\" fill=\"#0284C7\" opacity=\"0.6\"/>\n        <text x=\"120\" y=\"350\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\">MỰC NƯỚC LŨ DÂNG CAO</text>\n        <g transform=\"translate(260, 80)\">\n          <rect x=\"40\" y=\"240\" width=\"20\" height=\"90\" fill=\"#475569\"/>\n          <rect x=\"220\" y=\"240\" width=\"20\" height=\"90\" fill=\"#475569\"/>\n          <rect x=\"20\" y=\"220\" width=\"240\" height=\"25\" fill=\"#334155\" stroke=\"#FEF3C7\"/>\n          <text x=\"140\" y=\"237\" fill=\"#FEF3C7\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">Móng Bè Cốt Thép Chống Lún Lệch</text>\n          <rect x=\"30\" y=\"40\" width=\"220\" height=\"180\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <line x1=\"30\" y1=\"120\" x2=\"250\" y2=\"120\" stroke=\"#F59E0B\" stroke-width=\"3\"/>\n          <text x=\"140\" y=\"110\" fill=\"#FBBF24\" font-size=\"10\" font-weight=\"800\" text-anchor=\"middle\">Sàn Gác Lửng Vượt Lũ (+0.8m)</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Giữ Đất Chống Xói Mòn Chân Móng",
      "species": "Cây Tràm, Cây Bần, Dừa Nước, Cỏ Vetiver.",
      "distance": "Trồng thành dải bao bọc quanh bờ ao và chân móng phía thượng lưu dòng lũ.",
      "structure": "Hệ rễ chùm đan kết dày đặc như tấm lưới thép tự nhiên giữ chặt lớp đất phù sa.",
      "benefit": "Triệt tiêu 70% lực xói lở của dòng lũ chảy xiết qua móng."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Cốt Nền Vượt Lũ & Khung Bê Tông",
      "shape": "Nhà có sàn gác lửng cứu hộ cao hơn đỉnh lũ lịch sử + 0.8m; cầu thang thoát hiểm lên nóc.",
      "position": "Cửa tầng trệt thiết kế chịu ngập; tường tầng 1 xây gạch đặc chống thấm.",
      "structure": "Móng bè bê tông cốt thép toàn khối liên kết cọc cắm sâu vào tầng cuội sỏi.",
      "benefit": "Bảo vệ tài sản và tính mạng an toàn tuyệt đối khi có đại hồng thủy."
    }
  },
  {
    "id": "nha_goc_pho_2_mat_tien",
    "name": "Góc Phố 2 Mặt",
    "code": "MẪU 08 - VÁT CẠNH VÒM CONG TIÊU XOÁY",
    "summary": "Hóa giải gió xoáy giao lộ đô thị và xung sát góc ngã tư cho nhà phố 2 mặt tiền.",
    "problem_analysis": "Giao lộ đô thị tạo ra các luồng gió xoáy đa hướng va đập vào 2 mặt tiền gây nứt tường và ồn ào bụi bặm.",
    "engineering_standards": "Urban Aerodynamics • 《Hoàng Đế Trạch Kinh》",
    "formula": "R >= 1.5m | Triệt xoáy nón mép góc nhọn",
    "svg_diagram": "\n      <svg viewBox=\"0 0 800 420\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:monospace;\">\n        <path d=\"M40,360 L760,360\" stroke=\"#475569\" stroke-width=\"2\"/>\n        <path d=\"M200,40 L200,360\" stroke=\"#475569\" stroke-width=\"2\"/>\n        <text x=\"100\" y=\"320\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\">NGÃ TƯ GIAO LỘ</text>\n        <g transform=\"translate(240, 100)\">\n          <path d=\"M40,0 L260,0 L260,220 L0,220 L0,40 Q0,0 40,0 Z\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <text x=\"140\" y=\"110\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">NHÀ VÁT GÓC BO TRÒN R=1.5m</text>\n          <path d=\"M-15,40 Q-15,-15 40,-15\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/>\n          <text x=\"35\" y=\"-20\" fill=\"#FBBF24\" font-size=\"10\" font-weight=\"700\">Ban Công Cong Xé Gió Xoáy</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Tán Tròn Điều Hòa Giao Lộ",
      "species": "Cây Lộc Vừng, Cây Ngọc Lan, Cây Sanh Bonsai.",
      "distance": "Bố trí tại góc vát mặt tiền sân trước.",
      "structure": "Tán cây tròn đều hấp thu bụi mịn và tiếng ồn giao thông từ ngã tư.",
      "benefit": "Giảm 60% tiếng ồn và tạo điểm tụ sinh khí tại góc phố."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Vát Cạnh & Ban Công Lượn Sóng",
      "shape": "Vát cạnh góc nhà bán kính R >= 1.2m hoặc vát 45° chiều rộng vát >= 2.0m; ban công lượn sóng.",
      "position": "Cửa chính bố trí tại cạnh vát đón khí từ cung cát; lam nhôm chữ Z chắn mưa tạt.",
      "structure": "Khung vách kính cong cường lực 12mm cách âm cách nhiệt.",
      "benefit": "Triệt tiêu góc nhọn xung sát, biến giao lộ ồn ào thành mặt tiền kinh doanh thịnh vượng."
    }
  }
];

const CONSTRUCTION_HAZARDS_MATRIX = [
  {
    id: "hazard_01",
    name: "Tốc Mái Do Áp Suất Âm Bernoulli",
    freq: "Rất Hay Gặp (Mùa Bão)",
    risk_level: "CỰC KỲ NGUY HIỂM",
    classic_ref: "《Táng Thư》: Quát Cốt Phong & Khí Thừa Phong Tắc Tán",
    physics_ref: "Chênh lệch áp suất tĩnh Bernoulli (\u0394P = 0.5*\u03C1*v^2)",
    phenomenon: "Mái tôn hoặc mái ngói bị giật bung toàn bộ khi có bão cấp 10-12 do lực nâng bốc mái.",
    solution: "Thiết kế Mái Bốn Mái dốc 32°, đai thép neo xà gồ vào dầm bê tông, lam thoát áp mặt sau."
  },
  {
    id: "hazard_02",
    name: "Gió Dội Thác Đổ & Lốc Chân Cao Ốc",
    freq: "Phổ Biến Đô Thị",
    risk_level: "NGUY HIỂM CAO",
    classic_ref: "《Hoàng Đế Trạch Kinh》: Thiên Trảm Sát & Tứ Diện Phong Ao",
    physics_ref: "Corner Downwash Vortex & Hiệu ứng Venturi gia tốc",
    phenomenon: "Gió đập vào vách chung cư dội ngược xuống đất tạo lốc cuốn xé toạc cửa sổ nhà thấp.",
    solution: "Lắp mái đón sảnh chữ V nghiêng 15° hất ngược gió, bo tròn góc tường R >= 50cm, trồng cau vua."
  },
  {
    id: "hazard_03",
    name: "Đâm Đường Thương Phong Sát Hút Gió",
    freq: "Rất Hay Gặp (Nhà Ngã Ba / Hẻm)",
    risk_level: "NGUY HIỂM CAO",
    classic_ref: "《Dương Trạch Thập Thư》: Nhất Điều Thương Nhất Điều Huyết",
    physics_ref: "Ống nén khí khí động học (Pipe Channeling)",
    phenomenon: "Luồng gió nén từ con hẻm đâm thẳng tim nhà cướp sạch nhiệt năng và mang bụi bặm ô nhiễm.",
    solution: "Xây bình phong hoa gió thoáng 25% trước cửa, mở cửa lệch trục, trồng trúc quân tử."
  },
  {
    id: "hazard_04",
    name: "Bức Xạ Nhiệt & Tích Nhiệt Trần Bê Tông",
    freq: "Xảy Ra Mọi Mùa Hè",
    risk_level: "ẢNH HƯỞNG SỨC KHỎE",
    classic_ref: "《Khảo Công Ký》: Thiên Tỉnh Thiên Tâm & Âm Dương Giao Hòa",
    physics_ref: "Hiệu ứng Cột Áp Ống Khói (Stack Effect) & Cầu Nhiệt Bê Tông",
    phenomenon: "Trần nhà bê tông hấp thụ nhiệt lên tới 45°C - 50°C tỏa nhiệt cả ban đêm gây sốc nhiệt.",
    solution: "Mở giếng trời Thiên Tỉnh thoát nhiệt nóc, lợp mái ngói 2 lớp đệm khí, làm hồ nước Tây Nam."
  },
  {
    id: "hazard_05",
    name: "Gió Nén Gia Tốc Sườn Dốc & Sạt Lở Móng",
    freq: "Vùng Đồi Núi / Cao Nguyên",
    risk_level: "CỰC KỲ NGUY HIỂM",
    classic_ref: "《Táng Thư》: Đoạn Sơn Tuyệt Thạch Sát",
    physics_ref: "Topographic Speed-up & Xói mòn thủy lực",
    phenomenon: "Vận tốc gió tại đỉnh đồi tăng gấp đôi, đất taluy chân móng bị mưa bão làm sạt lở.",
    solution: "Làm nhà bán âm nương sườn đồi, mái xuôi theo dốc, móng bè cắm đá, trồng cỏ Vetiver."
  },
  {
    id: "hazard_06",
    name: "Ẩm Mốc Đọng Sương Sàn Nhà Mùa Nồm",
    freq: "Hàng Năm (Tháng 2 - 4 Miền Bắc)",
    risk_level: "GÂY HẠI CÔNG TRÌNH",
    classic_ref: "《Dương Trạch Thập Thư》: Trọc Thủy Nê Ẩm Sát",
    physics_ref: "Ngưng tụ điểm sương (Dew Point Condensation)",
    phenomenon: "Sàn nhà và tường đá chảy nước thành vũng, đồ gỗ mốc meo, chập cháy điện âm tường.",
    solution: "Đệm xỉ than 20cm cách nhiệt dưới sàn, lót màng PE chống thấm ngược, đóng kín cửa hướng Đông Nam."
  },
  {
    id: "hazard_07",
    name: "Vỡ Cửa Đón Gió Gây Nổ Áp Suất Trong",
    freq: "Khi Bão Lớn",
    risk_level: "CỰC KỲ NGUY HIỂM",
    classic_ref: "《Hoàng Đế Trạch Kinh》: Môn Khẩu Xung Phá",
    physics_ref: "Internal Pressurization Surge (+0.8 Cp)",
    phenomenon: "Cửa kính đón gió bị vỡ khiến khí nén ùa vào đẩy tung toàn bộ mái nhà từ trong ra ngoài.",
    solution: "Dùng kính dán an toàn 2 lớp 10.38mm, cửa cuốn có thanh chống bão ray sâu > 75mm."
  },
  {
    id: "hazard_08",
    name: "Ngập Lụt Phù Sa & Đẩy Nổi Bể Ngầm",
    freq: "Mùa Lũ Miền Trung & Miền Tây",
    risk_level: "CỰC KỲ NGUY HIỂM",
    classic_ref: "《Thủy Long Kinh》: Xung Ba Thác Lạc Thủy",
    physics_ref: "Áp lực đẩy nổi thủy tĩnh (Hydrostatic Uplift Buoyancy)",
    phenomenon: "Nước lũ dâng cao cuốn trôi đất móng hoặc đẩy nứt vỡ sàn tầng hầm/bể nước ngầm rỗng.",
    solution: "Móng bè cốt thép toàn khối, cốt sàn tầng 1 cao hơn đỉnh lũ +0.8m, van xả áp ngầm."
  },
  {
    id: "hazard_09",
    name: "Lún Lệch Nứt Tường Xéo 45° Do Đất Mượn",
    freq: "Rất Phổ Biến (Ao San Lấp)",
    risk_level: "HƯ HỎNG KẾT CẤU",
    classic_ref: "《Hoàng Đế Trạch Kinh》: Địa Khí Bất Đồng Sát",
    physics_ref: "Lún lệch không đều (Differential Settlement)",
    phenomenon: "Nhà xây nửa trên nền đất liền, nửa trên ao san lấp bị nứt toác tường hình chữ V xéo 45°.",
    solution: "Ép cọc bê tông sâu qua tầng bùn tới tầng sét cứng, đà kiềng móng liên kết giằng ngang."
  },
  {
    id: "hazard_10",
    name: "Ăn Mòn Hơi Muối Biển Cốt Thép Ven Biển",
    freq: "Vùng Ven Biển Toàn Quốc",
    risk_level: "SUY THOÁI CÔNG TRÌNH",
    classic_ref: "《Táng Thư》: Diêm Khí Thực Cốt Sát",
    physics_ref: "Ăn mòn Ion Clorua (Chloride Attack & Carbonation)",
    phenomenon: "Hơi muối biển thẩm thấu vào bê tông làm rỉ sét cốt thép nở thể tích gây nứt vỡ dầm cột.",
    solution: "Dùng xi măng bền sunfat, tăng chiều dày lớp bê tông bảo vệ >= 40mm, sơn phủ chống thấm kỵ nước."
  }
];

if (typeof window !== 'undefined') {
  window.DESIGN_BLUEPRINT_THEORY = DESIGN_BLUEPRINT_THEORY;
  window.DESIGN_BLUEPRINTS = DESIGN_BLUEPRINTS;
  window.CONSTRUCTION_HAZARDS_MATRIX = CONSTRUCTION_HAZARDS_MATRIX;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DESIGN_BLUEPRINT_THEORY,
    DESIGN_BLUEPRINTS,
    CONSTRUCTION_HAZARDS_MATRIX
  };
}
