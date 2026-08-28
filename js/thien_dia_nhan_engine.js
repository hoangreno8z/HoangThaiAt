// =========================================================================
// HUYỀN HỌC MỤ — THIÊN — ĐỊA — NHÂN SITE INTELLIGENCE ENGINE & HAZARD VETO SYSTEM
// Nền tảng: 《青囊經》, 《黃帝宅經》, 《周禮·考工記》, 《營造法式》, 《陽宅十書》, 《葬書》
// Nguyên tắc tối thượng: PHONG THỦY KHÔNG ĐƯỢC PHÉP OVERRIDE NGUY CƠ THIÊN TAI (HAZARD VETO)
// =========================================================================

class ThienDiaNhanEngine {
  constructor() {
    this.hazards = [
      { id: 'flood_plain', name: 'Vùng Trũng Rốn Lũ / Thoát Lũ (Nước ngập > 1m)', severity: 'CRITICAL', rule: 'Bất cư chính đương thủy lưu xứ (Dương Trạch Thập Thư)' },
      { id: 'landslide_slope', name: 'Chân Taluy Sạt Lở Đất / Vách Đá Dốc Đứng', severity: 'CRITICAL', rule: 'Bất cư sơn tích xung xứ / Thạch Sát (Hám Long Kinh)' },
      { id: 'seismic_fault', name: 'Vệt Đứt Gãy Địa Chấn / Nền Bùn Lún Sụt', severity: 'HIGH', rule: 'Định Cương Trữ Cơ (Doanh Tạo Pháp Thức)' },
      { id: 'extreme_wind_crest', name: 'Đỉnh Đồi Hứng Bão Giật Trơ Trọi (Xung Phong Sát)', severity: 'HIGH', rule: 'Phong xuy thủy kiếp khước phi huyệt (Táng Thư)' },
      { id: 'solar_overheating_west', name: 'Mặt Tiền Chính Tây Không Mái Hiên (Hỏa Táo Cục)', severity: 'MEDIUM', rule: 'Hỏa táo phần trạch (Hoài Nam Tử)' }
    ];

    this.classicalCorpus = {
      'E1_THANHNANG': {
        code: 'E1',
        source: '《青囊經·中卷》',
        hanzi: '天有五星，地有五行。天分星宿，地列山川。氣行於地，形麗於天。因形察氣，以立人紀。地德上載，天光下臨……上下相須而成一體。',
        meaning: 'Trời có Ngũ Tinh, Đất có Ngũ Hành. Trời phân Tinh Tú, Đất bày Núi Sông. Khí vận hành dưới đất, hình tượng ứng với trời. Từ hình xét khí để lập quy tắc cho con người. Đức Đất nâng đỡ, Quang Trời chiếu rọi, trên dưới nương nhau thành một thể thống nhất.'
      },
      'E1_TRACHKINH': {
        code: 'E1',
        source: '《黃帝宅經·卷上》',
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
        source: '《陽宅十書·論宅外形第一》',
        hanzi: '凡宅：不居當衝口處，不居正當水流處，不居山脊衝處，不居百川口處。',
        meaning: 'Phàm xây nhà: Không ở ngay họng gió hút, không ở ngay lòng dòng chảy thoát lũ, không ở trên sống lưng đồi trơ trọi, không ở nơi cửa xả của trăm con suối.'
      },
      'E1_KHAOCONGKY': {
        code: 'E1',
        source: '《周禮·考工記·匠人建國》',
        hanzi: '晝參諸日中之景，夜考之極星，以正朝夕。',
        meaning: 'Ban ngày đo bóng nắng giữa trưa, ban đêm quan sát sao Bắc Cực để định hướng tuyệt đối Bắc - Nam và Đông - Tây.'
      }
    };
  }

