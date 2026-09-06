/**
 * ĐỘNG CƠ TÍNH TOÁN BÁN KÍNH KINH TẾ & DUNG LƯỢNG THỊ TRƯỜNG (ECONOMIC RADIUS ENGINE)
 * Phục vụ phân tích sức mua, mật độ dân cư và tiềm năng tiêu thụ hàng hóa
 * theo bán kính 500m, 1km, 3km quanh vị trí khảo sát nhà đất/cơ sở kinh doanh.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./dia_ly_64_tinh_thanh_data', './kinh_te_64_tinh_thanh_data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./dia_ly_64_tinh_thanh_data'),
      require('./kinh_te_64_tinh_thanh_data')
    );
  } else {
    root.EconomicRadiusEngine = factory(
      root.DIA_LY_64_TINH_THANH_CORPUS,
      root.KINH_TE_64_TINH_THANH_CORPUS
    );
  }
}(typeof self !== 'undefined' ? self : this, function(DiaLyCorpus, KinhTeCorpus) {
  'use strict';

  const getGeoCorpus = () => {
    if (DiaLyCorpus) {
      if (Array.isArray(DiaLyCorpus)) return DiaLyCorpus;
      if (Array.isArray(DiaLyCorpus.DIA_LY_64_TINH_THANH_CORPUS)) return DiaLyCorpus.DIA_LY_64_TINH_THANH_CORPUS;
    }
    if (typeof window !== 'undefined' && Array.isArray(window.DIA_LY_64_TINH_THANH_CORPUS)) return window.DIA_LY_64_TINH_THANH_CORPUS;
    return [];
  };

  const getEconCorpus = () => {
    if (KinhTeCorpus) {
      if (Array.isArray(KinhTeCorpus)) return KinhTeCorpus;
      if (Array.isArray(KinhTeCorpus.KINH_TE_64_TINH_THANH_CORPUS)) return KinhTeCorpus.KINH_TE_64_TINH_THANH_CORPUS;
    }
    if (typeof window !== 'undefined' && Array.isArray(window.KINH_TE_64_TINH_THANH_CORPUS)) return window.KINH_TE_64_TINH_THANH_CORPUS;
    return [];
  };

  /**
   * Tính khoảng cách Haversine giữa 2 tọa độ (km)
   */
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Bán kính trái đất (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Phân tích chuỗi tọa độ (vd: "21.0285° N, 105.8542° E") ra { lat, lng }
   */
  function parseCoordinates(coordStr) {
    if (!coordStr || typeof coordStr !== 'string') return null;
    const parts = coordStr.split(',');
    if (parts.length < 2) return null;
    const latMatch = parts[0].match(/([0-9.]+)/);
    const lngMatch = parts[1].match(/([0-9.]+)/);
    if (!latMatch || !lngMatch) return null;
    return {
      lat: parseFloat(latMatch[1]),
      lng: parseFloat(lngMatch[1])
    };
  }

  class EconomicRadiusEngine {
    constructor() {
      this.DEFAULT_RADIUS = 1000; // 1km
    }

    /**
     * Tìm tỉnh thành gần nhất dựa trên tọa độ GPS
     */
    findNearestProvince(lat, lng) {
      const geoList = getGeoCorpus();
      let nearest = null;
      let minDistance = Infinity;

      for (const p of geoList) {
        const coords = parseCoordinates(p.coordinates);
        if (coords) {
          const dist = haversineDistance(lat, lng, coords.lat, coords.lng);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = p;
          }
        }
      }
      return nearest ? { province: nearest, distanceKm: minDistance } : null;
    }

    /**
     * Tìm quận/huyện và xã/phường gần nhất trong tỉnh thành dựa trên tọa độ GPS
     */
    findNearestDistrict(lat, lng, provinceEcon) {
      if (!provinceEcon || !provinceEcon.key_districts_sae || !provinceEcon.key_districts_sae.length) {
        return null;
      }
      let nearest = null;
      let nearestCommune = null;
      let minDistance = Infinity;
      for (const d of provinceEcon.key_districts_sae) {
        if (typeof d.lat === 'number' && typeof d.lng === 'number') {
          const dist = haversineDistance(lat, lng, d.lat, d.lng);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = d;
            nearestCommune = (d.communes && d.communes[0]) || null;
          }
        }
        if (d.communes && Array.isArray(d.communes)) {
          for (const c of d.communes) {
            if (typeof c.lat === 'number' && typeof c.lng === 'number') {
              const distC = haversineDistance(lat, lng, c.lat, c.lng);
              if (distC < minDistance) {
                minDistance = distC;
                nearest = d;
                nearestCommune = c;
              }
            }
          }
        }
      }
      return nearest ? {
        district: nearest,
        commune: nearestCommune,
        distanceKm: Number(minDistance.toFixed(2))
      } : null;
    }

    /**
     * Tìm quận/huyện và xã/phường gần nhất trên TOÀN BỘ 64 tỉnh thành dựa trên tọa độ GPS
     */
    findNearestDistrictAcrossAll(lat, lng) {
      const econList = getEconCorpus();
      let nearest = null;
      let nearestProvince = null;
      let nearestCommune = null;
      let minDistance = Infinity;

      for (const p of econList) {
        if (p.key_districts_sae && Array.isArray(p.key_districts_sae)) {
          for (const d of p.key_districts_sae) {
            if (typeof d.lat === 'number' && typeof d.lng === 'number') {
              const dist = haversineDistance(lat, lng, d.lat, d.lng);
              if (dist < minDistance) {
                minDistance = dist;
                nearest = d;
                nearestProvince = p;
                nearestCommune = (d.communes && d.communes[0]) || null;
              }
            }
            if (d.communes && Array.isArray(d.communes)) {
              for (const c of d.communes) {
                if (typeof c.lat === 'number' && typeof c.lng === 'number') {
                  const distC = haversineDistance(lat, lng, c.lat, c.lng);
                  if (distC < minDistance) {
                    minDistance = distC;
                    nearest = d;
                    nearestProvince = p;
                    nearestCommune = c;
                  }
                }
              }
            }
          }
        }
      }

      return nearest ? {
        district: nearest,
        province: nearestProvince,
        commune: nearestCommune,
        distanceKm: Number(minDistance.toFixed(2))
      } : null;
    }

    /**
     * Tính toán dung lượng thị trường và tiềm năng kinh tế trong bán kính
     */
    calculateRadiusMarket(params = {}) {
      const {
        lat = 21.0285,
        lng = 105.8542,
        radiusMeters = 1000,
        provinceId = null,
        districtId = null,
        communeId = null
      } = params;

      const econList = getEconCorpus();

      // 1. Xác định tỉnh thành, quận huyện và xã/phường
      let provinceEcon = null;
      let targetDistrict = null;
      let targetCommune = null;
      let matchedDistanceKm = null;
      let matchedCommuneDistanceKm = null;

      if (provinceId) {
        provinceEcon = econList.find(p => p.historical_id === provinceId);
        if (provinceEcon) {
          if (districtId && provinceEcon.key_districts_sae) {
            targetDistrict = provinceEcon.key_districts_sae.find(d => d.id === districtId);
          }
          if (!targetDistrict) {
            const match = this.findNearestDistrict(lat, lng, provinceEcon);
            if (match) {
              targetDistrict = match.district;
              targetCommune = match.commune;
              matchedDistanceKm = match.distanceKm;
            }
          }
        }
      }

      // Nếu chưa có provinceEcon hoặc chưa có targetDistrict, tìm trực tiếp quận/huyện gần nhất trên toàn quốc
      if (!provinceEcon || !targetDistrict) {
        const globalMatch = this.findNearestDistrictAcrossAll(lat, lng);
        if (globalMatch) {
          if (!provinceEcon) provinceEcon = globalMatch.province;
          if (!targetDistrict) {
            targetDistrict = globalMatch.district;
            targetCommune = globalMatch.commune;
            matchedDistanceKm = globalMatch.distanceKm;
          }
        }
      }

      if (!provinceEcon) {
        const nearest = this.findNearestProvince(lat, lng);
        if (nearest && nearest.province) {
          provinceEcon = econList.find(p => p.historical_id === nearest.province.historical_id);
        }
      }
      if (!provinceEcon) provinceEcon = econList[0] || null;

      if (!provinceEcon) {
        return {
          error: 'Chưa có cơ sở dữ liệu kinh tế',
          radiusMeters
        };
      }

      if (!targetDistrict && provinceEcon.key_districts_sae && provinceEcon.key_districts_sae.length > 0) {
        targetDistrict = provinceEcon.key_districts_sae[0];
      }

      // Xử lý xác định xã/phường trong targetDistrict
      if (targetDistrict && targetDistrict.communes && targetDistrict.communes.length > 0) {
        if (communeId) {
          const foundC = targetDistrict.communes.find(c => c.id === communeId);
          if (foundC) targetCommune = foundC;
        }
        if (!targetCommune) {
          let minCDist = Infinity;
          for (const c of targetDistrict.communes) {
            if (typeof c.lat === 'number' && typeof c.lng === 'number') {
              const cd = haversineDistance(lat, lng, c.lat, c.lng);
              if (cd < minCDist) {
                minCDist = cd;
                targetCommune = c;
                matchedCommuneDistanceKm = Number(cd.toFixed(2));
              }
            }
          }
        } else if (matchedCommuneDistanceKm === null && typeof targetCommune.lat === 'number' && typeof targetCommune.lng === 'number') {
          matchedCommuneDistanceKm = Number(haversineDistance(lat, lng, targetCommune.lat, targetCommune.lng).toFixed(2));
        }
      }

      if (targetDistrict && typeof targetDistrict.lat === 'number' && typeof targetDistrict.lng === 'number' && matchedDistanceKm === null) {
        matchedDistanceKm = Number(haversineDistance(lat, lng, targetDistrict.lat, targetDistrict.lng).toFixed(2));
      }

      // Mật độ dân số tham chiếu (người / km²)
      const baseDensity = targetDistrict
        ? targetDistrict.density
        : (provinceEcon.demographics_and_urbanization ? provinceEcon.demographics_and_urbanization.population_density_per_km2 : 2500);

      // 3. Tính diện tích hình tròn (km²)
      const radiusKm = radiusMeters / 1000;
      const circleAreaKm2 = Math.PI * Math.pow(radiusKm, 2);

      // 4. Ước tính dân số trong bán kính với hệ số tập trung không gian
      // (Bán kính nhỏ 500m thường tập trung dân cao hơn mức bình quân toàn huyện)
      const concentrationFactor = radiusMeters <= 500 ? 1.45 : (radiusMeters <= 1000 ? 1.20 : 1.0);
      let estimatedPopulation = Math.round(circleAreaKm2 * baseDensity * concentrationFactor);

      // Giới hạn không vượt quá tổng dân số toàn quận/huyện
      if (targetDistrict && targetDistrict.pop) {
        estimatedPopulation = Math.min(estimatedPopulation, targetDistrict.pop);
      }

      // 5. Thu nhập và chi tiêu bình quân đầu người tháng (triệu VNĐ)
      const monthlyIncomePerCapita = targetDistrict
        ? targetDistrict.income
        : provinceEcon.household_income_expenditure.monthly_income_per_capita_million_vnd;

      const monthlyExpensePerCapita = targetDistrict
        ? targetDistrict.expense
        : provinceEcon.household_income_expenditure.monthly_expense_per_capita_million_vnd;

      // 6. Tổng dung lượng chi tiêu thị trường ước tính (triệu VNĐ và tỷ VNĐ / tháng)
      const totalMonthlySpendingMillionVnd = Math.round(estimatedPopulation * monthlyExpensePerCapita);
      const totalMonthlySpendingBillionVnd = Number((totalMonthlySpendingMillionVnd / 1000).toFixed(1));

      // 7. Cơ cấu chi tiêu theo nhóm ngành hàng (VHLSS calibration)
      const foodRatio = provinceEcon.household_income_expenditure.food_expense_ratio_pct || 48;
      const nonFoodRatio = 100 - foodRatio;

      const foodSpendingBillion = Number((totalMonthlySpendingBillionVnd * (foodRatio / 100)).toFixed(1));
      const housingUtilitiesBillion = Number((totalMonthlySpendingBillionVnd * 0.18).toFixed(1));
      const educationHealthBillion = Number((totalMonthlySpendingBillionVnd * 0.14).toFixed(1));
      const shoppingLeisureBillion = Number((totalMonthlySpendingBillionVnd * (nonFoodRatio - 32) / 100).toFixed(1));

      // 8. Ước tính số cơ sở kinh doanh cá thể trong bán kính
      const businessHouseholdDensity = targetDistrict && targetDistrict.households
        ? Math.round(targetDistrict.households * (circleAreaKm2 / 25))
        : Math.round(estimatedPopulation * 0.08);

      // 9. Đánh giá xếp hạng tiềm năng thị trường (RPPI Rating)
      const districtRppi = targetDistrict ? targetDistrict.rppi : provinceEcon.regional_purchasing_power_index.overall_score;
      let potentialRating = 'B (Trung bình khá)';
      let ratingColor = '#38BDF8';
      let suitableBusinessModels = [];

      if (districtRppi >= 88) {
        potentialRating = 'A+ (Thị trường Cực Kỳ Sầm Uất)';
        ratingColor = '#10B981';
        suitableBusinessModels = [
          'Chuỗi Cửa hàng tiện lợi 24/7 / Siêu thị mini cao cấp',
          'F&B thương hiệu / Quán cà phê trải nghiệm / Nhà hàng gia đình',
          'Showroom thời trang, mỹ phẩm, phụ kiện cao cấp',
          'Phòng khám chuyên khoa / Trung tâm nha khoa & thẩm mỹ',
          'Cửa hàng công nghệ, điện máy gia dụng thông minh'
        ];
      } else if (districtRppi >= 78) {
        potentialRating = 'A (Thị trường Tiêu Dùng Cao)';
        ratingColor = '#34D399';
        suitableBusinessModels = [
          'Cửa hàng tạp hóa hiện đại / Bách hóa thực phẩm sạch',
          'Quán ăn gia đình / Trà sữa, đồ uống mang đi',
          'Dịch vụ làm đẹp / Spa / Chăm sóc tóc & da',
          'Nhà thuốc tây chuẩn GPP / Dịch vụ y tế tư nhân',
          'Văn phòng phẩm, đồ gia dụng tiện ích'
        ];
      } else if (districtRppi >= 65) {
        potentialRating = 'B+ (Thị trường Khá Tốt)';
        ratingColor = '#FBBF24';
        suitableBusinessModels = [
          'Tạp hóa bách hóa truyền thống kết hợp tự chọn',
          'Quán ăn sáng / Điểm tâm bình dân',
          'Tiệm sửa chữa xe máy, đồ điện tử gia dụng',
          'Quầy thuốc tây / Cửa hàng nông cụ, vật tư xây dựng'
        ];
      } else {
        potentialRating = 'B (Thị trường Trung Bình)';
        ratingColor = '#94A3B8';
        suitableBusinessModels = [
          'Cửa hàng bách hóa tổng hợp nhu yếu phẩm thiết yếu',
          'Quầy ăn uống sáng bình dân',
          'Vật liệu xây dựng cơ bản / Đại lý thức ăn chăn nuôi'
        ];
      }

      // Nhân khẩu học chi tiết: Giới tính & Tháp tuổi
      const gender = (targetDistrict && targetDistrict.gender)
        ? targetDistrict.gender
        : { male_pct: 49.5, female_pct: 50.5 };

      const ageCohorts = (targetDistrict && targetDistrict.age_cohorts)
        ? targetDistrict.age_cohorts
        : { children_0_14: 18.5, youth_15_24: 15.0, prime_25_49: 44.5, senior_50_plus: 22.0 };

      const estimatedMale = Math.round(estimatedPopulation * (gender.male_pct / 100));
      const estimatedFemale = estimatedPopulation - estimatedMale;

      const childrenCount = Math.round(estimatedPopulation * (ageCohorts.children_0_14 / 100));
      const youthCount = Math.round(estimatedPopulation * (ageCohorts.youth_15_24 / 100));
      const primeCount = Math.round(estimatedPopulation * (ageCohorts.prime_25_49 / 100));
      const seniorCount = Math.max(0, estimatedPopulation - childrenCount - youthCount - primeCount);

      // Cụm thương mại & Tuyến đường huyết mạch
      const primaryStreets = (targetDistrict && targetDistrict.primary_streets) ? targetDistrict.primary_streets : [];
      const highDensityClusters = (targetDistrict && targetDistrict.high_density_clusters) ? targetDistrict.high_density_clusters : [];
      const lowDensityOpportunities = (targetDistrict && targetDistrict.low_density_opportunities) ? targetDistrict.low_density_opportunities : [];

      return {
        location: {
          provinceId: provinceEcon.historical_id,
          provinceName: provinceEcon.province_name,
          region: provinceEcon.region,
          districtId: targetDistrict ? targetDistrict.id : null,
          districtName: targetDistrict ? targetDistrict.name : null,
          communeId: targetCommune ? targetCommune.id : null,
          communeName: targetCommune ? targetCommune.name : null,
          communeType: targetCommune ? targetCommune.type : null,
          radiusMeters: radiusMeters,
          radiusKm: radiusKm,
          areaKm2: Number(circleAreaKm2.toFixed(2)),
          distanceToDistrictCenterKm: matchedDistanceKm,
          distanceToCommuneCenterKm: matchedCommuneDistanceKm,
          userCoords: { lat, lng }
        },
        province: {
          id: provinceEcon.historical_id,
          name: provinceEcon.province_name,
          region: provinceEcon.region
        },
        district: targetDistrict ? {
          id: targetDistrict.id,
          name: targetDistrict.name,
          type: targetDistrict.type,
          rppi: targetDistrict.rppi,
          pop: targetDistrict.pop,
          density: targetDistrict.density,
          income: targetDistrict.income,
          expense: targetDistrict.expense,
          households: targetDistrict.households,
          lat: targetDistrict.lat,
          lng: targetDistrict.lng,
          communes: targetDistrict.communes || [],
          gender,
          age_cohorts: ageCohorts,
          primary_streets: primaryStreets,
          high_density_clusters: highDensityClusters,
          low_density_opportunities: lowDensityOpportunities
        } : null,
        commune: targetCommune ? {
          id: targetCommune.id,
          name: targetCommune.name,
          type: targetCommune.type,
          lat: targetCommune.lat,
          lng: targetCommune.lng,
          pop: targetCommune.pop || 0,
          features: targetCommune.features || ''
        } : null,
        radius: {
          meters: radiusMeters,
          km: radiusKm,
          areaKm2: Number(circleAreaKm2.toFixed(2))
        },
        demographics: {
          estimatedPopulation,
          baseDensityPerKm2: baseDensity,
          estimatedBusinessHouseholds: Math.max(12, businessHouseholdDensity),
          genderBreakdown: {
            malePct: gender.male_pct,
            femalePct: gender.female_pct,
            estimatedMale,
            estimatedFemale
          },
          ageCohorts: {
            children: { pct: ageCohorts.children_0_14, count: childrenCount, label: 'Trẻ em (0-14 tuổi)' },
            youth: { pct: ageCohorts.youth_15_24, count: youthCount, label: 'Thanh thiếu niên (15-24 tuổi)' },
            prime: { pct: ageCohorts.prime_25_49, count: primeCount, label: 'Độ tuổi vàng chi tiêu (25-49 tuổi)' },
            senior: { pct: ageCohorts.senior_50_plus, count: seniorCount, label: 'Trung niên & Cao tuổi (50+ tuổi)' }
          }
        },
        commercialHotspots: {
          primaryStreets,
          highDensityClusters,
          lowDensityOpportunities
        },
        keyDistrictsInProvince: (provinceEcon.key_districts_sae || []).map(d => ({
          id: d.id,
          name: d.name,
          type: d.type,
          density: d.density,
          rppi: d.rppi,
          lat: d.lat,
          lng: d.lng,
          communes: (d.communes || []).map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            lat: c.lat,
            lng: c.lng,
            pop: c.pop || 0
          }))
        })),
        allProvinces: econList.map(p => ({
          id: p.historical_id,
          name: p.province_name,
          region: p.region
        })),
        financials: {
          monthlyIncomePerCapita,
          monthlyExpensePerCapita,
          totalMonthlySpendingBillionVnd,
          totalYearlySpendingBillionVnd: Number((totalMonthlySpendingBillionVnd * 12).toFixed(1))
        },
        spendingBreakdown: {
          foodExpenseBillion: foodSpendingBillion,
          foodExpenseRatio: foodRatio,
          housingUtilitiesBillion,
          educationHealthBillion,
          shoppingLeisureBillion
        },
        marketAssessment: {
          rppiScore: districtRppi,
          rating: potentialRating,
          ratingColor,
          suitableBusinessModels,
          summary: `Trong bán kính ${radiusMeters >= 1000 ? `${radiusKm} km` : `${radiusMeters} m`}, khu vực quy tụ khoảng ${estimatedPopulation.toLocaleString('vi-VN')} cư dân với mật độ ${baseDensity.toLocaleString('vi-VN')} người/km². Tổng dung lượng chi tiêu tiêu dùng ước tính đạt xấp xỉ ${totalMonthlySpendingBillionVnd} tỷ VNĐ/tháng (trong đó chi tiêu cho thực phẩm và ăn uống chiếm khoảng ${foodSpendingBillion} tỷ VNĐ). Mức độ hấp thụ hàng hóa được đánh giá ở mức ${potentialRating}.`
        }
      };
    }
  }

  return new EconomicRadiusEngine();
}));
