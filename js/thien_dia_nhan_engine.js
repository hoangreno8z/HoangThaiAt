// =========================================================================
// HUYỀN HỌC MỤ — BỘ MÁY ĐÁNH GIÁ THIÊN — ĐỊA — NHÂN & PHÒNG CHỐNG THIÊN TAI
// Nền tảng: 《青囊經》, 《黃帝宅經》, 《周禮·考工記》, 《營造法式》, 《陽宅十書》, 《葬書》
// Nguyên tắc tối thượng: PHONG THỦY KHÔNG ĐƯỢC PHÉP PHỦ QUYẾT NGUY CƠ THIÊN TAI (QUYỀN BÁC BỎ TỐI CAO)
// =========================================================================

class ThienDiaNhanEngine {
  constructor() {
    this.hazards = [
      { id: 'flood_plain', name: 'Vùng Trũng Rốn Lũ / Họng Thoát Lũ (Nước ngập sâu > 1 mét)', severity: 'NGHIÊM TRỌNG', rule: 'Bất cư chính đương thủy lưu xứ (Dương Trạch Thập Thư)' },
      { id: 'landslide_slope', name: 'Chân Taluy Sạt Lở Đất / Vách Đá Dốc Đứng', severity: 'NGHIÊM TRỌNG', rule: 'Bất cư sơn tích xung xứ / Thạch Sát (Hám Long Kinh)' },
      { id: 'seismic_fault', name: 'Vệt Đứt Gãy Địa Chấn / Nền Bùn Lún Sụt', severity: 'CAO', rule: 'Định Cương Trữ Cơ (Doanh Tạo Pháp Thức)' },
      { id: 'extreme_wind_crest', name: 'Đỉnh Đồi Hứng Bão Giật Trơ Trọi (Xung Phong Sát)', severity: 'CAO', rule: 'Phong xuy thủy kiếp khước phi huyệt (Táng Thư)' },
      { id: 'solar_overheating_west', name: 'Mặt Tiền Chính Tây Không Mái Hiên (Hỏa Táo Cục)', severity: 'TRUNG BÌNH', rule: 'Hỏa táo phần trạch (Hoài Nam Tử)' }
    ];

    this.classicalCorpus = {
      'E1_THANHNANG': {
        code: 'E1',
        source: '《青囊經·中卷》 (Thanh Nang Kinh)',
        hanzi: '天有五星，地有五行。天分星宿，地列山川。氣行於地，形麗於天。因形察氣，以立人紀。地德上載，天光下臨……上下相須而成一體。',
        meaning: 'Trời có Ngũ Tinh, Đất có Ngũ Hành. Trời phân Tinh Tú, Đất bày Núi Sông. Khí vận hành dưới đất, hình tượng ứng với trời. Từ hình xét khí để lập quy tắc cho con người. Đức Đất nâng đỡ, Quang Trời chiếu rọi, trên dưới nương nhau thành một thể thống nhất.'
      },
      'E1_TRACHKINH': {
        code: 'E1',
        source: '《黃帝宅經·卷上》 (Hoàng Đế Trạch Kinh)',
        hanzi: '宅者，人之本。人以宅為家，居若安即家代吉昌……宅有五虛令人貧耗，五實令人富貴……宅水溝東南流五實。',
        meaning: 'Nhà là gốc rễ của con người. Người lấy nhà làm nơi an cư, ở yên ổn thì con cháu hưng vượng. Nhà có Ngũ Hư khiến người nghèo suy, có Ngũ Thực khiến người giàu sang. Mương rãnh thoát nước chảy về Đông Nam là Thực thứ 5.'
      },
      'E1_TANGTHU': {
        code: 'E1',
        source: '《葬書》 — Quách Phác',
        hanzi: '氣乘風則散，界水則止。古人聚之使不散，行之使有止，故謂之風水。穴吉葬凶，與棄尸同。歲時之乖為二凶。',
        meaning: 'Khí gặp gió mạnh thì tan, gặp nước thì tụ lại. Vị trí đất dù tốt nhưng làm sai thời điểm hoặc sai kỹ thuật thì tai hại như vứt xác ngoài đồng. Làm trái thiên thời là đại hung thứ 2.'
      },
      'E1_DUONGTRACH': {
        code: 'E1',
        source: '《陽宅十書·論宅外形第一》 (Dương Trạch Thập Thư)',
        hanzi: '凡宅：不居當衝口處，不居正當水流處，不居山脊衝處，不居百川口處。',
        meaning: 'Phàm xây nhà: Không ở ngay họng gió hút, không ở ngay lòng dòng chảy thoát lũ, không ở trên sống lưng đồi trơ trọi, không ở nơi cửa xả của trăm con suối.'
      },
      'E1_KHAOCONGKY': {
        code: 'E1',
        source: '《周禮·考工記·匠人建國》 (Khảo Công Ký)',
        hanzi: '晝參諸日中之景，夜考之極星，以正朝夕。',
        meaning: 'Ban ngày đo bóng nắng giữa trưa, ban đêm quan sát sao Bắc Cực để định hướng tuyệt đối Bắc - Nam và Đông - Tây.'
      }
    };
  }

