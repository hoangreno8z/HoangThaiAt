/**
 * ĐỘNG CƠ PHÂN TÍCH NGÀNH NGHỀ & ĐỘNG THÁI SINH - TỬ THỊ TRƯỜNG (INDUSTRY ECONOMIC ENGINE)
 * Chuẩn hóa theo Hệ thống ngành kinh tế Việt Nam (VSIC 2025) & Foursquare OS Places Categories.
 * Tính toán Sức mua riêng ngành, Tỷ số Cầu/Cung (DSR), Churn Rate, Tuổi thọ cửa hàng & Điểm Cơ Hội Thị Trường.
 * Bổ sung Bộ công cụ "Lọc Vị Trí Tốt" (Spatial Opportunity Matcher) tự động đề xuất quận/huyện/xã tối ưu.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./economic_radius_engine', './kinh_te_64_tinh_thanh_data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./economic_radius_engine'),
      require('./kinh_te_64_tinh_thanh_data')
    );
  } else {
    root.IndustryEconomicEngine = factory(
      root.EconomicRadiusEngine,
      root.KINH_TE_64_TINH_THANH_CORPUS
    );
  }
}(typeof self !== 'undefined' ? self : this, function(RadiusEngine, KinhTeCorpus) {
  'use strict';

  const getRadiusEngine = () => {
    if (RadiusEngine && RadiusEngine.calculateRadiusMarket) return RadiusEngine;
    if (typeof window !== 'undefined' && window.EconomicRadiusEngine) return window.EconomicRadiusEngine;
    return null;
  };

  const getEconCorpus = () => {
    if (KinhTeCorpus) {
      if (Array.isArray(KinhTeCorpus)) return KinhTeCorpus;
      if (Array.isArray(KinhTeCorpus.KINH_TE_64_TINH_THANH_CORPUS)) return KinhTeCorpus.KINH_TE_64_TINH_THANH_CORPUS;
    }
    if (typeof window !== 'undefined' && Array.isArray(window.KINH_TE_64_TINH_THANH_CORPUS)) return window.KINH_TE_64_TINH_THANH_CORPUS;
    if (typeof global !== 'undefined' && Array.isArray(global.KINH_TE_64_TINH_THANH_CORPUS)) return global.KINH_TE_64_TINH_THANH_CORPUS;
    try {
      if (typeof require === 'function') {
        const d = require('./kinh_te_64_tinh_thanh_data');
        return Array.isArray(d) ? d : (d.KINH_TE_64_TINH_THANH_CORPUS || []);
      }
    } catch (e) {}
    return [];
  };

  /**
   * DANH MỤC HỒ SƠ KINH TẾ CHUẨN HÓA 40 NGÀNH NGHỀ (VSIC 2025)
   * Phân nhóm theo quy chuẩn:
   * - mainstream: 6 ngành phổ biến truyền thống
   * - emerging: 7 ngành xu hướng mới
   * - traditional_services: Dịch vụ đời sống dân sinh
   * - retail_food: Bán lẻ ẩm thực & tiêu dùng hàng ngày
   * - health_medical: Y tế, sức khỏe & chăm sóc gia đình
   * - automotive_energy: Xe cộ, nhiên liệu & năng lượng
   * - construction_home: Xây dựng, nhà cửa & bất động sản
   * - agriculture_nature: Nông nghiệp & sinh vật cảnh
   * - luxury_spiritual: Tài sản & tâm linh truyền thống
   */
  const INDUSTRY_CATALOG = {
    // -------------------------------------------------------------------------
    // 1. CÀ PHÊ & ĐỒ UỐNG
    // -------------------------------------------------------------------------
    CAFE: {
      id: 'CAFE',
      group: 'mainstream',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Cà Phê & Đồ Uống Giải Khát',
      shortName: 'Cà phê',
      icon: '☕',
      vsic_code: '56302',
      vsic_name: 'Dịch vụ phục vụ đồ uống: Quán cà phê, giải khát',
      fsq_categories: ['Coffee Shop', 'Tea Room', 'Cafe', 'Juice Bar'],
      target_demographic: 'Khách hàng 18–45 tuổi, nhân viên văn phòng, học sinh - sinh viên, cư dân đô thị',
      target_population_ratio: 0.58,
      daytime_traffic_multiplier: 1.35,
      avg_spend_per_customer_month: 380000,
      breakeven_monthly_revenue: 115000000,
      competitor_density_factor: 0.00165,
      chain_ratio_avg: 0.24,
      churn_rate_annual: 0.138,
      survival_rates: { under_6m: 0.14, m6_to_12: 0.19, y1_to_2: 0.27, over_2y: 0.40 },
      matchCriteria: { agePref: 'youth_prime', urbanPref: 'high' },
      fengshui_affinity: 'Chuộng Khí Khẩu nạp khách sôi động, góc cua ôm trọn (Kim Thành Hoàn Bão), mặt tiền vỉa hè rộng đón dòng Tả Thủy Đảo Hữu.',
      suitable_models: [
        'Work Cafe (Không gian làm việc & học tập có wifi mạnh)',
        'Takeaway & Kiosk cà phê pha máy sáng tiện lợi',
        'Cafe Specialty / Trà sữa thời thượng cho giới trẻ',
        'Acoustic / Rooftop ngắm cảnh sân thượng thư giãn'
      ]
    },

    // -------------------------------------------------------------------------
    // 2. NAIL & CHĂM SÓC MÓNG
    // -------------------------------------------------------------------------
    NAIL: {
      id: 'NAIL',
      group: 'mainstream',
      category: 'BEAUTY_LIFESTYLE',
      categoryName: 'Làm Đẹp & Dịch Vụ',
      name: 'Nail & Chăm Sóc Sắc Đẹp',
      shortName: 'Nail & Móng',
      icon: '💅',
      vsic_code: '96220',
      vsic_name: 'Dịch vụ chăm sóc sắc đẹp, làm móng tay, móng chân',
      fsq_categories: ['Nail Salon', 'Beauty Salon'],
      target_demographic: 'Nữ giới 18–55 tuổi, cư dân thường trú ổn định, nhân viên văn phòng, phụ nữ gia đình',
      target_population_ratio: 0.29,
      daytime_traffic_multiplier: 1.08,
      avg_spend_per_customer_month: 320000,
      breakeven_monthly_revenue: 65000000,
      competitor_density_factor: 0.00085,
      chain_ratio_avg: 0.08,
      churn_rate_annual: 0.165,
      survival_rates: { under_6m: 0.17, m6_to_12: 0.23, y1_to_2: 0.26, over_2y: 0.34 },
      matchCriteria: { genderPref: 'female', minFemalePct: 50.5, agePref: 'youth_prime' },
      fengshui_affinity: 'Chuộng ngõ phố yên tĩnh, an toàn, dễ đỗ xe, cung vị nạp khí thanh tịnh, nội thất ấm cúng kích hoạt đào hoa quý nhân.',
      suitable_models: [
        'Nail Art & Eyelash Studio chuyên nghiệp',
        'Combo Nail & Gội đầu dưỡng sinh thư giãn',
        'Nail Bar nhanh tiện lợi phong cách Hàn/Nhật',
        'Boutique Salon cao cấp cho cư dân chung cư'
      ]
    },

    // -------------------------------------------------------------------------
    // 3. NHÀ HÀNG & ẨM THỰC
    // -------------------------------------------------------------------------
    NHA_HANG_FNB: {
      id: 'NHA_HANG_FNB',
      group: 'mainstream',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
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
      breakeven_monthly_revenue: 240000000,
      competitor_density_factor: 0.0019,
      chain_ratio_avg: 0.18,
      churn_rate_annual: 0.152,
      survival_rates: { under_6m: 0.16, m6_to_12: 0.22, y1_to_2: 0.25, over_2y: 0.37 },
      matchCriteria: { minIncome: 5.5, rppiMin: 68 },
      fengshui_affinity: 'Minh Đường khoáng đạt, đại môn đón vượng khí Trường Sinh, bếp đặt tọa hung hướng cát, hút tài lộc mạnh mẽ.',
      suitable_models: [
        'Nhà hàng ẩm thực gia đình / Lẩu nướng không khói',
        'Quán ăn trưa văn phòng & cơm niêu chất lượng',
        'Nhà hàng hải sản / Đặc sản vùng miền tươi sống',
        'Bistro & Bia thủ công cho giới trẻ buổi tối'
      ]
    },

    // -------------------------------------------------------------------------
    // 4. SPA & THẨM MỸ
    // -------------------------------------------------------------------------
    SPA_BEAUTY: {
      id: 'SPA_BEAUTY',
      group: 'mainstream',
      category: 'BEAUTY_LIFESTYLE',
      categoryName: 'Làm Đẹp & Dịch Vụ',
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
      breakeven_monthly_revenue: 135000000,
      competitor_density_factor: 0.00055,
      chain_ratio_avg: 0.15,
      churn_rate_annual: 0.145,
      survival_rates: { under_6m: 0.15, m6_to_12: 0.20, y1_to_2: 0.27, over_2y: 0.38 },
      matchCriteria: { genderPref: 'female', minIncome: 6.5, rppiMin: 72 },
      fengshui_affinity: 'Không gian tĩnh lặng tụ khí, đường vào kín đáo phong quang, ngũ hành Thủy Mộc tương sinh thư thái tâm trí.',
      suitable_models: [
        'Spa trị liệu da liễu & chăm sóc da chuyên sâu',
        'Trung tâm dưỡng sinh đông y thông kinh lạc',
        'Day Spa thư giãn bấm huyệt đá nóng',
        'Thẩm mỹ viện công nghệ cao chăm sóc sắc đẹp'
      ]
    },

    // -------------------------------------------------------------------------
    // 5. CỬA HÀNG TIỆN LỢI
    // -------------------------------------------------------------------------
    TIEN_LOI: {
      id: 'TIEN_LOI',
      group: 'mainstream',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
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
      breakeven_monthly_revenue: 190000000,
      competitor_density_factor: 0.0011,
      chain_ratio_avg: 0.52,
      churn_rate_annual: 0.095,
      survival_rates: { under_6m: 0.08, m6_to_12: 0.14, y1_to_2: 0.24, over_2y: 0.54 },
      matchCriteria: { popDensityMin: 2000, urbanPref: 'high' },
      fengshui_affinity: 'Tọa lạc tại ngã 3 ngã 4 giao lộ, Thủy Khẩu thông thoáng, hai mặt tiền đón ánh sáng và luồng người qua lại tấp nập.',
      suitable_models: [
        'Cửa hàng tiện lợi mở cửa 24/7 có quầy ăn nhanh',
        'Siêu thị mini thực phẩm sạch & rau củ hữu cơ',
        'Mô hình nhượng quyền WinMart+ / Co.op Food',
        'Cửa hàng bách hóa hiện đại chân đế chung cư'
      ]
    },

    // -------------------------------------------------------------------------
    // 6. NHÀ THUỐC
    // -------------------------------------------------------------------------
    NHA_THUOC: {
      id: 'NHA_THUOC',
      group: 'mainstream',
      category: 'HEALTH_FAMILY',
      categoryName: 'Y Tế & Sức Khỏe',
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
      breakeven_monthly_revenue: 120000000,
      competitor_density_factor: 0.00095,
      chain_ratio_avg: 0.38,
      churn_rate_annual: 0.082,
      survival_rates: { under_6m: 0.06, m6_to_12: 0.12, y1_to_2: 0.22, over_2y: 0.60 },
      matchCriteria: { residentDensity: 'high', broadAge: true },
      fengshui_affinity: 'Vị trí cao ráo sạch sẽ, không gian thoáng đãng, trước mặt không bị xung sát, tượng trưng cho y đức và bình an.',
      suitable_models: [
        'Nhà thuốc chuẩn GPP kết hợp tư vấn dược sĩ gia đình',
        'Nhà thuốc chuỗi hiện đại đa dạng thực phẩm chức năng',
        'Nhà thuốc chuyên khoa gần bệnh viện / phòng khám',
        'Điểm bán thuốc thiết yếu khu dân cư đông đúc'
      ]
    },

    // -------------------------------------------------------------------------
    // 7. SÂN TẬP PICKLEBALL
    // -------------------------------------------------------------------------
    PICKLEBALL: {
      id: 'PICKLEBALL',
      group: 'emerging',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Sân Tập Pickleball & Thể Thao Đô Thị Mới',
      shortName: 'Pickleball',
      icon: '🏓',
      vsic_code: '93110',
      vsic_name: 'Hoạt động của các cơ sở thể thao: Sân tập pickleball, tennis, thể thao đa năng',
      fsq_categories: ['Sports Club', 'Athletic Field', 'Tennis Court'],
      target_demographic: 'Giới trẻ, dân văn phòng, trung niên đô thị 20–55 tuổi có xu hướng thể thao phong trào',
      target_population_ratio: 0.18,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 750000,
      breakeven_monthly_revenue: 95000000,
      competitor_density_factor: 0.00018,
      chain_ratio_avg: 0.12,
      churn_rate_annual: 0.115,
      survival_rates: { under_6m: 0.10, m6_to_12: 0.16, y1_to_2: 0.26, over_2y: 0.48 },
      matchCriteria: { minIncome: 6.0, agePref: 'youth_prime', spaceArea: 'large' },
      fengshui_affinity: 'Minh Đường khoáng đạt, thế đất bằng phẳng, gió lưu thông không bế khí, đón vượng khí vận động thanh thoát.',
      suitable_models: [
        'Cụm sân Pickleball trong nhà có máy lạnh & đèn thi đấu',
        'Sân ngoài trời có mái che kết hợp quầy cafe thể thao',
        'Câu lạc bộ thể thao phong trào & giải đấu cộng đồng',
        'Tổ hợp thể thao giải trí đa năng tích hợp phụ kiện'
      ]
    },

    // -------------------------------------------------------------------------
    // 8. PET CARE & THÚ CƯNG
    // -------------------------------------------------------------------------
    PET_CARE: {
      id: 'PET_CARE',
      group: 'emerging',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Spa, Khách Sạn Thú Cưng & Pet Shop',
      shortName: 'Thú cưng / Pet',
      icon: '🐾',
      vsic_code: '96099',
      vsic_name: 'Dịch vụ phục vụ cá nhân khác: Chăm sóc, tắm tỉa spa, khách sạn thú cưng',
      fsq_categories: ['Pet Service', 'Pet Store', 'Veterinarian'],
      target_demographic: 'Cư dân trẻ, gia đình chung cư, người độc thân nuôi chó mèo tại đô thị',
      target_population_ratio: 0.22,
      daytime_traffic_multiplier: 1.10,
      avg_spend_per_customer_month: 650000,
      breakeven_monthly_revenue: 85000000,
      competitor_density_factor: 0.00045,
      chain_ratio_avg: 0.16,
      churn_rate_annual: 0.102,
      survival_rates: { under_6m: 0.09, m6_to_12: 0.15, y1_to_2: 0.24, over_2y: 0.52 },
      matchCriteria: { minIncome: 6.2, apartmentDensity: 'high', youthRatio: 'high' },
      fengshui_affinity: 'Cung Tọa sinh khí, hướng đón ánh sáng tự nhiên, hệ thống cấp thoát nước thông suốt không để uế khí đọng.',
      suitable_models: [
        'Pet Grooming & Spa tắm cắt tỉa chuyên nghiệp',
        'Khách sạn thú cưng lưu trú dịp lễ tết & cuối tuần',
        'Cửa hàng thức ăn & phụ kiện thú cưng cao cấp',
        'Phòng khám thú y kết hợp dịch vụ chăm sóc trọn gói'
      ]
    },

    // -------------------------------------------------------------------------
    // 9. TRẠM SẠC XE ĐIỆN (EV)
    // -------------------------------------------------------------------------
    TRAM_SAC_EV: {
      id: 'TRAM_SAC_EV',
      group: 'emerging',
      category: 'AUTO_ENERGY',
      categoryName: 'Xe Cộ & Nhiên Liệu',
      name: 'Trạm Sạc Xe Điện & Dịch Vụ Năng Lượng Xanh',
      shortName: 'Trạm sạc EV',
      icon: '⚡',
      vsic_code: '45200',
      vsic_name: 'Dịch vụ bảo dưỡng, sạc pin và hỗ trợ phương tiện giao thông điện',
      fsq_categories: ['EV Charging Station', 'Gas Station', 'Automotive Shop'],
      target_demographic: 'Tài xế xe công nghệ (ô tô, xe máy điện), cư dân sở hữu xe điện đô thị',
      target_population_ratio: 0.32,
      daytime_traffic_multiplier: 1.40,
      avg_spend_per_customer_month: 450000,
      breakeven_monthly_revenue: 110000000,
      competitor_density_factor: 0.00035,
      chain_ratio_avg: 0.68,
      churn_rate_annual: 0.080,
      survival_rates: { under_6m: 0.05, m6_to_12: 0.11, y1_to_2: 0.20, over_2y: 0.64 },
      matchCriteria: { trafficPref: 'high', mainRoad: true },
      fengshui_affinity: 'Thuộc tính Hỏa - Kim, chuộng vị trí Lộ Thông giao lộ, vỉa hè rộng đón dòng xe lưu thông nhộn nhịp.',
      suitable_models: [
        'Trạm sạc nhanh DC siêu tốc cạnh trục đường giao thông chính',
        'Cụm sạc AC qua đêm tại bãi đỗ xe chung cư, cao ốc',
        'Tủ đổi pin xe máy điện thông minh 24/7 cho tài xế shipper',
        'Tổ hợp sạc điện kết hợp quán cafe nghỉ ngơi & rửa xe'
      ]
    },

    // -------------------------------------------------------------------------
    // 10. GIẶT SẤY TỰ ĐỘNG 24/7
    // -------------------------------------------------------------------------
    GIAT_SAY_TU_DONG: {
      id: 'GIAT_SAY_TU_DONG',
      group: 'emerging',
      category: 'BEAUTY_LIFESTYLE',
      categoryName: 'Làm Đẹp & Dịch Vụ',
      name: 'Tiệm Giặt Sấy Tự Động 24/7 (Laundromat)',
      shortName: 'Giặt sấy 24/7',
      icon: '🧺',
      vsic_code: '96210',
      vsic_name: 'Dịch vụ giặt là, làm sạch tự phục vụ bằng mã QR hoặc xu',
      fsq_categories: ['Laundromat', 'Laundry Service'],
      target_demographic: 'Sinh viên, người đi làm thuê trọ, gia đình trẻ, khách du lịch lưu trú',
      target_population_ratio: 0.45,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 220000,
      breakeven_monthly_revenue: 48000000,
      competitor_density_factor: 0.00065,
      chain_ratio_avg: 0.28,
      churn_rate_annual: 0.098,
      survival_rates: { under_6m: 0.08, m6_to_12: 0.14, y1_to_2: 0.25, over_2y: 0.53 },
      matchCriteria: { rentalWorkerArea: true, youthRatio: 'high' },
      fengshui_affinity: 'Hành Thủy cực vượng, cần đường ống thoát nước thông thoáng, tránh để Thủy uế phạm Huyền Quan.',
      suitable_models: [
        'Tiệm giặt sấy tự phục vụ quét mã QR thông minh 24/7',
        'Mô hình giặt sấy kết hợp quầy cafe nhỏ cho khách chờ đợi',
        'Dịch vụ giặt sấy kèm giao nhận tận phòng trọ, căn hộ',
        'Điểm giặt hấp cao cấp đồ vest, đầm dạ hội & chăn ga'
      ]
    },

    // -------------------------------------------------------------------------
    // 11. TRÀ SỮA & TREND
    // -------------------------------------------------------------------------
    TRA_SUA_HOT_TREND: {
      id: 'TRA_SUA_HOT_TREND',
      group: 'emerging',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Đồ Uống Thế Hệ Mới (Trà Sữa & Trà Trái Cây)',
      shortName: 'Trà sữa / Trend',
      icon: '🧋',
      vsic_code: '56309',
      vsic_name: 'Dịch vụ phục vụ đồ uống khác: Trà sữa, trà trái cây, nước ép theo xu hướng',
      fsq_categories: ['Bubble Tea Shop', 'Juice Bar', 'Tea Room'],
      target_demographic: 'Gen Z, học sinh, sinh viên, giới trẻ 12–28 tuổi bắt trend nhanh',
      target_population_ratio: 0.38,
      daytime_traffic_multiplier: 1.30,
      avg_spend_per_customer_month: 310000,
      breakeven_monthly_revenue: 90000000,
      competitor_density_factor: 0.0014,
      chain_ratio_avg: 0.35,
      churn_rate_annual: 0.195,
      survival_rates: { under_6m: 0.19, m6_to_12: 0.25, y1_to_2: 0.28, over_2y: 0.28 },
      matchCriteria: { schoolGate: true, youthRatio: 'high' },
      fengshui_affinity: 'Khí Khẩu cổng trường học, tụ điểm vui chơi, cung Đào Hoa trợ Mộc sinh Hỏa tạo sức hút trẻ trung.',
      suitable_models: [
        'Kiosk trà sữa nhượng quyền chi phí tối ưu (Mixue model)',
        'Cửa hàng trà sữa cao cấp có không gian check-in đẹp',
        'Quầy trà trái cây tươi / Trà chanh giã tay đón xu hướng',
        'Mô hình xe đẩy / Kiosk takeaway giờ tan trường'
      ]
    },

    // -------------------------------------------------------------------------
    // 12. CO-WORKING & CAFE HỌC TẬP
    // -------------------------------------------------------------------------
    COWORKING_STUDY: {
      id: 'COWORKING_STUDY',
      group: 'emerging',
      category: 'HOME_CONSTRUCTION',
      categoryName: 'BĐS & Xây Dựng',
      name: 'Co-working Space & Cafe Học Tập',
      shortName: 'Co-working',
      icon: '💻',
      vsic_code: '68109',
      vsic_name: 'Dịch vụ cho thuê không gian làm việc chia sẻ, bàn làm việc, phòng họp linh hoạt',
      fsq_categories: ['Coworking Space', 'Office', 'Internet Cafe'],
      target_demographic: 'Freelancer, lập trình viên, người làm việc từ xa, sinh viên ôn thi',
      target_population_ratio: 0.14,
      daytime_traffic_multiplier: 1.25,
      avg_spend_per_customer_month: 780000,
      breakeven_monthly_revenue: 145000000,
      competitor_density_factor: 0.00015,
      chain_ratio_avg: 0.22,
      churn_rate_annual: 0.120,
      survival_rates: { under_6m: 0.11, m6_to_12: 0.17, y1_to_2: 0.26, over_2y: 0.46 },
      matchCriteria: { universityHub: true, urbanPref: 'high' },
      fengshui_affinity: 'Văn Xương Tinh chiếu xạ, phòng ốc tĩnh khí tụ tài, ánh sáng hài hòa tăng cường tập trung.',
      suitable_models: [
        'Co-working space trọn gói có phòng họp & quầy pantry',
        'Study Cafe 24/7 chia buồng học yên tĩnh có ổ cắm riêng',
        'Văn phòng chia sẻ linh hoạt cho nhóm khởi nghiệp nhỏ',
        'Cafe làm việc chuyên biệt có gói thuê bàn theo giờ/ngày'
      ]
    },

    // -------------------------------------------------------------------------
    // 13. BAKERY & BÁNH MÌ HIỆN ĐẠI
    // -------------------------------------------------------------------------
    BAKERY_PASTRY: {
      id: 'BAKERY_PASTRY',
      group: 'emerging',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Tiệm Bánh Mì Thủ Công & Bakery Hiện Đại',
      shortName: 'Bánh ngọt / Bakery',
      icon: '🥐',
      vsic_code: '10712',
      vsic_name: 'Sản xuất và bán lẻ bánh mì, bánh ngọt tươi, pastry tại chỗ',
      fsq_categories: ['Bakery', 'Pastry Shop', 'Dessert Shop'],
      target_demographic: 'Gia đình trẻ, phụ nữ nội trợ, dân văn phòng ăn sáng & quà tặng tiệc ngọt',
      target_population_ratio: 0.42,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 280000,
      breakeven_monthly_revenue: 105000000,
      competitor_density_factor: 0.00058,
      chain_ratio_avg: 0.25,
      churn_rate_annual: 0.125,
      survival_rates: { under_6m: 0.12, m6_to_12: 0.18, y1_to_2: 0.25, over_2y: 0.45 },
      matchCriteria: { minIncome: 6.0, rppiMin: 70 },
      fengshui_affinity: 'Hỏa Thổ tương sinh (lò nướng sinh tài), mùi thơm dẫn dụ nhân khí, cửa tiệm tươi sáng ấm áp.',
      suitable_models: [
        'Bakery & Cafe phong cách Pháp / Hàn Quốc cao cấp',
        'Tiệm bánh mì thủ công Sourdough & bánh dinh dưỡng sạch',
        'Boutique bánh kem sinh nhật thiết kế theo yêu cầu riêng',
        'Kiosk bánh ngọt nướng nóng takeaway tiện lợi đón đầu ngõ'
      ]
    },

    // =========================================================================
    // 27 NHÓM NGÀNH KINH TẾ MỚI BỔ SUNG (CHUẨN HÓA VSIC 2025 THEO YÊU CẦU)
    // =========================================================================

    // 14. HỚT TÓC NAM & BARBERSHOP
    TOC_NAM_BARBER: {
      id: 'TOC_NAM_BARBER',
      group: 'traditional_services',
      category: 'BEAUTY_LIFESTYLE',
      categoryName: 'Làm Đẹp & Dịch Vụ',
      name: 'Hớt Tóc Nam & Barbershop',
      shortName: 'Tóc nam',
      icon: '💈',
      vsic_code: '96220',
      vsic_name: 'Dịch vụ cắt tóc, gội đầu, tạo mẫu tóc nam và chăm sóc râu',
      fsq_categories: ['Barbershop', "Men's Salon", 'Hair Salon'],
      target_demographic: 'Nam giới 15–50 tuổi, học sinh - sinh viên, người đi làm, công nhân khu dân cư',
      target_population_ratio: 0.35,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 120000,
      breakeven_monthly_revenue: 45000000,
      competitor_density_factor: 0.00095,
      chain_ratio_avg: 0.15,
      churn_rate_annual: 0.142,
      survival_rates: { under_6m: 0.12, m6_to_12: 0.18, y1_to_2: 0.28, over_2y: 0.42 },
      matchCriteria: { genderPref: 'male', minMalePct: 49.0, agePref: 'youth_prime' },
      fengshui_affinity: 'Mặt tiền thoáng sáng, dễ dừng xe ghé nhanh, khí Dương vượng, gương soi bố trí không đối diện trực xung cửa chính.',
      suitable_models: [
        'Barbershop phong cách cổ điển / Vintage',
        'Tiệm tóc nam bình dân nhanh gọn 30k–50k',
        'Chuỗi tạo mẫu tóc nam cao cấp kèm vuốt sáp chăm sóc da',
        'Salon tóc nam kết hợp cạo mặt gội đầu thư giãn'
      ]
    },

    // 15. TIỆM VÀNG BẠC ĐÁ QUÝ
    TIEM_VANG: {
      id: 'TIEM_VANG',
      group: 'luxury_spiritual',
      category: 'GOLD_SPIRITUAL',
      categoryName: 'Tài Sản & Tâm Linh',
      name: 'Tiệm Vàng Bạc Đá Quý & Kim Hoàn',
      shortName: 'Tiệm vàng',
      icon: '💍',
      vsic_code: '47732',
      vsic_name: 'Bán lẻ vàng, bạc, đá quý và đồ trang sức kim hoàn',
      fsq_categories: ['Jewelry Store', 'Gold Shop'],
      target_demographic: 'Hộ gia đình tích lũy tài sản, phụ nữ trung niên, người lao động mua vàng tích trữ, cặp đôi cưới',
      target_population_ratio: 0.25,
      daytime_traffic_multiplier: 1.25,
      avg_spend_per_customer_month: 1800000,
      breakeven_monthly_revenue: 350000000,
      competitor_density_factor: 0.00015,
      chain_ratio_avg: 0.35,
      churn_rate_annual: 0.055,
      survival_rates: { under_6m: 0.04, m6_to_12: 0.08, y1_to_2: 0.18, over_2y: 0.70 },
      matchCriteria: { minIncome: 6.2, rppiMin: 72, proximityMarket: true },
      fengshui_affinity: 'Hành Kim cực vượng, chuộng gần chợ truyền thống lớn sầm uất, an ninh nghiêm ngặt, tọa vị sinh khí tụ tài.',
      suitable_models: [
        'Tiệm vàng truyền thống kim hoàn tại chợ trung tâm',
        'Showroom vàng bạc trang sức cao cấp thương hiệu',
        'Cửa hàng vàng phong thủy & vật phẩm kim hoàn may mắn',
        'Đại lý thu đổi ngoại tệ & gia công vàng cưới hỏi'
      ]
    },

    // 16. TRẠM XĂNG DẦU
    CAY_XANG: {
      id: 'CAY_XANG',
      group: 'automotive_energy',
      category: 'AUTO_ENERGY',
      categoryName: 'Xe Cộ & Nhiên Liệu',
      name: 'Trạm Xăng Dầu & Bán Lẻ Nhiên Liệu',
      shortName: 'Cây xăng',
      icon: '⛽',
      vsic_code: '47300',
      vsic_name: 'Bán lẻ nhiên liệu động cơ trong các cửa hàng chuyên doanh',
      fsq_categories: ['Gas Station'],
      target_demographic: 'Toàn bộ người điều khiển phương tiện xe máy, ô tô, xe tải, vận tải logistic trên tuyến đường',
      target_population_ratio: 0.75,
      daytime_traffic_multiplier: 1.65,
      avg_spend_per_customer_month: 650000,
      breakeven_monthly_revenue: 420000000,
      competitor_density_factor: 0.00012,
      chain_ratio_avg: 0.62,
      churn_rate_annual: 0.035,
      survival_rates: { under_6m: 0.02, m6_to_12: 0.05, y1_to_2: 0.12, over_2y: 0.81 },
      matchCriteria: { trafficPref: 'high', mainRoad: true },
      fengshui_affinity: 'Khí Lộ đại thông, mặt tiền rộng >= 25m đón dòng xe hai chiều, trước mặt không bị vật che chắn.',
      suitable_models: [
        'Trạm xăng dầu chuẩn hóa tích hợp cửa hàng tiện lợi 24/7',
        'Cây xăng quốc lộ / tỉnh lộ có bãi nghỉ xe tải & rửa xe',
        'Cây xăng đô thị quy mô gọn đáp ứng xe máy & taxi',
        'Trạm cấp phát nhiên liệu kết hợp trụ sạc pin hybrid'
      ]
    },

    // 17. SÀN MÔI GIỚI BẤT ĐỘNG SẢN
    BAT_DONG_SAN: {
      id: 'BAT_DONG_SAN',
      group: 'construction_home',
      category: 'HOME_CONSTRUCTION',
      categoryName: 'BĐS & Xây Dựng',
      name: 'Sàn Giao Dịch & Môi Giới Bất Động Sản',
      shortName: 'Bất động sản',
      icon: '🏢',
      vsic_code: '68200',
      vsic_name: 'Hoạt động tư vấn, môi giới, đấu giá bất động sản, quyền sử dụng đất',
      fsq_categories: ['Real Estate Agency', 'Office'],
      target_demographic: 'Nhà đầu tư cá nhân, gia đình mua nhà an cư, người tìm thuê mặt bằng kinh doanh & căn hộ',
      target_population_ratio: 0.15,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 1200000,
      breakeven_monthly_revenue: 120000000,
      competitor_density_factor: 0.00040,
      chain_ratio_avg: 0.28,
      churn_rate_annual: 0.240,
      survival_rates: { under_6m: 0.22, m6_to_12: 0.28, y1_to_2: 0.24, over_2y: 0.26 },
      matchCriteria: { urbanExpansion: true, minIncome: 6.0, rppiMin: 70 },
      fengshui_affinity: 'Thổ vượng sinh Kim, trục đường lộ chính khu vực hạ tầng mới, sảnh tiếp khách phong quang.',
      suitable_models: [
        'Văn phòng môi giới thổ cư & đất nền vùng ven đô',
        'Sàn phân phối dự án căn hộ & khu đô thị mới',
        'Văn phòng tư vấn định giá & pháp lý công chứng nhà đất',
        'Trung tâm dịch vụ ký gửi cho thuê nhà phố & mặt bằng'
      ]
    },

    // 18. PHÒNG KHÁM NHA KHOA
    NHA_KHOA: {
      id: 'NHA_KHOA',
      group: 'health_medical',
      category: 'HEALTH_FAMILY',
      categoryName: 'Y Tế & Sức Khỏe',
      name: 'Phòng Khám Nha Khoa Răng Hàm Mặt',
      shortName: 'Nha khoa',
      icon: '🦷',
      vsic_code: '86202',
      vsic_name: 'Hoạt động của các phòng khám chuyên khoa răng - hàm - mặt',
      fsq_categories: ['Dentist', 'Medical Clinic'],
      target_demographic: 'Trẻ em (chỉnh nha), thanh niên (thẩm mỹ răng sứ), người lớn & người già (trồng răng implant)',
      target_population_ratio: 0.30,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 650000,
      breakeven_monthly_revenue: 160000000,
      competitor_density_factor: 0.00035,
      chain_ratio_avg: 0.32,
      churn_rate_annual: 0.092,
      survival_rates: { under_6m: 0.07, m6_to_12: 0.13, y1_to_2: 0.25, over_2y: 0.55 },
      matchCriteria: { minIncome: 5.8, rppiMin: 68 },
      fengshui_affinity: 'Cung vị Thiên Y y đức, phòng ốc sáng rực, sạch sẽ, mặt tiền dễ nhận diện, tránh xung sát.',
      suitable_models: [
        'Nha khoa gia đình tổng quát chăm sóc định kỳ',
        'Trung tâm nha khoa thẩm mỹ kỹ thuật cao (Implant & Niềng răng)',
        'Phòng khám răng trẻ em chuyên sâu thân thiện',
        'Chuỗi nha khoa tiêu chuẩn nhượng quyền'
      ]
    },

    // 19. PHÒNG KHÁM ĐA KHOA DÂN LẬP
    PHONG_KHAM_DA_KHOA: {
      id: 'PHONG_KHAM_DA_KHOA',
      group: 'health_medical',
      category: 'HEALTH_FAMILY',
      categoryName: 'Y Tế & Sức Khỏe',
      name: 'Phòng Khám Đa Khoa Dân Lập',
      shortName: 'Phòng khám đa khoa',
      icon: '🏥',
      vsic_code: '86201',
      vsic_name: 'Hoạt động của các phòng khám đa khoa, trạm y tế cơ sở tư nhân',
      fsq_categories: ["Doctor's Office", 'Hospital', 'Medical Center'],
      target_demographic: 'Cư dân vùng ven, công nhân KCN xa bệnh viện tuyến trung ương cần khám BHYT ban đầu',
      target_population_ratio: 0.70,
      daytime_traffic_multiplier: 1.25,
      avg_spend_per_customer_month: 420000,
      breakeven_monthly_revenue: 280000000,
      competitor_density_factor: 0.00010,
      chain_ratio_avg: 0.20,
      churn_rate_annual: 0.065,
      survival_rates: { under_6m: 0.05, m6_to_12: 0.10, y1_to_2: 0.20, over_2y: 0.65 },
      matchCriteria: { popDensityMin: 800, distHospital: true },
      fengshui_affinity: 'Tiền sảnh rộng xe cấp cứu ra vào dễ dàng, hướng cát sinh vượng, nạp khí Dương bình an.',
      suitable_models: [
        'Phòng khám đa khoa khám chữa bệnh theo BHYT tư nhân',
        'Phòng khám đa khoa khu công nghiệp phục vụ công nhân',
        'Tổ hợp khám sức khỏe định kỳ doanh nghiệp & tầm soát bệnh',
        'Phòng khám cấp cứu ban đầu liên kết bệnh viện tuyến trên'
      ]
    },

    // 20. PHÒNG SIÊU ÂM & CHẨN ĐOÁN HÌNH ẢNH
    SIEU_AM_CHAN_DOAN: {
      id: 'SIEU_AM_CHAN_DOAN',
      group: 'health_medical',
      category: 'HEALTH_FAMILY',
      categoryName: 'Y Tế & Sức Khỏe',
      name: 'Phòng Siêu Âm & Chẩn Đoán Hình Ảnh',
      shortName: 'Siêu âm',
      icon: '🔬',
      vsic_code: '86901',
      vsic_name: 'Dịch vụ chẩn đoán hình ảnh: Siêu âm màu 4D/5D, chụp X-quang',
      fsq_categories: ['Diagnostic Center', 'Medical Lab'],
      target_demographic: 'Phụ nữ mang thai trong độ tuổi 20–38 theo dõi thai kỳ, người khám tổng quát định kỳ',
      target_population_ratio: 0.20,
      daytime_traffic_multiplier: 1.10,
      avg_spend_per_customer_month: 350000,
      breakeven_monthly_revenue: 75000000,
      competitor_density_factor: 0.00018,
      chain_ratio_avg: 0.14,
      churn_rate_annual: 0.088,
      survival_rates: { under_6m: 0.08, m6_to_12: 0.14, y1_to_2: 0.24, over_2y: 0.54 },
      matchCriteria: { genderPref: 'female', agePref: 'youth_prime', pregnantNeed: true },
      fengshui_affinity: 'Gần bệnh viện phụ sản, phòng khám sản nhi, cung Tử Tức sinh sôi nảy nở, môi trường thanh tịnh.',
      suitable_models: [
        'Phòng siêu âm sản phụ khoa 4D/5D chất lượng cao',
        'Trung tâm chẩn đoán hình ảnh kỹ thuật số liên kết bác sĩ viện',
        'Phòng khám siêu âm tổng quát tim mạch & tuyến giáp',
        'Phòng xét nghiệm & siêu âm định kỳ lưu động'
      ]
    },

    // 21. CỬA HÀNG QUẦN ÁO THỜI TRANG
    QUAN_AO_THOI_TRANG: {
      id: 'QUAN_AO_THOI_TRANG',
      group: 'retail_food',
      category: 'FASHION_ACCESSORIES',
      categoryName: 'Thời Trang & Phụ Kiện',
      name: 'Cửa Hàng Quần Áo May Sẵn & Thời Trang',
      shortName: 'Quần áo',
      icon: '👗',
      vsic_code: '47711',
      vsic_name: 'Bán lẻ hàng may mặc, trang phục trong các cửa hàng chuyên doanh',
      fsq_categories: ['Clothing Store', 'Boutique', 'Apparel'],
      target_demographic: 'Nữ giới và thanh niên 16–40 tuổi, học sinh - sinh viên, nhân viên văn phòng yêu thích thời trang',
      target_population_ratio: 0.42,
      daytime_traffic_multiplier: 1.35,
      avg_spend_per_customer_month: 480000,
      breakeven_monthly_revenue: 80000000,
      competitor_density_factor: 0.0012,
      chain_ratio_avg: 0.26,
      churn_rate_annual: 0.185,
      survival_rates: { under_6m: 0.18, m6_to_12: 0.24, y1_to_2: 0.26, over_2y: 0.32 },
      matchCriteria: { genderPref: 'female', agePref: 'youth', minSpendNonFood: true },
      fengshui_affinity: 'Cung Đào Hoa tinh chiếu xạ, vỉa hè rộng cho khách dừng xe ngắm đồ, cửa kính thông thấu phô diễn mannequin.',
      suitable_models: [
        'Shop thời trang thiết kế nữ công sở & dạo phố',
        'Cửa hàng thời trang Unisex / Streetwear cho Gen Z',
        'Shop quần áo trẻ em đa dạng lứa tuổi',
        'Cửa hàng thời trang Outlet thanh lý giá tốt'
      ]
    },

    // 22. CỬA HÀNG GIÀY DÉP & PHỤ KIỆN
    GIAY_DEP_PHU_KIEN: {
      id: 'GIAY_DEP_PHU_KIEN',
      group: 'retail_food',
      category: 'FASHION_ACCESSORIES',
      categoryName: 'Thời Trang & Phụ Kiện',
      name: 'Cửa Hàng Giày Dép & PhỤ Kiện',
      shortName: 'Giày dép',
      icon: '👠',
      vsic_code: '47713',
      vsic_name: 'Bán lẻ giày, dép, túi xách và đồ da phụ kiện',
      fsq_categories: ['Shoe Store', 'Accessories Store'],
      target_demographic: 'Học sinh, sinh viên, người đi làm, người tập thể thao cần giày dép túi xách',
      target_population_ratio: 0.45,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 320000,
      breakeven_monthly_revenue: 65000000,
      competitor_density_factor: 0.00075,
      chain_ratio_avg: 0.22,
      churn_rate_annual: 0.160,
      survival_rates: { under_6m: 0.16, m6_to_12: 0.22, y1_to_2: 0.27, over_2y: 0.35 },
      matchCriteria: { commercialStreet: true },
      fengshui_affinity: 'Tuyến phố mua sắm liên kết quần áo, bậc tam cấp vững chãi (bước chân tiến lộc), trưng bày ngăn nắp đón khí lành.',
      suitable_models: [
        'Cửa hàng giày dép công sở nữ & túi xách',
        'Shop giày sneaker thể thao trẻ trung cho thanh thiếu niên',
        "Đại lý giày dép quốc dân (Biti's, Thượng Đình) phục vụ học sinh",
        'Shop giày da nam & phụ kiện thắt lưng ví da'
      ]
    },

    // 23. VỰA TRÁI CÂY TƯƠI
    VUA_TRAI_CAY: {
      id: 'VUA_TRAI_CAY',
      group: 'retail_food',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Vựa & Cửa Hàng Trái Cây Tươi',
      shortName: 'Vựa trái cây',
      icon: '🍉',
      vsic_code: '47210',
      vsic_name: 'Bán lẻ rau, củ, quả, trái cây tươi sạch và chế biến',
      fsq_categories: ['Fruit Stand', 'Produce Market', 'Grocery Store'],
      target_demographic: 'Phụ nữ nội trợ, gia đình mua hoa quả ăn hàng ngày & thắp hương rằm mùng 1, giỏ quà biếu',
      target_population_ratio: 0.55,
      daytime_traffic_multiplier: 1.30,
      avg_spend_per_customer_month: 360000,
      breakeven_monthly_revenue: 95000000,
      competitor_density_factor: 0.00085,
      chain_ratio_avg: 0.16,
      churn_rate_annual: 0.135,
      survival_rates: { under_6m: 0.13, m6_to_12: 0.20, y1_to_2: 0.27, over_2y: 0.40 },
      matchCriteria: { marketHub: true, familyRatio: 'high' },
      fengshui_affinity: 'Hành Mộc tươi tốt, góc ngã ba hoặc đầu ngõ chợ đông người, dòng Thủy thông thoát giữ hoa quả tươi giòn.',
      suitable_models: [
        'Vựa sỉ & lẻ trái cây ba miền đón xe tải giao hàng',
        'Cửa hàng trái cây nhập khẩu cao cấp đóng giỏ quà tết',
        'Quầy trái cây gọt sẵn & nước ép detox tươi cho dân văn phòng',
        'Cửa hàng trái cây hữu cơ canh tác chuẩn VietGAP'
      ]
    },

    // 24. ĐẠI LÝ GẠO DÂN SINH
    DAI_LY_GAO: {
      id: 'DAI_LY_GAO',
      group: 'retail_food',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Đại Lý Gạo & Ngũ Cốc Dân Sinh',
      shortName: 'Đại lý gạo',
      icon: '🌾',
      vsic_code: '47211',
      vsic_name: 'Bán lẻ gạo, ngô, khoai, sắn và các loại ngũ cốc lương thực',
      fsq_categories: ['Grocery Store', 'Grain Store'],
      target_demographic: 'Hộ gia đình thường trú, quán cơm bình dân, bếp ăn công nghiệp, cơ sở từ thiện',
      target_population_ratio: 0.70,
      daytime_traffic_multiplier: 1.10,
      avg_spend_per_customer_month: 240000,
      breakeven_monthly_revenue: 70000000,
      competitor_density_factor: 0.00060,
      chain_ratio_avg: 0.10,
      churn_rate_annual: 0.075,
      survival_rates: { under_6m: 0.06, m6_to_12: 0.12, y1_to_2: 0.22, over_2y: 0.60 },
      matchCriteria: { residentDensity: 'high', workerArea: true },
      fengshui_affinity: 'Cung Thổ tụ lộc (kho lương đầy ắp), mặt sàn cao ráo tuyệt đối không ẩm mốc, cửa kho nạp cát khí bền vững.',
      suitable_models: [
        'Đại lý gạo đặc sản ba miền (ST25, Nàng Hoa, Tám Xoan)',
        'Tổng kho cung ứng gạo sỉ cho quán ăn & bếp ăn tập thể',
        'Điểm phân phối gạo túi hút chân không sạch thương hiệu',
        'Đại lý gạo kết hợp ngũ cốc dinh dưỡng và các loại đậu hạt'
      ]
    },

    // 25. ĐẠI LÝ BÁN XE MÁY
    BAN_XE_MAY: {
      id: 'BAN_XE_MAY',
      group: 'automotive_energy',
      category: 'AUTO_ENERGY',
      categoryName: 'Xe Cộ & Nhiên Liệu',
      name: 'Đại Lý Mua Bán Xe Máy & Phụ Tùng',
      shortName: 'Bán xe máy',
      icon: '🛵',
      vsic_code: '45411',
      vsic_name: 'Bán mô tô, xe máy, xe gắn máy mới và đã qua sử dụng',
      fsq_categories: ['Motorcycle Dealership', 'Auto Shop'],
      target_demographic: 'Thanh niên đến tuổi đi xe, người lao động ngoại thành, học sinh cấp 3 (xe 50cc/xe điện)',
      target_population_ratio: 0.40,
      daytime_traffic_multiplier: 1.30,
      avg_spend_per_customer_month: 1100000,
      breakeven_monthly_revenue: 320000000,
      competitor_density_factor: 0.00025,
      chain_ratio_avg: 0.48,
      churn_rate_annual: 0.085,
      survival_rates: { under_6m: 0.07, m6_to_12: 0.12, y1_to_2: 0.23, over_2y: 0.58 },
      matchCriteria: { subUrban: true, youthRatio: 'high' },
      fengshui_affinity: 'Mặt tiền rộng đường liên huyện/tỉnh, sân đỗ xe thênh thang, cửa đón vượng khí luân chuyển không ngừng.',
      suitable_models: [
        'Đại lý ủy nhiệm chính hãng (HEAD Honda / Yamaha Town)',
        'Cửa hàng xe máy cũ tuyển chọn uy tín hỗ trợ trả góp',
        'Showroom xe máy điện & xe tay ga thông minh thế hệ mới',
        'Cửa hàng xe gắn máy 50cc cho học sinh & sinh viên'
      ]
    },

    // 26. SHOWROOM BÁN Ô TÔ
    SHOWROOM_O_TO: {
      id: 'SHOWROOM_O_TO',
      group: 'automotive_energy',
      category: 'AUTO_ENERGY',
      categoryName: 'Xe Cộ & Nhiên Liệu',
      name: 'Showroom Mua Bán Xe Ô Tô Con',
      shortName: 'Showroom ô tô',
      icon: '🚗',
      vsic_code: '45111',
      vsic_name: 'Bán buôn, bán lẻ ô tô con loại 9 chỗ ngồi trở xuống',
      fsq_categories: ['Auto Dealership', 'Car Dealer'],
      target_demographic: 'Tầng lớp khá giả, doanh nhân, hộ gia đình thu nhập cao, công ty kinh doanh dịch vụ vận tải',
      target_population_ratio: 0.12,
      daytime_traffic_multiplier: 1.45,
      avg_spend_per_customer_month: 4500000,
      breakeven_monthly_revenue: 680000000,
      competitor_density_factor: 0.00008,
      chain_ratio_avg: 0.72,
      churn_rate_annual: 0.070,
      survival_rates: { under_6m: 0.05, m6_to_12: 0.10, y1_to_2: 0.20, over_2y: 0.65 },
      matchCriteria: { minIncome: 8.5, rppiMin: 82, mainAvenue: true },
      fengshui_affinity: 'Đại lộ trục chính hoặc vành đai đô thị, vỉa hè cực rộng lùi sâu, thế đất Kim Sinh Thủy tụ vượng tài hùng vĩ.',
      suitable_models: [
        'Đại lý 3S/4S chính hãng tiêu chuẩn quốc tế',
        'Showroom xe ô tô lướt đã qua sử dụng cao cấp',
        'Showroom chuyên dòng xe điện thông minh (EV Hub)',
        'Trung tâm ô tô nhập khẩu nguyên chiếc siêu sang'
      ]
    },

    // 27. QUÁN ĂN SÁNG
    QUAN_AN_SANG: {
      id: 'QUAN_AN_SANG',
      group: 'retail_food',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Quán Ăn Sáng (Phở, Bún, Bánh Mì, Hủ Tiếu)',
      shortName: 'Quán ăn sáng',
      icon: '🍜',
      vsic_code: '56102',
      vsic_name: 'Dịch vụ ăn uống phục vụ nhanh: Quán bún, phở, miến, hủ tiếu, bánh mì sáng',
      fsq_categories: ['Noodle House', 'Breakfast Spot', 'Diner'],
      target_demographic: 'Học sinh, công nhân, nhân viên công sở, người già đi tập thể dục buổi sáng (khung 6h–9h)',
      target_population_ratio: 0.75,
      daytime_traffic_multiplier: 1.40,
      avg_spend_per_customer_month: 450000,
      breakeven_monthly_revenue: 55000000,
      competitor_density_factor: 0.0018,
      chain_ratio_avg: 0.08,
      churn_rate_annual: 0.145,
      survival_rates: { under_6m: 0.15, m6_to_12: 0.21, y1_to_2: 0.26, over_2y: 0.38 },
      matchCriteria: { schoolGate: true, hospitalGate: true, morningTraffic: 'high' },
      fengshui_affinity: 'Gần ngã ba, cổng trường học, bệnh viện, KCN; bếp nấu hừng hực bốc hơi tạo sinh khí Dương vượng đón tài sớm.',
      suitable_models: [
        'Quán phở bò / phở gà gia truyền nước dùng thanh ngọt',
        'Quán bún bò Huế / bún riêu cua đồng đậm đà',
        'Tiệm bánh mì thịt chả nóng giòn mang đi nhanh',
        'Quán hủ tiếu Nam Vang / miến lươn phục vụ cả sáng & tối'
      ]
    },

    // 28. ÁO CƯỚI & STUDIO CƯỚI
    DO_CUOI_STUDIO: {
      id: 'DO_CUOI_STUDIO',
      group: 'traditional_services',
      category: 'BEAUTY_LIFESTYLE',
      categoryName: 'Làm Đẹp & Dịch Vụ',
      name: 'Áo Cưới & Dịch Vụ Cưới Trọn Gói',
      shortName: 'Đồ cưới / Studio',
      icon: '👰',
      vsic_code: '74200',
      vsic_name: 'Hoạt động nhiếp ảnh, cho thuê váy cưới, trang điểm cô dâu và tổ chức sự kiện cưới',
      fsq_categories: ['Bridal Shop', 'Photography Studio'],
      target_demographic: 'Các cặp đôi chuẩn bị kết hôn lứa tuổi 22–32 tuổi, gia đình có cưới hỏi',
      target_population_ratio: 0.14,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 1100000,
      breakeven_monthly_revenue: 110000000,
      competitor_density_factor: 0.00028,
      chain_ratio_avg: 0.18,
      churn_rate_annual: 0.130,
      survival_rates: { under_6m: 0.12, m6_to_12: 0.18, y1_to_2: 0.27, over_2y: 0.43 },
      matchCriteria: { agePref: 'youth_prime', weddingAge: true },
      fengshui_affinity: 'Cung Đào Hoa vượng, ánh sáng ấm cúng lộng lẫy, gương lớn không phạm môn sát, tạo không khí hỷ khí ngập tràn.',
      suitable_models: [
        'Studio cưới trọn gói (chụp ảnh, váy cưới, trang điểm tiệc)',
        'Boutique cho thuê váy cưới ngoại nhập cao cấp',
        'Studio ảnh cưới phong cách Hàn Quốc tối giản tinh tế',
        'Dịch vụ trang trí gia tiên & tráp cưới truyền thống'
      ]
    },

    // 29. STUDIO CHỤP ẢNH NGHỆ THUẬT
    STUDIO_NGHE_THUAT: {
      id: 'STUDIO_NGHE_THUAT',
      group: 'traditional_services',
      category: 'BEAUTY_LIFESTYLE',
      categoryName: 'Làm Đẹp & Dịch Vụ',
      name: 'Studio Chụp Ảnh Nghệ Thuật & Lookbook',
      shortName: 'Studio nghệ thuật',
      icon: '📸',
      vsic_code: '74201',
      vsic_name: 'Dịch vụ chụp ảnh nghệ thuật, lookbook thời trang, chụp profile doanh nhân và kỷ yếu',
      fsq_categories: ['Photography Studio', 'Art Studio'],
      target_demographic: 'Giới trẻ Gen Z, người mẫu ảnh, shop thời trang chụp lookbook, doanh nhân làm thương hiệu cá nhân',
      target_population_ratio: 0.16,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 620000,
      breakeven_monthly_revenue: 60000000,
      competitor_density_factor: 0.00022,
      chain_ratio_avg: 0.12,
      churn_rate_annual: 0.150,
      survival_rates: { under_6m: 0.14, m6_to_12: 0.22, y1_to_2: 0.26, over_2y: 0.38 },
      matchCriteria: { youthRatio: 'high', creativeHub: true },
      fengshui_affinity: 'Không gian trần cao khoáng đạt, đón ánh sáng tự nhiên điều hòa, năng lượng Mộc - Hỏa tương sinh phát huy sáng tạo.',
      suitable_models: [
        'Studio chụp concept cá nhân / kỷ niệm thanh xuân',
        'Phim trường mini chụp lookbook cho sàn TMĐT & TikTok',
        'Studio chụp ảnh profile doanh nhân & nghệ thuật ánh sáng',
        'Tổ hợp studio cho thuê không gian chụp ảnh theo giờ'
      ]
    },

    // 30. CỬA HÀNG ĐIỆN NƯỚC DÂN DỤNG
    DIEN_NUOC_DAN_DUNG: {
      id: 'DIEN_NUOC_DAN_DUNG',
      group: 'construction_home',
      category: 'HOME_CONSTRUCTION',
      categoryName: 'BĐS & Xây Dựng',
      name: 'Cửa Hàng Thiết Bị Điện Nước Dân Dụng',
      shortName: 'Điện nước',
      icon: '💡',
      vsic_code: '47524',
      vsic_name: 'Bán lẻ thiết bị điện nước, dây cáp, ống nhựa và phụ kiện dân dụng',
      fsq_categories: ['Hardware Store', 'Lighting Store'],
      target_demographic: 'Thợ thi công công trình, thợ điện nước, gia đình sửa chữa nhà ở khu dân cư mới xây dựng',
      target_population_ratio: 0.50,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 290000,
      breakeven_monthly_revenue: 65000000,
      competitor_density_factor: 0.00065,
      chain_ratio_avg: 0.14,
      churn_rate_annual: 0.088,
      survival_rates: { under_6m: 0.08, m6_to_12: 0.13, y1_to_2: 0.23, over_2y: 0.56 },
      matchCriteria: { constructionActive: true, residentGrowing: true },
      fengshui_affinity: 'Thủy Hỏa ký tế (nước và điện hài hòa), biển hiệu sáng sủa rõ ràng, dễ dừng xe bốc dỡ ống dài và phụ tùng.',
      suitable_models: [
        'Cửa hàng vật tư điện nước dân dụng kết hợp thợ sửa tận nhà',
        'Đại lý phân phối ống nhựa Tiền Phong / Bình Minh & phụ kiện',
        'Cửa hàng đèn LED trang trí & thiết bị điện thông minh Smart Home',
        'Điểm bán vật tư điện công nghiệp nhẹ cho nhà xưởng'
      ]
    },

    // 31. ĐẠI LÝ VẬT LIỆU XÂY DỰNG
    VAT_LIEU_XAY_DUNG: {
      id: 'VAT_LIEU_XAY_DUNG',
      group: 'construction_home',
      category: 'HOME_CONSTRUCTION',
      categoryName: 'BĐS & Xây Dựng',
      name: 'Đại Lý Vật Liệu Xây Dựng (Xi Măng, Cát, Sắt)',
      shortName: 'VLXD',
      icon: '🧱',
      vsic_code: '47521',
      vsic_name: 'Bán lẻ gạch, ngói, xi măng, cát, đá, sắt thép trong xây dựng',
      fsq_categories: ['Building Material Store', 'Hardware Store'],
      target_demographic: 'Nhà thầu xây dựng, gia chủ xây nhà mới, thợ hồ, cai thầu công trình dân dụng',
      target_population_ratio: 0.35,
      daytime_traffic_multiplier: 1.30,
      avg_spend_per_customer_month: 1600000,
      breakeven_monthly_revenue: 210000000,
      competitor_density_factor: 0.00030,
      chain_ratio_avg: 0.22,
      churn_rate_annual: 0.078,
      survival_rates: { under_6m: 0.06, m6_to_12: 0.11, y1_to_2: 0.21, over_2y: 0.62 },
      matchCriteria: { heavyTruckAccess: true, subUrban: true },
      fengshui_affinity: 'Thế Thổ Kim kiên cố, đường không cấm xe tải trọng lớn, kho bãi rộng rãi đón vận khí xây dựng sinh sôi bền bỉ.',
      suitable_models: [
        'Đại lý VLXD thô (cát, đá, xi măng, sắt Hòa Phát)',
        'Showroom gạch men ốp lát, thiết bị vệ sinh cao cấp',
        'Kho vật liệu composite & tôn lợp chống nóng cách nhiệt',
        'Cơ sở phân phối bê tông tươi và phụ gia xây dựng'
      ]
    },

    // 32. CỬA HÀNG MẸ VÀ BÉ
    ME_VA_BE: {
      id: 'ME_VA_BE',
      group: 'health_medical',
      category: 'HEALTH_FAMILY',
      categoryName: 'Y Tế & Sức Khỏe',
      name: 'Cửa Hàng Bỉm Sữa & Đồ Dùng Mẹ Bé',
      shortName: 'Mẹ & Bé',
      icon: '🍼',
      vsic_code: '47712',
      vsic_name: 'Bán lẻ sữa, bỉm tã, đồ dùng sơ sinh và dinh dưỡng cho bà mẹ và trẻ em',
      fsq_categories: ['Baby Store', 'Maternity Store', 'Toy Store'],
      target_demographic: 'Phụ nữ mang thai & mẹ bỉm sữa nuôi con nhỏ 0–5 tuổi tại các khu đô thị và chung cư',
      target_population_ratio: 0.26,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 850000,
      breakeven_monthly_revenue: 130000000,
      competitor_density_factor: 0.00045,
      chain_ratio_avg: 0.55,
      churn_rate_annual: 0.095,
      survival_rates: { under_6m: 0.08, m6_to_12: 0.14, y1_to_2: 0.24, over_2y: 0.54 },
      matchCriteria: { childrenRatio: 'high', youngFamily: true },
      fengshui_affinity: 'Cung Tử Tức cát tinh chở che, cửa hàng rực rỡ tươi vui, năng lượng ấm áp chở che cho mẹ và trẻ nhỏ.',
      suitable_models: [
        'Siêu thị bỉm sữa & đồ dùng sơ sinh cao cấp',
        'Cửa hàng dinh dưỡng ăn dặm hữu cơ & thực phẩm chức năng mẹ bé',
        'Shop thời trang trẻ em kết hợp đồ chơi giáo dục Montessori',
        'Chuỗi nhượng quyền Mẹ & Bé chân đế chung cư'
      ]
    },

    // 33. QUẦY CHÁO DINH DƯỠNG
    CHAO_DINH_DUONG: {
      id: 'CHAO_DINH_DUONG',
      group: 'retail_food',
      category: 'FNB_RETAIL',
      categoryName: 'Ẩm Thực & Đồ Uống',
      name: 'Quầy Cháo Dinh Dưỡng Trẻ Em',
      shortName: 'Cháo dinh dưỡng',
      icon: '🥣',
      vsic_code: '56109',
      vsic_name: 'Dịch vụ phục vụ cháo nóng nấu sẵn mang đi cho trẻ em và người bệnh',
      fsq_categories: ['Soup Restaurant', 'Fast Food Restaurant'],
      target_demographic: 'Gia đình có con 6 tháng đến 4 tuổi, bố mẹ đi làm gửi con ăn sáng/chiều, người ốm',
      target_population_ratio: 0.28,
      daytime_traffic_multiplier: 1.25,
      avg_spend_per_customer_month: 280000,
      breakeven_monthly_revenue: 35000000,
      competitor_density_factor: 0.00075,
      chain_ratio_avg: 0.35,
      churn_rate_annual: 0.155,
      survival_rates: { under_6m: 0.15, m6_to_12: 0.22, y1_to_2: 0.27, over_2y: 0.36 },
      matchCriteria: { kindergartenGate: true, rentalWorkerArea: true },
      fengshui_affinity: 'Cổng trường mầm non, nhóm lớp mẫu giáo, khu trọ công nhân; bếp nóng thơm ngon dẫn dắt nhân khí hòa nhã.',
      suitable_models: [
        'Kiosk cháo nóng nhượng quyền thương hiệu (Cây Thị, Việt Soup)',
        'Quầy cháo dinh dưỡng tự nấu hải sản rau củ hữu cơ tươi sống',
        'Mô hình kết hợp cháo trẻ em và súp tổ yến tẩm bổ người già',
        'Điểm bán cháo ăn sáng cổng trường mầm non tiện lợi'
      ]
    },

    // 34. CỬA HÀNG PHÂN BÓN & BVTV
    PHAN_BON_BVTV: {
      id: 'PHAN_BON_BVTV',
      group: 'agriculture_nature',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Cửa Hàng Phân Bón & Thuốc BVTV',
      shortName: 'Phân bón',
      icon: '🌱',
      vsic_code: '47731',
      vsic_name: 'Bán lẻ phân bón, thuốc trừ sâu và hóa chất nông nghiệp',
      fsq_categories: ['Garden Center', 'Farm Supply Store'],
      target_demographic: 'Nông dân, chủ trang trại, hộ gia đình làm vườn trồng rau, cây ăn trái, hoa màu',
      target_population_ratio: 0.45,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 850000,
      breakeven_monthly_revenue: 140000000,
      competitor_density_factor: 0.00045,
      chain_ratio_avg: 0.15,
      churn_rate_annual: 0.072,
      survival_rates: { under_6m: 0.05, m6_to_12: 0.10, y1_to_2: 0.22, over_2y: 0.63 },
      matchCriteria: { agriDistrict: true, farmArea: 'high' },
      fengshui_affinity: 'Vùng thuần nông, kho ráo thoáng gió, tránh để mùi hóa chất đọng uế khí, kích hoạt vượng khí Mộc Thổ tương sinh.',
      suitable_models: [
        'Đại lý phân bón vô cơ & hữu cơ vi sinh cấp 1',
        'Cửa hàng thuốc bảo vệ thực vật sinh học an toàn',
        'Trung tâm tư vấn kỹ thuật nông nghiệp & chăm sóc cây trồng',
        'Đại lý vật tư nhà màng, bạt phủ và hệ thống tưới nhỏ giọt'
      ]
    },

    // 35. ĐẠI LÝ THỨC ĂN CHĂN NUÔI
    THUC_AN_CHAN_NUOI: {
      id: 'THUC_AN_CHAN_NUOI',
      group: 'agriculture_nature',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Đại Lý Thức Ăn Chăn Nuôi (Cám Gia Súc, Gia Cầm)',
      shortName: 'Cám chăn nuôi',
      icon: '🐖',
      vsic_code: '47732',
      vsic_name: 'Bán lẻ thức ăn cho gia súc, gia cầm và thủy sản nuôi trồng',
      fsq_categories: ['Feed Store', 'Farm Supply Store'],
      target_demographic: 'Hộ chăn nuôi heo, bò sữa, gà vịt đẻ trứng, trang trại nuôi cá tôm',
      target_population_ratio: 0.38,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 1500000,
      breakeven_monthly_revenue: 180000000,
      competitor_density_factor: 0.00035,
      chain_ratio_avg: 0.42,
      churn_rate_annual: 0.068,
      survival_rates: { under_6m: 0.05, m6_to_12: 0.09, y1_to_2: 0.21, over_2y: 0.65 },
      matchCriteria: { livestockDistrict: true, agriDistrict: true },
      fengshui_affinity: 'Xã có truyền thống chăn nuôi, đường thông cho xe tải cám, mặt bằng cao ráo chống ẩm thấp gây hao tài.',
      suitable_models: [
        'Đại lý cám chăn nuôi heo thịt & bò sữa cấp 1',
        'Cửa hàng thức ăn thủy sản (tôm sú, cá tra, cá basa)',
        'Đại lý thức ăn gà vịt đẻ trứng kèm thuốc thú y phòng dịch',
        'Cơ sở phối trộn thức ăn chăn nuôi đậm đặc công thức chuẩn'
      ]
    },

    // 36. VƯỜN ƯƠM CÂY GIỐNG NÔNG NGHIỆP
    CAY_GIONG_NONG_NGHIEP: {
      id: 'CAY_GIONG_NONG_NGHIEP',
      group: 'agriculture_nature',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Vườn Ươm & Cung Ứng Cây Giống Nông Nghiệp',
      shortName: 'Cây giống',
      icon: '🌲',
      vsic_code: '01610',
      vsic_name: 'Hoạt động dịch vụ trồng trọt: Ươm tạo và cung ứng cây giống, mắt ghép, cây con',
      fsq_categories: ['Nursery', 'Garden Center'],
      target_demographic: 'Nông dân tái canh vườn cây ăn trái, nhà vườn trồng rừng, cơ sở trồng rau củ công nghệ cao',
      target_population_ratio: 0.32,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 620000,
      breakeven_monthly_revenue: 80000000,
      competitor_density_factor: 0.00022,
      chain_ratio_avg: 0.12,
      churn_rate_annual: 0.082,
      survival_rates: { under_6m: 0.07, m6_to_12: 0.12, y1_to_2: 0.23, over_2y: 0.58 },
      matchCriteria: { agriDistrict: true, gardenLand: true },
      fengshui_affinity: 'Gần nguồn Thủy tự nhiên (kênh rạch sông ngòi), đất phì nhiêu Mộc khí xanh tươi, gió lành sinh trưởng mầm tài lộc.',
      suitable_models: [
        'Vườn ươm cây ăn trái giống F1 (sầu riêng, xoài, mít ruột đỏ)',
        'Cơ sở cung ứng cây giống lâm nghiệp (keo, bạch đàn, sưa)',
        'Cung ứng cây rau giống khay vỉ sạch phục vụ nhà kính',
        'Vườn ươm hoa giống phục vụ mùa vụ Tết'
      ]
    },

    // 37. CÂY CẢNH & HOA KIỂNG ĐÔ THỊ
    CAY_CANH_HOA_KIENG: {
      id: 'CAY_CANH_HOA_KIENG',
      group: 'agriculture_nature',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Cửa Hàng Cây Cảnh & Hoa Kiểng Đô Thị',
      shortName: 'Cây cảnh',
      icon: '🪴',
      vsic_code: '47737',
      vsic_name: 'Bán lẻ hoa tươi, cây cảnh, bon sai và phụ kiện trồng cây',
      fsq_categories: ['Florist', 'Garden Center', 'Plant Nursery'],
      target_demographic: 'Cư dân đô thị yêu thiên nhiên, người chơi cây thế phong thủy, văn phòng mua cây xanh lọc không khí',
      target_population_ratio: 0.28,
      daytime_traffic_multiplier: 1.25,
      avg_spend_per_customer_month: 380000,
      breakeven_monthly_revenue: 70000000,
      competitor_density_factor: 0.00042,
      chain_ratio_avg: 0.14,
      churn_rate_annual: 0.118,
      survival_rates: { under_6m: 0.10, m6_to_12: 0.16, y1_to_2: 0.25, over_2y: 0.49 },
      matchCriteria: { urbanArea: true, minIncome: 5.5 },
      fengshui_affinity: 'Mộc khí hưng vượng, ven tuyến đường vành đai hoặc phố hoa kiểng, không gian mở đón sinh khí tụ Thủy dưỡng Mộc.',
      suitable_models: [
        'Vườn hoa kiểng & cây bóng mát sân vườn biệt thự',
        'Cửa hàng cây xanh phong thủy để bàn & cây lọc không khí văn phòng',
        'Bonsai cây thế nghệ thuật phục vụ người chơi sành điệu',
        'Dịch vụ cho thuê và chăm sóc cây xanh công ty định kỳ'
      ]
    },

    // 38. TIỆM CÁ CẢNH & HỒ THỦY SINH
    CA_CANH_THUY_SINH: {
      id: 'CA_CANH_THUY_SINH',
      group: 'agriculture_nature',
      category: 'AGRI_PET_NATURE',
      categoryName: 'Thể Thao & Nông Nghiệp',
      name: 'Tiệm Cá Cảnh & Hồ Thủy Sinh Phong Thủy',
      shortName: 'Cá cảnh',
      icon: '🐠',
      vsic_code: '47738',
      vsic_name: 'Bán lẻ cá cảnh, bể nuôi cá, thiết bị lọc nước và sinh vật cảnh dưới nước',
      fsq_categories: ['Pet Store', 'Aquarium Shop'],
      target_demographic: 'Người chơi cá cảnh (cá Rồng, Koi, Betta, Guppy), người kinh doanh bố trí hồ thủy sinh chiêu tài',
      target_population_ratio: 0.18,
      daytime_traffic_multiplier: 1.15,
      avg_spend_per_customer_month: 420000,
      breakeven_monthly_revenue: 50000000,
      competitor_density_factor: 0.00028,
      chain_ratio_avg: 0.08,
      churn_rate_annual: 0.125,
      survival_rates: { under_6m: 0.11, m6_to_12: 0.18, y1_to_2: 0.26, over_2y: 0.45 },
      matchCriteria: { urbanArea: true, malePref: true },
      fengshui_affinity: 'Cung Thủy cực thịnh, kích hoạt Minh Đường Tụ Thủy đón tài lộc, hệ thống sục khí luân chuyển dưỡng khí cát lành.',
      suitable_models: [
        'Shop cá cảnh thủy sinh phong cách Nature Aquarium',
        'Cửa hàng cá cảnh chuyên dòng (Cá Rồng, Koi, Betta giống tuyển)',
        'Dịch vụ thiết kế và thi công hồ cá Koi sân vườn biệt thự',
        'Điểm bán phụ kiện máy lọc, đèn UV và thức ăn cá cảnh'
      ]
    },

    // 39. NỘI THẤT GIA ĐÌNH
    NOI_THAT_GIA_DINH: {
      id: 'NOI_THAT_GIA_DINH',
      group: 'construction_home',
      category: 'HOME_CONSTRUCTION',
      categoryName: 'BĐS & Xây Dựng',
      name: 'Showroom Đồ Gỗ & Nội Thất Gia Đình',
      shortName: 'Nội thất',
      icon: '🛋️',
      vsic_code: '47591',
      vsic_name: 'Bán lẻ bàn, ghế, giường, tủ, đồ nội thất gia đình bằng gỗ và vật liệu khác',
      fsq_categories: ['Furniture Store', 'Home Goods Store'],
      target_demographic: 'Gia đình nhận nhà mới, chung cư bàn giao, hộ gia đình nâng cấp không gian sống phòng khách, phòng ngủ',
      target_population_ratio: 0.22,
      daytime_traffic_multiplier: 1.35,
      avg_spend_per_customer_month: 1350000,
      breakeven_monthly_revenue: 190000000,
      competitor_density_factor: 0.00030,
      chain_ratio_avg: 0.32,
      churn_rate_annual: 0.098,
      survival_rates: { under_6m: 0.09, m6_to_12: 0.15, y1_to_2: 0.24, over_2y: 0.52 },
      matchCriteria: { newHousing: true, minIncome: 6.2, rppiMin: 72 },
      fengshui_affinity: 'Thổ Mộc tương sinh, trục phố chuyên doanh nội thất, diện tích trưng bày lớn, đón cát khí an cư lạc nghiệp.',
      suitable_models: [
        'Showroom nội thất gỗ tự nhiên cao cấp phong cách hiện đại',
        'Nội thất may đo căn hộ chung cư thông minh tiết kiệm diện tích',
        'Showroom sofa, bàn ăn và giường ngủ nhập khẩu phong cách Bắc Âu',
        'Xưởng sản xuất và thiết kế thi công nội thất trọn gói'
      ]
    },

    // 40. VÀNG MÃ & ĐỒ THỜ CÚNG
    DO_THO_CUNG: {
      id: 'DO_THO_CUNG',
      group: 'luxury_spiritual',
      category: 'GOLD_SPIRITUAL',
      categoryName: 'Tài Sản & Tâm Linh',
      name: 'Cửa Hàng Vàng Mã & Đồ Thờ Cúng Tâm Linh',
      shortName: 'Đồ thờ cúng',
      icon: '🪔',
      vsic_code: '47739',
      vsic_name: 'Bán lẻ đồ dùng thờ cúng, lư hương, đèn thờ, nến, hương thắp và hàng mã',
      fsq_categories: ['Spiritual Goods Store', 'Religious Goods Store'],
      target_demographic: 'Phụ nữ nội trợ lớn tuổi, gia đình lo việc cúng giỗ, rằm, mùng 1, tết nguyên đán, đình đền chùa chiền',
      target_population_ratio: 0.52,
      daytime_traffic_multiplier: 1.20,
      avg_spend_per_customer_month: 210000,
      breakeven_monthly_revenue: 55000000,
      competitor_density_factor: 0.00055,
      chain_ratio_avg: 0.06,
      churn_rate_annual: 0.070,
      survival_rates: { under_6m: 0.05, m6_to_12: 0.11, y1_to_2: 0.22, over_2y: 0.62 },
      matchCriteria: { traditionalCommunity: true, seniorRatio: 'high' },
      fengshui_affinity: 'Gần chùa chiền, miếu mạo, khu dân cư gốc lâu đời, phương vị tôn nghiêm trang trọng, giữ gìn phúc lộc gia môn.',
      suitable_models: [
        'Cửa hàng đồ thờ cúng bằng đồng & gốm sứ Bát Tràng',
        'Quầy hàng mã, hương trầm sạch & nến cúng truyền thống',
        'Cửa hàng tượng Phật, bàn thờ thần tài thổ địa phong thủy',
        'Điểm cung cấp lễ vật trọn gói cho hiếu hỷ & tâm linh'
      ]
    }
  };

  /**
   * DANH MỤC CÁC NGÀNH NGHỀ TRUYỀN THỐNG CÓ NGUY CƠ ĐÀO THẢI CAO (SUNSET INDUSTRY RADAR)
   * Phân tích rủi ro đào thải do chuyển đổi số, TMĐT và biến động hành vi tiêu dùng đô thị.
   */
  const SUNSET_INDUSTRY_CATALOG = {
    NET_CO_TRADITIONAL: {
      id: 'NET_CO_TRADITIONAL',
      name: 'Quán Internet & Net Cỏ Truyền Thống',
      shortName: 'Net cỏ / Game cũ',
      icon: '🎮',
      vsic_code: '93290',
      vsic_name: 'Đại lý cung cấp dịch vụ internet công cộng và trò chơi điện tử nhỏ lẻ',
      riskScore: 88,
      riskLevel: 'Cực Kỳ Cao',
      riskColor: '#EF4444',
      annualDeclineRatePct: -28.0,
      coreCauses: [
        'Smartphone cấu hình cao giá rẻ phổ cập đại trà',
        'Hạ tầng mạng 4G/5G và cáp quang hộ gia đình bao phủ 99%',
        'Game di động (Liên Quân, Free Fire, Tốc Chiến) áp đảo hoàn toàn game PC',
        'Chi phí nâng cấp phần cứng PC quá đắt đỏ so với giá giờ chơi 5k–8k/giờ'
      ],
      strategicPivot: 'Nâng cấp lên tổ hợp Cyber Gaming Lounge cao cấp kết hợp Billiards & F&B đồ ăn nóng chất lượng, hoặc thanh lý máy móc sớm để bảo toàn vốn.',
      fengshuiWarning: 'Thuộc tính thoái vận Bát Vận bước sang Cửu Vận (Hỏa vận 2024–2043). Các không gian tối tăm, âm khí nặng, uế trệ sẽ bị đào thải nhanh chóng. Cần giải phóng mặt bằng hoặc mở rộng cửa sổ đón dương khí quang đãng.'
    },

    PHOTOCOPY_IN_AN: {
      id: 'PHOTOCOPY_IN_AN',
      name: 'Tiệm In Ấn & Photocopy Nhỏ Lẻ Truyền Thống',
      shortName: 'Photocopy / In ấn',
      icon: '🖨️',
      vsic_code: '18129',
      vsic_name: 'Dịch vụ photocopy, in ấn tài liệu giấy truyền thống',
      riskScore: 76,
      riskLevel: 'Cao',
      riskColor: '#F97316',
      annualDeclineRatePct: -18.5,
      coreCauses: [
        'Xu hướng số hóa văn phòng (Paperless office) và chữ ký số điện tử',
        'Dịch vụ công trực tuyến VNeID và nộp hồ sơ qua cổng hành chính công',
        'Sinh viên chuyển sang đọc giáo trình điện tử PDF, máy tính bảng và laptop',
        'Máy in gia đình nhỏ gọn giá rẻ thay thế nhu cầu in ấn nhỏ lẻ'
      ],
      strategicPivot: 'Chuyển đổi sang dịch vụ in ấn quà tặng cá nhân hóa, in tem nhãn decal đóng gói TMĐT, in ấn phẩm marketing số và thiết kế đồ họa trọn gói.',
      fengshuiWarning: 'Hành Kim thoái khí, mùi mực in và bụi giấy tích tụ tạo uế khí cản trở cung Tài Lộc. Cần chuyển dịch sang ngành có tính Mộc - Hỏa (thiết kế sáng tạo, quà tặng).'
    },

    CD_BANG_DIA_SACH_BAO: {
      id: 'CD_BANG_DIA_SACH_BAO',
      name: 'Sạp Báo Giấy & Cửa Hàng Băng Đĩa Truyền Thống',
      shortName: 'Băng đĩa / Báo giấy',
      icon: '📻',
      vsic_code: '47610',
      vsic_name: 'Bán lẻ sách báo, băng đĩa nhạc, phim truyền thống trên hè phố',
      riskScore: 96,
      riskLevel: 'Báo Động Đỏ',
      riskColor: '#DC2626',
      annualDeclineRatePct: -42.0,
      coreCauses: [
        'Báo điện tử và mạng xã hội cập nhật tin tức tức thời từng giây',
        'Nền tảng phát nhạc trực tuyến Spotify, Apple Music, YouTube Music',
        'Nền tảng phim trực tuyến Netflix, VieON thay thế hoàn toàn đĩa DVD/VCD',
        'Chi phí in ấn phát hành giấy tăng cao trong khi lượng người đọc giảm 90%'
      ],
      strategicPivot: 'Chuyển hẳn sang mô hình Cafe sách nghệ thuật, studio thu âm podcast, quầy bán đồ lưu niệm văn hóa bản địa kết hợp trạm dừng chân du lịch.',
      fengshuiWarning: 'Vị trí sạp báo hè phố thường phạm Xung Sát dòng người xô bồ nhưng không tụ khí. Kho băng đĩa cũ là vật chết (tĩnh khí thoái trệ), cần thanh lọc toàn diện.'
    },

    MAY_DO_THU_CONG_CU: {
      id: 'MAY_DO_THU_CONG_CU',
      name: 'Tiệm May Đo Quần Áo Thủ Công Kiểu Cũ',
      shortName: 'May đo nhỏ lẻ',
      icon: '🧵',
      vsic_code: '14100',
      vsic_name: 'May trang phục thủ công hộ gia đình nhỏ lẻ truyền thống',
      riskScore: 70,
      riskLevel: 'Cao',
      riskColor: '#F97316',
      annualDeclineRatePct: -15.0,
      coreCauses: [
        'Sự bùng nổ của thời trang may sẵn (Fast fashion) giá siêu rẻ',
        'Sàn TMĐT Shopee, TikTok Shop livestream bán quần áo mẫu mới mỗi ngày',
        'Thời gian may đo thủ công kéo dài 7–14 ngày không cạnh tranh được với giao hàng 2h',
        'Thiếu hụt thợ may trẻ tay nghề cao kế thừa nghề truyền thống'
      ],
      strategicPivot: 'Nâng cấp lên xưởng may đo Bespoke cá nhân hóa cao cấp, dịch vụ sửa chữa đồ hiệu (Tailoring & Alterations), hoặc may đo cho thuê áo dài / trang phục sự kiện.',
      fengshuiWarning: 'Cung Tài Lộc bị che khuất bởi vải vóc cuộn xếp u ám, ánh sáng nhân tạo yếu ớt. Cần mở rộng Huyền Quan đón dương quang, đặt bàn máy may tại vị trí nạp Sinh Khí.'
    },

    DAI_LY_VE_MAY_BAY_GIAY: {
      id: 'DAI_LY_VE_MAY_BAY_GIAY',
      name: 'Đại Lý / Phòng Bán Vé Máy Bay Giấy Truyền Thống',
      shortName: 'Đại lý vé giấy',
      icon: '🎫',
      vsic_code: '79110',
      vsic_name: 'Đại lý bán vé máy bay, vé tàu xe trực tiếp tại quầy',
      riskScore: 84,
      riskLevel: 'Rất Cao',
      riskColor: '#EF4444',
      annualDeclineRatePct: -25.0,
      coreCauses: [
        'Ứng dụng chính hãng của Vietnam Airlines, Vietjet Air, Bamboo Airways đặt vé 1 chạm',
        'Nền tảng OTA (Traveloka, Agoda, Trip.com) liên tục tung mã giảm giá',
        'Ứng dụng ngân hàng số (Mobile Banking) tích hợp tính năng đặt vé máy bay miễn phí',
        'Chính sách cắt giảm hoa hồng đại lý từ các hãng hàng không'
      ],
      strategicPivot: 'Mở rộng sang dịch vụ làm Visa trọn gói, tour du lịch thiết kế riêng (Customized tours), combo nghỉ dưỡng cao cấp hoặc đại lý tư vấn du học / định cư.',
      fengshuiWarning: 'Khí tụ tĩnh mịch không có dòng khách vãng lai, Huyền Quan thiếu điểm nhấn sinh tài. Cần phối hợp dòng Thủy Mộc (trang trí cây xanh cảnh quan và dịch vụ trải nghiệm).'
    },

    DIEN_MAY_GIA_DUNG_NHO: {
      id: 'DIEN_MAY_GIA_DUNG_NHO',
      name: 'Cửa Hàng Điện Máy & Đồ Gia Dụng Nhỏ Lẻ Truyền Thống',
      shortName: 'Điện máy nhỏ lẻ',
      icon: '🔌',
      vsic_code: '4759',
      vsic_name: 'Bán lẻ thiết bị điện máy, đồ gia dụng gia đình nhỏ lẻ',
      riskScore: 80,
      riskLevel: 'Rất Cao',
      riskColor: '#EF4444',
      annualDeclineRatePct: -22.0,
      coreCauses: [
        'Chuỗi bán lẻ khổng lồ (Điện Máy Xanh, MediaMart, Chợ Lớn) bao phủ tận huyện xã',
        'Sàn TMĐT giao hàng miễn phí, lắp đặt tận phòng và trả góp 0% qua thẻ tín dụng',
        'Cửa hàng nhỏ lẻ không có vốn ôm hàng số lượng lớn để hưởng chiết khấu cao',
        'Khó khăn trong khâu bảo hành và dịch vụ hậu mãi so với chuỗi chuyên nghiệp'
      ],
      strategicPivot: 'Chuyển sang làm trạm tiếp nhận bảo hành ủy quyền, dịch vụ sửa chữa lắp đặt điện lạnh tận nhà (vệ sinh máy lạnh, sửa tủ lạnh), hoặc bán đồ gia dụng thông minh chuyên sâu (Smart Home).',
      fengshuiWarning: 'Thiết bị điện máy xếp chồng chất tạo Kim Sát và hỏa nhiệt tích tụ gây bất an phong thủy. Cần dọn dẹp giải phóng kho bãi, tạo dòng khí lưu thông thoáng đãng.'
    }
  };

  class IndustryEconomicEngine {
    constructor() {
      this.CATALOG = INDUSTRY_CATALOG;
    }

    /**
     * Lấy danh sách toàn bộ 40 ngành nghề hỗ trợ
     */
    getSupportedIndustries() {
      return Object.values(INDUSTRY_CATALOG);
    }

    getIndustryCatalog() {
      return INDUSTRY_CATALOG;
    }

    /**
     * Danh mục các ngành có nguy cơ đào thải (Sunset Industry Radar)
     */
    getSunsetIndustries() {
      return Object.values(SUNSET_INDUSTRY_CATALOG);
    }

    getSunsetIndustryCatalog() {
      return SUNSET_INDUSTRY_CATALOG;
    }

    getSunsetIndustryProfile(key = 'NET_CO_TRADITIONAL') {
      return SUNSET_INDUSTRY_CATALOG[key] || SUNSET_INDUSTRY_CATALOG.NET_CO_TRADITIONAL;
    }

    /**
     * Lấy danh mục ngành phân theo nhóm: Phổ biến, Mới nổi, Đào thải
     */
    getGroupedIndustries() {
      return {
        mainstream: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'mainstream'),
        emerging: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'emerging'),
        traditional_services: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'traditional_services'),
        retail_food: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'retail_food'),
        health_medical: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'health_medical'),
        automotive_energy: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'automotive_energy'),
        construction_home: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'construction_home'),
        agriculture_nature: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'agriculture_nature'),
        luxury_spiritual: Object.values(INDUSTRY_CATALOG).filter(i => i.group === 'luxury_spiritual'),
        sunset: Object.values(SUNSET_INDUSTRY_CATALOG)
      };
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
    calculateIndustryMarket({ lat, lng, radiusMeters = 1000, provinceId, districtId, communeId, industryKey = 'CAFE' }) {
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
        districtId,
        communeId
      });

      if (!baseMarket) return null;

      const profile = this.getIndustryProfile(industryKey);
      const { location, demographics, financials, marketAssessment } = baseMarket;
      const radiusKm = location.radiusKm;
      const areaKm2 = location.areaKm2;
      const basePop = demographics.estimatedPopulation;

      // 2. KHỐI 1: THỊ TRƯỜNG & KHÁCH TIỀM NĂNG RIÊNG NGÀNH
      const daytimePopulation = Math.round(basePop * profile.daytime_traffic_multiplier);

      // Hiệu chỉnh tỷ lệ khách hàng tiềm năng dựa trên cơ cấu độ tuổi & giới tính địa phương
      let dynamicTargetRatio = profile.target_population_ratio;
      if (demographics.genderBreakdown && demographics.ageCohorts) {
        const femaleRatio = demographics.genderBreakdown.femalePct / 100;
        const maleRatio = demographics.genderBreakdown.malePct / 100;
        const youthRatio = demographics.ageCohorts.youth.pct / 100;
        const primeRatio = demographics.ageCohorts.prime.pct / 100;
        const childrenRatio = demographics.ageCohorts.children.pct / 100;
        const seniorRatio = demographics.ageCohorts.senior.pct / 100;

        if (profile.id === 'NAIL') {
          dynamicTargetRatio = Number((femaleRatio * (youthRatio * 0.9 + primeRatio * 0.95 + seniorRatio * 0.4)).toFixed(3));
        } else if (profile.id === 'SPA_BEAUTY') {
          dynamicTargetRatio = Number((femaleRatio * (primeRatio * 0.85 + seniorRatio * 0.35 + youthRatio * 0.25)).toFixed(3));
        } else if (profile.id === 'CAFE') {
          dynamicTargetRatio = Number(((youthRatio * 0.95 + primeRatio * 0.85 + seniorRatio * 0.2) * 1.05).toFixed(3));
        } else if (profile.id === 'NHA_HANG_FNB') {
          dynamicTargetRatio = Number((primeRatio * 0.9 + seniorRatio * 0.6 + youthRatio * 0.6 + childrenRatio * 0.5).toFixed(3));
        } else if (profile.id === 'NHA_THUOC') {
          dynamicTargetRatio = Number((seniorRatio * 1.35 + childrenRatio * 1.1 + primeRatio * 0.7).toFixed(3));
        } else if (profile.id === 'TOC_NAM_BARBER') {
          dynamicTargetRatio = Number((maleRatio * (youthRatio * 0.95 + primeRatio * 0.9 + seniorRatio * 0.6)).toFixed(3));
        } else if (profile.id === 'ME_VA_BE') {
          dynamicTargetRatio = Number((childrenRatio * 1.3 + femaleRatio * primeRatio * 0.8).toFixed(3));
        } else if (profile.id === 'CHAO_DINH_DUONG') {
          dynamicTargetRatio = Number((childrenRatio * 1.4).toFixed(3));
        } else if (profile.id === 'DO_CUOI_STUDIO') {
          dynamicTargetRatio = Number(((youthRatio * 0.6 + primeRatio * 0.4) * 0.25).toFixed(3));
        } else if (profile.id === 'SIEU_AM_CHAN_DOAN') {
          dynamicTargetRatio = Number((femaleRatio * (youthRatio * 0.3 + primeRatio * 0.5) + seniorRatio * 0.3).toFixed(3));
        } else if (profile.id === 'BAN_XE_MAY') {
          dynamicTargetRatio = Number((youthRatio * 0.9 + primeRatio * 0.8).toFixed(3));
        } else if (profile.id === 'DO_THO_CUNG') {
          dynamicTargetRatio = Number((seniorRatio * 1.2 + primeRatio * 0.7).toFixed(3));
        }
      }
      dynamicTargetRatio = Math.min(0.85, Math.max(0.12, dynamicTargetRatio));

      // Số lượng khách hàng tiềm năng cốt lõi
      const targetCustomerCount = Math.round(daytimePopulation * dynamicTargetRatio);

      // Mức chi trả khả dụng bình quân theo năng lực tài chính địa phương
      const incomeModifier = financials.monthlyIncomePerCapita / 5.5;
      const adjustedSpendPerCustomer = Math.round(profile.avg_spend_per_customer_month * Math.pow(incomeModifier, 0.75));

      // Tổng dung lượng nhu cầu ngành trong bán kính (tỷ VNĐ/tháng)
      const totalIndustryDemandVnd = targetCustomerCount * adjustedSpendPerCustomer;
      const totalIndustryDemandBillionVnd = Number((totalIndustryDemandVnd / 1e9).toFixed(2));
      const totalIndustryDemandYearlyBillion = Number((totalIndustryDemandBillionVnd * 12).toFixed(1));

      // 3. KHỐI 2: ĐỐI THỦ & MẬT ĐỘ CẠNH TRANH
      const estimatedCompetitors = Math.max(
        2,
        Math.round(basePop * profile.competitor_density_factor * (location.districtName ? 1.15 : 1.0))
      );

      const competitorDensityPerKm2 = Number((estimatedCompetitors / areaKm2).toFixed(1));

      const avgDistanceBetweenCompetitorsMeters = Math.max(
        50,
        Math.round((1 / (2 * Math.sqrt(estimatedCompetitors / areaKm2))) * 1000)
      );

      const chainCount = Math.max(1, Math.round(estimatedCompetitors * profile.chain_ratio_avg));
      const independentCount = Math.max(1, estimatedCompetitors - chainCount);
      const customersPerStore = Math.round(targetCustomerCount / estimatedCompetitors);

      // 4. KHỐI 3: ĐỘNG THÁI SINH - TỬ & TUỔI THỌ CỬA HÀNG
      // QUY TẮC TOÀN VẸN DỮ LIỆU: Tại Việt Nam hiện chưa có cơ sở dữ liệu quan trắc định kỳ cấp bán kính vi mô
      // về số lượng chính xác cửa hàng mở mới / rời bỏ hàng tháng. Tuyệt đối không tự suy số giả (missing data !== 1).
      const newlyAddedCount = null;
      const removedCount = null;
      const netGrowthCount = null;
      const netGrowthRatePct = null;
      const churnRatePct = null;

      const survivalOver2YearsPct = Math.round(profile.survival_rates.over_2y * 100);

      // 5. KHỐI 4: TỶ SỐ CẦU / CUNG (DSR) & ĐIỂM CƠ HỘI THỊ TRƯỜNG
      const breakevenRevBillion = profile.breakeven_monthly_revenue / 1e9;
      const totalSupplyBreakevenBillion = estimatedCompetitors * breakevenRevBillion;
      const dsrRatio = Number((totalIndustryDemandBillionVnd / totalSupplyBreakevenBillion).toFixed(2));

      let dsrStatus = 'Cân bằng';
      let dsrColor = '#38BDF8';
      if (dsrRatio >= 1.35) {
        dsrStatus = 'Dư địa mở mới rất lớn (Thiếu cung)';
        dsrColor = '#10B981';
      } else if (dsrRatio >= 1.05) {
        dsrStatus = 'Thị trường còn dư địa phát triển';
        dsrColor = '#34D399';
      } else if (dsrRatio >= 0.85) {
        dsrStatus = 'Thị trường cân bằng (Cạnh tranh vừa phải)';
        dsrColor = '#FBBF24';
      } else {
        dsrStatus = 'Thị trường bão hòa (Cạnh tranh gay gắt)';
        dsrColor = '#EF4444';
      }

      // ĐIỂM CƠ HỘI TỔNG HỢP (OPPORTUNITY SCORE 0 - 100)
      const demandScore = Math.min(100, Math.round((totalIndustryDemandBillionVnd / (areaKm2 * 3.5)) * 100));
      const compGapScore = Math.min(100, Math.max(30, Math.round(dsrRatio * 65)));
      const survivalScore = Math.min(100, Math.round(survivalOver2YearsPct * 1.5 + 20));
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
          status: 'unavailable',
          statusLabel: 'Chưa có dữ liệu quan trắc biến động thời gian thực',
          provenance: 'UNAVAILABLE_AT_MICRO_RADIUS',
          newlyAddedCount,
          removedCount,
          netGrowthCount,
          netGrowthRatePct,
          churnRatePct,
          benchmarkAnnualRatePct: Number((profile.churn_rate_annual * 100).toFixed(1)),
          survivalRates: profile.survival_rates,
          survivalOver2YearsPct,
          note: 'Chưa có dữ liệu thống kê biến động điểm bán (mới mở / đóng cửa) thời gian thực cho bán kính này.'
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
          verdict: `Tại bán kính ${radiusKm >= 1 ? `${radiusKm} km` : `${radiusMeters} m`} quanh khu vực này, dung lượng tiêu thụ ngành ${profile.name} ước tính đạt xấp xỉ ${totalIndustryDemandBillionVnd} tỷ VNĐ/tháng cho ${targetCustomerCount.toLocaleString('vi-VN')} khách hàng tiềm năng. Với ${estimatedCompetitors} đối thủ hiện hữu, chỉ số Cầu/Cung đạt ${dsrRatio} (${dsrStatus}). Tỷ lệ cửa hàng tồn tại >2 năm (chuẩn ngành toàn quốc) đạt ${survivalOver2YearsPct}%. Tổng điểm Cơ Hội Thị Trường đạt ${overallOpportunityScore}/100 — Mức độ: ${opportunityTier}.`
        }
      };
    }

    /**
     * THUẬT TOÁN "LỌC VỊ TRÍ TỐT" (SPATIAL OPPORTUNITY MATCHER)
     * Tự động quét toàn bộ các quận, huyện, xã thuộc tỉnh thành đã chọn
     * để xếp hạng các vị trí tối ưu nhất theo đặc thù nhân khẩu học & kinh tế của ngành.
     *
     * @param {Object} params - { provinceId, industryKey, limit = 5 }
     * @returns {Array} Danh sách các vị trí tối ưu được xếp hạng kèm điểm số và lý do
     */
    findBestLocationsForIndustry({ provinceId, industryKey = 'CAFE', limit = 5 }) {
      const econCorpus = getEconCorpus();
      const profile = this.getIndustryProfile(industryKey);
      if (!econCorpus || !econCorpus.length) return [];

      let province = null;
      if (provinceId) {
        province = econCorpus.find(p => p.historical_id === provinceId || (p.historical_id && p.historical_id.toLowerCase() === provinceId.toLowerCase()));
        if (!province) {
          const pid = provinceId.toUpperCase();
          if (pid.includes('SG') || pid.includes('HCM') || pid.includes('HO_CHI_MINH')) {
            province = econCorpus.find(p => p.historical_id === 'SG_PRE2008');
          } else if (pid.includes('HN') || pid.includes('HANOI') || pid.includes('HA_NOI')) {
            province = econCorpus.find(p => p.historical_id === 'HN_PRE2008');
          } else {
            province = econCorpus.find(p => p.historical_id.includes(pid) || (p.province_name && p.province_name.toUpperCase().includes(pid)));
          }
        }
      }
      if (!province) {
        province = econCorpus[0];
      }
      if (!province || !province.key_districts_sae || !province.key_districts_sae.length) {
        return [];
      }

      const districts = province.key_districts_sae;
      const scoredDistricts = [];

      for (const d of districts) {
        const dName = d.name || '';
        const dType = d.type || '';
        const isRuralAgri = dName.includes('Huyện') || dType.includes('Huyện') || dType.includes('nông nghiệp');
        const isUrbanCity = dName.includes('Quận') || dName.includes('Thành phố') || dType.includes('Quận') || dType.includes('Đô thị') || dType.includes('CBD');
        const isSemiRural = dName.includes('Thị xã') || dType.includes('Thị xã');

        const gender = d.gender || { male_pct: 49.5, female_pct: 50.5 };
        const age = d.age_cohorts || { children_0_14: 18.5, youth_15_24: 15.0, prime_25_49: 44.5, senior_50_plus: 22.0 };
        const income = d.income || 5.5;
        const rppi = d.rppi || 75;

        // 1. Demographic match score S_demographic (0-100)
        let sDemo = 75;
        const isAgriSector = (profile.id === 'PHAN_BON_BVTV' || profile.id === 'THUC_AN_CHAN_NUOI' || profile.id === 'CAY_GIONG_NONG_NGHIEP');

        if (isAgriSector) {
          sDemo = isRuralAgri ? 96 : (isSemiRural ? 80 : 38);
        } else if (profile.id === 'TOC_NAM_BARBER' || profile.id === 'BAN_XE_MAY' || profile.id === 'CA_CANH_THUY_SINH') {
          if (gender.male_pct >= 50.0) sDemo = 96;
          else if (gender.male_pct >= 49.0) sDemo = 90;
          else sDemo = 78;
        } else if (profile.id === 'NAIL' || profile.id === 'SPA_BEAUTY' || profile.id === 'QUAN_AO_THOI_TRANG' || profile.id === 'SIEU_AM_CHAN_DOAN') {
          if (gender.female_pct >= 51.5) sDemo = 96;
          else if (gender.female_pct >= 50.5) sDemo = 90;
          else sDemo = 80;
        } else if (profile.id === 'ME_VA_BE' || profile.id === 'CHAO_DINH_DUONG') {
          if (age.children_0_14 >= 19.0) sDemo = 95;
          else if (age.children_0_14 >= 17.5) sDemo = 88;
          else sDemo = 78;
        } else if (profile.id === 'PICKLEBALL' || profile.id === 'TRA_SUA_HOT_TREND' || profile.id === 'STUDIO_NGHE_THUAT' || profile.id === 'COWORKING_STUDY') {
          if (age.youth_15_24 >= 15.5) sDemo = 95;
          else if (age.youth_15_24 >= 14.5) sDemo = 86;
          else sDemo = 75;
        } else if (profile.id === 'DO_THO_CUNG' || profile.id === 'NHA_THUOC' || profile.id === 'PHONG_KHAM_DA_KHOA') {
          if (age.senior_50_plus >= 22.5) sDemo = 94;
          else if (age.senior_50_plus >= 20.0) sDemo = 88;
          else sDemo = 80;
        } else {
          sDemo = 85;
        }

        // 2. Income & Spend match score S_income_spend (0-100)
        let sIncome = 75;
        if (isAgriSector) {
          sIncome = isRuralAgri ? 95 : (isSemiRural ? 78 : 35);
        } else if (profile.id === 'TIEM_VANG' || profile.id === 'SHOWROOM_O_TO' || profile.id === 'BAT_DONG_SAN' || profile.id === 'NOI_THAT_GIA_DINH' || profile.id === 'SPA_BEAUTY') {
          if (income >= 7.5) sIncome = 98;
          else if (income >= 6.5) sIncome = 90;
          else if (income >= 5.5) sIncome = 78;
          else sIncome = 62;
        } else if (profile.id === 'QUAN_AN_SANG' || profile.id === 'DAI_LY_GAO' || profile.id === 'CHAO_DINH_DUONG' || profile.id === 'TIEN_LOI' || profile.id === 'TOC_NAM_BARBER') {
          if (d.density >= 2500 || d.pop >= 300000) sIncome = 95;
          else if (d.density >= 1200 || d.pop >= 150000) sIncome = 88;
          else sIncome = 80;
        } else {
          sIncome = Math.min(95, Math.max(65, Math.round(rppi * 1.05)));
        }

        // 3. Competition Gap score S_competition_gap (0-100)
        let sComp = 80;
        const estComp = Math.round(d.pop * profile.competitor_density_factor);
        const compDensity = d.density > 0 ? (estComp / (d.pop / d.density)) : 1.0;
        if (isAgriSector) {
          sComp = isRuralAgri ? 95 : 30;
        } else {
          if (compDensity < 1.0) sComp = 94;
          else if (compDensity < 2.5) sComp = 86;
          else sComp = 74;
        }

        // 4. Typology match score S_typology (0-100)
        let sType = 80;
        if (isAgriSector) {
          sType = isRuralAgri ? 98 : (isSemiRural ? 80 : 20);
        } else if (profile.id === 'SHOWROOM_O_TO' || profile.id === 'COWORKING_STUDY' || profile.id === 'BAT_DONG_SAN' || profile.id === 'PICKLEBALL') {
          sType = isUrbanCity ? 95 : 68;
        } else if (profile.id === 'VAT_LIEU_XAY_DUNG' || profile.id === 'CAY_XANG') {
          sType = isRuralAgri ? 92 : 80;
        } else {
          sType = 86;
        }

        // Điểm số tổng hợp (0 - 100)
        const compositeScore = Math.min(
          98,
          Math.max(
            30,
            Math.round(sDemo * 0.35 + sIncome * 0.25 + sComp * 0.25 + sType * 0.15)
          )
        );

        let bestCommune = null;
        if (d.communes && d.communes.length > 0) {
          bestCommune = d.communes[0];
        }

        const reasons = [];
        if (isAgriSector) {
          if (isRuralAgri) {
            reasons.push(`Huyện nông nghiệp trọng điểm với diện tích canh tác & chăn nuôi lớn`);
            reasons.push(`Nhu cầu vật tư trực tiếp thường xuyên, khoảng trống đại lý phục vụ bà con lớn`);
          } else {
            reasons.push(`Khu vực đô thị hóa cao, đất nông nghiệp hạn chế`);
          }
        } else if (profile.id === 'TOC_NAM_BARBER') {
          reasons.push(`Dân số nam chiếm ${gender.male_pct}% (khoảng ${Math.round(d.pop * gender.male_pct / 100).toLocaleString('vi-VN')} nam giới)`);
          reasons.push(`Mật độ tiệm tóc nam còn thưa so với nhu cầu thực tế`);
        } else if (profile.id === 'NAIL' || profile.id === 'SPA_BEAUTY') {
          reasons.push(`Dân số nữ giới đạt ${gender.female_pct}%, chi tiêu phi thực phẩm ${d.expense} tr/tháng`);
          reasons.push(`Sức mua RPPI ${d.rppi}/100, nhu cầu chăm sóc sắc đẹp cao`);
        } else if (profile.id === 'SHOWROOM_O_TO' || profile.id === 'TIEM_VANG') {
          reasons.push(`Thu nhập bình quân đạt ${d.income} tr/tháng, sức mua tích sản cao`);
          reasons.push(`Tọa độ trục thương mại sầm uất, an ninh đảm bảo`);
        } else if (profile.id === 'ME_VA_BE' || profile.id === 'CHAO_DINH_DUONG') {
          reasons.push(`Tỷ lệ trẻ em 0-14 tuổi đạt ${age.children_0_14}%, mật độ cư dân trẻ cao`);
          reasons.push(`Gần các trường mầm non & cụm dân cư gia đình`);
        } else {
          reasons.push(`Dung lượng dân cư ${(d.pop || 0).toLocaleString('vi-VN')} người với sức mua RPPI ${d.rppi}/100`);
          reasons.push(`Tỷ số cung/cầu thuận lợi, dư địa phát triển điểm bán mới`);
        }

        let tier = 'Tiềm Năng';
        let tierColor = '#38BDF8';
        if (compositeScore >= 88) {
          tier = 'Rất Tối Ưu (Ưu Tiên Mở)';
          tierColor = '#10B981';
        } else if (compositeScore >= 80) {
          tier = 'Khá Phù Hợp';
          tierColor = '#34D399';
        } else if (compositeScore >= 70) {
          tier = 'Cân Nhắc Kỹ';
          tierColor = '#FBBF24';
        } else {
          tier = 'Ít Phù Hợp';
          tierColor = '#94A3B8';
        }

        scoredDistricts.push({
          districtId: d.id,
          districtName: d.name,
          districtType: d.type,
          communeId: bestCommune ? bestCommune.id : null,
          communeName: bestCommune ? bestCommune.name : null,
          score: compositeScore,
          tier,
          tierColor,
          reasons,
          keyMetrics: {
            pop: d.pop || 0,
            density: d.density || 0,
            income: d.income || 0,
            expense: d.expense || 0,
            rppi: d.rppi || 0,
            malePct: gender.male_pct,
            femalePct: gender.female_pct
          }
        });
      }

      scoredDistricts.sort((a, b) => b.score - a.score);
      return scoredDistricts.slice(0, limit);
    }
  }

  return new IndustryEconomicEngine();
}));