  // =========================================================================
  // TOÁN HỌC QUANG HỌC: TÍNH GÓC CHIẾU MẶT TRỜI 4 MÙA TẠI VĨ ĐỘ VIỆT NAM (21°N / 10°N)
  // =========================================================================
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
      thermalComfortVerdict: 'Tọa Bắc Triều Nam: Mái hiên ' + recommendedEaves + 'm chắn 100% nắng gắt mùa hè (góc ' + Math.min(summerSolsticeAltitude, 180 - summerSolsticeAltitude).toFixed(1) + '°), đón trọn vẹn nắng sưởi ấm mùa đông (góc ' + winterSolsticeAltitude.toFixed(1) + '°).'
    };
  }

  // =========================================================================
  // HỆ THỐNG ĐÁNH GIÁ ĐA TẦNG & HAZARD VETO ENGINE
  // =========================================================================
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

    // 1. LAYER 7: REAL-WORLD HAZARD VETO CHECK (BƯỚC 1 TỐI THƯỢNG)
    const criticalHazards = inputs.activeHazards.filter(h => {
      const hazardDef = this.hazards.find(item => item.id === h);
      return hazardDef && hazardDef.severity === 'CRITICAL';
    });

    const highHazards = inputs.activeHazards.filter(h => {
      const hazardDef = this.hazards.find(item => item.id === h);
      return hazardDef && hazardDef.severity === 'HIGH';
    });

    if (criticalHazards.length > 0) {
      report.vetoTriggered = true;
      criticalHazards.forEach(h => {
        const hDef = this.hazards.find(item => item.id === h);
        report.vetoReasons.push('[CRITICAL VETO] ' + hDef.name + ': Vi phạm nguyên tắc ' + hDef.rule);
      });
      report.verdict = '❌ BÁC BỎ KHU ĐẤT (REJECT SITE) — PHONG THỦY KHÔNG CÓ QUYỀN OVERRIDE NGUY CƠ THIÊN TAI!';
      report.classicalEvidences.push(this.classicalCorpus.E1_DUONGTRACH);
      report.classicalEvidences.push(this.classicalCorpus.E1_TANGTHU);
      report.totalUnifiedScore = 15;
      return report;
    }

    // 2. LAYER 1: THIÊN THỜI & NHẬT CHIẾU
    let thienScore = 70;
    if (['Nam', 'Đông Nam'].includes(inputs.orientation)) {
      thienScore = 95;
      report.modernTechnicalRecommendations.push('Hướng ' + inputs.orientation + ' đắc thiên thời: Đón gió nồm mát mùa hè, tránh gió bấc rét mùa đông.');
    } else if (['Tây', 'Tây Bắc'].includes(inputs.orientation)) {
      thienScore = 40;
      report.modernTechnicalRecommendations.push('Cảnh báo hướng Tây: Bức xạ nhiệt buổi chiều gay gắt (Hỏa Táo Cục), bắt buộc bổ sung lam chắn nắng hoặc cây xanh cách nhiệt.');
    }

    // 3. LAYER 2: ĐỊA THỂ & THỦY VĂN
    let diaScore = 70;
    if (inputs.elevationAboveFloodLevel >= 0.8) {
      diaScore += 20;
      report.modernTechnicalRecommendations.push('Cốt nền cao +' + inputs.elevationAboveFloodLevel + 'm vượt đỉnh lũ an toàn (Thế Tọa Cao Vọng Sùng).');
    } else {
      diaScore -= 30;
      report.modernTechnicalRecommendations.push('Cảnh báo: Cốt nền chỉ cao +' + inputs.elevationAboveFloodLevel + 'm so với mặt đường, có nguy cơ ngập úng khi mưa bão cực đoan.');
    }

    if (inputs.hasRearBacking) diaScore += 10;
    if (inputs.hasFrontWater) diaScore += 10;

    // 4. LAYER 4: BUILT ENVIRONMENT (KIẾN TRÚC VI KHÍ HẬU)
    let kienTrucScore = 60;
    if (inputs.eavesOverhang >= 1.8) {
      kienTrucScore += 20;
      report.modernTechnicalRecommendations.push('Mái hiên đua ' + inputs.eavesOverhang + 'm tạo khoảng đệm nhiệt cản 100% nắng gắt mùa hè.');
    }
    if (inputs.hasStackVentilation) {
      kienTrucScore += 20;
      report.modernTechnicalRecommendations.push('Có giếng trời/khe thoáng đối lưu Thermosiphon: Khí nóng thoát lên nóc, hút dưỡng khí tươi mát liên tục 24/24.');
    }

    // 5. LAYER 6: NHÂN (NGŨ HƯ NGŨ THỰC)
    let nhanScore = 80;
    const areaPerPerson = inputs.houseAreaM2 / Math.max(inputs.occupantCount, 1);
    if (areaPerPerson >= 20 && areaPerPerson <= 50) {
      nhanScore = 95;
      report.modernTechnicalRecommendations.push('Mật độ ở tối ưu (' + areaPerPerson.toFixed(1) + ' m²/người): Đắc cách Trạch Tiểu Nhân Đa - Nhất Thực trong Hoàng Đế Trạch Kinh, trường khí ấm cúng tụ khí.');
    } else if (areaPerPerson > 80) {
      nhanScore = 60;
      report.modernTechnicalRecommendations.push('Cảnh báo: Nhà quá rộng ít người (' + areaPerPerson.toFixed(1) + ' m²/người): Phạm Trạch Đại Nhân Thiểu - Nhất Hư, khí trường lạnh lẽo cần bố trí thêm công năng sử dụng.');
    }

    // 6. TỔNG HỢP ĐIỂM SỐ TAM TÀI THỐNG NHẤT
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
      report.verdict = '🌟 CÔNG TRÌNH ĐẮC TAM TÀI TOÀN HẢO (THUẬN THIÊN THỜI - AN TOÀN ĐỊA LỢI - VƯỢNG NHÂN HÒA)';
    } else if (report.totalUnifiedScore >= 65) {
      report.verdict = '⚖️ CÔNG TRÌNH ĐẠT CHUẨN TRUNG BÌNH (CẦN TỐI ƯU HÓA CÁC ĐIỂM NGHẼN VI KHÍ HẬU & THOÁT NƯỚC)';
    } else {
      report.verdict = '⚠️ CÔNG TRÌNH TIỀM ẨN RỦI RO (CẦN CẢI TẠO HẠ TẦNG KỸ THUẬT VÀ VI KHÍ HẬU TRƯỚC KHI Ở)';
    }

    report.classicalEvidences.push(this.classicalCorpus.E1_THANHNANG);
    report.classicalEvidences.push(this.classicalCorpus.E1_TRACHKINH);
    report.classicalEvidences.push(this.classicalCorpus.E1_KHAOCONGKY);

    return report;
  }
}

if (typeof window !== 'undefined') {
  window.thienDiaNhanEngine = new ThienDiaNhanEngine();
}

if (typeof module !== 'undefined') {
  module.exports = { ThienDiaNhanEngine };
}
