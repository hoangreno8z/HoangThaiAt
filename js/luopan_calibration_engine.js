/**
 * BỘ ĐỘNG CƠ HIỆU CHUẨN LA KINH DUY NHẤT (LUOPAN CALIBRATION ENGINE)
 * Khóa cứng công thức toán học bù sai số thực địa giữa bản đồ/ảnh và số đo La Kinh của Thầy.
 * Không phụ thuộc DOM, UI, React hay SVG.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CalibrationEngine = factory();
    // Đồng thời gắn vào LuopanCalibrationEngine để tránh nhầm lẫn
    root.LuopanCalibrationEngine = root.CalibrationEngine;
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class CalibrationEngine {
    /**
     * Chuẩn hóa góc phương vị La Bàn về chu thiên [0, 360)
     */
    static normalize360(angle) {
      if (typeof angle !== 'number' || isNaN(angle)) return 0;
      let b = ((angle % 360) + 360) % 360;
      b = Math.round(b * 1e8) / 1e8;
      return Object.is(b, -0) ? 0 : b;
    }

    /**
     * Chuẩn hóa góc lệch có dấu về nửa vòng chu thiên [-180, +180]
     */
    static normalizeSigned(angle) {
      let x = CalibrationEngine.normalize360(angle);
      if (x > 180) x -= 360;
      return Math.round(x * 1e8) / 1e8;
    }

    /**
     * Tính toán độ lệch hiệu chuẩn thực địa duy nhất:
     * OFFSET = normalizeSigned(measuredHouseBearing - rawHouseBearing)
     */
    static computeOffset(rawHouseBearing, measuredHouseBearing) {
      const raw = CalibrationEngine.normalize360(rawHouseBearing);
      const measured = CalibrationEngine.normalize360(measuredHouseBearing);
      return CalibrationEngine.normalizeSigned(measured - raw);
    }

    /**
     * Bù sai số cho một phương vị thô bất kỳ (Hướng nhà, Tọa, Lai, Khứ, Ranh đất):
     * calibratedBearing = normalize360(rawBearing + calibrationOffset)
     */
    static calibrate(rawBearing, calibrationOffset) {
      return CalibrationEngine.normalize360(rawBearing + calibrationOffset);
    }

    /**
     * Tính phương vị tương đối so với hướng nhà (Bảo toàn tuyệt đối qua hiệu chuẩn):
     * relativeBearing = normalizeSigned(targetBearing - houseBearing)
     */
    static computeRelativeBearing(houseBearing, targetBearing) {
      return CalibrationEngine.normalizeSigned(targetBearing - houseBearing);
    }

    /**
     * Định dạng chuỗi hiển thị Offset chuẩn kỹ thuật (ví dụ: +2.60°, -1.50°, 0.00°)
     * TUYỆT ĐỐI KHÔNG GẮN SƠN/CAN/CHI/QUÁI VÀO OFFSET.
     */
    static formatOffset(offset, decimals = 2) {
      if (typeof offset !== 'number' || isNaN(offset)) return `0.${'0'.repeat(decimals)}°`;
      const sign = offset > 0 ? '+' : (offset < 0 ? '-' : '');
      const absVal = Math.abs(offset).toFixed(decimals);
      return `${sign}${absVal}°`;
    }
  }

  return CalibrationEngine;
}));
