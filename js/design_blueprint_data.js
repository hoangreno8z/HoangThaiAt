/**
 * DỮ LIỆU CÔNG CỤ: GỢI Ý THIẾT KẾ KHÍ ĐỘNG HỌC & CỔ TRUYỀN
 * Tích hợp toàn diện Phần 1 (Lý thuyết Cổ Thư & Định luật Khí Động Học)
 * và Phần 2 (Bộ Bản Vẽ 5 Hình Mẫu Trực Quan, Cây Cối, Kết Cấu Kiến Trúc).
 */

const DESIGN_BLUEPRINT_THEORY = {
  title: "Lý Thuyết Khí Động Học & Cổ Thư Phong Thủy Trị Thiên Tai",
  sections: [
    {
      id: "bernoulli_uplift",
      title: "1. Bản Chất Sự Cố Tốc Mái Bão & Lực Nâng Bernoulli",
      classic_source: "《葬書》 (Táng Thư - Quách Phác: Khí Thừa Phong Tắc Tán & Quát Cốt Phong)",
      physics_law: "Định Luật Bernoulli: Áp Suất Động & Chênh Lệch Áp Suất Âm Mái Nhà (\u0394P = 0.5 * \u03C1 * (v_top^2 - v_in^2))",
      mechanism: "Khi luồng gió bão giật với vận tốc cao (cấp 10-12, v = 28 - 35 m/s) lướt qua nóc nhà, các đường dòng không khí bị bóp nghẽn và tăng tốc trên bề mặt mái. Theo định luật Bernoulli, vận tốc gió càng tăng thì áp suất tĩnh phía trên mái càng giảm sâu tạo thành vùng Áp Suất Âm (Suction/Uplift). Trong khi đó, không khí bên trong nhà vẫn duy trì áp suất dương (khí tĩnh). Sự chênh lệch áp suất khổng lồ này sinh ra LỰC NÂNG BỐC MÁI (Uplift Force) lên tới hàng trăm kg/m2, đủ sức bẻ gãy đinh vít và cuốn bay toàn bộ mái tôn hoặc mái ngói.",
      classical_view: "Quách Phác trong 《Táng Thư》 cảnh báo: 'Khí thừa phong tắc tán' — Khí gặp gió cuồng loạn ắt bị xé tan. Phong thủy tối kỵ thế 'Quát Cốt Phong' (gió cạo xương) là luồng gió mạnh di chuyển thẳng tắp với gia tốc cực nhanh phá nát sinh khí và kết cấu gia trạch.",
      remedy_principle: "1. Cân bằng áp suất trong - ngoài: Bố trí lam gió hở vĩnh viễn ở vách dưới mái hoặc khe thoát áp mặt khuất gió (Leeward); khi bão đến không đóng kín bưng 100%, hé cửa mặt sau để xả áp suất dương bên trong.\n2. Khí động học góc dốc mái: Sử dụng Mái Bốn Mái (Mái Hiệp/Bát Giác) độ dốc 30° - 35°. Luồng khí trượt êm ôm sát mái, triệt tiêu vùng xoáy tách dòng và giảm 50% - 70% lực bốc mái so với mái dốc hai phía hoặc mái phẳng."
    },
    {
      id: "venturi_downwash",
      title: "2. Gió Luồn Khe Hẹp (Venturi) & Gió Cuộn Thác Đổ (Downwash Dưới Chân Cao Ốc)",
      classic_source: "《黃帝宅經》 (Hoàng Đế Trạch Kinh: Thiên Trảm Sát & Tứ Diện Phong Ao)",
      physics_law: "Hiệu Ứng Phễu Gió Venturi (A1*v1 = A2*v2) & Hiện Tượng Gió Cuộn Đảo Dòng (Corner Downwash Vortex)",
      mechanism: "Khi khối không khí khổng lồ của bão đập vào mặt đứng của tòa nhà cao tầng (chung cư, cao ốc), luồng gió không thể đi xuyên qua tường nên bị chia làm 2 nhánh: Nhánh trên tràn qua nóc, và nhánh dưới bị nén dội ngược thẳng đứng xuống mặt đất với vận tốc cực lớn (Gió Cuộn Thác Đổ - Downwash). Đồng thời, khi luồng gió này bị ép qua khe hẹp giữa 2 khối nhà cao tầng, thiết diện lưu thông bị co hẹp làm vận tốc gió tăng vọt từ 1.5 đến 2.5 lần (Hiệu ứng Phễu Gió Venturi), tạo thành những luồng xoáy xé toạc cửa sổ, giật bung mái hiên và quật ngã người đi bộ.",
      classical_view: "《Hoàng Đế Trạch Kinh》 chỉ rõ: Nhà nằm đối diện khe hẹp giữa 2 tòa nhà lớn phạm vào thế 'Thiên Trảm Sát' (Thanh đao của Trời chém xuống), dẫn đến khí tán gia bại, tai nạn huyết quang. Nhà trơ trọi giữa đất trống phạm thế 'Tứ Diện Phong Ao' (Bốn bề gió quật), kết cấu nhanh suy đổ.",
      remedy_principle: "1. Mái đón sảnh chữ V hất ngược: Lắp đặt mái sảnh cong chữ V nghiêng 15° tại mặt tiền để hứng và hất ngược luồng gió Downwash lên trên, ngăn gió dội vào nóc nhà.\n2. Vát cong bo tròn góc tường (R >= 50cm): Triệt tiêu điểm tụ áp suất cao, xé luồng khí nén rẽ sang 2 bên.\n3. Tiền sảnh thụt lùi (1.5m - 2.0m) kết hợp Tấm bình phong tán khí: Tạo vùng đệm khí tĩnh bảo vệ cánh cửa chính."
    },
    {
      id: "stack_effect_cooling",
      title: "3. Cơ Chế Thoát Hơi Nóng Mùa Hè & Trị Gió Phơn Tây Nam (Gió Lào)",
      classic_source: "《考工記》 (Khảo Công Ký: Thiên Tỉnh Thiên Tâm) & 《陽宅十書》 (Dương Trạch Thập Thư: Thủy Khí Hạ Nhiệt)",
      physics_law: "Hiệu Ứng Cột Áp Ống Khói (Thermal Stack Effect: \u0394P = \u03C1 * g * H * \u0394T / T) & Đối Lưu Nhiệt Tự Nhiên",
      mechanism: "Vào mùa hè và khi có gió Phơn Tây Nam (Gió Lào), không khí trong nhà bị hun nóng bởi bức xạ mặt trời. Không khí nóng có khối lượng riêng nhẹ hơn sẽ bốc lên cao tích tụ sát trần nhà. Nếu trần nhà bị bịt kín, nhiệt độ sẽ tích tụ lên tới 45°C - 50°C tỏa ngược xuống không gian sinh hoạt. Cơ chế thoát nhiệt tự nhiên hiệu quả nhất là tạo độ chênh áp suất nhiệt (Hiệu Ứng Ống Khói): Mở cửa thoát khí nóng trên đỉnh mái (Giếng trời) và mở cửa đón khí mát ở chân tường tầng trệt.",
      classical_view: "Cổ nhân thiết kế nhà truyền thống luôn có 'Thiên Tỉnh' (Giếng trời - Giếng hút khí của Trời) ở Trung Cung để âm dương giao hòa, đón gió mát và thoát nhiệt; phía trước hoặc góc Tây Nam luôn bố trí ao hồ bán nguyệt để nước bốc hơi làm mát luồng gió trước khi vào nhà.",
      remedy_principle: "1. Giếng trời trung tâm (Thiên Tỉnh) có cửa chớp thoát nhiệt trên nóc: Tạo lực hút đối lưu liên tục 24/7.\n2. Mái 2 lớp cách nhiệt: Lớp ngói trên và lớp trần dưới cách nhau 10-15cm có luồng khí lưu thông giải nhiệt.\n3. Mặt nước ao hồ/tiểu cảnh góc Tây Nam: Hạ nhiệt độ gió vào nhà từ 3°C - 5°C."
    }
  ]
};