  calculateSolarProfile(latitude = 21.0) {
    const summerSolsticeAltitude = 90 - latitude + 23.45;
    const winterSolsticeAltitude = 90 - latitude - 23.45;
    const equinoxAltitude = 90 - latitude;
    const recommendedEaves = 2.0;

    return {
      latitude: latitude,
      summerAltitude: Math.min(summerSolsticeAltitude, 180 - summerSolsticeAltitude).toFixed(1),
      winterAltitude: winterSolsticeAltitude.toFixed(1),
      equinoxAltitude: equinoxAltitude.toFixed(1),
      recommendedEavesMeters: recommendedEaves,
      thermalComfortVerdict: 'Tọa Bắc Triều Nam: Mái hiên ' + recommendedEaves + ' mét chắn 100% nắng gắt mùa hè (góc ' + Math.min(summerSolsticeAltitude, 180 - summerSolsticeAltitude).toFixed(1) + '°), đón trọn vẹn nắng sưởi ấm mùa đông (góc ' + winterSolsticeAltitude.toFixed(1) + '°).'
    };
  }

  evaluateSiteIntelligence(inputs) {
    const report = {
      timestamp: new Date().toISOString(),
      vetoTriggered: false,
      vetoReasons: [],
      layerScores: {},
      totalUnifiedScore: 0,
      verdict: '',
      classicalEvidences: [],
      modernTechnicalRecommendations: []
    };

    const criticalHazards = inputs.activeHazards.filter(h => {
      const hazardDef = this.hazards.find(item => item.id === h);
      return hazardDef && hazardDef.severity === 'NGHIÊM TRỌNG';
    });

    const highHazards = inputs.activeHazards.filter(h => {
      const hazardDef = this.hazards.find(item => item.id === h);
      return hazardDef && hazardDef.severity === 'CAO';
    });

    if (criticalHazards.length > 0) {
      report.vetoTriggered = true;
      criticalHazards.forEach(h => {
        const hDef = this.hazards.find(item => item.id === h);
        report.vetoReasons.push('[BÁC BỎ KHẨN CẤP] ' + hDef.name + ': Vi phạm nguyên tắc ' + hDef.rule);
      });
      report.verdict = 'BÁC BỎ KHU ĐẤT — PHONG THỦY KHÔNG CÓ QUYỀN PHỦ QUYẾT NGUY CƠ THIÊN TAI!';
      report.classicalEvidences.push(this.classicalCorpus.E1_DUONGTRACH);
      report.classicalEvidences.push(this.classicalCorpus.E1_TANGTHU);
      report.totalUnifiedScore = 15;
      return report;
    }

    let thienScore = 70;
    if (['Nam', 'Đông Nam'].includes(inputs.orientation)) {
      thienScore = 95;
      report.modernTechnicalRecommendations.push('Hướng ' + inputs.orientation + ' đắc thiên thời: Đón gió nồm mát mùa hè, tránh gió bấc rét mùa đông.');
    } else if (['Tây', 'Tây Bắc'].includes(inputs.orientation)) {
      thienScore = 40;
      report.modernTechnicalRecommendations.push('Cảnh báo hướng Tây: Bức xạ nhiệt buổi chiều gay gắt (Hỏa Táo Cục), bắt buộc bổ sung lam chắn nắng hoặc cây xanh cách nhiệt.');
    }

    let diaScore = 70;
    if (inputs.elevationAboveFloodLevel >= 0.8) {
      diaScore += 20;
      report.modernTechnicalRecommendations.push('Cốt nền cao +' + inputs.elevationAboveFloodLevel + ' mét vượt đỉnh lũ an toàn (Thế Tọa Cao Vọng Sùng).');
    } else {
      diaScore -= 30;
      report.modernTechnicalRecommendations.push('Cảnh báo: Cốt nền chỉ cao +' + inputs.elevationAboveFloodLevel + ' mét so với mặt đường, có nguy cơ ngập úng khi mưa bão cực đoan.');
    }

    if (inputs.hasRearBacking) diaScore += 10;
    if (inputs.hasFrontWater) diaScore += 10;

    let kienTrucScore = 60;
    if (inputs.eavesOverhang >= 1.8) {
      kienTrucScore += 20;
      report.modernTechnicalRecommendations.push('Mái hiên đua ' + inputs.eavesOverhang + ' mét tạo khoảng đệm nhiệt cản 100% nắng gắt mùa hè.');
    }
    if (inputs.hasStackVentilation) {
      kienTrucScore += 20;
      report.modernTechnicalRecommendations.push('Có giếng trời/khe thoáng đối lưu ống khói tự nhiên: Khí nóng thoát lên nóc, hút dưỡng khí tươi mát liên tục 24/24.');
    }

    let nhanScore = 80;
    const areaPerPerson = inputs.houseAreaM2 / Math.max(inputs.occupantCount, 1);
    if (areaPerPerson >= 20 && areaPerPerson <= 50) {
      nhanScore = 95;
      report.modernTechnicalRecommendations.push('Mật độ ở tối ưu (' + areaPerPerson.toFixed(1) + ' m²/người): Đắc cách Trạch Tiểu Nhân Đa - Nhất Thực trong Hoàng Đế Trạch Kinh, trường khí ấm cúng tụ khí.');
    } else if (areaPerPerson > 80) {
      nhanScore = 60;
      report.modernTechnicalRecommendations.push('Cảnh báo: Nhà quá rộng ít người (' + areaPerPerson.toFixed(1) + ' m²/người): Phạm Trạch Đại Nhân Thiểu - Nhất Hư, khí trường lạnh lẽo cần bố trí thêm công năng sử dụng.');
    }

    const fengShuiScore = inputs.classicalFengShuiScore || 85;
    report.layerScores = {
      hazardSafety: highHazards.length === 0 ? 100 : 60,
      thien: thienScore,
      dia: Math.min(diaScore, 100),
      kienTruc: Math.min(kienTrucScore, 100),
      phongThuy: fengShuiScore,
      nhan: nhanScore
    };

    report.totalUnifiedScore = Math.round(
      report.layerScores.hazardSafety * 0.30 +
      report.layerScores.dia * 0.20 +
      report.layerScores.thien * 0.15 +
      report.layerScores.kienTruc * 0.15 +
      report.layerScores.phongThuy * 0.10 +
      report.layerScores.nhan * 0.10
    );

    if (report.totalUnifiedScore >= 85) {
      report.verdict = 'CÔNG TRÌNH ĐẮC TAM TÀI TOÀN HẢO (THUẬN THIÊN THỜI - AN TOÀN ĐỊA LỢI - VƯỢNG NHÂN HÒA)';
    } else if (report.totalUnifiedScore >= 65) {
      report.verdict = 'CÔNG TRÌNH ĐẠT CHUẨN TRUNG BÌNH (CẦN TỐI ƯU HÓA CÁC ĐIỂM NGHẼN VI KHÍ HẬU & THOÁT NƯỚC)';
    } else {
      report.verdict = 'CÔNG TRÌNH TIỀM ẨN RỦI RO (CẦN CẢI TẠO HẠ TẦNG KỸ THUẬT VÀ VI KHÍ HẬU TRƯỚC KHI Ở)';
    }

    report.classicalEvidences.push(this.classicalCorpus.E1_THANHNANG);
    report.classicalEvidences.push(this.classicalCorpus.E1_TRACHKINH);
    report.classicalEvidences.push(this.classicalCorpus.E1_KHAOCONGKY);

    return report;
  }

