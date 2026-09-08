/**
 * BO DONG CO PHAN TICH DO THI MANG DUONG & DO DAC TRAC DIA THUC TE (PURE GIS ROAD TOPOLOGY ENGINE V2)
 *
 * Chuyen trach:
 * 1. Xay dung do thi mang duong vector tu OpenStreetMap / GIS.
 * 2. Tim tuyen duong tiep can thuc te (Final Access Road) dua tren diem tiep xuc cong/cua (House Access Point).
 * 3. Trich xuat truc duong that (Road Axis) bang Cua So Hinh Hoc Thich Ung (Adaptive Local Geometry Window).
 * 4. Tach bach tuyet doi giua Truc Duong (Vo Huong) va Chieu Dong Chay (Lai / Khu).
 * 5. Danh gia do tin cay da tang (Layered Confidence Model).
 * 6. Fail-Safe bat buoc: Khi khong co du lieu duong GIS hoac loi mang, tra ve status = UNKNOWN.
 *    TUYET DOI KHONG TU DUNG DUONG GIA TU MAT TIEN NHA (+/- 90 do).
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
     * Phan tich toan dien mang duong GIS quanh tam nha
     * @param {Object} houseCenter - { lat, lng }
     * @param {number} facingBearing - Huong nha (0 - 360 do)
     * @param {Object} options - { accessPoint, radiusMeters: 200, bypassOsrm: false }
     */
    async analyzeRoadNetworkForHouse(houseCenter, facingBearing = 0, options = {}) {
      if (!houseCenter || typeof houseCenter.lat !== 'number' || typeof houseCenter.lng !== 'number') {
        return this.createUnknownResult('INVALID_HOUSE_CENTER', 'Toa do tam nha khong hop le.');
      }

      const accessPoint = options.accessPoint ||
        ((Geo && Geo.computeDestinationPoint) ? Geo.computeDestinationPoint(houseCenter, 4, facingBearing) : houseCenter);

      const isFixtureProvider = this.provider && typeof this.provider.getName === 'function' && this.provider.getName() === 'OFFLINE_FIXTURE';

      // =========================================================================
      // TANG 1: OSRM ROUTING (Chi dung khi tra ve day du toa do thuc te tu giao lo)
      // =========================================================================
      if (!isFixtureProvider && !options.bypassOsrm) {
        try {
          const osrmResult = await this.detectRoadViaOsrm(houseCenter, facingBearing, { ...options, accessPoint });
          if (osrmResult && osrmResult.hasAccessRoad && osrmResult.roadAxis) {
            return osrmResult;
          }
        } catch (_) {
          // Chuyen tiep Tang 2
        }
      }

      // =========================================================================
      // TANG 2: DO THI MANG DUONG VECTOR (Overpass Multi-mirror API hoac Fixture)
      // =========================================================================
      if (this.provider) {
        try {
          const radius = options.radiusMeters || 200;
          const roadData = await this.provider.getRoadNetwork(houseCenter.lat, houseCenter.lng, radius);
          const ways = (roadData && roadData.ways) || [];

          if (ways.length > 0) {
            const accessCandidate = this.findFinalAccessRoad(houseCenter, facingBearing, ways, {
              accessPoint,
              accessType: options.accessType || 'AUTO'
            });
            if (accessCandidate) {
              const graph = this.buildRoadGraph(ways);
              const nodesMap = graph ? (graph.nodes || graph) : null;
              const intersectionKeys = nodesMap && typeof nodesMap.keys === 'function'
                ? Array.from(nodesMap.keys()).filter(k => nodesMap.get(k).edges.length >= 3)
                : [];

              // Tinh cua so hinh hoc thich ung (Adaptive Local Geometry Window)
              const windowRes = (Geo && Geo.calculateAdaptiveGeometryWindow)
                ? Geo.calculateAdaptiveGeometryWindow(accessCandidate.way.geometry, accessCandidate.projectedPoint, {
                    maxDeflectionDeg: 35.0,
                    targetMaxSpanMeters: 80.0,
                    intersectionKeys: intersectionKeys
                  })
                : null;

              // Xac dinh Truc Duong Thuc Te (Road Axis - Vo Huong)
              const axisBearing = windowRes && typeof windowRes.roadAxisBearing === 'number'
                ? windowRes.roadAxisBearing
                : (Geo ? Geo.calculateGeodesicBearing(accessCandidate.p1, accessCandidate.p2) : 0);

              const roadAxis = {
                bearing: Math.round(axisBearing * 100) / 100,
                reverseBearing: Math.round(((axisBearing + 180) % 360) * 100) / 100,
                windowLengthMeters: windowRes ? windowRes.windowLengthMeters : accessCandidate.distanceMeters,
                samplePointsCount: windowRes ? windowRes.windowPoints.length : 2,
                startPoint: windowRes ? windowRes.windowPoints[0] : accessCandidate.p1,
                endPoint: windowRes ? windowRes.windowPoints[windowRes.windowPoints.length - 1] : accessCandidate.p2,
                isCurved: windowRes ? windowRes.isCurved : false,
                curvatureDegPerMeter: windowRes ? windowRes.curvatureDegPerMeter : 0,
                bearingStability: windowRes ? windowRes.bearingStability : 0,
                stopReason: windowRes ? windowRes.stopReason : 'GEOMETRY_END',
                stopReasonBackward: windowRes ? windowRes.stopReasonBackward : 'GEOMETRY_END',
                stopReasonForward: windowRes ? windowRes.stopReasonForward : 'GEOMETRY_END'
              };

              // Phan tich chieu dong chay (Flow Direction) doc theo topology mang duong
              const flowEval = this.evaluateFlowDirection(houseCenter, accessCandidate, graph, windowRes);

              // Tinh toan he thong diem tin cay da tang (Layered Confidence Model)
              const confidenceScores = this.calculateConfidenceScores(accessCandidate, windowRes, flowEval);

              const pA = roadAxis.startPoint;
              const pB = roadAxis.endPoint;
              const bearingA = Geo ? Geo.calculateGeodesicBearing(houseCenter, pA) : 0;
              const bearingB = Geo ? Geo.calculateGeodesicBearing(houseCenter, pB) : 0;
              const distA = Geo ? Geo.calculateHaversineDistance(houseCenter, pA) : 25;
              const distB = Geo ? Geo.calculateHaversineDistance(houseCenter, pB) : 25;

              const directions = {
                approachA: {
                  name: 'Hướng tiếp cận A',
                  point: pA,
                  bearing: Math.round(bearingA * 10) / 10,
                  distanceMeters: Math.round(distA * 10) / 10,
                  connectedRank: flowEval.interBackward ? flowEval.interBackward.maxConnectedRank : accessCandidate.way.rank,
                  intersectionType: flowEval.interBackward ? flowEval.interBackward.intersectionType : 'dau_mut',
                  sourceNote: flowEval.interBackward ? `Nút giao (${flowEval.interBackward.connectedWays.join(', ') || 'giao lộ'})` : 'Đầu mút đoạn'
                },
                approachB: {
                  name: 'Hướng tiếp cận B',
                  point: pB,
                  bearing: Math.round(bearingB * 10) / 10,
                  distanceMeters: Math.round(distB * 10) / 10,
                  connectedRank: flowEval.interForward ? flowEval.interForward.maxConnectedRank : accessCandidate.way.rank,
                  intersectionType: flowEval.interForward ? flowEval.interForward.intersectionType : 'dau_mut',
                  sourceNote: flowEval.interForward ? `Nút giao (${flowEval.interForward.connectedWays.join(', ') || 'giao lộ'})` : 'Đầu mút đoạn'
                },
                recommendedLai: flowEval.flowDirectionStatus === 'UPSTREAM_FOUND'
                  ? (flowEval.upstreamPoint === (flowEval.interBackward && flowEval.interBackward.point) ? 'A' : 'B')
                  : null,
                flowDirectionStatus: flowEval.flowDirectionStatus,
                reason: flowEval.flowDirectionStatus === 'UPSTREAM_FOUND'
                  ? 'Tìm thấy nút giao cấp cao hơn hoặc ngã ba liên thông'
                  : 'Đoạn đường đối xứng hai đầu hoặc không có ưu tiên lưu lượng rõ rệt'
              };

              return {
                status: 'SUCCESS',
                hasAccessRoad: true,
                message: 'Đã đo đạc thành công mạng đường GIS thực tế.',
                flowType: 'ROAD',
                flowDirectionStatus: flowEval.flowDirectionStatus,
                confidence: confidenceScores.overallConfidence,
                confidenceScores,
                confidenceReasons: confidenceScores.reasons,
                roadAxis,
                directions,
                accessRoad: {
                  id: accessCandidate.way.id,
                  name: accessCandidate.way.name,
                  highway: accessCandidate.way.highway,
                  rank: accessCandidate.way.rank,
                  distanceMeters: accessCandidate.distanceToHouseMeters,
                  distanceToHouseMeters: accessCandidate.distanceToHouseMeters,
                  distanceToAccessPointMeters: accessCandidate.distanceToAccessPointMeters,
                  projectedPoint: accessCandidate.projectedPoint,
                  rawGeometry: accessCandidate.way.geometry
                },
                suggestion: flowEval.suggestion,
                metadata: {
                  source: (roadData && roadData.metadata && roadData.metadata.source) || 'OVERPASS_VECTOR_GRAPH',
                  timestamp: Date.now(),
                  algorithm: 'PURE_GIS_ROAD_GEOMETRY_V2'
                }
              };
            }
          }
        } catch (_) {
          // Chuyen tiep Fail-Safe
        }
      }

      // =========================================================================
      // TANG 3: FAIL-SAFE BAT BUOC (UNKNOWN - TUYET DOI KHONG SINH DUONG GIA)
      // =========================================================================
      return this.createUnknownResult(
        'NO_SUITABLE_ACCESS_ROAD',
        'Không tìm thấy dữ liệu mạng đường vector ngoài bản đồ GIS. Vui lòng chỉnh Lai/Khứ thủ công trên ảnh vệ tinh.'
      );
    }

    /**
     * Tim doan duong tiep can nha bang he thong cham diem da tieu chi
     * Uu tien tuyet doi tuyen tiep can truoc mat tien nha (Access Point)
     */
    findFinalAccessRoad(houseCenter, facingBearing, ways, options = {}) {
      let bestCandidate = null;
      let highestScore = -Infinity;

      const accessPoint = (options && options.accessPoint) ||
        ((Geo && Geo.computeDestinationPoint) ? Geo.computeDestinationPoint(houseCenter, 4, facingBearing) : houseCenter);

      for (const way of ways) {
        if (!way.geometry || way.geometry.length < 2) continue;
        for (let i = 0; i < way.geometry.length - 1; i++) {
          const p1 = way.geometry[i];
          const p2 = way.geometry[i + 1];

          const projHouse = this.projectPointToSegment(houseCenter, p1, p2);
          const projAccess = this.projectPointToSegment(accessPoint, p1, p2);

          const distHouse = Geo ? Geo.calculateHaversineDistance(houseCenter, projHouse) : 999;
          const distAccess = Geo ? Geo.calculateHaversineDistance(accessPoint, projAccess) : distHouse;

          if (distHouse > 160 && distAccess > 160) continue;

          // Phuong vi tu tam nha den diem chieu tren duong
          const bearingToRoad = Geo ? Geo.calculateGeodesicBearing(houseCenter, projHouse) : 0;
          const diffFacing = Geo ? Geo.angularDistance(facingBearing, bearingToRoad) : 180;

          // 1. Diem mat tien:
          const isManualAccess = options && options.accessType === 'MANUAL';
          let frontageScore = 0;
          if (isManualAccess) {
            // Khi nguoi dung chi dinh Cong/Loi vao thu cong, diem tiep can duoc uu tien tuyet doi
            frontageScore = 40;
          } else {
            // Neu duong nam sau lung nha (> 90 do), ap muc phat nang (-50 den -120 diem)
            if (diffFacing <= 90) {
              frontageScore = Math.cos((diffFacing * Math.PI) / 180) * 45;
            } else {
              frontageScore = -50 - ((diffFacing - 90) / 90) * 70;
            }
          }

          // 2. Diem cu ly (uu tien cu ly tu House Access Point)
          const effectiveDist = isManualAccess ? distAccess : ((distAccess * 0.7) + (distHouse * 0.3));
          const distanceScore = Math.max(0, (1 - effectiveDist / 120)) * 60;

          // 3. Diem cap duong
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
              projectedPoint: projAccess,
              distanceMeters: Math.round(distHouse * 10) / 10,
              distanceToHouseMeters: Math.round(distHouse * 10) / 10,
              distanceToAccessPointMeters: Math.round(distAccess * 10) / 10,
              score: Math.round(totalScore * 10) / 10,
              diffFacing: Math.round(diffFacing * 10) / 10
            };
          }
        }
      }

      return bestCandidate;
    }

    /**
     * Xay dung do thi mang duong tu danh sach cac way vector
     */
    buildRoadGraph(ways) {
      const nodes = new Map();
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
     * Danh gia chieu dong chay (Flow Direction) doc theo topology mang duong
     * Tach bach ro rang: Truc duong la vo huong; chieu dong chay chi duoc gan khi co nga 3/4 ro ret
     */
    evaluateFlowDirection(houseCenter, accessCandidate, graph, windowRes) {
      const geom = accessCandidate.way.geometry;
      const pProj = accessCandidate.projectedPoint;
      const segIdx = accessCandidate.segmentIndex;
      const getKey = (pt) => `${pt.lat.toFixed(6)},${pt.lng.toFixed(6)}`;

      let interForward = null;
      let interBackward = null;

      const nodesMap = graph ? (graph.nodes || graph) : null;

      // Quet tien ve phia truoc
      for (let i = segIdx + 1; i < geom.length; i++) {
        const pt = geom[i];
        const node = nodesMap && typeof nodesMap.get === 'function' ? nodesMap.get(getKey(pt)) : null;
        if (node && node.edges.length >= 3) {
          interForward = {
            point: pt,
            index: i,
            intersectionType: node.edges.length === 3 ? 'nga_ba' : 'nga_tu',
            connectedWays: node.edges.map(e => e.way.name).filter(Boolean),
            maxConnectedRank: Math.max(...node.edges.map(e => e.way.rank || 0)),
            distanceMeters: Geo ? Geo.calculateHaversineDistance(pProj, pt) : 50
          };
          break;
        }
      }

      // Quet lui ve phia sau
      for (let i = segIdx; i >= 0; i--) {
        const pt = geom[i];
        const node = nodesMap && typeof nodesMap.get === 'function' ? nodesMap.get(getKey(pt)) : null;
        if (node && node.edges.length >= 3) {
          interBackward = {
            point: pt,
            index: i,
            intersectionType: node.edges.length === 3 ? 'nga_ba' : 'nga_tu',
            connectedWays: node.edges.map(e => e.way.name).filter(Boolean),
            maxConnectedRank: Math.max(...node.edges.map(e => e.way.rank || 0)),
            distanceMeters: Geo ? Geo.calculateHaversineDistance(pProj, pt) : 50
          };
          break;
        }
      }

      const pStart = geom[0];
      const pEnd = geom[geom.length - 1];

      let flowDirectionStatus = 'AMBIGUOUS';
      let upstreamPoint = null;
      let downstreamPoint = null;
      let laiSourceNote = '';
      let khuSourceNote = '';

      if (interBackward && !interForward) {
        flowDirectionStatus = 'UPSTREAM_FOUND';
        upstreamPoint = interBackward.point;
        downstreamPoint = pEnd;
        laiSourceNote = `Nga 3 lien thong (${interBackward.connectedWays.join(', ') || 'giao lo'})`;
        khuSourceNote = 'Loi thoat ha luu';
      } else if (interForward && !interBackward) {
        flowDirectionStatus = 'UPSTREAM_FOUND';
        upstreamPoint = interForward.point;
        downstreamPoint = pStart;
        laiSourceNote = `Nga 3 lien thong (${interForward.connectedWays.join(', ') || 'giao lo'})`;
        khuSourceNote = 'Loi thoat ha luu';
      } else if (interBackward && interForward) {
        if (interBackward.maxConnectedRank > interForward.maxConnectedRank + 1) {
          flowDirectionStatus = 'UPSTREAM_FOUND';
          upstreamPoint = interBackward.point;
          downstreamPoint = interForward.point;
          laiSourceNote = `Giao lo cap cao hon (${interBackward.connectedWays.join(', ') || 'giao lo'})`;
          khuSourceNote = `Giao lo phu (${interForward.connectedWays.join(', ') || 'giao lo'})`;
        } else if (interForward.maxConnectedRank > interBackward.maxConnectedRank + 1) {
          flowDirectionStatus = 'UPSTREAM_FOUND';
          upstreamPoint = interForward.point;
          downstreamPoint = interBackward.point;
          laiSourceNote = `Giao lo cap cao hon (${interForward.connectedWays.join(', ') || 'giao lo'})`;
          khuSourceNote = `Giao lo phu (${interBackward.connectedWays.join(', ') || 'giao lo'})`;
        } else {
          // Hai dau giao lo tuong duong -> Tuyen thong doi xung
          flowDirectionStatus = 'AMBIGUOUS';
        }
      } else {
        flowDirectionStatus = 'AMBIGUOUS';
      }

      const polyline = (windowRes && windowRes.windowPoints && windowRes.windowPoints.length >= 2)
        ? windowRes.windowPoints
        : geom;

      const baselineMeters = (windowRes && windowRes.windowLengthMeters) ||
        (Geo ? Geo.calculateHaversineDistance(polyline[0], polyline[polyline.length - 1]) : 25);

      let suggestion = null;

      if (flowDirectionStatus === 'UPSTREAM_FOUND' && upstreamPoint) {
        const laiBearing = Geo ? Geo.calculateGeodesicBearing(houseCenter, upstreamPoint) : null;
        const khuBearing = (downstreamPoint && Geo) ? Geo.calculateGeodesicBearing(houseCenter, downstreamPoint) : null;

        suggestion = {
          flowType: 'ROAD',
          flowDirectionStatus: 'UPSTREAM_FOUND',
          confidence: 'HIGH',
          approachBearing: laiBearing,
          departureBearing: khuBearing,
          laiBearing,
          khuBearing,
          laiMountain: this.getMountain(laiBearing),
          khuMountain: khuBearing !== null ? this.getMountain(khuBearing) : null,
          laiPoint: upstreamPoint,
          khuPoint: downstreamPoint,
          laiSourceNote: laiSourceNote || 'Dau tuyen tiep can (Lai Thuy)',
          khuSourceNote: khuSourceNote || 'Cuoi tuyen tiep can (Khu Thuy)',
          polyline,
          polylinePoints: polyline,
          baselineMeters: Math.round(baselineMeters * 10) / 10
        };
      } else {
        suggestion = {
          flowType: 'ROAD',
          flowDirectionStatus: 'AMBIGUOUS',
          confidence: 'MEDIUM',
          approachBearing: null,
          departureBearing: null,
          laiBearing: null,
          khuBearing: null,
          laiMountain: null,
          khuMountain: null,
          laiPoint: null,
          khuPoint: null,
          laiSourceNote: 'Chua xac dinh chieu (doi xung hai dau)',
          khuSourceNote: 'Can nguoi dung chon chieu Lai hoac Khu',
          polyline,
          polylinePoints: polyline,
          baselineMeters: Math.round(baselineMeters * 10) / 10
        };
      }

      return {
        flowDirectionStatus,
        interForward,
        interBackward,
        upstreamPoint,
        downstreamPoint,
        suggestion
      };
    }

    /**
     * Tinh toan he thong danh gia tin cay da tang (Layered Confidence Model)
     */
    calculateConfidenceScores(accessCandidate, windowRes, flowEval) {
      const reasons = [];

      // 1. Road Axis Confidence
      let roadAxisConfidence = 'HIGH';
      const span = windowRes ? windowRes.windowLengthMeters : 20;
      if (span < 15) {
        roadAxisConfidence = 'LOW';
        reasons.push(`Cua so hinh hoc ngan (${span}m < 15m)`);
      } else if (span < 30) {
        roadAxisConfidence = 'MEDIUM';
        reasons.push(`Cua so hinh hoc trung binh (${span}m)`);
      } else {
        reasons.push(`Cua so hinh hoc thich ung dat chuan (${span}m)`);
      }

      // 2. Geometry Confidence
      let geometryConfidence = 'HIGH';
      if (windowRes && windowRes.isCurved) {
        geometryConfidence = 'MEDIUM';
        reasons.push('Doan duong co do cong, da dung truoc goc ngoat lon');
      }

      // 3. Access Confidence
      let accessConfidence = 'HIGH';
      const dist = accessCandidate.distanceToHouseMeters;
      if (dist > 50) {
        accessConfidence = 'LOW';
        reasons.push(`Nha cach duong xa (${dist}m > 50m)`);
      } else if (dist > 25) {
        accessConfidence = 'MEDIUM';
        reasons.push(`Nha cach duong ${dist}m`);
      } else {
        reasons.push(`Nha tiep giap duong gan (${dist}m)`);
      }

      if (accessCandidate.diffFacing > 90) {
        accessConfidence = 'LOW';
        reasons.push('Tuyen duong nam lech goc mat tien');
      }

      // 4. Direction Confidence
      let directionConfidence = flowEval.flowDirectionStatus === 'UPSTREAM_FOUND' ? 'HIGH' : 'AMBIGUOUS';
      if (flowEval.flowDirectionStatus === 'AMBIGUOUS') {
        reasons.push('Duong thong hai dau doi xung, can xac nhan chieu dong khi');
      } else {
        reasons.push('Da phat hien nga 3/4 lien thong dau nguon');
      }

      // Overall Confidence
      let overallConfidence = 'HIGH';
      if (accessConfidence === 'LOW' || roadAxisConfidence === 'LOW') {
        overallConfidence = 'LOW';
      } else if (accessConfidence === 'MEDIUM' || roadAxisConfidence === 'MEDIUM' || directionConfidence === 'AMBIGUOUS') {
        overallConfidence = 'MEDIUM';
      }

      return {
        roadAxisConfidence,
        geometryConfidence,
        accessConfidence,
        directionConfidence,
        overallConfidence,
        reasons
      };
    }

    /**
     * Quet truc tiep giao lo nga 3/4 qua OSRM (Neu co tuyen route that)
     */
    async detectRoadViaOsrm(houseCenter, facingBearing = 0, options = {}) {
      if (!houseCenter || typeof houseCenter.lat !== 'number' || typeof houseCenter.lng !== 'number') return null;
      try {
        const nearestUrl = `https://router.project-osrm.org/nearest/v1/driving/${houseCenter.lng.toFixed(6)},${houseCenter.lat.toFixed(6)}?number=10`;
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 3500) : null;

        const res = await (typeof fetch !== 'undefined'
          ? fetch(nearestUrl, {
              signal: controller ? controller.signal : undefined,
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            })
          : null);

        if (timer) clearTimeout(timer);
        if (!res || !res.ok) return null;

        const data = await res.json();
        if (!data || data.code !== 'Ok' || !Array.isArray(data.waypoints) || data.waypoints.length === 0) {
          return null;
        }

        const waypoints = data.waypoints;
        const wp0 = waypoints[0];
        if (!wp0 || !Array.isArray(wp0.location) || wp0.location.length < 2) return null;
        if (wp0.distance > 300) return null;

        const p0 = { lat: wp0.location[1], lng: wp0.location[0] };
        const roadName0 = wp0.name || '';

        const junctionCandidates = [];
        for (let i = 1; i < waypoints.length; i++) {
          const wp = waypoints[i];
          if (!wp || !Array.isArray(wp.location) || wp.location.length < 2) continue;
          const pt = { lat: wp.location[1], lng: wp.location[0] };
          const distFromHouse = wp.distance || (Geo ? Geo.calculateHaversineDistance(houseCenter, pt) : 50);
          const distFromP0 = Geo ? Geo.calculateHaversineDistance(p0, pt) : distFromHouse;

          if (distFromP0 >= 12 && distFromP0 <= 450) {
            const isDifferentStreet = Boolean(wp.name && wp.name !== roadName0);
            junctionCandidates.push({
              wp,
              pt,
              distFromP0,
              distFromHouse,
              isDifferentStreet,
              name: wp.name || ''
            });
          }
        }

        junctionCandidates.sort((a, b) => {
          if (a.isDifferentStreet && !b.isDifferentStreet) return -1;
          if (!a.isDifferentStreet && b.isDifferentStreet) return 1;
          return b.distFromP0 - a.distFromP0;
        });

        const wpJunction = junctionCandidates.length > 0 ? junctionCandidates[0].wp : null;
        if (!wpJunction) return null;

        const routeUrl = `https://router.project-osrm.org/route/v1/driving/${wpJunction.location[0].toFixed(6)},${wpJunction.location[1].toFixed(6)};${wp0.location[0].toFixed(6)},${wp0.location[1].toFixed(6)}?overview=full&geometries=geojson`;
        const rController = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const rTimer = rController ? setTimeout(() => rController.abort(), 3000) : null;
        const rRes = await (typeof fetch !== 'undefined'
          ? fetch(routeUrl, {
              signal: rController ? rController.signal : undefined,
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            })
          : null);
        if (rTimer) clearTimeout(rTimer);

        if (!rRes || !rRes.ok) return null;
        const rData = await rRes.json();
        if (!rData || rData.code !== 'Ok' || !Array.isArray(rData.routes) || rData.routes.length === 0) {
          return null;
        }

        const coords = rData.routes[0].geometry.coordinates;
        if (!Array.isArray(coords) || coords.length < 2) return null;

        const routePoints = this.sampleRouteCoordinates(coords);
        if (!routePoints || routePoints.length < 2) return null;

        const laiPoint = routePoints[0];
        const khuPoint = routePoints[routePoints.length - 1];
        const laiBearing = Geo ? Geo.calculateGeodesicBearing(houseCenter, laiPoint) : 0;
        const khuBearing = Geo ? Geo.calculateGeodesicBearing(houseCenter, khuPoint) : 0;

        let compositeRoadName = roadName0;
        if (wpJunction && wpJunction.name && wpJunction.name !== roadName0) {
          compositeRoadName = compositeRoadName ? `${compositeRoadName} giao ${wpJunction.name}` : wpJunction.name;
        }
        if (!compositeRoadName) compositeRoadName = 'Giao lo thuc dia';

        const baselineMeters = Geo ? Geo.calculateHaversineDistance(laiPoint, khuPoint) : 30;
        const roadAxisBearing = Geo ? Geo.calculateGeodesicBearing(laiPoint, khuPoint) : 0;

        return {
          status: 'SUCCESS',
          hasAccessRoad: true,
          message: 'Bat tuyen tu giao lo OSRM thuc dia.',
          flowType: 'ROAD',
          flowDirectionStatus: 'UPSTREAM_FOUND',
          confidence: 'HIGH',
          confidenceScores: {
            roadAxisConfidence: 'HIGH',
            geometryConfidence: 'HIGH',
            accessConfidence: 'HIGH',
            directionConfidence: 'HIGH',
            overallConfidence: 'HIGH'
          },
          confidenceReasons: [
            `Bat tuyen truc tiep tu giao lo OSRM (${(wpJunction && wpJunction.name) || 'Giao lo'}) vao mat tien nha`,
            `Cu ly tiep can: ${Math.round(wp0.distance * 10) / 10}m`
          ],
          roadAxis: {
            bearing: Math.round(roadAxisBearing * 100) / 100,
            reverseBearing: Math.round(((roadAxisBearing + 180) % 360) * 100) / 100,
            windowLengthMeters: Math.round(baselineMeters * 10) / 10,
            samplePointsCount: routePoints.length,
            startPoint: laiPoint,
            endPoint: khuPoint,
            isCurved: routePoints.length > 2
          },
          accessRoad: {
            id: 'osrm_route',
            name: compositeRoadName,
            highway: 'residential',
            rank: 5,
            distanceMeters: Math.round(wp0.distance * 10) / 10,
            distanceToHouseMeters: Math.round(wp0.distance * 10) / 10,
            distanceToAccessPointMeters: Math.round(wp0.distance * 10) / 10,
            projectedPoint: p0,
            rawGeometry: routePoints
          },
          suggestion: {
            flowType: 'ROAD',
            flowDirectionStatus: 'UPSTREAM_FOUND',
            confidence: 'HIGH',
            approachBearing: laiBearing,
            departureBearing: khuBearing,
            laiBearing,
            khuBearing,
            laiMountain: this.getMountain(laiBearing),
            khuMountain: this.getMountain(khuBearing),
            laiPoint,
            khuPoint,
            laiSourceNote: `Nga 3 / giao lo (${(wpJunction && wpJunction.name) || 'Dau tuyen'})`,
            khuSourceNote: `Mat tien nha (${roadName0 || 'Loi vao'})`,
            polyline: routePoints,
            polylinePoints: routePoints,
            baselineMeters: Math.round(baselineMeters * 10) / 10
          },
          metadata: {
            source: 'OSRM_ROUTING_PRIMARY',
            timestamp: Date.now(),
            routingEngine: 'OSRM_PUBLIC_ROUTING_ENGINE',
            junctionName: (wpJunction && wpJunction.name) || '',
            accessRoadName: roadName0
          }
        };
      } catch (_) {
        return null;
      }
    }

    sampleRouteCoordinates(coords, maxPoints = 7) {
      if (!Array.isArray(coords) || coords.length === 0) return [];
      if (coords.length <= maxPoints) {
        return coords.map(c => ({ lat: c[1], lng: c[0] }));
      }
      const sampled = [];
      const step = (coords.length - 1) / (maxPoints - 1);
      for (let i = 0; i < maxPoints - 1; i++) {
        const c = coords[Math.round(i * step)];
        sampled.push({ lat: c[1], lng: c[0] });
      }
      const last = coords[coords.length - 1];
      sampled.push({ lat: last[1], lng: last[0] });
      return sampled;
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

    getMountain(deg) {
      if (typeof deg !== 'number' || !Number.isFinite(deg)) return null;
      const MOUNTAINS = [
        'Tý', 'Quý', 'Sửu', 'Cấn', 'Dần', 'Giáp',
        'Mão', 'Ất', 'Thìn', 'Tốn', 'Tị', 'Bính',
        'Ngọ', 'Đinh', 'Mùi', 'Khôn', 'Thân', 'Canh',
        'Dậu', 'Tân', 'Tuất', 'Càn', 'Hợi', 'Nhâm'
      ];
      const norm = (deg % 360 + 360) % 360;
      const shifted = (norm + 7.5) % 360;
      const idx = Math.floor(shifted / 15);
      return MOUNTAINS[idx % 24];
    }

    createUnknownResult(reasonCode, message) {
      return {
        status: 'UNKNOWN',
        hasAccessRoad: false,
        message: message || 'Không đủ dữ liệu đường ngoài bản đồ GIS. Vui lòng chỉnh Lai/Khứ thủ công trên ảnh vệ tinh.',
        flowType: 'UNKNOWN',
        flowDirectionStatus: 'UNKNOWN',
        confidence: 'LOW',
        confidenceScores: {
          roadAxisConfidence: 'LOW',
          geometryConfidence: 'LOW',
          accessConfidence: 'LOW',
          directionConfidence: 'UNKNOWN',
          overallConfidence: 'LOW'
        },
        confidenceReasons: [
          reasonCode || 'NO_SUITABLE_ACCESS_ROAD',
          message || 'Không tìm thấy dữ liệu đường vector thực tế quanh vị trí nhà'
        ],
        roadAxis: null,
        accessRoad: null,
        suggestion: null,
        metadata: {
          algorithm: 'PURE_GIS_ROAD_GEOMETRY_V2',
          reasonCode,
          timestamp: Date.now()
        }
      };
    }
  }

  return RoadTopologyEngine;
}));