const DESIGN_BLUEPRINTS = [
  {
    id: "nha_bao_mientrung",
    name: "1. Nhà Vùng Bão Miền Trung & Ven Biển Chống Tốc Mái",
    code: "MẪU 01 - MÁI BỐN MÁI 32° & ĐAI TRE PHÂN TẦNG",
    summary: "Thiết kế tối ưu triệt tiêu lực nâng bốc mái Bernoulli và phân tán bão gió cấp 10 - 12 cho khu vực ven biển, đồng bằng trống trải Miền Trung.",
    problem_analysis: "Nhà mái tôn dốc 1 phía hoặc mái ngói dốc 2 phía thông thường bị bão giật xé toạc vì lực nâng Bernoulli mặt trên và áp suất dương đẩy từ bên trong. Tường rào kín khiến bão bị hất ngược đập mạnh vào mái.",
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

        <!-- NỀN ĐẤT -->
        <rect x="0" y="340" width="800" height="80" fill="#1E293B"/>
        <line x1="0" y1="340" x2="800" y2="340" stroke="#475569" stroke-width="2"/>

        <!-- ĐAI TRE PHÂN TẦNG CHẮN GIÓ (PHÍA ĐÓN GIÓ) -->
        <g transform="translate(60, 240)">
          <!-- Cây bụi thấp -->
          <circle cx="20" cy="80" r="18" fill="#059669" opacity="0.8"/>
          <circle cx="45" cy="85" r="15" fill="#10B981" opacity="0.8"/>
          <!-- Rặng tre thân dẻo -->
          <path d="M70,100 Q75,40 65,0 Q80,45 80,100" fill="#047857"/>
          <circle cx="65" cy="0" r="22" fill="#10B981" opacity="0.85"/>
          <path d="M100,100 Q105,30 95,-20 Q110,40 110,100" fill="#047857"/>
          <circle cx="95" cy="-20" r="26" fill="#34D399" opacity="0.85"/>
          <text x="50" y="115" fill="#34D399" font-size="11" font-weight="700" text-anchor="middle">Đai Tre Phân Tầng (Cách 12m)</text>
        </g>

        <!-- LUỒNG GIÓ BÃO BỊ NÂNG LÊN QUA MÁI -->
        <path d="M10,200 C150,180 180,140 280,120 C380,100 480,100 580,110 C680,120 780,130 790,130" fill="none" stroke="url(#windGrad1)" stroke-width="4" stroke-dasharray="6,4"/>
        <path d="M10,230 C150,210 180,170 280,145 C380,125 480,125 580,135 C680,145 780,155 790,155" fill="none" stroke="url(#windGrad1)" stroke-width="3" stroke-dasharray="6,4"/>
        <path d="M10,260 C150,240 180,210 280,170 C380,150 480,150 580,160 C680,170 780,180 790,180" fill="none" stroke="url(#windGrad1)" stroke-width="2"/>

        <!-- NHÀ MÁI BỐN MÁI 32 ĐỘ -->
        <g transform="translate(340, 160)">
          <!-- Thân nhà -->
          <rect x="0" y="70" width="220" height="110" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
          <!-- Cửa chính thụt lùi -->
          <rect x="75" y="110" width="40" height="70" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5"/>
          <text x="95" y="150" fill="#FBBF24" font-size="9" text-anchor="middle">Tiền Sảnh</text>
          <text x="95" y="162" fill="#FBBF24" font-size="8" text-anchor="middle">Lùi 1.8m</text>
          <!-- Cửa sổ khuất gió -->
          <rect x="165" y="105" width="30" height="40" fill="#0284C7" opacity="0.7"/>

          <!-- Mái bốn mái dốc 32 độ -->
          <polygon points="110,0 -30,70 250,70" fill="url(#roofGrad1)" stroke="#FEF3C7" stroke-width="2"/>
          <!-- Sống mái / Ngói nóc -->
          <line x1="80" y1="18" x2="140" y2="18" stroke="#FEF3C7" stroke-width="3"/>
          <text x="110" y="-10" fill="#FEF3C7" font-size="12" font-weight="700" text-anchor="middle">Mái Bốn Mái Dốc 32° (Khí Động Học)</text>

          <!-- Mũi tên chỉ lực nén áp suất an toàn -->
          <line x1="40" y1="25" x2="55" y2="45" stroke="#34D399" stroke-width="2" marker-end="url(#arrow)"/>
          <text x="40" y="18" fill="#34D399" font-size="10" font-weight="700">Triệt Tiêu Lực Bốc</text>

          <!-- Lam thoát áp mặt sau -->
          <rect x="215" y="72" width="15" height="12" fill="#38BDF8" stroke="#0284C7"/>
          <text x="260" y="80" fill="#38BDF8" font-size="10">Lam Thoát Áp</text>
        </g>

        <!-- CHÚ THÍCH HƯỚNG GIÓ CHÍNH -->
        <text x="30" y="180" fill="#38BDF8" font-size="13" font-weight="800">LUỒNG BÃO CẤP 12 →</text>
        <text x="30" y="198" fill="var(--text-muted)" font-size="10">Vận tốc 33 m/s</text>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Chắn Bão (Phong Đai Bậc Thang)",
      species: "Tre Ngà (bụi dẻo liên kết rễ chùm), Phi Lao (rễ cọc sâu xẻ gió), Cau Vua (thân thẳng không gãy cành), Cây Dâm Bụt (tầng bụi thấp).",
      distance: "Trồng cách tường nhà từ 10m đến 15m (bằng 2 - 3 lần chiều cao công trình). Tuyệt đối không trồng cây gỗ cành giòn sát mép mái.",
      structure: "Bố cục 2 tầng: Tầng ngoài là cây bụi thấp cao 1.5m - 2.0m cản gió sát đất; Tầng trong là rặng tre/phi lao cao 6m - 8m nâng luồng bão lướt qua nóc.",
      benefit: "Giảm 45% - 60% động năng gió bão trước khi tiếp xúc mặt tiền công trình."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Kiến Trúc & Kết Cấu Chống Tốc Mái",
      shape: "Mái Bốn Mái (Mái Hiệp/Bát Giác) độ dốc 30° - 35°. Mái đua (hiên) thấp 2.2m - 2.4m, độ vươn hiên 1.5m - 1.8m.",
      position: "Mặt tiền lùi sâu tối thiểu 1.5m làm tiền sảnh đệm; nhà quay hướng Nam hoặc Đông Nam đón gió lành, tường lưng hướng Bắc xây dày.",
      structure: "Đai thép D10 neo xà gồ trực tiếp vào dầm bê tông cốt thép; ke chống bão bắt vít cách nhau < 80cm; bố trí lam gió hở 0.2m2 ở tường hồi mặt khuất gió.",
      benefit: "Cân bằng áp suất trong - ngoài, triệt tiêu hoàn toàn lực nâng Bernoulli, giữ mái vững vàng trước bão cấp 12."
    }
  },
  {
    id: "nha_chan_chungcu",
    name: "2. Nhà Dưới Chân Chung Cư & Kẹp Giữa 2 Tòa Cao Ốc",
    code: "MẪU 02 - MÁI ĐÓN CHỮ V & GÓC BO TRÒN XÉ GIÓ",
    summary: "Thiết kế hóa giải lực gió cuộn thác đổ (Downwash) và hiệu ứng phễu gió bóp nghẹt (Venturi / Thiên Trảm Sát) cho nhà thấp tầng cạnh cao ốc.",
    problem_analysis: "Gió đập vào mặt đứng chung cư dội thẳng xuống nóc nhà thấp tạo xoáy lốc chân móng; khe hẹp giữa 2 khối nhà gia tốc gió gấp 2.4 lần xé toạc cửa sổ và mái hiên.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <defs>
          <linearGradient id="windDown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.3"/>
          </linearGradient>
        </defs>

        <!-- TÒA NHÀ CHUNG CƯ CAO TẦNG BÊN CẠNH -->
        <rect x="40" y="20" width="180" height="340" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <text x="130" y="50" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">CHUNG CƯ CAO TẦNG</text>
        <!-- Các ô cửa sổ cao ốc -->
        <g fill="#0F172A" stroke="#334155">
          <rect x="60" y="70" width="30" height="25"/>
          <rect x="105" y="70" width="30" height="25"/>
          <rect x="150" y="70" width="30" height="25"/>
          <rect x="60" y="110" width="30" height="25"/>
          <rect x="105" y="110" width="30" height="25"/>
          <rect x="150" y="110" width="30" height="25"/>
          <rect x="60" y="150" width="30" height="25"/>
          <rect x="105" y="150" width="30" height="25"/>
          <rect x="150" y="150" width="30" height="25"/>
        </g>

        <!-- DÒNG GIÓ ĐẬP VÀO CAO ỐC VÀ DỘI XUỐNG ĐẤT (DOWNWASH) -->
        <path d="M20,100 L180,100 Q210,100 210,160 L210,310" fill="none" stroke="url(#windDown)" stroke-width="4" stroke-dasharray="6,4"/>
        <path d="M20,130 L160,130 Q195,130 195,180 L195,310" fill="none" stroke="url(#windDown)" stroke-width="3"/>
        <text x="240" y="200" fill="#F87171" font-size="11" font-weight="800">Gió Cuộn Thác Đổ (Downwash) ↓</text>

        <!-- KHE HẸP THIÊN TRẢM SÁT -->
        <text x="270" y="320" fill="#FBBF24" font-size="10" font-weight="700" text-anchor="middle">Khe Hẹp Venturi (1.8x Tốc Độ)</text>

        <!-- NHÀ THẤP TẦNG CÓ GIẢI PHÁP MÁI ĐÓN CHỮ V & BO GÓC -->
        <g transform="translate(320, 180)">
          <!-- Thân nhà thấp tầng với góc vát bo tròn -->
          <path d="M20,60 Q0,60 0,80 L0,180 L280,180 L280,60 Z" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="140" y="120" fill="#FEF3C7" font-size="13" font-weight="700" text-anchor="middle">NHÀ THẤP TẦNG (HÓA GIẢI)</text>

          <!-- MÁI ĐÓN SẢNH CHỮ V HẤT NGƯỢC GIÓ -->
          <polygon points="-30,35 60,60 10,75" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
          <text x="15" y="25" fill="#38BDF8" font-size="10" font-weight="700">Mái Đón Chữ V Nghiêng 15° (Hất Gió Lên)</text>

          <!-- DÒNG KHÍ BỊ HẤT LÊN CAO -->
          <path d="M-15,60 Q-25,10 40,-20" fill="none" stroke="#34D399" stroke-width="3" stroke-dasharray="4,3"/>
          <text x="60" y="-10" fill="#34D399" font-size="10" font-weight="700">Gió Bị Hất Lên ↑</text>

          <!-- BÌNH PHONG GỖ TÁN KHÍ TRƯỚC SẢNH -->
          <rect x="25" y="110" width="10" height="70" fill="#D97706" stroke="#FEF3C7"/>
          <text x="30" y="95" fill="#FBBF24" font-size="9" text-anchor="middle">Bình Phong</text>

          <!-- Cửa chính lùi sâu -->
          <rect x="65" y="110" width="45" height="70" fill="#1E293B" stroke="#64748B"/>
        </g>

        <!-- NỀN ĐẤT -->
        <rect x="0" y="360" width="800" height="60" fill="#1E293B"/>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Phân Tán Lực Dội Thẳng Đứng",
      species: "Cau Vua, Cọ Dầu, Cây Bàng Đài Loan (tán phân tầng ngang).",
      distance: "Trồng sát tường biên giáp khe cao ốc từ 1.5m - 2.5m.",
      structure: "Hàng cây thân thẳng tán xòe ngang đóng vai trò như chiếc dù hứng và xé nhỏ dòng gió dội từ trên cao xuống.",
      benefit: "Tiêu tán 40% lực xung kích của luồng gió thác đổ Downwash."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Kiến Trúc Mái Đón Chữ V & Vát Bo Tròn",
      shape: "Mái đón sảnh chữ V nghiêng 15° vươn ra 2.0m; các góc tường nhà giáp khe hẹp bo tròn bán kính R >= 50cm hoặc vát 45°.",
      position: "Cửa chính lùi sâu 2.0m làm tiền sảnh đệm; tuyệt đối không mở cửa sổ lớn đối diện trực diện khe hút gió giữa 2 cao ốc.",
      structure: "Sử dụng kính dán an toàn 2 lớp dày 10.38mm hoặc cửa chớp giảm áp; đặt tường bình phong gạch hoa gió cách cửa chính 1.5m.",
      benefit: "Bẻ gãy luồng gió lốc Venturi và hất ngược dòng Downwash, bảo vệ không gian sống yên tĩnh và an toàn."
    }
  },
  {
    id: "nha_dau_hem_ngaba",
    name: "3. Nhà Ở Đầu Hẻm & Đối Diện Ngã Ba Hút Gió",
    code: "MẪU 03 - BÌNH PHONG KHÚC CHIẾT & TIỀN SẢNH ĐỆM",
    summary: "Hóa giải Thương Phong Sát (luồng khí nén thẳng như mũi giáo từ ngã ba/con hẻm dài đâm vào tim nhà) bằng nguyên lý khúc chiết tụ khí.",
    problem_analysis: "Con hẻm dài như ống nén khí gia tốc luồng gió đâm trực diện vào cửa chính cướp sạch nhiệt năng, gây bệnh đường hô hấp và mang theo bụi bặm ô nhiễm.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <!-- CON HẺM DÀI ĐÂM THẲNG -->
        <rect x="40" y="160" width="260" height="100" fill="#1E293B" stroke="#334155"/>
        <text x="170" y="215" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">CON HẺM DÀI NÉN KHÍ</text>

        <!-- LUỒNG KHÍ ĐÂM THẲNG NHƯ MŨI GIÁO -->
        <path d="M50,210 L300,210" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="170" y="195" fill="#F87171" font-size="11" font-weight="800">Thương Phong Sát (Áp Lực Cao) →</text>

        <!-- SÂN ĐỆM CÂY XANH & BÌNH PHONG CHỮ S -->
        <g transform="translate(320, 100)">
          <!-- Ranh giới đất -->
          <rect x="0" y="0" width="440" height="220" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="220" y="30" fill="#FEF3C7" font-size="13" font-weight="700" text-anchor="middle">MẶT BẰNG NHÀ CÓ SÂN ĐỆM & BÌNH PHONG KHÚC CHIẾT</text>

          <!-- BÌNH PHONG ĐÁ / TƯỜNG HOA GIÓ CHẮN THẲNG NGÃ BA -->
          <rect x="40" y="80" width="14" height="80" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.5"/>
          <text x="47" y="70" fill="#FBBF24" font-size="10" font-weight="700" text-anchor="middle">Bình Phong</text>

          <!-- CÂY XANH TÁN XỐP TIÊU ĐỘNG NĂNG -->
          <circle cx="30" cy="50" r="18" fill="#10B981" opacity="0.8"/>
          <circle cx="30" cy="190" r="18" fill="#10B981" opacity="0.8"/>
          <text x="30" y="215" fill="#34D399" font-size="9" text-anchor="middle">Vườn Đệm</text>

          <!-- DÒNG KHÍ BỊ BẺ CONG LƯỢN CHỮ S HIỀN HÒA -->
          <path d="M-10,110 Q30,110 30,70 Q30,40 80,60 Q120,80 120,110" fill="none" stroke="#34D399" stroke-width="3"/>
          <path d="M-10,110 Q30,110 30,150 Q30,180 80,160 Q120,140 120,110" fill="none" stroke="#34D399" stroke-width="3"/>
          <text x="120" y="55" fill="#34D399" font-size="10" font-weight="700">Khí Lượn Chữ S Tụ Khí</text>

          <!-- CỬA CHÍNH BỐ TRÍ LỆCH TRỤC -->
          <rect x="140" y="80" width="30" height="60" fill="#1E293B" stroke="#34D399" stroke-width="2"/>
          <text x="155" y="115" fill="#34D399" font-size="9" font-weight="700" text-anchor="middle">Cửa Lệch</text>
        </g>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Lọc Khí & Giảm Tốc",
      species: "Trúc Quân Tử, Trắc Bách Diệp, Cây Dâm Bụt, Hoa Giấy.",
      distance: "Bố trí thành bồn hoa/vách cây xanh ngay trước mặt tiền sân đệm.",
      structure: "Tán cây xốp đan xen nhau tạo thành màng lọc cơ học bẻ gãy xung lực của luồng khí thẳng.",
      benefit: "Giữ bụi mịn, giảm 50% vận tốc gió đâm thẳng vào cửa."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Bình Phong Khúc Chiết & Cửa Lệch Trục",
      shape: "Bình phong gạch hoa gió/đá cao 1.8m - 2.2m, rộng hơn bề rộng cửa chính 0.5m mỗi bên.",
      position: "Đặt cách cửa chính 1.8m - 2.5m chắn thẳng trục tim con hẻm; Cửa chính bố trí mở lệch sang bên cung tốt.",
      structure: "Kết cấu tường hoa gió có lỗ thoáng 25% để khí lưu thông êm ái, không tạo điểm đọng khí tù.",
      benefit: "Biến luồng sát khí trực xung thành dòng sinh khí uốn lượn hình chữ S mang lại tài lộc và an lành."
    }
  },
  {
    id: "nha_thoat_nhiet_muahe",
    name: "4. Nhà Vùng Nắng Nóng Thoát Nhiệt & Trị Gió Tây Nam (Gió Lào)",
    code: "MẪU 04 - GIẾNG TRỜI THIÊN TÂM & MÁI ĐỆM 2 LỚP",
    summary: "Ứng dụng Hiệu ứng Cột Áp Ống Khói (Stack Effect) và ao hồ bán nguyệt góc Tây Nam hạ nhiệt gió phơn cho miền Trung và miền Nam.",
    problem_analysis: "Nắng gắt hun nóng mái nhà lên 50°C tỏa nhiệt xuống trần; gió Tây Nam thổi khô rát làm không khí trong nhà oi bức ngột ngạt.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <!-- AO NƯỚC BÁN NGUYỆT GÓC TÂY NAM (HẠ NHIỆT GIÓ PHƠN) -->
        <path d="M40,320 Q120,280 180,320 L180,380 L40,380 Z" fill="#0284C7" opacity="0.8"/>
        <text x="110" y="345" fill="#FEF3C7" font-size="10" font-weight="700" text-anchor="middle">Ao Nước Tây Nam</text>
        <text x="110" y="360" fill="#E0F2FE" font-size="9" text-anchor="middle">Hạ Nhiệt Gió Lào (-4°C)</text>

        <!-- LUỒNG GIÓ MÁT ĐI VÀO TẦNG TRỆT -->
        <path d="M120,300 C200,280 240,290 320,290" fill="none" stroke="#38BDF8" stroke-width="3"/>
        <text x="210" y="275" fill="#38BDF8" font-size="10" font-weight="700">Khí Mát Đi Vào →</text>

        <!-- MẶT CẮT CÔNG TRÌNH CÓ GIẾNG TRỜI THIÊN TÂM -->
        <g transform="translate(300, 100)">
          <!-- Khối nhà 2 tầng -->
          <rect x="0" y="80" width="400" height="180" fill="#1E293B" stroke="#64748B" stroke-width="2"/>

          <!-- MÁI ĐỆM 2 LỚP THÔNG KHÍ -->
          <polygon points="200,0 -20,60 420,60" fill="#F59E0B" stroke="#FEF3C7" stroke-width="2"/>
          <line x1="-15" y1="70" x2="415" y2="70" stroke="#94A3B8" stroke-width="2"/>
          <text x="200" y="-10" fill="#FBBF24" font-size="11" font-weight="700" text-anchor="middle">Mái Ngói 2 Lớp Đệm Khí Cách Nhiệt</text>

          <!-- GIẾNG TRỜI TRUNG TÂM (THIÊN TỈNH) -->
          <rect x="160" y="60" width="80" height="200" fill="#0F172A" stroke="#38BDF8" stroke-dasharray="4,3"/>
          <text x="200" y="170" fill="#38BDF8" font-size="11" font-weight="700" text-anchor="middle">GIẾNG TRỜI</text>
          <text x="200" y="185" fill="#38BDF8" font-size="9" text-anchor="middle">Cột Áp Ống Khói</text>

          <!-- DÒNG KHÍ NÓNG BỐC LÊN VÀ THOÁT RA NÓC -->
          <path d="M180,250 L180,50 L170,20" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="4,2"/>
          <path d="M220,250 L220,50 L230,20" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="4,2"/>
          <text x="200" y="35" fill="#F87171" font-size="10" font-weight="800" text-anchor="middle">Khí Nóng Thoát Nóc ↑</text>

          <!-- Lam chớp thoát nhiệt đỉnh giếng trời -->
          <rect x="155" y="15" width="90" height="15" fill="#0284C7" stroke="#38BDF8"/>
        </g>

        <!-- NỀN ĐẤT -->
        <rect x="0" y="360" width="800" height="60" fill="#1E293B"/>
      </svg>
    `,
    tree_guidelines: {
      title: "Quy Chuẩn Cây Xanh Che Bức Xạ Hướng Tây",
      species: "Cây Lộc Vừng, Hoa Giấy, Cây Bàng, Giàn Dây Leo Cát Đằng.",
      distance: "Bố trí giàn lam che nắng mặt hướng Tây và cây bóng mát tán rộng cách hiên 3m - 5m.",
      structure: "Màn chắn xanh sinh học hấp thụ bức xạ nhiệt mặt trời trước khi chiếu vào vách tường.",
      benefit: "Giảm nhiệt độ bề mặt tường hướng Tây từ 6°C - 8°C."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Giếng Trời & Mái Đệm 2 Lớp",
      shape: "Giếng trời Thiên Tỉnh diện tích tối thiểu 5% - 8% diện tích sàn; cửa chớp đỉnh giếng trời nghiên 45°.",
      position: "Đặt tại vị trí Trung Cung (giữa nhà) hoặc cạnh cầu thang tạo luồng hút đối lưu thẳng đứng xuyên suốt các tầng.",
      structure: "Mái ngói 2 lớp: Lớp trên là ngói âm dương/ngói đất nung, lớp dưới là bê tông/trần thạch cao cách nhau 12cm có lỗ thông gió đối lưu.",
      benefit: "Tạo luồng gió mát tự nhiên 24/7 không cần bật điều hòa công suất lớn, tiết kiệm 40% điện năng."
    }
  },
  {
    id: "nha_dinh_doi_suon_doc",
    name: "5. Nhà Trên Đỉnh Đồi & Mép Sườn Dốc Gió Gia Tốc",
    code: "MẪU 05 - BÁN ÂM NƯƠNG ĐỊA HÌNH & MÁI XUÔI DỐC",
    summary: "Hóa giải hiệu ứng gia tốc gió nén khi leo dốc (Topographic Speed-up) cho nhà biệt thự đồi dốc, vùng cao nguyên.",
    problem_analysis: "Luồng gió gặp sườn dốc bị nén sít lại làm vận tốc tại đỉnh đồi tăng gấp 1.4 - 2.0 lần, kèm theo nguy cơ sạt lở đất móng khi mưa lũ lớn.",
    svg_diagram: `
      <svg viewBox="0 0 800 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#090D16; border-radius:10px;">
        <!-- SƯỜN ĐỒI DỐC -->
        <path d="M0,380 Q250,360 400,220 L800,220 L800,420 L0,420 Z" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <text x="220" y="340" fill="#94A3B8" font-size="12" font-weight="700">SƯỜN ĐỒI DỐC GIA TỐC GIÓ</text>

        <!-- LUỒNG GIÓ LEO DỐC TĂNG VẬN TỐC -->
        <path d="M10,340 Q250,320 380,180 L790,180" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="350" y="160" fill="#F87171" font-size="11" font-weight="800">Gió Nén Gia Tốc (2.0x) →</text>

        <!-- NHÀ BÁN ÂM NƯƠNG THEO ĐỊA HÌNH -->
        <g transform="translate(440, 110)">
          <!-- Phần thân nhà bán âm -->
          <polygon points="0,110 260,110 260,0 120,0" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="130" y="70" fill="#FEF3C7" font-size="12" font-weight="700" text-anchor="middle">NHÀ NƯƠNG SƯỜN ĐỒI</text>
          <text x="130" y="85" fill="#38BDF8" font-size="9" text-anchor="middle">Mái Xuôi Theo Hướng Gió</text>

          <!-- Mái xuôi dốc lướt gió -->
          <line x1="0" y1="110" x2="120" y2="0" stroke="#F59E0B" stroke-width="4"/>
          <line x1="120" y1="0" x2="260" y2="0" stroke="#F59E0B" stroke-width="4"/>

          <!-- Mũi tên gió trượt êm qua mái -->
          <path d="M-20,120 L110,10 L280,10" fill="none" stroke="#34D399" stroke-width="3"/>
          <text x="180" y="-10" fill="#34D399" font-size="10" font-weight="700">Gió Trượt Êm Qua Nóc</text>
        </g>

        <!-- CÂY RỪNG GIỮ ĐẤT & CHẮN GIÓ CHÂN DỐC -->
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
      structure: "Hệ thống rễ cọc bám sâu vào tầng đá mẹ giữ vững taluy móng; thân cây dẻo xé nhỏ khối khí leo dốc.",
      benefit: "Chống sạt lở móng 100% và giảm 40% vận tốc gió gia tốc."
    },
    architecture_guidelines: {
      title: "Quy Chuẩn Nhà Bán Âm & Mái Xuôi Dốc",
      shape: "Công trình thấp 1 tầng, mái dốc xuôi theo chiều gió leo dốc; vát cạnh tròn góc đón gió.",
      position: "Lùi xa mép bờ dốc (Crest Edge) tối thiểu khoảng cách bằng chiều cao bờ dốc; lưng tựa vững vào sườn đồi cao hơn.",
      structure: "Móng bè cắm sâu vào tầng đá gốc; hệ thống rãnh thoát nước ngầm chữ V quanh móng chống ngập úng xói mòn.",
      benefit: "Công trình hòa nhập vào địa hình tự nhiên, tránh hoàn toàn vùng áp lực gió xoáy cực đại tại mép đồi."
    }
  }
];

if (typeof window !== 'undefined') {
  window.DESIGN_BLUEPRINT_THEORY = DESIGN_BLUEPRINT_THEORY;
  window.DESIGN_BLUEPRINTS = DESIGN_BLUEPRINTS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DESIGN_BLUEPRINT_THEORY,
    DESIGN_BLUEPRINTS
  };
}
