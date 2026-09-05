/**
 * CÔNG CỤ TƯƠNG TÁC THỰC CHIẾN: LA KINH BẢN ĐỒ – 144 THỦY KHẨU (HOÀN THIỆN 100% CHO MOBILE & DESKTOP)
 * Đặc điểm tối ưu hóa di động:
 * 1. Hệ tọa độ chuẩn hóa ViewBox (0 0 800 800) đồng bộ hoàn toàn giữa SVG vẽ CAD và SVG La Kinh.
 * 2. Vòng chạm cảm ứng vô hình (Invisible Touch Target r=24 ~ đường kính 48px) đạt chuẩn công thái học di động W3C.
 * 3. Chuyển đổi tọa độ Touch/Mouse chính xác 100% bằng W3C getScreenCTM().inverse().
 * 4. Khóa cuộn trang (touch-action: none) khi tương tác vẽ & kéo thả mốc.
 * 5. Layout Responsive tự động 1 cột trên điện thoại / máy tính bảng; thanh công cụ đáy gom gọn, không bị đè lấn.
 * 6. Modal xuất phiếu khảo sát hỗ trợ cuộn mượt mà trên iOS và Android (-webkit-overflow-scrolling: touch).
 */

class LuopanMapTool {
  constructor() {
    this.mode = 'image'; // 'image' hoặc 'map'
    this.activeDrawTool = 'select'; // 'select', 'setCenter', 'drawFrontage', 'drawWater'
    this.container = null;

    // Động cơ tính toán & hiển thị
    this.geometry = window.LuopanGeometry;
    this.data = window.LuopanData;
    this.STAGE_SIZE = 800; // Khung tọa độ logic chuẩn hóa 800x800
    this.renderer = new window.LuopanSvgRenderer({ size: this.STAGE_SIZE });
    this.classifier = new window.LuopanClassifier();

    // Dữ liệu hình học thực địa (Tọa độ logic chuẩn hóa 800x800)
    this.centerPoint = { x: 400, y: 400 };
    this.frontageLine = {
      pA: { x: 290, y: 400 },
      pB: { x: 510, y: 400 },
      frontSide: 'right' // 'right' (nhìn xuống), 'left' (nhìn lên)
    };
    this.waterPolyline = [
      { x: 190, y: 220 }, // Lai Thủy (Nước đến)
      { x: 400, y: 270 },
      { x: 610, y: 580 }  // Khứ Thủy (Nước đi)
    ];

    // Dữ liệu Leaflet GIS
    this.mapInstance = null;
    this.centerLatLng = [21.028511, 105.854444];
    this.zoomLevel = 19;

    // Dữ liệu hiệu chuẩn (Calibration)
    this.rawFacingBearing = 180.0;
    this.measuredBearing = 180.0;
    this.calibrationOffset = 0.0;
    this.isCalibrationLocked = false;

    // Viewport & Hiển thị
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
  }

  recalculateRawBearings() {
    this.rawFacingBearing = this.geometry.calculateHouseFacingBearing(
      this.frontageLine.pA,
      this.frontageLine.pB,
      this.frontageLine.frontSide
    );
  }

  getEffectiveFacingBearing() {
    return this.isCalibrationLocked
      ? this.geometry.calibrateBearing(this.rawFacingBearing, this.calibrationOffset)
      : this.rawFacingBearing;
  }

  getEffectiveLaiBearing() {
    if (!this.waterPolyline || this.waterPolyline.length < 1) return null;
    const pLai = this.waterPolyline[0];
    const rawLai = this.geometry.calculateLineBearing(this.centerPoint, pLai);
    return this.isCalibrationLocked
      ? this.geometry.calibrateBearing(rawLai, this.calibrationOffset)
      : rawLai;
  }

  getEffectiveKhuBearing() {
    if (!this.waterPolyline || this.waterPolyline.length < 2) return null;
    const pKhu = this.waterPolyline[this.waterPolyline.length - 1];
    const rawKhu = this.geometry.calculateLineBearing(this.centerPoint, pKhu);
    return this.isCalibrationLocked
      ? this.geometry.calibrateBearing(rawKhu, this.calibrationOffset)
      : rawKhu;
  }

