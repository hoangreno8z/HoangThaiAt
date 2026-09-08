/**
 * BỘ ĐỘNG CƠ ĐO ĐẠC ĐỊA LÝ & TOÁN HỌC GÓC TRÒN (GEO MEASUREMENT ENGINE)
 * Chuyên trách tính toán toán học không gian thực địa:
 * 1. Phương vị trắc địa chính quy (Geodesic Forward Azimuth).
 * 2. Khoảng cách địa lý thực tế (Haversine Distance theo mét).
 * 3. Toán học góc tròn (Circular Math: Difference, Mean, Dispersion qua 0/360 độ).
 * 4. Quy chiếu Bắc Thật (True North) & Bắc Từ (Magnetic North) với độ từ thiên (Magnetic Declination).
 * 5. Quality Gate kiểm soát sai số (Uncertainty) và chặn sai lệch ranh phân kim 24 Sơn.
 * 
 * Hoàn toàn độc lập với DOM, UI, Leaflet và SVG pixel.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GeoMeasurementEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const EARTH_RADIUS_METERS = 6371008.8; // Bán kính Trái Đất trung bình chuẩn IUGG

  class GeoMeasurementEngine {
    /**
     * Chuẩn hóa góc về chu thiên [0, 360)
     */
    static normalize360(deg) {
      if (typeof deg !== 'number' || !Number.isFinite(deg)) return 0;
      let b = ((deg % 360) + 360) % 360;
      b = Math.round(b * 1e8) / 1e8;
      return Object.is(b, -0) ? 0 : b;
    }

    /**
     * Chuẩn hóa góc lệch có dấu về nửa vòng chu thiên [-180, +180]
     */
    static normalizeSigned(deg) {
      let x = GeoMeasurementEngine.normalize360(deg);
      if (x > 180) x -= 360;
      return Math.round(x * 1e8) / 1e8;
    }

    /**
     * Tính chênh lệch góc có dấu giữa 2 hướng (b2 - b1) trên vòng tròn [-180, +180]
     * Xử lý chuẩn triệt để ranh giới 0° / 360°:
     * angularDifference(359.8, 0.2) = +0.4° (không phải -359.6°)
     */
    static angularDifference(b1, b2) {
      const n1 = GeoMeasurementEngine.normalize360(b1);
      const n2 = GeoMeasurementEngine.normalize360(b2);
      let diff = n2 - n1;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      return Math.round(diff * 1e8) / 1e8;
    }

    /**
     * Khoảng cách góc tuyệt đối giữa 2 hướng [0, 180]
     */
    static angularDistance(b1, b2) {
      return Math.abs(GeoMeasurementEngine.angularDifference(b1, b2));
    }

    /**
     * Tính phương vị trắc địa (Geodesic Forward Azimuth) từ điểm 1 tới điểm 2 trên hình cầu
     * Trả về phương vị thực theo Bắc Thật (True North) trong khoảng [0, 360)
     * @param {Object} p1 - { lat, lng }
     * @param {Object} p2 - { lat, lng }
     */
    static calculateGeodesicBearing(p1, p2) {
      if (!p1 || !p2 || typeof p1.lat !== 'number' || typeof p1.lng !== 'number' ||
          typeof p2.lat !== 'number' || typeof p2.lng !== 'number') {
        return 0;
      }
      const lat1 = (p1.lat * Math.PI) / 180;
      const lat2 = (p2.lat * Math.PI) / 180;
      const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;

      // Kiểm tra 2 điểm trùng khớp
      if (Math.abs(lat1 - lat2) < 1e-11 && Math.abs(dLng) < 1e-11) {
        return 0;
      }

      const y = Math.sin(dLng) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
      const bearingRad = Math.atan2(y, x);
      const bearingDeg = (bearingRad * 180) / Math.PI;

      return GeoMeasurementEngine.normalize360(bearingDeg);
    }

    /**
     * Tính khoảng cách thực địa giữa 2 tọa độ theo công thức Haversine (đơn vị: mét)
     */
    static calculateHaversineDistance(p1, p2) {
      if (!p1 || !p2 || typeof p1.lat !== 'number' || typeof p1.lng !== 'number' ||
          typeof p2.lat !== 'number' || typeof p2.lng !== 'number') {
        return 0;
      }
      const lat1 = (p1.lat * Math.PI) / 180;
      const lat2 = (p2.lat * Math.PI) / 180;
      const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
      const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(EARTH_RADIUS_METERS * c * 100) / 100;
    }

    /**
     * Tính trung bình góc tròn (Circular Mean) cho tập hợp các số đo la kinh
     * Tránh lỗi sai lệch trung bình số học khi góc đi qua 0 độ:
     * Ví dụ: circularMean([359, 1]) = 0 độ (không phải 180 độ)
     */
    static circularMean(angles) {
      if (!Array.isArray(angles) || angles.length === 0) return 0;
      let sumSin = 0;
      let sumCos = 0;
      let validCount = 0;

      for (const a of angles) {
        if (typeof a === 'number' && Number.isFinite(a)) {
          const rad = (a * Math.PI) / 180;
          sumSin += Math.sin(rad);
          sumCos += Math.cos(rad);
          validCount++;
        }
      }
      if (validCount === 0) return 0;
      const meanRad = Math.atan2(sumSin / validCount, sumCos / validCount);
      return GeoMeasurementEngine.normalize360((meanRad * 180) / Math.PI);
    }

    /**
     * Tính độ phân tán mẫu đo góc tròn (Circular Dispersion & Standard Deviation)
     * R càng gần 1 -> tập số đo càng tập trung ổn định
     * R càng nhỏ -> các số đo bị lệch nhiều (cảnh báo nhiễu từ trường)
     */
    static circularDispersion(angles) {
      if (!Array.isArray(angles) || angles.length < 2) {
        return { R: 1, stdDevDeg: 0, isStable: true, count: angles ? angles.length : 0 };
      }
      let sumSin = 0;
      let sumCos = 0;
      let count = 0;

      for (const a of angles) {
        if (typeof a === 'number' && Number.isFinite(a)) {
          const rad = (a * Math.PI) / 180;
          sumSin += Math.sin(rad);
          sumCos += Math.cos(rad);
          count++;
        }
      }
      if (count < 2) return { R: 1, stdDevDeg: 0, isStable: true, count };

      const meanSin = sumSin / count;
      const meanCos = sumCos / count;
      const R = Math.hypot(meanSin, meanCos);
      const clampedR = Math.max(1e-7, Math.min(1.0, R));
      const stdDevRad = Math.sqrt(-2 * Math.log(clampedR));
      const stdDevDeg = Math.round((stdDevRad * 180) / Math.PI * 100) / 100;

      return {
        R: Math.round(R * 10000) / 10000,
        stdDevDeg,
        isStable: stdDevDeg <= 2.0,
        count
      };
    }

    /**
     * Mô hình xấp xỉ Độ Từ Thiên (Magnetic Declination) chuẩn WMM tại lãnh thổ Việt Nam
     * Việt Nam có độ từ thiên lệch Tây khoảng -1.0° đến -1.8° (năm 2020 - 2026)
     * @param {number} lat - Vĩ độ
     * @param {number} lng - Kinh độ
     * @param {number} year - Năm đo
     */
    static getMagneticDeclination(lat, lng, year = new Date().getFullYear()) {
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        return { declination: -1.35, source: 'WMM_VN_DEFAULT', year };
      }
      const baseLat = 16.0;
      const baseLng = 108.0;
      const baseYear = 2024.0;

      const dLat = lat - baseLat;
      const dLng = lng - baseLng;
      const dYear = year - baseYear;

      let dec = -1.35 + (0.045 * dLat) - (0.028 * dLng) + (0.015 * dYear);
      dec = Math.round(dec * 100) / 100;

      return {
        declination: dec,
        direction: dec < 0 ? 'Tây' : 'Đông',
        label: dec < 0 ? `${Math.abs(dec).toFixed(2)}° W` : `${dec.toFixed(2)}° E`,
        source: 'WMM_VIETNAM_APPROX',
        year
      };
    }

    /**
     * Chuyển đổi quy chiếu: Bắc Từ -> Bắc Thật
     * True Bearing = Magnetic Bearing + Declination
     */
    static convertMagneticToTrue(magneticBearing, declination) {
      return GeoMeasurementEngine.normalize360(magneticBearing + declination);
    }

    /**
     * Chuyển đổi quy chiếu: Bắc Thật -> Bắc Từ
     * Magnetic Bearing = True Bearing - Declination
     */
    static convertTrueToMagnetic(trueBearing, declination) {
      return GeoMeasurementEngine.normalize360(trueBearing - declination);
    }

    /**
     * Ước lượng sai số phương vị dựa trên chiều dài đoạn chuẩn (Baseline Length)
     * Đoạn đường/mép nhà càng ngắn thì sai số góc do GPS/chốt chạm càng lớn
     * @param {number} lengthMeters - Độ dài đoạn đo bằng mét
     * @param {string} source - Nguồn dữ liệu ('OSM_AUTO' | 'USER_MANUAL' | 'GPS')
     */
    static estimateBaselineUncertainty(lengthMeters, source = 'OSM_AUTO') {
      const len = Math.max(1.0, typeof lengthMeters === 'number' && Number.isFinite(lengthMeters) ? lengthMeters : 15.0);
      const posErrorMeters = source === 'OSM_AUTO' ? 0.8 : (source === 'GPS' ? 2.5 : 1.5);
      const angularErrorDeg = (posErrorMeters / len) * (180 / Math.PI);
      const uncertainty = Math.min(12.0, Math.max(0.6, Math.round(angularErrorDeg * 100) / 100));
      const isShortBaseline = len < 15.0;
      const quality = isShortBaseline ? 'LOW' : (uncertainty <= 1.2 ? 'HIGH' : 'MEDIUM');

      return {
        lengthMeters: Math.round(len * 10) / 10,
        uncertainty,
        isShortBaseline,
        quality,
        warning: isShortBaseline ? `Đoạn chuẩn ngắn (${len.toFixed(1)}m < 15m), phương vị có sai số biến thiên +/- ${uncertainty}°` : null
      };
    }

    /**
     * QUALITY GATE: Kiểm tra độ an toàn ranh giới 24 Sơn
     * Nếu khoảng cách tới biên nhỏ hơn hoặc bằng sai số ước lượng:
     * Chuyển trạng thái sang AMBIGUOUS (Không ép về một Sơn duy nhất!)
     * 
     * @param {number} bearing - Phương vị cần kiểm tra
     * @param {number} uncertainty - Sai số góc ước lượng (+/- deg)
     * @param {Object} mountainInfo - { mountain, distanceToBoundary } từ LuopanData
     */
    static evaluateQualityGate(bearing, uncertainty, mountainInfo) {
      const u = typeof uncertainty === 'number' && Number.isFinite(uncertainty) ? uncertainty : 1.0;
      const dist = mountainInfo && typeof mountainInfo.distanceToBoundary === 'number'
        ? mountainInfo.distanceToBoundary
        : 7.5;
      
      const safeMargin = Math.round((dist - u) * 100) / 100;
      const isAmbiguous = dist <= u;

      return {
        bearing: GeoMeasurementEngine.normalize360(bearing),
        uncertainty: u,
        distanceToBoundary: Math.round(dist * 100) / 100,
        safeMargin,
        isAmbiguous,
        status: isAmbiguous ? 'AMBIGUOUS' : (u > 2.0 ? 'LOW_CONFIDENCE' : 'VALID'),
        warning: isAmbiguous
          ? `Sát ranh phân kim: Cách biên ${dist.toFixed(2)}° <= Sai số +/- ${u.toFixed(2)}°. Thuộc vùng giáp ranh, chưa đủ độ tin cậy để kết luận duy nhất 1 Sơn!`
          : null
      };
    }

    /**
     * Tính tọa độ đích đến (Destination Point) theo phương vị và khoảng cách (mét)
     * Chuẩn công thức trắc địa Geodesic trên mặt cầu
     * @param {Object} startPoint - { lat, lng }
     * @param {number} distanceMeters - Khoảng cách bằng mét
     * @param {number} bearingDeg - Phương vị theo Bắc Thật (0 - 360 độ)
     */
    static computeDestinationPoint(startPoint, distanceMeters, bearingDeg) {
      if (!startPoint || typeof startPoint.lat !== 'number' || typeof startPoint.lng !== 'number') {
        return { lat: 0, lng: 0 };
      }
      const d = (distanceMeters || 0) / EARTH_RADIUS_METERS;
      const th = ((bearingDeg || 0) * Math.PI) / 180;
      const phi1 = (startPoint.lat * Math.PI) / 180;
      const lam1 = (startPoint.lng * Math.PI) / 180;

      const phi2 = Math.asin(Math.sin(phi1) * Math.cos(d) + Math.cos(phi1) * Math.sin(d) * Math.cos(th));
      const lam2 = lam1 + Math.atan2(Math.sin(th) * Math.sin(d) * Math.cos(phi1), Math.cos(d) - Math.sin(phi1) * Math.sin(phi2));

      return {
        lat: Math.round(((phi2 * 180) / Math.PI) * 1e8) / 1e8,
        lng: Math.round((((((lam2 * 180) / Math.PI) + 540) % 360) - 180) * 1e8) / 1e8
      };
    }

    /**
     * Trích xuất cửa sổ hình học thích ứng (Adaptive Local Geometry Window)
     * Thích ứng theo curvature, intersection, segment length, bearing stability.
     * Báo cáo lý do dừng: INTERSECTION, CURVATURE, MAX_LENGTH, GEOMETRY_END, QUALITY_LIMIT.
     * @param {Array} coords - Danh sách tọa độ vector của đường [{ lat, lng }, ...]
     * @param {Object} accessProjPoint - Điểm chiếu tiếp cận nhà trên đường { lat, lng }
     * @param {Object} options - { maxDeflectionDeg, targetMaxSpanMeters, intersectionKeys }
     */
    static calculateAdaptiveGeometryWindow(coords, accessProjPoint, options = {}) {
      if (!Array.isArray(coords) || coords.length < 2) {
        return {
          windowPoints: coords || [],
          startIdx: 0,
          endIdx: 0,
          windowLengthMeters: 0,
          roadAxisBearing: null,
          reverseBearing: null,
          bearingStability: 0,
          curvatureDegPerMeter: 0,
          isCurved: false,
          stopReason: 'GEOMETRY_END',
          stopReasonBackward: 'GEOMETRY_END',
          stopReasonForward: 'GEOMETRY_END'
        };
      }

      const getKey = pt => pt ? `${pt.lat.toFixed(6)},${pt.lng.toFixed(6)}` : '';
      const intersectionsSet = options.intersectionKeys instanceof Set
        ? options.intersectionKeys
        : (Array.isArray(options.intersectionKeys) ? new Set(options.intersectionKeys) : new Set());

      const maxDeflectionDeg = typeof options.maxDeflectionDeg === 'number' ? options.maxDeflectionDeg : 35.0;
      const targetMaxSpanMeters = typeof options.targetMaxSpanMeters === 'number' ? options.targetMaxSpanMeters : 80.0;

      // 1. Tìm phân đoạn tim đường gần accessProjPoint nhất
      let closestSegIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < coords.length - 1; i++) {
        const pA = coords[i];
        const pB = coords[i + 1];
        const segLen = GeoMeasurementEngine.calculateHaversineDistance(pA, pB);
        if (segLen < 0.2) continue;
        const mid = { lat: (pA.lat + pB.lat) / 2, lng: (pA.lng + pB.lng) / 2 };
        const d = accessProjPoint ? GeoMeasurementEngine.calculateHaversineDistance(accessProjPoint, mid) : 0;
        if (d < minDist) {
          minDist = d;
          closestSegIdx = i;
        }
      }

      const baseSegBearing = GeoMeasurementEngine.calculateGeodesicBearing(coords[closestSegIdx], coords[closestSegIdx + 1]);

      // 2. Mở rộng lùi về trước (backward)
      let startIdx = closestSegIdx;
      let backwardDist = 0;
      let stopReasonBackward = 'GEOMETRY_END';

      while (startIdx > 0) {
        if (intersectionsSet.has(getKey(coords[startIdx]))) {
          stopReasonBackward = 'INTERSECTION';
          break;
        }
        if (backwardDist >= targetMaxSpanMeters / 2) {
          stopReasonBackward = 'MAX_LENGTH';
          break;
        }

        const prevSegBearing = GeoMeasurementEngine.calculateGeodesicBearing(coords[startIdx - 1], coords[startIdx]);
        const diff = GeoMeasurementEngine.angularDistance(baseSegBearing, prevSegBearing);
        const segLen = GeoMeasurementEngine.calculateHaversineDistance(coords[startIdx - 1], coords[startIdx]);

        if (diff > maxDeflectionDeg) {
          stopReasonBackward = 'CURVATURE';
          break;
        }

        if (segLen > 3 && (diff / segLen) > 2.0) {
          stopReasonBackward = 'CURVATURE';
          break;
        }

        backwardDist += segLen;
        startIdx--;
      }
      if (startIdx === 0 && stopReasonBackward === 'GEOMETRY_END') {
        stopReasonBackward = 'GEOMETRY_END';
      }

      // 3. Mở rộng tiến về sau (forward)
      let endIdx = closestSegIdx + 1;
      let forwardDist = 0;
      let stopReasonForward = 'GEOMETRY_END';

      while (endIdx < coords.length - 1) {
        if (intersectionsSet.has(getKey(coords[endIdx]))) {
          stopReasonForward = 'INTERSECTION';
          break;
        }
        if (forwardDist >= targetMaxSpanMeters / 2) {
          stopReasonForward = 'MAX_LENGTH';
          break;
        }

        const nextSegBearing = GeoMeasurementEngine.calculateGeodesicBearing(coords[endIdx], coords[endIdx + 1]);
        const diff = GeoMeasurementEngine.angularDistance(baseSegBearing, nextSegBearing);
        const segLen = GeoMeasurementEngine.calculateHaversineDistance(coords[endIdx], coords[endIdx + 1]);

        if (diff > maxDeflectionDeg) {
          stopReasonForward = 'CURVATURE';
          break;
        }

        if (segLen > 3 && (diff / segLen) > 2.0) {
          stopReasonForward = 'CURVATURE';
          break;
        }

        forwardDist += segLen;
        endIdx++;
      }
      if (endIdx === coords.length - 1 && stopReasonForward === 'GEOMETRY_END') {
        stopReasonForward = 'GEOMETRY_END';
      }

      const windowPoints = coords.slice(startIdx, endIdx + 1);
      const pStart = windowPoints[0];
      const pEnd = windowPoints[windowPoints.length - 1];
      const totalWindowDist = GeoMeasurementEngine.calculateHaversineDistance(pStart, pEnd);
      const roadAxisBearing = GeoMeasurementEngine.calculateGeodesicBearing(pStart, pEnd);
      const reverseBearing = (roadAxisBearing + 180) % 360;

      // Tính độ ổn định phương vị (Bearing Stability - Standard Deviation)
      const segBearings = [];
      let totalCurvature = 0;
      for (let j = 0; j < windowPoints.length - 1; j++) {
        const b = GeoMeasurementEngine.calculateGeodesicBearing(windowPoints[j], windowPoints[j + 1]);
        segBearings.push(b);
        totalCurvature += GeoMeasurementEngine.angularDistance(baseSegBearing, b);
      }

      let bearingStability = 0;
      if (segBearings.length > 1) {
        const mean = segBearings.reduce((a, c) => a + c, 0) / segBearings.length;
        const variance = segBearings.reduce((a, c) => a + Math.pow(c - mean, 2), 0) / segBearings.length;
        bearingStability = Math.round(Math.sqrt(variance) * 100) / 100;
      }

      const curvatureDegPerMeter = totalWindowDist > 0
        ? Math.round((totalCurvature / totalWindowDist) * 100) / 100
        : 0;

      // Xác định stopReason tổng quát
      let stopReason = 'GEOMETRY_END';
      if (stopReasonBackward === 'INTERSECTION' || stopReasonForward === 'INTERSECTION') {
        stopReason = 'INTERSECTION';
      } else if (stopReasonBackward === 'CURVATURE' || stopReasonForward === 'CURVATURE') {
        stopReason = 'CURVATURE';
      } else if (stopReasonBackward === 'MAX_LENGTH' || stopReasonForward === 'MAX_LENGTH') {
        stopReason = 'MAX_LENGTH';
      } else if (bearingStability > 8.0) {
        stopReason = 'QUALITY_LIMIT';
      }

      return {
        windowPoints,
        startIdx,
        endIdx,
        windowLengthMeters: Math.round(totalWindowDist * 10) / 10,
        roadAxisBearing: Math.round(roadAxisBearing * 100) / 100,
        reverseBearing: Math.round(reverseBearing * 100) / 100,
        baseSegBearing: Math.round(baseSegBearing * 100) / 100,
        bearingStability,
        curvatureDegPerMeter,
        isCurved: (backwardDist + forwardDist) > 0 && windowPoints.length > 2,
        stopReason,
        stopReasonBackward,
        stopReasonForward
      };
    }
  }

  return GeoMeasurementEngine;
}));
