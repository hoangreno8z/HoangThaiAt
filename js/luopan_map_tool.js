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
    this.calibEngine = window.CalibrationEngine;
    this.geometry = window.LuopanGeometry;
    this.data = window.LuopanData;
    this.STAGE_SIZE = 800;
    this.renderer = new window.LuopanSvgRenderer({ size: this.STAGE_SIZE });
    this.classifier = new window.LuopanClassifier();

    // 1. RAW GEOMETRY: Tọa độ logic chuẩn hóa 800x800
    this.centerPoint = { x: 400, y: 400 };
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
    this.isDrawingWater = false;
    this.pendingNewWaterPath = false;
    this.laiNodeIndex = null;
    this.khuNodeIndex = null;
    this.selectedNodeIndex = null;
    this.selectedSegmentIndex = null;

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
    this.rawFacingBearing = this.geometry.calculateHouseFacingBearing(
      this.frontageLine.pA,
      this.frontageLine.pB,
      this.frontageLine.frontSide
    );
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
    return this.geometry.calculateLineBearing(this.centerPoint, pLai);
  }

  getRawKhuBearing() {
    if (this.waterPathType === 'deadEnd') return null;
    const { pKhu } = this.getWaterPoints();
    if (!pKhu) return null;
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

  getWaterSegments() {
    const segments = [];
    if (!this.waterPolyline || this.waterPolyline.length < 2) return segments;
    for (let i = 0; i < this.waterPolyline.length - 1; i++) {
      const from = this.waterPolyline[i];
      const to = this.waterPolyline[i + 1];
      const rawBearing = this.geometry.calculateLineBearing(from, to);
      const effectiveBearing = this.isCalibrationLocked
        ? this.calibEngine.calibrate(rawBearing, this.calibrationOffset)
        : rawBearing;
      segments.push({
        fromIndex: i,
        toIndex: i + 1,
        rawBearing,
        effectiveBearing
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

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance
    });

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
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          touch-action: manipulation;
          transition: background 0.15s ease, transform 0.1s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .dt-touch-btn:active { transform: scale(0.97); }
        .dt-workflow-steps {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .dt-step-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.12);
          background: #1E293B;
          color: #CBD5E1;
        }
        .dt-step-badge.active {
          background: #F59E0B;
          color: #000;
          border-color: #FBBF24;
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
            <div class="dt-tool-kicker" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.15rem 0.5rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:6px; font-size:0.72rem; font-weight:700; color:#F5D485; margin-bottom:0.2rem;">
              <span>🧭</span> LA KINH BẢN ĐỒ CÓ HIỆU CHUẨN THỰC ĐỊA
            </div>
            <h2 class="dt-tool-title" style="margin:0; font-size:1.18rem; color:#FEF3C7; font-weight:800;">
              La Kinh Bản Đồ · 144 Thủy Khẩu
            </h2>
          </div>

          <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
            <div id="dt-calibration-status" role="status" style="background:${analysis.status.color}22; color:${analysis.status.color}; border:1px solid ${analysis.status.color}55; font-size:0.78rem; font-weight:700; padding:0.35rem 0.75rem; border-radius:8px;">
              ${analysis.status.label}
            </div>

            <div style="display:flex; gap:0.25rem; background:#1E293B; padding:0.2rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
              <button type="button" id="btn-mode-image" class="dt-touch-btn" style="background:${this.mode === 'image' ? '#FBBF24' : 'transparent'}; color:${this.mode === 'image' ? '#000' : '#CBD5E1'}; border:none; min-height:34px; padding:0.25rem 0.65rem;">
                📷 Tải Ảnh / CAD
              </button>
              <button type="button" id="btn-mode-map" class="dt-touch-btn" style="background:${this.mode === 'map' ? '#38BDF8' : 'transparent'}; color:${this.mode === 'map' ? '#000' : '#CBD5E1'}; border:none; min-height:34px; padding:0.25rem 0.65rem;">
                🗺️ Bản Đồ Vệ Tinh
              </button>
            </div>
          </div>
        </header>

        <!-- 2. WORKFLOW 5 BƯỚC THAO TÁC THỰC CHIẾN -->
        <nav class="dt-workflow-toolbar" aria-label="Thao tác khảo sát" style="background:#141B2B; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:0.65rem 0.9rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">

          <div class="dt-workflow-steps">
            <span style="font-size:0.72rem; color:#94A3B8; font-weight:700; text-transform:uppercase; margin-right:0.2rem;">Quy trình:</span>

            <button type="button" id="step-btn-1" class="dt-step-badge ${this.activeDrawTool === 'setCenter' ? 'active' : ''}">
              1. Tâm Nhà
            </button>

            <button type="button" id="step-btn-2" class="dt-step-badge ${this.activeDrawTool === 'drawFrontage' ? 'active' : ''}">
              2. Mặt Tiền
            </button>

            <button type="button" id="step-btn-3" class="dt-step-badge ${this.activeDrawTool === 'drawWater' && this.pendingNewWaterPath ? 'active' : ''}" title="Bấm để vẽ lại tuyến mới từ đầu (chấm liên tục N điểm)">
              3. Vẽ Mới (N điểm)
            </button>

            <button type="button" id="btn-append-water" class="dt-step-badge ${this.activeDrawTool === 'drawWater' && !this.pendingNewWaterPath ? 'active' : ''}" style="color:#A7F3D0; border-color:rgba(52,211,153,0.35);" title="Bấm để chấm thêm các khúc cua vào cuối tuyến hiện có">
              ➕ Nối Thêm
            </button>

            <button type="button" id="btn-reverse-water" class="dt-step-badge" style="color:#38BDF8; border-color:rgba(56,189,248,0.3);">
              4. Chiều ${this.flowDirection === 'forward' ? '→' : '←'}
            </button>

            <button type="button" id="btn-toggle-deadend" class="dt-step-badge" style="color:${this.waterPathType === 'deadEnd' ? '#F43F5E' : '#94A3B8'}; border-color:${this.waterPathType === 'deadEnd' ? '#F43F5E' : 'rgba(255,255,255,0.12)'};">
              ${this.waterPathType === 'deadEnd' ? '🛑 Hẻm cụt' : '↔️ Hẻm thông'}
            </button>

            <button type="button" id="step-btn-select" class="dt-step-badge ${this.activeDrawTool === 'select' ? 'active' : ''}">
              Chọn/Kéo
            </button>
          </div>

          <div class="dt-secondary-actions" style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <button type="button" id="btn-flip-frontside" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(197,179,130,0.35);">
              ⇄ Đảo mặt tiền
            </button>
            <button type="button" id="btn-export-survey" class="dt-touch-btn" style="background:#059669; color:#FFF; border:none;">
              📥 Xuất phiếu
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
                  📁 Chọn ảnh / CAD
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
                  <span>⚖️</span> HIỆU CHUẨN LA KINH
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
              <h3 style="margin:0; font-size:1.15rem; color:#FEF3C7; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
                <span>📋</span> PHIẾU KHẢO SÁT PHONG THỦY THỰC ĐỊA
              </h3>
              <button type="button" id="btn-close-survey-x" style="background:transparent; border:none; color:#94A3B8; font-size:1.4rem; cursor:pointer; padding:0.2rem 0.5rem;">✕</button>
            </div>

            <div id="survey-export-content" style="font-size:0.84rem; color:#E2E8F0; line-height:1.7; margin-bottom:1.2rem;"></div>

            <div style="display:flex; justify-content:flex-end; gap:0.6rem; flex-wrap:wrap;">
              <button type="button" id="btn-copy-survey" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; padding:0.5rem 1.1rem;">
                📋 Sao Chép Báo Cáo
              </button>
              <button type="button" id="btn-close-survey" class="dt-touch-btn" style="background:#EF4444; color:#FFF; border:none; padding:0.5rem 1.1rem;">
                Đóng
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  updateNodeActionBar() {
    const bar = document.getElementById('dt-node-action-bar');
    if (!bar) return;
    if (this.selectedNodeIndex !== null && this.waterPolyline[this.selectedNodeIndex]) {
      const idx = this.selectedNodeIndex;
      const p = this.waterPolyline[idx];
      const isLai = this.laiNodeIndex === idx;
      const isKhu = this.khuNodeIndex === idx;
      const isJunction = p.role === 'junction';
      const radialRaw = this.geometry.calculateLineBearing(this.centerPoint, p);
      const radialEffective = this.isCalibrationLocked
        ? this.calibEngine.calibrate(radialRaw, this.calibrationOffset)
        : radialRaw;
      const m = this.data.getMountain(radialEffective).mountain;

      bar.style.display = 'flex';
      bar.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:0.4rem; flex-wrap:wrap; background:rgba(15,23,42,0.94); border:1px solid rgba(255,255,255,0.18); border-radius:8px; padding:0.35rem 0.6rem; backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.6);">
          <div style="display:flex; align-items:center; gap:0.35rem; font-size:0.75rem;">
            <strong style="color:#FEF3C7;">Node P${idx + 1}:</strong>
            <span style="color:#94A3B8;">${radialEffective.toFixed(2)}° (${m.name} Sơn)</span>
          </div>
          <div style="display:flex; gap:0.3rem; align-items:center; flex-wrap:wrap;">
            <button type="button" id="btn-node-set-lai" class="dt-touch-btn" style="min-height:28px; padding:0.2rem 0.5rem; font-size:0.72rem; background:${isLai ? '#059669' : '#1E293B'}; color:${isLai ? '#FFF' : '#34D399'}; border:1px solid #34D399;">
              ${isLai ? '✓ Là Lai' : '📍 Đặt Lai'}
            </button>
            <button type="button" id="btn-node-set-khu" class="dt-touch-btn" style="min-height:28px; padding:0.2rem 0.5rem; font-size:0.72rem; background:${isKhu ? '#0284C7' : '#1E293B'}; color:${isKhu ? '#FFF' : '#38BDF8'}; border:1px solid #38BDF8;" ${this.waterPathType === 'deadEnd' ? 'disabled' : ''}>
              ${isKhu ? '✓ Là Khứ' : '🎯 Đặt Khứ'}
            </button>
            <button type="button" id="btn-node-set-junction" class="dt-touch-btn" style="min-height:28px; padding:0.2rem 0.5rem; font-size:0.72rem; background:${isJunction ? '#D97706' : '#1E293B'}; color:${isJunction ? '#FFF' : '#F59E0B'}; border:1px solid #F59E0B;">
              ${isJunction ? '✓ Ngã 3' : '🔀 Ngã 3'}
            </button>
            <button type="button" id="btn-node-clear-role" class="dt-touch-btn" style="min-height:28px; padding:0.2rem 0.4rem; font-size:0.72rem; background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12);">
              ⚪ Thường
            </button>
            ${this.waterPolyline.length > 2 ? `
              <button type="button" id="btn-node-delete" class="dt-touch-btn" style="min-height:28px; padding:0.2rem 0.45rem; font-size:0.72rem; background:#450A0A; color:#FCA5A5; border:1px solid #EF4444;" title="Xóa node này khỏi tuyến">
                🗑️ Xóa
              </button>
            ` : ''}
            <button type="button" id="btn-node-close" style="background:transparent; border:none; color:#94A3B8; cursor:pointer; font-size:1rem; padding:0 0.3rem;">
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

      bar.querySelector('#btn-node-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedNodeIndex = null;
        this.renderDrawingElements();
        this.updateNodeActionBar();
      });
      return;
    }

    if (this.selectedSegmentIndex !== null) {
      const segments = this.getWaterSegments();
      const seg = segments[this.selectedSegmentIndex];
      if (seg) {
        const m = this.data.getMountain(seg.effectiveBearing).mountain;
        bar.style.display = 'flex';
        bar.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:0.4rem; flex-wrap:wrap; background:rgba(15,23,42,0.94); border:1px solid rgba(56,189,248,0.4); border-radius:8px; padding:0.35rem 0.6rem; backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.6);">
            <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem;">
              <strong style="color:#38BDF8;">Đoạn P${seg.fromIndex + 1} → P${seg.toIndex + 1}:</strong>
              <span style="color:#FEF3C7; font-weight:700;">Hướng tuyến: ${seg.effectiveBearing.toFixed(2)}° (${m.name} Sơn · ${m.trigram} Quái)</span>
            </div>
            <div style="display:flex; gap:0.3rem; align-items:center;">
              <button type="button" id="btn-seg-insert-node" class="dt-touch-btn" style="min-height:28px; padding:0.2rem 0.6rem; font-size:0.72rem; background:#047857; color:#FFF; border:1px solid #34D399;" title="Chèn thêm 1 điểm vào giữa đoạn này để uốn khúc hẻm">
                ➕ Chèn Điểm Giữa
              </button>
              <button type="button" id="btn-seg-close" style="background:transparent; border:none; color:#94A3B8; cursor:pointer; font-size:1rem; padding:0 0.3rem;">
                ✕
              </button>
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
          this.selectedSegmentIndex = null;
          this.renderDrawingElements();
          this.updateNodeActionBar();
          this.updateMeasurementsDisplay();
        });
        return;
      }
    }

    bar.style.display = 'none';
    bar.innerHTML = '';
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

      if (this.activeDrawTool === 'setCenter' && !handle) {
        this.centerPoint = getPosition(event);
        refresh();
        this.updateNodeActionBar();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (this.activeDrawTool === 'drawWater' && !handle) {
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
        refresh();
        this.updateNodeActionBar();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
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
      if (segTarget && this.activeDrawTool === 'select') {
        this.selectedSegmentIndex = Number(segTarget.dataset.segmentIndex);
        this.selectedNodeIndex = null;
        this.updateNodeActionBar();
        this.updateMeasurementsDisplay();
        this.renderDrawingElements();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      // Click nền trống ở mode select: bỏ chọn node / segment
      if (this.activeDrawTool === 'select') {
        if (this.selectedNodeIndex !== null || this.selectedSegmentIndex !== null) {
          this.selectedNodeIndex = null;
          this.selectedSegmentIndex = null;
          this.updateNodeActionBar();
          this.updateMeasurementsDisplay();
          this.renderDrawingElements();
        }
      }
    }, options);
    svg.addEventListener('pointermove', event => {
      if (!dragTarget || event.pointerId !== pointerId) return;
      const position = getPosition(event);
      if (dragTarget === 'center') this.centerPoint = position;
      else if (dragTarget === 'frontA') {
        this.frontageLine.pA = position;
        this.syncCalibrationFromGeometry();
      }
      else if (dragTarget === 'frontB') {
        this.frontageLine.pB = position;
        this.syncCalibrationFromGeometry();
      }
      else if (dragTarget.startsWith('water_')) {
        const index = Number(dragTarget.slice(6));
        if (this.waterPolyline[index]) {
          this.waterPolyline[index].x = position.x;
          this.waterPolyline[index].y = position.y;
        }
      }
      refresh();
      this.updateNodeActionBar();
      event.preventDefault();
    }, options);
    const finish = event => {
      if (event.pointerId !== pointerId) return;
      dragTarget = null;
      if (svg.hasPointerCapture(pointerId)) svg.releasePointerCapture(pointerId);
      pointerId = null;
      this.updateNodeActionBar();
    };
    svg.addEventListener('pointerup', finish, options);
    svg.addEventListener('pointercancel', finish, options);
    svg.addEventListener('lostpointercapture', finish, options);
    this.renderDrawingElements();
  }

  renderDrawingElements() {
    const svg = document.getElementById('dt-drawing-svg');
    if (!svg) return;

    svg.style.pointerEvents = (this.activeDrawTool === 'setCenter' || this.activeDrawTool === 'drawWater') && this.showDrawingOverlay ? 'auto' : 'none';
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
    if (this.waterPolyline.length >= 2) {
      for (let i = 0; i < this.waterPolyline.length - 1; i++) {
        const from = this.waterPolyline[i];
        const to = this.waterPolyline[i + 1];
        const isSelected = this.selectedSegmentIndex === i;
        segmentElements.push(`
          <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="transparent" stroke-width="26" data-segment-index="${i}" style="cursor:pointer; touch-action:none; pointer-events:all;" />
          <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${isSelected ? '#FBBF24' : '#38BDF8'}" stroke-width="${isSelected ? 6 : 4}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="${isSelected ? 1.0 : 0.85}" pointer-events="none" />
          ${isSelected ? `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#FFF" stroke-width="1.8" stroke-dasharray="5,4" pointer-events="none" />` : ''}
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
          <circle r="26" fill="transparent" data-drag-handle="water_${idx}" style="cursor:grab; touch-action:none; pointer-events:all;" />
          <circle r="${rCircle}" fill="${color}" stroke="#000" stroke-width="${isSelected ? 3 : 2}" pointer-events="none" ${isSelected ? 'filter="drop-shadow(0 0 6px #FBBF24)"' : ''} />
          ${rCircle >= 11 ? `<text y="4" font-size="9" font-weight="900" fill="#000" text-anchor="middle" pointer-events="none">${badge}</text>` : ''}
          ${label ? `
            <text y="-16" font-size="12" font-weight="800" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">${label}</text>
            <text y="-16" font-size="12" font-weight="800" fill="${color}" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">${label}</text>
          ` : ''}
        </g>
      `;
    }).join('');

    svg.innerHTML = `
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
        <circle r="24" fill="transparent" data-drag-handle="frontA" style="cursor:grab; touch-action:none; pointer-events:all;" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-15" font-size="12" font-weight="800" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">Mép A</text>
        <text y="-15" font-size="12" font-weight="800" fill="#FDE047" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">Mép A</text>
      </g>
      <g transform="translate(${pB.x}, ${pB.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontB" style="cursor:grab; touch-action:none; pointer-events:all;" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-15" font-size="12" font-weight="800" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">Mép B</text>
        <text y="-15" font-size="12" font-weight="800" fill="#FDE047" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">Mép B</text>
      </g>

      <!-- Điểm Tâm Nhà -->
      <g transform="translate(${center.x}, ${center.y})">
        <circle r="24" fill="transparent" data-drag-handle="center" style="cursor:grab; touch-action:none; pointer-events:all;" />
        <circle r="12" fill="#EF4444" stroke="#FFF" stroke-width="3" pointer-events="none" />
        <circle r="4" fill="#FFF" pointer-events="none" />
        <text y="-18" font-size="13" font-weight="900" text-anchor="middle" fill="none" stroke="rgba(0,0,0,0.95)" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" class="luopan-text-halo" pointer-events="none">TÂM NHÀ</text>
        <text y="-18" font-size="13" font-weight="900" fill="#EF4444" stroke="rgba(255,255,255,0.3)" stroke-width="0.35" style="paint-order:stroke fill;" text-anchor="middle" class="luopan-text-main" pointer-events="none">TÂM NHÀ</text>
      </g>
    `;
  }

  getAnalysis() {
    return this.classifier.classify({
      facingBearing: this.getEffectiveFacingBearing(),
      laiBearing: this.getEffectiveLaiBearing(),
      khuBearing: this.getEffectiveKhuBearing(),
      offset: this.isCalibrationLocked ? this.calibrationOffset : 0,
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance
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
                <span>📐</span> 1. PHÉP ĐO
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

                <div style="display:flex; flex-direction:column; gap:0.15rem; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:#38BDF8; font-weight:700;">Khứ Thủy (Đi):</span>
                    <strong style="color:#38BDF8;">${khu !== null ? `${khu.toFixed(2)}°` : (this.waterPathType === 'deadEnd' ? 'Không xác lập — Hẻm cụt' : 'Chưa đo')}</strong>
                  </div>
                  <div class="dt-bearing-label" data-bearing-label="khu">${this.waterPathType === 'deadEnd' ? 'Tuyến tận tại nhà (không có Khứ)' : this.formatMountain(analysis.khu)}</div>
                  ${relKhu !== null ? `
                    <div style="font-size:0.72rem; color:#94A3B8; padding-left:0.3rem;">
                      ↳ So với hướng nhà: <strong style="color:#38BDF8;">${relKhu >= 0 ? '+' : ''}${relKhu.toFixed(2)}° (${relKhu >= 0 ? 'lệch phải' : 'lệch trái'})</strong>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- TẦNG 2: LA KINH (LUOPAN ATTRIBUTES) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#F5D485;">
                <span>🧭</span> 2. LA KINH CHÁNH TÔNG
              </div>

              <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.78rem;">
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Hướng Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.facing.mountain.name} Sơn (${analysis.facing.mountain.element}) / ${this.data.getTrigram(facing).trigram.name} Quái</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Tọa Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.sitting.mountain.name} Sơn</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Lai Sơn:</span>
                  <strong style="color:#34D399;">${analysis.lai ? `${analysis.lai.mountain.name} Sơn` : 'Chưa đo'}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Khứ Sơn:</span>
                  <strong style="color:#38BDF8;">${analysis.khu ? `${analysis.khu.mountain.name} Sơn` : (this.waterPathType === 'deadEnd' ? 'Hẻm cụt (không có Khứ)' : 'Chưa đo')}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#141B2B; border-radius:6px;">
                  <span>Cụm Song Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.group.label} (${analysis.group.cuc} Cục)</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Tuyến Hẻm:</span>
                  <strong style="color:#38BDF8;">${this.waterPolyline.length} điểm (${Math.max(0, this.waterPolyline.length - 1)} đoạn)</strong>
                </div>

                ${(() => {
                  if (this.selectedSegmentIndex !== null) {
                    const segments = this.getWaterSegments();
                    const seg = segments[this.selectedSegmentIndex];
                    if (seg) {
                      const m = this.data.getMountain(seg.effectiveBearing).mountain;
                      return `
                        <div style="margin-top:0.35rem; padding:0.4rem 0.55rem; background:#141B2B; border-radius:6px; border-left:3px solid #38BDF8; font-size:0.75rem;">
                          <div style="color:#38BDF8; font-weight:700;">Đoạn chọn: P${seg.fromIndex + 1} → P${seg.toIndex + 1}</div>
                          <div style="color:#FEF3C7; margin-top:0.15rem;">Hướng tuyến: <strong>${seg.effectiveBearing.toFixed(2)}° (${m.name} Sơn · ${m.trigram} Quái)</strong></div>
                        </div>
                      `;
                    }
                  }
                  if (this.selectedNodeIndex !== null && this.waterPolyline[this.selectedNodeIndex]) {
                    const idx = this.selectedNodeIndex;
                    const p = this.waterPolyline[idx];
                    const radialRaw = this.geometry.calculateLineBearing(this.centerPoint, p);
                    const radialEffective = this.isCalibrationLocked
                      ? this.calibEngine.calibrate(radialRaw, this.calibrationOffset)
                      : radialRaw;
                    const m = this.data.getMountain(radialEffective).mountain;
                    const roleLabel = this.laiNodeIndex === idx ? 'Lai Thủy' : (this.khuNodeIndex === idx ? 'Khứ Thủy' : (p.role === 'junction' ? 'Ngã 3' : 'Node thường'));
                    return `
                      <div style="margin-top:0.35rem; padding:0.4rem 0.55rem; background:#141B2B; border-radius:6px; border-left:3px solid #F59E0B; font-size:0.75rem;">
                        <div style="color:#F59E0B; font-weight:700;">Node chọn: P${idx + 1} (${roleLabel})</div>
                        <div style="color:#FEF3C7; margin-top:0.15rem;">Phương vị đối với Nhà: <strong>${radialEffective.toFixed(2)}° (${m.name} Sơn)</strong></div>
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
                <span>🔍</span> 3. ĐỘ TIN CẬY & RANH PHÂN KIM
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

                ${analysis.status.isSensitive ? `
                  <div style="background:#450A0A; border:1px solid #EF4444; border-radius:6px; padding:0.45rem 0.6rem; color:#FECACA; font-size:0.73rem; margin-top:0.3rem; line-height:1.4;">
                    ⚠️ <strong>KẾT QUẢ NHẠY VỚI SAI SỐ:</strong> Phương vị nằm rất gần vách ngăn phân kim (≤ 0.30°). Khi sai số dao động có thể chuyển sang Sơn lân cận: [${[...new Set([...analysis.facing.possibleMountains, ...(analysis.khu ? analysis.khu.possibleMountains : [])])].join(' / ')}]. Cần đo lại cẩn thận tại hiện trường.
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- TẦNG 4: KHẢO CHỨNG 144 THỦY KHẨU (CHỈ HIỂN THỊ SAU KHI ĐÃ KHÓA HIỆU CHUẨN) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#38BDF8;">
                <span>📜</span> 4. 144 THỦY KHẨU CHÁNH TÔNG
              </div>

              ${!this.isCalibrationLocked ? `
                <div style="text-align:center; padding:0.8rem; color:#94A3B8; font-size:0.76rem; line-height:1.5;">
                  🔒 <em>Vui lòng nhập số đo La Kinh và nhấn <strong>Khóa Chuẩn</strong> để kích hoạt động cơ đối chiếu 144 Thủy Khẩu Chánh Tông.</em>
                </div>
              ` : (analysis.thuyKhau ? `
                <div style="background:#181F30; border-radius:8px; padding:0.75rem; border-left:3px solid #F59E0B; margin-bottom:0.5rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <span style="font-size:0.75rem; color:#94A3B8; font-weight:700;">KHẨU #${analysis.thuyKhau.hs_num} / 144</span>
                    <span style="font-size:0.72rem; padding:0.15rem 0.45rem; border-radius:4px; font-weight:700; background:#F59E0B22; color:#FBBF24;">
                      ${analysis.thuyKhau.muc_phan}
                    </span>
                  </div>
                  <div style="font-size:0.92rem; font-weight:800; color:#FEF3C7; margin-bottom:0.25rem;">
                    ${analysis.thuyKhau.ten_cach}
                  </div>
                  <div style="font-size:0.74rem; color:#CBD5E1; line-height:1.5; margin-bottom:0.4rem;">
                    ${analysis.thuyKhau.muc_B}
                  </div>
                  <div style="font-size:0.7rem; color:#94A3B8; font-style:italic;">
                    ${analysis.thuyKhau.source}
                  </div>
                </div>

                <a href="#/corpus/topic-21" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:0.45rem; background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; border-radius:8px; text-decoration:none; font-size:0.76rem; font-weight:700;">
                  📖 Đọc Toàn Văn Khảo Chứng Cổ Thư →
                </a>
              ` : `
                <div style="padding:0.6rem; color:#CBD5E1; font-size:0.76rem; line-height:1.5; background:#1E293B; border-radius:6px;">
                  ${analysis.matchTrace.map(t => `<div>• ${t}</div>`).join('')}
                </div>
              `)}
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

  updateMeasurementsDisplay() {
    const analysis = this.getAnalysis();
    const panel = (this.container && this.container.querySelector ? this.container.querySelector('#dt-result-panels') : null) || (typeof document !== 'undefined' && document.getElementById ? document.getElementById('dt-result-panels') : null);
    if (panel) panel.innerHTML = this.renderResultPanels(analysis);
    this.updateCalibrationUI(analysis);
  }

  updateSvgView() {
    const mount = document.getElementById('dt-luopan-svg-container');
    if (!mount) return;
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance
    });

    this.updateViewTransform();
    mount.innerHTML = this.renderer.render({
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
  }

  bindEvents() {
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

    const updateStepBadges = (activeBtn) => {
      [step1, step2, step3, stepSelect].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });
      if (activeBtn) activeBtn.classList.add('active');
      this.renderDrawingElements();
    };

    if (step1) step1.addEventListener('click', () => {
      this.activeDrawTool = 'setCenter';
      updateStepBadges(step1);
      this.updateNodeActionBar();
    });
    if (step2) step2.addEventListener('click', () => {
      this.activeDrawTool = 'drawFrontage';
      updateStepBadges(step2);
      this.updateNodeActionBar();
    });
    if (step3) step3.addEventListener('click', () => {
      this.activeDrawTool = 'drawWater';
      this.isDrawingWater = true;
      this.pendingNewWaterPath = true;
      updateStepBadges(step3);
      this.renderDrawingElements();
      this.updateMeasurementsDisplay();
      this.updateNodeActionBar();
    });
    const btnAppendWater = document.getElementById('btn-append-water');
    if (btnAppendWater) btnAppendWater.addEventListener('click', () => {
      this.activeDrawTool = 'drawWater';
      this.isDrawingWater = true;
      this.pendingNewWaterPath = false;
      updateStepBadges(btnAppendWater);
      this.renderDrawingElements();
      this.updateMeasurementsDisplay();
      this.updateNodeActionBar();
    });
    if (stepSelect) stepSelect.addEventListener('click', () => {
      this.activeDrawTool = 'select';
      this.isDrawingWater = false;
      this.pendingNewWaterPath = false;
      updateStepBadges(stepSelect);
      this.renderDrawingElements();
      this.updateNodeActionBar();
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
        btnDeadEnd.textContent = this.waterPathType === 'deadEnd' ? '🛑 Hẻm cụt' : '↔️ Hẻm thông';
        btnDeadEnd.style.color = this.waterPathType === 'deadEnd' ? '#F43F5E' : '#94A3B8';
        btnDeadEnd.style.borderColor = this.waterPathType === 'deadEnd' ? '#F43F5E' : 'rgba(255,255,255,0.12)';
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    // Đảo chiều nước (hoán đổi role/flowDirection, TUYỆT ĐỐI không đảo ngược array geometry)
    const btnReverseWater = document.getElementById('btn-reverse-water');
    if (btnReverseWater) {
      btnReverseWater.addEventListener('click', () => {
        this.flowDirection = this.flowDirection === 'forward' ? 'reverse' : 'forward';
        btnReverseWater.textContent = `4. Chiều ${this.flowDirection === 'forward' ? '→' : '←'}`;
        if (Number.isInteger(this.laiNodeIndex) && Number.isInteger(this.khuNodeIndex)) {
          const temp = this.laiNodeIndex;
          this.laiNodeIndex = this.khuNodeIndex;
          this.khuNodeIndex = temp;
          if (this.waterPolyline[this.laiNodeIndex]) this.waterPolyline[this.laiNodeIndex].role = 'lai';
          if (this.waterPolyline[this.khuNodeIndex]) this.waterPolyline[this.khuNodeIndex].role = 'khu';
        }
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
        this.updateNodeActionBar();
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
            <div>• Trạng thái: <strong>${this.isCalibrationLocked ? '✓ ĐÃ HIỆU CHUẨN LA KINH CHÍNH XÁC' : 'KẾT QUẢ TẠM THỜI (CHƯA HIỆU CHUẨN)'}</strong></div>
            <div>• Hướng nhà thực đo: <strong style="color:#EF4444;">${facing.toFixed(2)}° (${analysis.facing.mountain.name} Sơn / ${this.data.getTrigram(facing).trigram.name} Quái)</strong></div>
            <div>• Hướng trên bản vẽ (RAW): <strong>${this.rawFacingBearing.toFixed(2)}°</strong></div>
            <div>• Độ bù hiệu chuẩn (Offset): <strong style="color:#10B981;">${this.calibEngine.formatOffset(this.calibrationOffset)}</strong></div>
            <div>• Tọa nhà: <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(2)}° (${analysis.sitting.mountain.name} Sơn)</strong></div>
            <div>• Cụm Song Sơn: <strong>${analysis.group.label} (${analysis.group.cuc} Cục)</strong></div>
            <div>• Lai Thủy: <strong>${analysis.lai ? `${analysis.lai.bearing.toFixed(2)}° (${analysis.lai.mountain.name})` : 'Chưa đo'}</strong> ${relLai !== null ? `(lệch ${relLai >= 0 ? '+' : ''}${relLai.toFixed(2)}° so với nhà)` : ''}</div>
            <div>• Khứ Thủy: <strong>${analysis.khu ? `${analysis.khu.bearing.toFixed(2)}° (${analysis.khu.mountain.name})` : (this.waterPathType === 'deadEnd' ? 'Không xác lập (Hẻm cụt)' : 'Chưa đo')}</strong> ${relKhu !== null ? `(lệch ${relKhu >= 0 ? '+' : ''}${relKhu.toFixed(2)}° so với nhà)` : ''}</div>
            <div>• Loại tuyến: <strong>${this.waterPathType === 'deadEnd' ? 'Hẻm cụt (điểm tận tại nhà)' : 'Hẻm thông'}</strong> · Chiều nước: <strong>${this.flowDirection === 'forward' ? 'Tả ➔ Hữu' : 'Hữu ➔ Tả'}</strong></div>
          </div>

          <div style="background:#1E293B; border-radius:10px; padding:1rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#CBD5E1; font-weight:800; font-size:0.88rem; margin-bottom:0.5rem;">2. ĐỘ TIN CẬY & VÙNG RANH PHÂN KIM</div>
            <div>• Sai số phép đo: <strong>±${this.measurementTolerance.toFixed(2)}°</strong></div>
            <div>• Khoảng cách tới ranh Hướng: <strong>${analysis.facing.distanceToBoundary.toFixed(2)}°</strong></div>
            ${analysis.khu ? `<div>• Khoảng cách tới ranh Khứ: <strong>${analysis.khu.distanceToBoundary.toFixed(2)}°</strong></div>` : ''}
            <div>• Đánh giá: <strong style="color:${analysis.status.isSensitive ? '#FB7185' : '#10B981'};">${analysis.status.isSensitive ? '⚠️ Nhạy cảm sai số ranh phân kim' : '✓ An toàn trong tâm Sơn'}</strong></div>
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

    if (btnCopyExport) {
      btnCopyExport.addEventListener('click', () => {
        const text = exportContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btnCopyExport.textContent = '✓ Đã Sao Chép!';
          setTimeout(() => { btnCopyExport.textContent = '📋 Sao Chép Báo Cáo'; }, 2000);
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
      btnMap.innerHTML = '🛰️ Đang lấy GPS...';
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
    const toLatLng = point => this.mapInstance.containerPointToLatLng([
      point.x * projection.scale + projection.x, point.y * projection.scale + projection.y
    ]);
    this.mapGeometry = {
      center: toLatLng(this.centerPoint),
      frontA: toLatLng(this.frontageLine.pA), frontB: toLatLng(this.frontageLine.pB),
      water: this.waterPolyline.map(toLatLng)
    };
  }

  projectMapGeometry() {
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
    this.waterPolyline = this.mapGeometry.water.map(toPoint);
    this.recalculateRawBearings();
    this.renderDrawingElements();
    this.updateSvgView();
    this.updateMeasurementsDisplay();
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
        anchor: map.containerPointToLatLng(midpoint()), zoom: map.getZoom(), distance: distance()
      } : null;
    };
    const moveAnchor = (anchor, point, zoom) => {
      const limitedZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), zoom));
      const center = map.project(anchor, limitedZoom).subtract(point).add(map.getSize().divideBy(2));
      map.setView(map.unproject(center, limitedZoom), limitedZoom, { animate: false });
    };
    // Inverse-transform gestures as well as pixels: dragging and pinching stay
    // under the finger in Hướng Lên, including non-cardinal view angles.
    mount.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      pointers.set(event.pointerId, mapPoint(event));
      mount.setPointerCapture(event.pointerId);
      rebase();
      event.preventDefault();
    }, options);
    mount.addEventListener('pointermove', event => {
      if (!pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, mapPoint(event));
      const zoom = gesture.zoom + (pointers.size > 1 && gesture.distance > 0
        ? Math.log2(Math.max(1, distance()) / gesture.distance) : 0);
      moveAnchor(gesture.anchor, midpoint(), zoom);
      event.preventDefault();
    }, options);
    const finish = event => {
      if (!pointers.has(event.pointerId)) return;
      pointers.delete(event.pointerId);
      rebase();
      if (mount.hasPointerCapture(event.pointerId)) mount.releasePointerCapture(event.pointerId);
    };
    mount.addEventListener('pointerup', finish, options);
    mount.addEventListener('pointercancel', finish, options);
    mount.addEventListener('lostpointercapture', finish, options);
    mount.addEventListener('wheel', event => {
      const point = mapPoint(event);
      moveAnchor(map.containerPointToLatLng(point), point, map.getZoom() - Math.sign(event.deltaY));
      event.preventDefault();
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
      L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=vi', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© Google Maps',
        maxZoom: 22,
        maxNativeZoom: 20
      }).addTo(this.mapInstance);
      // Keep controls outside rotated scene and above drawing handles.
      L.control.zoom({ position: 'topright' }).addTo(this.mapInstance);

      if (L.Control && L.Control.extend) {
        const GpsControl = L.Control.extend({
          options: { position: 'topright' },
          onAdd: () => {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            const btn = L.DomUtil.create('a', 'leaflet-control-gps-btn', container);
            btn.innerHTML = '📍';
            btn.href = '#';
            btn.title = 'Định vị GPS vị trí của tôi (Độ chính xác cao)';
            btn.setAttribute('role', 'button');
            btn.setAttribute('aria-label', 'Vị trí hiện tại');
            btn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:30px;height:30px;font-size:16px;background:#1E293B;color:#38BDF8;text-decoration:none;cursor:pointer;line-height:30px;';
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
      this.mapInstance.on('move zoom', () => this.projectMapGeometry());
      this.mapInstance.on('moveend zoomend', () => {
        const center = this.mapInstance.getCenter();
        this.surveyCenterLatLng = [center.lat, center.lng];
        this.zoomLevel = this.mapInstance.getZoom();
      });
    }
    this.mapInstance.invalidateSize({ pan: false });
    this.mapInstance.setView(this.surveyCenterLatLng, this.zoomLevel, { animate: false, reset: true });
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

window.LuopanMapTool = LuopanMapTool;
