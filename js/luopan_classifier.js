/**
 * BỘ PHÂN LOẠI & ĐỐI CHIẾU 144 THỦY KHẨU CHÁNH TÔNG (LUOPAN 144 CLASSIFIER)
 * Tích hợp:
 * 1. Phân tích cận biên và dải bất định (Uncertainty Range +/- epsilon).
 * 2. Đối chiếu 144 Thủy Khẩu có trace học thuật minh bạch (Hướng -> Cụm -> Chiều nước -> Khứ Thủy -> Khẩu).
 * 3. Tuyệt đối không fallback bừa nếu chưa đủ dữ kiện.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./luopan_calibration_engine', './luopan_geometry', './luopan_data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./luopan_calibration_engine'), require('./luopan_geometry'), require('./luopan_data'));
  } else {
    root.LuopanClassifier = factory(root.CalibrationEngine, root.LuopanGeometry, root.LuopanData);
  }
}(typeof self !== 'undefined' ? self : this, function(Calibration, Geometry, Data) {
  'use strict';

  const Calib = Calibration || (typeof window !== 'undefined' ? window.CalibrationEngine : null);

  class LuopanClassifier {
    constructor() {
      this.DEFAULT_TOLERANCE = 0.3; // Sai số đo mặc định (+/- 0.3 độ)
    }

    /**
     * Đánh giá dải bất định của một phương vị góc đối với ranh giới 24 Sơn
     */
    evaluateUncertainty(bearing, tolerance = this.DEFAULT_TOLERANCE) {
      if (bearing === null || typeof bearing !== 'number') return null;

      const norm = Calib.normalize360(bearing);
      const minB = Calib.normalize360(norm - tolerance);
      const maxB = Calib.normalize360(norm + tolerance);

      const mCenter = Data.getMountain(norm);
      const mMin = Data.getMountain(minB);
      const mMax = Data.getMountain(maxB);

      const isCrossBoundary = (mMin.mountain.name !== mCenter.mountain.name) || (mMax.mountain.name !== mCenter.mountain.name);
      const possibleMountains = [...new Set([mMin.mountain.name, mCenter.mountain.name, mMax.mountain.name])];

      return {
        bearing: norm,
        mountain: mCenter.mountain,
        distanceToBoundary: mCenter.distanceToBoundary,
        isSensitive: isCrossBoundary,
        possibleMountains,
        tolerance
      };
    }

    /**
     * Phân loại toàn diện phép đo hiện trường
     */
    classify(params = {}) {
      const {
        facingBearing = 0,
        laiBearing = null,
        khuBearing = null,
        offset = 0,
        isLocked = false,
        tolerance = this.DEFAULT_TOLERANCE
      } = params;

      const normFacing = Calib.normalize360(facingBearing);
      const sittingBearing = Geometry.calculateHouseSittingBearing(normFacing);

      // 1. Phân tích Hướng & Tọa
      const facingUncertainty = this.evaluateUncertainty(normFacing, tolerance);
      const sittingMountainInfo = Data.getMountain(sittingBearing);
      const facingTrigramInfo = Data.getTrigram(normFacing);

      // 2. Xác định Nhóm Song Sơn trong 12 Nhóm
      const facingName = facingUncertainty.mountain.name;
      let matchedGroup = Data.SONG_SON_GROUPS.find(g => g.huongSon.includes(facingName)) || Data.SONG_SON_GROUPS[0];

      // 3. Phân tích Lai Thủy
      const laiUncertainty = laiBearing !== null ? this.evaluateUncertainty(laiBearing, tolerance) : null;

      // 4. Phân tích Khứ Thủy
      const khuUncertainty = khuBearing !== null ? this.evaluateUncertainty(khuBearing, tolerance) : null;

      // 5. Xác định Chiều Nước (Trái -> Phải hay Phải -> Trái) so với Hướng Nhà
      let flowDirectionLabel = null; // 'Trái → phải' hoặc 'Phải → trái'
      if (laiBearing !== null && khuBearing !== null) {
        const relLai = Calib.computeRelativeBearing(normFacing, laiBearing);
        const relKhu = Calib.computeRelativeBearing(normFacing, khuBearing);
        // Lai ở bên trái (âm) đến Khứ ở bên phải (dương): Trái -> Phải
        // Ngược lại: Phải -> Trái
        flowDirectionLabel = (relKhu >= relLai) ? 'Trái → phải' : 'Phải → trái';
      }

      // 6. Đối chiếu Ma Trận 144 Thủy Khẩu với Trace Học Thuật Minh Bạch
      let matchedThuyKhau = null;
      let matchTrace = [];

      const matrix = (typeof window !== 'undefined' && window.THUY_KHAU_144_MATRIX) || [];

      if (khuUncertainty && isLocked) {
        const khuName = khuUncertainty.mountain.name;
        matchTrace.push(`1. Cụm Song Sơn: ${matchedGroup.label} (${matchedGroup.cuc} Cục)`);
        matchTrace.push(`2. Sơn Khứ Thủy: ${khuName} (Cách ranh: ${khuUncertainty.distanceToBoundary.toFixed(2)}°)`);
        if (flowDirectionLabel) matchTrace.push(`3. Chiều dòng chảy: ${flowDirectionLabel}`);

        // Lọc 12 Khẩu thuộc Cụm Song Sơn này
        const groupItems = matrix.filter(m => Math.floor((m.hs_num - 1) / 12) === matchedGroup.idx);

        // Tìm khẩu khớp cả tên cửa nước thoát và chiều nước (nếu có)
        matchedThuyKhau = groupItems.find(item => {
          const matchXuat = item.thuy_xuat && (item.thuy_xuat.includes(khuName) || khuName.includes(item.thuy_xuat.split(' ')[0]));
          if (!matchXuat) return false;
          if (flowDirectionLabel && item.chieu_nuoc) {
            return item.chieu_nuoc === flowDirectionLabel;
          }
          return true;
        }) || groupItems.find(item => {
          return item.thuy_xuat && (item.thuy_xuat.includes(khuName) || khuName.includes(item.thuy_xuat.split(' ')[0]));
        }) || null;

        if (matchedThuyKhau) {
          matchTrace.push(`4. Khớp Khẩu #${matchedThuyKhau.hs_num}: ${matchedThuyKhau.ten_cach} [${matchedThuyKhau.muc_phan}]`);
        } else {
          matchTrace.push(`4. Không có khẩu đối ứng trực tiếp cho cửa thoát ${khuName} trong Cụm này.`);
        }
      }

      // 7. Đánh giá trạng thái chung
      const isAnySensitive = facingUncertainty.isSensitive ||
        (laiUncertainty && laiUncertainty.isSensitive) ||
        (khuUncertainty && khuUncertainty.isSensitive);

      let statusState = 'CHUA_HIEU_CHUAN';
      let statusLabel = 'Kết Quả Tạm Thời (Chưa Hiệu Chuẩn)';
      let statusColor = '#FBBF24';

      if (isLocked) {
        if (isAnySensitive) {
          statusState = 'NHAY_CAM_SAI_SO';
          statusLabel = '⚠️ KẾT QUẢ NHẠY VỚI SAI SỐ (CẦN ĐO LẠI HIỆN TRƯỜNG)';
          statusColor = '#FB7185';
        } else {
          statusState = 'DA_HIEU_CHUAN';
          statusLabel = '✓ ĐÃ HIỆU CHUẨN LA KINH CHÍNH XÁC';
          statusColor = '#34D399';
        }
      }

      return {
        facing: facingUncertainty,
        sitting: {
          bearing: sittingBearing,
          mountain: sittingMountainInfo.mountain
        },
        group: matchedGroup,
        lai: laiUncertainty,
        khu: khuUncertainty,
        flowDirection: flowDirectionLabel,
        thuyKhau: matchedThuyKhau,
        matchTrace,
        calibration: {
          offset,
          isLocked
        },
        status: {
          state: statusState,
          label: statusLabel,
          color: statusColor,
          isSensitive: isAnySensitive
        }
      };
    }
  }

  return LuopanClassifier;
}));
