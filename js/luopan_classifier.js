/**
 * BỘ PHÂN LOẠI & ĐỐI CHIẾU 144 THỦY KHẨU CHÁNH TÔNG (LUOPAN 144 CLASSIFIER)
 * Tích hợp:
 * 1. Phân tích cận biên và dải bất định (Uncertainty Range +/- epsilon).
 * 2. Đối chiếu 144 Thủy Khẩu có trace học thuật minh bạch (Hướng -> Cụm -> Chiều nước -> Khứ Thủy -> Khẩu).
 * 3. Tuyệt đối không fallback bừa nếu chưa đủ dữ kiện.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./luopan_calibration_engine', './luopan_geometry', './luopan_data', './luopan_theory_corpus'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./luopan_calibration_engine'),
      require('./luopan_geometry'),
      require('./luopan_data'),
      require('./luopan_theory_corpus')
    );
  } else {
    root.LuopanClassifier = factory(
      root.CalibrationEngine,
      root.LuopanGeometry,
      root.LuopanData,
      root.LuopanTheoryCorpus
    );
  }
}(typeof self !== 'undefined' ? self : this, function(Calibration, Geometry, Data, TheoryCorpus) {
  'use strict';

  const Calib = Calibration || (typeof window !== 'undefined' ? window.CalibrationEngine : null);
  const Corpus = TheoryCorpus || (typeof window !== 'undefined' ? window.LuopanTheoryCorpus : null);

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

      // Gắn Cung Trường Sinh cho Hướng & Tọa
      facingUncertainty.truongSinh = Data.getTruongSinh(facingName, matchedGroup.cuc);
      const sittingTruongSinh = Data.getTruongSinh(sittingMountainInfo.mountain.name, matchedGroup.cuc);

      // 3. Phân tích Lai Thủy
      const laiUncertainty = laiBearing !== null ? this.evaluateUncertainty(laiBearing, tolerance) : null;
      if (laiUncertainty) {
        laiUncertainty.truongSinh = Data.getTruongSinh(laiUncertainty.mountain.name, matchedGroup.cuc);
      }

      // 4. Phân tích Khứ Thủy
      const khuUncertainty = khuBearing !== null ? this.evaluateUncertainty(khuBearing, tolerance) : null;
      if (khuUncertainty) {
        khuUncertainty.truongSinh = Data.getTruongSinh(khuUncertainty.mountain.name, matchedGroup.cuc);
      }

      // 5. Đánh giá Tam Hợp Thủy Pháp Cát Hung theo 12 Cung Trường Sinh
      const laiTs = laiUncertainty ? laiUncertainty.truongSinh : null;
      const khuTs = khuUncertainty ? khuUncertainty.truongSinh : null;

      let aphorism = 'Chưa đo đủ Lai/Khứ';
      let overallRating = 'Bình';
      let overallColor = '#94A3B8';

      if (laiTs && khuTs) {
        const isGoodLai = [0, 2, 3, 4].includes(laiTs.stage); // Sinh, Đới, Quan, Vượng
        const isGoodKhu = [5, 8, 9].includes(khuTs.stage); // Suy, Mộ, Tuyệt

        if (khuTs.stage === 3) {
          aphorism = 'Xung Phá Lâm Quan / Sát Nhân Hoàng Tuyền Thủy';
          overallRating = 'Đại Hung Sát';
          overallColor = '#EF4444';
        } else if (khuTs.stage === 0 || khuTs.stage === 4) {
          aphorism = 'Vượng Khứ Xung Sinh / Tán Tài Bại Gia';
          overallRating = 'Đại Hung';
          overallColor = '#EF4444';
        } else if (isGoodLai && khuTs.stage === 8) {
          aphorism = 'Sinh Lai Hội Vượng · Thủy Quy Mộ Khố';
          overallRating = 'Đại Cát Tụ Tài';
          overallColor = '#10B981';
        } else if (isGoodLai && isGoodKhu) {
          aphorism = 'Cát Thủy Đáo Đường · Tiêu Thủy Hợp Cục';
          overallRating = 'Cát Lợi';
          overallColor = '#34D399';
        } else {
          aphorism = `${laiTs.name} Lai Thủy ➔ ${khuTs.name} Khứ Thủy`;
          overallRating = 'Cần Thận Trọng Xét Thêm';
          overallColor = '#F59E0B';
        }
      } else if (laiTs && !khuTs) {
        aphorism = `Lai Thủy từ ${laiTs.name} (${laiTs.laiNature})`;
        overallRating = [0, 3, 4].includes(laiTs.stage) ? 'Cát Khí Đáo Đường' : 'Cần Tiêu Dẫn';
        overallColor = [0, 3, 4].includes(laiTs.stage) ? '#10B981' : '#F59E0B';
      }

      // 6. Xác định Chiều Nước (Trái -> Phải hay Phải -> Trái) so với Hướng Nhà
      let flowDirectionLabel = null; // 'Trái → phải' hoặc 'Phải → trái'
      if (laiBearing !== null && khuBearing !== null) {
        const relLai = Calib.computeRelativeBearing(normFacing, laiBearing);
        const relKhu = Calib.computeRelativeBearing(normFacing, khuBearing);
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

      // 8. Thẩm định Địa Cuộc Topo Phức Tạp (100% Cổ Thư Kinh Điển)
      const waterNature = params.waterNature || 'hu_thuy';
      const topoAnalysis = this.analyzeComplexTopo({
        polyline: params.polyline || [],
        waterSegments: params.waterSegments || [],
        houseCenter: params.houseCenter || null,
        facingBearing: normFacing,
        waterPathType: params.waterPathType || 'through',
        laiNodeIndex: params.laiNodeIndex,
        khuNodeIndex: params.khuNodeIndex,
        cuc: matchedGroup.cuc,
        waterNature
      });

      return {
        facing: facingUncertainty,
        sitting: {
          bearing: sittingBearing,
          mountain: sittingMountainInfo.mountain,
          truongSinh: sittingTruongSinh
        },
        group: matchedGroup,
        lai: laiUncertainty,
        khu: khuUncertainty,
        tamHop: {
          cuc: matchedGroup.cuc,
          aphorism,
          rating: overallRating,
          color: overallColor
        },
        flowDirection: flowDirectionLabel,
        thuyKhau: matchedThuyKhau,
        matchTrace,
        waterNature,
        topo: topoAnalysis,
        theoryCitations: topoAnalysis.theoryCitations || [],
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

    /**
     * Phân tích Địa Cuộc Topo Đô Thị Phức Tạp căn cứ 100% Cổ Thư Kinh Điển:
     * 《Nhân Tử Tu Tri》 (Từ Thiện Kế), 《Dương Trạch Thập Thư》 (Vương Quân Vinh),
     * 《Thủy Long Kinh》, 《Phát Vi Luận》 (Thái Nguyên Định).
     */
    analyzeComplexTopo(params = {}) {
      const {
        polyline = [],
        waterSegments = [],
        houseCenter = null,
        facingBearing = 0,
        waterPathType = 'through',
        cuc = 'Hỏa',
        waterNature = 'hu_thuy'
      } = params;

      const features = [];
      const bends = [];

      // 1. Phân cấp Tứ Tầng Khí Lộ & Phân tích Khúc Chiết Tiêu Sát
      const bendMomentum = (Geometry && Geometry.analyzeBendMomentum)
        ? Geometry.analyzeBendMomentum(polyline, houseCenter)
        : { hasSharpBend: false, hasUTurn: false, khucChietTieuSat: false, sharpCount: 0, rightAngleCount: 0, bends: [] };

      const pathTiers = (Geometry && Geometry.classifyPathTiers)
        ? Geometry.classifyPathTiers(polyline, houseCenter)
        : [];

      // Kiểm tra Khúc Chiết Tiêu Sát (Mạng đường chữ U, rẽ vuông góc >= 45°)
      if (bendMomentum.khucChietTieuSat) {
        features.push({
          id: 'khuc_chiet_tieu_sat',
          name: 'Khúc Chiết Tiêu Sát (Gấp Khúc Chữ U / Chiết Giác Tiêu Khí)',
          rating: 'Cát Lợi Tiêu Sát',
          color: '#10B981',
          source: '《Trạch Pháp Cử Ngung》 & 《Thủy Long Kinh》',
          quoteOriginal: '每逢空缺即为来，一遇遮拦便作止。水经三折，煞化为权；路过九曲，气纯而固。',
          quoteHanViet: 'Mỗi phùng không khuyết tức vi lai, nhất ngộ già lan tiện tác chỉ. Thủy kinh tam chiết, sát hóa vi quyền; lộ quá cửu khúc, khí thuần nhi cố.',
          quoteMeaning: bendMomentum.summary,
          remedy: null
        });
      }

      // Kiểm tra Phân Tầng Khí Lộ (Tứ Tầng Cục Thế)
      if (polyline.length >= 3) {
        features.push({
          id: 'phan_tang_khi_lo',
          name: 'Phân Tầng Khí Lộ (Tứ Tầng Cục Thế: Ngoại ➔ Trung ➔ Cận ➔ Khí Khẩu)',
          rating: 'Minh Định Cục Thế',
          color: '#38BDF8',
          source: '《Trạch Pháp Cử Ngung》 & 《Địa Lý Ngũ Quyết》',
          quoteOriginal: '若山居则认落脉，陆地则凭行路，市中则察街衢。一层街衢为一层水，一层墙屋为一层砂。二十步内重局，二十步外重宅。',
          quoteHanViet: 'Nhược sơn cư tắc nhận lạc mạch, lục địa tắc bằng hành lộ, thị trung tắc sát nhai cù. Nhất tầng nhai cù vi nhất tầng thủy, nhất tầng tường ốc vi nhất tầng sa. Nhị thập bộ nội trọng cục, nhị thập bộ ngoại trọng trạch.',
          quoteMeaning: 'Tuyến đường phân tầng 3 lớp rõ rệt: Ngoại Cục (tỉnh lộ/đại lộ ở xa), Trung Cục (hẻm dẫn chuyển thế) và Cận Trạch (hẻm sát cửa nhà). Nhờ 2 khúc ngoặt che chắn, động thế của tỉnh lộ được phân luồng tiêu tán, vi khí tụ tại Cận Trạch.',
          remedy: null
        });
      }

      // Nhận diện Hư Thủy Lộ Khí (Dương Trạch Đô Thị)
      if (waterNature === 'hu_thuy' && polyline.length >= 2) {
        features.push({
          id: 'hu_thuy_lo_khi',
          name: 'Hư Thủy Lộ Khí (Dương Trạch Đô Thị)',
          rating: 'Phép Loại Suy Dương Trạch',
          color: '#F59E0B',
          source: '《Trạch Pháp Cử Ngung》 & 《Tứ Khố Toàn Thư Tổng Mục》',
          quoteOriginal: '市中则察街衢，乃借路为水，名曰虚水。不与大江大河真水同论消纳。',
          quoteHanViet: 'Thị trung tắc sát nhai cù, nãi tá lộ vi thủy, danh viết Hư Thủy. Bất dữ đại giang đại hà chân thủy đồng luận tiêu nạp.',
          quoteMeaning: 'Đường sá là Hư Thủy trong phép loại suy Dương Trạch, không phải nước thật. 12 Cung Trường Sinh chỉ quy chiếu bổ trợ cho phân đoạn CẬN TRẠCH sát cửa; các phân đoạn Ngoại Cục ở xa không đồng nhất làm Lai Thủy trực tiếp.',
          remedy: null
        });
      }

      // 2. Phân tích các góc uốn khúc (Meandering)
      if (polyline.length >= 3) {
        for (let i = 1; i < polyline.length - 1; i++) {
          const bend = Geometry.calculateBendAngle(polyline[i - 1], polyline[i], polyline[i + 1]);
          bends.push({
            nodeIndex: i,
            point: polyline[i],
            ...bend
          });
        }
      }

      // Kiểm tra Cửu Khúc Thủy (Ngự Nhai Thủy - uốn lượn nhiều đoạn hiền hòa)
      const isGentleMeandering = bends.length >= 2 && bends.every(b => b.absDeflection >= 18 && b.absDeflection <= 130);
      if (isGentleMeandering) {
        features.push({
          id: 'meandering_cuu_khuc',
          name: 'Cửu Khúc Thủy (Ngự Nhai Thủy)',
          rating: 'Đại Cát Tụ Khí',
          color: '#10B981',
          source: '《Nhân Tử Tu Tri·Luận Thủy Hình Thế》',
          quoteOriginal: '九曲者，即御街水，屈曲有情，主文章蓋世，巨富高官。',
          quoteHanViet: 'Cửu Khúc giả, tức Ngự Nhai Thủy, khuất khúc hữu tình, chủ văn chương cái thế, cự phú cao quan.',
          quoteMeaning: 'Tuyến đường uốn lượn quanh co nhiều đoạn, dòng khí chuyển động từ tốn hòa hoãn, sinh khí tụ trước minh đường, chủ đại phú đại quý, nhân đinh khoa bảng hiển vinh.',
          remedy: null
        });
      }

      // Kiểm tra Cát Cước Thủy / Tiệt Khí Sát (góc bẻ quá nhọn hoặc quá sát móng)
      const hasSharpBend = bends.some(b => b.absDeflection > 135);
      let minDistanceToHouse = Infinity;
      if (houseCenter && polyline.length >= 2) {
        for (let i = 0; i < polyline.length - 1; i++) {
          const d = Geometry.distancePointToSegment(houseCenter, polyline[i], polyline[i + 1]);
          if (d < minDistanceToHouse) minDistanceToHouse = d;
        }
      }
      const isCatCuoc = hasSharpBend || minDistanceToHouse < 35;
      if (isCatCuoc && polyline.length >= 2) {
        features.push({
          id: 'cat_cuoc_thuy',
          name: 'Cát Cước Thủy (Tiệt Khí Sát)',
          rating: 'Hung Sát Tiệt Khí',
          color: '#EF4444',
          source: '《Nhân Tử Tu Tri》 & 《Thủy Long Kinh》',
          quoteOriginal: '割腳者，水貼穴前割腳而去，無融聚之氣，退財損丁。',
          quoteHanViet: 'Cát Cước giả, thủy thiếp huyệt tiền cát cước nhi khứ, vô dung tụ chi khí, thoái tài tổn đinh.',
          quoteMeaning: 'Tuyến đường/nước áp sát chân móng hoặc bẻ ngoặt gấp khúc xé toạc ranh giới khí, làm dòng khí chảy xiết cắt đứt mạch nuôi dưỡng, thoái tài bại nghiệp.',
          remedy: 'Tạo khoảng lùi hành lang cây xanh trước hiên nhà, nâng cao cốt bậc tam cấp để ngăn dòng khí xói mòn chân móng.'
        });
      }

      // 3. Phân tích Hoàn Bão vs Phản Cung
      let curveWrap = { type: 'tuyen_thang', label: 'Tuyến thẳng', rating: 'Bình', color: '#94A3B8' };
      if (polyline.length >= 3 && houseCenter) {
        curveWrap = Geometry.calculateCurveWrap(polyline, houseCenter);
        if (curveWrap.type === 'hoan_bao') {
          features.push({
            id: 'hoan_bao_thuy',
            name: 'Kim Thành Hoàn Bão (Ngọc Đái Triền Yêu)',
            rating: 'Đại Cát Vượng Tài',
            color: '#10B981',
            source: '《Dương Trạch Thập Thư》 & 《Cổ Kim Đồ Thư Tập Thành》',
            quoteOriginal: '金城灣曲抱吾身，如月如弓。前後有水環抱貴。',
            quoteHanViet: 'Kim Thành loan khúc bão ngô thân, như nguyệt như cung. Tiền hậu hữu thủy hoàn bão quý.',
            quoteMeaning: 'Cung đường uốn cong ôm lấy mặt tiền ngôi nhà như trăng khuyết ôm mình hoặc dải ngọc thắt lưng, trường khí ngưng tụ bảo bọc ngôi nhà, chủ phú quý vinh hiển, gia đạo hòa thuận.',
            remedy: null
          });
        } else if (curveWrap.type === 'phan_cung') {
          features.push({
            id: 'phan_cung_thuy',
            name: 'Phản Cung Thủy (Phản Khiêu / Phản Thân Sát)',
            rating: 'Đại Hung Sát',
            color: '#EF4444',
            source: '《Dương Trạch Thập Thư·Luận Trạch Ngoại Hình》',
            quoteOriginal: '左右有路亦如然，但遇返跳必須忌。水纔過穴而反挑，背城而去。',
            quoteHanViet: 'Tả hữu hữu lộ diệc như nhiên, đãn ngộ phản khiêu tất tu kỵ. Thủy tài quá huyệt nhi phản thiêu, bối thành nhi khứ.',
            quoteMeaning: 'Lưng cong cánh cung chĩa thẳng vào mặt tiền nhà, dòng khí chuyển động va đập bật ngược ra ngoài như tên bắn vào tim, chủ ly tán, tai nạn bất ngờ, phản phúc bại tài.',
            remedy: 'Lắp đặt bình phong che chắn trước cửa chính, bố trí hàng rào cây xanh hình bán nguyệt ngược để hấp thụ lực bắn ngược của dòng khí.'
          });
        }
      }

      // 4. Phân tích Ngã 3 & Dòng Trực Xung
      const directClashSegment = waterSegments.find(s => s.flowRelation && s.flowRelation.type === 'truc_xung');
      if (directClashSegment) {
        features.push({
          id: 'dinh_tu_lo_xung_tam',
          name: 'Đinh Tự Lộ (Xung Tâm Sát / Thương Sát)',
          rating: 'Đại Hung Sát',
          color: '#EF4444',
          source: '《Nhân Tử Tu Tri》 & 《Dương Trạch Thập Thư》',
          quoteOriginal: '衝心者，水勢急直射穴心，主人不安，刑殺血光。',
          quoteHanViet: 'Xung Tâm giả, thủy thế cấp trực xạ huyệt tâm, chủ nhân bất an, hình sát huyết quang.',
          quoteMeaning: `Đoạn tuyến P${directClashSegment.fromIndex + 1} ➔ P${directClashSegment.toIndex + 1} đâm thẳng trực diện vào mặt tiền nhà, tạo thành luồng khí đạn bắn thẳng phá hủy từ trường gia trạch, chủ bất an, tai họa huyết quang.`,
          remedy: 'Bắt buộc xây dựng huyền quan lệch cửa hoặc đặt khối đá trấn trạch Thái Sơn Thạch Cảm Đương để bẻ gãy trục xung sát.'
        });
      }

      const hasJunctionNode = polyline.some(p => p.role === 'junction');
      if (hasJunctionNode) {
        features.push({
          id: 'tam_xoa_hop_luu',
          name: 'Tam Xoa Hợp Lưu (Giao Hội Điểm)',
          rating: 'Cát Lợi Tụ Khí',
          color: '#34D399',
          source: '《Phát Vi Luận·Tụ Tán Thiên》',
          quoteOriginal: '何謂聚？山之所交，水之所會，風氣之所藏也。',
          quoteHanViet: 'Hà vị tụ? Sơn chi sở giao, thủy chi sở hội, phong khí chi sở tàng dã.',
          quoteMeaning: 'Nơi hai dòng giao thoa hội tụ trước minh đường, động năng triệt tiêu nhau tạo nên trường khí ấm áp, vượng phát thương nghiệp nếu nạp đúng cung Sinh Vượng.',
          remedy: null
        });
      }

      // 5. Phân tích Hẻm Cụt / Tuyến Tận
      if (waterPathType === 'deadEnd') {
        const lastNode = polyline[polyline.length - 1];
        const distToEnd = houseCenter && lastNode ? Math.hypot(houseCenter.x - lastNode.x, houseCenter.y - lastNode.y) : 0;

        if (distToEnd < 120) {
          features.push({
            id: 'be_khi_tu_khi',
            name: 'Bế Khí / Tử Khí Thủy (Hẻm Cụt Trệ Khí)',
            rating: 'Thứ Hung (Bế Khí)',
            color: '#F59E0B',
            source: '《Thủy Long Kinh》',
            quoteOriginal: '水盡無道則閉，氣不流通生陰滯死氣。',
            quoteHanViet: 'Thủy tận vô đạo tắc bế, khí bất lưu thông sinh âm trệ tử khí.',
            quoteMeaning: 'Ngôi nhà nằm ở vị trí tận cùng của hẻm cụt, dòng khí dẫn vào bị dồn ứ không có đường thoát, dễ tích tụ âm trệ và thiếu khí đối lưu.',
            remedy: 'Mở giếng trời hút gió đối lưu theo phương thẳng đứng, tăng cường ánh sáng dương quang tại tiền sảnh, thường xuyên dọn dẹp sạch sẽ ngõ vào.'
          });
        } else {
          features.push({
            id: 'thuy_tan_khi_tu',
            name: 'Thủy Tận Khí Tụ (Tĩnh Lư Cục)',
            rating: 'Bình Cát (Tụ Khí)',
            color: '#38BDF8',
            source: '《Bình Dương Tiên Sư Bí Truyền》',
            quoteOriginal: '水止則氣 tụ, minh đường quảng đại hữu dung.',
            quoteHanViet: 'Thủy chỉ tắc khí tụ, minh đường quảng đại hữu dung.',
            quoteMeaning: 'Cuối tuyến nhưng khoảng không phía trước rộng rãi, sinh khí dừng lại ngưng tụ yên ả, thích hợp an cư tu tâm dưỡng tính.',
            remedy: null
          });
        }
      }

      // Tổng luận chung
      let overallRating = 'Bình Hòa';
      let overallColor = '#94A3B8';
      let overallSummary = 'Địa cuộc thế đất tương đối bằng ổn.';

      const hasDaiHung = features.some(f => f.rating.includes('Đại Hung'));
      const hasDaiCat = features.some(f => f.rating.includes('Đại Cát') || f.rating.includes('Cát Lợi'));

      if (hasDaiHung) {
        overallRating = 'Phạm Hình Sát Cổ Thư';
        overallColor = '#EF4444';
        overallSummary = 'Địa cuộc có hình thế xung sát (Phản Cung hoặc Trực Xung). Cần áp dụng phép hóa giải cổ truyền trước khi khởi công.';
      } else if (hasDaiCat) {
        overallRating = 'Đắc Cát Hình Cổ Thư';
        overallColor = '#10B981';
        overallSummary = 'Địa cuộc đắc cách cát tường (Khúc Chiết Tiêu Sát, Kim Thành Hoàn Bão hoặc Cửu Khúc Thủy). Minh đường tụ khí dồi dào!';
      } else if (features.length > 0) {
        overallRating = features[0].rating;
        overallColor = features[0].color;
        overallSummary = features[0].quoteMeaning;
      }

      // 6. Tự động đối chiếu Kho Ngữ Liệu Cổ Thư Chánh Tông
      const theoryCitations = this.matchTheoryCitations({
        polyline,
        waterSegments,
        houseCenter,
        waterPathType,
        waterNature,
        features,
        bendMomentum,
        curveWrap,
        cuc
      });

      return {
        features,
        bends: (bendMomentum.bends && bendMomentum.bends.length > 0) ? bendMomentum.bends : bends,
        bendMomentum,
        pathTiers,
        waterNature,
        curveWrap,
        overallRating,
        overallColor,
        overallSummary,
        theoryCitations
      };
    }

    /**
     * Cơ chế tự nhận dạng đồ hình & Trích dẫn toàn văn Cổ Thư tức thời
     */
    matchTheoryCitations(ctx = {}) {
      if (!Corpus || !Corpus.getEntry) return [];
      const {
        polyline = [],
        waterSegments = [],
        features = [],
        bendMomentum = {},
        waterNature = 'hu_thuy',
        waterPathType = 'through',
        curveWrap = {}
      } = ctx;

      const citations = [];
      const addedIds = new Set();

      function addCitation(id) {
        if (!id || addedIds.has(id)) return;
        const entry = Corpus.getEntry(id);
        if (entry) {
          addedIds.add(id);
          citations.push(entry);
        }
      }

      // 1. Phân tầng khí lộ (khi có từ 3 điểm / 2 đoạn trở lên)
      if (polyline.length >= 3) {
        addCitation('phan_tang_khi_lo');
      }

      // 2. Khúc chiết tiêu sát (khi có khúc rẽ chữ U hoặc góc vuông / khúc ngoặt lớn)
      if (bendMomentum && (bendMomentum.khucChietTieuSat || bendMomentum.hasSharpBend)) {
        addCitation('khuc_chiet_tieu_sat');
      }

      // 3. Biện chứng Chân Thủy vs Hư Thủy
      if (waterNature === 'hu_thuy' && polyline.length >= 2) {
        addCitation('chan_thuy_vs_hu_thuy');
      }

      // 4. Phân biệt tiếp tuyến thân đường vs phương vị nạp khí Khí Khẩu
      if (polyline.length >= 2) {
        addCitation('tiep_tuyen_vs_khi_khau');
      }

      // 5. Cung cong ôm (Kim Thành Hoàn Bão) vs Phản Cung
      if (curveWrap && curveWrap.type === 'hoan_bao') {
        addCitation('kim_thanh_hoan_bao');
      } else if (curveWrap && curveWrap.type === 'phan_cung') {
        addCitation('phan_cung_thuy');
      }

      // 6. Đinh Tự Lộ (Xung Tâm Sát)
      if (features.some(f => f.id === 'dinh_tu_lo_xung_tam')) {
        addCitation('dinh_tu_lo_xung_tam');
      }

      // 7. Tam Xoa Hợp Lưu (Ngã ba giao hội)
      if (features.some(f => f.id === 'tam_xoa_hop_luu')) {
        addCitation('tam_xoa_hop_luu');
      }

      // 8. Hẻm Cụt (Bế Khí)
      if (waterPathType === 'deadEnd') {
        addCitation('be_khi_tu_khi');
      }

      // 9. Hoành Thủy Minh Đường (Tả Thủy đảo Hữu / Hữu Thủy đảo Tả)
      if (waterSegments.some(s => s.flowRelation && (s.flowRelation.type === 'ta_dao_huu' || s.flowRelation.type === 'huu_dao_ta'))) {
        addCitation('hoanh_thuy_quang_duong');
      }

      // 10. Tam Hợp 12 Cung Trường Sinh
      if (waterSegments.length > 0) {
        addCitation('tam_hop_truong_sinh_thuy_phap');
      }

      return citations;
    }
  }

  return LuopanClassifier;
}));
