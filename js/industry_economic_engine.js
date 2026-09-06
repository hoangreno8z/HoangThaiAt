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
   * DANH MỤC HỒ SƠ KINH TẾ CHUẨN HÓA NGÀNH NGHỀ (VSIC 2025)
   * Phân nhóm:
   * - mainstream: Ngành kinh doanh trọng điểm phổ biến toàn quốc
   * - emerging: Ngành đang phát triển mạnh mẽ & xu hướng mới
   */
  const INDUSTRY_CATALOG = {
    CAFE: {
      id: 'CAFE',
      group: 'mainstream',
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
      group: 'mainstream',
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
      group: 'mainstream',
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
      group: 'mainstream',
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
      group: 'mainstream',
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
      group: 'mainstream',
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
    },

    // =========================================================================
    // NHÓM 2: CÁC NGÀNH ĐANG PHÁT TRIỂN & XU HƯỚNG MỚI (EMERGING & NICHE SECTORS)
    // =========================================================================
    PICKLEBALL: {
      id: 'PICKLEBALL',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.10,
        m6_to_12: 0.16,
        y1_to_2: 0.26,
        over_2y: 0.48
      },
      fengshui_affinity: 'Minh Đường khoáng đạt, thế đất bằng phẳng, gió lưu thông không bế khí, đón vượng khí vận động thanh thoát.',
      suitable_models: [
        'Cụm sân Pickleball trong nhà có máy lạnh & đèn thi đấu',
        'Sân ngoài trời có mái che kết hợp quầy cafe thể thao',
        'Câu lạc bộ thể thao phong trào & giải đấu cộng đồng',
        'Tổ hợp thể thao giải trí đa năng tích hợp phụ kiện'
      ]
    },

    PET_CARE: {
      id: 'PET_CARE',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.09,
        m6_to_12: 0.15,
        y1_to_2: 0.24,
        over_2y: 0.52
      },
      fengshui_affinity: 'Cung Tọa sinh khí, hướng đón ánh sáng tự nhiên, hệ thống cấp thoát nước thông suốt không để uế khí đọng.',
      suitable_models: [
        'Pet Grooming & Spa tắm cắt tỉa chuyên nghiệp',
        'Khách sạn thú cưng lưu trú dịp lễ tết & cuối tuần',
        'Cửa hàng thức ăn & phụ kiện thú cưng cao cấp',
        'Phòng khám thú y kết hợp dịch vụ chăm sóc trọn gói'
      ]
    },

    TRAM_SAC_EV: {
      id: 'TRAM_SAC_EV',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.05,
        m6_to_12: 0.11,
        y1_to_2: 0.20,
        over_2y: 0.64
      },
      fengshui_affinity: 'Thuộc tính Hỏa - Kim, chuộng vị trí Lộ Thông giao lộ, vỉa hè rộng đón dòng xe lưu thông nhộn nhịp.',
      suitable_models: [
        'Trạm sạc nhanh DC siêu tốc cạnh trục đường giao thông chính',
        'Cụm sạc AC qua đêm tại bãi đỗ xe chung cư, cao ốc',
        'Tủ đổi pin xe máy điện thông minh 24/7 cho tài xế shipper',
        'Tổ hợp sạc điện kết hợp quán cafe nghỉ ngơi & rửa xe'
      ]
    },

    GIAT_SAY_TU_DONG: {
      id: 'GIAT_SAY_TU_DONG',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.08,
        m6_to_12: 0.14,
        y1_to_2: 0.25,
        over_2y: 0.53
      },
      fengshui_affinity: 'Hành Thủy cực vượng, cần đường ống thoát nước thông thoáng, tránh để Thủy uế phạm Huyền Quan.',
      suitable_models: [
        'Tiệm giặt sấy tự phục vụ quét mã QR thông minh 24/7',
        'Mô hình giặt sấy kết hợp quầy cafe nhỏ cho khách chờ đợi',
        'Dịch vụ giặt sấy kèm giao nhận tận phòng trọ, căn hộ',
        'Điểm giặt hấp cao cấp đồ vest, đầm dạ hội & chăn ga'
      ]
    },

    TRA_SUA_HOT_TREND: {
      id: 'TRA_SUA_HOT_TREND',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.19,
        m6_to_12: 0.25,
        y1_to_2: 0.28,
        over_2y: 0.28
      },
      fengshui_affinity: 'Khí Khẩu cổng trường học, tụ điểm vui chơi, cung Đào Hoa trợ Mộc sinh Hỏa tạo sức hút trẻ trung.',
      suitable_models: [
        'Kiosk trà sữa nhượng quyền chi phí tối ưu (Mixue model)',
        'Cửa hàng trà sữa cao cấp có không gian check-in đẹp',
        'Quầy trà trái cây tươi / Trà chanh giã tay đón xu hướng',
        'Mô hình xe đẩy / Kiosk takeaway giờ tan trường'
      ]
    },

    COWORKING_STUDY: {
      id: 'COWORKING_STUDY',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.11,
        m6_to_12: 0.17,
        y1_to_2: 0.26,
        over_2y: 0.46
      },
      fengshui_affinity: 'Văn Xương Tinh chiếu xạ, phòng ốc tĩnh khí tụ tài, ánh sáng hài hòa tăng cường tập trung.',
      suitable_models: [
        'Co-working space trọn gói có phòng họp & quầy pantry',
        'Study Cafe 24/7 chia buồng học yên tĩnh có ổ cắm riêng',
        'Văn phòng chia sẻ linh hoạt cho nhóm khởi nghiệp nhỏ',
        'Cafe làm việc chuyên biệt có gói thuê bàn theo giờ/ngày'
      ]
    },

    BAKERY_PASTRY: {
      id: 'BAKERY_PASTRY',
      group: 'emerging',
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
      survival_rates: {
        under_6m: 0.12,
        m6_to_12: 0.18,
        y1_to_2: 0.25,
        over_2y: 0.45
      },
      fengshui_affinity: 'Hỏa Thổ tương sinh (lò nướng sinh tài), mùi thơm dẫn dụ nhân khí, cửa tiệm tươi sáng ấm áp.',
      suitable_models: [
        'Bakery & Cafe phong cách Pháp / Hàn Quốc cao cấp',
        'Tiệm bánh mì thủ công Sourdough & bánh dinh dưỡng sạch',
        'Boutique bánh kem sinh nhật thiết kế theo yêu cầu riêng',
        'Kiosk bánh ngọt nướng nóng takeaway tiện lợi đón đầu ngõ'
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
     * Lấy danh sách toàn bộ các ngành nghề hỗ trợ
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

      // 4. KHỐI 3: ĐỘNG THÁI SINH - TỬ & TUỔI THỌ CỬA HÀNG
      // QUY TẮC TOÀN VẸN DỮ LIỆU: Tại Việt Nam hiện chưa có cơ sở dữ liệu quan trắc định kỳ cấp bán kính vi mô
      // về số lượng chính xác cửa hàng mở mới / rời bỏ hàng tháng. Tuyệt đối không tự suy số giả (missing data !== 1).
      const newlyAddedCount = null;
      const removedCount = null;
      const netGrowthCount = null;
      const netGrowthRatePct = null;
      const churnRatePct = null;

      // Dữ liệu tỷ lệ sống sót tham chiếu chuẩn hóa ngành toàn quốc (Benchmark)
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
      // 3. Survival Stability Score (0-100, 20%): Mức độ ổn định sinh tồn dựa trên tỷ lệ sống sót chuẩn ngành
      const survivalScore = Math.min(100, Math.round(survivalOver2YearsPct * 1.5 + 20));
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
  }

  return new IndustryEconomicEngine();
}));
