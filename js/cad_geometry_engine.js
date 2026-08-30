/**
 * BỘ ĐỘNG CƠ HÌNH HỌC KIẾN TRÚC, QUANG HỌC MẶT TRỜI & CƠ HỌC CÔNG TRÌNH (CAD GEOMETRY & BUILDING PHYSICS ENGINE)
 * Tích hợp các thuật toán hình học tính toán (Computational Geometry), Quang học quỹ đạo mặt trời (Solar Ephemeris),
 * Cơ học dòng khí Bernoulli, hiệu ứng Venturi và bảng tính tỷ lệ vàng Lỗ Ban 3 chuẩn vi phân.
 */

class CadGeometryEngine {
  constructor() {
    this.AIR_DENSITY_STANDARD = 1.225; // kg/m3 ở điều kiện tiêu chuẩn
    this.GRAVITY = 9.80665; // m/s2
  }

  // =========================================================================
  // 1. COMPUTATIONAL GEOMETRY (HÌNH HỌC TÍNH TOÁN 2D/3D)
  // =========================================================================

  /**
   * Tính diện tích đa giác theo công thức Shoelace (Gauss Area Formula)
   * @param {Array<{x: number, y: number}>} points Danh sách đỉnh đa giác
   * @returns {number} Diện tích (m2)
   */
  calculatePolygonArea(points) {
    if (!points || points.length < 3) return 0;
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2.0;
  }

