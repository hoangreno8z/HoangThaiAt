/**
 * BỘ ĐỘNG CƠ PHÂN TÍCH ĐỒ THỊ MẠNG ĐƯỜNG & ĐỀ XUẤT LAI/KHỨ (ROAD TOPOLOGY ENGINE)
 * Chuyên trách:
 * 1. Xây dựng đồ thị mạng đường (Road Graph: Nodes, Edges, Intersections).
 * 2. Tìm đoạn đường cuối tiếp cận nhà (Final Access Road) bằng thuật toán đa tiêu chí.
 * 3. Truy vết ngược chuỗi liên thông: Đại lộ -> Giao lộ (Ngã 3/4) -> Hẻm -> Nhà.
 * 4. Tự động đề xuất tuyến Lai / Khứ thực tế kèm mức độ tin cậy (Confidence).
 * 5. Giữ nguyên ngữ nghĩa flowType: 'ROAD', không đánh đồng đường với dòng nước tự nhiên.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./geo_measurement_engine', './road_network_provider'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./geo_measurement_engine'),
      require('./road_network_provider')
    );
  } else {
    root.RoadTopologyEngine = factory(
      root.GeoMeasurementEngine,
      root.RoadNetworkProvider
    );
  }
}(typeof self !== 'undefined' ? self : this, function(GeoEngine, RoadProviderModule) {
  'use strict';

  const Geo = GeoEngine || (typeof window !== 'undefined' ? window.GeoMeasurementEngine : null);
  const RoadProvider = RoadProviderModule || (typeof window !== 'undefined' ? window.RoadNetworkProvider : null);

  class RoadTopologyEngine {
    constructor(providerOrOptions) {
      if (providerOrOptions && providerOrOptions.roadProvider) {
        this.provider = providerOrOptions.roadProvider;
      } else {
        this.provider = providerOrOptions || (RoadProvider && RoadProvider.OverpassRoadProvider ? new RoadProvider.OverpassRoadProvider() : null);
      }
    }

    setProvider(provider) {
      this.provider = provider;
    }

    /**
     * Phân tích toàn diện mạng đường quanh tâm nhà và đề xuất tuyến Lai / Khứ
     * @param {Object} houseCenter - { lat, lng }
     * @param {number} facingBearing - Hướng nhà (0 - 360 độ)
     * @param {Object} options - { radiusMeters: 200 }
     */
    async analyzeRoadNetworkForHouse(houseCenter, facingBearing = 0, options = {}) {
      if (!houseCenter || typeof houseCenter.lat !== 'number' || typeof houseCenter.lng !== 'number') {
        return this.createEmptyResult('INVALID_HOUSE_CENTER');
      }

      if (!this.provider) {
        return this.createEmptyResult('NO_PROVIDER_AVAILABLE');
      }

      const radius = options.radiusMeters || 200;
      const roadData = await this.provider.getRoadNetwork(houseCenter.lat, houseCenter.lng, radius);
      const ways = roadData.ways || [];

      if (ways.length === 0) {
        return this.createEmptyResult('NO_ROADS_FOUND_IN_RADIUS', roadData.metadata);
      }

      // 1. Tìm đoạn đường cuối tiếp cận nhà (Final Access Road)
      const accessCandidate = this.findFinalAccessRoad(houseCenter, facingBearing, ways);
      if (!accessCandidate) {
        return this.createEmptyResult('NO_SUITABLE_ACCESS_ROAD', roadData.metadata);
      }

      // 2. Xây dựng đồ thị mạng đường (Road Graph)
      const graph = this.buildRoadGraph(ways);

      // 3. Truy vết giao lộ và tuyến liên thông
      const routeChain = this.traceConnectedRoute(houseCenter, accessCandidate, graph);

      // 4. Sinh đề xuất Tuyến Lai / Khứ
      const result = this.generateLaiKhuSuggestion(houseCenter, facingBearing, accessCandidate, routeChain, roadData.metadata);

      // 5. Nếu có ngã 3 và có mạng internet, thử tinh chỉnh khúc cua bằng OSRM Routing Engine (chuẩn công nghệ dẫn đường)
      if (result && result.suggestion && result.suggestion.laiPoint && result.suggestion.khuPoint) {
        try {
          const osrmPoints = await this.fetchOsrmRoute(result.suggestion.laiPoint, result.suggestion.khuPoint);
          if (Array.isArray(osrmPoints) && osrmPoints.length >= 2) {
            result.suggestion.polyline = osrmPoints;
            result.suggestion.polylinePoints = osrmPoints;
            result.metadata.routingEngine = 'OSRM_PUBLIC_ROUTING_ENGINE';
          }
        } catch (e) {
          // Bỏ qua nếu ngoại tuyến, bảo toàn tuyến đồ thị nội bộ
        }
      }

      return result;
    }

    /**
     * Tinh chỉnh lộ trình qua OSRM Routing API (công nghệ dẫn đường mã nguồn mở)
     */
    async fetchOsrmRoute(origin, dest) {
      if (!origin || !dest || typeof origin.lat !== 'number' || typeof dest.lat !== 'number') return null;
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng.toFixed(6)},${origin.lat.toFixed(6)};${dest.lng.toFixed(6)},${dest.lat.toFixed(6)}?overview=full&geometries=geojson`;
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 3000) : null;
        const res = await (typeof fetch !== 'undefined' ? fetch(url, { signal: controller ? controller.signal : undefined }) : null);
        if (timer) clearTimeout(timer);
        if (!res || !res.ok) return null;
        const data = await res.json();
        if (data && data.code === 'Ok' && Array.isArray(data.routes) && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates; // [[lng, lat], ...]
          if (Array.isArray(coords) && coords.length >= 2) {
            let sampled = [];
            if (coords.length <= 8) {
              sampled = coords.map(c => ({ lat: c[1], lng: c[0] }));
            } else {
              const step = (coords.length - 1) / 7;
              for (let i = 0; i < 7; i++) {
                const c = coords[Math.round(i * step)];
                sampled.push({ lat: c[1], lng: c[0] });
              }
              const last = coords[coords.length - 1];
              sampled.push({ lat: last[1], lng: last[0] });
            }
            return sampled;
          }
        }
      } catch (err) {
        // Safe offline fallback
      }
      return null;
    }

    /**
     * Tìm đoạn đường cuối tiếp cận nhà bằng hệ thống chấm điểm (Scoring)
     */
    findFinalAccessRoad(houseCenter, facingBearing, ways) {
      let bestCandidate = null;
      let highestScore = -Infinity;

      for (const way of ways) {
        if (!way.geometry || way.geometry.length < 2) continue;
        for (let i = 0; i < way.geometry.length - 1; i++) {
          const p1 = way.geometry[i];
          const p2 = way.geometry[i + 1];

          const proj = this.projectPointToSegment(houseCenter, p1, p2);
          const dist = Geo ? Geo.calculateHaversineDistance(houseCenter, proj) : 999;
          if (dist > 75) continue; // Cách xa quá 75m không thể là đường tiếp cận trực tiếp

          // Tính phương vị từ tâm nhà ra điểm đường
          const bearingToRoad = Geo ? Geo.calculateGeodesicBearing(houseCenter, proj) : 0;
          const diffFacing = Geo ? Geo.angularDistance(facingBearing, bearingToRoad) : 180;

          // Điểm mặt tiền: Đường nằm trước mặt nhà (diff <= 90 độ) được cộng điểm lớn
          const frontageAlignment = Math.cos((diffFacing * Math.PI) / 180);
          const frontageScore = Math.max(-0.2, frontageAlignment) * 40; // max 40 điểm

          // Điểm cự ly gần: càng sát nhà điểm càng cao
          const distanceScore = Math.max(0, (1 - dist / 75)) * 45; // max 45 điểm

          // Điểm cấp đường: hẻm/đường nhỏ (residential, service, alley) thường là đường vào nhà
          const classScore = (way.rank <= 5 ? 15 : (way.rank <= 7 ? 10 : 5));

          const totalScore = distanceScore + frontageScore + classScore;

          if (totalScore > highestScore) {
            highestScore = totalScore;
            bestCandidate = {
              ...way,
              way,
              segmentIndex: i,
              p1,
              p2,
              projectedPoint: proj,
              distanceMeters: Math.round(dist * 10) / 10,
              distanceToHouseMeters: Math.round(dist * 10) / 10,
              score: Math.round(totalScore * 10) / 10,
              diffFacing
            };
          }
        }
      }

      return bestCandidate;
    }

    /**
     * Xây dựng đồ thị mạng đường liên thông
     */
    buildRoadGraph(ways) {
      const nodes = new Map(); // key: "lat,lng" -> { lat, lng, edges: [] }
      const edges = [];

      const getKey = (pt) => `${pt.lat.toFixed(6)},${pt.lng.toFixed(6)}`;

      for (const way of ways) {
        for (let i = 0; i < way.geometry.length - 1; i++) {
          const u = way.geometry[i];
          const v = way.geometry[i + 1];
          const keyU = getKey(u);
          const keyV = getKey(v);

          if (!nodes.has(keyU)) nodes.set(keyU, { lat: u.lat, lng: u.lng, edges: [] });
          if (!nodes.has(keyV)) nodes.set(keyV, { lat: v.lat, lng: v.lng, edges: [] });

          const len = Geo ? Geo.calculateHaversineDistance(u, v) : 10;
          const edge = { from: keyU, to: keyV, way, lengthMeters: len };
          edges.push(edge);

          nodes.get(keyU).edges.push({ to: keyV, latLng: v, way, lengthMeters: len });
          nodes.get(keyV).edges.push({ to: keyU, latLng: u, way, lengthMeters: len });
        }
      }

      const intersections = [];
      for (const node of nodes.values()) {
        if (node.edges.length >= 3) {
          intersections.push(node);
        }
      }

      return {
        nodes,
        edges,
        intersections,
        get: (key) => nodes.get(key),
        has: (key) => nodes.has(key)
      };
    }

    /**
     * Truy vết liên thông từ đoạn đường tiếp cận ra các ngã ba/ngã tư và đường lớn hơn
     */
    traceConnectedRoute(houseCenter, accessCandidate, graph) {
      const pProj = accessCandidate.projectedPoint;
      const way = accessCandidate.way;
      const geom = way.geometry;

      // Đi dọc theo con đường này về 2 phía để tìm nút giao (ngã 3/4)
      const pStart = geom[0];
      const pEnd = geom[geom.length - 1];

      const getKey = (pt) => `${pt.lat.toFixed(6)},${pt.lng.toFixed(6)}`;

      const findIntersectionAlong = (startIndex, step) => {
        for (let i = startIndex; i >= 0 && i < geom.length; i += step) {
          const pt = geom[i];
          const node = graph.get(getKey(pt));
          if (node && node.edges.length >= 3) {
            // Nút giao ngã 3 hoặc ngã 4
            return {
              point: pt,
              intersectionType: node.edges.length === 3 ? 'nga_ba' : 'nga_tu',
              connectedWays: node.edges.map(e => e.way.name).filter(Boolean)
            };
          }
        }
        return null;
      };

      const interForward = findIntersectionAlong(accessCandidate.segmentIndex + 1, 1);
      const interBackward = findIntersectionAlong(accessCandidate.segmentIndex, -1);

      return {
        accessRoad: way,
        interForward,
        interBackward,
        endpoints: { start: pStart, end: pEnd }
      };
    }

    /**
     * Sinh đề xuất Tuyến Lai / Khứ hoàn chỉnh kèm mức độ tin cậy
     */
    generateLaiKhuSuggestion(houseCenter, facingBearing, accessCandidate, routeChain, metadata) {
      const accessWay = accessCandidate.way;
      const geom = accessWay.geometry;
      const proj = accessCandidate.projectedPoint;

      // Xây dựng tuyến đường đại diện trước mặt nhà gồm 3 - 5 điểm vector thực tế
      let routePoints = [];
      const segIdx = accessCandidate.segmentIndex;

      // Lấy từ 1 điểm trước, điểm chiếu, và 1 điểm sau
      const prevPt = geom[Math.max(0, segIdx - 1)];
      const nextPt = geom[Math.min(geom.length - 1, segIdx + 2)];

      routePoints = [
        geom[Math.max(0, segIdx)],
        proj,
        geom[Math.min(geom.length - 1, segIdx + 1)]
      ];

      // Nếu có ngã ba, đưa ngã ba vào làm mốc Lai hoặc Khứ
      let laiPoint = routePoints[0];
      let khuPoint = routePoints[routePoints.length - 1];
      let laiSourceNote = 'Đầu đoạn đường tiếp cận';
      let khuSourceNote = 'Cuối đoạn đường tiếp cận';

      if (routeChain.interBackward) {
        laiPoint = routeChain.interBackward.point;
        laiSourceNote = `Ngã 3 liên thông (${routeChain.interBackward.connectedWays.join(', ') || 'giao lộ'})`;
      } else if (routeChain.interForward) {
        laiPoint = routeChain.interForward.point;
        laiSourceNote = `Ngã 3 liên thông (${routeChain.interForward.connectedWays.join(', ') || 'giao lộ'})`;
      }

      // Đảm bảo routePoints có ít nhất 3 điểm
      if (routePoints.length === 3 && (routeChain.interBackward || routeChain.interForward)) {
        routePoints = [laiPoint, proj, khuPoint];
      }

      // Tính phương vị địa lý thực tế (Geodesic Bearings)
      const laiBearing = Geo ? Geo.calculateGeodesicBearing(houseCenter, laiPoint) : 0;
      const khuBearing = Geo ? Geo.calculateGeodesicBearing(houseCenter, khuPoint) : 0;

      // Chiều dài đoạn tiếp cận trước nhà (Baseline)
      const baselineMeters = Geo ? Geo.calculateHaversineDistance(routePoints[0], routePoints[routePoints.length - 1]) : 20;

      // Đánh giá mức độ tin cậy (Confidence)
      let confidence = 'HIGH';
      const reasons = [];

      if (accessCandidate.distanceMeters > 30) {
        confidence = 'MEDIUM';
        reasons.push(`Nhà cách đường ${accessCandidate.distanceMeters.toFixed(1)}m (> 30m)`);
      }
      if (accessCandidate.diffFacing > 85) {
        confidence = 'LOW';
        reasons.push('Đoạn đường nằm sau lưng hoặc chếch xa hướng mặt tiền');
      }
      if (baselineMeters < 15) {
        if (confidence === 'HIGH') confidence = 'MEDIUM';
        reasons.push(`Đoạn chuẩn ngắn (${baselineMeters.toFixed(1)}m < 15m)`);
      }

      const MOUNTAINS = [
        'Tý', 'Quý', 'Sửu', 'Cấn', 'Dần', 'Giáp',
        'Mão', 'Ất', 'Thìn', 'Tốn', 'Tị', 'Bính',
        'Ngọ', 'Đinh', 'Mùi', 'Khôn', 'Thân', 'Canh',
        'Dậu', 'Tân', 'Tuất', 'Càn', 'Hợi', 'Nhâm'
      ];
      const getMountain = (deg) => {
        if (typeof deg !== 'number') return null;
        const norm = (deg % 360 + 360) % 360;
        const shifted = (norm + 7.5) % 360;
        const idx = Math.floor(shifted / 15);
        return MOUNTAINS[idx % 24];
      };

      const laiMountain = getMountain(laiBearing);
      const khuMountain = khuBearing !== null ? getMountain(khuBearing) : null;

      return {
        status: 'SUCCESS',
        hasAccessRoad: true,
        confidence,
        confidenceReasons: reasons,
        flowType: 'ROAD', // Ngữ nghĩa: Đường giao thông thực địa
        accessRoad: {
          id: accessWay.id,
          name: accessWay.name,
          highway: accessWay.highway,
          distanceMeters: accessCandidate.distanceMeters,
          distanceToHouseMeters: accessCandidate.distanceMeters
        },
        suggestion: {
          flowType: 'ROAD',
          confidence,
          laiBearing,
          khuBearing,
          laiMountain,
          khuMountain,
          laiPoint,
          khuPoint,
          laiSourceNote,
          khuSourceNote,
          polyline: routePoints,
          polylinePoints: routePoints,
          baselineMeters: Math.round(baselineMeters * 10) / 10
        },
        metadata: {
          ...metadata,
          algorithm: 'ROAD_GRAPH_TOPOLOGY_V1'
        }
      };
    }

    projectPointToSegment(p, a, b) {
      const cosLat = Math.cos((p.lat * Math.PI) / 180);
      const px = (p.lng - a.lng) * cosLat;
      const py = p.lat - a.lat;
      const bx = (b.lng - a.lng) * cosLat;
      const by = b.lat - a.lat;

      const len2 = bx * bx + by * by;
      if (len2 === 0) return { lat: a.lat, lng: a.lng };

      let t = (px * bx + py * by) / len2;
      t = Math.max(0, Math.min(1, t));

      return {
        lat: a.lat + t * (b.lat - a.lat),
        lng: a.lng + t * (b.lng - a.lng)
      };
    }

    createEmptyResult(status, metadata = {}) {
      return {
        status,
        hasAccessRoad: false,
        confidence: 'LOW',
        flowType: 'UNKNOWN',
        accessRoad: null,
        suggestion: null,
        metadata: {
          ...metadata,
          source: 'FALLBACK_MANUAL_REQUIRED'
        }
      };
    }
  }

  return RoadTopologyEngine;
}));
