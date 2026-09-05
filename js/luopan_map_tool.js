/**
 * CÔNG CỤ TƯƠNG TÁC: LA KINH BẢN ĐỒ – 144 THỦY KHẨU (LUOPAN MAP WORKSPACE)
 * Tích hợp đa chế độ: Bản đồ vệ tinh Leaflet GIS & Tải ảnh thực địa/mặt bằng CAD.
 * Hỗ trợ hiệu chuẩn góc thực địa (Calibration), xoay view tự do, bóc tách layer.
 */

class LuopanMapTool {
  constructor() {
    this.mode = 'image'; // 'image' hoặc 'map'
    this.container = null;

    // Động cơ
    this.geometry = window.LuopanGeometry;
    this.data = window.LuopanData;
    this.renderer = new window.LuopanSvgRenderer({ size: 700 });
    this.classifier = new window.LuopanClassifier();

    // Dữ liệu không gian thực địa
    this.centerPoint = { x: 350, y: 350 };
    this.frontageLine = {
      pA: { x: 260, y: 350 },
      pB: { x: 440, y: 350 },
      frontSide: 'right' // Hướng nhìn mặt tiền (right: Nam, left: Bắc)
    };
    this.waterPolyline = [
      { x: 120, y: 180 }, // Điểm Lai Thủy (Nước đến)
      { x: 350, y: 220 },
      { x: 580, y: 480 }  // Điểm Khứ Thủy (Nước đi)
    ];

    // Trạng thái đo lường & hiệu chuẩn
    this.rawFacingBearing = 180; // Nam
    this.measuredBearing = 180;
    this.calibrationOffset = 0;
    this.isCalibrationLocked = false;

    // Viewport
    this.viewRotation = 0; // 0 = Bắc lên trên; -rawFacing = Hướng nhà lên trên
    this.luopanOpacity = 0.85;
    this.imageSrc = null;
    this.mapInstance = null;

    // Dragging state
    this.draggingTarget = null;
  }

