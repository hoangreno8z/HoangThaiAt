/**
 * DỮ LIỆU CÔNG CỤ: GỢI Ý THIẾT KẾ KHÍ ĐỘNG HỌC & CỔ TRUYỀN
 * Tích hợp toàn diện 6 Đại Nguyên Lý Cốt Lõi (Cổ Thư & Khí Động Học),
 * 8 Bộ Bản Vẽ Mẫu Trực Quan (SVG Vector), và Ma Trận 10 Đại Rủi Ro Xây Dựng Thực Tế.
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
      mechanism: "Khi gió bão thổi xiên góc 45° vào góc công trình, dòng khí bị tách đôi cuốn tròn dọc theo 2 mép diềm mái tạo thành cặp Xoáy Nón (Conical Vortices). Vùng tâm xoáy nón này có áp suất âm cục bộ gấp 2.5 - 3.0 lần so với vùng giữa mái, làm bung đinh vít mép tôn đầu tiên rồi lật tung toàn bộ mái.",
      classical_view: "Kiến trúc cổ truyền trong 《Doanh Tạo Pháp Thức》 uốn cong góc mái (Phi Diêm) và dùng hàng ngói câu đầu trích thủy nặng đè mép mái để triệt tiêu góc chết tụ xoáy.",
      remedy_principle: "1. Bố trí gờ chắn gió (Bargeboard/Parapet) dốc 15° dọc viền mái.\n2. Gia cố mật độ đinh vít ke chống bão tại dải biên 1.5m quanh mái với khoảng cách < 40cm."
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
      mechanism: "Vào mùa xuân tại Miền Bắc và Bắc Trung Bộ, gió Đông Nam mang khối khí có độ ẩm tương đối > 95% tràn vào nhà. Mặt sàn bê tông và tường đá có quán tính nhiệt lớn nên nhiệt độ bề mặt vẫn lạnh hơn nhiệt độ điểm sương của không khí (T_floor < T_dew), khiến hơi nước ngưng tụ thành vũng gây ẩm mốc, trơn trượt và hư hỏng thiết bị điện tử.",
      classical_view: "《Dương Trạch Thập Thư》 xếp ẩm thấp nền nhà vào 'Trọc Thủy Sát', làm suy giảm chính khí và phát sinh bệnh tật.",
      remedy_principle: "1. Lớp đệm xỉ than hoặc đất sét nung cách nhiệt dưới sàn dày 15-20cm chống cầu lạnh.\n2. Màng chống ẩm PE 2 lớp lót trước khi đổ bê tông lót sàn.\n3. Đóng kín cửa hướng Đông Nam trong những ngày nồm ẩm, chỉ mở cửa thông gió cưỡng bức mặt Bắc."
    }
  ]
};

const DESIGN_BLUEPRINTS = [
  {
    id: "nha_bao_mientrung",
    name: "Chống Tốc Mái",
    code: "MẪU 01 - MÁI BỐN MÁI 32° & ĐAI TRE",
    summary: "Thiết kế tối ưu triệt tiêu lực nâng bốc mái Bernoulli và phân tán bão gió cấp 10 - 12 cho khu vực ven biển, đồng bằng trống trải Miền Trung.",
    problem_analysis: "Nhà mái tôn dốc 1 phía hoặc mái ngói dốc 2 phía thông thường bị bão giật xé toạc vì lực nâng Bernoulli mặt trên và áp suất dương đẩy từ bên trong.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <defs>
          <linearGradient id="windGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.1"/>
          </linearGradient>
          <linearGradient id="roofGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#F59E0B"/>
            <stop offset="100%" stop-color="#B45309"/>
          </linearGradient>
        </defs>
        <rect x="0" y="340" width="800" height="80" fill="#1E293B"/>
        <line x1="0" y1="340" x2="800" y2="340" stroke="#475569" stroke-width="2"/>
        <g transform="translate(60, 240)">
          <circle cx="20" cy="80" r="18" fill="#059669" opacity="0.8"/>
          <circle cx="45" cy="85" r="15" fill="#10B981" opacity="0.8"/>
          <path d="M70,100 Q75,40 65,0 Q80,45 80,100" fill="#047857"/>
          <circle cx="65" cy="0" r="22" fill="#10B981" opacity="0.85"/>
          <path d="M100,100 Q105,30 95,-20 Q110,40 110,100" fill="#047857"/>
          <circle cx="95" cy="-20" r="26" fill="#34D399" opacity="0.85"/>
          <text x="50" y="115" fill="#34D399" font-size="11" font-weight="700" text-anchor="middle">Đai Tre Phân Tầng (Cách 12m)</text>
        </g>
        <path d="M10,200 C150,180 180,140 280,120 C380,100 480,100 580,110 C680,120 780,130 790,130" fill="none" stroke="url(#windGrad1)" stroke-width="4" stroke-dasharray="6,4"/>
        <path d="M10,230 C150,210 180,170 280,145 C380,125 480,125 580,135 C680,145 780,155 790,155" fill="none" stroke="url(#windGrad1)" stroke-width="3" stroke-dasharray="6,4"/>
        <g transform="translate(340, 160)">
          <rect x="0" y="70" width="220" height="110" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
          <rect x="75" y="110" width="40" height="70" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5"/>
          <text x="95" y="150" fill="#FBBF24" font-size="9" text-anchor="middle">Tiền Sảnh Lùi 1.8m</text>
          <polygon points="110,0 -30,70 250,70" fill="url(#roofGrad1)" stroke="#FEF3C7" stroke-width="2"/>
          <text x="110" y="-10" fill="#FEF3C7" font-size="12" font-weight="700" text-anchor="middle">Mái Bốn Mái Dốc 32° (Khí Động Học)</text>
          <text x="40" y="18" fill="#34D399" font-size="10" font-weight="700">Triệt Tiêu Lực Bốc</text>
          <rect x="215" y="72" width="15" height="12" fill="#38BDF8" stroke="#0284C7"/>
          <text x="260" y="80" fill="#38BDF8" font-size="10">Lam Thoát Áp</text>
        </g>
        <text x="30" y="180" fill="#38BDF8" font-size="13" font-weight="800">LUỒNG BÃO CẤP 12 →</text>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Chắn Bão (Phong Đai Bậc Thang)",
      species: "Tre Ngà, Phi Lao, Cau Vua, Cây Dâm Bụt.",
      distance: "Trồng cách tường nhà từ 10m đến 15m (bằng 2 - 3 lần chiều cao công trình).",
      structure: "Bố cục 2 tầng: Cây bụi thấp cao 1.5m cản gió sát đất; Rặng tre cao 7m nâng luồng bão lướt qua nóc.",
      benefit: "Giảm 50% - 60% động năng gió bão trước khi tiếp xúc mặt tiền công trình."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Kiến Trúc & Kết Cấu Chống Tốc Mái",
      shape: "Mái Bốn Mái (Mái Hiệp/Bát Giác) độ dốc 30° - 35°. Mái hiên thấp 2.2m, vươn 1.5m.",
      position: "Mặt tiền lùi sâu 1.5m làm tiền sảnh đệm; cửa sổ khuất gió có lam thoát áp.",
      structure: "Đai thép D10 neo xà gồ dầm bê tông; ke chống bão bắt vít cách nhau < 80cm; lam gió thoát áp tường hồi.",
      benefit: "Cân bằng áp suất trong - ngoài, triệt tiêu hoàn toàn lực nâng Bernoulli."
    }
  },
  {
    id: "nha_chan_chungcu",
    name: "Nhà Bị Kẹp",
    code: "MẪU 02 - MÁI ĐÓN CHỮ V & GÓC BO TRÒN",
    summary: "Hóa giải lực gió cuộn thác đổ (Downwash) và hiệu ứng phễu gió bóp nghẹt (Venturi / Thiên Trảm Sát) cho nhà thấp tầng cạnh cao ốc.",
    problem_analysis: "Gió đập vào mặt đứng chung cư dội thẳng xuống nóc nhà thấp tạo xoáy lốc; khe hẹp gia tốc gió gấp 2.4 lần.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <rect x="40" y="20" width="180" height="340" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <text x="130" y="50" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">CHUNG CƯ CAO TẦNG</text>
        <path d="M20,100 L180,100 Q210,100 210,160 L210,310" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="240" y="200" fill="#F87171" font-size="11" font-weight="800">Gió Cuộn Thác Đổ (Downwash) ↓</text>
        <g transform="translate(320, 180)">
          <path d="M20,60 Q0,60 0,80 L0,180 L280,180 L280,60 Z" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="140" y="120" fill="#FEF3C7" font-size="13" font-weight="700" text-anchor="middle">NHÀ THẤP TẦNG (HÓA GIẢI)</text>
          <polygon points="-30,35 60,60 10,75" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
          <text x="15" y="25" fill="#38BDF8" font-size="10" font-weight="700">Mái Đón Chữ V Nghiêng 15° (Hất Gió Lên)</text>
          <path d="M-15,60 Q-25,10 40,-20" fill="none" stroke="#34D399" stroke-width="3" stroke-dasharray="4,3"/>
          <rect x="25" y="110" width="10" height="70" fill="#D97706" stroke="#FEF3C7"/>
        </g>
        <rect x="0" y="360" width="800" height="60" fill="#1E293B"/>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Phân Tán Lực Dội",
      species: "Cau Vua, Cọ Dầu, Cây Bàng Đài Loan.",
      distance: "Trồng sát tường biên giáp khe cao ốc từ 1.5m - 2.5m.",
      structure: "Hàng cây thân thẳng tán ngang xé nhỏ dòng gió dội từ trên cao xuống.",
      benefit: "Tiêu tán 40% lực xung kích của luồng gió thác đổ Downwash."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Mái Đón Chữ V & Vát Bo Tròn",
      shape: "Mái đón sảnh chữ V nghiêng 15° vươn 2.0m; góc tường bo tròn R >= 50cm.",
      position: "Cửa chính lùi sâu 2.0m; không mở cửa sổ lớn đối diện khe hẹp giữa 2 cao ốc.",
      structure: "Kính dán an toàn 2 lớp 10.38mm; tấm bình phong hoa gió cách cửa chính 1.5m.",
      benefit: "Bẻ gãy luồng gió lốc Venturi và hất ngược dòng Downwash."
    }
  },
  {
    id: "nha_dau_hem_ngaba",
    name: "Nhà Đầu Hẻm",
    code: "MẪU 03 - BÌNH PHONG KHÚC CHIẾT",
    summary: "Hóa giải Thương Phong Sát từ ngã ba hoặc con hẻm dài đâm thẳng vào tim nhà bằng nguyên lý khúc chiết tụ khí.",
    problem_analysis: "Con hẻm dài như ống nén khí gia tốc luồng gió đâm trực diện cướp sạch nhiệt năng và mang bụi bặm ô nhiễm.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <rect x="40" y="160" width="260" height="100" fill="#1E293B" stroke="#334155"/>
        <text x="170" y="215" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">CON HẺM DÀI NÉN KHÍ</text>
        <path d="M50,210 L300,210" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="170" y="195" fill="#F87171" font-size="11" font-weight="800">Thương Phong Sát (Áp Lực Cao) →</text>
        <g transform="translate(320, 100)">
          <rect x="0" y="0" width="440" height="220" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="220" y="30" fill="#FEF3C7" font-size="13" font-weight="700" text-anchor="middle">MẶT BẰNG CÓ BÌNH PHONG KHÚC CHIẾT</text>
          <rect x="40" y="80" width="14" height="80" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.5"/>
          <circle cx="30" cy="50" r="18" fill="#10B981" opacity="0.8"/>
          <circle cx="30" cy="190" r="18" fill="#10B981" opacity="0.8"/>
          <path d="M-10,110 Q30,110 30,70 Q30,40 80,60 Q120,80 120,110" fill="none" stroke="#34D399" stroke-width="3"/>
          <rect x="140" y="80" width="30" height="60" fill="#1E293B" stroke="#34D399" stroke-width="2"/>
          <text x="155" y="115" fill="#34D399" font-size="9" font-weight="700" text-anchor="middle">Cửa Lệch</text>
        </g>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Lọc Khí & Giảm Tốc",
      species: "Trúc Quân Tử, Trắc Bách Diệp, Cây Dâm Bụt, Hoa Giấy.",
      distance: "Bố trí thành bồn hoa/vách cây xanh ngay trước sảnh đệm.",
      structure: "Tán cây xốp đan xen tạo màng lọc cơ học bẻ gãy xung lực của luồng khí thẳng.",
      benefit: "Giữ bụi mịn, giảm 50% vận tốc gió đâm thẳng vào cửa."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Bình Phong Khúc Chiết",
      shape: "Bình phong hoa gió/đá cao 1.8m - 2.2m, rộng hơn cửa chính 0.5m mỗi bên.",
      position: "Đặt cách cửa chính 1.8m - 2.5m chắn thẳng trục tim con hẻm; cửa chính mở lệch bên.",
      structure: "Tường hoa gió có lỗ thoáng 25% để khí lưu thông êm ái.",
      benefit: "Biến luồng sát khí trực xung thành dòng sinh khí uốn lượn hình chữ S."
    }
  },
  {
    id: "nha_thoat_nhiet_muahe",
    name: "Thoát Nhiệt",
    code: "MẪU 04 - GIẾNG TRỜI THIÊN TÂM",
    summary: "Ứng dụng Hiệu ứng Cột Áp Ống Khói (Stack Effect) và ao hồ bán nguyệt góc Tây Nam hạ nhiệt gió phơn cho miền Trung và miền Nam.",
    problem_analysis: "Nắng gắt hun nóng mái nhà lên 50°C tỏa nhiệt xuống trần; gió Tây Nam thổi khô rát làm nhà oi bức ngột ngạt.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <path d="M40,320 Q120,280 180,320 L180,380 L40,380 Z" fill="#0284C7" opacity="0.8"/>
        <text x="110" y="345" fill="#FEF3C7" font-size="10" font-weight="700" text-anchor="middle">Ao Nước Tây Nam (-4°C)</text>
        <path d="M120,300 C200,280 240,290 320,290" fill="none" stroke="#38BDF8" stroke-width="3"/>
        <g transform="translate(300, 100)">
          <rect x="0" y="80" width="400" height="180" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
          <polygon points="200,0 -20,60 420,60" fill="#F59E0B" stroke="#FEF3C7" stroke-width="2"/>
          <rect x="160" y="60" width="80" height="200" fill="#0F172A" stroke="#38BDF8" stroke-dasharray="4,3"/>
          <text x="200" y="170" fill="#38BDF8" font-size="11" font-weight="700" text-anchor="middle">GIẾNG TRỜI (Ống Khói)</text>
          <path d="M180,250 L180,50 L170,20" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="4,2"/>
          <text x="200" y="35" fill="#F87171" font-size="10" font-weight="800" text-anchor="middle">Khí Nóng Thoát Nóc ↑</text>
        </g>
        <rect x="0" y="360" width="800" height="60" fill="#1E293B"/>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Che Bức Xạ Hướng Tây",
      species: "Cây Lộc Vừng, Hoa Giấy, Cây Bàng, Giàn Dây Leo Cát Đằng.",
      distance: "Bố trí giàn lam che nắng mặt hướng Tây và cây bóng mát cách hiên 3m - 5m.",
      structure: "Màn chắn xanh sinh học hấp thụ bức xạ nhiệt mặt trời trước khi chiếu vào tường.",
      benefit: "Giảm nhiệt độ bề mặt tường hướng Tây từ 6°C - 8°C."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Giếng Trời & Mái Đệm 2 Lớp",
      shape: "Giếng trời diện tích tối thiểu 5% - 8% sàn; cửa chớp đỉnh giếng trời nghiêng 45°.",
      position: "Đặt tại vị trí Trung Cung (giữa nhà) tạo luồng hút đối lưu thẳng đứng.",
      structure: "Mái ngói 2 lớp: Ngói trên và trần dưới cách nhau 12cm có đối lưu không khí.",
      benefit: "Tạo luồng gió mát tự nhiên 24/7, tiết kiệm 40% điện năng."
    }
  },
  {
    id: "nha_dinh_doi_suon_doc",
    name: "Nhà Sườn Dốc",
    code: "MẪU 05 - BÁN ÂM NƯƠNG ĐỊA HÌNH",
    summary: "Hóa giải hiệu ứng gia tốc gió nén khi leo dốc (Topographic Speed-up) cho nhà biệt thự đồi dốc, vùng cao nguyên.",
    problem_analysis: "Luồng gió gặp sườn dốc bị nén sít lại làm vận tốc tại đỉnh đồi tăng gấp 1.4 - 2.0 lần, kèm theo nguy cơ sạt lở đất móng.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <path d="M0,380 Q250,360 400,220 L800,220 L800,420 L0,420 Z" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <path d="M10,340 Q250,320 380,180 L790,180" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="350" y="160" fill="#F87171" font-size="11" font-weight="800">Gió Nén Gia Tốc (2.0x) →</text>
        <g transform="translate(440, 110)">
          <polygon points="0,110 260,110 260,0 120,0" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="130" y="70" fill="#FEF3C7" font-size="12" font-weight="700" text-anchor="middle">NHÀ NƯƠNG SƯỜN ĐỒI</text>
          <line x1="0" y1="110" x2="120" y2="0" stroke="#F59E0B" stroke-width="4"/>
          <line x1="120" y1="0" x2="260" y2="0" stroke="#F59E0B" stroke-width="4"/>
          <path d="M-20,120 L110,10 L280,10" fill="none" stroke="#34D399" stroke-width="3"/>
          <text x="180" y="-10" fill="#34D399" font-size="10" font-weight="700">Gió Trượt Êm Qua Nóc</text>
        </g>
        <g transform="translate(180, 260)">
          <circle cx="20" cy="40" r="16" fill="#059669"/>
          <circle cx="45" cy="20" r="20" fill="#10B981"/>
          <text x="30" y="70" fill="#34D399" font-size="9" text-anchor="middle">Rừng Giữ Đất</text>
        </g>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Giữ Đất & Phân Luồng",
      species: "Cây Thông, Keo Dậu, Cỏ Vetiver (rễ sâu 3m chống trượt lở đất dốc).",
      distance: "Trồng phủ xanh toàn bộ sườn dốc phía trước và hai bên hông nhà.",
      structure: "Hệ thống rễ cọc bám sâu vào tầng đá mẹ giữ vững taluy móng.",
      benefit: "Chống sạt lở móng 100% và giảm 40% vận tốc gió gia tốc."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Nhà Bán Âm & Mái Xuôi Dốc",
      shape: "Công trình thấp 1 tầng, mái dốc xuôi theo chiều gió leo dốc; vát cạnh tròn.",
      position: "Lùi xa mép bờ dốc tối thiểu khoảng cách bằng chiều cao bờ dốc; lưng tựa sườn đồi.",
      structure: "Móng bè cắm sâu vào tầng đá gốc; rãnh thoát nước ngầm chữ V quanh móng.",
      benefit: "Tránh hoàn toàn vùng áp lực gió xoáy cực đại tại mép đồi."
    }
  },
  {
    id: "nha_chong_nom_am",
    name: "Chống Nồm Ẩm",
    code: "MẪU 06 - CÁCH NHIỆT SÀN & ĐỆM XỈ THAN",
    summary: "Giải pháp triệt tiêu hiện tượng ngưng tụ điểm sương sàn nhà và ẩm mốc chân tường mùa xuân cho Miền Bắc và Bắc Trung Bộ.",
    problem_analysis: "Gió Đông Nam ẩm độ > 95% tràn vào gặp sàn nhà lạnh ngưng tụ nước thành vũng gây trơn trượt, mốc tường và chập điện âm.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <rect x="0" y="340" width="800" height="80" fill="#1E293B"/>
        <line x1="0" y1="340" x2="800" y2="340" stroke="#475569" stroke-width="2"/>
        <g transform="translate(100, 120)">
          <!-- Khối móng sàn cách ẩm -->
          <rect x="0" y="100" width="600" height="120" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="300" y="80" fill="#FEF3C7" font-size="13" font-weight="700" text-anchor="middle">MẶT CẮT KẾT CẤU SÀN CHỐNG NỒM ĐIỂM SƯƠNG</text>
          <!-- Lớp xỉ than cách nhiệt -->
          <rect x="20" y="140" width="560" height="35" fill="#334155" stroke="#F59E0B"/>
          <text x="300" y="162" fill="#FBBF24" font-size="10" font-weight="700" text-anchor="middle">Lớp Đệm Xỉ Than Hoạt Tính / Gốm Xốp Cách Nhiệt (15cm - 20cm)</text>
          <!-- Màng chống ẩm PE -->
          <line x1="20" y1="135" x2="580" y2="135" stroke="#38BDF8" stroke-width="3" stroke-dasharray="6,2"/>
          <text x="300" y="130" fill="#38BDF8" font-size="9" text-anchor="middle">Màng Chống Ẩm PE 2 Lớp Chống Thấm Ngược</text>
          <!-- Lớp gạch gốm bề mặt ấm -->
          <rect x="20" y="105" width="560" height="25" fill="#1E293B" stroke="#34D399"/>
          <text x="300" y="122" fill="#34D399" font-size="10" font-weight="700" text-anchor="middle">Gạch Gốm / Sàn Gỗ Tự Nhiên (Nhiệt Độ Bề Mặt Luôn > T_dew)</text>
        </g>
        <path d="M40,260 Q150,220 260,260" fill="none" stroke="#60A5FA" stroke-width="3" stroke-dasharray="4,2"/>
        <text x="150" y="245" fill="#60A5FA" font-size="10" font-weight="700">Khí Ẩm Đông Nam Bị Cách Ly</text>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Hút Ẩm & Thông Thoáng Sân",
      species: "Cây Cau, Trúc Chỉ Vàng hướng Nam; Tuyệt đối không trồng cây rậm rạp che kín sân.",
      distance: "Cách mép hiên tối thiểu 4m để nắng sớm chiếu khô ráo sân gạch.",
      structure: "Cây thân thẳng tạo khoảng hở lớn cho nắng và gió khô lưu thông sát mặt sân.",
      benefit: "Giảm 30% độ ẩm tồn đọng quanh chân móng."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Sàn Đệm Cách Nhiệt Điểm Sương",
      shape: "Cốt nền nhà tôn cao 45cm - 75cm so với mặt sân; chân tường ốp gạch gốm thông hơi.",
      position: "Cửa sổ hướng Đông Nam có rèm chắn ẩm; mở ô thoáng hút gió đối lưu khô ở mặt Bắc.",
      structure: "Lớp xỉ than dày 15-20cm lót dưới sàn bê tông; màng chống thấm PE 2 lớp.",
      benefit: "Sàn nhà luôn khô ráo 100% trong những ngày nồm ẩm khắc nghiệt nhất."
    }
  },
  {
    id: "nha_chong_lut_lo_mong",
    name: "Chống Lụt Sạt Móng",
    code: "MẪU 07 - MÓNG BÈ VƯỢT LŨ & SÀN CỨU HỘ",
    summary: "Thiết kế móng bè bê tông cốt thép chống xói lở đất phù sa và sàn tầng 1 vượt đỉnh lũ lịch sử cho Miền Trung & Đồng Bằng Sông Cửu Long.",
    problem_analysis: "Nước lũ dâng ngập cuốn trôi đất móng nông, dòng chảy xiết tạo lực đẩy thủy tĩnh phá vỡ tường gạch.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <rect x="0" y="320" width="800" height="100" fill="#0284C7" opacity="0.6"/>
        <text x="120" y="350" fill="#FEF3C7" font-size="12" font-weight="700">MỰC NƯỚC LŨ DÂNG CAO</text>
        <g transform="translate(260, 80)">
          <!-- Cọc móng sâu chống xói -->
          <rect x="40" y="240" width="20" height="90" fill="#475569"/>
          <rect x="220" y="240" width="20" height="90" fill="#475569"/>
          <!-- Móng bè cốt thép liên kết -->
          <rect x="20" y="220" width="240" height="25" fill="#334155" stroke="#FEF3C7"/>
          <text x="140" y="237" fill="#FEF3C7" font-size="10" font-weight="700" text-anchor="middle">Móng Bè Cốt Thép Chống Lún Lệch</text>
          <!-- Khung nhà nâng cao vượt lũ -->
          <rect x="30" y="40" width="220" height="180" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <line x1="30" y1="120" x2="250" y2="120" stroke="#F59E0B" stroke-width="3"/>
          <text x="140" y="110" fill="#FBBF24" font-size="10" font-weight="800" text-anchor="middle">Sàn Gác Lửng Vượt Lũ (+0.8m)</text>
        </g>
        <path d="M40,360 L240,360" fill="none" stroke="#38BDF8" stroke-width="3"/>
        <text x="140" y="380" fill="#E0F2FE" font-size="10">Dòng Chảy Xiết Không Xói Móng</text>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Giữ Đất Chống Xói Mòn Chân Móng",
      species: "Cây Tràm, Cây Bần, Dừa Nước, Cỏ Vetiver.",
      distance: "Trồng thành dải bao bọc quanh bờ ao và chân móng phía thượng lưu dòng lũ.",
      structure: "Hệ rễ chùm đan kết dày đặc như tấm lưới thép tự nhiên giữ chặt lớp đất phù sa.",
      benefit: "Triệt tiêu 70% lực xói lở của dòng lũ chảy xiết qua móng."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Cốt Nền Vượt Lũ & Khung Bê Tông",
      shape: "Nhà có sàn gác lửng cứu hộ cao hơn đỉnh lũ lịch sử + 0.8m; cầu thang thoát hiểm lên nóc.",
      position: "Cửa tầng trệt thiết kế chịu ngập; tường tầng 1 xây gạch đặc chống thấm.",
      structure: "Móng bè bê tông cốt thép toàn khối liên kết cọc cắm sâu vào tầng cuội sỏi.",
      benefit: "Bảo vệ tài sản và tính mạng an toàn tuyệt đối khi có đại hồng thủy."
    }
  },
  {
    id: "nha_goc_pho_2_mat_tien",
    name: "Góc Phố 2 Mặt",
    code: "MẪU 08 - VÁT CẠNH VÒM CONG TIÊU XOÁY",
    summary: "Hóa giải gió xoáy giao lộ đô thị và xung sát góc ngã tư cho nhà phố 2 mặt tiền.",
    problem_analysis: "Giao lộ đô thị tạo ra các luồng gió xoáy đa hướng va đập vào 2 mặt tiền gây nứt tường và ồn ào bụi bặm.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <path d="M40,360 L760,360" stroke="#475569" stroke-width="2"/>
        <path d="M200,40 L200,360" stroke="#475569" stroke-width="2"/>
        <text x="100" y="320" fill="#94A3B8" font-size="11" font-weight="700">NGÃ TƯ GIAO LỘ</text>
        <g transform="translate(240, 100)">
          <!-- Nhà vát góc bo tròn -->
          <path d="M40,0 L260,0 L260,220 L0,220 L0,40 Q0,0 40,0 Z" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="140" y="110" fill="#FEF3C7" font-size="13" font-weight="700" text-anchor="middle">NHÀ VÁT GÓC BO TRÒN R=1.5m</text>
          <!-- Ban công cong tiêu xoáy -->
          <path d="M-15,40 Q-15,-15 40,-15" fill="none" stroke="#F59E0B" stroke-width="4"/>
          <text x="35" y="-20" fill="#FBBF24" font-size="10" font-weight="700">Ban Công Cong Xé Gió Xoáy</text>
        </g>
        <path d="M120,180 Q200,180 200,240 Q200,300 260,300" fill="none" stroke="#34D399" stroke-width="3"/>
        <text x="140" y="165" fill="#34D399" font-size="10">Gió Xoáy Giao Lộ Trượt Êm</text>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Tán Tròn Điều Hòa Giao Lộ",
      species: "Cây Lộc Vừng, Cây Ngọc Lan, Cây Sanh Bonsai.",
      distance: "Bố trí tại góc vát mặt tiền sân trước.",
      structure: "Tán cây tròn đều hấp thu bụi mịn và tiếng ồn giao thông từ ngã tư.",
      benefit: "Giảm 60% tiếng ồn và tạo điểm tụ sinh khí tại góc phố."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Vát Cạnh & Ban Công Lượn Sóng",
      shape: "Vát cạnh góc nhà bán kính R >= 1.2m hoặc vát 45° chiều rộng vát >= 2.0m; ban công lượn sóng.",
      position: "Cửa chính bố trí tại cạnh vát đón khí từ cung cát; lam nhôm chữ Z chắn mưa tạt.",
      structure: "Khung vách kính cong cường lực 12mm cách âm cách nhiệt.",
      benefit: "Triệt tiêu góc nhọn xung sát, biến giao lộ ồn ào thành mặt tiền kinh doanh thịnh vượng."
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
