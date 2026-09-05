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
    createAnnularSectorPath
  };
}));