  init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.recalculateRawBearings();
    this.renderLayout();
    this.bindEvents();
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
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });

    this.container.innerHTML = `
      <div class="dt-luopan-tool-root" style="display:flex; flex-direction:column; gap:1.2rem; max-width:1200px; margin:0 auto; font-family:'Be Vietnam Pro', sans-serif;">
        <!-- TOP HEADER & STATUS BAR -->
        <header style="background:#0D111A; border:1px solid #C5B382; border-radius:12px; padding:1rem 1.4rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.2rem 0.6rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:6px; font-size:0.75rem; font-weight:700; color:#F5D485; margin-bottom:0.3rem;">
              <span>🧭</span> LA KINH BẢN ĐỒ CÓ HIỆU CHUẨN THỰC ĐỊA
            </div>
            <h2 style="margin:0; font-size:1.3rem; color:#FEF3C7; font-weight:800;">
              Khảo Sát Thủy Khẩu & Phương Vị Không Gian
            </h2>
          </div>

          <div style="display:flex; align-items:center; gap:0.8rem; flex-wrap:wrap;">
            <div class="dt-badge" style="background:${analysis.status.color}22; color:${analysis.status.color}; border:1px solid ${analysis.status.color}55; font-size:0.82rem; font-weight:700; padding:0.4rem 0.8rem; border-radius:8px;">
              ${analysis.status.label}
            </div>
            <div style="display:flex; gap:0.3rem; background:#1E293B; padding:0.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
              <button type="button" id="btn-mode-image" style="background:${this.mode === 'image' ? '#FBBF24' : 'transparent'}; color:${this.mode === 'image' ? '#000' : '#CBD5E1'}; border:none; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                📷 Tải Ảnh / CAD
              </button>
              <button type="button" id="btn-mode-map" style="background:${this.mode === 'map' ? '#38BDF8' : 'transparent'}; color:${this.mode === 'map' ? '#000' : '#CBD5E1'}; border:none; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                🗺️ Bản Đồ Vệ Tinh
              </button>
            </div>
          </div>
        </header>

        <!-- MAIN WORKSPACE GRID -->
        <div style="display:grid; grid-template-columns: 1fr 340px; gap:1.2rem; align-items:start;">
          
          <!-- LEFT: INTERACTIVE CANVAS / MAP CONTAINER -->
          <div style="background:#080C14; border:1px solid rgba(255,255,255,0.12); border-radius:14px; overflow:hidden; position:relative; min-height:560px; display:flex; justify-content:center; align-items:center; box-shadow:0 12px 36px rgba(0,0,0,0.6);">
            
            <!-- BACKGROUND IMAGE OR MAP -->
            <div id="dt-workspace-viewport" style="position:absolute; inset:0; overflow:hidden; display:flex; justify-content:center; align-items:center;">
              ${this.mode === 'image' && this.imageSrc ? `
                <img id="dt-user-img" src="${this.imageSrc}" style="width:100%; height:100%; object-fit:contain; opacity:0.65; pointer-events:none;" />
              ` : `
                <div id="dt-map-mount" style="position:absolute; inset:0; ${this.mode === 'map' ? 'z-index:1;' : 'display:none;'}"></div>
                ${!this.imageSrc && this.mode === 'image' ? `
                  <div style="text-align:center; color:#64748B; padding:2rem;">
                    <div style="font-size:2.5rem; margin-bottom:0.5rem;">🛰️</div>
                    <p style="font-size:0.9rem; margin-bottom:0.8rem;">Chưa có ảnh nền. Bạn có thể tải ảnh chụp vệ tinh Google Maps hoặc bản vẽ mặt bằng nhà.</p>
                    <label style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; padding:0.5rem 1rem; border-radius:8px; font-size:0.82rem; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:0.4rem;">
                      <span>📁</span> Chọn tệp ảnh tải lên
                      <input type="file" id="input-upload-image" accept="image/*" style="display:none;" />
                    </label>
                  </div>
                ` : ''}
              `}
            </div>

            <!-- OVERLAY VECTOR LUOPAN SVG -->
            <div id="dt-luopan-svg-container" style="position:relative; z-index:10; width:92%; max-width:680px; aspect-ratio:1/1; pointer-events:none;">
              ${luopanSvgHtml}
            </div>

            <!-- FLOATING VIEWPORT ACTION TOOLBAR -->
            <div style="position:absolute; bottom:14px; left:14px; z-index:20; display:flex; gap:0.5rem; background:rgba(15,23,42,0.85); backdrop-filter:blur(8px); padding:0.4rem; border-radius:8px; border:1px solid rgba(255,255,255,0.15);">
              <button type="button" id="btn-north-up" title="Khôi phục hướng Bắc lên trên" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(255,255,255,0.1); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">
                🧭 Bắc Lên Trên
              </button>
              <button type="button" id="btn-facing-up" title="Xoay hướng nhà hướng lên đỉnh màn hình" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.3); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">
                🏠 Hướng Nhà Lên Trên
              </button>
              <button type="button" id="btn-rotate-cw" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.1); padding:0.35rem 0.5rem; border-radius:6px; font-size:0.75rem; cursor:pointer;">
                ↷ +15°
              </button>
            </div>

            <!-- OPACITY SLIDER (GÓC PHẢI DƯỚI) -->
            <div style="position:absolute; bottom:14px; right:14px; z-index:20; background:rgba(15,23,42,0.85); backdrop-filter:blur(8px); padding:0.35rem 0.7rem; border-radius:8px; border:1px solid rgba(255,255,255,0.15); display:flex; align-items:center; gap:0.5rem; font-size:0.72rem; color:#94A3B8;">
              <span>Độ mờ:</span>
              <input type="range" id="slider-opacity" min="0.1" max="1.0" step="0.05" value="${this.luopanOpacity}" style="width:75px; cursor:pointer;" />
            </div>
          </div>

          <!-- RIGHT: CALIBRATION & MEASUREMENT SIDEBAR -->
          <div style="display:flex; flex-direction:column; gap:1rem;">
            
            <!-- 1. BẢNG HIỆU CHUẨN THỰC ĐỊA (BẮT BUỘC) -->
            <div style="background:#111827; border:1px solid ${this.isCalibrationLocked ? '#10B981' : '#F59E0B'}; border-radius:12px; padding:1.1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span style="font-size:0.76rem; font-weight:800; color:#FEF3C7; text-transform:uppercase; letter-spacing:0.04em;">
                  1. Hiệu Chuẩn Thực Địa
                </span>
                <span style="font-size:0.72rem; font-weight:700; color:${this.isCalibrationLocked ? '#34D399' : '#FBBF24'};">
                  ${this.isCalibrationLocked ? '🔒 ĐÃ KHÓA' : '🔓 CHƯA KHÓA'}
                </span>
              </div>

              <div style="font-size:0.78rem; color:#94A3B8; margin-bottom:0.8rem; line-height:1.5;">
                Số đo bản đồ/ảnh chỉ có giá trị góc tương đối. Hãy nhập góc hướng nhà bạn đo được bằng La Kinh thực địa để khóa mốc chuẩn.
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:0.8rem;">
                <div style="background:#1A2234; padding:0.5rem 0.7rem; border-radius:8px;">
                  <span style="font-size:0.7rem; color:#64748B; display:block;">RAW Bản Đồ</span>
                  <strong style="font-size:1rem; color:#CBD5E1;">${this.rawFacingBearing.toFixed(1)}°</strong>
                </div>
                <div style="background:#1A2234; padding:0.5rem 0.7rem; border-radius:8px;">
                  <span style="font-size:0.7rem; color:#64748B; display:block;">Offset Bù</span>
                  <strong style="font-size:1rem; color:${this.calibrationOffset >= 0 ? '#34D399' : '#F87171'};">${this.calibrationOffset >= 0 ? '+' : ''}${this.calibrationOffset.toFixed(1)}°</strong>
                </div>
              </div>

              <div style="margin-bottom:0.9rem;">
                <label for="input-measured-bearing" style="display:block; font-size:0.75rem; font-weight:700; color:#E2E8F0; margin-bottom:0.3rem;">
                  Hướng Nhà Đo Bằng La Kinh Thực Địa (°):
                </label>
                <div style="display:flex; gap:0.5rem;">
                  <input type="number" id="input-measured-bearing" min="0" max="359.9" step="0.1" value="${this.measuredBearing.toFixed(1)}" style="flex:1; background:#0B0F17; color:#FEF3C7; border:1px solid rgba(197,179,130,0.4); border-radius:6px; padding:0.45rem 0.6rem; font-size:0.9rem; font-weight:700; outline:none;" />
                  <button type="button" id="btn-lock-calibration" style="background:${this.isCalibrationLocked ? '#059669' : '#D97706'}; color:#FFF; border:none; padding:0.45rem 0.8rem; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
                    ${this.isCalibrationLocked ? 'Mở Khóa' : 'Khóa Chuẩn'}
                  </button>
                </div>
              </div>
            </div>

            <!-- 2. KẾT QUẢ ĐỌC PHƯƠNG VỊ & 144 THỦY KHẨU -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:1.1rem;">
              <span style="font-size:0.76rem; font-weight:800; color:#38BDF8; text-transform:uppercase; letter-spacing:0.04em; display:block; margin-bottom:0.8rem;">
                2. Phân Khảo Cổ Pháp
              </span>

              <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.82rem;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Hướng Nhà:</span>
                  <strong style="color:#EF4444;">${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn)</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Tọa Sơn:</span>
                  <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Cụm Song Sơn:</span>
                  <strong style="color:#CBD5E1;">${analysis.group.label}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Lai Thủy (Đến):</span>
                  <strong style="color:#34D399;">${analysis.lai ? `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})` : 'Chưa xác định'}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Khứ Thủy (Thoát):</span>
                  <strong style="color:#38BDF8;">${analysis.khu ? `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})` : 'Chưa xác định'}</strong>
                </div>
              </div>

              ${analysis.thuyKhau ? `
                <div style="margin-top:0.9rem; background:#181F30; border-left:3px solid #F5D485; border-radius:0 8px 8px 0; padding:0.75rem 0.9rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                    <span style="font-size:0.72rem; color:#94A3B8; font-weight:700;">Khẩu #${analysis.thuyKhau.hs_num} / 144</span>
                    <span class="dt-badge" style="background:rgba(16,185,129,0.15); color:#34D399; font-size:0.7rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:4px;">${analysis.thuyKhau.muc_phan}</span>
                  </div>
                  <div style="font-size:0.88rem; font-weight:800; color:#FEF3C7; margin-bottom:0.3rem;">
                    ${analysis.thuyKhau.ten_cach}
                  </div>
                  <div style="font-size:0.78rem; color:#CBD5E1; line-height:1.5; margin-bottom:0.5rem;">
                    Thoát: <strong style="color:#38BDF8;">${analysis.thuyKhau.thuy_xuat}</strong> · Cung: ${analysis.thuyKhau.song_son_cung}
                  </div>
                  <a href="#/thu-vien/duong-trach/bai/batch-21?nhom=${analysis.group.idx + 1}&hs=${analysis.thuyKhau.hs_num}" style="display:inline-flex; align-items:center; gap:0.3rem; color:#F5D485; font-size:0.78rem; font-weight:700; text-decoration:none;">
                    📖 Đọc toàn văn khảo chứng Khẩu #${analysis.thuyKhau.hs_num} →
                  </a>
                </div>
              ` : ''}
            </div>

            <!-- 3. QUẢN LÝ CÁC TẦNG LA KINH (LAYERS CONTROL) -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:1.1rem;">
              <span style="font-size:0.76rem; font-weight:800; color:#A78BFA; text-transform:uppercase; letter-spacing:0.04em; display:block; margin-bottom:0.75rem;">
                3. Bật / Tắt Tầng La Kinh
              </span>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.78rem;">
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-360" ${this.renderer.layers.degrees360 ? 'checked' : ''} /> 360° Chu Thiên
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-24" ${this.renderer.layers.mountains24 ? 'checked' : ''} /> 24 Sơn Hướng
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-144" ${this.renderer.layers.waterMouth144 ? 'checked' : ''} /> 144 Thủy Khẩu
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-trigrams" ${this.renderer.layers.trigrams ? 'checked' : ''} /> Bát Quái
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-pointers" ${this.renderer.layers.pointers ? 'checked' : ''} /> Kim Chỉ Thị
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-pin" ${this.renderer.layers.centerPin ? 'checked' : ''} /> Thiên Trì
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
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
          };
          reader.readAsDataURL(file);
        }
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

    const btnRotateCw = document.getElementById('btn-rotate-cw');
    if (btnRotateCw) {
      btnRotateCw.addEventListener('click', () => {
        this.viewRotation = (this.viewRotation + 15) % 360;
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

    // Calibration
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
  }

  updateSvgView() {
    const mount = document.getElementById('dt-luopan-svg-container');
    if (!mount) return;
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    mount.innerHTML = this.renderer.render({
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      opacity: this.luopanOpacity
    });
  }

  switchMode(newMode) {
    if (this.mode === newMode) return;
    this.mode = newMode;
    this.renderLayout();
    this.bindEvents();

    if (this.mode === 'map') {
      this.initLeafletMap();
    }
  }

  initLeafletMap() {
    const mapMount = document.getElementById('dt-map-mount');
    if (!mapMount || typeof L === 'undefined') return;

    if (!this.mapInstance) {
      // Mặc định tâm Hà Nội (hoặc vị trí người dùng nếu có GPS)
      this.mapInstance = L.map('dt-map-mount', {
        center: [21.0285, 105.8542],
        zoom: 18,
        zoomControl: false
      });

      // Lớp bản đồ vệ tinh ESRI World Imagery miễn phí, độ phân giải cao
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
      }).addTo(this.mapInstance);

      L.control.zoom({ position: 'topright' }).addTo(this.mapInstance);
    } else {
      setTimeout(() => {
        this.mapInstance.invalidateSize();
      }, 150);
    }
  }
}

window.LuopanMapTool = LuopanMapTool;
