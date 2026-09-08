/**
 * NGUỒN CUNG CẤP DỮ LIỆU MẠNG ĐƯỜNG (ROAD NETWORK PROVIDER)
 * Kiến trúc trừu tượng (Provider Abstraction) hỗ trợ:
 * 1. OverpassRoadProvider: Lấy dữ liệu mạng đường vector thật từ OpenStreetMap.
 * 2. Caching đa tầng (RAM + LocalStorage) chống spam request, bảo toàn hiệu năng.
 * 3. Fallback đa endpoint & xử lý ngoại tuyến / lỗi mạng không làm crash ứng dụng.
 * 4. OfflineFixtureRoadProvider: Dùng cho kiểm thử độc lập và offline.
 * 5. Snap to road: Chiếu điểm vào tim đường với ngưỡng khoảng cách an toàn.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./geo_measurement_engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./geo_measurement_engine'));
  } else {
    const mod = factory(root.GeoMeasurementEngine);
    root.RoadNetworkProvider = mod;
    root.OverpassRoadProvider = mod.OverpassRoadProvider;
    root.OfflineFixtureRoadProvider = mod.OfflineFixtureRoadProvider;
    root.BaseRoadProvider = mod.BaseRoadProvider;
    root.snapPointToRoad = mod.snapPointToRoad;
  }
}(typeof self !== 'undefined' ? self : this, function(GeoEngine) {
  'use strict';

  const Geo = GeoEngine || (typeof window !== 'undefined' ? window.GeoMeasurementEngine : null);

  // Danh mục thứ bậc các cấp đường
  const ROAD_HIERARCHY = {
    motorway: 10, trunk: 9, primary: 8, secondary: 7, tertiary: 6,
    unclassified: 5, residential: 4, living_street: 3, service: 2,
    alley: 2, track: 1
  };

  class BaseRoadProvider {
    /**
     * Lấy mạng đường vector quanh tọa độ
     * @param {number} lat
     * @param {number} lng
     * @param {number} radiusMeters
     * @returns {Promise<Object>} { ways, nodes, metadata }
     */
    async getRoadNetwork(lat, lng, radiusMeters = 200) {
      throw new Error('Method getRoadNetwork() must be implemented by subclass');
    }

    /**
     * Chiếu một tọa độ vào đoạn đường gần nhất (Snap to road)
     * @param {Object} point - { lat, lng }
     * @param {Array} ways - Danh sách ways
     * @param {number} maxSnapDistanceMeters - Khoảng cách tối đa cho phép snap (mặc định 35m)
     */
    snapPointToRoad(point, ways, maxSnapDistanceMeters = 35) {
      if (!point || !Array.isArray(ways) || ways.length === 0) return null;
      let bestSnap = null;
      let minDistance = Infinity;

      for (const way of ways) {
        if (!way.geometry || way.geometry.length < 2) continue;
        for (let i = 0; i < way.geometry.length - 1; i++) {
          const p1 = way.geometry[i];
          const p2 = way.geometry[i + 1];

          // Chiếu điểm vào đoạn thẳng phẳng gần đúng cục bộ
          const proj = this.projectPointToSegment(point, p1, p2);
          const dist = Geo ? Geo.calculateHaversineDistance(point, proj) : 999;

          if (dist < minDistance && dist <= maxSnapDistanceMeters) {
            minDistance = dist;
            bestSnap = {
              snappedPoint: proj,
              distanceMeters: Math.round(dist * 10) / 10,
              way,
              segmentIndex: i,
              p1,
              p2
            };
          }
        }
      }

      return bestSnap;
    }

    projectPointToSegment(p, a, b) {
      // Chiếu phẳng trên hệ tọa độ vĩ độ/kinh độ gần đúng tỷ lệ cos(lat)
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
  }

  /**
   * Provider thực tế truy vấn Overpass API với bộ nhớ đệm
   */
  class OverpassRoadProvider extends BaseRoadProvider {
    constructor(options = {}) {
      super();
      this.timeoutMs = options.timeoutMs || 4000;
      this.cache = new Map();
      this.endpoints = options.endpoints || [
        'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter',
        'https://overpass.private.coffee/api/interpreter',
        'https://overpass-api.de/api/interpreter'
      ];
    }

    getCacheKey(lat, lng, radius) {
      return `${lat.toFixed(3)}_${lng.toFixed(3)}_${Math.round(radius)}`;
    }

    getFromStorage(key) {
      try {
        if (typeof localStorage !== 'undefined') {
          const item = localStorage.getItem(`dt_road_${key}`);
          if (item) {
            const parsed = JSON.parse(item);
            if (Date.now() - parsed.ts < 86400000) { // 24h TTL
              return parsed.data;
            }
          }
        }
      } catch (_) {}
      return null;
    }

    saveToStorage(key, data) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`dt_road_${key}`, JSON.stringify({ ts: Date.now(), data }));
        }
      } catch (_) {}
    }

    async getRoadNetwork(lat, lng, radiusMeters = 200) {
      const radius = Math.min(500, Math.max(80, radiusMeters));
      const cacheKey = this.getCacheKey(lat, lng, radius);

      // 1. Kiểm tra Cache RAM
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // 2. Kiểm tra Cache LocalStorage
      const stored = this.getFromStorage(cacheKey);
      if (stored) {
        this.cache.set(cacheKey, stored);
        return stored;
      }

      // 3. Xây dựng Overpass QL Query
      const query = `[out:json][timeout:8];way(around:${radius},${lat},${lng})[highway];out geom;`;

      let lastError = null;
      for (const endpoint of this.endpoints) {
        try {
          const url = `${endpoint}?data=${encodeURIComponent(query)}`;
          const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
          const timer = controller ? setTimeout(() => controller.abort(), this.timeoutMs) : null;

          const res = await (typeof fetch !== 'undefined'
            ? fetch(url, { signal: controller ? controller.signal : undefined, headers: { 'Accept': 'application/json' } })
            : Promise.reject(new Error('fetch unavailable')));

          if (timer) clearTimeout(timer);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();
          const ways = this.normalizeElements(data.elements || []);

          const result = {
            ways,
            center: { lat, lng },
            radiusMeters: radius,
            metadata: {
              source: 'OVERPASS_OSM',
              timestamp: Date.now(),
              count: ways.length,
              provider: endpoint
            }
          };

          this.cache.set(cacheKey, result);
          this.saveToStorage(cacheKey, result);
          return result;

        } catch (err) {
          lastError = err;
          // Tự động thử mirror kế tiếp
        }
      }

      // Fallback an toàn khi toàn bộ mirror lỗi/timeout: Trả về rỗng không crash
      return {
        ways: [],
        center: { lat, lng },
        radiusMeters: radius,
        metadata: {
          source: 'FALLBACK_OFFLINE',
          timestamp: Date.now(),
          count: 0,
          error: lastError ? lastError.message : 'ALL_MIRRORS_FAILED'
        }
      };
    }

    normalizeElements(elements) {
      const ways = [];
      const ignoredTypes = new Set(['footway', 'pedestrian', 'steps', 'path', 'cycleway', 'proposed', 'construction', 'platform']);

      for (const el of elements) {
        if (el.type !== 'way' || !el.tags || !el.tags.highway) continue;
        const highway = el.tags.highway;
        if (ignoredTypes.has(highway)) continue;
        if (!Array.isArray(el.geometry) || el.geometry.length < 2) continue;

        const rank = ROAD_HIERARCHY[highway] || 3;
        ways.push({
          id: el.id,
          name: el.tags.name || el.tags['name:vi'] || el.tags['name:en'] || 'Đường nội bộ / hẻm',
          highway,
          rank,
          oneway: el.tags.oneway === 'yes',
          geometry: el.geometry.map(pt => ({ lat: pt.lat, lng: pt.lon })),
          tags: el.tags
        });
      }

      // Sắp xếp theo thứ bậc đường ưu tiên
      return ways.sort((a, b) => b.rank - a.rank);
    }
  }

  /**
   * Provider dùng Fixtures tĩnh cho Unit Tests và offline
   */
  class OfflineFixtureRoadProvider extends BaseRoadProvider {
    constructor(fixtures = []) {
      super();
      this.fixtures = Array.isArray(fixtures) && fixtures.length > 0 ? fixtures : [
        {
          id: 'fixture_primary',
          name: 'Phố Tràng Tiền',
          highway: 'primary',
          rank: 8,
          geometry: [
            { lat: 21.0250, lng: 105.8560 },
            { lat: 21.0253, lng: 105.8570 },
            { lat: 21.0256, lng: 105.8580 }
          ]
        },
        {
          id: 'fixture_alley',
          name: 'Ngõ Tràng Tiền',
          highway: 'residential',
          rank: 4,
          geometry: [
            { lat: 21.0253, lng: 105.8570 },
            { lat: 21.02532, lng: 105.85685 },
            { lat: 21.02535, lng: 105.8566 }
          ]
        }
      ];
    }

    getName() {
      return 'OFFLINE_FIXTURE';
    }

    setFixtures(fixtures) {
      this.fixtures = Array.isArray(fixtures) ? fixtures : [];
    }

    async getRoadNetwork(lat, lng, radiusMeters = 200) {
      return {
        ways: this.fixtures,
        center: { lat, lng },
        radiusMeters,
        metadata: {
          source: 'OFFLINE_FIXTURE',
          timestamp: Date.now(),
          count: this.fixtures.length
        }
      };
    }
  }

  return {
    BaseRoadProvider,
    OverpassRoadProvider,
    OfflineFixtureRoadProvider,
    ROAD_HIERARCHY
  };
}));
