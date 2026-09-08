/**
 * KIỂM THỬ ĐỘNG CƠ MẠNG ĐƯỜNG & TOPOLOGY (ROAD TOPOLOGY ENGINE TEST)
 */

const assert = require('assert');
const RoadTopologyEngine = require('../js/road_topology_engine');
const { OfflineFixtureRoadProvider, BaseRoadProvider } = require('../js/road_network_provider');

async function runAllTests() {
  console.log('=== BẮT ĐẦU KIỂM THỬ: ROAD TOPOLOGY & AUTO SUGGESTION ENGINE ===\n');

  // 1. Kiểm thử Road Network Provider & Offline Fixtures
  console.log('1. Kiểm thử Road Network Provider & Offline Fixtures:');
  {
    const fixtureProvider = new OfflineFixtureRoadProvider();
    assert.equal(fixtureProvider.getName(), 'OFFLINE_FIXTURE');

    const roadData = await fixtureProvider.getRoadNetwork(21.0253, 105.8568, 200);
    assert.ok(Array.isArray(roadData.ways), 'Must return an array of ways');
    assert.ok(roadData.ways.length >= 2, 'Fixture must contain at least 2 roads');
    console.log(`  ✓ PASS: Fixture Provider cung cấp ${roadData.ways.length} tuyến đường mẫu an toàn không cần mạng`);
  }

  // 2. Kiểm thử Xây dựng Đồ Thị Mạng Đường (Road Graph)
  console.log('\n2. Kiểm thử Xây dựng Đồ Thị Mạng Đường (Road Graph):');
  {
    const topologyEngine = new RoadTopologyEngine();
    const mockWays = [
      {
        id: 'way_main_st',
        name: 'Đường Nguyễn Huệ',
        highway: 'primary',
        rank: 8,
        geometry: [
          { lat: 10.7740, lng: 106.7020 },
          { lat: 10.7750, lng: 106.7030 }, // Giao lộ ngã 3
          { lat: 10.7760, lng: 106.7040 }
        ]
      },
      {
        id: 'way_alley_1',
        name: 'Hẻm 12',
        highway: 'residential',
        rank: 4,
        geometry: [
          { lat: 10.7750, lng: 106.7030 }, // Nối vào Nguyễn Huệ
          { lat: 10.7752, lng: 106.7025 }, // Đi ngang mặt tiền nhà
          { lat: 10.7754, lng: 106.7020 }  // Tiếp tục chạy sâu vào
        ]
      }
    ];

    const graph = topologyEngine.buildRoadGraph(mockWays);
    assert.ok(graph.nodes.size >= 5, `Graph must have at least 5 nodes (got ${graph.nodes.size})`);
    assert.ok(graph.edges.length >= 3, `Graph must have edges (got ${graph.edges.length})`);
    assert.ok(graph.intersections.length >= 1, `Must detect intersection at junction (got ${graph.intersections.length})`);
    console.log(`  ✓ PASS: Đồ thị xây dựng thành công: ${graph.nodes.size} nodes, ${graph.edges.length} edges, ${graph.intersections.length} giao lộ`);
  }

  // 3. Kiểm thử Nhận diện Tuyến Tiếp Cận Nhà (Final Access Road) & Scoring Đa Tiêu Chí
  console.log('\n3. Kiểm thử Nhận diện Tuyến Tiếp Cận Nhà (Final Access Road):');
  {
    const topologyEngine = new RoadTopologyEngine();
    // Căn nhà ở tọa độ: { lat: 10.77522, lng: 106.70248 }
    // Mặt tiền nhìn hướng ~330° (hướng về phía Hẻm 12)
    const houseCenter = { lat: 10.77522, lng: 106.70248 };
    const houseFacing = 330.0;

    const mockWays = [
      {
        id: 'way_main_boulevard',
        name: 'Đại lộ Lê Lợi',
        highway: 'primary',
        rank: 8,
        geometry: [
          { lat: 10.7730, lng: 106.7010 },
          { lat: 10.7730, lng: 106.7050 }
        ] // Cách nhà > 200m
      },
      {
        id: 'way_direct_alley',
        name: 'Hẻm 12 Nguyễn Huệ',
        highway: 'residential',
        rank: 4,
        geometry: [
          { lat: 10.7750, lng: 106.7030 },
          { lat: 10.7752, lng: 106.7025 }, // Rất sát nhà (~5m)
          { lat: 10.7755, lng: 106.7018 }
        ]
      }
    ];

    const accessRoad = topologyEngine.findFinalAccessRoad(houseCenter, houseFacing, mockWays);

    assert.ok(accessRoad !== null, 'Must find access road');
    assert.equal(accessRoad.id, 'way_direct_alley', 'Must correctly identify Hẻm 12 Nguyễn Huệ as access road');
    assert.ok(accessRoad.distanceToHouseMeters < 15, `Distance must be small (got ${accessRoad.distanceToHouseMeters}m)`);
    console.log(`  ✓ PASS: Nhận diện chuẩn xác tuyến tiếp cận: "${accessRoad.name}" (Cách nhà: ${accessRoad.distanceToHouseMeters}m, Cấp: ${accessRoad.highway})`);
  }

  // 4. Kiểm thử Truy Vết Giao Lộ Ngược & Đề Xuất Lai / Khứ Tự Động
  console.log('\n4. Kiểm thử Đề Xuất Tuyến Lai / Khứ Tự Động (Auto Road Detection):');
  {
    const fixtureProvider = new OfflineFixtureRoadProvider();
    const topologyEngine = new RoadTopologyEngine({ roadProvider: fixtureProvider });

    // Tâm nhà đặt ở khu vực Tràng Tiền - Hà Nội
    const houseCenter = { lat: 21.0253, lng: 105.8568 };
    const houseFacing = 45.0; // Đông Bắc

    const result = await topologyEngine.analyzeRoadNetworkForHouse(houseCenter, houseFacing);

    assert.ok(result !== null, 'Result must not be null');
    assert.equal(result.hasAccessRoad, true, 'Must find access road from fixture');
    assert.ok(result.suggestion !== null, 'Must have auto suggestion');
    assert.equal(result.suggestion.flowType, 'ROAD', 'Flow type must be ROAD');
    assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(result.suggestion.confidence), 'Must have valid confidence');
    assert.ok(typeof result.suggestion.laiBearing === 'number', 'Must compute Lai bearing');
    assert.ok(Array.isArray(result.suggestion.polyline), 'Must provide polyline coordinates');
    assert.ok(result.suggestion.polyline.length >= 2, 'Polyline must have at least 2 points');

    console.log(`  ✓ PASS: Đề xuất tự động thành công:`);
    console.log(`    - Đoạn tiếp cận: "${result.accessRoad.name}"`);
    console.log(`    - Phương vị Lai: ${result.suggestion.laiBearing.toFixed(1)}° (${result.suggestion.laiMountain} Sơn)`);
    console.log(`    - Phương vị Khứ: ${result.suggestion.khuBearing ? `${result.suggestion.khuBearing.toFixed(1)}° (${result.suggestion.khuMountain} Sơn)` : 'Hẻm cụt'}`);
    console.log(`    - Độ tin cậy (Confidence): ${result.suggestion.confidence}`);
    console.log(`    - Số mốc vector: ${result.suggestion.polyline.length} điểm`);

    console.log('\n======================================================');
    console.log('KẾT QUẢ KIỂM THỬ ROAD TOPOLOGY ENGINE: 100% PASSED!');
    console.log('======================================================\n');
  }
}

runAllTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