  evaluateWindAndStormProfile(inputs) {
    const orientation = inputs.orientation || 'Nam';
    const hasAoPhong = !!inputs.hasAoPhong;
    const hasXuyenDuongPhong = !!inputs.hasXuyenDuongPhong;
    const hasLamDauPhong = !!inputs.hasLamDauPhong;
    const hasCatCuocPhong = !!inputs.hasCatCuocPhong;
    const roofType = inputs.roofType || 'cu_gia_phi_diem'; // 'cu_gia_phi_diem', 'mai_bang', 'mai_ton_doc'
    const hasWindbreakTre = !!inputs.hasWindbreakTre;
    const hasWestSouthPond = !!inputs.hasWestSouthPond;

    const batPhongProfile = {
      'Đông': { name: 'Minh Thứ Phong (Gió Đông)', quẻ: 'Chấn', nature: 'Ấm áp mùa xuân, sinh sôi', status: 'auspicious', desc: 'Đón nhận sinh khí mùa xuân đâm chồi nảy lộc.' },
      'Đông Nam': { name: 'Thanh Minh Phong (Gió Đông Nam / Nồm Mát)', quẻ: 'Tốn', nature: 'Mát lành, dưỡng sinh, thuần dương', status: 'great_auspicious', desc: 'Hướng đại cát đón trọn gió nồm mát mẻ mùa hè, khí trường sảng khoái.' },
      'Nam': { name: 'Huân Phong / Cảnh Phong (Gió Nam)', quẻ: 'Ly', nature: 'Nắng ấm, sinh trưởng vạn vật', status: 'great_auspicious', desc: 'Đắc cách Tọa Bắc Triều Nam, đón dương quang ấm áp mùa đông và gió mát mùa hè.' },
      'Tây Nam': { name: 'Thê Phong (Gió Tây Nam / Gió Phơn Khô Nóng)', quẻ: 'Khôn', nature: 'Khô nóng rát, tiêu hao tân dịch', status: 'caution', desc: 'Cần ao hồ Minh Đường chắn góc Tây Nam để hạ nhiệt 3°C - 5°C.' },
      'Tây': { name: 'Cương Phong (Gió Tây / Sát Khí Mùa Thu)', quẻ: 'Đoài', nature: 'Khô hanh, nắng quái chiều gắt', status: 'danger', desc: 'Bức xạ Hỏa Táo gay gắt, cần lam chắn nắng và cây xanh cách nhiệt.' },
      'Tây Bắc': { name: 'Chiết Phong / Lệ Phong (Gió Tây Bắc)', quẻ: 'Càn', nature: 'Lạnh buốt hanh hao đầu đông', status: 'caution', desc: 'Cần tường dày chắn hậu không mở cửa sổ lớn.' },
      'Bắc': { name: 'Quảng Mạc Phong (Gió Bắc / Gió Bấc Đại Hàn)', quẻ: 'Khảm', nature: 'Băng giá cực hàn mùa đông', status: 'danger', desc: 'Cấm mở cửa chính trực diện hướng Bắc, cần lũy tre phong đai chắn bấc.' },
      'Đông Bắc': { name: 'Điều Phong (Gió Đông Bắc / Gió Độc Chuyển Mùa)', quẻ: 'Cấn', nature: 'Ẩm buốt ngưng trệ, sinh dịch bệnh', status: 'danger', desc: 'Cần bịt kín cửa sau, trồng hàng cây rào chắn gió độc.' }
    };

    const currentPhong = batPhongProfile[orientation] || batPhongProfile['Nam'];

    // Đánh giá Tứ Ác Phong
    const acPhongAlerts = [];
    if (hasAoPhong) {
      acPhongAlerts.push({ name: 'Ao Phong Sát (Gió Hút Khe Núi / Hẻm Nhà)', severity: 'danger', source: '《Táng Thư》 (Quách Phác)', desc: 'Hiệu ứng Venturi tăng vận tốc gió xé sườn nhà, gây bệnh đường hô hấp, liệt thần kinh.' });
    }
    if (hasXuyenDuongPhong) {
      acPhongAlerts.push({ name: 'Xuyên Đường Phong (Gió Lùa Xuyên Tim)', severity: 'danger', source: '《Táng Thư》 (Quách Phác)', desc: 'Cửa trước thông thẳng cửa sau cướp mất nhiệt năng và sinh khí nội thất, hao tài tốn của.' });
    }
    if (hasLamDauPhong) {
      acPhongAlerts.push({ name: 'Lâm Đầu Phong (Gió Dội Trên Nóc)', severity: 'danger', source: '《Táng Thư》 (Quách Phác)', desc: 'Gió dội từ vách núi cao hoặc tòa tháp cao phía sau xuống nóc nhà, gây đau đầu đột quỵ não.' });
    }
    if (hasCatCuocPhong) {
      acPhongAlerts.push({ name: 'Cát Cước Phong (Gió Quét Chân Móng)', severity: 'danger', source: '《Táng Thư》 (Quách Phác)', desc: 'Gió ràn rạt sát mặt đất làm khô nứt rỗng chân móng, gây tê bì chân tay.' });
    }

    // Đánh giá Công Trình Trị Bão
    let stormScore = 75;
    const engineeringNotes = [];

    if (roofType === 'cu_gia_phi_diem') {
      stormScore += 15;
      engineeringNotes.push('Đắc Khí Động Học Cử Giá Phi Diêm (《Doanh Tạo Pháp Thức》): Độ dốc mái biến thiên 45° -> 25° triệt tiêu lực nâng Bernoulli, ghìm mái ngói xuống móng chống tốc mái.');
    } else if (roofType === 'mai_ton_doc') {
      stormScore -= 20;
      engineeringNotes.push('Cảnh báo Mái Tôn Dốc Đơn: Dễ bị áp suất âm hút bay khi cuồng phong cấp 12 đổ bộ, cần gia cố xà gồ và đai kẹp chống bão.');
    } else if (roofType === 'mai_bang') {
      stormScore += 5;
      engineeringNotes.push('Mái Bằng Bê Tông: Chịu tải gió tốt nhưng cần lớp đệm cách nhiệt chống bức xạ mặt trời.');
    }

    if (['Bắc', 'Đông Bắc', 'Tây Bắc'].includes(orientation)) {
      if (hasWindbreakTre) {
        stormScore += 10;
        engineeringNotes.push('Đắc Lũy Tre Phong Đai (《Địa Lý Tả Ao》): Khóm tre dày giảm 80% vận tốc gió bấc rét buốt.');
      } else {
        stormScore -= 15;
        engineeringNotes.push('Cảnh báo: Nhà hướng Bắc/Đông Bắc thiếu lũy tre chắn gió bấc mùa đông.');
      }
    }

    if (['Tây', 'Tây Nam'].includes(orientation)) {
      if (hasWestSouthPond) {
        stormScore += 10;
        engineeringNotes.push('Đắc Minh Đường Trì Góc Tây Nam (《Tả Ao Trạch Thư》): Hồ nước bốc hơi hạ nhiệt gió phơn 3°C - 5°C.');
      } else {
        stormScore -= 10;
        engineeringNotes.push('Cảnh báo: Nhà hướng Tây/Tây Nam chưa có hồ nước hay rèm cây hạ nhiệt gió phơn nóng rát.');
      }
    }

    return {
      orientation,
      currentPhong,
      acPhongAlerts,
      stormScore: Math.max(0, Math.min(100, stormScore)),
      engineeringNotes
    };
  }


