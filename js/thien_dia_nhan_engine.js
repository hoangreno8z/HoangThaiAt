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

}

if (typeof window !== 'undefined') {
  window.thienDiaNhanEngine = new ThienDiaNhanEngine();
}

if (typeof module !== 'undefined') {
  module.exports = { ThienDiaNhanEngine };
}
