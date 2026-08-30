/**
 * DỮ LIỆU CÔNG CỤ: GỢI Ý THIẾT KẾ KHÍ ĐỘNG HỌC & CỔ TRUYỀN TOÀN THƯ (20 MẪU BẢN VẼ CHẤT LƯỢNG CAO)
 * Tích hợp toàn diện 6 Đại Nguyên Lý Cốt Lõi (Cổ Thư & Khí Động Học),
 * 20 Bộ Bản Vẽ Mẫu Chuẩn Kỹ Thuật (SVG Vector Chất Lượng Cao, Chữ To Rõ 14-18px),
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
    "engineering_standards": "TCVN 2737:2023 • ASCE 7-22 • 《Táng Thư》 Quách Phác",
    "formula": "P_net = 0.5 * \\rho * v^2 * (C_pe - C_pi) | \\Delta P giảm từ 2.4 kPa xuống 0.7 kPa",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <defs>\n          <linearGradient id=\"windG1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n            <stop offset=\"0%\" stop-color=\"#38BDF8\" stop-opacity=\"0.95\"/>\n            <stop offset=\"100%\" stop-color=\"#38BDF8\" stop-opacity=\"0.15\"/>\n          </linearGradient>\n          <linearGradient id=\"roofGrad1\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n            <stop offset=\"0%\" stop-color=\"#D97706\"/>\n            <stop offset=\"100%\" stop-color=\"#78350F\"/>\n          </linearGradient>\n          <pattern id=\"soil1\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n            <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"#334155\" stroke-width=\"1.5\"/>\n          </pattern>\n        </defs>\n        <!-- LƯỚI TỌA ĐỘ VÀ NỀN ĐẤT -->\n        <rect x=\"0\" y=\"340\" width=\"850\" height=\"120\" fill=\"url(#soil1)\"/>\n        <line x1=\"0\" y1=\"340\" x2=\"850\" y2=\"340\" stroke=\"#64748B\" stroke-width=\"3\"/>\n        <text x=\"760\" y=\"365\" fill=\"#94A3B8\" font-size=\"15\" font-weight=\"700\">±0.000</text>\n\n        <!-- ĐAI TRE PHÂN TẦNG CHẮN BÃO (CÁCH NHÀ 12m) -->\n        <g transform=\"translate(40, 140)\">\n          <!-- Cây bụi thấp tầng 1 -->\n          <circle cx=\"35\" cy=\"170\" r=\"28\" fill=\"#047857\" stroke=\"#10B981\" stroke-width=\"2\"/>\n          <circle cx=\"75\" cy=\"175\" r=\"24\" fill=\"#065F46\" stroke=\"#34D399\" stroke-width=\"2\"/>\n          <!-- Tre ngà thân dẻo tầng 2 -->\n          <path d=\"M110,200 Q125,70 100,-10 Q135,80 135,200\" fill=\"#047857\"/>\n          <circle cx=\"100\" cy=\"-10\" r=\"36\" fill=\"#059669\" stroke=\"#34D399\" stroke-width=\"2.5\"/>\n          <path d=\"M150,200 Q165,50 140,-40 Q175,70 175,200\" fill=\"#047857\"/>\n          <circle cx=\"140\" cy=\"-40\" r=\"42\" fill=\"#10B981\" stroke=\"#6EE7B7\" stroke-width=\"2.5\"/>\n          <!-- Nhãn đai tre chữ to rõ -->\n          <rect x=\"20\" y=\"210\" width=\"180\" height=\"32\" rx=\"6\" fill=\"#064E3B\" stroke=\"#34D399\" stroke-width=\"1.5\"/>\n          <text x=\"110\" y=\"232\" fill=\"#6EE7B7\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">ĐAI TRE PHÂN TẦNG</text>\n        </g>\n\n        <!-- CÁC ĐƯỜNG DÒNG GIÓ BÃO BỊ NÂNG QUA NÓC -->\n        <path d=\"M10,200 C150,180 200,90 350,75 C480,60 620,90 840,110\" fill=\"none\" stroke=\"url(#windG1)\" stroke-width=\"5\" stroke-dasharray=\"8,5\"/>\n        <path d=\"M10,240 C150,220 200,130 350,105 C480,90 620,110 840,135\" fill=\"none\" stroke=\"url(#windG1)\" stroke-width=\"3\" stroke-dasharray=\"8,5\"/>\n        <rect x=\"20\" y=\"145\" width=\"220\" height=\"32\" rx=\"6\" fill=\"rgba(2,132,199,0.25)\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n        <text x=\"130\" y=\"167\" fill=\"#38BDF8\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">GIÓ BÃO CẤP 12 →</text>\n\n        <!-- CÔNG TRÌNH NHÀ MÁI BỐN MÁI (MẶT CẮT KỸ THUẬT RÕ RÀNG) -->\n        <g transform=\"translate(390, 110)\">\n          <!-- Móng đà kiềng BTCT -->\n          <rect x=\"20\" y=\"210\" width=\"380\" height=\"25\" fill=\"#334155\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n          <text x=\"210\" y=\"228\" fill=\"#CBD5E1\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">MÓNG ĐÀ KIỀNG BTCT TOÀN KHỐI</text>\n          <!-- Cột bê tông cốt thép chịu lực -->\n          <rect x=\"40\" y=\"70\" width=\"22\" height=\"140\" fill=\"#475569\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n          <rect x=\"350\" y=\"70\" width=\"22\" height=\"140\" fill=\"#475569\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n          <!-- Dầm BTCT neo xà gồ -->\n          <rect x=\"20\" y=\"70\" width=\"380\" height=\"18\" fill=\"#475569\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <!-- Tường xây gạch và cửa lùi -->\n          <rect x=\"62\" y=\"88\" width=\"288\" height=\"122\" fill=\"#0F172A\" stroke=\"#334155\" stroke-width=\"1.5\"/>\n          <rect x=\"80\" y=\"125\" width=\"45\" height=\"85\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <text x=\"102\" y=\"172\" fill=\"#FBBF24\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">SẢNH LÙI</text>\n          \n          <!-- MÁI BỐN MÁI DỐC 32 ĐỘ -->\n          <polygon points=\"210,-35 0,70 420,70\" fill=\"url(#roofGrad1)\" stroke=\"#FEF3C7\" stroke-width=\"3\"/>\n          <line x1=\"210\" y1=\"-35\" x2=\"210\" y2=\"70\" stroke=\"#FEF3C7\" stroke-width=\"2\" stroke-dasharray=\"4,4\"/>\n          <!-- Lam xả áp Leeward mặt sau -->\n          <rect x=\"340\" y=\"72\" width=\"28\" height=\"14\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n          <text x=\"354\" y=\"62\" fill=\"#38BDF8\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">LAM XẢ ÁP</text>\n          <!-- Góc dốc 32 độ -->\n          <path d=\"M55,70 A50,50 0 0,0 90,48\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"2.5\"/>\n          <text x=\"100\" y=\"60\" fill=\"#FDE68A\" font-size=\"15\" font-weight=\"800\">32°</text>\n          \n          <!-- TIÊU ĐỀ BẢN VẼ CHỮ TO ĐẬM -->\n          <rect x=\"80\" y=\"-70\" width=\"260\" height=\"34\" rx=\"6\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <text x=\"210\" y=\"-47\" fill=\"#FEF3C7\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">MÁI 4 MÁI DỐC 32° (TRIỆT LỰC BỐC)</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Chắn Bão (Phong Đai Bậc Thang)",
      "species": "Tre Ngà (Bambusa blumeana), Phi Lao (Casuarina equisetifolia), Cau Vua.",
      "distance": "Khoảng cách L = 10m - 15m (L = 1.5 - 2.0 lần chiều cao công trình h).",
      "structure": "Bố cục 2 tầng: Tầng dưới cây bụi cản gió sát đất (h=1.5m); Tầng trên tre ngà dẻo nâng luồng bão lướt qua nóc.",
      "benefit": "Giảm 50% - 60% động năng gió bão trước khi tiếp xúc mặt tiền công trình."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Kiến Trúc & Kết Cấu Chống Tốc Mái",
      "shape": "Mái Bốn Mái dốc 30° - 35° (C_pe = -0.3 đến -0.4, giảm 65% lực bốc so với mái 2 dốc C_pe = -0.9).",
      "position": "Tiền sảnh thụt lùi 1.8m tạo đệm khí tĩnh; cửa sổ khuất gió có lam thoát áp.",
      "structure": "Đai thép D10 neo bản mã xà gồ vào dầm BTCT; đinh vít ke chống bão bước vít <= 60cm.",
      "benefit": "Cân bằng áp suất trong - ngoài, triệt tiêu nguy cơ tốc mái khi bão giật cấp 12 - 13."
    }
  },
  {
    "id": "nha_chan_chungcu",
    "name": "Nhà Bị Kẹp",
    "code": "MẪU 02 - MÁI ĐÓN CÁNH CHIM CHỮ V & GÓC BO TRÒN",
    "summary": "Hóa giải hiện tượng gió cuộn dội ngược (Corner Downwash Vortex) và gia tốc phễu gió Venturi chân cao ốc.",
    "problem_analysis": "Cao ốc chặn đứng khối không khí lớn, sinh dòng Downwash dội thẳng đứng xuống mặt đất với vận tốc v_down = 0.6*v_top (v đạt 22-28 m/s ở chân công trình). Mái đón cánh chim chữ V vươn nhịp conson chịu lực hất ngược luồng gió.",
    "engineering_standards": "Eurocode 1 EN 1991-1-4 • 《Hoàng Đế Trạch Kinh》 Thiên Trảm Sát",
    "formula": "v_downwash \\approx 0.6 * v_gradient * \\sqrt{H/W} | Lực dội tiêu tán 60% qua Mái Đón Chữ V",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <!-- NỀN ĐẤT -->\n        <rect x=\"0\" y=\"350\" width=\"850\" height=\"110\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"350\" x2=\"850\" y2=\"350\" stroke=\"#64748B\" stroke-width=\"3\"/>\n        <text x=\"780\" y=\"375\" fill=\"#94A3B8\" font-size=\"15\" font-weight=\"700\">±0.000</text>\n\n        <!-- KHỐI CAO ỐC CHUNG CƯ (H=75m) -->\n        <rect x=\"30\" y=\"20\" width=\"200\" height=\"330\" fill=\"#1E293B\" stroke=\"#475569\" stroke-width=\"3\"/>\n        <rect x=\"40\" y=\"35\" width=\"180\" height=\"32\" rx=\"4\" fill=\"#0F172A\" stroke=\"#94A3B8\"/>\n        <text x=\"130\" y=\"57\" fill=\"#CBD5E1\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">CAO ỐC (H=75m)</text>\n        <!-- Cửa sổ các tầng cao ốc -->\n        <g fill=\"#0F172A\" stroke=\"#334155\" stroke-width=\"1.5\">\n          <rect x=\"50\" y=\"85\" width=\"35\" height=\"24\"/><rect x=\"110\" y=\"85\" width=\"35\" height=\"24\"/><rect x=\"170\" y=\"85\" width=\"35\" height=\"24\"/>\n          <rect x=\"50\" y=\"130\" width=\"35\" height=\"24\"/><rect x=\"110\" y=\"130\" width=\"35\" height=\"24\"/><rect x=\"170\" y=\"130\" width=\"35\" height=\"24\"/>\n          <rect x=\"50\" y=\"175\" width=\"35\" height=\"24\"/><rect x=\"110\" y=\"175\" width=\"35\" height=\"24\"/><rect x=\"170\" y=\"175\" width=\"35\" height=\"24\"/>\n          <rect x=\"50\" y=\"220\" width=\"35\" height=\"24\"/><rect x=\"110\" y=\"220\" width=\"35\" height=\"24\"/><rect x=\"170\" y=\"220\" width=\"35\" height=\"24\"/>\n        </g>\n\n        <!-- LUỒNG GIÓ ĐẬP VÀO VÁCH CAO ỐC DỘI XUỐNG (DOWNWASH) -->\n        <path d=\"M20,130 L200,130 Q240,130 240,200 L240,320\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"5\" stroke-dasharray=\"8,5\"/>\n        <path d=\"M20,95 L215,95 Q255,95 255,200 L255,320\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"4\" stroke-dasharray=\"8,5\"/>\n        <!-- Nhãn cảnh báo Downwash chữ to rõ -->\n        <rect x=\"210\" y=\"150\" width=\"160\" height=\"34\" rx=\"6\" fill=\"#7F1D1D\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n        <text x=\"290\" y=\"173\" fill=\"#FECACA\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">GIÓ DỘI DOWNWASH ↓</text>\n\n        <!-- HÀNG CAU VUA TÁN NGANG -->\n        <g transform=\"translate(280, 220)\">\n          <line x1=\"25\" y1=\"130\" x2=\"25\" y2=\"25\" stroke=\"#047857\" stroke-width=\"6\"/>\n          <ellipse cx=\"25\" cy=\"25\" rx=\"32\" ry=\"18\" fill=\"#059669\" stroke=\"#34D399\" stroke-width=\"2\"/>\n          <text x=\"25\" y=\"145\" fill=\"#34D399\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">CAU VUA</text>\n        </g>\n\n        <!-- CÔNG TRÌNH NHÀ Ở THẤP TẦNG VỚI MÁI ĐÓN CÁNH CHIM CHỮ V THỰC TẾ -->\n        <g transform=\"translate(410, 150)\">\n          <!-- Thân nhà 3 tầng vát góc bo cong R=80cm -->\n          <path d=\"M50,20 Q0,20 0,60 L0,200 L380,200 L380,20 Z\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"210\" y=\"100\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">NHÀ THẤP TẦNG (HÓA GIẢI)</text>\n          \n          <!-- HỆ MÁI ĐÓN CÁNH CHIM CHỮ V (BUTTERFLY CANOPY CONSON VƯƠN 2.8m) -->\n          <!-- Dầm thép conson chịu lực -->\n          <line x1=\"0\" y1=\"90\" x2=\"-55\" y2=\"55\" stroke=\"#F59E0B\" stroke-width=\"4\"/>\n          <!-- Cánh mái dốc ngược 15 độ hất gió -->\n          <polygon points=\"-65,40 25,65 -20,85\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"2.5\"/>\n          <rect x=\"-80\" y=\"10\" width=\"160\" height=\"28\" rx=\"4\" fill=\"#0C4A6E\" stroke=\"#38BDF8\"/>\n          <text x=\"0\" y=\"29\" fill=\"#7DD3FC\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">MÁI ĐÓN CHỮ V (15°)</text>\n\n          <!-- ĐƯỜNG DÒNG GIÓ BỊ HẤT NGƯỢC LÊN TRÊN -->\n          <path d=\"M-40,80 Q-55,30 30,-20\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"4\" stroke-dasharray=\"6,4\"/>\n          <rect x=\"40\" y=\"-35\" width=\"170\" height=\"28\" rx=\"4\" fill=\"#064E3B\" stroke=\"#34D399\"/>\n          <text x=\"125\" y=\"-16\" fill=\"#6EE7B7\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">HẤT NGƯỢC GIÓ DỘI ↑</text>\n\n          <!-- Tiền sảnh lùi sâu 2m -->\n          <rect x=\"35\" y=\"110\" width=\"50\" height=\"90\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <text x=\"60\" y=\"160\" fill=\"#FBBF24\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">SẢNH LÙI 2m</text>\n        </g>\n      </svg>\n    ",
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
    "engineering_standards": "ISO 9613-2 • FHWA Highway Noise • TCVN 7838:2007 (Rung động)",
    "formula": "TL = 20*\\log_{10}(m \\cdot f) - 47 dB | Giảm 38-42 dBA với Kính Hộp PVB + Khe Chống Rung",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <!-- NỀN ĐẤT ĐỊA CHẤT -->\n        <rect x=\"0\" y=\"340\" width=\"850\" height=\"120\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"340\" x2=\"850\" y2=\"340\" stroke=\"#64748B\" stroke-width=\"3\"/>\n        <text x=\"780\" y=\"365\" fill=\"#94A3B8\" font-size=\"15\" font-weight=\"700\">±0.000</text>\n\n        <!-- CẦU VƯỢT CAO TỐC TRÊN CAO (H=7.5m) -->\n        <g transform=\"translate(40, 90)\">\n          <!-- Trụ cầu BTCT -->\n          <rect x=\"60\" y=\"90\" width=\"45\" height=\"160\" fill=\"#334155\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n          <!-- Dầm hộp BTCT cầu vượt -->\n          <polygon points=\"0,55 165,55 140,90 25,90\" fill=\"#475569\" stroke=\"#94A3B8\" stroke-width=\"2.5\"/>\n          <rect x=\"0\" y=\"50\" width=\"165\" height=\"6\" fill=\"#0F172A\"/>\n          <!-- Ô tô chạy phát tiếng ồn -->\n          <rect x=\"40\" y=\"24\" width=\"50\" height=\"24\" fill=\"#D97706\" rx=\"4\"/>\n          <!-- Tường chắn âm Acrylic (Noise Barrier) -->\n          <rect x=\"158\" y=\"10\" width=\"6\" height=\"42\" fill=\"#38BDF8\" stroke=\"#0284C7\" stroke-width=\"1.5\"/>\n          <text x=\"168\" y=\"30\" fill=\"#38BDF8\" font-size=\"13\" font-weight=\"800\">TẤM CHẮN ÂM</text>\n          <!-- Nhãn cảnh báo tiếng ồn chữ to rõ -->\n          <rect x=\"-10\" y=\"-20\" width=\"185\" height=\"30\" rx=\"4\" fill=\"#7F1D1D\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n          <text x=\"82\" y=\"1\" fill=\"#FECACA\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">ỒN 78 dBA & RUNG CHẤN</text>\n        </g>\n\n        <!-- SÓNG RUNG ĐỊA CHẤN TRUYỀN QUA NỀN ĐẤT -->\n        <path d=\"M190,140 Q260,150 330,180\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"3\" stroke-dasharray=\"6,4\"/>\n        <path d=\"M190,170 Q260,190 330,230\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"3\" stroke-dasharray=\"6,4\"/>\n\n        <!-- RÃNH KHE CO GIÃN ĐỆM CAO SU NEOPRENE CHỐNG RUNG (50mm) -->\n        <rect x=\"350\" y=\"315\" width=\"16\" height=\"85\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n        <rect x=\"260\" y=\"405\" width=\"200\" height=\"32\" rx=\"4\" fill=\"#0C4A6E\" stroke=\"#38BDF8\"/>\n        <text x=\"360\" y=\"426\" fill=\"#7DD3FC\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">KHE CHỐNG RUNG CAO SU</text>\n\n        <!-- DẢI CÂY XANH TÁN DÀY TÁN XẠ BỤI VÀ ÂM -->\n        <g transform=\"translate(370, 200)\">\n          <circle cx=\"20\" cy=\"80\" r=\"22\" fill=\"#047857\" stroke=\"#10B981\" stroke-width=\"2\"/>\n          <text x=\"20\" y=\"125\" fill=\"#34D399\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">DẢI CÂY</text>\n        </g>\n\n        <!-- CÔNG TRÌNH NHÀ Ở VỚI LOGIA ĐỆM VÀ KÍNH HỘP ÂM HỌC PVB -->\n        <g transform=\"translate(420, 70)\">\n          <!-- Khung nhà 3 tầng -->\n          <rect x=\"0\" y=\"0\" width=\"390\" height=\"270\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <!-- Logia đệm sâu 1.8m -->\n          <rect x=\"0\" y=\"40\" width=\"80\" height=\"200\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-dasharray=\"4,4\"/>\n          <text x=\"40\" y=\"145\" fill=\"#FBBF24\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\" transform=\"rotate(-90 40 145)\">LOGIA ĐỆM 1.8m (-10 dBA)</text>\n          \n          <!-- Cửa kính hộp 2 lớp dán film PVB âm học -->\n          <line x1=\"80\" y1=\"50\" x2=\"80\" y2=\"230\" stroke=\"#38BDF8\" stroke-width=\"8\"/>\n          <rect x=\"90\" y=\"130\" width=\"130\" height=\"30\" rx=\"4\" fill=\"#0C4A6E\" stroke=\"#38BDF8\"/>\n          <text x=\"155\" y=\"151\" fill=\"#7DD3FC\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">KÍNH HỘP PVB</text>\n\n          <!-- Không gian phòng ngủ yên tĩnh đạt chuẩn TCVN -->\n          <rect x=\"190\" y=\"55\" width=\"180\" height=\"175\" fill=\"#0A0F1D\" stroke=\"#34D399\" stroke-width=\"2\"/>\n          <text x=\"280\" y=\"125\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">PHÒNG NGỦ YÊN TĨNH</text>\n          <text x=\"280\" y=\"152\" fill=\"#34D399\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">L_in = 36 dBA (ĐẠT CHUẨN)</text>\n          <text x=\"280\" y=\"178\" fill=\"#94A3B8\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">(Triệt Tiêu 42 dBA Tiếng Ồn)</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Hấp Thụ Bụi Mịn & Tán Xạ Sóng Âm",
      "species": "Trắc Bách Diệp, Cây Sanh tán rậm, Cây Chuối Cảnh bản lá rộng.",
      "distance": "Trồng thành dải dày 2.0m - 3.0m sát ranh giới lộ giới đối diện cầu vượt.",
      "structure": "Lớp lá dày hấp thụ 70% bụi mịn PM2.5 do ma sát lốp xe và tán xạ sóng âm tần số cao (> 1000 Hz, giảm 3-5 dB).",
      "benefit": "Cải thiện chất lượng không khí và giảm phản xạ âm thanh dội vào mặt đứng."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Kính Hộp Âm Học & Khe Khớp Chống Rung Móng",
      "shape": "Mặt tiền hướng cầu vượt bố trí ban công logia thụt sâu 1.8m làm buồng tiêu âm tự nhiên (giảm 8-10 dBA).",
      "position": "Phòng ngủ và phòng làm việc bố trí lùi về phía sau nhà; mặt tiền dùng làm cầu thang, kho hoặc hành lang đệm.",
      "structure": "Cửa nhôm cầu cách nhiệt lắp Kính hộp 2 lớp (6mm + 12mm Argon + 6.38mm PVB âm học, STC 42); Khe chống rung móng cao su Neoprene 50mm cách ly rung động 15-30 Hz.",
      "benefit": "Hạ mức ồn từ 78 dBA xuống dưới 38 dBA (chuẩn TCVN 3985:1999) và triệt tiêu 80% rung chấn giao thông."
    }
  },
  {
    "id": "nha_thoat_nhiet_muahe",
    "name": "Thoát Nhiệt",
    "code": "MẪU 04 - GIẾNG TRỜI THIÊN TÂM & MÁI 2 LỚP",
    "summary": "Ứng dụng Hiệu ứng Cột Áp Ống Khói (Thermal Stack Effect: ASHRAE Fundamentals) và vi khí hậu mặt nước Tây Nam hạ nhiệt gió Lào.",
    "problem_analysis": "Bức xạ mặt trời hun đốt mái bê tông lên 52°C, tỏa nhiệt thứ cấp xuống trần. Gió Phơn Tây Nam độ ẩm thấp (< 35%) thổi khô rát làm nhiệt độ phòng lên tới 39°C nếu không có hệ thống thoát nhiệt đối lưu.",
    "engineering_standards": "ASHRAE Handbook of Fundamentals • CIBSE Guide A • 《Khảo Công Ký》 Thiên Tỉnh",
    "formula": "Q = C_d * A * \\sqrt{2 * g * H * \\frac{\\Delta T}{T_in}} | Lưu lượng hút thoát nhiệt tự nhiên 2.8 m^3/s",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <!-- NỀN ĐẤT -->\n        <rect x=\"0\" y=\"350\" width=\"850\" height=\"110\" fill=\"#1E293B\"/>\n        <line x1=\"0\" y1=\"350\" x2=\"850\" y2=\"350\" stroke=\"#64748B\" stroke-width=\"3\"/>\n        <text x=\"780\" y=\"375\" fill=\"#94A3B8\" font-size=\"15\" font-weight=\"700\">±0.000</text>\n\n        <!-- HỒ NƯỚC BÁN NGUYỆT GÓC TÂY NAM (HẠ NHIỆT GIÓ PHƠN) -->\n        <path d=\"M30,330 Q120,290 220,330 L220,380 L30,380 Z\" fill=\"#0284C7\" opacity=\"0.85\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n        <rect x=\"40\" y=\"340\" width=\"170\" height=\"28\" rx=\"4\" fill=\"#0C4A6E\"/>\n        <text x=\"125\" y=\"359\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">AO TÂY NAM (-4°C)</text>\n        <path d=\"M120,310 C200,290 250,300 330,310\" fill=\"none\" stroke=\"#38BDF8\" stroke-width=\"4\"/>\n        <text x=\"220\" y=\"295\" fill=\"#38BDF8\" font-size=\"13\" font-weight=\"800\">Gió Mát Vào Cửa Trệt →</text>\n\n        <!-- CÔNG TRÌNH NHÀ PHỐ VỚI GIẾNG TRỜI THIÊN TÂM -->\n        <g transform=\"translate(320, 80)\">\n          <!-- Khung nhà 3 tầng -->\n          <rect x=\"0\" y=\"65\" width=\"480\" height=\"205\" fill=\"#0F172A\" stroke=\"#475569\" stroke-width=\"3\"/>\n          <!-- Mái ngói 2 lớp đệm khí lưu thông 12cm -->\n          <polygon points=\"240,-25 -25,65 505,65\" fill=\"#B45309\" stroke=\"#FEF3C7\" stroke-width=\"3\"/>\n          <line x1=\"-15\" y1=\"52\" x2=\"495\" y2=\"52\" stroke=\"#F59E0B\" stroke-width=\"3\"/>\n          <rect x=\"100\" y=\"38\" width=\"280\" height=\"24\" rx=\"4\" fill=\"#78350F\"/>\n          <text x=\"240\" y=\"55\" fill=\"#FDE68A\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">LỚP ĐỆM KHÍ GIẢI NHIỆT MÁI 12cm (-6°C)</text>\n\n          <!-- Giếng trời Thiên Tâm ở giữa nhà -->\n          <rect x=\"195\" y=\"55\" width=\"90\" height=\"215\" fill=\"#1E293B\" stroke=\"#38BDF8\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n          <text x=\"240\" y=\"170\" fill=\"#38BDF8\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">GIẾNG TRỜI</text>\n          <text x=\"240\" y=\"195\" fill=\"#7DD3FC\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">(Cột Áp Ống Khói)</text>\n\n          <!-- Cửa chớp thoát khí nóng đỉnh nóc mái -->\n          <rect x=\"200\" y=\"-35\" width=\"80\" height=\"22\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n          <path d=\"M225,250 L225,30 L215,-10\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"4\" stroke-dasharray=\"6,3\"/>\n          <path d=\"M255,250 L255,30 L265,-10\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"4\" stroke-dasharray=\"6,3\"/>\n          <!-- Nhãn thoát khí chữ to rõ -->\n          <rect x=\"135\" y=\"-70\" width=\"210\" height=\"30\" rx=\"4\" fill=\"#7F1D1D\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n          <text x=\"240\" y=\"-50\" fill=\"#FECACA\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">KHÍ NÓNG THOÁT NÓC ↑</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Che Bức Xạ & Bốc Hơi Làm Mát",
      "species": "Cây Lộc Vừng (Barringtonia acutangula), Hoa Giấy, Cây Bàng, Giàn Dây Leo Cát Đằng.",
      "distance": "Bố trí giàn lam che nắng mặt hướng Tây và cây bóng mát cách hiên 3.0m - 5.0m.",
      "structure": "Màn chắn sinh thái xanh cản 80% bức xạ mặt trời; bốc hơi nước hạ nhiệt 3°C - 5°C.",
      "benefit": "Giảm nhiệt độ bề mặt tường hướng Tây từ 6°C - 8°C."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Giếng Trời & Mái Đệm 2 Lớp Đối Lưu",
      "shape": "Giếng trời diện tích tối thiểu 6% - 8% diện tích sàn; đỉnh giếng có cửa chớp thông gió nghiêng 45°.",
      "position": "Bố trí tại vị trí Trung Cung (tâm nhà) tạo lực hút đối lưu thẳng đứng xuyên suốt các tầng.",
      "structure": "Mái 2 lớp: Lớp ngói ngoài và trần trong cách nhau 12-15cm có khe thông gió liên tục; mặt nước hồ cảnh góc Tây Nam.",
      "benefit": "Tạo luồng gió mát tự nhiên 24/7, hạ nhiệt độ trong nhà 4°C - 6°C, giảm 40% chi phí điều hòa."
    }
  },
  {
    "id": "nha_dinh_doi_suon_doc",
    "name": "Nhà Sườn Dốc",
    "code": "MẪU 05 - BÁN ÂM NƯƠNG ĐỊA HÌNH & MÓNG BÈ CẮM ĐÁ",
    "summary": "Hóa giải hiện tượng gia tốc gió leo dốc (Topographic Speed-up Multiplier K_zt theo ASCE 7-22) và nguy cơ trượt lở mái dốc.",
    "problem_analysis": "Độ dốc địa hình nén các đường dòng không khí làm vận tốc gió tại đỉnh đồi tăng từ 1.4 đến 2.0 lần. Nước mưa ngấm bão hòa đất taluy gây sạt lở cuốn trôi móng nông nếu không có hệ thống thoát nước ngầm chữ U và rễ cây giữ đất.",
    "engineering_standards": "ASCE 7-22 • Eurocode 7 • 《Táng Thư》 Đoạn Sơn Sát",
    "formula": "K_zt = (1 + K_1 K_2 K_3)^2 | Áp lực gió tăng 2.0 lần, móng bè cắm đá gốc sâu 2.5m",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <!-- SƯỜN ĐỒI ĐỊA HÌNH (DỐC 1:3) -->\n        <path d=\"M0,400 Q240,380 400,240 L850,240 L850,460 L0,460 Z\" fill=\"#1E293B\" stroke=\"#475569\" stroke-width=\"3\"/>\n        <path d=\"M10,360 Q240,340 380,200 L840,200\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"5\" stroke-dasharray=\"8,5\"/>\n        <rect x=\"230\" y=\"165\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#7F1D1D\" stroke=\"#EF4444\"/>\n        <text x=\"340\" y=\"187\" fill=\"#FECACA\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">GIÓ GIA TỐC (K_zt = 2.0x) →</text>\n\n        <!-- HỆ THỐNG CỎ VETIVER RỄ SÂU 3M GIỮ TALUY -->\n        <g transform=\"translate(190, 270)\">\n          <circle cx=\"20\" cy=\"40\" r=\"18\" fill=\"#059669\"/>\n          <circle cx=\"50\" cy=\"20\" r=\"22\" fill=\"#10B981\"/>\n          <line x1=\"20\" y1=\"55\" x2=\"20\" y2=\"130\" stroke=\"#047857\" stroke-width=\"3\" stroke-dasharray=\"3,3\"/>\n          <line x1=\"50\" y1=\"40\" x2=\"50\" y2=\"130\" stroke=\"#047857\" stroke-width=\"3\" stroke-dasharray=\"3,3\"/>\n          <rect x=\"-10\" y=\"70\" width=\"120\" height=\"26\" rx=\"4\" fill=\"#064E3B\" stroke=\"#34D399\"/>\n          <text x=\"50\" y=\"88\" fill=\"#6EE7B7\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">RỄ CỎ VETIVER 3m</text>\n        </g>\n\n        <!-- CÔNG TRÌNH NHÀ BÁN ÂM NƯƠNG SƯỜN ĐỒI -->\n        <g transform=\"translate(460, 110)\">\n          <rect x=\"40\" y=\"130\" width=\"25\" height=\"90\" fill=\"#475569\"/>\n          <rect x=\"220\" y=\"130\" width=\"25\" height=\"90\" fill=\"#475569\"/>\n          <text x=\"140\" y=\"180\" fill=\"#94A3B8\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">MÓNG CỌC CẮM ĐÁ GỐC</text>\n          \n          <polygon points=\"0,130 280,130 280,15 130,15\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"150\" y=\"75\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">NHÀ BÁN ÂM NƯƠNG ĐỒI</text>\n          <line x1=\"0\" y1=\"130\" x2=\"130\" y2=\"15\" stroke=\"#F59E0B\" stroke-width=\"6\"/>\n          <line x1=\"130\" y1=\"15\" x2=\"280\" y2=\"15\" stroke=\"#F59E0B\" stroke-width=\"6\"/>\n          <path d=\"M-20,140 L120,5 L300,5\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"4\"/>\n          <rect x=\"110\" y=\"-30\" width=\"180\" height=\"28\" rx=\"4\" fill=\"#064E3B\" stroke=\"#34D399\"/>\n          <text x=\"200\" y=\"-11\" fill=\"#6EE7B7\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">GIÓ TRƯỢT QUA NÓC</text>\n        </g>\n      </svg>\n    ",
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
    "engineering_standards": "Psychrometric Chart Standards • TCVN 9386 • 《Dương Trạch Thập Thư》",
    "formula": "T_floor > T_dew = T - ((100 - RH)/5) | Đệm xỉ than 20cm nâng nhiệt độ sàn thêm +3.5°C",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <rect x=\"0\" y=\"350\" width=\"850\" height=\"110\" fill=\"#1E293B\"/>\n        <g transform=\"translate(80, 80)\">\n          <rect x=\"0\" y=\"60\" width=\"690\" height=\"190\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"345\" y=\"40\" fill=\"#FEF3C7\" font-size=\"17\" font-weight=\"800\" text-anchor=\"middle\">MẶT CẮT KẾT CẤU SÀN CÁCH NHIỆT CHỐNG NỒM ĐIỂM SƯƠNG</text>\n          <!-- Lớp bê tông lót móng -->\n          <rect x=\"20\" y=\"195\" width=\"650\" height=\"35\" fill=\"#334155\"/>\n          <text x=\"345\" y=\"218\" fill=\"#CBD5E1\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">1. BÊ TÔNG LÓT MÓNG MÁC 100 (DÀY 100mm)</text>\n          <!-- Lớp xỉ than hoạt tính cách nhiệt -->\n          <rect x=\"20\" y=\"140\" width=\"650\" height=\"50\" fill=\"#475569\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <text x=\"345\" y=\"170\" fill=\"#FDE68A\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">2. ĐỆM XỈ THAN / GỐM XỐP CÁCH NHIỆT (150mm - 200mm)</text>\n          <!-- Màng PE chống thấm ngược -->\n          <line x1=\"20\" y1=\"135\" x2=\"670\" y2=\"135\" stroke=\"#38BDF8\" stroke-width=\"5\" stroke-dasharray=\"8,3\"/>\n          <text x=\"345\" y=\"128\" fill=\"#38BDF8\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">3. MÀNG CHỐNG THẤM PE 2 LỚP (CHỐNG THẤM NGƯỢC 100%)</text>\n          <!-- Lớp gạch gốm ấm chân -->\n          <rect x=\"20\" y=\"75\" width=\"650\" height=\"35\" fill=\"#1E293B\" stroke=\"#34D399\" stroke-width=\"2\"/>\n          <text x=\"345\" y=\"98\" fill=\"#6EE7B7\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">4. GẠCH GỐM / SÀN GỖ TỰ NHIÊN (T_FLOOR LUÔN > T_DEW)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <rect x=\"0\" y=\"310\" width=\"850\" height=\"150\" fill=\"#0284C7\" opacity=\"0.65\"/>\n        <rect x=\"30\" y=\"330\" width=\"220\" height=\"34\" rx=\"4\" fill=\"#0C4A6E\" stroke=\"#38BDF8\"/>\n        <text x=\"140\" y=\"353\" fill=\"#FEF3C7\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">MỰC NƯỚC LŨ LỊCH SỬ</text>\n        <g transform=\"translate(260, 60)\">\n          <rect x=\"40\" y=\"270\" width=\"25\" height=\"110\" fill=\"#475569\"/>\n          <rect x=\"250\" y=\"270\" width=\"25\" height=\"110\" fill=\"#475569\"/>\n          <rect x=\"20\" y=\"245\" width=\"280\" height=\"30\" fill=\"#334155\" stroke=\"#FEF3C7\" stroke-width=\"2\"/>\n          <text x=\"160\" y=\"265\" fill=\"#FEF3C7\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">MÓNG BÈ BTCT CHỐNG XÓI</text>\n          <rect x=\"30\" y=\"40\" width=\"260\" height=\"205\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <line x1=\"30\" y1=\"125\" x2=\"290\" y2=\"125\" stroke=\"#F59E0B\" stroke-width=\"4\"/>\n          <rect x=\"40\" y=\"135\" width=\"240\" height=\"32\" rx=\"4\" fill=\"#78350F\" stroke=\"#FBBF24\"/>\n          <text x=\"160\" y=\"157\" fill=\"#FDE68A\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">GÁC LỬNG VƯỢT LŨ (+1.0m)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <path d=\"M40,390 L810,390\" stroke=\"#475569\" stroke-width=\"3\"/>\n        <path d=\"M220,40 L220,390\" stroke=\"#475569\" stroke-width=\"3\"/>\n        <rect x=\"60\" y=\"345\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#1E293B\" stroke=\"#64748B\"/>\n        <text x=\"130\" y=\"366\" fill=\"#94A3B8\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">NGÃ TƯ GIAO LỘ</text>\n        <g transform=\"translate(260, 90)\">\n          <path d=\"M50,0 L320,0 L320,260 L0,260 L0,50 Q0,0 50,0 Z\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"170\" y=\"130\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">NHÀ VÁT GÓC BO TRÒN R=1.8m</text>\n          <path d=\"M-20,50 Q-20,-20 50,-20\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"5\"/>\n          <rect x=\"-10\" y=\"-55\" width=\"190\" height=\"28\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n          <text x=\"85\" y=\"-36\" fill=\"#FDE68A\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">BAN CÔNG TIÊU XOÁY</text>\n        </g>\n      </svg>\n    ",
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
  },
  {
    "id": "nha_thop_hau",
    "name": "Nhà Thóp Hậu",
    "code": "MẪU 09 - NỞ HẬU ẢO & GIẾNG TRỜI ĐỆM",
    "summary": "Hóa giải thế đất thắt cổ chai, giải tỏa áp suất khí nén tích tụ cuối nhà bằng giếng trời và sân vườn nở hậu.",
    "problem_analysis": "Nhà hẹp dần về sau làm luồng khí bị bóp nghẽn tăng áp suất cục bộ, khí ứ đọng không thông thoát gây ngột ngạt và tán tài.",
    "engineering_standards": "Building Ventilation Standards • 《Dương Trạch Thập Thư》",
    "formula": "\\Delta P_vent = 0.5 * \\rho * (v_front^2 - v_back^2) | Giếng trời sau giải tỏa áp suất tù đọng",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <polygon points=\"150,70 700,70 580,380 270,380\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n        <text x=\"425\" y=\"45\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">MẶT BẰNG ĐẤT THÓP HẬU (HÓA GIẢI BẰNG GIẾNG TRỜI)</text>\n        <rect x=\"340\" y=\"260\" width=\"170\" height=\"105\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n        <rect x=\"350\" y=\"295\" width=\"150\" height=\"35\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n        <text x=\"425\" y=\"318\" fill=\"#FDE68A\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">GIẾNG TRỜI NỞ HẬU</text>\n        <circle cx=\"305\" cy=\"335\" r=\"20\" fill=\"#10B981\"/>\n        <circle cx=\"545\" cy=\"335\" r=\"20\" fill=\"#10B981\"/>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Tụ Khí Cuối Nhà",
      "species": "Cây Kim Tiền, Trúc Nhật, Dương Xỉ Cổ Đại.",
      "distance": "Bố trí tại tiểu cảnh giếng trời góc cuối nhà.",
      "structure": "Cây bụi xanh tạo trường năng lượng sinh khí bù đắp cho góc khuyết đất.",
      "benefit": "Hấp thụ thán khí tồn đọng ở góc hẹp cuối nhà."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Nở Hậu Ảo & Phòng Vuông Vắn",
      "shape": "Ngăn phòng chức năng chính vuông vức ở phía trước; phần góc xéo phía sau làm giếng trời, kho hoặc sân vườn.",
      "position": "Mở giếng trời lớn ở phần đuôi thóp hậu tạo lực hút giải áp khí nén.",
      "structure": "Tường sau ốp kính hoặc gương phản chiếu tạo cảm giác không gian mở rộng.",
      "benefit": "Biến thế đất thóp hậu thành bố cục nở hậu thịnh vượng."
    }
  },
  {
    "id": "nha_ong_dai_hep",
    "name": "Nhà Ống Dài Hẹp",
    "code": "MẪU 10 - SONG TỈNH ĐỐI LƯU GIÓ CHÉO",
    "summary": "Bố trí 2 giếng trời Trước - Sau tạo luồng thông gió chéo (Cross-ventilation) xuyên suốt cho nhà phố dài sâu.",
    "problem_analysis": "Nhà ống sâu 20-25m bị bịt kín 2 bên hông biến thành ống tối tăm tù khí, phòng ngủ giữa nhà thiếu dưỡng khí trầm trọng.",
    "engineering_standards": "CIBSE Natural Ventilation • 《Khảo Công Ký》",
    "formula": "ACH = 3600 * Q / V >= 6.0 lần/giờ | Thông khí tự nhiên đạt tiêu chuẩn vệ sinh",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <rect x=\"60\" y=\"110\" width=\"730\" height=\"220\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n        <text x=\"425\" y=\"80\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">MẶT CẮT NHÀ PHỐ DÀI SÂU VỚI SONG TỈNH (2 GIẾNG TRỜI)</text>\n        <rect x=\"180\" y=\"60\" width=\"80\" height=\"270\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n        <text x=\"220\" y=\"200\" fill=\"#FBBF24\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">GIẾNG 1</text>\n        <rect x=\"580\" y=\"60\" width=\"80\" height=\"270\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n        <text x=\"620\" y=\"200\" fill=\"#FBBF24\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">GIẾNG 2</text>\n        <path d=\"M80,280 L200,260 L560,260 L640,90\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"4\"/>\n        <rect x=\"300\" y=\"240\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#064E3B\" stroke=\"#34D399\"/>\n        <text x=\"410\" y=\"262\" fill=\"#6EE7B7\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">LUỒNG GIÓ CHÉO 24/7 →</text>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Trong Giếng Trời",
      "species": "Cây Khế, Cây Phát Tài Núi, Cây Trầu Bà Thanh Xuân.",
      "distance": "Trồng tại bồn đất tự nhiên dưới đáy 2 giếng trời.",
      "structure": "Thân cây vươn thẳng đứng theo trục đứng hút ánh sáng tự nhiên.",
      "benefit": "Cung cấp oxy tươi cho toàn bộ các phòng ngủ tầng trên."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Song Tỉnh Hút Gió Chéo",
      "shape": "2 Giếng trời cách nhau tối thiểu 8m; tổng diện tích giếng trời chiếm 8% - 10% diện tích sàn.",
      "position": "Giếng 1 đặt cạnh cầu thang giữa nhà, Giếng 2 đặt sát góc cuối nhà.",
      "structure": "Cửa chớp lật thông gió trên nóc giếng trời điều chỉnh được góc mở.",
      "benefit": "Triệt tiêu 100% khí tù ẩm mốc, nhà luôn mát mẻ và sáng tự nhiên."
    }
  },
  {
    "id": "nha_khuc_song_phan_cung",
    "name": "Sông Phản Cung",
    "code": "MẪU 11 - BỜ KÈ TIÊU NĂNG & RẶNG DỪA NƯỚC",
    "summary": "Hóa giải Thủy Sát từ khúc sông cong lưỡi liềm chém vào nhà bằng bờ kè xếp đá phân tán năng lượng sóng và rặng cây chắn dòng.",
    "problem_analysis": "Dòng chảy xiết của khúc sông cong thúc thẳng vào bờ gây xói lở móng và mang theo xung lực tàn phá phong thủy.",
    "engineering_standards": "Hydraulic River Engineering • 《Thủy Long Kinh》",
    "formula": "\\tau = \\gamma * R * S | Kè rọ đá mái nghiêng 1:2 giảm 80% ứng suất cắt đáy sông",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <path d=\"M30,100 Q425,320 820,100 L820,0 L30,0 Z\" fill=\"#0284C7\" opacity=\"0.65\"/>\n        <text x=\"425\" y=\"70\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">KHÚC SÔNG CONG PHẢN CUNG (THỦY ĐAO SÁT)</text>\n        <path d=\"M80,240 Q425,390 770,240\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"10\"/>\n        <rect x=\"300\" y=\"325\" width=\"250\" height=\"34\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n        <text x=\"425\" y=\"348\" fill=\"#FDE68A\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">BỜ KÈ ĐÁ XẾP BẬC THANG</text>\n        <g transform=\"translate(315, 240)\">\n          <rect x=\"0\" y=\"40\" width=\"220\" height=\"110\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"110\" y=\"100\" fill=\"#FEF3C7\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">NHÀ Ở AN TOÀN</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Thủy Sinh Chắn Sóng",
      "species": "Dừa Nước, Cây Bần, Cây Đước, Cỏ Vetiver.",
      "distance": "Trồng thành dải dày 3m - 5m dọc mép nước bờ kè.",
      "structure": "Rễ chùm cắm sâu giữ đất, thân dẻo uốn lượn tiêu tán sóng vỗ.",
      "benefit": "Bảo vệ bờ kè chống xói lở móng 100%."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Bờ Kè Xếp Đá Phân Tầng",
      "shape": "Kè mái nghiêng 1:2 xếp đá hộc bậc thang tiêu tán năng lượng thủy lực.",
      "position": "Nhà lùi cách mép bờ sông tối thiểu 10m - 15m.",
      "structure": "Móng cọc bê tông sâu cắm vào tầng địa chất ổn định.",
      "benefit": "Biến thế Phản Cung nguy hiểm thành minh đường thủy tụ sinh thái."
    }
  },
  {
    "id": "nha_huong_tay_chong_nang",
    "name": "Chống Nắng Tây",
    "code": "MẪU 12 - MẶT ĐỨNG 2 LỚP & GIÀN CÂY XANH",
    "summary": "Thiết kế Double-skin Façade (Mặt đứng 2 lớp thông khí) và giàn hoa leo hạ nhiệt bức xạ mặt trời hướng Tây từ 6°C - 8°C.",
    "problem_analysis": "Nắng chiều hướng Tây hun đốt tường nhà lên 45°C tỏa nhiệt cả ban đêm gây ngột ngạt và tốn điện điều hòa.",
    "engineering_standards": "Building Thermal Envelope (ASHRAE 90.1) • 《Dương Trạch Thập Thư》",
    "formula": "q = U * A * \\Delta T | Lớp đệm khí giảm hệ số truyền nhiệt U từ 3.2 xuống 0.8 W/m²K",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <circle cx=\"100\" cy=\"90\" r=\"45\" fill=\"#EF4444\"/>\n        <text x=\"100\" y=\"96\" fill=\"#FEF3C7\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">NẮNG TÂY</text>\n        <g transform=\"translate(280, 90)\">\n          <rect x=\"0\" y=\"0\" width=\"440\" height=\"260\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <line x1=\"-35\" y1=\"0\" x2=\"-35\" y2=\"260\" stroke=\"#F59E0B\" stroke-width=\"10\" stroke-dasharray=\"12,5\"/>\n          <rect x=\"-180\" y=\"115\" width=\"135\" height=\"30\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n          <text x=\"-112\" y=\"136\" fill=\"#FDE68A\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">LAM HOA GIÓ (-6°C)</text>\n          <text x=\"220\" y=\"135\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">KHÔNG GIAN SỐNG MÁT MẺ</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Giàn Cây Leo Chống Nắng",
      "species": "Hoa Giấy, Cát Đằng, Cúc Tần Ấn Độ, Sử Quân Tử.",
      "distance": "Trồng tại bồn hoa ban công và giàn leo mặt đứng hướng Tây.",
      "structure": "Màn chắn sinh học xanh hấp thụ 80% bức xạ nhiệt mặt trời.",
      "benefit": "Giảm nhiệt độ bề mặt tường từ 6°C - 8°C."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Mặt Đứng 2 Lớp (Double-Skin)",
      "shape": "Lớp ngoài bằng gạch hoa gió/lam nhôm cách lớp tường kính bên trong 0.6m - 1.0m.",
      "position": "Hành lang đệm thông khí giải nhiệt liên tục từ dưới lên nóc.",
      "structure": "Kính Low-E cản nhiệt kết hợp rèm cuốn cách nhiệt.",
      "benefit": "Tiết kiệm 50% chi phí điện năng làm mát mùa hè."
    }
  },
  {
    "id": "nha_dat_ao_dam_lay",
    "name": "Đất Ao Đầm",
    "code": "MẪU 14 - NHÀ SÀN MÓNG CỪ TRÀM",
    "summary": "Thiết kế nhà sàn sinh thái móng cọc cừ tràm kết hợp sàn nổi thông thoáng chống sụt lún và hàn khí trọc thủy.",
    "problem_analysis": "Đất bùn ao đầm lầy có sức chịu tải yếu, hàn khí ẩm thấp bốc lên gây bệnh thấp khớp và sụt lún nứt móng.",
    "engineering_standards": "Soil Mechanics Soft Ground (TCVN 9362) • 《Dương Trạch Thập Thư》",
    "formula": "R_soil = 25 cọc/m^2 | Cọc cừ tràm ngập nước vĩnh cửu tăng sức chịu tải lên 0.8 - 1.2 kg/cm²",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <rect x=\"0\" y=\"300\" width=\"850\" height=\"160\" fill=\"#334155\" opacity=\"0.85\"/>\n        <text x=\"140\" y=\"350\" fill=\"#CBD5E1\" font-size=\"15\" font-weight=\"800\">TẦNG BÙN ĐẤT YẾU (H=6m)</text>\n        <g transform=\"translate(260, 70)\">\n          <line x1=\"40\" y1=\"230\" x2=\"40\" y2=\"380\" stroke=\"#F59E0B\" stroke-width=\"8\"/>\n          <line x1=\"300\" y1=\"230\" x2=\"300\" y2=\"380\" stroke=\"#F59E0B\" stroke-width=\"8\"/>\n          <rect x=\"70\" y=\"320\" width=\"200\" height=\"32\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n          <text x=\"170\" y=\"342\" fill=\"#FDE68A\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">CỪ TRÀM 25 CỌC/m²</text>\n          <rect x=\"20\" y=\"60\" width=\"300\" height=\"170\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"170\" y=\"150\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">SÀN NÂNG CÁCH ĐẤT 1.2m</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Thủy Sinh Hút Hàn Khí",
      "species": "Cây Tràm Gió, Cây Liễu Rũ, Thủy Trúc.",
      "distance": "Trồng quanh bờ đầm và chân móng.",
      "structure": "Rễ cây hút ẩm làm khô ráo nền đất xung quanh.",
      "benefit": "Thanh lọc hàn khí và giữ vững đất móng bùn."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Sàn Nâng Cách Ẩm 1.2m",
      "shape": "Sàn nhà nâng cao 1.0m - 1.5m so với mặt nước bùn; gầm sàn thông gió tự nhiên.",
      "position": "Cột nhà bằng bê tông chống thấm hoặc gỗ xử lý ngâm bùn chống mối mọt.",
      "structure": "Móng cọc cừ tràm mật độ 25 cọc/m2 dưới đầu cọc ngập nước.",
      "benefit": "Triệt tiêu 100% hàn khí trọc thủy, công trình bền vững trăm năm."
    }
  },
  {
    "id": "nha_sat_vach_nui_da",
    "name": "Sát Vách Núi",
    "code": "MẪU 15 - RÃNH HỨNG ĐÁ LĂN CHỮ U",
    "summary": "Hóa giải Thạch Sát và nguy cơ đá lăn sạt trượt từ vách núi dựng đứng phía sau nhà.",
    "problem_analysis": "Vách núi đá dốc đứng phía sau tích tụ áp lực địa chất lớn, mưa bão làm nứt vỡ đá lăn đè sập công trình.",
    "engineering_standards": "Rock Slope Engineering • 《Táng Thư》 Thạch Sơn Sát",
    "formula": "E_kinetic = 0.5 * m * v^2 | Tường BTCT dày 300mm chịu lực xung kích 150 kN",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <polygon points=\"0,0 220,0 220,380 0,380\" fill=\"#475569\"/>\n        <text x=\"110\" y=\"190\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">VÁCH NÚI ĐÁ</text>\n        <path d=\"M230,380 L280,380 L280,300 L320,300\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"5\"/>\n        <rect x=\"230\" y=\"260\" width=\"130\" height=\"30\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n        <text x=\"295\" y=\"281\" fill=\"#FDE68A\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">RÃNH CHỮ U</text>\n        <g transform=\"translate(360, 110)\">\n          <rect x=\"0\" y=\"0\" width=\"420\" height=\"250\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"210\" y=\"130\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">CÁCH LY AN TOÀN 6.0m</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Rừng Cây Cản Đá Lăn",
      "species": "Tre Bát Độ, Keo Dậu, Thông Đất Dốc.",
      "distance": "Trồng thành dải rậm rạp giữa vách núi và rãnh hứng đá.",
      "structure": "Bụi tre dày hấp thụ động năng và chặn giữ đá lăn từ sườn núi.",
      "benefit": "Ngăn chặn 90% nguy cơ đá rơi trúng công trình."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Hành Lang Cách Ly & Rãnh Chữ U",
      "shape": "Xây tường bê tông chắn đá dày 30cm kết hợp rãnh hứng chữ U sâu 1.5m phía sau nhà.",
      "position": "Công trình lùi cách chân vách núi tối thiểu 6.0m.",
      "structure": "Tường lưng nhà đổ bê tông cốt thép toàn khối kiên cố.",
      "benefit": "Bảo vệ an toàn tuyệt đối cho người và tài sản."
    }
  },
  {
    "id": "nha_chu_l_khuyet_goc",
    "name": "Nhà Chữ L Khuyết",
    "code": "MẪU 16 - LẤP GÓC KHUYẾT BẰNG THỦY MỘC",
    "summary": "Hóa giải Lưỡi Búa Sát (thế dao phay chém) của nhà chữ L bằng tiểu cảnh hồ nước và mái hiên vòm cân bằng trường khí.",
    "problem_analysis": "Nhà chữ L thiếu hẳn một góc cung bát quái, tạo thành mũi dao nhọn chém vào phòng ngủ gây bất hòa và suy sụp tài vận.",
    "engineering_standards": "Structural Geometric Regularity (TCVN 9386) • 《Hoàng Đế Trạch Kinh》",
    "formula": "Geometric Regularity Index Ir >= 0.85 | Cân bằng tâm cứng và tâm khối lượng",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <polygon points=\"120,60 520,60 520,200 320,200 320,380 120,380\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n        <text x=\"220\" y=\"220\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\">KHỐI CHỮ L</text>\n        <rect x=\"320\" y=\"200\" width=\"200\" height=\"180\" fill=\"#1E293B\" stroke=\"#10B981\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n        <circle cx=\"420\" cy=\"290\" r=\"50\" fill=\"#0284C7\" opacity=\"0.8\"/>\n        <text x=\"420\" y=\"295\" fill=\"#FEF3C7\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">HỒ CÁ KOI</text>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Lấp Góc Khuyết",
      "species": "Cây Lộc Vừng, Tùng La Hán, Cây Mai Vàng.",
      "distance": "Bố trí tại góc khuyết sân trong của chữ L.",
      "structure": "Cây dáng tròn đầy tạo điểm cân bằng thị giác và bổ sung năng lượng.",
      "benefit": "Bổ khuyết trọn vẹn cung bát quái bị thiếu hụt."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Mái Hiên Vòm & Tiểu Cảnh Thủy",
      "shape": "Lắp mái hiên vòm kính hoặc lam che kết nối 2 cánh chữ L tạo hình chữ nhật hoàn chỉnh.",
      "position": "Bố trí hồ cá Koi hoặc đài phun nước tròn tại tâm góc khuyết.",
      "structure": "Đèn chiếu sáng hướng thẳng đứng lên góc mái vào ban đêm.",
      "benefit": "Hóa giải hoàn toàn thế Lưỡi Búa Sát, gia đạo hòa thuận thịnh vượng."
    }
  },
  {
    "id": "nha_doi_dien_cot_dien",
    "name": "Đối Diện Cột Điện",
    "code": "MẪU 17 - BÌNH PHONG TÁN XẠ ĐIỆN TỪ",
    "summary": "Hóa giải Hỏa Sát / Xung Thiên Sát từ cột điện cao thế và biến áp ngay trước cổng nhà.",
    "problem_analysis": "Cột điện và máy biến áp phát ra bức xạ điện từ trường cực lớn làm nhiễu loạn sóng não, gây mất ngủ và căng thẳng.",
    "engineering_standards": "Electromagnetic Field Shielding (ICNIRP) • 《Dương Trạch Thập Thư》",
    "formula": "B \\propto 1/d^2 | Bình phong đặc và khoảng cách d >= 6.0m giảm 80% từ trường",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <line x1=\"120\" y1=\"50\" x2=\"120\" y2=\"390\" stroke=\"#EF4444\" stroke-width=\"8\"/>\n        <line x1=\"70\" y1=\"100\" x2=\"170\" y2=\"100\" stroke=\"#EF4444\" stroke-width=\"5\"/>\n        <rect x=\"30\" y=\"20\" width=\"180\" height=\"30\" rx=\"4\" fill=\"#7F1D1D\" stroke=\"#EF4444\"/>\n        <text x=\"120\" y=\"41\" fill=\"#FECACA\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">CỘT ĐIỆN HỎA SÁT</text>\n        <g transform=\"translate(250, 100)\">\n          <rect x=\"0\" y=\"20\" width=\"16\" height=\"210\" fill=\"#F59E0B\" stroke=\"#FEF3C7\" stroke-width=\"2\"/>\n          <text x=\"8\" y=\"10\" fill=\"#FBBF24\" font-size=\"14\" font-weight=\"800\" text-anchor=\"middle\">BÌNH PHONG</text>\n          <rect x=\"50\" y=\"0\" width=\"490\" height=\"250\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"295\" y=\"130\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">TRƯỜNG KHÍ ĐƯỢC BẢO VỆ</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Hấp Thụ Điện Từ",
      "species": "Cây Chuối Cảnh, Cây Lưỡi Hổ, Cây Cau Nga Mi.",
      "distance": "Trồng thành hàng rào xanh sát tường rào đối diện cột điện.",
      "structure": "Lá cây bản rộng chứa nhiều nước hoạt động như màn chắn sóng điện từ.",
      "benefit": "Giảm 70% cường độ bức xạ điện từ trường thâm nhập."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Tường Rào Tán Xạ & Gương Bát Quái",
      "shape": "Xây bình phong đặc cao 2.2m chắn thẳng tầm nhìn từ cửa chính ra cột điện.",
      "position": "Cửa chính mở lệch sang một bên cung sinh khí.",
      "structure": "Treo Gương Bát Quái Lồi trên mí cửa chính để tán xạ xung lực Hỏa Sát.",
      "benefit": "Bảo vệ giấc ngủ sâu và sức khỏe tinh thần cho cả gia đình."
    }
  },
  {
    "id": "nha_gan_nghia_trang_benh_vien",
    "name": "Gần Nghĩa Trang",
    "code": "MẪU 18 - VÀNH ĐAI TÙNG BÁCH DƯƠNG TÍNH",
    "summary": "Hóa giải Âm Khí Sát và u uất từ bệnh viện, nghĩa trang hoặc nhà tang lễ lân cận.",
    "problem_analysis": "Môi trường xung quanh có trường năng lượng âm tính cao làm giảm dương khí của người sống, gây u ám và trầm cảm.",
    "engineering_standards": "Psychological Environmental Lighting • 《Dương Trạch Thập Thư》",
    "formula": "Lux >= 300 Lux (Ánh sáng quang phổ vàng 3000K duy trì trường sinh khí Dương)",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <rect x=\"40\" y=\"100\" width=\"190\" height=\"230\" fill=\"#334155\"/>\n        <text x=\"135\" y=\"220\" fill=\"#CBD5E1\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">NGHĨA TRANG / ÂM KHÍ</text>\n        <g transform=\"translate(280, 80)\">\n          <rect x=\"0\" y=\"0\" width=\"24\" height=\"270\" fill=\"#10B981\" stroke=\"#34D399\" stroke-width=\"2\"/>\n          <text x=\"12\" y=\"140\" fill=\"#FEF3C7\" font-size=\"14\" font-weight=\"800\" transform=\"rotate(-90 12 140)\" text-anchor=\"middle\">VÀNH ĐAI TÙNG BÁCH</text>\n          <rect x=\"50\" y=\"20\" width=\"460\" height=\"230\" fill=\"#0F172A\" stroke=\"#F59E0B\" stroke-width=\"3\"/>\n          <text x=\"280\" y=\"140\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">GIA TRẠCH THUẦN DƯƠNG</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Dương Tính Cường Thịnh",
      "species": "Cây Tùng La Hán, Cây Bách Xanh, Cây Hoa Đào, Cây Ngải Cứu.",
      "distance": "Trồng thành hàng rào dày đặc bao bọc phía tiếp giáp khu âm khí.",
      "structure": "Lá kim chứa nhiều tinh dầu thơm tự nhiên tăng cường trường sinh khí Dương tính.",
      "benefit": "Đẩy lùi hoàn toàn tà khí và năng lượng âm u ám."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Ánh Sáng Quang Phổ Vàng & Cửa Hướng Nam",
      "shape": "Tường rào xây cao 2.2m - 2.5m; mở rộng cửa sổ đón nắng hướng Nam và Đông Nam.",
      "position": "Phòng thờ và phòng ngủ đặt tại vị trí cung Dương quang đãng nhất.",
      "structure": "Hệ thống chiếu sáng đèn vàng ấm 3000K bật liên tục ở sân trước ban đêm.",
      "benefit": "Duy trì trường khí gia trạch luôn ấm cúng, an lành và vượng phát."
    }
  },
  {
    "id": "nha_day_thung_lung_suong_mu",
    "name": "Đáy Thung Lũng",
    "code": "MẪU 19 - CỐT NỀN NÂNG & THÔNG KHÍ CƯỠNG BỨC",
    "summary": "Hóa giải khí tù đọng sương mù axit và độ ẩm cao quanh năm ở đáy thung lũng, lòng chảo đồi núi.",
    "problem_analysis": "Đáy thung lũng tích tụ khí nặng và sương mù độc hại không lưu thông, gây ẩm mốc và bệnh đường hô hấp.",
    "engineering_standards": "Valley Microclimate Ventilation • 《Hoàng Đế Trạch Kinh》",
    "formula": "Q_exhaust = 1500 m³/h | Quạt hút cưỡng bức tạo áp suất âm hút khí ẩm ra nóc",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <path d=\"M0,80 Q425,380 850,80 L850,460 L0,460 Z\" fill=\"#1E293B\"/>\n        <text x=\"425\" y=\"360\" fill=\"#CBD5E1\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">LÒNG CHẢO THUNG LŨNG (KHÍ TÙ ĐỌNG)</text>\n        <g transform=\"translate(300, 140)\">\n          <rect x=\"0\" y=\"40\" width=\"250\" height=\"140\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"125\" y=\"110\" fill=\"#FEF3C7\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">NÂNG NỀN CAO 1.5m</text>\n          <line x1=\"125\" y1=\"40\" x2=\"125\" y2=\"-20\" stroke=\"#F59E0B\" stroke-width=\"6\"/>\n          <rect x=\"50\" y=\"-55\" width=\"150\" height=\"28\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n          <text x=\"125\" y=\"-36\" fill=\"#FDE68A\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">HÚT KHÍ ẨM NÓC</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Hút Ẩm Thung Lũng",
      "species": "Cây Bạch Đàn, Cây Thông, Cây Tràm Gió.",
      "distance": "Trồng thưa thoáng quanh nhà để không cản trở gió lưu thông.",
      "structure": "Tán cây thoáng giúp ánh nắng chiếu rọi xuống sưởi ấm sân.",
      "benefit": "Làm khô ráo không khí và xua tan sương mù độc hại."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Nâng Nền & Quạt Hút Nóc",
      "shape": "Cốt nền tầng 1 nâng cao 1.2m - 1.5m so với mặt đất lòng chảo.",
      "position": "Mở cửa lớn ở hướng đón gió thông thung lũng.",
      "structure": "Lắp đặt quạt thông gió cưỡng bức trên nóc mái hút khí ẩm ra ngoài liên tục.",
      "benefit": "Đảm bảo không khí trong nhà luôn khô ráo và thoáng đãng."
    }
  },
  {
    "id": "nha_ven_bien_song_gio",
    "name": "Ven Biển Sóng Lớn",
    "code": "MẪU 20 - TƯỜNG CHẮN SÓNG 30° & BÊ TÔNG BỀN SUNFAT",
    "summary": "Thiết kế tường chắn sóng nghiêng 30° triệt tiêu năng lượng sóng biển và chống ăn mòn muối biển cho nhà sát mép nước.",
    "problem_analysis": "Sóng biển đánh trực diện vào chân móng gây xói lở dữ dội, hơi muối biển ăn mòn phá hủy cốt thép bê tông nhanh gấp 5 lần.",
    "engineering_standards": "Coastal Engineering Manual (USACE) • TCVN 9346",
    "formula": "F_wave = 0.5 * \\rho * g * H_w^2 | Tường nghiêng 30° giảm 75% lực va đập của sóng",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 460\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#090D16; border-radius:10px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        <path d=\"M0,280 Q200,240 400,280 L400,460 L0,460 Z\" fill=\"#0284C7\" opacity=\"0.85\"/>\n        <text x=\"140\" y=\"360\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\">SÓNG BIỂN VA ĐẬP</text>\n        <polygon points=\"320,400 420,200 460,200 460,400\" fill=\"#475569\" stroke=\"#FEF3C7\" stroke-width=\"2.5\"/>\n        <rect x=\"300\" y=\"240\" width=\"150\" height=\"28\" rx=\"4\" fill=\"#78350F\" stroke=\"#F59E0B\"/>\n        <text x=\"375\" y=\"259\" fill=\"#FDE68A\" font-size=\"13\" font-weight=\"800\" text-anchor=\"middle\">KÈ NGHIÊNG 30°</text>\n        <g transform=\"translate(500, 90)\">\n          <rect x=\"0\" y=\"0\" width=\"310\" height=\"260\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"3\"/>\n          <text x=\"155\" y=\"130\" fill=\"#FEF3C7\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">BIỆT THỰ BIỂN BỀN VỮNG</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Chịu Mặn Ven Biển",
      "species": "Cây Phi Lao, Cây Mù U, Cây Dừa Biển, Cây Bàng Vuông.",
      "distance": "Trồng thành rừng phòng hộ dày 10m - 15m phía trước mép sóng.",
      "structure": "Rễ bám sâu vào cát, tán dẻo chịu đựng bão biển cấp 12.",
      "benefit": "Tiêu tán 80% năng lượng sóng thần và gió muối biển."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Bê Tông Bền Sunfat & Sơn Phủ Kỵ Nước",
      "shape": "Tường chắn sóng dốc nghiêng 30° khiến sóng trượt lên và tự triệt tiêu năng lượng.",
      "position": "Công trình lùi sâu sau hàng rào rừng phòng hộ.",
      "structure": "Sử dụng xi măng bền sunfat PCSR, lớp bê tông bảo vệ cốt thép dày >= 50mm.",
      "benefit": "Công trình trơ vững trước sóng gió và hơi muối biển qua nhiều thập kỷ."
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