  evaluateBuildingAerodynamics(inputs) {
    const topo = inputs.windTopology || 'dat_trong'; // 'dat_trong', 'kep_hai_toa_cao', 'dau_hem_ngaba', 'dinh_doi_suon_doc', 'ven_bien_mat_nuoc'
    const roofType = inputs.roofType || 'mai_bon_mai'; // 'mai_bon_mai', 'mai_hai_mai_doc', 'mai_bang', 'mai_ton_doc'
    const hasBufferTrees = !!inputs.hasBufferTrees; // Đai cây xanh phân tầng
    const hasDeflectionScreen = !!inputs.hasDeflectionScreen; // Bình phong / Mái sảnh tán khí
    const hasRecessedEntry = !!inputs.hasRecessedEntry; // Tiền sảnh thụt lùi
    const wallCornerType = inputs.wallCornerType || 'vuong_goc'; // 'vat_goc_bo_tron', 'vuong_goc'

    const topoProfiles = {
      dat_trong: {
        name: 'Nhà Đứng Trơ Trọi Trên Đất Trống',
        code: 'ĐẤT TRỐNG / KHÔNG GIAN HỞ',
        phenomenon: 'Chịu trực diện toàn bộ áp lực động của luồng gió lớn. Vùng xoáy phân ly ở mép mái và mặt sau sinh ra áp suất âm cực đại (lực nâng bốc mái).',
        riskLevel: 'CAO KHI CÓ BÃO',
        speedFactor: '1.0x (Trực diện 100% vận tốc gió bão tự nhiên)',
        keyRisks: [
          'Lực nâng bốc mái do chênh lệch áp suất mặt trên và mặt dưới',
          'Rung lắc kết cấu do gió đổi hướng liên tục không có vật che chắn'
        ]
      },
      kep_hai_toa_cao: {
        name: 'Nhà Kẹp Giữa Hai Tòa Nhà Cao Tầng',
        code: 'KHE HẸP / HIỆU ỨNG PHỄU GIÓ & GIÓ CUỘN THÁC ĐỔ',
        phenomenon: 'Luồng gió bị bóp nghẹt qua khe hẹp giữa 2 khối nhà cao tầng tăng vận tốc gấp 1.5 - 2.5 lần (Hiệu ứng Phễu Gió / Venturi). Đồng thời gió đập vào mặt trên tòa cao tầng dội ngược xuống đất tạo thành dòng gió cuộn thác đổ (Gió Dội Ngược / Downwash Vortex).',
        riskLevel: 'RẤT NGHIÊM TRỌNG',
        speedFactor: '1.5x - 2.5x (Gió bị gia tốc cực đại qua khe hẹp)',
        keyRisks: [
          'Gió lốc xé toạc cửa sổ, giật bung mái hiên mặt tiền',
          'Gió cuộn dội từ nóc nhà cao tầng dội thẳng xuống nóc nhà thấp',
          'Sóng âm tiếng rít gió tần số cao gây ức chế thần kinh'
        ]
      },
      dau_hem_ngaba: {
        name: 'Nhà Ở Đầu Hẻm / Đối Diện Ngã Ba Hút Gió',
        code: 'HẺM ĐƯỜNG DẪN KHÍ / THƯƠNG PHONG SÁT',
        phenomenon: 'Con hẻm dài đóng vai trò như ống dẫn khí nén, gia tăng động năng luồng gió đâm thẳng vào tim cửa chính như mũi giáo.',
        riskLevel: 'CAO',
        speedFactor: '1.3x - 1.8x (Gió bị nén dọc theo trục hẻm)',
        keyRisks: [
          'Xung lực gió đâm trực diện cướp nhiệt năng và sinh khí',
          'Bụi bặm rác thải và khí thải bị cuốn thẳng vào phòng khách'
        ]
      },
      dinh_doi_suon_doc: {
        name: 'Nhà Trên Đỉnh Đồi / Mép Sườn Dốc',
        code: 'ĐỈNH DỐC / HIỆU ỨNG GIA TỐC ĐỊA HÌNH',
        phenomenon: 'Khi luồng gió di chuyển gặp sườn đồi dốc, các đường dòng khí bị nén sít lại, làm vận tốc gió tại đỉnh dốc tăng vọt từ 1.4 đến 2.0 lần so với chân đồi.',
        riskLevel: 'RẤT CAO',
        speedFactor: '1.4x - 2.0x (Gió gia tốc nén dòng tại đỉnh đồi)',
        keyRisks: [
          'Áp lực gió bão giật cực đại quật đổ tường bao và biển hiệu',
          'Nguy cơ xói lở đất móng khi kèm theo mưa lũ lớn'
        ]
      },
      ven_bien_mat_nuoc: {
        name: 'Nhà Ven Biển / Ven Mặt Nước Lớn Mênh Mông',
        code: 'VEN MẶT NƯỚC / ĐỘ NHÁM BỀ MẶT THẤP',
        phenomenon: 'Ma sát mặt nước cực nhỏ làm gió duy trì nguyên vẹn vận tốc bão lớn, kèm theo hơi sương muối mặn ăn mòn kim loại và kết cấu bê tông cốt thép.',
        riskLevel: 'RẤT CAO',
        speedFactor: '1.2x - 1.5x (Không có vật cản giảm ma sát)',
        keyRisks: [
          'Gió bão giật kèm triều cường sóng biển dâng cao',
          'Hơi muối mặn xâm thực phá hủy cốt thép và lớp ngói lợp'
        ]
      }
    };

    const currentTopo = topoProfiles[topo] || topoProfiles.dat_trong;

    let score = 50;
    const engineeringMeasures = [];

    // Đánh giá hình dạng mái
    if (roofType === 'mai_bon_mai') {
      score += 25;
      engineeringMeasures.push('Thiết kế Mái Bốn Mái dốc 30° - 35° (Mái Hiệp / Bát Giác): Khí động học tối ưu chia đều áp lực gió ra 4 hướng, giảm 50% lực nâng bốc mái so với mái dốc hai phía.');
    } else if (roofType === 'mai_bang') {
      score += 15;
      engineeringMeasures.push('Kết cấu Mái Bằng Bê Tông: Chịu tải trọng gió bão tốt, cần làm lan can đặc quanh mái để chuyển hướng luồng gió lướt qua nóc.');
    } else if (roofType === 'mai_hai_mai_doc') {
      score += 5;
      engineeringMeasures.push('Mái Dốc Hai Phía: Cần gia cố vì kèo đầu hồi và đai thép neo xà gồ chống lật khi gió thổi tạt ngang.');
    } else if (roofType === 'mai_ton_doc') {
      score -= 20;
      engineeringMeasures.push('Cảnh báo Mái Tôn Dốc Đơn: Rất nguy hiểm trước bão lớn, bắt buộc lắp đặt thanh chống bão, ke chống bão và gia cố khoảng cách xà gồ dưới 80cm.');
    }

    // Đánh giá góc tường
    if (wallCornerType === 'vat_goc_bo_tron') {
      score += 10;
      engineeringMeasures.push('Vát Góc / Bo Tròn Mép Tường Công Trình: Giảm 30% lực cản gió động, triệt tiêu điểm tụ áp suất cao ở các góc vuông.');
    }

    // Đánh giá đai cây xanh
    if (hasBufferTrees) {
      score += 15;
      engineeringMeasures.push('Vành Đai Cây Xanh Phân Tầng (Cây bụi thấp phía trước, cây gỗ dẻo phía sau): Nâng dòng khí lướt qua nóc nhà, giảm 40% - 60% vận tốc gió đập vào tường.');
    } else if (topo === 'dat_trong' || topo === 'dinh_doi_suon_doc') {
      score -= 10;
      engineeringMeasures.push('Khuyến nghị khẩn cấp: Cần trồng ngay rặng cây chắn gió phân tầng cách nhà 10 - 15 mét.');
    }

    // Đánh giá bình phong / Mái đón sảnh tán khí
    if (hasDeflectionScreen) {
      score += 15;
      engineeringMeasures.push('Bình Phong / Mái Đón Sảnh Tán Khí: Bẻ gãy dòng gió thác đổ Downwash và luồng khí nén Venturi, biến cuồng phong thành dòng gió êm.');
    } else if (topo === 'kep_hai_toa_cao' || topo === 'dau_hem_ngaba') {
      score -= 15;
      engineeringMeasures.push('Cảnh báo: Thiếu tấm bình phong hoặc mái đón tán khí tại cửa chính, gió lốc sẽ đâm thẳng vào nhà.');
    }

    // Đánh giá tiền sảnh thụt lùi
    if (hasRecessedEntry) {
      score += 10;
      engineeringMeasures.push('Tiền Sảnh Thụt Lùi (Cửa chính lùi vào trong 1.5m - 2.0m): Tạo vùng đệm khí tĩnh, triệt tiêu áp lực gió xô vào cánh cửa.');
    }

    // Quy hoạch vảy cá cho ven biển
    if (topo === 'ven_bien_mat_nuoc') {
      engineeringMeasures.push('Quy Hoạch Lân Thứ (Vảy Cá): Xây dựng so le với các nhà lân cận, không xây thẳng hàng để tránh tạo hẻm hút gió bão biển.');
    }

    return {
      windTopology: topo,
      topoProfile: currentTopo,
      aerodynamicScore: Math.max(0, Math.min(100, score)),
      engineeringMeasures
    };
  }

}

if (typeof window !== 'undefined') {
  window.thienDiaNhanEngine = new ThienDiaNhanEngine();
}

if (typeof module !== 'undefined') {
  module.exports = { ThienDiaNhanEngine };
}
