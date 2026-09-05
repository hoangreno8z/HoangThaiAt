/**
 * BỘ SINH LA KINH VECTOR SVG TOÁN HỌC (PARAMETRIC VECTOR LUOPAN SVG RENDERER)
 * Tự động tính toán tọa độ cực, sinh các tầng đồng tâm và hỗ trợ bật/tắt Layer.
 * Hỗ trợ tâm động (cx, cy) và bán kính động (radius) để đồng bộ tâm nhà với thiên trì.
 * Không phụ thuộc thư viện ngoài; phóng to thu nhỏ không vỡ hạt.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./luopan_geometry', './luopan_data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./luopan_geometry'), require('./luopan_data'));
  } else {
    root.LuopanSvgRenderer = factory(root.LuopanGeometry, root.LuopanData);
  }
}(typeof self !== 'undefined' ? self : this, function(Geometry, Data) {
  'use strict';

  class LuopanSvgRenderer {
    constructor(config = {}) {
      this.size = config.size || 800;
      this.defaultCx = this.size / 2;
      this.defaultCy = this.size / 2;
      this.defaultRadius = this.size / 2 - 16;

      // Cấu hình hiển thị các tầng (Layers)
      this.layers = Object.assign({
        centerPin: true,      // Kim chỉ nam & Thập đạo hồng tuyến
        trigrams: true,       // Bát Quái hậu thiên (8 quẻ)
        mountains24: true,    // 24 Sơn chánh vị
        tuCuc: true,          // Tứ Cục Tam Hợp
        waterMouth144: true,  // 144 Phân vị Thủy Khẩu
        degrees360: true,     // Chu thiên 360 độ
        pointers: true        // Các kim chỉ tiêu (Hướng nhà, Tọa, Lai, Khứ)
      }, config.layers || {});
    }

    setLayerVisibility(layerId, isVisible) {
      if (layerId in this.layers) {
        this.layers[layerId] = Boolean(isVisible);
      }
    }

    /**
     * Sinh toàn bộ mã SVG La Kinh
     * @param {Object} state Trạng thái đo đạc hiện tại
     *   - cx, cy: Tâm La Kinh (mặc định tại tâm size/2)
     *   - radius: Bán kính ngoài cùng
     *   - rotation: Góc xoay camera hiển thị (0 = Bắc lên trên, hoặc -facing)
     *   - houseFacing: Hướng nhà đã hiệu chuẩn
     *   - houseSitting: Tọa nhà
     *   - laiBearing: Phương vị Lai Thủy
     *   - khuBearing: Phương vị Khứ Thủy
     *   - activeHsNum: Số thứ tự khẩu đang chọn (1-144)
     *   - opacity: Độ mờ của SVG
     */
    render(state = {}) {
      const {
        cx = this.defaultCx,
        cy = this.defaultCy,
        radius = this.defaultRadius,
        rotation = 0,
        houseFacing = null,
        houseSitting = null,
        laiBearing = null,
        khuBearing = null,
        activeHsNum = null,
        opacity = 0.95
      } = state;

      const r = radius;
      // Định nghĩa bán kính các tầng đồng tâm từ ngoài vào trong:
      const rOuter360 = r;
      const rInner360 = r - 26;

      const rOuter144 = rInner360;
      const rInner144 = rOuter144 - 38;

      const rOuter24 = rInner144;
      const rInner24 = rOuter24 - 44;

      const rOuterTrigram = rInner24;
      const rInnerTrigram = rOuterTrigram - 38;

      // ── TẦNG 1: CHU THIÊN 360 ĐỘ ──
      let svg360 = '';
      if (this.layers.degrees360) {
        const ticks = [];
        for (let deg = 0; deg < 360; deg++) {
          const isMajor = deg % 10 === 0;
          const isMedium = deg % 5 === 0;
          const tickLen = isMajor ? 12 : (isMedium ? 7 : 4);
          const p1 = Geometry.polarToSvgCartesian(cx, cy, rOuter360, deg);
          const p2 = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - tickLen, deg);
          const stroke = isMajor ? '#FEF3C7' : (isMedium ? '#94A3B8' : '#475569');
          ticks.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${stroke}" stroke-width="${isMajor ? 1.5 : 0.8}" />`);

          if (isMajor) {
            const pText = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - 18, deg);
            ticks.push(`<text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2)}" font-size="7.5" font-family="'Be Vietnam Pro', sans-serif" fill="#FDE047" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${deg}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${deg}°</text>`);
          }
        }
        svg360 = `
          <g id="layer-360" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rOuter360}" fill="#0A0E17" stroke="#C5B382" stroke-width="2" />
            <circle cx="${cx}" cy="${cy}" r="${rInner360}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
            ${ticks.join('')}
          </g>`;
      }

      // ── TẦNG 2: 144 THỦY KHẨU PHÂN VỊ ──
      let svg144 = '';
      if (this.layers.waterMouth144) {
        const matrix = (typeof window !== 'undefined' && window.THUY_KHAU_144_MATRIX) || [];
        const step = 360 / 144; // 2.5 độ mỗi phân vị
        const sectors144 = [];

        for (let i = 0; i < 144; i++) {
          const startDeg = i * step;
          const endDeg = (i + 1) * step;
          const centerDeg = startDeg + step / 2;
          const hsNum = i + 1;
          const isSelected = activeHsNum === hsNum;

          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInner144, rOuter144, startDeg, endDeg);
          const fill = isSelected ? 'rgba(245,158,11,0.5)' : (i % 2 === 0 ? '#111827' : '#0B0F19');
          const stroke = isSelected ? '#FBBF24' : 'rgba(255,255,255,0.06)';

          const pText = Geometry.polarToSvgCartesian(cx, cy, (rInner144 + rOuter144) / 2, centerDeg);

          sectors144.push(`
            <path d="${pathD}" fill="${fill}" stroke="${stroke}" stroke-width="0.5" data-hs="${hsNum}" class="dt-144-sector" />
            <text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2)}" font-size="6.5" font-family="'Be Vietnam Pro', sans-serif" fill="${isSelected ? '#FEF3C7' : '#94A3B8'}" font-weight="${isSelected ? '800' : '500'}" text-anchor="middle" dominant-baseline="central" transform="rotate(${centerDeg}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${hsNum}</text>
          `);
        }

        svg144 = `
          <g id="layer-144" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInner144}" fill="none" stroke="#C5B382" stroke-width="1" />
            ${sectors144.join('')}
          </g>`;
      }

      // ── TẦNG 3: NHỊ THẬP TỨ SƠN (24 SƠN) ──
      let svg24 = '';
      if (this.layers.mountains24) {
        const sectors24 = [];
        Data.MOUNTAINS_24.forEach(m => {
          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInner24, rOuter24, m.start, m.end);
          const pText = Geometry.polarToSvgCartesian(cx, cy, (rInner24 + rOuter24) / 2, m.center);
          
          let bg = '#161F30';
          if (m.element === 'Hỏa') bg = 'rgba(239,68,68,0.18)';
          else if (m.element === 'Thủy') bg = 'rgba(56,189,248,0.18)';
          else if (m.element === 'Mộc') bg = 'rgba(74,222,128,0.18)';
          else if (m.element === 'Kim') bg = 'rgba(251,191,36,0.18)';
          else if (m.element === 'Thổ') bg = 'rgba(217,119,6,0.18)';

          sectors24.push(`
            <path d="${pathD}" fill="${bg}" stroke="rgba(255,255,255,0.12)" stroke-width="0.8" />
            <text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2) - 4}" font-size="11" font-family="'Noto Serif SC', serif" fill="${m.color}" font-weight="900" text-anchor="middle" dominant-baseline="central" transform="rotate(${m.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${m.hanzi}</text>
            <text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2) + 8}" font-size="7" font-family="'Be Vietnam Pro', sans-serif" fill="#FEF3C7" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${m.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${m.name}</text>
          `);
        });

        svg24 = `
          <g id="layer-24" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInner24}" fill="none" stroke="#C5B382" stroke-width="1.2" />
            ${sectors24.join('')}
          </g>`;
      }

      // ── TẦNG 4: BÁT QUÁI HẬU THIÊN (8 CUNG QUÁI) ──
      let svgTrigrams = '';
      if (this.layers.trigrams) {
        const trigramSectors = [];
        Data.TRIGRAMS_8.forEach(t => {
          const pathD = Geometry.createAnnularSectorPath(cx, cy, rInnerTrigram, rOuterTrigram, t.start, t.end);
          const pText = Geometry.polarToSvgCartesian(cx, cy, (rInnerTrigram + rOuterTrigram) / 2, t.center);

          trigramSectors.push(`
            <path d="${pathD}" fill="#111827" stroke="rgba(197,179,130,0.3)" stroke-width="1" />
            <text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2) - 5}" font-size="14" fill="#F5D485" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${t.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${t.symbol}</text>
            <text x="${pText.x.toFixed(2)}" y="${pText.y.toFixed(2) + 8}" font-size="8.5" font-family="'Be Vietnam Pro', sans-serif" fill="#CBD5E1" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${t.center}, ${pText.x.toFixed(2)}, ${pText.y.toFixed(2)})">${t.name}</text>
          `);
        });

        svgTrigrams = `
          <g id="layer-trigrams" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInnerTrigram}" fill="none" stroke="#C5B382" stroke-width="1.5" />
            ${trigramSectors.join('')}
          </g>`;
      }

      // ── TẦNG 5: THIÊN TRÌ (TÂM LA KINH & HẢI ĐẢO KIM CHÂM) ──
      let svgCenter = '';
      if (this.layers.centerPin) {
        svgCenter = `
          <g id="layer-center" class="dt-luopan-layer">
            <circle cx="${cx}" cy="${cy}" r="${rInnerTrigram}" fill="#080C14" stroke="#C5B382" stroke-width="2" />
            <circle cx="${cx}" cy="${cy}" r="${rInnerTrigram * 0.45}" fill="#131B2A" stroke="rgba(56,189,248,0.4)" stroke-width="1" />
            
            <!-- Thập đạo hồng tuyến (Chữ thập chỉ thị) -->
            <line x1="${cx}" y1="${cy - rInnerTrigram}" x2="${cx}" y2="${cy + rInnerTrigram}" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,3" />
            <line x1="${cx - rInnerTrigram}" y1="${cy}" x2="${cx + rInnerTrigram}" y2="${cy}" stroke="#EF4444" stroke-width="1.2" stroke-dasharray="3,3" />

            <!-- Điểm tâm thiên trì -->
            <circle cx="${cx}" cy="${cy}" r="6" fill="#EF4444" stroke="#FEF3C7" stroke-width="1.5" />
          </g>`;
      }

      // ── TẦNG 6: CÁC KIM CHỈ THỊ (POINTERS: HƯỚNG NHÀ, TỌA, LAI, KHỨ) ──
      let svgPointers = '';
      if (this.layers.pointers) {
        const pointerLines = [];

        // 1. Kim Hướng Nhà (Màu Đỏ Rực #EF4444)
        if (houseFacing !== null) {
          const pFacing = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 10, houseFacing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pFacing.x.toFixed(2)}" y2="${pFacing.y.toFixed(2)}" stroke="#EF4444" stroke-width="3" />
            <circle cx="${pFacing.x.toFixed(2)}" cy="${pFacing.y.toFixed(2)}" r="6" fill="#EF4444" stroke="#FFF" stroke-width="1.5" />
          `);
        }

        // 2. Kim Tọa Nhà (Màu Vàng Ánh Kim #FBBF24)
        if (houseSitting !== null) {
          const pSitting = Geometry.polarToSvgCartesian(cx, cy, rOuter360 - 5, houseSitting);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pSitting.x.toFixed(2)}" y2="${pSitting.y.toFixed(2)}" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,4" />
          `);
        }

        // 3. Kim Lai Thủy (Xanh Lá Cây #34D399)
        if (laiBearing !== null) {
          const pLai = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 6, laiBearing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pLai.x.toFixed(2)}" y2="${pLai.y.toFixed(2)}" stroke="#34D399" stroke-width="2.5" />
            <polygon points="${pLai.x},${pLai.y} ${pLai.x-5},${pLai.y+9} ${pLai.x+5},${pLai.y+9}" fill="#34D399" transform="rotate(${laiBearing + 180}, ${pLai.x}, ${pLai.y})" />
          `);
        }

        // 4. Kim Khứ Thủy (Xanh Lam Biển #38BDF8)
        if (khuBearing !== null) {
          const pKhu = Geometry.polarToSvgCartesian(cx, cy, rOuter360 + 6, khuBearing);
          pointerLines.push(`
            <line x1="${cx}" y1="${cy}" x2="${pKhu.x.toFixed(2)}" y2="${pKhu.y.toFixed(2)}" stroke="#38BDF8" stroke-width="2.5" />
            <polygon points="${pKhu.x},${pKhu.y} ${pKhu.x-5},${pKhu.y-9} ${pKhu.x+5},${pKhu.y-9}" fill="#38BDF8" transform="rotate(${khuBearing}, ${pKhu.x}, ${pKhu.y})" />
          `);
        }

        svgPointers = `<g id="layer-pointers" class="dt-luopan-layer">${pointerLines.join('')}</g>`;
      }

      // Toàn bộ SVG bọc trong transform rotate(-rotation, cx, cy) để hỗ trợ "Hướng nhà lên trên"
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.size} ${this.size}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="opacity:${opacity}; filter:drop-shadow(0 12px 28px rgba(0,0,0,0.65));">
          <g transform="rotate(${-rotation}, ${cx}, ${cy})">
            ${svg360}
            ${svg144}
            ${svg24}
            ${svgTrigrams}
            ${svgCenter}
            ${svgPointers}
          </g>
        </svg>
      `;
    }
  }

  return LuopanSvgRenderer;
}));
