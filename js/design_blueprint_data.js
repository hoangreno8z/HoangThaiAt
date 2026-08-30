/**
 * DỮ LIỆU CÔNG CỤ: GỢI Ý THIẾT KẾ KHÍ ĐỘNG HỌC & CỔ TRUYỀN TOÀN THƯ (20 BẢN VẼ ARCHITECTURAL CAD BLUEPRINTS)
 * Tích hợp toàn diện 6 Đại Nguyên Lý Cốt Lõi (Cổ Thư & Khí Động Học),
 * 20 Bộ Bản Vẽ Mẫu Chuẩn Kỹ Thuật (Nét Vẽ Mảnh CAD 0.8-1.5px, Tỷ Lệ Kiến Trúc Chuẩn, Phối Màu Dịu Mắt),
 * và Ma Trận 10 Đại Rủi Ro Xây Dựng Thực Tế.
 */

const DESIGN_BLUEPRINT_THEORY = {
  "title": "Lý Thuyết Khí Động Học & Cổ Thư Phong Thủy Trị Thiên Tai",
  "sections": [
    {
      "id": "bernoulli_uplift",
      "title": "1. Bản Chất Sự Cố Tốc Mái Bão & Lực Nâng Bernoulli",
      "classic_source": "《葬書》 (Táng Thư - Quách Phác: Khí Thừa Phong Tắc Tán & Quát Cốt Phong)",
      "physics_law": "Định Luật Bernoulli: Áp Suất Động & Chênh Lệch Áp Suất Âm Mái Nhà (ΔP = 0.5 * ρ * (v_top^2 - v_in^2))",
      "mechanism": "Khi luồng gió bão giật với vận tốc cao (cấp 10-12, v = 28 - 35 m/s) lướt qua nóc nhà, các đường dòng không khí bị bóp nghẽn và tăng tốc trên bề mặt mái. Theo định luật Bernoulli, vận tốc gió càng tăng thì áp suất tĩnh phía trên mái càng giảm sâu tạo thành vùng Áp Suất Âm (Suction/Uplift). Trong khi đó, không khí bên trong nhà vẫn duy trì áp suất dương. Sự chênh lệch áp suất khổng lồ này sinh ra LỰC NÂNG BỐC MÁI lên tới hàng trăm kg/m2, đủ sức bẻ gãy đinh vít và cuốn bay toàn bộ mái tôn hoặc mái ngói.",
      "classical_view": "Quách Phác trong 《Táng Thư》 cảnh báo: 'Khí thừa phong tắc tán' — Khí gặp gió cuồng loạn ắt bị xé tan. Phong thủy tối kỵ thế 'Quát Cốt Phong' (gió cạo xương) là luồng gió mạnh di chuyển thẳng tắp với gia tốc cực nhanh phá nát sinh khí và kết cấu gia trạch.",
      "remedy_principle": "1. Cân bằng áp suất trong - ngoài: Bố trí lam gió hở vĩnh viễn ở vách dưới mái hoặc khe thoát áp mặt khuất gió (Leeward); khi bão đến không đóng kín bưng 100%, hé cửa mặt sau để xả áp suất dương bên trong.\n2. Khí động học góc dốc mái: Sử dụng Mái Bốn Mái (Mái Hiệp/Bát Giác) độ dốc 30° - 35°. Luồng khí trượt êm ôm sát mái, triệt tiêu vùng xoáy tách dòng và giảm 50% - 70% lực bốc mái so với mái dốc hai phía hoặc mái phẳng."
    },
    {
      "id": "venturi_downwash",
      "title": "2. Gió Luồn Khe Hẹp (Venturi) & Gió Cuộn Thác Đổ (Downwash Dưới Chân Cao Ốc)",
      "classic_source": "《黃帝宅經》 (Hoàng Đế Trạch Kinh: Thiên Trảm Sát & Tứ Diện Phong Ao)",
      "physics_law": "Hiệu Ứng Phễu Gió Venturi (A1*v1 = A2*v2) & Hiện Tượng Gió Cuộn Đảo Dòng (Corner Downwash Vortex)",
      "mechanism": "Khi khối không khí khổng lồ của bão đập vào mặt đứng của tòa nhà cao tầng, luồng gió bị nén dội ngược thẳng đứng xuống mặt đất với vận tốc cực lớn (Gió Cuộn Thác Đổ - Downwash). Đồng thời, khi luồng gió này bị ép qua khe hẹp giữa 2 khối nhà cao tầng, thiết diện lưu thông bị co hẹp làm vận tốc gió tăng vọt từ 1.5 đến 2.5 lần (Hiệu ứng Phễu Gió Venturi), tạo thành những luồng xoáy xé toạc cửa sổ, giật bung mái hiên và quật ngã người đi bộ.",
      "classical_view": "《Hoàng Đế Trạch Kinh》 chỉ rõ: Nhà nằm đối diện khe hẹp giữa 2 tòa nhà lớn phạm vào thế 'Thiên Trảm Sát' (Thanh đao của Trời chém xuống), dẫn đến khí tán gia bại. Nhà trơ trọi giữa đất trống phạm thế 'Tứ Diện Phong Ao' (Bốn bề gió quật), kết cấu nhanh suy đổ.",
      "remedy_principle": "1. Mái đón sảnh chữ V hất ngược: Lắp đặt mái sảnh cong chữ V nghiêng 15° tại mặt tiền để hứng và hất ngược luồng gió Downwash lên trên.\n2. Vát cong bo tròn góc tường (R >= 50cm): Triệt tiêu điểm tụ áp suất cao, xé luồng khí nén rẽ sang 2 bên.\n3. Tiền sảnh thụt lùi (1.5m - 2.0m) kết hợp Tấm bình phong tán khí: Tạo vùng đệm khí tĩnh bảo vệ cánh cửa chính."
    },
    {
      "id": "stack_effect_cooling",
      "title": "3. Cơ Chế Thoát Hơi Nóng Mùa Hè & Trị Gió Phơn Tây Nam (Gió Lào)",
      "classic_source": "《考工記》 (Khảo Công Ký: Thiên Tỉnh Thiên Tâm) & 《陽宅十書》 (Dương Trạch Thập Thư: Thủy Khí Hạ Nhiệt)",
      "physics_law": "Hiệu Ứng Cột Áp Ống Khói (Thermal Stack Effect: ΔP = ρ * g * H * ΔT / T) & Đối Lưu Nhiệt Tự Nhiên",
      "mechanism": "Vào mùa hè và khi có gió Phơn Tây Nam (Gió Lào), không khí trong nhà bị hun nóng bởi bức xạ mặt trời. Không khí nóng có khối lượng riêng nhẹ hơn sẽ bốc lên cao tích tụ sát trần nhà. Cơ chế thoát nhiệt tự nhiên hiệu quả nhất là tạo độ chênh áp suất nhiệt (Hiệu Ứng Ống Khói): Mở cửa thoát khí nóng trên đỉnh mái (Giếng trời) và mở cửa đón khí mát ở chân tường tầng trệt.",
      "classical_view": "Cổ nhân thiết kế nhà truyền thống luôn có 'Thiên Tỉnh' (Giếng trời) ở Trung Cung để âm dương giao hòa, đón gió mát và thoát nhiệt; phía trước hoặc góc Tây Nam luôn bố trí ao hồ bán nguyệt để nước bốc hơi làm mát luồng gió trước khi vào nhà.",
      "remedy_principle": "1. Giếng trời trung tâm (Thiên Tỉnh) có cửa chớp thoát nhiệt trên nóc: Tạo lực hút đối lưu liên tục 24/7.\n2. Mái 2 lớp cách nhiệt: Lớp ngói trên và lớp trần dưới cách nhau 10-15cm có luồng khí lưu thông giải nhiệt.\n3. Mặt nước ao hồ/tiểu cảnh góc Tây Nam: Hạ nhiệt độ gió vào nhà từ 3°C - 5°C."
    },
    {
      "id": "conical_vortex",
      "title": "4. Hiệu Ứng Cắt Gió Góc Mái & Bung Mép Tôn (Conical Corner Vortices)",
      "classic_source": "《營造法式》 (Doanh Tạo Pháp Thức: Đẩu Củng Phi Diêm & Ngõa Trích Thủy)",
      "physics_law": "Hiện Tượng Xoáy Nón Khí Động Học Góc Mái (Conical Edge Vortices Peak Suction)",
      "mechanism": "Khi gió bão thổi xiên góc 45° vào góc công trình, dòng khí bị tách đôi cuốn tròn dọc theo 2 mép diềm mái tạo thành cặp Xoáy Nón. Vùng tâm xoáy nón này có áp suất âm cục bộ gấp 2.5 - 3.0 lần so với vùng giữa mái, làm bung đinh vít mép tôn đầu tiên rồi lật tung toàn bộ mái.",
      "classical_view": "Kiến trúc cổ truyền trong 《Doanh Tạo Pháp Thức》 uốn cong góc mái (Phi Diêm) và dùng hàng ngói câu đầu trích thủy nặng đè mép mái để triệt tiêu góc chết tụ xoáy.",
      "remedy_principle": "1. Bố trí gờ chắn gió dốc 15° dọc viền mái.\n2. Gia cố mật độ đinh vít ke chống bão tại dải biên 1.5m quanh mái với khoảng cách < 40cm."
    },
    {
      "id": "internal_pressurization",
      "title": "5. Vỡ Kính Mặt Đón Gió Làm Bùng Nổ Áp Suất Trong (Internal Pressurization)",
      "classic_source": "《黃帝宅經》 (Môn Khẩu Trực Xung Thất Khí & Tụ Khí Tàng Phong)",
      "physics_law": "Hiện Tượng Đột Biến Áp Suất Buồng Kín (Building Envelope Breach & Internal Pressurization Surge)",
      "mechanism": "Khi cửa sổ hoặc cửa đi mặt đón gió bị bão giật vỡ do mảnh vụn văng đập, khối không khí áp suất dương khổng lồ tràn vào nhà làm áp suất trong buồng kín tăng vọt (+0.8 Cp). Áp suất đẩy từ bên trong kết hợp với áp suất hút âm bên trên mái (-1.0 Cp) tạo lực xé toạc mái từ dưới lên trên chỉ trong vài giây.",
      "classical_view": "Cổ thư coi cửa chính là 'Khẩu' nạp khí; nếu Khẩu bị xung phá trực diện thì sinh khí tan biến, gia trạch đổ vỡ.",
      "remedy_principle": "1. Sử dụng kính dán an toàn 2 lớp dày 10.38mm có màng film PVB chống vỡ vụn.\n2. Cửa cuốn khe thoáng có thanh chống bão ray sâu > 75mm và chốt âm sàn 3 điểm."
    },
    {
      "id": "dew_point_condensation",
      "title": "6. Gió Nồm Ẩm Bão Hòa & Hiện Tượng Đọng Sương Sàn Nhà (Dew Point Condensation)",
      "classic_source": "《陽宅十書》 (Ẩm Khí Trọc Thủy Đọng Nền & Cách Ẩm Hóa Thổ)",
      "physics_law": "Hiện Tượng Ngưng Tụ Điểm Sương (Dew Point Psychrometric Condensation & Thermal Mass Lag)",
      "mechanism": "Vào mùa xuân tại Miền Bắc và Bắc Trung Bộ, gió Đông Nam mang khối khí có độ ẩm tương đối > 95% tràn vào nhà. Mặt sàn bê tông và tường đá có quán tính nhiệt lớn nên nhiệt độ bề mặt vẫn lạnh hơn nhiệt độ điểm sương của không khí, khiến hơi nước ngưng tụ thành vũng gây ẩm mốc, trơn trượt và hư hỏng thiết bị điện tử.",
      "classical_view": "《Dương Trạch Thập Thư》 xếp ẩm thấp nền nhà vào 'Trọc Thủy Sát', làm suy giảm chính khí và phát sinh bệnh tật.",
      "remedy_principle": "1. Lớp đệm xỉ than hoặc đất sét nung cách nhiệt dưới sàn dày 15-20cm chống cầu lạnh.\n2. Màng chống ẩm PE 2 lớp lót trước khi đổ bê tông lót sàn.\n3. Đóng kín cửa hướng Đông Nam trong những ngày nồm ẩm, chỉ mở cửa thông gió cưỡng bức mặt Bắc."
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        \n        <!-- NỀN ĐẤT & CAO ĐỘ -->\n        <rect x=\"30\" y=\"350\" width=\"790\" height=\"70\" fill=\"url(#soilHatch)\"/>\n        <line x1=\"30\" y1=\"350\" x2=\"820\" y2=\"350\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"815\" y=\"344\" fill=\"#64748B\" font-size=\"11\" font-family=\"monospace\" text-anchor=\"end\">±0.000 (CỐT TỰ NHIÊN)</text>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT A-A: KHÍ ĐỘNG HỌC MÁI BỐN MÁI & PHONG ĐAI</text>\n\n        <!-- ĐAI TRE PHÂN TẦNG (2 TẦNG: BỤI THẤP & TRE NGÀ THÂN DẺO) -->\n        <g transform=\"translate(50, 160)\">\n          <!-- Cây bụi cản gió sát đất -->\n          <path d=\"M15,190 Q35,150 55,190\" fill=\"rgba(16,185,129,0.12)\" stroke=\"#10B981\" stroke-width=\"1\"/>\n          <path d=\"M45,190 Q65,140 85,190\" fill=\"rgba(16,185,129,0.12)\" stroke=\"#10B981\" stroke-width=\"1\"/>\n          <!-- Tre ngà uốn dẻo -->\n          <path d=\"M95,190 Q120,60 90,-20\" fill=\"none\" stroke=\"#059669\" stroke-width=\"2\"/>\n          <circle cx=\"90\" cy=\"-20\" r=\"24\" fill=\"rgba(16,185,129,0.18)\" stroke=\"#34D399\" stroke-width=\"1\"/>\n          <path d=\"M125,190 Q150,40 120,-40\" fill=\"none\" stroke=\"#059669\" stroke-width=\"2.5\"/>\n          <circle cx=\"120\" cy=\"-40\" r=\"28\" fill=\"rgba(16,185,129,0.22)\" stroke=\"#34D399\" stroke-width=\"1\"/>\n          <!-- Chỉ dẫn -->\n          <line x1=\"120\" y1=\"-40\" x2=\"120\" y2=\"-75\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"120\" y1=\"-75\" x2=\"175\" y2=\"-75\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"180\" y=\"-71\" fill=\"#34D399\" font-size=\"11\" font-weight=\"600\">Đai Tre Phân Tầng (h=7.5m, L=12m)</text>\n          <text x=\"180\" y=\"-57\" fill=\"#94A3B8\" font-size=\"9.5\">Tiêu giảm 55% động năng bão trước mặt tiền</text>\n        </g>\n\n        <!-- ĐƯỜNG DÒNG KHÍ ĐỘNG HỌC LƯỚT QUA NÓC -->\n        <path d=\"M20,230 C150,210 200,90 380,70 C510,55 660,85 830,105\" fill=\"none\" stroke=\"#38BDF8\" stroke-width=\"1.8\" stroke-dasharray=\"6,4\" marker-end=\"url(#arrowCyan)\"/>\n        <path d=\"M20,260 C150,240 200,120 380,100 C510,85 660,110 830,130\" fill=\"none\" stroke=\"#38BDF8\" stroke-width=\"1.2\" stroke-dasharray=\"6,4\" marker-end=\"url(#arrowCyan)\"/>\n        <text x=\"30\" y=\"215\" fill=\"#38BDF8\" font-size=\"10.5\" font-weight=\"600\">Gió Bão Cấp 12 (v=35m/s) →</text>\n\n        <!-- NGÔI NHÀ 2 TẦNG MÁI BỐN MÁI 32° (BẢN VẼ MẶT CẮT ARCHITECTURAL CAD) -->\n        <g transform=\"translate(380, 110)\">\n          <!-- Móng đài kiềng BTCT -->\n          <rect x=\"20\" y=\"240\" width=\"380\" height=\"15\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"1\"/>\n          <!-- Cột bê tông & tường -->\n          <rect x=\"40\" y=\"80\" width=\"14\" height=\"160\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"1\"/>\n          <rect x=\"360\" y=\"80\" width=\"14\" height=\"160\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"1\"/>\n          <rect x=\"54\" y=\"90\" width=\"306\" height=\"150\" fill=\"rgba(15,23,42,0.4)\" stroke=\"#334155\" stroke-width=\"0.8\"/>\n          <!-- Sàn tầng 2 -->\n          <line x1=\"40\" y1=\"160\" x2=\"374\" y2=\"160\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n          <text x=\"45\" y=\"155\" fill=\"#64748B\" font-size=\"9\" font-family=\"monospace\">+3.600</text>\n          <text x=\"45\" y=\"75\" fill=\"#64748B\" font-size=\"9\" font-family=\"monospace\">+7.200</text>\n\n          <!-- Dầm giằng BTCT neo xà gồ -->\n          <rect x=\"20\" y=\"75\" width=\"380\" height=\"10\" fill=\"#334155\" stroke=\"#F59E0B\" stroke-width=\"0.8\"/>\n          <!-- Cửa đi và cửa sổ thanh mảnh -->\n          <rect x=\"65\" y=\"175\" width=\"40\" height=\"65\" fill=\"#0F172A\" stroke=\"#F59E0B\" stroke-width=\"0.8\"/>\n          <text x=\"85\" y=\"210\" fill=\"#FBBF24\" font-size=\"9\" text-anchor=\"middle\">SẢNH</text>\n          <rect x=\"230\" y=\"180\" width=\"50\" height=\"40\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"0.8\"/>\n          <line x1=\"255\" y1=\"180\" x2=\"255\" y2=\"220\" stroke=\"#38BDF8\" stroke-width=\"0.6\"/>\n\n          <!-- HỆ VÌ KÈO MÁI BỐN MÁI DỐC 32° -->\n          <polygon points=\"210,-20 10,75 410,75\" fill=\"rgba(180,83,9,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n          <!-- Thanh giằng vì kèo -->\n          <line x1=\"210\" y1=\"-20\" x2=\"210\" y2=\"75\" stroke=\"#94A3B8\" stroke-width=\"0.8\" stroke-dasharray=\"3,3\"/>\n          <line x1=\"110\" y1=\"28\" x2=\"210\" y2=\"75\" stroke=\"#94A3B8\" stroke-width=\"0.8\"/>\n          <line x1=\"310\" y1=\"28\" x2=\"210\" y2=\"75\" stroke=\"#94A3B8\" stroke-width=\"0.8\"/>\n          \n          <!-- Lam xả áp mặt khuất gió -->\n          <rect x=\"350\" y=\"77\" width=\"22\" height=\"7\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"0.8\"/>\n          <!-- Ký hiệu góc dốc 32° -->\n          <path d=\"M45,75 A40,40 0 0,0 72,55\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"1.2\"/>\n          <text x=\"78\" y=\"66\" fill=\"#FDE68A\" font-size=\"10.5\" font-weight=\"600\">32°</text>\n\n          <!-- Đường gióng chỉ dẫn kỹ thuật -->\n          <line x1=\"210\" y1=\"-20\" x2=\"210\" y2=\"-55\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"210\" y1=\"-55\" x2=\"270\" y2=\"-55\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"275\" y=\"-51\" fill=\"#FDE68A\" font-size=\"11\" font-weight=\"600\">Mái Bốn Mái 32° (Hệ Số C_pe = -0.35)</text>\n          <text x=\"275\" y=\"-38\" fill=\"#94A3B8\" font-size=\"9.5\">Giảm 65% áp suất âm bốc mái so với mái 2 dốc</text>\n\n          <line x1=\"360\" y1=\"80\" x2=\"415\" y2=\"80\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"420\" y=\"83\" fill=\"#38BDF8\" font-size=\"10.5\" font-weight=\"600\">Lam Thoát Áp Leeward</text>\n\n          <line x1=\"210\" y1=\"80\" x2=\"210\" y2=\"105\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"210\" y1=\"105\" x2=\"275\" y2=\"105\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"280\" y=\"109\" fill=\"#CBD5E1\" font-size=\"10.5\">Dầm BTCT Neo Xà Gồ Thép D10</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        \n        <!-- MẶT ĐẤT -->\n        <rect x=\"30\" y=\"360\" width=\"790\" height=\"60\" fill=\"url(#soilHatch)\"/>\n        <line x1=\"30\" y1=\"360\" x2=\"820\" y2=\"360\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"815\" y=\"354\" fill=\"#64748B\" font-size=\"11\" font-family=\"monospace\" text-anchor=\"end\">±0.000</text>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: HIỆU ỨNG DOWNWASH & MÁI ĐÓN CÁNH CHIM CHỮ V</text>\n\n        <!-- CAO ỐC CHUNG CƯ BÊN CẠNH (H=75m) -->\n        <g transform=\"translate(40, 50)\">\n          <rect x=\"0\" y=\"0\" width=\"180\" height=\"310\" fill=\"#111827\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n          <text x=\"90\" y=\"24\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CAO ỐC (H=75m)</text>\n          <!-- Các tầng cửa sổ thanh mảnh -->\n          <g fill=\"none\" stroke=\"#334155\" stroke-width=\"0.8\">\n            <rect x=\"20\" y=\"45\" width=\"35\" height=\"20\"/><rect x=\"70\" y=\"45\" width=\"35\" height=\"20\"/><rect x=\"120\" y=\"45\" width=\"35\" height=\"20\"/>\n            <rect x=\"20\" y=\"85\" width=\"35\" height=\"20\"/><rect x=\"70\" y=\"85\" width=\"35\" height=\"20\"/><rect x=\"120\" y=\"85\" width=\"35\" height=\"20\"/>\n            <rect x=\"20\" y=\"125\" width=\"35\" height=\"20\"/><rect x=\"70\" y=\"125\" width=\"35\" height=\"20\"/><rect x=\"120\" y=\"125\" width=\"35\" height=\"20\"/>\n            <rect x=\"20\" y=\"165\" width=\"35\" height=\"20\"/><rect x=\"70\" y=\"165\" width=\"35\" height=\"20\"/><rect x=\"120\" y=\"165\" width=\"35\" height=\"20\"/>\n            <rect x=\"20\" y=\"205\" width=\"35\" height=\"20\"/><rect x=\"70\" y=\"205\" width=\"35\" height=\"20\"/><rect x=\"120\" y=\"205\" width=\"35\" height=\"20\"/>\n            <rect x=\"20\" y=\"245\" width=\"35\" height=\"20\"/><rect x=\"70\" y=\"245\" width=\"35\" height=\"20\"/><rect x=\"120\" y=\"245\" width=\"35\" height=\"20\"/>\n          </g>\n        </g>\n\n        <!-- LUỒNG GIÓ DOWNWASH DỘI XUỐNG -->\n        <path d=\"M10,110 L180,110 Q225,110 225,170 L225,320\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"2\" stroke-dasharray=\"6,4\" marker-end=\"url(#arrowRed)\"/>\n        <line x1=\"225\" y1=\"190\" x2=\"270\" y2=\"190\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n        <text x=\"275\" y=\"194\" fill=\"#F87171\" font-size=\"11\" font-weight=\"600\">Gió Dội Downwash (v=24m/s) ↓</text>\n\n        <!-- HÀNG CÂY CAU VUA TÁN NGANG XÉ GIÓ -->\n        <g transform=\"translate(260, 240)\">\n          <line x1=\"20\" y1=\"120\" x2=\"20\" y2=\"20\" stroke=\"#047857\" stroke-width=\"2.5\"/>\n          <ellipse cx=\"20\" cy=\"20\" rx=\"28\" ry=\"12\" fill=\"rgba(16,185,129,0.18)\" stroke=\"#10B981\" stroke-width=\"1\"/>\n          <text x=\"20\" y=\"135\" fill=\"#34D399\" font-size=\"10\" text-anchor=\"middle\">Cau Vua (Xé Dòng)</text>\n        </g>\n\n        <!-- NGÔI NHÀ 3 TẦNG VỚI MÁI ĐÓN CÁNH CHIM CHỮ V CONSON -->\n        <g transform=\"translate(370, 130)\">\n          <!-- Thân nhà bo tròn góc R=80cm -->\n          <path d=\"M40,10 Q0,10 0,45 L0,230 L390,230 L390,10 Z\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          \n          <!-- Phân tầng sàn 1, 2, 3 -->\n          <line x1=\"0\" y1=\"85\" x2=\"390\" y2=\"85\" stroke=\"#334155\" stroke-width=\"1\"/>\n          <line x1=\"0\" y1=\"155\" x2=\"390\" y2=\"155\" stroke=\"#334155\" stroke-width=\"1\"/>\n          <text x=\"15\" y=\"80\" fill=\"#64748B\" font-size=\"9\" font-family=\"monospace\">+7.200</text>\n          <text x=\"15\" y=\"150\" fill=\"#64748B\" font-size=\"9\" font-family=\"monospace\">+3.600</text>\n\n          <!-- HỆ MÁI ĐÓN CÁNH CHIM CHỮ V CONSON VƯƠN 2.8m -->\n          <line x1=\"0\" y1=\"80\" x2=\"-55\" y2=\"50\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <polygon points=\"-65,35 20,60 -15,80\" fill=\"rgba(2,132,199,0.25)\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          \n          <!-- Dòng gió bị hất ngược lên trời -->\n          <path d=\"M-35,75 Q-50,30 25,-15\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"1.8\" stroke-dasharray=\"5,3\" marker-end=\"url(#arrowGreen)\"/>\n          <text x=\"35\" y=\"-15\" fill=\"#34D399\" font-size=\"11\" font-weight=\"600\">Hất Ngược Gió Dội ↑</text>\n\n          <!-- Sảnh lùi 2m -->\n          <rect x=\"25\" y=\"170\" width=\"45\" height=\"60\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"0.8\"/>\n          <text x=\"47\" y=\"205\" fill=\"#FBBF24\" font-size=\"9.5\" text-anchor=\"middle\">Sảnh Lùi</text>\n\n          <!-- Đường gióng chỉ dẫn kỹ thuật -->\n          <line x1=\"-55\" y1=\"50\" x2=\"-55\" y2=\"20\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"-55\" y1=\"20\" x2=\"20\" y2=\"20\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"25\" y=\"24\" fill=\"#7DD3FC\" font-size=\"11\" font-weight=\"600\">Mái Đón Cánh Chim Chữ V 15° (Conson 2.8m)</text>\n\n          <line x1=\"0\" y1=\"45\" x2=\"-30\" y2=\"45\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"-35\" y=\"49\" fill=\"#CBD5E1\" font-size=\"10\" text-anchor=\"end\">Bo Góc R=80cm</text>\n        </g>\n      </svg>\n    ",
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
    "id": "nha_dau_hem_ngaba",
    "name": "Nhà Đầu Hẻm",
    "code": "MẪU 03 - BÌNH PHONG KHÚC CHIẾT & CỬA LỆCH TRỤC",
    "summary": "Hóa giải xung lực khí động học Thương Phong Sát từ ngã ba hoặc con hẻm dài đâm thẳng trục tim nhà theo nguyên lý khúc chiết tụ khí.",
    "problem_analysis": "Con hẻm dài hoạt động như ống nén khí gia tốc luồng gió đâm trực diện vào cửa chính, cướp sạch nhiệt năng và mang bụi bặm ô nhiễm.",
    "engineering_standards": "Fluid Dynamics Pipe Flow • 《Dương Trạch Thập Thư》",
    "formula": "\\Delta P_impact = 0.5 * \\rho * v^2 | Bình phong hoa gió tán 75% động năng trực xung",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT BẰNG QUY HOẠCH: HÓA GIẢI THƯƠNG PHONG SÁT ĐẦU HẺM</text>\n        \n        <!-- CON HẺM DÀI NÉN KHÍ -->\n        <rect x=\"40\" y=\"160\" width=\"260\" height=\"120\" fill=\"#111827\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"170\" y=\"225\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CON HẺM DÀI (ỐNG NÉN KHÍ)</text>\n        <path d=\"M50,220 L300,220\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"2\" stroke-dasharray=\"6,4\" marker-end=\"url(#arrowRed)\"/>\n        <text x=\"170\" y=\"195\" fill=\"#F87171\" font-size=\"10.5\" text-anchor=\"middle\">Luồng Trực Xung (Thương Phong Sát) →</text>\n\n        <!-- MẶT TIỀN NHÀ CÓ BÌNH PHONG KHÚC CHIẾT VÀ CỬA LỆCH -->\n        <g transform=\"translate(320, 80)\">\n          <rect x=\"0\" y=\"0\" width=\"480\" height=\"280\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"240\" y=\"30\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">MẶT BẰNG KHUÔN VIÊN TRƯỚC SẢNH</text>\n          \n          <!-- Bức bình phong hoa gió gốm đất nung -->\n          <rect x=\"45\" y=\"80\" width=\"12\" height=\"120\" fill=\"#B45309\" stroke=\"#FEF3C7\" stroke-width=\"1\"/>\n          <line x1=\"51\" y1=\"80\" x2=\"51\" y2=\"50\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"51\" y1=\"50\" x2=\"110\" y2=\"50\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"115\" y=\"54\" fill=\"#FDE68A\" font-size=\"11\" font-weight=\"600\">Bình Phong Hoa Gió (Cao 2.2m, Thoáng 25%)</text>\n\n          <!-- Bồn trúc quân tử tán mỏng -->\n          <circle cx=\"35\" cy=\"50\" r=\"15\" fill=\"rgba(16,185,129,0.15)\" stroke=\"#10B981\" stroke-width=\"0.8\"/>\n          <circle cx=\"35\" cy=\"230\" r=\"15\" fill=\"rgba(16,185,129,0.15)\" stroke=\"#10B981\" stroke-width=\"0.8\"/>\n          <text x=\"35\" y=\"260\" fill=\"#34D399\" font-size=\"10\" text-anchor=\"middle\">Trúc Quân Tử</text>\n\n          <!-- Dòng khí bẻ gãy uốn lượn chữ S -->\n          <path d=\"M-10,140 Q40,140 40,85 Q40,35 100,55 Q160,75 160,125\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"2\" marker-end=\"url(#arrowGreen)\"/>\n          <rect x=\"175\" y=\"85\" width=\"25\" height=\"80\" fill=\"#1E293B\" stroke=\"#34D399\" stroke-width=\"1\"/>\n          <text x=\"187\" y=\"130\" fill=\"#6EE7B7\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Cửa Lệch</text>\n\n          <line x1=\"187\" y1=\"85\" x2=\"187\" y2=\"60\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"187\" y1=\"60\" x2=\"250\" y2=\"60\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"255\" y=\"64\" fill=\"#38BDF8\" font-size=\"11\">Cửa Chính Đặt Lệch Tim Hẻm (Khúc Chiết Tụ Khí)</text>\n        </g>\n      </svg>\n    ",
    "tree_guidelines": {
      "title": "Quy Chuẩn Cây Xanh Lọc Khí & Giảm Tốc",
      "species": "Trúc Quân Tử, Trắc Bách Diệp, Cây Dâm Bụt, Hoa Giấy.",
      "distance": "Bố trí thành bồn hoa/vách cây xanh ngay trước sảnh đệm.",
      "structure": "Tán cây xốp đan xen tạo màng lọc cơ học bẻ gãy xung lực của luồng khí thẳng.",
      "benefit": "Giữ bụi mịn, giảm 50% vận tốc gió đâm thẳng vào cửa."
    },
    "architecture_guidelines": {
      "title": "Quy Chuẩn Bình Phong Khúc Chiết",
      "shape": "Bình phong hoa gió/đá cao 1.8m - 2.2m, rộng hơn cửa chính 0.5m mỗi bên.",
      "position": "Đặt cách cửa chính 1.8m - 2.5m chắn thẳng trục tim con hẻm; cửa chính mở lệch bên.",
      "structure": "Tường hoa gió có lỗ thoáng 25% để khí lưu thông êm ái.",
      "benefit": "Biến luồng sát khí trực xung thành dòng sinh khí uốn lượn hình chữ S."
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        \n        <rect x=\"30\" y=\"360\" width=\"790\" height=\"60\" fill=\"url(#soilHatch)\"/>\n        <line x1=\"30\" y1=\"360\" x2=\"820\" y2=\"360\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: ĐỐI LƯU NHIỆT GIẾNG TRỜI & HỒ NƯỚC VI KHÍ HẬU</text>\n\n        <!-- AO NƯỚC TÂY NAM -->\n        <g transform=\"translate(40, 310)\">\n          <path d=\"M0,30 Q90,0 180,30 L180,50 L0,50 Z\" fill=\"rgba(2,132,199,0.25)\" stroke=\"#38BDF8\" stroke-width=\"1\"/>\n          <text x=\"90\" y=\"32\" fill=\"#7DD3FC\" font-size=\"10.5\" text-anchor=\"middle\">Ao Nước Tây Nam (Hạ -4°C)</text>\n          <path d=\"M80,10 C140,-5 180,5 250,15\" fill=\"none\" stroke=\"#38BDF8\" stroke-width=\"1.5\" marker-end=\"url(#arrowCyan)\"/>\n          <text x=\"170\" y=\"-5\" fill=\"#38BDF8\" font-size=\"10\">Gió Mát Vào Cửa Trệt →</text>\n        </g>\n\n        <!-- NHÀ PHỐ VỚI GIẾNG TRỜI THIÊN TÂM VÀ MÁI 2 LỚP -->\n        <g transform=\"translate(300, 90)\">\n          <rect x=\"0\" y=\"60\" width=\"500\" height=\"210\" fill=\"#0F172A\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n          \n          <!-- Mái 2 lớp cách nhiệt -->\n          <polygon points=\"250,-20 -20,60 520,60\" fill=\"rgba(180,83,9,0.15)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n          <line x1=\"-15\" y1=\"48\" x2=\"515\" y2=\"48\" stroke=\"#F59E0B\" stroke-width=\"1\"/>\n          <text x=\"250\" y=\"40\" fill=\"#FDE68A\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Lớp Đệm Khí Giải Nhiệt Mái 12cm (-6°C)</text>\n\n          <!-- Giếng trời trung tâm -->\n          <rect x=\"205\" y=\"50\" width=\"90\" height=\"220\" fill=\"rgba(30,41,59,0.35)\" stroke=\"#38BDF8\" stroke-width=\"0.8\" stroke-dasharray=\"4,4\"/>\n          <text x=\"250\" y=\"160\" fill=\"#38BDF8\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">GIẾNG TRỜI</text>\n          <text x=\"250\" y=\"180\" fill=\"#7DD3FC\" font-size=\"9.5\" text-anchor=\"middle\">(Cột Áp Ống Khói)</text>\n\n          <!-- Cửa chớp thoát nhiệt nóc -->\n          <rect x=\"210\" y=\"-30\" width=\"80\" height=\"18\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"0.8\"/>\n          <path d=\"M235,240 L235,25 L225,-10\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"1.8\" stroke-dasharray=\"4,3\" marker-end=\"url(#arrowRed)\"/>\n          <path d=\"M265,240 L265,25 L275,-10\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"1.8\" stroke-dasharray=\"4,3\" marker-end=\"url(#arrowRed)\"/>\n          <text x=\"250\" y=\"-40\" fill=\"#F87171\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">Khí Nóng Thoát Nóc (Q=2.8m³/s) ↑</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT ĐỊA HÌNH: NHÀ BÁN ÂM & RỄ CỎ VETIVER GIỮ ĐẤT TALUY</text>\n        \n        <!-- SƯỜN ĐỒI DỐC -->\n        <path d=\"M20,380 Q240,360 400,230 L830,230 L830,440 L20,440 Z\" fill=\"#111827\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <path d=\"M30,340 Q240,320 380,190 L820,190\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"1.8\" stroke-dasharray=\"6,4\" marker-end=\"url(#arrowRed)\"/>\n        <text x=\"250\" y=\"175\" fill=\"#F87171\" font-size=\"11\" font-weight=\"600\">Gió Nén Gia Tốc Leo Dốc (K_zt = 2.0x) →</text>\n\n        <!-- RỄ CỎ VETIVER SÂU 3m -->\n        <g transform=\"translate(190, 260)\">\n          <circle cx=\"20\" cy=\"40\" r=\"14\" fill=\"rgba(16,185,129,0.18)\" stroke=\"#10B981\" stroke-width=\"0.8\"/>\n          <circle cx=\"50\" cy=\"20\" r=\"18\" fill=\"rgba(16,185,129,0.18)\" stroke=\"#10B981\" stroke-width=\"0.8\"/>\n          <line x1=\"20\" y1=\"55\" x2=\"20\" y2=\"130\" stroke=\"#047857\" stroke-width=\"1.2\" stroke-dasharray=\"3,3\"/>\n          <line x1=\"50\" y1=\"40\" x2=\"50\" y2=\"130\" stroke=\"#047857\" stroke-width=\"1.2\" stroke-dasharray=\"3,3\"/>\n          <text x=\"35\" y=\"80\" fill=\"#34D399\" font-size=\"10\" text-anchor=\"middle\">Cỏ Vetiver (Rễ Sâu 3m)</text>\n        </g>\n\n        <!-- CÔNG TRÌNH NHÀ BÁN ÂM NƯƠNG SƯỜN ĐỒI -->\n        <g transform=\"translate(460, 110)\">\n          <!-- Cọc cắm đá gốc -->\n          <rect x=\"30\" y=\"120\" width=\"14\" height=\"80\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <rect x=\"220\" y=\"120\" width=\"14\" height=\"80\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"130\" y=\"170\" fill=\"#94A3B8\" font-size=\"9.5\" text-anchor=\"middle\">Móng Cọc Cắm Tầng Đá Gốc</text>\n          \n          <!-- Thân nhà -->\n          <polygon points=\"0,120 270,120 270,15 125,15\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"140\" y=\"70\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">NHÀ BÁN ÂM NƯƠNG ĐỒI</text>\n          \n          <!-- Mái dốc xuôi theo chiều gió -->\n          <line x1=\"0\" y1=\"120\" x2=\"125\" y2=\"15\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n          <line x1=\"125\" y1=\"15\" x2=\"270\" y2=\"15\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n          \n          <!-- Đường gió lướt êm -->\n          <path d=\"M-20,130 L115,5 L290,5\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"1.8\" marker-end=\"url(#arrowGreen)\"/>\n          <text x=\"180\" y=\"-8\" fill=\"#34D399\" font-size=\"11\" font-weight=\"600\">Gió Trượt Êm Qua Nóc</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: CẤU TẠO SÀN ĐỆM CÁCH NHIỆT CHỐNG NỒM ĐIỂM SƯƠNG</text>\n        \n        <g transform=\"translate(60, 65)\">\n          <!-- Khung bản vẽ mặt cắt cấu tạo thanh mảnh -->\n          <rect x=\"0\" y=\"20\" width=\"730\" height=\"280\" fill=\"#0F172A\" stroke=\"#475569\" stroke-width=\"1\"/>\n          \n          <!-- Lớp 1: Đất đầm & Bê tông lót -->\n          <rect x=\"20\" y=\"230\" width=\"690\" height=\"50\" fill=\"#1E293B\" stroke=\"#334155\" stroke-width=\"0.8\"/>\n          <text x=\"365\" y=\"260\" fill=\"#94A3B8\" font-size=\"11.5\" font-weight=\"600\" text-anchor=\"middle\">1. BÊ TÔNG LÓT MÓNG MÁC 100 (DÀY 100mm)</text>\n\n          <!-- Lớp 2: Đệm xỉ than / gốm xốp -->\n          <rect x=\"20\" y=\"150\" width=\"690\" height=\"80\" fill=\"rgba(71,85,105,0.3)\" stroke=\"#F59E0B\" stroke-width=\"1\"/>\n          <text x=\"365\" y=\"195\" fill=\"#FDE68A\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">2. LỚP ĐỆM XỈ THAN / GỐM XỐP CÁCH NHIỆT (150mm - 200mm)</text>\n\n          <!-- Lớp 3: Màng PE chống thấm ngược -->\n          <line x1=\"20\" y1=\"140\" x2=\"710\" y2=\"140\" stroke=\"#38BDF8\" stroke-width=\"2.5\" stroke-dasharray=\"6,3\"/>\n          <text x=\"365\" y=\"130\" fill=\"#7DD3FC\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">3. MÀNG CHỐNG THẤM PE 2 LỚP (CHỐNG THẤM NGƯỢC 100%)</text>\n\n          <!-- Lớp 4: Lát gạch gốm ấm chân -->\n          <rect x=\"20\" y=\"50\" width=\"690\" height=\"65\" fill=\"rgba(16,185,129,0.12)\" stroke=\"#34D399\" stroke-width=\"1\"/>\n          <text x=\"365\" y=\"87\" fill=\"#6EE7B7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">4. GẠCH GỐM / SÀN GỖ TỰ NHIÊN (T_FLOOR LUÔN > T_DEW)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: MÓNG BÈ TOÀN KHỐI & SÀN GÁC LỬNG VƯỢT LŨ</text>\n\n        <!-- MỰC NƯỚC LŨ DÂNG NGẬP -->\n        <rect x=\"20\" y=\"270\" width=\"810\" height=\"150\" fill=\"rgba(2,132,199,0.25)\"/>\n        <line x1=\"20\" y1=\"270\" x2=\"830\" y2=\"270\" stroke=\"#38BDF8\" stroke-width=\"1.2\" stroke-dasharray=\"5,3\"/>\n        <text x=\"120\" y=\"295\" fill=\"#FEF3C7\" font-size=\"10.5\" font-weight=\"600\">Mực Nước Lũ Lịch Sử</text>\n\n        <!-- CÔNG TRÌNH NHÀ VỚI MÓNG BÈ & GÁC LỬNG -->\n        <g transform=\"translate(280, 45)\">\n          <!-- Cọc cừ tràm cắm sâu -->\n          <line x1=\"40\" y1=\"300\" x2=\"40\" y2=\"385\" stroke=\"#475569\" stroke-width=\"3\"/>\n          <line x1=\"150\" y1=\"300\" x2=\"150\" y2=\"385\" stroke=\"#475569\" stroke-width=\"3\"/>\n          <line x1=\"260\" y1=\"300\" x2=\"260\" y2=\"385\" stroke=\"#475569\" stroke-width=\"3\"/>\n          \n          <!-- Móng bè BTCT -->\n          <rect x=\"20\" y=\"280\" width=\"260\" height=\"20\" fill=\"#334155\" stroke=\"#FEF3C7\" stroke-width=\"1\"/>\n          <text x=\"150\" y=\"294\" fill=\"#FEF3C7\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Móng Bè BTCT Toàn Khối</text>\n\n          <!-- Tầng 1 ngập nước chịu lực -->\n          <rect x=\"30\" y=\"40\" width=\"240\" height=\"240\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          \n          <!-- Gác lửng vượt lũ +1.0m -->\n          <line x1=\"30\" y1=\"130\" x2=\"270\" y2=\"130\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n          <text x=\"150\" y=\"120\" fill=\"#FBBF24\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">GÁC LỬNG CỨU HỘ (+1.0m)</text>\n\n          <!-- Mái thoát hiểm -->\n          <polygon points=\"150,-15 15,40 285,40\" fill=\"rgba(180,83,9,0.2)\" stroke=\"#FEF3C7\" stroke-width=\"1.2\"/>\n          <text x=\"150\" y=\"25\" fill=\"#FEF3C7\" font-size=\"10\" text-anchor=\"middle\">Sân Thượng Thoát Nạn</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT BẰNG QUY HOẠCH: VÁT CẠNH VÒM CONG R=1.8m TIÊU XOÁY GIAO LỘ</text>\n\n        <!-- GIAO LỘ NGÃ TƯ -->\n        <path d=\"M40,380 L810,380\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <path d=\"M220,40 L220,380\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"130\" y=\"360\" fill=\"#64748B\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">GIAO LỘ ĐÔ THỊ</text>\n\n        <!-- NHÀ VÁT GÓC BO TRÒN -->\n        <g transform=\"translate(260, 70)\">\n          <path d=\"M50,0 L340,0 L340,280 L0,280 L0,50 Q0,0 50,0 Z\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n          <text x=\"180\" y=\"140\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">NHÀ VÁT GÓC BO TRÒN R=1.8m</text>\n          \n          <!-- Ban công cong tiêu xoáy -->\n          <path d=\"M-20,50 Q-20,-20 50,-20\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n          <text x=\"65\" y=\"-30\" fill=\"#FDE68A\" font-size=\"11\" font-weight=\"600\">Ban Công Cong Khí Động Học</text>\n\n          <!-- Cửa tại cạnh vát -->\n          <rect x=\"15\" y=\"15\" width=\"35\" height=\"35\" fill=\"#1E293B\" stroke=\"#34D399\" stroke-width=\"1\"/>\n          <text x=\"32\" y=\"37\" fill=\"#6EE7B7\" font-size=\"10\" text-anchor=\"middle\">Cửa</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT BẰNG KIẾN TRÚC: PHÂN PHÒNG VUÔNG VỨC & GIẾNG TRỜI NỞ HẬU ẢO</text>\n\n        <!-- ĐẤT THÓP HẬU -->\n        <polygon points=\"140,70 710,70 590,380 260,380\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n        \n        <!-- PHÒNG KHÁCH VUÔNG VỨC TRƯỚC -->\n        <rect x=\"230\" y=\"90\" width=\"390\" height=\"140\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"1\"/>\n        <text x=\"425\" y=\"165\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">PHÒNG KHÁCH & BẾP VUÔNG VỨC (CHÍNH KHÍ)</text>\n\n        <!-- GIẾNG TRỜI NỞ HẬU ẢO CUỐI NHÀ -->\n        <rect x=\"330\" y=\"250\" width=\"190\" height=\"110\" fill=\"rgba(2,132,199,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\" stroke-dasharray=\"5,3\"/>\n        <circle cx=\"425\" cy=\"305\" r=\"26\" fill=\"#0284C7\" opacity=\"0.7\"/>\n        <text x=\"425\" y=\"309\" fill=\"#FEF3C7\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Hồ Cá Koi</text>\n        <text x=\"425\" y=\"345\" fill=\"#FDE68A\" font-size=\"11.5\" font-weight=\"700\" text-anchor=\"middle\">SÂN VƯỜN GIẾNG TRỜI NỞ HẬU</text>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: SONG TỈNH (2 GIẾNG TRỜI) ĐỐI LƯU CHÉO</text>\n\n        <!-- NHÀ PHỐ DÀI SÂU -->\n        <rect x=\"50\" y=\"90\" width=\"750\" height=\"250\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n        \n        <!-- Giếng 1 (Cầu thang giữa nhà) -->\n        <rect x=\"190\" y=\"45\" width=\"80\" height=\"295\" fill=\"rgba(30,41,59,0.4)\" stroke=\"#F59E0B\" stroke-width=\"1\" stroke-dasharray=\"4,4\"/>\n        <text x=\"230\" y=\"190\" fill=\"#FBBF24\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">GIẾNG 1</text>\n\n        <!-- Giếng 2 (Cuối nhà) -->\n        <rect x=\"590\" y=\"45\" width=\"80\" height=\"295\" fill=\"rgba(30,41,59,0.4)\" stroke=\"#F59E0B\" stroke-width=\"1\" stroke-dasharray=\"4,4\"/>\n        <text x=\"630\" y=\"190\" fill=\"#FBBF24\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">GIẾNG 2</text>\n\n        <!-- Luồng gió chéo -->\n        <path d=\"M70,290 L210,270 L570,270 L650,80\" fill=\"none\" stroke=\"#34D399\" stroke-width=\"2\" marker-end=\"url(#arrowGreen)\"/>\n        <text x=\"410\" y=\"260\" fill=\"#6EE7B7\" font-size=\"11.5\" font-weight=\"600\" text-anchor=\"middle\">Thông Gió Chéo 24/7 (Cross-Ventilation) →</text>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT BẰNG THỦY LỰC: BỜ KÈ RỌ ĐÁ & RẶNG DỪA NƯỚC TIÊU NĂNG LƯỢNG SÓNG</text>\n\n        <!-- DÒNG SÔNG CONG PHẢN CUNG -->\n        <path d=\"M20,100 Q425,320 830,100 L830,0 L20,0 Z\" fill=\"rgba(2,132,199,0.25)\" stroke=\"#0284C7\" stroke-width=\"1\"/>\n        <text x=\"425\" y=\"70\" fill=\"#7DD3FC\" font-size=\"11.5\" font-weight=\"600\" text-anchor=\"middle\">DÒNG SÔNG CONG (THỦY ĐAO SÁT)</text>\n        \n        <!-- BỜ KÈ RỌ ĐÁ 3 TẦNG BẬC THANG -->\n        <path d=\"M70,230 Q425,380 780,230\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/>\n        <text x=\"425\" y=\"340\" fill=\"#FDE68A\" font-size=\"11.5\" font-weight=\"700\" text-anchor=\"middle\">BỜ KÈ RỌ ĐÁ BẬC THANG (GIẢM 85% XUNG LỰC)</text>\n\n        <!-- CÔNG TRÌNH NHÀ AN TOÀN -->\n        <g transform=\"translate(325, 230)\">\n          <rect x=\"0\" y=\"40\" width=\"200\" height=\"110\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"100\" y=\"100\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">NHÀ Ở AN TOÀN</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: DOUBLE-SKIN FAÇADE & KÊNH ĐỆM KHÍ ĐỐI LƯU</text>\n\n        <!-- BỨC XẠ NẮNG TÂY -->\n        <circle cx=\"80\" cy=\"90\" r=\"32\" fill=\"rgba(239,68,68,0.2)\" stroke=\"#EF4444\" stroke-width=\"1.2\"/>\n        <text x=\"80\" y=\"94\" fill=\"#F87171\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Nắng Tây 45°C</text>\n\n        <!-- CÔNG TRÌNH NHÀ PHỐ DOUBLE SKIN -->\n        <g transform=\"translate(260, 80)\">\n          <rect x=\"0\" y=\"0\" width=\"460\" height=\"260\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          \n          <!-- Lớp ngoài gạch hoa gió cách tường kính 80cm -->\n          <line x1=\"-35\" y1=\"0\" x2=\"-35\" y2=\"260\" stroke=\"#F59E0B\" stroke-width=\"4\" stroke-dasharray=\"8,4\"/>\n          <text x=\"-45\" y=\"130\" fill=\"#FBBF24\" font-size=\"10.5\" font-weight=\"600\" transform=\"rotate(-90 -45 130)\" text-anchor=\"middle\">Lam Gạch Hoa Gió (-6°C)</text>\n\n          <!-- Kênh đối lưu khí giải nhiệt -->\n          <path d=\"M-15,240 L-15,20\" fill=\"none\" stroke=\"#38BDF8\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\" marker-end=\"url(#arrowCyan)\"/>\n          <text x=\"230\" y=\"135\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">KHÔNG GIAN SỐNG MÁT MẺ (28°C)</text>\n        </g>\n      </svg>\n    ",
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
    "id": "nha_canh_cau_vuot",
    "name": "Gần Cầu Vượt",
    "code": "MẪU 13 - KHE CO GIÃN CHỐNG RUNG & VÁCH CÁCH ÂM HỘP KÍNH",
    "summary": "Hóa giải ô nhiễm tiếng ồn xe cơ giới (75-80 dBA theo ISO 9613-2 & FHWA), rung chấn giao thông và Liềm Đao Sát từ cầu vượt cao tốc.",
    "problem_analysis": "Cầu vượt trên cao cách mặt tiền 10-15m phát sinh tiếng ồn giao thông L_Aeq = 78 dBA và rung chấn mặt đất tần số thấp 10-30 Hz truyền thẳng vào dầm móng. Trồng cây đơn thuần chỉ giảm 2-3 dBA, không thể cách âm nếu không có giải pháp âm học & đệm móng thực tế.",
    "engineering_standards": "ISO 9613-2 • FHWA Highway Noise • TCVN 7838:2007 (Rung động)",
    "formula": "TL = 20*\\log_{10}(m \\cdot f) - 47 dB | Giảm 38-42 dBA với Kính Hộp PVB + Khe Chống Rung",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        \n        <!-- NỀN ĐẤT -->\n        <rect x=\"30\" y=\"350\" width=\"790\" height=\"70\" fill=\"url(#soilHatch)\"/>\n        <line x1=\"30\" y1=\"350\" x2=\"820\" y2=\"350\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: CẦU VƯỢT TRÊN CAO & HỆ ÂM HỌC CÔNG TRÌNH</text>\n\n        <!-- CẦU VƯỢT CAO TỐC TRÊN CAO (H=7.5m) -->\n        <g transform=\"translate(50, 90)\">\n          <!-- Trụ cầu BTCT -->\n          <rect x=\"55\" y=\"90\" width=\"35\" height=\"170\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"1\"/>\n          <!-- Dầm hộp BTCT -->\n          <polygon points=\"0,60 150,60 125,90 25,90\" fill=\"#334155\" stroke=\"#94A3B8\" stroke-width=\"1.2\"/>\n          <rect x=\"0\" y=\"55\" width=\"150\" height=\"5\" fill=\"#0F172A\"/>\n          <!-- Xe ô tô chạy -->\n          <rect x=\"35\" y=\"30\" width=\"45\" height=\"22\" fill=\"#B45309\" rx=\"3\"/>\n          <!-- Tấm chắn âm Acrylic -->\n          <rect x=\"145\" y=\"15\" width=\"4\" height=\"40\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"0.8\"/>\n          \n          <line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"-10\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"60\" y1=\"-10\" x2=\"110\" y2=\"-10\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"115\" y=\"-6\" fill=\"#F87171\" font-size=\"10.5\" font-weight=\"600\">Ồn Xe 78 dBA & Rung Chấn</text>\n        </g>\n\n        <!-- SÓNG RUNG ĐỊA CHẤT TRUYỀN QUA NỀN ĐẤT -->\n        <path d=\"M190,160 Q260,170 330,200\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\"/>\n        <path d=\"M190,190 Q260,210 330,250\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\"/>\n\n        <!-- RÃNH KHE CO GIÃN ĐỆM CAO SU NEOPRENE (50mm) -->\n        <rect x=\"340\" y=\"325\" width=\"10\" height=\"70\" fill=\"#0284C7\" stroke=\"#38BDF8\" stroke-width=\"0.8\"/>\n        <line x1=\"345\" y1=\"395\" x2=\"345\" y2=\"415\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n        <text x=\"345\" y=\"428\" fill=\"#7DD3FC\" font-size=\"10.5\" text-anchor=\"middle\">Khe Chống Rung Cao Su 50mm</text>\n\n        <!-- DẢI CÂY XANH TÁN RẬM -->\n        <g transform=\"translate(365, 220)\">\n          <circle cx=\"15\" cy=\"80\" r=\"18\" fill=\"rgba(16,185,129,0.18)\" stroke=\"#10B981\" stroke-width=\"1\"/>\n          <text x=\"15\" y=\"115\" fill=\"#34D399\" font-size=\"9.5\" text-anchor=\"middle\">Dải Cây (Cản Bụi)</text>\n        </g>\n\n        <!-- NGÔI NHÀ 3 TẦNG VỚI LOGIA ĐỆM & KÍNH HỘP PVB -->\n        <g transform=\"translate(420, 80)\">\n          <rect x=\"0\" y=\"0\" width=\"380\" height=\"270\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <!-- Logia đệm sâu 1.8m -->\n          <rect x=\"0\" y=\"40\" width=\"70\" height=\"200\" fill=\"rgba(30,41,59,0.4)\" stroke=\"#F59E0B\" stroke-width=\"0.8\" stroke-dasharray=\"4,4\"/>\n          <text x=\"35\" y=\"145\" fill=\"#FBBF24\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\" transform=\"rotate(-90 35 145)\">Logia Đệm 1.8m (-10 dBA)</text>\n          \n          <!-- Cửa kính hộp 2 lớp dán film PVB âm học -->\n          <line x1=\"70\" y1=\"50\" x2=\"70\" y2=\"230\" stroke=\"#38BDF8\" stroke-width=\"4\"/>\n          <line x1=\"70\" y1=\"90\" x2=\"115\" y2=\"90\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"120\" y=\"94\" fill=\"#7DD3FC\" font-size=\"10.5\">Kính Hộp PVB (STC 42, -32 dBA)</text>\n\n          <!-- Không gian phòng ngủ yên tĩnh -->\n          <rect x=\"170\" y=\"60\" width=\"180\" height=\"170\" fill=\"#080C14\" stroke=\"#34D399\" stroke-width=\"0.8\"/>\n          <text x=\"260\" y=\"135\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">PHÒNG NGỦ YÊN TĨNH</text>\n          <text x=\"260\" y=\"160\" fill=\"#34D399\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">L_in = 36 dBA (ĐẠT CHUẨN)</text>\n          <text x=\"260\" y=\"180\" fill=\"#94A3B8\" font-size=\"9.5\" text-anchor=\"middle\">(Triệt tiêu 42 dBA tiếng ồn ngoài trời)</text>\n        </g>\n      </svg>\n    ",
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
    "id": "nha_dat_ao_dam_lay",
    "name": "Đất Ao Đầm",
    "code": "MẪU 14 - NHÀ SÀN MÓNG CỪ TRÀM",
    "summary": "Thiết kế nhà sàn sinh thái móng cọc cừ tràm kết hợp sàn nổi thông thoáng chống sụt lún và hàn khí trọc thủy.",
    "problem_analysis": "Đất bùn ao đầm lầy có sức chịu tải yếu, hàn khí ẩm thấp bốc lên gây bệnh thấp khớp và sụt lún nứt móng.",
    "engineering_standards": "Soil Mechanics Soft Ground (TCVN 9362) • 《Dương Trạch Thập Thư》",
    "formula": "R_soil = 25 cọc/m^2 | Cọc cừ tràm ngập nước vĩnh cửu tăng sức chịu tải lên 0.8 - 1.2 kg/cm²",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT ĐỊA CHẤT: CỌC CỪ TRÀM & SÀN NÂNG CÁCH LY HÀN KHÍ</text>\n\n        <!-- TẦNG BÙN ĐẤT YẾU -->\n        <rect x=\"20\" y=\"270\" width=\"810\" height=\"160\" fill=\"#1E293B\" stroke=\"#334155\" stroke-width=\"0.8\"/>\n        <text x=\"120\" y=\"320\" fill=\"#94A3B8\" font-size=\"10.5\">Tầng Bùn Đất Yếu (H=6m)</text>\n\n        <!-- CÔNG TRÌNH NHÀ SÀN NÂNG CỌC CỪ TRÀM -->\n        <g transform=\"translate(280, 50)\">\n          <line x1=\"30\" y1=\"230\" x2=\"30\" y2=\"370\" stroke=\"#F59E0B\" stroke-width=\"3\"/>\n          <line x1=\"140\" y1=\"230\" x2=\"140\" y2=\"370\" stroke=\"#F59E0B\" stroke-width=\"3\"/>\n          <line x1=\"250\" y1=\"230\" x2=\"250\" y2=\"370\" stroke=\"#F59E0B\" stroke-width=\"3\"/>\n          <text x=\"140\" y=\"340\" fill=\"#FDE68A\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Cọc Cừ Tràm 25 cọc/m²</text>\n\n          <rect x=\"15\" y=\"40\" width=\"250\" height=\"180\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"140\" y=\"130\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">SÀN NÂNG CÁCH ĐẤT 1.2m</text>\n          <text x=\"140\" y=\"155\" fill=\"#7DD3FC\" font-size=\"9.5\" text-anchor=\"middle\">(Gầm Thông Gió Tự Nhiên)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT ĐỊA HÌNH: VÁCH NÚI ĐỨNG, RÃNH CHỮ U & HÀNH LANG CÁCH LY 6m</text>\n\n        <!-- VÁCH NÚI ĐÁ -->\n        <polygon points=\"20,0 230,0 230,360 20,360\" fill=\"#1E293B\" stroke=\"#475569\" stroke-width=\"1\"/>\n        <text x=\"110\" y=\"180\" fill=\"#94A3B8\" font-size=\"11.5\" font-weight=\"600\" text-anchor=\"middle\">VÁCH NÚI ĐÁ</text>\n        \n        <!-- RÃNH HỨNG CHỮ U -->\n        <path d=\"M240,360 L280,360 L280,280 L310,280\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n        <text x=\"280\" y=\"260\" fill=\"#FDE68A\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Rãnh Chữ U 1.5m</text>\n\n        <!-- NHÀ CÁCH LY AN TOÀN -->\n        <g transform=\"translate(350, 90)\">\n          <rect x=\"0\" y=\"0\" width=\"440\" height=\"250\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"220\" y=\"130\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">HÀNH LANG CÁCH LY AN TOÀN 6.0m</text>\n          <text x=\"220\" y=\"155\" fill=\"#7DD3FC\" font-size=\"10\" text-anchor=\"middle\">(Tường Lưng Đổ Bê Tông Cốt Thép Dày 300mm)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT BẰNG KIẾN TRÚC: KHUNG GIÀN KHÉP KÍN & HỒ CÁ KOI LẤP GÓC KHUYẾT</text>\n\n        <!-- KHỐI CHỮ L -->\n        <polygon points=\"120,60 520,60 520,190 320,190 320,370 120,370\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n        <text x=\"220\" y=\"210\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\">KHỐI NHÀ CHỮ L</text>\n\n        <!-- KHUNG GIÀN LAM CHE & HỒ CÁ KOI -->\n        <rect x=\"320\" y=\"190\" width=\"200\" height=\"180\" fill=\"rgba(30,41,59,0.35)\" stroke=\"#10B981\" stroke-width=\"1\" stroke-dasharray=\"5,3\"/>\n        <circle cx=\"420\" cy=\"280\" r=\"42\" fill=\"rgba(2,132,199,0.25)\" stroke=\"#38BDF8\" stroke-width=\"1\"/>\n        <text x=\"420\" y=\"285\" fill=\"#FEF3C7\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Hồ Cá Koi (Minh Đường)</text>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: BÌNH PHONG ĐẶC VÀ HÀNG CHUỐI CẢNH CẢN BỨC XẠ ĐIỆN TỪ</text>\n\n        <!-- CỘT ĐIỆN HỎA SÁT -->\n        <line x1=\"110\" y1=\"50\" x2=\"110\" y2=\"380\" stroke=\"#EF4444\" stroke-width=\"3\"/>\n        <line x1=\"70\" y1=\"90\" x2=\"150\" y2=\"90\" stroke=\"#EF4444\" stroke-width=\"2\"/>\n        <text x=\"110\" y=\"40\" fill=\"#F87171\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Cột Điện (Hỏa Sát)</text>\n\n        <!-- BÌNH PHONG ĐẶC VÀ NHÀ -->\n        <g transform=\"translate(240, 80)\">\n          <rect x=\"0\" y=\"20\" width=\"10\" height=\"230\" fill=\"#B45309\" stroke=\"#FEF3C7\" stroke-width=\"1\"/>\n          <text x=\"5\" y=\"10\" fill=\"#FBBF24\" font-size=\"10.5\" font-weight=\"600\" text-anchor=\"middle\">Bình Phong 2.2m</text>\n          \n          <rect x=\"45\" y=\"0\" width=\"500\" height=\"260\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"295\" y=\"130\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">TRƯỜNG KHÍ ĐƯỢC BẢO VỆ (GIẢM 80% TỪ TRƯỜNG)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT BẰNG CẢNH QUAN: VÀNH ĐAI TÙNG BÁCH & HỆ ĐÈN DƯƠNG QUANG 3000K</text>\n\n        <!-- KHU VỰC NGHĨA TRANG -->\n        <rect x=\"30\" y=\"80\" width=\"200\" height=\"260\" fill=\"#111827\" stroke=\"#475569\" stroke-width=\"1\"/>\n        <text x=\"130\" y=\"210\" fill=\"#64748B\" font-size=\"11.5\" font-weight=\"600\" text-anchor=\"middle\">NGHĨA TRANG / ÂM KHÍ</text>\n\n        <!-- VÀNH ĐAI TÙNG BÁCH VÀ NHÀ -->\n        <g transform=\"translate(265, 70)\">\n          <rect x=\"0\" y=\"0\" width=\"18\" height=\"280\" fill=\"rgba(16,185,129,0.2)\" stroke=\"#10B981\" stroke-width=\"1\"/>\n          <text x=\"9\" y=\"140\" fill=\"#34D399\" font-size=\"10.5\" font-weight=\"600\" transform=\"rotate(-90 9 140)\" text-anchor=\"middle\">Vành Đai Tùng Bách (Dương Khí)</text>\n          \n          <rect x=\"45\" y=\"15\" width=\"480\" height=\"250\" fill=\"#0F172A\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n          <text x=\"285\" y=\"140\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">GIA TRẠCH THUẦN DƯƠNG QUANG MINH</text>\n        </g>\n      </svg>\n    ",
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
    "problem_analysis": "Đáy thung lũng tích tụ khí nặng và sương mù độc hại không lưu thông, gây ẩm mốc và bệnh đường hô hấp. Cốt nền nâng cao 1.5m trên trụ cột kết hợp quạt turbine hút nóc liên tục giải phóng khí ẩm.",
    "engineering_standards": "Valley Microclimate Ventilation • 《Hoàng Đế Trạch Kinh》",
    "formula": "Q_exhaust = 1500 m³/h | Quạt hút cưỡng bức tạo áp suất âm hút khí ẩm ra nóc",
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT ĐỊA HÌNH LÒNG CHẢO: GIẢI PHÁP SÀN NÂNG & QUẠT TURBINE NÓC</text>\n\n        <!-- 2 SƯỜN NÚI BAO QUANH ĐÁY THUNG LŨNG -->\n        <path d=\"M20,110 Q220,330 425,330 Q630,330 830,110 L830,440 L20,440 Z\" fill=\"#111827\" stroke=\"#475569\" stroke-width=\"1.2\"/>\n        <text x=\"110\" y=\"160\" fill=\"#64748B\" font-size=\"11\">SƯỜN NÚI TÂY</text>\n        <text x=\"710\" y=\"160\" fill=\"#64748B\" font-size=\"11\">SƯỜN NÚI ĐÔNG</text>\n        \n        <!-- VÙNG SƯƠNG MÙ & KHÍ TÙ ĐỌNG LƠ LỬNG -->\n        <rect x=\"180\" y=\"285\" width=\"490\" height=\"55\" rx=\"6\" fill=\"rgba(56,189,248,0.15)\"/>\n        <text x=\"425\" y=\"320\" fill=\"#94A3B8\" font-size=\"10.5\" font-family=\"monospace\" text-anchor=\"middle\">VÙNG KHÍ ẨM TÙ ĐỌNG ĐÁY CHẢO (RH > 95%)</text>\n\n        <!-- CÔNG TRÌNH NHÀ NÂNG SÀN THỰC TẾ TRÊN CỘT TRỤ (+1.500m) -->\n        <g transform=\"translate(275, 90)\">\n          <!-- Cột trụ nâng sàn -->\n          <rect x=\"30\" y=\"180\" width=\"12\" height=\"60\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <rect x=\"145\" y=\"180\" width=\"12\" height=\"60\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <rect x=\"255\" y=\"180\" width=\"12\" height=\"60\" fill=\"#1E293B\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          \n          <!-- Dầm sàn nâng BTCT -->\n          <rect x=\"15\" y=\"170\" width=\"270\" height=\"10\" fill=\"#334155\" stroke=\"#38BDF8\" stroke-width=\"0.8\"/>\n          <line x1=\"285\" y1=\"175\" x2=\"330\" y2=\"175\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"335\" y=\"179\" fill=\"#7DD3FC\" font-size=\"10.5\" font-weight=\"600\">Sàn Nâng Cốt +1.500m (Gầm Thoáng)</text>\n\n          <!-- Thân nhà & phòng ốc -->\n          <rect x=\"25\" y=\"55\" width=\"250\" height=\"115\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1\"/>\n          <text x=\"150\" y=\"120\" fill=\"#FEF3C7\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">KHÔNG GIAN SINH HOẠT KHÔ RÁO</text>\n          \n          <!-- Cửa sổ mở lớn -->\n          <rect x=\"40\" y=\"80\" width=\"35\" height=\"45\" fill=\"#1E293B\" stroke=\"#38BDF8\" stroke-width=\"0.6\"/>\n          <rect x=\"225\" y=\"80\" width=\"35\" height=\"45\" fill=\"#1E293B\" stroke=\"#38BDF8\" stroke-width=\"0.6\"/>\n          \n          <!-- Mái dốc ngói & Ống khói Quạt Turbine nóc -->\n          <polygon points=\"150,-15 10,55 290,55\" fill=\"rgba(180,83,9,0.2)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n          <rect x=\"135\" y=\"-30\" width=\"30\" height=\"18\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-width=\"0.8\"/>\n          <ellipse cx=\"150\" cy=\"-35\" rx=\"20\" ry=\"7\" fill=\"#D97706\" stroke=\"#FEF3C7\" stroke-width=\"0.8\"/>\n          <path d=\"M150,150 L150,25 L150,-50\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"1.8\" stroke-dasharray=\"4,3\" marker-end=\"url(#arrowRed)\"/>\n          \n          <line x1=\"150\" y1=\"-35\" x2=\"150\" y2=\"-60\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <line x1=\"150\" y1=\"-60\" x2=\"200\" y2=\"-60\" stroke=\"#64748B\" stroke-width=\"0.8\"/>\n          <text x=\"205\" y=\"-56\" fill=\"#F87171\" font-size=\"10.5\" font-weight=\"600\">Quạt Turbine Nóc Hút Ẩm (Q=1500 m³/h)</text>\n        </g>\n      </svg>\n    ",
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
    "svg_diagram": "\n      <svg viewBox=\"0 0 850 440\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#080C14; border-radius:8px; font-family:'Segoe UI', Roboto, sans-serif;\">\n        \n  <defs>\n    <pattern id=\"cadGrid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"20\" x2=\"20\" y2=\"0\" stroke=\"rgba(255,255,255,0.025)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"soilHatch\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n      <line x1=\"0\" y1=\"16\" x2=\"16\" y2=\"0\" stroke=\"rgba(148,163,184,0.15)\" stroke-width=\"0.8\"/>\n    </pattern>\n    <pattern id=\"brickHatch\" width=\"10\" height=\"6\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"10\" height=\"6\" fill=\"none\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n      <line x1=\"5\" y1=\"0\" x2=\"5\" y2=\"6\" stroke=\"rgba(245,158,11,0.15)\" stroke-width=\"0.6\"/>\n    </pattern>\n    <marker id=\"arrowCyan\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#38BDF8\"/>\n    </marker>\n    <marker id=\"arrowGreen\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#34D399\"/>\n    </marker>\n    <marker id=\"arrowRed\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#F87171\"/>\n    </marker>\n    <marker id=\"arrowAmber\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\">\n      <path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#FBBF24\"/>\n    </marker>\n  </defs>\n\n        <rect width=\"850\" height=\"440\" fill=\"url(#cadGrid)\"/>\n        <text x=\"40\" y=\"32\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.5\">MẶT CẮT KỸ THUẬT: TƯỜNG KÈ BIỂN MÁI NGHIÊNG 30° TIÊU NĂNG LƯỢNG SÓNG</text>\n\n        <!-- SÓNG BIỂN VA ĐẬP -->\n        <path d=\"M20,280 Q200,230 380,280 L380,440 L20,440 Z\" fill=\"rgba(2,132,199,0.25)\" stroke=\"#0284C7\" stroke-width=\"1\"/>\n        <text x=\"120\" y=\"360\" fill=\"#7DD3FC\" font-size=\"10.5\" font-weight=\"600\">Sóng Biển Va Đập</text>\n        \n        <!-- TƯỜNG KÈ NGHIÊNG 30° -->\n        <polygon points=\"320,410 400,210 435,210 435,410\" fill=\"#334155\" stroke=\"#FEF3C7\" stroke-width=\"1.2\"/>\n        <text x=\"360\" y=\"270\" fill=\"#FDE68A\" font-size=\"10.5\" font-weight=\"600\" transform=\"rotate(-65 360 270)\">Kè Nghiêng 30°</text>\n\n        <!-- BIỆT THỰ VEN BIỂN BỀN SUNFAT -->\n        <g transform=\"translate(470, 90)\">\n          <rect x=\"0\" y=\"0\" width=\"340\" height=\"260\" fill=\"#0F172A\" stroke=\"#38BDF8\" stroke-width=\"1.2\"/>\n          <text x=\"170\" y=\"130\" fill=\"#FEF3C7\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">BIỆT THỰ VEN BIỂN</text>\n          <text x=\"170\" y=\"155\" fill=\"#7DD3FC\" font-size=\"10\" text-anchor=\"middle\">(Bê Tông Xi Măng Bền Sunfat PCSR)</text>\n        </g>\n      </svg>\n    ",
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
    "id": "hazard_01",
    "name": "Tốc Mái Do Áp Suất Âm Bernoulli",
    "freq": "Rất Hay Gặp (Mùa Bão)",
    "risk_level": "CỰC KỲ NGUY HIỂM",
    "classic_ref": "《Táng Thư》: Quát Cốt Phong & Khí Thừa Phong Tắc Tán",
    "physics_ref": "Chênh lệch áp suất tĩnh Bernoulli (ΔP = 0.5*ρ*v^2)",
    "phenomenon": "Mái tôn hoặc mái ngói bị giật bung toàn bộ khi có bão cấp 10-12 do lực nâng bốc mái.",
    "solution": "Thiết kế Mái Bốn Mái dốc 32°, đai thép neo xà gồ vào dầm bê tông, lam thoát áp mặt sau."
  },
  {
    "id": "hazard_02",
    "name": "Gió Dội Thác Đổ & Lốc Chân Cao Ốc",
    "freq": "Phổ Biến Đô Thị",
    "risk_level": "NGUY HIỂM CAO",
    "classic_ref": "《Hoàng Đế Trạch Kinh》: Thiên Trảm Sát & Tứ Diện Phong Ao",
    "physics_ref": "Corner Downwash Vortex & Hiệu ứng Venturi gia tốc",
    "phenomenon": "Gió đập vào vách chung cư dội ngược xuống đất tạo lốc cuốn xé toạc cửa sổ nhà thấp.",
    "solution": "Lắp mái đón sảnh chữ V nghiêng 15° hất ngược gió, bo tròn góc tường R >= 50cm, trồng cau vua."
  },
  {
    "id": "hazard_03",
    "name": "Đâm Đường Thương Phong Sát Hút Gió",
    "freq": "Rất Hay Gặp (Nhà Ngã Ba / Hẻm)",
    "risk_level": "NGUY HIỂM CAO",
    "classic_ref": "《Dương Trạch Thập Thư》: Nhất Điều Thương Nhất Điều Huyết",
    "physics_ref": "Ống nén khí khí động học (Pipe Channeling)",
    "phenomenon": "Luồng gió nén từ con hẻm đâm thẳng tim nhà cướp sạch nhiệt năng và mang bụi bặm ô nhiễm.",
    "solution": "Xây bình phong hoa gió thoáng 25% trước cửa, mở cửa lệch trục, trồng trúc quân tử."
  },
  {
    "id": "hazard_04",
    "name": "Bức Xạ Nhiệt & Tích Nhiệt Trần Bê Tông",
    "freq": "Xảy Ra Mọi Mùa Hè",
    "risk_level": "ẢNH HƯỞNG SỨC KHỎE",
    "classic_ref": "《Khảo Công Ký》: Thiên Tỉnh Thiên Tâm & Âm Dương Giao Hòa",
    "physics_ref": "Hiệu ứng Cột Áp Ống Khói (Stack Effect) & Cầu Nhiệt Bê Tông",
    "phenomenon": "Trần nhà bê tông hấp thụ nhiệt lên tới 45°C - 50°C tỏa nhiệt cả ban đêm gây sốc nhiệt.",
    "solution": "Mở giếng trời Thiên Tỉnh thoát nhiệt nóc, lợp mái ngói 2 lớp đệm khí, làm hồ nước Tây Nam."
  },
  {
    "id": "hazard_05",
    "name": "Gió Nén Gia Tốc Sườn Dốc & Sạt Lở Móng",
    "freq": "Vùng Đồi Núi / Cao Nguyên",
    "risk_level": "CỰC KỲ NGUY HIỂM",
    "classic_ref": "《Táng Thư》: Đoạn Sơn Tuyệt Thạch Sát",
    "physics_ref": "Topographic Speed-up & Xói mòn thủy lực",
    "phenomenon": "Vận tốc gió tại đỉnh đồi tăng gấp đôi, đất taluy chân móng bị mưa bão làm sạt lở.",
    "solution": "Làm nhà bán âm nương sườn đồi, mái xuôi theo dốc, móng bè cắm đá, trồng cỏ Vetiver."
  },
  {
    "id": "hazard_06",
    "name": "Ẩm Mốc Đọng Sương Sàn Nhà Mùa Nồm",
    "freq": "Hàng Năm (Tháng 2 - 4 Miền Bắc)",
    "risk_level": "GÂY HẠI CÔNG TRÌNH",
    "classic_ref": "《Dương Trạch Thập Thư》: Trọc Thủy Nê Ẩm Sát",
    "physics_ref": "Ngưng tụ điểm sương (Dew Point Condensation)",
    "phenomenon": "Sàn nhà và tường đá chảy nước thành vũng, đồ gỗ mốc meo, chập cháy điện âm tường.",
    "solution": "Đệm xỉ than 20cm cách nhiệt dưới sàn, lót màng PE chống thấm ngược, đóng kín cửa hướng Đông Nam."
  },
  {
    "id": "hazard_07",
    "name": "Vỡ Cửa Đón Gió Gây Nổ Áp Suất Trong",
    "freq": "Khi Bão Lớn",
    "risk_level": "CỰC KỲ NGUY HIỂM",
    "classic_ref": "《Hoàng Đế Trạch Kinh》: Môn Khẩu Xung Phá",
    "physics_ref": "Internal Pressurization Surge (+0.8 Cp)",
    "phenomenon": "Cửa kính đón gió bị vỡ khiến khí nén ùa vào đẩy tung toàn bộ mái nhà từ trong ra ngoài.",
    "solution": "Dùng kính dán an toàn 2 lớp 10.38mm, cửa cuốn có thanh chống bão ray sâu > 75mm."
  },
  {
    "id": "hazard_08",
    "name": "Ngập Lụt Phù Sa & Đẩy Nổi Bể Ngầm",
    "freq": "Mùa Lũ Miền Trung & Miền Tây",
    "risk_level": "CỰC KỲ NGUY HIỂM",
    "classic_ref": "《Thủy Long Kinh》: Xung Ba Thác Lạc Thủy",
    "physics_ref": "Áp lực đẩy nổi thủy tĩnh (Hydrostatic Uplift Buoyancy)",
    "phenomenon": "Nước lũ dâng cao cuốn trôi đất móng hoặc đẩy nứt vỡ sàn tầng hầm/bể nước ngầm rỗng.",
    "solution": "Móng bè cốt thép toàn khối, cốt sàn tầng 1 cao hơn đỉnh lũ +0.8m, van xả áp ngầm."
  },
  {
    "id": "hazard_09",
    "name": "Lún Lệch Nứt Tường Xéo 45° Do Đất Mượn",
    "freq": "Rất Phổ Biến (Ao San Lấp)",
    "risk_level": "HƯ HỎNG KẾT CẤU",
    "classic_ref": "《Hoàng Đế Trạch Kinh》: Địa Khí Bất Đồng Sát",
    "physics_ref": "Lún lệch không đều (Differential Settlement)",
    "phenomenon": "Nhà xây nửa trên nền đất liền, nửa trên ao san lấp bị nứt toác tường hình chữ V xéo 45°.",
    "solution": "Ép cọc bê tông sâu qua tầng bùn tới tầng sét cứng, đà kiềng móng liên kết giằng ngang."
  },
  {
    "id": "hazard_10",
    "name": "Ăn Mòn Hơi Muối Biển Cốt Thép Ven Biển",
    "freq": "Vùng Ven Biển Toàn Quốc",
    "risk_level": "SUY THOÁI CÔNG TRÌNH",
    "classic_ref": "《Táng Thư》: Diêm Khí Thực Cốt Sát",
    "physics_ref": "Ăn mòn Ion Clorua (Chloride Attack & Carbonation)",
    "phenomenon": "Hơi muối biển thẩm thấu vào bê tông làm rỉ sét cốt thép nở thể tích gây nứt vỡ dầm cột.",
    "solution": "Dùng xi măng bền sunfat, tăng chiều dày lớp bê tông bảo vệ >= 40mm, sơn phủ chống thấm kỵ nước."
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
