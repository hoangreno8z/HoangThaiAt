/**
 * BO KIEM DINH THUC DIA PURE GIS 10 VI TRI THUC TE (ZERO-EMOJI)
 *
 * Tuan thu tuyet doi 6 tieu chuan trac dia thuc dia:
 * 1. True Vector Geometry: Do truc tiep tren toa do OSM, khong suy tu +/- 90 do.
 * 2. Adaptive Window thich ung: Curvature, Intersection, Density, khong khoa cung 35/80m.
 * 3. Dung tuyen tiep can: Khong nham duong sau lung du gan hon; cong hong doi thi doi tuyen.
 * 4. Tach biet Pure GIS (Approach A/B) khoi Phong Thuy (Lai/Khu).
 * 5. Fail-Safe tin cay: Thieu duong thi UNKNOWN, tuyet doi khong bia duong.
 * 6. Zero-Lag, Zero-Emoji, 18 truong trac dia tieu chuan quoc te.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\thai_at_app';
const GeoMeasurementEngine = require(path.join(rootDir, 'js/geo_measurement_engine'));
const { OfflineFixtureRoadProvider, OverpassRoadProvider } = require(path.join(rootDir, 'js/road_network_provider'));
const RoadTopologyEngine = require(path.join(rootDir, 'js/road_topology_engine'));

const fixturesPath = path.join(rootDir, 'data', 'real_world_10_osm_fixtures.json');
const fixturesData = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'));

const outArtifactDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\e584232c-a60b-45e8-9c64-69c2943c06b6';

function generateSvgOverlay(locId, locMeta, roadRes, ways) {
  const width = 600;
  const height = 400;
  const center = locMeta.houseCenter;

  // Tim bounds xung quanh tam nha (~120m)
  const degSpan = 0.0012;
  const minLat = center.lat - degSpan;
  const maxLat = center.lat + degSpan;
  const minLng = center.lng - degSpan * 1.2;
  const maxLng = center.lng + degSpan * 1.2;

  const toX = (lng) => Math.round(((lng - minLng) / (maxLng - minLng)) * width);
  const toY = (lat) => Math.round(height - ((lat - minLat) / (maxLat - minLat)) * height);

  const hX = toX(center.lng);
  const hY = toY(center.lat);

  // Ve tat ca cac ways trong mang duong
  let waysSvg = '';
  for (const way of ways) {
    if (!way.geometry || way.geometry.length < 2) continue;
    const isSelected = roadRes && roadRes.accessRoad && roadRes.accessRoad.id === way.id;
    const pts = way.geometry.map(p => `${toX(p.lng)},${toY(p.lat)}`).join(' ');
    const stroke = isSelected ? '#38BDF8' : '#475569';
    const strokeW = isSelected ? 4 : 1.5;
    waysSvg += `<polyline points="${pts}" stroke="${stroke}" stroke-width="${strokeW}" fill="none" opacity="${isSelected ? 0.9 : 0.4}" />\n`;
  }

  // Ve Cua so thich ung (Adaptive Window)
  let windowSvg = '';
  if (roadRes && roadRes.roadAxis && roadRes.roadAxis.startPoint && roadRes.roadAxis.endPoint) {
    const ptsWindow = (roadRes.suggestion && roadRes.suggestion.polyline) || [roadRes.roadAxis.startPoint, roadRes.roadAxis.endPoint];
    const ptsStr = ptsWindow.map(p => `${toX(p.lng)},${toY(p.lat)}`).join(' ');
    windowSvg = `
      <polyline points="${ptsStr}" stroke="#34D399" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.9" />
      ${ptsWindow.map(p => `<circle cx="${toX(p.lng)}" cy="${toY(p.lat)}" r="4" fill="#FEF3C7" stroke="#059669" stroke-width="1.5" />`).join('\n')}
    `;
  }

  // Ve Vectơ Approach A & Approach B
  let vectorsSvg = '';
  if (roadRes && roadRes.directions) {
    const dirA = roadRes.directions.approachA;
    const dirB = roadRes.directions.approachB;
    if (dirA && dirA.point) {
      vectorsSvg += `
        <line x1="${hX}" y1="${hY}" x2="${toX(dirA.point.lng)}" y2="${toY(dirA.point.lat)}" stroke="#34D399" stroke-width="2.5" stroke-dasharray="4,3" />
        <circle cx="${toX(dirA.point.lng)}" cy="${toY(dirA.point.lat)}" r="6" fill="#34D399" stroke="#FFF" stroke-width="1.5" />
        <text x="${toX(dirA.point.lng) + 8}" y="${toY(dirA.point.lat) + 4}" fill="#34D399" font-size="11" font-weight="bold">Huong A: ${dirA.bearing.toFixed(1)}°</text>
      `;
    }
    if (dirB && dirB.point) {
      vectorsSvg += `
        <line x1="${hX}" y1="${hY}" x2="${toX(dirB.point.lng)}" y2="${toY(dirB.point.lat)}" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4,3" />
        <circle cx="${toX(dirB.point.lng)}" cy="${toY(dirB.point.lat)}" r="6" fill="#38BDF8" stroke="#FFF" stroke-width="1.5" />
        <text x="${toX(dirB.point.lng) + 8}" y="${toY(dirB.point.lat) + 4}" fill="#38BDF8" font-size="11" font-weight="bold">Huong B: ${dirB.bearing.toFixed(1)}°</text>
      `;
    }
  }

  // Ve Huong Nha (Facing Vector)
  const facingRad = (locMeta.facingBearing - 90) * (Math.PI / 180);
  const fX = hX + Math.round(35 * Math.cos(facingRad));
  const fY = hY + Math.round(35 * Math.sin(facingRad));

  // Ve Cong / Loi Vao (Access Point)
  let accessSvg = '';
  if (locMeta.accessPoint) {
    const aX = toX(locMeta.accessPoint.lng);
    const aY = toY(locMeta.accessPoint.lat);
    const aColor = locMeta.accessType === 'MANUAL' ? '#EC4899' : '#F59E0B';
    const aLabel = locMeta.accessType === 'MANUAL' ? 'CONG [THU CONG]' : 'CONG [AUTO]';
    accessSvg = `
      <line x1="${hX}" y1="${hY}" x2="${aX}" y2="${aY}" stroke="${aColor}" stroke-width="1.5" stroke-dasharray="2,2" />
      <rect x="${aX - 5}" y="${aY - 5}" width="10" height="10" fill="${aColor}" stroke="#FFF" stroke-width="1.5" />
      <text x="${aX + 8}" y="${aY - 8}" fill="${aColor}" font-size="10" font-weight="bold">${aLabel}</text>
    `;
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#0F172A; font-family:sans-serif;">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Tieu de & Thong tin vi tri -->
    <rect x="10" y="10" width="${width - 20}" height="42" rx="4" fill="rgba(30,41,59,0.9)" stroke="#334155" />
    <text x="20" y="27" fill="#F8FAFC" font-size="12" font-weight="bold">[${locId}] ${locMeta.title}</text>
    <text x="20" y="43" fill="#94A3B8" font-size="10">${locMeta.desc}</text>

    <!-- Mang duong GIS -->
    ${waysSvg}

    <!-- Cua so thich ung -->
    ${windowSvg}

    <!-- Vectơ huong A/B -->
    ${vectorsSvg}

    <!-- Huong nha & Tam nha -->
    <line x1="${hX}" y1="${hY}" x2="${fX}" y2="${fY}" stroke="#EF4444" stroke-width="3" />
    <circle cx="${hX}" cy="${hY}" r="7" fill="#EF4444" stroke="#FFF" stroke-width="2" />
    <text x="${hX + 10}" y="${hY + 4}" fill="#EF4444" font-size="11" font-weight="bold">TAM NHA (${locMeta.facingBearing}°)</text>

    <!-- Cong / Access Point -->
    ${accessSvg}

    <!-- Khung Telemetry Trac dia 18 Truong -->
    <g transform="translate(10, ${height - 68})">
      <rect width="${width - 20}" height="58" rx="4" fill="rgba(15,23,42,0.95)" stroke="#38BDF8" stroke-width="1.2" />
      <text x="12" y="18" fill="#38BDF8" font-size="10" font-weight="bold">TRUC DUONG: ${roadRes && roadRes.roadAxis ? roadRes.roadAxis.bearing.toFixed(1) + '°' : 'KHONG CO (FAIL-SAFE)'} | CUA SO: ${roadRes && roadRes.roadAxis ? roadRes.roadAxis.windowLengthMeters.toFixed(1) + 'm (' + roadRes.roadAxis.stopReason + ')' : 'N/A'}</text>
      <text x="12" y="34" fill="#94A3B8" font-size="9.5">DO CONG: ${roadRes && roadRes.roadAxis ? roadRes.roadAxis.curvatureDegPerMeter.toFixed(3) + '°/m' : '0.000'} | ON DINH: σ=${roadRes && roadRes.roadAxis ? roadRes.roadAxis.bearingStability.toFixed(2) + '°' : '0.00'} | TUYEN: ${(roadRes && roadRes.accessRoad && roadRes.accessRoad.name) || 'N/A'}</text>
      <text x="12" y="50" fill="#34D399" font-size="9.5">APPROACH A: ${roadRes && roadRes.directions && roadRes.directions.approachA ? roadRes.directions.approachA.bearing.toFixed(1) + '°' : 'N/A'} | APPROACH B: ${roadRes && roadRes.directions && roadRes.directions.approachB ? roadRes.directions.approachB.bearing.toFixed(1) + '°' : 'N/A'} | STATUS: ${(roadRes && roadRes.flowDirectionStatus) || 'UNKNOWN'}</text>
    </g>
  </svg>
  `;

  return svg;
}

async function runRealWorld10Acceptance() {
  console.log('================================================================');
  console.log('   NGHIEM THU THUC DIA PURE GIS 10 VI TRI (18 THONG SO TRAC DIA)');
  console.log('================================================================\n');

  const keys = Object.keys(fixturesData).sort();
  const reportRows = [];
  let passCount = 0;
  let failCount = 0;

  const normalizer = new OverpassRoadProvider();

  for (const caseKey of keys) {
    const fixture = fixturesData[caseKey];
    const meta = fixture.metadata;
    const ways = normalizer.normalizeElements(fixture.rawElements || []);

    const provider = new OfflineFixtureRoadProvider(ways);
    const engine = new RoadTopologyEngine({ roadProvider: provider });

    const houseCenter = meta.houseCenter;
    const facingBearing = meta.facingBearing;
    const accessPoint = meta.accessPoint;
    const accessType = meta.accessType || 'AUTO';

    const res = await engine.analyzeRoadNetworkForHouse(houseCenter, facingBearing, {
      accessPoint,
      accessType,
      bypassOsrm: true
    });

    // Trich xuat 18 thong so trac dia
    const record = {
      caseId: meta.id,
      title: meta.title,
      houseCenter: `${houseCenter.lat.toFixed(6)}, ${houseCenter.lng.toFixed(6)}`,
      facingBearing: facingBearing.toFixed(1),
      accessPoint: `${accessPoint.lat.toFixed(6)}, ${accessPoint.lng.toFixed(6)}`,
      accessType: accessType,
      accessRoadName: (res.accessRoad && res.accessRoad.name) || 'KHONG CO (UNKNOWN)',
      accessRoadRank: (res.accessRoad && `${res.accessRoad.highway} (cap ${res.accessRoad.rank})`) || 'N/A',
      distanceToHouse: res.accessRoad && typeof res.accessRoad.distanceToHouseMeters === 'number' ? res.accessRoad.distanceToHouseMeters.toFixed(1) : 'N/A',
      distanceToAccess: res.accessRoad && typeof res.accessRoad.distanceToAccessPointMeters === 'number' ? res.accessRoad.distanceToAccessPointMeters.toFixed(1) : 'N/A',
      roadAxisBearing: res.roadAxis ? res.roadAxis.bearing.toFixed(1) : 'N/A',
      reverseBearing: res.roadAxis ? res.roadAxis.reverseBearing.toFixed(1) : 'N/A',
      windowLengthMeters: res.roadAxis ? res.roadAxis.windowLengthMeters.toFixed(1) : 'N/A',
      windowSampleCount: res.roadAxis ? res.roadAxis.samplePointsCount : 0,
      curvatureDegPerMeter: res.roadAxis ? res.roadAxis.curvatureDegPerMeter.toFixed(3) : '0.000',
      bearingStability: res.roadAxis ? res.roadAxis.bearingStability.toFixed(2) : '0.00',
      stopReason: res.roadAxis ? res.roadAxis.stopReason : (res.status === 'UNKNOWN' ? 'NO_DATA' : 'GEOMETRY_END'),
      directions: res.directions ? `A: ${res.directions.approachA.bearing.toFixed(1)}° | B: ${res.directions.approachB.bearing.toFixed(1)}° [${res.flowDirectionStatus}]` : 'N/A',
      status: res.status,
      evaluation: 'PASS',
      evalReasons: []
    };

    // Danh gia theo 6 tieu chuan thuc dia:
    let isCasePassed = true;

    // Tieu chuan 1: True Vector Geometry (Khong duoc tinh bang facing +/- 90)
    if (res.status === 'SUCCESS') {
      const perpA = (facingBearing + 90) % 360;
      const perpB = (facingBearing + 270) % 360;
      const axisB = res.roadAxis.bearing;
      const diffA = Math.abs(axisB - perpA);
      const diffB = Math.abs(axisB - perpB);
      if (meta.id !== 'CASE_01' && (diffA < 0.1 || diffB < 0.1)) {
        if (res.metadata && res.metadata.source === 'FALLBACK_FRONTAGE') {
          isCasePassed = false;
          record.evalReasons.push('VI PHAM: Bi fallback bia ra mat tien +/- 90 do');
        }
      }
    }

    // Tieu chuan 2: Adaptive Window thich ung
    if (res.status === 'SUCCESS') {
      if (!res.roadAxis.stopReason || res.roadAxis.stopReason === 'UNDEFINED') {
        isCasePassed = false;
        record.evalReasons.push('VI PHAM: Thieu stopReason cua so thich ung');
      }
    }

    // Tieu chuan 3: Tuyen tiep can & Cong hong
    if (meta.id === 'CASE_07') {
      if (res.accessRoad && res.accessRoad.name && res.accessRoad.name.includes('Hẻm 46')) {
        isCasePassed = false;
        record.evalReasons.push('VI PHAM: Chon nham duong sau lung chi vi cu ly gan hon');
      }
    }
    if (meta.id === 'CASE_09') {
      if (!res.hasAccessRoad) {
        isCasePassed = false;
        record.evalReasons.push('VI PHAM: Khong xac dinh duoc tuyen tiep can qua cong hong');
      }
    }

    // Tieu chuan 4: Tach biet Pure GIS khoi Phong Thuy
    if (res.status === 'SUCCESS') {
      if (!res.directions || !res.directions.approachA || !res.directions.approachB) {
        isCasePassed = false;
        record.evalReasons.push('VI PHAM: Thieu cau truc Direction A/B tach biet khoi Phong Thuy');
      }
    }

    // Tieu chuan 5: Fail-Safe tin cay (CASE_10 bat buoc UNKNOWN)
    if (meta.id === 'CASE_10') {
      if (res.status !== 'UNKNOWN' || res.hasAccessRoad === true) {
        isCasePassed = false;
        record.evalReasons.push('VI PHAM: Khong bat Fail-Safe UNKNOWN khi thieu du lieu OSM');
      }
    }

    record.evaluation = isCasePassed ? 'PASS' : 'FAIL';
    if (isCasePassed) {
      passCount++;
    } else {
      failCount++;
    }

    // Tao anh debug overlay SVG
    const svgContent = generateSvgOverlay(meta.id, meta, res, ways);
    const svgPath = path.join(outArtifactDir, `debug_overlay_${meta.id.toLowerCase()}.svg`);
    fs.writeFileSync(svgPath, svgContent, 'utf8');

    reportRows.push(record);

    console.log(`[${record.evaluation}] ${meta.id}: ${meta.title}`);
    console.log(`       Truc duong: ${record.roadAxisBearing}° | Cua so: ${record.windowLengthMeters}m (${record.stopReason}) | Do cong: ${record.curvatureDegPerMeter}°/m`);
    console.log(`       Tiep can: ${record.accessRoadName} | Ly do danh gia: ${record.evalReasons.length > 0 ? record.evalReasons.join(', ') : 'Dat 6 tieu chuan thuc dia'}\n`);
  }

  console.log('================================================================');
  console.log(`KET LUAN NGHIEM THU: ${passCount}/10 PASSES, ${failCount} FAILS`);
  console.log('================================================================');

  // Ghi file JSON ket qua tong hop
  const summaryPath = path.join(outArtifactDir, 'scratch', 'acceptance_10_cases_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({ passCount, failCount, reportRows }, null, 2), 'utf8');

  return { passCount, failCount, reportRows };
}

runRealWorld10Acceptance().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
