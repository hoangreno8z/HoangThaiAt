/**
 * ĐỘNG CƠ PHÂN TÍCH NGÀNH NGHỀ & ĐỘNG THÁI SINH - TỬ THỊ TRƯỜNG (INDUSTRY ECONOMIC ENGINE)
 * Chuẩn hóa theo Hệ thống ngành kinh tế Việt Nam (VSIC 2025) & Foursquare OS Places Categories.
 * Tính toán Sức mua riêng ngành, Tỷ số Cầu/Cung (DSR), Churn Rate, Tuổi thọ cửa hàng & Điểm Cơ Hội Thị Trường.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./economic_radius_engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./economic_radius_engine'));
  } else {
    root.IndustryEconomicEngine = factory(root.EconomicRadiusEngine);
  }
}(typeof self !== 'undefined' ? self : this, function(RadiusEngine) {
  'use strict';

  const getRadiusEngine = () => {
    if (RadiusEngine && RadiusEngine.calculateRadiusMarket) return RadiusEngine;
    if (typeof window !== 'undefined' && window.EconomicRadiusEngine) return window.EconomicRadiusEngine;
    return null;
  };

  /**
   * DANH MỤC HỒ SƠ KINH TẾ CHUẨN HÓA 6 NGÀNH NGHỀ TRỌNG ĐIỂM (VSIC 2025)
   */
  const INDUSTRY_CATALOG = {
    CAFE: {
      id: 'CAFE',
      name: 'Cà Phê & Đồ Uống Giải Khát',
      shortName: 'Cà phê',
      icon: '☕',
      vsic_code: '56302',
      vsic_name: 'Dịch vụ phục vụ đồ uống: Quán cà phê, giải khát',
      fsq_categories: ['Coffee Shop', 'Tea Room', 'Cafe', 'Juice Bar'],
      target_demographic: 'Khách hàng 18–45 tuổi, nhân viên văn phòng, học sinh - sinh viên, cư dân đô thị',
      target_population_ratio: 0.58, // 58% dân số thuộc tệp khách tiềm năng
      daytime_traffic_multiplier: 1.35, // Văn phòng và sinh viên làm tăng dân số ban ngày 35%
      avg_spend_per_customer_month: 380000, // Chi tiêu bình quân 380k/người/tháng cho cafe
      breakeven_monthly_revenue: 115000000, // Doanh thu hòa vốn tiêu chuẩn: 115 triệu/tháng
      competitor_density_factor: 0.00165, // ~1.65 quán / 1.000 dân đô thị
      chain_ratio_avg: 0.24, // 24% chuỗi lớn (Highlands, Phúc Long, Trung Nguyên, Katinat, TCH...)
      churn_rate_annual: 0.138, // 13.8% cửa hàng bị loại bỏ/thanh lọc mỗi năm
      survival_rates: {
        under_6m: 0.14,
        m6_to_12: 0.19,
        y1_to_2: 0.27,
        over_2y: 0.40
      },
      fengshui_affinity: 'Chuộng Khí Khẩu nạp khách sôi động, góc cua ôm trọn (Kim Thành Hoàn Bão), mặt tiền vỉa hè rộng đón dòng Tả Thủy Đảo Hữu.',
      suitable_models: [
        'Work Cafe (Không gian làm việc & học tập có wifi mạnh)',
        'Takeaway & Kiosk cà phê pha máy sáng tiện lợi',
        'Cafe Specialty / Trà sữa thời thượng cho giới trẻ',
        'Acoustic / Rooftop ngắm cảnh sân thượng thư giãn'
      ]
    },

    NAIL: {
      id: 'NAIL',
      name: 'Nail & Chăm Sóc Sắc Đẹp',
      shortName: 'Nail & Móng',
      icon: '💅',
      vsic_code: '96220',
      vsic_name: 'Dịch vụ chăm sóc sắc đẹp, làm móng tay, móng chân',
      fsq_categories: ['Nail Salon', 'Beauty Salon'],
      target_demographic: 'Nữ giới 18–55 tuổi, cư dân thường trú ổn định, nhân viên văn phòng, phụ nữ gia đình',
      target_population_ratio: 0.29, // ~29% dân số là nữ giới trong độ tuổi làm đẹp thường xuyên
      daytime_traffic_multiplier: 1.08,
      avg_spend_per_customer_month: 320000, // Chi tiêu bình quân 320k/tháng (chu kỳ 3 tuần/lần)
      breakeven_monthly_revenue: 65000000, // Doanh thu hòa vốn tiêu chuẩn: 65 triệu/tháng
      competitor_density_factor: 0.00085, // ~0.85 tiệm / 1.000 dân
      chain_ratio_avg: 0.08, // 8% chuỗi thương hiệu, 92% tiệm độc lập/cá nhân
      churn_rate_annual: 0.165, // 16.5% thanh lọc/năm
      survival_rates: {
        under_6m: 0.17,
        m6_to_12: 0.23,
        y1_to_2: 0.26,
        over_2y: 0.34
      },
      fengshui_affinity: 'Chuộng ngõ phố yên tĩnh, an toàn, dễ đỗ xe, cung vị nạp khí thanh tịnh, nội thất ấm cúng kích hoạt đào hoa quý nhân.',
      suitable_models: [
        'Nail Art & Eyelash Studio chuyên nghiệp',
        'Combo Nail & Gội đầu dưỡng sinh thư giãn',
        'Nail Bar nhanh tiện lợi phong cách Hàn/Nhật',
        'Boutique Salon cao cấp cho cư dân chung cư'
      ]
    },

    NHA_HANG_FNB: {
      id: 'NHA_HANG_FNB',
      name: 'Nhà Hàng Ăn Uống & Ẩm Thực',
      shortName: 'Nhà hàng',
      icon: '🍲',
      vsic_code: '56101',
      vsic_name: 'Nhà hàng, quán ăn, hàng ăn uống phục vụ ăn uống tại chỗ',
      fsq_categories: ['Restaurant', 'Vietnamese Restaurant', 'Asian Restaurant', 'Diner'],
      target_demographic: 'Hộ gia đình, giới trẻ, nhóm liên hoan công ty, khách du lịch và vãng lai',
      target_population_ratio: 0.65,
      daytime_traffic_multiplier: 1.25,
      avg_spend_per_customer_month: 620000,
      breakeven_monthly_revenue: 240000000, // Doanh thu hòa vốn: 240 triệu/tháng
      competitor_density_factor: 0.0019, // ~1.9 quán / 1.000 dân
      chain_ratio_avg: 0.18,
      churn_rate_annual: 0.152,
      survival_rates: {
        under_6m: 0.16,
        m6_to_12: 0.22,
        y1_to_2: 0.25,
        over_2y: 0.37
      },
      fengshui_affinity: 'Minh Đường khoáng đạt, đại môn đón vượng khí Trường Sinh, bếp đặt tọa hung hướng cát, hút tài lộc mạnh mẽ.',
      suitable_models: [
        'Nhà hàng ẩm thực gia đình / Lẩu nướng không khói',
        'Quán ăn trưa văn phòng & cơm niêu chất lượng',
        'Nhà hàng hải sản / Đặc sản vùng miền tươi sống',
        'Bistro & Bia thủ công cho giới trẻ buổi tối'
      ]
    },

    SPA_BEAUTY: {
      id: 'SPA_BEAUTY',
      name: 'Spa & Thẩm Mỹ Chăm Sóc Da',
      shortName: 'Spa & Thẩm mỹ',
      icon: '💆',
      vsic_code: '96210',
      vsic_name: 'Dịch vụ spa, chăm sóc da mặt, xoa bóp và làm đẹp toàn thân',
      fsq_categories: ['Spa', 'Massage Clinic', 'Skin Care Clinic'],
      target_demographic: 'Khách hàng có thu nhập khá trở lên, phụ nữ sau sinh, nhân viên văn phòng cần trị liệu',
      target_population_ratio: 0.22,
      daytime_traffic_multiplier: 1.12,
      avg_spend_per_customer_month: 680000,
      breakeven_monthly_revenue: 135000000, // 135 triệu/tháng
      competitor_density_factor: 0.00055, // ~0.55 cơ sở / 1.000 dân
      chain_ratio_avg: 0.15,
      churn_rate_annual: 0.145,
      survival_rates: {
        under_6m: 0.15,
        m6_to_12: 0.20,
        y1_to_2: 0.27,
        over_2y: 0.38
      },
      fengshui_affinity: 'Không gian tĩnh lặng tụ khí, đường vào kín đáo phong quang, ngũ hành Thủy Mộc tương sinh thư thái tâm trí.',
      suitable_models: [
        'Spa trị liệu da liễu & chăm sóc da chuyên sâu',
        'Trung tâm dưỡng sinh đông y thông kinh lạc',
        'Day Spa thư giãn bấm huyệt đá nóng',
        'Thẩm mỹ viện công nghệ cao chăm sóc sắc đẹp'
      ]
    },

    TIEN_LOI: {
      id: 'TIEN_LOI',
      name: 'Cửa Hàng Tiện Lợi & Siêu Thị Mini',
      shortName: 'Tiện lợi',
      icon: '🏪',
      vsic_code: '47110',
      vsic_name: 'Bán lẻ lương thực, thực phẩm, đồ uống tổng hợp trong các cửa hàng tiện ích',
      fsq_categories: ['Convenience Store', 'Grocery Store', 'Supermarket'],
      target_demographic: 'Cư dân bán kính đi bộ 300–500m, sinh viên, người độc thân, khách mua sắm nhanh 24/7',
      target_population_ratio: 0.85,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 420000,
      breakeven_monthly_revenue: 190000000, // 190 triệu/tháng
      competitor_density_factor: 0.0011, // ~1.1 điểm / 1.000 dân
      chain_ratio_avg: 0.52, // 52% chuỗi lớn (WinMart+, Circle K, GS25, 7-Eleven...)
      churn_rate_annual: 0.095, // 9.5% thanh lọc/năm (ổn định cao)
      survival_rates: {
        under_6m: 0.08,
        m6_to_12: 0.14,
        y1_to_2: 0.24,
        over_2y: 0.54
      },
      fengshui_affinity: 'Tọa lạc tại ngã 3 ngã 4 giao lộ, Thủy Khẩu thông thoáng, hai mặt tiền đón ánh sáng và luồng người qua lại tấp nập.',
      suitable_models: [
        'Cửa hàng tiện lợi mở cửa 24/7 có quầy ăn nhanh',
        'Siêu thị mini thực phẩm sạch & rau củ hữu cơ',
        'Mô hình nhượng quyền WinMart+ / Co.op Food',
        'Cửa hàng bách hóa hiện đại chân đế chung cư'
      ]
    },

    NHA_THUOC: {
      id: 'NHA_THUOC',
      name: 'Nhà Thuốc & Dược Phẩm Bán Lẻ',
      shortName: 'Nhà thuốc',
      icon: '💊',
      vsic_code: '47721',
      vsic_name: 'Bán lẻ thuốc, dụng cụ y tế, mỹ phẩm tại các cửa hàng chuyên doanh',
      fsq_categories: ['Pharmacy', 'Drugstore'],
      target_demographic: 'Mọi lứa tuổi trong khu dân cư, đặc biệt gia đình có trẻ nhỏ và người cao tuổi',
      target_population_ratio: 0.90,
      daytime_traffic_multiplier: 1.10,
      avg_spend_per_customer_month: 260000,
      breakeven_monthly_revenue: 120000000, // 120 triệu/tháng
      competitor_density_factor: 0.00095, // ~0.95 nhà thuốc / 1.000 dân
      chain_ratio_avg: 0.38, // 38% chuỗi (Long Châu, An Khang, Pharmacity...)
      churn_rate_annual: 0.082, // 8.2% thanh lọc/năm (rất ổn định)
      survival_rates: {
        under_6m: 0.06,
        m6_to_12: 0.12,
        y1_to_2: 0.22,
        over_2y: 0.60
      },
      fengshui_affinity: 'Vị trí cao ráo sạch sẽ, không gian thoáng đãng, trước mặt không bị xung sát, tượng trưng cho y đức và bình an.',
      suitable_models: [
        'Nhà thuốc chuẩn GPP kết hợp tư vấn dược sĩ gia đình',
        'Nhà thuốc chuỗi hiện đại đa dạng thực phẩm chức năng',
        'Nhà thuốc chuyên khoa gần bệnh viện / phòng khám',
        'Điểm bán thuốc thiết yếu khu dân cư đông đúc'
      ]
    }
  };

  class IndustryEconomicEngine {
    constructor() {
      this.CATALOG = INDUSTRY_CATALOG;
    }

    /**
     * Lấy danh sách toàn bộ các ngành nghề hỗ trợ
     */
    getSupportedIndustries() {
      return Object.values(INDUSTRY_CATALOG);
    }

    getIndustryCatalog() {
      return INDUSTRY_CATALOG;
    }

    /**
     * Lấy thông tin chi tiết của 1 ngành
     */
    getIndustryProfile(industryKey = 'CAFE') {
      const key = (industryKey || 'CAFE').toUpperCase();
      return INDUSTRY_CATALOG[key] || INDUSTRY_CATALOG.CAFE;
    }

    /**
     * TÍNH TOÁN TOÀN DIỆN THỊ TRƯỜNG NGÀNH NGHÈ TRONG BÁN KÍNH
     */
    calculateIndustryMarket({ lat, lng, radiusMeters = 1000, provinceId, districtId, industryKey = 'CAFE' }) {
      const radiusEngine = getRadiusEngine();
      if (!radiusEngine) {
        throw new Error('EconomicRadiusEngine chưa được nạp');
      }

      // 1. Tính toán kinh tế vĩ mô cơ sở trong bán kính
      const baseMarket = radiusEngine.calculateRadiusMarket({
        lat,
        lng,
        radiusMeters,
        provinceId,
        districtId
      });

      if (!baseMarket) return null;

      const profile = this.getIndustryProfile(industryKey);
      const { location, demographics, financials, marketAssessment } = baseMarket;
      const radiusKm = location.radiusKm;
      const areaKm2 = location.areaKm2;
      const basePop = demographics.estimatedPopulation;

      // 2. KHỐI 1: THỊ TRƯỜNG & KHÁCH TIỀM NĂNG RIÊNG NGÀNH
      // Dân số ban ngày ước tính (bổ sung nhân viên văn phòng & khách vãng lai)
      const daytimePopulation = Math.round(basePop * profile.daytime_traffic_multiplier);

      // Hiệu chỉnh tỷ lệ khách hàng tiềm năng dựa trên cơ cấu độ tuổi & giới tính địa phương
      let dynamicTargetRatio = profile.target_population_ratio;
      if (demographics.genderBreakdown && demographics.ageCohorts) {
        const femaleRatio = demographics.genderBreakdown.femalePct / 100;
        const youthRatio = demographics.ageCohorts.youth.pct / 100;
        const primeRatio = demographics.ageCohorts.prime.pct / 100;
        const childrenRatio = demographics.ageCohorts.children.pct / 100;
        const seniorRatio = demographics.ageCohorts.senior.pct / 100;

        if (profile.id === 'NAIL') {
          // Khách nail: Nữ giới tuổi 18-50
          dynamicTargetRatio = Number((femaleRatio * (youthRatio * 0.9 + primeRatio * 0.95 + seniorRatio * 0.4)).toFixed(3));
        } else if (profile.id === 'SPA_BEAUTY') {
          // Khách spa: Phụ nữ tuổi 25-55
          dynamicTargetRatio = Number((femaleRatio * (primeRatio * 0.85 + seniorRatio * 0.35 + youthRatio * 0.25)).toFixed(3));
        } else if (profile.id === 'CAFE') {
          // Khách cafe: Thanh thiếu niên (15-24) + Tuổi vàng (25-49)
          dynamicTargetRatio = Number(((youthRatio * 0.95 + primeRatio * 0.85 + seniorRatio * 0.2) * 1.05).toFixed(3));
        } else if (profile.id === 'NHA_HANG_FNB') {
          // Khách ẩm thực: Hộ gia đình và liên hoan
          dynamicTargetRatio = Number((primeRatio * 0.9 + seniorRatio * 0.6 + youthRatio * 0.6 + childrenRatio * 0.5).toFixed(3));
        } else if (profile.id === 'NHA_THUOC') {
          // Nhà thuốc: Người cao tuổi + Trẻ em + Người đi làm
          dynamicTargetRatio = Number((seniorRatio * 1.35 + childrenRatio * 1.1 + primeRatio * 0.7).toFixed(3));
        }
      }
      dynamicTargetRatio = Math.min(0.85, Math.max(0.15, dynamicTargetRatio));

      // Số lượng khách hàng tiềm năng cốt lõi
      const targetCustomerCount = Math.round(daytimePopulation * dynamicTargetRatio);

      // Mức chi trả khả dụng bình quân theo năng lực tài chính địa phương
      const incomeModifier = financials.monthlyIncomePerCapita / 5.5; // Chuẩn hóa theo mức trung bình 5.5tr
      const adjustedSpendPerCustomer = Math.round(profile.avg_spend_per_customer_month * Math.pow(incomeModifier, 0.75));

      // Tổng dung lượng nhu cầu ngành trong bán kính (tỷ VNĐ/tháng)
      const totalIndustryDemandVnd = targetCustomerCount * adjustedSpendPerCustomer;
      const totalIndustryDemandBillionVnd = Number((totalIndustryDemandVnd / 1e9).toFixed(2));
      const totalIndustryDemandYearlyBillion = Number((totalIndustryDemandBillionVnd * 12).toFixed(1));

      // 3. KHỐI 2: ĐỐI THỦ & MẬT ĐỘ CẠNH TRANH
      // Ước tính số điểm bán đối thủ dựa trên mật độ kinh doanh bản địa và hệ số ngành
      const estimatedCompetitors = Math.max(
        2,
        Math.round(basePop * profile.competitor_density_factor * (location.districtName ? 1.15 : 1.0))
      );

      // Mật độ đối thủ trên km²
      const competitorDensityPerKm2 = Number((estimatedCompetitors / areaKm2).toFixed(1));

      // Khoảng cách trung bình giữa 2 đối thủ gần nhất (mét)
      // Dựa trên phân bố không gian Poisson: d = 1 / (2 * sqrt(density)) * 1000m
      const avgDistanceBetweenCompetitorsMeters = Math.max(
        50,
        Math.round((1 / (2 * Math.sqrt(estimatedCompetitors / areaKm2))) * 1000)
      );

      // Phân bổ chuỗi thương hiệu vs quán độc lập
      const chainCount = Math.max(1, Math.round(estimatedCompetitors * profile.chain_ratio_avg));
      const independentCount = Math.max(1, estimatedCompetitors - chainCount);
      const customersPerStore = Math.round(targetCustomerCount / estimatedCompetitors);

      // 4. KHỐI 3: ĐỘNG THÁI SINH - TỬ & TUỔI THỌ CỬA HÀNG (12 THÁNG QUA)
      const churnRatePct = Number((profile.churn_rate_annual * 100).toFixed(1));
      const removedCount = Math.max(1, Math.round(estimatedCompetitors * profile.churn_rate_annual));
      // Tốc độ phát triển ròng dương theo đà đô thị hóa
      const growthFactor = financials.monthlyIncomePerCapita > 6.0 ? 1.45 : 1.2;
      const newlyAddedCount = Math.round(removedCount * growthFactor);
      const netGrowthCount = newlyAddedCount - removedCount;
      const netGrowthRatePct = Number(((netGrowthCount / estimatedCompetitors) * 100).toFixed(1));

      // Tỷ lệ sống sót theo các mốc thời gian
      const survivalOver2YearsPct = Math.round(profile.survival_rates.over_2y * 100);

      // 5. KHỐI 4: TỶ SỐ CẦU / CUNG (DSR) & ĐIỂM CƠ HỘI THỊ TRƯỜNG
      // Doanh thu hòa vốn chuẩn của 1 điểm bán theo ngành
      const breakevenRevBillion = profile.breakeven_monthly_revenue / 1e9;
      // Tổng doanh thu hòa vốn của toàn bộ đối thủ hiện hữu
      const totalSupplyBreakevenBillion = estimatedCompetitors * breakevenRevBillion;

      // Chỉ số Demand-to-Supply Ratio (DSR)
      const dsrRatio = Number((totalIndustryDemandBillionVnd / totalSupplyBreakevenBillion).toFixed(2));

      let dsrStatus = 'Cân bằng';
      let dsrColor = '#38BDF8';
      if (dsrRatio >= 1.35) {
        dsrStatus = 'Dư địa mở mới rất lớn (Thiếu cung)';
        dsrColor = '#10B981'; // Xanh lá
      } else if (dsrRatio >= 1.05) {
        dsrStatus = 'Thị trường còn dư địa phát triển';
        dsrColor = '#34D399';
      } else if (dsrRatio >= 0.85) {
        dsrStatus = 'Thị trường cân bằng (Cạnh tranh vừa phải)';
        dsrColor = '#FBBF24'; // Vàng
      } else {
        dsrStatus = 'Thị trường bão hòa (Cạnh tranh gay gắt)';
        dsrColor = '#EF4444'; // Đỏ
      }

      // ĐIỂM CƠ HỘI TỔNG HỢP (OPPORTUNITY SCORE 0 - 100)
      // 1. Demand Score (0-100, 35%): Sức cầu thị trường
      const demandScore = Math.min(100, Math.round((totalIndustryDemandBillionVnd / (areaKm2 * 3.5)) * 100));
      // 2. Competition Score (0-100, 25%): Khoảng trống cạnh tranh (càng ít bão hòa điểm càng cao)
      const compGapScore = Math.min(100, Math.max(30, Math.round(dsrRatio * 65)));
      // 3. Survival Stability Score (0-100, 20%): Mức độ ổn định sinh tồn
      const survivalScore = Math.min(100, Math.round((1 - profile.churn_rate_annual) * 85 + survivalOver2YearsPct * 0.2));
      // 4. Feng Shui & Location Affinity Score (0-100, 20%): Sự phù hợp địa khí
      const locationAffinityScore = Math.min(100, Math.round(marketAssessment.rppiScore * 0.95 + 5));

      const overallOpportunityScore = Math.min(
        98,
        Math.max(
          40,
          Math.round(demandScore * 0.35 + compGapScore * 0.25 + survivalScore * 0.20 + locationAffinityScore * 0.20)
        )
      );

      let opportunityTier = 'Khá Tốt';
      let opportunityColor = '#34D399';
      if (overallOpportunityScore >= 82) {
        opportunityTier = 'Rất Tiềm Năng (Nên Mở Điểm Bán)';
        opportunityColor = '#10B981';
      } else if (overallOpportunityScore >= 72) {
        opportunityTier = 'Khá Tốt (Tiềm Năng Ổn Định)';
        opportunityColor = '#38BDF8';
      } else if (overallOpportunityScore >= 60) {
        opportunityTier = 'Cân Nhắc (Cần Mặt Bằng Đắc Địa)';
        opportunityColor = '#FBBF24';
      } else {
        opportunityTier = 'Rủi Ro Cao (Cạnh Tranh Khốc Liệt)';
        opportunityColor = '#EF4444';
      }

      const commercialHotspots = baseMarket.commercialHotspots || {};
      const clusterIntelligence = {
        districtName: location.districtName,
        primaryStreets: commercialHotspots.primaryStreets || [],
        highDensityClusters: commercialHotspots.highDensityClusters || [],
        lowDensityOpportunities: commercialHotspots.lowDensityOpportunities || [],
        crowdedSummary: commercialHotspots.highDensityClusters && commercialHotspots.highDensityClusters.length > 0
          ? `Cụm tập trung đối thủ ngành ${profile.shortName}: ` + commercialHotspots.highDensityClusters.join('; ')
          : `Tập trung tại các giao lộ thương mại chính của ${location.districtName || location.provinceName}.`,
        opportunitySummary: commercialHotspots.lowDensityOpportunities && commercialHotspots.lowDensityOpportunities.length > 0
          ? `Vùng trũng ít đối thủ, dư địa phát triển: ` + commercialHotspots.lowDensityOpportunities.join('; ')
          : `Các khu dân cư mới và cụm công nghiệp vệ tinh.`
      };

      return {
        profile,
        location,
        demographics: {
          residentPopulation: basePop,
          daytimePopulation,
          targetCustomerCount,
          targetRatioPct: Math.round(dynamicTargetRatio * 100),
          areaKm2,
          genderBreakdown: demographics.genderBreakdown || null,
          ageCohorts: demographics.ageCohorts || null
        },
        clusterIntelligence,
        marketDemand: {
          adjustedSpendPerCustomer,
          totalMonthlyDemandBillionVnd: totalIndustryDemandBillionVnd,
          totalYearlyDemandBillionVnd: totalIndustryDemandYearlyBillion
        },
        competition: {
          estimatedCompetitors,
          competitorDensityPerKm2,
          avgDistanceBetweenCompetitorsMeters,
          chainCount,
          chainRatioPct: Math.round(profile.chain_ratio_avg * 100),
          independentCount,
          customersPerStore
        },
        survivalDynamics: {
          newlyAddedCount,
          removedCount,
          netGrowthCount,
          netGrowthRatePct,
          churnRatePct,
          survivalRates: profile.survival_rates,
          survivalOver2YearsPct
        },
        feasibility: {
          dsrRatio,
          dsrStatus,
          dsrColor,
          demandScore,
          compGapScore,
          survivalScore,
          locationAffinityScore,
          overallOpportunityScore,
          opportunityTier,
          opportunityColor,
          breakevenMonthlyMillion: Math.round(profile.breakeven_monthly_revenue / 1e6),
          suitableBusinessModels: profile.suitable_models,
          strategicRecommendation: 'Tại bán kính ' + (radiusKm >= 1 ? radiusKm + ' km' : radiusMeters + ' m') + ' quanh khu vực này, dung lượng tiêu thụ ngành ' + profile.name + ' ước tính đạt xấp xỉ ' + totalIndustryDemandBillionVnd + ' tỷ VNĐ/tháng cho ' + targetCustomerCount.toLocaleString('vi-VN') + ' khách hàng tiềm năng.',
          fengshuiAdvice: profile.fengshui_affinity
        },
        strategicAdvice: {
          suitableModels: profile.suitable_models,
          fengshuiAffinity: profile.fengshui_affinity,
          verdict: `Tại bán kính ${radiusKm >= 1 ? `${radiusKm} km` : `${radiusMeters} m`} quanh khu vực này, dung lượng tiêu thụ ngành ${profile.name} ước tính đạt xấp xỉ ${totalIndustryDemandBillionVnd} tỷ VNĐ/tháng cho ${targetCustomerCount.toLocaleString('vi-VN')} khách hàng tiềm năng. Với ${estimatedCompetitors} đối thủ hiện hữu, chỉ số Cầu/Cung đạt ${dsrRatio} (${dsrStatus}). Tỷ lệ cửa hàng tồn tại >2 năm đạt ${survivalOver2YearsPct}%. Tổng điểm Cơ Hội Thị Trường đạt ${overallOpportunityScore}/100 — Mức độ: ${opportunityTier}.`
        }
      };
    }
  }

  return new IndustryEconomicEngine();
}));
