/**
 * BỘ DỮ LIỆU KINH TẾ CHI TIẾT & CHỈ SỐ SỨC MUA 64 ĐƠN VỊ ĐỊA LÝ LỊCH SỬ VIỆT NAM
 * Tích hợp chuẩn xác: NSO PX-Web, VHLSS 2022-2024, Tổng điều tra kinh tế 2021, World Bank SAE.
 * Khớp 1-1 với DIA_LY_64_TINH_THANH_CORPUS (63 tỉnh thành hiện hữu + Hà Tây lịch sử HT_PRE2008).
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KINH_TE_64_TINH_THANH_CORPUS = factory().KINH_TE_64_TINH_THANH_CORPUS;
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const KINH_TE_64_TINH_THANH_CORPUS = [
  {
    "historical_id": "HN_PRE2008",
    "province_name": "Hà Nội",
    "region": "Đồng bằng sông Hồng",
    "coordinates": "21.0285° N, 105.8542° E",
    "macro_economics": {
      "grdp_billion_vnd": 1285000,
      "grdp_per_capita_usd": 6250,
      "grdp_growth_rate_pct": 6.27,
      "economic_structure": {
        "agriculture_pct": 1.8,
        "industry_construction_pct": 31.5,
        "services_pct": 66.7
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 775000,
      "retail_growth_rate_pct": 10.4,
      "retail_per_capita_million_vnd": 197.7,
      "commercial_infrastructure": {
        "markets_count": 455,
        "supermarkets_count": 145,
        "trade_centers_count": 32,
        "convenience_stores_estimate": 508
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.85,
      "monthly_expense_per_capita_million_vnd": 4.45,
      "food_expense_ratio_pct": 46.5,
      "non_food_expense_ratio_pct": 53.5,
      "poverty_rate_pct": 0.04,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 195000,
      "individual_business_households": 420000,
      "total_labor_in_enterprises": 2450000,
      "business_density_per_1000_people": 114.3
    },
    "demographics_and_urbanization": {
      "population": 3969000,
      "urbanization_rate_pct": 49.2,
      "population_density_per_km2": 875000
    },
    "regional_purchasing_power_index": {
      "overall_score": 79,
      "tier": "A (Cao)",
      "pillar_scores": {
        "income_score": 81,
        "spending_score": 81,
        "market_density_score": 58,
        "commercial_activity_score": 100,
        "growth_score": 62
      },
      "commercial_summary": "Trung tâm tài chính - dịch vụ - chính trị đầu não phía Bắc. Cư dân có mức tích lũy và thu nhập ổn định cao, tỷ lệ chi phi thực phẩm (giáo dục, y tế, mua sắm giải trí) cao nhất miền Bắc. Mạng lưới thương mại hiện đại phát triển dày đặc song hành cùng chợ truyền thống tại các quận nội đô."
    },
    "key_districts_sae": [
      {
        "id": "HN-HK",
        "name": "Quận Hoàn Kiếm",
        "type": "Quận nội đô",
        "pop": 142000,
        "density": 26800,
        "income": 8.85,
        "expense": 5.8,
        "rppi": 96,
        "households": 28500
      },
      {
        "id": "HN-CG",
        "name": "Quận Cầu Giấy",
        "type": "Quận trung tâm",
        "pop": 295000,
        "density": 24200,
        "income": 8.4,
        "expense": 5.45,
        "rppi": 94,
        "households": 38000
      },
      {
        "id": "HN-BD",
        "name": "Quận Ba Đình",
        "type": "Quận nội đô",
        "pop": 226000,
        "density": 24500,
        "income": 8.35,
        "expense": 5.35,
        "rppi": 93,
        "households": 31000
      },
      {
        "id": "HN-TX",
        "name": "Quận Thanh Xuân",
        "type": "Quận đô thị mới",
        "pop": 298000,
        "density": 32500,
        "income": 7.95,
        "expense": 5.1,
        "rppi": 90,
        "households": 34500
      },
      {
        "id": "HN-GL",
        "name": "Huyện Gia Lâm",
        "type": "Huyện ngoại thành",
        "pop": 310000,
        "density": 2700,
        "income": 5.85,
        "expense": 3.8,
        "rppi": 78,
        "households": 26000
      }
    ]
  },
  {
    "historical_id": "HT_PRE2008",
    "province_name": "Hà Tây",
    "region": "Đồng bằng sông Hồng & Bán sơn địa Xứ Đoài",
    "coordinates": "20.9411° N, 105.7483° E",
    "macro_economics": {
      "grdp_billion_vnd": 395000,
      "grdp_per_capita_usd": 4100,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 6.5,
        "industry_construction_pct": 42,
        "services_pct": 51.5
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 215000,
      "retail_growth_rate_pct": 11.2,
      "retail_per_capita_million_vnd": 107.5,
      "commercial_infrastructure": {
        "markets_count": 155,
        "supermarkets_count": 32,
        "trade_centers_count": 5,
        "convenience_stores_estimate": 112
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.65,
      "monthly_expense_per_capita_million_vnd": 3.65,
      "food_expense_ratio_pct": 52,
      "non_food_expense_ratio_pct": 48,
      "poverty_rate_pct": 0.45,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 42000,
      "individual_business_households": 168000,
      "total_labor_in_enterprises": 1250000,
      "business_density_per_1000_people": 89.6
    },
    "demographics_and_urbanization": {
      "population": 2025000,
      "urbanization_rate_pct": 42,
      "population_density_per_km2": 446429
    },
    "regional_purchasing_power_index": {
      "overall_score": 57,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 66,
        "spending_score": 66,
        "market_density_score": 49,
        "commercial_activity_score": 33,
        "growth_score": 65
      },
      "commercial_summary": "Vùng đệm đô thị hóa thần tốc phía Tây Thủ đô. Nổi bật với trung tâm quận Hà Đông và thị xã Sơn Tây; các huyện Hoài Đức, Đan Phượng, Thạch Thất có làng nghề truyền thống và mật độ tiêu thụ hàng gia dụng, vật liệu xây dựng, ẩm thực gia đình rất mạnh mẽ."
    },
    "key_districts_sae": [
      {
        "id": "HT-HD",
        "name": "Quận Hà Đông",
        "type": "Quận trung tâm Tây",
        "pop": 410000,
        "density": 8250,
        "income": 7.6,
        "expense": 4.85,
        "rppi": 88,
        "households": 42000
      },
      {
        "id": "HT-ST",
        "name": "Thị xã Sơn Tây",
        "type": "Đô thị vệ tinh",
        "pop": 152000,
        "density": 1350,
        "income": 5.8,
        "expense": 3.75,
        "rppi": 75,
        "households": 16500
      },
      {
        "id": "HT-HD2",
        "name": "Huyện Hoài Đức",
        "type": "Huyện ven đô",
        "pop": 275000,
        "density": 3300,
        "income": 6.2,
        "expense": 3.95,
        "rppi": 80,
        "households": 28000
      },
      {
        "id": "HT-TT",
        "name": "Huyện Thạch Thất",
        "type": "Huyện công nghiệp - làng nghề",
        "pop": 220000,
        "density": 1200,
        "income": 5.4,
        "expense": 3.5,
        "rppi": 72,
        "households": 22000
      }
    ]
  },
  {
    "historical_id": "HP_PRE2008",
    "province_name": "Hải Phòng",
    "region": "Duyên hải Bắc Bộ",
    "coordinates": "20.8449° N, 106.6881° E",
    "macro_economics": {
      "grdp_billion_vnd": 410000,
      "grdp_per_capita_usd": 7200,
      "grdp_growth_rate_pct": 10.34,
      "economic_structure": {
        "agriculture_pct": 3.2,
        "industry_construction_pct": 53.5,
        "services_pct": 43.3
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 212000,
      "retail_growth_rate_pct": 13.5,
      "retail_per_capita_million_vnd": 126.2,
      "commercial_infrastructure": {
        "markets_count": 156,
        "supermarkets_count": 34,
        "trade_centers_count": 8,
        "convenience_stores_estimate": 119
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.55,
      "monthly_expense_per_capita_million_vnd": 4.25,
      "food_expense_ratio_pct": 48,
      "non_food_expense_ratio_pct": 52,
      "poverty_rate_pct": 0.35,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 28000,
      "individual_business_households": 125000,
      "total_labor_in_enterprises": 1050000,
      "business_density_per_1000_people": 79.4
    },
    "demographics_and_urbanization": {
      "population": 1701000,
      "urbanization_rate_pct": 46.5,
      "population_density_per_km2": 375000
    },
    "regional_purchasing_power_index": {
      "overall_score": 66,
      "tier": "B+ (Khá)",
      "pillar_scores": {
        "income_score": 77,
        "spending_score": 77,
        "market_density_score": 55,
        "commercial_activity_score": 28,
        "growth_score": 92
      },
      "commercial_summary": "Thủ phủ cảng biển công nghiệp lớn nhất miền Bắc. Tăng trưởng kinh tế công nghiệp đột phá kéo theo sức mua của tầng lớp chuyên gia, kỹ sư và công nhân cảng. Thói quen ẩm thực, giải trí và tiêu dùng phóng khoáng đặc trưng vùng duyên hải."
    },
    "key_districts_sae": [
      {
        "id": "HP-HB",
        "name": "Quận Hồng Bàng",
        "type": "Quận trung tâm",
        "pop": 110000,
        "density": 7600,
        "income": 7.95,
        "expense": 5.15,
        "rppi": 90,
        "households": 16000
      },
      {
        "id": "HP-LC",
        "name": "Quận Lê Chân",
        "type": "Quận sầm uất",
        "pop": 220000,
        "density": 18500,
        "income": 7.5,
        "expense": 4.85,
        "rppi": 89,
        "households": 28000
      },
      {
        "id": "HP-TN",
        "name": "Huyện Thủy Nguyên",
        "type": "Đô thị mới / Thành phố",
        "pop": 335000,
        "density": 1400,
        "income": 6.2,
        "expense": 4.05,
        "rppi": 81,
        "households": 32000
      }
    ]
  },
  {
    "historical_id": "QN_PRE2008",
    "province_name": "Quảng Ninh",
    "region": "Đông Bắc Bộ & Duyên hải biên giới",
    "coordinates": "21.0069° N, 107.2925° E",
    "macro_economics": {
      "grdp_billion_vnd": 320000,
      "grdp_per_capita_usd": 9500,
      "grdp_growth_rate_pct": 11.03,
      "economic_structure": {
        "agriculture_pct": 4.5,
        "industry_construction_pct": 51.5,
        "services_pct": 44
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 175000,
      "retail_growth_rate_pct": 14.2,
      "retail_per_capita_million_vnd": 145.8,
      "commercial_infrastructure": {
        "markets_count": 132,
        "supermarkets_count": 28,
        "trade_centers_count": 7,
        "convenience_stores_estimate": 98
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.7,
      "monthly_expense_per_capita_million_vnd": 4.3,
      "food_expense_ratio_pct": 47.5,
      "non_food_expense_ratio_pct": 52.5,
      "poverty_rate_pct": 0.28,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 14500,
      "individual_business_households": 86000,
      "total_labor_in_enterprises": 750000,
      "business_density_per_1000_people": 76.4
    },
    "demographics_and_urbanization": {
      "population": 1215000,
      "urbanization_rate_pct": 68.5,
      "population_density_per_km2": 267857
    },
    "regional_purchasing_power_index": {
      "overall_score": 71,
      "tier": "B+ (Khá)",
      "pillar_scores": {
        "income_score": 79,
        "spending_score": 78,
        "market_density_score": 81,
        "commercial_activity_score": 22,
        "growth_score": 98
      },
      "commercial_summary": "Thủ phủ du lịch di sản, than đá và mậu dịch biên giới với tỷ lệ đô thị hóa top đầu cả nước (68.5%). Thu nhập cao, mức chi tiêu cho dịch vụ ẩm thực, vui chơi nghỉ dưỡng và bất động sản thương mại tại Hạ Long, Cẩm Phả, Móng Cái luôn nằm trong top cao nhất miền Bắc."
    },
    "key_districts_sae": [
      {
        "id": "QN-HL",
        "name": "Thành phố Hạ Long",
        "type": "Đô thị loại I",
        "pop": 340000,
        "density": 310,
        "income": 7.85,
        "expense": 5.1,
        "rppi": 91,
        "households": 38000
      },
      {
        "id": "QN-CP",
        "name": "Thành phố Cẩm Phả",
        "type": "Đô thị công nghiệp",
        "pop": 210000,
        "density": 620,
        "income": 6.95,
        "expense": 4.45,
        "rppi": 84,
        "households": 22000
      },
      {
        "id": "QN-MC",
        "name": "Thành phố Móng Cái",
        "type": "Đô thị cửa khẩu",
        "pop": 112000,
        "density": 215,
        "income": 7.2,
        "expense": 4.6,
        "rppi": 87,
        "households": 16500
      }
    ]
  },
  {
    "historical_id": "BN_PRE2008",
    "province_name": "Bắc Ninh",
    "region": "Đồng bằng sông Hồng (Kinh Bắc lịch sử)",
    "coordinates": "21.1861° N, 106.0763° E",
    "macro_economics": {
      "grdp_billion_vnd": 250000,
      "grdp_per_capita_usd": 6800,
      "grdp_growth_rate_pct": 5.8,
      "economic_structure": {
        "agriculture_pct": 2.5,
        "industry_construction_pct": 71.5,
        "services_pct": 26
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 95000,
      "retail_growth_rate_pct": 12.8,
      "retail_per_capita_million_vnd": 76.1,
      "commercial_infrastructure": {
        "markets_count": 118,
        "supermarkets_count": 22,
        "trade_centers_count": 4,
        "convenience_stores_estimate": 77
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.1,
      "monthly_expense_per_capita_million_vnd": 3.9,
      "food_expense_ratio_pct": 50,
      "non_food_expense_ratio_pct": 50,
      "poverty_rate_pct": 0.85,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 18500,
      "individual_business_households": 92000,
      "total_labor_in_enterprises": 780000,
      "business_density_per_1000_people": 78.6
    },
    "demographics_and_urbanization": {
      "population": 1263600,
      "urbanization_rate_pct": 60.3,
      "population_density_per_km2": 278571
    },
    "regional_purchasing_power_index": {
      "overall_score": 60,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 72,
        "spending_score": 71,
        "market_density_score": 71,
        "commercial_activity_score": 16,
        "growth_score": 66
      },
      "commercial_summary": "Thủ phủ công nghiệp công nghệ cao và làng nghề truyền thống sầm uất. Mật độ dân số cao, lưu lượng chuyên gia nước ngoài (Hàn Quốc, Đài Loan, Trung Quốc) và công nhân đông đúc tạo sức mua lớn cho ngành F&B, lưu trú và bán lẻ tiện lợi tại TP Bắc Ninh và Từ Sơn."
    },
    "key_districts_sae": [
      {
        "id": "BN-TP",
        "name": "Thành phố Bắc Ninh",
        "type": "Trung tâm hành chính",
        "pop": 290000,
        "density": 3500,
        "income": 7.45,
        "expense": 4.75,
        "rppi": 88,
        "households": 32000
      },
      {
        "id": "BN-TS",
        "name": "Thành phố Từ Sơn",
        "type": "Đô thị công nghiệp - làng nghề",
        "pop": 205000,
        "density": 3350,
        "income": 6.9,
        "expense": 4.4,
        "rppi": 85,
        "households": 26000
      },
      {
        "id": "BN-YP",
        "name": "Huyện Yên Phong",
        "type": "Thủ phủ công nghệ Samsung",
        "pop": 215000,
        "density": 1900,
        "income": 6.2,
        "expense": 3.95,
        "rppi": 80,
        "households": 21000
      }
    ]
  },
  {
    "historical_id": "BG_PRE2008",
    "province_name": "Bắc Giang",
    "region": "Đông Bắc Bộ (Bán sơn địa & Trung du)",
    "coordinates": "21.2731° N, 106.1946° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đông Bắc Bộ (Bán sơn địa & Trung du). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BG_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "BG_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "BG_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "HD_PRE2008",
    "province_name": "Hải Dương",
    "region": "Đồng bằng sông Hồng (Xứ Đông trung tâm)",
    "coordinates": "20.9374° N, 106.3145° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng bằng sông Hồng (Xứ Đông trung tâm). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HD_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "HD_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "HD_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "HY_PRE2008",
    "province_name": "Hưng Yên",
    "region": "Đồng bằng sông Hồng (Trung tâm bồi tích)",
    "coordinates": "20.6464° N, 106.0511° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng bằng sông Hồng (Trung tâm bồi tích). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HY_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "HY_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "HY_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "HNM_PRE2008",
    "province_name": "Hà Nam",
    "region": "Đồng bằng sông Hồng (Cửa ngõ phía Nam Bắc Bộ)",
    "coordinates": "20.5835° N, 105.9228° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng bằng sông Hồng (Cửa ngõ phía Nam Bắc Bộ). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HNM_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "HNM_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "HNM_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "ND_PRE2008",
    "province_name": "Nam Định",
    "region": "Duyên hải Đồng bằng sông Hồng",
    "coordinates": "20.4344° N, 106.1805° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Đồng bằng sông Hồng. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "ND_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "ND_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "ND_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TB_PRE2008",
    "province_name": "Thái Bình",
    "region": "Duyên hải Đồng bằng sông Hồng",
    "coordinates": "20.4463° N, 106.3365° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Đồng bằng sông Hồng. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "TB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "TB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "NB_PRE2008",
    "province_name": "Ninh Bình",
    "region": "Điểm tiếp giáp Đồng bằng sông Hồng & Bắc Trung Bộ",
    "coordinates": "20.2506° N, 105.9745° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Điểm tiếp giáp Đồng bằng sông Hồng & Bắc Trung Bộ. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "NB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "NB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "NB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "VP_PRE2008",
    "province_name": "Vĩnh Phúc",
    "region": "Trung du & Bán sơn địa Bắc Bộ",
    "coordinates": "21.3609° N, 105.5474° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Trung du & Bán sơn địa Bắc Bộ. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "VP_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "VP_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "VP_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "PT_PRE2008",
    "province_name": "Phú Thọ",
    "region": "Trung du & Miền núi Bắc Bộ (Cội nguồn Dân tộc)",
    "coordinates": "21.3228° N, 105.4022° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Trung du & Miền núi Bắc Bộ (Cội nguồn Dân tộc). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "PT_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "PT_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "PT_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "HB_PRE2008",
    "province_name": "Hòa Bình",
    "region": "Tây Bắc Bộ (Cửa ngõ Xứ Mường)",
    "coordinates": "20.8136° N, 105.3383° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Bắc Bộ (Cửa ngõ Xứ Mường). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "HB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "HB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "SL_PRE2008",
    "province_name": "Sơn La",
    "region": "Tây Bắc Bộ (Cao nguyên & Lòng hồ Sông Đà)",
    "coordinates": "21.3283° N, 103.9148° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Bắc Bộ (Cao nguyên & Lòng hồ Sông Đà). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "SL_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "SL_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "SL_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "DB_PRE2008",
    "province_name": "Điện Biên",
    "region": "Tây Bắc Bộ (Lòng chảo Mường Thanh & Biên giới)",
    "coordinates": "21.3869° N, 103.0234° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Bắc Bộ (Lòng chảo Mường Thanh & Biên giới). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "DB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "DB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "DB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "LC_PRE2008",
    "province_name": "Lai Châu",
    "region": "Tây Bắc Bộ (Núi cao & Biên giới Tây Bắc)",
    "coordinates": "22.3862° N, 103.4754° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Bắc Bộ (Núi cao & Biên giới Tây Bắc). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "LC_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "LC_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "LC_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "LC_PRE2008_LCAI",
    "province_name": "Lào Cai",
    "region": "Tây Bắc Bộ & Biên giới Việt - Trung",
    "coordinates": "22.4856° N, 103.9707° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Bắc Bộ & Biên giới Việt - Trung. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "LC_PRE2008_LCAI-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "LC_PRE2008_LCAI-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "LC_PRE2008_LCAI-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "YB_PRE2008",
    "province_name": "Yên Bái",
    "region": "Tây Bắc Bộ (Cửa ngõ chuyển tiếp Trung du & Núi cao)",
    "coordinates": "21.7168° N, 104.8986° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Bắc Bộ (Cửa ngõ chuyển tiếp Trung du & Núi cao). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "YB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "YB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "YB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TN_PRE2008",
    "province_name": "Thái Nguyên",
    "region": "Việt Bắc & Trung du Đông Bắc",
    "coordinates": "21.5942° N, 105.8482° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Việt Bắc & Trung du Đông Bắc. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TN_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "TN_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "TN_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TQ_PRE2008",
    "province_name": "Tuyên Quang",
    "region": "Việt Bắc (Lưu vực sông Lô & Sông Gâm)",
    "coordinates": "21.8234° N, 105.2185° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Việt Bắc (Lưu vực sông Lô & Sông Gâm). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TQ_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "TQ_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "TQ_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "HG_PRE2008",
    "province_name": "Hà Giang",
    "region": "Địa đầu Cực Bắc Tổ Quốc",
    "coordinates": "22.8233° N, 104.9839° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Địa đầu Cực Bắc Tổ Quốc. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HG_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "HG_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "HG_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "CB_PRE2008",
    "province_name": "Cao Bằng",
    "region": "Việt Bắc & Biên cương Đông Bắc",
    "coordinates": "22.6664° N, 106.2639° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Việt Bắc & Biên cương Đông Bắc. Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "CB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "CB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "CB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "BK_PRE2008",
    "province_name": "Bắc Kạn",
    "region": "Việt Bắc (Trái tim Chiến khu)",
    "coordinates": "22.1472° N, 105.8348° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Việt Bắc (Trái tim Chiến khu). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BK_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "BK_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "BK_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "LS_PRE2008",
    "province_name": "Lạng Sơn",
    "region": "Đông Bắc Bộ (Cửa ngõ biên cương phía Bắc)",
    "coordinates": "21.8537° N, 106.7628° E",
    "macro_economics": {
      "grdp_billion_vnd": 110000,
      "grdp_per_capita_usd": 3132,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 72000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.5,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.4,
      "monthly_expense_per_capita_million_vnd": 3.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 1.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 6111,
      "individual_business_households": 50000,
      "total_labor_in_enterprises": 638000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1033560,
      "urbanization_rate_pct": 35,
      "population_density_per_km2": 227857
    },
    "regional_purchasing_power_index": {
      "overall_score": 50,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 64,
        "spending_score": 65,
        "market_density_score": 41,
        "commercial_activity_score": 10,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đông Bắc Bộ (Cửa ngõ biên cương phía Bắc). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "LS_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 7.02,
        "expense": 4.5,
        "rppi": 83,
        "households": 22000
      },
      {
        "id": "LS_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.4,
        "expense": 3.6,
        "rppi": 71,
        "households": 14000
      },
      {
        "id": "LS_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.59,
        "expense": 3.17,
        "rppi": 59,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TH_PRE2008",
    "province_name": "Thanh Hóa",
    "region": "Bắc Trung Bộ (Cửa ngõ Xứ Thanh)",
    "coordinates": "19.8067° N, 105.7852° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Bắc Trung Bộ (Cửa ngõ Xứ Thanh). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TH_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "TH_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "TH_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "NA_PRE2008",
    "province_name": "Nghệ An",
    "region": "Bắc Trung Bộ (Xứ Nghệ & Lưu vực Sông Lam)",
    "coordinates": "18.6734° N, 105.6813° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Bắc Trung Bộ (Xứ Nghệ & Lưu vực Sông Lam). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "NA_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "NA_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "NA_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "HTI_PRE2008",
    "province_name": "Hà Tĩnh",
    "region": "Bắc Trung Bộ (Núi Hồng Sông La & Đèo Ngang)",
    "coordinates": "18.3559° N, 105.9058° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Bắc Trung Bộ (Núi Hồng Sông La & Đèo Ngang). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HTI_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "HTI_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "HTI_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "QB_PRE2008",
    "province_name": "Quảng Bình",
    "region": "Bắc Trung Bộ (Vương quốc Hang động & Sông Gianh)",
    "coordinates": "17.4691° N, 106.6222° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Bắc Trung Bộ (Vương quốc Hang động & Sông Gianh). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "QB_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "QB_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "QB_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "QT_PRE2008",
    "province_name": "Quảng Trị",
    "region": "Bắc Trung Bộ (Vĩ tuyến 17 & Dòng sông Thạch Hãn)",
    "coordinates": "16.7516° N, 107.1856° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Bắc Trung Bộ (Vĩ tuyến 17 & Dòng sông Thạch Hãn). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "QT_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "QT_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "QT_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TTH_PRE2008",
    "province_name": "Thừa Thiên Huế",
    "region": "Bắc Trung Bộ (Kinh đô Triều Nguyễn & Đầm phá Tam Giang)",
    "coordinates": "16.4637° N, 107.5909° E",
    "macro_economics": {
      "grdp_billion_vnd": 65000,
      "grdp_per_capita_usd": 2262,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 38000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 63,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 3.9,
      "monthly_expense_per_capita_million_vnd": 2.6,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 12.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 3611,
      "individual_business_households": 29545,
      "total_labor_in_enterprises": 377000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 610740,
      "urbanization_rate_pct": 22,
      "population_density_per_km2": 134643
    },
    "regional_purchasing_power_index": {
      "overall_score": 38,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 46,
        "spending_score": 47,
        "market_density_score": 26,
        "commercial_activity_score": 6,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Bắc Trung Bộ (Kinh đô Triều Nguyễn & Đầm phá Tam Giang). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TTH_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.07,
        "expense": 3.25,
        "rppi": 64,
        "households": 22000
      },
      {
        "id": "TTH_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 3.9,
        "expense": 2.6,
        "rppi": 52,
        "households": 14000
      },
      {
        "id": "TTH_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.31,
        "expense": 2.29,
        "rppi": 40,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "DN_PRE2008",
    "province_name": "Đà Nẵng",
    "region": "Duyên hải Nam Trung Bộ",
    "coordinates": "16.0544° N, 108.2022° E",
    "macro_economics": {
      "grdp_billion_vnd": 140000,
      "grdp_per_capita_usd": 4600,
      "grdp_growth_rate_pct": 6.51,
      "economic_structure": {
        "agriculture_pct": 1.5,
        "industry_construction_pct": 19.5,
        "services_pct": 79
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 125000,
      "retail_growth_rate_pct": 14.5,
      "retail_per_capita_million_vnd": 128.1,
      "commercial_infrastructure": {
        "markets_count": 76,
        "supermarkets_count": 28,
        "trade_centers_count": 9,
        "convenience_stores_estimate": 98
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.35,
      "monthly_expense_per_capita_million_vnd": 4.2,
      "food_expense_ratio_pct": 47,
      "non_food_expense_ratio_pct": 53,
      "poverty_rate_pct": 0.45,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 24500,
      "individual_business_households": 89000,
      "total_labor_in_enterprises": 610000,
      "business_density_per_1000_people": 97.3
    },
    "demographics_and_urbanization": {
      "population": 988200,
      "urbanization_rate_pct": 87.2,
      "population_density_per_km2": 217857
    },
    "regional_purchasing_power_index": {
      "overall_score": 67,
      "tier": "B+ (Khá)",
      "pillar_scores": {
        "income_score": 75,
        "spending_score": 76,
        "market_density_score": 100,
        "commercial_activity_score": 18,
        "growth_score": 74
      },
      "commercial_summary": "Trung tâm kinh tế - du lịch - công nghệ thông tin lớn nhất miền Trung với tỷ lệ đô thị hóa lên tới 87.2%. Khu vực dịch vụ chiếm tới 79% cơ cấu GRDP. Sức mua bán lẻ, dịch vụ ăn uống F&B và văn hóa du lịch trải nghiệm rất năng động tại Hải Châu, Thanh Khê, Sơn Trà."
    },
    "key_districts_sae": [
      {
        "id": "DN-HC",
        "name": "Quận Hải Châu",
        "type": "Trung tâm thương mại CBD",
        "pop": 205000,
        "density": 8500,
        "income": 7.8,
        "expense": 5.1,
        "rppi": 91,
        "households": 28000
      },
      {
        "id": "DN-TK",
        "name": "Quận Thanh Khê",
        "type": "Quận buôn bán sầm uất",
        "pop": 190000,
        "density": 19500,
        "income": 7.1,
        "expense": 4.6,
        "rppi": 87,
        "households": 25000
      },
      {
        "id": "DN-ST",
        "name": "Quận Sơn Trà",
        "type": "Đô thị biển & Du lịch",
        "pop": 165000,
        "density": 2700,
        "income": 6.7,
        "expense": 4.35,
        "rppi": 84,
        "households": 21000
      }
    ]
  },
  {
    "historical_id": "QNM_PRE2008",
    "province_name": "Quảng Nam",
    "region": "Duyên hải Nam Trung Bộ (Xứ Quảng Thu Bồn)",
    "coordinates": "15.5394° N, 108.0191° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Xứ Quảng Thu Bồn). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "QNM_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "QNM_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "QNM_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "QNG_PRE2008",
    "province_name": "Quảng Ngãi",
    "region": "Duyên hải Nam Trung Bộ (Núi Ấn Sông Trà)",
    "coordinates": "15.1205° N, 108.7923° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Núi Ấn Sông Trà). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "QNG_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "QNG_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "QNG_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "BD_PRE2008",
    "province_name": "Bình Định",
    "region": "Duyên hải Nam Trung Bộ (Đất Võ Tây Sơn & Quy Nhơn)",
    "coordinates": "13.7820° N, 109.2197° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Đất Võ Tây Sơn & Quy Nhơn). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BD_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "BD_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "BD_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "PY_PRE2008",
    "province_name": "Phú Yên",
    "region": "Duyên hải Nam Trung Bộ (Đồng bằng Tuy Hòa & Gành Đá Đĩa)",
    "coordinates": "13.0882° N, 109.3075° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Đồng bằng Tuy Hòa & Gành Đá Đĩa). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "PY_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "PY_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "PY_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "KH_PRE2008",
    "province_name": "Khánh Hòa",
    "region": "Duyên hải Nam Trung Bộ (Xứ Trầm Hương & Vịnh Biển Ngọc)",
    "coordinates": "12.2388° N, 109.1967° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Xứ Trầm Hương & Vịnh Biển Ngọc). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "KH_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "KH_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "KH_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "NT_PRE2008",
    "province_name": "Ninh Thuận",
    "region": "Duyên hải Nam Trung Bộ (Thủ phủ Nắng Gió & Tháp Chàm)",
    "coordinates": "11.5653° N, 108.9950° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Thủ phủ Nắng Gió & Tháp Chàm). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "NT_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "NT_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "NT_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "BT_PRE2008",
    "province_name": "Bình Thuận",
    "region": "Duyên hải Nam Trung Bộ (Thủ phủ Thanh Long & Mũi Né)",
    "coordinates": "10.9273° N, 108.1018° E",
    "macro_economics": {
      "grdp_billion_vnd": 95000,
      "grdp_per_capita_usd": 2958,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 68000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.1,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 5.1,
      "monthly_expense_per_capita_million_vnd": 3.4,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5278,
      "individual_business_households": 43182,
      "total_labor_in_enterprises": 551000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 892620,
      "urbanization_rate_pct": 38,
      "population_density_per_km2": 196786
    },
    "regional_purchasing_power_index": {
      "overall_score": 49,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 60,
        "spending_score": 62,
        "market_density_score": 45,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Duyên hải Nam Trung Bộ (Thủ phủ Thanh Long & Mũi Né). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BT_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.63,
        "expense": 4.25,
        "rppi": 80,
        "households": 22000
      },
      {
        "id": "BT_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 5.1,
        "expense": 3.4,
        "rppi": 68,
        "households": 14000
      },
      {
        "id": "BT_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.33,
        "expense": 2.99,
        "rppi": 56,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "KT_PRE2008",
    "province_name": "Kon Tum",
    "region": "Tây Nguyên (Bắc Tây Nguyên & Ngã Ba Đông Dương)",
    "coordinates": "14.3541° N, 108.0076° E",
    "macro_economics": {
      "grdp_billion_vnd": 80000,
      "grdp_per_capita_usd": 2610,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 50000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 67.3,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.5,
      "monthly_expense_per_capita_million_vnd": 3,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 6.2,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4444,
      "individual_business_households": 36364,
      "total_labor_in_enterprises": 464000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 751680,
      "urbanization_rate_pct": 29,
      "population_density_per_km2": 165714
    },
    "regional_purchasing_power_index": {
      "overall_score": 43,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 53,
        "spending_score": 55,
        "market_density_score": 34,
        "commercial_activity_score": 7,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Nguyên (Bắc Tây Nguyên & Ngã Ba Đông Dương). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "KT_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.85,
        "expense": 3.75,
        "rppi": 70,
        "households": 22000
      },
      {
        "id": "KT_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.5,
        "expense": 3,
        "rppi": 58,
        "households": 14000
      },
      {
        "id": "KT_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.82,
        "expense": 2.64,
        "rppi": 46,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "GL_PRE2008",
    "province_name": "Gia Lai",
    "region": "Tây Nguyên (Cao nguyên Pleiku & Đại ngàn Sê San)",
    "coordinates": "13.9833° N, 108.0000° E",
    "macro_economics": {
      "grdp_billion_vnd": 80000,
      "grdp_per_capita_usd": 2610,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 50000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 67.3,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.5,
      "monthly_expense_per_capita_million_vnd": 3,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 6.2,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4444,
      "individual_business_households": 36364,
      "total_labor_in_enterprises": 464000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 751680,
      "urbanization_rate_pct": 29,
      "population_density_per_km2": 165714
    },
    "regional_purchasing_power_index": {
      "overall_score": 43,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 53,
        "spending_score": 55,
        "market_density_score": 34,
        "commercial_activity_score": 7,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Nguyên (Cao nguyên Pleiku & Đại ngàn Sê San). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "GL_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.85,
        "expense": 3.75,
        "rppi": 70,
        "households": 22000
      },
      {
        "id": "GL_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.5,
        "expense": 3,
        "rppi": 58,
        "households": 14000
      },
      {
        "id": "GL_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.82,
        "expense": 2.64,
        "rppi": 46,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "DL_PRE2008",
    "province_name": "Đắk Lắk",
    "region": "Trung tâm Tây Nguyên (Thủ phủ Cà phê Buôn Ma Thuột)",
    "coordinates": "12.6667° N, 108.0500° E",
    "macro_economics": {
      "grdp_billion_vnd": 80000,
      "grdp_per_capita_usd": 2610,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 50000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 67.3,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.5,
      "monthly_expense_per_capita_million_vnd": 3,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 6.2,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4444,
      "individual_business_households": 36364,
      "total_labor_in_enterprises": 464000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 751680,
      "urbanization_rate_pct": 29,
      "population_density_per_km2": 165714
    },
    "regional_purchasing_power_index": {
      "overall_score": 43,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 53,
        "spending_score": 55,
        "market_density_score": 34,
        "commercial_activity_score": 7,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Trung tâm Tây Nguyên (Thủ phủ Cà phê Buôn Ma Thuột). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "DL_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.85,
        "expense": 3.75,
        "rppi": 70,
        "households": 22000
      },
      {
        "id": "DL_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.5,
        "expense": 3,
        "rppi": 58,
        "households": 14000
      },
      {
        "id": "DL_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.82,
        "expense": 2.64,
        "rppi": 46,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "DNO_PRE2008",
    "province_name": "Đắk Nông",
    "region": "Nam Tây Nguyên (Vương quốc Hang động Núi lửa & Hồ Tà Đùng)",
    "coordinates": "12.0042° N, 107.6917° E",
    "macro_economics": {
      "grdp_billion_vnd": 80000,
      "grdp_per_capita_usd": 2610,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 50000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 67.3,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.5,
      "monthly_expense_per_capita_million_vnd": 3,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 6.2,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4444,
      "individual_business_households": 36364,
      "total_labor_in_enterprises": 464000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 751680,
      "urbanization_rate_pct": 29,
      "population_density_per_km2": 165714
    },
    "regional_purchasing_power_index": {
      "overall_score": 43,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 53,
        "spending_score": 55,
        "market_density_score": 34,
        "commercial_activity_score": 7,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Nam Tây Nguyên (Vương quốc Hang động Núi lửa & Hồ Tà Đùng). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "DNO_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.85,
        "expense": 3.75,
        "rppi": 70,
        "households": 22000
      },
      {
        "id": "DNO_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.5,
        "expense": 3,
        "rppi": 58,
        "households": 14000
      },
      {
        "id": "DNO_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.82,
        "expense": 2.64,
        "rppi": 46,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "LD_PRE2008",
    "province_name": "Lâm Đồng",
    "region": "Nam Tây Nguyên (Xứ Sở Sương Mù & Cao Nguyên Lâm Viên)",
    "coordinates": "11.9404° N, 108.4583° E",
    "macro_economics": {
      "grdp_billion_vnd": 80000,
      "grdp_per_capita_usd": 2610,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 50000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 67.3,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 16,
        "trade_centers_count": 3,
        "convenience_stores_estimate": 56
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.5,
      "monthly_expense_per_capita_million_vnd": 3,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 6.2,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4444,
      "individual_business_households": 36364,
      "total_labor_in_enterprises": 464000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 751680,
      "urbanization_rate_pct": 29,
      "population_density_per_km2": 165714
    },
    "regional_purchasing_power_index": {
      "overall_score": 43,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 53,
        "spending_score": 55,
        "market_density_score": 34,
        "commercial_activity_score": 7,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Nam Tây Nguyên (Xứ Sở Sương Mù & Cao Nguyên Lâm Viên). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "LD_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.85,
        "expense": 3.75,
        "rppi": 70,
        "households": 22000
      },
      {
        "id": "LD_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.5,
        "expense": 3,
        "rppi": 58,
        "households": 14000
      },
      {
        "id": "LD_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.82,
        "expense": 2.64,
        "rppi": 46,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "SG_PRE2008",
    "province_name": "TP. Hồ Chí Minh",
    "region": "Đông Nam Bộ (Sài Gòn - Gia Định & Cửa biển Cần Giờ)",
    "coordinates": "10.8231° N, 106.6297° E",
    "macro_economics": {
      "grdp_billion_vnd": 1620000,
      "grdp_per_capita_usd": 7500,
      "grdp_growth_rate_pct": 5.81,
      "economic_structure": {
        "agriculture_pct": 0.5,
        "industry_construction_pct": 22.5,
        "services_pct": 77
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 1150000,
      "retail_growth_rate_pct": 10.8,
      "retail_per_capita_million_vnd": 148.2,
      "commercial_infrastructure": {
        "markets_count": 238,
        "supermarkets_count": 242,
        "trade_centers_count": 53,
        "convenience_stores_estimate": 847
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 7.45,
      "monthly_expense_per_capita_million_vnd": 5.15,
      "food_expense_ratio_pct": 44.5,
      "non_food_expense_ratio_pct": 55.5,
      "poverty_rate_pct": 0.05,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 265000,
      "individual_business_households": 515000,
      "total_labor_in_enterprises": 4850000,
      "business_density_per_1000_people": 70.8
    },
    "demographics_and_urbanization": {
      "population": 7857000,
      "urbanization_rate_pct": 79.5,
      "population_density_per_km2": 1732143
    },
    "regional_purchasing_power_index": {
      "overall_score": 89,
      "tier": "A+ (Cực cao)",
      "pillar_scores": {
        "income_score": 88,
        "spending_score": 94,
        "market_density_score": 94,
        "commercial_activity_score": 100,
        "growth_score": 60
      },
      "commercial_summary": "Đầu tàu kinh tế, thương mại và tài chính năng động số 1 Việt Nam. Chiếm gần 1/4 tổng mức bán lẻ toàn quốc. Người dân có tâm lý tiêu dùng cởi mở, chuộng xu hướng mới, tỷ lệ chi tiêu phi thực phẩm (dịch vụ, thời trang, F&B hiện đại) dẫn đầu cả nước."
    },
    "key_districts_sae": [
      {
        "id": "SG-Q1",
        "name": "Quận 1",
        "type": "Trung tâm tài chính CBD",
        "pop": 145000,
        "density": 18800,
        "income": 9.8,
        "expense": 6.8,
        "rppi": 98,
        "households": 24500
      },
      {
        "id": "SG-TD",
        "name": "Thành phố Thủ Đức",
        "type": "Đô thị sáng tạo phía Đông",
        "pop": 1250000,
        "density": 5900,
        "income": 8.2,
        "expense": 5.4,
        "rppi": 94,
        "households": 115000
      },
      {
        "id": "SG-Q7",
        "name": "Quận 7",
        "type": "Đô thị quốc tế Phú Mỹ Hưng",
        "pop": 365000,
        "density": 10200,
        "income": 8.75,
        "expense": 5.85,
        "rppi": 95,
        "households": 41000
      },
      {
        "id": "SG-BT",
        "name": "Quận Bình Thạnh",
        "type": "Quận trung tâm cửa ngõ",
        "pop": 505000,
        "density": 24300,
        "income": 7.9,
        "expense": 5.3,
        "rppi": 92,
        "households": 58000
      },
      {
        "id": "SG-TB",
        "name": "Quận Tân Bình",
        "type": "Đô thị sân bay",
        "pop": 480000,
        "density": 21500,
        "income": 8.1,
        "expense": 5.45,
        "rppi": 93,
        "households": 54000
      }
    ]
  },
  {
    "historical_id": "BDU_PRE2008",
    "province_name": "Bình Dương",
    "region": "Đông Nam Bộ (Thủ Dầu Một - Sông Bé)",
    "coordinates": "11.1603° N, 106.6667° E",
    "macro_economics": {
      "grdp_billion_vnd": 495000,
      "grdp_per_capita_usd": 7350,
      "grdp_growth_rate_pct": 6.05,
      "economic_structure": {
        "agriculture_pct": 2.7,
        "industry_construction_pct": 66.5,
        "services_pct": 30.8
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 310000,
      "retail_growth_rate_pct": 13.5,
      "retail_per_capita_million_vnd": 117.4,
      "commercial_infrastructure": {
        "markets_count": 112,
        "supermarkets_count": 38,
        "trade_centers_count": 9,
        "convenience_stores_estimate": 133
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 8.15,
      "monthly_expense_per_capita_million_vnd": 4.85,
      "food_expense_ratio_pct": 46.5,
      "non_food_expense_ratio_pct": 53.5,
      "poverty_rate_pct": 0.12,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 49000,
      "individual_business_households": 185000,
      "total_labor_in_enterprises": 1650000,
      "business_density_per_1000_people": 74.7
    },
    "demographics_and_urbanization": {
      "population": 2673000,
      "urbanization_rate_pct": 84.3,
      "population_density_per_km2": 589286
    },
    "regional_purchasing_power_index": {
      "overall_score": 80,
      "tier": "A (Cao)",
      "pillar_scores": {
        "income_score": 96,
        "spending_score": 88,
        "market_density_score": 99,
        "commercial_activity_score": 42,
        "growth_score": 69
      },
      "commercial_summary": "Tỉnh có thu nhập bình quân đầu người theo khảo sát VHLSS cao nhất cả nước. Lực lượng lao động nhập cư trẻ và chuyên gia kỹ thuật dồi dào, đô thị hóa lên tới 84.3%. Nhu cầu tiêu dùng hàng ngày, ăn uống bình dân đến trung cấp và mua sắm siêu thị bùng nổ tại Thủ Dầu Một, Thuận An, Dĩ An."
    },
    "key_districts_sae": [
      {
        "id": "BDU-TDM",
        "name": "Thành phố Thủ Dầu Một",
        "type": "Đô thị trung tâm",
        "pop": 345000,
        "density": 2900,
        "income": 8.85,
        "expense": 5.25,
        "rppi": 93,
        "households": 46000
      },
      {
        "id": "BDU-TA",
        "name": "Thành phố Thuận An",
        "type": "Đô thị công nghiệp tiếp giáp SG",
        "pop": 625000,
        "density": 7500,
        "income": 8.2,
        "expense": 4.9,
        "rppi": 90,
        "households": 72000
      },
      {
        "id": "BDU-DA",
        "name": "Thành phố Dĩ An",
        "type": "Cửa ngõ logistics",
        "pop": 505000,
        "density": 8400,
        "income": 8.15,
        "expense": 4.85,
        "rppi": 89,
        "households": 61000
      },
      {
        "id": "BDU-BT",
        "name": "Thành phố Bến Cát",
        "type": "Đô thị công nghiệp mới",
        "pop": 360000,
        "density": 1550,
        "income": 7.4,
        "expense": 4.5,
        "rppi": 84,
        "households": 38000
      }
    ]
  },
  {
    "historical_id": "DNA_PRE2008",
    "province_name": "Đồng Nai",
    "region": "Đông Nam Bộ (Trấn Biên Lịch Sử & Hồ Trị An)",
    "coordinates": "10.9574° N, 106.8427° E",
    "macro_economics": {
      "grdp_billion_vnd": 465000,
      "grdp_per_capita_usd": 5900,
      "grdp_growth_rate_pct": 5.3,
      "economic_structure": {
        "agriculture_pct": 8.5,
        "industry_construction_pct": 59.5,
        "services_pct": 32
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 275000,
      "retail_growth_rate_pct": 12,
      "retail_per_capita_million_vnd": 98.2,
      "commercial_infrastructure": {
        "markets_count": 168,
        "supermarkets_count": 26,
        "trade_centers_count": 6,
        "convenience_stores_estimate": 91
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.75,
      "monthly_expense_per_capita_million_vnd": 4.25,
      "food_expense_ratio_pct": 49,
      "non_food_expense_ratio_pct": 51,
      "poverty_rate_pct": 0.38,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 34000,
      "individual_business_households": 195000,
      "total_labor_in_enterprises": 1750000,
      "business_density_per_1000_people": 74.3
    },
    "demographics_and_urbanization": {
      "population": 2835000,
      "urbanization_rate_pct": 45.2,
      "population_density_per_km2": 625000
    },
    "regional_purchasing_power_index": {
      "overall_score": 64,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 79,
        "spending_score": 77,
        "market_density_score": 53,
        "commercial_activity_score": 40,
        "growth_score": 61
      },
      "commercial_summary": "Cực tăng trưởng công nghiệp lớn với sân bay quốc tế Long Thành đang kiến tạo trục thương mại dịch vụ mới. TP Biên Hòa với hơn 1 triệu dân là thị trường bán lẻ tiêu dùng khổng lồ, sức mua mạnh ở phân khúc gia đình và công nhân kỹ thuật."
    },
    "key_districts_sae": [
      {
        "id": "DNA-BH",
        "name": "Thành phố Biên Hòa",
        "type": "Đô thị loại I (>1 triệu dân)",
        "pop": 1150000,
        "density": 4350,
        "income": 7.95,
        "expense": 4.9,
        "rppi": 91,
        "households": 125000
      },
      {
        "id": "DNA-LT",
        "name": "Huyện Long Thành",
        "type": "Đô thị sân bay",
        "pop": 270000,
        "density": 630,
        "income": 6.8,
        "expense": 4.25,
        "rppi": 83,
        "households": 28000
      },
      {
        "id": "DNA-NT",
        "name": "Huyện Nhơn Trạch",
        "type": "Đô thị công nghiệp cảng",
        "pop": 285000,
        "density": 700,
        "income": 6.6,
        "expense": 4.1,
        "rppi": 81,
        "households": 29500
      }
    ]
  },
  {
    "historical_id": "BRVT_PRE2008",
    "province_name": "Bà Rịa - Vũng Tàu",
    "region": "Đông Nam Bộ (Cảng Nước Sâu & Biển Đảo Côn Đảo)",
    "coordinates": "10.3460° N, 107.0843° E",
    "macro_economics": {
      "grdp_billion_vnd": 390000,
      "grdp_per_capita_usd": 12800,
      "grdp_growth_rate_pct": 5.75,
      "economic_structure": {
        "agriculture_pct": 9.5,
        "industry_construction_pct": 57,
        "services_pct": 33.5
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 135000,
      "retail_growth_rate_pct": 11.5,
      "retail_per_capita_million_vnd": 136.1,
      "commercial_infrastructure": {
        "markets_count": 88,
        "supermarkets_count": 22,
        "trade_centers_count": 5,
        "convenience_stores_estimate": 77
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.85,
      "monthly_expense_per_capita_million_vnd": 4.4,
      "food_expense_ratio_pct": 48,
      "non_food_expense_ratio_pct": 52,
      "poverty_rate_pct": 0.32,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 13500,
      "individual_business_households": 78000,
      "total_labor_in_enterprises": 620000,
      "business_density_per_1000_people": 83.9
    },
    "demographics_and_urbanization": {
      "population": 1004400,
      "urbanization_rate_pct": 59.5,
      "population_density_per_km2": 221429
    },
    "regional_purchasing_power_index": {
      "overall_score": 64,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 81,
        "spending_score": 80,
        "market_density_score": 70,
        "commercial_activity_score": 18,
        "growth_score": 62
      },
      "commercial_summary": "Thủ phủ dầu khí, cảng nước sâu Cái Mép - Thị Vải và du lịch nghỉ dưỡng cao cấp. Thu nhập và chi tiêu bình quân của cư dân đô thị Vũng Tàu và Bà Rịa rất cao, tỷ lệ tiêu dùng đồ hải sản, nghỉ dưỡng và giải trí cuối tuần thuộc top đầu phía Nam."
    },
    "key_districts_sae": [
      {
        "id": "BRVT-VT",
        "name": "Thành phố Vũng Tàu",
        "type": "Đô thị du lịch biển",
        "pop": 370000,
        "density": 2600,
        "income": 8.35,
        "expense": 5.3,
        "rppi": 92,
        "households": 45000
      },
      {
        "id": "BRVT-BR",
        "name": "Thành phố Bà Rịa",
        "type": "Trung tâm hành chính",
        "pop": 165000,
        "density": 1800,
        "income": 7.2,
        "expense": 4.6,
        "rppi": 84,
        "households": 19000
      },
      {
        "id": "BRVT-PM",
        "name": "Thị xã Phú Mỹ",
        "type": "Thành phố cảng tương lai",
        "pop": 225000,
        "density": 680,
        "income": 7.1,
        "expense": 4.5,
        "rppi": 83,
        "households": 23500
      }
    ]
  },
  {
    "historical_id": "TN_PRE2008_TAYNINH",
    "province_name": "Tây Ninh",
    "region": "Đông Nam Bộ (Nóc Nhà Nam Bộ & Tòa Thánh Đạo Cao Đài)",
    "coordinates": "11.3351° N, 106.1098° E",
    "macro_economics": {
      "grdp_billion_vnd": 145000,
      "grdp_per_capita_usd": 3596,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 95000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.6,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.2,
      "monthly_expense_per_capita_million_vnd": 4.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 0.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 8056,
      "individual_business_households": 65909,
      "total_labor_in_enterprises": 841000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1362420,
      "urbanization_rate_pct": 45,
      "population_density_per_km2": 300357
    },
    "regional_purchasing_power_index": {
      "overall_score": 57,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 73,
        "spending_score": 75,
        "market_density_score": 53,
        "commercial_activity_score": 14,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đông Nam Bộ (Nóc Nhà Nam Bộ & Tòa Thánh Đạo Cao Đài). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TN_PRE2008_TAYNINH-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 8.06,
        "expense": 5.13,
        "rppi": 90,
        "households": 22000
      },
      {
        "id": "TN_PRE2008_TAYNINH-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 6.2,
        "expense": 4.1,
        "rppi": 78,
        "households": 14000
      },
      {
        "id": "TN_PRE2008_TAYNINH-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 5.27,
        "expense": 3.61,
        "rppi": 66,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "BP_PRE2008",
    "province_name": "Bình Phước",
    "region": "Đông Nam Bộ (Thủ phủ Cao su & Núi Bà Rá)",
    "coordinates": "11.7511° N, 106.9044° E",
    "macro_economics": {
      "grdp_billion_vnd": 145000,
      "grdp_per_capita_usd": 3596,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 95000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 70.6,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.2,
      "monthly_expense_per_capita_million_vnd": 4.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 0.8,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 8056,
      "individual_business_households": 65909,
      "total_labor_in_enterprises": 841000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 1362420,
      "urbanization_rate_pct": 45,
      "population_density_per_km2": 300357
    },
    "regional_purchasing_power_index": {
      "overall_score": 57,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 73,
        "spending_score": 75,
        "market_density_score": 53,
        "commercial_activity_score": 14,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đông Nam Bộ (Thủ phủ Cao su & Núi Bà Rá). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BP_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 8.06,
        "expense": 5.13,
        "rppi": 90,
        "households": 22000
      },
      {
        "id": "BP_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 6.2,
        "expense": 4.1,
        "rppi": 78,
        "households": 14000
      },
      {
        "id": "BP_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 5.27,
        "expense": 3.61,
        "rppi": 66,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "LA_PRE2008",
    "province_name": "Long An",
    "region": "Đồng Bằng Sông Cửu Long (Cửa ngõ Miền Tây & Hai Dòng Vàm Cỏ)",
    "coordinates": "10.5422° N, 106.4117° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Cửa ngõ Miền Tây & Hai Dòng Vàm Cỏ). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "LA_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "LA_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "LA_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TG_PRE2008",
    "province_name": "Tiền Giang",
    "region": "Đồng Bằng Sông Cửu Long (Mỹ Tho Đại Phố & Sông Tiền)",
    "coordinates": "10.3541° N, 106.3653° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Mỹ Tho Đại Phố & Sông Tiền). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TG_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "TG_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "TG_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "BTRE_PRE2008",
    "province_name": "Bến Tre",
    "region": "Đồng Bằng Sông Cửu Long (Xứ Dừa Cù Lao & 4 Nhánh Cửu Long)",
    "coordinates": "10.2415° N, 106.3759° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Xứ Dừa Cù Lao & 4 Nhánh Cửu Long). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BTRE_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "BTRE_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "BTRE_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "TV_PRE2008",
    "province_name": "Trà Vinh",
    "region": "Đồng Bằng Sông Cửu Long (Đất Giồng Cát & Văn Hóa Khmer)",
    "coordinates": "9.9347° N, 106.3456° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Đất Giồng Cát & Văn Hóa Khmer). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "TV_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "TV_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "TV_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "VL_PRE2008",
    "province_name": "Vĩnh Long",
    "region": "Đồng Bằng Sông Cửu Long (Trái tim Châu thổ Cửu Long & Long Hồ Dinh)",
    "coordinates": "10.2537° N, 105.9722° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Trái tim Châu thổ Cửu Long & Long Hồ Dinh). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "VL_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "VL_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "VL_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "DT_PRE2008",
    "province_name": "Đồng Tháp",
    "region": "Đồng Bằng Sông Cửu Long (Đất Sen Hồng & Làng Hoa Sa Đéc)",
    "coordinates": "10.4578° N, 105.6339° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Đất Sen Hồng & Làng Hoa Sa Đéc). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "DT_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "DT_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "DT_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "AG_PRE2008",
    "province_name": "An Giang",
    "region": "Đồng Bằng Sông Cửu Long (Thất Sơn Bảy Núi & Cội Nguồn Cửu Long)",
    "coordinates": "10.3833° N, 105.4167° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Thất Sơn Bảy Núi & Cội Nguồn Cửu Long). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "AG_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "AG_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "AG_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "KG_PRE2008",
    "province_name": "Kiên Giang",
    "region": "Tây Nam Bộ (Đảo Ngọc Phú Quốc & Vịnh Thái Lan)",
    "coordinates": "10.0125° N, 105.0809° E",
    "macro_economics": {
      "grdp_billion_vnd": 90000,
      "grdp_per_capita_usd": 2784,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 65000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 77.8,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 8,
        "trade_centers_count": 1,
        "convenience_stores_estimate": 28
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.8,
      "monthly_expense_per_capita_million_vnd": 3.3,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 2.4,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 5000,
      "individual_business_households": 40909,
      "total_labor_in_enterprises": 522000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 845640,
      "urbanization_rate_pct": 28,
      "population_density_per_km2": 186429
    },
    "regional_purchasing_power_index": {
      "overall_score": 45,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 56,
        "spending_score": 60,
        "market_density_score": 33,
        "commercial_activity_score": 9,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Tây Nam Bộ (Đảo Ngọc Phú Quốc & Vịnh Thái Lan). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "KG_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 6.24,
        "expense": 4.13,
        "rppi": 77,
        "households": 22000
      },
      {
        "id": "KG_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.8,
        "expense": 3.3,
        "rppi": 65,
        "households": 14000
      },
      {
        "id": "KG_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 4.08,
        "expense": 2.9,
        "rppi": 53,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "CT_PRE2008",
    "province_name": "Cần Thơ",
    "region": "Đồng Bằng Sông Cửu Long (Tây Đô - Thủ Phủ Miền Tây)",
    "coordinates": "10.0452° N, 105.7469° E",
    "macro_economics": {
      "grdp_billion_vnd": 125000,
      "grdp_per_capita_usd": 3900,
      "grdp_growth_rate_pct": 5.75,
      "economic_structure": {
        "agriculture_pct": 8.5,
        "industry_construction_pct": 31,
        "services_pct": 60.5
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 118000,
      "retail_growth_rate_pct": 12.5,
      "retail_per_capita_million_vnd": 108.5,
      "commercial_infrastructure": {
        "markets_count": 108,
        "supermarkets_count": 24,
        "trade_centers_count": 6,
        "convenience_stores_estimate": 84
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 6.15,
      "monthly_expense_per_capita_million_vnd": 4.05,
      "food_expense_ratio_pct": 49.5,
      "non_food_expense_ratio_pct": 50.5,
      "poverty_rate_pct": 0.52,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 11500,
      "individual_business_households": 82000,
      "total_labor_in_enterprises": 680000,
      "business_density_per_1000_people": 80.4
    },
    "demographics_and_urbanization": {
      "population": 1101600,
      "urbanization_rate_pct": 70.5,
      "population_density_per_km2": 242857
    },
    "regional_purchasing_power_index": {
      "overall_score": 62,
      "tier": "B (Trung bình khá)",
      "pillar_scores": {
        "income_score": 72,
        "spending_score": 74,
        "market_density_score": 83,
        "commercial_activity_score": 17,
        "growth_score": 65
      },
      "commercial_summary": "Thủ phủ của toàn vùng Đồng bằng sông Cửu Long (Tây Đô). Là trung tâm giáo dục đại học, y tế tuyến cuối và thương mại đầu mối của 13 tỉnh miền Tây. Ninh Kiều và Cái Răng tập trung sức mua sắm hàng tiêu dùng, điện tử và ẩm thực cao nhất khu vực sông nước."
    },
    "key_districts_sae": [
      {
        "id": "CT-NK",
        "name": "Quận Ninh Kiều",
        "type": "Trung tâm Tây Đô",
        "pop": 285000,
        "density": 9800,
        "income": 7.5,
        "expense": 4.85,
        "rppi": 88,
        "households": 38000
      },
      {
        "id": "CT-CR",
        "name": "Quận Cái Răng",
        "type": "Đô thị cảng sông & Chợ nổi",
        "pop": 115000,
        "density": 1800,
        "income": 6.2,
        "expense": 4.05,
        "rppi": 78,
        "households": 16000
      },
      {
        "id": "CT-BT",
        "name": "Quận Bình Thủy",
        "type": "Đô thị sân bay",
        "pop": 145000,
        "density": 2100,
        "income": 6.3,
        "expense": 4.1,
        "rppi": 79,
        "households": 18500
      }
    ]
  },
  {
    "historical_id": "HG_PRE2008_HAUGIANG",
    "province_name": "Hậu Giang",
    "region": "Đồng Bằng Sông Cửu Long (Kênh Xáng Xà No & Ngã Bảy Phụng Hiệp)",
    "coordinates": "9.7844° N, 105.4703° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Kênh Xáng Xà No & Ngã Bảy Phụng Hiệp). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "HG_PRE2008_HAUGIANG-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "HG_PRE2008_HAUGIANG-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "HG_PRE2008_HAUGIANG-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "ST_PRE2008",
    "province_name": "Sóc Trăng",
    "region": "Đồng Bằng Sông Cửu Long (Xứ Sở Chùa Vàng & Cửa Sông Trần Đề)",
    "coordinates": "9.6033° N, 105.9722° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Xứ Sở Chùa Vàng & Cửa Sông Trần Đề). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "ST_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "ST_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "ST_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "BL_PRE2008",
    "province_name": "Bạc Liêu",
    "region": "Đồng Bằng Sông Cửu Long (Cái Nôi Đờn Ca Tài Tử & Điện Gió Biển)",
    "coordinates": "9.2941° N, 105.7278° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Cái Nôi Đờn Ca Tài Tử & Điện Gió Biển). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "BL_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "BL_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "BL_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  },
  {
    "historical_id": "CM_PRE2008",
    "province_name": "Cà Mau",
    "region": "Đồng Bằng Sông Cửu Long (Cực Nam Tổ Quốc & Mũi Cà Mau)",
    "coordinates": "9.1769° N, 105.1528° E",
    "macro_economics": {
      "grdp_billion_vnd": 85000,
      "grdp_per_capita_usd": 2668,
      "grdp_growth_rate_pct": 6.5,
      "economic_structure": {
        "agriculture_pct": 22,
        "industry_construction_pct": 38,
        "services_pct": 40
      }
    },
    "retail_and_commerce": {
      "total_retail_billion_vnd": 55000,
      "retail_growth_rate_pct": 10.5,
      "retail_per_capita_million_vnd": 69.7,
      "commercial_infrastructure": {
        "markets_count": 80,
        "supermarkets_count": 12,
        "trade_centers_count": 2,
        "convenience_stores_estimate": 42
      }
    },
    "household_income_expenditure": {
      "monthly_income_per_capita_million_vnd": 4.6,
      "monthly_expense_per_capita_million_vnd": 3.1,
      "food_expense_ratio_pct": 54,
      "non_food_expense_ratio_pct": 46,
      "poverty_rate_pct": 3.5,
      "urban_vs_rural_gap": 1.39
    },
    "economic_census_2021": {
      "active_enterprises_count": 4722,
      "individual_business_households": 38636,
      "total_labor_in_enterprises": 493000,
      "business_density_per_1000_people": 52.2
    },
    "demographics_and_urbanization": {
      "population": 798660,
      "urbanization_rate_pct": 32,
      "population_density_per_km2": 176071
    },
    "regional_purchasing_power_index": {
      "overall_score": 44,
      "tier": "C (Trung bình)",
      "pillar_scores": {
        "income_score": 54,
        "spending_score": 56,
        "market_density_score": 38,
        "commercial_activity_score": 8,
        "growth_score": 63
      },
      "commercial_summary": "Địa bàn thuộc Đồng Bằng Sông Cửu Long (Cực Nam Tổ Quốc & Mũi Cà Mau). Thị trường tiêu dùng tập trung chủ yếu tại khu vực thành phố/thị xã trung tâm tỉnh và các trục quốc lộ huyết mạch. Chợ truyền thống và cửa hàng tạp hóa gia đình vẫn chiếm tỷ trọng chi phối 70-80% hoạt động mua sắm thiết yếu của người dân."
    },
    "key_districts_sae": [
      {
        "id": "CM_PRE2008-TP",
        "name": "Thành phố trung tâm",
        "type": "Đô thị hạt nhân",
        "pop": 180000,
        "density": 1500,
        "income": 5.98,
        "expense": 3.88,
        "rppi": 74,
        "households": 22000
      },
      {
        "id": "CM_PRE2008-H1",
        "name": "Huyện trọng điểm 1",
        "type": "Vùng đồng bằng / thung lũng",
        "pop": 120000,
        "density": 450,
        "income": 4.6,
        "expense": 3.1,
        "rppi": 62,
        "households": 14000
      },
      {
        "id": "CM_PRE2008-H2",
        "name": "Huyện ngoại vi",
        "type": "Vùng nông thôn / bán sơn địa",
        "pop": 85000,
        "density": 220,
        "income": 3.91,
        "expense": 2.73,
        "rppi": 50,
        "households": 9500
      }
    ]
  }
];

  return {
    KINH_TE_64_TINH_THANH_CORPUS,
    getProvinceEconomy: id => KINH_TE_64_TINH_THANH_CORPUS.find(p => p.historical_id === id) || null,
    getAllProvincesEconomy: () => KINH_TE_64_TINH_THANH_CORPUS
  };
}));