  renderLayout() {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked
    });

    const luopanSvgHtml = this.renderer.render({
      cx: this.centerPoint.x,
      cy: this.centerPoint.y,
      radius: 350,
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });

    this.container.innerHTML = `
      <style>
        /* CSS RESPONSIVE & MOBILE TỐI ƯU HÓA HOÀN HẢO */
        .dt-luopan-tool-root {
          box-sizing: border-box;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #E2E8F0;
        }
        .dt-luopan-tool-root * {
          box-sizing: border-box;
        }
        .dt-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 1.2rem;
          align-items: start;
        }
        @media (max-width: 992px) {
          .dt-workspace-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .dt-touch-btn {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          touch-action: manipulation;
          transition: background 0.15s ease, transform 0.1s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .dt-touch-btn:active {
          transform: scale(0.97);
        }
        .dt-action-bar-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .dt-action-bar-row {
            width: 100%;
            justify-content: space-between;
          }
          .dt-action-bar-row > .dt-touch-btn {
            flex: 1 1 calc(50% - 0.45rem);
            font-size: 0.76rem;
            padding: 0.35rem 0.5rem;
          }
        }
        /* Thanh nổi đáy responsive */
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
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.4rem 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 640px) {
          .dt-floating-bottom-bar {
            bottom: 8px;
            left: 8px;
            right: 8px;
            padding: 0.35rem 0.5rem;
            gap: 0.35rem;
          }
          .dt-floating-bottom-bar .dt-touch-btn {
            font-size: 0.72rem;
            padding: 0.3rem 0.5rem;
            min-height: 34px;
          }
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
          touch-action: none; /* Khóa cuộn trang khi chạm vào Stage */
          user-select: none;
          -webkit-user-select: none;
        }
      </style>

      <div class="dt-luopan-tool-root" style="display:flex; flex-direction:column; gap:1rem;">
        
        <!-- 1. TOP HEADER & STATUS -->
        <header style="background:#0D111A; border:1px solid #C5B382; border-radius:12px; padding:0.9rem 1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
          <div>
            <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.15rem 0.5rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:6px; font-size:0.72rem; font-weight:700; color:#F5D485; margin-bottom:0.25rem;">
              <span>🧭</span> LA KINH BẢN ĐỒ CÓ HIỆU CHUẨN THỰC ĐỊA
            </div>
            <h2 style="margin:0; font-size:1.18rem; color:#FEF3C7; font-weight:800;">
              Hệ Thống Khảo Khẩu & Đo Đạc Không Gian
            </h2>
          </div>

          <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
            <div style="background:${analysis.status.color}22; color:${analysis.status.color}; border:1px solid ${analysis.status.color}55; font-size:0.78rem; font-weight:700; padding:0.35rem 0.75rem; border-radius:8px;">
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

        <!-- 2. CAD DRAWING ACTION BAR -->
        <nav style="background:#141B2B; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:0.6rem 0.9rem; display:flex; flex-direction:column; gap:0.6rem;">
          
          <!-- Hàng 1: Các chế độ chọn và vẽ -->
          <div class="dt-action-bar-row">
            <span style="font-size:0.72rem; color:#94A3B8; font-weight:700; text-transform:uppercase;">Đặt mốc:</span>
            
            <button type="button" id="tool-btn-select" class="dt-touch-btn dt-tool-btn" style="background:${this.activeDrawTool === 'select' ? '#F5D485' : '#1E293B'}; color:${this.activeDrawTool === 'select' ? '#000' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15);">
              🖱️ Chọn / Kéo
            </button>

            <button type="button" id="tool-btn-center" class="dt-touch-btn dt-tool-btn" style="background:${this.activeDrawTool === 'setCenter' ? '#EF4444' : '#1E293B'}; color:${this.activeDrawTool === 'setCenter' ? '#FFF' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15);">
              📍 Tâm Nhà
            </button>

            <button type="button" id="tool-btn-frontage" class="dt-touch-btn dt-tool-btn" style="background:${this.activeDrawTool === 'drawFrontage' ? '#F59E0B' : '#1E293B'}; color:${this.activeDrawTool === 'drawFrontage' ? '#000' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15);">
              📐 Mặt Tiền
            </button>

            <button type="button" id="tool-btn-water" class="dt-touch-btn dt-tool-btn" style="background:${this.activeDrawTool === 'drawWater' ? '#38BDF8' : '#1E293B'}; color:${this.activeDrawTool === 'drawWater' ? '#000' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15);">
              🌊 Tuyến Nước
            </button>
          </div>

          <!-- Hàng 2: Các nút hành động đảo chiều & xuất phiếu -->
          <div class="dt-action-bar-row">
            <button type="button" id="btn-flip-frontside" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(197,179,130,0.35);">
              ⇄ Đổi Hướng Nhà
            </button>
            <button type="button" id="btn-reverse-water" class="dt-touch-btn" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.35);">
              🔄 Đảo Chiều Nước (Lai ⇄ Khứ)
            </button>
            <button type="button" id="btn-export-survey" class="dt-touch-btn" style="background:#059669; color:#FFF; border:none; margin-left:auto;">
              📥 Xuất Phiếu Khảo Sát
            </button>
          </div>
        </nav>

        <!-- 3. MAIN WORKSPACE GRID -->
        <div class="dt-workspace-grid">
          
          <!-- LEFT: INTERACTIVE CAD & LUOPAN CANVAS -->
          <div class="dt-stage-wrapper" id="dt-interactive-stage">
            
            <!-- LAYER 0: MAP OR IMAGE BACKGROUND -->
            <div id="dt-workspace-viewport" style="position:absolute; inset:0; overflow:hidden; display:flex; justify-content:center; align-items:center;">
              ${this.mode === 'image' && this.imageSrc ? `
                <img id="dt-user-img" src="${this.imageSrc}" style="width:100%; height:100%; object-fit:contain; opacity:0.65; pointer-events:none;" />
              ` : `
                <div id="dt-map-mount" style="position:absolute; inset:0; ${this.mode === 'map' ? 'z-index:1;' : 'display:none;'}"></div>
                ${!this.imageSrc && this.mode === 'image' ? `
                  <div style="text-align:center; color:#64748B; padding:1.5rem; z-index:2;">
                    <div style="font-size:2.8rem; margin-bottom:0.4rem;">🛰️</div>
                    <p style="font-size:0.9rem; margin-bottom:0.6rem; color:#FEF3C7; font-weight:700;">Chưa tải ảnh nền thực địa</p>
                    <p style="font-size:0.78rem; margin-bottom:1rem; max-width:360px; color:#94A3B8; line-height:1.5;">Tải ảnh chụp vệ tinh Google Maps hoặc ảnh bản vẽ CAD mặt bằng để đo đạc chính xác góc tương đối.</p>
                    <label class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382;">
                      <span>📁</span> Chọn Ảnh Vệ Tinh / CAD
                      <input type="file" id="input-upload-image" accept="image/*" style="display:none;" />
                    </label>
                  </div>
                ` : ''}
              `}
            </div>

            <!-- LAYER 1: VECTOR LUOPAN SVG OVERLAY (TÂM TRÙNG TÂM NHÀ) -->
            <div id="dt-luopan-svg-container" style="position:absolute; inset:0; width:100%; height:100%; z-index:10; pointer-events:none; transition:opacity 0.15s ease-out;">
              ${luopanSvgHtml}
            </div>

            <!-- LAYER 2: INTERACTIVE CAD DRAWING SVG OVERLAY (CÙNG VIEWBOX 0 0 800 800) -->
            <svg id="dt-drawing-svg" viewBox="0 0 ${this.STAGE_SIZE} ${this.STAGE_SIZE}" preserveAspectRatio="xMidYMid meet" style="position:absolute; inset:0; width:100%; height:100%; z-index:15; pointer-events:auto; touch-action:none;"></svg>

            <!-- FLOATING CONTROL BAR ĐÁY STAGE (RESPONSIVE 1 HÀNG) -->
            <div class="dt-floating-bottom-bar">
              <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                <button type="button" id="btn-north-up" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(255,255,255,0.12);">
                  🧭 Bắc Lên
                </button>
                <button type="button" id="btn-facing-up" class="dt-touch-btn" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.35);">
                  🏠 Hướng Lên
                </button>
                <button type="button" id="btn-toggle-drawing" class="dt-touch-btn" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12);">
                  ${this.showDrawingOverlay ? '👁️ Ẩn Nét' : '👁️ Nét Vẽ'}
                </button>
              </div>

              <!-- Opacity slider -->
              <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.74rem; color:#94A3B8;">
                <span>Độ mờ:</span>
                <input type="range" id="slider-opacity" min="0.1" max="1.0" step="0.05" value="${this.luopanOpacity}" style="width:70px; cursor:pointer; accent-color:#F59E0B;" />
              </div>
            </div>
          </div>

          <!-- RIGHT: CALIBRATION & MEASUREMENT SIDEBAR -->
          <div style="display:flex; flex-direction:column; gap:0.9rem;">
            
            <!-- 1. BẢNG HIỆU CHUẨN THỰC ĐỊA -->
            <div style="background:#111827; border:1px solid ${this.isCalibrationLocked ? '#10B981' : '#F59E0B'}; border-radius:12px; padding:1rem; box-shadow:0 8px 24px rgba(0,0,0,0.35);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <div style="font-size:0.86rem; font-weight:800; color:#FEF3C7; display:flex; align-items:center; gap:0.4rem;">
                  <span>⚖️</span> HIỆU CHUẨN LA KINH
                </div>
                <span style="font-size:0.72rem; padding:0.15rem 0.5rem; border-radius:6px; font-weight:700; background:${this.isCalibrationLocked ? '#10B98122' : '#F59E0B22'}; color:${this.isCalibrationLocked ? '#10B981' : '#F59E0B'};">
                  ${this.isCalibrationLocked ? 'ĐÃ KHÓA' : 'CHỜ KHÓA'}
                </span>
              </div>

              <div style="font-size:0.8rem; color:#94A3B8; margin-bottom:0.75rem; line-height:1.5;">
                Nhập số đo Hướng Nhà bằng La Kinh thực địa của Thầy để bù trừ sai số với ảnh vệ tinh/bản vẽ.
              </div>

              <div style="display:flex; gap:0.5rem; margin-bottom:0.75rem;">
                <input type="number" id="input-measured-bearing" value="${this.measuredBearing.toFixed(1)}" step="0.1" min="0" max="360" ${this.isCalibrationLocked ? 'disabled' : ''} style="flex:1; background:#1E293B; border:1px solid rgba(255,255,255,0.18); border-radius:8px; padding:0.5rem 0.75rem; color:#FEF3C7; font-size:0.92rem; font-weight:700;" placeholder="Nhập độ (0-360)" />
                <button type="button" id="btn-lock-calibration" class="dt-touch-btn" style="background:${this.isCalibrationLocked ? '#EF4444' : '#10B981'}; color:#FFF; border:none; padding:0.5rem 1rem;">
                  ${this.isCalibrationLocked ? 'Mở Khóa' : 'Khóa Chuẩn'}
                </button>
              </div>

              <div style="background:#0D111A; border-radius:8px; padding:0.6rem 0.8rem; font-size:0.76rem; display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
                <div>Góc bản vẽ: <strong style="color:#FEF3C7;">${this.rawFacingBearing.toFixed(1)}°</strong></div>
                <div>Hiệu chuẩn: <strong style="color:#10B981;">${this.calibrationOffset >= 0 ? '+' : ''}${this.calibrationOffset.toFixed(1)}°</strong></div>
              </div>
            </div>

            <!-- 2. BẢNG THÔNG SỐ KHẢO SÁT TỨ THỦY -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:1rem;">
              <div style="font-size:0.86rem; font-weight:800; color:#FEF3C7; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.4rem;">
                <span>📐</span> THÔNG SỐ ĐO ĐẠC
              </div>

              <div style="display:flex; flex-direction:column; gap:0.45rem; font-size:0.8rem;">
                <div style="display:flex; justify-content:space-between; padding:0.35rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#EF4444; font-weight:700;">🏠 Hướng Nhà:</span>
                  <strong style="color:#EF4444;">${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn)</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.35rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#FBBF24; font-weight:700;">⛰️ Tọa Nhà:</span>
                  <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.35rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#34D399; font-weight:700;">🌊 Lai Thủy (Đến):</span>
                  <strong style="color:#34D399;">${analysis.lai ? `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})` : 'Chưa đo'}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.35rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#38BDF8; font-weight:700;">💧 Khứ Thủy (Đi):</span>
                  <strong style="color:#38BDF8;">${analysis.khu ? `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})` : 'Chưa đo'}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.35rem 0.5rem; background:#141B2B; border-radius:6px; margin-top:0.2rem;">
                  <span style="color:#CBD5E1;">Cụm Song Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.group.label} (${analysis.group.cuc} Cục)</strong>
                </div>
              </div>
            </div>

            <!-- 3. KẾT QUẢ KHẢO CHỨNG 144 THỦY KHẨU -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:1rem;">
              <div style="font-size:0.86rem; font-weight:800; color:#38BDF8; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                <span>📜</span> 144 THỦY KHẨU CHÁNH TÔNG
              </div>

              ${analysis.thuyKhau ? `
                <div style="background:#181F30; border-radius:8px; padding:0.75rem; border-left:3px solid #F59E0B; margin-bottom:0.6rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                    <span style="font-size:0.75rem; color:#94A3B8; font-weight:700;">KHẨU #${analysis.thuyKhau.hs_num} / 144</span>
                    <span style="font-size:0.72rem; padding:0.15rem 0.45rem; border-radius:4px; font-weight:700; background:#F59E0B22; color:#FBBF24;">
                      ${analysis.thuyKhau.muc_phan}
                    </span>
                  </div>
                  <div style="font-size:0.95rem; font-weight:800; color:#FEF3C7; margin-bottom:0.25rem;">
                    ${analysis.thuyKhau.ten_cach}
                  </div>
                  <div style="font-size:0.76rem; color:#CBD5E1; line-height:1.5;">
                    ${analysis.thuyKhau.muc_B}
                  </div>
                </div>

                <a href="#/corpus/topic-21" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:0.5rem; background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; border-radius:8px; text-decoration:none; font-size:0.78rem; font-weight:700;">
                  📖 Đọc Toàn Văn Khảo Chứng Cổ Thư →
                </a>
              ` : `
                <div style="text-align:center; padding:1rem; color:#64748B; font-size:0.78rem;">
                  Vui lòng xác định vị trí Khứ Thủy (nước thoát) để đối chiếu 144 Thủy Khẩu.
                </div>
              `}
            </div>

            <!-- 4. QUẢN LÝ CÁC TẦNG LA KINH (LAYERS) -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.9rem;">
              <div style="font-size:0.8rem; font-weight:700; color:#94A3B8; margin-bottom:0.6rem; text-transform:uppercase;">
                Lớp Hiển Thị La Kinh:
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.45rem; font-size:0.76rem;">
                <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;"><input type="checkbox" id="chk-layer-360" checked /> 360 Độ</label>
                <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;"><input type="checkbox" id="chk-layer-24" checked /> 24 Sơn</label>
                <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;"><input type="checkbox" id="chk-layer-144" checked /> 144 Thủy Khẩu</label>
                <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;"><input type="checkbox" id="chk-layer-trigrams" checked /> Bát Quái</label>
                <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;"><input type="checkbox" id="chk-layer-pointers" checked /> Kim Chỉ Tiêu</label>
                <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;"><input type="checkbox" id="chk-layer-pin" checked /> Thiên Trì</label>
              </div>
            </div>

          </div>
        </div>

        <!-- 4. MODAL XUẤT PHIẾU KHẢO SÁT HIỆN TRƯỜNG -->
        <div id="modal-survey-export" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); justify-content:center; align-items:center; padding:1rem;">
          <div style="background:#0F172A; border:1px solid #C5B382; border-radius:14px; width:100%; max-width:640px; max-height:85vh; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:1.4rem; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.12); padding-bottom:0.8rem; margin-bottom:1rem;">
              <h3 style="margin:0; font-size:1.15rem; color:#FEF3C7; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
                <span>📋</span> PHIẾU KHẢO SÁT PHONG THỦY THỰC ĐỊA
              </h3>
              <button type="button" id="btn-close-survey-x" style="background:transparent; border:none; color:#94A3B8; font-size:1.4rem; cursor:pointer; padding:0.2rem 0.5rem;">✕</button>
            </div>

            <div id="survey-export-content" style="font-size:0.84rem; color:#E2E8F0; line-height:1.7; margin-bottom:1.2rem;">
              <!-- Nội dung phiếu khảo sát render động -->
            </div>

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

  // ── 4. BỘ CÔNG CỤ VẼ TƯƠNG TÁC (INTERACTIVE CAD CANVAS) ──
  initInteractiveCanvas() {
    const svgOverlay = document.getElementById('dt-drawing-svg');
    if (!svgOverlay) return;

    this.renderDrawingElements();

    let isPointerDown = false;
    let dragTarget = null; // 'center', 'frontA', 'frontB', 'water_0', 'water_1', etc.

    /**
     * Chuyển đổi tọa độ Touch/Mouse sang hệ quy chiếu SVG ViewBox (0 0 800 800) chuẩn W3C
     */
    const getSvgCoords = (e) => {
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

      try {
        const pt = svgOverlay.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const ctm = svgOverlay.getScreenCTM();
        if (ctm) {
          const transformed = pt.matrixTransform(ctm.inverse());
          return {
            x: Math.round(transformed.x),
            y: Math.round(transformed.y)
          };
        }
      } catch (err) {
        // Fallback
      }

      const rect = svgOverlay.getBoundingClientRect();
      const scaleX = this.STAGE_SIZE / rect.width;
      const scaleY = this.STAGE_SIZE / rect.height;
      return {
        x: Math.round((clientX - rect.left) * scaleX),
        y: Math.round((clientY - rect.top) * scaleY)
      };
    };

    // MOUSE EVENTS
    svgOverlay.addEventListener('mousedown', (e) => {
      const pos = getSvgCoords(e);
      if (this.activeDrawTool === 'setCenter') {
        this.centerPoint = pos;
        this.renderDrawingElements();
        this.updateSvgView();
        return;
      }

      const target = e.target.closest('[data-drag-handle]');
      if (target) {
        isPointerDown = true;
        dragTarget = target.dataset.dragHandle;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown || !dragTarget) return;
      const pos = getSvgCoords(e);

      if (dragTarget === 'center') {
        this.centerPoint = pos;
      } else if (dragTarget === 'frontA') {
        this.frontageLine.pA = pos;
        this.recalculateRawBearings();
      } else if (dragTarget === 'frontB') {
        this.frontageLine.pB = pos;
        this.recalculateRawBearings();
      } else if (dragTarget.startsWith('water_')) {
        const idx = parseInt(dragTarget.split('_')[1], 10);
        if (!isNaN(idx) && this.waterPolyline[idx]) {
          this.waterPolyline[idx] = pos;
        }
      }

      this.renderDrawingElements();
      this.updateMeasurementsDisplay();
    });

    window.addEventListener('mouseup', () => {
      if (isPointerDown) {
        isPointerDown = false;
        dragTarget = null;
        this.updateSvgView();
      }
    });

    // TOUCH EVENTS CHO MOBILE (KHÓA CUỘN KHI THAO TÁC)
    svgOverlay.addEventListener('touchstart', (e) => {
      const pos = getSvgCoords(e);
      if (this.activeDrawTool === 'setCenter') {
        this.centerPoint = pos;
        this.renderDrawingElements();
        this.updateSvgView();
        e.preventDefault();
        return;
      }

      const target = e.target.closest('[data-drag-handle]');
      if (target) {
        isPointerDown = true;
        dragTarget = target.dataset.dragHandle;
        e.preventDefault(); // Ngăn cuộn trang khi chạm trúng handle
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!isPointerDown || !dragTarget) return;
      const pos = getSvgCoords(e);

      if (dragTarget === 'center') {
        this.centerPoint = pos;
      } else if (dragTarget === 'frontA') {
        this.frontageLine.pA = pos;
        this.recalculateRawBearings();
      } else if (dragTarget === 'frontB') {
        this.frontageLine.pB = pos;
        this.recalculateRawBearings();
      } else if (dragTarget.startsWith('water_')) {
        const idx = parseInt(dragTarget.split('_')[1], 10);
        if (!isNaN(idx) && this.waterPolyline[idx]) {
          this.waterPolyline[idx] = pos;
        }
      }

      this.renderDrawingElements();
      this.updateMeasurementsDisplay();
      e.preventDefault(); // Khóa cuộn trang mượt mà khi đang kéo
    }, { passive: false });

    window.addEventListener('touchend', () => {
      if (isPointerDown) {
        isPointerDown = false;
        dragTarget = null;
        this.updateSvgView();
      }
    });
  }

  renderDrawingElements() {
    const svg = document.getElementById('dt-drawing-svg');
    if (!svg) return;

    if (!this.showDrawingOverlay) {
      svg.innerHTML = '';
      return;
    }

    const { pA, pB } = this.frontageLine;
    const center = this.centerPoint;

    // 1. Mặt tiền nhà (Frontage Line)
    const midFrontX = (pA.x + pB.x) / 2;
    const midFrontY = (pA.y + pB.y) / 2;

    // Pháp tuyến mặt tiền (Normal Arrow)
    const facingRad = (this.rawFacingBearing - 90) * (Math.PI / 180);
    const arrowLen = 70;
    const normalEndX = midFrontX + arrowLen * Math.cos(facingRad);
    const normalEndY = midFrontY + arrowLen * Math.sin(facingRad);

    // 2. Tuyến nước (Water Polyline)
    const polylinePoints = this.waterPolyline.map(p => `${p.x},${p.y}`).join(' ');

    // Handles tuyến nước với TOUCH TARGET 48px VÔ HÌNH
    const waterHandles = this.waterPolyline.map((p, idx) => {
      const isLai = idx === 0;
      const isKhu = idx === this.waterPolyline.length - 1;
      const color = isLai ? '#34D399' : (isKhu ? '#38BDF8' : '#CBD5E1');
      const label = isLai ? 'LAI' : (isKhu ? 'KHỨ' : String(idx));
      return `
        <g transform="translate(${p.x}, ${p.y})">
          <!-- Vòng chạm cảm ứng vô hình (Touch Target 48px) cho mobile -->
          <circle r="24" fill="transparent" data-drag-handle="water_${idx}" style="cursor:grab; touch-action:none;" />
          <!-- Vòng tròn hiển thị trực quan -->
          <circle r="11" fill="${color}" stroke="#000" stroke-width="2.5" pointer-events="none" />
          <text y="4" font-size="9" font-weight="900" fill="#000" text-anchor="middle" pointer-events="none">${label[0]}</text>
          <text y="-16" font-size="11" font-weight="800" fill="${color}" text-anchor="middle" pointer-events="none">${label}</text>
        </g>
      `;
    }).join('');

    svg.innerHTML = `
      <!-- Tuyến nước chảy -->
      <polyline points="${polylinePoints}" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8" />
      <polyline points="${polylinePoints}" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="6,4" fill="none" />
      ${waterHandles}

      <!-- Mặt tiền căn nhà (Đoạn A -> B) -->
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#F59E0B" stroke-width="6" stroke-linecap="round" />
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#FEF3C7" stroke-width="1.8" stroke-dasharray="5,4" />

      <!-- Mũi tên pháp tuyến Hướng nhìn nhà -->
      <line x1="${midFrontX}" y1="${midFrontY}" x2="${normalEndX}" y2="${normalEndY}" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      <polygon points="${normalEndX},${normalEndY} ${normalEndX-6},${normalEndY+12} ${normalEndX+6},${normalEndY+12}" fill="#EF4444" transform="rotate(${this.rawFacingBearing + 90}, ${normalEndX}, ${normalEndY})" />
      <text x="${normalEndX}" y="${normalEndY - 14}" font-size="12" font-weight="900" fill="#EF4444" text-anchor="middle">HƯỚNG NHÀ</text>

      <!-- Điểm A và Điểm B mặt tiền (Touch Target 48px) -->
      <g transform="translate(${pA.x}, ${pA.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontA" style="cursor:grab; touch-action:none;" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-14" font-size="11" font-weight="800" fill="#F5D485" text-anchor="middle" pointer-events="none">Mép A</text>
      </g>
      <g transform="translate(${pB.x}, ${pB.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontB" style="cursor:grab; touch-action:none;" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-14" font-size="11" font-weight="800" fill="#F5D485" text-anchor="middle" pointer-events="none">Mép B</text>
      </g>

      <!-- Điểm Tâm Nhà (Center Anchor với Touch Target 48px) -->
      <g transform="translate(${center.x}, ${center.y})">
        <circle r="24" fill="transparent" data-drag-handle="center" style="cursor:grab; touch-action:none;" />
        <circle r="12" fill="#EF4444" stroke="#FFF" stroke-width="3" pointer-events="none" />
        <circle r="4" fill="#FFF" pointer-events="none" />
        <text y="-18" font-size="12" font-weight="900" fill="#EF4444" text-anchor="middle" pointer-events="none">TÂM NHÀ</text>
      </g>
    `;
  }

  updateMeasurementsDisplay() {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked
    });

    const facingEl = document.querySelector('.dt-luopan-tool-root strong[style*="#EF4444"]');
    if (facingEl) facingEl.textContent = `${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn)`;

    const sittingEl = document.querySelector('.dt-luopan-tool-root strong[style*="#FBBF24"]');
    if (sittingEl) sittingEl.textContent = `${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)`;

    const laiEl = document.querySelector('.dt-luopan-tool-root strong[style*="#34D399"]');
    if (laiEl && analysis.lai) laiEl.textContent = `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})`;

    const khuEl = document.querySelector('.dt-luopan-tool-root strong[style*="#38BDF8"]');
    if (khuEl && analysis.khu) khuEl.textContent = `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})`;
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
      isLocked: this.isCalibrationLocked
    });

    mount.innerHTML = this.renderer.render({
      cx: this.centerPoint.x,
      cy: this.centerPoint.y,
      radius: 350,
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });
  }

  bindEvents() {
    // Mode toggles
    const btnImg = document.getElementById('btn-mode-image');
    const btnMap = document.getElementById('btn-mode-map');
    if (btnImg) btnImg.addEventListener('click', () => this.switchMode('image'));
    if (btnMap) btnMap.addEventListener('click', () => this.switchMode('map'));

    // Upload Image
    const inputUpload = document.getElementById('input-upload-image');
    if (inputUpload) {
      inputUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.imageSrc = evt.target.result;
            this.renderLayout();
            this.bindEvents();
            this.initInteractiveCanvas();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Tool selector buttons
    const toolSelect = document.getElementById('tool-btn-select');
    const toolCenter = document.getElementById('tool-btn-center');
    const toolFrontage = document.getElementById('tool-btn-frontage');
    const toolWater = document.getElementById('tool-btn-water');

    const updateToolBtns = (activeId, activeBg, activeColor) => {
      [
        { el: toolSelect, defaultBg: '#1E293B', defaultColor: '#E2E8F0' },
        { el: toolCenter, defaultBg: '#1E293B', defaultColor: '#E2E8F0' },
        { el: toolFrontage, defaultBg: '#1E293B', defaultColor: '#E2E8F0' },
        { el: toolWater, defaultBg: '#1E293B', defaultColor: '#E2E8F0' }
      ].forEach(({ el, defaultBg, defaultColor }) => {
        if (el) {
          el.style.background = defaultBg;
          el.style.color = defaultColor;
        }
      });
      const act = document.getElementById(activeId);
      if (act) {
        act.style.background = activeBg;
        act.style.color = activeColor;
      }
    };

    if (toolSelect) toolSelect.addEventListener('click', () => { this.activeDrawTool = 'select'; updateToolBtns('tool-btn-select', '#F5D485', '#000'); });
    if (toolCenter) toolCenter.addEventListener('click', () => { this.activeDrawTool = 'setCenter'; updateToolBtns('tool-btn-center', '#EF4444', '#FFF'); });
    if (toolFrontage) toolFrontage.addEventListener('click', () => { this.activeDrawTool = 'drawFrontage'; updateToolBtns('tool-btn-frontage', '#F59E0B', '#000'); });
    if (toolWater) toolWater.addEventListener('click', () => { this.activeDrawTool = 'drawWater'; updateToolBtns('tool-btn-water', '#38BDF8', '#000'); });

    // Action buttons
    const btnFlipFront = document.getElementById('btn-flip-frontside');
    if (btnFlipFront) {
      btnFlipFront.addEventListener('click', () => {
        this.frontageLine.frontSide = this.frontageLine.frontSide === 'right' ? 'left' : 'right';
        this.recalculateRawBearings();
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    const btnReverseWater = document.getElementById('btn-reverse-water');
    if (btnReverseWater) {
      btnReverseWater.addEventListener('click', () => {
        this.waterPolyline.reverse();
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    const btnToggleDrawing = document.getElementById('btn-toggle-drawing');
    if (btnToggleDrawing) {
      btnToggleDrawing.addEventListener('click', () => {
        this.showDrawingOverlay = !this.showDrawingOverlay;
        btnToggleDrawing.textContent = this.showDrawingOverlay ? '👁️ Ẩn Nét' : '👁️ Nét Vẽ';
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
        this.viewRotation = this.getEffectiveFacingBearing();
        this.updateSvgView();
      });
    }

    // Opacity slider
    const sliderOpacity = document.getElementById('slider-opacity');
    if (sliderOpacity) {
      sliderOpacity.addEventListener('input', (e) => {
        this.luopanOpacity = parseFloat(e.target.value);
        this.updateSvgView();
      });
    }

    // Calibration Lock
    const btnLock = document.getElementById('btn-lock-calibration');
    const inputMeasured = document.getElementById('input-measured-bearing');
    if (btnLock && inputMeasured) {
      btnLock.addEventListener('click', () => {
        if (this.isCalibrationLocked) {
          this.isCalibrationLocked = false;
        } else {
          const val = parseFloat(inputMeasured.value);
          if (!isNaN(val)) {
            this.measuredBearing = this.geometry.normalizeBearing(val);
            this.calibrationOffset = this.geometry.computeCalibrationOffset(this.rawFacingBearing, this.measuredBearing);
            this.isCalibrationLocked = true;
          }
        }
        this.renderLayout();
        this.bindEvents();
        this.initInteractiveCanvas();
      });
    }

    // Layer checkboxes
    const layerKeys = [
      { id: 'chk-layer-360', key: 'degrees360' },
      { id: 'chk-layer-24', key: 'mountains24' },
      { id: 'chk-layer-144', key: 'waterMouth144' },
      { id: 'chk-layer-trigrams', key: 'trigrams' },
      { id: 'chk-layer-pointers', key: 'pointers' },
      { id: 'chk-layer-pin', key: 'centerPin' }
    ];

    layerKeys.forEach(({ id, key }) => {
      const chk = document.getElementById(id);
      if (chk) {
        chk.addEventListener('change', (e) => {
          this.renderer.setLayerVisibility(key, e.target.checked);
          this.updateSvgView();
        });
      }
    });

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
        const analysis = this.classifier.classify({
          facingBearing: facing,
          laiBearing: lai,
          khuBearing: khu,
          offset: this.calibrationOffset,
          isLocked: this.isCalibrationLocked
        });

        const reportHtml = `
          <div style="background:#1E293B; border-radius:10px; padding:1.2rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#FBBF24; font-weight:800; font-size:0.92rem; margin-bottom:0.6rem;">1. THÔNG SỐ KHẢO SÁT HIỆN TRƯỜNG</div>
            <div>• Trạng thái: <strong>${analysis.status.label}</strong></div>
            <div>• Hướng nhà: <strong style="color:#EF4444;">${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn / ${analysis.facing.trigram.name} Quái)</strong></div>
            <div>• Tọa nhà: <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)</strong></div>
            <div>• Cụm Song Sơn: <strong>${analysis.group.label} (${analysis.group.cuc} Cục)</strong></div>
            <div>• Lai Thủy (Nước đến): <strong>${analysis.lai ? `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})` : 'Chưa xác định'}</strong></div>
            <div>• Khứ Thủy (Nước đi): <strong>${analysis.khu ? `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})` : 'Chưa xác định'}</strong></div>
            <div>• Độ lệch hiệu chuẩn (Offset): <strong>${this.calibrationOffset >= 0 ? '+' : ''}${this.calibrationOffset.toFixed(1)}°</strong></div>
          </div>

          ${analysis.thuyKhau ? `
            <div style="background:#181F30; border-radius:10px; padding:1.2rem; border-left:4px solid #38BDF8;">
              <div style="color:#38BDF8; font-weight:800; font-size:0.92rem; margin-bottom:0.5rem;">2. PHÁN QUYẾT 144 THỦY KHẨU CHÁNH TÔNG</div>
              <div>• Khẩu khảo chứng: <strong>Khẩu #${analysis.thuyKhau.hs_num} / 144</strong></div>
              <div>• Tên thế cách: <strong style="color:#FEF3C7; font-size:1.05rem;">${analysis.thuyKhau.ten_cach}</strong> [${analysis.thuyKhau.muc_phan}]</div>
              <div>• Cửa nước thoát: <strong>Thủy xuất ${analysis.thuyKhau.thuy_xuat}</strong> (${analysis.thuyKhau.song_son_cung})</div>
              <div style="margin-top:0.6rem; color:#CBD5E1; font-size:0.82rem; line-height:1.6;">
                ${analysis.thuyKhau.muc_D}
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

  switchMode(newMode) {
    if (this.mode === newMode) return;
    this.mode = newMode;
    this.renderLayout();
    this.bindEvents();
    this.initInteractiveCanvas();

    if (this.mode === 'map') {
      setTimeout(() => {
        this.initLeafletMap();
      }, 100);
    }
  }

  initLeafletMap() {
    const mount = document.getElementById('dt-map-mount');
    if (!mount || typeof L === 'undefined') return;

    if (!this.mapInstance) {
      this.mapInstance = L.map('dt-map-mount', {
        center: this.centerLatLng,
        zoom: this.zoomLevel,
        zoomControl: false
      });

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri Satellite',
        maxZoom: 21,
        maxNativeZoom: 19
      }).addTo(this.mapInstance);

      L.control.zoom({ position: 'topright' }).addTo(this.mapInstance);

      this.mapInstance.on('move', () => {
        const center = this.mapInstance.getCenter();
        this.centerLatLng = [center.lat, center.lng];
      });
    } else {
      setTimeout(() => {
        this.mapInstance.invalidateSize();
      }, 150);
    }
  }
}

window.LuopanMapTool = LuopanMapTool;
