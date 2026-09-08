/**
 * CÔNG CỤ LA KINH BẢN ĐỒ – 144 THỦY KHẨU (HOÀN THIỆN 100% THEO ĐẶC TẢ HỌC THUẬT)
 * Tích hợp đầy đủ:
 * 1. CalibrationEngine duy nhất, khóa cứng công thức bù sai số thực địa có dấu.
 * 2. Tách biệt 3 hệ: Raw Geometry -> Calibrated World Data -> View Transform.
 * 3. Technical Transparent SVG Overlay: nền trong suốt, vạch kỹ thuật, LOD, tâm rỗng nhìn rõ mái nhà.
 * 4. Workflow 5 bước: 1. Tâm Nhà -> 2. Mặt Tiền -> 3. Tuyến Nước -> 4. Chiều Nước -> 5. Hiệu Chuẩn.
 * 5. Panel 4 tầng logic: Phép Đo -> La Kinh -> Độ Tin Cậy / Cận Ranh -> Khảo Chứng 144 Thủy Khẩu.
 * 6. Map-Viewport Lock: Neo tâm La Kinh vào tọa độ khảo sát trên bản đồ vệ tinh.
 */

class LuopanMapTool {
  constructor() {
    this.mode = 'image'; // 'image' hoặc 'map'
    this.currentStep = 1; // 1: Tâm Nhà, 2: Mặt Tiền, 3: Tuyến Nước, 4: Chiều Nước, 5: Hiệu Chuẩn
    this.activeDrawTool = 'select'; // 'select', 'setCenter', 'drawFrontage', 'drawWater'
    this.container = null;

    // Động cơ
    this.calibEngine = typeof window !== 'undefined' ? window.CalibrationEngine : null;
    this.geometry = typeof window !== 'undefined' ? window.LuopanGeometry : null;
    this.data = typeof window !== 'undefined' ? window.LuopanData : null;
    this.geoEngine = typeof window !== 'undefined' ? window.GeoMeasurementEngine : null;
    this.roadProvider = (typeof window !== 'undefined' && window.OverpassRoadProvider) ? new window.OverpassRoadProvider() : null;
    this.topologyEngine = (typeof window !== 'undefined' && window.RoadTopologyEngine) ? new window.RoadTopologyEngine({ roadProvider: this.roadProvider }) : null;
    this.STAGE_SIZE = 800;
    this.renderer = new (typeof window !== 'undefined' && window.LuopanSvgRenderer ? window.LuopanSvgRenderer : class { render() { return ''; } })({ size: this.STAGE_SIZE });
    this.classifier = new (typeof window !== 'undefined' && window.LuopanClassifier ? window.LuopanClassifier : class { classify() { return {}; } })();

    // 1. RAW GEOMETRY: Tọa độ logic chuẩn hóa 800x800
    this.centerPoint = { x: 400, y: 400 };
    this._lastRenderedCenter = { x: 400, y: 400 };
    this.frontageLine = {
      pA: { x: 290, y: 400 },
      pB: { x: 510, y: 400 },
      frontSide: 'right'
    };
    this.waterPolyline = [
      { x: 190, y: 220, role: 'normal' },
      { x: 400, y: 270, role: 'normal' },
      { x: 610, y: 580, role: 'normal' }
    ];
    this.flowDirection = 'forward'; // 'forward' hoặc 'reverse'
    this.waterPathType = 'through'; // 'through' (hẻm thông) hoặc 'deadEnd' (hẻm cụt)
    this.waterNature = 'hu_thuy'; // 'hu_thuy' (Hư Thủy - lộ khí đô thị) hoặc 'chan_thuy' (Chân Thủy - dòng nước tự nhiên)
    this.isDrawingWater = false;
    this.pendingNewWaterPath = false;
    this.isArmingAddPoint = false;
    this.laiNodeIndex = null;
    this.khuNodeIndex = null;
    this.selectedNodeIndex = null;
    this.selectedSegmentIndex = null;

    // GIS Topology & Quality Gate
    this.headingReference = 'TRUE'; // 'TRUE' (Bắc Thật) hoặc 'MAGNETIC' (Bắc Từ)
    this.roadDetectionState = 'IDLE'; // 'IDLE', 'DETECTING', 'SUGGESTED', 'ACCEPTED', 'REJECTED', 'NO_ROAD'
    this.roadSuggestion = null;
    this.multiReadings = [];
    this.showMultiReading = false;
    this.measurementSessionId = 0;
    this.accessPoint = null;
    this.accessPointType = 'AUTO'; // 'AUTO' hoặc 'MANUAL'
    this.accessPointLatLng = null; // { lat, lng }
    this.accessPointPosition = null; // { x, y } trên SVG stage
    this.roadAnalysisResult = null;
    this.showRoadDebugPanel = false;

    // Leaflet GIS Map
    this.mapInstance = null;
    let savedLatLng = null;
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('dt_last_latlng');
        if (stored) savedLatLng = JSON.parse(stored);
      }
    } catch (e) {}
    this.surveyCenterLatLng = (Array.isArray(savedLatLng) && savedLatLng.length === 2)
      ? savedLatLng
      : [21.028511, 105.854444]; // Tọa độ mặc định (Hà Nội, Việt Nam)
    this.zoomLevel = 19;

    // 2. CALIBRATION DATA
    this.rawFacingBearing = 180.0;
    this.measuredBearing = 180.0;
    this.calibrationOffset = 0.0;
    this.isCalibrationLocked = false;
    this.measurementTolerance = 0.30; // Sai số đo hiện trường (+/- 0.30 độ)

    // 3. VIEW TRANSFORM
    this.viewRotation = 0; // 0 = Bắc lên trên, hoặc -facing
    this.luopanOpacity = 0.85;
    this.showDrawingOverlay = true;
    this.imageSrc = null;
  }

  init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.recalculateRawBearings();
    this.renderLayout();
    this.bindEvents();
    this.initInteractiveCanvas();
    this.updateBackground();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        const mapCenter = this.mapInstance?.getCenter();
        this.resizeMapBackground();
        if (this.mapInstance && this.mode === 'map') {
          this.mapInstance.invalidateSize({ pan: false });
          this.mapInstance.setView(mapCenter, this.mapInstance.getZoom(), { animate: false, reset: true });
          this.projectMapGeometry();
        }
        this.updateViewTransform();
      });
      const stage = this.container.querySelector('#dt-interactive-stage');
      if (stage) this.resizeObserver.observe(stage);
    }
  }

  recalculateRawBearings() {
    this.syncCalibrationFromGeometry();
  }

  syncCalibrationFromGeometry() {
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.frontA && this.mapGeometry.frontB && this.geoEngine) {
      const abBearing = this.geoEngine.calculateGeodesicBearing(this.mapGeometry.frontA, this.mapGeometry.frontB);
      const rawFacing = this.frontageLine.frontSide === 'right'
        ? this.calibEngine.normalize360(abBearing + 90)
        : this.calibEngine.normalize360(abBearing - 90);
      this.rawFacingBearing = rawFacing;
    } else {
      this.rawFacingBearing = this.geometry.calculateHouseFacingBearing(
        this.frontageLine.pA,
        this.frontageLine.pB,
        this.frontageLine.frontSide
      );
    }
    // Khi đã khóa mốc đo thực địa, offset phải tự động cập nhật theo hình học mới của Map
    if (this.isCalibrationLocked && Number.isFinite(this.measuredBearing)) {
      this.calibrationOffset = this.calibEngine.computeOffset(
        this.rawFacingBearing,
        this.measuredBearing
      );
    }
  }

  getWaterPoints() {
    if (!this.waterPolyline || this.waterPolyline.length < 1) {
      return { pLai: null, pKhu: null, pDeadEnd: null };
    }
    let pLai = null;
    let pKhu = null;
    let pDeadEnd = null;

    // 1. Xác định Lai Thủy (Ưu tiên node được người dùng chỉ định role)
    if (Number.isInteger(this.laiNodeIndex) && this.waterPolyline[this.laiNodeIndex]) {
      pLai = this.waterPolyline[this.laiNodeIndex];
    } else {
      pLai = this.flowDirection === 'forward'
        ? this.waterPolyline[0]
        : this.waterPolyline[this.waterPolyline.length - 1];
    }

    // 2. Xác định Khứ Thủy hoặc Điểm cụt
    if (this.waterPathType === 'deadEnd') {
      pKhu = null;
      pDeadEnd = this.flowDirection === 'forward'
        ? this.waterPolyline[this.waterPolyline.length - 1]
        : this.waterPolyline[0];
    } else {
      if (Number.isInteger(this.khuNodeIndex) && this.waterPolyline[this.khuNodeIndex]) {
        pKhu = this.waterPolyline[this.khuNodeIndex];
      } else {
        pKhu = this.flowDirection === 'forward'
          ? this.waterPolyline[this.waterPolyline.length - 1]
          : this.waterPolyline[0];
      }
    }

    return { pLai: pLai || null, pKhu: pKhu || null, pDeadEnd: pDeadEnd || null };
  }

  getRawLaiBearing() {
    const { pLai } = this.getWaterPoints();
    if (!pLai) return null;
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.center && this.geoEngine) {
      let laiLatLng = null;
      if (Number.isInteger(this.laiNodeIndex) && this.mapGeometry.water && this.mapGeometry.water[this.laiNodeIndex]) {
        laiLatLng = this.mapGeometry.water[this.laiNodeIndex];
      } else if (this.mapGeometry.water && this.mapGeometry.water.length > 0) {
        laiLatLng = this.flowDirection === 'forward'
          ? this.mapGeometry.water[0]
          : this.mapGeometry.water[this.mapGeometry.water.length - 1];
      }
      if (laiLatLng) {
        return this.geoEngine.calculateGeodesicBearing(this.mapGeometry.center, laiLatLng);
      }
    }
    return this.geometry.calculateLineBearing(this.centerPoint, pLai);
  }

  getRawKhuBearing() {
    if (this.waterPathType === 'deadEnd') return null;
    const { pKhu } = this.getWaterPoints();
    if (!pKhu) return null;
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.center && this.geoEngine) {
      let khuLatLng = null;
      if (Number.isInteger(this.khuNodeIndex) && this.mapGeometry.water && this.mapGeometry.water[this.khuNodeIndex]) {
        khuLatLng = this.mapGeometry.water[this.khuNodeIndex];
      } else if (this.mapGeometry.water && this.mapGeometry.water.length > 0) {
        khuLatLng = this.flowDirection === 'forward'
          ? this.mapGeometry.water[this.mapGeometry.water.length - 1]
          : this.mapGeometry.water[0];
      }
      if (khuLatLng) {
        return this.geoEngine.calculateGeodesicBearing(this.mapGeometry.center, khuLatLng);
      }
    }
    return this.geometry.calculateLineBearing(this.centerPoint, pKhu);
  }

  getEffectiveFacingBearing() {
    // Khi đã khóa, hướng thực đo là mốc bất biến tuyệt đối
    if (this.isCalibrationLocked && Number.isFinite(this.measuredBearing)) {
      return this.calibEngine.normalize360(this.measuredBearing);
    }
    return this.rawFacingBearing;
  }

  getEffectiveLaiBearing() {
    const rawLai = this.getRawLaiBearing();
    if (rawLai === null) return null;
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(rawLai, this.calibrationOffset)
      : rawLai;
  }

  getEffectiveKhuBearing() {
    if (this.waterPathType === 'deadEnd') return null;
    const rawKhu = this.getRawKhuBearing();
    if (rawKhu === null) return null;
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(rawKhu, this.calibrationOffset)
      : rawKhu;
  }

  getRawDeadEndBearing() {
    if (this.waterPathType !== 'deadEnd') return null;
    const { pDeadEnd } = this.getWaterPoints();
    if (!pDeadEnd) return null;
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.center && this.geoEngine) {
      let deadEndLatLng = null;
      if (this.mapGeometry.water && this.mapGeometry.water.length > 0) {
        deadEndLatLng = this.flowDirection === 'forward'
          ? this.mapGeometry.water[this.mapGeometry.water.length - 1]
          : this.mapGeometry.water[0];
      }
      if (deadEndLatLng) {
        return this.geoEngine.calculateGeodesicBearing(this.mapGeometry.center, deadEndLatLng);
      }
    }
    return this.geometry.calculateLineBearing(this.centerPoint, pDeadEnd);
  }

  getEffectiveDeadEndBearing() {
    if (this.waterPathType !== 'deadEnd') return null;
    const raw = this.getRawDeadEndBearing();
    if (raw === null) return null;
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(raw, this.calibrationOffset)
      : raw;
  }

  getDeadEndDistanceMeters() {
    if (this.waterPathType !== 'deadEnd') return null;
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.center && this.geoEngine && this.mapGeometry.water && this.mapGeometry.water.length > 0) {
      const deadEndLatLng = this.flowDirection === 'forward'
        ? this.mapGeometry.water[this.mapGeometry.water.length - 1]
        : this.mapGeometry.water[0];
      if (deadEndLatLng) {
        return this.geoEngine.calculateGeodesicDistance(this.mapGeometry.center, deadEndLatLng);
      }
    }
    const { pDeadEnd } = this.getWaterPoints();
    if (!pDeadEnd || !this.centerPoint) return null;
    return Math.round(Math.hypot(pDeadEnd.x - this.centerPoint.x, pDeadEnd.y - this.centerPoint.y) * 0.1 * 10) / 10;
  }

  getNodeRadialBearing(index) {
    if (!Number.isInteger(index) || !this.waterPolyline || !this.waterPolyline[index]) return null;
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.center && this.mapGeometry.water && this.mapGeometry.water[index] && this.geoEngine) {
      return this.geoEngine.calculateGeodesicBearing(this.mapGeometry.center, this.mapGeometry.water[index]);
    }
    return this.geometry.calculateLineBearing(this.centerPoint, this.waterPolyline[index]);
  }

  getEffectiveNodeRadialBearing(index) {
    const raw = this.getNodeRadialBearing(index);
    if (raw === null) return null;
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(raw, this.calibrationOffset)
      : raw;
  }

  getWaterSegments() {
    const segments = [];
    if (!this.waterPolyline || this.waterPolyline.length < 2) return segments;

    const facing = this.getEffectiveFacingBearing();
    const facingMountain = this.data.getMountain(facing).mountain;
    const matchedGroup = this.data.SONG_SON_GROUPS.find(g => g.huongSon.includes(facingMountain.name)) || this.data.SONG_SON_GROUPS[0];
    const cuc = matchedGroup.cuc;

    const pathTiers = (this.geometry && this.geometry.classifyPathTiers)
      ? this.geometry.classifyPathTiers(this.waterPolyline, this.centerPoint)
      : [];

    for (let i = 0; i < this.waterPolyline.length - 1; i++) {
      const from = this.waterPolyline[i];
      const to = this.waterPolyline[i + 1];

      const hasGeoSeg = this.mode === 'map' && this.mapGeometry && this.mapGeometry.water && this.mapGeometry.water[i] && this.mapGeometry.water[i + 1] && this.geoEngine;
      const rawBearing = hasGeoSeg
        ? this.geoEngine.calculateGeodesicBearing(this.mapGeometry.water[i], this.mapGeometry.water[i + 1])
        : this.geometry.calculateLineBearing(from, to);
      const effectiveBearing = this.isCalibrationLocked
        ? this.calibEngine.calibrate(rawBearing, this.calibrationOffset)
        : rawBearing;

      const fromRadialRaw = (hasGeoSeg && this.mapGeometry.center)
        ? this.geoEngine.calculateGeodesicBearing(this.mapGeometry.center, this.mapGeometry.water[i])
        : this.geometry.calculateLineBearing(this.centerPoint, from);
      const fromRadialEff = this.isCalibrationLocked
        ? this.calibEngine.calibrate(fromRadialRaw, this.calibrationOffset)
        : fromRadialRaw;

      const toRadialRaw = (hasGeoSeg && this.mapGeometry.center)
        ? this.geoEngine.calculateGeodesicBearing(this.mapGeometry.center, this.mapGeometry.water[i + 1])
        : this.geometry.calculateLineBearing(this.centerPoint, to);
      const toRadialEff = this.isCalibrationLocked
        ? this.calibEngine.calibrate(toRadialRaw, this.calibrationOffset)
        : toRadialRaw;

      const fromMountain = this.data.getMountain(fromRadialEff).mountain;
      const toMountain = this.data.getMountain(toRadialEff).mountain;
      const fromTruongSinh = this.data.getTruongSinh(fromMountain.name, cuc);
      const toTruongSinh = this.data.getTruongSinh(toMountain.name, cuc);

      const segmentMountain = this.data.getMountain(effectiveBearing).mountain;
      const segmentTruongSinh = this.data.getTruongSinh(segmentMountain.name, cuc);

      const lengthPx = Math.hypot(to.x - from.x, to.y - from.y);
      const flowFacing = (this.rawFacingBearing !== undefined && Number.isFinite(this.rawFacingBearing))
        ? this.rawFacingBearing
        : facing;
      const flowRelation = this.geometry.calculateFlowRelation(from, to, this.centerPoint, flowFacing);

      const tierObj = pathTiers[i] || {};
      const tier = tierObj.tier || (i === 0 ? 'ngoai_cuc' : (i === this.waterPolyline.length - 2 ? 'can_trach' : 'trung_cuc'));
      const tierLabel = tierObj.tierLabel || (tier === 'can_trach' ? 'Cận Trạch' : (tier === 'trung_cuc' ? 'Trung Cục' : 'Ngoại Cục'));
      const tierDesc = tierObj.tierDesc || '';
      const tierColor = tierObj.tierColor || '#94A3B8';

      segments.push({
        fromIndex: i,
        toIndex: i + 1,
        from,
        to,
        rawBearing,
        effectiveBearing,
        fromRadialEff,
        toRadialEff,
        fromMountain,
        toMountain,
        fromTruongSinh,
        toTruongSinh,
        segmentMountain,
        segmentTruongSinh,
        lengthPx,
        flowRelation,
        tier,
        tierLabel,
        tierDesc,
        tierColor
      });
    }
    return segments;
  }

  renderLayout() {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const relLai = lai !== null ? this.calibEngine.computeRelativeBearing(facing, lai) : null;
    const relKhu = khu !== null ? this.calibEngine.computeRelativeBearing(facing, khu) : null;

    const analysis = this.getAnalysis();

    const luopanSvgHtml = this.renderer.render({
      cx: this.centerPoint.x,
      cy: this.centerPoint.y,
      radius: 365,
      rotation: this.isCalibrationLocked ? this.calibrationOffset : 0,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });

    this._lastRenderedCenter = { x: this.centerPoint.x, y: this.centerPoint.y };
    const offsetFormatted = this.calibEngine.formatOffset(this.calibrationOffset);

    this.container.innerHTML = `
      <style>
        .dt-luopan-tool-root {
          box-sizing: border-box;
          width: 100%;
          max-width: 1260px;
          margin: 0 auto;
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #E2E8F0;
        }
        .dt-luopan-tool-root * { box-sizing: border-box; }
        .dt-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.2rem;
          align-items: start;
        }
        @media (max-width: 992px) {
          .dt-workspace-grid { grid-template-columns: 1fr !important; }
        }
        .dt-touch-btn {
          min-height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          padding: 0.2rem 0.45rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.7rem;
          cursor: pointer;
          touch-action: manipulation;
          transition: background 0.15s ease, transform 0.1s ease;
          user-select: none;
          -webkit-user-select: none;
          white-space: nowrap;
          line-height: 1.2;
        }
        .dt-touch-btn:active { transform: scale(0.97); }
        .dt-workflow-steps {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-wrap: wrap;
        }
        .dt-step-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          padding: 0.2rem 0.45rem;
          min-height: 24px;
          border-radius: 4px;
          font-size: 0.68rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.14);
          background: #1E293B;
          color: #CBD5E1;
          white-space: nowrap;
          line-height: 1.2;
        }
        .dt-step-badge.active {
          background: #F59E0B;
          color: #000;
          border-color: #FBBF24;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
        }
        .dt-floating-bottom-bar {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          z-index: 25;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.4rem 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }
        .dt-stage-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: min(85vw, 680px);
          background: #080C14;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0,0,0,0.6);
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .dt-panel-section {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
        }
        .dt-panel-title {
          font-size: 0.85rem;
          font-weight: 800;
          margin-bottom: 0.65rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-transform: uppercase;
        }
      </style>

      <div class="dt-luopan-tool-root" style="display:flex; flex-direction:column; gap:1rem;">

        <!-- 1. TOP HEADER & STATUS BAR -->
        <header class="dt-tool-header" style="background:#0D111A; border:1px solid #C5B382; border-radius:12px; padding:0.85rem 1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
          <div>
            <div class="dt-tool-kicker" style="display:inline-flex; align-items:center; gap:0.3rem; padding:0.12rem 0.45rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:4px; font-size:0.68rem; font-weight:700; color:#F5D485; margin-bottom:0.2rem;">
              LA KINH BẢN ĐỒ CÓ HIỆU CHUẨN THỰC ĐỊA
            </div>
            <h2 class="dt-tool-title" style="margin:0; font-size:1.1rem; color:#FEF3C7; font-weight:800;">
              La Kinh Bản Đồ · 144 Thủy Khẩu
            </h2>
          </div>

          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <div id="dt-calibration-status" role="status" style="background:${analysis.status.color}22; color:${analysis.status.color}; border:1px solid ${analysis.status.color}55; font-size:0.7rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px;">
              ${analysis.status.label}
            </div>

            <div style="display:flex; gap:0.2rem; background:#1E293B; padding:0.15rem; border-radius:6px; border:1px solid rgba(255,255,255,0.1);">
              <button type="button" id="btn-mode-image" class="dt-touch-btn" style="background:${this.mode === 'image' ? '#FBBF24' : 'transparent'}; color:${this.mode === 'image' ? '#000' : '#CBD5E1'}; border:none; min-height:24px; padding:0.18rem 0.45rem;">
                Ảnh CAD
              </button>
              <button type="button" id="btn-mode-map" class="dt-touch-btn" style="background:${this.mode === 'map' ? '#38BDF8' : 'transparent'}; color:${this.mode === 'map' ? '#000' : '#CBD5E1'}; border:none; min-height:24px; padding:0.18rem 0.45rem;">
                Bản Đồ Vệ Tinh
              </button>
            </div>
          </div>
        </header>

        <!-- 2. WORKFLOW CÁC THAO TÁC THỰC CHIẾN -->
        <nav class="dt-workflow-toolbar" aria-label="Thao tác khảo sát" style="background:#141B2B; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.3rem 0.55rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.35rem;">

          <div class="dt-workflow-steps">
            <span style="font-size:0.68rem; color:#94A3B8; font-weight:700; text-transform:uppercase; margin-right:0.15rem;">Thao tác:</span>

            <button type="button" id="step-btn-1" class="dt-step-badge ${this.activeDrawTool === 'setCenter' ? 'active' : ''}" title="Bấm để bật/tắt sửa vị trí tâm nhà">
              ${this.activeDrawTool === 'setCenter' ? 'Sửa Tâm' : 'Tâm Nhà'}
            </button>

            <button type="button" id="step-btn-2" class="dt-step-badge ${this.activeDrawTool === 'drawFrontage' ? 'active' : ''}" title="Bấm để bật/tắt sửa mép mặt tiền">
              ${this.activeDrawTool === 'drawFrontage' ? 'Sửa Mặt Tiền' : 'Mặt Tiền'}
            </button>

            <button type="button" id="step-btn-3" class="dt-step-badge ${this.activeDrawTool === 'drawWater' ? 'active' : ''}" title="Bấm để bật/tắt sửa vị trí các điểm tuyến nước">
              ${this.activeDrawTool === 'drawWater' ? 'Sửa Tuyến' : 'Tuyến Nước'}
            </button>

            <button type="button" id="btn-append-water" class="dt-step-badge ${this.isArmingAddPoint ? 'active' : ''}" style="color:#34D399; border-color:${this.isArmingAddPoint ? '#34D399' : 'rgba(52,211,153,0.35)'}; background:${this.isArmingAddPoint ? 'rgba(5,150,105,0.3)' : 'transparent'}; font-weight:700;" title="Bấm để chấm thêm điểm mới vào cuối tuyến nước">
              ${this.isArmingAddPoint ? 'Đang Thêm...' : '+ Thêm Điểm'}
            </button>

            <button type="button" id="btn-auto-road-detect" class="dt-step-badge" style="color:#38BDF8; border-color:rgba(56,189,248,0.4); font-weight:700;" title="Tự động quét mạng đường OSM/GIS từ ngã 3/4 lớn vào trước cửa nhà">
              Bắt Tuyến Đường
            </button>

            <button type="button" id="btn-reverse-water" class="dt-step-badge" style="color:#F59E0B; border-color:rgba(245,158,11,0.4); font-weight:700;" title="Đảo chiều dòng chảy: Hoán đổi vị trí Lai Thủy và Khứ Thủy">
              Đảo Chiều Lai ⇄ Khứ
            </button>

            <button type="button" id="btn-toggle-deadend" class="dt-step-badge" style="color:${this.waterPathType === 'deadEnd' ? '#F43F5E' : '#94A3B8'}; border-color:${this.waterPathType === 'deadEnd' ? '#F43F5E' : 'rgba(255,255,255,0.12)'};" title="Chuyển đổi loại tuyến">
              ${this.waterPathType === 'deadEnd' ? 'Hẻm Cụt' : 'Hẻm Thông'}
            </button>

            <button type="button" id="btn-toggle-water-nature" class="dt-step-badge" style="color:${this.waterNature === 'hu_thuy' ? '#F59E0B' : '#38BDF8'}; border-color:${this.waterNature === 'hu_thuy' ? '#F59E0B' : '#38BDF8'}; background:${this.waterNature === 'hu_thuy' ? 'rgba(245,158,11,0.18)' : 'rgba(56,189,248,0.18)'}; font-weight:700;" title="Chuyển đổi: Hư Thủy (Lộ Khí Đô Thị) ↔ Chân Thủy (Dòng Nước Tự Nhiên)">
              ${this.waterNature === 'hu_thuy' ? 'Hư Thủy (Lộ Khí)' : 'Chân Thủy (Nước Thật)'}
            </button>
          </div>

          <div class="dt-secondary-actions" style="display:flex; align-items:center; gap:0.25rem; flex-wrap:wrap;">
            <button type="button" id="btn-flip-frontside" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(197,179,130,0.35);" title="Đảo hướng nhìn mặt tiền 180 độ">
              Đảo Mặt Tiền
            </button>
            <button type="button" id="btn-export-survey" class="dt-touch-btn" style="background:#059669; color:#FFF; border:none;" title="Mở phiếu khảo sát">
              Xuất Phiếu
            </button>
            <button type="button" id="btn-economic-radius" class="dt-touch-btn" style="background:#0D9488; color:#FFF; border:none; display:flex; align-items:center; gap:0.3rem;" title="Mở phân tích sức mua và dung lượng thị trường theo bán kính">
              Sức Mua Bán Kính
            </button>
          </div>
        </nav>

        <!-- 3. MAIN WORKSPACE GRID -->
        <div class="dt-workspace-grid">

          <!-- LEFT: INTERACTIVE CAD & LUOPAN CANVAS -->
          <div class="dt-map-column">
          <div class="dt-stage-wrapper" id="dt-interactive-stage">
            <div class="dt-scene" id="dt-survey-scene" style="position:absolute; inset:0;">

            <!-- LAYER 0: MAP OR IMAGE BACKGROUND -->
            <div id="dt-workspace-viewport" style="position:absolute; inset:0; display:flex; justify-content:center; align-items:center;">
              <div id="dt-map-mount" style="position:absolute; inset:0; z-index:1; display:none;"></div>
              <img id="dt-user-img" alt="Ảnh nền khảo sát" style="width:100%; height:100%; object-fit:contain; opacity:0.65; pointer-events:none; display:none;" />
              <div id="dt-image-empty" style="text-align:center; color:#94A3B8; padding:1rem; z-index:20;">
                <p style="font-size:0.85rem; color:#FEF3C7;">Chọn ảnh nền hoặc Bản Đồ Vệ Tinh để bắt đầu.</p>
                <label class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382;">
                  Chọn Ảnh / CAD
                  <input type="file" id="input-upload-image" accept="image/*" style="display:none;" />
                </label>
              </div>
            </div>

            <!-- LAYER 1: TECHNICAL TRANSPARENT LUOPAN SVG (TÂM KHÓA TRÙNG TÂM NHÀ) -->
            <div id="dt-luopan-svg-container" style="position:absolute; inset:0; width:100%; height:100%; z-index:10; pointer-events:none; transition:opacity 0.15s ease-out;">
              ${luopanSvgHtml}
            </div>

            <!-- LAYER 2: INTERACTIVE CAD DRAWING OVERLAY -->
            <svg id="dt-drawing-svg" viewBox="0 0 ${this.STAGE_SIZE} ${this.STAGE_SIZE}" preserveAspectRatio="xMidYMid meet" style="position:absolute; inset:0; width:100%; height:100%; z-index:15; pointer-events:auto; touch-action:none;"></svg>

            <!-- FLOATING NODE & SEGMENT INSPECTOR BAR -->
            <div id="dt-node-action-bar" style="position:absolute; top:8px; left:8px; right:8px; z-index:35; display:none;"></div>

            <!-- FLOATING AUTO ROAD SUGGESTION BANNER -->
            <div id="dt-road-suggestion-banner" style="position:absolute; top:52px; left:8px; right:8px; z-index:34; display:none;"></div>

            <!-- FLOATING ROAD DEBUG PANEL (3 TẦNG) -->
            <div id="dt-road-debug-panel" style="position:absolute; bottom:64px; left:8px; right:8px; z-index:33; display:none; max-height:240px; overflow-y:auto; background:rgba(15,23,42,0.96); border:1px solid #334155; border-radius:8px; padding:0.5rem; font-size:0.72rem; color:#CBD5E1; box-shadow:0 8px 30px rgba(0,0,0,0.7);"></div>

            </div>
          </div>
            <!-- View controls stay outside the observation area. -->
            <div class="dt-floating-bottom-bar">
              <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                <button type="button" id="btn-north-up" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(255,255,255,0.12);">
                  Bắc Lên
                </button>
                <button type="button" id="btn-facing-up" class="dt-touch-btn" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.35);">
                  Hướng Lên
                </button>
                <button type="button" id="btn-toggle-drawing" class="dt-touch-btn" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12);">
                  ${this.showDrawingOverlay ? 'Ẩn Nét' : 'Hiện Nét'}
                </button>
              </div>

              <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.74rem; color:#94A3B8;">
                <span>Độ mờ:</span>
                <input type="range" id="slider-opacity" aria-label="Độ mờ La Kinh" min="0.1" max="1.0" step="0.05" value="${this.luopanOpacity}" style="width:70px; cursor:pointer; accent-color:#F59E0B;" />
              </div>
            </div>
          </div>

          <!-- RIGHT: PANEL BỐN TẦNG LOGIC CHUẨN MỰC HỌC THUẬT -->
          <div class="dt-results-column" style="display:flex; flex-direction:column; gap:0.85rem;">

            <!-- TẦNG 0: BẢNG HIỆU CHUẨN THỰC ĐỊA -->
            <div id="dt-calibration-panel" class="dt-panel-section" style="border-color:${this.isCalibrationLocked ? '#10B981' : '#F59E0B'};">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                <div class="dt-panel-title" style="color:#FEF3C7; margin-bottom:0;">
                  HIỆU CHUẨN LA KINH
                </div>
                <span id="dt-lock-status" style="font-size:0.72rem; padding:0.15rem 0.5rem; border-radius:6px; font-weight:700; background:${this.isCalibrationLocked ? '#10B98122' : '#F59E0B22'}; color:${this.isCalibrationLocked ? '#10B981' : '#F59E0B'};">
                  ${this.isCalibrationLocked ? 'ĐÃ KHÓA' : 'CHƯA KHÓA'}
                </span>
              </div>

              <div style="font-size:0.78rem; color:#94A3B8; margin-bottom:0.65rem; line-height:1.4;">
                Nhập hướng nhà đo thực địa. Sau khi khóa, vẫn kéo chỉnh được tuyến.
              </div>

              <div style="display:flex; gap:0.45rem; margin-bottom:0.65rem;">
                <input type="number" id="input-measured-bearing" aria-label="Số đo hướng nhà thực địa" inputmode="decimal" required value="${this.measuredBearing.toFixed(1)}" step="0.1" min="0" max="360" ${this.isCalibrationLocked ? 'disabled' : ''} style="flex:1; background:#1E293B; border:1px solid rgba(255,255,255,0.18); border-radius:8px; padding:0.45rem 0.7rem; color:#FEF3C7; font-size:0.9rem; font-weight:700;" placeholder="Độ (0-360)" />
                <button type="button" id="btn-lock-calibration" class="dt-touch-btn" style="background:${this.isCalibrationLocked ? '#EF4444' : '#10B981'}; color:#FFF; border:none; padding:0.45rem 0.9rem;">
                  ${this.isCalibrationLocked ? 'Mở Khóa' : 'Khóa Chuẩn'}
                </button>
              </div>

              <div style="background:#0D111A; border-radius:8px; padding:0.55rem 0.75rem; font-size:0.75rem; display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">
                <div>Hướng Map: <strong id="dt-raw-facing" style="color:#FEF3C7;">${this.rawFacingBearing.toFixed(2)}°</strong></div>
                <div>Hiệu chỉnh: <strong id="dt-offset" style="color:#10B981;">${offsetFormatted}</strong></div>
              </div>

            </div>

            <div id="dt-result-panels">${this.renderResultPanels(analysis)}</div>

          </div>
        </div>

        <!-- 4. MODAL XUẤT PHIẾU KHẢO SÁT HIỆN TRƯỜNG -->
        <div id="modal-survey-export" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); justify-content:center; align-items:center; padding:1rem;">
          <div style="background:#0F172A; border:1px solid #C5B382; border-radius:14px; width:100%; max-width:640px; max-height:85vh; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:1.3rem; box-shadow:0 20px 50px rgba(0,0,0,0.8);">

            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.12); padding-bottom:0.8rem; margin-bottom:1rem;">
              <h3 style="margin:0; font-size:1.05rem; color:#FEF3C7; font-weight:800; display:flex; align-items:center; gap:0.4rem;">
                PHIẾU KHẢO SÁT PHONG THỦY THỰC ĐỊA
              </h3>
              <button type="button" id="btn-close-survey-x" style="background:transparent; border:none; color:#94A3B8; font-size:1.2rem; cursor:pointer; padding:0.15rem 0.4rem;"></button>
            </div>

            <div id="survey-export-content" style="font-size:0.82rem; color:#E2E8F0; line-height:1.6; margin-bottom:1rem;"></div>

            <div style="display:flex; justify-content:flex-end; gap:0.4rem; flex-wrap:wrap;">
              <button type="button" id="btn-copy-survey" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; padding:0.3rem 0.7rem;">
                Sao Chép
              </button>
              <button type="button" id="btn-close-survey" class="dt-touch-btn" style="background:#EF4444; color:#FFF; border:none; padding:0.5rem 1.1rem;">
                Đóng
              </button>
            </div>
          </div>
        </div>

        <!-- 5. MODAL PHÂN TÍCH SỨC MUA & TIỀM NĂNG THỊ TRƯỜNG THEO BÁN KÍNH -->
        <div id="modal-economic-radius" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); justify-content:center; align-items:center; padding:0.5rem; box-sizing:border-box;">
          <div class="econ-modal-dialog">

            <div class="econ-header">
              <div style="display:flex; align-items:center; gap:0.4rem; min-width:0;">
                <h3 class="econ-title">
                  DUNG LƯỢNG THỊ TRƯỜNG & SỨC MUA BÁN KÍNH
                </h3>
              </div>
              <button type="button" id="btn-close-econ-x" style="background:transparent; border:none; color:#94A3B8; font-size:1.3rem; cursor:pointer; padding:0.15rem 0.4rem; line-height:1;">✕</button>
            </div>

            <!-- Vị trí khảo sát & Tọa độ -->
            <div class="econ-location-bar">
              <div class="econ-location-text">
                <span>Vị trí khảo sát: </span>
                <strong id="dt-econ-location-text" class="econ-coords">Đang xác định...</strong>
              </div>
            </div>

            <!-- Segmented Control Bán kính (3 nút nằm trên một hàng, compact 42px) -->
            <div style="margin-bottom:10px;">
              <div class="econ-radius-grid">
                <button type="button" class="dt-econ-radius-selector econ-radius-btn" data-radius="500">
                  500m
                </button>
                <button type="button" class="dt-econ-radius-selector econ-radius-btn active" data-radius="1000">
                  1 km
                </button>
                <button type="button" class="dt-econ-radius-selector econ-radius-btn" data-radius="3000">
                  3 km
                </button>
              </div>
            </div>

            <!-- Bộ Chọn 3 Cấp: Tỉnh/Thành -> Quận/Huyện -> Xã/Phường (Chống tràn, 2 cột + 1 full hàng) -->
            <div class="econ-admin-box">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
                <span class="econ-section-title" style="color:#38BDF8;">Địa Bàn Khảo Sát (3 Cấp Hành Chính):</span>
                <span id="dt-econ-district-distance-tag" style="font-size:12px; color:#94A3B8;"></span>
              </div>
              <div class="econ-admin-grid">
                <div class="econ-field">
                  <label class="econ-label">1. Tỉnh / Thành phố:</label>
                  <select id="dt-econ-province-select" class="econ-select">
                    <option value="">Tự động theo GPS</option>
                  </select>
                </div>
                <div class="econ-field">
                  <label class="econ-label">2. Quận / Huyện / Thị xã:</label>
                  <select id="dt-econ-district-select" class="econ-select" style="border-color:#38BDF8;">
                    <option value="">Tự động theo GPS</option>
                  </select>
                </div>
                <div class="econ-field econ-admin-full">
                  <label class="econ-label">3. Xã / Phường / Thị trấn:</label>
                  <select id="dt-econ-commune-select" class="econ-select" style="border-color:#10B981; color:#34D399;">
                    <option value="">Tự động theo GPS</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Bộ Chọn Đa Dạng 40 Ngành Kinh Doanh (VSIC 2025) -->
            <div class="econ-ind-box">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span class="econ-section-title" style="color:#F59E0B;">Ngành kinh doanh khảo sát:</span>
                <span style="font-size:11px; color:#94A3B8;">40 Ngành chuẩn VSIC 2025</span>
              </div>
              <button type="button" id="dt-econ-ind-dropdown-trigger" class="econ-ind-trigger">
                <div class="econ-ind-title-wrap">
                  <span id="dt-econ-ind-current-label" class="econ-ind-name">Cà Phê & Đồ Uống Giải Khát</span>
                  <span id="dt-econ-ind-current-sub" class="econ-ind-vsic">VSIC 56302</span>
                </div>
                <span class="econ-ind-action">Chọn ngành ▾</span>
              </button>
              <div id="dt-econ-ind-dropdown-panel" style="display:none; position:relative; z-index:30; background:#0B0F19; border:1px solid rgba(245,158,11,0.35); border-radius:8px; padding:8px; margin-top:6px; box-shadow:0 8px 24px rgba(0,0,0,0.8); box-sizing:border-box;">
                <div style="margin-bottom:6px;">
                  <input type="text" id="dt-econ-ind-search-input" class="econ-search-input" placeholder="Gõ tìm nhanh ngành (vd: cafe, bánh mì, nha...)">
                </div>
                <div id="dt-econ-ind-categories-wrapper" style="display:flex; flex-direction:column; gap:8px; max-height:260px; overflow-y:auto; padding-right:2px; scrollbar-width:thin;">
                </div>
              </div>
            </div>

            <div id="dt-econ-modal-content" style="font-size:13px; color:#E2E8F0; line-height:1.5; margin-bottom:12px;"></div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
              <div style="font-size:0.72rem; color:var(--text-dim);">
                Nguồn: Cục Thống Kê (NSO) • VHLSS • World Bank SAE • Động cơ EconomicRadiusEngine
              </div>
              <div style="display:flex; gap:0.4rem;">
                <button type="button" id="btn-close-econ" class="dt-touch-btn" style="background:#EF4444; color:#FFF; border:none; padding:0.45rem 1.2rem;">
                  Đóng
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  }

  updateNodeActionBar() {
    const bar = document.getElementById('dt-node-action-bar');
    if (!bar) return;

    if (this.isArmingAddPoint) {
      bar.style.display = 'flex';
      bar.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:0.4rem; flex-wrap:wrap; background:rgba(15,23,42,0.95); border:1px solid #34D399; border-radius:8px; padding:0.35rem 0.6rem; backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.6);">
          <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem;">
            <strong style="color:#34D399;">Thêm điểm P${this.waterPolyline.length + 1}:</strong>
            <span style="color:#FEF3C7;">Chạm vào bản đồ tại vị trí khúc rẽ để đặt điểm mới</span>
          </div>
          <button type="button" id="btn-cancel-arm-point" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.5rem; font-size:0.68rem; font-weight:800; background:#450A0A; color:#FCA5A5; border:1px solid #EF4444;" title="Hủy thêm điểm">
            ✕ Hủy
          </button>
        </div>
      `;
      bar.querySelector('#btn-cancel-arm-point')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isArmingAddPoint = false;
        this.renderDrawingElements();
        this.updateStepBadges();
        this.updateNodeActionBar();
      });
      return;
    }

    if (this.selectedNodeIndex !== null && this.waterPolyline[this.selectedNodeIndex]) {
      const idx = this.selectedNodeIndex;
      const p = this.waterPolyline[idx];
      const isLai = this.laiNodeIndex === idx;
      const isKhu = this.khuNodeIndex === idx;
      const isJunction = p.role === 'junction';
      const radialEffective = this.getEffectiveNodeRadialBearing(idx);
      const m = this.data.getMountain(radialEffective).mountain;

      bar.style.display = 'flex';
      bar.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:0.4rem; flex-wrap:wrap; background:rgba(15,23,42,0.94); border:1px solid rgba(255,255,255,0.18); border-radius:8px; padding:0.35rem 0.6rem; backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.6);">
          <div style="display:flex; align-items:center; gap:0.35rem; font-size:0.75rem;">
            <strong style="color:#FEF3C7;">Node P${idx + 1}:</strong>
            <span style="color:#94A3B8;">${radialEffective.toFixed(2)}° (${m.name} Sơn)</span>
          </div>
          <div style="display:flex; gap:0.2rem; align-items:center; flex-wrap:wrap;">
            <button type="button" id="btn-node-set-lai" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.4rem; font-size:0.68rem; background:${isLai ? '#059669' : '#1E293B'}; color:${isLai ? '#FFF' : '#34D399'}; border:1px solid #34D399;">
              ${isLai ? 'Là Lai' : 'Đặt Lai'}
            </button>
            <button type="button" id="btn-node-set-khu" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.4rem; font-size:0.68rem; background:${isKhu ? '#0284C7' : '#1E293B'}; color:${isKhu ? '#FFF' : '#38BDF8'}; border:1px solid #38BDF8;" ${this.waterPathType === 'deadEnd' ? 'disabled' : ''}>
              ${isKhu ? 'Là Khứ' : 'Đặt Khứ'}
            </button>
            <button type="button" id="btn-node-set-junction" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.4rem; font-size:0.68rem; background:${isJunction ? '#D97706' : '#1E293B'}; color:${isJunction ? '#FFF' : '#F59E0B'}; border:1px solid #F59E0B;">
              ${isJunction ? 'Là Ngã 3' : 'Ngã 3'}
            </button>
            <button type="button" id="btn-node-clear-role" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.35rem; font-size:0.68rem; background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12);">
              Thường
            </button>
            <button type="button" id="btn-node-append" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.4rem; font-size:0.68rem; background:#065F46; color:#6EE7B7; border:1px solid #10B981;" title="Chấm thêm điểm nối tiếp vào cuối tuyến">
              + Thêm Điểm
            </button>
            ${this.waterPolyline.length > 2 ? `
              <button type="button" id="btn-node-delete" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.4rem; font-size:0.68rem; background:#450A0A; color:#FCA5A5; border:1px solid #EF4444;" title="Xóa node này khỏi tuyến">
                Xóa Node
              </button>
            ` : ''}
            <button type="button" id="btn-node-close" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.45rem; font-size:0.75rem; font-weight:800; background:#450A0A; color:#FCA5A5; border:1px solid #EF4444;" title="Đóng bảng thao tác node (✕)">
              ✕
            </button>
          </div>
        </div>
      `;

      bar.querySelector('#btn-node-set-lai')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.laiNodeIndex = idx;
        if (this.khuNodeIndex === idx) this.khuNodeIndex = null;
        this.waterPolyline.forEach((node, i) => {
          if (node.role === 'lai' && i !== idx) node.role = 'normal';
        });
        p.role = 'lai';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
        this.updateNodeActionBar();
      });

      bar.querySelector('#btn-node-set-khu')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.waterPathType === 'deadEnd') return;
        this.khuNodeIndex = idx;
        if (this.laiNodeIndex === idx) this.laiNodeIndex = null;
        this.waterPolyline.forEach((node, i) => {
          if (node.role === 'khu' && i !== idx) node.role = 'normal';
        });
        p.role = 'khu';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
        this.updateNodeActionBar();
      });

      bar.querySelector('#btn-node-set-junction')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.laiNodeIndex === idx) this.laiNodeIndex = null;
        if (this.khuNodeIndex === idx) this.khuNodeIndex = null;
        p.role = p.role === 'junction' ? 'normal' : 'junction';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
        this.updateNodeActionBar();
      });

      bar.querySelector('#btn-node-clear-role')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.laiNodeIndex === idx) this.laiNodeIndex = null;
        if (this.khuNodeIndex === idx) this.khuNodeIndex = null;
        p.role = 'normal';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
        this.updateNodeActionBar();
      });

      bar.querySelector('#btn-node-delete')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.waterPolyline.length <= 2) return;
        this.waterPolyline.splice(idx, 1);
        if (this.laiNodeIndex === idx) this.laiNodeIndex = null;
        else if (this.laiNodeIndex > idx) this.laiNodeIndex--;
        if (this.khuNodeIndex === idx) this.khuNodeIndex = null;
        else if (this.khuNodeIndex > idx) this.khuNodeIndex--;
        this.selectedNodeIndex = null;
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
        this.updateNodeActionBar();
      });

      bar.querySelector('#btn-node-append')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.activeDrawTool = 'drawWater';
        this.isDrawingWater = true;
        this.isArmingAddPoint = true;
        this.renderDrawingElements();
        this.updateStepBadges();
        this.updateNodeActionBar();
      });

      bar.querySelector('#btn-node-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeSelectionBar();
      });
      return;
    }

    if (this.selectedSegmentIndex !== null) {
      const segments = this.getWaterSegments();
      const seg = segments[this.selectedSegmentIndex];
      if (seg) {
        const m = seg.segmentMountain || this.data.getMountain(seg.effectiveBearing).mountain;
        const fromTsStr = seg.fromTruongSinh ? ` [${seg.fromTruongSinh.name}]` : '';
        const toTsStr = seg.toTruongSinh ? ` [${seg.toTruongSinh.name}]` : '';
        const segTsStr = seg.segmentTruongSinh ? ` · ${seg.segmentTruongSinh.name} Cung` : '';
        const relLabel = seg.flowRelation ? seg.flowRelation.label : '';
        const relColor = seg.flowRelation ? seg.flowRelation.color : '#38BDF8';

        bar.style.display = 'flex';
        bar.innerHTML = `
          <div style="display:flex; flex-direction:column; width:100%; gap:0.3rem; background:rgba(15,23,42,0.96); border:1.5px solid #F59E0B; border-radius:8px; padding:0.4rem 0.65rem; backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.7);">
            <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:0.4rem; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.78rem;">
                <span style="background:#F59E0B; color:#0F172A; font-weight:800; padding:0.1rem 0.35rem; border-radius:4px; font-size:0.7rem;">ĐOẠN ${seg.fromIndex + 1}</span>
                <strong style="color:#FEF3C7;">P${seg.fromIndex + 1}${fromTsStr} ➔ P${seg.toIndex + 1}${toTsStr}</strong>
                <span style="color:#38BDF8; font-weight:700;">${seg.effectiveBearing.toFixed(1)}° (${m.name} Sơn · ${m.trigram} Quái${segTsStr})</span>
              </div>
              <div style="display:flex; gap:0.3rem; align-items:center;">
                <button type="button" id="btn-seg-insert-node" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.45rem; font-size:0.68rem; background:#047857; color:#FFF; border:1px solid #34D399;" title="Chèn thêm 1 điểm vào giữa đoạn này để uốn khúc hẻm">
                  Chèn Điểm Giữa
                </button>
                <button type="button" id="btn-seg-close" class="dt-touch-btn" style="min-height:22px; padding:0.15rem 0.45rem; font-size:0.75rem; font-weight:800; background:#450A0A; color:#FCA5A5; border:1px solid #EF4444;" title="Đóng bảng chi tiết đoạn (✕)">
                  ✕
                </button>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.72rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:0.25rem;">
              <span style="color:#94A3B8;">Dòng khí:</span>
              <strong style="color:${relColor};">${relLabel}</strong>
              <span style="color:#64748B;">|</span>
              <span style="color:#CBD5E1;">Từ <strong>${seg.fromMountain ? seg.fromMountain.name : ''} Sơn</strong> chảy dồn về <strong>${seg.toMountain ? seg.toMountain.name : ''} Sơn</strong></span>
            </div>
          </div>
        `;
        bar.querySelector('#btn-seg-insert-node')?.addEventListener('click', (e) => {
          e.stopPropagation();
          const from = this.waterPolyline[seg.fromIndex];
          const to = this.waterPolyline[seg.toIndex];
          if (!from || !to) return;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const insertIdx = seg.fromIndex + 1;
          this.waterPolyline.splice(insertIdx, 0, { x: midX, y: midY, role: 'normal' });
          if (this.laiNodeIndex >= insertIdx) this.laiNodeIndex++;
          if (this.khuNodeIndex >= insertIdx) this.khuNodeIndex++;
          this.selectedSegmentIndex = null;
          this.selectedNodeIndex = insertIdx;
          this.renderDrawingElements();
          this.updateSvgView();
          this.updateMeasurementsDisplay();
          this.updateNodeActionBar();
        });

        bar.querySelector('#btn-seg-close')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.closeSelectionBar();
        });
        return;
      }
    }

    bar.style.display = 'none';
    bar.innerHTML = '';
  }

  closeSelectionBar() {
    if (this.selectedNodeIndex === null && this.selectedSegmentIndex === null && !this.isArmingAddPoint && this.activeDrawTool === 'select' && !this.isDrawingWater) {
      return;
    }
    this.selectedNodeIndex = null;
    this.selectedSegmentIndex = null;
    this.isArmingAddPoint = false;
    this.activeDrawTool = 'select';
    this.isDrawingWater = false;
    this.renderDrawingElements();
    this.updateStepBadges();
    this.updateNodeActionBar();
    this.updateMeasurementsDisplay();
  }

  relocateFeaturesAroundCenter(newCenter) {
    if (!newCenter || !Number.isFinite(newCenter.x) || !Number.isFinite(newCenter.y)) {
      newCenter = { x: 400, y: 400 };
    }
    const oldCenter = this.centerPoint || { x: 400, y: 400 };
    this.centerPoint = { x: newCenter.x, y: newCenter.y };

    const dx = newCenter.x - oldCenter.x;
    const dy = newCenter.y - oldCenter.y;

    // Kiem tra cu ly mep mat tien cu so voi oldCenter
    const pA = this.frontageLine && this.frontageLine.pA;
    const pB = this.frontageLine && this.frontageLine.pB;
    const distA = pA ? Math.hypot(pA.x - oldCenter.x, pA.y - oldCenter.y) : Infinity;
    const distB = pB ? Math.hypot(pB.x - oldCenter.x, pB.y - oldCenter.y) : Infinity;
    const isFrontageValid = Number.isFinite(distA) && Number.isFinite(distB) && distA < 350 && distB < 350 && distA > 15 && distB > 15;

    // Kiem tra cu ly cac diem tuyen nuoc cu so voi oldCenter
    let isWaterValid = Array.isArray(this.waterPolyline) && this.waterPolyline.length >= 2;
    if (isWaterValid) {
      for (const pt of this.waterPolyline) {
        const d = Math.hypot(pt.x - oldCenter.x, pt.y - oldCenter.y);
        if (!Number.isFinite(d) || d > 450) {
          isWaterValid = false;
          break;
        }
      }
    }

    // 1. Tinh tien hoac tai lap mep mat tien
    if (isFrontageValid) {
      this.frontageLine.pA = { x: pA.x + dx, y: pA.y + dy };
      this.frontageLine.pB = { x: pB.x + dx, y: pB.y + dy };
    } else {
      this.frontageLine = {
        pA: { x: newCenter.x - 110, y: newCenter.y },
        pB: { x: newCenter.x + 110, y: newCenter.y },
        frontSide: (this.frontageLine && this.frontageLine.frontSide) || 'right'
      };
    }

    // 2. Tinh tien hoac tai lap tuyen nuoc
    if (isWaterValid) {
      this.waterPolyline = this.waterPolyline.map(pt => ({
        ...pt,
        x: pt.x + dx,
        y: pt.y + dy
      }));
    } else {
      this.waterPolyline = [
        { x: newCenter.x - 210, y: newCenter.y - 180, role: 'normal' },
        { x: newCenter.x, y: newCenter.y - 130, role: 'normal' },
        { x: newCenter.x + 210, y: newCenter.y + 180, role: 'normal' }
      ];
      this.laiNodeIndex = null;
      this.khuNodeIndex = null;
      this.selectedNodeIndex = null;
      this.selectedSegmentIndex = null;
    }

    // 3. Dong bo GPS thuc te tai vi tri moi vao mapGeometry va tinh lai goc
    this.captureMapGeometry();
    this.recalculateRawBearings();
    if (this.mode === 'map') {
      this.triggerAutoRoadDetection();
    }
  }

  async triggerAutoRoadDetection(autoApply = true) {
    if (this.mode !== 'map') return;
    this.captureMapGeometry();
    if (!this.mapGeometry || !this.mapGeometry.center) return;

    // Kiem tra trang thai khoa va che do sua tay de chong ghi de (State Machine & Lock Protection)
    if (this.isCalibrationLocked || this.roadDetectionState === 'LOCKED') return;
    if (this.isDrawingWater || this.activeDrawTool === 'drawWater') return;

    if (!this.topologyEngine) {
      const ProviderClass = (typeof window !== 'undefined' && window.OverpassRoadProvider) ||
        (typeof window !== 'undefined' && window.RoadNetworkProvider && window.RoadNetworkProvider.OverpassRoadProvider) ||
        (typeof RoadNetworkProvider !== 'undefined' && RoadNetworkProvider.OverpassRoadProvider);
      const TopologyClass = (typeof window !== 'undefined' && window.RoadTopologyEngine) ||
        (typeof RoadTopologyEngine !== 'undefined' ? RoadTopologyEngine : null);
      if (TopologyClass) {
        this.topologyEngine = new TopologyClass({
          roadProvider: ProviderClass ? new ProviderClass() : null
        });
      } else {
        return;
      }
    }

    const houseCenter = this.mapGeometry.center;
    const facingBearing = this.getEffectiveFacingBearing();

    // Tinh diem tiep can thuc te truoc cua / cong (House Access Point)
    let accessPoint = null;
    if (this.accessPointType === 'MANUAL' && this.accessPointLatLng) {
      accessPoint = this.accessPointLatLng;
    } else if (this.mapGeometry && this.mapGeometry.frontage && this.mapGeometry.frontage.pA && this.mapGeometry.frontage.pB) {
      const midLat = (this.mapGeometry.frontage.pA.lat + this.mapGeometry.frontage.pB.lat) / 2;
      const midLng = (this.mapGeometry.frontage.pA.lng + this.mapGeometry.frontage.pB.lng) / 2;
      accessPoint = (this.geoEngine && this.geoEngine.computeDestinationPoint)
        ? this.geoEngine.computeDestinationPoint({ lat: midLat, lng: midLng }, 2, facingBearing)
        : { lat: midLat, lng: midLng };
    } else {
      accessPoint = (this.geoEngine && this.geoEngine.computeDestinationPoint)
        ? this.geoEngine.computeDestinationPoint(houseCenter, 4, facingBearing)
        : houseCenter;
    }
    this.accessPoint = accessPoint;

    const currentSession = ++this.measurementSessionId;
    this.roadDetectionState = 'DETECTING';
    this.renderRoadSuggestionBanner();

    try {
      const result = await this.topologyEngine.analyzeRoadNetworkForHouse(houseCenter, facingBearing, {
        accessPoint,
        accessType: this.accessPointType || 'AUTO',
        bypassOsrm: false
      });

      // Loai bo phan hoi tre (Discard Stale Session)
      if (currentSession !== this.measurementSessionId) return;

      // Chong ghi de neu trong qua trinh cho nguoi dung da khoa
      if (this.isCalibrationLocked || this.roadDetectionState === 'LOCKED') return;

      if (!result || result.status === 'UNKNOWN' || !result.hasAccessRoad || !result.roadAxis) {
        this.roadDetectionState = 'UNKNOWN';
        this.roadAnalysisResult = result;
        this.renderRoadSuggestionBanner();
        this.renderRoadDebugPanel();
        return;
      }

      this.roadAnalysisResult = result;
      this.roadSuggestion = result;

      if (result.flowDirectionStatus === 'AMBIGUOUS') {
        this.roadDetectionState = 'AMBIGUOUS';
        if (autoApply) {
          this.applyRoadAxisOnly(result);
        }
      } else {
        this.roadDetectionState = 'ACCEPTED';
        if (autoApply) {
          this.applyRoadSuggestion(result);
        }
      }

      this.renderRoadSuggestionBanner();
      this.renderRoadDebugPanel();
    } catch (err) {
      console.warn('[AutoRoadDetection] Fail-Safe ngoai tuyen:', err);
      if (currentSession !== this.measurementSessionId) return;
      this.roadDetectionState = 'UNKNOWN';
      this.roadAnalysisResult = null;
      this.renderRoadSuggestionBanner();
      this.renderRoadDebugPanel();
    }
  }

  renderRoadSuggestionBanner() {
    const banner = (this.container && this.container.querySelector ? this.container.querySelector('#dt-road-suggestion-banner') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-road-suggestion-banner') : null);
    if (!banner) return;

    if (this.roadDetectionState === 'IDLE' || this.roadDetectionState === 'REJECTED') {
      banner.style.display = 'none';
      banner.innerHTML = '';
      return;
    }

    if (this.roadDetectionState === 'DETECTING') {
      banner.style.display = 'block';
      banner.innerHTML = `
        <div style="background:rgba(15,23,42,0.94); border:1px solid #38BDF8; border-radius:8px; padding:0.4rem 0.7rem; box-shadow:0 8px 24px rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:space-between; gap:0.5rem; font-size:0.75rem; color:#E2E8F0;">
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#38BDF8;"></span>
            <span>Đang quét đồ thị mạng đường thực tế (OSM/GIS) quanh tâm nhà...</span>
          </div>
        </div>
      `;
      return;
    }

    if (this.roadDetectionState === 'ACCEPTED') {
      banner.style.display = 'block';
      const roadName = (this.roadSuggestion && this.roadSuggestion.accessRoad && this.roadSuggestion.accessRoad.name) || 'Đoạn đường tiếp cận';
      const laiB = this.getEffectiveLaiBearing();
      const khuB = this.getEffectiveKhuBearing();
      banner.innerHTML = `
        <div style="background:rgba(6,78,59,0.95); border:1px solid #10B981; border-radius:8px; padding:0.4rem 0.75rem; display:flex; justify-content:space-between; align-items:center; font-size:0.74rem; color:#A7F3D0; flex-wrap:wrap; gap:0.4rem; box-shadow:0 8px 24px rgba(0,0,0,0.6);">
          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <span>Đã tự động bắt tuyến: <strong style="color:#FEF3C7;">${roadName}</strong></span>
            <span>(Lai: <strong style="color:#34D399;">${laiB !== null ? laiB.toFixed(1) + '°' : '---'}</strong>, Khứ: <strong style="color:#38BDF8;">${khuB !== null ? khuB.toFixed(1) + '°' : 'Hẻm cụt'}</strong>)</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.35rem;">
            <button type="button" id="btn-banner-reverse" class="dt-touch-btn" style="background:#059669; color:#FFF; border:none; padding:0.2rem 0.55rem; font-size:0.7rem; font-weight:700;">
              Đảo Chiều Lai ⇄ Khứ
            </button>
            <button type="button" id="btn-banner-toggle-debug" class="dt-touch-btn" style="background:#047857; color:#A7F3D0; border:1px solid #10B981; padding:0.2rem 0.5rem; font-size:0.7rem;">
              Đối Soát 3 Tầng
            </button>
            <button type="button" id="btn-close-accepted-banner" style="background:transparent; border:none; color:#A7F3D0; font-size:0.9rem; cursor:pointer; line-height:1;">✕</button>
          </div>
        </div>
      `;
      const btnRev = banner.querySelector('#btn-banner-reverse');
      if (btnRev) {
        btnRev.addEventListener('click', (e) => {
          e.stopPropagation();
          this.reverseWaterFlow();
        });
      }
      const btnDbg = banner.querySelector('#btn-banner-toggle-debug');
      if (btnDbg) {
        btnDbg.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showRoadDebugPanel = !this.showRoadDebugPanel;
          this.renderRoadDebugPanel();
        });
      }
      const btnCloseAcc = banner.querySelector('#btn-close-accepted-banner');
      if (btnCloseAcc) {
        btnCloseAcc.addEventListener('click', () => {
          banner.style.display = 'none';
        });
      }
      return;
    }

    if (this.roadDetectionState === 'AMBIGUOUS') {
      banner.style.display = 'block';
      const roadName = (this.roadSuggestion && this.roadSuggestion.accessRoad && this.roadSuggestion.accessRoad.name) || 'Trục đường tiếp cận';
      const axisBearing = this.roadSuggestion && this.roadSuggestion.roadAxis ? this.roadSuggestion.roadAxis.bearing : null;
      banner.innerHTML = `
        <div style="background:rgba(30,41,59,0.96); border:1px solid #F59E0B; border-radius:8px; padding:0.4rem 0.75rem; display:flex; justify-content:space-between; align-items:center; font-size:0.73rem; color:#FEF3C7; flex-wrap:wrap; gap:0.4rem; box-shadow:0 8px 24px rgba(0,0,0,0.6);">
          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <span>Trục đường GIS: <strong style="color:#FFF;">${roadName}</strong> (${axisBearing !== null ? axisBearing.toFixed(1) + '°' : '---'}). Đường thông 2 đầu đối xứng.</span>
            <span style="color:#CBD5E1;">Vui lòng bấm chọn đầu nước vào (Lai Thủy):</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.35rem;">
            <button type="button" id="btn-banner-pick-start" class="dt-touch-btn" style="background:#D97706; color:#FFF; border:none; padding:0.2rem 0.55rem; font-size:0.7rem; font-weight:700;">
              Đầu A làm Lai
            </button>
            <button type="button" id="btn-banner-pick-end" class="dt-touch-btn" style="background:#B45309; color:#FFF; border:none; padding:0.2rem 0.55rem; font-size:0.7rem; font-weight:700;">
              Đầu B làm Lai
            </button>
            <button type="button" id="btn-banner-toggle-debug" class="dt-touch-btn" style="background:#334155; color:#CBD5E1; border:1px solid #64748B; padding:0.2rem 0.5rem; font-size:0.7rem;">
              Đối Soát 3 Tầng
            </button>
            <button type="button" id="btn-close-ambiguous-banner" style="background:transparent; border:none; color:#FEF3C7; font-size:0.9rem; cursor:pointer; line-height:1;">✕</button>
          </div>
        </div>
      `;
      const btnA = banner.querySelector('#btn-banner-pick-start');
      if (btnA) {
        btnA.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.waterPolyline && this.waterPolyline.length >= 2) {
            this.setLaiNodeIndex(0);
            this.setKhuNodeIndex(this.waterPolyline.length - 1);
            this.roadDetectionState = 'ACCEPTED';
            this.renderRoadSuggestionBanner();
            this.renderRoadDebugPanel();
          }
        });
      }
      const btnB = banner.querySelector('#btn-banner-pick-end');
      if (btnB) {
        btnB.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.waterPolyline && this.waterPolyline.length >= 2) {
            this.setLaiNodeIndex(this.waterPolyline.length - 1);
            this.setKhuNodeIndex(0);
            this.roadDetectionState = 'ACCEPTED';
            this.renderRoadSuggestionBanner();
            this.renderRoadDebugPanel();
          }
        });
      }
      const btnDbg = banner.querySelector('#btn-banner-toggle-debug');
      if (btnDbg) {
        btnDbg.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showRoadDebugPanel = !this.showRoadDebugPanel;
          this.renderRoadDebugPanel();
        });
      }
      const btnCloseAmb = banner.querySelector('#btn-close-ambiguous-banner');
      if (btnCloseAmb) {
        btnCloseAmb.addEventListener('click', () => {
          banner.style.display = 'none';
        });
      }
      return;
    }

    if (this.roadDetectionState === 'UNKNOWN' || this.roadDetectionState === 'NO_ROAD') {
      banner.style.display = 'block';
      banner.innerHTML = `
        <div style="background:rgba(30,41,59,0.94); border:1px solid #64748B; border-radius:8px; padding:0.4rem 0.7rem; display:flex; justify-content:space-between; align-items:center; font-size:0.73rem; color:#94A3B8; gap:0.4rem;">
          <span>Không đủ dữ liệu đường ngoài bản đồ GIS. Vui lòng chỉnh Lai/Khứ thủ công trên ảnh vệ tinh.</span>
          <div style="display:flex; align-items:center; gap:0.35rem;">
            <button type="button" id="btn-banner-toggle-debug" class="dt-touch-btn" style="background:#334155; color:#CBD5E1; border:1px solid #64748B; padding:0.2rem 0.5rem; font-size:0.7rem;">
              Chi Tiết
            </button>
            <button type="button" id="btn-close-noroad-banner" style="background:transparent; border:none; color:#94A3B8; font-size:0.9rem; cursor:pointer; line-height:1;">✕</button>
          </div>
        </div>
      `;
      const btnDbg = banner.querySelector('#btn-banner-toggle-debug');
      if (btnDbg) {
        btnDbg.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showRoadDebugPanel = !this.showRoadDebugPanel;
          this.renderRoadDebugPanel();
        });
      }
      const btnCloseNR = banner.querySelector('#btn-close-noroad-banner');
      if (btnCloseNR) {
        btnCloseNR.addEventListener('click', () => {
          banner.style.display = 'none';
        });
      }
    }
  }

  renderRoadDebugPanel() {
    const panel = (this.container && this.container.querySelector ? this.container.querySelector('#dt-road-debug-panel') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-road-debug-panel') : null);
    if (!panel) return;

    if (!this.showRoadDebugPanel || !this.roadAnalysisResult) {
      panel.style.display = 'none';
      panel.innerHTML = '';
      return;
    }

    const res = this.roadAnalysisResult;
    const house = this.mapGeometry && this.mapGeometry.center ? this.mapGeometry.center : { lat: 0, lng: 0 };
    const facing = this.getEffectiveFacingBearing();
    const access = this.accessPoint || house;
    const road = res.accessRoad || {};
    const axis = res.roadAxis || {};
    const conf = res.confidenceScores || {};

    panel.style.display = 'block';
    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; border-bottom:1px solid #334155; padding-bottom:0.25rem;">
        <strong style="color:#38BDF8; font-size:0.75rem;">BẢNG ĐỐI SOÁT TRẮC ĐỊA GIS & HÌNH HỌC MẠNG ĐƯỜNG (3 TẦNG)</strong>
        <button type="button" id="btn-close-road-debug" style="background:transparent; border:none; color:#94A3B8; font-size:0.9rem; cursor:pointer;">✕</button>
      </div>

      <!-- TẦNG A: HOUSE GEOMETRY & ACCESS -->
      <div style="background:rgba(30,41,59,0.7); border-radius:4px; padding:0.35rem 0.5rem; margin-bottom:0.35rem;">
        <div style="color:#F59E0B; font-weight:700; margin-bottom:0.15rem;">[Tầng A] Khảo Sát Tâm Nhà & Điểm Tiếp Cận (House Access)</div>
        <div>• Tâm nhà: <code>${house.lat.toFixed(6)}, ${house.lng.toFixed(6)}</code> | Hướng mặt tiền: <strong style="color:#FEF3C7;">${facing.toFixed(1)}°</strong></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.15rem;">
          <div>• Cổng / Lối vào: <code>${access.lat.toFixed(6)}, ${access.lng.toFixed(6)}</code> <span style="background:${this.accessPointType === 'MANUAL' ? '#EC4899' : '#F59E0B'}; color:#000; padding:0.1rem 0.35rem; border-radius:3px; font-weight:800; font-size:0.65rem;">${this.accessPointType === 'MANUAL' ? 'THỦ CÔNG' : 'TỰ ĐỘNG'}</span></div>
          ${this.accessPointType === 'MANUAL' ? `<button type="button" id="btn-reset-access-point" style="background:#475569; color:#FEF3C7; border:1px solid #64748B; border-radius:3px; padding:0.1rem 0.4rem; font-size:0.65rem; cursor:pointer;">Khôi phục Cổng Tự Động</button>` : ''}
        </div>
      </div>

      <!-- TẦNG B: GIS ROAD VECTOR GEOMETRY -->
      <div style="background:rgba(30,41,59,0.7); border-radius:4px; padding:0.35rem 0.5rem; margin-bottom:0.35rem;">
        <div style="color:#38BDF8; font-weight:700; margin-bottom:0.15rem;">[Tầng B] Tuyến Đường GIS Thực Tế & Trục Đường Thích Ứng</div>
        <div>• Tuyến: <strong style="color:#FFF;">${road.name || '---'}</strong> | OSM Way ID: <code>${road.id || '---'}</code> | Cấp: <em>${road.highway || 'residential'}</em></div>
        <div>• Cự ly tới nhà: <strong style="color:#FEF3C7;">${typeof road.distanceToHouseMeters === 'number' ? road.distanceToHouseMeters.toFixed(1) + 'm' : '---'}</strong> | Khoảng cách tới cổng: ${typeof road.distanceToAccessPointMeters === 'number' ? road.distanceToAccessPointMeters.toFixed(1) + 'm' : '---'}</div>
        <div>• Trục đường thực tế (Road Axis): <strong style="color:#34D399;">${axis.bearing !== undefined ? axis.bearing.toFixed(1) + '°' : '---'}</strong> (Trục ngược: ${axis.reverseBearing !== undefined ? axis.reverseBearing.toFixed(1) + '°' : '---'})</div>
        <div>• Cửa sổ thích ứng: ${axis.windowLengthMeters ? axis.windowLengthMeters.toFixed(1) + 'm' : '---'} (${axis.samplePointsCount || 0} node vector ${axis.isCurved ? '- Có độ cong' : '- Đoạn thẳng'})</div>
        <div>• Độ cong trắc địa: <code>${typeof axis.curvatureDegPerMeter === 'number' ? axis.curvatureDegPerMeter.toFixed(3) + '°/m' : '0.000°/m'}</code> | Độ ổn định σ: <code>${typeof axis.bearingStability === 'number' ? axis.bearingStability.toFixed(2) + '°' : '0.00°'}</code></div>
        <div>• Lý do dừng cửa sổ: <strong style="color:#38BDF8;">${axis.stopReason || 'GEOMETRY_END'}</strong> (Lùi: ${axis.stopReasonBackward || 'GEOMETRY_END'}, Tiến: ${axis.stopReasonForward || 'GEOMETRY_END'})</div>
      </div>

      <!-- TẦNG C: FLOW INTERPRETATION & PURE GIS SEPARATION -->
      <div style="background:rgba(30,41,59,0.7); border-radius:4px; padding:0.35rem 0.5rem;">
        <div style="color:#34D399; font-weight:700; margin-bottom:0.15rem;">[Tầng C] Tách Biệt GIS Thuần Túy & Ánh Xạ Phong Thủy</div>
        <div style="margin-bottom:0.25rem; border-bottom:1px dashed #475569; padding-bottom:0.25rem;">
          <strong style="color:#93C5FD;">Tầng GIS Thuần Túy (Đo Đạc Tuyến):</strong>
          <div>• Hướng tiếp cận A (Approach A): <strong>${res.directions && res.directions.approachA ? res.directions.approachA.bearing.toFixed(1) + '° (' + res.directions.approachA.sourceNote + ')' : '---'}</strong></div>
          <div>• Hướng tiếp cận B (Approach B): <strong>${res.directions && res.directions.approachB ? res.directions.approachB.bearing.toFixed(1) + '° (' + res.directions.approachB.sourceNote + ')' : '---'}</strong></div>
          <div>• Trạng thái dòng chảy: <strong style="color:${res.flowDirectionStatus === 'UPSTREAM_FOUND' ? '#34D399' : '#F59E0B'};">${res.flowDirectionStatus === 'UPSTREAM_FOUND' ? 'XÁC ĐỊNH ĐẦU NGUỒN (Ưu tiên tiếp cận ' + (res.directions ? res.directions.recommendedLai : '') + ')' : 'ĐỐI XỨNG HAI ĐẦU (AMBIGUOUS - Cần chọn thủ công)'}</strong></div>
        </div>
        <div>
          <strong style="color:#FDE047;">Tầng Phong Thủy (Ánh Xạ Khí Vị):</strong>
          <div>• Lai Thủy: <strong style="color:#34D399;">${res.suggestion && res.suggestion.laiBearing !== null ? res.suggestion.laiBearing.toFixed(1) + '° (' + res.suggestion.laiMountain + ')' : 'Chưa định hướng'}</strong> | Khứ Thủy: <strong style="color:#38BDF8;">${res.suggestion && res.suggestion.khuBearing !== null ? res.suggestion.khuBearing.toFixed(1) + '° (' + res.suggestion.khuMountain + ')' : '---'}</strong></div>
        </div>
        <div style="margin-top:0.25rem; font-size:0.7rem; color:#94A3B8;">• Độ tin cậy: <strong>${conf.overallConfidence || res.confidence || 'MEDIUM'}</strong> (Trục đường: ${conf.roadAxisConfidence || '---'}, Tiếp cận: ${conf.accessConfidence || '---'})</div>
        ${Array.isArray(res.confidenceReasons) && res.confidenceReasons.length > 0 ? `<div style="color:#94A3B8; margin-top:0.15rem; font-size:0.68rem;">Ghi chú: ${res.confidenceReasons.join('; ')}</div>` : ''}
      </div>
    `;

    const btnResetAccess = panel.querySelector('#btn-reset-access-point');
    if (btnResetAccess) {
      btnResetAccess.addEventListener('click', () => {
        this.accessPointType = 'AUTO';
        this.accessPointPosition = null;
        this.accessPointLatLng = null;
        this.renderDrawingElements();
        this.triggerAutoRoadDetection(true);
      });
    }

    const btnClose = panel.querySelector('#btn-close-road-debug');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.showRoadDebugPanel = false;
        panel.style.display = 'none';
      });
    }
  }

  applyRoadAxisOnly(result) {
    if (!result || !result.roadAxis) return;
    const poly = (result.suggestion && Array.isArray(result.suggestion.polyline) && result.suggestion.polyline.length >= 2)
      ? result.suggestion.polyline
      : (result.accessRoad && result.accessRoad.rawGeometry ? result.accessRoad.rawGeometry : null);
    if (!poly) return;

    const projection = this.getMapProjection();
    const toPoint = latLng => {
      if (!this.mapInstance) return { x: 400, y: 400 };
      const point = this.mapInstance.project(latLng)
        .subtract(this.mapInstance.project(this.mapInstance.getCenter()))
        .add(this.mapInstance.getSize().divideBy(2));
      return { x: (point.x - projection.x) / projection.scale, y: (point.y - projection.y) / projection.scale };
    };

    if (!this.mapGeometry) this.captureMapGeometry();
    if (this.mapGeometry) {
      this.mapGeometry.water = poly.map(pt => ({ lat: pt.lat, lng: pt.lng }));
    }

    this.waterPolyline = poly.map((pt) => {
      const p = toPoint(pt);
      return { x: p.x, y: p.y, role: 'normal' };
    });

    this.laiNodeIndex = null;
    this.khuNodeIndex = null;
    this.waterNature = 'hu_thuy';
    this.waterPathType = 'through';
    this.roadDetectionState = 'AMBIGUOUS';

    this.recalculateRawBearings();
    this.renderDrawingElements();
    this.updateSvgView();
    this.updateMeasurementsDisplay();
  }

  applyRoadSuggestion(result) {
    if (!result || !result.suggestion || !Array.isArray(result.suggestion.polyline) || result.suggestion.polyline.length < 2) return;
    const poly = result.suggestion.polyline;
    const projection = this.getMapProjection();
    const toPoint = latLng => {
      if (!this.mapInstance) return { x: 400, y: 400 };
      const point = this.mapInstance.project(latLng)
        .subtract(this.mapInstance.project(this.mapInstance.getCenter()))
        .add(this.mapInstance.getSize().divideBy(2));
      return { x: (point.x - projection.x) / projection.scale, y: (point.y - projection.y) / projection.scale };
    };

    if (!this.mapGeometry) this.captureMapGeometry();
    if (this.mapGeometry) {
      this.mapGeometry.water = poly.map(pt => ({ lat: pt.lat, lng: pt.lng }));
    }

    this.waterPolyline = poly.map((pt, idx) => {
      const p = toPoint(pt);
      const role = idx === 0 ? 'lai' : (idx === poly.length - 1 ? 'khu' : 'normal');
      return { x: p.x, y: p.y, role };
    });

    this.laiNodeIndex = 0;
    this.khuNodeIndex = poly.length - 1;
    this.waterNature = 'hu_thuy';
    this.waterPathType = result.suggestion.flowType === 'DEAD_END' ? 'deadEnd' : 'through';
    this.roadDetectionState = 'ACCEPTED';

    this.recalculateRawBearings();
    this.renderDrawingElements();
    this.updateSvgView();
    this.updateMeasurementsDisplay();
    this.renderRoadSuggestionBanner();
  }

  reverseWaterFlow() {
    if (!this.waterPolyline || this.waterPolyline.length < 2) return;
    this.flowDirection = this.flowDirection === 'forward' ? 'reverse' : 'forward';
    const btn = document.getElementById('btn-reverse-water');
    if (btn) btn.textContent = `Đảo Chiều (${this.flowDirection === 'forward' ? 'Xuôi' : 'Ngược'})`;
    this.waterPolyline.reverse();
    if (this.mapGeometry && Array.isArray(this.mapGeometry.water)) {
      this.mapGeometry.water.reverse();
    }
    const n = this.waterPolyline.length;
    const oldLai = this.laiNodeIndex;
    const oldKhu = this.khuNodeIndex;
    this.laiNodeIndex = oldKhu !== null ? (n - 1 - oldKhu) : (oldLai !== null ? (n - 1 - oldLai) : 0);
    this.khuNodeIndex = oldLai !== null ? (n - 1 - oldLai) : (n - 1);
    for (let i = 0; i < n; i++) {
      if (i === this.laiNodeIndex) this.waterPolyline[i].role = 'lai';
      else if (i === this.khuNodeIndex) this.waterPolyline[i].role = 'khu';
      else this.waterPolyline[i].role = 'normal';
    }
    this.recalculateRawBearings();
    this.renderDrawingElements();
    this.updateSvgView();
    this.updateMeasurementsDisplay();
    this.updateNodeActionBar();
    if (this.roadSuggestion) {
      this.renderRoadSuggestionBanner();
    }
  }

  initInteractiveCanvas() {
    const svg = this.container.querySelector('#dt-drawing-svg');
    if (!svg) return;
    this.canvasEvents?.abort();
    this.canvasEvents = new AbortController();
    const options = { signal: this.canvasEvents.signal };
    let dragTarget = null;
    let pointerId = null;
    const getPosition = event => {
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      // Includes SVG letterboxing and the shared north/facing view transform.
      const position = point.matrixTransform(svg.getScreenCTM().inverse());
      return { x: position.x, y: position.y };
    };
    const refresh = () => {
      this.recalculateRawBearings();
      this.captureMapGeometry();
      this.renderDrawingElements();
      this.updateSvgView();
      this.updateMeasurementsDisplay();
    };
    svg.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      const handle = event.target.closest('[data-drag-handle]');
      const segTarget = event.target.closest('[data-segment-index]');

      // 1. Sửa tâm: Chạm bản đồ di chuyển tâm và tự động khóa ngay
      if (this.activeDrawTool === 'setCenter' && !handle) {
        const newPos = getPosition(event);
        const stageSize = this.STAGE_SIZE || 800;
        const oldCenter = this.centerPoint;
        const isFarOrOffscreen = !oldCenter ||
          oldCenter.x < -50 || oldCenter.x > stageSize + 50 ||
          oldCenter.y < -50 || oldCenter.y > stageSize + 50 ||
          Math.hypot(newPos.x - oldCenter.x, newPos.y - oldCenter.y) > 400;

        if (isFarOrOffscreen) {
          this.relocateFeaturesAroundCenter(newPos);
        } else {
          this.centerPoint = newPos;
          if (this.mode === 'map') {
            this.captureMapGeometry();
            this.recalculateRawBearings();
            this.triggerAutoRoadDetection(true);
          }
        }
        this.activeDrawTool = 'select';
        refresh();
        this.updateStepBadges();
        this.updateNodeActionBar();
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 2. Chấm thêm điểm: CHỈ KHI isArmingAddPoint === true (người dùng chủ ý bấm "+ Thêm Điểm")
      if (this.isArmingAddPoint && !handle && !segTarget) {
        const pos = getPosition(event);
        if (this.pendingNewWaterPath) {
          this.waterPolyline = [{ x: pos.x, y: pos.y, role: 'normal' }];
          this.laiNodeIndex = null;
          this.khuNodeIndex = null;
          this.selectedNodeIndex = 0;
          this.selectedSegmentIndex = null;
          this.pendingNewWaterPath = false;
        } else {
          this.waterPolyline.push({ x: pos.x, y: pos.y, role: 'normal' });
          this.selectedNodeIndex = this.waterPolyline.length - 1;
        }
        this.isArmingAddPoint = false; // Khóa ngay lập tức sau 1 lần chấm để không bị chấm thừa!
        refresh();
        this.updateStepBadges();
        this.updateNodeActionBar();
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 3. Kéo thả handle (node nước, mép mặt tiền, tâm)
      if (handle) {
        dragTarget = handle.dataset.dragHandle;
        pointerId = event.pointerId;
        svg.setPointerCapture(pointerId);
        if (dragTarget.startsWith('water_')) {
          this.selectedNodeIndex = Number(dragTarget.slice(6));
          this.selectedSegmentIndex = null;
          this.updateNodeActionBar();
          this.updateMeasurementsDisplay();
          this.renderDrawingElements();
        }
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 4. Chọn đoạn thẳng (segment) để xem hướng và chèn điểm giữa
      if (segTarget) {
        this.selectedSegmentIndex = Number(segTarget.dataset.segmentIndex);
        this.selectedNodeIndex = null;
        this.updateNodeActionBar();
        this.updateMeasurementsDisplay();
        this.renderDrawingElements();
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 5. Chạm nền trống: bỏ chọn node / segment hiện hành
      if (this.selectedNodeIndex !== null || this.selectedSegmentIndex !== null) {
        this.closeSelectionBar();
      }
    }, options);
    let dragRafId = null;
    let pendingDragPosition = null;

    const applyDragMove = () => {
      dragRafId = null;
      if (!dragTarget || !pendingDragPosition) return;
      const position = pendingDragPosition;
      if (dragTarget === 'center') {
        this.centerPoint = position;
        this.syncLuopanPosition();
      } else if (dragTarget === 'frontA') {
        this.frontageLine.pA = position;
        this.syncCalibrationFromGeometry();
      } else if (dragTarget === 'frontB') {
        this.frontageLine.pB = position;
        this.syncCalibrationFromGeometry();
      } else if (dragTarget === 'accessPoint') {
        this.accessPointPosition = position;
        this.accessPointType = 'MANUAL';
        if (this.mode === 'map' && this.mapInstance) {
          const projection = this.getMapProjection();
          const screenX = position.x * projection.scale + projection.x;
          const screenY = position.y * projection.scale + projection.y;
          const pt = this.mapInstance.containerPointToLatLng([screenX, screenY]);
          this.accessPointLatLng = { lat: pt.lat, lng: pt.lng };
        }
      } else if (dragTarget.startsWith('water_')) {
        const index = Number(dragTarget.slice(6));
        if (this.waterPolyline[index]) {
          this.waterPolyline[index].x = position.x;
          this.waterPolyline[index].y = position.y;
        }
      }
      this.recalculateRawBearings();
      this.renderDrawingElements();
    };

    svg.addEventListener('pointermove', event => {
      if (!dragTarget || event.pointerId !== pointerId) return;
      pendingDragPosition = getPosition(event);
      if (!dragRafId) {
        const raf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : (cb => setTimeout(cb, 16));
        dragRafId = raf(applyDragMove);
      }
      event.preventDefault();
    }, options);

    const finish = event => {
      if (event.pointerId !== pointerId) return;
      if (dragRafId) {
        const caf = typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : clearTimeout;
        caf(dragRafId);
        dragRafId = null;
      }
      if (pendingDragPosition) {
        applyDragMove();
        pendingDragPosition = null;
      }
      const targetBeforeFinish = dragTarget;
      dragTarget = null;
      if (svg.hasPointerCapture(pointerId)) svg.releasePointerCapture(pointerId);
      pointerId = null;
      // Chốt cập nhật toàn diện khi nhả tay
      if (targetBeforeFinish === 'accessPoint' || targetBeforeFinish === 'frontA' || targetBeforeFinish === 'frontB' || targetBeforeFinish === 'center') {
        if (this.mode === 'map') {
          this.triggerAutoRoadDetection(true);
        }
      }
      refresh();
      this.updateNodeActionBar();
    };
    svg.addEventListener('pointerup', finish, options);
    svg.addEventListener('pointercancel', finish, options);
    svg.addEventListener('lostpointercapture', finish, options);
    this.renderDrawingElements();
  }

  renderDrawingElements() {
    const svg = (this.container && this.container.querySelector ? this.container.querySelector('#dt-drawing-svg') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-drawing-svg') : null);
    if (!svg) return;

    const isDrawing = this.activeDrawTool === 'drawWater';
    const isEditingCenter = this.activeDrawTool === 'setCenter';
    const isEditingFrontage = this.activeDrawTool === 'drawFrontage';
    const hasActiveTool = isDrawing || isEditingCenter || isEditingFrontage;

    // Nền SVG chỉ nhận sự kiện khi đang ở trạng thái chủ động chờ chấm điểm (isArmingAddPoint) hoặc Sửa Tâm (setCenter).
    // Ở mọi trạng thái khác, nền SVG là 'none' để chạm rơi xuống Leaflet map giúp pan/zoom mượt mà.
    svg.style.pointerEvents = (this.isArmingAddPoint || isEditingCenter) && this.showDrawingOverlay ? 'auto' : 'none';
    if (!this.showDrawingOverlay) {
      svg.innerHTML = '';
      return;
    }

    const { pA, pB } = this.frontageLine;
    const center = this.centerPoint;

    // 1. Mặt tiền nhà
    const midFrontX = (pA.x + pB.x) / 2;
    const midFrontY = (pA.y + pB.y) / 2;

    const facingRad = (this.rawFacingBearing - 90) * (Math.PI / 180);
    const arrowLen = 70;
    const normalEndX = midFrontX + arrowLen * Math.cos(facingRad);
    const normalEndY = midFrontY + arrowLen * Math.sin(facingRad);

    // 2. Tuyến nước
    const segmentElements = [];
    const segments = this.getWaterSegments();
    const hasSelectedSeg = this.selectedSegmentIndex !== null;

    if (this.waterPolyline.length >= 2) {
      for (let i = 0; i < this.waterPolyline.length - 1; i++) {
        const from = this.waterPolyline[i];
        const to = this.waterPolyline[i + 1];
        const isSelected = this.selectedSegmentIndex === i;
        const seg = segments[i];

        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const angleRad = Math.atan2(to.y - from.y, to.x - from.x);
        const angleDeg = angleRad * (180 / Math.PI);

        const baseOpacity = isSelected ? 1.0 : (hasSelectedSeg ? 0.38 : 0.85);
        const strokeColor = isSelected ? '#F59E0B' : '#38BDF8';
        const strokeW = isSelected ? 7 : 4;

        segmentElements.push(`
          <!-- Vùng đệm 28px bắt sự kiện chạm đoạn trên SVG (luôn hoạt động) -->
          <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="transparent" stroke-width="28" data-segment-index="${i}" style="cursor:pointer; touch-action:none; pointer-events:all;" />
          
          <!-- Đường tuyến chính -->
          <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="${baseOpacity}" pointer-events="none" />
          
          ${isSelected ? `
            <!-- Đường nét đứt màu trắng chạy ở giữa nổi bật -->
            <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#FFF" stroke-width="2.5" stroke-dasharray="6,4" pointer-events="none" />
            
            <!-- Mũi tên hướng dòng chảy lớn -->
            <polygon points="-10,-7 14,0 -10,7 -4,0" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" transform="translate(${midX}, ${midY}) rotate(${angleDeg})" pointer-events="none" />
            
            <!-- Huy hiệu nổi chỉ hướng từ P[i] đến P[i+1] -->
            <g transform="translate(${midX}, ${midY - 22})" pointer-events="none">
              <rect x="-65" y="-12" width="130" height="24" rx="12" fill="rgba(15,23,42,0.94)" stroke="#F59E0B" stroke-width="1.6" />
              <text x="0" y="4" fill="#FEF3C7" font-size="11" font-weight="700" font-family="system-ui" text-anchor="middle">
                P${i + 1} ➔ P${i + 2} · ${seg ? seg.effectiveBearing.toFixed(1) : ''}° (${seg && seg.segmentMountain ? seg.segmentMountain.name : ''})
              </text>
            </g>
          ` : `
            <!-- Mũi tên hướng dòng chảy thông thường -->
            <polygon points="-5,-4 6,0 -5,4 -2,0" fill="#38BDF8" opacity="${baseOpacity}" transform="translate(${midX}, ${midY}) rotate(${angleDeg})" pointer-events="none" />
          `}
        `);
      }
    }

    const waterPointsInfo = this.getWaterPoints();
    const waterHandles = this.waterPolyline.map((p, idx) => {
      const isLai = (waterPointsInfo.pLai === p);
      const isKhu = (waterPointsInfo.pKhu === p);
      const isDeadEnd = (this.waterPathType === 'deadEnd' && waterPointsInfo.pDeadEnd === p);
      const isJunction = (p.role === 'junction');
      const isSelected = (this.selectedNodeIndex === idx);

      let color = '#94A3B8';
      let label = '';
      let badge = String(idx + 1);

      if (isLai) {
        color = '#34D399';
        label = 'LAI';
        badge = 'L';
      } else if (isDeadEnd) {
        color = '#F43F5E';
        label = 'CỤT';
        badge = 'C';
      } else if (isKhu) {
        color = '#38BDF8';
        label = 'KHỨ';
        badge = 'K';
      } else if (isJunction) {
        color = '#F59E0B';
        label = 'NGÃ 3';
        badge = 'N';
      } else if (isSelected) {
        color = '#FEF3C7';
        label = `P${idx + 1}`;
        badge = String(idx + 1);
      }

      const rCircle = (isLai || isKhu || isDeadEnd || isJunction || isSelected) ? 12 : 7;

      return `
        <g transform="translate(${p.x}, ${p.y})">
          <circle r="26" fill="transparent" data-drag-handle="water_${idx}" style="cursor:${isDrawing ? 'grab' : 'default'}; touch-action:none; pointer-events:${isDrawing ? 'all' : 'none'};" />
          <circle r="${rCircle}" fill="${color}" stroke="#000" stroke-width="${isSelected ? 3 : 2}" pointer-events="none" ${isSelected ? 'filter="drop-shadow(0 0 6px #FBBF24)"' : ''} />
          ${rCircle >= 11 ? `<text y="4" font-size="9" font-weight="900" fill="#000" text-anchor="middle" pointer-events="none">${badge}</text>` : ''}
          ${label ? `
            <text y="-16" font-size="12" font-weight="800" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">${label}</text>
            <text y="-16" font-size="12" font-weight="800" fill="${color}" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">${label}</text>
          ` : ''}
        </g>
      `;
    }).join('');

    // Hiển thị Tuyến Đường Đề Xuất (OSM) nếu đang ở trạng thái SUGGESTED
    let suggestionSvg = '';
    if (this.roadDetectionState === 'SUGGESTED' && this.roadSuggestion && this.roadSuggestion.suggestion && this.mode === 'map' && this.mapInstance) {
      const poly = this.roadSuggestion.suggestion.polyline;
      if (Array.isArray(poly) && poly.length >= 2) {
        const projection = this.getMapProjection();
        const toPt = latLng => {
          const pt = this.mapInstance.project(latLng)
            .subtract(this.mapInstance.project(this.mapInstance.getCenter()))
            .add(this.mapInstance.getSize().divideBy(2));
          return { x: (pt.x - projection.x) / projection.scale, y: (pt.y - projection.y) / projection.scale };
        };
        const pts = poly.map(toPt);
        const ptsStr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
        suggestionSvg = `
          <g class="dt-suggested-road-overlay" pointer-events="none">
            <polyline points="${ptsStr}" stroke="#0284C7" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.35" fill="none" />
            <polyline points="${ptsStr}" stroke="#38BDF8" stroke-width="3.5" stroke-dasharray="8,5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" fill="none" />
            ${pts.map((p) => `
              <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#38BDF8" stroke="#0F172A" stroke-width="1.5" />
            `).join('')}
          </g>
        `;
      }
    }

    svg.innerHTML = `
      <!-- Tuyến đường đề xuất GIS (nếu có) -->
      ${suggestionSvg}

      <!-- Các đoạn tuyến nước đa điểm -->
      ${segmentElements.join('')}
      ${waterHandles}

      <!-- Mặt tiền căn nhà (Đoạn A -> B) -->
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#F59E0B" stroke-width="6" stroke-linecap="round" />
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#FEF3C7" stroke-width="1.8" stroke-dasharray="5,4" />

      <!-- Pháp tuyến hướng nhìn nhà -->
      <line x1="${midFrontX}" y1="${midFrontY}" x2="${normalEndX}" y2="${normalEndY}" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      <polygon points="${normalEndX},${normalEndY} ${normalEndX-6},${normalEndY+12} ${normalEndX+6},${normalEndY+12}" fill="#EF4444" stroke="#000" stroke-width="1" transform="rotate(${this.rawFacingBearing + 90}, ${normalEndX}, ${normalEndY})" />
      <text x="${normalEndX}" y="${normalEndY - 14}" font-size="13" font-weight="900" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">HƯỚNG NHÀ</text>
      <text x="${normalEndX}" y="${normalEndY - 14}" font-size="13" font-weight="900" fill="#EF4444" stroke="rgba(255,255,255,0.3)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">HƯỚNG NHÀ</text>

      <!-- Điểm A và Điểm B -->
      <g transform="translate(${pA.x}, ${pA.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontA" style="cursor:${isEditingFrontage ? 'grab' : 'default'}; touch-action:none; pointer-events:${isEditingFrontage ? 'all' : 'none'};" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-15" font-size="12" font-weight="800" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">Mép A</text>
        <text y="-15" font-size="12" font-weight="800" fill="#FDE047" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">Mép A</text>
      </g>
      <g transform="translate(${pB.x}, ${pB.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontB" style="cursor:${isEditingFrontage ? 'grab' : 'default'}; touch-action:none; pointer-events:${isEditingFrontage ? 'all' : 'none'};" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-15" font-size="12" font-weight="800" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">Mép B</text>
        <text y="-15" font-size="12" font-weight="800" fill="#FDE047" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">Mép B</text>
      </g>

      <!-- Điểm Tâm Nhà -->
      <g transform="translate(${center.x}, ${center.y})">
        <circle r="24" fill="transparent" data-drag-handle="center" style="cursor:${isEditingCenter ? 'grab' : 'default'}; touch-action:none; pointer-events:${isEditingCenter ? 'all' : 'none'};" />
        <circle r="12" fill="#EF4444" stroke="#FFF" stroke-width="3" pointer-events="none" />
        <circle r="4" fill="#FFF" pointer-events="none" />
        <text y="-18" font-size="13" font-weight="900" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">TÂM NHÀ</text>
        <text y="-18" font-size="13" font-weight="900" fill="#EF4444" stroke="rgba(255,255,255,0.3)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">TÂM NHÀ</text>
      </g>

      <!-- Điểm Cổng / Lối Vào (House Access Point - Kéo thả tự do) -->
      ${(() => {
        const isManualAccess = (this.accessPointType === 'MANUAL');
        const accessPos = (isManualAccess && this.accessPointPosition)
          ? this.accessPointPosition
          : { x: midFrontX + 35 * Math.cos(facingRad), y: midFrontY + 35 * Math.sin(facingRad) };
        const accessColor = isManualAccess ? '#EC4899' : '#F59E0B';
        const accessLabel = isManualAccess ? 'CỔNG [THỦ CÔNG]' : 'CỔNG [TỰ ĐỘNG]';
        return `
          <g transform="translate(${accessPos.x}, ${accessPos.y})">
            <circle r="26" fill="transparent" data-drag-handle="accessPoint" style="cursor:grab; touch-action:none; pointer-events:all;" />
            <rect x="-10" y="-10" width="20" height="20" rx="4" fill="${accessColor}" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
            <circle r="3" fill="#FFF" pointer-events="none" />
            <text y="-16" font-size="11" font-weight="900" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">${accessLabel}</text>
            <text y="-16" font-size="11" font-weight="900" fill="${accessColor}" stroke="rgba(255,255,255,0.3)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">${accessLabel}</text>
          </g>
        `;
      })()}
    `;
  }

  getAnalysis() {
    return this.classifier.classify({
      facingBearing: this.getEffectiveFacingBearing(),
      laiBearing: this.getEffectiveLaiBearing(),
      khuBearing: this.getEffectiveKhuBearing(),
      deadEndBearing: this.getEffectiveDeadEndBearing(),
      deadEndDistanceMeters: this.getDeadEndDistanceMeters(),
      roadStrikeOffsetMeters: this.roadStrikeOffsetMeters !== undefined ? this.roadStrikeOffsetMeters : 3.0,
      offset: this.isCalibrationLocked ? this.calibrationOffset : 0,
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance,
      polyline: this.waterPolyline,
      waterSegments: this.getWaterSegments(),
      houseCenter: this.centerPoint,
      frontageLine: this.frontageLine,
      waterPathType: this.waterPathType,
      waterNature: this.waterNature || 'hu_thuy',
      laiNodeIndex: this.laiNodeIndex,
      khuNodeIndex: this.khuNodeIndex
    });
  }

  formatMountain(info) {
    if (!info) return 'Chưa đo';
    const mountain = info.mountain;
    const trigram = this.data.getTrigram(info.bearing).trigram;
    return `${mountain.name} Sơn · ${mountain.type} · ${trigram.name} Quái`;
  }

  renderResultPanels(analysis = this.getAnalysis()) {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();
    const relLai = lai === null ? null : this.calibEngine.computeRelativeBearing(facing, lai);
    const relKhu = khu === null ? null : this.calibEngine.computeRelativeBearing(facing, khu);
    return `
            <!-- TẦNG 1: PHÉP ĐO (MEASUREMENTS) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#FEF3C7;">
                1. PHÉP ĐO & ĐỊNH HƯỚNG
              </div>

              <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.78rem;">
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#EF4444; font-weight:700;">Hướng Nhà:</span>
                  <strong style="color:#EF4444;">${facing.toFixed(2)}° · ${analysis.facing.mountain.name} Sơn</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#FBBF24; font-weight:700;">Tọa Nhà:</span>
                  <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(2)}° · ${analysis.sitting.mountain.name} Sơn</strong>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.15rem; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:#34D399; font-weight:700;">Lai Thủy (Đến):</span>
                    <strong style="color:#34D399;">${lai !== null ? `${lai.toFixed(2)}°` : 'Chưa đo'}</strong>
                  </div>
                  <div class="dt-bearing-label" data-bearing-label="lai">${this.formatMountain(analysis.lai)}</div>
                  ${relLai !== null ? `
                    <div style="font-size:0.72rem; color:#94A3B8; padding-left:0.3rem;">
                      ↳ So với hướng nhà: <strong style="color:#34D399;">${relLai >= 0 ? '+' : ''}${relLai.toFixed(2)}° (${relLai >= 0 ? 'lệch phải' : 'lệch trái'})</strong>
                    </div>
                  ` : ''}
                </div>

                ${this.waterPathType === 'deadEnd' ? (() => {
                  const de = analysis.deadEnd;
                  const deBearing = this.getEffectiveDeadEndBearing();
                  const deDist = this.getDeadEndDistanceMeters();
                  const relDe = deBearing !== null ? this.calibEngine.computeRelativeBearing(facing, deBearing) : null;
                  const zoneInfo = de && de.uncertainty && de.uncertainty.mountainZone;
                  const zoneLabel = zoneInfo ? zoneInfo.displayLabel : '';
                  const isBorder = zoneInfo && zoneInfo.zone !== 'PURE_MOUNTAIN';
                  const roadAxis = this.lastRoadAxis;
                  return `
                    <div style="display:flex; flex-direction:column; gap:0.35rem; padding:0.4rem 0.5rem; background:#1E293B; border-radius:6px; border:1px solid ${isBorder ? '#F59E0B' : 'rgba(255,255,255,0.1)'};">
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:#F43F5E; font-weight:700;">1. Điểm Tận Hẻm Cụt (Object Bearing):</span>
                        <strong style="color:#F43F5E;">${deBearing !== null ? `${deBearing.toFixed(2)}°` : 'Chưa đo'} ${deDist ? `(${deDist.toFixed(1)}m)` : ''}</strong>
                      </div>
                      ${zoneLabel ? `
                        <div style="font-size:0.72rem; font-weight:700; color:${isBorder ? '#F59E0B' : '#FEF3C7'};">
                          ${zoneLabel}
                        </div>
                      ` : ''}
                      ${zoneInfo && zoneInfo.warning ? `
                        <div style="font-size:0.68rem; color:#F59E0B; line-height:1.3;">
                          ${zoneInfo.warning}
                        </div>
                      ` : ''}
                      ${zoneInfo && zoneInfo.recommendation ? `
                        <div style="font-size:0.68rem; color:#FB7185; font-weight:600; line-height:1.3;">
                          ↳ ${zoneInfo.recommendation}
                        </div>
                      ` : ''}
                      ${relDe !== null ? `
                        <div style="font-size:0.72rem; color:#94A3B8;">
                          ↳ So với hướng nhà: <strong style="color:#F43F5E;">${relDe >= 0 ? '+' : ''}${relDe.toFixed(2)}° (${relDe >= 0 ? 'lệch phải' : 'lệch trái'})</strong>
                        </div>
                      ` : ''}
                      <div style="font-size:0.68rem; color:#94A3B8; font-style:italic; border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.2rem;">
                        * Điểm cụt vật lý ngoại cục, không phải Thủy Khẩu Khứ. Nước và khí không thoát tại đây.
                      </div>
                      <div style="display:flex; justify-content:space-between; margin-top:0.15rem;">
                        <span style="color:#38BDF8; font-weight:700;">2. Trục Tiếp Cận Cục Bộ:</span>
                        <strong style="color:#38BDF8;">${roadAxis ? `${roadAxis.bearing.toFixed(1)}° ↔ ${roadAxis.reverseBearing.toFixed(1)}°` : 'Theo tim đường cục bộ'}</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between;">
                        <span style="color:#94A3B8; font-weight:700;">3. Khứ Thủy / Khí Khẩu:</span>
                        <strong style="color:#94A3B8;">Không xác lập (Bế Khí / Tụ Khí)</strong>
                      </div>
                      <div style="font-size:0.68rem; color:#94A3B8;">
                        ↳ Hướng thoát nước: Theo rãnh cống/độ dốc mặt đường chảy ngược ra miệng hẻm.
                      </div>
                      ${de && de.strikeLabel ? `
                        <div style="font-size:0.72rem; padding:0.25rem 0.4rem; border-radius:4px; background:${de.strikeStatus === 'SAFE_OFFSET' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color:${de.strikeStatus === 'SAFE_OFFSET' ? '#34D399' : '#EF4444'}; font-weight:700; margin-top:0.15rem;">
                          ${de.strikeLabel}
                        </div>
                      ` : ''}
                    </div>
                  `;
                })() : `
                  <div style="display:flex; flex-direction:column; gap:0.15rem; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                    <div style="display:flex; justify-content:space-between;">
                      <span style="color:#38BDF8; font-weight:700;">Khứ Thủy (Đi):</span>
                      <strong style="color:#38BDF8;">${khu !== null ? `${khu.toFixed(2)}°` : 'Chưa đo'}</strong>
                    </div>
                    <div class="dt-bearing-label" data-bearing-label="khu">${this.formatMountain(analysis.khu)}</div>
                    ${relKhu !== null ? `
                      <div style="font-size:0.72rem; color:#94A3B8; padding-left:0.3rem;">
                        ↳ So với hướng nhà: <strong style="color:#38BDF8;">${relKhu >= 0 ? '+' : ''}${relKhu.toFixed(2)}° (${relKhu >= 0 ? 'lệch phải' : 'lệch trái'})</strong>
                      </div>
                    ` : ''}
                  </div>
                `}
              </div>
            </div>

            <!-- TẦNG 2: LA KINH (LUOPAN ATTRIBUTES & 12 TRƯỜNG SINH) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#F5D485; display:flex; justify-content:space-between; align-items:center;">
                <span>2. LA KINH CHÁNH TÔNG & TRƯỜNG SINH</span>
                <span style="font-size:0.7rem; padding:0.1rem 0.45rem; border-radius:4px; background:rgba(245,212,133,0.15); color:#F5D485; font-weight:700;">
                  ${analysis.group.cuc} Cục
                </span>
              </div>

              <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.78rem;">
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Hướng Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.facing.mountain.name} Sơn (${analysis.facing.mountain.element}) · ${analysis.facing.truongSinh ? `${analysis.facing.truongSinh.name} Cung` : ''}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Tọa Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.sitting.mountain.name} Sơn · ${analysis.sitting.truongSinh ? `${analysis.sitting.truongSinh.name} Cung` : ''}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Lai Sơn:</span>
                  <strong style="color:#34D399;">
                    ${analysis.lai ? `${analysis.lai.mountain.name} Sơn · ${analysis.lai.truongSinh ? `${analysis.lai.truongSinh.name} Cung (${analysis.lai.truongSinh.laiNature})` : ''}` : 'Chưa đo'}
                  </strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Khứ Sơn:</span>
                  <strong style="color:#38BDF8;">
                    ${analysis.khu ? `${analysis.khu.mountain.name} Sơn · ${analysis.khu.truongSinh ? `${analysis.khu.truongSinh.name} Cung (${analysis.khu.truongSinh.khuNature})` : ''}` : (this.waterPathType === 'deadEnd' ? 'Hẻm cụt (không có Khứ)' : 'Chưa đo')}
                  </strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#141B2B; border-radius:6px;">
                  <span>Cụm Song Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.group.label} (${analysis.group.cuc} Cục)</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#141B2B; border-radius:6px;">
                  <span>Hình Thái Thủy / Khí:</span>
                  <strong style="color:${this.waterNature === 'hu_thuy' ? '#F59E0B' : '#38BDF8'};">
                    ${this.waterNature === 'hu_thuy' ? 'Hư Thủy (Lộ Khí Đô Thị)' : 'Chân Thủy (Dòng Nước Thật)'}
                  </strong>
                </div>

                <!-- BẢNG TỔNG LUẬN 12 TRƯỜNG SINH TAM HỢP -->
                <div style="margin-top:0.15rem; padding:0.45rem 0.6rem; background:#0F172A; border:1px solid rgba(245,212,133,0.25); border-radius:6px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                    <span style="font-size:0.7rem; color:#94A3B8; font-weight:700; text-transform:uppercase;">Tổng Luận Trường Sinh Thủy Pháp:</span>
                    <span style="font-size:0.7rem; font-weight:700; color:${analysis.tamHop ? analysis.tamHop.color : '#94A3B8'}; background:${analysis.tamHop ? analysis.tamHop.color : '#94A3B8'}22; padding:0.1rem 0.4rem; border-radius:4px;">
                      ${analysis.tamHop ? analysis.tamHop.rating : 'Bình'}
                    </span>
                  </div>
                  <div style="font-size:0.82rem; font-weight:800; color:#FEF3C7; margin-bottom:0.3rem;">
                    ${analysis.tamHop ? analysis.tamHop.aphorism : ''}
                  </div>
                  ${analysis.lai && analysis.lai.truongSinh ? `
                    <div style="font-size:0.72rem; color:#A7F3D0; line-height:1.4; margin-bottom:0.25rem;">
                      • <strong>Lai Thủy (${analysis.lai.truongSinh.name}):</strong> ${analysis.lai.truongSinh.laiDesc}
                    </div>
                  ` : ''}
                  ${analysis.khu && analysis.khu.truongSinh ? `
                    <div style="font-size:0.72rem; color:#BAE6FD; line-height:1.4; margin-bottom:0.25rem;">
                      • <strong>Khứ Thủy (${analysis.khu.truongSinh.name}):</strong> ${analysis.khu.truongSinh.khuDesc}
                    </div>
                  ` : ''}
                </div>

                <!-- CHI TIẾT CÁC NODE / NGÃ BA TRÊN TUYẾN HẺM -->
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px; margin-top:0.1rem;">
                  <span>Tuyến Hẻm:</span>
                  <strong style="color:#38BDF8;">${this.waterPolyline.length} điểm (${Math.max(0, this.waterPolyline.length - 1)} đoạn)</strong>
                </div>

                <div style="display:flex; flex-wrap:wrap; gap:0.25rem; margin-top:0.05rem;">
                  ${this.waterPolyline.map((p, i) => {
                    const radialEff = this.getEffectiveNodeRadialBearing(i);
                    const m = this.data.getMountain(radialEff).mountain;
                    const ts = this.data.getTruongSinh(m.name, analysis.group.cuc);
                    const isLai = this.laiNodeIndex === i;
                    const isKhu = this.khuNodeIndex === i;
                    const isJunc = p.role === 'junction';
                    let roleBadge = isLai ? 'Lai' : (isKhu ? 'Khứ' : (isJunc ? 'Ngã 3' : ''));
                    let badgeColor = isLai ? '#34D399' : (isKhu ? '#38BDF8' : (isJunc ? '#F59E0B' : '#94A3B8'));
                    return `
                      <span style="font-size:0.68rem; padding:0.15rem 0.35rem; background:#141B2B; border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:#FEF3C7;" title="Node P${i + 1}: ${m.name} Sơn (${ts ? ts.name : ''})">
                        <strong>P${i + 1}:</strong> ${m.name} (${ts ? ts.name : ''})${roleBadge ? ` <span style="color:${badgeColor}; font-weight:700;">[${roleBadge}]</span>` : ''}
                      </span>
                    `;
                  }).join('')}
                </div>

                <!-- SƠ ĐỒ PHÂN ĐOẠN DÒNG CHẢY (CHẠM VÀO ĐOẠN ĐỂ NỔI BẬT HƯỚNG TỪ LAI ĐẾN KHỨ) -->
                ${(() => {
                  const segments = this.getWaterSegments();
                  if (segments.length === 0) return '';
                  return `
                    <div style="margin-top:0.45rem;">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                        <span style="font-size:0.72rem; font-weight:700; color:#38BDF8;">SƠ ĐỒ DÒNG CHẢY (LAI ➔ KHỨ):</span>
                        <span style="font-size:0.65rem; color:#94A3B8;">Chạm đoạn để xem</span>
                      </div>
                      <div class="dt-segment-flow-track" style="display:flex; flex-direction:column; gap:0.3rem;">
                        ${segments.map((seg, i) => {
                          const isSel = this.selectedSegmentIndex === i;
                          const m = seg.segmentMountain;
                          const ts = seg.segmentTruongSinh;
                          const rel = seg.flowRelation;
                          const isNgoaiCucHuThuy = this.waterNature === 'hu_thuy' && seg.tier === 'ngoai_cuc';
                          return `
                            <div class="dt-segment-card" data-segment-idx="${i}" style="cursor:pointer; padding:0.35rem 0.5rem; background:${isSel ? 'rgba(245,158,11,0.2)' : '#141B2B'}; border:${isSel ? '1.5px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)'}; border-radius:6px; transition:all 0.15s ease;">
                              <div style="display:flex; justify-content:space-between; align-items:center; gap:0.3rem;">
                                <span style="font-weight:700; font-size:0.75rem; color:${isSel ? '#FEF3C7' : '#E2E8F0'}; display:flex; align-items:center; gap:0.35rem;">
                                  <span>Đoạn ${i + 1}: P${seg.fromIndex + 1} ➔ P${seg.toIndex + 1}</span>
                                  <span style="font-size:0.62rem; font-weight:800; padding:0.08rem 0.35rem; border-radius:3px; background:${seg.tier === 'can_trach' ? 'rgba(16,185,129,0.2)' : (seg.tier === 'trung_cuc' ? 'rgba(56,189,248,0.2)' : 'rgba(167,139,250,0.2)')}; color:${seg.tier === 'can_trach' ? '#34D399' : (seg.tier === 'trung_cuc' ? '#38BDF8' : '#C4B5FD')}; border:1px solid ${seg.tier === 'can_trach' ? 'rgba(16,185,129,0.45)' : (seg.tier === 'trung_cuc' ? 'rgba(56,189,248,0.45)' : 'rgba(167,139,250,0.45)')};">
                                    ${seg.tierLabel || (seg.tier === 'can_trach' ? 'Cận Trạch' : (seg.tier === 'trung_cuc' ? 'Trung Cục' : 'Ngoại Cục'))}
                                  </span>
                                </span>
                                <span style="font-size:0.68rem; font-weight:700; color:#38BDF8; background:rgba(56,189,248,0.12); padding:0.08rem 0.3rem; border-radius:4px;">
                                  ${seg.effectiveBearing.toFixed(1)}° (${m ? m.name : ''} Sơn)
                                </span>
                              </div>
                              <div style="display:flex; justify-content:space-between; margin-top:0.15rem; font-size:0.68rem; color:#CBD5E1;">
                                <span>Từ <strong>${seg.fromMountain ? seg.fromMountain.name : ''}</strong> [${seg.fromTruongSinh ? seg.fromTruongSinh.name : ''}] ➔ <strong>${seg.toMountain ? seg.toMountain.name : ''}</strong> [${seg.toTruongSinh ? seg.toTruongSinh.name : ''}]</span>
                              </div>
                              ${isNgoaiCucHuThuy ? `
                                <div style="margin-top:0.1rem; font-size:0.64rem; color:#A78BFA; font-style:italic;">
                                  ↳ Ngoại Cục vĩ mô: Không tính 12 Trường Sinh trực tiếp (Hư Thủy loại suy).
                                </div>
                              ` : ''}
                              <div style="margin-top:0.12rem; font-size:0.66rem; color:${rel ? rel.color : '#94A3B8'}; font-weight:600;">
                                ${rel ? rel.label : ''}
                              </div>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  `;
                })()}

                ${(() => {
                  if (this.selectedSegmentIndex !== null) {
                    const segments = this.getWaterSegments();
                    const seg = segments[this.selectedSegmentIndex];
                    if (seg) {
                      const m = this.data.getMountain(seg.effectiveBearing).mountain;
                      const ts = this.data.getTruongSinh(m.name, analysis.group.cuc);
                      return `
                        <div style="margin-top:0.35rem; padding:0.4rem 0.55rem; background:#141B2B; border-radius:6px; border-left:3px solid #38BDF8; font-size:0.75rem;">
                          <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="color:#38BDF8; font-weight:700;">Đoạn chọn: P${seg.fromIndex + 1} → P${seg.toIndex + 1}</div>
                            <span style="font-size:0.65rem; font-weight:800; color:#F5D485; background:rgba(245,212,133,0.15); padding:0.1rem 0.35rem; border-radius:3px;">
                              ${seg.tierLabel || seg.tier}
                            </span>
                          </div>
                          <div style="color:#FEF3C7; margin-top:0.15rem;">• Tiếp tuyến thân đường: <strong>${seg.effectiveBearing.toFixed(2)}° (${m.name} Sơn · ${ts ? `${ts.name} Cung · ` : ''}${m.trigram} Quái)</strong></div>
                          ${seg.fromRadialEff !== undefined && seg.toRadialEff !== undefined ? `
                            <div style="color:#94A3B8; font-size:0.7rem; margin-top:0.1rem;">• Phương vị nạp khí từ tâm nhà: P${seg.fromIndex + 1} = <strong>${seg.fromRadialEff.toFixed(1)}°</strong>, P${seg.toIndex + 1} = <strong>${seg.toRadialEff.toFixed(1)}°</strong></div>
                          ` : ''}
                          ${this.waterNature === 'hu_thuy' && seg.tier === 'ngoai_cuc' ? `
                            <div style="color:#F59E0B; font-size:0.68rem; margin-top:0.2rem; font-style:italic;">[Hư Thủy] Ngoại Cục là đại động thế vĩ mô ở xa, khí bị tiêu tán qua góc rẽ, không tính 12 Cung Trường Sinh trực tiếp vào gia trạch.</div>
                          ` : ''}
                        </div>
                      `;
                    }
                  }
                  if (this.selectedNodeIndex !== null && this.waterPolyline[this.selectedNodeIndex]) {
                    const idx = this.selectedNodeIndex;
                    const p = this.waterPolyline[idx];
                    const radialEffective = this.getEffectiveNodeRadialBearing(idx);
                    const m = this.data.getMountain(radialEffective).mountain;
                    const ts = this.data.getTruongSinh(m.name, analysis.group.cuc);
                    const roleLabel = this.laiNodeIndex === idx ? 'Lai Thủy' : (this.khuNodeIndex === idx ? 'Khứ Thủy' : (p.role === 'junction' ? 'Ngã 3' : 'Node thường'));
                    return `
                      <div style="margin-top:0.35rem; padding:0.4rem 0.55rem; background:#141B2B; border-radius:6px; border-left:3px solid #F59E0B; font-size:0.75rem;">
                        <div style="color:#F59E0B; font-weight:700;">Node chọn: P${idx + 1} (${roleLabel})</div>
                        <div style="color:#FEF3C7; margin-top:0.15rem;">Phương vị đối với Nhà: <strong>${radialEffective.toFixed(2)}° (${m.name} Sơn · ${ts ? `${ts.name} Cung` : ''})</strong></div>
                      </div>
                    `;
                  }
                  return '';
                })()}
              </div>
            </div>

            <!-- TẦNG 3: ĐỘ TIN CẬY & CẬN BIÊN (UNCERTAINTY & BOUNDARY) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#CBD5E1;">
                3. ĐỘ TIN CẬY & RANH PHÂN KIM
              </div>

              <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.75rem;">
                <div style="display:flex; justify-content:space-between;">
                  <span>Sai số đo La Kinh nhập:</span>
                  <strong>±${this.measurementTolerance.toFixed(2)}°</strong>
                </div>

                <div style="display:flex; justify-content:space-between;">
                  <span>Cách ranh Hướng Nhà:</span>
                  <strong style="color:${analysis.facing.distanceToBoundary <= 0.3 ? '#FB7185' : '#10B981'};">${analysis.facing.distanceToBoundary.toFixed(2)}°</strong>
                </div>

                ${analysis.lai ? `
                  <div style="display:flex; justify-content:space-between;">
                    <span>Cách ranh Lai Thủy:</span>
                    <strong style="color:${analysis.lai.distanceToBoundary <= 0.3 ? '#FB7185' : '#10B981'};">${analysis.lai.distanceToBoundary.toFixed(2)}°</strong>
                  </div>
                ` : ''}

                ${analysis.khu ? `
                  <div style="display:flex; justify-content:space-between;">
                    <span>Cách ranh Khứ Thủy:</span>
                    <strong style="color:${analysis.khu.distanceToBoundary <= 0.3 ? '#FB7185' : '#10B981'};">${analysis.khu.distanceToBoundary.toFixed(2)}°</strong>
                  </div>
                ` : ''}

                ${analysis.status.isAmbiguous ? `
                  <div style="background:#451A03; border:1px solid #F59E0B; border-radius:6px; padding:0.45rem 0.6rem; color:#FDE68A; font-size:0.73rem; margin-top:0.3rem; line-height:1.4;">
                    <strong>QUALITY GATE - CẢNH BÁO GIÁP RANH SƠN:</strong> Phương vị rơi vào dải bất định (cách biên ≤ sai số ±${this.measurementTolerance.toFixed(2)}°). Sơn giáp ranh: [${[...new Set([...(analysis.facing.isAmbiguous ? analysis.facing.possibleMountains : []), ...(analysis.khu && analysis.khu.isAmbiguous ? analysis.khu.possibleMountains : [])])].join(' / ')}]. <em>Hệ thống không ép về duy nhất 1 Sơn để tránh sai lệch phong thủy. Cần đo lại hiện trường.</em>
                  </div>
                ` : (analysis.status.isSensitive ? `
                  <div style="background:#450A0A; border:1px solid #EF4444; border-radius:6px; padding:0.45rem 0.6rem; color:#FECACA; font-size:0.73rem; margin-top:0.3rem; line-height:1.4;">
                    <strong>CHÚ Ý - KẾT QUẢ NHẠY VỚI SAI SỐ:</strong> Phương vị nằm rất gần vách ngăn phân kim (≤ 0.30°). Khi sai số dao động có thể chuyển sang Sơn lân cận: [${[...new Set([...analysis.facing.possibleMountains, ...(analysis.khu ? analysis.khu.possibleMountains : [])])].join(' / ')}]. Cần đo lại cẩn thận tại hiện trường.
                  </div>
                ` : '')}

              </div>
            </div>

            <!-- TẦNG 4: KHẢO CHỨNG 144 THỦY KHẨU (CHỈ HIỂN THỊ SAU KHI ĐÃ KHÓA HIỆU CHUẨN) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#38BDF8;">
                4. 144 THỦY KHẨU CHÁNH TÔNG
              </div>

              ${!this.isCalibrationLocked ? `
                <div style="text-align:center; padding:0.8rem; color:#94A3B8; font-size:0.76rem; line-height:1.5;">
                  <em>Vui lòng nhập số đo La Kinh và nhấn <strong>Khóa Chuẩn</strong> để kích hoạt động cơ đối chiếu 144 Thủy Khẩu Chánh Tông.</em>
                </div>
              ` : (analysis.thuyKhau ? `
                <div style="background:#181F30; border-radius:8px; padding:0.75rem; border-left:3px solid #F59E0B; margin-bottom:0.6rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.3rem;">
                    <span style="font-size:0.75rem; color:#94A3B8; font-weight:700;">KHẨU #${analysis.thuyKhau.hs_num} / 144 · ${analysis.thuyKhau.cuc} Cục</span>
                    <span style="font-size:0.72rem; padding:0.15rem 0.45rem; border-radius:4px; font-weight:700; background:#F59E0B22; color:#FBBF24; border:1px solid rgba(245,158,11,0.4);">
                      ${analysis.thuyKhau.muc_phan}
                    </span>
                  </div>

                  <div style="font-size:0.95rem; font-weight:800; color:#FEF3C7; margin-bottom:0.4rem; line-height:1.35;">
                    ${analysis.thuyKhau.ten_cach}
                  </div>

                  <!-- PHÂN MỤC B: KHẨU QUYẾT BÍ CHỈ -->
                  <div style="font-size:0.75rem; color:#E2E8F0; line-height:1.5; margin-bottom:0.5rem; background:rgba(15,23,42,0.6); padding:0.45rem 0.6rem; border-radius:6px;">
                    <strong style="color:#FBBF24;">Bí Chỉ Cổ Pháp:</strong> ${analysis.thuyKhau.muc_B}
                  </div>

                  <!-- PHÂN MỤC D: BIỆN CHỨNG CÁT HUNG -->
                  ${analysis.thuyKhau.muc_D ? `
                    <div style="font-size:0.74rem; color:#CBD5E1; line-height:1.5; margin-bottom:0.5rem;">
                      <strong style="color:#38BDF8;">Biện Chứng Học Thuật:</strong> ${analysis.thuyKhau.muc_D}
                    </div>
                  ` : ''}

                  <!-- PHÂN MỤC E: HỌA PHÚC ỨNG NGHIỆM -->
                  ${analysis.thuyKhau.muc_E ? `
                    <div style="font-size:0.74rem; color:#FDE68A; line-height:1.5; margin-bottom:0.5rem; background:rgba(30,41,59,0.7); padding:0.45rem 0.6rem; border-radius:6px; border-left:2px solid #F59E0B;">
                      <strong style="color:#F59E0B;">Họa Phúc Ứng Nghiệm:</strong><br/>
                      ${analysis.thuyKhau.muc_E.replace(/\n/g, '<br/>')}
                    </div>
                  ` : ''}

                  <!-- PHÂN MỤC F: CẠM BẪY KIÊNG KỴ -->
                  ${analysis.thuyKhau.muc_F ? `
                    <div style="font-size:0.72rem; color:#FECACA; line-height:1.45; margin-bottom:0.4rem; background:rgba(69,10,10,0.4); padding:0.35rem 0.55rem; border-radius:6px; border:1px solid rgba(239,68,68,0.25);">
                      <strong style="color:#F87171;">Cạm Bẫy Kiêng Kỵ:</strong> ${analysis.thuyKhau.muc_F}
                    </div>
                  ` : ''}

                  <div style="font-size:0.68rem; color:#94A3B8; font-style:italic; margin-top:0.3rem;">
                    Nguồn: ${analysis.thuyKhau.source}
                  </div>
                </div>

                <a href="#/corpus/topic-21" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:0.4rem; background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; border-radius:8px; text-decoration:none; font-size:0.74rem; font-weight:700;">
                  Đọc Toàn Văn Khảo Chứng Cổ Thư →
                </a>
              ` : `
                <div style="padding:0.6rem; color:#CBD5E1; font-size:0.76rem; line-height:1.5; background:#1E293B; border-radius:6px;">
                  ${analysis.matchTrace.map(t => `<div>• ${t}</div>`).join('')}
                </div>
              `)}
            </div>

            <!-- TẦNG 5: ĐỊA CUỘC TOPO CỔ PHÁP (NGOẰN NGOÈO · NGÃ BA · HẺM CỤT) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#A78BFA; display:flex; justify-content:space-between; align-items:center;">
                <span>5. ĐỊA CUỘC TOPO CỔ PHÁP</span>
                ${analysis.topo ? `
                  <span style="font-size:0.7rem; padding:0.1rem 0.45rem; border-radius:4px; font-weight:700; background:${analysis.topo.overallColor}22; color:${analysis.topo.overallColor}; border:1px solid ${analysis.topo.overallColor}55;">
                    ${analysis.topo.overallRating}
                  </span>
                ` : ''}
              </div>

              ${analysis.topo ? `
                <div style="display:flex; flex-direction:column; gap:0.45rem; font-size:0.76rem;">
                  <div style="padding:0.4rem 0.6rem; background:#1E293B; border-radius:6px; border-left:3px solid ${analysis.topo.overallColor}; line-height:1.45; color:#E2E8F0;">
                    ${analysis.topo.overallSummary}
                  </div>

                  ${analysis.topo.features.length > 0 ? analysis.topo.features.map(f => `
                    <div style="background:#181F30; border-radius:6px; padding:0.55rem 0.65rem; border:1px solid rgba(255,255,255,0.08);">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                        <strong style="color:${f.color}; font-size:0.78rem;">${f.name}</strong>
                        <span style="font-size:0.68rem; color:#94A3B8;">${f.source}</span>
                      </div>
                      ${f.quoteOriginal ? `
                        <div style="font-size:0.7rem; color:#FBBF24; font-family:serif; margin-bottom:0.2rem;">
                          ${f.quoteOriginal}
                        </div>
                      ` : ''}
                      ${f.quoteHanViet ? `
                        <div style="font-size:0.68rem; color:#CBD5E1; font-style:italic; margin-bottom:0.25rem;">
                          Hán-Việt: ${f.quoteHanViet}
                        </div>
                      ` : ''}
                      <div style="font-size:0.72rem; color:#E2E8F0; line-height:1.4;">
                        ${f.quoteMeaning}
                      </div>
                      ${f.remedy ? `
                        <div style="margin-top:0.35rem; padding:0.35rem 0.5rem; background:rgba(239,68,68,0.12); border-left:2px solid #EF4444; border-radius:4px; font-size:0.7rem; color:#FECACA; line-height:1.4;">
                          <strong style="color:#F87171;">Phép Hóa Giải Cổ Truyền:</strong> ${f.remedy}
                        </div>
                      ` : ''}
                    </div>
                  `).join('') : `
                    <div style="padding:0.4rem; color:#94A3B8; font-size:0.72rem; font-style:italic; text-align:center;">
                      Tuyến đường thông thoáng, chưa phát hiện thế phản cung hoặc xung tâm sát.
                    </div>
                  `}
                </div>
              ` : `
                <div style="padding:0.5rem; color:#94A3B8; font-size:0.74rem;">
                  Chưa có dữ liệu topo tuyến hẻm.
                </div>
              `}
            </div>

            <!-- TẦNG 6: KHẢO BIỆN CỔ THƯ & DIỄN GIẢI CHÁNH TÔNG ĐỒ HÌNH THỰC ĐỊA -->
            <div class="dt-panel-section" id="dt-classical-theory-section" style="border:1px solid rgba(245,212,133,0.3); background:#0B101B;">
              <div class="dt-panel-title" style="color:#FEF3C7; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(245,212,133,0.2); padding-bottom:0.45rem; margin-bottom:0.75rem;">
                <span style="display:flex; align-items:center; gap:0.4rem;">
                  <span style="color:#F5D485; font-size:1rem;"></span> 6. KHẢO BIỆN CỔ THƯ & DIỄN GIẢI CHÁNH TÔNG
                </span>
                <span style="font-size:0.68rem; padding:0.12rem 0.45rem; border-radius:4px; font-weight:700; background:rgba(245,212,133,0.15); color:#F5D485; border:1px solid rgba(245,212,133,0.3);">
                  ${(analysis.theoryCitations || []).length} Khảo Chứng
                </span>
              </div>

              <div style="font-size:0.75rem; color:#94A3B8; margin-bottom:0.75rem; line-height:1.45;">
                Hệ thống tự động nhận dạng cấu trúc đồ hình hiện trường (phân tầng lộ khí, góc bẻ uốn khúc, chữ U tiêu sát, giao hội) và trích dẫn nguyên văn Cổ Thư chánh tông:
              </div>

              ${(analysis.theoryCitations && analysis.theoryCitations.length > 0) ? `
                <div style="display:flex; flex-direction:column; gap:0.75rem;">
                  ${analysis.theoryCitations.map((cite, idx) => `
                    <article class="dt-theory-card" style="background:#131B2E; border:1px solid rgba(255,255,255,0.1); border-left:3.5px solid ${cite.tag === 'NGUYÊN TẮC CỐT LÕI' ? '#38BDF8' : (cite.tag === 'TIÊU SÁT BẢO VỆ' ? '#10B981' : (cite.tag === 'PHÂN ĐỊNH KHÁI NIỆM' ? '#F59E0B' : '#A78BFA'))}; border-radius:8px; padding:0.75rem; box-shadow:0 4px 12px rgba(0,0,0,0.3);">
                      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.35rem; gap:0.4rem; flex-wrap:wrap;">
                        <div>
                          <span style="display:inline-block; font-size:0.65rem; font-weight:800; padding:0.1rem 0.4rem; border-radius:4px; background:rgba(255,255,255,0.08); color:#CBD5E1; text-transform:uppercase; margin-bottom:0.2rem;">
                            ${cite.tag || 'CỔ THƯ KHẢO BIỆN'}
                          </span>
                          <h4 style="margin:0; font-size:0.88rem; color:#FEF3C7; font-weight:800;">
                            ${idx + 1}. ${cite.title}
                          </h4>
                        </div>
                        <span style="font-size:0.7rem; color:#94A3B8; font-style:italic; background:#0F172A; padding:0.15rem 0.45rem; border-radius:4px; border:1px solid rgba(255,255,255,0.08);">
                          ${cite.book} ${cite.author ? `· ${cite.author}` : ''}
                        </span>
                      </div>

                      ${cite.quoteOriginal ? `
                        <div style="font-size:0.82rem; color:#FDE68A; font-family:'Noto Serif TC', 'Songti SC', SimSun, serif; line-height:1.55; background:rgba(0,0,0,0.35); padding:0.45rem 0.65rem; border-radius:6px; margin-bottom:0.35rem; border:1px dashed rgba(245,212,133,0.25); letter-spacing:0.5px;">
                          ${cite.quoteOriginal}
                        </div>
                      ` : ''}

                      ${cite.quoteHanViet ? `
                        <div style="font-size:0.74rem; color:#E2E8F0; font-style:italic; line-height:1.45; margin-bottom:0.4rem; padding-left:0.2rem;">
                          <strong style="color:#F59E0B;">Hán-Việt:</strong> ${cite.quoteHanViet}
                        </div>
                      ` : ''}

                      ${cite.quoteMeaning ? `
                        <div style="font-size:0.75rem; color:#CBD5E1; line-height:1.5; margin-bottom:0.5rem; background:rgba(15,23,42,0.6); padding:0.45rem 0.6rem; border-radius:6px;">
                          <strong style="color:#38BDF8;">Dịch nghĩa:</strong> ${cite.quoteMeaning}
                        </div>
                      ` : ''}

                      ${(cite.sources && cite.sources.length > 1) ? `
                        <div style="margin-top:0.35rem; margin-bottom:0.5rem; padding:0.4rem 0.55rem; background:rgba(15,23,42,0.7); border:1px dashed rgba(255,255,255,0.12); border-radius:6px;">
                          <div style="font-size:0.68rem; color:#F59E0B; font-weight:800; text-transform:uppercase; margin-bottom:0.3rem;">
                            Khảo chứng đối chiếu bổ túc (${cite.sources.length - 1} bản cổ thư khác):
                          </div>
                          ${cite.sources.slice(1).map(s => `
                            <div style="font-size:0.72rem; margin-bottom:0.35rem; padding-bottom:0.3rem; border-bottom:1px solid rgba(255,255,255,0.06);">
                              <div style="color:#FEF3C7; font-weight:700; font-size:0.72rem;">${s.book} ${s.author ? `· ${s.author}` : ''}</div>
                              <div style="color:#FDE68A; font-family:'Noto Serif TC', serif; font-size:0.75rem; margin:0.12rem 0; letter-spacing:0.3px;">${s.quoteOriginal}</div>
                              <div style="color:#CBD5E1; font-size:0.7rem; line-height:1.4;">↳ <em>Dịch nghĩa:</em> ${s.quoteMeaning}</div>
                            </div>
                          `).join('')}
                        </div>
                      ` : ''}

                      ${cite.masterCommentary ? `
                        <div style="font-size:0.73rem; color:#E2E8F0; line-height:1.55; margin-bottom:0.5rem; border-left:2px solid #10B981; padding-left:0.55rem;">
                          <strong style="color:#34D399;">Danh Sư Khảo Biện:</strong> ${cite.masterCommentary}
                        </div>
                      ` : ''}

                      ${cite.applicationGuide ? `
                        <div style="font-size:0.72rem; color:#FEF3C7; line-height:1.5; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.3); border-radius:6px; padding:0.4rem 0.6rem;">
                          <strong style="color:#FBBF24;">Ứng dụng thực địa:</strong> ${cite.applicationGuide}
                        </div>
                      ` : ''}
                    </article>
                  `).join('')}
                </div>
              ` : `
                <div style="padding:0.8rem; color:#94A3B8; font-size:0.76rem; text-align:center; font-style:italic; background:#131B2E; border-radius:6px;">
                  Vẽ thêm đoạn đường hoặc định vị tâm nhà để kích hoạt nhận dạng cổ thư.
                </div>
              `}
            </div>

    `;
  }

  updateCalibrationUI(analysis = this.getAnalysis()) {
    const find = id => (this.container && this.container.querySelector ? this.container.querySelector(`#${id}`) : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null);
    const locked = this.isCalibrationLocked;
    const color = locked ? '#10B981' : '#F59E0B';
    const calibPanel = find('dt-calibration-panel');
    if (calibPanel && calibPanel.style) calibPanel.style.borderColor = color;
    const badge = find('dt-lock-status');
    if (badge) {
      badge.textContent = locked ? 'ĐÃ KHÓA' : 'CHƯA KHÓA';
      if (badge.style) {
        badge.style.color = color;
        badge.style.background = `${color}22`;
      }
    }
    const input = find('input-measured-bearing');
    if (input) {
      input.disabled = locked;
      if (locked && Number.isFinite(this.measuredBearing)) input.value = this.measuredBearing.toFixed(1);
    }
    const button = find('btn-lock-calibration');
    if (button) {
      button.textContent = locked ? 'Mở Khóa' : 'Khóa Chuẩn';
      if (button.style) button.style.background = locked ? '#EF4444' : '#10B981';
    }
    const rawFacing = find('dt-raw-facing');
    if (rawFacing) rawFacing.textContent = `${this.rawFacingBearing.toFixed(2)}°`;
    const offsetEl = find('dt-offset');
    if (offsetEl) offsetEl.textContent = this.calibEngine.formatOffset(locked ? this.calibrationOffset : 0);
    const status = find('dt-calibration-status');
    if (status && analysis && analysis.status) {
      status.textContent = analysis.status.label;
      if (status.style) {
        status.style.color = analysis.status.color;
        status.style.background = `${analysis.status.color}22`;
        status.style.borderColor = `${analysis.status.color}55`;
      }
    }
  }

  updateStepBadges() {
    const find = id => (this.container && this.container.querySelector ? this.container.querySelector(`#${id}`) : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null);
    const step1 = find('step-btn-1');
    const step2 = find('step-btn-2');
    const step3 = find('step-btn-3');
    const stepSelect = find('step-btn-select');
    const btnAppend = find('btn-append-water');

    if (step1) {
      step1.classList.toggle('active', this.activeDrawTool === 'setCenter');
      step1.textContent = this.activeDrawTool === 'setCenter' ? 'Sửa Tâm' : 'Tâm Nhà';
    }
    if (step2) {
      step2.classList.toggle('active', this.activeDrawTool === 'drawFrontage');
      step2.textContent = this.activeDrawTool === 'drawFrontage' ? 'Sửa Mặt Tiền' : 'Mặt Tiền';
    }
    if (step3) {
      step3.classList.toggle('active', this.activeDrawTool === 'drawWater');
      step3.textContent = this.activeDrawTool === 'drawWater' ? 'Sửa Tuyến' : 'Tuyến Nước';
    }
    if (stepSelect) {
      stepSelect.classList.toggle('active', this.activeDrawTool === 'select');
    }
    if (btnAppend) {
      btnAppend.classList.toggle('active', !!this.isArmingAddPoint);
      if (btnAppend.style) {
        btnAppend.style.background = this.isArmingAddPoint ? 'rgba(5,150,105,0.3)' : 'transparent';
        btnAppend.style.borderColor = this.isArmingAddPoint ? '#34D399' : 'rgba(52,211,153,0.35)';
        btnAppend.style.color = this.isArmingAddPoint ? '#FFF' : '#34D399';
      }
      btnAppend.textContent = this.isArmingAddPoint ? 'Đang Thêm...' : '+ Thêm Điểm';
    }
  }

  bindSegmentCardEvents(root) {
    if (!root) return;
    const cards = root.querySelectorAll('.dt-segment-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(card.dataset.segmentIdx);
        if (this.selectedSegmentIndex === idx) {
          this.selectedSegmentIndex = null;
        } else {
          this.selectedSegmentIndex = idx;
        }
        this.selectedNodeIndex = null;
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateNodeActionBar();
        this.updateMeasurementsDisplay();
      });
    });
  }

  updateMeasurementsDisplay() {
    const analysis = this.getAnalysis();
    if (analysis && analysis.thuyKhau) {
      this._lastActiveHsNum = analysis.thuyKhau.hs_num;
    }
    const panel = (this.container && this.container.querySelector ? this.container.querySelector('#dt-result-panels') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-result-panels') : null);
    if (panel) {
      panel.innerHTML = this.renderResultPanels(analysis);
      this.bindSegmentCardEvents(panel);
    }
    this.updateCalibrationUI(analysis);
  }

  updateSvgView(cachedHsNum = null) {
    const mount = (this.container && this.container.querySelector ? this.container.querySelector('#dt-luopan-svg-container') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-luopan-svg-container') : null);
    if (!mount) return;
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    let hsNum = cachedHsNum;
    if (hsNum === null || hsNum === undefined) {
      const analysis = this.getAnalysis();
      hsNum = analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1;
      this._lastActiveHsNum = hsNum;
    }

    this.updateViewTransform();
    mount.style.transform = '';
    this._lastRenderedCenter = { x: this.centerPoint.x, y: this.centerPoint.y };
    mount.innerHTML = this.renderer.render({
      cx: this.centerPoint.x,
      cy: this.centerPoint.y,
      radius: 365,
      rotation: this.isCalibrationLocked ? this.calibrationOffset : 0,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: hsNum,
      opacity: this.luopanOpacity
    });
  }

  syncLuopanPosition() {
    const mount = (this.container && this.container.querySelector ? this.container.querySelector('#dt-luopan-svg-container') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-luopan-svg-container') : null);
    if (!mount) return;
    const base = this._lastRenderedCenter || { x: 400, y: 400 };
    const dx = this.centerPoint.x - base.x;
    const dy = this.centerPoint.y - base.y;
    mount.style.transform = (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) ? `translate3d(${dx}px, ${dy}px, 0)` : '';
  }

  bindEvents() {
    this.bindSegmentCardEvents(this.container);
    const btnImg = document.getElementById('btn-mode-image');
    const btnMap = document.getElementById('btn-mode-map');
    if (btnImg) btnImg.addEventListener('click', () => this.switchMode('image'));
    if (btnMap) btnMap.addEventListener('click', () => {
      this.switchMode('map');
      this.requestGPSLocation();
    });

    const inputUpload = document.getElementById('input-upload-image');
    if (inputUpload) {
      inputUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.imageSrc = evt.target.result;
            this.updateBackground();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Workflow Step Buttons
    const step1 = document.getElementById('step-btn-1');
    const step2 = document.getElementById('step-btn-2');
    const step3 = document.getElementById('step-btn-3');
    const stepSelect = document.getElementById('step-btn-select');
    const btnAppendWater = document.getElementById('btn-append-water');

    if (step1) step1.addEventListener('click', () => {
      const stageSize = this.STAGE_SIZE || 800;
      const isCenterOffscreen = !this.centerPoint ||
        this.centerPoint.x < -50 || this.centerPoint.x > stageSize + 50 ||
        this.centerPoint.y < -50 || this.centerPoint.y > stageSize + 50 ||
        !Number.isFinite(this.centerPoint.x) || !Number.isFinite(this.centerPoint.y);

      if (isCenterOffscreen) {
        this.relocateFeaturesAroundCenter({ x: 400, y: 400 });
        this.activeDrawTool = 'setCenter';
      } else {
        this.activeDrawTool = (this.activeDrawTool === 'setCenter') ? 'select' : 'setCenter';
      }
      this.isArmingAddPoint = false;
      this.selectedNodeIndex = null;
      this.selectedSegmentIndex = null;
      this.updateStepBadges();
      this.renderDrawingElements();
      this.updateNodeActionBar();
      this.updateMeasurementsDisplay();
      this.updateSvgView();
    });

    if (step2) step2.addEventListener('click', () => {
      this.activeDrawTool = (this.activeDrawTool === 'drawFrontage') ? 'select' : 'drawFrontage';
      this.isArmingAddPoint = false;
      this.selectedNodeIndex = null;
      this.selectedSegmentIndex = null;
      this.updateStepBadges();
      this.renderDrawingElements();
      this.updateNodeActionBar();
      this.updateMeasurementsDisplay();
    });

    if (step3) step3.addEventListener('click', () => {
      if (this.activeDrawTool === 'drawWater') {
        this.activeDrawTool = 'select';
        this.isDrawingWater = false;
        this.isArmingAddPoint = false;
        this.selectedNodeIndex = null;
        this.selectedSegmentIndex = null;
      } else {
        this.activeDrawTool = 'drawWater';
        this.isDrawingWater = true;
        this.isArmingAddPoint = false; // Không tự động bật chấm điểm, chỉ cho phép kéo/sửa node
        this.pendingNewWaterPath = false;
      }
      this.updateStepBadges();
      this.renderDrawingElements();
      this.updateNodeActionBar();
      this.updateMeasurementsDisplay();
    });

    if (btnAppendWater) btnAppendWater.addEventListener('click', () => {
      this.activeDrawTool = 'drawWater';
      this.isDrawingWater = true;
      this.pendingNewWaterPath = false;
      this.isArmingAddPoint = !this.isArmingAddPoint;
      this.updateStepBadges();
      this.renderDrawingElements();
      this.updateNodeActionBar();
      this.updateMeasurementsDisplay();
    });

    if (stepSelect) stepSelect.addEventListener('click', () => {
      this.activeDrawTool = 'select';
      this.isDrawingWater = false;
      this.isArmingAddPoint = false;
      this.selectedNodeIndex = null;
      this.selectedSegmentIndex = null;
      this.updateStepBadges();
      this.renderDrawingElements();
      this.updateNodeActionBar();
      this.updateMeasurementsDisplay();
    });

    // Đảo phía hướng nhà
    const btnFlipFront = document.getElementById('btn-flip-frontside');
    if (btnFlipFront) {
      btnFlipFront.addEventListener('click', () => {
        if (this.isCalibrationLocked) return;
        this.frontageLine.frontSide = this.frontageLine.frontSide === 'right' ? 'left' : 'right';
        this.recalculateRawBearings();
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    // Chuyển đổi Hẻm thông / Hẻm cụt
    const btnDeadEnd = document.getElementById('btn-toggle-deadend');
    if (btnDeadEnd) {
      btnDeadEnd.addEventListener('click', () => {
        this.waterPathType = this.waterPathType === 'deadEnd' ? 'through' : 'deadEnd';
        btnDeadEnd.textContent = this.waterPathType === 'deadEnd' ? 'Hẻm Cụt' : 'Hẻm Thông';
        btnDeadEnd.style.color = this.waterPathType === 'deadEnd' ? '#F43F5E' : '#94A3B8';
        btnDeadEnd.style.borderColor = this.waterPathType === 'deadEnd' ? '#F43F5E' : 'rgba(255,255,255,0.12)';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    // Chuyển đổi Hư Thủy (Lộ Khí Đô Thị) / Chân Thủy (Nước Thật)
    const btnWaterNature = document.getElementById('btn-toggle-water-nature');
    if (btnWaterNature) {
      btnWaterNature.addEventListener('click', () => {
        this.waterNature = this.waterNature === 'hu_thuy' ? 'chan_thuy' : 'hu_thuy';
        btnWaterNature.textContent = this.waterNature === 'hu_thuy' ? 'Hư Thủy (Lộ Khí)' : 'Chân Thủy (Nước Thật)';
        btnWaterNature.style.color = this.waterNature === 'hu_thuy' ? '#F59E0B' : '#38BDF8';
        btnWaterNature.style.borderColor = this.waterNature === 'hu_thuy' ? '#F59E0B' : '#38BDF8';
        btnWaterNature.style.background = this.waterNature === 'hu_thuy' ? 'rgba(245,158,11,0.18)' : 'rgba(56,189,248,0.18)';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    // Tự động quét mạng đường từ ngã 3/4 vào trước cửa nhà
    const btnAutoRoad = document.getElementById('btn-auto-road-detect');
    if (btnAutoRoad) {
      btnAutoRoad.addEventListener('click', async () => {
        this.captureMapGeometry();
        await this.triggerAutoRoadDetection(true);
      });
    }

    // Đảo chiều nước (hoán đổi vị trí Lai Thủy và Khứ Thủy)
    const btnReverseWater = document.getElementById('btn-reverse-water');
    if (btnReverseWater) {
      btnReverseWater.addEventListener('click', () => {
        this.reverseWaterFlow();
      });
    }

    const btnToggleDrawing = document.getElementById('btn-toggle-drawing');
    if (btnToggleDrawing) {
      btnToggleDrawing.addEventListener('click', () => {
        this.showDrawingOverlay = !this.showDrawingOverlay;
        btnToggleDrawing.textContent = this.showDrawingOverlay ? 'Ẩn Nét' : 'Hiện Nét';
        this.renderDrawingElements();
      });
    }

    // Viewport actions
    const btnNorthUp = document.getElementById('btn-north-up');
    if (btnNorthUp) {
      btnNorthUp.addEventListener('click', () => {
        this.viewRotation = 0;
        this.updateSvgView();
      });
    }

    const btnFacingUp = document.getElementById('btn-facing-up');
    if (btnFacingUp) {
      btnFacingUp.addEventListener('click', () => {
        this.viewRotation = this.rawFacingBearing;
        this.updateSvgView();
      });
    }

    const sliderOpacity = document.getElementById('slider-opacity');
    if (sliderOpacity) {
      sliderOpacity.addEventListener('input', (e) => {
        this.luopanOpacity = parseFloat(e.target.value);
        this.updateSvgView();
      });
    }

    // Khóa hiệu chuẩn
    const btnLock = document.getElementById('btn-lock-calibration');
    const inputMeasured = document.getElementById('input-measured-bearing');
    if (btnLock && inputMeasured) {
      btnLock.addEventListener('click', () => {
        if (this.isCalibrationLocked) {
          this.isCalibrationLocked = false;
          this.calibrationOffset = 0;
        } else {
          if (!inputMeasured.reportValidity()) return;
          const val = parseFloat(inputMeasured.value);
          if (Number.isFinite(val)) {
            this.measuredBearing = this.calibEngine.normalize360(val);
            this.calibrationOffset = this.calibEngine.computeOffset(this.rawFacingBearing, this.measuredBearing);
            this.isCalibrationLocked = true;
          }
        }
        this.updateMeasurementsDisplay();
        this.updateSvgView();
      });
    }

    // Modal Export Survey
    const btnExport = document.getElementById('btn-export-survey');
    const modalExport = document.getElementById('modal-survey-export');
    const btnCloseExport = document.getElementById('btn-close-survey');
    const btnCloseExportX = document.getElementById('btn-close-survey-x');
    const btnCopyExport = document.getElementById('btn-copy-survey');
    const exportContent = document.getElementById('survey-export-content');

    if (btnExport && modalExport && exportContent) {
      btnExport.addEventListener('click', () => {
        const facing = this.getEffectiveFacingBearing();
        const lai = this.getEffectiveLaiBearing();
        const khu = this.getEffectiveKhuBearing();
        const relLai = lai !== null ? this.calibEngine.computeRelativeBearing(facing, lai) : null;
        const relKhu = khu !== null ? this.calibEngine.computeRelativeBearing(facing, khu) : null;

        const analysis = this.classifier.classify({
          facingBearing: facing,
          laiBearing: lai,
          khuBearing: khu,
          offset: this.calibrationOffset,
          isLocked: this.isCalibrationLocked,
          tolerance: this.measurementTolerance
        });

        const reportHtml = `
          <div style="background:#1E293B; border-radius:10px; padding:1.2rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#FBBF24; font-weight:800; font-size:0.92rem; margin-bottom:0.6rem;">1. THÔNG SỐ KHẢO SÁT HIỆN TRƯỜNG</div>
            <div>• Trạng thái: <strong>${this.isCalibrationLocked ? ' ĐÃ HIỆU CHUẨN LA KINH CHÍNH XÁC' : 'KẾT QUẢ TẠM THỜI (CHƯA HIỆU CHUẨN)'}</strong></div>
            <div>• Hướng nhà thực đo: <strong style="color:#EF4444;">${facing.toFixed(2)}° (${analysis.facing.mountain.name} Sơn / ${this.data.getTrigram(facing).trigram.name} Quái)</strong></div>
            <div>• Hướng trên bản vẽ (RAW): <strong>${this.rawFacingBearing.toFixed(2)}°</strong></div>
            <div>• Độ bù hiệu chuẩn (Offset): <strong style="color:#10B981;">${this.calibEngine.formatOffset(this.calibrationOffset)}</strong></div>
            <div>• Tọa nhà: <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(2)}° (${analysis.sitting.mountain.name} Sơn)</strong></div>
            <div>• Cụm Song Sơn: <strong>${analysis.group.label} (${analysis.group.cuc} Cục)</strong></div>
            <div>• Lai Thủy: <strong>${analysis.lai ? `${analysis.lai.bearing.toFixed(2)}° (${analysis.lai.mountain.name})` : 'Chưa đo'}</strong> ${relLai !== null ? `(lệch ${relLai >= 0 ? '+' : ''}${relLai.toFixed(2)}° so với nhà)` : ''}</div>
            <div>• Khứ Thủy: <strong>${analysis.khu ? `${analysis.khu.bearing.toFixed(2)}° (${analysis.khu.mountain.name})` : (this.waterPathType === 'deadEnd' ? 'Không xác lập (Hẻm cụt)' : 'Chưa đo')}</strong> ${relKhu !== null ? `(lệch ${relKhu >= 0 ? '+' : ''}${relKhu.toFixed(2)}° so với nhà)` : ''}</div>
            <div>• Loại tuyến: <strong>${this.waterPathType === 'deadEnd' ? 'Hẻm cụt (điểm tận tại nhà)' : 'Hẻm thông'}</strong> · Chiều nước: <strong>${this.flowDirection === 'forward' ? 'Tả  Hữu' : 'Hữu  Tả'}</strong></div>
          </div>

          <div style="background:#1E293B; border-radius:10px; padding:1rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#CBD5E1; font-weight:800; font-size:0.88rem; margin-bottom:0.5rem;">2. ĐỘ TIN CẬY & VÙNG RANH PHÂN KIM</div>
            <div>• Sai số phép đo: <strong>±${this.measurementTolerance.toFixed(2)}°</strong></div>
            <div>• Khoảng cách tới ranh Hướng: <strong>${analysis.facing.distanceToBoundary.toFixed(2)}°</strong></div>
            ${analysis.khu ? `<div>• Khoảng cách tới ranh Khứ: <strong>${analysis.khu.distanceToBoundary.toFixed(2)}°</strong></div>` : ''}
            <div>• Đánh giá: <strong style="color:${analysis.status.isSensitive ? '#FB7185' : '#10B981'};">${analysis.status.isSensitive ? 'Nhạy cảm sai số ranh phân kim' : 'An toàn trong tâm Sơn'}</strong></div>
          </div>

          ${analysis.thuyKhau ? `
            <div style="background:#181F30; border-radius:10px; padding:1.2rem; border-left:4px solid #38BDF8;">
              <div style="color:#38BDF8; font-weight:800; font-size:0.92rem; margin-bottom:0.5rem;">3. KHẢO CHỨNG 144 THỦY KHẨU CHÁNH TÔNG</div>
              <div>• Khẩu khảo chứng: <strong>Khẩu #${analysis.thuyKhau.hs_num} / 144</strong></div>
              <div>• Tên thế cách: <strong style="color:#FEF3C7; font-size:1.05rem;">${analysis.thuyKhau.ten_cach}</strong> [${analysis.thuyKhau.muc_phan}]</div>
              <div>• Cửa nước thoát: <strong>Thủy xuất ${analysis.thuyKhau.thuy_xuat}</strong> (${analysis.thuyKhau.song_son_cung})</div>
              <div style="margin-top:0.6rem; color:#CBD5E1; font-size:0.82rem; line-height:1.6;">
                ${analysis.thuyKhau.muc_D}
              </div>
              <div style="margin-top:0.6rem; color:#94A3B8; font-size:0.75rem; font-style:italic;">
                ${analysis.thuyKhau.source}
              </div>
            </div>
          ` : ''}
        `;

        exportContent.innerHTML = reportHtml;
        modalExport.style.display = 'flex';
      });
    }

    const closeModal = () => {
      if (modalExport) modalExport.style.display = 'none';
    };
    if (btnCloseExport) btnCloseExport.addEventListener('click', closeModal);
    if (btnCloseExportX) btnCloseExportX.addEventListener('click', closeModal);

    // Modal Economic Radius
    const btnEcon = document.getElementById('btn-economic-radius');
    const modalEcon = document.getElementById('modal-economic-radius');
    const btnCloseEconX = document.getElementById('btn-close-econ-x');
    const btnCloseEcon = document.getElementById('btn-close-econ');

    if (btnEcon) {
      btnEcon.addEventListener('click', () => {
        this.openEconomicRadiusModal(this.selectedEconRadius || 1000);
      });
    }

    if (btnCloseEconX) btnCloseEconX.addEventListener('click', () => this.closeEconomicRadiusModal());
    if (btnCloseEcon) btnCloseEcon.addEventListener('click', () => this.closeEconomicRadiusModal());

    const radiusSelectors = document.querySelectorAll('.dt-econ-radius-selector');
    radiusSelectors.forEach(btn => {
      btn.addEventListener('click', () => {
        const rad = parseInt(btn.dataset.radius, 10);
        this.selectedEconRadius = rad;
        radiusSelectors.forEach(b => {
          if (b === btn) {
            b.style.background = 'rgba(16,185,129,0.25)';
            b.style.borderColor = '#10B981';
            b.style.color = '#10B981';
          } else {
            b.style.background = 'rgba(255,255,255,0.06)';
            b.style.borderColor = 'rgba(255,255,255,0.15)';
            b.style.color = '#FEF3C7';
          }
        });
        this.updateEconomicRadiusData(rad, this.selectedIndustryKey || 'CAFE', this.selectedEconDistrictId);
      });
    });

    this.initEconIndustryDropdown();

    const provinceSelect = document.getElementById('dt-econ-province-select');
    if (provinceSelect) {
      provinceSelect.addEventListener('change', (e) => {
        this.selectedEconProvinceId = e.target.value || null;
        this.selectedEconDistrictId = null;
        this.selectedEconCommuneId = null;
        this.updateEconomicRadiusData(
          this.selectedEconRadius || 1000,
          this.selectedIndustryKey || 'CAFE',
          null,
          this.selectedEconProvinceId,
          null
        );
      });
    }

    const districtSelect = document.getElementById('dt-econ-district-select');
    if (districtSelect) {
      districtSelect.addEventListener('change', (e) => {
        this.selectedEconDistrictId = e.target.value || null;
        this.selectedEconCommuneId = null;
        this.updateEconomicRadiusData(
          this.selectedEconRadius || 1000,
          this.selectedIndustryKey || 'CAFE',
          this.selectedEconDistrictId,
          this.selectedEconProvinceId,
          null
        );
      });
    }

    const communeSelect = document.getElementById('dt-econ-commune-select');
    if (communeSelect) {
      communeSelect.addEventListener('change', (e) => {
        this.selectedEconCommuneId = e.target.value || null;
        this.updateEconomicRadiusData(
          this.selectedEconRadius || 1000,
          this.selectedIndustryKey || 'CAFE',
          this.selectedEconDistrictId,
          this.selectedEconProvinceId,
          this.selectedEconCommuneId,
          true // flyToCommune
        );
      });
    }

    if (btnCopyExport) {
      btnCopyExport.addEventListener('click', () => {
        const text = exportContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btnCopyExport.textContent = 'Đã Sao Chép!';
          setTimeout(() => { btnCopyExport.textContent = 'Sao Chép'; }, 2000);
        });
      });
    }
  }

  updateViewTransform() {
    const scene = this.container ? this.container.querySelector('#dt-survey-scene') : null;
    if (!scene) return;
    scene.style.transformOrigin = '50% 50%';
    scene.style.transform = `rotate(${-this.viewRotation}deg)`;
    const btnNorth = this.container ? this.container.querySelector('#btn-north-up') : null;
    if (btnNorth) btnNorth.setAttribute('aria-pressed', String(this.viewRotation === 0));
    const btnFacing = this.container ? this.container.querySelector('#btn-facing-up') : null;
    if (btnFacing) btnFacing.setAttribute('aria-pressed', String(this.viewRotation !== 0));
  }

  updateBackground() {
    const find = id => this.container ? this.container.querySelector(`#${id}`) : null;
    const mapMount = find('dt-map-mount');
    if (mapMount) mapMount.style.display = this.mode === 'map' ? 'block' : 'none';
    const img = find('dt-user-img');
    if (img) {
      if (this.imageSrc) img.src = this.imageSrc;
      img.style.display = this.mode === 'image' && this.imageSrc ? 'block' : 'none';
    }
    const empty = find('dt-image-empty');
    if (empty) empty.style.display = this.mode === 'image' && !this.imageSrc ? 'block' : 'none';
    ['image', 'map'].forEach(mode => {
      const btn = find(`btn-mode-${mode}`);
      if (btn) {
        btn.style.background = this.mode === mode ? (mode === 'map' ? '#38BDF8' : '#FBBF24') : 'transparent';
        btn.style.color = this.mode === mode ? '#000' : '#CBD5E1';
        btn.setAttribute('aria-pressed', String(this.mode === mode));
      }
    });
    if (this.mode === 'map') {
      this.initLeafletMap();
      this.captureMapGeometry();
    }
    const controls = this.container ? this.container.querySelector('.leaflet-control-container') : null;
    if (controls) controls.style.display = this.mode === 'map' ? 'block' : 'none';
  }

  switchMode(newMode) {
    if (this.mapInstance && this.mode === 'map') {
      const center = this.mapInstance.getCenter();
      this.surveyCenterLatLng = [center.lat, center.lng];
      this.zoomLevel = this.mapInstance.getZoom();
    }
    this.mode = newMode;
    this.updateBackground();
  }

  requestGPSLocation() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      console.warn('[GPS] Thiết bị hoặc trình duyệt không hỗ trợ Geolocation.');
      return;
    }

    const btnMap = this.container ? this.container.querySelector('#btn-mode-map') : null;
    const originalText = btnMap ? btnMap.innerHTML : '';
    if (btnMap) {
      btnMap.innerHTML = 'Đang lấy GPS...';
      btnMap.style.opacity = '0.85';
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (btnMap && originalText) {
          btnMap.innerHTML = originalText;
          btnMap.style.opacity = '1';
        }
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy ? Math.round(position.coords.accuracy) : 0;
        console.log(`[GPS] Vị trí chính xác: ${lat}, ${lng} (Độ chính xác: ±${accuracy}m)`);

        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('dt_last_latlng', JSON.stringify([lat, lng]));
          }
        } catch (e) {}

        this.surveyCenterLatLng = [lat, lng];

        if (this.mapInstance && this.mode === 'map') {
          this.zoomLevel = Math.max(this.mapInstance.getZoom() || 19, 19);
          this.mapInstance.setView([lat, lng], this.zoomLevel, { animate: true });

          // Căn tâm hình học khảo sát vào tâm màn hình (tọa độ GPS thực tế của căn nhà)
          this.centerPoint = { x: 400, y: 400 };
          this.frontageLine = {
            pA: { x: 290, y: 400 },
            pB: { x: 510, y: 400 },
            frontSide: (this.frontageLine && this.frontageLine.frontSide) || 'right'
          };
          this.waterPolyline = [
            { x: 190, y: 220 },
            { x: 400, y: 270 },
            { x: 610, y: 580 }
          ];

          this.captureMapGeometry();
          this.recalculateRawBearings();
          this.renderDrawingElements();
          this.updateSvgView();
          this.updateMeasurementsDisplay();
        }
      },
      (error) => {
        if (btnMap && originalText) {
          btnMap.innerHTML = originalText;
          btnMap.style.opacity = '1';
        }
        console.warn(`[GPS] Lỗi lấy vị trí: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  }

  getMapProjection() {
    const stage = this.container.querySelector('#dt-interactive-stage');
    const scale = Math.min(stage.clientWidth, stage.clientHeight) / this.STAGE_SIZE;
    const mapSize = this.mapInstance.getSize();
    return { scale, x: (mapSize.x - this.STAGE_SIZE * scale) / 2,
      y: (mapSize.y - this.STAGE_SIZE * scale) / 2 };
  }

  captureMapGeometry() {
    if (!this.mapInstance || this.mode !== 'map') return;
    const projection = this.getMapProjection();
    const toLatLng = point => {
      const ll = this.mapInstance.containerPointToLatLng([
        point.x * projection.scale + projection.x, point.y * projection.scale + projection.y
      ]);
      return {
        lat: ll.lat,
        lng: ll.lng,
        role: point.role || 'normal',
        nodeId: point.nodeId || null
      };
    };
    this.mapGeometry = {
      center: toLatLng(this.centerPoint),
      frontA: toLatLng(this.frontageLine.pA),
      frontB: toLatLng(this.frontageLine.pB),
      water: this.waterPolyline.map(toLatLng)
    };
  }

  projectMapGeometry(fullUpdate = true) {
    if (!this.mapGeometry || this.mode !== 'map') return;
    const projection = this.getMapProjection();
    const toPoint = latLng => {
      // Leaflet's latLngToContainerPoint rounds each point independently.
      // Use continuous projection so pan/zoom cannot change measured angles.
      const point = this.mapInstance.project(latLng)
        .subtract(this.mapInstance.project(this.mapInstance.getCenter()))
        .add(this.mapInstance.getSize().divideBy(2));
      return { x: (point.x - projection.x) / projection.scale, y: (point.y - projection.y) / projection.scale };
    };
    this.centerPoint = toPoint(this.mapGeometry.center);
    this.frontageLine.pA = toPoint(this.mapGeometry.frontA);
    this.frontageLine.pB = toPoint(this.mapGeometry.frontB);
    this.waterPolyline = this.mapGeometry.water.map((latLng, idx) => {
      const pt = toPoint(latLng);
      const prev = (this.waterPolyline && this.waterPolyline[idx]) || {};
      return {
        ...prev,
        x: pt.x,
        y: pt.y,
        role: latLng.role || prev.role || 'normal',
        nodeId: latLng.nodeId || prev.nodeId || null
      };
    });
    if (this.accessPointLatLng) {
      this.accessPointPosition = toPoint(this.accessPointLatLng);
    }
    this.recalculateRawBearings();
    this.renderDrawingElements();
    if (fullUpdate) {
      this.updateSvgView(null);
      this.updateMeasurementsDisplay();
    } else {
      this.syncLuopanPosition();
    }
  }

  resizeMapBackground() {
    const stage = this.container.querySelector('#dt-interactive-stage');
    const mount = this.container.querySelector('#dt-map-mount');
    // A diagonal-sized tile surface fills the viewport at every view angle.
    const size = Math.ceil(Math.hypot(stage.clientWidth, stage.clientHeight));
    Object.assign(mount.style, {
      inset: 'auto', width: `${size}px`, height: `${size}px`,
      left: `${(stage.clientWidth - size) / 2}px`, top: `${(stage.clientHeight - size) / 2}px`
    });
  }

  bindMapGestures(mount) {
    const map = this.mapInstance;
    const pointers = new Map();
    const options = { signal: this.canvasEvents.signal, passive: false };
    let gesture = null;
    this.isInteracting = false;
    let moveRafId = null;
    let wheelRafId = null;
    let wheelIdleTimer = null;
    let wheelAnchor = null;
    let wheelPoint = null;
    let targetZoom = map.getZoom();
    let pendingPoint = null;
    let pendingZoom = null;

    const raf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : (cb => setTimeout(cb, 16));
    const caf = typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : clearTimeout;

    const cancelTimers = () => {
      if (moveRafId) { caf(moveRafId); moveRafId = null; }
      if (wheelRafId) { caf(wheelRafId); wheelRafId = null; }
      if (wheelIdleTimer) { clearTimeout(wheelIdleTimer); wheelIdleTimer = null; }
      this.isInteracting = false;
    };

    if (this.canvasEvents?.signal) {
      this.canvasEvents.signal.addEventListener('abort', cancelTimers);
    }

    const mapPoint = event => {
      const svg = this.container.querySelector('#dt-drawing-svg');
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const raw = point.matrixTransform(svg.getScreenCTM().inverse());
      const projection = this.getMapProjection();
      return L.point(raw.x * projection.scale + projection.x, raw.y * projection.scale + projection.y);
    };
    const midpoint = () => {
      const points = [...pointers.values()];
      return points.length === 1 ? points[0] : points[0].add(points[1]).divideBy(2);
    };
    const distance = () => {
      const points = [...pointers.values()];
      return points.length < 2 ? 0 : points[0].distanceTo(points[1]);
    };
    const rebase = () => {
      gesture = pointers.size ? {
        anchor: map.containerPointToLatLng(midpoint()),
        zoom: map.getZoom(),
        distance: distance()
      } : null;
      targetZoom = map.getZoom();
    };
    const moveAnchor = (anchor, point, zoom) => {
      const limitedZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), zoom));
      const center = map.project(anchor, limitedZoom).subtract(point).add(map.getSize().divideBy(2));
      map.setView(map.unproject(center, limitedZoom), limitedZoom, { animate: false });
    };

    const onPointerMoveRaf = () => {
      moveRafId = null;
      if (!gesture || !pendingPoint || pendingZoom === null) return;
      this.isInteracting = true;
      moveAnchor(gesture.anchor, pendingPoint, pendingZoom);
    };

    let startPointClient = null;
    let hasDraggedFar = false;

    mount.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      pointers.set(event.pointerId, mapPoint(event));
      mount.setPointerCapture(event.pointerId);
      rebase();
      if (pointers.size === 1) {
        startPointClient = { x: event.clientX, y: event.clientY };
        hasDraggedFar = false;
      }
      event.preventDefault();
    }, options);

    mount.addEventListener('pointermove', event => {
      if (!pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, mapPoint(event));
      if (startPointClient && !hasDraggedFar) {
        const dist = Math.hypot(event.clientX - startPointClient.x, event.clientY - startPointClient.y);
        if (dist > 6) {
          hasDraggedFar = true;
        }
      }
      pendingPoint = midpoint();
      pendingZoom = gesture.zoom + (pointers.size > 1 && gesture.distance > 0
        ? Math.log2(Math.max(1, distance()) / gesture.distance) : 0);
      if (!moveRafId) {
        moveRafId = raf(onPointerMoveRaf);
      }
      event.preventDefault();
    }, options);

    const finish = event => {
      if (!pointers.has(event.pointerId)) return;
      pointers.delete(event.pointerId);
      if (mount.hasPointerCapture(event.pointerId)) {
        try { mount.releasePointerCapture(event.pointerId); } catch (_) {}
      }
      if (moveRafId) {
        caf(moveRafId);
        moveRafId = null;
      }
      if (pointers.size === 0) {
        if (this.isInteracting && (hasDraggedFar || (gesture && gesture.distance > 0))) {
          this.isInteracting = false;
          if (this.satelliteLayer && typeof this.satelliteLayer._update === 'function') {
            this.satelliteLayer._update();
          }
          this.projectMapGeometry(true);
        } else {
          this.isInteracting = false;
          this.closeSelectionBar();
        }
        gesture = null;
        startPointClient = null;
        hasDraggedFar = false;
      } else {
        rebase();
      }
    };
    mount.addEventListener('pointerup', finish, options);
    mount.addEventListener('pointercancel', finish, options);
    mount.addEventListener('lostpointercapture', finish, options);

    const onWheelRaf = () => {
      wheelRafId = null;
      if (!wheelAnchor || !wheelPoint) return;
      this.isInteracting = true;
      moveAnchor(wheelAnchor, wheelPoint, targetZoom);
    };

    mount.addEventListener('wheel', event => {
      event.preventDefault();

      const point = mapPoint(event);
      wheelPoint = point;

      if (!wheelAnchor || !this.isInteracting) {
        wheelAnchor = map.containerPointToLatLng(point);
        targetZoom = map.getZoom();
      }

      let normalizedDelta;
      if (event.deltaMode === 1) {
        normalizedDelta = -event.deltaY * 0.08;
      } else if (event.deltaMode === 2) {
        normalizedDelta = -event.deltaY * 0.3;
      } else {
        normalizedDelta = -event.deltaY * 0.0025;
      }

      const step = Math.max(-0.4, Math.min(0.4, normalizedDelta));
      targetZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), targetZoom + step));

      if (!wheelRafId) {
        wheelRafId = raf(onWheelRaf);
      }

      if (wheelIdleTimer) clearTimeout(wheelIdleTimer);
      wheelIdleTimer = setTimeout(() => {
        this.isInteracting = false;
        wheelAnchor = null;
        wheelPoint = null;
        if (this.satelliteLayer && typeof this.satelliteLayer._update === 'function') {
          this.satelliteLayer._update();
        }
        this.projectMapGeometry(true);
      }, 140);
    }, options);
  }

  initLeafletMap() {
    const mount = this.container.querySelector('#dt-map-mount');
    if (!mount || typeof L === 'undefined') return;
    this.resizeMapBackground();
    if (!this.mapInstance) {
      this.mapInstance = L.map(mount, {
        center: this.surveyCenterLatLng,
        zoom: this.zoomLevel,
        zoomControl: false,
        trackResize: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        zoomSnap: 0,
        zoomAnimation: false
      });
      this.satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=vi', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© Google Maps',
        maxZoom: 21,
        maxNativeZoom: 19,
        updateWhenZooming: false,
        updateWhenIdle: true,
        keepBuffer: 2
      }).addTo(this.mapInstance);

      if (typeof this.satelliteLayer._invalidateAll === 'function') {
        const origInvalidateAll = this.satelliteLayer._invalidateAll.bind(this.satelliteLayer);
        this.satelliteLayer._invalidateAll = () => {
          if (this.isInteracting) return;
          origInvalidateAll();
        };
      }
      // Keep controls outside rotated scene and above drawing handles.
      L.control.zoom({ position: 'topright' }).addTo(this.mapInstance);

      if (L.Control && L.Control.extend) {
        const GpsControl = L.Control.extend({
          options: { position: 'topright' },
          onAdd: () => {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            const btn = L.DomUtil.create('a', 'leaflet-control-gps-btn', container);
            btn.innerHTML = 'GPS';
            btn.href = '#';
            btn.title = 'Định vị GPS vị trí của tôi (Độ chính xác cao)';
            btn.setAttribute('role', 'button');
            btn.setAttribute('aria-label', 'Vị trí hiện tại');
            btn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:32px;height:24px;font-size:11px;font-weight:700;background:#1E293B;color:#38BDF8;text-decoration:none;cursor:pointer;border-radius:4px;border:1px solid rgba(255,255,255,0.15);';
            L.DomEvent.disableClickPropagation(btn);
            L.DomEvent.on(btn, 'click', (e) => {
              L.DomEvent.stop(e);
              this.requestGPSLocation();
            });
            return container;
          }
        });
        new GpsControl().addTo(this.mapInstance);
      }
      this.container.querySelector('#dt-interactive-stage').appendChild(this.mapInstance._controlContainer);
      this.captureMapGeometry();
      this.bindMapGestures(mount);
      let mapMoveRafId = null;
      const onMapMove = () => {
        if (mapMoveRafId) return;
        const raf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : (cb => setTimeout(cb, 16));
        mapMoveRafId = raf(() => {
          mapMoveRafId = null;
          this.projectMapGeometry(!this.isInteracting);
        });
      };
      this.mapInstance.on('move', onMapMove);
      this.mapInstance.on('moveend zoomend', () => {
        const center = this.mapInstance.getCenter();
        this.surveyCenterLatLng = [center.lat, center.lng];
        this.zoomLevel = this.mapInstance.getZoom();
        if (!this.isInteracting) {
          this.projectMapGeometry(true);
        }
      });
      this.mapInstance.on('click', () => {
        this.closeSelectionBar();
      });
    }
    this.mapInstance.invalidateSize({ pan: false });
    this.mapInstance.setView(this.surveyCenterLatLng, this.zoomLevel, { animate: false, reset: true });
  }

  getSurveyCenterCoordinates() {
    if (this.mode === 'map' && this.mapGeometry && this.mapGeometry.center) {
      return { lat: this.mapGeometry.center.lat, lng: this.mapGeometry.center.lng };
    }
    if (this.mapInstance && typeof this.mapInstance.getCenter === 'function') {
      const c = this.mapInstance.getCenter();
      return { lat: c.lat, lng: c.lng };
    }
    if (Array.isArray(this.surveyCenterLatLng) && this.surveyCenterLatLng.length === 2) {
      return { lat: this.surveyCenterLatLng[0], lng: this.surveyCenterLatLng[1] };
    }
    return { lat: 21.028511, lng: 105.854444 };
  }

  
  initEconIndustryDropdown() {
    const trigger = document.getElementById('dt-econ-ind-dropdown-trigger');
    const panel = document.getElementById('dt-econ-ind-dropdown-panel');
    const searchInput = document.getElementById('dt-econ-ind-search-input');
    const wrapper = document.getElementById('dt-econ-ind-categories-wrapper');
    const label = document.getElementById('dt-econ-ind-current-label');
    if (!trigger || !panel || !wrapper) return;

    const indEngine = (typeof window !== 'undefined' && window.IndustryEconomicEngine) || (typeof IndustryEconomicEngine !== 'undefined' ? IndustryEconomicEngine : null);
    const catalog = (indEngine && indEngine.getIndustryCatalog) ? indEngine.getIndustryCatalog() : {};

    const categories = [
      { id: 'FNB_RETAIL', title: 'Ẩm Thực & Bán Lẻ Tiêu Dùng' },
      { id: 'BEAUTY_LIFESTYLE', title: 'Làm Đẹp & Dịch Vụ Đời Sống' },
      { id: 'HEALTH_FAMILY', title: 'Y Tế & Chăm Sóc Gia Đình' },
      { id: 'FASHION_ACCESSORIES', title: 'Thời Trang & Phụ Kiện' },
      { id: 'AUTO_ENERGY', title: 'Xe Cộ, Nhiên Liệu & Năng Lượng' },
      { id: 'HOME_CONSTRUCTION', title: 'Xây Dựng, Nhà Cửa & BĐS' },
      { id: 'AGRI_PET_NATURE', title: 'Nông Nghiệp, Sinh Vật Cảnh & Thể Thao' },
      { id: 'GOLD_SPIRITUAL', title: 'Tài Sản & Tâm Linh Truyền Thống' }
    ];

    const currentKey = this.selectedIndustryKey || 'CAFE';
    const curProfile = catalog[currentKey] || catalog.CAFE;
    const sub = document.getElementById('dt-econ-ind-current-sub');
    if (label && curProfile) {
      label.textContent = `${curProfile.name}`;
      if (sub) sub.textContent = `VSIC ${curProfile.vsic_code}`;
    }

    if (wrapper.dataset.rendered !== 'true') {
      wrapper.dataset.rendered = 'true';
      wrapper.innerHTML = categories.map(cat => {
        const items = Object.values(catalog).filter(i => (i.category === cat.id) || (cat.id === 'FNB_RETAIL' && !i.category && i.group === 'mainstream') || (cat.id === 'BEAUTY_LIFESTYLE' && !i.category && i.id === 'NAIL'));
        if (!items.length) return '';
        return `
          <div class="dt-econ-cat-section" data-cat="${cat.id}">
            <div style="font-size:12px; font-weight:700; color:#38BDF8; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.02em;">
              <span>${cat.title}</span> <span style="font-size:11px; color:#94A3B8;">(${items.length})</span>
            </div>
            <div class="econ-ind-grid">
              ${items.map(ind => `
                <button type="button" class="dt-econ-ind-item-btn econ-ind-item-btn ${ind.id === currentKey ? 'active' : ''}" data-id="${ind.id}" data-name="${ind.name}" data-short="${ind.shortName}" data-vsic="${ind.vsic_code}">
                  <div class="econ-ind-item-name">${ind.shortName}</div>
                  <div class="econ-ind-item-code">VSIC ${ind.vsic_code}</div>
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');

      wrapper.querySelectorAll('.dt-econ-ind-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const indId = btn.dataset.id;
          this.selectEconIndustry(indId);
        });
      });
    }

    trigger.onclick = (e) => {
      e.stopPropagation();
      const isHidden = panel.style.display === 'none';
      panel.style.display = isHidden ? 'block' : 'none';
      if (isHidden && searchInput) {
        searchInput.value = '';
        this.filterEconIndustryDropdown('');
        setTimeout(() => searchInput.focus(), 50);
      }
    };

    if (searchInput) {
      searchInput.oninput = (e) => {
        this.filterEconIndustryDropdown(e.target.value);
      };
      searchInput.onclick = (e) => e.stopPropagation();
    }

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
        panel.style.display = 'none';
      }
    });
  }

  filterEconIndustryDropdown(kw) {
    const wrapper = document.getElementById('dt-econ-ind-categories-wrapper');
    if (!wrapper) return;
    const cleanKw = (kw || '').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sections = wrapper.querySelectorAll('.dt-econ-cat-section');
    sections.forEach(sec => {
      let hasVisibleItem = false;
      const items = sec.querySelectorAll('.dt-econ-ind-item-btn');
      items.forEach(item => {
        const name = (item.dataset.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const short = (item.dataset.short || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const vsic = (item.dataset.vsic || '').toLowerCase();
        const matches = !cleanKw || name.includes(cleanKw) || short.includes(cleanKw) || vsic.includes(cleanKw);
        item.style.display = matches ? 'block' : 'none';
        if (matches) hasVisibleItem = true;
      });
      sec.style.display = hasVisibleItem ? 'block' : 'none';
    });
  }

  selectEconIndustry(indKey) {
    this.selectedIndustryKey = indKey;
    const panel = document.getElementById('dt-econ-ind-dropdown-panel');
    const label = document.getElementById('dt-econ-ind-current-label');
    const sub = document.getElementById('dt-econ-ind-current-sub');
    const wrapper = document.getElementById('dt-econ-ind-categories-wrapper');

    const indEngine = (typeof window !== 'undefined' && window.IndustryEconomicEngine) || (typeof IndustryEconomicEngine !== 'undefined' ? IndustryEconomicEngine : null);
    const catalog = (indEngine && indEngine.getIndustryCatalog) ? indEngine.getIndustryCatalog() : {};
    const curProfile = catalog[indKey] || catalog.CAFE;

    if (label && curProfile) {
      label.textContent = `${curProfile.name}`;
      if (sub) sub.textContent = `VSIC ${curProfile.vsic_code}`;
    }
    if (panel) panel.style.display = 'none';

    if (wrapper) {
      wrapper.querySelectorAll('.dt-econ-ind-item-btn').forEach(btn => {
        const isCur = btn.dataset.id === indKey;
        if (isCur) {
          btn.classList.add('active');
          btn.style.background = 'rgba(245,158,11,0.22)';
          btn.style.borderColor = '#F59E0B';
          btn.style.color = '#FBBF24';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'rgba(255,255,255,0.03)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
          btn.style.color = '#E2E8F0';
        }
      });
    }

    this.updateEconomicRadiusData(this.selectedEconRadius || 1000, indKey, this.selectedEconDistrictId);
  }

  openEconomicRadiusModal(radiusMeters = 1000) {
    this.initEconIndustryDropdown();
    const modal = document.getElementById('modal-economic-radius');
    if (!modal) return;
    this.selectedEconRadius = radiusMeters;
    modal.style.display = 'flex';
    this.updateEconomicRadiusData(radiusMeters);
  }

  closeEconomicRadiusModal() {
    const modal = document.getElementById('modal-economic-radius');
    if (modal) modal.style.display = 'none';
  }

  updateEconomicRadiusData(radiusMeters = 1000, industryKey = null, districtId = null, provinceId = null, communeId = null, flyToCommune = false) {
    const engine = (typeof window !== 'undefined' && window.EconomicRadiusEngine) || (typeof EconomicRadiusEngine !== 'undefined' ? EconomicRadiusEngine : null);
    const content = document.getElementById('dt-econ-modal-content');
    const locText = document.getElementById('dt-econ-location-text');
    if (!content || !engine) return;

    let coords = this.getSurveyCenterCoordinates();

    const targetProvinceId = provinceId || this.selectedEconProvinceId || null;
    const targetDistrictId = districtId || this.selectedEconDistrictId || null;
    const targetCommuneId = communeId || this.selectedEconCommuneId || null;

    let res = engine.calculateRadiusMarket({
      lat: coords.lat,
      lng: coords.lng,
      radiusMeters: radiusMeters,
      provinceId: targetProvinceId,
      districtId: targetDistrictId,
      communeId: targetCommuneId
    });

    if (!res) {
      content.innerHTML = '<div style="color:var(--text-muted); padding:1rem; text-align:center;">Không thể tính toán dữ liệu sức mua tại tọa độ này.</div>';
      return;
    }

    // Nếu chọn xã/phường từ menu và cần bay bản đồ về tâm xã
    if (flyToCommune && res.commune && typeof res.commune.lat === 'number' && typeof res.commune.lng === 'number') {
      coords = { lat: res.commune.lat, lng: res.commune.lng };
      this.surveyCenterLatLng = [coords.lat, coords.lng];
      if (this.mapInstance && this.mode === 'map') {
        this.mapInstance.setView([coords.lat, coords.lng], Math.max(this.mapInstance.getZoom() || 18, 18), { animate: true });
      }
      // Tính lại theo tọa độ chuẩn của xã
      res = engine.calculateRadiusMarket({
        lat: coords.lat,
        lng: coords.lng,
        radiusMeters: radiusMeters,
        provinceId: res.location.provinceId,
        districtId: res.location.districtId,
        communeId: res.location.communeId
      });
    }

    if (locText) {
      locText.textContent = `${coords.lat.toFixed(5)}° N, ${coords.lng.toFixed(5)}° E`;
    }

    // 1. Cập nhật dropdown Tỉnh / Thành
    const provSelect = document.getElementById('dt-econ-province-select');
    if (provSelect && res.allProvinces) {
      if (provSelect.dataset.initialized !== 'true') {
        provSelect.dataset.initialized = 'true';
        provSelect.innerHTML = res.allProvinces.map(p =>
          `<option value="${p.id}" ${p.id === res.location.provinceId ? 'selected' : ''}>${p.name}</option>`
        ).join('');
      } else {
        provSelect.value = res.location.provinceId;
      }
      this.selectedEconProvinceId = res.location.provinceId;
    }

    // 2. Cập nhật dropdown Quận / Huyện
    const districtSelect = document.getElementById('dt-econ-district-select');
    const distDistTag = document.getElementById('dt-econ-district-distance-tag');
    if (districtSelect && res.keyDistrictsInProvince) {
      const activeDistId = res.location.districtId;
      if (districtSelect.dataset.provinceId !== res.location.provinceId) {
        districtSelect.dataset.provinceId = res.location.provinceId;
        districtSelect.innerHTML = res.keyDistrictsInProvince.map(d =>
          `<option value="${d.id}" ${d.id === activeDistId ? 'selected' : ''}>${d.name} (${d.type})</option>`
        ).join('');
      } else {
        districtSelect.value = activeDistId;
      }
      this.selectedEconDistrictId = activeDistId;
    }

    // 3. Cập nhật dropdown Xã / Phường
    const communeSelect = document.getElementById('dt-econ-commune-select');
    if (communeSelect) {
      const activeCommunes = (res.district && res.district.communes) || [];
      const activeCommuneId = res.location.communeId;
      if (communeSelect.dataset.districtId !== res.location.districtId) {
        communeSelect.dataset.districtId = res.location.districtId;
        if (activeCommunes.length > 0) {
          communeSelect.innerHTML = activeCommunes.map(c =>
            `<option value="${c.id}" ${c.id === activeCommuneId ? 'selected' : ''}>${c.name} (${c.type})</option>`
          ).join('');
        } else {
          communeSelect.innerHTML = '<option value="">Toàn quận / huyện</option>';
        }
      } else {
        communeSelect.value = activeCommuneId;
      }
      this.selectedEconCommuneId = activeCommuneId;
    }

    if (distDistTag) {
      let distText = '';
      if (res.location.communeName) {
        distText += `${res.location.communeName}`;
      }
      if (res.location.distanceToDistrictCenterKm !== null && res.location.distanceToDistrictCenterKm !== undefined) {
        distText += ` • Cách trung tâm: ~${res.location.distanceToDistrictCenterKm} km`;
      }
      distDistTag.textContent = distText;
    }

    // Tính toán phân tích chuyên sâu theo ngành kinh doanh (VSIC 2025)
    const indEngine = (typeof window !== 'undefined' && window.IndustryEconomicEngine) || (typeof IndustryEconomicEngine !== 'undefined' ? IndustryEconomicEngine : null);
    const indKey = industryKey || this.selectedIndustryKey || 'CAFE';
    this.selectedIndustryKey = indKey;

    let indRes = null;
    if (indEngine && indEngine.calculateIndustryMarket) {
      indRes = indEngine.calculateIndustryMarket({
        lat: coords.lat,
        lng: coords.lng,
        radiusMeters: radiusMeters,
        districtId: this.selectedEconDistrictId,
        industryKey: indKey
      });
    }

    // Vẽ hoặc cập nhật vòng tròn Leaflet nếu đang ở map mode
    if (this.mode === 'map' && this.mapInstance && typeof L !== 'undefined' && L.circle) {
      if (this._econLeafletCircle) {
        this._econLeafletCircle.remove();
        this._econLeafletCircle = null;
      }
      try {
        this._econLeafletCircle = L.circle([coords.lat, coords.lng], {
          radius: radiusMeters,
          color: (indRes && indRes.feasibility) ? indRes.feasibility.opportunityColor : (res.marketAssessment.ratingColor || '#10B981'),
          fillColor: (indRes && indRes.feasibility) ? indRes.feasibility.opportunityColor : (res.marketAssessment.ratingColor || '#10B981'),
          fillOpacity: 0.12,
          weight: 2,
          dashArray: '5, 5'
        }).addTo(this.mapInstance);
      } catch (e) {
        console.warn('Cannot draw econ circle', e);
      }
    }

    const { location, demographics, financials, spendingBreakdown, marketAssessment, commercialHotspots } = res;

    // Khối phân tích nhân khẩu học (Nam/Nữ & Tháp Tuổi)
    const gender = demographics.genderBreakdown || { malePct: 49.5, femalePct: 50.5, estimatedMale: 0, estimatedFemale: 0 };
    const cohorts = demographics.ageCohorts || {
      children: { pct: 18.5, count: 0, label: 'Trẻ em (0-14 tuổi)' },
      youth: { pct: 15.0, count: 0, label: 'Thanh thiếu niên (15-24 tuổi)' },
      prime: { pct: 44.5, count: 0, label: 'Độ tuổi vàng chi tiêu (25-49 tuổi)' },
      senior: { pct: 22.0, count: 0, label: 'Trung niên & Cao tuổi (50+ tuổi)' }
    };

    let industryHtml = '';
    if (indRes) {
      const { profile, demographics: indDemo, marketDemand, competition, survivalDynamics, feasibility, clusterIntelligence } = indRes;
      industryHtml = `
        <div style="background:rgba(15,23,42,0.9); border:1px solid ${feasibility.opportunityColor}55; border-radius:8px; padding:0.9rem; margin-top:0.9rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.7rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.45rem;">
            <div style="display:flex; align-items:center; gap:0.45rem;">
              
              <strong style="color:#FEF3C7; font-size:0.9rem;">${profile.name}</strong>
              <span style="font-size:0.68rem; color:#F59E0B; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); padding:0.1rem 0.4rem; border-radius:3px;">VSIC ${profile.vsic_code}</span>
            </div>
            <span style="font-size:0.74rem; font-weight:800; color:${feasibility.opportunityColor}; background:${feasibility.opportunityColor}22; padding:0.2rem 0.55rem; border-radius:12px; border:1px solid ${feasibility.opportunityColor}55;">
              Cơ Hội: ${feasibility.overallOpportunityScore}/100 • ${feasibility.opportunityTier.split('(')[0].trim()}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.5rem; margin-bottom:0.65rem;">
            <div style="background:rgba(255,255,255,0.02); padding:0.5rem; border-radius:5px; border-left:3px solid #38BDF8;">
              <div style="font-size:0.68rem; color:var(--text-muted);">Sức mua ngành/tháng:</div>
              <strong style="color:#FEF3C7; font-size:0.86rem;">${marketDemand.totalMonthlyDemandBillionVnd} tỷ VNĐ</strong>
              <div style="font-size:0.65rem; color:#38BDF8;">~${indDemo.targetCustomerCount.toLocaleString('vi-VN')} khách tiềm năng (${indDemo.targetRatioPct}%)</div>
            </div>

            <div style="background:rgba(255,255,255,0.02); padding:0.5rem; border-radius:5px; border-left:3px solid #EC4899;">
              <div style="font-size:0.68rem; color:var(--text-muted);">Điểm bán đối thủ:</div>
              <strong style="color:#FEF3C7; font-size:0.86rem;">~${competition.estimatedCompetitors} quán</strong>
              <div style="font-size:0.65rem; color:${feasibility.dsrColor};">DSR: ${feasibility.dsrRatio} (${feasibility.dsrStatus.split('(')[0].trim()})</div>
            </div>

            <div style="background:rgba(255,255,255,0.02); padding:0.5rem; border-radius:5px; border-left:3px solid #F59E0B;">
              <div style="font-size:0.68rem; color:var(--text-muted);">Sống sót >2 năm:</div>
              <strong style="color:#34D399; font-size:0.86rem;">~${survivalDynamics.survivalOver2YearsPct}%</strong>
              <div style="font-size:0.65rem; color:#94A3B8;">Tham chiếu chuẩn ngành</div>
            </div>
          </div>

          <!-- Bản Đồ Cụm Thương Mại & Đối Thủ Ngành -->
          <div style="background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:6px; margin-bottom:0.6rem; font-size:0.73rem;">
            <div style="font-weight:700; color:#F59E0B; margin-bottom:0.3rem;">Phân Bố Đối Thủ & Điểm Nóng Thương Mại:</div>
            <div style="margin-bottom:0.3rem; color:#CBD5E1;">
              <span style="color:#EF4444; font-weight:700;"><span style="color:#EF4444; font-weight:700;">[Khu đông đối thủ / Bão hòa]:</span></span>
              <span>${clusterIntelligence.crowdedSummary}</span>
            </div>
            <div style="margin-bottom:0.3rem; color:#CBD5E1;">
              <span style="color:#34D399; font-weight:700;"><span style="color:#34D399; font-weight:700;">[Vùng trũng cơ hội / Tiềm năng]:</span></span>
              <span>${clusterIntelligence.opportunitySummary}</span>
            </div>
            ${clusterIntelligence.primaryStreets.length > 0 ? `
              <div style="color:#94A3B8;">
                <span style="color:#38BDF8; font-weight:700;"><span style="color:#38BDF8; font-weight:700;">[Trục đường huyết mạch]:</span></span>
                <span>${clusterIntelligence.primaryStreets.join(' • ')}</span>
              </div>
            ` : ''}
          </div>

          <div style="font-size:0.73rem; color:#CBD5E1; line-height:1.45; background:rgba(0,0,0,0.25); padding:0.5rem 0.6rem; border-radius:4px; border-left:3px solid #34D399;">
            <strong style="color:#34D399;">Khẩu quyết phong thủy điểm bán:</strong> ${feasibility.fengshuiAdvice}
          </div>
        </div>
      `;
    }

    content.innerHTML = `
      <div style="background:rgba(255,255,255,0.02); border:1px solid ${marketAssessment.ratingColor}55; border-radius:10px; padding:1.1rem; margin-bottom:0.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.6rem;">
          <div>
            <span style="font-size:0.75rem; color:#94A3B8;">ĐỊA PHƯƠNG KHẢO CHỨNG:</span>
            <div style="font-size:1.05rem; font-weight:800; color:#FEF3C7;">
              ${location.communeName ? `<span style="color:#34D399;">${location.communeName}</span>, ` : ''}${location.districtName ? `${location.districtName}, ` : ''}${location.provinceName}
            </div>
            ${res.commune && res.commune.features ? `
              <div style="font-size:0.72rem; color:#38BDF8; margin-top:0.2rem;">
                <em>${res.commune.features}</em>
              </div>
            ` : ''}
          </div>
          <span style="font-size:0.82rem; font-weight:800; color:${marketAssessment.ratingColor}; background:${marketAssessment.ratingColor}22; border:1px solid ${marketAssessment.ratingColor}66; padding:0.25rem 0.75rem; border-radius:15px;">
            Mức Hấp Thụ: ${marketAssessment.rating} (RPPI ${marketAssessment.rppiScore}/100)
          </span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.6rem; margin-bottom:1rem;">
          <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px; border-left:3px solid #38BDF8;">
            <div style="font-size:0.72rem; color:#94A3B8;">Dân số bán kính:</div>
            <div style="font-size:1.05rem; font-weight:800; color:#38BDF8;">${demographics.estimatedPopulation.toLocaleString('vi-VN')} người</div>
            <div style="font-size:0.68rem; color:var(--text-dim);">${demographics.baseDensityPerKm2.toLocaleString('vi-VN')} người/km²</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px; border-left:3px solid #10B981;">
            <div style="font-size:0.72rem; color:#94A3B8;">Dung lượng tháng:</div>
            <div style="font-size:1.05rem; font-weight:800; color:#10B981;">${financials.totalMonthlySpendingBillionVnd.toLocaleString('vi-VN')} tỷ VNĐ</div>
            <div style="font-size:0.68rem; color:var(--text-dim);">Quy năm: ~${financials.totalYearlySpendingBillionVnd} tỷ</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px; border-left:3px solid #F59E0B;">
            <div style="font-size:0.72rem; color:#94A3B8;">Mức chi bình quân:</div>
            <div style="font-size:1.05rem; font-weight:800; color:#F59E0B;">${financials.monthlyExpensePerCapita} tr/tháng</div>
            <div style="font-size:0.68rem; color:var(--text-dim);">Thu nhập: ${financials.monthlyIncomePerCapita} tr</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px; border-left:3px solid #EC4899;">
            <div style="font-size:0.72rem; color:#94A3B8;">Điểm kinh doanh:</div>
            <div style="font-size:1.05rem; font-weight:800; color:#EC4899;">~${demographics.estimatedBusinessHouseholds.toLocaleString('vi-VN')} CSKD</div>
            <div style="font-size:0.68rem; color:var(--text-dim);">Điểm bán & cơ sở</div>
          </div>
        </div>

        <!-- Khối Nhân Khẩu Học & Tháp Tuổi Địa Phương -->
        <div style="background:rgba(0,0,0,0.25); padding:0.7rem; border-radius:6px; margin-bottom:0.8rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
            <div style="font-size:0.76rem; font-weight:700; color:#FEF3C7;">Cơ Cấu Nhân Khẩu Học & Độ Tuổi:</div>
            <div style="font-size:0.72rem; color:#38BDF8;">
              Nam: <strong style="color:#60A5FA;">${gender.malePct}%</strong> (~${gender.estimatedMale.toLocaleString('vi-VN')}) • Nữ: <strong style="color:#F472B6;">${gender.femalePct}%</strong> (~${gender.estimatedFemale.toLocaleString('vi-VN')})
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:0.4rem; font-size:0.72rem;">
            <div style="background:rgba(255,255,255,0.02); padding:0.35rem 0.5rem; border-radius:4px; border-top:2px solid #38BDF8;">
              <span style="color:#94A3B8;">Trẻ em (0-14):</span>
              <strong style="color:#FEF3C7; display:block;">${cohorts.children.pct}% (~${cohorts.children.count.toLocaleString('vi-VN')})</strong>
            </div>
            <div style="background:rgba(255,255,255,0.02); padding:0.35rem 0.5rem; border-radius:4px; border-top:2px solid #34D399;">
              <span style="color:#94A3B8;">Thanh niên (15-24):</span>
              <strong style="color:#FEF3C7; display:block;">${cohorts.youth.pct}% (~${cohorts.youth.count.toLocaleString('vi-VN')})</strong>
            </div>
            <div style="background:rgba(16,185,129,0.1); padding:0.35rem 0.5rem; border-radius:4px; border-top:2px solid #10B981; border:1px solid rgba(16,185,129,0.3);">
              <span style="color:#34D399; font-weight:700;">Tuổi vàng (25-49):</span>
              <strong style="color:#34D399; display:block;">${cohorts.prime.pct}% (~${cohorts.prime.count.toLocaleString('vi-VN')})</strong>
            </div>
            <div style="background:rgba(255,255,255,0.02); padding:0.35rem 0.5rem; border-radius:4px; border-top:2px solid #F59E0B;">
              <span style="color:#94A3B8;">Cao tuổi (50+):</span>
              <strong style="color:#FEF3C7; display:block;">${cohorts.senior.pct}% (~${cohorts.senior.count.toLocaleString('vi-VN')})</strong>
            </div>
          </div>
        </div>

        <div style="background:rgba(0,0,0,0.25); padding:0.7rem; border-radius:6px; margin-bottom:0.8rem;">
          <div style="font-size:0.76rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">Cơ cấu tiêu dùng (${financials.totalMonthlySpendingBillionVnd} tỷ VNĐ/tháng):</div>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.4rem; font-size:0.74rem;">
            <div>[F&B] Ăn uống: <strong style="color:#34D399;">${spendingBreakdown.foodExpenseBillion} tỷ</strong> (${spendingBreakdown.foodExpenseRatio}%)</div>
            <div>[Nhà ở] Tiện ích: <strong style="color:#38BDF8;">${spendingBreakdown.housingUtilitiesBillion} tỷ</strong></div>
            <div>[Y tế] Giáo dục: <strong style="color:#C084FC;">${spendingBreakdown.educationHealthBillion} tỷ</strong></div>
            <div>[Dịch vụ] Tiêu khiển: <strong style="color:#FBBF24;">${spendingBreakdown.shoppingLeisureBillion} tỷ</strong></div>
          </div>
        </div>

        ${industryHtml}

        <div style="font-size:0.78rem; color:#CBD5E1; line-height:1.55; border-left:3px solid ${marketAssessment.ratingColor}; padding-left:0.5rem; margin-top:0.8rem;">
          ${marketAssessment.summary}
        </div>
      </div>
    `;
  }

  destroy() {
    this.resizeObserver?.disconnect();
    this.canvasEvents?.abort();
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
      this.mapGeometry = null;
    }
  }
}
if (typeof window !== 'undefined') {
  window.LuopanMapTool = LuopanMapTool;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LuopanMapTool;
}
