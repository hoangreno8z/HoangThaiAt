/**
 * BỘ ĐỘNG CƠ HÌNH HỌC TÍNH TOÁN LA KINH (LUOPAN GEOMETRY ENGINE)
 * Phối hợp cùng CalibrationEngine độc lập.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./luopan_calibration_engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./luopan_calibration_engine'));
  } else {
    root.LuopanGeometry = factory(root.CalibrationEngine);
  }
}(typeof self !== 'undefined' ? self : this, function(Calibration) {
  'use strict';

  const Calib = Calibration || (typeof window !== 'undefined' ? window.CalibrationEngine : null);

  function normalizeBearing(deg) {
    if (Calib && Calib.normalize360) return Calib.normalize360(deg);
    if (typeof deg !== 'number' || isNaN(deg)) return 0;
    let b = deg % 360;
    if (b < 0) b += 360;
    return b === -0 ? 0 : b;
  }

  function bearingDifference(b1, b2) {
    if (Calib && Calib.computeOffset) return Calib.computeOffset(b1, b2);
    let diff = normalizeBearing(b2) - normalizeBearing(b1);
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return diff;
  }

  function polarToSvgCartesian(cx, cy, r, bearingDeg) {
    const rad = (normalizeBearing(bearingDeg) - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  function calculateLineBearing(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
    return normalizeBearing(angle);
  }

  function calculateHouseFacingBearing(pA, pB, frontSide) {
    const baseBearing = calculateLineBearing(pA, pB);
    const offset = frontSide === 'left' ? -90 : 90;
    return normalizeBearing(baseBearing + offset);
  }

  function calculateHouseSittingBearing(facingBearing) {
    return normalizeBearing(facingBearing + 180);
  }

  function computeCalibrationOffset(rawHouseBearing, measuredBearing) {
    if (Calib && Calib.computeOffset) return Calib.computeOffset(rawHouseBearing, measuredBearing);
    return bearingDifference(rawHouseBearing, measuredBearing);
  }

  function calibrateBearing(rawBearing, offset) {
    if (Calib && Calib.calibrate) return Calib.calibrate(rawBearing, offset);
    return normalizeBearing(rawBearing + offset);
  }

  function calculateLocalTangent(polyline, queryPoint) {
    if (!polyline || polyline.length < 2) return 0;
    let minDist = Infinity;
    let bestIdx = 0;

    for (let i = 0; i < polyline.length - 1; i++) {
      const p1 = polyline[i];
      const p2 = polyline[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const d = Math.hypot(midX - queryPoint.x, midY - queryPoint.y);
      if (d < minDist) {
        minDist = d;
        bestIdx = i;
      }
    }

    const segStart = polyline[bestIdx];
    const segEnd = polyline[bestIdx + 1];
    return calculateLineBearing(segStart, segEnd);
  }

  function distancePointToSegment(p, a, b) {
    const l2 = Math.hypot(b.x - a.x, b.y - a.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
    let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = a.x + t * (b.x - a.x);
    const projY = a.y + t * (b.y - a.y);
    return Math.hypot(p.x - projX, p.y - projY);
  }

  function createAnnularSectorPath(cx, cy, rInner, rOuter, startDeg, endDeg) {
    const sweep = normalizeBearing(endDeg - startDeg);
    const largeArcFlag = sweep > 180 ? 1 : 0;

    const p1 = polarToSvgCartesian(cx, cy, rOuter, startDeg);
    const p2 = polarToSvgCartesian(cx, cy, rOuter, endDeg);
    const p3 = polarToSvgCartesian(cx, cy, rInner, endDeg);
    const p4 = polarToSvgCartesian(cx, cy, rInner, startDeg);

    return [
      `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
      `A ${rOuter.toFixed(2)} ${rOuter.toFixed(2)} 0 ${largeArcFlag} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
      `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
      `A ${rInner.toFixed(2)} ${rInner.toFixed(2)} 0 ${largeArcFlag} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
      'Z'
    ].join(' ');
  }

  function calculateBendAngle(pPrev, pCurr, pNext) {
    if (!pPrev || !pCurr || !pNext) return { deflection: 0, absDeflection: 0, turn: 'Thẳng' };
    const b1 = calculateLineBearing(pPrev, pCurr);
    const b2 = calculateLineBearing(pCurr, pNext);
    const deflection = bearingDifference(b1, b2);
    return {
      b1,
      b2,
      deflection,
      absDeflection: Math.abs(deflection),
      turn: deflection > 0 ? 'Phải' : (deflection < 0 ? 'Trái' : 'Thẳng')
    };
  }

  function circleFrom3Points(p1, p2, p3) {
    const x1 = p1.x, y1 = p1.y;
    const x2 = p2.x, y2 = p2.y;
    const x3 = p3.x, y3 = p3.y;
    const d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    if (Math.abs(d) < 1e-4) return null;
    const ux = ((x1**2 + y1**2)*(y2 - y3) + (x2**2 + y2**2)*(y3 - y1) + (x3**2 + y3**2)*(y1 - y2)) / d;
    const uy = ((x1**2 + y1**2)*(x3 - x2) + (x2**2 + y2**2)*(x1 - x3) + (x3**2 + y3**2)*(x2 - x1)) / d;
    const r = Math.hypot(x1 - ux, y1 - uy);
    return { center: {x: ux, y: uy}, r };
  }

  function calculateCurveWrap(polyline, houseCenter) {
    if (!polyline || polyline.length < 3 || !houseCenter) {
      return { type: 'khong_du_diem', label: 'Tuyến thẳng / chưa đủ khúc uốn', rating: 'Bình', color: '#94A3B8' };
    }
    const pStart = polyline[0];
    const pMid = polyline[Math.floor(polyline.length / 2)];
    const pEnd = polyline[polyline.length - 1];

    const circle = circleFrom3Points(pStart, pMid, pEnd);
    if (!circle) {
      return { type: 'tuyen_thang', label: 'Tuyến thẳng (Mộc Thành)', rating: 'Bình', color: '#94A3B8' };
    }

    const distHouseToCenter = Math.hypot(houseCenter.x - circle.center.x, houseCenter.y - circle.center.y);
    if (distHouseToCenter < circle.r) {
      return {
        type: 'hoan_bao',
        label: 'Kim Thành Hoàn Bão (Ngọc Đái Triền Yêu)',
        nature: 'Lòng cung lõm ôm trọn minh đường trước nhà',
        rating: 'Đại Cát Tụ Tài',
        color: '#10B981',
        source: '《Dương Trạch Thập Thư》: Tiền hậu hữu thủy hoàn bão quý'
      };
    } else {
      return {
        type: 'phan_cung',
        label: 'Phản Cung Thủy (Phản Khiêu / Phản Thân Sát)',
        nature: 'Lưng cánh cung lồi chĩa thẳng vào mặt tiền',
        rating: 'Đại Hung Sát',
        color: '#EF4444',
        source: '《Dương Trạch Thập Thư》: Đãn ngộ phản khiêu tất tu kỵ'
      };
    }
  }

  function calculateFlowRelation(fromPoint, toPoint, houseCenter, facingBearing) {
    if (!fromPoint || !toPoint || !houseCenter) {
      return { type: 'chua_xac_dinh', label: 'Chưa xác định', chieuNuoc: 'Không rõ', rating: 'Bình', color: '#94A3B8' };
    }
    const fromBearing = calculateLineBearing(houseCenter, fromPoint);
    const toBearing = calculateLineBearing(houseCenter, toPoint);
    const segBearing = calculateLineBearing(fromPoint, toPoint);

    const relFrom = Calib && Calib.computeRelativeBearing
      ? Calib.computeRelativeBearing(facingBearing, fromBearing)
      : bearingDifference(facingBearing, fromBearing);
    const relTo = Calib && Calib.computeRelativeBearing
      ? Calib.computeRelativeBearing(facingBearing, toBearing)
      : bearingDifference(facingBearing, toBearing);

    // 1. Kiểm tra Trực Xung (Đâm thẳng mặt tiền · Thương Sát / Xung Tâm Sát)
    // Cổ bản:
    // - 《Dương Trạch Thập Thư》: "凡宅不居当冲口处", "南来大路正冲门" (Chính xung môn: trục đường phải hướng thẳng vào khí khẩu)
    // - 《Trọng Đính Tương Trạch Tạo Phúc Toàn Thư》: "有直巷直路冲来者，谓之剑" (Xung lai: tuyến đường thẳng lao trực diện tới)
    // - 《Nhân Tử Tu Tri》: "衝心者，水勢急直射穴心" (Xung tâm: thế nước/đường bắn thẳng vào tâm huyệt)
    //
    // Chuẩn mực hình học 4 tầng chặt chẽ:
    // Tầng 1: Tuyến đường phải đồng trục xung đối với mặt tiền (dòng xung lai hướng ngược chiều mặt tiền):
    //         Hướng nhà = facingBearing => Hướng xung lai = (facingBearing + 180) % 360
    //         Độ lệch trục: |segBearing - (facingBearing + 180)| <= 22.5° (nửa quái vị / 1.5 sơn)
    //         * Tuyến đường chạy ngang (Hoành Lộ/Hoành Thủy) lệch ~90° tuyệt đối không thể là Trực Xung.
    // Tầng 2: Luồng khí đang lao tới gần nhà: distTo < distFrom
    //         Vector đoạn đường hướng về tâm nhà: |segBearing - bearingToHouse| <= 25°
    // Tầng 3: Nằm trong góc đón khí Minh Đường phía trước mặt tiền: |relTo| <= 55° và |relFrom| <= 85°
    // Tầng 4: Tia đường kéo dài đâm trúng phạm vi nhà: dPerp <= max(75, distTo * 0.45)
    const inflowBearing = normalizeBearing(facingBearing + 180);
    const diffInflow = Math.abs(bearingDifference(segBearing, inflowBearing));
    const bearingToHouse = calculateLineBearing(fromPoint, houseCenter);
    const diffHeading = Math.abs(bearingDifference(segBearing, bearingToHouse));
    const distFrom = Math.hypot(fromPoint.x - houseCenter.x, fromPoint.y - houseCenter.y);
    const distTo = Math.hypot(toPoint.x - houseCenter.x, toPoint.y - houseCenter.y);

    const segDx = toPoint.x - fromPoint.x;
    const segDy = toPoint.y - fromPoint.y;
    const segLen = Math.hypot(segDx, segDy);
    const dPerp = segLen > 0
      ? Math.abs(segDy * houseCenter.x - segDx * houseCenter.y + toPoint.x * fromPoint.y - toPoint.y * fromPoint.x) / segLen
      : 0;

    const isDirectClash = diffInflow <= 22.5
      && diffHeading <= 25
      && distTo < distFrom
      && Math.abs(relTo) <= 55
      && Math.abs(relFrom) <= 85
      && dPerp <= Math.max(75, distTo * 0.45);

    if (isDirectClash) {
      return {
        type: 'truc_xung',
        label: 'Trực Xung (Đâm thẳng mặt tiền · Thương Sát)',
        chieuNuoc: 'Đâm thẳng',
        rating: 'Đại Hung Sát',
        color: '#EF4444',
        source: '《Dương Trạch Thập Thư》: Nam lai đại lộ chính xung môn'
      };
    }

    // 2. Kiểm tra Củng Bối (vòng sau lưng)
    if (Math.abs(relFrom) > 120 && Math.abs(relTo) > 120) {
      return {
        type: 'xuyen_boi',
        label: 'Củng Bối (Chảy vòng sau lưng nhà)',
        chieuNuoc: 'Sau lưng',
        rating: 'Bình Cát',
        color: '#34D399'
      };
    }

    // 3. Chảy ngang qua trước mặt tiền (Hoành Thủy / Hoành Lộ)
    if (relTo >= relFrom) {
      return {
        type: 'ta_dao_huu',
        label: 'Tả Thủy đảo Hữu (Thanh Long ➔ Bạch Hổ)',
        chieuNuoc: 'Trái → phải',
        rating: 'Thuận Cục',
        color: '#38BDF8'
      };
    } else {
      return {
        type: 'huu_dao_ta',
        label: 'Hữu Thủy đảo Tả (Bạch Hổ ➔ Thanh Long)',
        chieuNuoc: 'Phải → trái',
        rating: 'Nghịch Cục',
        color: '#F59E0B'
      };
    }
  }

  return {
    normalizeBearing,
    bearingDifference,
    polarToSvgCartesian,
    calculateLineBearing,
    calculateHouseFacingBearing,
    calculateHouseSittingBearing,
    computeCalibrationOffset,
    calibrateBearing,
    calculateLocalTangent,
    distancePointToSegment,
    createAnnularSectorPath,
    calculateBendAngle,
    circleFrom3Points,
    calculateCurveWrap,
    calculateFlowRelation
  };
}));
