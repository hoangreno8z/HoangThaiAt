/**
 * BỘ PHÂN LOẠI & ĐỐI CHIẾU 144 THỦY KHẨU CHÁNH TÔNG (LUOPAN 144 CLASSIFIER)
 * Đối chiếu phương vị đã hiệu chuẩn với 144 Thủy Khẩu, kiểm tra ranh giới phân kim (Boundary Analysis).
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./luopan_geometry', './luopan_data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./luopan_geometry'), require('./luopan_data'));
  } else {
    root.LuopanClassifier = factory(root.LuopanGeometry, root.LuopanData);
  }
}(typeof self !== 'undefined' ? self : this, function(Geometry, Data) {
  'use strict';

  class LuopanClassifier {
    constructor() {
      this.BOUNDARY_ALERT_THRESHOLD = 0.5; // Độ cận biên cảnh báo phân kim (độ)
    }

    /**
     * Phân loại toàn diện một phép đo hiện trường
     * @param {Object} params
     *   - facingBearing: Hướng nhà (đã hiệu chuẩn)
     *   - laiBearing: Phương vị nước đến (Lai Thủy)
     *   - khuBearing: Phương vị nước đi (Khứ Thủy)
     *   - offset: Độ lệch hiệu chuẩn
     *   - isLocked: Trạng thái đã khóa hay chưa
     */
    classify(params = {}) {
      const {
        facingBearing = 0,
        laiBearing = null,
        khuBearing = null,
        offset = 0,
        isLocked = false
      } = params;

      const normFacing = Geometry.normalizeBearing(facingBearing);
      const sittingBearing = Geometry.calculateHouseSittingBearing(normFacing);

      // 1. Xác định Sơn của Hướng và Tọa
      const facingMountainInfo = Data.getMountain(normFacing);
      const sittingMountainInfo = Data.getMountain(sittingBearing);
      const facingTrigramInfo = Data.getTrigram(normFacing);

      // 2. Tìm Nhóm Song Sơn phù hợp trong 12 Nhóm
      const facingName = facingMountainInfo.mountain.name;
      let matchedGroup = Data.SONG_SON_GROUPS.find(g => g.huongSon.includes(facingName)) || Data.SONG_SON_GROUPS[0];

      // 3. Phân tích Khứ Thủy (Cửa Nước Thoát)
      let khuMountainInfo = null;
      let matchedThuyKhau = null;
      let isNearBoundaryKhu = false;

      const matrix = (typeof window !== 'undefined' && window.THUY_KHAU_144_MATRIX) || [];

      if (khuBearing !== null) {
        const normKhu = Geometry.normalizeBearing(khuBearing);
        khuMountainInfo = Data.getMountain(normKhu);
        isNearBoundaryKhu = khuMountainInfo.distanceToBoundary <= this.BOUNDARY_ALERT_THRESHOLD;

        // Tìm kiếm trong 12 hồ sơ thuộc nhóm Song Sơn này
        const groupItems = matrix.filter(m => Math.floor((m.hs_num - 1) / 12) === matchedGroup.idx);
        const khuName = khuMountainInfo.mountain.name;

        // Đối chiếu với tên cửa nước thoát (thuy_xuat)
        matchedThuyKhau = groupItems.find(item => {
          return item.thuy_xuat && (item.thuy_xuat.includes(khuName) || khuName.includes(item.thuy_xuat.split(' ')[0]));
        }) || groupItems[0] || null;
      }

      // 4. Phân tích Lai Thủy
      let laiMountainInfo = null;
      let isNearBoundaryLai = false;
      if (laiBearing !== null) {
        const normLai = Geometry.normalizeBearing(laiBearing);
        laiMountainInfo = Data.getMountain(normLai);
        isNearBoundaryLai = laiMountainInfo.distanceToBoundary <= this.BOUNDARY_ALERT_THRESHOLD;
      }

      // 5. Đánh giá trạng thái phân kim cận ranh giới (Near Boundary Warning)
      const isNearBoundaryFacing = facingMountainInfo.distanceToBoundary <= this.BOUNDARY_ALERT_THRESHOLD;
      const isNearAnyBoundary = isNearBoundaryFacing || isNearBoundaryLai || isNearBoundaryKhu;

      let statusState = 'CHUA_HIEU_CHUAN';
      let statusLabel = 'Kết Quả Tạm Thời (Chưa Hiệu Chuẩn)';
      let statusColor = '#FBBF24';

      if (isLocked) {
        if (isNearAnyBoundary) {
          statusState = 'GAN_RANH';
          statusLabel = '⚠️ GẦN RANH PHÂN KIM (CẦN ĐO LẠI HIỆN TRƯỜNG)';
          statusColor = '#FB7185';
        } else {
          statusState = 'DA_HIEU_CHUAN';
          statusLabel = '✓ ĐÃ HIỆU CHUẨN LA KINH CHÍNH XÁC';
          statusColor = '#34D399';
        }
      }

      return {
        facing: {
          bearing: normFacing,
          mountain: facingMountainInfo.mountain,
          trigram: facingTrigramInfo.trigram,
          distanceToBoundary: facingMountainInfo.distanceToBoundary,
          isNearBoundary: isNearBoundaryFacing
        },
        sitting: {
          bearing: sittingBearing,
          mountain: sittingMountainInfo.mountain
        },
        group: matchedGroup,
        lai: laiMountainInfo ? {
          bearing: Geometry.normalizeBearing(laiBearing),
          mountain: laiMountainInfo.mountain,
          distanceToBoundary: laiMountainInfo.distanceToBoundary,
          isNearBoundary: isNearBoundaryLai
        } : null,
        khu: khuMountainInfo ? {
          bearing: Geometry.normalizeBearing(khuBearing),
          mountain: khuMountainInfo.mountain,
          distanceToBoundary: khuMountainInfo.distanceToBoundary,
          isNearBoundary: isNearBoundaryKhu
        } : null,
        thuyKhau: matchedThuyKhau,
        calibration: {
          offset: offset,
          isLocked: isLocked
        },
        status: {
          state: statusState,
          label: statusLabel,
          color: statusColor,
          isNearBoundary: isNearAnyBoundary
        }
      };
    }
  }

  return LuopanClassifier;
}));