  /**
   * Tính tâm hình học (Centroid) của lô đất / mặt bằng bất kỳ
   * @param {Array<{x: number, y: number}>} points
   * @returns {{x: number, y: number}}
   */
  calculateCentroid(points) {
    if (!points || points.length < 3) return { x: 0, y: 0 };
    let cx = 0;
    let cy = 0;
    const area = this.calculatePolygonArea(points);
    if (area === 0) return { x: points[0].x, y: points[0].y };

    const n = points.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const factor = points[i].x * points[j].y - points[j].x * points[i].y;
      cx += (points[i].x + points[j].x) * factor;
      cy += (points[i].y + points[j].y) * factor;
    }
    const factor6A = 6.0 * (area * (this.isClockwise(points) ? -1 : 1));
    return {
      x: cx / factor6A,
      y: cy / factor6A
    };
  }

  isClockwise(points) {
    let sum = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      sum += (points[j].x - points[i].x) * (points[j].y + points[i].y);
    }
    return sum > 0;
  }

  /**
   * Tính chiều dài chu vi và cạnh của lô đất
   * @param {Array<{x: number, y: number}>} points
   * @returns {{perimeter: number, edgeLengths: number[]}}
   */
  calculatePerimeterAndEdges(points) {
    if (!points || points.length < 2) return { perimeter: 0, edgeLengths: [] };
    let perimeter = 0;
    const edgeLengths = [];
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      const dx = points[j].x - points[i].x;
      const dy = points[j].y - points[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      edgeLengths.push(dist);
      perimeter += dist;
    }
    return { perimeter, edgeLengths };
  }

  // =========================================================================
  // 2. SOLAR EPHEMERIS & SHADOW OPTICS (QUANG HỌC BÓNG ĐỔ MẶT TRỜI)
  // =========================================================================

  /**
   * Tính toán vị trí mặt trời (Azimuth và Altitude) theo vĩ độ, ngày trong năm và giờ trong ngày
   * @param {number} latitude Vĩ độ (độ thập phân)
   * @param {number} dayOfYear Ngày thứ mấy trong năm (1 - 365)
   * @param {number} solarHour Giờ mặt trời (0.0 - 24.0)
   * @returns {{altitudeDeg: number, azimuthDeg: number, isDaylight: boolean}}
   */
  calculateSolarCoordinates(latitude, dayOfYear, solarHour) {
    const latRad = (latitude * Math.PI) / 180.0;
    // Góc nghiêng xích vĩ (Solar declination)
    const declination = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180.0);
    const decRad = (declination * Math.PI) / 180.0;

    // Góc giờ (Hour angle)
    const hourAngle = (solarHour - 12.0) * 15.0;
    const haRad = (hourAngle * Math.PI) / 180.0;

    // Góc cao độ mặt trời (Altitude)
    const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);
    const altRad = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
    const altitudeDeg = (altRad * 180.0) / Math.PI;

    // Góc phương vị mặt trời (Azimuth)
    let azimuthDeg = 180.0;
    if (altitudeDeg > 0) {
      const cosAz = (Math.sin(decRad) * Math.cos(latRad) - Math.cos(decRad) * Math.sin(latRad) * Math.cos(haRad)) / Math.cos(altRad);
      let azRad = Math.acos(Math.max(-1, Math.min(1, cosAz)));
      if (solarHour > 12) {
        azRad = 2 * Math.PI - azRad;
      }
      azimuthDeg = (azRad * 180.0) / Math.PI;
    }

    return {
      altitudeDeg: Math.max(0, altitudeDeg),
      azimuthDeg,
      isDaylight: altitudeDeg > 0
    };
  }

  /**
   * Tính chiều dài bóng đổ của công trình lên mặt đất
   * @param {number} buildingHeight Chiều cao công trình (mét)
   * @param {number} altitudeDeg Góc cao độ mặt trời (độ)
   * @param {number} azimuthDeg Góc phương vị mặt trời (độ)
   * @returns {{shadowLength: number, shadowDirectionDeg: number}}
   */
  calculateBuildingShadow(buildingHeight, altitudeDeg, azimuthDeg) {
    if (altitudeDeg <= 0.5) {
      return { shadowLength: 999, shadowDirectionDeg: (azimuthDeg + 180) % 360 };
    }
    const altRad = (altitudeDeg * Math.PI) / 180.0;
    const shadowLength = buildingHeight / Math.tan(altRad);
    const shadowDirectionDeg = (azimuthDeg + 180) % 360;
    return { shadowLength, shadowDirectionDeg };
  }

  // =========================================================================
  // 3. BUILDING PHYSICS & WIND AERODYNAMICS (CƠ HỌC KHÍ ĐỘNG HỌC & GIÓ BÃO)
  // =========================================================================

  /**
   * Tính áp lực nâng khí động học Bernoulli lên mái nhà
   * deltaP = 0.5 * rho * (v_top^2 - v_in^2)
   * @param {number} windSpeedMs Vận tốc gió (m/s)
   * @param {number} roofAngleDeg Độ dốc mái (độ)
   * @returns {{upliftPressurePa: number, pressureCoefficient: number, status: string}}
   */
  calculateBernoulliUplift(windSpeedMs, roofAngleDeg) {
    const rho = this.AIR_DENSITY_STANDARD;
    // Hệ số khí động học Cp tùy thuộc độ dốc mái
    let cp = -0.8; // Mái bằng hoặc dốc thấp (<15 deg) chịu lực bốc cực lớn
    if (roofAngleDeg >= 30 && roofAngleDeg <= 35) {
      cp = -0.15; // Mái bốn mái dốc 30-35 độ triệt tiêu gần như toàn bộ lực bốc
    } else if (roofAngleDeg > 35 && roofAngleDeg <= 45) {
      cp = 0.2; // Gió tạo áp lực nén ghìm mái
    } else if (roofAngleDeg < 15) {
      cp = -1.1; // Nguy cơ bốc mái rất cao
    }

    const q = 0.5 * rho * windSpeedMs * windSpeedMs; // Áp lực động cơ bản (Pa)
    const upliftPressurePa = q * cp;

    let status = 'AN TOÀN';
    if (upliftPressurePa < -800) {
      status = 'NGUY CƠ TỐC MÁI CAO (Cần đai neo xà gồ)';
    } else if (upliftPressurePa < -400) {
      status = 'CẢNH BÁO ÁP SUẤT ÂM';
    }

    return {
      upliftPressurePa: Math.round(upliftPressurePa),
      pressureCoefficient: cp,
      status
    };
  }

  /**
   * Tính hiệu ứng phễu gió gia tốc Venturi qua khe hẹp 2 tòa nhà
   * @param {number} baseSpeed Vận tốc gió nền (m/s)
   * @param {number} canyonWidth Khoảng cách giữa 2 tòa nhà (mét)
   * @returns {{amplifiedSpeedMs: number, speedRatio: number, riskDescription: string}}
   */
  calculateVenturiChanneling(baseSpeed, canyonWidth) {
    let speedRatio = 1.0;
    if (canyonWidth <= 6) {
      speedRatio = 2.4;
    } else if (canyonWidth <= 12) {
      speedRatio = 1.8;
    } else if (canyonWidth <= 25) {
      speedRatio = 1.3;
    } else {
      speedRatio = 1.05;
    }

    const amplifiedSpeedMs = baseSpeed * speedRatio;
    let riskDescription = 'Mức độ ảnh hưởng thấp';
    if (speedRatio >= 2.0) {
      riskDescription = 'Cực kỳ nguy hiểm: Hiệu ứng phễu gió bóp nghẹt gia tốc cực đại, bắt buộc đặt bình phong tán khí.';
    } else if (speedRatio >= 1.5) {
      riskDescription = 'Nguy hiểm: Gió giật xé toạc cửa sổ và mái hiên, cần bố trí tiền sảnh thụt lùi.';
    }

    return {
      amplifiedSpeedMs: parseFloat(amplifiedSpeedMs.toFixed(1)),
      speedRatio,
      riskDescription
    };
  }

  /**
   * Tính chiều cao nóc nhà và tỷ lệ cử giá phi diêm tối ưu
   * @param {number} buildingSpanWidth Chiều rộng gian nhà (mét)
   * @param {number} slopeAngleDeg Góc dốc mái (độ)
   * @returns {{ridgeHeightM: number, overhangM: number}}
   */
  calculateRoofArchitecture(buildingSpanWidth, slopeAngleDeg = 32) {
    const slopeRad = (slopeAngleDeg * Math.PI) / 180.0;
    const ridgeHeightM = (buildingSpanWidth / 2.0) * Math.tan(slopeRad);
    const overhangM = parseFloat((buildingSpanWidth * 0.18).toFixed(2));
    return {
      ridgeHeightM: parseFloat(ridgeHeightM.toFixed(2)),
      overhangM
    };
  }
}

// Khởi tạo global instance
if (typeof window !== 'undefined') {
  window.cadGeometryEngine = new CadGeometryEngine();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CadGeometryEngine;
}
